import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../../Services/rest.service';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-main',
  standalone: true,
  imports: [RouterLink,CommonModule,LoaderComponent],
  templateUrl: './student-main.component.html',
  styleUrl: './student-main.component.css'
})
export class StudentMainComponent {
  // httpClient = inject(HttpClient) ; 
  students: any[] = [];
  isLoading: boolean= false;
  loadingTitle: string= 'Loading...';
  fileUrl = 'http://localhost/AdminLteDashboard/storage/app/public/apiImages/';


  constructor(private restService: RestService){}
  
  ngOnInit(){     //used to call services or to set up subscriptions
    this.getStudentList();
  }


  getStudentList(){
    this.isLoading = true;
    this.loadingTitle= 'Loading.....';
      var  path='students';
    this.restService.get(path).subscribe((res:any)=>{
      console.log(res.data);
      this.students = res.data;

      this.isLoading = false;
    });
  }

  
  deleteStudent(event:any, studentId:number){
    if(confirm('Are you sure you want to delete it')){
      event.target.innerText = "Deleting....";
      var path = 'students/';
      this.restService.destroy(studentId, path).subscribe((res:any)=>{
        this.getStudentList();
        // alert(res.message);
      });
    }
  }








    // ngOnInit(){     //used to call services or to set up subscriptions
  //     this.fetchData();
  //   }

  // fetchData(){
  //   this.httpClient.get('http://localhost/AdminLteDashboard/public/api/students').subscribe((res:any)=>{
  //     console.log(res.data);
  //     this.students = res.data;
  //   });
  // }
}
