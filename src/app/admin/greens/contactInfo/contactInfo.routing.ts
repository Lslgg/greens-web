import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AddContactInfoComponent } from './addContactInfo.component';

export const ContactInfoRoutes: Routes = [
  { path: 'contactInfo', component: AddContactInfoComponent, data: { title: '联系信息', module: 'contactInfo', power: "ADD" } },
  { path: 'contactInfo/:id', component: AddContactInfoComponent, data: { title: '联系信息', module: 'contactInfo', power: "UPDATE" } },  
];

//一定要将路由加载的模块导出到主模块
export const ContactInfoList = [
  AddContactInfoComponent
];

