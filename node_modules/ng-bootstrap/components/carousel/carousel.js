var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var ng2_bootstrap_config_1 = require('../ng2-bootstrap-config');
(function (Direction) {
    Direction[Direction["UNKNOWN"] = 0] = "UNKNOWN";
    Direction[Direction["NEXT"] = 1] = "NEXT";
    Direction[Direction["PREV"] = 2] = "PREV";
})(exports.Direction || (exports.Direction = {}));
var Direction = exports.Direction;
// todo: add animate
var NAVIGATION = (_a = {},
    _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS4] = "\n<a class=\"left carousel-control\" (click)=\"prev()\" [hidden]=\"!slides.length\">\n  <span class=\"icon-prev\" aria-hidden=\"true\"></span>\n  <span class=\"sr-only\">Previous</span>\n</a>\n<a class=\"right carousel-control\" (click)=\"next()\" [hidden]=\"!slides.length\">\n  <span class=\"icon-next\" aria-hidden=\"true\"></span>\n  <span class=\"sr-only\">Next</span>\n</a>\n  ",
    _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS3] = "\n<a class=\"left carousel-control\" (click)=\"prev()\" [hidden]=\"!slides.length\">\n  <span class=\"glyphicon glyphicon-chevron-left\"></span>\n</a>\n<a class=\"right carousel-control\" (click)=\"next()\" [hidden]=\"!slides.length\">\n  <span class=\"glyphicon glyphicon-chevron-right\"></span>\n</a>\n  ",
    _a
);
var Carousel = (function () {
    function Carousel() {
        this.slides = [];
        this.destroyed = false;
    }
    Carousel.prototype.onDestroy = function () {
        this.destroyed = true;
    };
    Object.defineProperty(Carousel.prototype, "interval", {
        get: function () {
            return this._interval;
        },
        set: function (value) {
            this._interval = value;
            this.restartTimer();
        },
        enumerable: true,
        configurable: true
    });
    Carousel.prototype.select = function (nextSlide, direction) {
        if (direction === void 0) { direction = Direction.UNKNOWN; }
        var nextIndex = nextSlide.index;
        if (direction === Direction.UNKNOWN) {
            direction = nextIndex > this.getCurrentIndex() ? Direction.NEXT : Direction.PREV;
        }
        // Prevent this user-triggered transition from occurring if there is already one in progress
        if (nextSlide && nextSlide !== this.currentSlide) {
            this.goNext(nextSlide, direction);
        }
    };
    Carousel.prototype.goNext = function (slide, direction) {
        if (this.destroyed) {
            return;
        }
        slide.direction = direction;
        slide.active = true;
        if (this.currentSlide) {
            this.currentSlide.direction = direction;
            this.currentSlide.active = false;
        }
        this.currentSlide = slide;
        // every time you change slides, reset the timer
        this.restartTimer();
    };
    Carousel.prototype.getSlideByIndex = function (index) {
        var len = this.slides.length;
        for (var i = 0; i < len; ++i) {
            if (this.slides[i].index === index) {
                return this.slides[i];
            }
        }
    };
    Carousel.prototype.getCurrentIndex = function () {
        return !this.currentSlide ? 0 : this.currentSlide.index;
    };
    Carousel.prototype.next = function () {
        var newIndex = (this.getCurrentIndex() + 1) % this.slides.length;
        if (newIndex === 0 && this.noWrap) {
            this.pause();
            return;
        }
        return this.select(this.getSlideByIndex(newIndex), Direction.NEXT);
    };
    Carousel.prototype.prev = function () {
        var newIndex = this.getCurrentIndex() - 1 < 0 ? this.slides.length - 1 : this.getCurrentIndex() - 1;
        if (this.noWrap && newIndex === this.slides.length - 1) {
            this.pause();
            return;
        }
        return this.select(this.getSlideByIndex(newIndex), Direction.PREV);
    };
    Carousel.prototype.restartTimer = function () {
        var _this = this;
        this.resetTimer();
        var interval = +this.interval;
        if (!isNaN(interval) && interval > 0) {
            this.currentInterval = setInterval(function () {
                var nInterval = +_this.interval;
                if (_this.isPlaying && !isNaN(_this.interval) && nInterval > 0 && _this.slides.length) {
                    _this.next();
                }
                else {
                    _this.pause();
                }
            }, interval);
        }
    };
    Carousel.prototype.resetTimer = function () {
        if (this.currentInterval) {
            clearInterval(this.currentInterval);
            this.currentInterval = null;
        }
    };
    Carousel.prototype.play = function () {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.restartTimer();
        }
    };
    Carousel.prototype.pause = function () {
        if (!this.noPause) {
            this.isPlaying = false;
            this.resetTimer();
        }
    };
    Carousel.prototype.addSlide = function (slide) {
        slide.index = this.slides.length;
        this.slides.push(slide);
        if (this.slides.length === 1 || slide.active) {
            this.select(this.slides[this.slides.length - 1]);
            if (this.slides.length === 1) {
                this.play();
            }
        }
        else {
            slide.active = false;
        }
    };
    Carousel.prototype.removeSlide = function (slide) {
        this.slides.splice(slide.index, 1);
        if (this.slides.length === 0) {
            this.currentSlide = null;
            return;
        }
        for (var i = 0; i < this.slides.length; i++) {
            this.slides[i].index = i;
        }
    };
    Carousel = __decorate([
        angular2_1.Component({
            selector: 'carousel, [carousel]',
            properties: ['interval', 'noTransition', 'noPause', 'noWrap']
        }),
        angular2_1.View({
            template: "\n<div (mouseenter)=\"pause()\" (mouseleave)=\"play()\" class=\"carousel slide\">\n  <ol class=\"carousel-indicators\" [hidden]=\"slides.length <= 1\">\n     <li *ng-for=\"#slidez of slides\" [ng-class]=\"{active: slidez.active === true}\" (click)=\"select(slidez)\"></li>\n  </ol>\n  <div class=\"carousel-inner\"><ng-content></ng-content></div>\n  " + NAVIGATION[ng2_bootstrap_config_1.Ng2BootstrapConfig.theme] + "\n</div>\n  ",
            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.NgClass]
        }), 
        __metadata('design:paramtypes', [])
    ], Carousel);
    return Carousel;
})();
exports.Carousel = Carousel;
var Slide = (function () {
    function Slide(carousel) {
        this.carousel = carousel;
    }
    Slide.prototype.onInit = function () {
        this.carousel.addSlide(this);
    };
    Slide.prototype.onDestroy = function () {
        this.carousel.removeSlide(this);
    };
    Slide = __decorate([
        angular2_1.Component({
            selector: 'slide, [slide]',
            properties: ['direction', 'active', 'index'],
            host: {
                '[class.active]': 'active',
                '[class.item]': 'true',
                '[class.carousel-item]': 'true'
            }
        }),
        angular2_1.View({
            template: "\n  <div [ng-class]=\"{active: active}\" class=\"item text-center\">\n    <ng-content></ng-content>\n  </div>\n  ",
            directives: [angular2_1.NgClass]
        }), 
        __metadata('design:paramtypes', [Carousel])
    ], Slide);
    return Slide;
})();
exports.Slide = Slide;
exports.carousel = [Carousel, Slide];
var _a;
//# sourceMappingURL=carousel.js.map