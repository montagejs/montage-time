var Component = require("montage/ui/component").Component;

exports.CalendarWidgetDay = Component.specialize({

    _data: {
        value: null
    },

    data: {
        get: function() {
            return this._data;
        },
        set: function(data) {
            if (this._data !== data) {
                this._data = data;
            }
        }
    },

    _setMaxDisplayedLines: {
        value: function () {
            if (document.documentElement.clientHeight > 920) {
                this._maxDisplayedLines = 3;
            } else {
                this._maxDisplayedLines = 2;
            }
        }
    },

    enterDocument: {
        value: function(isFirstTime) {
            this.super();
            if (isFirstTime) {
                this.element.addEventListener("click", this.handleClick.bind(this));
                window.addEventListener("resize", this, false);
            }
            this._setMaxDisplayedLines();
        }
    },

    exitDocument: {
        value: function() {
            window.removeEventListener("resize", this, false);
        }
    },

    handleResize: {
        value: function() {
            this._setMaxDisplayedLines();
        }
    },

    shouldAcceptComponent: {
        value: function() {
            return this.data.isCurrentMonth;
        }
    },

    handleClick: {
        value: function () {
            if (this.data.isCurrentMonth) {
                this.selectedDay = this.data;
            }
        }
    }
});
