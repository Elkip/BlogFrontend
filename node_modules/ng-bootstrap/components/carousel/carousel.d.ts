import { OnInit, OnDestroy } from 'angular2/angular2';
export declare enum Direction {
    UNKNOWN = 0,
    NEXT = 1,
    PREV = 2,
}
export declare class Carousel implements OnDestroy {
    private noPause;
    private noWrap;
    private slides;
    private currentInterval;
    private isPlaying;
    private destroyed;
    private currentSlide;
    private _interval;
    onDestroy(): void;
    interval: number;
    select(nextSlide: Slide, direction?: Direction): void;
    private goNext(slide, direction);
    private getSlideByIndex(index);
    private getCurrentIndex();
    private next();
    private prev();
    private restartTimer();
    private resetTimer();
    play(): void;
    pause(): void;
    addSlide(slide: Slide): void;
    removeSlide(slide: Slide): void;
}
export declare class Slide implements OnInit, OnDestroy {
    private carousel;
    active: boolean;
    direction: Direction;
    index: number;
    constructor(carousel: Carousel);
    onInit(): void;
    onDestroy(): void;
}
export declare const carousel: Array<any>;
