import * as $ from 'jquery'
import {getNewsFeed} from '../dom-helper/dom-helper'

const STORY_ID_PREFIX = 'hyperfeed_story_id_'


const hideStoriesIn = (root: JQuery, blacklist: string[]) => {
    const regexp: RegExp = new RegExp(`\\b(?:${blacklist.join('|')})\\b`, 'i')
    console.info(`Searching for regex: ${regexp}`)
    const stories = root.find(`div.fbUserPost`)
    console.info(`Found ${stories.length} stories on the page`)
    const matchingStories = stories
        .filter((i: number, element: Element) => {
            const allText = $(element).text()
            console.log(`Element's text is "${allText}"`)
            const match = $(element).text().match(regexp)
            return match !== null
        })

    if (matchingStories.length > 0) {
        console.info(`Hiding ${matchingStories.length} stories containing blacklisted words`)
    }
    matchingStories.css('opacity', '0.3')
}


export const hideAllPosts = (blacklist: string[]) => {
    const newsFeed = getNewsFeed()
    console.info(newsFeed)

    const observer = new MutationObserver(function(mutations, observer) {
        // console.log(mutations, observer);
        for (let mutationRecord of mutations) {
            if (mutationRecord.target) {
                const targetId = mutationRecord.target.attributes.getNamedItem('id')
                console.info('Has target!')
                if (targetId && targetId.value.startsWith(STORY_ID_PREFIX)) {
                    console.log('Got a story mutation!')
                    hideStoriesIn(newsFeed, blacklist)
                }
            }
        }
    });

    observer.observe(newsFeed.get(0), {
        childList: true,
        subtree: true,
    });

    hideStoriesIn(newsFeed, blacklist)
}