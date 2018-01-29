import { Component, OnInit, Input, Inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

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
    title:String='';
    constructor( @Inject("commonData") private cdata: CommonData,
        private apollo: Apollo, private sanitizer: DomSanitizer, private route: ActivatedRoute) {
    }

    ngOnInit() {
        type Article = { id: String, content: String,title:String };        
        if (this.isNews) {            
            this.apollo.query<{ content: Article }>({
                query: gql`query($id:String){
                    content:getlcNewsById(id:$id) {
                        id,content,title
                    }
                }`,
                variables: { id: `${this.id}` }
            }).subscribe(({ data }) => {            
                if (data.content){
                    this.content = this.sanitizer.bypassSecurityTrustHtml(data.content.content + '');
                    this.title = data.content.title;
                }                    
            });
        }

        if (!this.isNews && this.type) {
            this.apollo.query<{ content: Article }>({
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