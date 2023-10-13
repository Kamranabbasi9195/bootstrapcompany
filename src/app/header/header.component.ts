// header.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Employeemodel } from './employee.dashboard.model';
import { ApiService } from '../shared/api.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  employeeModelObj: Employeemodel = new Employeemodel();
  formValue!: FormGroup;


  constructor(private fb: FormBuilder, private modalService: NgbModal, private api: ApiService) {
    this.formValue = this.fb.group({
      name: [''],
      ojt: [''],
      date: [''],
      time: ['']
    });
  }

  ngOnInit(): void {
    this.formValue = this.fb.group({
      name: ['', Validators.required], // Add Validators.required for mandatory fields
      ojt: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
  }
  postEmployeeDetails() {
    if (this.formValue.invalid) {
      // Form is invalid, do not submit
      return;
    }
  
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.ojt = this.formValue.value.ojt;
    this.employeeModelObj.date = this.formValue.value.date;
    this.employeeModelObj.time = this.formValue.value.time;
  
    this.api.postEmployee(this.employeeModelObj)
    .subscribe({
      next: (res: any) => {
        // Handle successful response
        console.log(res);
        alert("Employee added successfull")
        this.formValue.reset();
      },
      error: (err: any) => {
        // Handle error
        alert("Please try again")
      }
    });
  }
  
  open(content: any) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
      })
    
  }}

