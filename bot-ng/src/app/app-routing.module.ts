import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RobotsComponent } from './components/robots/robots.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { RobotDetailComponent} from './components/robot-detail/robot-detail.component';
import {RobotManagerComponent} from './components/robot-manager/robot-manager.component';

const routes: Routes = [
  { path: 'robots', component: RobotsComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: '', redirectTo: '/leaderboard', pathMatch: 'full' },
  { path: 'robots/detail/:id', component: RobotDetailComponent },
  { path: 'manage', component: RobotManagerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
