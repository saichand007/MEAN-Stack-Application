import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';


import{HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { GetserviceService } from './getservice.service';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';
import { HotelComponent } from './hotel/hotel.component';
import { AuthGuard } from '../app/authguard';
import { HoteldataComponent } from './hoteldata/hoteldata.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '',redirectTo: '/login',pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  {path: 'hotel/:id', component:HoteldataComponent,canActivate:[AuthGuard]},
  { path: 'hotel', component: HotelComponent ,canActivate:[AuthGuard]},
  { path: 'register', component: RegisterComponent },
  { path: '**', component: LoginComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    LoginComponent,
    HotelComponent,
    HoteldataComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,FormsModule,HttpClientModule,HttpModule,  RouterModule.forRoot(routes)
  ],
  providers: [GetserviceService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
