import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'home-home',
    templateUrl: 'home.html',
    styleUrls: ['home.css'],
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
})

export class HomeComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {

     }

}