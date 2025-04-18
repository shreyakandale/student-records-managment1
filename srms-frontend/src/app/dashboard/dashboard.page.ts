import { Component, OnInit } from '@angular/core';
import { StudentService, Student } from '../auth/students/student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  standalone:false,
})
export class DashboardPage implements OnInit {
  totalStudents = 0;
  departmentStats: { name: string, count: number }[] = [];
  yearStats: { year: number, count: number }[] = [];
  averageAttendance = 0;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.getStudents().subscribe((students: Student[]) => {
      this.totalStudents = students.length;

      const deptMap: any = {};
      const yearMap: any = {};
      let attendanceTotal = 0;

      students.forEach(student => {
        deptMap[student.department] = (deptMap[student.department] || 0) + 1;
        yearMap[student.year] = (yearMap[student.year] || 0) + 1;
        attendanceTotal += student.attendance;
      });

      this.departmentStats = Object.keys(deptMap).map(name => ({ name, count: deptMap[name] }));
      this.yearStats = Object.keys(yearMap).map(year => ({ year: +year, count: yearMap[year] }));
      this.averageAttendance = students.length ? attendanceTotal / students.length : 0;
    });
  }
}
