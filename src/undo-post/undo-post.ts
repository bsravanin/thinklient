import * as $ from 'jquery'
import {getPostBoxes} from '../dom-helper/dom-helper'
import {getPostButton} from '../dom-helper/dom-helper'

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const enableUndoPost = (timeout: number) => {
    const postBoxes = getPostBoxes()
    if (postBoxes) {
        console.log('Undoing posts has been enabled with %s seconds.', timeout)
        const postBox = postBoxes[0]

        let observer = new MutationObserver(function () {
            $(document).ready(function () {
                const postButton = getPostButton()
                if (postButton) {
                    console.log('Changing onclick logic.')
                    const postOnClick = postButton.onclick
                    postButton.onclick = null
                    $(postButton).click(async function (e) {
                        console.log('Intercepting post.')
                        await sleep(timeout * 1000);
                        console.log('Posting after sleep.')
                        postOnClick.call(this, e)
                    })
                }
            })
        })

        observer.observe(postBox, {
            childList: true,
            subtree: true
        })
    } else {
        console.error('DOM parsing failed. Could not locate the post button.')
        console.error(postBoxes)
    }
}