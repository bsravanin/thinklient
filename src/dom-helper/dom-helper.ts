import * as $ from 'jquery'

export const getPlaceHolders = () => {
    return document.querySelectorAll('[id^="placeholder"]')
}

export const getPostBoxes = () => {
    return document.querySelectorAll('[aria-label="Create a post"]')
}

export const getNewsFeed = () => {
    return $("div[id^='feed_stream_']")
}

export const getPostButton = () => {
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
}
