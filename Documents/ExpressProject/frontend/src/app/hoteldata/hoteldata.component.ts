import { Component, OnInit } from '@angular/core';
import { GetserviceService } from '../getservice.service';
import{ActivatedRoute,Router} from "@angular/router";

@Component({
  selector: 'app-hoteldata',
  templateUrl: './hoteldata.component.html',
  styleUrls: ['./hoteldata.component.css']
})
export class HoteldataComponent implements OnInit {
   id:string;
   hotel:any;
   name:string;
   review:string;
   rating:number;
  constructor(private service:GetserviceService,private route: ActivatedRoute,
              private router:Router) { 

    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.id=params['id'];
      if(this.id)
      {
        this.service.getId(this.id).subscribe(res=>{
          console.log(res);
          this.data(res);
         
        },
        err => {
          console.log("Error occured");
        }
        
        );
      }
    });

    
  }

  ngOnInit() {
      
    
  }
  data(res:any)
  {
    this.hotel=JSON.parse(res._body);
    console.log(this.hotel);

  }

  logout()
  {
      // clear token remove user from local storage to log user out
      
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
  }

  reviews(value:any)
  {
    const formdata={

      name:value.name,
      review:value.review,
      rating:value.rating,
      id:this.id
    }; 
 


   this.service.postReview(formdata)  
     .subscribe(
    res => {
      if(res)
      {
        this.reviewData()
      }
   
    },
    err => {
      console.log("Error occured");
    }
  );
  }

  reviewData()
  {
    this.service.getReview(this.id)
    .subscribe(res=>{
    console.log("review:",res);
    }, err => {
      console.log("Error occured");
    });

  }

}
