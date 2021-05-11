import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { Recipe } from '../interfaces/recipe';
import { ConditionalExpr } from '@angular/compiler';
import { AngularFireDatabase } from '@angular/fire/database';
import { DataProduct } from '../interfaces/data-product';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner/ngx";
import {LoadJsonService} from '../services/load-json.service';
import { LoadingController, AlertController } from '@ionic/angular';


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
  myIngredientQuantity2: number=0;
  myNutriscore2: string;

  myIngredientName3: string;
  myIngredientQuantity3: number=0;
  myNutriscore3: string;

  myIngredientName4: string;
  myIngredientQuantity4: number=0;
  myNutriscore4: string;

  myIngredientName5: string;
  myIngredientQuantity5: number=0;
  myNutriscore5: string;

  myName: string;

  objRecipe: Recipe;
  addRecipe: boolean;
  recipes = [];

  scannedData: any;
  codeBar = null ;
  codee = null;

  dataName : string = '';

  public productData: DataProduct = {
    codeBar: 1,
    name: '',
    image: '',
    nutriscore: '',
    nutriscoreNote: -1,
    allergen: ''
  };
  
  public productData2: DataProduct = {
    codeBar: 1,
    name: '',
    image: '',
    nutriscore: '',
    nutriscoreNote: -1,
    allergen: ''
  };

  public productData3: DataProduct = {
    codeBar: 1,
    name: '',
    image: '',
    nutriscore: '',
    nutriscoreNote: -1,
    allergen: ''
  };

  public productData4: DataProduct = {
    codeBar: 1,
    name: '',
    image: '',
    nutriscore: '',
    nutriscoreNote: -1,
    allergen: ''
  };

  public productData5: DataProduct = {
    codeBar: 1,
    name: '',
    image: '',
    nutriscore: '',
    nutriscoreNote: -1,
    allergen: ''
  };

  constructor(
    private modalController: ModalController,
    public afDB: AngularFireDatabase,
  
    public barcodeCtrl: BarcodeScanner,
    private route: ActivatedRoute,
    private loadJson: LoadJsonService,
    public loadingController: LoadingController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
  }
  CloseModal(){
    this.modalController.dismiss();
  }
  noteRecette: any;

  addRecipeToFirebase(){

    console.log('addRecipeToFirebase -> this.productData', this.productData, this.productData2);

this.noteRecette = ((this.productData.nutriscoreNote*this.myIngredientQuantity)/100)
+((this.productData2.nutriscoreNote*this.myIngredientQuantity2)/100)
+((this.productData3.nutriscoreNote*this.myIngredientQuantity3)/100)
+((this.productData4.nutriscoreNote*this.myIngredientQuantity4)/100)
+((this.productData5.nutriscoreNote*this.myIngredientQuantity5)/100);

if (this.noteRecette < -2  ){ this.noteRecette= 'A'} 
else if (this.noteRecette < 3 ) { this.noteRecette= 'B'} 
else if (this.noteRecette < 11 ){this.noteRecette='C'} 
else if (this.noteRecette < 16) {this.noteRecette='D'}
else {this.noteRecette='E'}

    console.log('Note de la recette', this.noteRecette)
    this.afDB.list('Recipes/').push({
      ingredientName: this.productData.name,
      ingredientQuantity: this.myIngredientQuantity,
      nutriscore: this.productData.nutriscore,
      nutriscoreNote: this.productData.nutriscoreNote,

      ingredientName2: this.productData2.name,
      ingredientQuantity2: this.myIngredientQuantity2,
      nutriscore2: this.productData2.nutriscore,
      nutriscoreNote2: this.productData2.nutriscoreNote,

      ingredientName3: this.productData3.name,
      ingredientQuantity3: this.myIngredientQuantity3,
      nutriscore3: this.productData3.nutriscore,
      nutriscoreNote3: this.productData3.nutriscoreNote,

      ingredientName4: this.productData4.name,
      ingredientQuantity4: this.myIngredientQuantity4,
      nutriscore4: this.productData4.nutriscore,
      nutriscoreNote4: this.productData4.nutriscoreNote,

      ingredientName5: this.productData5.name,
      ingredientQuantity5: this.myIngredientQuantity5,
      nutriscore5: this.productData5.nutriscore,
      nutriscoreNote5: this.productData5.nutriscoreNote,

      detailRecipe: this.myRecipe,
      name: this.myName,
      note: this.noteRecette
    });


    console.log('addRecipeToFirebase 2e : ', this.recipes);
  }

  code() {
    if (this.productData.name == null){
    this.codee= this.scannedData.productData;
  }
  else if (this.productData2.name == null) {  this.codee= this.scannedData.productData2;}
  else if (this.productData3.name == null) {  this.codee= this.scannedData.productData3;}
  else if (this.productData4.name == null) {  this.codee= this.scannedData.productData4;}
  else if (this.productData5.name == null) {  this.codee= this.scannedData.productData5;}
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

  public getProduct() {
    const url = `https://world.openfoodfacts.org/api/v0/product/${this.codeBar}.json`;
    this.loadJson.getJSON(url).subscribe(data => this.handleData(data));
  }

  public handleData(data: any) {
    console.log(`handleData : `, data);

    if (data.product.generic_name_it == null) {
      this.dataName = data.product.brands;
    } else {
      this.dataName = data.product.generic_name_it;
    }

    if (this.productData.name == ''){
      console.log('mon productData 1 est null')
    this.productData = {
      codeBar: data.code,
      name: this.dataName,
      image: data.product.image_front_url,
      nutriscore: data.product.nutrition_grade_fr,
      nutriscoreNote: data.product.nutriscore_score,
      allergen: data.product.allergens_from_user
    };}
else  if (this.productData2.name == ''){
  console.log('mon productData 2 est null')
  this.productData2 = {
    codeBar: data.code,
    name: this.dataName,
    image: data.product.image_front_url,
    nutriscore: data.product.nutrition_grade_fr,
    nutriscoreNote: data.product.nutriscore_score,
    allergen: data.product.allergens_from_user
  }}
  else if (this.productData3.name == ''){
    console.log('mon productData 3 est null')
    this.productData3 = {
      codeBar: data.code,
      name: this.dataName,
      image: data.product.image_front_url,
      nutriscore: data.product.nutrition_grade_fr,
      nutriscoreNote: data.product.nutriscore_score,
      allergen: data.product.allergens_from_user
    }}
    else if (this.productData4.name == ''){
      console.log('mon productData 4 est null')
      this.productData4 = {
        codeBar: data.code,
        name: this.dataName,
        image: data.product.image_front_url,
        nutriscore: data.product.nutrition_grade_fr,
        nutriscoreNote: data.product.nutriscore_score,
        allergen: data.product.allergens_from_user
      }}
      else  if (this.productData5.name == ''){
        console.log('mon productData 5 est null')
        this.productData5 = {
          codeBar: data.code,
          name: this.dataName,
          image: data.product.image_front_url,
          nutriscore: data.product.nutrition_grade_fr,
          nutriscoreNote: data.product.nutriscore_score,
          allergen: data.product.allergens_from_user
        };
}

    console.log('handleData -> this.productData', this.productData);
  }

}
