import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder,private modalService: NgbModal) {
    this.form = this.fb.group({
      
      field1: ['', Validators.required],
      field2: ['', Validators.required],
      field3: ['', Validators.required],
      field4: ['', Validators.required],
    });

}

open(content: any) {
  this.modalService.open(content, {
    ariaLabelledBy: 'modal-basic-title',
    backdrop: 'static', // Prevents closing when clicking outside
  }).result.then(
    (result) => {
      console.log(`Modal closed with: ${result}`);
    },
    (reason) => {
      console.log(`Modal dismissed with: ${reason}`);
    }
  );
}
}
