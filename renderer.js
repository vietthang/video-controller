// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { dialog, BrowserWindow, screen } = require("electron").remote;
const url = require("url");
const path = require("path");

document.querySelector("#select-video-input").addEventListener("click", () =>
  dialog
    .showOpenDialog({
      filters: [
        {
          extensions: [".mp4"]
        }
      ],
      properties: ["openFile"]
    })
    .then(({ canceled, filePaths }) => {
      if (canceled) {
        return;
      }
      if (!filePaths.length) {
        alert("invalid file pick");
        return;
      }

      const mainDisplay = screen.getPrimaryDisplay();

      const rendererWindow = new BrowserWindow({
        x: mainDisplay.x + mainDisplay.width,
        y: 0,
        width: 1920 * 2,
        height: 1080,
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
        url.pathToFileURL(filePaths[0]).toString()
      );
      rendererWindow.loadURL(rendererUrl.toString());
      rendererWindow.webContents.openDevTools();
    })
    .catch(error => console.error("error", error))
);
