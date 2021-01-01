'use strict';

/**
 * A simple boolean field
 *
 * @memberof {HashBrown.Client.Entity.View.Field}
 */
class BooleanEditor extends HashBrown.Entity.View.Field.FieldBase {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.editorTemplate = require('template/field/editor/booleanEditor');
    }
}

module.exports = BooleanEditor;
