import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { GetserviceService } from '../getservice.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  hotels:{};
  name:String;
  review:String;
  rating:Number;
  id:String;
  selected:String;


  constructor(private http:HttpClient,private service: GetserviceService)
  {
    /*
   
    this.service.getData().subscribe((hotels)=>
    {
      this.hotels=hotels;
    });
    */
  }

  Vselected(event:any)
  {
     this.selected=event.target.value;
    
  }

  reviews(value:any)
  {
    const formdata={

      name:value.name,
      review:value.review,
      rating:value.rating,
      id:this.selected
    }; 
 
   

   console.log(formdata);

   this.service.postReview(formdata);
  }


}
