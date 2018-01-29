import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AddMenulComponent } from './addMenul.component';

export const MenulRoutes: Routes = [
  { path: 'menul', component: AddMenulComponent, data: { title: '菜单管理', module: 'menul', power: "ADD" } },
  { path: 'menul/:id', component: AddMenulComponent, data: { title: '菜单管理', module: 'menul', power: "UPDATE" } },
];

//一定要将路由加载的模块导出到主模块
export const MenulList = [
  AddMenulComponent
];

