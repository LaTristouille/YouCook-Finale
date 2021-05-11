import { DataProduct } from "./data-product";
import { Ingredient } from "./ingredient";


export interface Recipe {
    recipeDetail: string;
    ingredientName: Ingredient['name'];
    ingredientName2: Ingredient['name'];
    ingredientName3: Ingredient['name'];
    ingredientName4: Ingredient['name'];
    ingredientName5: Ingredient['name'];
    ingredientQuantity: Ingredient['quantity'];
    ingredientQuantity2: Ingredient['quantity'];
    ingredientQuantity3: Ingredient['quantity'];
    ingredientQuantity4: Ingredient['quantity'];
    ingredientQuantity5: Ingredient['quantity'];
    ingredientNutriscore: Ingredient['nutriscore'];
    ingredientNutriscore2: Ingredient['nutriscore'];
    ingredientNutriscore3: Ingredient['nutriscore'];
    ingredientNutriscore4: Ingredient['nutriscore'];
    ingredientNutriscore5: Ingredient['nutriscore'];
    note: number;
    name: string;
}
