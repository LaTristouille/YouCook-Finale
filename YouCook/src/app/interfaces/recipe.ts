import { DataProduct } from "./data-product";

export interface Recipe {
    recepeDetail: string;
    ingredient: DataProduct["name"];
    name: string;
    nutriscore: string;
}
