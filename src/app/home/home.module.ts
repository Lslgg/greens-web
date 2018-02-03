import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CommonModule as SystemCommonModule } from '@angular/common';

import { HomeRoutingModule, ComponentList } from './home.routing';
import { HomeComponent } from './home.component';
import { HeaderComponent,NavComponent,BottomComponent } from './layout';


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        SystemCommonModule,       
        HomeRoutingModule        
    ],
    exports: [],
    declarations: [       
        ComponentList,
        HeaderComponent,
        NavComponent,
        BottomComponent
    ],
    providers: [
    ],
})

export class HomeModule { }
