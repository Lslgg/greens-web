import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

@Component({
    selector: 'lcwebsite-garden',
    templateUrl: 'garden.html',
})

export class GardenComponent implements OnInit {

    typeList: Array<{ key: string, value: string }> = [];
    garden: TableStr = {
        data: gql`query($index:Int,$size:Int,$info:searchGarden){
            list:getGardenPage(pageIndex:$index,pageSize:$size,garden:$info){
                id,title,updateAt,createAt
            }            
        }`,
        delete: gql`mutation($id:String){
            deleteGarden(id:$id)
        }`,
        url: "admin/addGardenm",
        where: { garden: {} }
    };

    constructor(private router: Router, private apollo: Apollo) {        
    }

    ngOnInit() {
    }
}