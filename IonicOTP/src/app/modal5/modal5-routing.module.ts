import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Modal5Page } from './modal5.page';

const routes: Routes = [
  {
    path: '',
    component: Modal5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Modal5PageRoutingModule {}
