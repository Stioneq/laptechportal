import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../core/store/app.state';
import {Observable} from "rxjs/index";
import {LoadInterview} from "../core/store/interview";

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit {
  interviews: Observable<ReadonlyArray<string>>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.interviews = this.store.select('interview', 'data');
  }

  addInterview(value: string) {
    console.log('dasdasd');
    this.store.dispatch(new LoadInterview());
  }
}
