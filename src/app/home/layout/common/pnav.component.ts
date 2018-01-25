import { Component, OnInit, Input, Inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
    selector: 'home-pnav',
    templateUrl: 'pnav.html',
    styleUrls: ['./pnav.scss']
})

export class PnavComponent implements OnInit {


    constructor( @Inject("commonData") private cdata: CommonData,
        private apollo: Apollo) { }

    ngOnInit() {

    }
}