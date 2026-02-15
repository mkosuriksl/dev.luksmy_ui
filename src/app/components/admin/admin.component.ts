import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  formData!: FormGroup;


  constructor(private apiService: ApiserviceService,
     private authService: AuthService,
     private router : Router) {}



  ngOnInit(): void{
    this.initForm();
  }

  initForm() {
    this.formData = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',Validators.required),
  });

  }

  // adminLogin() {
  //   console.log("*****");
  //   if(this.formData?.valid) {
  //     console.log(this.formData.value);
  //     const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';
  //     this.authService.adminLogin(this.formData.value.username,this.formData.value.password,appKey);

  //   }
  // }
    adminLogin() {
      const username = this.formData.value.username;
      const password = this.formData.value.password;
      this.authService.adminLogin(username, password);
    }


}
