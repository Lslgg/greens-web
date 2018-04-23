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
    title: string;
    constructor(@Inject("commonData") private cdata: CommonData,
        private router: Router, private apollo: Apollo) {
    }

    ngOnInit() {
        window.scrollTo(0, 0);
        this.initData();
    }

    initData() {

    }

    linkqq() {
        window.open('http://wpa.qq.com/msgrd?v=3&uin=437032704&site=qq&menu=yes', '_blank');
    }

}

