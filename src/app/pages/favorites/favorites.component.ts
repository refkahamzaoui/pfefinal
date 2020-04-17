import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TextEditorComponent } from 'src/app/pages/text-editor/text-editor.component';
import { MatTable } from '@angular/material/table';
import { TemplateService } from '@progress/kendo-angular-excel-export';
import { Task, Tags } from 'src/app/models/task';
import { TemplateserviceService } from 'src/app/services/templateservice.service';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes'
import {MatChipInputEvent} from '@angular/material/chips';
import * as $ from 'jquery';
export interface Fruit {
  name: string;
  
}
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  tags: Tags[] = [];
  test2;
  addForm: FormGroup;
  i;
  errorMessage: string; 
  displayedColumns: string[] = ['title', 'name', 'action'];
  tasks:Task[];
  task:Task
  dataSources;
  exampleDatabase: TemplateserviceService | null;
  searchText:string="";
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  rows: FormArray;
  itemForm: FormGroup;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [
    {name: 'JAVA'},
    {name: 'ABAP'},
    {name: 'ANGULAR'},
  ];
  tasksList: any = [];


  constructor(    public actRoute: ActivatedRoute,private router: Router,private toastr: ToastrService,private matDialog: MatDialog,public dialog: MatDialog,private taskservice:TemplateserviceService) { }
  newDynamic: any = {};
  ngOnInit(): void {
    this.loadTasks();
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
visible = true;
  

  
  delete(task:Task){
  this.taskservice
  .deleteHero(task.id)
  .subscribe();
  this.toastr.success('Task deleted!', 'GREAT!');

  window.location.reload() ;

  
}
deleteEmployee() {
  this.taskservice.deleteEmployee(this.task.id).subscribe(
    () => console.log(`Employee with ID = ${this.task.id} Deleted`),
    (err) => console.log(err)
  );
}
editButtonClick(employeeId: number) {
  this.router.navigate(['/edit', employeeId]);
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


deleteIusse(data){
  var index = index = this.tasks.map(x => {return x.title}).indexOf(data.title);
   return this.taskservice.DeleteBug(data.id).subscribe(res => {
    this.toastr.success('Task deleted!', 'GREAT!');

    this.tasks.splice(index, 1)
     console.log('Issue deleted!')
   })
}


loadTasks() {
  return this.taskservice.GetTasks().subscribe((data: {}) => {
    this.tasksList = data;
  })
}
//id = this.actRoute.snapshot.params['id'];
  employeeData: Task;
updateEmployee(id) {
 
    this.taskservice.updateTask(id,Task).subscribe(data => {
         // this.toastr.success('Task deleted!', 'GREAT!');

    })
 
}
toggle(plan) {
  plan.favoris = !plan.favoris;
}
addfav(task:Task): any {
 
  task.favoris=false



  this.taskservice.updateTask(task.id, task).subscribe();
  console.log(task.favoris)
}
/* when a user clicks, toggle the 'is-animating' class */
hi(){
  $(function() {
    $(".heart").on("click", function() {
      $(this).toggleClass("is-active");
    });
  });
}

}