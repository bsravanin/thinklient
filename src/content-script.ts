import {testLog, hideAllPosts} from './crud-filter/crud-filter'
import {encourageDiscard} from './encourage-discard/encourage-discard'

class Startup {
    public static main(): number {
        console.info("Think...")
        testLog()

        chrome.storage.sync.get({
            filterProfanity: false,
            encourageDiscard: false
        }, function(items) {
            if (items.filterProfanity) {
                hideAllPosts()
            }

            if (items.encourageDiscard)  {
                encourageDiscard()
            }
        });

        return 0;
    }
}

Startup.main()