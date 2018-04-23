import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular/Apollo';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'lcwebsite-home-newsDetail',
    templateUrl: 'newsDetail.html',
    styleUrls: ['../../home.css'],
})

export class NewsDetailComponent implements OnInit {

    id: String;
    nextInfo: { url: String, title: String };
    constructor(private router: Router, private route: ActivatedRoute, private apollo: Apollo) {
        this.id = this.route.snapshot.params['id'];
    }

    ngOnInit() {
        window.scrollTo(0, 0);
        if (this.id) {
            this.apollo.query<{ news: Array<{ id: string, title: string }> }>({
                query: gql`query($id:Json){
                    news:getlcNewsWhere(lcnews:{_id:$id},limit:1) {
                        id,title
                    }
                }`,
                variables: { id: `{"$gt":"${this.id}"}` }
            }).subscribe(({ data }) => {
                if (data.news && data.news[0]) {
                    if (window.location.href.includes("/home/snewsDetail")) {
                        this.nextInfo = { url: "/home/newsDetail/" + data.news[0].id, title: data.news[0].title };
                    } else {
                        this.nextInfo = { url: "/home/snewsDetail/" + data.news[0].id, title: data.news[0].title };
                    }

                } else {
                    this.nextInfo = { url: "/home/news", title: "没有了" };
                }
            });
        }
    }
}