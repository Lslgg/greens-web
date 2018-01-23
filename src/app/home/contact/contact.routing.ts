import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ContactComponent } from './contact.component';

export const ContactRoutes: Routes = [
  {
    path: 'contactus', component: ContactComponent, data: { title: '聊城韭菜', module: 'none', power: "none" },
  }
];

//一定要将路由加载的模块导出到主模块
export const ContactList = [
  ContactComponent
];

