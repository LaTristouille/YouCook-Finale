import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeDetailPagePage } from './recipe-detail-page.page';

const routes: Routes = [
  {
    path: '',
    component: RecipeDetailPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeDetailPagePageRoutingModule {}
