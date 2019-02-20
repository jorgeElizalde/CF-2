import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FireServiceService {
  private itemsCollection: AngularFirestoreCollection<any>;
  public events=[];
  constructor(private afs: AngularFirestore) { }

  cargarEventos() {
    this.itemsCollection = this.afs.collection<any>('events');
    return this.itemsCollection.valueChanges()
  }

  getUserEvents(uid) {
    this.itemsCollection = this.afs.collection<any>('events', ref => ref.where("uid", "==", uid));
    return this.itemsCollection.valueChanges();
  }

  createEvent(formulario) {
    console.log(formulario);
    return this.itemsCollection.add(formulario);
  }
}
