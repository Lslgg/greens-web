import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular/Apollo';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'lcwebsite-home-sjoin',
    templateUrl: 'sjoin.html',
    styleUrls: ['../../home.css'],
})

export class SjoinComponent implements OnInit {

    constructor(private router: Router, private apollo: Apollo) {
    }

    ngOnInit() {
    }
}