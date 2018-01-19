import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';

@Component({
    selector: 'lcwebsite-add-type',
    templateUrl: 'addType.html',
})

export class AddTypeComponent implements OnInit {

    typeForm: FormGroup = this.fb.group({
        id: [''],
        key: ['', Validators.required],
        value: [''],
        type: ['', Validators.required],
        startDate: [this.cdate.startDate],
        endDate: [this.cdate.endDate],
    });

    type: FormStr = {
        data: gql`query($id:String){
            info:getTypeById(id:$id){
                id,key,value,type             
            }
        }`,
        save: gql`mutation($info:inputType){
            saveType(type:$info){ id }
        }`,
        url: "admin/lctype",
    }

    typeList: Array<{ key: string, value: string }> = [        
        { key: "图片类别", value: "图片类别" },
        { key: "文章类别", value: "文章类别" },
        { key: "产品类别", value: "产品类别" },    
    ];

    files: Array<any> = new Array<any>();

    constructor( @Inject("commonData") private cdate: CommonData,
        private fb: FormBuilder, private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() { }
}