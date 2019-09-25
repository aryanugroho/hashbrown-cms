/**
 * Performs a submodule check
 */
window.submoduleCheck = function submoduleCheck() {
    let message = '';
    
    if(typeof Crisp === 'undefined') {
        message = 'Git submodule "crisp-ui" not loaded. Please run "git submodule update --init" in the HashBrown root directory and reload this page';
    }

    if(message) {
        alert(message);
        throw new Error(message);
    }
}

/**
 * Gets a cookie by name
 *
 * @param {String} name
 *
 * @returns {String} value
 */
window.getCookie = function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");

    if(parts.length == 2) {
        return parts.pop().split(";").shift();
    }
}

/**
 * Copies string to the clipboard
 *
 * @param {String} string
 */
window.copyToClipboard = function copyToClipboard(string) {
    let text = document.createElement('TEXTAREA');

    text.innerHTML = string;

    document.body.appendChild(text);

    text.select();

    try {
        let success = document.execCommand('copy');

        if(!success) {
            UI.error('Your browser does not yet support copying to clipboard');
        }
    } catch(e) {
        UI.error(e.toString());
    }

    document.body.removeChild(text);
}

/**
 * Clears the workspace
 */
window.clearWorkspace = function clearWorkspace() {
    $('.workspace').empty();
};

/**
 * Sets workspace content
 */
window.populateWorkspace = function populateWorkspace($html, classes) {
    let $workspace = $('.page--environment__space--editor');

    $workspace.empty();
    $workspace.attr('class', 'page--environment__space--editor');
    
    _.append($workspace, $html);

    if(classes) {
        $workspace.addClass(classes);
    }
};

/**
 * Checks for updates
 */
window.updateCheck = async function updateCheck() {
    let update = await HashBrown.Service.RequestService.customRequest('get', '/api/server/update/check');
    
    if(update.isBehind) {
        UI.notifySmall('Update available', 'HashBrown can be updated to ' + update.remoteVersion + '. Please check the <a href="/readme">readme</a> for instructions.'); 
    }
}
