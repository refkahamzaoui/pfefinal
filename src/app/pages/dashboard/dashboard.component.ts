import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import{Plan} from '../../models/plan';
import { IntegrationPlanService } from 'src/app/services/integration-plan.service';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PlanFormComponent } from '../plan-form/plan-form.component';


// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  searchText2:string
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public searchString: string;

  stat:string;
  planList:Plan[];
serviceintegration:IntegrationPlanService;
errorMessage: string;  

  constructor(private router: Router,private route: ActivatedRoute,private integrationService:IntegrationPlanService,private matDialog: MatDialog) { 
    this.planList = []; 

  }

  ngOnInit() {
    this.searchText2="pending";
    let self = this;  
    self.integrationService.getPlns().subscribe(response => this.planList = response,error => this.errorMessage = < any > error);  
  
    console.log(this.searchText2);
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


   var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });
    
    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});
  }
  get(){
    this.integrationService.getPlns();
  }





  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
  navigate() {
    this.router.navigate(['plan-integration', 'pending']);
  }
  openDialog() {
        
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(PlanFormComponent, {height: '500px',
    width: '1000px',});
  }
  openchat(){
    
  }
  goToPlanIntegration(userId) {
    this.router.navigate(['plan-integration/' + userId ]);
  } 

}