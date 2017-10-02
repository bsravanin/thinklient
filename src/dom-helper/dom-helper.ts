import * as $ from 'jquery'

export const getPlaceHolders = () => {
    return document.querySelectorAll('[id^="placeholder"]')
}

export const getPostBoxes = () => {
    return document.querySelectorAll('[aria-label="Create a post"]')
}

export const getReactionSpans = () => {
    return document.querySelectorAll('[aria-label="See who reacted to this"]')
}

export const getShareCountRows = () => {
    return document.querySelectorAll('.UFIShareRow')
}

export const waitForNewsFeed = async (): Promise<Node> => {
    return await waitForElement(document, "div[id^='feed_stream_']")
}

export const waitForPagingParent = async (root: Node): Promise<Node> => {
    return await waitForElement(root, "div[id^='more_pager_pagelet_']")
}

export const waitForSubstream = async (root: Node): Promise<Node> => {
    return await waitForElement(root, "div[id^='substream_']")
}

/**
 * Find DOM nodes matching the specified jquery selector and return them. If
 * matching nodes are found at the time of invocation, the returned promise will be
 * resolved with the first match. Otherwise the promise will be resolved with the
 * first matching node that is a descendant of the specified root, if and when such
 * a node is added to the DOM.
 *
 * @param root The root element whose descendants to search
 * @param selector A jquery selector string
 * @return A Promise that will resolve with the first node matching the specified
 * selector that can be found as a descendant of the specified root node.
 */
export const waitForElement = (root: Node, selector: string): Promise<Node> => {
    return new Promise((resolve, reject) => {
        const searchResults = $(root).find(selector)
        if (searchResults.length > 0) {
            resolve(searchResults.get(0))
        } else {
            // Element not yet present on page
            const observer = new MutationObserver((mutations, observer) => {
                for (let mutationRecord of mutations) {
                    for (let addedNode of mutationRecord.addedNodes) {
                        if ($(addedNode).is(selector)) {
                            observer.disconnect()
                            resolve(addedNode)
                            return
                        }
                    }
                }
            })

            observer.observe(root, {childList: true, subtree: true})
        }
    })
}

export const getPostButton = (): HTMLElement | undefined => {
    const postBoxes = getPostBoxes()
    if (postBoxes.length != 1) {
        console.error('DOM parsing failed. Could not locate the post box.')
        console.error(postBoxes)
    } else {
        const rfloat = postBoxes[0].getElementsByClassName('rfloat')[0]
        if (rfloat) {
            for (let button of rfloat.getElementsByTagName('button')) {
                if (button.innerText == 'Post') {
                    return button
                }
            }
        }
    }
    return
}
