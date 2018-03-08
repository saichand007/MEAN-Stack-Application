import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class GetserviceService {
  id:string;
  data:{};
  newId:string;
  username:string;
  password:string;
  rslt:any;
  token:string;
  obj:any; 
  constructor(private http: Http) {}


  getlogin(value:any)
  {
   this.data={
     username:value.username,
     password:value.password
   };
   return this.http.post('http://localhost:3000/api/users/login',this.data);
  }
  
  sendToken(tokenn:string)
  {
    this.token=tokenn;
  }


   getData() {
      // add authorization header with jwt token
      let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
      console.log(headers);
      let options = new RequestOptions({ headers: headers });
      return this.http.get('http://localhost:3000/api/hotels',options)
    
    }



    getId(id:string)
    {
      // add authorization header with jwt token
     let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
     console.log(headers);
     let options = new RequestOptions({ headers: headers });
      this.newId=id;
  
      return this.http.get('http://localhost:3000/api/hotels/'+this.newId,options);
    }

    getReview(id:string)
    {

      return this.http.get('http://localhost:3000/api/hotels/'+id+'/reviews');
    }
   

   postReview(value:any)
    {
      this.id=value.id;
     this.data={
        name:value.name,
        review: value.review,
        rating: value.rating
      };
        
      return this.http.post('http://localhost:3000/api/hotels/'+this.id+'/reviews/',this.data);
    
    }

    registerUser(data:any)
    {
      return this.http.post('http://localhost:3000/api/users/register',data);
    }
    
  
  }
  
