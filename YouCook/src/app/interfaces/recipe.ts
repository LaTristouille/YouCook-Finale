import { DataProduct } from "./data-product";

export interface Recipe {
    recetteDetail: string;
    ingredient: DataProduct["name"];
    name: string;
    nutriscore: string;
}
