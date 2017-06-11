import {hideAllPosts} from './crud-filter/crud-filter'
import {encourageDiscard} from './encourage-discard/encourage-discard'
import {updateQuote} from './random-quote/random-quote'
import {undoPost} from './undo-post/undo-post'

class Startup {
    public static main(): number {
        console.info("Think...")

        chrome.storage.sync.get({
            filterProfanity: false,
            encourageDiscard: false,
            randomQuote: false,
            undoPost: 0
        }, function(items) {
            if (items.filterProfanity) {
                hideAllPosts()
            }

            if (items.encourageDiscard)  {
                encourageDiscard()
            }

            if (items.randomQuote) {
                updateQuote()
            }

            if (items.undoPost > 0) {
                undoPost()
            }
        });

        return 0;
    }
}

Startup.main()