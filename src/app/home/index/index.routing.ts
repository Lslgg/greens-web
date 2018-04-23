import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { SproductComponent } from './sproduct/sproduct.component';
import { SgardenComponent } from './sgarden/sgarden.component';
import { SaboutComponent } from './sabout/sabout.component';
import { SjoinComponent } from './sjoin/sjoin.component';

import { NewsBriefComponent,SnavComponent } from './components';


export const IndexRoutes: Routes = [
  // { path: '', component: IndexComponent, data: { title: '聊城韭菜', module: 'none', power: "none" } },
  { path: '', redirectTo: '/home/index/sproduct', pathMatch: 'full', },
  {
    path: 'index', component: IndexComponent, data: { title: '聊城韭菜', module: 'none', power: "none" },
    children: [
      {
        path: '',
        component: SproductComponent,
        data: { title: '聊城韭菜', module: 'none', power: "none" }
      },
      {
        path: 'sproduct',
        component: SproductComponent,
        data: { title: '聊城韭菜', module: 'none', power: "none" }
      },
      {
        path: 'sgarden',
        component: SgardenComponent,
        data: { title: '聊城韭菜', module: 'none', power: "none" }
      },
      {
        path: 'sabout',
        component: SaboutComponent,
        data: { title: '聊城韭菜', module: 'none', power: "none" }
      },
      {
        path: 'sjoin',
        component: SjoinComponent,
        data: { title: '聊城韭菜', module: 'none', power: "none" }
      },
    ]
  }
];

//一定要将路由加载的模块导出到主模块
export const IndexList = [
  IndexComponent,
  SproductComponent,
  SgardenComponent,
  SaboutComponent,
  SjoinComponent,
  NewsBriefComponent,
  SnavComponent
];

