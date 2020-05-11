import { autoUpdater } from 'electron-updater'

/**
 * -1 检查更新失败 0 正在检查更新 1 检测到新版本，准备下载 2 未检测到新版本 3 下载中 4 下载暂停 5 下载暂停恢复 6 下载完成 7 下载失败 8 取消下载
 * */
class Update {
  mainWindow
  constructor(mainWindow) {
    this.mainWindow = mainWindow
    autoUpdater.setFeedURL('http://127.0.0.1/file/version')
    this.error()
    this.start()
    this.allow()
    this.unallowed()
    this.listen()
    this.download()
  }

  sendMsg(data) {
    console.log('=======' + data + '=========')
    this.mainWindow.webContents.send('updateMsg', data)
  }

  error() { // 当更新发生错误的时候触发
    autoUpdater.on('error', () => {
      this.sendMsg(-1)
    })
  }

  start() { // 当开始检查更新的时候触发
    autoUpdater.on('checking-for-update', () => {
      this.sendMsg(0)
    })
  }

  allow() { // 发现可更新数据时
    autoUpdater.on('update-available', () => {
      this.sendMsg(1)
    })
  }

  unallowed() { // 没有可更新数据时
    autoUpdater.on('update-not-avaliable', () => {
      this.sendMsg(2)
    })
  }

  listen() { // 下载监听
    autoUpdater.on('download-progress', (progressObj) => {
      let log_message = 'Download speed: ' + progressObj.bytesPerSecond
      log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
      log_message = log_message + ' (' + progressObj.transferred + '/' + progressObj.total + ')'
      console.log(log_message)
      this.sendMsg(log_message)
    })
  }

  download() { // 下载完成
    autoUpdater.on('update-downloaded', () => {
      this.sendMsg(6)
      // setTimeout(() => {
      //   autoUpdater.quitAndInstall()
      // }, 1000)
    })
  }

  startdate() {
    autoUpdater.quitAndInstall()
  }

  load() { // 触发器
    autoUpdater.checkForUpdates()
  }
}

export default Update
