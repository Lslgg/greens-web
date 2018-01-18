import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import gql from 'graphql-tag';

@Component({
    selector: 'lcwebsite-lcNews',
    templateUrl: 'lcNews.html',
})

export class lcNewsComponent implements OnInit {


    lcNews: TableStr = {
        data: gql`query($index:Int,$size:Int,$info:searchlcNews){
            list:getlcNewsPage(pageIndex:$index,pageSize:$size,lcnews:$info){
                id,title,updateAt,createAt
            }
            count:getlcNewsCount(lcnews:$info)
        }`,
        delete: gql`mutation($id:String){
            deletelcNews(id:$id)
        }`,
        url: "admin/addlcnews",
        where: { lcNews: {} }
    };

    constructor(private router: Router) {

    }

    ngOnInit() {

    }
}