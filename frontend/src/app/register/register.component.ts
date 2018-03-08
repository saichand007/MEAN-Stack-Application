import { Component, OnInit } from '@angular/core';
import { GetserviceService } from '../getservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username:string;
  password:string;
  name:string;
  registered:any;

  constructor(private service:GetserviceService,private router:Router) { 
  }

  ngOnInit() {
  }

  register(f)
  {
    const data={

      name:f.name,
      username:f.username,
      password:f.password
    }
   
  this.service.registerUser(data)
  .subscribe(res=>{
 
    this.registered=res;
   this.reset();
   this.router.navigate(['/login']);
  },
err=>{
  console.log(err);
});

  }

  reset()
  {
     this.name='';
     this.username='';
     this.password='';
  }
}
