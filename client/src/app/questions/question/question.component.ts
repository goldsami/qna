import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Question } from '../types';
import { QuestionsService } from '../questions.service';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnDestroy {
  @Input() question: Question;

  @Output() questionUpdated = new EventEmitter();

  private readonly _onDestroy$ = new Subject();
  public isExpanded = false;
  public isEdit = false;

  constructor(
    private readonly _questionsService: QuestionsService,
  ) {}

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  public toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  public delete(id: string) {
    this._questionsService.deleteQuestion(id).pipe(
      takeUntil(this._onDestroy$),
      tap(() => this.questionUpdated.emit()),
    ).subscribe();
  }

  public lock(id: string) {
    this._questionsService.lockQuestion(id).pipe(
      takeUntil(this._onDestroy$),
      tap((res) => {
        if (res) this.isEdit = true;
        else alert('Question is already modified by another user');
      }),
    ).subscribe();

    // TODO: add update logic
  }
}
