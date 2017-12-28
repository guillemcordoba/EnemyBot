import { MatSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { QuestionsService } from './../../services/questions.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Question } from '../../eb.model';
import { query } from '@angular/core/src/animation/dsl';

@Component({
  selector: 'eb-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  questions: Array<Question>;

  constructor(private questionsService: QuestionsService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.questionsService.getQuestions().subscribe(q => (this.questions = q));
  }

  addQuestion() {
    this.questions = [
      ...this.questions,
      {
        question: '',
        answer: '',
        timedelay: 5
      }
    ];
    console.log(this.questions);
  }

  removeQuestion(index) {
    this.questions.splice(index, 1);
  }

  saveQuestions() {
    this.questionsService.updateQuestions(this.questions);
    this.snackBar.open('Preguntes guardades', null, {duration: 3000});
  }
}
