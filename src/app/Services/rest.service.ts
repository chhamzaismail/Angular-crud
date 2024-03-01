import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  url:string ='http://localhost/AdminLteDashboard/public/api/';

  constructor(private httpClient: HttpClient) { }

  get( path:any){  //get   
    return this.httpClient.get(this.url + path);
    
  } 
  post(InputData:object, path:any){   //save 
  
    return this.httpClient.post(this.url + path ,InputData);
    
  }
  // put(InputData:object, studentId:any, path:any){   //update
 
  //   return this.httpClient.put(this.url + path +studentId,InputData);

  // }  
  // editStudent(studentId:any, path:any){     //edit
    
  //   return this.httpClient.get(this.url +path+ studentId );
  // } 

  destroy( studentId:any,  path:any){    //delete
 
    return this.httpClient.delete(this.url +path+ studentId );

  } 
}
