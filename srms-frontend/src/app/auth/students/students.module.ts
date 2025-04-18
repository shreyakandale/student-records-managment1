import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StudentListPage } from './student-list/student-list.page';
import { StudentFormPage } from './student-form/student-form.page';

const routes: Routes = [
  { path: 'student-list', component: StudentListPage },
  { path: 'student-form', component: StudentFormPage }
];

@NgModule({
  declarations: [StudentListPage, StudentFormPage],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)]
})
export class StudentsModule {}
