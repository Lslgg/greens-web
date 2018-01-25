import { Component, OnInit, Input } from '@angular/core';


@Component({
    selector: 'home-title',
    templateUrl: 'title.html',
    styleUrls: ['./title.scss']
})

export class TitleComponent implements OnInit {
    @Input() ftitle:String = '';
    @Input() stitle:String = '';
    constructor() { }

    ngOnInit() {         
    }
}