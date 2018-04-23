import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';

@Component({
    selector: 'lcwebsite-add-lcnews',
    templateUrl: 'addlcNews.html',
})

export class AddlcNewsComponent implements OnInit {

    lcnewsForm: FormGroup = this.fb.group({
        id: [''],
        title: ['', Validators.required],
        brief: ['', Validators.required],
        imageIds: ['', Validators.required],
        content: ['', Validators.required],        
        startDate: [this.cdate.startDate],
        endDate: [this.cdate.endDate],
    });

    lcnews: FormStr = {
        data: gql`query($id:String){
            info:getlcNewsById(id:$id){
                id,title,content,isValid,brief
                ,imageIds:Images{ id name:originalname url:path }
            }
        }`,
        save: gql`mutation($info:inputlcNews){
            savelcNews(lcnews:$info){ id }
        }`,
        url: "admin/lcnews",
    }


    files: Array<any> = new Array<any>();

    constructor( @Inject("commonData") private cdate: CommonData,
        private fb: FormBuilder, private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() { }
}