import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {CommentAdd} from '../types/commentAdd';
import { delay, Observable } from 'rxjs';
import {CommentView} from '../types/commentView';
import {PagedModel} from '../types/pagedModel';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  createComment(commentAdd: CommentAdd, cocktailId: string) {
    return this.http.post<CommentView>(`/api/cocktails/${cocktailId}/comments`, commentAdd)
      .pipe(delay(2000));
  }

  deleteComment(cocktailId: string, commentId: number): Observable<void> {
    return this.http.delete<void>(`/api/cocktails/${cocktailId}/comments/${commentId}`)
      .pipe(delay(2000));
  }

  getComments(cocktailId: string, page: number = 0, size: number = 5): Observable<PagedModel<CommentView>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<PagedModel<CommentView>>(`/api/cocktails/${cocktailId}/comments`, { params })
      .pipe(delay(2000));
  }
}
