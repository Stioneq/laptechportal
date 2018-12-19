import {Action} from '@ngrx/store';

export enum InterviewActionTypes {
  ADD_INTERVIEW = '[Interview] Add interview',
  LOAD_INTERVIEW = '[Interview] Load interview',
  LOAD_SUCCESS = '[Interview] Load success'
}

export class AddInterview implements Action {
  readonly type = InterviewActionTypes.ADD_INTERVIEW;

  constructor(public payload: string) {
  }
}

export class LoadInterview implements Action {
  readonly type = InterviewActionTypes.LOAD_INTERVIEW;

}

export class LoadSuccess implements Action {
  readonly type = InterviewActionTypes.LOAD_SUCCESS;

  constructor(public payload: string[]) {
  }
}

export type InterviewActions = AddInterview | LoadInterview | LoadSuccess;
