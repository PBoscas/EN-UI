/*!
 * JavaScript Custom Forms
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.2.3
 */
!function(e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "jquery" ], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : e.jcf = t(jQuery);
}(this, function(e) {
    "use strict";
    var n = [], o = {
        optionsKey: "jcf",
        dataKey: "jcf-instance",
        rtlClass: "jcf-rtl",
        focusClass: "jcf-focus",
        pressedClass: "jcf-pressed",
        disabledClass: "jcf-disabled",
        hiddenClass: "jcf-hidden",
        resetAppearanceClass: "jcf-reset-appearance",
        unselectableClass: "jcf-unselectable"
    }, a = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch, i = /Windows Phone/.test(navigator.userAgent);
    o.isMobileDevice = !(!a && !i);
    !function() {
        var n = navigator.pointerEnabled || navigator.msPointerEnabled, t = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch, a = {}, i = "jcf-", t = n ? {
            pointerover: navigator.pointerEnabled ? "pointerover" : "MSPointerOver",
            pointerdown: navigator.pointerEnabled ? "pointerdown" : "MSPointerDown",
            pointermove: navigator.pointerEnabled ? "pointermove" : "MSPointerMove",
            pointerup: navigator.pointerEnabled ? "pointerup" : "MSPointerUp"
        } : {
            pointerover: "mouseover",
            pointerdown: "mousedown" + (t ? " touchstart" : ""),
            pointermove: "mousemove" + (t ? " touchmove" : ""),
            pointerup: "mouseup" + (t ? " touchend" : "")
        };
        e.each(t, function(t, n) {
            e.each(n.split(" "), function(e, n) {
                a[n] = t;
            });
        }), e.each(t, function(t, n) {
            n = n.split(" "), e.event.special[i + t] = {
                setup: function() {
                    var t = this;
                    e.each(n, function(e, n) {
                        t.addEventListener ? t.addEventListener(n, c, !1) : t["on" + n] = c;
                    });
                },
                teardown: function() {
                    var t = this;
                    e.each(n, function(e, n) {
                        t.addEventListener ? t.removeEventListener(n, c, !1) : t["on" + n] = null;
                    });
                }
            };
        });
        var r = null, c = function(t) {
            var o, n = t || window.event, c = a[n.type];
            if ((t = e.event.fix(n)).type = i + c, n.pointerType) switch (n.pointerType) {
              case 2:
                t.pointerType = "touch";
                break;

              case 3:
                t.pointerType = "pen";
                break;

              case 4:
                t.pointerType = "mouse";
                break;

              default:
                t.pointerType = n.pointerType;
            } else t.pointerType = n.type.substr(0, 5);
            return t.pageX || t.pageY || (o = n.changedTouches ? n.changedTouches[0] : n, t.pageX = o.pageX, 
            t.pageY = o.pageY), "touchend" === n.type && (r = {
                x: t.pageX,
                y: t.pageY
            }), "mouse" === t.pointerType && r && function(n) {
                var t = Math.abs(n.pageX - r.x), n = Math.abs(n.pageY - r.y);
                return t <= 25 && n <= 25 || void 0;
            }(t) ? void 0 : (e.event.dispatch || e.event.handle).call(this, t);
        };
    }(), function() {
        var t = ("onwheel" in document || 9 <= document.documentMode ? "wheel" : "mousewheel DOMMouseScroll").split(" "), n = "jcf-mousewheel";
        e.event.special[n] = {
            setup: function() {
                var n = this;
                e.each(t, function(e, t) {
                    n.addEventListener ? n.addEventListener(t, o, !1) : n["on" + t] = o;
                });
            },
            teardown: function() {
                var n = this;
                e.each(t, function(e, t) {
                    n.addEventListener ? n.removeEventListener(t, o, !1) : n["on" + t] = null;
                });
            }
        };
        var o = function(t) {
            var o = t || window.event;
            return (t = e.event.fix(o)).type = n, "detail" in o && (t.deltaY = -o.detail), "wheelDelta" in o && (t.deltaY = -o.wheelDelta), 
            "wheelDeltaY" in o && (t.deltaY = -o.wheelDeltaY), "wheelDeltaX" in o && (t.deltaX = -o.wheelDeltaX), 
            "deltaY" in o && (t.deltaY = o.deltaY), "deltaX" in o && (t.deltaX = o.deltaX), 
            t.delta = t.deltaY || t.deltaX, 1 === o.deltaMode && (t.delta *= 16, t.deltaY *= 16, 
            t.deltaX *= 16), (e.event.dispatch || e.event.handle).call(this, t);
        };
    }();
    var s = {
        fireNativeEvent: function(t, n) {
            e(t).each(function() {
                var e, t = this;
                t.dispatchEvent ? ((e = document.createEvent("HTMLEvents")).initEvent(n, !0, !0), 
                t.dispatchEvent(e)) : document.createEventObject && ((e = document.createEventObject()).target = t).fireEvent("on" + n, e);
            });
        },
        bindHandlers: function() {
            var t = this;
            e.each(t, function(n, o) {
                0 === n.indexOf("on") && e.isFunction(o) && (t[n] = function() {
                    return o.apply(t, arguments);
                });
            });
        }
    }, c = {
        version: "1.2.3",
        modules: {},
        getOptions: function() {
            return e.extend({}, o);
        },
        setOptions: function(t, n) {
            1 < arguments.length ? this.modules[t] && e.extend(this.modules[t].prototype.options, n) : e.extend(o, t);
        },
        addModule: function(t) {
            e.isFunction(t) && (t = t(e, window));
            function a(t) {
                t.element.data(o.dataKey) || t.element.data(o.dataKey, this), n.push(this), this.options = e.extend({}, o, this.options, i(t.element), t), 
                this.bindHandlers(), this.init.apply(this, arguments);
            }
            var i = function(t) {
                var n = t.data(o.optionsKey), a = t.attr(o.optionsKey);
                if (n) return n;
                if (a) try {
                    return e.parseJSON(a);
                } catch (i) {}
            };
            a.prototype = t, e.extend(t, s), t.plugins && e.each(t.plugins, function(t, n) {
                e.extend(n.prototype, s);
            });
            var r = a.prototype.destroy;
            a.prototype.destroy = function() {
                this.options.element.removeData(this.options.dataKey);
                for (var e = n.length - 1; 0 <= e; e--) if (n[e] === this) {
                    n.splice(e, 1);
                    break;
                }
                r && r.apply(this, arguments);
            }, this.modules[t.name] = a;
        },
        getInstance: function(t) {
            return e(t).data(o.dataKey);
        },
        replace: function(t, n, a) {
            var i, s = this;
            return o.styleSheetCreated || function() {
                var i = e("<style>").appendTo("head"), n = i.prop("sheet") || i.prop("styleSheet"), r = function(e, t, o) {
                    o = o || 0, n.insertRule ? n.insertRule(e + "{" + t + "}", o) : n.addRule(e, t, o);
                };
                r("." + o.hiddenClass, "position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none"), 
                r("." + o.rtlClass + " ." + o.hiddenClass, "right:-9999px !important; left: auto !important"), 
                r("." + o.unselectableClass, "-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);"), 
                r("." + o.resetAppearanceClass, "background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);");
                i = e("html"), r = e("body");
                "rtl" !== i.css("direction") && "rtl" !== r.css("direction") || i.addClass(o.rtlClass), 
                i.on("reset", function() {
                    setTimeout(function() {
                        c.refreshAll();
                    }, 0);
                }), o.styleSheetCreated = !0;
            }(), e(t).each(function() {
                var t, r = e(this);
                (i = r.data(o.dataKey)) ? i.refresh() : (n || e.each(s.modules, function(e, t) {
                    return t.prototype.matchElement.call(t.prototype, r) ? (n = e, !1) : void 0;
                }), n && (t = e.extend({
                    element: r
                }, a), i = new s.modules[n](t)));
            }), i;
        },
        refresh: function(t) {
            e(t).each(function() {
                var t = e(this).data(o.dataKey);
                t && t.refresh();
            });
        },
        destroy: function(t) {
            e(t).each(function() {
                var t = e(this).data(o.dataKey);
                t && t.destroy();
            });
        },
        replaceAll: function(t) {
            var n = this;
            e.each(this.modules, function(o, a) {
                e(a.prototype.selector, t).each(function() {
                    this.className.indexOf("jcf-ignore") < 0 && n.replace(this, o);
                });
            });
        },
        refreshAll: function(t) {
            if (t) e.each(this.modules, function(n, a) {
                e(a.prototype.selector, t).each(function() {
                    var t = e(this).data(o.dataKey);
                    t && t.refresh();
                });
            }); else for (var a = n.length - 1; 0 <= a; a--) n[a].refresh();
        },
        destroyAll: function(t) {
            if (t) e.each(this.modules, function(n, a) {
                e(a.prototype.selector, t).each(function(t, a) {
                    a = e(a).data(o.dataKey);
                    a && a.destroy();
                });
            }); else for (;n.length; ) n[0].destroy();
        }
    };
    return "function" == typeof define && define.amd && (window.jcf = c), c;
});