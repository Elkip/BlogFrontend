import { OnInit, OnDestroy } from 'angular2/angular2';
export declare class Progress implements OnInit {
    private _max;
    animate: boolean;
    bars: Array<any>;
    constructor();
    onInit(): void;
    max: number;
    addBar(bar: Bar): void;
    removeBar(bar: Bar): void;
}
export declare class Bar implements OnInit, OnDestroy {
    progress: Progress;
    type: string;
    percent: number;
    transition: string;
    private _value;
    constructor(progress: Progress);
    onInit(): void;
    onDestroy(): void;
    value: number;
    recalculatePercentage(): void;
}
export declare class Progressbar {
    private animate;
    private max;
    private type;
    private value;
}
export declare const progressbar: Array<any>;
