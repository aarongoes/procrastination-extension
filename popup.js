document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("addWebsite").addEventListener("click", addWebsite);
});
function addWebsite() {
    let link = prompt("Which URL would you like to add?", "https://");
    if (link) {
        link.replace("http://", "")
        link.replace("https://", "")
        link.replace("www.", "")
      defaultValue = [];
      chrome.storage.sync.get({ links: defaultValue }, function (data) {
        data.links.push(link);
      });
    }
}