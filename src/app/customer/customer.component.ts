import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MatFormFieldModule, CommonModule, FormsModule, MatInputModule, MatDialogModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
  customerForm: FormGroup;

  constructor(private dialog: MatDialog, private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    })
  }

  cancel() {
    this.dialog.closeAll()
  }

  save() {
    if (this.customerForm.valid){
      console.log(this.customerForm.value);
      this.dialog.closeAll()
    }
  }
}
