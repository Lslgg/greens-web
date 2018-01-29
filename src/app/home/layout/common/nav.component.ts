import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';

@Component({
    selector: 'home-nav',
    templateUrl: 'nav.html',
    styleUrls: ['./nav.scss']
})

export class NavComponent implements OnInit {

    menuInfo: { name1: String, name2: String, name3: String, name4: String, name5: String, name6: String, name7: String };

    constructor(private apollo: Apollo, private router: Router) {
    }
    ngOnInit() {
        this.apollo.query<{ menuInfo: any }>({
            query: gql`query {
				menuInfo:getMenul {
					id,name1,name2,name3,name4,name5,name6,name7
                }           
            }`,
        }).subscribe(({ data }) => {
            if (data.menuInfo && data.menuInfo[0]) {
                this.menuInfo = data.menuInfo[0];
            }
        });
    }

    doSearch(str: String) {        
        if (str) {            
            if(window.location.href.includes("/home/news")) {                
                this.router.navigate(['/home/snews/1/' + str]);
            } else {
                this.router.navigate(['/home/news/1/' + str]);
            }
            
        }
    }
}
