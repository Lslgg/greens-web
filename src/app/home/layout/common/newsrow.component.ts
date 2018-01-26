import { Component, OnInit, Input, Inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
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
        this.getNewsList();
    }
    _index: Number = 1;
    newsList: Array<{ id: String, title: String, brief: String, imageIds: any }> = [];
    dataServer: String = '';
    constructor( @Inject("commonData") private cdata: CommonData,
        private router: Router, private apollo: Apollo) { }

    ngOnInit() {
        this.dataServer = this.cdata.dataServer + '/';
        this.getNewsList();
    }

    getNewsList() {
        this.newsList = [];
        this.apollo.query<{ newsList: Array<{ id: String, title: String, brief: String, imageIds: any, createAt: String }> }>({
            query: gql`query($index:Int,$limit:Int){  
		        newsList:getlcNewsPage(pageIndex:$index,pageSize:$limit){
                    id,title,brief,imageIds:Images{ url:path },createAt
            }
        }`,
            variables: { "index": `${this._index}`, "limit": `${this.limit}` }
        }).subscribe(({ data }) => {
            if (data.newsList) {
                this.newsList = data.newsList;
            }
        });
    }
}
