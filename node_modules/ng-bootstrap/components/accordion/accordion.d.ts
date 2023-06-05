import { OnInit, OnDestroy, ViewContainerRef, TemplateRef } from 'angular2/angular2';
export declare class Accordion {
    private templateUrl;
    private closeOthers;
    private groups;
    constructor();
    closeOtherGroups(openGroup: AccordionGroup): void;
    addGroup(group: AccordionGroup): void;
    removeGroup(group: AccordionGroup): void;
}
export declare class AccordionTransclude implements OnInit {
    private viewRef;
    private accordionTransclude;
    constructor(viewRef: ViewContainerRef);
    onInit(): void;
}
export declare class AccordionGroup implements OnInit, OnDestroy {
    private accordion;
    private templateUrl;
    private panelClass;
    private _isOpen;
    isDisabled: boolean;
    headingTemplate: TemplateRef;
    constructor(accordion: Accordion);
    onInit(): void;
    onDestroy(): void;
    toggleOpen(event: MouseEvent): void;
    isOpen: boolean;
}
export declare class AccordionHeading {
    private group;
    private templateRef;
    constructor(group: AccordionGroup, templateRef: TemplateRef);
}
export declare const accordion: Array<any>;
