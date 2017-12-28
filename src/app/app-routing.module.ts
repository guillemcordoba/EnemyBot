import { EndComponent } from './components/end/end.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { TrapComponent } from './components/trap/trap.component';
import { AdminComponent } from './components/admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionComponent } from './components/question/question.component';

const routes: Routes = [{
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'trap', component: TrapComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'end', component: EndComponent },
  { path: 'question/admin/edit', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
