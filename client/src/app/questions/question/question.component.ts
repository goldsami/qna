import { Component, Input } from '@angular/core';
import { Question } from '../types';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  @Input() question: Question;

  public isExpanded = false;

  public toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
