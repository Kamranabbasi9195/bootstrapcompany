// header.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employeemodel } from './employee.dashboard.model';
import { ApiService } from 'src/Services/api.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  employeeModelObj: Employeemodel = new Employeemodel();
  formvalue!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.formvalue = this.fb.group({
      name: ['', Validators.required], // Add Validators.required for mandatory fields
      ojt: [''],
      date: [''],
      time: [''],
    });
  }

  postEmployeeDetails() {
    if (this.formvalue.invalid) {
      // Form is invalid, do not submit
      return;
    }
  
    this.employeeModelObj.name = this.formvalue.value.name;
    this.employeeModelObj.ojt = this.formvalue.value.ojt;
    this.employeeModelObj.date = this.formvalue.value.date;
    this.employeeModelObj.time = this.formvalue.value.time;
  
   
  }
  open(content: any) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
      })
    
  }
}
