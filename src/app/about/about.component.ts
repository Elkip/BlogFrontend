import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    standalone: false
})
export class AboutComponent implements OnInit {

  resume: HTMLElement;
  btn: HTMLElement;

  constructor() { }

  ngOnInit(): void {
    this.resume = document.getElementById('resume');
    this.btn = document.getElementById('btn');
  }

  hideResume(): void {
    if (this.resume.style.display === 'none') {
      this.resume.style.display = 'block';
      this.btn.innerText = 'Hide Resume';
    } else {
      this.resume.style.display = 'none';
      this.btn.innerText = 'Show Resume';
    }
  }

}
