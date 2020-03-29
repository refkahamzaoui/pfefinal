import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, retry, tap } from 'rxjs/operators';
import { TextEditorComponent } from '../pages/text-editor/text-editor.component';
import { subtasks } from '../models/task';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
 

@Injectable({
  providedIn: 'root'
})
export class TemplateserviceService {
  of;
  dialogData: any;
  dataChange: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })

  } 
  url = `http://localhost:3000/task/`;
  url2 = `http://localhost:3000/task/subtasks`;
  constructor(private http:HttpClient) {}
  tasks:Task[];
  getPlns():Observable<Task[]>{
    return this.http.get<Task[]>(this.url)
  
  }
  getsub():Observable<subtasks[]>{
    return this.http.get<subtasks[]>(this.url2)
  
  }

  

 creatme(task:Task){
return this.http.post<Task>(this.url,task);
 }
 getDialogData() {
  return this.dialogData;
}
getAllItems(): void {
  this.http.get<Task[]>(this.url).subscribe(data => {
    this.dataChange.next(data['items']);
    // console.log(data['items']);
  });
}
getTasks():Observable<Task[]>{
  return this.http.get<Task[]>(this.url)

}
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // Let the app keep running by returning an empty result.
    return this.of(result as T);
  };
}
createUser(user: Task): Observable<Task> {
  return this.http.post<Task>(this.url, user);
}
getEmployee(id): Observable<Task> {
  return this.http.get<Task>(this.url2 +'/task?id/' +id)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}  
updateEmployee(id, employee): Observable<Task> {
  return this.http.put<Task>(this.url + '/task/' + id, JSON.stringify(employee), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}
getProductDetails(id){
  return this.http.get(this.url + '/task?id/=' + id);
}

getUserById(id: number) {
  return this.http.get<Task>(this.url + '/'  + id);
}

updateUser(user: Task) {
  return this.http.put(this.url + '/'  + user.id, user);
}

  
}