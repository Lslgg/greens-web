import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home-slide',
    templateUrl: 'slide.html',
    styleUrls:['./slide.scss']  
})

export class SlideComponent implements OnInit {
    
    strArr:Array<String> = [];
    ponintArray:Array<boolean> = [];
    constructor() { }

    ngOnInit() { 
     this.getList();   
    }
    

    getList() {
        var list:Array<String> = ["../../../../assets/test/t016f36e26edd3519d5.jpg",
        "../../../../assets/test/t019c00f2bd632ef11f.jpg",
        "../../../../assets/test/t0103b3b3322ae7b53d.jpg",
        "../../../../assets/test/t0114c38e1b2b17a79b.jpg"];

        this.strArr.push(list[list.length-1]);
        for(var i=0;i<list.length;i++) {
            this.strArr.push(list[i]);
            this.ponintArray[i] = false;
        }
        this.ponintArray[0] = true;
        this.strArr.push(list[0]);   
        console.log(this.strArr);     
    }    

    goRight() {
        if(!this.strArr || this.strArr.length==1) {
            return;
        }
    }

    goLeft() {

    }
}