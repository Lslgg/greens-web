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
    constructor( @Inject("commonData") private cdata: CommonData,
        private router: Router, private apollo: Apollo) {

    }

    ngOnInit() {
        this.initData();
    }

    initData() {
        type Image = { id: String, imageIds: any, type: String };
        this.apollo.query<{ logo: Image, titlelist: { id, comName1, comName2, sPhone } }>({
            query: gql`query {
                logo:getImagesWhereOne(images:{type:"首页logo"}){
                    id,imageIds:Images{id name:originalname url:path},type
                },
                titlelist:getContactInfoById(id:"5a67e8a1f422fc1ec8b9bcc7") {
                    id,comName1,comName2,sPhone
                }             
            }`,
        }).subscribe(({ data }) => {
            if (data.logo != null) {
                this.logoimg = `${this.cdata.dataServer}/${data.logo.imageIds[0].url}`;
            }
            if (data.titlelist) {
                this.comName1 = data.titlelist.comName1;
                this.comName2 = data.titlelist.comName2;
                this.sPhone = data.titlelist.sPhone;
            }
        });
    }
}