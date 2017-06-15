# thinklient
An open-source Google Chrome extension to nudge towards thoughtful and deliberate posting.

# Install
1. Install node and npm
1. Clone the repo.
1. npm install
1. npm run build
1. Open chrome://extensions/ on Google Chrome.
1. Enable "Developer mode".
1. Click "Load unpacked extension".
1. Navigate and select the dist directory of the cloned repo.
1. Visit facebook.com and the contents of content-script should be run!

# Test
1. Enable all features before testing.
1. Test encourage discard
    1. Verify that the 'Post' dialog has a rust-colored 'Dismiss' button properly aligned to the left of the 'Post' button.
    1. Verify that clicking 'Dismiss' closes the dialog.
1. Test random quotes
    1. Verify that a quote appears in place of "What's on your mind, <HAL>?" in the 'Post' box.
    1. Verify that the new 'Post' box created after posting something contains another quote (not necessarily a different one).
    1. Verify that a quote appears in place of "Write a comment..." in the 'Comment' box.
    1. Verify that the new 'Comment' box created after commenting something (on the previous post, e.g.) contains another quote (not necessarily a different one).
