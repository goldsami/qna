import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions.service';
import { Observable } from 'rxjs';
import { Question } from '../types';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  public questions$: Observable<Question[]>;

  constructor(private readonly _quesionsService: QuestionsService) { }

  ngOnInit(): void {
    this.fetchQuestions();
  }

  public fetchQuestions() {
    this.questions$ = this._quesionsService.getQuestions();
  }

}
