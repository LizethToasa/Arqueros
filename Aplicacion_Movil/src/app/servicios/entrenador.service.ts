import { Injectable } from '@angular/core';
import { DatosEntrenador } from '../interfaces/entrenador.interface';
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
export class EntrenadorService {
  private entrenadoresCollection: AngularFirestoreCollection<DatosEntrenador>;
  private entrenadores: Observable<DatosEntrenador[]>;
  public photoURL = null;
  private filePath: string;
  constructor(
    db:AngularFirestore, private storage: AngularFireStorage ,public afDB: AngularFireDatabase
  ) { 
    this.entrenadoresCollection = db.collection<DatosEntrenador>('alumnos');
    this.entrenadores = this.entrenadoresCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
        
          return {id, ...data};
        });
      })
    );
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
