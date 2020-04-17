import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { TextEditorComponent } from '../text-editor/text-editor.component';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TemplateserviceService } from 'src/app/services/templateservice.service';
import { Task, subtasks, Tags } from 'src/app/models/task';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TemplatesComponent } from 'src/app/pages/templates/templates.component';
import { MatTable } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as $ from 'jquery';



@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
task:Task;
errorMessage: string; 
controls;
temmpl:TemplatesComponent;
guestForm: FormGroup;
addForm: FormGroup;
title:string='';
description:string='';
displayedColumns: string[] = ['title','description'];
  tasks:Task[];
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
isLoadingResults = false;
animal: string;
tags: Tags[] = [];
file: File;
uname;
name;
uage;
age;
titlesub;
val;
isLinear = false;
cat;

  constructor(private toastr: ToastrService,private matDialog: MatDialog,private http:HttpClient,public dialog: MatDialog,private taskservice:TemplateserviceService,private router:Router,private route:ActivatedRoute,private formBuilder: FormBuilder) {
   
   }
getTask(){
  this.taskservice.getPlns();
}
  ngOnInit(): void {
    this.addForm = new FormGroup({
     id: new FormControl(),
      title: new FormControl(),
      description: new FormControl(),
      categorie: new FormControl(),
      type:new FormControl(),
      favoris:new FormControl(false),
      privacy:new FormControl(),

      // Create skills form group
      subtasks: this.formBuilder.array([
        this.addSkillFormGroupe()
      ]),
      tags: this.formBuilder.array([
        this.addtagFormGroupe()
      ]),
    
    });
    this.route.paramMap.subscribe(params => {
      const empId = +params.get('id');
      if (empId) {
        this.getEmployee(empId);
      }
    });
  }
  onFileAdd(file: File) {
    this.file = file;
    }
    
    onFileRemove() {
    this.file = null;
    }
  getEmployee(id: number) {
    this.taskservice.getUserById(id)
      .subscribe(
        (employee: Task) => this.editEmployee(employee),
        (err: any) => console.log(err)
      );
  }
  editEmployee(employee: Task) {
    this.addForm.patchValue({
      title: employee.title,
      description: employee.description,
     
    });
    this.addForm.setControl('skills', this.setExistingSkills(employee.subtasks));

  }
  setExistingSkills(skillSets: subtasks[]): FormArray {
    const formArray = new FormArray([]);
    skillSets.forEach(s => {
      formArray.push(this.formBuilder.group({
        titlesub: s.titlesub,
        descriptionsub: s.descriptionsub,
      }));
    });
  
    return formArray;
  }
  addRow(){

    
  }
  addSkillButtonClick(): void {
    (<FormArray>this.addForm.get('subtasks')).push(this.addSkillFormGroupe())
    
  }
  addSkillFormGroupe():FormGroup{
    return this.formBuilder.group({
      id: new FormControl(),

      titlesub: new FormControl(),
      descriptionsub: new FormControl(),

    });

  }
  addtagFormGroupe():FormGroup{
    return this.formBuilder.group({
      tag: new FormControl(),
      
    });
  }

  assignVal() {
    this.uname = this.name;
    this.uage = this.age;
}
resetForm(){
  
}
  
  
  
  
  


 
drop(event: CdkDragDrop<{title: string, poster: string}[]>) {
}
  
  


  
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '80px',
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
      this.addForm.reset(),

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

add(event: MatChipInputEvent): void {
  const input = event.input;
  const value = event.value;
  // Add language
  if ((value || '').trim()) {
    this.tags.push({ tag: value.trim() })
  }
  // Reset the input value
  if (input) {
    input.value = '';
  }
}

remove(subject: Tags): void {
  const index = this.tags.indexOf(subject);
  if (index >= 0) {
    this.tags.splice(index, 1);
  }
}  
resetFormm(){
  this.addSkillFormGroupe().reset()
}
Modernizr;
upload(){
  $(function()
{
    $(document).on('click', '.btn-add', function(e)
    {
        e.preventDefault();

        var controlForm = $('.controls:first'),
            currentEntry = $(this).parents('.entry:first'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);

        newEntry.find('input').val('');
        controlForm.find('.entry:not(:last) .btn-add')
            .removeClass('btn-add').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<i class="fa fa-trash" aria-hidden="true"></i>');
    }).on('click', '.btn-remove', function(e)
    {
      $(this).parents('.entry:first').remove();

		e.preventDefault();
		return false;
	});
});
}
}
