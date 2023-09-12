const head = document.querySelector('head')
const stylesheet = document.createElement('link')
stylesheet.setAttribute('rel', 'stylesheet')
// if (
//   location.hostname === "localhost" || 
//   location.hostname === "127.0.0.1" ||
//   location.hostname === 'staging.mwd-agentur.de'
// ){
//   stylesheet.setAttribute('href', 'https://staging.mwd-agentur.de/usercentrics.css')
// }
stylesheet.setAttribute('href', 'https://cdn.jsdelivr.net/gh/lukeoiler/amex_cookie_consent@0.0.4/uc.css')


// search for usercentrics root element
const userCentricsRoot = document.querySelector('#usercentrics-root')

// check if usercentrics is already loaded
if( userCentricsRoot ){
  // inject in already loaded usercentrics popup
  userCentricsRoot.shadowRoot.appendChild(stylesheet)
}
// else wait until usercentrics element is added to dom
else{
  const observer = new MutationObserver(function(mutations_list) {
    mutations_list.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(added_node) {
        if(added_node.id == 'usercentrics-root') {
          // inject in newly added usercentrics popup
          added_node.shadowRoot.appendChild(stylesheet)
          // stop watching for element to be added
          observer.disconnect();
        }
      });
    });
  });
  observer.observe(document.querySelector("body"), { subtree: false, childList: true });
}

// head.appendChild(stylesheet)
