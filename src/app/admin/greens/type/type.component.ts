import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import gql from 'graphql-tag';

@Component({
    selector: 'lcwebsite-type',
    templateUrl: 'type.html',
})

export class TypeComponent implements OnInit {

    typeList: Array<{ key: string, value: string }> = [        
        { key: "图片类别", value: "图片类别" },
        { key: "文章类别", value: "文章类别" },
        { key: "产品类别", value: "产品类别" },    
    ];

    type: TableStr = {
        data: gql`query($index:Int,$size:Int,$info:searchType){
            list:getTypePage(pageIndex:$index,pageSize:$size,type:$info){
                id,key,value,type,updateAt,createAt
            }
            count:getTypeCount(type:$info)
        }`,
        delete: gql`mutation($id:String){
            deleteType(id:$id)
        }`,
        url: "admin/addlctype",
        where: { type: {} }
    };

    constructor(private router: Router) {

    }

    ngOnInit() {

    }
}