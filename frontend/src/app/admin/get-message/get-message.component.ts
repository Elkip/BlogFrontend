import { Component, OnInit } from '@angular/core';
import {Contact} from '../../model/Contact';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-get-message',
  templateUrl: './get-message.component.html',
  styleUrls: ['./get-message.component.scss']
})
export class GetMessageComponent  {

  otherMessage: Contact;
  dataLoaded = false;

  constructor(private dataService: DataService) { }

  loadData(): void {
    this.dataService.getLastMessage().subscribe(next => {
      this.otherMessage = next;
      this.dataLoaded = true;
    });
  }


}
