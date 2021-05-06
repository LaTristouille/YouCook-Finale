import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-recipe-detail-page',
  templateUrl: './recipe-detail-page.page.html',
  styleUrls: ['./recipe-detail-page.page.scss'],
})
export class RecipeDetailPagePage implements OnInit {

public prev_page:String='/list';

sub: any;

  constructor(private route: ActivatedRoute, private router: Router, ) {
this.route.params.subscribe(params=> {

  console.log('hello', params)
  if (params.special) {
    this.sub = JSON.parse(params.special);
    console.log(this.sub)
  }

  if(params.back){
    this.prev_page = params.back;
    console.log('hello')
  }
})

   }

  ngOnInit() {
  }

}
