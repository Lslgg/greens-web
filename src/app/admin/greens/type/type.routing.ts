import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { TypeComponent, AddTypeComponent } from './index';

export const TypeRoutes: Routes = [
  { path: 'lctype', component: TypeComponent, data: { title: '类别列表', module: 'lctype', power: "SHOW" } },
  { path: 'addlctype', component: AddTypeComponent, data: { title: '添加类别', module: 'lctype', power: "ADD" } },
  { path: 'addlctype/:id', component: AddTypeComponent, data: { title: '修改类别', module: 'lctype', power: "UPDATE" } },

];

//一定要将路由加载的模块导出到主模块
export const TypeList = [
  TypeComponent,
  AddTypeComponent
];

