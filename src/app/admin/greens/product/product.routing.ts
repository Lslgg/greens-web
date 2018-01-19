import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ProductComponent,AddProductComponent} from './index';

export const ProductRoutes: Routes = [
  { path: 'lcproduct', component: ProductComponent, data: { title: '产品列表', module: 'lcproduct', power: "SHOW" } },
  { path: 'addlcproduct', component: AddProductComponent, data: { title: '添加产品', module: 'lcproduct', power: "ADD" } },
  { path: 'addlcproduct/:id', component: AddProductComponent, data: { title: '修改产品', module: 'lcproduct', power: "UPDATE" } },  
];

//一定要将路由加载的模块导出到主模块
export const ProductList = [
  ProductComponent,    
  AddProductComponent
];

