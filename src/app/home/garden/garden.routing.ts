import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { GardenComponent } from './garden.component';
import { PicBoxComponent } from './picbox/picbox.component';
import { PicRowComponent } from './picrow/picrow.component';

export const GardenRoutes: Routes = [
  {
    path: 'garden', component: GardenComponent, data: { title: '聊城韭菜', module: 'none', power: "none" },
  },
  {
    path: 'garden/:id', component: PicRowComponent, data: { title: '聊城韭菜', module: 'none', power: "none" },
  },
];

//一定要将路由加载的模块导出到主模块
export const GardenList = [
  GardenComponent,
  PicBoxComponent,
  PicRowComponent
];

