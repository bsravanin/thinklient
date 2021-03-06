import defaultBlacklist from './default-blacklist'

const STORAGE_KEY: string = 'THINK_CONFIG'

interface IThinkclientConfig {
    features: {
        crudFilter: {
            isEnabled: boolean
            blacklist: string[]
        }
        encourageDiscard: {
            isEnabled: boolean
        }
        randomQuotes: {
            isEnabled: boolean
        }
        undoPost: {
            isEnabled: boolean
            timeout: number
        }
        hideReactions: {
            isEnabled: boolean
        }
    }
}

const DEFAULT_CONFIG: IThinkclientConfig = {
    features: {
        crudFilter: {
            isEnabled: false,
            blacklist: defaultBlacklist
        },
        encourageDiscard: {
            isEnabled: false
        },
        randomQuotes: {
            isEnabled: false
        },
        undoPost: {
            isEnabled: false,
            timeout: 30
        },
        hideReactions: {
            isEnabled: false
        }
    }
}

export const getSavedConfig = () : Promise<IThinkclientConfig> => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(STORAGE_KEY, items => {
            const configStateStr = items[STORAGE_KEY]
            console.log('Retrieved: ', configStateStr)
            if (configStateStr) {
                const config : IThinkclientConfig = JSON.parse(configStateStr)
                resolve(config)
            } else {
                console.log('Loading default config')
                resolve(DEFAULT_CONFIG)
            }
        })
    })
}

export const saveConfig = () => {
    console.log('Saving config to chrome storage')
    // crudFilter
    const crudFilterCheckbox = getInputElement('crud-filter')
    const crudFilterIsEnabled = crudFilterCheckbox.checked
    const crudFilterBlacklistInput = getInputElement('crud-filter-blacklist-terms')
    console.log(crudFilterBlacklistInput.value)
    const crudFilterBlacklist = crudFilterBlacklistInput.value.split('\n')

    // encourageDiscard
    const encourageDiscardCheckbox = getInputElement('encourage-discard')
    const encourageDiscardIsEnabled = encourageDiscardCheckbox.checked

    // randomQuotes
    const randomQuotesCheckbox = getInputElement('random-quotes')
    const randomQuotesIsEnabled = randomQuotesCheckbox.checked

    // undoPost
    const undoPostCheckbox = getInputElement('undo-post')
    const undoPostIsEnabled = undoPostCheckbox.checked
    const undoPostTimeoutInput = getInputElement('undo-post-timeout')
    const undoPostTimeout = Number(undoPostTimeoutInput.value)

    // hideReactions
    const hideReactionsCheckbox = getInputElement('hide-reactions')
    const hideReactionsIsEnabled = hideReactionsCheckbox.checked

    const configToSave : IThinkclientConfig = {
        features: {
            crudFilter: {
                isEnabled: crudFilterIsEnabled,
                blacklist: crudFilterBlacklist
            },
            encourageDiscard: {
                isEnabled: encourageDiscardIsEnabled
            },
            randomQuotes: {
                isEnabled: randomQuotesIsEnabled
            },
            undoPost: {
                isEnabled: undoPostIsEnabled,
                timeout: undoPostTimeout
            },
            hideReactions: {
                isEnabled: hideReactionsIsEnabled
            }
        }
    }

    saveConfigToChromeStorage(configToSave)
}

export const restoreDefaults = () => {
    saveConfigToChromeStorage(DEFAULT_CONFIG)
    restoreConfig()
}

const saveConfigToChromeStorage = (configToSave: IThinkclientConfig) => {
    const toSave = {
        [STORAGE_KEY]: JSON.stringify(configToSave)
    }

    console.log('Saving: ', toSave)
    chrome.storage.sync.set(toSave, function() {
        const status = document.getElementById('status') as HTMLElement
        status.textContent = 'Options saved.'
        setTimeout(function() {
            status.textContent = ''
        }, 5000)
    });
}

const restoreConfig = () => {
    console.log('Restoring config from chrome storage')
    getSavedConfig().then(config => {
        const features = config.features
        // crudFilter
        getInputElement('crud-filter').checked = features.crudFilter.isEnabled
        getInputElement('crud-filter-blacklist-terms').textContent =
            features.crudFilter.blacklist.join('\n')

        // encourageDiscard
        getInputElement('encourage-discard').checked = features.encourageDiscard.isEnabled

        // randomQuotes
        getInputElement('random-quotes').checked = features.randomQuotes.isEnabled

        // undoPost
        getInputElement('undo-post').checked = features.undoPost.isEnabled
        getInputElement('undo-post-timeout').value = String(features.undoPost.timeout)

        // hideReactions
        getInputElement('hide-reactions').checked = features.hideReactions.isEnabled
    })
}

const getInputElement = (elementId: string) : HTMLInputElement => {
    return document.getElementById(elementId) as HTMLInputElement
}

document.addEventListener('DOMContentLoaded', () => {
    restoreConfig()
    const saveButton = document.getElementById('save-btn') as HTMLElement
    saveButton.addEventListener('click', saveConfig)
    const restoreButton = document.getElementById('restore-defaults-btn') as HTMLElement
    restoreButton.addEventListener('click', restoreDefaults)

})