import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular/Apollo';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'lcwebsite-article',
    templateUrl: 'article.html',
})

export class ArticleComponent implements OnInit {
    
    
    typeList: Array<{ key: string, value: string }> = [];
    // typeList: Array<{ key: string, value: string }> = [        
    //     { key: "关于我们", value: "关于我们" },
    //     { key: "产品展示", value: "产品展示" },
    //     { key: "韭园风采", value: "韭园风采" },
    //     { key: "公司招聘", value: "公司招聘" },
    //     { key: "联系我们", value: "联系我们" },        
    // ];

    article: TableStr = {
        data: gql`query($index:Int,$size:Int,$info:searchArticle){
            list:getArticlePage(pageIndex:$index,pageSize:$size,article:$info){
                id,desc,type,updateAt,createAt
            }
            count:getArticleCount(article:$info)
        }`,
        delete: gql`mutation($id:String){
            deleteArticle(id:$id)
        }`,
        url: "admin/addlcarticle",
        where: { article: {} }
    };

    

    constructor(private router: Router, private apollo: Apollo) {

    }

    getType() {
        var typeStr = "文章类别";
        this.apollo.query({
            query: gql`query($type:searchType){
                types:getTypeWhere(type:$type){
                    key value
                }
            }`,
            fetchPolicy: "network-only",
            variables:  { type: { "type": `{"$eq":"${typeStr}"}` } }
        }).subscribe(({ data }) => {
            this.typeList=data["types"];
        });
    }

    ngOnInit() {        
        this.getType();
    }
}