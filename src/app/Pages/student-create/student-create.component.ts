import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { RestService } from '../../Services/rest.service';



@Component({
  selector: 'app-student-create',
  standalone: true,
  imports: [RouterLink,CommonModule, FormsModule, ReactiveFormsModule,LoaderComponent],  
  templateUrl: './student-create.component.html',
  styleUrl: './student-create.component.css'
})
export class StudentCreateComponent implements OnInit{

  isLoading: boolean= false;
  loadingTitle: string= 'Loading';
  message!: string;
  submitted = false;
  file!: string;

  studentForms: FormGroup = new FormGroup({  //variable declaration in reactive form
    name : new FormControl(''),
    course : new FormControl(''),
    email : new FormControl(''),
    phone : new FormControl(''),
    image : new FormControl(''),


  });
   constructor(private restService: RestService){}

   private formBuilder = inject(FormBuilder);

   ngOnInit() :void{     //used to call services or to set up subscriptions

      this.studentForms = this.formBuilder.group(
        {
          name: ['', [Validators.required, Validators.pattern("[a-zA-Z].*")]],
          course: ['', [Validators.required]],
          email: ['',[ Validators.required,  Validators.email]],
          phone: ['',[ Validators.required, Validators.pattern("[0-9].*")]],
          image: ['', [Validators.required]],
        });

    
  }
  get f() :any {
    return this.studentForms?.controls;
  }

  imageUpload(event:any){
    this.file = event.target.files[0];
    const file = event.target.files[0];

    if(file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg'){
      console.log(file.type);

    }else{
      alert('Please upload png, jpg or jpeg extension files');
    }
    
  }

  saveStudent(){
    this.submitted = true;

    if(this.studentForms?.invalid){
      
      return;
         // console.log(this.studentForms?.value);
    }else{

      this.isLoading = true;
      this.loadingTitle = 'Saving....';
    
      // const  InputData = this.studentForms.value;
      const  InputData = new FormData();
      InputData.append("image",this.file);
      InputData.append("name",this.studentForms.value.name);
      InputData.append("email",this.studentForms.value.email);
      InputData.append("course",this.studentForms.value.course);
      InputData.append("phone",this.studentForms.value.phone);


      console.log(InputData)
  
      var path = 'students';
  
      // this.restService.saveStudent(InputData, path).subscribe({
      this.restService.post(InputData, path).subscribe({
            next: (res:any)=>{
              console.log(res, 'response')
              this.studentForms = new FormGroup({
                name : new FormControl(''),
                course : new FormControl(''),
                email : new FormControl(''),
                phone : new FormControl(''),
                image : new FormControl(''),
              })
              // alert(res.message);
              this.isLoading = false;
              this.message = res.message;
            },
          })
    }
 

  }
}
