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

    count:number;
    index:number;
    limit:number = 5;
    constructor(private router: Router,private route: ActivatedRoute, private apollo: Apollo) {
    }

    ngOnInit() {
        this.initPage();
    }

    initPage() {
        var index  = this.route.snapshot.params['index'];        
        if(!index)
            index = 1;
        // this.index = index;
        this.index = parseInt(index);
        this.count = 100;
    }

    onChangep(num:number) {        
        this.index = num;               
        this.router.navigate(['/home/news/'+num]);
    }
}