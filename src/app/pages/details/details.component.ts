import { Component, OnInit, Input } from '@angular/core';
import { TemplateserviceService } from 'src/app/services/templateservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgControl, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Task } from 'src/app/models/task';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  taskData: any = {};
  productID: any;
  productData: any;
  editForm: FormGroup;
  public toggleButton: boolean = true;
  user: Task;
  constructor(private taskservice:TemplateserviceService, public actRoute: ActivatedRoute,
    public router: Router,private formBuilder: FormBuilder,private toastr: ToastrService) { }

  ngOnInit(): void {
    let userId = localStorage.getItem("detailsId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.taskservice.getUserById(+userId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
      this.editForm.disable();

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
enableFormGroup() {
  this.editForm.enable();
}

}
