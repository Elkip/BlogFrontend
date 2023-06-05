import { ElementRef, OnInit } from 'angular2/angular2';
import { Dropdown } from './dropdown';
export declare class DropdownMenu implements OnInit {
    dropdown: Dropdown;
    el: ElementRef;
    templateUrl: string;
    constructor(dropdown: Dropdown, el: ElementRef);
    onInit(): void;
}
