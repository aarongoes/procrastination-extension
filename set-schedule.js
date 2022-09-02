document.addEventListener("DOMContentLoaded", function () {
    let startInput = document.getElementById("start");
    let endInput = document.getElementById("end");
  defaultValue = "00:00";
  chrome.storage.sync.get({ start: defaultValue }, function (data) {
    startInput.value = data.start
  });
  chrome.storage.sync.get({ end: defaultValue }, function (data) {
    endInput.value = data.end
  });
  startInput.addEventListener("input", (e) => setStart(e));
  endInput.addEventListener("input", (e) => setEnd(e));
});

function setStart(e){
    let value = e.target.value;
    chrome.storage.sync.set({ start: value }, function () {});
}
function setEnd(e){
    let value = e.target.value;
    chrome.storage.sync.set({ end: value }, function () {});
}