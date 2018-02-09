import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular/Apollo';

@Component({
    selector: 'lcwebsite-home-news',
    templateUrl: 'news.html',
    styleUrls: ['../home.css'],
})

export class NewsComponent implements OnInit {

    count: number;
    index: number;
    limit: number = 5;
    isReady: boolean = false;
    title: String;
    constructor(private router: Router, private route: ActivatedRoute, private apollo: Apollo) {
    }

    ngOnInit() {
        this.title = this.route.snapshot.params['title'];        
        this.initPage();       
    }

    initPage() {
        var index = this.route.snapshot.params['index'];
        if (!index)
            index = 1;
        this.index = parseInt(index);        
        this.initCount();
    }

    initCount() {
        this.apollo.query<{ count: number }>({
            query: gql`query{
                count:getlcNewsCount
            }`,
        }).subscribe(({ data }) => {            
            this.count = data.count;          
        });
    }

    onChangep(num: number) {               
        this.index = num;        
        this.router.navigate(['/home/news/' + num]);        
    }
}