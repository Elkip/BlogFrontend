import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PortfolioComponent implements OnInit {

  modals: (HTMLElement | null)[] = [];

  constructor() { }

  ngOnInit(): void {
    this.modals.push(document.getElementById('modal_1'));
    this.modals.push(document.getElementById('modal_2'));
    this.modals.push(document.getElementById('modal_3'));
    this.modals.push(document.getElementById('modal_4'));
    this.modals.push(document.getElementById('modal_5'));
    this.modals.push(document.getElementById('modal_6'));
    this.modals.push(document.getElementById('modal_7'));
    this.modals.push(document.getElementById('modal_8'));
    this.modals.push(document.getElementById('modal_9'));
    this.modals.push(document.getElementById('modal_10'));
    this.modals.push(document.getElementById('modal_11'));
    this.modals.push(document.getElementById('modal_12'));
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && this.modals.includes(target)) {
        target.style.display = 'none';
      }
    };
  }

}
