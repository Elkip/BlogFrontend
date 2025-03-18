import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.css'],
    standalone: false
})
export class PortfolioComponent implements OnInit {

  modals = [];

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
    window.onclick = event => {
      if (this.modals.includes(event.target)) {
        (event.target).style.display = 'none';
      }
    };
  }

}
