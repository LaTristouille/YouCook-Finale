import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { Recipe } from '../interfaces/recipe';
import { ConditionalExpr } from '@angular/compiler';
import { AngularFireDatabase } from '@angular/fire/database';
import { DataProduct } from '../interfaces/data-product';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import { LoadJsonService } from '../services/load-json.service';
import {BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner/ngx';


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

  scanActive = false;
  scannedData: any;
  codeBar = null ;
  codee = null;

  public productData: DataProduct = {
    codeBar: 1,
    name: '',
    image: '',
    nutriscore: '',
    allergen: ''
  };

  constructor(private modalController:ModalController, public afDB: AngularFireDatabase,public barcodeCtrl: BarcodeScanner,private router: Router,
    private loadJson: LoadJsonService,   private route: ActivatedRoute ) { }

    code() {
      this.codee= this.scannedData.productData;
    }

  ngOnInit() {
  }
  CloseModal(){
    this.modalController.dismiss();
  }

  addRecipeToFirebase(){

    console.log(this.recipes)
    this.afDB.list('Recipes/').push({
      ingredientName: this.productData.name,
      ingredientQuantity: this.myIngredientQuantity,
      nutriscore: this.productData.nutriscore,

      ingredientName2: this.productData.name,
      ingredientQuantity2: this.myIngredientQuantity2,
      nutriscore2: this.productData.nutriscore,


      detailRecipe: this.myRecipe,
      name: this.myName,
    });
    console.log(this.recipes)

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

  goToBarcodeScan() {

    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'placer le code bar dans la zone de scane',
      resultDisplayDuration: 3000,
      formats: 'DATA_MATRIX,UPC_E,UPC_A,EAN_8,EAN_13,CODE_128,CODE_39,CODE_39,CODE_93,CODABAR,ITF,RSS14,RSS_EXPANDED,PDF_417,AZTEC,MSI',
      orientation: 'portrait',
      disableSuccessBeep: false,
    };

    this.barcodeCtrl.scan(options).then(barcodeData => {
      console.log('Barcode data', barcodeData.text);
      this.codeBar= Number(barcodeData.text);
      this.route.params.subscribe(params => {
        if (params.codeBar) {
          this.codeBar = params.codeBar;
        }
        this.getProduct();
      });

    }).catch(err => {
      console.log('Error', err);
    });
    this.code();
  }

}
