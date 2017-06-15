import {getPostBoxes} from '../dom-helper/dom-helper'

export const encourageDiscard = () => {
    // Find the dialog box used to create posts.
    const postBoxes = getPostBoxes()
    if (postBoxes.length != 1) {
        console.error('DOM parsing failed. Could not locate the post box.')
        console.error(postBoxes)
    } else {
        const postBox = postBoxes[0]
        const discard_btn = document.createElement('BUTTON')
        discard_btn.id = 'thinklient-discard'
        discard_btn.textContent = 'Discard'
        discard_btn.style.backgroundColor = '#B7410E'
        discard_btn.style.border = 'none'
        discard_btn.style.color = 'white'
        discard_btn.style.height = '24px'
        discard_btn.style.marginTop = '8px'
        discard_btn.onclick = function() {
            const dismissButton = <HTMLElement> document.querySelectorAll('[aria-label="Dismiss"]')[0]
            dismissButton.click()
        }
        const discard_div = document.createElement('DIV')
        discard_div.appendChild(document.createElement('span'))
        discard_div.appendChild(discard_btn)
        discard_div.style.cssFloat = 'left'

        let observer = new MutationObserver(function () {
            const rfloat = postBox.getElementsByClassName('rfloat')[0]
            if (rfloat && rfloat.getElementsByTagName('button').length == 1) {
                console.log('Attaching the discard button to the post box.')
                const post_btn = <HTMLElement> rfloat.childNodes[0]
                post_btn.style.cssFloat = 'left'
                rfloat.insertBefore(discard_div, post_btn)
            }
        })

        observer.observe(postBox, {
            childList: true,
            subtree: true
        })
    }
}
