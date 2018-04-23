import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';

@Component({
    selector: 'lcwebsite-gardenm',
    templateUrl: 'addGarden.html',
})

export class AddGardenComponent implements OnInit {

    gardenForm: FormGroup = this.fb.group({
        id: [''],
        title: ['', Validators.required],
        brief: ['', Validators.required],
        imageIds: ['', Validators.required],                   
    });

    garden: FormStr = {
        data: gql`query($id:String){
            info:getGardenById(id:$id){
                id,title,brief,imageIds:Images{ id name:originalname url:path }
            }
        }`,
        save: gql`mutation($info:inputGarden){
            saveGarden(garden:$info){ id }
        }`,
        url: "admin/gardenm",
    }


    files: Array<any> = new Array<any>();

    constructor( @Inject("commonData") private cdate: CommonData,
        private fb: FormBuilder, private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() { }
}