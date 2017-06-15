import {getPlaceHolders, getNewsFeed} from '../dom-helper/dom-helper'

const quotes: string[] = [
    'Sometimes I find it sufficient to articulate and discard a thought without posting.',
    'I do not mean everything I say. Why say it if I do not mean it?',
    'My anger is not reason enough to speak unkindly on the internet.',
    'Being mindful is a choice and takes effort.',
    'My friends will read this. :)'
]

const updateQuoteInPlaceHolders = () => {
    const placeHolders = getPlaceHolders()
    if (placeHolders.length == 0) {
        console.error('No placeholder elements found. Cannot show a random quote...')
        return
    }
    for (let i = 0; i < placeHolders.length; i++) {
        const placeHolder = <HTMLElement> placeHolders[i]
        if (placeHolder.innerText) {
            let placeHolderType
            if (placeHolder.innerText.lastIndexOf("What's on your mind", 0) == 0) {
                placeHolderType = 'post'
            } else if (placeHolder.innerText.lastIndexOf("Write a comment...", 0) == 0) {
                placeHolderType = 'comment'
            } else {
                console.debug('Not updating innerText of unknown placeholder %s.', placeHolder)
                continue
            }

            console.info('Attaching a random quote to the %s box.', placeHolderType)
            const quote = quotes[Math.floor(Math.random() * quotes.length)]
            placeHolder.innerText = quote
            placeHolder.innerHTML = quote
        }
    }
}

export const updateQuote = () => {
    const newsFeed = getNewsFeed()
    updateQuoteInPlaceHolders()

    let observer = new MutationObserver(function () {
        updateQuoteInPlaceHolders()
    })

    observer.observe(newsFeed.get(0), {
        childList: true,
        subtree: true
    })
}