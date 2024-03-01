import { Routes } from '@angular/router';
import { HomepageComponent } from './Pages/homepage/homepage.component';
import { AboutpageComponent } from './Pages/aboutpage/aboutpage.component';
import { ContactpageComponent } from './Pages/contactpage/contactpage.component';
import { StudentCreateComponent } from './Pages/student-create/student-create.component';
import { StudentMainComponent } from './Pages/student-main/student-main.component';
import { StudentEditComponent } from './Pages/student-edit/student-edit.component';

export const routes: Routes = [
    {path:'', component: HomepageComponent, title: 'Home Page'},
    {path:'about-us', component: AboutpageComponent, title: 'About Page'},
    {path:'contact-us', component: ContactpageComponent, title: 'Contact Page'},
    {path:'students', component: StudentMainComponent, title: 'Student'},
    {path:'student/create', component: StudentCreateComponent, title: 'Student Create'},
    {path:'student/:id/edit', component: StudentEditComponent, title: 'Student Edit'},
];
