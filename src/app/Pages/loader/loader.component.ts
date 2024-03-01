import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
  inputs:['title']
})
export class LoaderComponent {
  // title : string = 'Loading'
  // title : string = 'Saving...';
  title : any;
}