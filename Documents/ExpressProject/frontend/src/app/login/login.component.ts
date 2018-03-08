import { Component, OnInit } from '@angular/core';
import { GetserviceService } from '../getservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  
   username:String;
   password:String;
  
   rslt:any;
   obj:any; 
   token:string;
  

  constructor(private service:GetserviceService,private router:Router) { }

  ngOnInit() {
  }


  login(value:any)
  {
    const data=
    {
      username:value.username,
      password:value.password
    };

    

    this.service.getlogin(data)
    .subscribe(res => 
      {
         this.rslt=res;
     
      this.obj = JSON.parse(this.rslt._body);
        if(this.obj)
        { 
       
          this.token=this.obj.token;
          
          this.service.sendToken(this.token);

          this.router.navigate(['/hotel']);
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ token: this.token }));
        
        }
      },
      err => {
        console.log("Error occured");
      });

  }

 


}
