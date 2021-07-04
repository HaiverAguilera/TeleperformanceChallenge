import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, SelectControlValueAccessor, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Company } from '../models/company.model';
import { ValidateNitService } from '../services/validate/validate-nit.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  updateForm = new FormGroup({
    IdentificationType: new FormControl('', Validators.required),
    IdentificationNumber: new FormControl('', Validators.required),
    CompanyName: new FormControl('', [Validators.required, Validators.pattern(/[A-Z]/),Validators.pattern(/[a-z]/)]),
    FirstLastName: new FormControl('',[Validators.required, Validators.pattern(/[A-Z]/),Validators.pattern(/[a-z]/)]),
    SecondLastName: new FormControl('', [Validators.required, Validators.pattern(/[A-Z]/),Validators.pattern(/[a-z]/)]),
    FirstName: new FormControl('', [Validators.required, Validators.pattern(/[A-Z]/),Validators.pattern(/[a-z]/)]),
    SecondName: new FormControl('', [Validators.required, Validators.pattern(/[A-Z]/),Validators.pattern(/[a-z]/)]),
    AuthorizeCellPhoneMessages: new FormControl('', Validators.required),
    AuthorizeEmailMessages: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required)
  });
  company: Company;
  identificationTypes: any;

  constructor(
    private validateNitService: ValidateNitService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.identificationTypes = new Array();
    this.identificationTypes.push('Persona Natural');
    this.identificationTypes.push('Persona Jurídica');
    this.company = JSON.parse(sessionStorage.getItem('company'));
    console.log(this.company);
    this.setValuesToFormGroup();
  }

  setValuesToFormGroup() {
    this.updateForm.setValue({
      IdentificationType: this.company.IdentificationType,
      IdentificationNumber: this.company.IdentificationNumber,
      CompanyName: this.company.CompanyName,
      FirstLastName: this.company.FirstLastName,
      SecondLastName: this.company.SecondLastName,
      FirstName: this.company.FirstName,
      SecondName: this.company.SecondName,
      AuthorizeCellPhoneMessages: this.company.AuthorizeCellPhoneMessages,
      AuthorizeEmailMessages: this.company.AuthorizeEmailMessages,
      Email: this.company.Email
    });
    this.updateForm.controls['IdentificationNumber'].disable();
  }

  update() {
    this.company.IdentificationType = this.updateForm.value.IdentificationType;
    this.company.CompanyName = this.updateForm.value.CompanyName;
    this.company.FirstLastName = this.updateForm.value.FirstLastName;
    this.company.SecondLastName = this.updateForm.value.SecondLastName;
    this.company.FirstName = this.updateForm.value.FirstName;
    this.company.SecondName = this.updateForm.value.SecondName;
    this.company.Email = this.updateForm.value.Email;
    this.company.AuthorizeCellPhoneMessages = this.updateForm.value.AuthorizeCellPhoneMessages;
    this.company.AuthorizeEmailMessages = this.updateForm.value.AuthorizeEmailMessages;
    this.validateNitService.update(this.company).subscribe(
      response => {
        var message = "Datos actualizados correctamente.";
        if (response.Code == 400) {
          message = "No fue posible actualizar los datos. Posiblemente no hubo ningún cambio.";
        }
        if (response.Code == 500) {
          message = "No fue posible actualizar los datos. Ocurrió un error interno.";
        }
        this.snackBar.open(message, null, {
          duration: 3000
        });
      },
      error => {
        console.log(error)
        this.snackBar.open("No fue posible actualizar los datos. Ocurrió un error interno.", null, {
          duration: 3000
        });
      }
    );
  }

}
