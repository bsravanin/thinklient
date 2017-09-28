import * as $ from 'jquery'
import {waitForNewsFeed, waitForPagingParent, waitForSubstream, waitForElement} from '../dom-helper/dom-helper'

const STORY_SELECTOR = 'div[data-testid="fbfeed_story"]'

const hideMatchingStoriesIn = (root: Node, regexp: RegExp) => {
    const stories = $(root).find(STORY_SELECTOR)
    console.info(`Found ${stories.length} stories on the page`)
    hideMatchingStories(stories, regexp)
}

const hideMatchingStories = (stories: JQuery, regexp: RegExp) => {
    const matchingStories = stories
        .filter((i: number, element: Element) => {
            const allText = $(element).text()
            const match = $(element).text().match(regexp)
            return match !== null
        })

    if (matchingStories.length > 0) {
        console.info(`Hiding ${matchingStories.length} stories containing blacklisted words`)
        hideElements(matchingStories)
    }
}

const hideElements = (elements: JQuery) => {
    elements.css('opacity', '0.3')
}

export const hidePostsWithBlacklistedWords = async (blacklist: string[]) => {
    const regexp: RegExp = new RegExp(`\\b(?:${blacklist.join('|')})\\b`, 'i')
    const newsFeed = await waitForNewsFeed()
    const pagingParent = await waitForPagingParent(newsFeed)
    const firstSubstream = await waitForSubstream(pagingParent)
    const substreamsParent = firstSubstream.parentNode;
    if (!substreamsParent) {
        console.error("Failed to find substream parent. Crud filter disabled!")
        return
    }

    const observer = new MutationObserver((mutations) => {
        for (let mutationRecord of mutations) {
            if (mutationRecord.addedNodes.length > 0) {
                const story = $(mutationRecord.target).filter(STORY_SELECTOR)
                if (story.length > 0) {
                    hideMatchingStories(story, regexp)
                }
            }
        }
    });

    observer.observe(substreamsParent, {
        childList: true,
        subtree: true,
    });

    hideMatchingStoriesIn(newsFeed, regexp)
}