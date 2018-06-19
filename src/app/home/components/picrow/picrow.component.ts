import { Component, OnInit, Input, Inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
    selector: 'home-picrow',
    templateUrl: 'picrow.html',
    styleUrls: ['./picrow.scss']
})

export class PicRowComponent implements OnInit {

    @Input() type;
    @Input() height: String = "50px";
    @Input() img: String = '';

    constructor( @Inject("commonData") private cdata: CommonData,
        private apollo: Apollo) { }

    ngOnInit() {    
        if (this.type) {
            type Image = { id: String, imageIds: any, type: String };
            this.apollo.query<{ img: Image }>({
                query: gql`query($info:searchImages){
                    img:getImagesWhereOne(images:$info){
                        id,imageIds:Images{id name:originalname url:path},type
                    }
                }`,
                variables: { info: { "type": `{"$eq":"${this.type}"}` } }
            }).subscribe(({ data }) => {                               
                if (data.img && data.img.imageIds && data.img.imageIds[0]) {    
                    this.img = this.cdata.dataServer + '/' + data.img.imageIds[0].url;                                        
                }                
            });
        }
    }
}