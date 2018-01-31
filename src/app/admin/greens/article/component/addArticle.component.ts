import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

@Component({
    selector: 'lcwebsite-add-article',
    templateUrl: 'addArticle.html',
})

export class AddArticleComponent implements OnInit {

    articleForm: FormGroup = this.fb.group({
        id: [''],
        type: ['', Validators.required],
        imageIds: [''],
        desc: ['', Validators.required],
        content: ['', Validators.required],
        // isValid: ['', Validators.required],
        startDate: [this.cdate.startDate],
        endDate: [this.cdate.endDate],
    });

    article: FormStr = {
        data: gql`query($id:String){
            info:getArticleById(id:$id){
                id,type,desc,content,isValid
                ,imageIds:Images{ id name:originalname url:path }
            }
        }`,
        save: gql`mutation($info:inputArticle){
            saveArticle(article:$info){ id }
        }`,
        url: "admin/lcarticle",
    }

    typeList: Array<{ key: string, value: string }> = [];

    files: Array<any> = new Array<any>();

    constructor( @Inject("commonData") private cdate: CommonData,
        private fb: FormBuilder, private route: ActivatedRoute,
        private router: Router, private apollo: Apollo) {
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
            variables: { type: { "type": `{"$eq":"${typeStr}"}` } }
        }).subscribe(({ data }) => {
            this.typeList = data["types"];
        });
    }

    ngOnInit() {
        this.getType();
    }
}