import { Component, OnInit, Input, Inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router, ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';

@Component({
    selector: 'home-newsrow',
    templateUrl: 'newsrow.html',
    styleUrls: ['./newsrow.scss']
})

export class NewsRowComponent implements OnInit {
    @Input() limit: Number = 5;
    @Input()
    set index(index: Number) {
        this._index = index;
        if(!index)
            this._index = 1;
        if (this._index && this._title) {
            this.getNewsList();
        }
    }
    @Input()
    set title(title: String) {
        if (title) {
            this._title = title;
        } else {
            this._title = '.*';
        }
        if (this._index && this._title) {
            this.getNewsList();
        }
    }
    _index: Number = 1;
    _title: String;
    newsList: Array<{ id: String, title: String, brief: String, imageIds: any }> = [];
    dataServer: String = '';
    info: String;
    constructor( @Inject("commonData") private cdata: CommonData,
        private router: Router, private apollo: Apollo) { }

    ngOnInit() {
        this.dataServer = this.cdata.dataServer + '/';
        this.getNewsList();
    }

    getNewsList() { 
        this.newsList = [];
        this.apollo.query<{ newsList: Array<{ id: String, title: String, brief: String, imageIds: any, createAt: String }> }>({
            query: gql`query($index:Int,$limit:Int,$info:RegExp){  
                    newsList:getlcNewsPage(pageIndex:$index,pageSize:$limit,lcnews:{title:$info}){
                    id,title,brief,imageIds:Images{ url:path },createAt
                }	
            }`,
            variables: { "index": `${this._index}`, "limit": `${this.limit}`, "info": `${this._title}` }
        }).subscribe(({ data }) => {
            if (data.newsList) {
                this.newsList = data.newsList;
            }
            if (!this.newsList || this.newsList.length < 1) {
                this.info = "没有找到您的信息！";
            } else {
                this.info = undefined;
            }
        });
    }
}
