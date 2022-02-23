import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Modal3Page } from './modal3.page';

const routes: Routes = [
  {
    path: '',
    component: Modal3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Modal3PageRoutingModule {}
