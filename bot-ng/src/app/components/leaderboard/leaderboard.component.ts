import { Component, OnInit } from '@angular/core';
import { Robot } from '../../models/robot';
import { RobotService} from '../../services/robot.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.sass']
})
export class LeaderboardComponent implements OnInit {

  robots: Robot[] = [];

  constructor(private robotService: RobotService) { }

  ngOnInit() {
    this.getRobots(4);
  }

  getRobots(top_num: number): void {
    this.robotService.getTopRobots(top_num)
      .subscribe(robots => this.robots = robots.slice(0, top_num));
    console.log(this.robots);
  }

}
