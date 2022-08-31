document.addEventListener("DOMContentLoaded", function () {
  defaultValue = [];
  chrome.storage.sync.get({ links: defaultValue }, function (data) {
    console.log(data.links);
    data.links.forEach((element) => {
      let wrapper = document.createElement("div");
      let removeBtn = document.createElement("button");
      let link = document.createElement("div");
      let textnode = document.createTextNode(element);
      link.appendChild(textnode);
      wrapper.id = element + "-wrapper";
      removeBtn.addEventListener("click", function () {
        remove(element);
      });
      wrapper.appendChild(link);
      wrapper.appendChild(removeBtn);
      document.getElementById("list").appendChild(wrapper);
    });
  });
});

function remove(link) {
  chrome.storage.sync.get({ links: defaultValue }, function (data) {
    data.links.splice(data.links.indexOf(link), 1);
    chrome.storage.sync.set({ links: data.links }, function () {
      console.log(data.links);
    });
  });
  document.getElementById("list").removeChild(document.getElementById(link + "-wrapper"));
}
