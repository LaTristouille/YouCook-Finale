import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  myRecette: string;
  addRecette: boolean;
  recettes = [];

  constructor(public afDB: AngularFireDatabase) {
    this.getRecettes();

  }
  addRecetteToFirebase(){
    console.log('myRecette:' + this.myRecette)
    this.afDB.list('Recettes/').push({
      ingredient: 'je suis un ingredient',
      detailRecette: this.myRecette,
      nutriscore: 'A',
      nom: 'Patatas bravas',
    });
    this.showForm();
  }

  showForm() {
this.addRecette = !this.addRecette;
this.myRecette = '';
  }

  getRecettes() {
    this.afDB.list('Recettes/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      actions.forEach(action =>{
        console.log(action.payload.exportVal().detailRecette);
        this.recettes.push({
          key: action.key,
          detailRecette: action.payload.exportVal().detailRecette, 
          ingredient: action.payload.exportVal().ingredient, 
          nom: action.payload.exportVal().nom, 
          nutriscore: action.payload.exportVal().nutriscore, 
        })
      });
    })
  }

}
