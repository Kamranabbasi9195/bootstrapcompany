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
  emloyeeData!: any;
  showAdd!:boolean;
  showupdate! :boolean;
  formValue!: FormGroup;

  constructor(private fb: FormBuilder, private modalService: NgbModal, private api: ApiService) {
    this.formValue = this.fb.group({
      name: ['', Validators.required], // Add Validators.required for mandatory fields
      ojt: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
    this.getAllEmployee();
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showupdate = false;
  }

  ngOnInit(): void {
    // If you need any initialization logic for your component, you can place it here.
  }
//create a post method 
  postEmployeeDetails() {
    if (this.formValue.invalid) {
      // Form is invalid, do not submit
      return;
    }

    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.ojt = this.formValue.value.ojt;
    this.employeeModelObj.date = this.formValue.value.date;
    this.employeeModelObj.time = this.formValue.value.time;

    this.api.postEmployee(this.employeeModelObj).subscribe({
      next: (res: any) => {
        // Handle successful response
        console.log(res);
        alert("Employee added successfully");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        // Call the method to get all employees here
        this.getAllEmployee();
      },
      error: (err: any) => {
        // Handle error
        alert("Please try again");
      }
    });
  }
//create a get method 
  getAllEmployee() {
    this.api.getEmployee().subscribe((res: any) => {
      this.emloyeeData = res;
    });
  }
  //create a delete method 
  deleteEmployee(row: any) {
  
    this.api.deleteEmployee(row.id).subscribe((res) => {
      alert("Employee Deleted successfully");
      // After successful deletion, you may want to refresh the employee list.
      this.getAllEmployee();
    });
  }

  //update method

  onEdit(row:any){
    this.showAdd = false;
    this.showupdate = true;
    this.employeeModelObj.id = row.id
    this.formValue.controls['name'].setValue(row.name)
    this.formValue.controls['ojt'].setValue(row.ojt)
    this.formValue.controls['date'].setValue(row.date)
    this.formValue.controls['time'].setValue(row.time)
  }
  updateEmployeeDetails(){
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.ojt = this.formValue.value.ojt;
    this.employeeModelObj.date = this.formValue.value.date;
    this.employeeModelObj.time = this.formValue.value.time;
    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Employee added successfully");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
    })

  }

  open(content: any) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
      });
  }
}
