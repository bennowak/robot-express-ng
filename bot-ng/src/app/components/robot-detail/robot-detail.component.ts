import { Component, OnInit, Input } from '@angular/core';
import { Robot } from '../../models/robot';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RobotService } from '../../services/robot.service';

@Component({
  selector: 'app-robot-detail',
  templateUrl: './robot-detail.component.html',
  styleUrls: ['./robot-detail.component.sass']
})
export class RobotDetailComponent implements OnInit {

  @Input() robotDetail: Robot;

  constructor(
    private route: ActivatedRoute,
    private robotService: RobotService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getRobot();
  }

  getRobot(): void {
    const id = Number(+this.route.snapshot.paramMap.get('id'));
    this.robotService.getRobot(id)
      .subscribe(robot => this.robotDetail = robot);
  }

  goBack(): void {
    this.location.back();
  }
}
