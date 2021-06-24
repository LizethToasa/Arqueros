import { Injectable } from '@angular/core';
import { DatosUsuario } from '../interfaces/user.interface';
import { Solicitud } from '../interfaces/solicitud.interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { FileI } from '../interfaces/file.interface';
@Injectable({
  providedIn: 'root'
})
export class ArqueroService {

  private arquerosCollection: AngularFirestoreCollection<DatosUsuario>;
  private arqueros: Observable<DatosUsuario[]>;
  private arquerosCollection2: AngularFirestoreCollection<DatosUsuario>;
  private arqueros2: Observable<DatosUsuario[]>;
  private solicitudCollection: AngularFirestoreCollection<Solicitud>;
  private solicitud: Observable<Solicitud[]>;
  private solicitudCollection2: AngularFirestoreCollection<Solicitud>;
  private solicitud2: Observable<Solicitud[]>;
  public photoURL = null;
  private filePath: string;
  constructor(
    public db:AngularFirestore, private storage: AngularFireStorage ,public afDB: AngularFireDatabase
  ) { 
    this.arquerosCollection = db.collection<DatosUsuario>('alumnos');
    this.arqueros = this.arquerosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );

    this.solicitudCollection = db.collection<Solicitud>('solicitudes');
    this.solicitud = this.solicitudCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );

   
  }

  addSolicitud(solicitud: Solicitud){
    return this.solicitudCollection.add(solicitud);
  }

  updateSolicitud(solicitud: Solicitud, id: string){
    return this.solicitudCollection.doc(id).update(solicitud);
  }

  getSolicitud(id: string){
    return this.solicitudCollection.doc<Solicitud>(id).valueChanges();
  }

  getSolicitudes(){
    this.solicitudCollection2 = this.db.collection<Solicitud>('solicitudes', ref => ref.orderBy("fechasol", "desc") );
    this.solicitud2= this.solicitudCollection2.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );

    return this.solicitud2;
  }

  getArqueros(){
    return this.arqueros;
  }
  getArquero(id: string){
    return this.arquerosCollection.doc<DatosUsuario >(id).valueChanges();
  }

  updateArquero(usuario:DatosUsuario , id: string){
    return this.arquerosCollection.doc(id).update(usuario);
  }

  updateImagen(usuario:DatosUsuario ,id: string,image?: FileI){

    this.filePath = `perfiles/${id}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            usuario.foto=urlImage;
            this.arquerosCollection.doc(id).update(usuario);
          });
        })
      ).subscribe();
  }

  busquedauser(cedula:string){
    this.arquerosCollection2 = this.db.collection<DatosUsuario>('alumnos', ref => ref.where('cedula', '==', cedula));
    this.arqueros2 = this.arquerosCollection2.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );
    return this.arqueros2;
  }
}

