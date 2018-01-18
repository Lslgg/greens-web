import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagesRoutes, ImagesList } from './images/images.routing';
import { ArticleRoutes, ArticleList } from './article/article.routing';
import { lcNewsRoutes, lcNewsList } from './news/article.routing';
import { TypeList, TypeRoutes } from './type/type.routing';


var routes:Routes=[];
//玩家充值管理
routes = routes.concat(ImagesRoutes);
//玩家充值管理
routes = routes.concat(ArticleRoutes);
routes = routes.concat(lcNewsRoutes);
routes = routes.concat(TypeRoutes);
export var GreensRoutes: Routes = routes;

//一定要将路由加载的模块导出到admin.module模块
export const GreensList = [
    ImagesList,
    ArticleList,
    lcNewsList,
    TypeList
]


