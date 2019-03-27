import { Component, OnInit } from '@angular/core';
import { Robot } from '../../models/robot';
import { RobotService } from '../../services/robot.service';
import { RobotType } from '../../models/robotType';

@Component({
  selector: 'app-robots',
  templateUrl: './robots.component.html',
  styleUrls: ['./robots.component.sass']
})
export class RobotsComponent implements OnInit {

  robots: Robot[];
  robotTypes: RobotType[];

  constructor(private robotService: RobotService) { }

  ngOnInit() {
    this.getRobots();
    this.getRobotTypes();
  }

  getRobots(): void {
    this.robotService.getRobots()
      .subscribe(robots => this.robots = robots);
  }

  getRobotTypes(): void {
    this.robotService.getTypes()
      .subscribe(robotTypes => this.robotTypes = robotTypes);
  }

}
