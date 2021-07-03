import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, SelectControlValueAccessor, Validators } from '@angular/forms';
import { Company } from '../models/company.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  updateForm = new FormGroup({
    IdentificationType: new FormControl('', Validators.required),
    IdentificationNumber: new FormControl('', Validators.required),
    CompanyName: new FormControl('', Validators.required),
    FirstLastName: new FormControl('', Validators.required),
    SecondLastName: new FormControl('', Validators.required),
    FirstName: new FormControl('', Validators.required),
    SecondName: new FormControl('', Validators.required),
    AuthorizeCellPhoneMessages: new FormControl('', Validators.required),
    AuthorizeEmailMessages: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required)
  });
  company: Company;
  identificationTypes: any;

  constructor() { }

  ngOnInit(): void {
    this.identificationTypes = new Array();
    this.identificationTypes.push('Persona Natural');
    this.identificationTypes.push('Persona Jurídica');
    this.company = JSON.parse(sessionStorage.getItem('company'));
    console.log(this.company);
    this.setValuesToFormGroup();
  }

  setValuesToFormGroup(){
    this.updateForm.setValue({
      IdentificationType: this.company.IdentificationType,
      IdentificationNumber: this.company.IdentificationNumber,
      CompanyName : this.company.CompanyName,
      FirstLastName: this.company.FirstLastName,
      SecondLastName: this.company.SecondLastName,
      FirstName : this.company.FirstName,
      SecondName : this.company.SecondName,
      AuthorizeCellPhoneMessages : this.company.AuthorizeCellPhoneMessages,
      AuthorizeEmailMessages : this.company.AuthorizeEmailMessages,
      Email : this.company.Email
    });
  }

  update(){
    
  }

}
