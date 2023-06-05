import { OnInit, OnDestroy, DoCheck, EventEmitter, TemplateRef } from 'angular2/angular2';
export declare class Tabset implements OnInit {
    private vertical;
    private justified;
    private type;
    tabs: Array<Tab>;
    private classMap;
    constructor();
    onInit(): void;
    addTab(tab: Tab): void;
    removeTab(tab: Tab): void;
}
export declare class Tab implements OnInit, OnDestroy, DoCheck {
    tabset: Tabset;
    _active: boolean;
    disabled: boolean;
    heading: string;
    headingRef: TemplateRef;
    select: EventEmitter<Tab>;
    deselect: EventEmitter<Tab>;
    constructor(tabset: Tabset);
    /** DEPRECATE disable */
    private disable;
    /** tab active state toogle */
    active: boolean;
    doCheck(): boolean;
    onInit(): void;
    onDestroy(): void;
}
export declare class TabHeading {
    templateRef: TemplateRef;
    constructor(templateRef: TemplateRef, tab: Tab);
}
export declare const tabs: Array<any>;
