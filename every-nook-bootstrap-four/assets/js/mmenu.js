!function(e) {
    var t = {};
    function n(i) {
        if (t[i]) return t[i].exports;
        var s = t[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(s.exports, s, s.exports, n), s.l = !0, s.exports;
    }
    n.m = e, n.c = t, n.d = function(e, t, i) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: i
        });
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var i = Object.create(null);
        if (n.r(i), Object.defineProperty(i, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var s in e) n.d(i, s, function(t) {
            return e[t];
        }.bind(null, s));
        return i;
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return n.d(t, "a", t), t;
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, n.p = "", n(n.s = 0);
}([ function(e, t, n) {
    "use strict";
    n.r(t);
    var i = {
        hooks: {},
        extensions: [],
        wrappers: [],
        navbar: {
            add: !0,
            sticky: !0,
            title: "Menu",
            titleLink: "parent"
        },
        onClick: {
            close: null,
            preventDefault: null,
            setSelected: !0
        },
        slidingSubmenus: !0
    }, s = {
        classNames: {
            inset: "Inset",
            nolistview: "NoListview",
            nopanel: "NoPanel",
            panel: "Panel",
            selected: "Selected",
            vertical: "Vertical"
        },
        language: null,
        openingInterval: 25,
        panelNodetype: [ "ul", "ol", "div" ],
        transitionDuration: 400
    };
    function a(e, t) {
        for (var n in "object" != o(e) && (e = {}), "object" != o(t) && (t = {}), t) t.hasOwnProperty(n) && (void 0 === e[n] ? e[n] = t[n] : "object" == o(e[n]) && a(e[n], t[n]));
        return e;
    }
    function o(e) {
        return {}.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }
    function r(i, t, n) {
        if ("function" == typeof t) {
            i = t.call(i);
            if (void 0 !== i) return i;
        }
        return null !== t && "function" != typeof t && void 0 !== t || void 0 === n ? t : n;
    }
    function c(e, t, n) {
        var i = !1, s = function(n) {
            void 0 !== n && n.target !== e || (i || (e.removeEventListener("transitionend", s), 
            e.removeEventListener("webkitTransitionEnd", s), t.call(e)), i = !0);
        };
        e.addEventListener("transitionend", s), e.addEventListener("webkitTransitionEnd", s), 
        setTimeout(s, 1.1 * n);
    }
    function l() {
        return "mm-" + m++;
    }
    var m = 0;
    function d(e) {
        return "mm-" == e.slice(0, 3) ? e.slice(3) : e;
    }
    var p = {};
    function u(e, t) {
        void 0 === p[t] && (p[t] = {}), a(p[t], e);
    }
    function b(t) {
        var t = t.split("."), n = document.createElement(t.shift());
        return t.forEach(function(e) {
            n.classList.add(e);
        }), n;
    }
    function g(e, t) {
        return Array.prototype.slice.call(e.querySelectorAll(t));
    }
    function _(n, t) {
        n = Array.prototype.slice.call(n.children);
        return t ? n.filter(function(e) {
            return e.matches(t);
        }) : n;
    }
    function y(e, t) {
        for (var n = [], i = e.parentElement; i; ) n.push(i), i = i.parentElement;
        return t ? n.filter(function(e) {
            return e.matches(t);
        }) : n;
    }
    function w(e) {
        return e.filter(function(e) {
            return !e.matches(".mm-hidden");
        });
    }
    function L(e) {
        var t = [];
        return w(e).forEach(function(e) {
            t.push.apply(t, _(e, "a.mm-listitem__text"));
        }), t.filter(function(e) {
            return !e.matches(".mm-btn_next");
        });
    }
    function E(e, t, n) {
        e.matches("." + t) && (e.classList.remove(t), e.classList.add(n));
    }
    var x = {};
    function P(e, t, n) {
        "number" == typeof e && (e = "(min-width: " + e + "px)"), x[e] = x[e] || [], x[e].push({
            yes: t,
            no: n
        });
    }
    function k(e, t) {
        for (var n = t.matches ? "yes" : "no", i = 0; i < x[e].length; i++) x[e][i][n]();
    }
    u({
        Menu: "Menu"
    }, "nl"), u({
        Menu: "منو"
    }, "fa"), u({
        Menu: "Menü"
    }, "de"), u({
        Menu: "Меню"
    }, "ru");
    var S = function() {
        function e(t, n, i) {
            return this.opts = a(n, e.options), this.conf = a(i, e.configs), this._api = [ "bind", "initPanel", "initListview", "openPanel", "closePanel", "closeAllPanels", "setSelected" ], 
            this.node = {}, this.vars = {}, this.hook = {}, this.clck = [], this.node.menu = "string" == typeof t ? document.querySelector(t) : t, 
            "function" == typeof this._deprecatedWarnings && this._deprecatedWarnings(), this._initWrappers(), 
            this._initAddons(), this._initExtensions(), this._initHooks(), this._initAPI(), 
            this._initMenu(), this._initPanels(), this._initOpened(), this._initAnchors(), function() {
                for (var t in x) !function(e) {
                    var t = window.matchMedia(e);
                    k(e, t), t.onchange = function(n) {
                        k(e, t);
                    };
                }(t);
            }(), this;
        }
        return e.prototype.openPanel = function(e, t) {
            var n = this;
            if (this.trigger("openPanel:before", [ e ]), e && (e.matches(".mm-panel") || (e = e.closest(".mm-panel")), 
            e)) {
                if ("boolean" != typeof t && (t = !0), e.parentElement.matches(".mm-listitem_vertical")) {
                    y(e, ".mm-listitem_vertical").forEach(function(e) {
                        e.classList.add("mm-listitem_opened"), _(e, ".mm-panel").forEach(function(e) {
                            e.classList.remove("mm-hidden");
                        });
                    });
                    var s = y(e, ".mm-panel").filter(function(e) {
                        return !e.parentElement.matches(".mm-listitem_vertical");
                    });
                    this.trigger("openPanel:start", [ e ]), s.length && this.openPanel(s[0]), this.trigger("openPanel:finish", [ e ]);
                } else {
                    if (e.matches(".mm-panel_opened")) return;
                    var s = _(this.node.pnls, ".mm-panel"), a = _(this.node.pnls, ".mm-panel_opened")[0];
                    s.filter(function(t) {
                        return t !== e;
                    }).forEach(function(e) {
                        e.classList.remove("mm-panel_opened-parent");
                    });
                    for (var o = e.mmParent; o; ) (o = o.closest(".mm-panel")) && (o.parentElement.matches(".mm-listitem_vertical") || o.classList.add("mm-panel_opened-parent"), 
                    o = o.mmParent);
                    s.forEach(function(e) {
                        e.classList.remove("mm-panel_highest");
                    }), s.filter(function(e) {
                        return e !== a;
                    }).filter(function(t) {
                        return t !== e;
                    }).forEach(function(e) {
                        e.classList.add("mm-hidden");
                    }), e.classList.remove("mm-hidden");
                    var r = function() {
                        a && a.classList.remove("mm-panel_opened"), e.classList.add("mm-panel_opened"), 
                        e.matches(".mm-panel_opened-parent") ? (a && a.classList.add("mm-panel_highest"), 
                        e.classList.remove("mm-panel_opened-parent")) : (a && a.classList.add("mm-panel_opened-parent"), 
                        e.classList.add("mm-panel_highest")), n.trigger("openPanel:start", [ e ]);
                    }, l = function() {
                        a && (a.classList.remove("mm-panel_highest"), a.classList.add("mm-hidden")), e.classList.remove("mm-panel_highest"), 
                        n.trigger("openPanel:finish", [ e ]);
                    };
                    t && !e.matches(".mm-panel_noanimation") ? setTimeout(function() {
                        c(e, function() {
                            l();
                        }, n.conf.transitionDuration), r();
                    }, this.conf.openingInterval) : (r(), l());
                }
                this.trigger("openPanel:after", [ e ]);
            }
        }, e.prototype.closePanel = function(e) {
            this.trigger("closePanel:before", [ e ]);
            var t = e.parentElement;
            t.matches(".mm-listitem_vertical") && (t.classList.remove("mm-listitem_opened"), 
            e.classList.add("mm-hidden"), this.trigger("closePanel", [ e ])), this.trigger("closePanel:after", [ e ]);
        }, e.prototype.closeAllPanels = function(e) {
            this.trigger("closeAllPanels:before"), this.node.pnls.querySelectorAll(".mm-listitem").forEach(function(e) {
                e.classList.remove("mm-listitem_selected"), e.classList.remove("mm-listitem_opened");
            });
            var t = _(this.node.pnls, ".mm-panel"), n = e || t[0];
            _(this.node.pnls, ".mm-panel").forEach(function(e) {
                e !== n && (e.classList.remove("mm-panel_opened"), e.classList.remove("mm-panel_opened-parent"), 
                e.classList.remove("mm-panel_highest"), e.classList.add("mm-hidden"));
            }), this.openPanel(n, !1), this.trigger("closeAllPanels:after");
        }, e.prototype.togglePanel = function(e) {
            var t = e.parentElement;
            t.matches(".mm-listitem_vertical") && this[t.matches(".mm-listitem_opened") ? "closePanel" : "openPanel"](e);
        }, e.prototype.setSelected = function(e) {
            this.trigger("setSelected:before", [ e ]), g(this.node.menu, ".mm-listitem_selected").forEach(function(e) {
                e.classList.remove("mm-listitem_selected");
            }), e.classList.add("mm-listitem_selected"), this.trigger("setSelected:after", [ e ]);
        }, e.prototype.bind = function(e, t) {
            this.hook[e] = this.hook[e] || [], this.hook[e].push(t);
        }, e.prototype.trigger = function(e, t) {
            if (this.hook[e]) for (var n = 0, i = this.hook[e].length; n < i; n++) this.hook[e][n].apply(this, t);
        }, e.prototype._initAPI = function() {
            var e = this, t = this;
            this.API = {}, this._api.forEach(function(n) {
                e.API[n] = function() {
                    var e = t[n].apply(t, arguments);
                    return void 0 === e ? t.API : e;
                };
            }), this.node.menu.mmApi = this.API;
        }, e.prototype._initHooks = function() {
            for (var e in this.opts.hooks) this.bind(e, this.opts.hooks[e]);
        }, e.prototype._initWrappers = function() {
            this.trigger("initWrappers:before");
            for (var t = 0; t < this.opts.wrappers.length; t++) {
                var n = e.wrappers[this.opts.wrappers[t]];
                "function" == typeof n && n.call(this);
            }
            this.trigger("initWrappers:after");
        }, e.prototype._initAddons = function() {
            for (var t in this.trigger("initAddons:before"), e.addons) e.addons[t].call(this);
            this.trigger("initAddons:after");
        }, e.prototype._initExtensions = function() {
            var e = this;
            this.trigger("initExtensions:before"), "array" == o(this.opts.extensions) && (this.opts.extensions = {
                all: this.opts.extensions
            }), Object.keys(this.opts.extensions).forEach(function(t) {
                var n = e.opts.extensions[t].map(function(e) {
                    return "mm-menu_" + e;
                });
                n.length && P(t, function() {
                    n.forEach(function(t) {
                        e.node.menu.classList.add(t);
                    });
                }, function() {
                    n.forEach(function(t) {
                        e.node.menu.classList.remove(t);
                    });
                });
            }), this.trigger("initExtensions:after");
        }, e.prototype._initMenu = function() {
            var e = this;
            this.trigger("initMenu:before"), this.node.wrpr = this.node.wrpr || this.node.menu.parentElement, 
            this.node.wrpr.classList.add("mm-wrapper"), this.node.menu.id = this.node.menu.id || l();
            var t = b("div.mm-panels");
            _(this.node.menu).forEach(function(n) {
                -1 < e.conf.panelNodetype.indexOf(n.nodeName.toLowerCase()) && t.append(n);
            }), this.node.menu.append(t), this.node.pnls = t, this.node.menu.classList.add("mm-menu"), 
            this.trigger("initMenu:after");
        }, e.prototype._initPanels = function() {
            var e = this;
            this.trigger("initPanels:before"), this.clck.push(function(t, n) {
                if (n.inMenu) {
                    var i = t.getAttribute("href");
                    if (i && 1 < i.length && "#" == i.slice(0, 1)) try {
                        var s = g(e.node.menu, i)[0];
                        if (s && s.matches(".mm-panel")) return t.parentElement.matches(".mm-listitem_vertical") ? e.togglePanel(s) : e.openPanel(s), 
                        !0;
                    } catch (e) {}
                }
            }), _(this.node.pnls).forEach(function(t) {
                e.initPanel(t);
            }), this.trigger("initPanels:after");
        }, e.prototype.initPanel = function(e) {
            var i, t = this, n = this.conf.panelNodetype.join(", ");
            e.matches(n) && (e.matches(".mm-panel") || (e = this._initPanel(e)), e) && ((i = []).push.apply(i, _(e, "." + this.conf.classNames.panel)), 
            _(e, ".mm-listview").forEach(function(e) {
                _(e, ".mm-listitem").forEach(function(e) {
                    i.push.apply(i, _(e, n));
                });
            }), i.forEach(function(e) {
                t.initPanel(e);
            }));
        }, e.prototype._initPanel = function(e) {
            var t = this;
            if (this.trigger("initPanel:before", [ e ]), E(e, this.conf.classNames.panel, "mm-panel"), 
            E(e, this.conf.classNames.nopanel, "mm-nopanel"), E(e, this.conf.classNames.inset, "mm-listview_inset"), 
            e.matches(".mm-listview_inset") && e.classList.add("mm-nopanel"), e.matches(".mm-nopanel")) return null;
            var s, a = e.id || l(), r = e.matches("." + this.conf.classNames.vertical) || !this.opts.slidingSubmenus;
            e.classList.remove(this.conf.classNames.vertical), e.matches("ul, ol") && (e.removeAttribute("id"), 
            s = b("div"), e.before(s), s.append(e), e = s), e.id = a, e.classList.add("mm-panel"), 
            e.classList.add("mm-hidden");
            var o, a = [ e.parentElement ].filter(function(e) {
                return e.matches("li");
            })[0];
            return r ? a && a.classList.add("mm-listitem_vertical") : this.node.pnls.append(e), 
            a && (((a.mmChild = e).mmParent = a) && a.matches(".mm-listitem") && !_(a, ".mm-btn").length) && (o = _(a, ".mm-listitem__text")[0]) && ((r = b("a.mm-btn.mm-btn_next.mm-listitem__btn")).setAttribute("href", "#" + e.id), 
            o.matches("span") ? (r.classList.add("mm-listitem__text"), r.innerHTML = o.innerHTML, 
            a.insertBefore(r, o.nextElementSibling), o.remove()) : a.insertBefore(r, _(a, ".mm-panel")[0])), 
            this._initNavbar(e), _(e, "ul, ol").forEach(function(e) {
                t.initListview(e);
            }), this.trigger("initPanel:after", [ e ]), e;
        }, e.prototype._initNavbar = function(e) {
            if (this.trigger("initNavbar:before", [ e ]), !_(e, ".mm-navbar").length) {
                var r = null, n = null;
                if (e.getAttribute("data-mm-parent") ? n = g(this.node.pnls, e.getAttribute("data-mm-parent"))[0] : (r = e.mmParent) && (n = r.closest(".mm-panel")), 
                !r || !r.matches(".mm-listitem_vertical")) {
                    var s, i = b("div.mm-navbar");
                    this.opts.navbar.add ? this.opts.navbar.sticky && i.classList.add("mm-navbar_sticky") : i.classList.add("mm-hidden"), 
                    n && ((s = b("a.mm-btn.mm-btn_prev.mm-navbar__btn")).setAttribute("href", "#" + n.id), 
                    i.append(s));
                    var a = null;
                    r ? a = _(r, ".mm-listitem__text")[0] : n && (a = g(n, 'a[href="#' + e.id + '"]')[0]);
                    var o = b("a.mm-navbar__title"), r = b("span");
                    switch (o.append(r), r.innerHTML = e.getAttribute("data-mm-title") || (a ? a.textContent : "") || this.i18n(this.opts.navbar.title) || this.i18n("Menu"), 
                    this.opts.navbar.titleLink) {
                      case "anchor":
                        a && o.setAttribute("href", a.getAttribute("href"));
                        break;

                      case "parent":
                        n && o.setAttribute("href", "#" + n.id);
                    }
                    i.append(o), e.prepend(i), this.trigger("initNavbar:after", [ e ]);
                }
            }
        }, e.prototype.initListview = function(e) {
            var t = this;
            this.trigger("initListview:before", [ e ]), E(e, this.conf.classNames.nolistview, "mm-nolistview"), 
            e.matches(".mm-nolistview") || (e.classList.add("mm-listview"), _(e).forEach(function(e) {
                e.classList.add("mm-listitem"), E(e, t.conf.classNames.selected, "mm-listitem_selected"), 
                _(e, "a, span").forEach(function(e) {
                    e.matches(".mm-btn") || e.classList.add("mm-listitem__text");
                });
            })), this.trigger("initListview:after", [ e ]);
        }, e.prototype._initOpened = function() {
            this.trigger("initOpened:before");
            var n = this.node.pnls.querySelectorAll(".mm-listitem_selected"), t = null;
            n.forEach(function(e) {
                (t = e).classList.remove("mm-listitem_selected");
            }), t && t.classList.add("mm-listitem_selected");
            n = t ? t.closest(".mm-panel") : _(this.node.pnls, ".mm-panel")[0];
            this.openPanel(n, !1), this.trigger("initOpened:after");
        }, e.prototype._initAnchors = function() {
            var e = this;
            this.trigger("initAnchors:before"), document.addEventListener("click", function(t) {
                var n = t.target.closest("a[href]");
                if (n) {
                    for (var i = {
                        inMenu: n.closest(".mm-menu") === e.node.menu,
                        inListview: n.matches(".mm-listitem > a"),
                        toExternal: n.matches('[rel="external"]') || n.matches('[target="_blank"]')
                    }, s = {
                        close: null,
                        setSelected: null,
                        preventDefault: "#" == n.getAttribute("href").slice(0, 1)
                    }, c = 0; c < e.clck.length; c++) {
                        var l = e.clck[c].call(e, n, i);
                        if (l) {
                            if ("boolean" == typeof l) return void t.preventDefault();
                            "object" == o(l) && (s = a(l, s));
                        }
                    }
                    i.inMenu && i.inListview && !i.toExternal && (r(n, e.opts.onClick.setSelected, s.setSelected) && e.setSelected(n.parentElement), 
                    r(n, e.opts.onClick.preventDefault, s.preventDefault) && t.preventDefault(), r(n, e.opts.onClick.close, s.close) && e.opts.offCanvas && "function" == typeof e.close && e.close());
                }
            }, !0), this.trigger("initAnchors:after");
        }, e.prototype.i18n = function(e) {
            return function(e, t) {
                return "string" == typeof t && void 0 !== p[t] && p[t][e] || e;
            }(e, this.conf.language);
        }, e.version = "8.5.3", e.options = i, e.configs = s, e.addons = {}, e.wrappers = {}, 
        e.node = {}, e.vars = {}, e;
    }();
    function T(e) {
        return e ? e.charAt(0).toUpperCase() + e.slice(1) : "";
    }
    function C(e, t, n) {
        var i = t.split(".");
        e[t = "mmEvent" + T(i[0]) + T(i[1])] = e[t] || [], e[t].push(n), e.addEventListener(i[0], n);
    }
    function N(e, t) {
        var n = t.split(".");
        t = "mmEvent" + T(n[0]) + T(n[1]), (e[t] || []).forEach(function(t) {
            e.removeEventListener(n[0], t);
        });
    }
    S.options.offCanvas = {
        blockUI: !0,
        moveBackground: !0
    }, S.configs.offCanvas = {
        clone: !1,
        menu: {
            insertMethod: "prepend",
            insertSelector: "body"
        },
        page: {
            nodetype: "div",
            selector: null,
            noSelector: []
        }
    }, S.prototype.open = function() {
        var e = this;
        this.trigger("open:before"), this.vars.opened || (this._openSetup(), setTimeout(function() {
            e._openStart();
        }, this.conf.openingInterval), this.trigger("open:after"));
    }, S.prototype._openSetup = function() {
        var e = this, t = this.opts.offCanvas;
        this.closeAllOthers(), S.node.page.mmStyle = S.node.page.getAttribute("style") || "", 
        function(e, n) {
            var i = "resize.page".split(".");
            (e["mmEvent" + T(i[0]) + T(i[1])] || []).forEach(function(e) {
                e(n);
            });
        }(window, {
            force: !0
        });
        var n = [ "mm-wrapper_opened" ];
        t.blockUI && n.push("mm-wrapper_blocking"), "modal" == t.blockUI && n.push("mm-wrapper_modal"), 
        t.moveBackground && n.push("mm-wrapper_background"), n.forEach(function(t) {
            e.node.wrpr.classList.add(t);
        }), setTimeout(function() {
            e.vars.opened = !0;
        }, this.conf.openingInterval), this.node.menu.classList.add("mm-menu_opened");
    }, S.prototype._openStart = function() {
        var e = this;
        c(S.node.page, function() {
            e.trigger("open:finish");
        }, this.conf.transitionDuration), this.trigger("open:start"), this.node.wrpr.classList.add("mm-wrapper_opening");
    }, S.prototype.close = function() {
        var e = this;
        this.trigger("close:before"), this.vars.opened && (c(S.node.page, function() {
            e.node.menu.classList.remove("mm-menu_opened"), [ "mm-wrapper_opened", "mm-wrapper_blocking", "mm-wrapper_modal", "mm-wrapper_background" ].forEach(function(t) {
                e.node.wrpr.classList.remove(t);
            }), S.node.page.setAttribute("style", S.node.page.mmStyle), e.vars.opened = !1, 
            e.trigger("close:finish");
        }, this.conf.transitionDuration), this.trigger("close:start"), this.node.wrpr.classList.remove("mm-wrapper_opening"), 
        this.trigger("close:after"));
    }, S.prototype.closeAllOthers = function() {
        var e = this;
        g(document.body, ".mm-menu_offcanvas").forEach(function(n) {
            n === e.node.menu || (n = n.mmApi) && n.close && n.close();
        });
    }, S.prototype.setPage = function(e) {
        this.trigger("setPage:before", [ e ]);
        var i, n, t = this.conf.offCanvas;
        e || (n = (n = "string" == typeof t.page.selector ? g(document.body, t.page.selector) : _(document.body, t.page.nodetype)).filter(function(e) {
            return !e.matches(".mm-menu, .mm-wrapper__blocker");
        }), t.page.noSelector.length && (n = n.filter(function(e) {
            return !e.matches(t.page.noSelector.join(", "));
        })), 1 < n.length && (i = b("div"), n[0].before(i), n.forEach(function(e) {
            i.append(e);
        }), n = [ i ]), e = n[0]), e.classList.add("mm-page"), e.classList.add("mm-slideout"), 
        e.id = e.id || l(), S.node.page = e, this.trigger("setPage:after", [ e ]);
    };
    var z;
    u({
        "Close menu": "Menu sluiten",
        "Close submenu": "Submenu sluiten",
        "Open submenu": "Submenu openen",
        "Toggle submenu": "Submenu wisselen"
    }, "nl"), u({
        "Close menu": "بستن منو",
        "Close submenu": "بستن زیرمنو",
        "Open submenu": "بازکردن زیرمنو",
        "Toggle submenu": "سوییچ زیرمنو"
    }, "fa"), u({
        "Close menu": "Menü schließen",
        "Close submenu": "Untermenü schließen",
        "Open submenu": "Untermenü öffnen",
        "Toggle submenu": "Untermenü wechseln"
    }, "de"), u({
        "Close menu": "Закрыть меню",
        "Close submenu": "Закрыть подменю",
        "Open submenu": "Открыть подменю",
        "Toggle submenu": "Переключить подменю"
    }, "ru"), S.options.screenReader = {
        aria: !0,
        text: !0
    }, S.configs.screenReader = {
        text: {
            closeMenu: "Close menu",
            closeSubmenu: "Close submenu",
            openSubmenu: "Open submenu",
            toggleSubmenu: "Toggle submenu"
        }
    }, z = function(e, t, n) {
        (e[t] = n) ? e.setAttribute(t, n.toString()) : e.removeAttribute(t);
    }, S.sr_aria = function(e, t, n) {
        z(e, "aria-" + t, n);
    }, S.sr_role = function(e, t) {
        z(e, "role", t);
    }, S.sr_text = function(e) {
        return '<span class="mm-sronly">' + e + "</span>";
    };
    var U = "ontouchstart" in window || !!navigator.msMaxTouchPoints || !1;
    S.options.scrollBugFix = {
        fix: !0
    };
    S.options.autoHeight = {
        height: "default"
    };
    S.options.backButton = {
        close: !1,
        open: !1
    };
    S.options.columns = {
        add: !1,
        visible: {
            min: 1,
            max: 3
        }
    };
    S.options.counters = {
        add: !1,
        addTo: "panels",
        count: !1
    }, S.configs.classNames.counters = {
        counter: "Counter"
    };
    S.options.dividers = {
        add: !1,
        addTo: "panels"
    }, S.configs.classNames.divider = "Divider";
    function ne(e, t) {
        return "string" == typeof e && "%" == e.slice(-1) && (e = t * ((e = parseInt(e.slice(0, -1), 10)) / 100)), 
        e;
    }
    var G = "ontouchstart" in window || !!navigator.msMaxTouchPoints || !1, K = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }, Q = {
        start: 15,
        swipe: 15
    }, J = {
        x: [ "Right", "Left" ],
        y: [ "Down", "Up" ]
    }, ie = function() {
        function e(e, t, n) {
            this.surface = e, this.area = a(t, K), this.treshold = a(n, Q), this.surface.mmHasDragEvents || (this.surface.addEventListener(G ? "touchstart" : "mousedown", this.start.bind(this)), 
            this.surface.addEventListener(G ? "touchend" : "mouseup", this.stop.bind(this)), 
            this.surface.addEventListener(G ? "touchleave" : "mouseleave", this.stop.bind(this)), 
            this.surface.addEventListener(G ? "touchmove" : "mousemove", this.move.bind(this))), 
            this.surface.mmHasDragEvents = !0;
        }
        return e.prototype.start = function(a) {
            this.currentPosition = {
                x: a.touches ? a.touches[0].pageX : a.pageX || 0,
                y: a.touches ? a.touches[0].pageY : a.pageY || 0
            };
            var o = this.surface.clientWidth, n = this.surface.clientHeight, a = ne(this.area.top, n);
            "number" == typeof a && this.currentPosition.y < a || ("number" == typeof (a = ne(this.area.right, o)) && (a = o - a, 
            this.currentPosition.x > a) || ("number" == typeof (a = ne(this.area.bottom, n)) && (a = n - a, 
            this.currentPosition.y > a) || ("number" == typeof (o = ne(this.area.left, o)) && this.currentPosition.x < o || (this.startPosition = {
                x: this.currentPosition.x,
                y: this.currentPosition.y
            }, this.state = 1))));
        }, e.prototype.stop = function(e) {
            var n, i;
            2 == this.state && (i = this._dragDirection(), n = this._eventDetail(i), this._dispatchEvents("drag*End", n), 
            Math.abs(this.movement[this.axis]) > this.treshold.swipe && (i = this._swipeDirection(), 
            n.direction = i, this._dispatchEvents("swipe*", n))), this.state = 0;
        }, e.prototype.move = function(e) {
            switch (this.state) {
              case 1:
              case 2:
                var i = {
                    x: e.changedTouches ? e.touches[0].pageX : e.pageX || 0,
                    y: e.changedTouches ? e.touches[0].pageY : e.pageY || 0
                };
                this.movement = {
                    x: i.x - this.currentPosition.x,
                    y: i.y - this.currentPosition.y
                }, this.distance = {
                    x: i.x - this.startPosition.x,
                    y: i.y - this.startPosition.y
                }, this.currentPosition = {
                    x: i.x,
                    y: i.y
                }, this.axis = Math.abs(this.distance.x) > Math.abs(this.distance.y) ? "x" : "y";
                i = this._dragDirection(), i = this._eventDetail(i);
                1 == this.state && Math.abs(this.distance[this.axis]) > this.treshold.start && (this._dispatchEvents("drag*Start", i), 
                this.state = 2), 2 == this.state && this._dispatchEvents("drag*Move", i);
            }
        }, e.prototype._eventDetail = function(e) {
            var t = this.distance.x, n = this.distance.y;
            return "x" == this.axis && (t -= 0 < t ? this.treshold.start : 0 - this.treshold.start), 
            "y" == this.axis && (n -= 0 < n ? this.treshold.start : 0 - this.treshold.start), 
            {
                axis: this.axis,
                direction: e,
                movementX: this.movement.x,
                movementY: this.movement.y,
                distanceX: t,
                distanceY: n
            };
        }, e.prototype._dispatchEvents = function(e, s) {
            var i = new CustomEvent(e.replace("*", ""), {
                detail: s
            });
            this.surface.dispatchEvent(i);
            i = new CustomEvent(e.replace("*", this.axis.toUpperCase()), {
                detail: s
            });
            this.surface.dispatchEvent(i);
            s = new CustomEvent(e.replace("*", s.direction), {
                detail: s
            });
            this.surface.dispatchEvent(s);
        }, e.prototype._dragDirection = function() {
            return J[this.axis][0 < this.distance[this.axis] ? 0 : 1];
        }, e.prototype._swipeDirection = function() {
            return J[this.axis][0 < this.movement[this.axis] ? 0 : 1];
        }, e;
    }(), se = null, ae = null, oe = 0, ce = function(e, t, n) {
        switch (e.position = "left", e.zposition = "back", [ "right", "top", "bottom" ].forEach(function(n) {
            -1 < t.indexOf("position-" + n) && (e.position = n);
        }), [ "front", "top", "bottom" ].forEach(function(n) {
            -1 < t.indexOf("position-" + n) && (e.zposition = "front");
        }), se.area = {
            top: "bottom" == e.position ? "75%" : 0,
            right: "left" == e.position ? "75%" : 0,
            bottom: "top" == e.position ? "75%" : 0,
            left: "right" == e.position ? "75%" : 0
        }, e.position) {
          case "top":
          case "bottom":
            e.axis = "y";
            break;

          default:
            e.axis = "x";
        }
        switch (e.position) {
          case "top":
            e.direction = "Down";
            break;

          case "right":
            e.direction = "Left";
            break;

          case "bottom":
            e.direction = "Up";
            break;

          default:
            e.direction = "Right";
        }
        return "front" === e.zposition ? e.slideOutNodes = [ n ] : e.slideOutNodes = g(document.body, ".mm-slideout"), 
        e;
    };
    S.options.drag = {
        open: !1,
        node: null
    };
    S.options.dropdown = {
        drop: !1,
        fitViewport: !0,
        event: "click",
        position: {},
        tip: !0
    }, S.configs.dropdown = {
        offset: {
            button: {
                x: -5,
                y: 5
            },
            viewport: {
                x: 20,
                y: 20
            }
        },
        height: {
            max: 880
        },
        width: {
            max: 440
        }
    };
    S.configs.fixedElements = {
        insertMethod: "append",
        insertSelector: "body"
    }, S.configs.classNames.fixedElements = {
        fixed: "Fixed"
    };
    S.options.iconbar = {
        use: !1,
        top: [],
        bottom: [],
        position: "left",
        type: "default"
    };
    S.options.iconPanels = {
        add: !1,
        blockPanel: !0,
        hideDivider: !1,
        hideNavbar: !0,
        visible: 3
    };
    S.options.keyboardNavigation = {
        enable: !1,
        enhance: !1
    };
    S.options.lazySubmenus = {
        load: !1
    };
    function _e() {
        var n, e = this, t = this.opts.navbars;
        void 0 !== t && (t instanceof Array || (t = [ t ]), n = {}, t.length && (t.forEach(function(t) {
            if (!(t = function(e) {
                return "boolean" == typeof e && e && (e = {}), "object" != typeof e && (e = {}), 
                void 0 === e.content && (e.content = [ "prev", "title" ]), e.content instanceof Array || (e.content = [ e.content ]), 
                void 0 === e.use && (e.use = !0), "boolean" == typeof e.use && e.use && (e.use = !0), 
                e;
            }(t)).use) return !1;
            var i = b("div.mm-navbar"), s = t.position;
            "bottom" !== s && (s = "top"), n[s] || (n[s] = b("div.mm-navbars_" + s)), n[s].append(i);
            for (var a = 0, o = t.content.length; a < o; a++) {
                var r, l, m, c = t.content[a];
                "string" == typeof c ? "function" == typeof (r = _e.navbarContents[c]) ? r.call(e, i) : ((l = b("span")).innerHTML = c, 
                1 == (m = _(l)).length && (l = m[0]), i.append(l)) : i.append(c);
            }
            "string" == typeof t.type && "function" == typeof (r = _e.navbarTypes[t.type]) && r.call(e, i), 
            "boolean" != typeof t.use && P(t.use, function() {
                i.classList.remove("mm-hidden"), S.sr_aria(i, "hidden", !1);
            }, function() {
                i.classList.add("mm-hidden"), S.sr_aria(i, "hidden", !0);
            });
        }), this.bind("initMenu:after", function() {
            for (var t in n) e.node.menu["bottom" == t ? "append" : "prepend"](n[t]);
        })));
    }
    S.options.navbars = [], S.configs.navbars = {
        breadcrumbs: {
            separator: "/",
            removeFirst: !1
        }
    }, S.configs.classNames.navbars = {
        panelPrev: "Prev",
        panelTitle: "Title"
    }, _e.navbarContents = {
        breadcrumbs: function(e) {
            var t = this, n = b("div.mm-navbar__breadcrumbs");
            e.append(n), this.bind("initNavbar:after", function(e) {
                if (!e.querySelector(".mm-navbar__breadcrumbs")) {
                    _(e, ".mm-navbar")[0].classList.add("mm-hidden");
                    for (var r, n = [], i = b("span.mm-navbar__breadcrumbs"), s = e, a = !0; s; ) (s = s.closest(".mm-panel")).parentElement.matches(".mm-listitem_vertical") || (!(r = g(s, ".mm-navbar__title span")[0]) || (r = r.textContent).length && n.unshift(a ? "<span>" + r + "</span>" : '<a href="#' + s.id + '">' + r + "</a>"), 
                    a = !1), s = s.mmParent;
                    t.conf.navbars.breadcrumbs.removeFirst && n.shift(), i.innerHTML = n.join('<span class="mm-separator">' + t.conf.navbars.breadcrumbs.separator + "</span>"), 
                    _(e, ".mm-navbar")[0].append(i);
                }
            }), this.bind("openPanel:start", function(t) {
                t = t.querySelector(".mm-navbar__breadcrumbs");
                n.innerHTML = t ? t.innerHTML : "";
            }), this.bind("initNavbar:after:sr-aria", function(e) {
                g(e, ".mm-breadcrumbs a").forEach(function(e) {
                    S.sr_aria(e, "owns", e.getAttribute("href").slice(1));
                });
            });
        },
        close: function(e) {
            var t = this, n = b("a.mm-btn.mm-btn_close.mm-navbar__btn");
            e.append(n), this.bind("setPage:after", function(e) {
                n.setAttribute("href", "#" + e.id);
            }), this.bind("setPage:after:sr-text", function() {
                n.innerHTML = S.sr_text(t.i18n(t.conf.screenReader.text.closeMenu)), S.sr_aria(n, "owns", n.getAttribute("href").slice(1));
            });
        },
        prev: function(e) {
            var n, i, s = this, a = b("a.mm-btn.mm-btn_prev.mm-navbar__btn");
            e.append(a), this.bind("initNavbar:after", function(e) {
                _(e, ".mm-navbar")[0].classList.add("mm-hidden");
            }), this.bind("openPanel:start", function(e) {
                e.parentElement.matches(".mm-listitem_vertical") || ((i = e.querySelector("." + s.conf.classNames.navbars.panelPrev)) || (i = e.querySelector(".mm-navbar__btn.mm-btn_prev")), 
                n = i ? i.getAttribute("href") : "", i = i ? i.innerHTML : "", n ? a.setAttribute("href", n) : a.removeAttribute("href"), 
                a.classList[n || i ? "remove" : "add"]("mm-hidden"), a.innerHTML = i);
            }), this.bind("initNavbar:after:sr-aria", function(e) {
                S.sr_aria(e.querySelector(".mm-navbar"), "hidden", !0);
            }), this.bind("openPanel:start:sr-aria", function(e) {
                S.sr_aria(a, "hidden", a.matches(".mm-hidden")), S.sr_aria(a, "owns", (a.getAttribute("href") || "").slice(1));
            });
        },
        searchfield: function(e) {
            "object" != o(this.opts.searchfield) && (this.opts.searchfield = {});
            var t = b("div.mm-navbar__searchfield");
            e.append(t), this.opts.searchfield.add = !0, this.opts.searchfield.addTo = [ t ];
        },
        title: function(e) {
            var t, n, s, a = this, o = b("a.mm-navbar__title"), r = b("span");
            o.append(r), e.append(o), this.bind("openPanel:start", function(e) {
                e.parentElement.matches(".mm-listitem_vertical") || ((n = e.querySelector("." + a.conf.classNames.navbars.panelTitle)) || (n = e.querySelector(".mm-navbar__title span")), 
                (t = n && n.closest("a") ? n.closest("a").getAttribute("href") : "") ? o.setAttribute("href", t) : o.removeAttribute("href"), 
                n = n ? n.innerHTML : "", r.innerHTML = n);
            }), this.bind("openPanel:start:sr-aria", function(e) {
                var t;
                a.opts.screenReader.text && (s || _(a.node.menu, ".mm-navbars_top, .mm-navbars_bottom").forEach(function(t) {
                    t = t.querySelector(".mm-btn_prev");
                    t && (s = t);
                }), s && (t = !0, "parent" == a.opts.navbar.titleLink && (t = !s.matches(".mm-hidden")), 
                S.sr_aria(o, "hidden", t)));
            });
        }
    }, _e.navbarTypes = {
        tabs: function(e) {
            var t = this;
            e.classList.add("mm-navbar_tabs"), e.parentElement.classList.add("mm-navbars_has-tabs");
            var n = _(e, "a");
            e.addEventListener("click", function(e) {
                var n = e.target;
                if (n.matches("a")) if (n.matches(".mm-navbar__tab_selected")) e.stopImmediatePropagation(); else try {
                    t.openPanel(t.node.menu.querySelector(n.getAttribute("href")), !1), e.stopImmediatePropagation();
                } catch (e) {}
            }), this.bind("openPanel:start", function e(t) {
                n.forEach(function(e) {
                    e.classList.remove("mm-navbar__tab_selected");
                });
                var s = n.filter(function(e) {
                    return e.matches('[href="#' + t.id + '"]');
                })[0];
                s ? s.classList.add("mm-navbar__tab_selected") : (s = t.mmParent) && e.call(this, s.closest(".mm-panel"));
            });
        }
    };
    S.options.pageScroll = {
        scroll: !1,
        update: !1
    }, S.configs.pageScroll = {
        scrollOffset: 0,
        updateOffset: 50
    };
    u({
        Search: "Zoeken",
        "No results found.": "Geen resultaten gevonden.",
        cancel: "annuleren"
    }, "nl"), u({
        Search: "جستجو",
        "No results found.": "نتیجه‌ای یافت نشد.",
        cancel: "انصراف"
    }, "fa"), u({
        Search: "Suche",
        "No results found.": "Keine Ergebnisse gefunden.",
        cancel: "beenden"
    }, "de"), u({
        Search: "Найти",
        "No results found.": "Ничего не найдено.",
        cancel: "отменить"
    }, "ru"), S.options.searchfield = {
        add: !1,
        addTo: "panels",
        cancel: !1,
        noResults: "No results found.",
        placeholder: "Search",
        panel: {
            add: !1,
            dividers: !0,
            fx: "none",
            id: null,
            splash: null,
            title: "Search"
        },
        search: !0,
        showTextItems: !1,
        showSubPanels: !0
    }, S.configs.searchfield = {
        clear: !1,
        form: !1,
        input: !1,
        submit: !1
    };
    S.prototype.search = function(e, t) {
        var i = this, s = this.opts.searchfield;
        this.conf.searchfield, t = (t = t || "" + e.value).toLowerCase().trim();
        var p, u, n = e.mmSearchfield, o = g(e.closest(".mm-searchfield"), ".mm-btn"), f = _(this.node.pnls, ".mm-panel_search")[0], c = n.panels, l = n.noresults, m = n.listitems, d = n.dividers;
        m.forEach(function(e) {
            e.classList.remove("mm-listitem_nosubitems"), e.classList.remove("mm-listitem_onlysubitems"), 
            e.classList.remove("mm-hidden");
        }), f && (_(f, ".mm-listview")[0].innerHTML = ""), c.forEach(function(e) {
            e.scrollTop = 0;
        }), t.length ? (d.forEach(function(e) {
            e.classList.add("mm-hidden");
        }), m.forEach(function(e) {
            var i = _(e, ".mm-listitem__text")[0], a = !1;
            i && -1 < Array.prototype.slice.call(i.childNodes).filter(function(e) {
                return 3 == e.nodeType;
            }).map(function(e) {
                return e.textContent;
            }).join(" ").toLowerCase().indexOf(t) && (i.matches(".mm-listitem__btn") ? s.showSubPanels && (a = !0) : (i.matches("a") || s.showTextItems) && (a = !0)), 
            a || e.classList.add("mm-hidden");
        }), p = m.filter(function(e) {
            return !e.matches(".mm-hidden");
        }).length, s.panel.add ? (u = [], c.forEach(function(i) {
            var n, t = w(g(i, ".mm-listitem"));
            (t = t.filter(function(e) {
                return !e.matches(".mm-hidden");
            })).length && (s.panel.dividers && (n = b("li.mm-divider"), (i = g(i, ".mm-navbar__title")[0]) && (n.innerHTML = i.innerHTML, 
            u.push(n))), t.forEach(function(e) {
                u.push(e.cloneNode(!0));
            }));
        }), u.forEach(function(e) {
            e.querySelectorAll(".mm-toggle, .mm-check").forEach(function(e) {
                e.remove();
            });
        }), (n = _(f, ".mm-listview")[0]).append.apply(n, u), this.openPanel(f)) : (s.showSubPanels && c.forEach(function(e) {
            w(g(e, ".mm-listitem")).forEach(function(t) {
                t = t.mmChild;
                t && g(t, ".mm-listitem").forEach(function(e) {
                    e.classList.remove("mm-hidden");
                });
            });
        }), c.slice().reverse().forEach(function(t, n) {
            var s = t.mmParent;
            s && (w(g(t, ".mm-listitem")).length ? (s.matches(".mm-hidden") && s.classList.remove("mm-hidden"), 
            s.classList.add("mm-listitem_onlysubitems")) : e.closest(".mm-panel") || ((t.matches(".mm-panel_opened") || t.matches(".mm-panel_opened-parent")) && setTimeout(function() {
                i.openPanel(s.closest(".mm-panel"));
            }, (n + 1) * (1.5 * i.conf.openingInterval)), s.classList.add("mm-listitem_nosubitems")));
        }), c.forEach(function(e) {
            w(g(e, ".mm-listitem")).forEach(function(e) {
                y(e, ".mm-listitem_vertical").forEach(function(e) {
                    e.matches(".mm-hidden") && (e.classList.remove("mm-hidden"), e.classList.add("mm-listitem_onlysubitems"));
                });
            });
        }), c.forEach(function(e) {
            w(g(e, ".mm-listitem")).forEach(function(t) {
                t = function(e, t) {
                    for (var n = [], i = e.previousElementSibling; i; ) i.matches(t) && n.push(i), i = i.previousElementSibling;
                    return n;
                }(t, ".mm-divider")[0];
                t && t.classList.remove("mm-hidden");
            });
        })), o.forEach(function(e) {
            return e.classList.remove("mm-hidden");
        }), l.forEach(function(e) {
            g(e, ".mm-panel__noresultsmsg").forEach(function(e) {
                return e.classList[p ? "add" : "remove"]("mm-hidden");
            });
        }), s.panel.add && (s.panel.splash && g(f, ".mm-panel__content").forEach(function(e) {
            return e.classList.add("mm-hidden");
        }), m.forEach(function(e) {
            return e.classList.remove("mm-hidden");
        }), d.forEach(function(e) {
            return e.classList.remove("mm-hidden");
        }))) : (m.forEach(function(e) {
            return e.classList.remove("mm-hidden");
        }), d.forEach(function(e) {
            return e.classList.remove("mm-hidden");
        }), o.forEach(function(e) {
            return e.classList.add("mm-hidden");
        }), l.forEach(function(e) {
            g(e, ".mm-panel__noresultsmsg").forEach(function(e) {
                return e.classList.add("mm-hidden");
            });
        }), s.panel.add && (s.panel.splash ? g(f, ".mm-panel__content").forEach(function(e) {
            return e.classList.remove("mm-hidden");
        }) : e.closest(".mm-panel_search") || (f = _(this.node.pnls, ".mm-panel_opened-parent"), 
        this.openPanel(f.slice(-1)[0])))), this.trigger("updateListview");
    };
    S.options.sectionIndexer = {
        add: !1,
        addTo: "panels"
    };
    S.options.setSelected = {
        current: !0,
        hover: !1,
        parent: !1
    };
    var je;
    S.options.sidebar = {
        collapsed: {
            use: !1,
            blockMenu: !0,
            hideDivider: !1,
            hideNavbar: !0
        },
        expanded: {
            use: !1,
            initial: "open"
        }
    }, S.configs.classNames.toggles = {
        toggle: "Toggle",
        check: "Check"
    }, 
    /*!
 * mmenu.js
 * mmenujs.com
 *
 * Copyright (c) Fred Heusschen
 * frebsite.nl
 *
 * License: CC-BY-NC-4.0
 * http://creativecommons.org/licenses/by-nc/4.0/
 */
    S.addons = {
        offcanvas: function() {
            var t, n, e = this;
            this.opts.offCanvas && (t = function(e) {
                return "object" != typeof e && (e = {}), e;
            }(this.opts.offCanvas), this.opts.offCanvas = a(t, S.options.offCanvas), n = this.conf.offCanvas, 
            this._api.push("open", "close", "setPage"), this.vars.opened = !1, this.bind("initMenu:before", function() {
                n.clone && (e.node.menu = e.node.menu.cloneNode(!0), e.node.menu.id && (e.node.menu.id = "mm-" + e.node.menu.id), 
                g(e.node.menu, "[id]").forEach(function(e) {
                    e.id = "mm-" + e.id;
                })), e.node.wrpr = document.body, document.querySelector(n.menu.insertSelector)[n.menu.insertMethod](e.node.menu);
            }), this.bind("initMenu:after", function() {
                (function() {
                    var e = this;
                    this.trigger("initBlocker:before");
                    var s, t = this.opts.offCanvas, n = this.conf.offCanvas;
                    t.blockUI && (S.node.blck || ((s = b("div.mm-wrapper__blocker.mm-slideout")).innerHTML = "<a></a>", 
                    document.querySelector(n.menu.insertSelector).append(s), S.node.blck = s), s = function(t) {
                        t.preventDefault(), t.stopPropagation(), e.node.wrpr.matches(".mm-wrapper_modal") || e.close();
                    }, S.node.blck.addEventListener("mousedown", s), S.node.blck.addEventListener("touchstart", s), 
                    S.node.blck.addEventListener("touchmove", s), this.trigger("initBlocker:after"));
                }).call(e), e.setPage(S.node.page), function() {
                    var e = this;
                    N(document.body, "keydown.tabguard"), C(document.body, "keydown.tabguard", function(t) {
                        9 == t.keyCode && e.node.wrpr.matches(".mm-wrapper_opened") && t.preventDefault();
                    });
                }.call(e), e.node.menu.classList.add("mm-menu_offcanvas");
                var n, t = window.location.hash;
                !t || (n = d(e.node.menu.id)) && n == t.slice(1) && setTimeout(function() {
                    e.open();
                }, 1e3);
            }), this.bind("setPage:after", function(e) {
                S.node.blck && _(S.node.blck, "a").forEach(function(t) {
                    t.setAttribute("href", "#" + e.id);
                });
            }), this.bind("open:start:sr-aria", function() {
                S.sr_aria(e.node.menu, "hidden", !1);
            }), this.bind("close:finish:sr-aria", function() {
                S.sr_aria(e.node.menu, "hidden", !0);
            }), this.bind("initMenu:after:sr-aria", function() {
                S.sr_aria(e.node.menu, "hidden", !0);
            }), this.bind("initBlocker:after:sr-text", function() {
                _(S.node.blck, "a").forEach(function(t) {
                    t.innerHTML = S.sr_text(e.i18n(e.conf.screenReader.text.closeMenu));
                });
            }), this.clck.push(function(t, a) {
                var i = d(e.node.menu.id);
                if (i && t.matches('[href="#' + i + '"]')) {
                    if (a.inMenu) return e.open(), !0;
                    var s = t.closest(".mm-menu");
                    if (s) {
                        a = s.mmApi;
                        if (a && a.close) return a.close(), c(s, function() {
                            e.open();
                        }, e.conf.transitionDuration), !0;
                    }
                    return e.open(), !0;
                }
                if ((i = S.node.page.id) && t.matches('[href="#' + i + '"]')) return e.close(), 
                !0;
            }));
        },
        screenReader: function() {
            var e = this, t = function(e) {
                return "boolean" == typeof e && (e = {
                    aria: e,
                    text: e
                }), "object" != typeof e && (e = {}), e;
            }(this.opts.screenReader);
            this.opts.screenReader = a(t, S.options.screenReader);
            var n = this.conf.screenReader;
            t.aria && (this.bind("initAddons:after", function() {
                e.bind("initMenu:after", function() {
                    this.trigger("initMenu:after:sr-aria", [].slice.call(arguments));
                }), e.bind("initNavbar:after", function() {
                    this.trigger("initNavbar:after:sr-aria", [].slice.call(arguments));
                }), e.bind("openPanel:start", function() {
                    this.trigger("openPanel:start:sr-aria", [].slice.call(arguments));
                }), e.bind("close:start", function() {
                    this.trigger("close:start:sr-aria", [].slice.call(arguments));
                }), e.bind("close:finish", function() {
                    this.trigger("close:finish:sr-aria", [].slice.call(arguments));
                }), e.bind("open:start", function() {
                    this.trigger("open:start:sr-aria", [].slice.call(arguments));
                }), e.bind("initOpened:after", function() {
                    this.trigger("initOpened:after:sr-aria", [].slice.call(arguments));
                });
            }), this.bind("updateListview", function() {
                e.node.pnls.querySelectorAll(".mm-listitem").forEach(function(e) {
                    S.sr_aria(e, "hidden", e.matches(".mm-hidden"));
                });
            }), this.bind("openPanel:start", function(t) {
                var n = g(e.node.pnls, ".mm-panel").filter(function(e) {
                    return e !== t;
                }).filter(function(e) {
                    return !e.parentElement.matches(".mm-panel");
                }), i = [ t ];
                g(t, ".mm-listitem_vertical .mm-listitem_opened").forEach(function(e) {
                    i.push.apply(i, _(e, ".mm-panel"));
                }), n.forEach(function(e) {
                    S.sr_aria(e, "hidden", !0);
                }), i.forEach(function(e) {
                    S.sr_aria(e, "hidden", !1);
                });
            }), this.bind("closePanel", function(e) {
                S.sr_aria(e, "hidden", !0);
            }), this.bind("initPanel:after", function(e) {
                g(e, ".mm-btn").forEach(function(e) {
                    S.sr_aria(e, "haspopup", !0);
                    var t = e.getAttribute("href");
                    t && S.sr_aria(e, "owns", t.replace("#", ""));
                });
            }), this.bind("initNavbar:after", function(n) {
                var t = _(n, ".mm-navbar")[0], n = t.matches(".mm-hidden");
                S.sr_aria(t, "hidden", n);
            }), t.text && "parent" == this.opts.navbar.titleLink && this.bind("initNavbar:after", function(n) {
                var t = _(n, ".mm-navbar")[0], n = !!t.querySelector(".mm-btn_prev");
                S.sr_aria(g(t, ".mm-navbar__title")[0], "hidden", n);
            })), t.text && (this.bind("initAddons:after", function() {
                e.bind("setPage:after", function() {
                    this.trigger("setPage:after:sr-text", [].slice.call(arguments));
                }), e.bind("initBlocker:after", function() {
                    this.trigger("initBlocker:after:sr-text", [].slice.call(arguments));
                });
            }), this.bind("initNavbar:after", function(s) {
                s = _(s, ".mm-navbar")[0];
                !s || (s = _(s, ".mm-btn_prev")[0]) && (s.innerHTML = S.sr_text(e.i18n(n.text.closeSubmenu)));
            }), this.bind("initListview:after", function(s) {
                var a = s.closest(".mm-panel").mmParent;
                !a || (s = _(a, ".mm-btn_next")[0]) && (a = e.i18n(n.text[s.parentElement.matches(".mm-listitem_vertical") ? "toggleSubmenu" : "openSubmenu"]), 
                s.innerHTML += S.sr_text(a));
            }));
        },
        scrollBugFix: function() {
            var n, i, s, e = this;
            function o(e) {
                e.preventDefault(), e.stopPropagation();
            }
            U && this.opts.offCanvas && this.opts.offCanvas.blockUI && (n = function(e) {
                return "boolean" == typeof e && (e = {
                    fix: e
                }), "object" != typeof e && (e = {}), e;
            }(this.opts.scrollBugFix), this.opts.scrollBugFix = a(n, S.options.scrollBugFix), 
            n.fix && (n = this.node.menu, i = "", n.addEventListener("touchmove", function(e) {
                i = "", 0 < e.movementY ? i = "down" : e.movementY < 0 && (i = "up");
            }), s = {
                get: function() {
                    return i;
                }
            }, this.node.menu.addEventListener("scroll", o, {
                passive: !1
            }), this.node.menu.addEventListener("touchmove", function(e) {
                var t = e.target.closest(".mm-panel");
                (!t || t.scrollHeight === t.offsetHeight || 0 == t.scrollTop && "down" == s.get() || t.scrollHeight == t.scrollTop + t.offsetHeight && "up" == s.get()) && o(e);
            }, {
                passive: !1
            }), this.bind("open:start", function() {
                var t = _(e.node.pnls, ".mm-panel_opened")[0];
                t && (t.scrollTop = 0);
            }), window.addEventListener("orientationchange", function(t) {
                var n = _(e.node.pnls, ".mm-panel_opened")[0];
                n && (n.scrollTop = 0, n.style["-webkit-overflow-scrolling"] = "auto", n.style["-webkit-overflow-scrolling"] = "touch");
            })));
        },
        autoHeight: function() {
            var n, i, e = this, t = function(e) {
                return "boolean" == typeof e && e && (e = {
                    height: "auto"
                }), "string" == typeof e && (e = {
                    height: e
                }), "object" != typeof e && (e = {}), e;
            }(this.opts.autoHeight);
            this.opts.autoHeight = a(t, S.options.autoHeight), "auto" != t.height && "highest" != t.height || (n = function(e) {
                return e.parentElement.matches(".mm-listitem_vertical") && (e = y(e, ".mm-panel").filter(function(e) {
                    return !e.parentElement.matches(".mm-listitem_vertical");
                })[0]), e;
            }, i = function() {
                var i, s, a, o;
                e.opts.offCanvas && !e.vars.opened || (a = 0, o = e.node.menu.offsetHeight - e.node.pnls.offsetHeight, 
                e.node.menu.classList.add("mm-menu_autoheight-measuring"), "auto" == t.height ? ((s = _(e.node.pnls, ".mm-panel_opened")[0]) && (s = n(s)), 
                a = (s = s || _(e.node.pnls, ".mm-panel")[0]).scrollHeight) : "highest" == t.height && (i = 0, 
                _(e.node.pnls, ".mm-panel").forEach(function(e) {
                    e = n(e), i = Math.max(i, e.scrollHeight);
                }), a = i), e.node.menu.style.height = a + o + "px", e.node.menu.classList.remove("mm-menu_autoheight-measuring"));
            }, this.bind("initMenu:after", function() {
                e.node.menu.classList.add("mm-menu_autoheight");
            }), this.opts.offCanvas && this.bind("open:start", i), "highest" == t.height && this.bind("initPanels:after", i), 
            "auto" == t.height && (this.bind("updateListview", i), this.bind("openPanel:start", i)));
        },
        backButton: function() {
            var t, n, i, s, e = this;
            this.opts.offCanvas && (t = function(e) {
                return "boolean" == typeof e && (e = {
                    close: e
                }), "object" != typeof e && (e = {}), e;
            }(this.opts.backButton), this.opts.backButton = a(t, S.options.backButton), n = "#" + this.node.menu.id, 
            t.close && (i = [], s = function() {
                i = [ n ], _(e.node.pnls, ".mm-panel_opened, .mm-panel_opened-parent").forEach(function(e) {
                    i.push("#" + e.id);
                });
            }, this.bind("open:finish", function() {
                history.pushState(null, document.title, n);
            }), this.bind("open:finish", s), this.bind("openPanel:finish", s), this.bind("close:finish", function() {
                i = [], history.back(), history.pushState(null, document.title, location.pathname + location.search);
            }), window.addEventListener("popstate", function(t) {
                var s;
                e.vars.opened && i.length && ((s = (i = i.slice(0, -1))[i.length - 1]) == n ? e.close() : (e.openPanel(e.node.menu.querySelector(s)), 
                history.pushState(null, document.title, n)));
            })), t.open && window.addEventListener("popstate", function(t) {
                e.vars.opened || location.hash != n || e.open();
            }));
        },
        columns: function() {
            var e = this, t = function(e) {
                return "boolean" == typeof e && (e = {
                    add: e
                }), "number" == typeof e && (e = {
                    add: !0,
                    visible: e
                }), "object" != typeof e && (e = {}), "number" == typeof e.visible && (e.visible = {
                    min: e.visible,
                    max: e.visible
                }), e;
            }(this.opts.columns);
            if (this.opts.columns = a(t, S.options.columns), t.add) {
                t.visible.min = Math.max(1, Math.min(6, t.visible.min)), t.visible.max = Math.max(t.visible.min, Math.min(6, t.visible.max));
                for (var n = [], i = [], s = [ "mm-panel_opened", "mm-panel_opened-parent", "mm-panel_highest" ], o = 0; o <= t.visible.max; o++) n.push("mm-menu_columns-" + o), 
                i.push("mm-panel_columns-" + o);
                s.push.apply(s, i), this.bind("openPanel:before", function(t) {
                    if (t && (i = t.mmParent), i = i && i.closest(".mm-panel")) {
                        var i = i.className;
                        if (i.length && (i = i.split("mm-panel_columns-")[1])) for (var a = parseInt(i.split(" ")[0], 10) + 1; 0 < a; ) {
                            if (!(t = _(e.node.pnls, ".mm-panel_columns-" + a)[0])) {
                                a = -1;
                                break;
                            }
                            a++, t.classList.add("mm-hidden"), s.forEach(function(e) {
                                t.classList.remove(e);
                            });
                        }
                    }
                }), this.bind("openPanel:start", function(s) {
                    var a = _(e.node.pnls, ".mm-panel_opened-parent").length;
                    s.matches(".mm-panel_opened-parent") || a++, a = Math.min(t.visible.max, Math.max(t.visible.min, a)), 
                    n.forEach(function(t) {
                        e.node.menu.classList.remove(t);
                    }), e.node.menu.classList.add("mm-menu_columns-" + a);
                    var o = [];
                    _(e.node.pnls, ".mm-panel").forEach(function(e) {
                        i.forEach(function(t) {
                            e.classList.remove(t);
                        }), e.matches(".mm-panel_opened-parent") && o.push(e);
                    }), o.push(s), o.slice(-t.visible.max).forEach(function(e, t) {
                        e.classList.add("mm-panel_columns-" + t);
                    });
                });
            }
        },
        counters: function() {
            var n, e = this, t = function(e) {
                return "boolean" == typeof e && (e = {
                    add: e,
                    addTo: "panels",
                    count: e
                }), "object" != typeof e && (e = {}), "panels" == e.addTo && (e.addTo = ".mm-listview"), 
                e;
            }(this.opts.counters);
            this.opts.counters = a(t, S.options.counters), this.bind("initListview:after", function(t) {
                var n = e.conf.classNames.counters.counter;
                g(t, "." + n).forEach(function(e) {
                    E(e, n, "mm-counter");
                });
            }), t.add && this.bind("initListview:after", function(i) {
                i.matches(t.addTo) && (!(i = i.closest(".mm-panel").mmParent) || g(i, ".mm-counter").length || (i = _(i, ".mm-btn")[0]) && i.prepend(b("span.mm-counter")));
            }), t.count && (n = function(t) {
                (t ? [ t.closest(".mm-panel") ] : _(e.node.pnls, ".mm-panel")).forEach(function(e) {
                    var i, n = e.mmParent;
                    !n || (n = g(n, ".mm-counter")[0]) && (i = [], _(e, ".mm-listview").forEach(function(e) {
                        i.push.apply(i, _(e));
                    }), n.innerHTML = w(i).length.toString());
                });
            }, this.bind("initListview:after", n), this.bind("updateListview", n));
        },
        dividers: function() {
            var e = this, t = function(e) {
                return "boolean" == typeof e && (e = {
                    add: e
                }), "object" != typeof e && (e = {}), "panels" == e.addTo && (e.addTo = ".mm-listview"), 
                e;
            }(this.opts.dividers);
            this.opts.dividers = a(t, S.options.dividers), this.bind("initListview:after", function(t) {
                _(t).forEach(function(t) {
                    E(t, e.conf.classNames.divider, "mm-divider"), t.matches(".mm-divider") && t.classList.remove("mm-listitem");
                });
            }), t.add && this.bind("initListview:after", function(e) {
                var n;
                e.matches(t.addTo) && (g(e, ".mm-divider").forEach(function(e) {
                    e.remove();
                }), n = "", w(_(e)).forEach(function(t) {
                    var s, i = _(t, ".mm-listitem__text")[0].textContent.trim().toLowerCase()[0];
                    i.length && i != n && (n = i, (s = b("li.mm-divider")).textContent = i, e.insertBefore(s, t));
                }));
            });
        },
        drag: function() {
            var t, e = this;
            this.opts.offCanvas && (t = function(e) {
                return "boolean" == typeof e && (e = {
                    open: e
                }), "object" != typeof e && (e = {}), e;
            }(this.opts.drag), this.opts.drag = a(t, S.options.drag), t.open && this.bind("setPage:after", function(n) {
                (function(e) {
                    var t = this, n = {}, i = !1;
                    ae && (N(ae, "dragStart"), N(ae, "dragMove"), N(ae, "dragEnd")), se = new ie(ae = e), 
                    function() {
                        var e = Object.keys(t.opts.extensions);
                        e.length ? (P(e.join(", "), function() {}, function() {
                            n = ce(n, [], t.node.menu);
                        }), e.forEach(function(e) {
                            P(e, function() {
                                n = ce(n, t.opts.extensions[e], t.node.menu);
                            }, function() {});
                        })) : n = ce(n, [], t.node.menu);
                    }(), ae && (C(ae, "dragStart", function(e) {
                        e.detail.direction == n.direction && (i = !0, t.node.wrpr.classList.add("mm-wrapper_dragging"), 
                        t._openSetup(), t.trigger("open:start"), oe = t.node.menu["x" == n.axis ? "clientWidth" : "clientHeight"]);
                    }), C(ae, "dragMove", function(e) {
                        if (e.detail.axis == n.axis && i) {
                            var t = e.detail["distance" + n.axis.toUpperCase()];
                            switch (n.position) {
                              case "right":
                              case "bottom":
                                t = Math.min(Math.max(t, -oe), 0);
                                break;

                              default:
                                t = Math.max(Math.min(t, oe), 0);
                            }
                            if ("front" == n.zposition) switch (n.position) {
                              case "right":
                              case "bottom":
                                t += oe;
                                break;

                              default:
                                t -= oe;
                            }
                            n.slideOutNodes.forEach(function(e) {
                                e.style.transform = "translate" + n.axis.toUpperCase() + "(" + t + "px)";
                            });
                        }
                    }), C(ae, "dragEnd", function(e) {
                        if (e.detail.axis == n.axis && i) {
                            i = !1, t.node.wrpr.classList.remove("mm-wrapper_dragging"), n.slideOutNodes.forEach(function(e) {
                                e.style.transform = "";
                            });
                            var s = Math.abs(e.detail["distance" + n.axis.toUpperCase()]) >= .75 * oe;
                            if (!s) {
                                var a = e.detail["movement" + n.axis.toUpperCase()];
                                switch (n.position) {
                                  case "right":
                                  case "bottom":
                                    s = a <= 0;
                                    break;

                                  default:
                                    s = 0 <= a;
                                }
                            }
                            s ? t._openStart() : t.close();
                        }
                    }));
                }).call(e, t.node || n);
            }));
        },
        dropdown: function() {
            var t, n, i, s, e = this;
            function o() {
                var e = this;
                if (this.vars.opened) {
                    this.node.menu.setAttribute("style", this.node.menu.mmStyle);
                    var i, n = [ {}, [] ], n = s.call(this, "y", n);
                    for (i in (n = s.call(this, "x", n))[0]) this.node.menu.style[i] = n[0][i];
                    t.tip && ([ "mm-menu_tip-left", "mm-menu_tip-right", "mm-menu_tip-top", "mm-menu_tip-bottom" ].forEach(function(t) {
                        e.node.menu.classList.remove(t);
                    }), n[1].forEach(function(t) {
                        e.node.menu.classList.add(t);
                    }));
                }
            }
            this.opts.offCanvas && (t = function(e) {
                return "boolean" == typeof e && e && (e = {
                    drop: e
                }), "object" != typeof e && (e = {}), "string" == typeof e.position && (e.position = {
                    of: e.position
                }), e;
            }(this.opts.dropdown), this.opts.dropdown = a(t, S.options.dropdown), n = this.conf.dropdown, 
            t.drop && (this.bind("initMenu:after", function() {
                var s;
                e.node.menu.classList.add("mm-menu_dropdown"), "string" != typeof t.position.of && (s = d(e.node.menu.id)) && (t.position.of = '[href="#' + s + '"]'), 
                "string" == typeof t.position.of && (i = g(document.body, t.position.of)[0], 1 == (s = t.event.split(" ")).length && (s[1] = s[0]), 
                "hover" == s[0] && i.addEventListener("mouseenter", function() {
                    e.open();
                }, {
                    passive: !0
                }), "hover" == s[1] && e.node.menu.addEventListener("mouseleave", function() {
                    e.close();
                }, {
                    passive: !0
                }));
            }), this.bind("open:start", function() {
                e.node.menu.mmStyle = e.node.menu.getAttribute("style"), e.node.wrpr.classList.add("mm-wrapper_dropdown");
            }), this.bind("close:finish", function() {
                e.node.menu.setAttribute("style", e.node.menu.mmStyle), e.node.wrpr.classList.remove("mm-wrapper_dropdown");
            }), s = function(e, b) {
                var o, r, c = b[0], l = b[1], _ = "x" == e ? "offsetWidth" : "offsetHeight", d = "x" == e ? "left" : "top", p = "x" == e ? "right" : "bottom", u = "x" == e ? "width" : "height", y = "x" == e ? "innerWidth" : "innerHeight", h = "x" == e ? "maxWidth" : "maxHeight", v = null, b = (g = d, 
                i.getBoundingClientRect()[g] + document.body["left" == g ? "scrollLeft" : "scrollTop"]), g = b + i[_], _ = window[y], y = n.offset.button[e] + n.offset.viewport[e];
                if (t.position[e]) switch (t.position[e]) {
                  case "left":
                  case "bottom":
                    v = "after";
                    break;

                  case "right":
                  case "top":
                    v = "before";
                }
                return null === v && (v = b + (g - b) / 2 < _ / 2 ? "after" : "before"), "after" == v ? (r = _ - ((o = "x" == e ? b : g) + y), 
                c[d] = o + n.offset.button[e] + "px", c[p] = "auto", t.tip && l.push("mm-menu_tip-" + ("x" == e ? "left" : "top"))) : (r = (o = "x" == e ? g : b) - y, 
                c[p] = "calc( 100% - " + (o - n.offset.button[e]) + "px )", c[d] = "auto", t.tip && l.push("mm-menu_tip-" + ("x" == e ? "right" : "bottom"))), 
                t.fitViewport && (c[h] = Math.min(n[u].max, r) + "px"), [ c, l ];
            }, this.bind("open:start", o), window.addEventListener("resize", function(t) {
                o.call(e);
            }, {
                passive: !0
            }), this.opts.offCanvas.blockUI || window.addEventListener("scroll", function(t) {
                o.call(e);
            }, {
                passive: !0
            })));
        },
        fixedElements: function() {
            var t, n, i, e = this;
            this.opts.offCanvas && (i = this.conf.fixedElements, this.bind("setPage:after", function(s) {
                t = e.conf.classNames.fixedElements.fixed, n = g(document, i.insertSelector)[0], 
                g(s, "." + t).forEach(function(e) {
                    E(e, t, "mm-slideout"), n[i.insertMethod](e);
                });
            }));
        },
        iconbar: function() {
            var e, i, s, r, t = this, n = function(e) {
                return "array" == o(e) && (e = {
                    use: !0,
                    top: e
                }), "object" != o(e) && (e = {}), void 0 === e.use && (e.use = !0), "boolean" == typeof e.use && e.use && (e.use = !0), 
                e;
            }(this.opts.iconbar);
            this.opts.iconbar = a(n, S.options.iconbar), n.use && ([ "top", "bottom" ].forEach(function(t, i) {
                var s = n[t];
                "array" != o(s) && (s = [ s ]);
                for (var a = b("div.mm-iconbar__" + t), r = 0, c = s.length; r < c; r++) "string" == typeof s[r] ? a.innerHTML += s[r] : a.append(s[r]);
                a.children.length && (e = e || b("div.mm-iconbar")).append(a);
            }), e) && (this.bind("initMenu:after", function() {
                t.node.menu.prepend(e);
            }), i = "mm-menu_iconbar-" + n.position, s = function() {
                t.node.menu.classList.add(i), S.sr_aria(e, "hidden", !1);
            }, "boolean" == typeof n.use ? this.bind("initMenu:after", s) : P(n.use, s, function() {
                t.node.menu.classList.remove(i), S.sr_aria(e, "hidden", !0);
            }), "tabs" == n.type && (e.classList.add("mm-iconbar_tabs"), e.addEventListener("click", function(e) {
                var n = e.target;
                if (n.matches("a")) if (n.matches(".mm-iconbar__tab_selected")) e.stopImmediatePropagation(); else try {
                    var i = t.node.menu.querySelector(n.getAttribute("href"))[0];
                    i && i.matches(".mm-panel") && (e.preventDefault(), e.stopImmediatePropagation(), 
                    t.openPanel(i, !1));
                } catch (e) {}
            }), r = function(i) {
                g(e, "a").forEach(function(e) {
                    e.classList.remove("mm-iconbar__tab_selected");
                });
                var n = g(e, '[href="#' + i.id + '"]')[0];
                n ? n.classList.add("mm-iconbar__tab_selected") : (i = i.mmParent) && r(i.closest(".mm-panel"));
            }, this.bind("openPanel:start", r)));
        },
        iconPanels: function() {
            var e = this, t = function(e) {
                return "boolean" == typeof e && (e = {
                    add: e
                }), "number" != typeof e && "string" != typeof e || (e = {
                    add: !0,
                    visible: e
                }), "object" != typeof e && (e = {}), e;
            }(this.opts.iconPanels);
            this.opts.iconPanels = a(t, S.options.iconPanels);
            var n = !1;
            if ("first" == t.visible && (n = !0, t.visible = 1), t.visible = Math.min(3, Math.max(1, t.visible)), 
            t.visible++, t.add) {
                this.bind("initMenu:after", function() {
                    var n = [ "mm-menu_iconpanel" ];
                    t.hideNavbar && n.push("mm-menu_hidenavbar"), t.hideDivider && n.push("mm-menu_hidedivider"), 
                    n.forEach(function(t) {
                        e.node.menu.classList.add(t);
                    });
                });
                var i = [];
                if (!n) for (var s = 0; s <= t.visible; s++) i.push("mm-panel_iconpanel-" + s);
                this.bind("openPanel:start", function(s) {
                    var o, a = _(e.node.pnls, ".mm-panel");
                    (s = s || a[0]).parentElement.matches(".mm-listitem_vertical") || (n ? a.forEach(function(e, t) {
                        e.classList[0 == t ? "add" : "remove"]("mm-panel_iconpanel-first");
                    }) : (a.forEach(function(e) {
                        i.forEach(function(t) {
                            e.classList.remove(t);
                        });
                    }), a = a.filter(function(e) {
                        return e.matches(".mm-panel_opened-parent");
                    }), o = !1, a.forEach(function(e) {
                        s === e && (o = !0);
                    }), o || a.push(s), a.forEach(function(e) {
                        e.classList.remove("mm-hidden");
                    }), (a = a.slice(-t.visible)).forEach(function(e, t) {
                        e.classList.add("mm-panel_iconpanel-" + t);
                    })));
                }), this.bind("initPanel:after", function(e) {
                    var n;
                    !t.blockPanel || e.parentElement.matches(".mm-listitem_vertical") || _(e, ".mm-panel__blocker")[0] || ((n = b("a.mm-panel__blocker")).setAttribute("href", "#" + e.closest(".mm-panel").id), 
                    e.prepend(n));
                });
            }
        },
        keyboardNavigation: function() {
            var t, n, i, s, o, r, e = this;
            U || (t = function(e) {
                return "boolean" != typeof e && "string" != typeof e || (e = {
                    enable: e
                }), "object" != typeof e && (e = {}), e;
            }(this.opts.keyboardNavigation), this.opts.keyboardNavigation = a(t, S.options.keyboardNavigation), 
            t.enable && (n = b("button.mm-tabstart.mm-sronly"), i = b("button.mm-tabend.mm-sronly"), 
            s = b("button.mm-tabend.mm-sronly"), this.bind("initMenu:after", function() {
                t.enhance && e.node.menu.classList.add("mm-menu_keyboardfocus"), function(e) {
                    var t = this;
                    N(document.body, "keydown.tabguard"), N(document.body, "focusin.tabguard"), C(document.body, "focusin.tabguard", function(i) {
                        var n;
                        !t.node.wrpr.matches(".mm-wrapper_opened") || (n = i.target).matches(".mm-tabend") && (i = void 0, 
                        n.parentElement.matches(".mm-menu") && S.node.blck && (i = S.node.blck), n.parentElement.matches(".mm-wrapper__blocker") && (i = g(document.body, ".mm-menu_offcanvas.mm-menu_opened")[0]), 
                        (i = i || n.parentElement) && _(i, ".mm-tabstart")[0].focus());
                    }), N(document.body, "keydown.navigate"), C(document.body, "keydown.navigate", function(t) {
                        var n = t.target, i = n.closest(".mm-menu");
                        if (i) {
                            if (i.mmApi, !n.matches("input, textarea")) switch (t.keyCode) {
                              case 13:
                                (n.matches(".mm-toggle") || n.matches(".mm-check")) && n.dispatchEvent(new Event("click"));
                                break;

                              case 32:
                              case 37:
                              case 38:
                              case 39:
                              case 40:
                                t.preventDefault();
                            }
                            if (e) if (n.matches("input")) 27 === t.keyCode && (n.value = ""); else {
                                var s = i.mmApi;
                                switch (t.keyCode) {
                                  case 8:
                                    var a = g(i, ".mm-panel_opened")[0].mmParent;
                                    a && s.openPanel(a.closest(".mm-panel"));
                                    break;

                                  case 27:
                                    i.matches(".mm-menu_offcanvas") && s.close();
                                }
                            }
                        }
                    });
                }.call(e, t.enhance);
            }), this.bind("initOpened:before", function() {
                e.node.menu.prepend(n), e.node.menu.append(i), _(e.node.menu, ".mm-navbars-top, .mm-navbars-bottom").forEach(function(e) {
                    e.querySelectorAll(".mm-navbar__title").forEach(function(e) {
                        e.setAttribute("tabindex", "-1");
                    });
                });
            }), this.bind("initBlocker:after", function() {
                S.node.blck.append(s), _(S.node.blck, "a")[0].classList.add("mm-tabstart");
            }), o = "input, select, textarea, button, label, a[href]", r = function(n) {
                n = n || _(e.node.pnls, ".mm-panel_opened")[0];
                var a, i = null, s = document.activeElement.closest(".mm-navbar");
                s && s.closest(".mm-menu") == e.node.menu || ("default" != t.enable || ((i = g(n, ".mm-listview a[href]:not(.mm-hidden)")[0]) || (i = g(n, o + ":not(.mm-hidden)")[0]), 
                i) || (a = [], _(e.node.menu, ".mm-navbars_top, .mm-navbars_bottom").forEach(function(e) {
                    a.push.apply(a, g(e, o + ":not(.mm-hidden)"));
                }), i = a[0]), (i = i || _(e.node.menu, ".mm-tabstart")[0]) && i.focus());
            }, this.bind("open:finish", r), this.bind("openPanel:finish", r), this.bind("initOpened:after:sr-aria", function() {
                [ e.node.menu, S.node.blck ].forEach(function(e) {
                    _(e, ".mm-tabstart, .mm-tabend").forEach(function(e) {
                        S.sr_aria(e, "hidden", !0), S.sr_role(e, "presentation");
                    });
                });
            })));
        },
        lazySubmenus: function() {
            var e = this, t = function(e) {
                return "boolean" == typeof e && (e = {
                    load: e
                }), "object" != typeof e && (e = {}), e;
            }(this.opts.lazySubmenus);
            this.opts.lazySubmenus = a(t, S.options.lazySubmenus), t.load && (this.bind("initMenu:after", function() {
                var t = [];
                g(e.node.pnls, "li").forEach(function(n) {
                    t.push.apply(t, _(n, e.conf.panelNodetype.join(", ")));
                }), t.filter(function(e) {
                    return !e.matches(".mm-listview_inset");
                }).filter(function(e) {
                    return !e.matches(".mm-nolistview");
                }).filter(function(e) {
                    return !e.matches(".mm-nopanel");
                }).forEach(function(e) {
                    [ "mm-panel_lazysubmenu", "mm-nolistview", "mm-nopanel" ].forEach(function(t) {
                        e.classList.add(t);
                    });
                });
            }), this.bind("initPanels:before", function() {
                _(e.node.pnls, e.conf.panelNodetype.join(", ")).forEach(function(e) {
                    var t = ".mm-panel_lazysubmenu", n = g(e, t);
                    e.matches(t) && n.unshift(e), n.filter(function(e) {
                        return !e.matches(".mm-panel_lazysubmenu .mm-panel_lazysubmenu");
                    }).forEach(function(e) {
                        [ "mm-panel_lazysubmenu", "mm-nolistview", "mm-nopanel" ].forEach(function(t) {
                            e.classList.remove(t);
                        });
                    });
                });
            }), this.bind("initOpened:before", function() {
                var t = [];
                g(e.node.pnls, "." + e.conf.classNames.selected).forEach(function(e) {
                    t.push.apply(t, y(e, ".mm-panel_lazysubmenu"));
                }), t.length && (t.forEach(function(e) {
                    [ "mm-panel_lazysubmenu", "mm-nolistview", "mm-nopanel" ].forEach(function(t) {
                        e.classList.remove(t);
                    });
                }), e.initPanel(t[t.length - 1]));
            }), this.bind("openPanel:before", function(t) {
                var n = ".mm-panel_lazysubmenu", i = g(t, n);
                t.matches(n) && i.unshift(t), (i = i.filter(function(e) {
                    return !e.matches(".mm-panel_lazysubmenu .mm-panel_lazysubmenu");
                })).forEach(function(t) {
                    e.initPanel(t);
                });
            }));
        },
        navbars: _e,
        pageScroll: function() {
            var e = this, t = function(e) {
                return "boolean" == typeof e && (e = {
                    scroll: e
                }), "object" != typeof e && (e = {}), e;
            }(this.opts.pageScroll);
            this.opts.pageScroll = a(t, S.options.pageScroll);
            var n, r, c, i = this.conf.pageScroll;
            function s() {
                n && window.scrollTo({
                    top: n.getBoundingClientRect().top + document.scrollingElement.scrollTop - i.scrollOffset,
                    behavior: "smooth"
                }), n = null;
            }
            function o(e) {
                try {
                    return "#" != e && "#" == e.slice(0, 1) ? S.node.page.querySelector(e) : null;
                } catch (e) {
                    return null;
                }
            }
            t.scroll && this.bind("close:finish", function() {
                s();
            }), this.opts.offCanvas && t.scroll && this.clck.push(function(a, i) {
                if (n = null, i.inMenu) {
                    a = a.getAttribute("href");
                    if (n = o(a)) return e.node.menu.matches(".mm-menu_sidebar-expanded") && e.node.wrpr.matches(".mm-wrapper_sidebar-expanded") ? void s() : {
                        close: !0
                    };
                }
            }), t.update && (r = [], this.bind("initListview:after", function(e) {
                L(_(e, ".mm-listitem")).forEach(function(t) {
                    t = o(t.getAttribute("href"));
                    t && r.unshift(t);
                });
            }), c = -1, window.addEventListener("scroll", function(t) {
                for (var a, n = window.scrollY, s = 0; s < r.length; s++) if (r[s].offsetTop < n + i.updateOffset) {
                    c !== s && (c = s, (a = (a = L(g(_(e.node.pnls, ".mm-panel_opened")[0], ".mm-listitem"))).filter(function(e) {
                        return e.matches('[href="#' + r[s].id + '"]');
                    })).length && e.setSelected(a[0].parentElement));
                    break;
                }
            }));
        },
        searchfield: function() {
            var e = this, t = function(e) {
                return "boolean" == typeof e && (e = {
                    add: e
                }), "object" != typeof e && (e = {}), "boolean" == typeof e.panel && (e.panel = {
                    add: e.panel
                }), "object" != typeof e.panel && (e.panel = {}), "panel" == e.addTo && (e.panel.add = !0), 
                e.panel.add && (e.showSubPanels = !1, e.panel.splash && (e.cancel = !0)), e;
            }(this.opts.searchfield);
            this.opts.searchfield = a(t, S.options.searchfield), this.conf.searchfield, t.add && (this.bind("close:start", function() {
                g(e.node.menu, ".mm-searchfield").forEach(function(e) {
                    e.blur();
                });
            }), this.bind("initPanel:after", function(n) {
                var i = null;
                t.panel.add && (i = function() {
                    var e = this.opts.searchfield, t = (this.conf.searchfield, _(this.node.pnls, ".mm-panel_search")[0]);
                    if (t) return t;
                    t = b("div.mm-panel.mm-panel_search.mm-hidden"), e.panel.id && (t.id = e.panel.id), 
                    e.panel.title && t.setAttribute("data-mm-title", e.panel.title);
                    var i = b("ul");
                    switch (t.append(i), this.node.pnls.append(t), this.initListview(i), this._initNavbar(t), 
                    e.panel.fx) {
                      case !1:
                        break;

                      case "none":
                        t.classList.add("mm-panel_noanimation");
                        break;

                      default:
                        t.classList.add("mm-panel_fx-" + e.panel.fx);
                    }
                    return e.panel.splash && ((i = b("div.mm-panel__content")).innerHTML = e.panel.splash, 
                    t.append(i)), t.classList.add("mm-panel"), t.classList.add("mm-hidden"), this.node.pnls.append(t), 
                    t;
                }.call(e));
                var s = null;
                switch (t.addTo) {
                  case "panels":
                    s = [ n ];
                    break;

                  case "panel":
                    s = [ i ];
                    break;

                  default:
                    "string" == typeof t.addTo ? s = g(e.node.menu, t.addTo) : "array" == o(t.addTo) && (s = t.addTo);
                }
                s.forEach(function(n) {
                    n = function(e) {
                        var t = this.opts.searchfield, n = this.conf.searchfield;
                        if (e.parentElement.matches(".mm-listitem_vertical")) return null;
                        if (a = g(e, ".mm-searchfield")[0]) return a;
                        function i(e, t) {
                            if (t) for (var n in t) e.setAttribute(n, t[n]);
                        }
                        var s, a = b((n.form ? "form" : "div") + ".mm-searchfield"), o = b("div.mm-searchfield__input"), r = b("input");
                        return r.type = "text", r.autocomplete = "off", r.placeholder = this.i18n(t.placeholder), 
                        o.append(r), a.append(o), e.prepend(a), i(r, n.input), n.clear && ((s = b("a.mm-btn.mm-btn_close.mm-searchfield__btn")).setAttribute("href", "#"), 
                        o.append(s)), i(a, n.form), n.form && n.submit && !n.clear && ((s = b("a.mm-btn.mm-btn_next.mm-searchfield__btn")).setAttribute("href", "#"), 
                        o.append(s)), t.cancel && ((s = b("a.mm-searchfield__cancel")).setAttribute("href", "#"), 
                        s.textContent = this.i18n("cancel"), a.append(s)), a;
                    }.call(e, n), t.search && n && function(e) {
                        var t = this, n = this.opts.searchfield, i = (this.conf.searchfield, {});
                        e.closest(".mm-panel_search") ? (i.panels = g(this.node.pnls, ".mm-panel"), i.noresults = [ e.closest(".mm-panel") ]) : e.closest(".mm-panel") ? (i.panels = [ e.closest(".mm-panel") ], 
                        i.noresults = i.panels) : (i.panels = g(this.node.pnls, ".mm-panel"), i.noresults = [ this.node.menu ]), 
                        i.panels = i.panels.filter(function(e) {
                            return !e.matches(".mm-panel_search");
                        }), i.panels = i.panels.filter(function(e) {
                            return !e.parentElement.matches(".mm-listitem_vertical");
                        }), i.listitems = [], i.dividers = [], i.panels.forEach(function(e) {
                            var n;
                            (n = i.listitems).push.apply(n, g(e, ".mm-listitem")), (n = i.dividers).push.apply(n, g(e, ".mm-divider"));
                        });
                        var s = _(this.node.pnls, ".mm-panel_search")[0], a = g(e, "input")[0], o = g(e, ".mm-searchfield__cancel")[0];
                        a.mmSearchfield = i, n.panel.add && n.panel.splash && (N(a, "focus.splash"), C(a, "focus.splash", function(e) {
                            t.openPanel(s);
                        })), n.cancel && (N(a, "focus.cancel"), C(a, "focus.cancel", function(e) {
                            o.classList.add("mm-searchfield__cancel-active");
                        }), N(o, "click.splash"), C(o, "click.splash", function(e) {
                            var n;
                            e.preventDefault(), o.classList.remove("mm-searchfield__cancel-active"), s.matches(".mm-panel_opened") && (n = _(t.node.pnls, ".mm-panel_opened-parent")).length && t.openPanel(n[n.length - 1]);
                        })), n.panel.add && "panel" == n.addTo && this.bind("openPanel:finish", function(e) {
                            e === s && a.focus();
                        }), N(a, "input.search"), C(a, "input.search", function(e) {
                            switch (e.keyCode) {
                              case 9:
                              case 16:
                              case 17:
                              case 18:
                              case 37:
                              case 38:
                              case 39:
                              case 40:
                                break;

                              default:
                                t.search(a);
                            }
                        }), this.search(a);
                    }.call(e, n);
                }), t.noResults && function(e) {
                    var t, n;
                    e && (t = this.opts.searchfield, this.conf.searchfield, e.closest(".mm-panel") || (e = _(this.node.pnls, ".mm-panel")[0]), 
                    _(e, ".mm-panel__noresultsmsg").length || ((n = b("div.mm-panel__noresultsmsg.mm-hidden")).innerHTML = this.i18n(t.noResults), 
                    e.append(n)));
                }.call(e, t.panel.add ? i : n);
            }), this.clck.push(function(t, i) {
                if (i.inMenu && t.matches(".mm-searchfield__btn")) {
                    if (t.matches(".mm-btn_close")) {
                        i = g(s = t.closest(".mm-searchfield"), "input")[0];
                        return i.value = "", e.search(i), !0;
                    }
                    var s;
                    if (t.matches(".mm-btn_next")) return (s = t.closest("form")) && s.submit(), !0;
                }
            }));
        },
        sectionIndexer: function() {
            var e = this, t = function(e) {
                return "boolean" == typeof e && (e = {
                    add: e
                }), "object" != typeof e && (e = {}), e;
            }(this.opts.sectionIndexer);
            this.opts.sectionIndexer = a(t, S.options.sectionIndexer), t.add && this.bind("initPanels:after", function() {
                var t, i;
                e.node.indx || ("abcdefghijklmnopqrstuvwxyz".split(t = "").forEach(function(e) {
                    t += '<a href="#">' + e + "</a>";
                }), (i = b("div.mm-sectionindexer")).innerHTML = t, e.node.pnls.prepend(i), e.node.indx = i, 
                e.node.indx.addEventListener("click", function(e) {
                    e.target.matches("a") && e.preventDefault();
                }), i = function(a) {
                    var n, i, s;
                    a.target.matches("a") && (n = a.target.textContent, i = _(e.node.pnls, ".mm-panel_opened")[0], 
                    s = -1, a = i.scrollTop, i.scrollTop = 0, g(i, ".mm-divider").filter(function(e) {
                        return !e.matches(".mm-hidden");
                    }).forEach(function(e) {
                        s < 0 && n == e.textContent.trim().slice(0, 1).toLowerCase() && (s = e.offsetTop);
                    }), i.scrollTop = -1 < s ? s : a);
                }, U ? (e.node.indx.addEventListener("touchstart", i), e.node.indx.addEventListener("touchmove", i)) : e.node.indx.addEventListener("mouseover", i)), 
                e.bind("openPanel:start", function(n) {
                    n = g(n, ".mm-divider").filter(function(e) {
                        return !e.matches(".mm-hidden");
                    }).length;
                    e.node.indx.classList[n ? "add" : "remove"]("mm-sectionindexer_active");
                });
            });
        },
        setSelected: function() {
            var n, e = this, t = function(e) {
                return "boolean" == typeof e && (e = {
                    hover: e,
                    parent: e
                }), "object" != typeof e && (e = {}), e;
            }(this.opts.setSelected);
            this.opts.setSelected = a(t, S.options.setSelected), "detect" == t.current ? (n = function(s) {
                s = s.split("?")[0].split("#")[0];
                var i = e.node.menu.querySelector('a[href="' + s + '"], a[href="' + s + '/"]');
                i ? e.setSelected(i.parentElement) : (s = s.split("/").slice(0, -1)).length && n(s.join("/"));
            }, this.bind("initMenu:after", function() {
                n.call(e, window.location.href);
            })) : t.current || this.bind("initListview:after", function(e) {
                _(e, ".mm-listitem_selected").forEach(function(e) {
                    e.classList.remove("mm-listitem_selected");
                });
            }), t.hover && this.bind("initMenu:after", function() {
                e.node.menu.classList.add("mm-menu_selected-hover");
            }), t.parent && (this.bind("openPanel:finish", function(t) {
                g(e.node.pnls, ".mm-listitem_selected-parent").forEach(function(e) {
                    e.classList.remove("mm-listitem_selected-parent");
                });
                for (var n = t.mmParent; n; ) n.matches(".mm-listitem_vertical") || n.classList.add("mm-listitem_selected-parent"), 
                n = (n = n.closest(".mm-panel")).mmParent;
            }), this.bind("initMenu:after", function() {
                e.node.menu.classList.add("mm-menu_selected-parent");
            }));
        },
        sidebar: function() {
            var e = this;
            if (this.opts.offCanvas) {
                var n, i, t = function(e) {
                    return ("string" == typeof e || "boolean" == typeof e && e || "number" == typeof e) && (e = {
                        expanded: e
                    }), "object" != typeof e && (e = {}), "boolean" == typeof e.collapsed && e.collapsed && (e.collapsed = {
                        use: !0
                    }), "string" != typeof e.collapsed && "number" != typeof e.collapsed || (e.collapsed = {
                        use: e.collapsed
                    }), "object" != typeof e.collapsed && (e.collapsed = {}), "boolean" == typeof e.expanded && e.expanded && (e.expanded = {
                        use: !0
                    }), "string" != typeof e.expanded && "number" != typeof e.expanded || (e.expanded = {
                        use: e.expanded
                    }), "object" != typeof e.expanded && (e.expanded = {}), e;
                }(this.opts.sidebar);
                if (this.opts.sidebar = a(t, S.options.sidebar), t.collapsed.use && (this.bind("initMenu:after", function() {
                    var n;
                    e.node.menu.classList.add("mm-menu_sidebar-collapsed"), t.collapsed.blockMenu && e.opts.offCanvas && !_(e.node.menu, ".mm-menu__blocker")[0] && ((n = b("a.mm-menu__blocker")).setAttribute("href", "#" + e.node.menu.id), 
                    e.node.menu.prepend(n)), t.collapsed.hideNavbar && e.node.menu.classList.add("mm-menu_hidenavbar"), 
                    t.collapsed.hideDivider && e.node.menu.classList.add("mm-menu_hidedivider");
                }), n = function() {
                    e.node.wrpr.classList.add("mm-wrapper_sidebar-collapsed");
                }, i = function() {
                    e.node.wrpr.classList.remove("mm-wrapper_sidebar-collapsed");
                }, "boolean" == typeof t.collapsed.use ? this.bind("initMenu:after", n) : P(t.collapsed.use, n, i)), 
                t.expanded.use) {
                    this.bind("initMenu:after", function() {
                        e.node.menu.classList.add("mm-menu_sidebar-expanded");
                    }), n = function() {
                        e.node.wrpr.classList.add("mm-wrapper_sidebar-expanded"), e.node.wrpr.matches(".mm-wrapper_sidebar-closed") || e.open();
                    }, i = function() {
                        e.node.wrpr.classList.remove("mm-wrapper_sidebar-expanded"), e.close();
                    }, "boolean" == typeof t.expanded.use ? this.bind("initMenu:after", n) : P(t.expanded.use, n, i), 
                    this.bind("close:start", function() {
                        e.node.wrpr.matches(".mm-wrapper_sidebar-expanded") && (e.node.wrpr.classList.add("mm-wrapper_sidebar-closed"), 
                        "remember" == t.expanded.initial && window.localStorage.setItem("mmenuExpandedState", "closed"));
                    }), this.bind("open:start", function() {
                        e.node.wrpr.matches(".mm-wrapper_sidebar-expanded") && (e.node.wrpr.classList.remove("mm-wrapper_sidebar-closed"), 
                        "remember" == t.expanded.initial && window.localStorage.setItem("mmenuExpandedState", "open"));
                    });
                    var s = t.expanded.initial;
                    if ("remember" == t.expanded.initial) {
                        var o = window.localStorage.getItem("mmenuExpandedState");
                        switch (o) {
                          case "open":
                          case "closed":
                            s = o;
                        }
                    }
                    "closed" == s && this.bind("initMenu:after", function() {
                        e.node.wrpr.classList.add("mm-wrapper_sidebar-closed");
                    }), this.clck.push(function(n, i) {
                        if (i.inMenu && i.inListview && e.node.wrpr.matches(".mm-wrapper_sidebar-expanded")) return {
                            close: "closed" == t.expanded.initial
                        };
                    });
                }
            }
        },
        toggles: function() {
            var e = this;
            this.bind("initPanel:after", function(t) {
                g(t, "input").forEach(function(t) {
                    E(t, e.conf.classNames.toggles.toggle, "mm-toggle"), E(t, e.conf.classNames.toggles.check, "mm-check");
                });
            });
        }
    }, S.wrappers = {
        angular: function() {
            this.opts.onClick = {
                close: !0,
                preventDefault: !1,
                setSelected: !0
            };
        },
        bootstrap: function() {
            var t, n, i, s, e = this;
            function a(e) {
                for (var t = b(e.matches("a") ? "a" : "span"), n = [ "href", "title", "target" ], i = 0; i < n.length; i++) void 0 !== e.getAttribute(n[i]) && t.setAttribute(n[i], e.getAttribute(n[i]));
                return t.innerHTML = e.innerHTML, g(t, ".sr-only").forEach(function(e) {
                    e.remove();
                }), t;
            }
            function o(e) {
                var t = b("ul");
                return _(e).forEach(function(e) {
                    var n = b("li");
                    e.matches(".dropdown-divider") ? n.classList.add("Divider") : e.matches(".dropdown-item") && n.append(a(e)), 
                    t.append(n);
                }), t;
            }
            this.node.menu.matches(".navbar-collapse") && (this.conf.offCanvas && (this.conf.offCanvas.clone = !1), 
            t = b("nav"), n = b("div"), t.append(n), _(this.node.menu).forEach(function(t) {
                switch (!0) {
                  case t.matches(".navbar-nav"):
                    n.append(function(e) {
                        var t = b("ul");
                        return g(e, ".nav-item").forEach(function(e) {
                            var i, n = b("li");
                            e.matches(".active") && n.classList.add("Selected"), e.matches(".nav-link") || ((i = _(e, ".dropdown-menu")[0]) && n.append(o(i)), 
                            e = _(e, ".nav-link")[0]), n.prepend(a(e)), t.append(n);
                        }), t;
                    }(t));
                    break;

                  case t.matches(".dropdown-menu"):
                    n.append(o(t));
                    break;

                  case t.matches(".form-inline"):
                    e.conf.searchfield.form = {
                        action: t.getAttribute("action") || null,
                        method: t.getAttribute("method") || null
                    }, e.conf.searchfield.input = {
                        name: t.querySelector("input").getAttribute("name") || null
                    }, e.conf.searchfield.clear = !1, e.conf.searchfield.submit = !0;
                    break;

                  default:
                    n.append(t.cloneNode(!0));
                }
            }), this.bind("initMenu:before", function() {
                document.body.prepend(t), e.node.menu = t;
            }), !(i = this.node.menu.parentElement) || (s = i.querySelector(".navbar-toggler")) && (s.removeAttribute("data-target"), 
            s.removeAttribute("aria-controls"), s.outerHTML = s.outerHTML, (s = i.querySelector(".navbar-toggler")).addEventListener("click", function(t) {
                t.preventDefault(), t.stopImmediatePropagation(), e[e.vars.opened ? "close" : "open"]();
            })));
        },
        olark: function() {
            this.conf.offCanvas.page.noSelector.push("#olark");
        },
        turbolinks: function() {
            var e;
            document.addEventListener("turbolinks:before-visit", function(t) {
                e = document.querySelector(".mm-wrapper").className.split(" ").filter(function(e) {
                    return /mm-/.test(e);
                });
            }), document.addEventListener("turbolinks:load", function(t) {
                void 0 !== e && (document.querySelector(".mm-wrapper").className = e);
            });
        },
        wordpress: function() {
            this.conf.classNames.selected = "current-menu-item";
            var e = document.getElementById("wpadminbar");
            e && (e.style.position = "fixed", e.classList.add("mm-slideout"));
        }
    }, t.default = S, window && (window.Mmenu = S), (je = window.jQuery || window.Zepto || null) && (je.fn.mmenu = function(e, t) {
        var n = je();
        return this.each(function(i, o) {
            var a;
            o.mmApi || (a = new S(o, e, t), (o = je(a.node.menu)).data("mmenu", a.API), n = n.add(o));
        }), n;
    });
} ]);