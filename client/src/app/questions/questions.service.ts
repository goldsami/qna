import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from './types';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private readonly _baseUrl = 'http://localhost:8080/questions/'; // TODO: move to config

  public question$: Observable<Question[]>;

  constructor(private readonly _httpClient: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this._httpClient.get<Question[]>(this._baseUrl);
  }

  addQuestion(body: Pick<Question, 'question' | 'answer'>) {
    return this._httpClient.put(this._baseUrl, body);
  }
}
