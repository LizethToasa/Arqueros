import { Injectable } from '@angular/core';
import { DatosEntrenador } from '../interfaces/entrenador.interface';
import { Horario } from '../interfaces/horario.interface';
import { Avance } from '../interfaces/avance.interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { FileI } from '../interfaces/file.interface';
import * as firebase from 'firebase';
import { Ficha } from '../interfaces/ficha.interface';

@Injectable({
  providedIn: 'root'
})
export class EntrenadorService {
  private entrenadoresCollection: AngularFirestoreCollection<DatosEntrenador>;
  private entrenadores: Observable<DatosEntrenador[]>;
  private entrenadoresCollection2: AngularFirestoreCollection<DatosEntrenador>;
  private entrenadores2: Observable<DatosEntrenador[]>;
  private horarioCollection: AngularFirestoreCollection<Horario>;
  private horario: Observable<Horario[]>;
  private horarioCollection2: AngularFirestoreCollection<Horario>;
  private horario2: Observable<Horario[]>;
  private avanceCollection: AngularFirestoreCollection<Avance>;
  private avance: Observable<Avance[]>;
  private avanceCollection2: AngularFirestoreCollection<Avance>;
  private avance2: Observable<Avance[]>;
  private fichaCollection: AngularFirestoreCollection<Ficha>;
  private ficha: Observable<Ficha[]>;
  private fichaCollection2: AngularFirestoreCollection<Ficha>;
  private ficha2: Observable<Ficha[]>;
  public photoURL = null;
  private filePath: string;
  constructor(
    private db:AngularFirestore, private storage: AngularFireStorage ,public afDB: AngularFireDatabase
  ) { 
    this.entrenadoresCollection = db.collection<DatosEntrenador>('entrenadores');
    this.entrenadores = this.entrenadoresCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );

    this.horarioCollection = db.collection<Horario>('horarios');
    this.horario = this.horarioCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );
    this.avanceCollection = db.collection<Avance>('avances');
    this.avance = this.avanceCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );
    this.fichaCollection = db.collection<Ficha>('ficha');
    this.ficha = this.fichaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );
  }

  getAvancefecha(){
    this.avanceCollection2 = this.db.collection<Avance>('avances', ref => ref.orderBy('fecha2', "desc"));
    this.avance2 = this.avanceCollection2.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );
    return this.avance2;
  }

  addFicha(ficha: Ficha){
    return this.fichaCollection.add(ficha);
  }
  getFicha(iduser:string){
    this.fichaCollection2 = this.db.collection<Ficha>('ficha', ref => ref.where('idarquero', '==', iduser));
    this.ficha2 = this.fichaCollection2.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );
    return this.ficha2;
  }

  getAvance(id: string){
    return this.avanceCollection.doc<Avance>(id).valueChanges();
  }

  updateAvance(todo:Avance, id: string){
    return this.avanceCollection.doc(id).update(todo);
  }
  
  addAvance(todo: Avance){
    return this.avanceCollection.add(todo);
  }
  
  removeAvance(id: string){
    return this.avanceCollection.doc(id).delete();
  }

  getHorarios(){
    return this.horario;
  }

  getHoario(id: string){
    return this.horarioCollection.doc<Horario>(id).valueChanges();
  }

  updateHorario(todo:Horario, id: string){
    return this.horarioCollection.doc(id).update(todo);
  }
  
  addHorario(todo: Horario){
    return this.horarioCollection.add(todo);
  }

  removeHorario(id: string){
    return this.horarioCollection.doc(id).delete();
  }

  getHorariosactual(iduser:string, fec:string){
    this.horarioCollection2 = this.db.collection<Horario>('horarios', ref => ref.where('idusuario', '==', iduser).where('fecha', '==', fec));
    this.horario2 = this.horarioCollection2.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );
    return this.horario2;
  }
  getHorarioentrena(){
    this.horarioCollection2 = this.db.collection<Horario>('horarios', ref =>ref.orderBy('fecha2', "desc"));
    this.horario2 = this.horarioCollection2.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );
    return this.horario2;
  }

  getactivos(){

    this.entrenadoresCollection2 = this.db.collection<DatosEntrenador>('entrenadores', ref => ref.where('estado', '==', 'Activo'));
    this.entrenadores2 = this.entrenadoresCollection2.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );
    return this.entrenadores2;
  }

  getEntrenadores(){
    return this.entrenadores;
  }
  getEntrenador(id: string){
    return this.entrenadoresCollection.doc<DatosEntrenador>(id).valueChanges();
  }

  updateEntrenador(usuario:DatosEntrenador, id: string){
    return this.entrenadoresCollection.doc(id).update(usuario);
  }

  updateImagen(usuario:DatosEntrenador,id: string,image?: FileI){

    this.filePath = `perfiles/${id}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            usuario.foto=urlImage;
            this.entrenadoresCollection.doc(id).update(usuario);
          });
        })
      ).subscribe();

    
  }
}
