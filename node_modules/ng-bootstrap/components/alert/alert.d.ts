import { OnInit, EventEmitter, ElementRef } from 'angular2/angular2';
export declare class Alert implements OnInit {
    el: ElementRef;
    type: string;
    close: EventEmitter<Alert>;
    templateUrl: string;
    dismissOnTimeout: number;
    private closed;
    private closeable;
    private classes;
    private dismissible;
    constructor(el: ElementRef);
    onInit(): void;
    onClose(): void;
}
