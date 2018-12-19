import { Comment } from './../model/comment';
import { Injectable } from '@angular/core';
import { getApiUrl, getServerUrl } from '../../util/url.util';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  CommentDTO,
  GetCommentResponse,
  GetCommentsResponse
} from '../../../../types/portal';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(public http: HttpClient) {}

  addComment(
    questionId: string,
    comment: CommentDTO
  ): Observable<GetCommentResponse> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.put<GetCommentResponse>(
      getServerUrl('questions', questionId, 'comments'),
      comment,
      { headers: headers }
    );
  }

  getComments(questionId: string): Observable<GetCommentsResponse> {
    return this.http.get<GetCommentsResponse>(
      getServerUrl('questions', questionId, 'comments')
    );
  }

  deleteComment(questionId: string, id: string) {
    return this.http.delete<void>(
      getServerUrl('questions', questionId, 'comments', id)
    );
  }

  editComment(questionId, comment: Comment): Observable<GetCommentResponse> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.http.put<GetCommentResponse>(
      getServerUrl('questions', questionId, 'comments', comment.id),
      { text: comment.text, icon: 1 },
      { headers: headers }
    );
  }
}
