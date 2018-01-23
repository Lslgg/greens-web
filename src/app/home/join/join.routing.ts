import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { JoinComponent } from './join.component';

export const JoinRoutes: Routes = [
  {
    path: 'joinus', component: JoinComponent, data: { title: '聊城韭菜', module: 'none', power: "none" },
  }
];

//一定要将路由加载的模块导出到主模块
export const JoinList = [
  JoinComponent
];

