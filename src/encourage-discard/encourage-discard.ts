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

        const quotes: string[] = [
            'Sometimes I find it sufficient to articulate and discard a thought without posting.',
            'I do not mean everything I say. Why say it if I do not mean it?',
            'My anger is not reason enough to speak unkindly on the internet.',
            'Being mindful is a choice and takes effort.',
            'My friends will read this. :)'
        ]

        let observer = new MutationObserver(function () {
            const lfloat = postBox.getElementsByClassName('lfloat')[0]
            if (lfloat && lfloat.getElementsByTagName('button').length == 0) {
                console.log('Attaching the discard button and quote to the post box.')
                const quote = quotes[Math.floor(Math.random() * quotes.length)]
                lfloat.appendChild(btn)
                lfloat.appendChild(document.createTextNode(quote))
            }
        })

        observer.observe(postBox, {
            childList: true,
            subtree: true
        })
    }
}
