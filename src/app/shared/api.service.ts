import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http:HttpClient) { }

  //post
  postRestaurant(data:any){
    return this.http.post<any>("http://localhost:3000/posts",data).pipe(map((res:any)=>{
      return res;
    }))
  }


  //Get
  getRestaurant(){
    return this.http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{
      return res;
    }))
  }

    //updata
    updateRestaurant(data:any, id:number){
      return this.http.patch<any>("http://localhost:3000/posts/"+id,data).pipe(map((res:any)=>{
        return res;
      }))
    }

      //delete
      deleteRestaurant( id:number){
        return this.http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{
          return res;
        }))
      }

}
