import { Component, OnInit, Inject } from '@angular/core';
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

    slide: Array<string> = [];
    img1: string = '';
    img2: string = '';
    img3: string = '';
    img4: string = '';
    constructor( @Inject("commonData") private cdata: CommonData,
        private router: Router, private apollo: Apollo) {
    }

    ngOnInit() {
        this.initData();
    }

    initData() {
        var typeStr = ["\"首页幻灯片\"", "\"首页图片1\"", "\"首页图片2\"", "\"首页图片3\"", "\"首页图片4\""];
        type Image = { id: String, imageIds: any, type: String };
        this.apollo.query<{ imgList: Array<Image> }>({
            query: gql`query($infolist:searchImages){
                imgList:getImagesWhere(images:$infolist){
                    id,imageIds:Images{id name:originalname url:path},type
                }
            }`,
            variables: { infolist: { "type": `{"$in":[${typeStr}]}` } }
        }).subscribe(({ data }) => {
            this.imgData(data.imgList);
        });
    }

    imgData(imgList: Array<{ id: String, imageIds: any, type: String }>) {
        if (imgList) {
            for (var i = 0; i < imgList.length; i++) {
                switch (imgList[i].type) {
                    case '首页幻灯片':
                        if (imgList[i].imageIds) {
                            for (var j = 0; j < imgList[i].imageIds.length; j++) {
                                if (imgList[i].imageIds[j]) {
                                    this.slide.push(this.cdata.dataServer + '/' + imgList[i].imageIds[j].url);
                                }
                            }
                        }
                        break;
                    case '首页图片1':
                        if (imgList[i].imageIds && imgList[i].imageIds[0]) {
                            this.img1 = this.cdata.dataServer + '/' + imgList[i].imageIds[0].url;
                        }
                        break;
                    case '首页图片2':
                        if (imgList[i].imageIds && imgList[i].imageIds[0]) {
                            this.img2 = this.cdata.dataServer + '/' + imgList[i].imageIds[0].url;
                        }
                        break;
                    case '首页图片3':
                        if (imgList[i].imageIds && imgList[i].imageIds[0]) {
                            this.img3 = this.cdata.dataServer + '/' + imgList[i].imageIds[0].url;
                        }
                        break;
                    case '首页图片4':
                        if (imgList[i].imageIds && imgList[i].imageIds[0]) {
                            this.img4 = this.cdata.dataServer + '/' + imgList[i].imageIds[0].url;
                        } break;
                }
            }
        }

    }
}

