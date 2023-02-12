import 'v8-compile-cache';
import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  dialog,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
  nativeImage,
  shell,
  Tray,
} from 'electron';
import { writeFileSync } from 'fs';
import { join, resolve } from 'path';
import * as bytenode from 'bytenode';
import { ChildProcess, fork } from 'child_process';
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('codedesktop', process.execPath, [
      resolve(process.argv[1]),
    ]);
  }
} else {
  app.setAsDefaultProtocolClient('codedesktop');
}
const isMac = process.platform === 'darwin';
let mainWindow: BrowserWindow;
const nestServerList: ChildProcess[] = [];
const setting = {
  quit: false,
};
const createMenu = () => {
  const template: (MenuItemConstructorOptions | MenuItem)[] = [
    {
      role: 'help',
      label: '帮助中心',
      submenu: [
        {
          label: '我的主页',
          click: async () => {
            await shell.openExternal('https://space.bilibili.com/388985971');
          },
        },
      ],
    },
  ];

  if (isMac) {
    template.unshift({
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    });
  }
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
const createTray = () => {
  const icon = nativeImage.createFromPath(
    resolve(__dirname, '..', '..', 'favicon_256.ico'),
  );
  const tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      click: () => {
        setting.quit = true;
        if (process.platform !== 'darwin') {
          app.quit();
        } else {
          app.exit();
        }
      },
    },
  ]);
  tray.setToolTip('最爱白菜吖<1355081829@qq.com>');
  tray.setTitle('electron-nest-react');
  tray.on('click', () => {
    mainWindow.show();
  });
  tray.on('right-click', () => {
    tray.setContextMenu(contextMenu);
  });
};
const createWindow = function () {
  const config: BrowserWindowConstructorOptions = {
    width: 800,
    height: 600,
    fullscreenable: true,
    fullscreen: false,
    resizable: true,
    maximizable: true,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      contextIsolation: false,
      webviewTag: true,
      spellcheck: false,
      disableHtmlFullscreenWindowResize: true,
    },
    backgroundColor: '#F5F5F5',
    show: process.env.NODE_ENV !== 'building',
    icon: join(__dirname, 'favicon_256.ico'),
  };

  mainWindow = new BrowserWindow(config);

  if (process.argv[2]) {
    mainWindow.webContents.openDevTools({ mode: 'bottom' });
    mainWindow.loadURL(process.argv[2]);
  } else {
    mainWindow.loadURL(`file://${join(__dirname, '..', 'view', 'index.html')}`);
  }
  if (app.isPackaged) {
    createServer();
    mainWindow.on('close', function (e: Event) {
      if (!setting.quit) {
        e.preventDefault();
        mainWindow.hide();
      } else {
        mainWindow = null;
        app.quit();
      }
    });
  }
};
function createServer() {
  nestServerList.push(
    fork(resolve(__dirname, '..', 'server', 'main.js'), ['--subprocess']),
  );
}
function encryptFile() {
  // 加密electron入口文件
  bytenode.compileFile({
    filename: __dirname + '/main.cjs',
    output: __dirname + '/main.jsc',
  });
  const tpl = `require('bytenode');
require(__dirname + '/main.jsc');`;
  writeFileSync(__dirname + '/main.cjs', tpl);

  // api不能加密，有问题，后面再想办法

  // 加密 nestAdmin文件
  const nestAdmin = resolve(__dirname, '..', 'server');
  bytenode.compileFile({
    filename: nestAdmin + '/main.js',
    output: nestAdmin + '/main.jsc',
  });
  writeFileSync(nestAdmin + '/main.js', tpl);

  // 告诉编译插件加密完成，插件收到消息开始打包
  process.send('加密完成');
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 用户正在尝试运行第二个实例，我们需要让焦点指向我们的窗口
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      if (!mainWindow.isVisible()) {
        mainWindow.show();
      }
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    createTray();
    createMenu();
    createWindow();
    if (process.env.NODE_ENV === 'building') {
      encryptFile();
    }
  });
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  app.on('before-quit', () => {
    // 关闭所有的web服务
    nestServerList.forEach((nestServer) => {
      nestServer.kill();
    });
  });
  // 处理协议。 在本例中，我们选择显示一个错误提示对话框。
  app.on('open-url', (event, url) => {
    dialog.showErrorBox('欢迎回来', `导向自: ${url}`);
  });
}
