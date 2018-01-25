import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular/Apollo';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'lcwebsite-home-lcproduct',
    templateUrl: 'lcproduct.html',
    styleUrls: ['../home.css'],
})

export class LcProductComponent implements OnInit {


    constructor(private router: Router, private apollo: Apollo) {
    }

    ngOnInit() {

    }
}