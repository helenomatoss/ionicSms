import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'modal2',
    loadChildren: () => import('./modal2/modal2.module').then( m => m.Modal2PageModule)
  },
  {
    path: 'modal3',
    loadChildren: () => import('./modal3/modal3.module').then( m => m.Modal3PageModule)
  },
  {
    path: 'modal4',
    loadChildren: () => import('./modal4/modal4.module').then( m => m.Modal4PageModule)
  },
  {
    path: 'modal5',
    loadChildren: () => import('./modal5/modal5.module').then( m => m.Modal5PageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
