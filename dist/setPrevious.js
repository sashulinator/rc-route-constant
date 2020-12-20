"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPreviousRoute = void 0;
var previous = "";
var current = "";
var setPreviousRoute = function (routes) {
    var pathname = window.location.pathname;
    var keys = Object.keys(routes);
    if (current === pathname)
        return;
    previous = current;
    current = pathname;
    for (var i = 0; i < keys.length; i += 1) {
        var iRoute = routes[keys[i]];
        iRoute.isPrevious = new RegExp(iRoute.PATH + "$").test(previous);
    }
};
exports.setPreviousRoute = setPreviousRoute;
