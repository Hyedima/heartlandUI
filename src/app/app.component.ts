import { Component } from '@angular/core';
import { Patient } from './Patient';
import { PatientService } from './patient.service'; 
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'heartlandUI';
  public patients: Patient[];
  public editPatient: Patient;
  public deletePatient: Patient;

  constructor(private patientService: PatientService){}

  ngOnInit(){
    this.getPatients();
  }

  
  public getPatients(): void {
    this.patientService.getPatients().subscribe(
      (response: Patient[]) => {
        this.patients = response;
        console.log(this.patients);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public omAddPatient(addForm: NgForm): void {
    document.getElementById('add-patient-form').click();
    this.patientService.addPatient(addForm.value).subscribe(
      (response: Patient) => {
        console.log(response);
        this.getPatients();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdatePatient(patient: Patient): void {
    this.patientService.updatePatient(patient).subscribe(
      (response: Patient) => {
        console.log(response);
        this.getPatients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmloyee(patientid: number): void {
    this.patientService.deletePatient(patientid).subscribe(
      (response: void) => {
        console.log(response);
        this.getPatients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchPatient(key: string): void {
    console.log(key);
    const results: Patient[] = [];
    for (const patient of this.patients) {
      if (patient.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || (patient.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || patient.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || patient.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || patient.hospitalID.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(patient);
      }
    }
    this.patients = results;
    if (results.length === 0 || !key) {
      this.getPatients();
    }
  }

  public onOpenModal(Patient: Patient, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addPatientModal');
    }
    if (mode === 'edit') {
      this.editPatient = Patient;
      button.setAttribute('data-target', '#updatePatientModal');
    }
    if (mode === 'delete') {
      this.deletePatient = Patient;
      button.setAttribute('data-target', '#deletePatientModal');
    }
    container.appendChild(button);
    button.click();
  }

}
