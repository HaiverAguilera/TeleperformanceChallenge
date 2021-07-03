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
    CompanyName: new FormControl('', Validators.required)
  });
  company: Company;
  documentTypes: any;

  constructor() { }

  ngOnInit(): void {
    this.documentTypes = new Array();
    this.documentTypes.push('Persona Natural');
    this.documentTypes.push('Persona Jurídica');
    this.company = JSON.parse(sessionStorage.getItem('company'));
    console.log(this.company);
    this.setValuesToFormGroup();
  }

  setValuesToFormGroup(){
    this.updateForm.setValue({
      IdentificationType : this.company.IdentificationType,
      IdentificationNumber: this.company.IdentificationNumber,
      CompanyName : this.company.CompanyName
    });
  }

}
