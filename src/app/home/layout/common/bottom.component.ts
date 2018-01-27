import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { POINT_CONVERSION_COMPRESSED } from 'constants';

@Component({
    selector: 'home-bottom',
    templateUrl: 'bottom.html',
    styleUrls: ['bottom.scss'],
})

export class BottomComponent implements OnInit {

    bottomInfo:{ webName: String, comAddress: String, cPhone1: String};

    constructor(private apollo: Apollo) { }

    ngOnInit() {        
        this.apollo.query<{ bottomInfo: { webName: String, comAddress: String, cPhone1: String, cPhone2: String, webSite: String} }>({
            query: gql`query {
                bottomInfo:getContactInfoById(id:"5a67e8a1f422fc1ec8b9bcc7") {
                    webName,comAddress,cPhone1,webSite
                }             
            }`,
        }).subscribe(({ data }) => {            
            if (data.bottomInfo) {                  
                this.bottomInfo = data.bottomInfo;                
                // this.bottomInfo = Object.assign({},data.bottomInfo);
            }
        });
    }
}