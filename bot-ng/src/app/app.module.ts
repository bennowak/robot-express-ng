import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RobotsComponent } from './components/robots/robots.component';
import { RobotDetailComponent } from './components/robot-detail/robot-detail.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { MessagesComponent } from './components/messages/messages.component';
import { RobotService } from './services/robot.service';
import { RobotManagerComponent } from './components/robot-manager/robot-manager.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { NavComponent } from './components/nav/nav.component';
import { TaskService } from './services/task.service';
import { MessageService } from './services/message.service';
import { TasktypeService} from './services/tasktype.service';

@NgModule({
  declarations: [
    AppComponent,
    RobotsComponent,
    RobotDetailComponent,
    LeaderboardComponent,
    MessagesComponent,
    RobotManagerComponent,
    TasksComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RobotService, TaskService, MessageService, TasktypeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
