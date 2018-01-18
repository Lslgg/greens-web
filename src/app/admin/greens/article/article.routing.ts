import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ArticleComponent } from './index';
import { AddArticleComponent } from './component/addArticle.component';

export const ArticleRoutes: Routes = [
  { path: 'lcarticle', component: ArticleComponent, data: { title: '文章列表', module: 'lcarticle', power: "SHOW" } },
  { path: 'addlcarticle', component: AddArticleComponent, data: { title: '添加文章', module: 'lcarticle', power: "ADD" } },
  { path: 'addlcarticle/:id', component: AddArticleComponent, data: { title: '修改文章', module: 'lcarticle', power: "UPDATE" } },

];

//一定要将路由加载的模块导出到主模块
export const ArticleList = [
  ArticleComponent,
  AddArticleComponent
];

