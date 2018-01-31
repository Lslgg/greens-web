import { Component, OnInit, Inject } from '@angular/core';
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

    imgList: Array<String> = [];
    constructor( @Inject("commonData") private cdata: CommonData,
        private router: Router, private apollo: Apollo) {
    }

    ngOnInit() {
    }

    navChange(e: String) {
        this.getImgList(e);
    }

    getImgList(e: String) {
        this.imgList = [];
        type Image = { imageIds: any };
        this.apollo.query<{ imglist: Array<Image> }>({
            query: gql`query($info:searchProduct){
                imglist:getProductWhere(product:$info) {
                    imageIds:Images {
                        url:path
                    }
                }
            }`,
            variables: { info: { "type": `{"$eq":"${e}"}` } }
        }).subscribe(({ data }) => {
            if (data.imglist) {
                for (var i = 0; i < data.imglist.length; i++) {
                    if (data.imglist[i].imageIds) {
                        for (var j = 0; j < data.imglist[i].imageIds.length; j++) {
                            if (data.imglist[i].imageIds[j]) {
                                this.imgList.push(this.cdata.dataServer + '/' + data.imglist[i].imageIds[j].url);
                            }
                        }
                    }
                }
            }
        });
    }
}