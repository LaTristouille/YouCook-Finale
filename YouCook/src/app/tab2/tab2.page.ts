import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadJsonService } from '../services/load-json.service';
import { DataProduct } from '../interfaces/data-product';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public codeBar = 3017620422003;
  public productData: DataProduct = {
    codeBar: -1,
    name: '',
    image: '',
    nutriscore: '',
    allergen: ''
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private loadJson: LoadJsonService) {
    this.route.params.subscribe(params => {
      if (params.codeBar) {
        this.codeBar = params.codeBar;
      }
      this.getProduct();
    });
  }

  public getProduct() {
    const url = `https://world.openfoodfacts.org/api/v0/product/${this.codeBar}.json`;
    this.loadJson.getJSON(url).subscribe(data => this.handleData(data));
  }

  public handleData(data: any) {
    console.log(data);
    this.productData = {
      codeBar: data.code,
      name: data.product.generic_name_it,
      image: data.product.image_front_url,
      nutriscore: data.product.nutrition_grade_fr,
      allergen: data.product.allergens_from_user
    };
    //console.log(this.productData);
  }

}
