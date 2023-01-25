import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  titre: any;
  texte: any;

  constructor(private activatedRoute:ActivatedRoute ,private http:HttpClient) 
  {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.recupPosts(id);
  }

  public recupPosts(id:any):void{
    let data: Observable<any>;
    let url ="https://jsonplaceholder.typicode.com/posts/"+id;
    data=this.http.get(url);
    data.subscribe(
      resultat=>{
        this.titre=resultat.title;
        this.texte=resultat.body;
      }
    );

  }
  ngOnInit() {
  }
}