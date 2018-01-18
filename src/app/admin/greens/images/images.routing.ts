import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ImagesComponent,AddImagesComponent } from './index';

export const ImagesRoutes: Routes = [
  { path: 'lcimg', component: ImagesComponent, data: { title: '图片列表', module: 'lcimg', power: "SHOW" } },
  { path: 'addlcimg', component: AddImagesComponent, data: { title: '添加图片', module: 'lcimg', power: "ADD" } },
  { path: 'addlcimg/:id', component: AddImagesComponent, data: { title: '修改图片', module: 'lcimg', power: "UPDATE" } },
  
];

//一定要将路由加载的模块导出到主模块
export const ImagesList = [
  ImagesComponent,    
  AddImagesComponent
];

