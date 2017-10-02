function save_options() {
    var filterProfanity = document.getElementById('crud-filter').checked
    var encourageDiscard = document.getElementById('encourage-discard').checked
    var randomQuote = document.getElementById('random-quote').checked
    var undoPost = document.getElementById('undo-post').value
    var hideReactions = document.getElementById('hide-reactions').checked
    chrome.storage.sync.set({
        filterProfanity: filterProfanity,
        encourageDiscard: encourageDiscard,
        randomQuote: randomQuote,
        undoPost: undoPost,
        hideReactions: hideReactions
    }, function() {
        var status = document.getElementById('status')
        status.textContent = 'Options saved.'
        setTimeout(function() {
            status.textContent = ''
        }, 1000)
    });
}

function restore_options() {
    chrome.storage.sync.get({
        filterProfanity: false,
        encourageDiscard: false,
        randomQuote: false,
        undoPost: 0,
        hideReactions: false
    }, function(items) {
        document.getElementById('crud-filter').checked = items.filterProfanity
        document.getElementById('encourage-discard').checked = items.encourageDiscard
        document.getElementById('random-quote').checked = items.randomQuote
        document.getElementById('undo-post').value = items.undoPost
        document.getElementById('hide-reactions').value = items.hideReactions
    });
}

document.addEventListener('DOMContentLoaded', restore_options)
document.getElementById('save').addEventListener('click', save_options)