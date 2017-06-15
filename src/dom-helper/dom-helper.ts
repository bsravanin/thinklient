import * as $ from 'jquery'

export const getPlaceHolders = () => {
    return document.querySelectorAll('[id^="placeholder"]')
}

export const getPostBoxes = () => {
    return document.querySelectorAll('[aria-label="Create a Post"]')
}

export const getNewsFeed = () => {
    return $("div[id^='feed_stream_']")
}
