import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';

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
        isValid: ['', Validators.required],
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

    typeList: Array<{ key: string, value: string }> = [        
        { key: "关于我们", value: "关于我们" },
        { key: "产品展示", value: "产品展示" },
        { key: "韭园风采", value: "韭园风采" },
        { key: "公司招聘", value: "公司招聘" },
        { key: "联系我们", value: "联系我们" },        
    ];

    files: Array<any> = new Array<any>();

    constructor( @Inject("commonData") private cdate: CommonData,
        private fb: FormBuilder, private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() { }
}