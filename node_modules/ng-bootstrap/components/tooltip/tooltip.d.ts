import { OnInit, ElementRef, DynamicComponentLoader } from 'angular2/angular2';
export declare class Tooltip implements OnInit {
    element: ElementRef;
    loader: DynamicComponentLoader;
    private visible;
    private content;
    private placement;
    private appendToBody;
    private isOpen;
    private enable;
    private tooltip;
    constructor(element: ElementRef, loader: DynamicComponentLoader);
    onInit(): void;
    show(): void;
    hide(): void;
}
export declare const tooltip: Array<any>;
