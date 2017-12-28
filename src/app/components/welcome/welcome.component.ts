import { Router } from '@angular/router';
import { QuestionsService } from './../../services/questions.service';
import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'eb-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  constructor(
    private msgService: NotificationService,
    private questions: QuestionsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.msgService.getPermission();
    this.msgService.receiveMessage();
  }
}
