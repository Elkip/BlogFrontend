import { ElementRef } from 'angular2/angular2';
export declare class Collapse {
    private el;
    test: any;
    private height;
    private isExpanded;
    private isCollapsed;
    private isCollapse;
    private isCollapsing;
    constructor(el: ElementRef);
    private collapse;
    toggle(): void;
    hide(): void;
    show(): void;
}
