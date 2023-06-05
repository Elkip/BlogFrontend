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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var angular2_1 = require('angular2/angular2');
var ButtonRadio = (function () {
    function ButtonRadio(cd, el) {
        this.cd = cd;
        this.el = el;
        this.onChange = function (_) { };
        this.onTouched = function () { };
        // hack!
        cd.valueAccessor = this;
    }
    ButtonRadio.prototype.onInit = function () {
        this.uncheckable = typeof this.uncheckable !== 'undefined';
    };
    Object.defineProperty(ButtonRadio.prototype, "isActive", {
        get: function () {
            return this.btnRadio === this.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonRadio.prototype, "value", {
        // hack view model!
        get: function () {
            return this.cd.viewModel;
        },
        set: function (value) {
            this.cd.viewModel = value;
            // hack: host classes updated before value is set >.<
            if (this.isActive) {
                this.el.nativeElement.classList.add('active');
            }
            else {
                this.el.nativeElement.classList.remove('active');
            }
        },
        enumerable: true,
        configurable: true
    });
    // view -> model
    ButtonRadio.prototype.onClick = function () {
        if (this.uncheckable && this.btnRadio === this.value) {
            return this.cd.viewToModelUpdate(null);
        }
        this.cd.viewToModelUpdate(this.btnRadio);
    };
    // ControlValueAccessor
    // model -> view
    ButtonRadio.prototype.writeValue = function (value) {
        this.value = value;
    };
    ButtonRadio.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    ButtonRadio.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    ButtonRadio = __decorate([
        angular2_1.Directive({
            selector: '[btn-radio][ng-model]',
            properties: ['btnRadio', 'uncheckable'],
            host: {
                '(click)': 'onClick()',
                '[class.active]': 'isActive'
            }
        }),
        __param(0, angular2_1.Self()), 
        __metadata('design:paramtypes', [angular2_1.NgModel, angular2_1.ElementRef])
    ], ButtonRadio);
    return ButtonRadio;
})();
exports.ButtonRadio = ButtonRadio;
//# sourceMappingURL=button-radio.js.map