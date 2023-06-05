import { NgModel, EventEmitter, OnInit, ElementRef, Renderer, DynamicComponentLoader } from 'angular2/angular2';
export declare class TypeaheadOptions {
    placement: string;
    animation: boolean;
    constructor(options: TypeaheadOptions);
}
export declare class TypeaheadContainer {
    element: ElementRef;
    parent: Typeahead;
    query: string;
    private _matches;
    private _active;
    private top;
    private left;
    private display;
    private placement;
    constructor(element: ElementRef, options: TypeaheadOptions);
    matches: Array<string>;
    position(hostEl: ElementRef): void;
    selectActiveMatch(): void;
    prevActiveMatch(): void;
    nextActiveMatch(): void;
    private selectActive(value);
    private isActive(value);
    private selectMatch(value, e?);
    private escapeRegexp(queryToEscape);
    private hightlight(item, query);
}
export declare class Typeahead implements OnInit {
    private cd;
    private element;
    private renderer;
    private loader;
    typeaheadLoading: EventEmitter<boolean>;
    typeaheadNoResults: EventEmitter<boolean>;
    typeaheadOnSelect: EventEmitter<{
        item: string;
    }>;
    container: TypeaheadContainer;
    minLength: number;
    waitMs: number;
    optionsLimit: number;
    private appendToBody;
    private editable;
    private focusFirst;
    private inputFormatter;
    private selectOnExact;
    private templateUrl;
    private popupTemplateUrl;
    private selectOnBlur;
    private focusOnSelect;
    private field;
    private async;
    private debouncer;
    private source;
    private _matches;
    private placement;
    private popup;
    constructor(cd: NgModel, element: ElementRef, renderer: Renderer, loader: DynamicComponentLoader);
    matches: string[];
    private debounce(func, wait);
    private processMatches();
    private finalizeAsyncCall();
    onInit(): void;
    onChange(e: KeyboardEvent): void;
    changeModel(value: any): void;
    show(matches: Array<string>): void;
    hide(): void;
}
export declare const typeahead: Array<any>;
