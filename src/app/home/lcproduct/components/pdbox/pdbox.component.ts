import { Component, OnInit, Input, Inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
    selector: 'home-pdbox',
    templateUrl: 'pdbox.html',
    styleUrls: ['./pdbox.scss']
})

export class PdBoxComponent implements OnInit {

    @Input() imgList: Array<String> = [];
    constructor( @Inject("commonData") private cdata: CommonData,
        private apollo: Apollo) { }

    ngOnInit() {

    }
}