import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

@Component({
    selector: 'lcwebsite-add-product',
    templateUrl: 'addProduct.html',
})

export class AddProductComponent implements OnInit {

    productForm: FormGroup = this.fb.group({
        id: [''],
        type: ['', Validators.required],
        imageIds: [''],
        desc: ['', Validators.required],
        startDate: [this.cdate.startDate],
        endDate: [this.cdate.endDate],
    });

    product: FormStr = {
        data: gql`query($id:String){
            info:getProductById(id:$id){
                id,type,desc
                ,imageIds:Images{ id name:originalname url:path }
            }
        }`,
        save: gql`mutation($info:inputProduct){
            saveProduct(product:$info){ id }
        }`,
        url: "admin/lcproduct",
    }
    typeList: Array<{ key: string, value: string }> = [];
    // typeList: Array<{ key: string, value: string }> = [        
    //     { key: "首页栏目图片", value: "首页栏目图片" },
    //     { key: "首页图片1", value: "首页图片1" },
    //     { key: "首页图片2", value: "首页图片2" },
    //     { key: "首页图片3", value: "首页图片3" },
    //     { key: "关于我们栏目图片", value: "关于我们栏目图片" },
    //     { key: "产品展示栏目图片", value: "产品展示栏目图片" },
    //     { key: "新闻中心栏目图片", value: "新闻中心栏目图片" },
    //     { key: "新闻中心图片1", value: "新闻中心图片1" },
    //     { key: "新闻中心图片2", value: "新闻中心图片2" },
    //     { key: "韭园风采栏目图片", value: "韭园风采栏目图片" },
    //     { key: "公司招聘栏目图片", value: "公司招聘栏目图片" },
    //     { key: "联系我们图片", value: "联系我们图片" },           
    // ];

    files: Array<any> = new Array<any>();

    constructor( @Inject("commonData") private cdate: CommonData,
        private fb: FormBuilder, private route: ActivatedRoute,
        private router: Router, private apollo: Apollo) {
    }

    getType() {
        var typeStr = "产品类别";
        this.apollo.query({
            query: gql`query($type:searchType){
                types:getTypeWhere(type:$type){
                    key value
                }
            }`,
            variables: { type: { "type": `{"$eq":"${typeStr}"}` } }
        }).subscribe(({ data }) => {
            this.typeList = data["types"];
        });
    }

    ngOnInit() {
        this.getType();
    }
}