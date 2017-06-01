function save_options() {
    var filterProfanity = document.getElementById('crud-filter').checked
    var encourageDiscard = document.getElementById('encourage-discard').checked
    chrome.storage.sync.set({
        filterProfanity: filterProfanity,
        encourageDiscard: encourageDiscard
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
        encourageDiscard: false
    }, function(items) {
        document.getElementById('crud-filter').checked = items.filterProfanity
        document.getElementById('encourage-discard').checked = items.encourageDiscard
    });
}

document.addEventListener('DOMContentLoaded', restore_options)
document.getElementById('save').addEventListener('click', save_options)