import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-form-gialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule, NgIf],
  templateUrl: './user-form-gialog.component.html',
  styleUrl: './user-form-gialog.component.scss'
})
export class CreateEditUserDialogComponent implements OnInit{
  private readonly dialogRef = inject(MatDialogRef<CreateEditUserDialogComponent>);
  public readonly data = inject(MAT_DIALOG_DATA);

  public userForm = new FormGroup({
    id: new FormControl(new Date().getTime(), [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\+?[0-9\-()\s]{7,15}$/)]),
    company: new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)])
    }),
    email: new FormControl('', [Validators.required, Validators.email]),
    website: new FormControl('', [Validators.required, Validators.pattern(
        /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/
      )])
  })

  ngOnInit(): void {
    this.userForm.patchValue(this.data?.user)
  }

  onSubmit() {
    this.dialogRef.close(this.userForm.value)
  }
}