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
// TODO: templateUrl
var Alert = (function () {
    function Alert(el) {
        this.el = el;
        this.close = new angular2_1.EventEmitter();
        this.classes = [];
        this.closeable = this.closeable || el.nativeElement.getAttribute('(close)');
    }
    Object.defineProperty(Alert.prototype, "dismissible", {
        get: function () {
            return this.closeable;
        },
        set: function (v) {
            this.closeable = v;
        },
        enumerable: true,
        configurable: true
    });
    Alert.prototype.onInit = function () {
        this.type = this.type || 'warning';
        this.classes[0] = 'alert-' + (this.type || 'warning');
        if (this.closeable) {
            this.classes[1] = 'alert-dismissible';
        }
        else {
            this.classes.length = 1;
        }
        if (this.dismissOnTimeout) {
            var close_1 = this.onClose.bind(this);
            setTimeout(close_1, this.dismissOnTimeout);
        }
    };
    // todo: mouse event + touch + pointer
    Alert.prototype.onClose = function () {
        this.close.next(this);
        this.closed = true;
    };
    Alert = __decorate([
        angular2_1.Component({
            selector: 'alert',
            inputs: ['type', 'dismissible', 'dismissOnTimeout'],
            outputs: ['close']
        }),
        angular2_1.View({
            template: "\n  <div class=\"alert\" role=\"alert\" [ng-class]=\"classes\" *ng-if=\"!closed\">\n    <button *ng-if=\"closeable\" type=\"button\" class=\"close\" (click)=\"onClose($event)\">\n      <span aria-hidden=\"true\">&times;</span>\n      <span class=\"sr-only\">Close</span>\n    </button>\n    <ng-content></ng-content>\n  </div>\n  ",
            directives: [angular2_1.NgIf, angular2_1.NgClass]
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef])
    ], Alert);
    return Alert;
})();
exports.Alert = Alert;
//# sourceMappingURL=alert.js.map