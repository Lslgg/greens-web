import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagesRoutes, ImagesList } from './images/images.routing';
import { ArticleRoutes, ArticleList } from './article/article.routing';
import { lcNewsRoutes, lcNewsList } from './news/article.routing';
import { TypeList, TypeRoutes } from './type/type.routing';
import { ProductList, ProductRoutes } from './product/product.routing';
import { ContactInfoRoutes, ContactInfoList } from './contactInfo/contactInfo.routing';
import { MenulRoutes, MenulList } from './menul/menul.routing';


var routes: Routes = [
    ...ImagesRoutes,
    ...ArticleRoutes,
    ...lcNewsRoutes,
    ...TypeRoutes,
    ...ProductRoutes,
    ...ContactInfoRoutes,
    ...MenulRoutes,
    
];

export var GreensRoutes: Routes = routes;

//一定要将路由加载的模块导出到admin.module模块
export const GreensList = [
    ImagesList,
    ArticleList,
    lcNewsList,
    TypeList,
    ProductList,
    ContactInfoList,
    MenulList
]


