import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login!: FormGroup;

  constructor(private formbuilder:FormBuilder , private router:Router, private http:HttpClient) { }

  ngOnInit(): void {
    this.login = this.formbuilder.group({

      email:[''],
      password:[''],


    })
  }
  loginform(){

    this.http.get<any>("http://localhost:3000/signup").subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.login.value.email && a.password === this.login.value.password

      })
      if(user){
        alert("login is Successfull")
        this.login.reset()
        this.router.navigate(['dashboard'])
      }
    })

  }

}
