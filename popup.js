function setVideos() {
  document
    .querySelectorAll("ytd-grid-video-renderer:has([overlay-style='SHORTS'])")
    .forEach((el) => (el.style.display = "none"));
  document
    .querySelectorAll("ytd-grid-video-renderer:not(:has([overlay-style='SHORTS']))")
    .forEach((el) => (el.style.display = "inline-block"));
}

function setShorts() {
  document
    .querySelectorAll("ytd-grid-video-renderer:has([overlay-style='SHORTS'])")
    .forEach((el) => (el.style.display = "inline-block"));
  document
    .querySelectorAll("ytd-grid-video-renderer:not(:has([overlay-style='SHORTS']))")
    .forEach((el) => (el.style.display = "none"));
}

window.addEventListener("DOMContentLoaded", (evt) => {
  let tabId = null;

  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    tabId = tabs[0].id;
  });

  const btnVideos = document.getElementById("btn-videos");
  btnVideos.addEventListener("click", () => {
    chrome.scripting
      .executeScript({
        target: { tabId },
        func: setVideos,
      })
      .then(() => console.log("injected set function videos"));
  });

  const btnShorts = document.getElementById("btn-shorts");
  btnShorts.addEventListener("click", () => {
    chrome.scripting
      .executeScript({
        target: { tabId },
        func: setShorts,
      })
      .then(() => console.log("injected set function shorts"));
  });
});
