import { OnInit, OnDestroy, ElementRef } from 'angular2/angular2';
import { DropdownMenuInterface, DropdownToggleInterface } from './dropdown.interfaces';
export declare class Dropdown implements OnInit, OnDestroy {
    el: ElementRef;
    private _isOpen;
    private dropdownAppendToBody;
    private onToggle;
    autoClose: string;
    keyboardNav: boolean;
    selectedOption: number;
    menuEl: ElementRef;
    toggleEl: ElementRef;
    private dropdownMenuTemplateUrl;
    constructor(el: ElementRef);
    onInit(): void;
    onDestroy(): void;
    dropDownMenu: DropdownMenuInterface;
    dropDownToggle: DropdownToggleInterface;
    toggle(open?: boolean): boolean;
    isOpen: boolean;
    focusDropdownEntry(keyCode: number): void;
    focusToggleElement(): void;
}
