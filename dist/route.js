"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
var Route = /** @class */ (function () {
    function Route(name, path, additionalProps) {
        var _this = this;
        this.isEnter = function (path) {
            return new RegExp("" + _this.PATH.replace(/:(.)+/, "(.)+").replace(/:(.)+\//, "(.)+")).test(path || window.location.pathname);
        };
        this.NAME = name;
        this.PATH = path;
        this.ICON = additionalProps === null || additionalProps === void 0 ? void 0 : additionalProps.ICON;
        this.LABEL = additionalProps === null || additionalProps === void 0 ? void 0 : additionalProps.LABEL;
        this.REDIRECT = additionalProps === null || additionalProps === void 0 ? void 0 : additionalProps.REDIRECT;
        this.isPrevious = false;
    }
    Object.defineProperty(Route.prototype, "isCurrent", {
        get: function () {
            var _a;
            return new RegExp(this.PATH + "$").test((_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.pathname);
        },
        enumerable: false,
        configurable: true
    });
    return Route;
}());
exports.Route = Route;
