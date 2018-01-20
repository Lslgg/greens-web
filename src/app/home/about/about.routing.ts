import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AboutComponent } from './about.component';

export const AboutRoutes: Routes = [
  {
    path: 'about', component: AboutComponent, data: { title: '聊城韭菜', module: 'none', power: "none" },
  }
];

//一定要将路由加载的模块导出到主模块
export const AboutList = [
  AboutComponent
];

