import { State } from './../../eb.model';
import { QuestionsService } from './../../services/questions.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'eb-trap',
  templateUrl: './trap.component.html',
  styleUrls: ['./trap.component.css']
})
export class TrapComponent implements OnInit {

  constructor(private router: Router, private questions: QuestionsService) { }

  ngOnInit() {
    this.questions.getState().subscribe(state => {
      if (state['question-number'] >= 0) {
        this.router.navigate(['/question']);
      }
    });
  }

  beginGame() {
    this.questions.beginGame();
    this.router.navigate(['/question']);
  }

}
