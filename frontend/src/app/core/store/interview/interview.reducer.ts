


import {InterviewState, intitialInterviewState} from './interview.state';
import {InterviewActions, InterviewActionTypes} from './interview.actions';

export function interviewReducer(state = intitialInterviewState, action: InterviewActions): InterviewState {
  console.log(`New action was dispatched ${action.type}`);
  switch (action.type) {
    case InterviewActionTypes.ADD_INTERVIEW:
      const data = state.data.slice();
      data.push(action.payload);
      return {...state, data: data};
    default:
      return state;
  }
}
