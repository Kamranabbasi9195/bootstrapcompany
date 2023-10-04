import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  postEmploye(  data : any){
    return this.http.post<any>("http://localhost:3000/employee", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getEmploye(  data : any){
    return this.http.get<any>("http://localhost:3000/employee", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateEmploye(  data : any){
    return this.http.put<any>("http://localhost:3000/employee", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteEmploye(  data : any){
    return this.http.delete<any>("http://localhost:3000/employee", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  
}
