import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AboutComponent implements OnInit {
  resume: HTMLElement | null = null;
  btn: HTMLElement | null = null;

  ngOnInit(): void {
    this.resume = document.getElementById('resume');
    this.btn = document.getElementById('btn');
  }

  hideResume(): void {
    if (!this.resume || !this.btn) return;
    if (this.resume.style.display === 'none') {
      this.resume.style.display = 'block';
      this.btn.innerText = 'Hide Resume';
    } else {
      this.resume.style.display = 'none';
      this.btn.innerText = 'Show Resume';
    }
  }

}
