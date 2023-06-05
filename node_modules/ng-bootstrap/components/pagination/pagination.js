var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var paginationConfig = {
    maxSize: void 0,
    itemsPerPage: 10,
    boundaryLinks: false,
    directionLinks: true,
    firstText: 'First',
    previousText: 'Previous',
    nextText: 'Next',
    lastText: 'Last',
    rotate: true
};
var Pagination = (function () {
    function Pagination(cd, renderer, elementRef) {
        this.cd = cd;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.numPages = new angular2_1.EventEmitter();
        this.pageChanged = new angular2_1.EventEmitter();
        this.inited = false;
        this.onChange = function (_) { };
        this.onTouched = function () { };
        cd.valueAccessor = this;
        this.config = this.config || paginationConfig;
    }
    Object.defineProperty(Pagination.prototype, "itemsPerPage", {
        get: function () {
            return this._itemsPerPage;
        },
        set: function (v) {
            this._itemsPerPage = v;
            this.totalPages = this.calculateTotalPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pagination.prototype, "totalItems", {
        get: function () {
            return this._totalItems;
        },
        set: function (v) {
            this._totalItems = v;
            this.totalPages = this.calculateTotalPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pagination.prototype, "totalPages", {
        get: function () {
            return this._totalPages;
        },
        set: function (v) {
            this._totalPages = v;
            this.numPages.next(v);
            if (this.inited) {
                this.selectPage(this.page);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pagination.prototype, "page", {
        get: function () {
            return this._page;
        },
        set: function (value) {
            this._page = (value > this.totalPages) ? this.totalPages : (value || 1);
            this.pageChanged.next({
                page: this._page,
                itemsPerPage: this.itemsPerPage
            });
        },
        enumerable: true,
        configurable: true
    });
    Pagination.prototype.onInit = function () {
        this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';
        // watch for maxSize
        this.maxSize = typeof this.maxSize !== 'undefined' ? this.maxSize : paginationConfig.maxSize;
        this.rotate = typeof this.rotate !== 'undefined' ? this.rotate : paginationConfig.rotate;
        this.boundaryLinks = typeof this.boundaryLinks !== 'undefined' ? this.boundaryLinks : paginationConfig.boundaryLinks;
        this.directionLinks = typeof this.directionLinks !== 'undefined' ? this.directionLinks : paginationConfig.directionLinks;
        // base class
        this.itemsPerPage = typeof this.itemsPerPage !== 'undefined' ? this.itemsPerPage : paginationConfig.itemsPerPage;
        this.totalPages = this.calculateTotalPages();
        // this class
        this.pages = this.getPages(this.page, this.totalPages);
        this.page = this.cd.value;
        this.inited = true;
    };
    Pagination.prototype.writeValue = function (value) {
        this.page = value;
        this.pages = this.getPages(this.page, this.totalPages);
    };
    Pagination.prototype.selectPage = function (page, event) {
        if (event) {
            event.preventDefault();
        }
        if (!this.disabled) {
            if (event && event.target) {
                var target = event.target;
                target.blur();
            }
            this.writeValue(page);
            this.cd.viewToModelUpdate(this.page);
        }
    };
    Pagination.prototype.getText = function (key) {
        return this[key + 'Text'] || paginationConfig[key + 'Text'];
    };
    Pagination.prototype.noPrevious = function () {
        return this.page === 1;
    };
    Pagination.prototype.noNext = function () {
        return this.page === this.totalPages;
    };
    // Create page object used in template
    Pagination.prototype.makePage = function (number, text, isActive) {
        return {
            number: number,
            text: text,
            active: isActive
        };
    };
    Pagination.prototype.getPages = function (currentPage, totalPages) {
        var pages = [];
        // Default page limits
        var startPage = 1;
        var endPage = totalPages;
        var isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;
        // recompute if maxSize
        if (isMaxSized) {
            if (this.rotate) {
                // Current page is displayed in the middle of the visible ones
                startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
                endPage = startPage + this.maxSize - 1;
                // Adjust if limit is exceeded
                if (endPage > totalPages) {
                    endPage = totalPages;
                    startPage = endPage - this.maxSize + 1;
                }
            }
            else {
                // Visible pages are paginated with maxSize
                startPage = ((Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize) + 1;
                // Adjust last page if limit is exceeded
                endPage = Math.min(startPage + this.maxSize - 1, totalPages);
            }
        }
        // Add page number links
        for (var number = startPage; number <= endPage; number++) {
            var page = this.makePage(number, number.toString(), number === currentPage);
            pages.push(page);
        }
        // Add links to move between page sets
        if (isMaxSized && !this.rotate) {
            if (startPage > 1) {
                var previousPageSet = this.makePage(startPage - 1, '...', false);
                pages.unshift(previousPageSet);
            }
            if (endPage < totalPages) {
                var nextPageSet = this.makePage(endPage + 1, '...', false);
                pages.push(nextPageSet);
            }
        }
        return pages;
    };
    // base class
    Pagination.prototype.calculateTotalPages = function () {
        var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    };
    Pagination.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    Pagination.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    Pagination = __decorate([
        angular2_1.Component({
            selector: 'pagination[ng-model], [pagination][ng-model]',
            properties: [
                'rotate', 'disabled',
                'totalItems', 'itemsPerPage', 'maxSize',
                'boundaryLinks', 'directionLinks',
                'firstText', 'previousText', 'nextText', 'lastText'
            ],
            events: ['numPages', 'pageChanged']
        }),
        angular2_1.View({
            template: "\n  <ul class=\"pagination\" [ng-class]=\"classMap\">\n    <li class=\"pagination-first\"\n        [ng-class]=\"{disabled: noPrevious()||disabled, hidden: !boundaryLinks}\"\n        [hidden]=\"!boundaryLinks\">\n      <a href (click)=\"selectPage(1, $event)\">{{getText('first')}}</a>\n    </li>\n\n    <li class=\"pagination-prev\"\n        [ng-class]=\"{disabled: noPrevious()||disabled, hidden: !directionLinks}\"\n        [hidden]=\"!directionLinks\">\n      <a href (click)=\"selectPage(page - 1, $event)\">{{getText('previous')}}</a>\n      </li>\n\n    <li *ng-for=\"#pg of pages\"\n    [ng-class]=\"{active: pg.active, disabled: disabled&&!pg.active}\"\n    class=\"pagination-page\">\n      <a href (click)=\"selectPage(pg.number, $event)\">{{pg.text}}</a>\n    </li>\n\n    <li class=\"pagination-next\"\n        [ng-class]=\"{disabled: noNext()||disabled, hidden: !directionLinks}\"\n        [hidden]=\"!directionLinks\">\n      <a href (click)=\"selectPage(page + 1, $event)\">{{getText('next')}}</a></li>\n\n    <li class=\"pagination-last\"\n        [ng-class]=\"{disabled: noNext()||disabled, hidden: !boundaryLinks}\"\n        [hidden]=\"!boundaryLinks\">\n      <a href (click)=\"selectPage(totalPages, $event)\">{{getText('last')}}</a></li>\n  </ul>\n  ",
            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.NgClass],
            encapsulation: angular2_1.ViewEncapsulation.None
        }),
        __param(0, angular2_1.Self()), 
        __metadata('design:paramtypes', [angular2_1.NgModel, angular2_1.Renderer, angular2_1.ElementRef])
    ], Pagination);
    return Pagination;
})();
exports.Pagination = Pagination;
var pagerConfig = {
    itemsPerPage: 10,
    previousText: '« Previous',
    nextText: 'Next »',
    align: true
};
var Pager = (function (_super) {
    __extends(Pager, _super);
    function Pager(cd, renderer, elementRef) {
        _super.call(this, cd, renderer, elementRef);
        this.align = pagerConfig.align;
        this.config = pagerConfig;
    }
    Pager = __decorate([
        angular2_1.Component({
            selector: 'pager[ng-model], [pager][ng-model]',
            properties: [
                'align',
                'totalItems', 'itemsPerPage',
                'previousText', 'nextText',
            ]
        }),
        angular2_1.View({
            template: "\n    <ul class=\"pager\">\n      <li [ng-class]=\"{disabled: noPrevious(), previous: align, 'pull-left': align}\"><a href (click)=\"selectPage(page - 1, $event)\">{{getText('previous')}}</a></li>\n      <li [ng-class]=\"{disabled: noNext(), next: align, 'pull-right': align}\"><a href (click)=\"selectPage(page + 1, $event)\">{{getText('next')}}</a></li>\n  </ul>\n  ",
            directives: [angular2_1.NgClass]
        }),
        __param(0, angular2_1.Self()), 
        __metadata('design:paramtypes', [angular2_1.NgModel, angular2_1.Renderer, angular2_1.ElementRef])
    ], Pager);
    return Pager;
})(Pagination);
exports.Pager = Pager;
exports.pagination = [Pagination, Pager];
//# sourceMappingURL=pagination.js.map