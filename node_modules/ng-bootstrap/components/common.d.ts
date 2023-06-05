import { ViewContainerRef } from 'angular2/angular2';
export interface IAttribute {
    [name: string]: any;
}
export declare class NgTransclude {
    viewRef: ViewContainerRef;
    private _ngTransclude;
    private ngTransclude;
    constructor(viewRef: ViewContainerRef);
}
