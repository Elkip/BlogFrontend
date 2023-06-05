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
// todo: support template url
var Accordion = (function () {
    function Accordion() {
        this.groups = [];
    }
    Accordion.prototype.closeOtherGroups = function (openGroup) {
        if (!this.closeOthers) {
            return;
        }
        this.groups.forEach(function (group) {
            if (group !== openGroup) {
                group.isOpen = false;
            }
        });
    };
    Accordion.prototype.addGroup = function (group) {
        this.groups.push(group);
    };
    Accordion.prototype.removeGroup = function (group) {
        var index = this.groups.indexOf(group);
        if (index !== -1) {
            this.groups.slice(index, 1);
        }
    };
    Accordion = __decorate([
        angular2_1.Component({
            selector: 'accordion, [accordion]',
            properties: ['templateUrl', 'closeOthers'],
            host: {
                '[class.panel-group]': 'true'
            }
        }),
        angular2_1.View({
            template: "<ng-content></ng-content>"
        }), 
        __metadata('design:paramtypes', [])
    ], Accordion);
    return Accordion;
})();
exports.Accordion = Accordion;
var AccordionTransclude = (function () {
    function AccordionTransclude(viewRef) {
        this.viewRef = viewRef;
    }
    AccordionTransclude.prototype.onInit = function () {
        if (this.accordionTransclude) {
            this.viewRef.createEmbeddedView(this.accordionTransclude);
        }
    };
    AccordionTransclude = __decorate([
        angular2_1.Directive({
            selector: 'accordion-transclude, [accordion-transclude]',
            properties: ['accordionTransclude']
        }),
        __param(0, angular2_1.Inject(angular2_1.ViewContainerRef)), 
        __metadata('design:paramtypes', [angular2_1.ViewContainerRef])
    ], AccordionTransclude);
    return AccordionTransclude;
})();
exports.AccordionTransclude = AccordionTransclude;
var collapse_1 = require('../collapse/collapse');
// todo: support template url
// todo: support custom `open class`
var AccordionGroup = (function () {
    function AccordionGroup(accordion) {
        this.accordion = accordion;
    }
    AccordionGroup.prototype.onInit = function () {
        this.panelClass = this.panelClass || 'panel-default';
        this.accordion.addGroup(this);
    };
    AccordionGroup.prototype.onDestroy = function () {
        this.accordion.removeGroup(this);
    };
    AccordionGroup.prototype.toggleOpen = function (event) {
        event.preventDefault();
        if (!this.isDisabled) {
            this.isOpen = !this.isOpen;
        }
    };
    Object.defineProperty(AccordionGroup.prototype, "isOpen", {
        get: function () {
            return this._isOpen;
        },
        set: function (value) {
            this._isOpen = value;
            if (value) {
                this.accordion.closeOtherGroups(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    AccordionGroup = __decorate([
        angular2_1.Component({
            selector: 'accordion-group, [accordion-group]',
            properties: ['templateUrl', 'heading', 'isOpen', 'isDisabled', 'panelClass'],
            host: {
                '[class.panel-open]': 'isOpen'
            }
        }),
        angular2_1.View({
            template: "\n  <div class=\"panel\" [ng-class]=\"panelClass\">\n    <div class=\"panel-heading\" (click)=\"toggleOpen($event)\">\n      <h4 class=\"panel-title\">\n        <a href tabindex=\"0\" class=\"accordion-toggle\">\n          <span [ng-class]=\"{'text-muted': isDisabled}\"\n            [accordion-transclude]=\"headingTemplate\">{{heading}}</span>\n        </a>\n      </h4>\n    </div>\n    <div class=\"panel-collapse collapse\" [collapse]=\"!isOpen\">\n      <div class=\"panel-body\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  </div>\n  ",
            directives: [collapse_1.Collapse, AccordionTransclude, angular2_1.NgClass]
        }), 
        __metadata('design:paramtypes', [Accordion])
    ], AccordionGroup);
    return AccordionGroup;
})();
exports.AccordionGroup = AccordionGroup;
var AccordionHeading = (function () {
    function AccordionHeading(group, templateRef) {
        this.group = group;
        this.templateRef = templateRef;
        group.headingTemplate = templateRef;
    }
    AccordionHeading = __decorate([
        angular2_1.Directive({
            selector: 'accordion-heading, [accordion-heading]'
        }), 
        __metadata('design:paramtypes', [AccordionGroup, angular2_1.TemplateRef])
    ], AccordionHeading);
    return AccordionHeading;
})();
exports.AccordionHeading = AccordionHeading;
exports.accordion = [Accordion, AccordionGroup, AccordionHeading];
//# sourceMappingURL=accordion.js.map