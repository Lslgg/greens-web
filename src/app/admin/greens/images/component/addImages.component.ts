import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

@Component({
    selector: 'lcwebsite-add-images',
    templateUrl: 'addImages.html',
})

export class AddImagesComponent implements OnInit {

    imagesForm: FormGroup = this.fb.group({
        id: [''],
        type: ['', Validators.required],
        imageIds: ['', Validators.required],
        desc: ['默认', Validators.required],
        startDate: [this.cdate.startDate],
        endDate: [this.cdate.endDate],
    });

    images: FormStr = {
        data: gql`query($id:String){
            info:getImagesById(id:$id){
                id,type,desc
                ,imageIds:Images{ id name:originalname url:path }
            }
        }`,
        save: gql`mutation($info:inputImages){
            saveImages(images:$info){ id }
        }`,
        url: "admin/lcimg",
    }
    typeList: Array<{ key: string, value: string }> = [];

    files: Array<any> = new Array<any>();

    constructor( @Inject("commonData") private cdate: CommonData,
        private fb: FormBuilder, private route: ActivatedRoute,
        private router: Router, private apollo: Apollo) {
    }

    getType() {
        var typeStr = "图片类别";
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