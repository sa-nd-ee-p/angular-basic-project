import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showList: boolean = true;
  form: FormGroup;
  showFormFlag: boolean = false;
  records:any=[];
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNo: ['', Validators.required],
      address: this.fb.group({
        city: ['', Validators.required],
        country: ['', Validators.required],
        state: ['', Validators.required],
      }),
      dob: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.getRecords();
  }
  getRecords() {
    let formData = JSON.parse(localStorage.getItem('formValue'));
    console.log(formData);
    this.records=formData?formData:[]
   }
  submit() {
    console.log(this.form.value);
    let jsonData = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      phoneNo: this.form.value.phoneNo,
      dob: this.form.value.dob,
      password: this.form.value.password,
      address: {
        city: this.form['controls'].address['controls'].city.value,
        country: this.form['controls'].address['controls'].country.value,
        state: this.form['controls'].address['controls'].state.value,
      },
    };
    this.records.push(jsonData);
    localStorage.setItem('formValue', JSON.stringify( this.records));
    this.hideForm();
  } 
  showForm() {
    this.showFormFlag = true;
  }
  hideForm() {
    this.showFormFlag = false;
    this.form.reset();
  }
  clearData(){
    localStorage.removeItem('formValue');
    this.records=[];
  }
}
