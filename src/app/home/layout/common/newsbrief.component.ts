import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { DataFormComponent } from '../../../component/dataform/component/index';

@Component({
    selector: 'home-newsbrief',
    templateUrl: 'newsbrief.html',
    styleUrls: ['./newsbrief.scss']
})

export class NewsBriefComponent implements OnInit {

    news: { id: String, title: String, brief: String, createAt: String };
    constructor(private apollo: Apollo) {
    }

    ngOnInit() {
        type News = { id: String, title: String, brief: String, createAt: String };
        this.apollo.query<{ newsList: Array<News> }>({
            query: gql`query{  
		        newsList:getlcNewsWhere(lcnews:{},limit:1){
                    id,title,brief,createAt
                    }
                }
        `,
        }).subscribe(({ data }) => {
            if(data.newsList && data.newsList[0]) {
                this.news =Object.assign({},data.newsList[0]) 
                this.news.createAt = new Date(this.news.createAt+'').toLocaleDateString()+'';
            }
        });

    }
}