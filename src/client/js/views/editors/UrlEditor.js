'use strict';

/**
 * An editor for content URLs
 */
class UrlEditor extends View {
    constructor(params) {
        super(params);

        this.init();
    }

    /**
     * Get all parent content nodes
     *
     * @param {String} contentId
     *
     * @return {Array} nodes
     */
    static getAllParents(contentId) {
        let nodes = [];    

        function iterate(id) {
            let node;
            let contentEditor = ViewHelper.get('ContentEditor');
        
            if(contentEditor && contentEditor.model && contentEditor.model.id == id) {
                node = contentEditor.model;
            } else {
                node = window.resources.content.filter((node) => {
                    return node.id == id;
                })[0];
            }

            if(node) {
                nodes.push(node);

                if(node.parentId) {
                    iterate(node.parentId);
                }

            } else {
                console.log('[Helper] Content not found: "' + id + '"');
            }
        }

        iterate(contentId);

        nodes.reverse();

        return nodes;
    }

    /**
     * Generates a new url based on content id
     *
     * @param {String} contentId
     *
     * @return {String} url
     */
    static generateUrl(contentId) {
        let nodes = UrlEditor.getAllParents(contentId);
        let url = '';

        url += '/';

        for(let node of nodes) {
            let title = '';
            
            if(typeof node.title === 'string') {
                title = node.title;
            } else if(node.properties && node.properties.title && node.properties.title[window.language]) {
                title = node.properties.title[window.language];
            }

            url += ContentHelper.getSlug(title) + '/';
        }

        let sameUrls = 0;

        for(let contentData of window.resources.content) {
            if(contentData.id != contentId) {
                let content = new Content(contentData);

                if(content.prop('url', window.language) == url) {
                    sameUrls++;
                }
            }
        }

        if(sameUrls > 0) {
            let message = sameUrls;
           
            if(sameUrls == 1) {
                message += ' content node has ';
            } else {
                message += ' content nodes have ';
            }

            message += 'the same URL "' + url + '". Appending "-' + sameUrls + '".';

            messageModal('Duplicate URLs', message);

            url = url.replace(/\/$/, '-' + sameUrls + '/');
        }

        return url;
    }

    /**
     * Regenerates the URL
     */
    regenerate() {
        let newUrl = UrlEditor.generateUrl(Router.params.id);

        this.$input.val(newUrl);

        this.trigger('change', this.$input.val());
    };

    /**
     * Fetch the URL from the Content title
     */
    fetchFromTitle() {
        this.value = this.$titleField.val();

        this.regenerate();
    }

    /**
     * Event: Change value
     */
    onChange() {
        this.value = this.$input.val();

        this.trigger('change', this.value);
    };

    render() {
        this.$element = _.div({class: 'field-editor url-editor input-group'},
            this.$input = _.input({class: 'form-control', value: this.value})
                .on('change propertychange paste keyup', () => { this.onChange(); }),
            _.div({class: 'input-group-btn'},
                _.button({class: 'btn btn-primary'},
                    'Regenerate '
                ).click(() => { this.regenerate(); })
            )
        );

        //  Wait for next CPU cycle to check for title field
        setTimeout(() => {
            this.$titleField = $('.field-container[data-key="title"]').eq(0);

            if(this.$titleField.length == 1) {
                this.$titleField.change(() => {
                    this.fetchFromTitle();   
                });
            }

            if(!this.value) {
                this.fetchFromTitle();
            }
        }, 1);
    }
}

module.exports = UrlEditor;
