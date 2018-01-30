import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

@Component({
    selector: 'lcwebsite-images',
    templateUrl: 'images.html',
})

export class ImagesComponent implements OnInit {
    
    typeList: Array<{ key: string, value: string }> = [];
    // typeList: Array<{ key: string, value: string }> = [        
    //     { key: "首页栏目图片", value: "首页栏目图片" },
    //     { key: "首页图片1", value: "首页图片1" },
    //     { key: "首页图片2", value: "首页图片2" },
    //     { key: "首页图片3", value: "首页图片3" },
    //     { key: "关于我们栏目图片", value: "关于我们栏目图片" },
    //     { key: "产品展示栏目图片", value: "产品展示栏目图片" },
    //     { key: "新闻中心栏目图片", value: "新闻中心栏目图片" },
    //     { key: "新闻中心图片1", value: "新闻中心图片1" },
    //     { key: "新闻中心图片2", value: "新闻中心图片2" },
    //     { key: "韭园风采栏目图片", value: "韭园风采栏目图片" },
    //     { key: "公司招聘栏目图片", value: "公司招聘栏目图片" },
    //     { key: "联系我们图片", value: "联系我们图片" },        
    // ];

    images: TableStr = {
        data: gql`query($index:Int,$size:Int,$info:searchImages){
            list:getImagesPage(pageIndex:$index,pageSize:$size,images:$info){
                id,desc,type,updateAt,createAt
            }
            count:getImagesCount(images:$info)
        }`,
        delete: gql`mutation($id:String){
            deleteImages(id:$id)
        }`,
        url: "admin/addlcimg",
        where: { images: {} }
    };

    constructor(private router: Router, private apollo: Apollo) {

    }

    getType() {
        var typeStr = "图片类别";
        this.apollo.query({
            query: gql`query($type:searchType){
                types:getTypeWhere(type:$type){
                    key value
                }
            }`,
            fetchPolicy: "network-only",
            variables:  { type: { "type": `{"$eq":"${typeStr}"}` } }
        }).subscribe(({ data }) => {
            this.typeList=data["types"];
        });
    }

    ngOnInit() {
        this.getType();
    }
}