import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  people: any = [];
  nextPage: any;
  previousPage: any;
  homeWorld: any = [];

  private url: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.url = 'https://swapi.co/api/people/';
    this.getData(this.url);
  }

  nextData(){
    this.url = this.nextPage;
    this.getData(this.url);
  }

  previousData(){
    this.url = this.previousPage;
    this.getData(this.url);
  }

  async getData(url) {
    await this.http.get(url).toPromise().then(data => {
      this.people = data['results'];
      this.nextPage = data['next'];
      this.previousPage = data['previous'];

      for (let i = 0; i < Object.keys(this.people).length; i++) {
        let res = this.people[i];

        res = res['homeworld'];

        this.http.get(res).toPromise().then(planet => {
          this.homeWorld[i] = planet['name'];
        });
      }
    });
  }
}
