import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
    selector: 'home-pnav',
    templateUrl: 'pnav.html',
    styleUrls: ['./pnav.scss']
})

export class PnavComponent implements OnInit {

    typeList: Array<any> = [];
    styleList: Array<boolean> = [];
    @Output() navChange = new EventEmitter<String>();
    constructor( @Inject("commonData") private cdata: CommonData,
        private apollo: Apollo) { }

    ngOnInit() {
        this.apollo.query<{ typeList: Array<String> }>({
            query: gql`query{
                typeList:getTypeWhere(type:{type:"产品类别"}) {                    
                    key
                }
            }`,
        }).subscribe(({ data }) => {
            if (data.typeList) {
                this.typeList = data.typeList;
                for (var i = 0; i < this.typeList.length; i++) {
                    this.styleList.push(false);
                }
                this.styleList[0] = true;
                if (this.typeList[0].key) {
                    this.navChange.emit(this.typeList[0].key);
                }
            }
        });
    }

    change(index: number, type: string) {
        for (var i = 0; i < this.typeList.length; i++) {
            this.styleList[i] = false;
        }
        this.styleList[index] = true;
        this.navChange.emit(type);
    }
}