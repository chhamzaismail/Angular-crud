import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators,FormBuilder } from '@angular/forms';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';
import { RestService } from '../../Services/rest.service';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule, ReactiveFormsModule, LoaderComponent],
  templateUrl: './student-edit.component.html',
  styleUrl: './student-edit.component.css'
})
export class StudentEditComponent implements OnInit{
  studentForms: FormGroup = new FormGroup({  //variable declaration in reactive form
    name : new FormControl(''),
    course : new FormControl(''),
    email : new FormControl(''),
    phone : new FormControl(''),


  });
  // student!: any;
  studentId!: any;

  message!: string
  // errors: any = []
  isLoading: boolean= false;
  loadingTitle: string= 'Loading';


  constructor(private route:ActivatedRoute, private restService: RestService){}
  // private formBuilder = inject(FormBuilder);
  ngOnInit(){     //used to call services or to set up subscriptions
    // this.studentForms = this.formBuilder.group(
    //   {
    //     name: ['', [Validators.required, Validators.pattern("[a-zA-Z].*")]],
    //     course: ['', [Validators.required]],
    //     email: ['',[ Validators.required,  Validators.email]],
    //     phone: ['',[ Validators.required, Validators.pattern("[0-9].*")]],
    //   });
      
    this.studentId = this.route.snapshot.paramMap.get('id');
    // alert(this.studentId);
    var path = 'students/'+this.studentId;
    // this.restService.editStudent(this.studentId).subscribe((res:any)=>{
    this.restService.get( path).subscribe((res:any)=>{
      console.log(res.data);
      // console.log(this.student.id);
      this.studentForms = new FormGroup({
        name : new FormControl(res.data.name),
        course : new FormControl(res.data.course),
        email : new FormControl(res.data.email),
        phone : new FormControl(res.data.phone),
      })

    })
  }

  // get f() :any {
  //   return this.studentForms?.controls;
  // }

  updateStudent(){
    if(this.studentForms?.invalid){
      
      return;
         // console.log(this.studentForms?.value);
    }else{

      this.isLoading = true;
      this.loadingTitle = 'Saving...';
  
      var  InputData=this.studentForms.value;
    
      console.log(InputData);
      var path = 'students/'+this.studentId;
      // this.restService.updateStudent(InputData,this.studentId).subscribe(
      this.restService.post(InputData, path).subscribe(
        {
          next: (res:any)=>{
           
            console.log(res, 'response')
            // alert(res.message);
            this.message = res.message;
            this.isLoading = false;
  
          },
          error: (err:any)=>{
            // this.errors = err.error.errors;
            // console.log(err.error.errors, 'errors')
          }
        }
      );
    }
  }
  

}
