import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RobotService } from '../../services/robot.service';
import {Robot} from '../../models/robot';

@Component({
  selector: 'app-robot-manager',
  templateUrl: './robot-manager.component.html',
  styleUrls: ['./robot-manager.component.sass']
})
export class RobotManagerComponent implements OnInit {

  robotForm: FormGroup;
  submitted = false;
  success = false;
  typeNames = [];
  robots = [];

  constructor(
    private formBuilder: FormBuilder,
    private robotsService: RobotService) { }

  ngOnInit() {
    // Get array of RobotType names
    // ToDo: Remove hard-coded robot type names
    // this.typeNames = ['bipedal', 'rotational', 'quadrupedal'];
    // ToDo: Fix issue with RobotType from mongodb
    this.robotsService.getTypes()
      .subscribe(robotTypes => this.typeNames = robotTypes);
    console.log(this.typeNames);
    // rTypes.forEach(x => this.typeNames.push(x['name']));
    this.robotForm = this.formBuilder.group({
      robotName: ['', Validators.required],
      robotType: [(String)(this.typeNames[0]), Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.robotForm.invalid) {
      return;
    }
    this.add(
      1,
      this.robotForm.controls.robotName.value,
      this.robotForm.controls.robotType.value
    )
    this.success = true;
  }

  add(id: number, name: string, type: string): void {
    this.robotsService.addNewRobot({id, name, type} as Robot)
      .subscribe(robot => {
        this.robots.push(robot);
      });
  }

}
