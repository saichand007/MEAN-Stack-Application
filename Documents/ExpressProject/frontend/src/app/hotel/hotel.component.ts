import { Component, OnInit } from '@angular/core';
import { GetserviceService } from '../getservice.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  resdata:{};

  constructor(private service: GetserviceService,private router:Router) {
    this.service.getData()
    .subscribe(
      res => {
      this.logdata(res);
        
      },
      err => {
        console.log("Error occured");
      }
    );
   }

   logdata(res:any)
   {
     this.resdata=JSON.parse(res._body);
      console.log(this.resdata);
   
   }

   logout()
   {
       // clear token remove user from local storage to log user out
       
       localStorage.removeItem('currentUser');
       this.router.navigate(['/login']);
   }

  ngOnInit() {
  }

}
