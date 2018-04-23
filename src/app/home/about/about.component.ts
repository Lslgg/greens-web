import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular/Apollo';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'lcwebsite-home-about',
    templateUrl: 'about.html',
    styleUrls: ['../home.css'],
})

export class AboutComponent implements OnInit {

    constructor(private router: Router, private apollo: Apollo) {
    }

    ngOnInit() {
        window.scrollTo(0, 0);
    }
}