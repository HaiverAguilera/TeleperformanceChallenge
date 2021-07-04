import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { ServiceResponse } from 'src/app/models/service-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidateNitService {

  constructor(private httpClient : HttpClient) { }

  validate(nit:number){
    return this.httpClient.get<ServiceResponse>(environment.companyApiUrl + 'validateNit' + '?' + 'companyNit=' + nit);
  }

  update(company:Company){
    return this.httpClient.post<ServiceResponse>(environment.companyApiUrl + 'update', company);
  }
}
