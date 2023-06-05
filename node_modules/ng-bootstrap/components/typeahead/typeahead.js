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
// https://github.com/angular/angular/blob/master/modules/angular2/src/core/forms/directives/shared.ts
function setProperty(renderer, elementRef, propName, propValue) {
    renderer.setElementProperty(elementRef, propName, propValue);
}
var angular2_2 = require('angular2/angular2');
var ng2_bootstrap_config_1 = require('../ng2-bootstrap-config');
var position_1 = require('../position');
var TEMPLATE = (_a = {},
    _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS4] = "\n  <div class=\"dropdown-menu\"\n      [ng-style]=\"{top: top, left: left, display: display}\"\n      style=\"display: block\">\n      <a href=\"#\"\n         *ng-for=\"#match of matches\"\n         (click)=\"selectMatch(match, $event)\"\n         [ng-class]=\"{active: isActive(match) }\"\n         (mouseenter)=\"selectActive(match)\"\n         class=\"dropdown-item\"\n         [inner-html]=\"hightlight(match, query)\"></a>\n  </div>\n  ",
    _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS3] = "\n  <ul class=\"dropdown-menu\"\n      [ng-style]=\"{top: top, left: left, display: display}\"\n      style=\"display: block\">\n    <li *ng-for=\"#match of matches\"\n        [ng-class]=\"{active: isActive(match) }\"\n        (mouseenter)=\"selectActive(match)\">\n        <a href=\"#\" (click)=\"selectMatch(match, $event)\" tabindex=\"-1\" [inner-html]=\"hightlight(match, query)\"></a>\n    </li>\n  </ul>\n  ",
    _a
);
var TypeaheadOptions = (function () {
    function TypeaheadOptions(options) {
        Object.assign(this, options);
    }
    return TypeaheadOptions;
})();
exports.TypeaheadOptions = TypeaheadOptions;
var TypeaheadContainer = (function () {
    function TypeaheadContainer(element, options) {
        this.element = element;
        this._matches = [];
        Object.assign(this, options);
    }
    Object.defineProperty(TypeaheadContainer.prototype, "matches", {
        get: function () {
            return this._matches;
        },
        set: function (value) {
            this._matches = value;
            if (this._matches.length > 0) {
                this._active = this._matches[0];
            }
        },
        enumerable: true,
        configurable: true
    });
    TypeaheadContainer.prototype.position = function (hostEl) {
        this.display = 'block';
        this.top = '0px';
        this.left = '0px';
        var p = position_1.positionService
            .positionElements(hostEl.nativeElement, this.element.nativeElement.children[0], this.placement, false);
        this.top = p.top + 'px';
        this.left = p.left + 'px';
    };
    TypeaheadContainer.prototype.selectActiveMatch = function () {
        this.selectMatch(this._active);
    };
    TypeaheadContainer.prototype.prevActiveMatch = function () {
        var index = this.matches.indexOf(this._active);
        this._active = this.matches[index - 1 < 0 ? this.matches.length - 1 : index - 1];
    };
    TypeaheadContainer.prototype.nextActiveMatch = function () {
        var index = this.matches.indexOf(this._active);
        this._active = this.matches[index + 1 > this.matches.length - 1 ? 0 : index + 1];
    };
    TypeaheadContainer.prototype.selectActive = function (value) {
        this._active = value;
    };
    TypeaheadContainer.prototype.isActive = function (value) {
        return this._active === value;
    };
    TypeaheadContainer.prototype.selectMatch = function (value, e) {
        if (e === void 0) { e = null; }
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.parent.changeModel(value);
        this.parent.typeaheadOnSelect.next({
            item: value
        });
        return false;
    };
    TypeaheadContainer.prototype.escapeRegexp = function (queryToEscape) {
        // Regex: capture the whole query string and replace it with the string that will be used to match
        // the results, for example if the capture is "a" the result will be \a
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    };
    TypeaheadContainer.prototype.hightlight = function (item, query) {
        // Replaces the capture string with a the same string inside of a "strong" tag
        return query ? item.replace(new RegExp(this.escapeRegexp(query), 'gi'), '<strong>$&</strong>') : item;
    };
    ;
    TypeaheadContainer = __decorate([
        angular2_1.Component({
            selector: 'typeahead-container'
        }),
        angular2_1.View({
            template: TEMPLATE[ng2_bootstrap_config_1.Ng2BootstrapConfig.theme],
            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.NgClass, angular2_1.NgStyle],
            encapsulation: angular2_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef, TypeaheadOptions])
    ], TypeaheadContainer);
    return TypeaheadContainer;
})();
exports.TypeaheadContainer = TypeaheadContainer;
// todo: options loading by http not yet implemented
var Typeahead = (function () {
    function Typeahead(cd, element, renderer, loader) {
        this.cd = cd;
        this.element = element;
        this.renderer = renderer;
        this.loader = loader;
        this.typeaheadLoading = new angular2_1.EventEmitter();
        this.typeaheadNoResults = new angular2_1.EventEmitter();
        this.typeaheadOnSelect = new angular2_1.EventEmitter();
        this.async = null;
        this._matches = [];
        this.placement = 'bottom-left';
    }
    Object.defineProperty(Typeahead.prototype, "matches", {
        get: function () {
            return this._matches;
        },
        enumerable: true,
        configurable: true
    });
    Typeahead.prototype.debounce = function (func, wait) {
        var timeout;
        var args;
        var timestamp;
        var waitOriginal = wait;
        return function () {
            // save details of latest call
            args = [].slice.call(arguments, 0);
            timestamp = Date.now();
            // this trick is about implementing of 'typeaheadWaitMs'
            // in this case we have adaptive 'wait' parameter
            // we should use standard 'wait'('waitOriginal') in case of
            // popup is opened, otherwise - 'typeaheadWaitMs' parameter
            wait = this.container ? waitOriginal : this.waitMs;
            // this is where the magic happens
            var later = function () {
                // how long ago was the last call
                var last = Date.now() - timestamp;
                // if the latest call was less that the wait period ago
                // then we reset the timeout to wait for the difference
                if (last < wait) {
                    timeout = setTimeout(later, wait - last);
                }
                else {
                    timeout = null;
                    func.apply(this, args);
                }
            };
            // we only need to set the timer now if one isn't already running
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
        };
    };
    Typeahead.prototype.processMatches = function () {
        this._matches = [];
        if (this.cd.model.toString().length >= this.minLength) {
            for (var i = 0; i < this.source.length; i++) {
                var match = void 0;
                if (typeof this.source[i] === 'object' &&
                    this.source[i][this.field]) {
                    match = this.source[i][this.field];
                }
                if (typeof this.source[i] === 'string') {
                    match = this.source[i];
                }
                if (!match) {
                    console.log('Invalid match type', typeof this.source[i], this.field);
                    continue;
                }
                if (match.toLowerCase().indexOf(this.cd.model.toString().toLowerCase()) >= 0) {
                    this._matches.push(match);
                    if (this._matches.length > this.optionsLimit - 1) {
                        break;
                    }
                }
            }
        }
    };
    Typeahead.prototype.finalizeAsyncCall = function () {
        this.typeaheadLoading.next(false);
        this.typeaheadNoResults.next(this.cd.model.toString().length >=
            this.minLength && this.matches.length <= 0);
        if (this.cd.model.toString().length <= 0 || this._matches.length <= 0) {
            this.hide();
            return;
        }
        if (this.container && this._matches.length > 0) {
            this.container.query = this.cd.model;
            this.container.matches = this._matches;
        }
        if (!this.container && this._matches.length > 0) {
            this.show(this._matches);
        }
    };
    Typeahead.prototype.onInit = function () {
        var _this = this;
        this.optionsLimit = this.optionsLimit || 20;
        this.minLength = this.minLength || 1;
        this.waitMs = this.waitMs || 0;
        // async should be false in case of array
        if (this.async === null && typeof this.source !== 'function') {
            this.async = false;
        }
        // async should be true for any case of function
        if (typeof this.source === 'function') {
            this.async = true;
        }
        if (this.async === true) {
            this.debouncer = this.debounce(function () {
                if (typeof _this.source === 'function') {
                    _this.source().then(function (matches) {
                        _this._matches = [];
                        if (_this.cd.model.toString().length >= _this.minLength) {
                            for (var i = 0; i < matches.length; i++) {
                                _this._matches.push(matches[i]);
                                if (_this._matches.length > _this.optionsLimit - 1) {
                                    break;
                                }
                            }
                        }
                        _this.finalizeAsyncCall();
                    });
                }
                // source is array
                if (typeof _this.source === 'object' && _this.source.length) {
                    _this.processMatches();
                    _this.finalizeAsyncCall();
                }
            }, 100);
        }
    };
    Typeahead.prototype.onChange = function (e) {
        if (this.container) {
            // esc
            if (e.keyCode === 27) {
                this.hide();
                return;
            }
            // up
            if (e.keyCode === 38) {
                this.container.prevActiveMatch();
                return;
            }
            // down
            if (e.keyCode === 40) {
                this.container.nextActiveMatch();
                return;
            }
            // enter
            if (e.keyCode === 13) {
                this.container.selectActiveMatch();
                return;
            }
        }
        this.typeaheadLoading.next(true);
        if (this.async === true) {
            this.debouncer();
        }
        if (this.async === false) {
            this.processMatches();
            this.finalizeAsyncCall();
        }
    };
    Typeahead.prototype.changeModel = function (value) {
        this.cd.viewToModelUpdate(value);
        setProperty(this.renderer, this.element, 'value', value);
        this.hide();
    };
    Typeahead.prototype.show = function (matches) {
        var _this = this;
        var options = new TypeaheadOptions({
            placement: this.placement,
            animation: false
        });
        var binding = angular2_2.Injector.resolve([
            angular2_2.bind(TypeaheadOptions).toValue(options)
        ]);
        this.popup = this.loader
            .loadNextToLocation(TypeaheadContainer, this.element, binding)
            .then(function (componentRef) {
            componentRef.instance.position(_this.element);
            _this.container = componentRef.instance;
            _this.container.parent = _this;
            _this.container.query = _this.cd.model;
            _this.container.matches = matches;
            _this.element.nativeElement.focus();
            return componentRef;
        });
    };
    Typeahead.prototype.hide = function () {
        var _this = this;
        if (this.container) {
            this.popup.then(function (componentRef) {
                componentRef.dispose();
                _this.container = null;
                return componentRef;
            });
        }
    };
    Typeahead = __decorate([
        angular2_1.Directive({
            selector: 'typeahead, [typeahead]',
            properties: [
                'source:typeahead',
                // todo: not yet implemented
                'appendToBody:typeaheadAppendToBody',
                // todo: not yet implemented
                'editable:typeaheadEditable',
                // todo: not yet implemented
                'focusFirst:typeaheadFocusFirst',
                // todo: not yet implemented
                'inputFormatter:typeaheadInputFormatter',
                'minLength:typeaheadMinLength',
                // todo: not yet implemented
                'selectOnExact:typeaheadSelectOnExact',
                // todo: not yet implemented
                'templateUrl:typeaheadTemplateUrl',
                // todo: not yet implemented
                'popupTemplateUrl:typeaheadPopupTemplateUrl',
                'waitMs:typeaheadWaitMs',
                'optionsLimit:typeaheadOptionsLimit',
                // todo: not yet implemented
                'selectOnBlur:typeaheadSelectOnBlur',
                // todo: not yet implemented
                'focusOnSelect:typeaheadFocusOnSelect',
                'field:typeaheadOptionField',
                'async:typeaheadAsync'
            ],
            events: ['typeaheadLoading', 'typeaheadNoResults', 'typeaheadOnSelect'],
            host: {
                '(keyup)': 'onChange($event)'
            }
        }), 
        __metadata('design:paramtypes', [angular2_1.NgModel, angular2_1.ElementRef, angular2_1.Renderer, angular2_1.DynamicComponentLoader])
    ], Typeahead);
    return Typeahead;
})();
exports.Typeahead = Typeahead;
exports.typeahead = [Typeahead];
var _a;
//# sourceMappingURL=typeahead.js.map