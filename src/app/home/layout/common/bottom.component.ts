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

    bottomInfo: { webName: String, comAddress: String, cPhone1: String, webSite: String };

    constructor(private apollo: Apollo) { }

    ngOnInit() {
        this.apollo.query<{ bottomInfo: any }>({
            query: gql`query($id:String) {
                bottomInfo:getContactInfoById(id:$id) {
                    webName comAddress cPhone1 webSite
                }             
            }`,variables:{id:"5a67e8a1f422fc1ec8b9bcc7"}
        }).subscribe(({ data }) => {
            // if (data.bottomInfo) {
            //     // console.log(data.bottomInfo);
            //     // this.bottomInfo = data.bottomInfo;
            // }
        });
    }
}