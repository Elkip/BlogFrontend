import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class HomeComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {

    const body = document.body;
    const box = document.getElementById('box');
    const mouseHandler = (e: MouseEvent) => {
      const docW = body.clientWidth / 4;
      const docH = body.clientHeight / 2;
      const moveX = (e.clientX - docW) / 3;
      const moveY = (e.clientY - docH) / 3;
      if (box) {
        box.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
      }
    };
    body.addEventListener('mousemove', mouseHandler, false);

    this.createStars();
  }

  randomPosition(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  createStars(): void {
    const sizes: number[] = [1, 1, 2, 3, 4];
    const host = this.elementRef?.nativeElement;
    const body = host ? (host.querySelector('.body') || host) : (document.querySelector('.body') || document.body);

    for (let i = 0; i < 300; i++) {
      const top = this.randomPosition(1, 100);
      const left = this.randomPosition(1, 100);
      const random = Math.floor(Math.random() * sizes.length);
      const randomSize = sizes[random];
      const div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.top = top + '%';
      div.style.left = left + '%';
      div.style.height = randomSize + 'px';
      div.style.width = randomSize + 'px';
      div.style.backgroundColor = '#FFFFFF';
      div.style.borderRadius = '50%';

      if (i <= 50) {
        div.classList.add('star1');
      }
      if (i <= 100 && i > 50) {
        div.classList.add('star2');
      }
      if (i <= 150 && i > 100) {
        div.classList.add('star3');
      }
      if (i <= 200 && i > 150) {
        div.classList.add('star4');
      }
      if (i <= 250 && i > 200) {
        div.classList.add('star5');
      }
      if (i <= 300 && i > 250) {
        div.classList.add('star6');
      }

      if (body) {
        body.appendChild(div);
      } else {
        document.body.appendChild(div);
      }
    }
  }
}
