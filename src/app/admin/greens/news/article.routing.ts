import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { lcNewsComponent, AddlcNewsComponent } from './index';

export const lcNewsRoutes: Routes = [
  { path: 'lcnews', component: lcNewsComponent, data: { title: '新闻列表', module: 'lcnews', power: "SHOW" } },
  { path: 'addlcnews', component: AddlcNewsComponent, data: { title: '添加新闻', module: 'lcnews', power: "ADD" } },
  { path: 'addlcnews/:id', component: AddlcNewsComponent, data: { title: '修改新闻', module: 'lcnews', power: "UPDATE" } },

];

//一定要将路由加载的模块导出到主模块
export const lcNewsList = [
  lcNewsComponent,
  AddlcNewsComponent
];

