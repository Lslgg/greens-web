import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LcProductComponent } from './lcproduct.component';

export const LcProductRoutes: Routes = [
  {
    path: 'lcproduct', component: LcProductComponent, data: { title: '聊城韭菜', module: 'none', power: "none" },
  }
];

//一定要将路由加载的模块导出到主模块
export const LcProductList = [
  LcProductComponent
];

