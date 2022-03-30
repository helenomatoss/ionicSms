import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Modal4Page } from './modal4.page';

const routes: Routes = [
  {
    path: '',
    component: Modal4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Modal4PageRoutingModule {}
