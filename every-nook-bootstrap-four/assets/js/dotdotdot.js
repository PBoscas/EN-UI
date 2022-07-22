/*
 *	jQuery dotdotdot 1.6.16
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	Plugin website:
 *	dotdotdot.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
!function(t, e) {
    function r(e, n, i, d, l) {
        var s = !1;
        return e.contents().detach().each(function() {
            var f = this, h = t(f);
            if (void 0 === f || 3 == f.nodeType && 0 == t.trim(f.data).length) return !0;
            if (h.is("script, .dotdotdot-keep")) e.append(h); else {
                if (s) return !0;
                e.append(h), l && e[e.is("table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style") ? "after" : "append"](l), 
                a(i, d) && ((s = (3 == f.nodeType ? o : r)(h, n, i, d, l)) || (h.detach(), s = !0)), 
                s || l && l.detach();
            }
        }), s;
    }
    function o(T, n, r, o, d) {
        var c = T[0];
        if (!c) return !1;
        var f = s(c), x = -1 !== f.indexOf(" ") ? " " : "　", p = "letter" == o.wrap ? "" : x, g = f.split(p), v = -1, w = -1, b = 0, y = g.length - 1;
        for (o.fallbackToLetter && 0 == b && 0 == y && (p = "", y = (g = f.split(p)).length - 1); b <= y && (0 != b || 0 != y); ) {
            var m = Math.floor((b + y) / 2);
            if (m == w) break;
            w = m, l(c, g.slice(0, w + 1).join(p) + o.ellipsis), a(r, o) ? (y = w, o.fallbackToLetter && 0 == b && 0 == y && (p = "", 
            w = v = -1, y = (g = g[b = 0].split(p)).length - 1)) : b = v = w;
        }
        return -1 == v || 1 == g.length && 0 == g[0].length ? (x = T.parent(), T.detach(), 
        T = d && d.closest(x).length ? d.length : 0, x.contents().length > T ? c = u(x.contents().eq(-1 - T), n) : (c = u(x, n, !0), 
        T || x.detach()), c && (l(c, f = i(s(c), o)), T && d && t(c).parent().append(d))) : l(c, f = i(g.slice(0, v + 1).join(p), o)), 
        !0;
    }
    function a(t, e) {
        return t.innerHeight() > e.maxHeight;
    }
    function i(e, n) {
        for (;-1 < t.inArray(e.slice(-1), n.lastCharacter.remove); ) e = e.slice(0, -1);
        return t.inArray(e.slice(-1), n.lastCharacter.noEllipsis) < 0 && (e += n.ellipsis), 
        e;
    }
    function d(t) {
        return {
            width: t.innerWidth(),
            height: t.innerHeight()
        };
    }
    function l(t, e) {
        t.innerText ? t.innerText = e : t.nodeValue ? t.nodeValue = e : t.textContent && (t.textContent = e);
    }
    function s(t) {
        return t.innerText || t.nodeValue || t.textContent || "";
    }
    function c(t) {
        for (;t = t.previousSibling, t && 1 !== t.nodeType && 3 !== t.nodeType; ) ;
        return t;
    }
    function u(e, n, r) {
        var o, a = e && e[0];
        if (a) {
            if (!r) {
                if (3 === a.nodeType) return a;
                if (t.trim(e.text())) return u(e.contents().last(), n);
            }
            for (o = c(a); !o; ) {
                if ((e = e.parent()).is(n) || !e.length) return !1;
                o = c(e[0]);
            }
            if (o) return u(t(o), n);
        }
        return !1;
    }
    var p, g, v;
    t.fn.dotdotdot || (t.fn.dotdotdot = function(e) {
        if (0 == this.length) return t.fn.dotdotdot.debug('No element found for "' + this.selector + '".'), 
        this;
        if (1 < this.length) return this.each(function() {
            t(this).dotdotdot(e);
        });
        var o = this;
        o.data("dotdotdot") && o.trigger("destroy.dot"), o.data("dotdotdot-style", o.attr("style") || ""), 
        o.css("word-wrap", "break-word"), "nowrap" === o.css("white-space") && o.css("white-space", "normal"), 
        o.bind_events = function() {
            return o.bind("update.dot", function(c, u) {
                c.preventDefault(), c.stopPropagation(), l.maxHeight = "number" == typeof l.height ? l.height : function(t) {
                    for (var e = t.innerHeight(), n = [ "paddingTop", "paddingBottom" ], r = 0, o = n.length; r < o; r++) {
                        var a = parseInt(t.css(n[r]), 10);
                        isNaN(a) && (a = 0), e -= a;
                    }
                    return e;
                }(o), l.maxHeight += l.tolerance, void 0 !== u && (("string" == typeof u || u instanceof HTMLElement) && (u = t("<div />").append(u).contents()), 
                u instanceof t && (i = u)), (g = o.wrapInner('<div class="dotdotdot" />').children()).contents().detach().end().append(i.clone(!0)).find("br").replaceWith("  <br />  ").end().css({
                    height: "auto",
                    width: "auto",
                    border: "none",
                    padding: 0,
                    margin: 0
                });
                c = !1, u = !1;
                return s.afterElement && ((c = s.afterElement.clone(!0)).show(), s.afterElement.detach()), 
                a(g, l) && (u = "children" == l.wrap ? function(t, e, n) {
                    var r = t.children(), o = !1;
                    t.empty();
                    for (var i = 0, d = r.length; i < d; i++) {
                        var l = r.eq(i);
                        if (t.append(l), n && t.append(n), a(t, e)) {
                            l.remove(), o = !0;
                            break;
                        }
                        n && n.detach();
                    }
                    return o;
                }(g, l, c) : r(g, o, g, l, c)), g.replaceWith(g.contents()), g = null, t.isFunction(l.callback) && l.callback.call(o[0], u, i), 
                s.isTruncated = u;
            }).bind("isTruncated.dot", function(t, e) {
                return t.preventDefault(), t.stopPropagation(), "function" == typeof e && e.call(o[0], s.isTruncated), 
                s.isTruncated;
            }).bind("originalContent.dot", function(t, e) {
                return t.preventDefault(), t.stopPropagation(), "function" == typeof e && e.call(o[0], i), 
                i;
            }).bind("destroy.dot", function(t) {
                t.preventDefault(), t.stopPropagation(), o.unwatch().unbind_events().contents().detach().end().append(i).attr("style", o.data("dotdotdot-style") || "").data("dotdotdot", !1);
            }), o;
        }, o.unbind_events = function() {
            return o.unbind(".dot"), o;
        }, o.watch = function() {
            var e, n, r;
            return o.unwatch(), "window" == l.watch ? (e = t(window), n = e.width(), r = e.height(), 
            e.bind("resize.dot" + s.dotId, function() {
                n == e.width() && r == e.height() && l.windowResizeFix || (n = e.width(), r = e.height(), 
                u && clearInterval(u), u = setTimeout(function() {
                    o.trigger("update.dot");
                }, 100));
            })) : (c = d(o), u = setInterval(function() {
                var t;
                o.is(":visible") && (t = d(o), c.width == t.width && c.height == t.height || (o.trigger("update.dot"), 
                c = t));
            }, 500)), o;
        }, o.unwatch = function() {
            return t(window).unbind("resize.dot" + s.dotId), u && clearInterval(u), o;
        };
        var i = o.contents(), l = t.extend(!0, {}, t.fn.dotdotdot.defaults, e), s = {}, c = {}, u = null, g = null;
        return l.lastCharacter.remove instanceof Array || (l.lastCharacter.remove = t.fn.dotdotdot.defaultArrays.lastCharacter.remove), 
        l.lastCharacter.noEllipsis instanceof Array || (l.lastCharacter.noEllipsis = t.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis), 
        s.afterElement = function(e, n) {
            return !!e && ("string" == typeof e ? !!(e = t(e, n)).length && e : !!e.jquery && e);
        }(l.after, o), s.isTruncated = !1, s.dotId = p++, o.data("dotdotdot", !0).bind_events().trigger("update.dot"), 
        l.watch && o.watch(), o;
    }, t.fn.dotdotdot.defaults = {
        ellipsis: "... ",
        wrap: "word",
        fallbackToLetter: !0,
        lastCharacter: {},
        tolerance: 0,
        callback: null,
        after: null,
        height: null,
        watch: !1,
        windowResizeFix: !0
    }, t.fn.dotdotdot.defaultArrays = {
        lastCharacter: {
            remove: [ " ", "　", ",", ";", ".", "!", "?" ],
            noEllipsis: []
        }
    }, t.fn.dotdotdot.debug = function() {}, p = 1, g = t.fn.html, t.fn.html = function(n) {
        return n != e && !t.isFunction(n) && this.data("dotdotdot") ? this.trigger("update", [ n ]) : g.apply(this, arguments);
    }, v = t.fn.text, t.fn.text = function(n) {
        return n != e && !t.isFunction(n) && this.data("dotdotdot") ? (n = t("<div />").text(n).html(), 
        this.trigger("update", [ n ])) : v.apply(this, arguments);
    });
}(jQuery);