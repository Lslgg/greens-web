import { Component, OnInit, Input, Inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'home-article',
    templateUrl: 'article.html',
    styleUrls: ['article.scss'],
})

export class ArticleComponent implements OnInit {
    @Input() type: String;
    @Input() id: String;
    @Input() isNews: Boolean = false;
    content: SafeHtml = '';
    constructor( @Inject("commonData") private cdata: CommonData,
        private apollo: Apollo, private sanitizer: DomSanitizer) { }

    ngOnInit() {
        type Image = { id: String, content: String };
        if (this.isNews) {
            this.apollo.query<{ content: Image }>({
                query: gql`query($id:String){
                    content:getArticleById(id:$id) {
                        id,content
                    }
                }`,
                variables: { id: `${this.id}` }
            }).subscribe(({ data }) => {
                if (data.content)
                    this.content = this.sanitizer.bypassSecurityTrustHtml(data.content.content + '');
            });
        }

        if (!this.isNews && this.type) {
            this.apollo.query<{ content: Image }>({
                query: gql`query($info:searchArticle){
                    content:getArticleWhereOne(article:$info) {
                        id,content
                    }
                }`,
                variables: { info: { "type": `{"$eq":"${this.type}"}` } }
            }).subscribe(({ data }) => {                
                if (data.content)
                    this.content = this.sanitizer.bypassSecurityTrustHtml(data.content.content + '');
            });
        }


    }
}