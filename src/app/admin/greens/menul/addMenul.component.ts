import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'lcwebsite-add-menul',
    templateUrl: 'addMenul.html',
})

export class AddMenulComponent implements OnInit {

    menulForm: FormGroup = this.fb.group({
        id: [''],
        name1: ['', Validators.required],   
        name2: ['', Validators.required],        
        name3: ['', Validators.required],   
        name4: ['', Validators.required],   
        name5: ['', Validators.required],   
        name6: ['', Validators.required],   
        name7: ['', Validators.required],   
        startDate: [this.cdate.startDate],
        endDate: [this.cdate.endDate],
    });

    menul: FormStr = {
        data: gql`query($id:String){
            info:getMenulById(id:$id){
                id,name1,name2,name3,name4,name5,name6,name7
            }
        }`,
        save: gql`mutation($info:inputMenul){
            saveMenul(menul:$info){ id }
        }`,
        url: "admin/menul",
    }

    typeList: Array<{ key: string, value: string }> = [];

    files: Array<any> = new Array<any>();

    constructor( @Inject("commonData") private cdate: CommonData,
        private fb: FormBuilder, private route: ActivatedRoute,
        private router: Router, private apollo: Apollo) {
    }


    ngOnInit() {
        this.router.navigate(['admin/menul/5a6e91f14c40b208d0df522b']);
    }
}