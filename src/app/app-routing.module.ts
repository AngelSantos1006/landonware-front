import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
const routes: Routes = [
  {path: '' , redirectTo: 'list-products' , pathMatch: 'full'},
  {path: 'list-products' , component: ListProductsComponent},
  {path: 'create-product' , component: CreateProductComponent },
  {path: '**' , redirectTo: 'list-products' , pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
