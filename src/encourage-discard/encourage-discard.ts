export const encourageDiscard = () => {
    // Find the dialog box used to create posts.
    const postBoxes = document.querySelectorAll('[aria-label="Create a Post"]')
    if (postBoxes.length != 1) {
        console.error('DOM parsing failed. Could not locate the post box.')
        console.error(postBoxes)
    } else {
        const postBox = postBoxes[0]
        const btn = document.createElement('BUTTON')
        btn.id = 'thinklient-discard'
        btn.textContent = 'Discard'
        btn.onclick = function() {
            const dismissButton = <HTMLElement> document.querySelectorAll('[aria-label="Dismiss"]')[0]
            dismissButton.click()
        }

        let observer = new MutationObserver(function () {
            const lfloat = postBox.getElementsByClassName('lfloat')[0]
            if (lfloat && lfloat.getElementsByTagName('button').length == 0) {
                console.log('Attaching the discard button to the post box.')
                lfloat.appendChild(btn)
            }
        })

        observer.observe(postBox, {
            childList: true,
            subtree: true
        })
    }
}
