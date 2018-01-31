import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'lcwebsite-add-contactInfo',
    templateUrl: 'addContactInfo.html',
})

export class AddContactInfoComponent implements OnInit {

    contactInfoForm: FormGroup = this.fb.group({
        id: [''],        
        comName1: ['', Validators.required],
        comName2: ['', Validators.required],
        sPhone: ['', Validators.required],
        webName: ['', Validators.required],
        comAddress: ['', Validators.required],
        cPhone1: ['', Validators.required],
        cPhone2: ['', Validators.required],
        webSite: ['', Validators.required],
        title: ['', Validators.required],
        startDate: [this.cdate.startDate],
        endDate: [this.cdate.endDate],
    });

    contactInfo: FormStr = {
        data: gql`query($id:String){
            info:getContactInfoById(id:$id){
                id,comName1,comName2,sPhone,webName,comAddress,cPhone1,cPhone2,webSite,title           
            }
        }`,
        save: gql`mutation($info:inputContactInfo){
            saveContactInfo(contactInfo:$info){ id }
        }`,
        url: "admin/contactInfo",
    }

    typeList: Array<{ key: string, value: string }> = [];

    files: Array<any> = new Array<any>();

    constructor( @Inject("commonData") private cdate: CommonData,
        private fb: FormBuilder, private route: ActivatedRoute,
        private router: Router, private apollo: Apollo) {
    }


    ngOnInit() {
        this.router.navigate(['admin/contactInfo/5a67e8a1f422fc1ec8b9bcc7']);
    }
}