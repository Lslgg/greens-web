import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

@Component({
    selector: 'lcwebsite-product',
    templateUrl: 'product.html',
})

export class ProductComponent implements OnInit {
    
    typeList: Array<{ key: string, value: string }> = [];
    product: TableStr = {
        data: gql`query($index:Int,$size:Int,$info:searchProduct){
            list:getProductPage(pageIndex:$index,pageSize:$size,product:$info){
                id,desc,type,updateAt,createAt
            }
            count:getProductCount(product:$info)
        }`,
        delete: gql`mutation($id:String){
            deleteProduct(id:$id)
        }`,
        url: "admin/addlcproduct",
        where: { product: {} }
    };

    constructor(private router: Router, private apollo: Apollo) {

    }

    getType() {
        var typeStr = "产品类别";
        this.apollo.query({
            query: gql`query($type:searchType){
                types:getTypeWhere(type:$type){
                    key value
                }
            }`,
            fetchPolicy: "network-only",
            variables:  { type: { "type": `{"$eq":"${typeStr}"}` } }
        }).subscribe(({ data }) => {
            this.typeList=data["types"];
        });
    }

    ngOnInit() {
        this.getType();
    }
}