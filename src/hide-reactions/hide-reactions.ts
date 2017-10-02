import {getReactionSpans} from '../dom-helper/dom-helper'
import {getShareCountRows} from '../dom-helper/dom-helper'
import {waitForNewsFeed} from '../dom-helper/dom-helper'

export const hideSocialCounts = async () => {
    const newsFeed = await waitForNewsFeed()

    let observer = new MutationObserver(function () {
        for (let span of getReactionSpans()) {
            if (span.parentElement) {
                span.parentElement.hidden = true
            }
        }

        for (let element of getShareCountRows()) {
            (element as any).hidden = true
        }
    })

    observer.observe(newsFeed, {
        childList: true,
        subtree: true
    })
}
