import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ValidateNitService } from '../services/validate/validate-nit.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  documentIdControl: FormControl;

  constructor(
    private validateNitService : ValidateNitService,
    private snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.documentIdControl = new FormControl('', [Validators.required]);
  }

  verifyNit(){
    this.validateNitService.validate(this.documentIdControl.value).subscribe(
      response => {
        if (response.Code == 200){
          sessionStorage.setItem('company', JSON.stringify(response.Data[0]));
          this.router.navigateByUrl('update');
        } else {
          this.snackBar.open(response.Exception, null, {
            duration: 3000
          });
        }
      },
      error => {
        console.log(error);
        this.snackBar.open("No fue posible validar el número. Ocurrió un error interno.", null, {
          duration: 3000
        });
      }
    );
  }
}
