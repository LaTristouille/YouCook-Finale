import { ConditionalExpr } from '@angular/compiler';
import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { DataProduct } from '../interfaces/data-product';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  myRecipe: string;
  myIngredient: string;
  myName: string;
  myNutriscore: string;

  addRecipe: boolean;
  recipes = [];

  constructor(public afDB: AngularFireDatabase) {

    this.getRecipes();

  }
  addRecipeToFirebase(){
    this.recipes.length = 0;

    console.log(this.recipes)
    this.afDB.list('Recipes/').push({
      ingredient: this.myIngredient,
      detailRecipe: this.myRecipe,
      nutriscore: this.myNutriscore,
      name: this.myName,
    });
    this.showForm();
  }

  showForm() {
this.addRecipe = !this.addRecipe;
this.myRecipe = '';
this.myIngredient='';
this.myName ='';
this.myNutriscore ='';
  }

  getRecipes() {
    this.afDB.list('Recipes/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      actions.forEach(action =>{
       // console.log(action.payload.exportVal().detailRecette);
        this.recipes.push({
          key: action.key,
          detailRecipe: action.payload.exportVal().detailRecipe, 
          ingredient: action.payload.exportVal().ingredient, 
          name: action.payload.exportVal().name, 
          nutriscore: action.payload.exportVal().nutriscore, 
        })
      });
    })
  }

  deleteRecipes(recipes: any) {
    this.recipes.length = 0;
    this.afDB.list('Recipes/').remove(recipes.key);
  }

}
