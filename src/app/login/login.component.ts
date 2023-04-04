import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private _http: HttpClient, private router: Router) {

  }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [],
      signupmode: []
    })
  }

  logIn() {
    this._http.get<any>("http://localhost:3000/signup").subscribe(res => {
     
      const user = res.find((a: any) => {
        // return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password && a.signupmode === this.loginForm.value.signupmode;
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password && a.signupmode === this.loginForm.value.signupmode;
      })
      console.log(user);
      if(user)
      {
        if (user.signupmode==1) {
          alert("Customer Login Successfully!");
          this.loginForm.reset();
          this.router.navigate(['customerdash'])
        }
        else if (user.signupmode==2) {
          alert("Manager Login Successfully!");
          this.loginForm.reset();
          this.router.navigate(['managerdash'])
        }
      }
      else{
        alert("Enter correct email or password");
      }
    }, err => {
      alert("Error Occurs!")
    })
  }
}
