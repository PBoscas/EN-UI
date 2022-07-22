/*!
 * JavaScript Custom Forms : Radio Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.2.3
 */
!function(jcf) {
    jcf.addModule(function($) {
        "use strict";
        return {
            name: "Radio",
            selector: 'input[type="radio"]',
            options: {
                wrapNative: !0,
                checkedClass: "jcf-checked",
                uncheckedClass: "jcf-unchecked",
                labelActiveClass: "jcf-label-active",
                fakeStructure: '<span class="jcf-radio"><span></span></span>'
            },
            matchElement: function(element) {
                return element.is(":radio");
            },
            init: function() {
                this.initStructure(), this.attachEvents(), this.refresh();
            },
            initStructure: function() {
                // prepare structure
                this.doc = $(document), this.realElement = $(this.options.element), this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement), 
                this.labelElement = this.getLabelFor(), this.options.wrapNative ? 
                // wrap native radio inside fake block
                this.realElement.prependTo(this.fakeElement).css({
                    position: "absolute",
                    opacity: 0
                }) : 
                // just hide native radio
                this.realElement.addClass(this.options.hiddenClass);
            },
            attachEvents: function() {
                // add event handlers
                this.realElement.on({
                    focus: this.onFocus,
                    click: this.onRealClick
                }), this.fakeElement.on("click", this.onFakeClick), this.fakeElement.on("jcf-pointerdown", this.onPress);
            },
            onRealClick: function(e) {
                // redraw current radio and its group (setTimeout handles click that might be prevented)
                var self = this;
                this.savedEventObject = e, setTimeout(function() {
                    self.refreshRadioGroup();
                }, 0);
            },
            onFakeClick: function(e) {
                // skip event if clicked on real element inside wrapper
                this.options.wrapNative && this.realElement.is(e.target) || this.realElement.is(":disabled") || (delete this.savedEventObject, 
                this.currentActiveRadio = this.getCurrentActiveRadio(), this.stateChecked = this.realElement.prop("checked"), 
                this.realElement.prop("checked", !0), this.fireNativeEvent(this.realElement, "click"), 
                this.savedEventObject && this.savedEventObject.isDefaultPrevented() ? (this.realElement.prop("checked", this.stateChecked), 
                this.currentActiveRadio.prop("checked", !0)) : this.fireNativeEvent(this.realElement, "change"), 
                delete this.savedEventObject);
                // toggle checked class
                        },
            onFocus: function() {
                this.pressedFlag && this.focusedFlag || (this.focusedFlag = !0, this.fakeElement.addClass(this.options.focusClass), 
                this.realElement.on("blur", this.onBlur));
            },
            onBlur: function() {
                this.pressedFlag || (this.focusedFlag = !1, this.fakeElement.removeClass(this.options.focusClass), 
                this.realElement.off("blur", this.onBlur));
            },
            onPress: function(e) {
                this.focusedFlag || "mouse" !== e.pointerType || this.realElement.focus(), this.pressedFlag = !0, 
                this.fakeElement.addClass(this.options.pressedClass), this.doc.on("jcf-pointerup", this.onRelease);
            },
            onRelease: function(e) {
                this.focusedFlag && "mouse" === e.pointerType && this.realElement.focus(), this.pressedFlag = !1, 
                this.fakeElement.removeClass(this.options.pressedClass), this.doc.off("jcf-pointerup", this.onRelease);
            },
            getCurrentActiveRadio: function() {
                return this.getRadioGroup(this.realElement).filter(":checked");
            },
            getRadioGroup: function(radio) {
                // find radio group for specified radio button
                var name = radio.attr("name"), parentForm = radio.parents("form");
                return name ? parentForm.length ? parentForm.find('input[name="' + name + '"]') : $('input[name="' + name + '"]:not(form input)') : radio;
            },
            getLabelFor: function() {
                var parentLabel = this.realElement.closest("label"), elementId = this.realElement.prop("id");
                return !parentLabel.length && elementId && (parentLabel = $('label[for="' + elementId + '"]')), 
                parentLabel.length ? parentLabel : null;
            },
            refreshRadioGroup: function() {
                // redraw current radio and its group
                this.getRadioGroup(this.realElement).each(function() {
                    jcf.refresh(this);
                });
            },
            refresh: function() {
                // redraw current radio button
                var isChecked = this.realElement.is(":checked"), isDisabled = this.realElement.is(":disabled");
                this.fakeElement.toggleClass(this.options.checkedClass, isChecked).toggleClass(this.options.uncheckedClass, !isChecked).toggleClass(this.options.disabledClass, isDisabled), 
                this.labelElement && this.labelElement.toggleClass(this.options.labelActiveClass, isChecked);
            },
            destroy: function() {
                // restore structure
                this.options.wrapNative ? this.realElement.insertBefore(this.fakeElement).css({
                    position: "",
                    width: "",
                    height: "",
                    opacity: "",
                    margin: ""
                }) : this.realElement.removeClass(this.options.hiddenClass), 
                // removing element will also remove its event handlers
                this.fakeElement.off("jcf-pointerdown", this.onPress), this.fakeElement.remove(), 
                // remove other event handlers
                this.doc.off("jcf-pointerup", this.onRelease), this.realElement.off({
                    blur: this.onBlur,
                    focus: this.onFocus,
                    click: this.onRealClick
                });
            }
        };
    });
}(jcf);