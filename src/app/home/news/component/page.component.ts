import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular/Apollo';
import { variable } from '@angular/compiler/src/output/output_ast';
import { IndexList } from '../../index/index.routing';

@Component({
    selector: 'lcwebsite-home-page',
    templateUrl: 'page.html',
    styleUrls: ['../../home.css'],
})

export class PageComponent implements OnInit {

    @Input() index: number;
    @Output() onChangePage = new EventEmitter<number>();
    count: number = 0;
    isShow: boolean = false;
    indexList: Array<number> = [-1, -1, -1, -1, -1, -1, -1];
    constructor(private router: Router, private apollo: Apollo) {

    }

    onChangep(num: number) {
        this.onChangePage.emit(num);
        this.index = num;
        this.initPage(this.index, this.count);
    }

    ngOnInit() {
        this.index = parseInt(this.index + '');
        this.count = 20;
        this.initPage(this.index, this.count);
    }

    initPage(index: number, count: number) {
        if (this.index <= this.count && this.index > 0 && this.count >= 2)
            this.isShow = true;
        else
            return;
        if (this.index - 3 > 0 && this.index + 3 <= this.count) {
            this.indexList[0] = this.index - 3;
            this.indexList[1] = this.index - 2;
            this.indexList[2] = this.index - 1;
            this.indexList[3] = this.index;
            this.indexList[4] = this.index + 1;
            this.indexList[5] = this.index + 2;
            this.indexList[6] = this.index + 3;
        }
        else if (this.count <= 7) {
            for (var i = 0; i < this.count; i++) {
                this.indexList[i] = i + 1;
            }
            this.indexList.splice(this.count, this.indexList.length - this.count);
        }
        else if (this.index - 3 > 0 && this.index + 3 >= this.count) {
            var o = this.index + 3 - this.count;
            var ro = 0;
            for (var i = o; i > 0; i--) {
                if ((this.index - 3 - o) >= 1) {
                    ro = i;
                    break;
                }
            }
            var t = 1;
            for (var i = 2 + ro; i >= 0; i--) {
                this.indexList[i] = this.index - t;
                t++;
            }
            this.indexList[2 + ro + 1] = this.index;
            var t = 1;
            for (var i = 2 + ro + 2; i < this.indexList.length; i++) {
                this.indexList[i] = this.index + t;
                t++;
            }
        } else if (this.index - 3 <= 0 && this.index + 3 <= this.count) {
            var o = this.index - 3;
            if (o < 0) {
                o = -o;
            }
            o = o + 1;
            for (var i = 0; i < 3 - o; i++) {
                this.indexList[i] = i + 1;
            }
            this.indexList[3 - o] = this.index;
            var t = 1;
            for (var i = 3 - o + 1; i < this.indexList.length; i++) {
                this.indexList[i] = this.index + t;
                t++;
            }
        }
    }
}