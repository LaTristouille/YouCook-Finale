import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { Recipe } from '../interfaces/recipe';
import { ConditionalExpr } from '@angular/compiler';
import { AngularFireDatabase } from '@angular/fire/database';
import { DataProduct } from '../interfaces/data-product';
import {NavigationExtras, Router} from '@angular/router';


@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  myRecipe: string;
  myIngredientName: string;
  myIngredientQuantity: number;
  myNutriscore: string;

  myIngredientName2: string;
  myIngredientQuantity2: number;
  myNutriscore2: string;

  myName: string;

  objRecipe: Recipe;
  addRecipe: boolean;
  recipes = [];

  constructor(private modalController:ModalController, public afDB: AngularFireDatabase, private router: Router ) { }

  ngOnInit() {
  }
  CloseModal(){
    this.modalController.dismiss();
  }

  addRecipeToFirebase(){
    this.recipes.length = 0;

    console.log(this.recipes)
    this.afDB.list('Recipes/').push({
      ingredientName: this.myIngredientName,
      ingredientQuantity: this.myIngredientQuantity,
      nutriscore: this.myNutriscore,

      ingredientName2: this.myIngredientName,
      ingredientQuantity2: this.myIngredientQuantity,
      nutriscore2: this.myNutriscore,


      detailRecipe: this.myRecipe,
      name: this.myName,
    });
    console.log(this.recipes)

  }

}
