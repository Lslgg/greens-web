import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular/Apollo';
@Component({
    selector: 'home-header',
    templateUrl: 'header.html',
    styleUrls: ['header.scss']
})

export class HeaderComponent implements OnInit {

    logoimg: String = "";
    comName1: String = "";
    comName2: String = "";
    sPhone: String = "";
    constructor(private router: Router, private apollo: Apollo) {}

    ngOnInit() {
        this.initData();
    }

    initData() {
        this.apollo.query<{ titlelist: { id, comName1, comName2, sPhone } }>({
            query: gql`query {
                titlelist:getContactInfoById(id:"5a67e8a1f422fc1ec8b9bcc7") {
                    id,comName1,comName2,sPhone
                }             
            }`,
        }).subscribe(({ data }) => {
            if (data.titlelist) {
                this.comName1 = data.titlelist.comName1;
                this.comName2 = data.titlelist.comName2;
                this.sPhone = data.titlelist.sPhone;
            }
        });
    }
}