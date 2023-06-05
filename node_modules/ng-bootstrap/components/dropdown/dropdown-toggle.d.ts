import { ElementRef, OnInit } from 'angular2/angular2';
import { Dropdown } from './dropdown';
export declare class DropdownToggle implements OnInit {
    dropdown: Dropdown;
    el: ElementRef;
    private disabled;
    constructor(dropdown: Dropdown, el: ElementRef);
    onInit(): void;
    isOpen: boolean;
    toggleDropdown(event: MouseEvent): void;
}
