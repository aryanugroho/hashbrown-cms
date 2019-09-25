'use strict';

module.exports = (_, model, state) =>

_.div({class: 'resource-editor resource-editor--content-editor'},
    _.if(state.name === 'error',
        state.message
    ),

    _.if(state.name === 'welcome',
        _.div({class: 'resource-editor__welcome'},
            _.h1('Content'),
            _.p('Click any item in the panel to edit it.'),
            _.p('Use the context menu (right click or the <span class="fa fa-ellipsis-v"></span> button) to perform other actions.'),
            _.div({class: 'widget-group'},
                _.button({class: 'widget widget--button', onclick: _.onClickNewContent, title: 'Create new content'}, 'New content'),
                _.button({class: 'widget widget--button', onclick: _.onClickStartTour, title: 'Start a tour of the UI'}, 'Quick tour'),
                _.button({class: 'widget widget--button', onclick: _.onClickExampleContent, title: 'Get some example content'}, 'Example')
            )
        )
    ),

    _.if(state.name === undefined,
        _.include(require('./inc/header')),
        _.div({class: 'resource-editor__body', name: 'body'},
            state.fields
        ),
        _.div({class: 'resource-editor__footer'},
            _.include(require('./inc/warning')),
            _.div({class: 'resource-editor__footer__actions'},
                _.a({href: `#/${state.category}/${state.id}/json`, class: 'widget widget--button embedded'}, 'Advanced'),
                _.div({class: 'widget-group'},
                    _.button({class: 'widget widget--button', onclick: _.onClickSave}, 'Save'),
                    _.if(state.connection,
                        _.checkbox({value: model.isPublished, class: 'large', name: 'published', placeholder: 'Published'})
                    )
                )
            )
        )
    )
)
