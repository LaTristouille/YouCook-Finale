import { DataProduct } from "./data-product";
import { Ingredient } from "./ingredient";


export interface Recipe {
    recipeDetail: string;
    ingredientName: Ingredient['name'];
    ingredientName2: Ingredient['name'];
    ingredientQuantity: Ingredient['quantity'];
    ingredientQuantity2: Ingredient['quantity'];
    ingredientNutriscore: Ingredient['nutriscore'];
    ingredientNutriscore2: Ingredient['nutriscore'];
    name: string;
}
