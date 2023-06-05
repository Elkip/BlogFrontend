import { NgModel, OnInit, ControlValueAccessor } from 'angular2/angular2';
export declare class ButtonCheckbox implements ControlValueAccessor, OnInit {
    cd: NgModel;
    private btnCheckboxTrue;
    private btnCheckboxFalse;
    private value;
    private state;
    constructor(cd: NgModel);
    onInit(): void;
    private trueValue;
    private falseValue;
    toggle(state: boolean): void;
    onClick(): void;
    writeValue(value: any): void;
    onChange: (_: any) => void;
    onTouched: () => void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}
