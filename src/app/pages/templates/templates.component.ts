import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TextEditorComponent } from 'src/app/pages/text-editor/text-editor.component';
import { MatTable } from '@angular/material/table';
import { TemplateService } from '@progress/kendo-angular-excel-export';
import { Task } from 'src/app/models/task';
import { TemplateserviceService } from 'src/app/services/templateservice.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

export interface UsersData {
  name: string;
  id: number;
  title:string;
}
 

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  test2;
  addForm: FormGroup;
  i;
  errorMessage: string; 
  displayedColumns: string[] = ['title', 'name', 'action'];
  tasks:Task[];
  dataSources;
  dataSource =this.taskservice.tasks;
  exampleDatabase: TemplateserviceService | null;
  searchText:string="";
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  rows: FormArray;
  itemForm: FormGroup;
  constructor(private router: Router,private toastr: ToastrService,private matDialog: MatDialog,public dialog: MatDialog,private taskservice:TemplateserviceService) { }
  newDynamic: any = {};
  ngOnInit(): void {
    let self = this;  
    this.dataSources =this.taskservice.getTasks();
    self.taskservice.getPlns().subscribe(response => this.tasks = response,error => this.errorMessage = < any > error);  

}

 
  openDialog2() {
        
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(TextEditorComponent, {height: '900px',
    width: '800px',});
  }
 
 

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(TextEditorComponent, {

      data:obj
    });
 
   
  }
 
  
  /*
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.title != row_obj.title;
    });
  }
  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(TextEditorComponent, {
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }*/
  
  addNew(issue: Task) {
    const dialogRef = this.dialog.open(TextEditorComponent, {
      data: {issue: issue }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(this.taskservice.getDialogData());
        
      }
    });
  }
  get(){
    this.taskservice.getPlns();
  }
  getNavigation(link, id){
    if(id === ''){
        this.router.navigate([link]);
    } else {
        this.router.navigate([link + '/' + id]);
    }
}

editUser(user: Task): void {
  localStorage.removeItem("detailsId");
  localStorage.setItem("detailsId", user.id.toString());
  this.router.navigate(['details']);
}



 
}