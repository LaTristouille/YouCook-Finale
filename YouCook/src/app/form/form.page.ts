import {Component, OnInit} from '@angular/core';
import {ModalController, NavController, NavParams} from '@ionic/angular';
import {Recipe} from '../interfaces/recipe';
import {ConditionalExpr} from '@angular/compiler';
import {AngularFireDatabase} from '@angular/fire/database';
import {DataProduct} from '../interfaces/data-product';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner/ngx";
import {LoadJsonService} from '../services/load-json.service';
import {FormBuilder, FormArray, FormGroup, Validators} from '@angular/forms';


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


  myName: string;

  objRecipe: Recipe;
  addRecipe: boolean;
  recipes = [];

  scannedData: any;
  codeBar = null;
  codee = null;

  dataName: string = '';
  /**
   * @name form
   * @type {FormGroup}
   * @public
   * @description     Defines a FormGroup object for managing the template form
   */
  public form: FormGroup;

  /**
   * Generates a FormGroup object with input field validation rules for
   * the technologies form object
   *
   * @public
   * @method initTechnologyFields
   * @return {FormGroup}
   */
  initTechnologyFields(): FormGroup {
    return this._FB.group({
      ingredientName: this.productData.name,
      quantity: ['', Validators.required],
      nutriscore: this.productData.nutriscore,
    });
  }

  /**
   * Programmatically generates a new technology input field
   *
   * @public
   * @method addNewInputField
   * @return {none}
   */
  addNewInputField(): void {
    const control = <FormArray>this.form.controls.recipe;
    control.push(this.initTechnologyFields());

  }


  /**
   * Programmatically removes a recently generated technology input field
   *
   * @public
   * @method removeInputField
   * @param i    {number}      The position of the object in the array that needs to removed
   * @return {none}
   */
  removeInputField(i: number): void {
    const control = <FormArray>this.form.controls.recipe;
    control.removeAt(i);
  }


  /**
   * Receive the submitted form data
   *
   * @public
   * @method manage
   * @param val    {object}      The posted form data
   * @return {none}
   */
  manage(val: any): void {
    console.dir(val);
  }


  public productData: DataProduct = {
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
    private router: Router,
    public barcodeCtrl: BarcodeScanner,
    private route: ActivatedRoute,
    private loadJson: LoadJsonService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private _FB: FormBuilder) {

    this.form = this._FB.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      recipe: this._FB.array([
        this.initTechnologyFields()
      ])
    });
  }

  ngOnInit() {
  }

  CloseModal() {
    this.modalController.dismiss();
  }


  addRecipeToFirebase() {
    this.recipes.length = 0;

    console.log('addRecipeToFirebase -> this.productData', this.productData);

    this.recipes.push()
    console.log('addRecipeToFirebase 1er : ', this.recipes);
    this.afDB.list('Recipes/').push({
      ingredientName: this.productData.name,
      ingredientQuantity: this.myIngredientQuantity,
      nutriscore: this.productData.nutriscore,

      // ingredientName2: this.productData.name,
      // ingredientQuantity2: this.myIngredientQuantity2,
      // nutriscore2: this.productData.nutriscore,


      detailRecipe: this.myRecipe,
      name: this.myName,
    });
    //console.log('addRecipeToFirebase 2e : ', this.recipes);
  }

  code() {
    this.codee = this.scannedData.productData;
  }

  goToBarcodeScan(id :number) {

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
      this.codeBar = Number(barcodeData.text);
      this.route.params.subscribe(params => {
        if (params.codeBar) {
          this.codeBar = params.codeBar;
        }
        this.getProduct(id);
      });

    }).catch(err => {
      console.log('Error', err);
    });
    this.code();
  }


  public getProduct(id : number) {
    const url = `https://world.openfoodfacts.org/api/v0/product/${this.codeBar}.json`;
    this.loadJson.getJSON(url).subscribe(data => this.handleData(data,id));
  }

  public handleData(data: any,id: number) {
    console.log(`handleData : `, data);

    if (data.product.generic_name_it == null) {
      this.dataName = data.product.brands;
    } else {
      this.dataName = data.product.generic_name_it;
    }

    this.productData = {
      codeBar: data.code,
      name: this.dataName,
      image: data.product.image_front_url,
      nutriscore: data.product.nutrition_grade_fr,
      nutriscoreNote: data.product.nutriscore_score,
      allergen: data.product.allergens_from_user

    };
    this.form.controls.recipe[id]
    console.log(this.form.controls.recipe[id])
    console.log('handleData -> this.productData', this.productData);
  }

  /*calculRecipeNutriscore(quantity, note) {
    ponderationQuantity = (quantity * note) / 100;
    noteRecipe =
  }*/

}
