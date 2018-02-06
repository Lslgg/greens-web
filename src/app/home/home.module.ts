import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CommonModule as SystemCommonModule } from '@angular/common';

import { HomeRoutingModule, ComponentList } from './home.routing';
import { HomeComponent } from './home.component';
import { HeaderComponent,NavComponent,BottomComponent } from './layout';

import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        SystemCommonModule,       
        HomeRoutingModule,         
        LazyLoadImageModule        
    ],
    exports: [],
    declarations: [       
        ComponentList,
        HeaderComponent,
        NavComponent,
        BottomComponent,
    ],
    providers: [
    ],
})

export class HomeModule { }
