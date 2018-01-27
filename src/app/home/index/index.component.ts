import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular/Apollo';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'lcwebsite-home-index',
    templateUrl: 'index.html',
    styleUrls: ['../home.css'],
})

export class IndexComponent implements OnInit {

    slide: Array<string> = [];
    img1: string = '';
    img2: string = '';
    img3: string = '';
    img4: string = '';
    constructor( @Inject("commonData") private cdata: CommonData,
        private router: Router, private apollo: Apollo) {
    }

    ngOnInit() {
        this.initData();
    }

    initData() {
        
    }
    
}

