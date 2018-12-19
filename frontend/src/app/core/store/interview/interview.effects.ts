import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ProgressRegistryService} from "ngx-rxprogress";
import {InterviewActionTypes, LoadSuccess} from "./interview.actions";
import {Action} from "@ngrx/store";
import {Observable, timer} from "rxjs/index";
import {map, mergeMap} from "rxjs/internal/operators";


@Injectable()
export class InterviewEffects {

  constructor(private actions$: Actions, private progressRegistry: ProgressRegistryService) {
  }


  @Effect()
  LoadInterviews$: Observable<Action> = this.actions$
  .pipe(ofType(InterviewActionTypes.LOAD_INTERVIEW),
    mergeMap(_ => {
      return this.progressRegistry.register('TEST', timer(1000)).pipe(
        map(_ => new LoadSuccess(['a', 'b', 'c', 'd']))
      )
    }))


}
