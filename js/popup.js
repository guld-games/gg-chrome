'use strict'

/* global LOGO_TEMPLATE:false ERR_TEMPLATE:false keyring:false load:false routes:false LOADING_TEMPLATE:false wrapper:true b:true initGitHub:false ghOAUTH:false openpgp:false myKey:true Event:false manifest:true USER:true */

function loadLogin (err) { // eslint-disable-line no-unused-vars
  var wrapper = document.getElementById('wrapper')
  guldApp.postMessage({'cmd': 'getuser'})
  guldApp.onMessage.addListener(msg => {
    if (msg.cmd === 'gotuser') {
      if (msg.data.name === 'guld') {
        wrapper.innerHTML =
        `${LOGO_TEMPLATE}
        Please unlock the <a href="chrome-extension://fggohbjlmjldccoelobkepngbkkebefi/options.html">guld wallet app</a>, so that this games app can communicate with it.
        ${ERR_TEMPLATE}`
      } else {
        guldname = msg.data.name
        guldmail = msg.data.email
        guldfpr = msg.data.fpr
        ghavatar = msg.data.ghavatar
        routes('dash', '')
      }
    }
  })
  load(err)
}

document.addEventListener('DOMContentLoaded', function () {
  wrapper = document.getElementById('wrapper')
  wrapper.innerHTML = LOADING_TEMPLATE
  guldApp = chrome.runtime.connect('fggohbjlmjldccoelobkepngbkkebefi')
  loadLogin()
})
