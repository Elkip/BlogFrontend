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
var dropdown_1 = require('./dropdown');
var DropdownToggle = (function () {
    function DropdownToggle(dropdown, el) {
        this.dropdown = dropdown;
        this.el = el;
        this.disabled = false;
    }
    DropdownToggle.prototype.onInit = function () {
        this.dropdown.dropDownToggle = this;
    };
    Object.defineProperty(DropdownToggle.prototype, "isOpen", {
        get: function () {
            return this.dropdown.isOpen;
        },
        enumerable: true,
        configurable: true
    });
    DropdownToggle.prototype.toggleDropdown = function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (!this.disabled) {
            this.dropdown.toggle();
        }
    };
    DropdownToggle = __decorate([
        angular2_1.Directive({
            selector: '[dropdown-toggle]',
            properties: ['disabled'],
            host: {
                '(click)': 'toggleDropdown($event)',
                '[class.dropdown-toggle]': 'true',
                '[class.disabled]': 'disabled',
                '[attr.aria-haspopup]': 'true',
                '[attr.aria-expanded]': 'isOpen'
            }
        }),
        __param(0, angular2_1.Host()), 
        __metadata('design:paramtypes', [dropdown_1.Dropdown, angular2_1.ElementRef])
    ], DropdownToggle);
    return DropdownToggle;
})();
exports.DropdownToggle = DropdownToggle;
//# sourceMappingURL=dropdown-toggle.js.map