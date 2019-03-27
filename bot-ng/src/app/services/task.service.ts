import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable, of} from 'rxjs';
import { Task } from '../models/task';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = 'api/tasks'; // URL to web api
  private apiUrl = `http://localhost:3000/${this.tasksUrl}`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getTasks(): Observable<Task[]> {
    // TODO: send the message _after_ fetching the tasks
    this.log('fetched tasks');
    return this.http.get<Task[]>(this.apiUrl)
      .pipe(
        map( (data: any[]) => data['data']['docs'].map((item: any) => new Task(
          item.description,
          item.eta
        ))),
        catchError(this.handleError('getTasks', []))
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
