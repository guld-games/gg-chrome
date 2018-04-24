'use strict';

const gh_template = `<form id="github-credentials-form">

  <div class="row">
    <input type="text" id="key-gh-username" placeholder="Github username"></input><br>
  </div>

  <div class="row">
    <input type="password" id="key-gh-password" placeholder="Github password"></input><br>
  </div>

  <div class="row">
    <button type="submit" value="store">Secure and store</button>
  </div>
  
</form>`;

function decryptKeyThenGithub(key, passphrase) {
    if (key.hasOwnProperty('key')) key = key.key
    key.decrypt(passphrase).then(function (result) {
        // Load view
        var wrapper = document.getElementById("wrapper");
        wrapper.innerHTML = gh_template;
        document.getElementById("github-credentials-form").addEventListener("submit", function (e) {
            submitGithub(e, key, passphrase)
        });
    }, function (err) {
        alert(err)
    })
}

function submitGithub(e, key, passphrase) {
    e.preventDefault();
    var uname = document.getElementById("key-gh-username").value;
    var password = document.getElementById("key-gh-password").value;
    chrome.storage.local.set({
        gh: {
            username: uname,
            password: password
        }
    }, function () {
        routes("gamelist", function (next) { next(); });
    });
}