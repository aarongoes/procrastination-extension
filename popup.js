document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("addWebsite").addEventListener("click", addWebsite);
});
function addWebsite() {
  let link = prompt("Which URL would you like to add?", "https://");
  if (link) {
    link.replace("https://", "");
    link.replace("www.", "");
    defaultValue = [];
    chrome.storage.sync.get({ links: defaultValue }, function (data) {
      data.links.push(link);
      chrome.storage.sync.set({ links: data.links }, function () {});
    });
  }
}
