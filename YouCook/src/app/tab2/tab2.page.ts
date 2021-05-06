import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadJsonService } from '../services/load-json.service';
import { DataProduct } from '../interfaces/data-product';
import {BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  scanActive = false;
  scannedData: any;
  public codeBar = 3017620422003;
  public productData: DataProduct = {
    codeBar: -1,
    name: '',
    image: '',
    nutriscore: '',
    allergen: ''
  };

  constructor(public barcodeCtrl: BarcodeScanner,private router: Router,
              private route: ActivatedRoute,
              private loadJson: LoadJsonService) {
    this.route.params.subscribe(params => {
      if (params.codeBar) {
        this.codeBar = params.codeBar;
      }
      this.getProduct();
    });
  }

  async goToBarcodeScan() {

    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'placer le code bar dans la zeone de scane',
      resultDisplayDuration: 3000,
      formats: 'DATA_MATRIX,UPC_E,UPC_A,EAN_8,EAN_13,CODE_128,CODE_39,CODE_39,CODE_93,CODABAR,ITF,RSS14,RSS_EXPANDED,PDF_417,AZTEC,MSI',
      orientation: 'portrait',
    };

    this.barcodeCtrl.scan(options).then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scannedData = barcodeData;

    }).catch(err => {
      console.log('Error', err);
    });
  }

  stopScan() {
    this.scanActive = false;
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
