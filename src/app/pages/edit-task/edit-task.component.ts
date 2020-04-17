import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateserviceService } from 'src/app/services/templateservice.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/models/task';
import * as $ from 'jquery';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  taskData: any = {};
  editForm: FormGroup;
  isLinear=false;
  tasks:Task[];
  constructor( public taskservice: TemplateserviceService,
    public actRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.taskservice.getTask(this.id).subscribe((data: {}) => {
      this.taskData = data;
    })
    this.editForm =  new FormGroup({
      
      id:new FormControl(),
       title: new FormControl(),
       description: new FormControl(),
       categorie:new FormControl(),
       privacy:new FormControl(),
     
     subtasks: this.formBuilder.array([this.subtasks])
   });
   
   this.taskservice.getTask(this.id)
     .subscribe( data => {
       this.editForm.patchValue(data);
     });
     this.editForm.disable();

  }
  get subtasks(): FormGroup {
    return this.formBuilder.group({
      idsub: new FormControl(),
      titlesub: new FormControl(),
      descriptionsub: new FormControl(),
    });
  }
 
  updateEmployee() {
    if(window.confirm('Are you sure, you want to update?')){
      this.taskservice.updateTask(this.id, this.taskData).subscribe(data => {
        this.router.navigate(['/employees-list'])
      })
    }
  }
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '100px',
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
drop(event: CdkDragDrop<{title: string, poster: string}[]>) {
}
enableFormGroup() {
  this.editForm.enable();
}
onSubmit() {
    
  this.taskservice.updateUser(this.editForm.value)
    .pipe(first())
    .subscribe(
      data => {

        this.router.navigate(['templates']);
      },
      error => {
        alert(error);
      });


}
deleteTask(data){
  var index = index = this.tasks.map(x => {return x.title}).indexOf(data.title);
   return this.taskservice.DeleteBug(data.id).subscribe(res => {
    this.toastr.success('Task deleted!', 'GREAT!');

    this.tasks.splice(index, 1)
    this.router.navigate(['templates']);
   })
}
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
