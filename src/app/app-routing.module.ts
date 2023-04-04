import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerdashComponent } from './customerdash/customerdash.component';
import { LoginComponent } from './login/login.component';
import { ManagerdashComponent } from './managerdash/managerdash.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ViewContactComponent } from './view-contact/view-contact.component';
import { ChatCompComponent } from './chat-comp/chat-comp.component';

const routes: Routes = [ 
  {
    path:'', redirectTo:'homepage', pathMatch:'full'
  },
  {
    path:'homepage', component:HomepageComponent
  },
  {
    path:'login', component:LoginComponent
  }, 
  {
    path:'signup', component:SignupComponent
  },
  {
    path:'customerdash', component:CustomerdashComponent
  },
  {
    path:'managerdash', component:ManagerdashComponent
  },
  {
    path:'contacts/add', component:AddContactComponent
  },
  {
    path:'contacts/edit/:contactId', component:EditContactComponent
  },
  {
    path:'contacts/view/:contactId', component:ViewContactComponent
  },
  {
    path:'chat-comp', component:ChatCompComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
