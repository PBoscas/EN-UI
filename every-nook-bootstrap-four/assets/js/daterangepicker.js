/**
* @version: 3.1
* @author: Dan Grossman http://www.dangrossman.info/
* @copyright: Copyright (c) 2012-2019 Dan Grossman. All rights reserved.
* @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
* @website: http://www.daterangepicker.com/
*/
// Following the UMD template https://github.com/umdjs/umd/blob/master/templates/returnExportsGlobal.js
!function(root, factory) {
    var jQuery, moment;
    "function" == typeof define && define.amd ? 
    // AMD. Make globaly available as well
    define([ "moment", "jquery" ], function(moment, jquery) {
        return jquery.fn || (jquery.fn = {}), // webpack server rendering
        "function" != typeof moment && moment.hasOwnProperty("default") && (moment = moment.default), 
        factory(moment, jquery);
    }) : "object" == typeof module && module.exports ? ((jQuery = "undefined" != typeof window ? window.jQuery : void 0) || (jQuery = require("jquery")).fn || (jQuery.fn = {}), 
    moment = "undefined" != typeof window && void 0 !== window.moment ? window.moment : require("moment"), 
    module.exports = factory(moment, jQuery)) : 
    // Browser globals
    root.daterangepicker = factory(root.moment, root.jQuery);
}(this, function(moment, $) {
    function DateRangePicker(split, options, cb) {
        //
        // handle all the possible options overriding defaults
        //
        var end, range, val, start;
        // update day names order to firstDay
        if (
        //default settings for options
        this.parentEl = "body", this.element = $(split), this.startDate = moment().startOf("day"), 
        this.endDate = moment().endOf("day"), this.minDate = !1, this.maxDate = !1, this.maxSpan = !1, 
        this.autoApply = !1, this.singleDatePicker = !1, this.showDropdowns = !1, this.minYear = moment().subtract(100, "year").format("YYYY"), 
        this.maxYear = moment().add(100, "year").format("YYYY"), this.showWeekNumbers = !1, 
        this.showISOWeekNumbers = !1, this.showCustomRangeLabel = !0, this.timePicker = !1, 
        this.timePicker24Hour = !1, this.timePickerIncrement = 1, this.timePickerSeconds = !1, 
        this.linkedCalendars = !0, this.autoUpdateInput = !0, this.alwaysShowCalendars = !1, 
        this.ranges = {}, this.opens = "right", this.element.hasClass("pull-right") && (this.opens = "left"), 
        this.drops = "down", this.element.hasClass("dropup") && (this.drops = "up"), this.buttonClasses = "btn btn-sm", 
        this.applyButtonClasses = "btn-primary", this.cancelButtonClasses = "btn-default", 
        this.locale = {
            direction: "ltr",
            format: moment.localeData().longDateFormat("L"),
            separator: " - ",
            applyLabel: "Apply",
            cancelLabel: "Cancel",
            weekLabel: "W",
            customRangeLabel: "Custom Range",
            daysOfWeek: moment.weekdaysMin(),
            monthNames: moment.monthsShort(),
            firstDay: moment.localeData().firstDayOfWeek()
        }, this.callback = function() {}, 
        //some state information
        this.isShowing = !1, this.leftCalendar = {}, this.rightCalendar = {}, 
        //custom options from user
        "object" == typeof options && null !== options || (options = {}), 
        //html template for the picker UI
        "string" == typeof (
        //allow setting options with data attributes
        //data-api options will be overwritten with custom javascript options
        options = $.extend(this.element.data(), options)).template || options.template instanceof $ || (options.template = '<div class="daterangepicker"><div class="ranges"></div><div class="drp-calendar left"><div class="calendar-table"></div><div class="calendar-time"></div></div><div class="drp-calendar right"><div class="calendar-table"></div><div class="calendar-time"></div></div><div class="drp-buttons"><span class="drp-selected"></span><button class="cancelBtn" type="button"></button><button class="applyBtn" disabled="disabled" type="button"></button> </div></div>'), 
        this.parentEl = options.parentEl && $(options.parentEl).length ? $(options.parentEl) : $(this.parentEl), 
        this.container = $(options.template).appendTo(this.parentEl), "object" == typeof options.locale && ("string" == typeof options.locale.direction && (this.locale.direction = options.locale.direction), 
        "string" == typeof options.locale.format && (this.locale.format = options.locale.format), 
        "string" == typeof options.locale.separator && (this.locale.separator = options.locale.separator), 
        "object" == typeof options.locale.daysOfWeek && (this.locale.daysOfWeek = options.locale.daysOfWeek.slice()), 
        "object" == typeof options.locale.monthNames && (this.locale.monthNames = options.locale.monthNames.slice()), 
        "number" == typeof options.locale.firstDay && (this.locale.firstDay = options.locale.firstDay), 
        "string" == typeof options.locale.applyLabel && (this.locale.applyLabel = options.locale.applyLabel), 
        "string" == typeof options.locale.cancelLabel && (this.locale.cancelLabel = options.locale.cancelLabel), 
        "string" == typeof options.locale.weekLabel && (this.locale.weekLabel = options.locale.weekLabel), 
        "string" == typeof options.locale.customRangeLabel && ((elem = document.createElement("textarea")).innerHTML = options.locale.customRangeLabel, 
        rangeHtml = elem.value, this.locale.customRangeLabel = rangeHtml)), this.container.addClass(this.locale.direction), 
        "string" == typeof options.startDate && (this.startDate = moment(options.startDate, this.locale.format)), 
        "string" == typeof options.endDate && (this.endDate = moment(options.endDate, this.locale.format)), 
        "string" == typeof options.minDate && (this.minDate = moment(options.minDate, this.locale.format)), 
        "string" == typeof options.maxDate && (this.maxDate = moment(options.maxDate, this.locale.format)), 
        "object" == typeof options.startDate && (this.startDate = moment(options.startDate)), 
        "object" == typeof options.endDate && (this.endDate = moment(options.endDate)), 
        "object" == typeof options.minDate && (this.minDate = moment(options.minDate)), 
        "object" == typeof options.maxDate && (this.maxDate = moment(options.maxDate)), 
        // sanity check for bad options
        this.minDate && this.startDate.isBefore(this.minDate) && (this.startDate = this.minDate.clone()), 
        // sanity check for bad options
        this.maxDate && this.endDate.isAfter(this.maxDate) && (this.endDate = this.maxDate.clone()), 
        "string" == typeof options.applyButtonClasses && (this.applyButtonClasses = options.applyButtonClasses), 
        "string" == typeof options.applyClass && (//backwards compat
        this.applyButtonClasses = options.applyClass), "string" == typeof options.cancelButtonClasses && (this.cancelButtonClasses = options.cancelButtonClasses), 
        "string" == typeof options.cancelClass && (//backwards compat
        this.cancelButtonClasses = options.cancelClass), "object" == typeof options.maxSpan && (this.maxSpan = options.maxSpan), 
        "object" == typeof options.dateLimit && (//backwards compat
        this.maxSpan = options.dateLimit), "string" == typeof options.opens && (this.opens = options.opens), 
        "string" == typeof options.drops && (this.drops = options.drops), "boolean" == typeof options.showWeekNumbers && (this.showWeekNumbers = options.showWeekNumbers), 
        "boolean" == typeof options.showISOWeekNumbers && (this.showISOWeekNumbers = options.showISOWeekNumbers), 
        "string" == typeof options.buttonClasses && (this.buttonClasses = options.buttonClasses), 
        "object" == typeof options.buttonClasses && (this.buttonClasses = options.buttonClasses.join(" ")), 
        "boolean" == typeof options.showDropdowns && (this.showDropdowns = options.showDropdowns), 
        "number" == typeof options.minYear && (this.minYear = options.minYear), "number" == typeof options.maxYear && (this.maxYear = options.maxYear), 
        "boolean" == typeof options.showCustomRangeLabel && (this.showCustomRangeLabel = options.showCustomRangeLabel), 
        "boolean" == typeof options.singleDatePicker && (this.singleDatePicker = options.singleDatePicker, 
        this.singleDatePicker && (this.endDate = this.startDate.clone())), "boolean" == typeof options.timePicker && (this.timePicker = options.timePicker), 
        "boolean" == typeof options.timePickerSeconds && (this.timePickerSeconds = options.timePickerSeconds), 
        "number" == typeof options.timePickerIncrement && (this.timePickerIncrement = options.timePickerIncrement), 
        "boolean" == typeof options.timePicker24Hour && (this.timePicker24Hour = options.timePicker24Hour), 
        "boolean" == typeof options.autoApply && (this.autoApply = options.autoApply), "boolean" == typeof options.autoUpdateInput && (this.autoUpdateInput = options.autoUpdateInput), 
        "boolean" == typeof options.linkedCalendars && (this.linkedCalendars = options.linkedCalendars), 
        "function" == typeof options.isInvalidDate && (this.isInvalidDate = options.isInvalidDate), 
        "function" == typeof options.isCustomDate && (this.isCustomDate = options.isCustomDate), 
        "boolean" == typeof options.alwaysShowCalendars && (this.alwaysShowCalendars = options.alwaysShowCalendars), 
        0 != this.locale.firstDay) for (var iterator = this.locale.firstDay; 0 < iterator; ) this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift()), 
        iterator--;
        if (
        //if no start/end dates set, check if an input element contains initial values
        void 0 === options.startDate && void 0 === options.endDate && $(this.element).is(":text") && (start = end = null, 
        2 == (split = (val = $(this.element).val()).split(this.locale.separator)).length ? (start = moment(split[0], this.locale.format), 
        end = moment(split[1], this.locale.format)) : this.singleDatePicker && "" !== val && (start = moment(val, this.locale.format), 
        end = moment(val, this.locale.format)), null !== start && null !== end && (this.setStartDate(start), 
        this.setEndDate(end))), "object" == typeof options.ranges) {
            for (range in options.ranges) {
                start = "string" == typeof options.ranges[range][0] ? moment(options.ranges[range][0], this.locale.format) : moment(options.ranges[range][0]), 
                end = "string" == typeof options.ranges[range][1] ? moment(options.ranges[range][1], this.locale.format) : moment(options.ranges[range][1]), 
                // If the start or end date exceed those allowed by the minDate or maxSpan
                // options, shorten the range to the allowable period.
                this.minDate && start.isBefore(this.minDate) && (start = this.minDate.clone());
                var elem, rangeHtml, maxDate = this.maxDate;
                this.maxSpan && maxDate && start.clone().add(this.maxSpan).isAfter(maxDate) && (maxDate = start.clone().add(this.maxSpan)), 
                maxDate && end.isAfter(maxDate) && (end = maxDate.clone()), 
                // If the end of the range is before the minimum or the start of the range is
                // after the maximum, don't display this range option at all.
                this.minDate && end.isBefore(this.minDate, this.timepicker ? "minute" : "day") || maxDate && start.isAfter(maxDate, this.timepicker ? "minute" : "day") || ((elem = document.createElement("textarea")).innerHTML = range, 
                rangeHtml = elem.value, this.ranges[rangeHtml] = [ start, end ]);
            }
            var list = "<ul>";
            for (range in this.ranges) list += '<li data-range-key="' + range + '">' + range + "</li>";
            this.showCustomRangeLabel && (list += '<li data-range-key="' + this.locale.customRangeLabel + '">' + this.locale.customRangeLabel + "</li>"), 
            list += "</ul>", this.container.find(".ranges").prepend(list);
        }
        "function" == typeof cb && (this.callback = cb), this.timePicker || (this.startDate = this.startDate.startOf("day"), 
        this.endDate = this.endDate.endOf("day"), this.container.find(".calendar-time").hide()), 
        //can't be used together for now
        this.timePicker && this.autoApply && (this.autoApply = !1), this.autoApply && this.container.addClass("auto-apply"), 
        "object" == typeof options.ranges && this.container.addClass("show-ranges"), this.singleDatePicker && (this.container.addClass("single"), 
        this.container.find(".drp-calendar.left").addClass("single"), this.container.find(".drp-calendar.left").show(), 
        this.container.find(".drp-calendar.right").hide(), !this.timePicker && this.autoApply && this.container.addClass("auto-apply")), 
        (void 0 === options.ranges && !this.singleDatePicker || this.alwaysShowCalendars) && this.container.addClass("show-calendar"), 
        this.container.addClass("opens" + this.opens), 
        //apply CSS classes and labels to buttons
        this.container.find(".applyBtn, .cancelBtn").addClass(this.buttonClasses), this.applyButtonClasses.length && this.container.find(".applyBtn").addClass(this.applyButtonClasses), 
        this.cancelButtonClasses.length && this.container.find(".cancelBtn").addClass(this.cancelButtonClasses), 
        this.container.find(".applyBtn").html(this.locale.applyLabel), this.container.find(".cancelBtn").html(this.locale.cancelLabel), 
        //
        // event listeners
        //
        this.container.find(".drp-calendar").on("click.daterangepicker", ".prev", $.proxy(this.clickPrev, this)).on("click.daterangepicker", ".next", $.proxy(this.clickNext, this)).on("mousedown.daterangepicker", "td.available", $.proxy(this.clickDate, this)).on("mouseenter.daterangepicker", "td.available", $.proxy(this.hoverDate, this)).on("change.daterangepicker", "select.yearselect", $.proxy(this.monthOrYearChanged, this)).on("change.daterangepicker", "select.monthselect", $.proxy(this.monthOrYearChanged, this)).on("change.daterangepicker", "select.hourselect,select.minuteselect,select.secondselect,select.ampmselect", $.proxy(this.timeChanged, this)), 
        this.container.find(".ranges").on("click.daterangepicker", "li", $.proxy(this.clickRange, this)), 
        this.container.find(".drp-buttons").on("click.daterangepicker", "button.applyBtn", $.proxy(this.clickApply, this)).on("click.daterangepicker", "button.cancelBtn", $.proxy(this.clickCancel, this)), 
        this.element.is("input") || this.element.is("button") ? this.element.on({
            "click.daterangepicker": $.proxy(this.show, this),
            "focus.daterangepicker": $.proxy(this.show, this),
            "keyup.daterangepicker": $.proxy(this.elementChanged, this),
            "keydown.daterangepicker": $.proxy(this.keydown, this)
        }) : (this.element.on("click.daterangepicker", $.proxy(this.toggle, this)), this.element.on("keydown.daterangepicker", $.proxy(this.toggle, this))), 
        //
        // if attached to a text input, set the initial value
        //
        this.updateElement();
    }
    return DateRangePicker.prototype = {
        constructor: DateRangePicker,
        setStartDate: function(startDate) {
            "string" == typeof startDate && (this.startDate = moment(startDate, this.locale.format)), 
            "object" == typeof startDate && (this.startDate = moment(startDate)), this.timePicker || (this.startDate = this.startDate.startOf("day")), 
            this.timePicker && this.timePickerIncrement && this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement), 
            this.minDate && this.startDate.isBefore(this.minDate) && (this.startDate = this.minDate.clone(), 
            this.timePicker && this.timePickerIncrement && this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement)), 
            this.maxDate && this.startDate.isAfter(this.maxDate) && (this.startDate = this.maxDate.clone(), 
            this.timePicker && this.timePickerIncrement && this.startDate.minute(Math.floor(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement)), 
            this.isShowing || this.updateElement(), this.updateMonthsInView();
        },
        setEndDate: function(endDate) {
            "string" == typeof endDate && (this.endDate = moment(endDate, this.locale.format)), 
            "object" == typeof endDate && (this.endDate = moment(endDate)), this.timePicker || (this.endDate = this.endDate.endOf("day")), 
            this.timePicker && this.timePickerIncrement && this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement), 
            this.endDate.isBefore(this.startDate) && (this.endDate = this.startDate.clone()), 
            this.maxDate && this.endDate.isAfter(this.maxDate) && (this.endDate = this.maxDate.clone()), 
            this.maxSpan && this.startDate.clone().add(this.maxSpan).isBefore(this.endDate) && (this.endDate = this.startDate.clone().add(this.maxSpan)), 
            this.previousRightTime = this.endDate.clone(), this.container.find(".drp-selected").html(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format)), 
            this.isShowing || this.updateElement(), this.updateMonthsInView();
        },
        isInvalidDate: function() {
            return !1;
        },
        isCustomDate: function() {
            return !1;
        },
        updateView: function() {
            this.timePicker && (this.renderTimePicker("left"), this.renderTimePicker("right"), 
            this.endDate ? this.container.find(".right .calendar-time select").prop("disabled", !1).removeClass("disabled") : this.container.find(".right .calendar-time select").prop("disabled", !0).addClass("disabled")), 
            this.endDate && this.container.find(".drp-selected").html(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format)), 
            this.updateMonthsInView(), this.updateCalendars(), this.updateFormInputs();
        },
        updateMonthsInView: function() {
            if (this.endDate) {
                //if both dates are visible already, do nothing
                if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month && (this.startDate.format("YYYY-MM") == this.leftCalendar.month.format("YYYY-MM") || this.startDate.format("YYYY-MM") == this.rightCalendar.month.format("YYYY-MM")) && (this.endDate.format("YYYY-MM") == this.leftCalendar.month.format("YYYY-MM") || this.endDate.format("YYYY-MM") == this.rightCalendar.month.format("YYYY-MM"))) return;
                this.leftCalendar.month = this.startDate.clone().date(2), this.linkedCalendars || this.endDate.month() == this.startDate.month() && this.endDate.year() == this.startDate.year() ? this.rightCalendar.month = this.startDate.clone().date(2).add(1, "month") : this.rightCalendar.month = this.endDate.clone().date(2);
            } else this.leftCalendar.month.format("YYYY-MM") != this.startDate.format("YYYY-MM") && this.rightCalendar.month.format("YYYY-MM") != this.startDate.format("YYYY-MM") && (this.leftCalendar.month = this.startDate.clone().date(2), 
            this.rightCalendar.month = this.startDate.clone().date(2).add(1, "month"));
            this.maxDate && this.linkedCalendars && !this.singleDatePicker && this.rightCalendar.month > this.maxDate && (this.rightCalendar.month = this.maxDate.clone().date(2), 
            this.leftCalendar.month = this.maxDate.clone().date(2).subtract(1, "month"));
        },
        updateCalendars: function() {
            var second, hour, minute, ampm;
            this.timePicker && (this.endDate ? (hour = parseInt(this.container.find(".left .hourselect").val(), 10), 
            minute = parseInt(this.container.find(".left .minuteselect").val(), 10), isNaN(minute) && (minute = parseInt(this.container.find(".left .minuteselect option:last").val(), 10)), 
            second = this.timePickerSeconds ? parseInt(this.container.find(".left .secondselect").val(), 10) : 0, 
            this.timePicker24Hour || ("PM" === (ampm = this.container.find(".left .ampmselect").val()) && hour < 12 && (hour += 12), 
            "AM" === ampm && 12 === hour && (hour = 0))) : (hour = parseInt(this.container.find(".right .hourselect").val(), 10), 
            minute = parseInt(this.container.find(".right .minuteselect").val(), 10), isNaN(minute) && (minute = parseInt(this.container.find(".right .minuteselect option:last").val(), 10)), 
            second = this.timePickerSeconds ? parseInt(this.container.find(".right .secondselect").val(), 10) : 0, 
            this.timePicker24Hour || ("PM" === (ampm = this.container.find(".right .ampmselect").val()) && hour < 12 && (hour += 12), 
            "AM" === ampm && 12 === hour && (hour = 0))), this.leftCalendar.month.hour(hour).minute(minute).second(second), 
            this.rightCalendar.month.hour(hour).minute(minute).second(second)), this.renderCalendar("left"), 
            this.renderCalendar("right"), 
            //highlight any predefined range matching the current start and end dates
            this.container.find(".ranges li").removeClass("active"), null != this.endDate && this.calculateChosenLabel();
        },
        renderCalendar: function(side) {
            //
            // Build the matrix of dates that will populate the calendar
            //
            var calendar = "left" == side ? this.leftCalendar : this.rightCalendar, daysInLastMonth = calendar.month.month(), lastYear = calendar.month.year(), hour = calendar.month.hour(), minute = calendar.month.minute(), second = calendar.month.second(), dayOfWeek = moment([ lastYear, daysInLastMonth ]).daysInMonth(), firstDay = moment([ lastYear, daysInLastMonth, 1 ]), minYear = moment([ lastYear, daysInLastMonth, dayOfWeek ]), maxLimit = moment(firstDay).subtract(1, "month").month(), lastYear = moment(firstDay).subtract(1, "month").year(), daysInLastMonth = moment([ lastYear, maxLimit ]).daysInMonth(), dayOfWeek = firstDay.day();
            (calendar = []).firstDay = firstDay, calendar.lastDay = minYear;
            for (var i = 0; i < 6; i++) calendar[i] = [];
            //populate the calendar with date objects
                        minYear = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
            daysInLastMonth < minYear && (minYear -= 7), dayOfWeek == this.locale.firstDay && (minYear = daysInLastMonth - 6);
            for (var curDate = moment([ lastYear, maxLimit, minYear, 12, minute, second ]), i = 0, col = 0, row = 0; i < 42; i++, 
            col++, curDate = moment(curDate).add(24, "hour")) 0 < i && col % 7 == 0 && (col = 0, 
            row++), calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second), 
            curDate.hour(12), this.minDate && calendar[row][col].format("YYYY-MM-DD") == this.minDate.format("YYYY-MM-DD") && calendar[row][col].isBefore(this.minDate) && "left" == side && (calendar[row][col] = this.minDate.clone()), 
            this.maxDate && calendar[row][col].format("YYYY-MM-DD") == this.maxDate.format("YYYY-MM-DD") && calendar[row][col].isAfter(this.maxDate) && "right" == side && (calendar[row][col] = this.maxDate.clone());
            //make the calendar object available to hoverDate/clickDate
                        "left" == side ? this.leftCalendar.calendar = calendar : this.rightCalendar.calendar = calendar;
            //
            // Display the calendar
            //
                        var minDate = "left" == side ? this.minDate : this.startDate, maxDate = this.maxDate, html = ("left" == side ? this.startDate : this.endDate, 
            this.locale.direction, '<table class="table-condensed">');
            html += "<thead>", html += "<tr>", 
            // add empty cell for week number
            (this.showWeekNumbers || this.showISOWeekNumbers) && (html += "<th></th>"), minDate && !minDate.isBefore(calendar.firstDay) || this.linkedCalendars && "left" != side ? html += "<th></th>" : html += '<th class="prev available"><span></span></th>';
            maxLimit = this.locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(" YYYY");
            if (this.showDropdowns) {
                for (var currentMonth = calendar[1][1].month(), currentYear = calendar[1][1].year(), maxYear = maxDate && maxDate.year() || this.maxYear, minYear = minDate && minDate.year() || this.minYear, inMinYear = currentYear == minYear, inMaxYear = currentYear == maxYear, monthHtml = '<select class="monthselect">', m = 0; m < 12; m++) (!inMinYear || minDate && m >= minDate.month()) && (!inMaxYear || maxDate && m <= maxDate.month()) ? monthHtml += "<option value='" + m + "'" + (m === currentMonth ? " selected='selected'" : "") + ">" + this.locale.monthNames[m] + "</option>" : monthHtml += "<option value='" + m + "'" + (m === currentMonth ? " selected='selected'" : "") + " disabled='disabled'>" + this.locale.monthNames[m] + "</option>";
                monthHtml += "</select>";
                for (var yearHtml = '<select class="yearselect">', y = minYear; y <= maxYear; y++) yearHtml += '<option value="' + y + '"' + (y === currentYear ? ' selected="selected"' : "") + ">" + y + "</option>";
                maxLimit = monthHtml + (yearHtml += "</select>");
            }
            html += '<th colspan="5" class="month">' + maxLimit + "</th>", maxDate && !maxDate.isAfter(calendar.lastDay) || this.linkedCalendars && "right" != side && !this.singleDatePicker ? html += "<th></th>" : html += '<th class="next available"><span></span></th>', 
            html += "</tr>", html += "<tr>", 
            // add week number label
            (this.showWeekNumbers || this.showISOWeekNumbers) && (html += '<th class="week">' + this.locale.weekLabel + "</th>"), 
            $.each(this.locale.daysOfWeek, function(index, dayOfWeek) {
                html += "<th>" + dayOfWeek + "</th>";
            }), html += "</tr>", html += "</thead>", html += "<tbody>", 
            //adjust maxDate to reflect the maxSpan setting in order to
            //grey out end dates beyond the maxSpan
            null == this.endDate && this.maxSpan && (maxLimit = this.startDate.clone().add(this.maxSpan).endOf("day"), 
            maxDate && !maxLimit.isBefore(maxDate) || (maxDate = maxLimit));
            for (row = 0; row < 6; row++) {
                html += "<tr>", 
                // add week number
                this.showWeekNumbers ? html += '<td class="week">' + calendar[row][0].week() + "</td>" : this.showISOWeekNumbers && (html += '<td class="week">' + calendar[row][0].isoWeek() + "</td>");
                for (col = 0; col < 7; col++) {
                    var classes = [];
                    //highlight today's date
                                        calendar[row][col].isSame(new Date(), "day") && classes.push("today"), 
                    //highlight weekends
                    5 < calendar[row][col].isoWeekday() && classes.push("weekend"), 
                    //grey out the dates in other months displayed at beginning and end of this calendar
                    calendar[row][col].month() != calendar[1][1].month() && classes.push("off", "ends"), 
                    //don't allow selection of dates before the minimum date
                    this.minDate && calendar[row][col].isBefore(this.minDate, "day") && classes.push("off", "disabled"), 
                    //don't allow selection of dates after the maximum date
                    maxDate && calendar[row][col].isAfter(maxDate, "day") && classes.push("off", "disabled"), 
                    //don't allow selection of date if a custom function decides it's invalid
                    this.isInvalidDate(calendar[row][col]) && classes.push("off", "disabled"), 
                    //highlight the currently selected start date
                    calendar[row][col].format("YYYY-MM-DD") == this.startDate.format("YYYY-MM-DD") && classes.push("active", "start-date"), 
                    //highlight the currently selected end date
                    null != this.endDate && calendar[row][col].format("YYYY-MM-DD") == this.endDate.format("YYYY-MM-DD") && classes.push("active", "end-date"), 
                    //highlight dates in-between the selected dates
                    null != this.endDate && calendar[row][col] > this.startDate && calendar[row][col] < this.endDate && classes.push("in-range");
                    //apply custom classes for this date
                    var isCustom = this.isCustomDate(calendar[row][col]);
                    !1 !== isCustom && ("string" == typeof isCustom ? classes.push(isCustom) : Array.prototype.push.apply(classes, isCustom));
                    for (var cname = "", disabled = !1, i = 0; i < classes.length; i++) cname += classes[i] + " ", 
                    "disabled" == classes[i] && (disabled = !0);
                    disabled || (cname += "available"), html += '<td class="' + cname.replace(/^\s+|\s+$/g, "") + '" data-title="r' + row + "c" + col + '">' + calendar[row][col].date() + "</td>";
                }
                html += "</tr>";
            }
            html += "</tbody>", html += "</table>", this.container.find(".drp-calendar." + side + " .calendar-table").html(html);
        },
        renderTimePicker: function(side) {
            // Don't bother updating the time picker if it's currently disabled
            // because an end date hasn't been clicked yet
            if ("right" != side || this.endDate) {
                var html, selected, minDate, maxDate = this.maxDate;
                !this.maxSpan || this.maxDate && !this.startDate.clone().add(this.maxSpan).isBefore(this.maxDate) || (maxDate = this.startDate.clone().add(this.maxSpan)), 
                "left" == side ? (selected = this.startDate.clone(), minDate = this.minDate) : "right" == side && (selected = this.endDate.clone(), 
                minDate = this.startDate, "" != (pm_html = this.container.find(".drp-calendar.right .calendar-time")).html() && (selected.hour(isNaN(selected.hour()) ? pm_html.find(".hourselect option:selected").val() : selected.hour()), 
                selected.minute(isNaN(selected.minute()) ? pm_html.find(".minuteselect option:selected").val() : selected.minute()), 
                selected.second(isNaN(selected.second()) ? pm_html.find(".secondselect option:selected").val() : selected.second()), 
                this.timePicker24Hour || ("PM" === (am_html = pm_html.find(".ampmselect option:selected").val()) && selected.hour() < 12 && selected.hour(selected.hour() + 12), 
                "AM" === am_html && 12 === selected.hour() && selected.hour(0))), selected.isBefore(this.startDate) && (selected = this.startDate.clone()), 
                maxDate && selected.isAfter(maxDate) && (selected = maxDate.clone())), 
                //
                // hours
                //
                html = '<select class="hourselect">';
                for (var pm_html = this.timePicker24Hour ? 0 : 1, end = this.timePicker24Hour ? 23 : 12, i = pm_html; i <= end; i++) {
                    var i_in_24 = i;
                    this.timePicker24Hour || (i_in_24 = 12 <= selected.hour() ? 12 == i ? 12 : i + 12 : 12 == i ? 0 : i);
                    var time = selected.clone().hour(i_in_24), disabled = !1;
                    minDate && time.minute(59).isBefore(minDate) && (disabled = !0), maxDate && time.minute(0).isAfter(maxDate) && (disabled = !0), 
                    i_in_24 != selected.hour() || disabled ? html += disabled ? '<option value="' + i + '" disabled="disabled" class="disabled">' + i + "</option>" : '<option value="' + i + '">' + i + "</option>" : html += '<option value="' + i + '" selected="selected">' + i + "</option>";
                }
                html += "</select> ", 
                //
                // minutes
                //
                html += ': <select class="minuteselect">';
                for (var am_html, i = 0; i < 60; i += this.timePickerIncrement) {
                    var padded = i < 10 ? "0" + i : i, time = selected.clone().minute(i), disabled = !1;
                    minDate && time.second(59).isBefore(minDate) && (disabled = !0), maxDate && time.second(0).isAfter(maxDate) && (disabled = !0), 
                    selected.minute() != i || disabled ? html += disabled ? '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + "</option>" : '<option value="' + i + '">' + padded + "</option>" : html += '<option value="' + i + '" selected="selected">' + padded + "</option>";
                }
                //
                // seconds
                //
                if (html += "</select> ", this.timePickerSeconds) {
                    html += ': <select class="secondselect">';
                    for (i = 0; i < 60; i++) {
                        padded = i < 10 ? "0" + i : i, time = selected.clone().second(i), disabled = !1;
                        minDate && time.isBefore(minDate) && (disabled = !0), maxDate && time.isAfter(maxDate) && (disabled = !0), 
                        selected.second() != i || disabled ? html += disabled ? '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + "</option>" : '<option value="' + i + '">' + padded + "</option>" : html += '<option value="' + i + '" selected="selected">' + padded + "</option>";
                    }
                    html += "</select> ";
                }
                //
                // AM/PM
                //
                                this.timePicker24Hour || (html += '<select class="ampmselect">', 
                pm_html = am_html = "", minDate && selected.clone().hour(12).minute(0).second(0).isBefore(minDate) && (am_html = ' disabled="disabled" class="disabled"'), 
                maxDate && selected.clone().hour(0).minute(0).second(0).isAfter(maxDate) && (pm_html = ' disabled="disabled" class="disabled"'), 
                12 <= selected.hour() ? html += '<option value="AM"' + am_html + '>AM</option><option value="PM" selected="selected"' + pm_html + ">PM</option>" : html += '<option value="AM" selected="selected"' + am_html + '>AM</option><option value="PM"' + pm_html + ">PM</option>", 
                html += "</select>"), this.container.find(".drp-calendar." + side + " .calendar-time").html(html);
            }
        },
        updateFormInputs: function() {
            this.singleDatePicker || this.endDate && (this.startDate.isBefore(this.endDate) || this.startDate.isSame(this.endDate)) ? this.container.find("button.applyBtn").prop("disabled", !1) : this.container.find("button.applyBtn").prop("disabled", !0);
        },
        move: function() {
            var containerTop, parentOffset = {
                top: 0,
                left: 0
            }, drops = this.drops, containerRight = $(window).width();
            switch (this.parentEl.is("body") || (parentOffset = {
                top: this.parentEl.offset().top - this.parentEl.scrollTop(),
                left: this.parentEl.offset().left - this.parentEl.scrollLeft()
            }, containerRight = this.parentEl[0].clientWidth + this.parentEl.offset().left), 
            drops) {
              case "auto":
                (containerTop = this.element.offset().top + this.element.outerHeight() - parentOffset.top) + this.container.outerHeight() >= this.parentEl[0].scrollHeight && (containerTop = this.element.offset().top - this.container.outerHeight() - parentOffset.top, 
                drops = "up");
                break;

              case "up":
                containerTop = this.element.offset().top - this.container.outerHeight() - parentOffset.top;
                break;

              default:
                containerTop = this.element.offset().top + this.element.outerHeight() - parentOffset.top;
            }
            // Force the container to it's actual width
                        this.container.css({
                top: 0,
                left: 0,
                right: "auto"
            });
            var containerLeft, containerWidth = this.container.outerWidth();
            this.container.toggleClass("drop-up", "up" == drops), "left" == this.opens ? containerWidth + (containerRight = containerRight - this.element.offset().left - this.element.outerWidth()) > $(window).width() ? this.container.css({
                top: containerTop,
                right: "auto",
                left: 9
            }) : this.container.css({
                top: containerTop,
                right: containerRight,
                left: "auto"
            }) : "center" == this.opens ? (containerLeft = this.element.offset().left - parentOffset.left + this.element.outerWidth() / 2 - containerWidth / 2) < 0 ? this.container.css({
                top: containerTop,
                right: "auto",
                left: 9
            }) : containerLeft + containerWidth > $(window).width() ? this.container.css({
                top: containerTop,
                left: "auto",
                right: 0
            }) : this.container.css({
                top: containerTop,
                left: containerLeft,
                right: "auto"
            }) : (containerLeft = this.element.offset().left - parentOffset.left) + containerWidth > $(window).width() ? this.container.css({
                top: containerTop,
                left: "auto",
                right: 0
            }) : this.container.css({
                top: containerTop,
                left: containerLeft,
                right: "auto"
            });
        },
        show: function(e) {
            this.isShowing || (
            // Create a click proxy that is private to this instance of datepicker, for unbinding
            this._outsideClickProxy = $.proxy(function(e) {
                this.outsideClick(e);
            }, this), 
            // Bind global datepicker mousedown for hiding and
            $(document).on("mousedown.daterangepicker", this._outsideClickProxy).on("touchend.daterangepicker", this._outsideClickProxy).on("click.daterangepicker", "[data-toggle=dropdown]", this._outsideClickProxy).on("focusin.daterangepicker", this._outsideClickProxy), 
            // Reposition the picker if the window is resized while it's open
            $(window).on("resize.daterangepicker", $.proxy(function(e) {
                this.move(e);
            }, this)), this.oldStartDate = this.startDate.clone(), this.oldEndDate = this.endDate.clone(), 
            this.previousRightTime = this.endDate.clone(), this.updateView(), this.container.show(), 
            this.move(), this.element.trigger("show.daterangepicker", this), this.isShowing = !0);
        },
        hide: function(e) {
            this.isShowing && (
            //incomplete date selection, revert to last values
            this.endDate || (this.startDate = this.oldStartDate.clone(), this.endDate = this.oldEndDate.clone()), 
            //if a new date range was selected, invoke the user callback function
            this.startDate.isSame(this.oldStartDate) && this.endDate.isSame(this.oldEndDate) || this.callback(this.startDate.clone(), this.endDate.clone(), this.chosenLabel), 
            //if picker is attached to a text input, update it
            this.updateElement(), $(document).off(".daterangepicker"), $(window).off(".daterangepicker"), 
            this.container.hide(), this.element.trigger("hide.daterangepicker", this), this.isShowing = !1);
        },
        toggle: function(e) {
            this.isShowing ? this.hide() : this.show();
        },
        outsideClick: function(e) {
            var target = $(e.target);
            // if the page is clicked anywhere except within the daterangerpicker/button
            // itself then call this.hide()
                        // ie modal dialog fix
            "focusin" == e.type || target.closest(this.element).length || target.closest(this.container).length || target.closest(".calendar-table").length || (this.hide(), 
            this.element.trigger("outsideClick.daterangepicker", this));
        },
        showCalendars: function() {
            this.container.addClass("show-calendar"), this.move(), this.element.trigger("showCalendar.daterangepicker", this);
        },
        hideCalendars: function() {
            this.container.removeClass("show-calendar"), this.element.trigger("hideCalendar.daterangepicker", this);
        },
        clickRange: function(dates) {
            dates = dates.target.getAttribute("data-range-key");
            (this.chosenLabel = dates) == this.locale.customRangeLabel ? this.showCalendars() : (dates = this.ranges[dates], 
            this.startDate = dates[0], this.endDate = dates[1], this.timePicker || (this.startDate.startOf("day"), 
            this.endDate.endOf("day")), this.alwaysShowCalendars || this.hideCalendars(), this.clickApply());
        },
        clickPrev: function(e) {
            $(e.target).parents(".drp-calendar").hasClass("left") ? (this.leftCalendar.month.subtract(1, "month"), 
            this.linkedCalendars && this.rightCalendar.month.subtract(1, "month")) : this.rightCalendar.month.subtract(1, "month"), 
            this.updateCalendars();
        },
        clickNext: function(e) {
            $(e.target).parents(".drp-calendar").hasClass("left") ? this.leftCalendar.month.add(1, "month") : (this.rightCalendar.month.add(1, "month"), 
            this.linkedCalendars && this.leftCalendar.month.add(1, "month")), this.updateCalendars();
        },
        hoverDate: function(e) {
            //ignore dates that can't be selected
            var row, col, date, leftCalendar, rightCalendar, startDate;
            $(e.target).hasClass("available") && (row = (col = $(e.target).attr("data-title")).substr(1, 1), 
            col = col.substr(3, 1), date = ($(e.target).parents(".drp-calendar").hasClass("left") ? this.leftCalendar : this.rightCalendar).calendar[row][col], 
            leftCalendar = this.leftCalendar, rightCalendar = this.rightCalendar, startDate = this.startDate, 
            this.endDate || this.container.find(".drp-calendar tbody td").each(function(index, el) {
                //skip week numbers, only look at dates
                var row, dt;
                $(el).hasClass("week") || (row = (dt = $(el).attr("data-title")).substr(1, 1), dt = dt.substr(3, 1), 
                (dt = ($(el).parents(".drp-calendar").hasClass("left") ? leftCalendar : rightCalendar).calendar[row][dt]).isAfter(startDate) && dt.isBefore(date) || dt.isSame(date, "day") ? $(el).addClass("in-range") : $(el).removeClass("in-range"));
            }));
        },
        clickDate: function(e) {
            var row, date, hour, ampm, minute, second;
            $(e.target).hasClass("available") && (row = (date = $(e.target).attr("data-title")).substr(1, 1), 
            date = date.substr(3, 1), date = ($(e.target).parents(".drp-calendar").hasClass("left") ? this.leftCalendar : this.rightCalendar).calendar[row][date], 
            //
            // this function needs to do a few things:
            // * alternate between selecting a start and end date for the range,
            // * if the time picker is enabled, apply the hour/minute/second from the select boxes to the clicked date
            // * if autoapply is enabled, and an end date was chosen, apply the selection
            // * if single date picker mode, and time picker isn't enabled, apply the selection immediately
            // * if one of the inputs above the calendars was focused, cancel that manual input
            //
            this.endDate || date.isBefore(this.startDate, "day") ? (//picking start
            this.timePicker && (hour = parseInt(this.container.find(".left .hourselect").val(), 10), 
            this.timePicker24Hour || ("PM" === (ampm = this.container.find(".left .ampmselect").val()) && hour < 12 && (hour += 12), 
            "AM" === ampm && 12 === hour && (hour = 0)), minute = parseInt(this.container.find(".left .minuteselect").val(), 10), 
            isNaN(minute) && (minute = parseInt(this.container.find(".left .minuteselect option:last").val(), 10)), 
            second = this.timePickerSeconds ? parseInt(this.container.find(".left .secondselect").val(), 10) : 0, 
            date = date.clone().hour(hour).minute(minute).second(second)), this.endDate = null, 
            this.setStartDate(date.clone())) : !this.endDate && date.isBefore(this.startDate) ? 
            //special case: clicking the same date for start/end,
            //but the time of the end date is before the start date
            this.setEndDate(this.startDate.clone()) : (// picking end
            this.timePicker && (hour = parseInt(this.container.find(".right .hourselect").val(), 10), 
            this.timePicker24Hour || ("PM" === (ampm = this.container.find(".right .ampmselect").val()) && hour < 12 && (hour += 12), 
            "AM" === ampm && 12 === hour && (hour = 0)), minute = parseInt(this.container.find(".right .minuteselect").val(), 10), 
            isNaN(minute) && (minute = parseInt(this.container.find(".right .minuteselect option:last").val(), 10)), 
            second = this.timePickerSeconds ? parseInt(this.container.find(".right .secondselect").val(), 10) : 0, 
            date = date.clone().hour(hour).minute(minute).second(second)), this.setEndDate(date.clone()), 
            this.autoApply && (this.calculateChosenLabel(), this.clickApply())), this.singleDatePicker && (this.setEndDate(this.startDate), 
            !this.timePicker && this.autoApply && this.clickApply()), this.updateView(), 
            //This is to cancel the blur event handler if the mouse was in one of the inputs
            e.stopPropagation());
        },
        calculateChosenLabel: function() {
            var range, customRange = !0, i = 0;
            for (range in this.ranges) {
                if (this.timePicker) {
                    var format = this.timePickerSeconds ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD HH:mm";
                    //ignore times when comparing dates if time picker seconds is not enabled
                                        if (this.startDate.format(format) == this.ranges[range][0].format(format) && this.endDate.format(format) == this.ranges[range][1].format(format)) {
                        customRange = !1, this.chosenLabel = this.container.find(".ranges li:eq(" + i + ")").addClass("active").attr("data-range-key");
                        break;
                    }
                } else 
                //ignore times when comparing dates if time picker is not enabled
                if (this.startDate.format("YYYY-MM-DD") == this.ranges[range][0].format("YYYY-MM-DD") && this.endDate.format("YYYY-MM-DD") == this.ranges[range][1].format("YYYY-MM-DD")) {
                    customRange = !1, this.chosenLabel = this.container.find(".ranges li:eq(" + i + ")").addClass("active").attr("data-range-key");
                    break;
                }
                i++;
            }
            customRange && (this.showCustomRangeLabel ? this.chosenLabel = this.container.find(".ranges li:last").addClass("active").attr("data-range-key") : this.chosenLabel = null, 
            this.showCalendars());
        },
        clickApply: function(e) {
            this.hide(), this.element.trigger("apply.daterangepicker", this);
        },
        clickCancel: function(e) {
            this.startDate = this.oldStartDate, this.endDate = this.oldEndDate, this.hide(), 
            this.element.trigger("cancel.daterangepicker", this);
        },
        monthOrYearChanged: function(year) {
            var isLeft = $(year.target).closest(".drp-calendar").hasClass("left"), month = isLeft ? "left" : "right", year = this.container.find(".drp-calendar." + month), month = parseInt(year.find(".monthselect").val(), 10), year = year.find(".yearselect").val();
            // Month must be Number for new moment versions
                        isLeft || (year < this.startDate.year() || year == this.startDate.year() && month < this.startDate.month()) && (month = this.startDate.month(), 
            year = this.startDate.year()), this.minDate && (year < this.minDate.year() || year == this.minDate.year() && month < this.minDate.month()) && (month = this.minDate.month(), 
            year = this.minDate.year()), this.maxDate && (year > this.maxDate.year() || year == this.maxDate.year() && month > this.maxDate.month()) && (month = this.maxDate.month(), 
            year = this.maxDate.year()), isLeft ? (this.leftCalendar.month.month(month).year(year), 
            this.linkedCalendars && (this.rightCalendar.month = this.leftCalendar.month.clone().add(1, "month"))) : (this.rightCalendar.month.month(month).year(year), 
            this.linkedCalendars && (this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, "month"))), 
            this.updateCalendars();
        },
        timeChanged: function(second) {
            var ampm = $(second.target).closest(".drp-calendar"), isLeft = ampm.hasClass("left"), hour = parseInt(ampm.find(".hourselect").val(), 10), minute = parseInt(ampm.find(".minuteselect").val(), 10);
            isNaN(minute) && (minute = parseInt(ampm.find(".minuteselect option:last").val(), 10));
            var end, second = this.timePickerSeconds ? parseInt(ampm.find(".secondselect").val(), 10) : 0;
            this.timePicker24Hour || ("PM" === (ampm = ampm.find(".ampmselect").val()) && hour < 12 && (hour += 12), 
            "AM" === ampm && 12 === hour && (hour = 0)), isLeft ? ((end = this.startDate.clone()).hour(hour), 
            end.minute(minute), end.second(second), this.setStartDate(end), this.singleDatePicker ? this.endDate = this.startDate.clone() : this.endDate && this.endDate.format("YYYY-MM-DD") == end.format("YYYY-MM-DD") && this.endDate.isBefore(end) && this.setEndDate(end.clone())) : this.endDate && ((end = this.endDate.clone()).hour(hour), 
            end.minute(minute), end.second(second), this.setEndDate(end)), 
            //update the calendars so all clickable dates reflect the new time component
            this.updateCalendars(), 
            //update the form inputs above the calendars with the new time
            this.updateFormInputs(), 
            //re-render the time pickers because changing one selection can affect what's enabled in another
            this.renderTimePicker("left"), this.renderTimePicker("right");
        },
        elementChanged: function() {
            var dateString, start, end;
            this.element.is("input") && this.element.val().length && (end = start = null, 2 === (dateString = this.element.val().split(this.locale.separator)).length && (start = moment(dateString[0], this.locale.format), 
            end = moment(dateString[1], this.locale.format)), !this.singleDatePicker && null !== start && null !== end || (end = start = moment(this.element.val(), this.locale.format)), 
            start.isValid() && end.isValid() && (this.setStartDate(start), this.setEndDate(end), 
            this.updateView()));
        },
        keydown: function(e) {
            //hide on tab or enter
            9 !== e.keyCode && 13 !== e.keyCode || this.hide(), 
            //hide on esc and prevent propagation
            27 === e.keyCode && (e.preventDefault(), e.stopPropagation(), this.hide());
        },
        updateElement: function() {
            var newValue;
            this.element.is("input") && this.autoUpdateInput && (newValue = this.startDate.format(this.locale.format), 
            this.singleDatePicker || (newValue += this.locale.separator + this.endDate.format(this.locale.format)), 
            newValue !== this.element.val() && this.element.val(newValue).trigger("change"));
        },
        remove: function() {
            this.container.remove(), this.element.off(".daterangepicker"), this.element.removeData();
        }
    }, $.fn.daterangepicker = function(options, callback) {
        var implementOptions = $.extend(!0, {}, $.fn.daterangepicker.defaultOptions, options);
        return this.each(function() {
            var el = $(this);
            el.data("daterangepicker") && el.data("daterangepicker").remove(), el.data("daterangepicker", new DateRangePicker(el, implementOptions, callback));
        }), this;
    }, DateRangePicker;
});