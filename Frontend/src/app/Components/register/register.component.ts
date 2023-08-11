import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  submitted = false;
  date:Date=new Date();
  constructor(private formBuilder: FormBuilder,private router:Router,private toastr:ToastrService,private http:HttpClient) { }

  ngOnInit() {
    this.date = new Date();
      this.registerForm = this.formBuilder.group({
          title: ['', Validators.required],
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          // validates date format yyyy-mm-dd
          dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
          acceptTerms: [false, Validators.requiredTrue]
      }, {
          validators: this.MustMatch('password', 'confirmPassword')
      });
  }

   

 
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      this.http.get<{ message: string }>('http://localhost:3000/api/data').subscribe(
        (response) => {
          console.log(response.message) ;
        },
        (error) => {
          console.error(error);
        }
      );

      if (this.registerForm.invalid) {
          return;
      }
      this.toastr.success('Success fully Registered!', 'Success');
      localStorage.setItem("userData",JSON.stringify(this.registerForm.value));
      this.router.navigate(['/login']);
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (group: AbstractControl) => {
        const control = group.get(controlName);
        const matchingControl = group.get(matchingControlName);
        if (!control || !matchingControl) {
            return null;
        }
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return null;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
        return null;
    }
}
}

