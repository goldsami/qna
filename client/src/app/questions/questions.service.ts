import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question } from './types';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private readonly _origin = 'http://localhost:8080/';
  private readonly _baseUrl = this._origin + 'questions/'; // TODO: move to config

  public question$: Observable<Question[]>;

  constructor(private readonly _httpClient: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this._httpClient.get<Question[]>(this._baseUrl);
  }

  addQuestion(body: Pick<Question, 'question' | 'answer'>) {
    return this._httpClient.put(this._baseUrl, body);
  }

  lockQuestion(id: string): Observable<any> {
    return this._httpClient.post(this._baseUrl + 'lock/' + id, {});
  }

  unlockQuestion(id: string): Observable<any> {
    return this._httpClient.post(this._baseUrl + 'unlock/' + id, {});
  }

  updateQuestion(id: string, body: Pick<Question, 'question' | 'answer'>) {
    return this._httpClient.post(this._baseUrl + id, body).pipe(
      tap(() => this.unlockQuestion(id)),
    );
  }

  deleteQuestion(id: string) {
    return this._httpClient.delete(this._baseUrl + id);
  }
}
