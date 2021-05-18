import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { DatosEntrenador } from '../interfaces/entrenador.interface';
import { DatosAdministrador } from '../interfaces/administrador.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatosUsuario } from '../interfaces/user.interface';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FileI } from '../interfaces/file.interface';
import { finalize } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  errores=null;
  private filePath: string;
  public photoURL = null;
  public user$: Observable<User>;
  public entrenador$: Observable<DatosEntrenador>;
  public administrador$: Observable<DatosAdministrador>;
  private usuariosCollection: AngularFirestoreCollection<DatosUsuario>;
  private usuario: Observable<DatosUsuario[]>;
  private entrenadorCollection: AngularFirestoreCollection<DatosEntrenador>;
  private entrenador: Observable<DatosEntrenador[]>;
  private administradorCollection: AngularFirestoreCollection<DatosAdministrador>;
  private administrador: Observable<DatosAdministrador[]>;
  constructor(
    public afAuth: AngularFireAuth, 
    private afs: AngularFirestore,
    private storage: AngularFireStorage
    ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`alumnos/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
    this.entrenador$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`entrenadores/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
    this.usuariosCollection = afs.collection<DatosUsuario>('alumnos');
    this.usuario = this.usuariosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
    this.administradorCollection = afs.collection<DatosAdministrador>('administrador');
    this.administrador = this.administradorCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
    this.entrenadorCollection = afs.collection<DatosEntrenador>('entrenadores');
    this.entrenador = this.entrenadorCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      this.errores=error['message'];
      console.log('Error->', error);
    }
  }

  async register(email: string, password: string, nombre: string, apellido: string, cedu: string, tele: string,tele2: string,fecha:string,image?: FileI): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const uid = user.uid;
      const correo = user.email;
      this.filePath = `perfiles/${uid}`;
      const fileRef = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath, image);
      task.snapshotChanges()
        .pipe(
           finalize(() => {
            fileRef.getDownloadURL().subscribe(urlImage => {
              this.photoURL=urlImage;
              this.afs.collection('alumnos').doc(uid).set({
                uid : uid,
                cedula: cedu,
                nombre : nombre,
                apellido : apellido,
                correo : correo,
                telefono : tele,
                telefono2 : tele2,
                estado : "Activo",
                foto : this.photoURL,
                fecha_naciento: fecha,
                tipo: "Arquero"
              })
            });
          })
        ).subscribe();
      await this.sendVerifcationEmail();
      return user;
    } catch (error) {
      this.errores=error['message'];
      console.log('Error->', error);
    }
  }

  async registerentrenador(email: string, password: string, nombre: string, apellido: string, cedu: string, tele: string,image?: FileI): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const uid = user.uid;
      const correo = user.email;
      this.filePath = `perfiles/${uid}`;
      const fileRef = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath, image);
      task.snapshotChanges()
        .pipe(
           finalize(() => {
            fileRef.getDownloadURL().subscribe(urlImage => {
              this.photoURL=urlImage;
              this.afs.collection('entrenadores').doc(uid).set({
                uid : uid,
                cedula: cedu,
                nombres : nombre,
                apellidos : apellido,
                correo : correo,
                telefono : tele,
                estado : "Activo",
                foto : this.photoURL,
                tipo: "Entrenador",
                firma: ""
              })
            });
          })
        ).subscribe();
      await this.sendVerifcationEmail();
      return user;
    } catch (error) {
      this.errores=error['message'];
      console.log('Error->', error);
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      //this.updateUserData(user);
      return user;
    } catch (error) {
      this.errores=error['message'];
      console.log('Error->', error['message']);
    }
  }

  async sendVerifcationEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  isEmailVerified(user: User): boolean {
    return user.emailVerified === true ? true : false;
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut().then(() => {
        window.location.href = 'login' ;
        //this.nav.navigateForward('/login'); 
        //window.location.href = 'login' ;
      })
    } catch (error) {
      console.log('Error->', error);
    }
  }


  obtenerUsuario(id: string){
    return this.usuariosCollection.doc<DatosUsuario>(id).valueChanges();
  }
  obtenerEntrenador(id: string){
    return this.entrenadorCollection.doc<DatosEntrenador>(id).valueChanges();
  }
  obtenerAdministrador(id: string){
    return this.administradorCollection.doc<DatosAdministrador>(id).valueChanges();
  }
}
