import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blogSrc: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) {
    this.blogSrc = this.sanitizer.bypassSecurityTrustResourceUrl(environment.blogUrl);
  }

  ngOnInit(): void {
  }

}
