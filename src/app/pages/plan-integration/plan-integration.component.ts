import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GridModule, PDFModule, ExcelModule, DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import {plan} from '././'
@Component({
  selector: 'app-plan-integration',
  templateUrl: './plan-integration.component.html',
  styleUrls: ['./plan-integration.component.scss']
})
export class PlanIntegrationComponent implements OnInit {
 

  public mySelection: string[] = [];


  ngOnInit() {

  }
  
    closeResult: string;
  
    constructor(private modalService: NgbModal) {}
  
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
   

 

 


  

}
