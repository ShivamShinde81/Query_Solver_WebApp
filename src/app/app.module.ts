import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerdashComponent } from './customerdash/customerdash.component';
import { ManagerdashComponent } from './managerdash/managerdash.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ViewContactComponent } from './view-contact/view-contact.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { ChatCompComponent } from './chat-comp/chat-comp.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CustomerdashComponent,
    ManagerdashComponent,
    EmployeeComponent,
    HomepageComponent,
    AddContactComponent,
    EditContactComponent,
    ViewContactComponent,
    SpinnerComponent,
    ChatCompComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
