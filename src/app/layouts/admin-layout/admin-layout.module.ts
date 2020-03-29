import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlanIntegrationComponent } from 'src/app/pages/plan-integration/plan-integration.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { HttpModule } from '@angular/http';
import { FilterPipe} from 'src/app/filter.pipe';
import { PlanFormComponent } from 'src/app/pages/plan-form/plan-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field'; 

import {MatStepperModule} from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AngularEditorConfig } from '@kolkov/angular-editor';


import {MatPaginatorModule} from '@angular/material/paginator'; 

import {MatTabsModule} from '@angular/material/tabs'; 
import {MatTableModule} from '@angular/material/table'; 
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TemplatesComponent } from 'src/app/pages/templates/templates.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TextEditorComponent } from 'src/app/pages/text-editor/text-editor.component';

import { TaskCreateComponent } from 'src/app/pages/task-create/task-create.component';
import{MatCardModule
} from "@angular/material/card";
import{MatIconModule} from "@angular/material/icon";
import { DetailsComponent } from 'src/app/pages/details/details.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    GridModule,
    HttpModule,
    MatDialogModule,
    MatToolbarModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    MDBBootstrapModule,
    AngularEditorModule,
    MatCardModule,
    MatIconModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    PlanIntegrationComponent,
    FilterPipe,
    PlanFormComponent,
    TemplatesComponent,
    TextEditorComponent,
 TaskCreateComponent,
 DetailsComponent,



    //Plan,
    
  ]

})

export class AdminLayoutModule {}
