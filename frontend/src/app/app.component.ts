import {Component, OnInit} from '@angular/core';
import {PageService} from './service/page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isScrolled: boolean;

  constructor(private pageService: PageService) {

  }

  ngOnInit(): void {
    this.pageService.init();

  }


}
