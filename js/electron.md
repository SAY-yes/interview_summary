# 一、index.html
    <script>
        const {ipcRenderer} = require('electron')

        var electronUtil = {};
        electronUtil.getSocketInfo = function(){
            ipcRenderer.send('require-config')
        }

        ipcRenderer.on('config-reply', (event, arg) => {
            console.log("rpcScoket 配置信息: ",arg) 
            if(electronUtil.getSocketInfoCallBack){
                electronUtil.getSocketInfoCallBack(arg);
            }
        })
    </script>
# 二、websocket.js
    let electronUtil = window["electronUtil"];
    if (electronUtil) {
        electronUtil.getSocketInfo();
    }

    let rpcService;
    electronUtil.getSocketInfoCallBack = function (args) {
        console_log("rpcService的配置信息：",args)
        rpcService = new Html5RPCService('ws://' + args.socketIp + ':' + args.port + '/wslookup' + '/websocket', function (data) {
            console_log('rpcSocket sucess')
        }, function(err){
            console_log('rpcSocket failure')
        })
    }
# 三、index.js
    const {app, globalShortcut,BrowserWindow} = require('electron')
    const path = require('path')
    const url = require('url')
    const fs = require('fs')

    // 读取json文件
    const configFilePath = path.join(__dirname, 'config.json');
    const configStr = fs.readFileSync(configFilePath);
    var configJson = JSON.parse(configStr);
    const rpcSocket = configJson.rpcSocket;
    const port = configJson.port;

    // 与HTML通信，并返回参数
    ipcMain.on('require-config', (event) => {
        event.sender.send('config-reply', {"socketIp":rpcSocket.socketIp,"port":rpcSocket.port})
    })

    let win

    function createWindow () {
        // 创建浏览器窗口。
        win = new BrowserWindow({width: 800, height: 600, alwaysOnTop,fullscreen})

        // 设置全屏
        // win.setFullScreen(true);
        
        // 设置ESC退出
        // globalShortcut.register('ESC', () => {
        //     win.setFullScreen(false);
        // })

        // 然后加载应用的 index.html。
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'build/index.html'),
            protocol: 'file:',
            slashes: true
        }))

        // 打开开发者工具。
        win.webContents.openDevTools()
        
        win.maximize();
        // 当 window 被关闭，这个事件会被触发。
        win.on('closed', () => {
            // 删除文件
            // fs.unlink('./wfile.txt',function (err) {
            //   if(err) throw err;
            //   console.log('成功')
            // })
            // 取消引用 window 对象，如果你的应用支持多窗口的话，
            // 通常会把多个 window 对象存放在一个数组里面，
            // 与此同时，你应该删除相应的元素。
            win = null
        })
    }

    // Electron 会在初始化后并准备
    // 创建浏览器窗口时，调用这个函数。
    // 部分 API 在 ready 事件触发后才能使用。
    app.on('ready', createWindow)

    // 当全部窗口关闭时退出。
    app.on('window-all-closed', () => {
        // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
        // 否则绝大部分应用及其菜单栏会保持激活。
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    app.on('activate', () => {
        // 在macOS上，当单击dock图标并且没有其他窗口打开时，
        // 通常在应用程序中重新创建一个窗口。
        if (win === null) {
            createWindow()
        }
    })
