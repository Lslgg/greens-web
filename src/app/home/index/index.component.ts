import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular/Apollo';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'lcwebsite-home-index',
    templateUrl: 'index.html',
    styleUrls: ['../home.css'],
})

export class IndexComponent implements OnInit {

    constructor(private router: Router, private apollo: Apollo) {
    }

    ngOnInit() {
        this.getType();
    }

    getType() {
        var typeStr = ["\"首页logo\"","\"首页幻灯片\""];
        type Image = { id: String, imageIds: any, type: String };
        this.apollo.query<{ list: Array<Image> }>({
            query: gql`query($infolist:searchImages){
                list:getImagesWhere(images:$infolist){
                    id,imageIds:Images{id name:originalname url:path},type
                }
            }`,
            variables: { infolist: { "type":`{"$in":[${typeStr}]}` } }
        }).subscribe(({ data }) => {
            console.log(data.list);
        });
    }

}