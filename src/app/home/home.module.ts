import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CommonModule as SystemCommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
//admin common template
//custom
import { BreadcrumbsComponent } from '../component';
import { TableModule } from '../component/table/table.module';
import { DataFormModule } from '../component/dataform';
import { TreeModule } from '../component/tree';
import { DataModalModule } from '../component/dataModal';
import { FontawesomeModule } from '../component/fontawesome';
//Materia Ui
import { MaterialList } from '../common/material.list';

import { HomeRoutingModule, ComponentList } from './home.routing';
import { HomeComponent } from './home.component';




@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        SystemCommonModule,
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        MaterialList,
        HomeRoutingModule,
        TableModule,
        DataFormModule,
        TreeModule,
        DataModalModule,
        FontawesomeModule,
    ],
    exports: [],
    declarations: [
        BreadcrumbsComponent,
        ComponentList
    ],
    providers: [
    ],
})

export class HomeModule { }