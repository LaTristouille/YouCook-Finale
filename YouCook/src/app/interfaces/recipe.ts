import { DataProduct } from "./data-product";
import { Ingredient } from "./ingredient";


export interface Recipe {
    recipeDetail: string;
    ingredientName: Ingredient['name'];
    ingredientQuantity: Ingredient['quantity'];
    ingredientNutriscore: Ingredient['nutriscore'];
    name: string;
}
