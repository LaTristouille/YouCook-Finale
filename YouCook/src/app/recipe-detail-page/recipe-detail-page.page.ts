import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Recipe } from '../interfaces/recipe';

@Component({
  selector: 'app-recipe-detail-page',
  templateUrl: './recipe-detail-page.page.html',
  styleUrls: ['./recipe-detail-page.page.scss'],
})
export class RecipeDetailPagePage implements OnInit {

public prev_page:String='/list';

myObjRecipe: Recipe 

  constructor(private route: ActivatedRoute, private router: Router, ) {
this.route.params.subscribe(params=> {

  console.log('hello', params)
  if (params) {
     this.myObjRecipe = {  recipeDetail: params.detailRecipe,
      ingredientNutriscore:params.nutriscore,
      ingredientNutriscore2:params.nutriscore2,
      ingredientNutriscore3:params.nutriscore3,
      ingredientNutriscore4:params.nutriscore4,
      ingredientNutriscore5:params.nutriscore5,
      ingredientName:params.ingredientName,
      ingredientName2:params.ingredientName2,
      ingredientName3:params.ingredientName3,
      ingredientName4:params.ingredientName4,
      ingredientName5:params.ingredientName5,
      ingredientQuantity:params.ingredientQuantity,
      ingredientQuantity2:params.ingredientQuantity2,
      ingredientQuantity3:params.ingredientQuantity3,
      ingredientQuantity4:params.ingredientQuantity4,
      ingredientQuantity5:params.ingredientQuantity5,
      name:  params.name,
     note: params.note}
    console.log(this.myObjRecipe)
  }

  if(params.back){
    this.prev_page = params.back;
    console.log('hello')
  }
})

   }

  ngOnInit() {
  }

}
