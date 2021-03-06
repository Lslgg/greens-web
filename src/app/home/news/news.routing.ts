import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NewsComponent } from './news.component';
import { NewsDetailComponent } from './components/newsDetail.component';

export const NewsRoutes: Routes = [
  {
    path: 'news', component: NewsComponent, data: { title: '聊城韭菜', module: 'none', power: "none" }
  },
  {
    path: 'news/:index', component: NewsComponent, data: { title: '聊城韭菜', module: 'none', power: "none" }
  },
  {
    path: 'news/:index/:title', component: NewsComponent, data: { title: '聊城韭菜', module: 'none', power: "none" }
  },
  {
    path: 'snews/:index/:title', component: NewsComponent, data: { title: '聊城韭菜', module: 'none', power: "none" }
  },
  {
    path: 'newsDetail/:id', component: NewsDetailComponent, data: { title: '聊城韭菜', module: 'none', power: "none" },
  },
  {
    path: 'snewsDetail/:id', component: NewsDetailComponent, data: { title: '聊城韭菜', module: 'none', power: "none" },
  }
];

//一定要将路由加载的模块导出到主模块
export const NewsList = [
  NewsComponent,
  NewsDetailComponent
];

