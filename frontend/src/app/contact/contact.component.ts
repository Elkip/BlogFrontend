import {Component, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {DataService} from '../data.service';
import {Contact} from '../model/Contact';
import {FormResetService} from '../form-reset.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {

  message: Contact;
  contactForm: UntypedFormGroup;
  resetEventSubscription: Subscription;
  submitted = false;
  retryAttempts = 0;
  loadingStatus: string;
  dataLoaded = false;

  constructor(private formBuilder: UntypedFormBuilder,
              private dataService: DataService,
              private formResetService: FormResetService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.resetEventSubscription = this.formResetService.resetContactFormEvent.subscribe(msg =>   {
        this.message = msg;
        this.initializeForm();
    });
  }

  initializeForm(): void {
    this.message = new Contact();
    this.contactForm = this.formBuilder.group({
      name : [this.message.name, [Validators.required, Validators.pattern('^([A-Za-z0-9\\\\\\/_\\-]|([A-Za-z0-9\\\\\\/_\\-][A-Za-z0-9\\\\\\/_\\- ]{0,28}[A-Za-z0-9\\\\\\/_\\-]))$')]],
      email : [ this.message.email, [Validators.email, Validators.required ] ],
      msg : [ this.message.message, [Validators.required, Validators.maxLength(255)]]
    });
  }

  ngOnDestroy(): void {
    this.resetEventSubscription.unsubscribe();
  }

  onSubmit(): void {
    this.loadingStatus = 'Sending message... Please wait.';
    this.submitted = true;
    this.message.name = this.contactForm.controls.name.value;
    this.message.email = this.contactForm.controls.email.value;
    this.message.message = this.contactForm.controls.msg.value;
    this.sendMessage();
    this.formResetService.resetContactFormEvent.emit(this.message);
  }

  sendMessage(): void {
    this.dataService.newMessage(this.message).subscribe( (next) => {
        this.loadingStatus = 'Message Sent!';
      },
      (error) => {
        console.log('error!', error.message);
        this.retryAttempts++;
        if (this.retryAttempts  <= 2) {
          this.loadingStatus = 'Connecting...';
          this.sendMessage();
        } else {
          this.loadingStatus = 'Message Logged';
        }
      });
  }

}
