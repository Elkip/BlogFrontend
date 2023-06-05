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
var angular2_2 = require('angular2/angular2');
var position_1 = require('../position');
var TooltipOptions = (function () {
    function TooltipOptions(options) {
        Object.assign(this, options);
    }
    return TooltipOptions;
})();
var TooltipContainer = (function () {
    function TooltipContainer(element, options) {
        this.element = element;
        Object.assign(this, options);
        this.classMap = { 'in': false };
        this.classMap[options.placement] = true;
    }
    TooltipContainer.prototype.position = function (hostEl) {
        this.display = 'block';
        this.top = '0px';
        this.left = '0px';
        var p = position_1.positionService
            .positionElements(hostEl.nativeElement, this.element.nativeElement.children[0], this.placement, this.appendToBody);
        this.top = p.top + 'px';
        this.left = p.left + 'px';
        this.classMap['in'] = true;
    };
    TooltipContainer = __decorate([
        angular2_1.Component({
            selector: 'tooltip-container'
        }),
        angular2_1.View({
            template: "\n    <div class=\"tooltip\" role=\"tooltip\"\n     [ng-style]=\"{top: top, left: left, display: display}\"\n     [ng-class]=\"classMap\" >\n      <div class=\"tooltip-arrow\"></div>\n      <div class=\"tooltip-inner\">\n        {{content}}\n      </div>\n    </div>",
            directives: [angular2_1.NgClass, angular2_1.NgStyle],
            encapsulation: angular2_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef, TooltipOptions])
    ], TooltipContainer);
    return TooltipContainer;
})();
var Tooltip = (function () {
    function Tooltip(element, loader) {
        this.element = element;
        this.loader = loader;
        this.visible = false;
        this.placement = 'top';
    }
    Tooltip.prototype.onInit = function () {
    };
    // todo: filter triggers
    // params: event, target
    Tooltip.prototype.show = function () {
        var _this = this;
        if (this.visible) {
            return;
        }
        this.visible = true;
        var options = new TooltipOptions({
            content: this.content,
            placement: this.placement
        });
        var binding = angular2_2.Injector.resolve([
            angular2_2.bind(TooltipOptions).toValue(options)
        ]);
        this.tooltip = this.loader
            .loadNextToLocation(TooltipContainer, this.element, binding)
            .then(function (componentRef) {
            componentRef.instance.position(_this.element);
            return componentRef;
        });
    };
    // params event, target
    Tooltip.prototype.hide = function () {
        if (!this.visible) {
            return;
        }
        this.visible = false;
        this.tooltip.then(function (componentRef) {
            componentRef.dispose();
            return componentRef;
        });
    };
    Tooltip = __decorate([
        angular2_1.Directive({
            selector: '[tooltip]',
            properties: [
                'content:tooltip',
                'placement:tooltip-placement',
                'appendToBody',
                'isOpen: tooltip-is-open',
                'enable: tooltip-enable'
            ],
            host: {
                '(mouseenter)': 'show($event, $targe)',
                '(mouseleave)': 'hide($event, $targe)',
                '(focusin)': 'show($event, $targe)',
                '(focusout)': 'hide($event, $targe)'
            }
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef, angular2_1.DynamicComponentLoader])
    ], Tooltip);
    return Tooltip;
})();
exports.Tooltip = Tooltip;
exports.tooltip = [Tooltip, TooltipContainer];
//# sourceMappingURL=tooltip.js.map