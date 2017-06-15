import {getNewsFeed} from '../dom-helper/dom-helper'

const STORY_ID_PREFIX = 'hyperfeed_story_id_'

const hideStoriesIn = (root: JQuery) => {
    const stories = root.find(`div.fbUserContent`)
    stories.css('opacity', '0.3')
}

export const hideAllPosts = () => {
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
                    hideStoriesIn(newsFeed)
                }
            }
        }
    });

    observer.observe(newsFeed.get(0), {
        childList: true,
        subtree: true,
    });

    hideStoriesIn(newsFeed)
}