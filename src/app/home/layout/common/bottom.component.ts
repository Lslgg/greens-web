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
    menuInfo: { name1: String, name2: String, name3: String, name4: String, name5: String, name6: String, name7: String };
    constructor(private apollo: Apollo) { }

    ngOnInit() {
        this.apollo.query<{ bottomInfo: any, menuInfo: any }>({
            query: gql`query{
                bottomInfo:getContactInfo {
                    webName comAddress cPhone1 webSite
                },
				menuInfo:getMenul {
					id,name1,name2,name3,name4,name5,name6,name7
                }

            }`,
        }).subscribe(({ data }) => {
            if (data.bottomInfo && data.bottomInfo[0]) {
                this.bottomInfo = data.bottomInfo[0];
            }
            if (data.menuInfo && data.menuInfo[0]) {
                this.menuInfo = data.menuInfo[0];                
            }
        });
    }
}