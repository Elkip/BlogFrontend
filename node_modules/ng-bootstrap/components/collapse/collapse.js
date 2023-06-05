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
// todo: add animate
// todo: add init and on change
var Collapse = (function () {
    function Collapse(el) {
        this.el = el;
        this.test = 'wtf';
        // classes
        // shown
        this.isExpanded = true;
        // hidden
        this.isCollapsed = false;
        // stale state
        this.isCollapse = true;
        // animation state
        this.isCollapsing = false;
    }
    Object.defineProperty(Collapse.prototype, "collapse", {
        get: function () {
            return this.isExpanded;
        },
        set: function (value) {
            this.isExpanded = value;
            this.toggle();
        },
        enumerable: true,
        configurable: true
    });
    Collapse.prototype.toggle = function () {
        if (this.isExpanded) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    Collapse.prototype.hide = function () {
        var _this = this;
        this.isCollapse = false;
        this.isCollapsing = true;
        this.isExpanded = false;
        this.isCollapsed = true;
        setTimeout(function () {
            _this.height = '0';
            _this.isCollapse = true;
            _this.isCollapsing = false;
        }, 4);
    };
    Collapse.prototype.show = function () {
        var _this = this;
        this.isCollapse = false;
        this.isCollapsing = true;
        this.isExpanded = true;
        this.isCollapsed = false;
        setTimeout(function () {
            _this.height = 'auto';
            _this.isCollapse = true;
            _this.isCollapsing = false;
        }, 4);
    };
    Collapse = __decorate([
        angular2_1.Directive({
            selector: '[collapse]',
            properties: ['collapse'],
            host: {
                '[class.in]': 'isExpanded',
                '[class.collapse]': 'isCollapse',
                '[class.collapsing]': 'isCollapsing',
                '[attr.aria-expanded]': 'isExpanded',
                '[attr.aria-hidden]': 'isCollapsed',
                '[style.height]': 'height'
            }
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef])
    ], Collapse);
    return Collapse;
})();
exports.Collapse = Collapse;
//# sourceMappingURL=collapse.js.map