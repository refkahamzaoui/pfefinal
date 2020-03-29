import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { TextEditorComponent } from '../text-editor/text-editor.component';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TemplateserviceService } from 'src/app/services/templateservice.service';
import { Task, subtasks } from 'src/app/models/task';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TemplatesComponent } from 'src/app/pages/templates/templates.component';
import { MatTable } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
task:Task;
errorMessage: string; 

temmpl:TemplatesComponent;
guestForm: FormGroup;
addForm: FormGroup;
title:string='';
description:string='';
displayedColumns: string[] = ['title','description'];
  dataSource=this.taskservice.tasks ;
  tasks:Task[];
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
isLoadingResults = false;
animal: string;
  name: string;


  constructor(private toastr: ToastrService,private matDialog: MatDialog,private http:HttpClient,public dialog: MatDialog,private taskservice:TemplateserviceService,private router:Router,private formBuilder: FormBuilder) {
   
   }
getTask(){
  this.taskservice.getPlns();
}
  ngOnInit(): void {
    this.addForm = new FormGroup({
     id: new FormControl(),
      title: new FormControl(),
      description: new FormControl(),
      // Create skills form group
      subtasks: new FormGroup({
        idsub: new FormControl(),
        titlesub: new FormControl(),
        descriptionsub: new FormControl(),
      })
    });
    let self = this;  


self.taskservice.getPlns().subscribe(response => this.tasks = response,error => this.errorMessage = < any > error);  


  
  }
  openDialog() {
    
    const dialogRef = this.dialog.open(TextEditorComponent, {
      width:'900px'
      
    });
    
    
  }
  
  


 
  
  
  


  
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '250px',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};


 

addme(task: Task){
this.taskservice.creatme(task)
.subscribe(data=>{
alert('Done');

})
}
onSubmit() {
  this.taskservice.createUser(this.addForm.value)
    .subscribe( data => {
      this.toastr.success('Task created!', 'GREAT!');

      this.router.navigate(['templates']);
    });
}
openDialog2(): void {
  const dialogRef = this.dialog.open(TextEditorComponent, {
    width: '300px',
    data: {}
  });

  

  
}





}
