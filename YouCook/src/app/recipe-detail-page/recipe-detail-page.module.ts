import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipeDetailPagePageRoutingModule } from './recipe-detail-page-routing.module';

import { RecipeDetailPagePage } from './recipe-detail-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeDetailPagePageRoutingModule
  ],
  declarations: [RecipeDetailPagePage]
})
export class RecipeDetailPagePageModule {}
