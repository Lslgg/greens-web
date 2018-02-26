import { Component, OnInit, Input, Inject, EventEmitter, Output } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { setInterval } from 'timers';

@Component({
    selector: 'home-slide',
    templateUrl: 'slide.html',
    styleUrls: ['./slide.scss'],
    animations: [
        trigger('state', [
            state('left', style({
            })),
            state('right', style({
            })),
            transition('init => right', [animate('500ms ease-in', style({ marginLeft: '-200%' }))]),
            transition('init => left', animate('500ms ease-out', style({ marginLeft: '0' }))),
        ])
    ]
})

export class SlideComponent implements OnInit {

    @Input() list: Array<String> = [];
    @Input() height: string = '500px';
    @Input() toNextImg: Boolean = true;
    @Input() startIndex:Number = 0;
    strArr: Array<String> = [];
    ponintArray: Array<boolean> = [];
    state: string = "init";
    marginLeft: string = "-100%";      
    @Output() clickImg = new EventEmitter<any>();

    constructor(@Inject("commonData") private cdata: CommonData,
        private apollo: Apollo) {}

    ngOnInit() {               
        this.getList();
    }

    toggleState(flag: number) {
        if (flag == -1 && this.strArr.length > 2) {
            this.state = 'left';
            this.setPoint(-1);
        } else if (flag == 1 && this.strArr.length > 2) {
            this.state = 'right';
            this.setPoint(1);
        }        
    }

    setPoint(flag: number) {
        var t: number;
        for (var i = 0; i < this.ponintArray.length; i++) {
            if (this.ponintArray[i]) {
                t = i;
            }
            this.ponintArray[i] = false;
        }
        if (flag == 1) {
            t++;
            if (t > this.ponintArray.length - 1) {
                t = 0;
            }
        } else if (flag == -1) {
            t--;
            if (t < 0) {
                t = this.ponintArray.length - 1;
            }
        }
        this.ponintArray[t] = true;
    }

    animationDone(e: any) {
        if (e.toState == 'right') {
            var t = this.strArr[1];
            for (var i = 1; i < this.strArr.length - 1; i++) {
                this.strArr[i] = this.strArr[i + 1];
            }
            this.strArr[this.strArr.length - 2] = t;
            this.strArr[this.strArr.length - 1] = this.strArr[1];
            this.strArr[0] = this.strArr[this.strArr.length - 2];
            this.state = 'init';
        } else if (e.toState == 'left') {
            var t = this.strArr[this.strArr.length - 2];
            for (var i = this.strArr.length - 3; i >= 1; i--) {
                this.strArr[i + 1] = this.strArr[i];
            }
            this.strArr[1] = t;
            this.strArr[this.strArr.length - 1] = this.strArr[1];
            this.strArr[0] = this.strArr[this.strArr.length - 2];
            this.state = 'init';
        }
    }

    getList() {                
        if (this.list.length > 0) {               
            this.initList();
        } else {                                
            type Image = { id: String, imageIds: any, type: String };
            this.apollo.query<{ imglist: Array<Image> }>({
                query: gql`query($info:searchImages){
                    imglist:getImagesWhere(images:$info){
                        id,imageIds:Images{id name:originalname url:path},type
                    }
                }`,
                variables: { info: { "type": `{"$eq":"首页-幻灯片"}` } }
            }).subscribe(({ data }) => {
                if (data.imglist) {
                    for (var i = 0; i < data.imglist.length; i++) {
                        if (data.imglist[i].imageIds) {
                            for (var j = 0; j < data.imglist[i].imageIds.length; j++) {
                                if (data.imglist[i].imageIds[j]) {
                                    this.list.push(this.cdata.dataServer + '/' + data.imglist[i].imageIds[j].url);
                                }
                            }
                        }
                    }
                    this.initList();
                }
            });
        }        
    }

    initList() {
        if (this.list.length > 1) {
            this.strArr.push(this.list[this.list.length - 1]);
            for (var i = 0; i < this.list.length; i++) {
                this.strArr.push(this.list[i]);
                this.ponintArray.push(false);
            }
            this.strArr.push(this.list[0]);
            this.ponintArray[0] = true;
            this.toNext();
        } else if (this.list.length == 1) {
            this.strArr.push(this.list[0]);
            this.strArr.push(this.list[0]);
        }
        var l=1;        
        while(l<this.startIndex) {
            // this.toggleState(1);       
            // i++;
            var t = this.strArr[1];
            for (var i = 1; i < this.strArr.length - 1; i++) {
                this.strArr[i] = this.strArr[i + 1];
            }
            this.strArr[this.strArr.length - 2] = t;
            this.strArr[this.strArr.length - 1] = this.strArr[1];
            this.strArr[0] = this.strArr[this.strArr.length - 2];
            this.state = 'init';
            this.setPoint(1);            
            l++;
        }
    }

    toNext() {                
        if(this.toNextImg == true) {            
            setInterval(() => {
                this.toggleState(1);
            }, 5000);
        }        
    }

    cimg() {        
        this.clickImg.emit();
    }
}