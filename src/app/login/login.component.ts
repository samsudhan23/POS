import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private route: Router,
    private authservice: AuthServiceService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  getControl(controlName: string) {
    return this.loginForm.get(controlName);
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();  // Mark all controls as touched to trigger validation messages
      return;
    }
    if (this.loginForm.valid) {
      this.authservice.login()
      console.log(this.loginForm.value);
      this.route.navigate(['/dash']);
    }
  }

  logout() {
    this.authservice.logout();
    this.route.navigate(['']); // Redirect to login page after logout
  }

}
