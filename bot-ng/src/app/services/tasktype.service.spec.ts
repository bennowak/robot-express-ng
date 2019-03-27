import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable, of} from 'rxjs';
import { TaskType } from '../models/taskType';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskTypeService {

  private taskTypesUrl = 'api/task-types'; // URL to web api
  private apiUrl = `http://localhost:3000/${this.taskTypesUrl}`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getTaskTypes(): Observable<TaskType[]> {
    // TODO: send the message _after_ fetching the taskTypes
    this.log('fetched taskTypes');
    return this.http.get<TaskType[]>(this.apiUrl)
      .pipe(
        map( (data: any[]) => data['data']['docs'].map((item: any) => new TaskType(
          item.description,
          item.eta
        ))),
        catchError(this.handleError('getTaskTypes', []))
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
