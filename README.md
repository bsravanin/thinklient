# thinklient
An open-source Google Chrome extension to nudge towards thoughtful and deliberate posting.

# Install
0. Install node and npm
0. Clone the repo.
0. npm install
0. npm run build
0. Open chrome://extensions/ on Google Chrome.
0. Enable "Developer mode".
0. Click "Load unpacked extension".
0. Navigate and select the dist directory of the cloned repo.
0. Visit facebook.com and the contents of content-script should be run!

# Test
0. Enable all features before testing.
0. Test encourage discard
    0. Verify that the 'Post' dialog has a rust-colored 'Dismiss' button properly aligned to the left of the 'Post' button.
    0. Verify that clicking 'Dismiss' closes the dialog.
0. Test random quotes
    0. Verify that a quote appears in place of "What's on your mind, <HAL>?" in the 'Post' box.
    0. Verify that the new 'Post' box created after posting something contains another quote (not necessarily a different one).
    0. Verify that a quote appears in place of "Write a comment..." in the 'Comment' box.
    0. Verify that the new 'Comment' box created after commenting something (on the previous post, e.g.) contains another quote (not necessarily a different one).
