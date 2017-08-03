import {getNewsFeed} from '../dom-helper/dom-helper'

const STORY_ID_PREFIX = 'hyperfeed_story_id_'


const hideStoriesIn = (root: JQuery, blacklist: string[]) => {
    const stories = root.find(`div.fbUserContent`)
    for (let blacklist_str of blacklist) {
        const matchingStories = stories.filter(`:contains('${blacklist_str}')`)
        if (matchingStories.length > 0) {
            console.info(`Hiding ${matchingStories.length} stories matching ${blacklist_str}`)
        }
        matchingStories.css('opacity', '0.3')
    }
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