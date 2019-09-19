'use strict';

/**
 * The base class for widgets
 *
 * @memberof HashBrown.Client.Entity.View.Widget
 */
class WidgetBase extends HashBrown.Entity.View.ViewBase {
    /**
     * Event: Value changed
     *
     * @param {*} newValue
     */
    onChange(newValue) {
        if(newValue !== undefined) {
            this.model.value = newValue;
        }

        if(typeof this.model.onchange === 'function') {
            this.model.onchange(this.model.value);
        }
    }
    
    /**
     * Event: Value input
     *
     * @param {*} newValue
     */
    onInput(newValue) {
        if(newValue !== undefined) {
            this.model.value = newValue;
        }

        if(typeof this.model.oninput === 'function') {
            this.model.oninput(this.model.value);
        }
    }
}

module.exports = WidgetBase;