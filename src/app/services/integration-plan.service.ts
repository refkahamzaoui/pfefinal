import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{Plan} from '../models/plan';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class IntegrationPlanService {
  url = 'http://localhost:3000/plan';
  planList:Plan[];
  filteredData = [];
  filterText;
  paln:Plan;
  constructor(private http: HttpClient) { }
  

    
   /* getAll(): Observable<any> {
      return this.http.get(this.url).map(response => response.json());
    }
    getArticles(): Observable < Plan[] > {  
      return this.http.get(this.url).map((response: Response) => {  
          return <Plan[] > response.json()  
      }).catch(this.handleError);  
  } */
  getPlns():Observable<Plan[]>{
    return this.http.get<Plan[]>(this.url)

}
getPlans():Observable<Plan[]>{
  if(this.paln.status="done")
  return this.http.get<Plan[]>(this.url)

}

ngOnInit() {
  this.filteredData = [this.url];
}
  

  
}


