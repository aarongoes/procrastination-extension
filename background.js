chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  defaultValue = [];
  chrome.storage.sync.get({ links: defaultValue }, function (data) {
    data.links.forEach((element) => {
      if (changeInfo.url != undefined) {
        if (changeInfo.url.includes(element)) {
          let time = new Date();
          defaultValue = "00:00";
          chrome.storage.sync.get({ start: defaultValue }, (data) => {
            let start = data.start;
            let startList = start.split(":");
            console.log(startList);
            console.log(time.getHours);
            console.log(Number(startList[0]) <= time.getHours());
            console.log(Number(startList[1]) <= time.getMinutes());
            if (
              Number(startList[0]) < time.getHours() ||
              (Number(startList[0]) <= time.getHours() &&
                startList[1] <= time.getMinutes())
            ) {
              chrome.storage.sync.get({ end: defaultValue }, (data) => {
                let end = data.end;
                let endList = end.split(":");
                console.log(Number(endList[0]) >= time.getHours());
                console.log(Number(endList[1]) >= time.getMinutes());
                if (
                  Number(endList[0]) > time.getHours() ||
                  (Number(endList[1]) >= time.getHours() &&
                    endList[1] >= time.getMinutes())
                ) {
                  alert("stoute hond");
                }
              });
            }
          });
        }
      }
    });
  });
});
