import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpUser = {
    name:String,
    email:String,
    password:String
  
  }

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  signUp(){
  this.auth.signUpUser(this.signUpUser)
  .subscribe(
    res => {
      console.log(res)
      localStorage.setItem('token', res.jwtToken)
      this.router.navigate(['/tasks'])
    },
    error => console.log(error)
  )
  }

}
