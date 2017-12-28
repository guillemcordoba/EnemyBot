import { Question, State } from './../eb.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class QuestionsService {
  public getQuestions(): Observable<Question[]> {
    return this.angularFire.list<Question>('questions').valueChanges();
  }

  public getState(): Observable<State> {
    return this.angularFire.object<State>('state').valueChanges();
  }

  public incrementQuestionNumber(newState: Partial<State>): void {
    this.angularFire.object<State>('state').update({
      ...newState,
      'init-timestamp': Date.now(),
      fails: 0
    });
  }

  public isUserRegistered(): Observable<boolean> {
    return this.angularFire
      .object('fcmToken')
      .valueChanges()
      .map(token => token !== null);
  }

  public beginGame() {
    this.angularFire.object('state').update({
      'init-timestamp': Date.now(),
      'question-number': 0
    });
  }

  public clearToken() {
    this.angularFire.object('fcmToken').remove();
    this.angularFire.object('state').update({
      'question-number': -1,
      fails: 0
    });
  }

  public decreaseQuestionTime(initialFails: number) {
    this.angularFire.object<State>('state').update({
      fails: initialFails + 1
    });
  }

  public updateQuestions(questions: Question[]) {
    this.angularFire.object<Question[]>('questions').set(questions);
  }

  constructor(private angularFire: AngularFireDatabase) {}
}
