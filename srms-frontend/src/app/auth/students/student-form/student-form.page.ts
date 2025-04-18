import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService, Student } from '../student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.page.html',
  standalone:false,
})
export class StudentFormPage implements OnInit {
  student: Student = {
    name: '',
    roll: '',
    department: '',
    year: 1,
    subjects: [],
    grades: {},
    attendance: 100
  };

  isEdit: boolean = false;
  studentId: number = 0;

  subjects: string[] = [];
  grades: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.studentId = +params['id'];
        this.loadStudent();
      }
    });
  }

  loadStudent() {
    this.studentService.getStudent(this.studentId).subscribe((data: Student) => {
      this.student = data;
      this.subjects = data.subjects || [];
      this.grades = Object.values(data.grades || {});
    });
  }

  addSubject() {
    this.subjects.push('');
    this.grades.push('');
  }

  removeSubject(index: number) {
    this.subjects.splice(index, 1);
    this.grades.splice(index, 1);
  }

  buildGradesObject(): { [key: string]: string } {
    const gradeObj: { [key: string]: string } = {};
    this.subjects.forEach((subj, i) => {
      if (subj.trim()) {
        gradeObj[subj] = this.grades[i] || '';
      }
    });
    return gradeObj;
  }

  submitForm() {
    this.student.subjects = this.subjects;
    this.student.grades = this.buildGradesObject();

    if (this.isEdit) {
      this.studentService.updateStudent(this.studentId, this.student).subscribe(() => {
        alert('Student updated successfully!');
        this.router.navigate(['/students/student-list']);
      });
    } else {
      this.studentService.addStudent(this.student).subscribe(() => {
        alert('Student added successfully!');
        this.router.navigate(['/students/student-list']);
      });
    }
  }
}
