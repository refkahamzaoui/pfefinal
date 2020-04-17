import { Component, OnInit } from '@angular/core';
import { Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TemplateserviceService } from 'src/app/services/templateservice.service';
import { Task } from 'src/app/models/task';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';


@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  htmlContent = '';
  action:string;
  local_data:any;
  
  addForm: FormGroup;


  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      id: [],
      title: ['', Validators.required],
      description : ['', Validators.required],
      subtasks :[''],

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
  
constructor(
  public dialogRef: MatDialogRef<TextEditorComponent>,private formBuilder: FormBuilder,private router:Router,private taskservice:TemplateserviceService)
  {}
 
  doAction(){
    this.onSubmit();
  }
 
  

  onSubmit() {
    this.taskservice.createUser(this.addForm.value)
      
  }
  navigate(){
    this.router.navigate(['task-create']);

  }
  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
  
}
