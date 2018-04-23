import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { GardenComponent } from './garden.component';
import { AddGardenComponent } from './component/addGarden.component';

export const GardenRoutes: Routes = [
  { path: 'gardenm', component: GardenComponent, data: { title: '韭园风采', module: 'gardenm', power: "SHOW" } },
  { path: 'addGardenm', component: AddGardenComponent, data: { title: '添加韭园风采', module: 'gardenm', power: "ADD" } },
  { path: 'addGardenm/:id', component: AddGardenComponent, data: { title: '修改韭园风采', module: 'gardenm', power: "UPDATE" } },
];

//一定要将路由加载的模块导出到主模块
export const GardenList = [
  GardenComponent,
  AddGardenComponent
];

