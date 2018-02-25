import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
    selector: 'home-picrowm',
    templateUrl: 'picrow.html',
    styleUrls: ['./picrow.scss'],
})

export class PicRowComponent implements OnInit {

    // dataList: { id: String, title: String, brief: String, imageIds: Array<{ id: String, name: String, url: String }> };
    imageIds:Array<{ id: String, name: String, url: String }>=[];
    server: String;
    constructor(@Inject("commonData") private cdata: CommonData,
        private router: Router, private route: ActivatedRoute, private apollo: Apollo) {
        this.server = this.cdata.dataServer+'/';
    }

    ngOnInit() {
        this.getList();
    }

    getList() {
        type info = { list: { id: String, title: String, brief: String, imageIds: Array<{ id: String, name: String, url: String }> } };
        this.apollo.query<info>({
            query: gql`query($id:String){
                list:getGardenById(id:$id){
                    id,title,brief,imageIds:Images{ id name:originalname url:path }
                }
            }`
            , variables: { id: `${this.route.snapshot.params['id']}` }
        }).subscribe(({ data }) => {
            console.log(data.list);
            var arr:Array<{id:String,name:String,url:String}> = [];
            for(var i=0;i<data.list.imageIds.length;i++) {
                arr.push({id:data.list.imageIds[i].id,name:data.list.imageIds[i].name,url:this.server.concat(data.list.imageIds[i].url+"")});
            }       
            // this.dataList = {id:data.list.id,title:data.list.title,brief:data.list.brief,imageIds:arr};
            this.imageIds = arr;
        });
    }
}