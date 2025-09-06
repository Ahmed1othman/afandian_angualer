// Add title to surly-iframe when it's dynamically added to the page
function addTitleToSurlyIframe() {
    // Create a MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes) {
                mutation.addedNodes.forEach((node) => {
                    // Check if the added node is the surly-iframe
                    if (node.id === 'surly-iframe') {
                        // Add title and aria-label for accessibility
                        node.setAttribute('title', 'External Content Frame');
                        node.setAttribute('aria-label', 'External Content Frame');
                    }
                });
            }
        });
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Run when the document is ready
document.addEventListener('DOMContentLoaded', addTitleToSurlyIframe);
