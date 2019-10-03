// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { BrowserWindow, screen } = require("electron").remote;
const url = require("url");
const path = require("path");

const mainDisplay = screen.getPrimaryDisplay();
document.querySelector("#input-x").value =
  mainDisplay.bounds.x + mainDisplay.bounds.width;
document.querySelector("#input-y").value = 0;
document.querySelector("#input-w").value = 1920 * 2;
document.querySelector("#input-h").value = 1080;

document.querySelector("#setup-form").addEventListener("submit", evt => {
  evt.preventDefault();
  evt.stopPropagation();

  const videoPath = document.querySelector("#input-video").files[0].path;
  const x = +document.querySelector("#input-x").value;
  const y = +document.querySelector("#input-y").value;
  const w = +document.querySelector("#input-w").value;
  const h = +document.querySelector("#input-h").value;

  const rendererWindow = new BrowserWindow({
    x,
    y,
    width: w,
    height: h,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false
  });
  const rendererUrl = url.pathToFileURL(
    path.resolve(__dirname, "renderer", "index.html")
  );
  rendererUrl.searchParams.append(
    "videoUrl",
    url.pathToFileURL(videoPath).toString()
  );
  rendererUrl.searchParams.append("x", x);
  rendererUrl.searchParams.append("y", y);
  rendererUrl.searchParams.append("w", w);
  rendererUrl.searchParams.append("h", h);
  rendererWindow.loadURL(rendererUrl.toString());
});

// document.querySelector("#select-video-input").addEventListener("click", () =>
//   dialog
//     .showOpenDialog({
//       filters: [
//         {
//           extensions: [".mp4"]
//         }
//       ],
//       properties: ["openFile"]
//     })
//     .then(({ canceled, filePaths }) => {
//       if (canceled) {
//         return;
//       }
//       if (!filePaths.length) {
//         alert("invalid file pick");
//         return;
//       }

//       const mainDisplay = screen.getPrimaryDisplay();

//       const rendererWindow = new BrowserWindow({
//         x: mainDisplay.x + mainDisplay.width,
//         y: 0,
//         width: 1920 * 2,
//         height: 1080,
//         webPreferences: {
//           nodeIntegration: true
//         },
//         frame: false
//       });
//       const rendererUrl = url.pathToFileURL(
//         path.resolve(__dirname, "renderer", "index.html")
//       );
//       rendererUrl.searchParams.append(
//         "videoUrl",
//         url.pathToFileURL(filePaths[0]).toString()
//       );
//       rendererWindow.loadURL(rendererUrl.toString());
//     })
//     .catch(error => console.error("error", error))
// );
