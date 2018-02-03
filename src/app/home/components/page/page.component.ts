import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular/Apollo';
import { variable } from '@angular/compiler/src/output/output_ast';
import { IndexList } from '../../index/index.routing';

@Component({
    selector: 'lcwebsite-home-page',
    templateUrl: 'page.html',
    styleUrls: ['./page.scss'],
})

export class PageComponent implements OnInit {


    @Output() onChangePage = new EventEmitter<number>();
    rindex: number;
    rcount: number;
    rlimit: number;
    pageSize: number;
    @Input()
    set count(count: number) {
        if (count) {
            this.rcount = count;
            this.initPage();
        }
    }
    @Input()
    set index(index: number) {
        if (index) {
            this.rindex = index;
            this.initPage();
        }
    }
    @Input()
    set limit(limit: number) {
        if (limit) {
            this.rlimit = limit;
            this.initPage();
        }
    }


    isShow: boolean = false;
    indexList: Array<number> = [-1, -1, -1, -1, -1, -1, -1];
    constructor(private router: Router, private apollo: Apollo) {

    }

    onChangep(num: number) {
        if (!this.rindex || !this.rcount)
            return;
        if (num <= 0 || num > this.pageSize) {
            return;
        }
        this.rindex = num;
        this.onChangePage.emit(num);
        this.initPage();
    }

    ngOnInit() {
    }

    initPage() {
        if (!this.rindex || !this.rcount || !this.rlimit) {
            return;
        }
        var t = this.rcount / this.rlimit;
        this.pageSize = parseInt(t + '');
        if ((this.rindex % this.rlimit) > 0 || this.pageSize == 0) {
            this.pageSize++;
        }
        if (this.rindex <= this.rcount && this.rindex > 0 && this.rcount >= 2) {
            this.isShow = true;
        }
        else {
            return;
        }

        if (this.rindex - 3 > 0 && this.rindex + 3 <= this.rcount) {
            this.indexList[0] = this.rindex - 3;
            this.indexList[1] = this.rindex - 2;
            this.indexList[2] = this.rindex - 1;
            this.indexList[3] = this.rindex;
            this.indexList[4] = this.rindex + 1;
            this.indexList[5] = this.rindex + 2;
            this.indexList[6] = this.rindex + 3;
        }
        else if (this.pageSize <= 7) {
            for (var i = 0; i < this.pageSize; i++) {
                this.indexList[i] = i + 1;
            }
            this.indexList.splice(this.pageSize, this.indexList.length - this.pageSize);
        }
        else if (this.rindex - 3 > 0 && this.rindex + 3 >= this.pageSize) {
            var o = this.rindex + 3 - this.pageSize;
            var ro = 0;
            for (var i = o; i > 0; i--) {
                if ((this.rindex - 3 - o) >= 1) {
                    ro = i;
                    break;
                }
            }
            var t = 1;
            for (var i = 2 + ro; i >= 0; i--) {
                this.indexList[i] = this.rindex - t;
                t++;
            }
            this.indexList[2 + ro + 1] = this.rindex;
            var t = 1;
            for (var i = 2 + ro + 2; i < this.indexList.length; i++) {
                this.indexList[i] = this.rindex + t;
                t++;
            }
        } else if (this.rindex - 3 <= 0 && this.rindex + 3 <= this.pageSize) {
            var o = this.rindex - 3;
            if (o < 0) {
                o = -o;
            }
            o = o + 1;
            for (var i = 0; i < 3 - o; i++) {
                this.indexList[i] = i + 1;
            }
            this.indexList[3 - o] = this.rindex;
            var t = 1;
            for (var i = 3 - o + 1; i < this.indexList.length; i++) {
                this.indexList[i] = this.rindex + t;
                t++;
            }
        }
    }
}