import { NgModel, ElementRef, ControlValueAccessor, OnInit } from 'angular2/angular2';
export declare class ButtonRadio implements ControlValueAccessor, OnInit {
    cd: NgModel;
    el: ElementRef;
    btnRadio: string;
    uncheckable: boolean;
    constructor(cd: NgModel, el: ElementRef);
    onInit(): void;
    private isActive;
    value: any;
    onClick(): void;
    writeValue(value: any): void;
    onChange: (_: any) => void;
    onTouched: () => void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}
