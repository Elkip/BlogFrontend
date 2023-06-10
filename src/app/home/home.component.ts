import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const body = document.body;
    const box = document.getElementById('box');
    const mouseHandler = e => {
      const docW = body.clientWidth / 4;
      const docH = body.clientHeight / 2;
      const moveX = (e.clientX - docW) / 3;
      const moveY = (e.clientY - docH) / 3;
      box.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
    };
    body.addEventListener('mousemove', mouseHandler, false);
  }
}
