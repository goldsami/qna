import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { QuestionsService } from '../questions.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil, tap } from 'rxjs/operators'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit, OnDestroy {
  @Output() questionAdded = new EventEmitter();

  private readonly _onDestroy$ = new Subject();
  public form: FormGroup;

  constructor(
    private readonly _questionsService: QuestionsService,
    private readonly _fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
    })
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  submit() {
    if (!this.form.valid) {
      alert('Form is invalid'); // TODO: add proper validation
      return
    }

    this._questionsService.addQuestion(this.form.getRawValue()).pipe(
      takeUntil(this._onDestroy$),
      tap(() => this.questionAdded.emit()),
    ).subscribe();
  }

}
