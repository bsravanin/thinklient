import {hidePostsWithBlacklistedWords} from './crud-filter/crud-filter'
import {enableDiscard} from './encourage-discard/encourage-discard'
import {updateQuote} from './random-quote/random-quote'
import {enableUndoPost} from './undo-post/undo-post'
import {getSavedConfig} from './options/options'
import {hideSocialCounts} from './hide-reactions/hide-reactions'

class Startup {
    public static main(): number {
        console.info("Think...")

        getSavedConfig().then(config => {
            const features = config.features
            const {crudFilter, encourageDiscard, randomQuotes, undoPost, hideReactions} = features
            if (crudFilter.isEnabled) {
                hidePostsWithBlacklistedWords(crudFilter.blacklist)
            }

            if (encourageDiscard.isEnabled)  {
                enableDiscard()
            }

            if (randomQuotes.isEnabled) {
                updateQuote()
            }

            if (undoPost.isEnabled && undoPost.timeout > 0) {
                enableUndoPost(undoPost.timeout)
            }

            if (hideReactions.isEnabled) {
                hideSocialCounts();
            }
        })

        return 0;
    }
}

Startup.main()