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
      ingredientName:params.ingredientName,
      ingredientQuantity:params.ingredientQuantity,
      name:  params.name,
      nutriscore:params.nutriscore}
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
