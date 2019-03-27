import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Robot } from '../models/robot';
import { Task } from '../models/task';
import { RobotType } from '../models/robotType';
import {catchError, map, tap} from 'rxjs/operators';
import {TaskService} from './task.service';

@Injectable(
  {
  providedIn: 'root'
}
)
export class RobotService {

  private apiUrl = 'http://localhost:3000/api/';
  private robotsUrl = `${this.apiUrl}robots`; // URL to robots endpoint
  private robotDetailUrl = `${this.apiUrl}robots/detail/`; // URL to robots endpoint
  private robotTypesUrl = `${this.apiUrl}robot/types`; // URL to types endpoint


  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private taskService: TaskService
  ) { }

  getRobots(): Observable<Robot[]> {
    // TODO: send the message _after_ fetching the robots
    this.log('fetched robots');
    return this.http.get<Robot[]>(this.robotsUrl)
      .pipe(
        // TODO: Refactor to use an reusable adapter pattern
        map((data: any[]) => data['data'].map((item: any) => new Robot(
          item.id,
          item.name,
          item.type
        ))),
        // map((data: any[]) => data.map((item: any) => new Robot(
        //   item.id,
        //   item.name,
        //   item.type
        // ))),
        catchError(this.handleError('getRobots', []))
      );
  }

  getTopRobots(n: Number): Observable<Robot[]> {
    // TODO: send the message _after_ fetching the robots
    this.log('fetched robots');
    return this.http.get<Robot[]>(`${this.robotsUrl}/leaders/${n}`)
      .pipe(
        // TODO: Refactor to use an reusable adapter pattern
        map((data: any[]) => data['data'].map((item: any) => new Robot(
          item.id,
          item.name,
          item.type
        ))),
        // map((data: any[]) => data.map((item: any) => new Robot(
        //   item.id,
        //   item.name,
        //   item.type
        // ))),
        catchError(this.handleError('getRobots', []))
      );
  }

  getRobot(id: number): Observable<Robot> {
    return this.http.get(`${this.robotDetailUrl}${id}`)
      .pipe(map(res => {
        // ToDo: Figure out how to return res as a single object instead of an array
        return new Robot(res['data'][0].id, res['data'][0].name, res['data'][0].type) as Robot;
      }));
  }


  addNewRobot(robot: Robot): Observable<Robot> {
    return this.http.post<Robot>(this.robotsUrl, robot)
      .pipe(
        tap(
          (newRobot: Robot) => this.doTasks(newRobot['data'][0], newRobot['data'][1])
          // (newRobot: Robot) => this.log(`added robot w/ id=${newRobot['data'][0].id}`)
        ),
        catchError(this.handleError<Robot>('addRobot'))
      );
  }

  doTasks(robot: Robot, tasks: Task[]) {
    for (let i = 0; i < tasks.length; i ++){
      this.log(`Please wait while ${robot.name} completes the task : ${tasks[i]['task_name']} (${tasks[i]['task_points']} points)`)
      setTimeout( () => {
        this.log(`${robot.name} has finished task : ${tasks[i]['task_name']} after ${Number(tasks[i]['task_time']) / 1000} seconds`);
      }, Number(`${tasks[i]['task_time']}`));
    }
  }

  getTypes(): Observable<RobotType[]> {
    // TODO: send the message _after_ fetching the robots
    this.log('fetched robot-types');
    return this.http.get<RobotType[]>(this.robotTypesUrl)
      .pipe(
        // TODO: Refactor to use an reusable adapter pattern
        map((data: any) => data['data']['docs'].map((item: any[]) => new RobotType(
          item['name'],
          item['description'],
        ))),
        catchError(this.handleError('getTypes', []))
      );
  }

  /** Log a RobotService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`RobotService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
