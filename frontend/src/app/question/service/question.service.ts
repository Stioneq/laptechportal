import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {getApiUrl, getServerUrl} from '../../util/url.util';
import {QuestionPreview} from '../model/question-preview';
import {GetQuestionResponse, GetQuestionsResponse} from '../../../../types/portal';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) {
  }

  rateQuestion(id: string, value: number, name: string): Observable<any> {
    const httpParams = new HttpParams()
      .append('rating', value + '');

    return this.http.post<void>(getServerUrl('questions', id, 'rate'), null, {params: httpParams});
  }

  addQuestion(q: QuestionPreview): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.put(getServerUrl('questions'), q, {headers: headers});
  }

  getQuestions(filters): Observable<GetQuestionsResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<GetQuestionsResponse>(getServerUrl('questions'), filters, {headers: headers});
  }

  getQuestion(id: string) {
    if (id) {
      return this.http.get<GetQuestionResponse>(getServerUrl('questions', id));
    }
  }

  deleteQuestion(id: string) {
    return this.http.delete<void>(getServerUrl('questions', id));
  }

  editQuestion(q: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.put<void>(getServerUrl('questions', q.id), q, {headers: headers});
  }
}
