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
      const docW = body.clientWidth / 1.1;
      const docH = body.clientHeight / 2;
      const moveX = (e.clientX - docW) / 6;
      const moveY = (e.clientY - docH) / 6;
      box.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
      // box.style.transform += 'rotateX(' + -moveY / 2 + 'deg)';
      // box.style.transform += 'rotateY(' + moveX / 2 + 'deg)';
    };
    body.addEventListener('mousemove', mouseHandler, false);
  }
}
