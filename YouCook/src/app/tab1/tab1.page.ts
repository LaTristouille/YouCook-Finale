import { ConditionalExpr } from '@angular/compiler';
import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { DataProduct } from '../interfaces/data-product';
import { Recipe } from '../interfaces/recipe';
import {NavigationExtras, Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {FormPage} from '../form/form.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  myRecipe: string;
  myIngredientName: string;
  myIngredientQuantity: number;
  myName: string;
  myNutriscore: string;

  objRecipe: Recipe;
  addRecipe: boolean;
  recipes = [];


  constructor(public afDB: AngularFireDatabase, private router: Router, private modalController:ModalController ) {
    this.getRecipes();
    this.recipes.length = 0;
  }

  OpenModal()
    {
  this.modalController.create({component:FormPage}).then((modalElement)=>{
    modalElement.present();
  })
    }

  /*addRecipeToFirebase(){
    this.recipes.length = 0;

    console.log(this.recipes)
    this.afDB.list('Recipes/').push({
      ingredientName: this.myIngredientName,
      ingredientQuantity: this.myIngredientQuantity,
      detailRecipe: this.myRecipe,
      nutriscore: this.myNutriscore,
      name: this.myName,
    });
    this.showForm();
  }

  showForm() {
this.addRecipe = !this.addRecipe;
this.myRecipe = '';
this.myIngredientName='';
this.myIngredientQuantity=0;
this.myName ='';
this.myNutriscore ='';



  }*/

  getRecipes() {
    this.afDB.list('Recipes/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      actions.forEach(action =>{
       // console.log(action.payload.exportVal().detailRecette);
        this.recipes.push({
          key: action.key,
          detailRecipe: action.payload.exportVal().detailRecipe, 
          ingredientName: action.payload.exportVal().ingredientName, 
          ingredientName2: action.payload.exportVal().ingredientName2, 
          ingredientName3: action.payload.exportVal().ingredientName3, 
          ingredientName4: action.payload.exportVal().ingredientName4, 
          ingredientName5: action.payload.exportVal().ingredientName5, 

          ingredientQuantity: action.payload.exportVal().ingredientQuantity, 
          ingredientQuantity2: action.payload.exportVal().ingredientQuantity2, 
          ingredientQuantity3: action.payload.exportVal().ingredientQuantity3, 
          ingredientQuantity4: action.payload.exportVal().ingredientQuantity4, 
          ingredientQuantity5: action.payload.exportVal().ingredientQuantity5, 
          name: action.payload.exportVal().name, 
          note: action.payload.exportVal().note, 
        })
      });
    })
  }

  deleteRecipes(recipe: any) {
    console.log(recipe)
    this.recipes.length = 0;
    this.afDB.list('Recipes/').remove(recipe.key);
  }

    openRecipes(recipe : any)
  {
    console.log('recipe: ',recipe)
    this.router.navigate(['/recipe-detail-page', recipe]);
  }

}

