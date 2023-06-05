import { OnInit, ControlValueAccessor, NgModel } from 'angular2/angular2';
export declare class Rating implements ControlValueAccessor, OnInit {
    cd: NgModel;
    private max;
    private range;
    private value;
    private preValue;
    private titles;
    private stateOn;
    private stateOff;
    private readonly;
    private ratingStates;
    private onHover;
    private onLeave;
    constructor(cd: NgModel);
    onInit(): void;
    writeValue(value: number): void;
    private buildTemplateObjects(ratingStates, max);
    private rate(value);
    private enter(value);
    private reset();
    private onKeydown(event);
    onChange: (_: any) => void;
    onTouched: () => void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}
