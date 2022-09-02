const notificationId = "procrastinatorhelper";

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  defaultValue = [];
  chrome.storage.sync.get({ links: defaultValue }, function (data) {
    data.links.forEach((element) => {
      if (changeInfo.url != undefined) {
        if (changeInfo.url.includes(element)) {
          console.log(changeInfo);
          let time = new Date();
          defaultValue = "00:00";
          chrome.storage.sync.get({ start: defaultValue }, (data) => {
            let start = data.start;
            let startList = start.split(":");
            if (
              Number(startList[0]) < time.getHours() ||
              (Number(startList[0]) <= time.getHours() &&
                startList[1] <= time.getMinutes())
            ) {
              chrome.storage.sync.get({ end: defaultValue }, (data) => {
                let end = data.end;
                let endList = end.split(":");
                if (
                  Number(endList[0]) > time.getHours() ||
                  (Number(endList[1]) >= time.getHours() &&
                    endList[1] >= time.getMinutes())
                ) {
                  fireNotification();
                }
              });
            }
          });
        }
      }
    });
  });
});

function fireNotification() {
  chrome.notifications.create(notificationId, {
    type: "basic",
    iconUrl: "./icon.png",
    title: "Procrastinator Helper",
    message: "Are you procrastinating right now?",
    priority: 2,
    requireInteraction: true,
    buttons: [
      {
        title: "Yes",
      },
      {
        title: "No",
      },
    ],
  });
}

chrome.notifications.onClicked.addListener(function (id) {
  if (id == notificationId) {
    this.fireNotification();
  }
});
chrome.notifications.onButtonClicked.addListener(function (id, buttonIndex) {
  if (id == notificationId && buttonIndex == 0) {
    var newURL = "https://pressurecooker.aarongoes.nl/";
    chrome.tabs.create({ url: newURL });
  }
});
