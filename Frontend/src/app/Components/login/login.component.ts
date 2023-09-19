import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/authservice/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  submitted: boolean = false;
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private toastr: ToastrService, private authService: AuthService, private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    },);
  }
  ngOnDestroy(): void {
    this.submitted = false;
    this.loginForm;
  }


  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe((response: any) => {
      this.toastr.success(response.message, 'Success');
      localStorage.setItem("userData", JSON.stringify(this.loginForm.value));
      this.router.navigate(['/dashboard']);
    }, err => {
      this.toastr.error(err.error.error, 'Error')
    });
  }


  get f() { return this.loginForm.controls; }
}
