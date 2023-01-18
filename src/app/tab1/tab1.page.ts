import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public id: any;
  public posts: any;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.recupPost();
  }

  goToDetail(id: any) {
    this.router.navigate(['/home', id]);
  }

  recupPost(id?: number) {
    this.http
      .get('https://jsonplaceholder.typicode.com/posts')
      .subscribe((data) => {
        this.posts = data;
        console.log(this.posts);
      });
  }
}
