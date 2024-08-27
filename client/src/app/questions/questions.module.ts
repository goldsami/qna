import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionComponent } from './question/question.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [QuestionsComponent, QuestionComponent, AddQuestionComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
    QuestionsComponent,
  ]
})
export class QuestionsModule { }
