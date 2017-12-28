import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { State, Question } from './../../eb.model';
import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';
import { withLatestFrom, map } from 'rxjs/operators';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/startWith';
import { MatSnackBar } from '@angular/material';
import { query } from '@angular/animations/src/animation_metadata';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'eb-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  currentQuestion$: Observable<Question>;
  remainingTime$: Observable<Date>;

  currentQuestion: Question;
  questions: Question[];
  state: State;

  answer: string;

  constructor(
    private questionsService: QuestionsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private notifications: NotificationService
  ) {}

  ngOnInit() {
    this.currentQuestion$ = Observable.combineLatest(
      this.questionsService.getState(),
      this.questionsService.getQuestions()
    ).map(([state, questions]) => questions[state['question-number']]);

    this.remainingTime$ = Observable.interval(1000)
      .startWith(0)
      .withLatestFrom(this.currentQuestion$, this.questionsService.getState())
      .map(([seconds, currentQuestion, state]) => {
        const minutes =
          currentQuestion.timedelay -
          currentQuestion.timedelay * state.fails / 10;
        const endDate = state['init-timestamp'] + minutes * 60000;
        const date = new Date(endDate - Date.now());
        const date2 = new Date(
          date.getUTCFullYear(),
          date.getUTCMonth(),
          date.getUTCDate(),
          date.getUTCHours(),
          date.getUTCMinutes(),
          date.getUTCSeconds()
        );
        console.log(date2);
        if (endDate - Date.now() <= 0) {
          console.log('ATTACK');
          this.notifications.startAttack();
          this.questionsService.incrementQuestionNumber({
            'question-number': this.state['question-number']
          });
          this.snackBar.open('Ui ui ui... Attack incoming!', null, {
            duration: 3000
          });
        }
        return date2;
      });

    this.currentQuestion$.subscribe(
      question => (this.currentQuestion = question)
    );
    this.questionsService.getState().subscribe(s => (this.state = s));
    this.questionsService.getQuestions().subscribe(q => (this.questions = q));
  }

  submitAnswer(answer: string) {
    if (this.currentQuestion.answer === answer) {
      this.snackBar.open('Resposta correcte', null, { duration: 3000 });
      if (this.questions.length <= this.state['question-number'] + 1) {
        this.router.navigate(['/end']);
        this.questionsService.clearToken();
      } else {
        this.questionsService.incrementQuestionNumber({
          'question-number': this.state['question-number'] + 1
        });
      }
      answer = '';
    } else {
      this.snackBar.open('Resposta incorrecte: baixant el temps...', null, {
        duration: 3000
      });
      this.questionsService.decreaseQuestionTime(this.state.fails);
    }
  }
}
