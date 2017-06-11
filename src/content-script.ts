import {hideAllPosts} from './crud-filter/crud-filter'
import {encourageDiscard} from './encourage-discard/encourage-discard'
import {updateQuote} from './random-quote/random-quote'

class Startup {
    public static main(): number {
        console.info("Think...")

        chrome.storage.sync.get({
            filterProfanity: false,
            encourageDiscard: false,
            randomQuote: false
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
        });

        return 0;
    }
}

Startup.main()