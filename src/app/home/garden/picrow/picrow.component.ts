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
    imageIds: Array<String> = [];
    flag: Boolean = false;
    isShow: Boolean = false;
    server: String;
    index: Number = 1;
    scWidth: Number = 0;
    scHeight: Number = 0;
    mgLeft: Number = 0;
    scTop: Number = 0;
    constructor(@Inject("commonData") private cdata: CommonData,
        private router: Router, private route: ActivatedRoute, private apollo: Apollo) {
        this.server = this.cdata.dataServer + '/';
        this.scWidth = window.innerWidth;
        this.scHeight = window.innerHeight;
        this.mgLeft = -((parseInt(this.scWidth + '') - 1140) / 2);
    }

    ngOnInit() {
        this.getList();
    }

    show(index: Number) {
        this.index = parseInt(index + '') + 1;
        this.isShow = !this.isShow;        
        var t:Number = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            t = document.documentElement.scrollTop;
        } else if (document.body) {
            t = document.body.scrollTop;
        }
        this.scTop = t;
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
            var arr: Array<String> = [];
            if (data.list && data.list.imageIds) {
                for (var i = 0; i < data.list.imageIds.length; i++) {
                    arr.push(this.server.concat(data.list.imageIds[i].url + ""));
                }
            }
            this.imageIds = arr;
            this.flag = true;
        });
    }

    clickImg() {
        this.isShow = !this.isShow;
    }
}