import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFindPageRoutes, NotFindPageComponentList } from '../component/404/notFindPage.routing';
import { HomeComponent } from './home.component';
import { IndexRoutes, IndexList } from './index/index.routing';
import { AboutRoutes, AboutList } from './about/about.routing';
import { LcProductRoutes, LcProductList } from './lcproduct/lcproduct.routing';
import { NewsList, NewsRoutes } from './news/news.routing';
import { GardenList, GardenRoutes } from './garden/garden.routing';
import { JoinRoutes, JoinList } from './join/join.routing';
import { ContactList, ContactRoutes } from './contact/contact.routing';


var routes: Routes = [];

routes = routes.concat(IndexRoutes);
routes = routes.concat(AboutRoutes);
routes = routes.concat(LcProductRoutes);
routes = routes.concat(NewsRoutes);
routes = routes.concat(JoinRoutes);
routes = routes.concat(ContactRoutes);
routes = routes.concat(GardenRoutes);
//错误页面请放最后
routes = routes.concat(NotFindPageRoutes);

export var routeList: Routes = [
  {
    path: '',
    component: HomeComponent, data: { title: '聊城韭菜' },
    children: routes
  }
];


@NgModule({
  imports: [RouterModule.forChild(routeList)],
  exports: [RouterModule]
})


export class HomeRoutingModule { }

//一定要将路由加载的模块导出到home.module模块
export const ComponentList = [
  HomeComponent,
  IndexList,
  AboutList,
  LcProductList,
  NewsList,
  GardenList,
  JoinList,
  ContactList,
  NotFindPageComponentList
]
