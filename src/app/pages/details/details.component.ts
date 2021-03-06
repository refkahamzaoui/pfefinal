import { Component, OnInit, Input } from '@angular/core';
import { TemplateserviceService } from 'src/app/services/templateservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgControl, ReactiveFormsModule, FormControl, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Task } from 'src/app/models/task';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  errorMessage: string; 
val;
  id = this.actRoute.snapshot.params['id'];
  taskData: any = {};
  productID: any;
  productData: any;
  editForm: FormGroup;
  public toggleButton: boolean = true;
  user: Task;
  tasks:Task;
  taskss:Task[];
  isLinear = false;
  constructor(private taskservice:TemplateserviceService, public actRoute: ActivatedRoute,
    public router: Router,private formBuilder: FormBuilder,private toastr: ToastrService) { 
      
    let self = this;  
    self.taskservice.getPlns().subscribe(response => this.taskss = response,error => this.errorMessage = < any > error);  
    }

  ngOnInit(): void {
    
    let userId = localStorage.getItem("detailsId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm =  new FormGroup({
      
       id:new FormControl(),
        title: new FormControl(),
        description: new FormControl(),
        type:new FormControl(),
      
      subtasks: this.formBuilder.array([this.subtasks])
    });
    
    this.taskservice.getUserById(+userId)
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
  addSkillFormGroupe():FormGroup{
    return this.formBuilder.group({
      
      titlesub: new FormControl(),
      descriptionsub:new FormControl(),
      
    });
  }
  updateEmployee() {
    if(window.confirm('Are you sure, you want to update?')){
      this.taskservice.updateEmployee(this.id, this.taskData).subscribe(data => {
        this.router.navigate(['/employees-list'])
      })
    }
  }
  
  loadProductDetails(productID){
    this.taskservice.getProductDetails(productID).subscribe(product => {
      this.productData = product;
    });
  }
  navigation(link){
    this.router.navigate([link]);
  }
  onSubmit() {
    
    this.taskservice.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.toastr.success('Task updated!', 'GREAT!');

          this.router.navigate(['templates']);
        },
        error => {
          alert(error);
        });


}
 
  editorConfig: AngularEditorConfig = {
    editable: false,
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
enableFormGroup() {
  this.editForm.enable();
}
delete(task:Task){
  this.taskservice
  .deleteHero(task.id)
  .subscribe();
  this.toastr.success('Task updated!', 'GREAT!');

  this.router.navigate(['templates']);

}

movies = [
  {
    id:1,
    title: 'orienté objet',
    poster: 'to learn this '

  },
  {
    id:2,
    title: '. Learn Software Design',
    poster: 'Software design and architecture '
  },
  {
    id:3,
    title: 'Learn Containers  ',
    poster: 'knowledge of DevOps is essential'
  },
  {
    id:4,
    title: 'Learn Spring Framework',
    poster: 'spring boot'
  },
  {
    id:5,
    title: 'Learn Unit Testing',
    poster: 'JUnit and Mockito'
  },
  
 
];
// tslint:enable:max-line-length

drop(event: CdkDragDrop<{title: string, poster: string}[]>) {
  moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
}

}
