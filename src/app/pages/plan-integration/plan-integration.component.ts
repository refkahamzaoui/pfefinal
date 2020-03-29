import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GridModule, PDFModule, ExcelModule, DataBindingDirective } from '@progress/kendo-angular-grid';
import { Http } from '@angular/http';
import{Plan} from '../../models/plan';
import { HttpModule } from '@angular/http';
import { IntegrationPlanService } from 'src/app/services/integration-plan.service';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PlanFormComponent } from '../plan-form/plan-form.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-plan-integration',
  templateUrl: './plan-integration.component.html',
  styleUrls: ['./plan-integration.component.scss'],
})
export class PlanIntegrationComponent implements OnInit {
  sub: any;
planList:Plan[];
stat:string;
serviceintegration:IntegrationPlanService;
errorMessage: string;  
searchText:string="";
extractParams(params):string{
  status = params.get('status')

  console.log('status: ', status)
  return ''
}
ngOnInit(): void {  
  let self = this;  
  status = ""
  self.integrationService.getPlns().subscribe(response => this.planList = response,error => this.errorMessage = < any > error);  
 
}  

  
    closeResult: string;
  
    constructor(private modalService: NgbModal,private integrationService:IntegrationPlanService,private matDialog: MatDialog,private route: ActivatedRoute) {
      this.planList = []; 
    }
  
    open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
     

      }
      get(){
        this.integrationService.getPlns();
      }
      getstatus(){
        this.integrationService.getPlans();
      }
      
      openDialog() {
        
        const dialogConfig = new MatDialogConfig();
        this.matDialog.open(PlanFormComponent, {height: '900px',
        width: '1000px',});
      }

                 
     
      
    
   
    }
