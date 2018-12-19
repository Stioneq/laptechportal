import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  a = Array(Math.pow(Math.round(Math.random() * 3) + 1, 2)).fill(1);
  b = Math.sqrt(this.a.length);

  constructor() {
  }

  ngOnInit() {
  }

}
