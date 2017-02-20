browser.contextMenus.create({
  id:"open-link-bg",
  // see browser.i18n
  title: "Open the link in background before it loads",
  contexts: ["link"]
});

browser.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "open-link-bg") {
    console.log("OPEN IT IN BG!");
    console.log(info.linkUrl);
    browser.tabs.create({
      "active": false,
      "url": info.linkUrl
    }).then(function(tab) {
      console.log(tab)
      /*
      browser.webNavigation.onCompleted.addListener(function(detail) {
        if (detail.tabId == tab.
      }
        filter                      // optional object
      )
      */
      /*
      browser.tabs.onUpdated.addListener(function(info) {
        console.log(info)
        console.log(tab.status)
        console.log(info == tab.tabId)
        console.log(tab.status == "complete")
        if (info == tab.id && tab.status == "complete") {
          console.log("Loaded!")
          browser.tabs.update(tab.id, {"active": true})
        }
      })
      */
      browser.webNavigation.onCompleted.addListener(function(info){
        console.log(info)
        if (info.tabId == tab.id) {
          console.log("activate")
          browser.tabs.update(tab.id, {"active": true})
        }
      })
    })
  }
});
