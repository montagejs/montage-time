/**
 * @module ui/month-view.reel
 */
var Component = require("montage/ui/component").Component;

var MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

var DAYS_OF_WEEK = [
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thurs",
    "Fri",
    "Sat"
];

/**
 * @class MonthView
 * @extends Component
 */
exports.MonthView = Component.specialize(/** @lends MonthView# */ {

    _firstDayOfWeek: {
        value: null
    },

    firstDayOfWeek: {
        get: function() {
            return this._firstDayOfWeek;
        },
        set: function(firstDayOfWeek) {
            if (this._firstDayOfWeek !== firstDayOfWeek) {
                this._firstDayOfWeek = firstDayOfWeek;
                if (firstDayOfWeek) {
                    this._updateCalendar();
                }
            }
        }
    },

    _months: {
        get: function() {
            return MONTHS;
        }
    },

    daysOfTheWeek: {
        get: function() {
            return DAYS_OF_WEEK;
        }
    },

    enterDocument: {
        value: function() {
            this.gotoToday();
        }  
    },

    gotoPrevious: {
        value: function() {
            this._currentPeriod.setMonth(this._currentPeriod.getMonth()-1);
            this._updateCalendar();
        }
    },

    gotoToday: {
        value: function() {
            var currentPeriod = new Date();
            currentPeriod.setDate(1);
            this._currentPeriod = currentPeriod;
            this._updateCalendar();
        }
    },

    gotoNext: {
        value: function() {
            this._currentPeriod.setMonth(this._currentPeriod.getMonth()+1);
            this._updateCalendar();
        }
    },

    willDraw: {
        value: function () {
            this._updateCalendar();
        }
    },

    _daysInMonth: {
        value: function (year, month) {
            return new Date(year, month + 1, 0).getDate();
        }
    },

    _updateCalendar: {
        value: function () {
            var month = this._currentPeriod.getMonth(),
                year = this._currentPeriod.getFullYear(),
                daysInMonth = this._daysInMonth(year, month),
                weeks = [],
                dayDate,
                today = new Date(),
                day,
                week,
                i, j;

            var daysOfTheWeek = this.firstDayOfWeek ? [].concat(this.daysOfTheWeek.slice(this.firstDayOfWeek), this.daysOfTheWeek.slice(0, this.firstDayOfWeek)) : this.daysOfTheWeek;
            this.daysOfTheWeekContentForRepetition = daysOfTheWeek.map(function (day) {
                return day.substring(0, 1);
            });
            i = ((this.firstDayOfWeek || 0) + 7 - new Date(year, month, 1).getDay()) % 7;
            if (i) {
                i -= 7;
            }
            while (i < daysInMonth) {
                week = [];
                for (j = 1; j <= 7; j++) {
                    dayDate = new Date(year, month, i + j);
                    day = {
                        year: dayDate.getFullYear(),
                        month: dayDate.getMonth(),
                        date: dayDate.getDate(),
                        day: dayDate.getDay(),
                        isCurrentMonth: dayDate.getMonth() === month,
                        isToday:
                            (dayDate.getDate() === today.getDate()) &&
                            (dayDate.getFullYear() === today.getFullYear()) &&
                            (dayDate.getMonth() === today.getMonth()),
                        rawDate: dayDate
                    }
                    week.push(day);
                    if (day.isToday) {
                        this.selectedDay = day;
                    }
                }
                weeks.push(week);
                i += 7;
            }
            this.displayedPeriodLabel = this._months[month] + " " + year;
            this.weeks = weeks;
        }
    }
});
