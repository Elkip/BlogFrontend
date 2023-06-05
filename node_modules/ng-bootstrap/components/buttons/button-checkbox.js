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
var ButtonCheckbox = (function () {
    function ButtonCheckbox(cd) {
        this.cd = cd;
        this.state = false;
        this.onChange = function (_) { };
        this.onTouched = function () { };
        // hack !
        cd.valueAccessor = this;
    }
    ButtonCheckbox.prototype.onInit = function () {
        this.toggle(this.trueValue === this.value);
    };
    Object.defineProperty(ButtonCheckbox.prototype, "trueValue", {
        get: function () {
            return typeof this.btnCheckboxTrue !== 'undefined' ? this.btnCheckboxTrue : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonCheckbox.prototype, "falseValue", {
        get: function () {
            return typeof this.btnCheckboxFalse !== 'undefined' ? this.btnCheckboxFalse : false;
        },
        enumerable: true,
        configurable: true
    });
    ButtonCheckbox.prototype.toggle = function (state) {
        this.state = state;
        this.value = this.state ? this.trueValue : this.falseValue;
    };
    // view -> model
    ButtonCheckbox.prototype.onClick = function () {
        this.toggle(!this.state);
        this.cd.viewToModelUpdate(this.value);
    };
    // ControlValueAccessor
    // model -> view
    ButtonCheckbox.prototype.writeValue = function (value) {
        this.state = this.trueValue === value;
        this.value = value;
    };
    ButtonCheckbox.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    ButtonCheckbox.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    ButtonCheckbox = __decorate([
        angular2_1.Directive({
            selector: '[btn-checkbox][ng-model]',
            properties: ['btnCheckboxTrue', 'btnCheckboxFalse'],
            host: {
                '(click)': 'onClick()',
                '[class.active]': 'state'
            }
        }),
        __param(0, angular2_1.Self()), 
        __metadata('design:paramtypes', [angular2_1.NgModel])
    ], ButtonCheckbox);
    return ButtonCheckbox;
})();
exports.ButtonCheckbox = ButtonCheckbox;
//# sourceMappingURL=button-checkbox.js.map