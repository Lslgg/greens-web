import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
    selector: 'home-picbox',
    templateUrl: 'picbox.html',
    styleUrls: ['./picbox.scss'],
})

export class PicBoxComponent implements OnInit {

    dataList: Array<{ id: String, title: String, brief: String, imageIds: Array<{ id: String, name: String, url: String }> }> = [];
    server:String;
    constructor(@Inject("commonData") private cdata: CommonData,
        private router: Router, private apollo: Apollo) {
            this.server = this.cdata.dataServer+'/';
    }

    ngOnInit() {
        this.getList();        
    }

    detail(id:String) {        
        this.router.navigate(['/home/garden/'+id]);
    }

    getList() {
        type info = { list: Array<{ id: String, title: String, brief: String, imageIds: Array<{ id: String, name: String, url: String }> }> };
        this.apollo.query<info>({
            query: gql`query{
                list:getGarden{
                    id,title,brief,imageIds:Images{ id name:originalname url:path }
                }
            }`,
        }).subscribe(({ data }) => {
            this.dataList = [];
            if(data.list) {                
                for(var i=0;i<data.list.length;i++) {                
                    var arr:Array<{ id: String, name: String, url: String }> = [];    
                    for(var j=0;j<data.list[i].imageIds.length;j++) {                        
                        arr.push({id:data.list[i].imageIds[j].id,name:data.list[i].imageIds[j].name,url:this.server.concat(data.list[i].imageIds[j].url+"") });
                    }                                        
                    this.dataList.push({id:data.list[i].id,title:data.list[i].title,
                        brief:data.list[i].brief,imageIds:arr});
                }                
                console.log(this.dataList);
            }             
        });
    }
}