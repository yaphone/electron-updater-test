<template>
  <div id="wrapper">
    <img id="logo" :src=logo alt="electron-vue">
    <main>
      <div class="left-side">
        <span class="title">
          Welcome to your new project!
        </span>
        <system-information></system-information>
        <button @click="updateCheck">升级检测</button>
        <div>
          {{ updateIinfo }}
        </div>
        <button @click="startUpdate">开始升级</button>
      </div>

      <div class="right-side">
        <div class="doc">
          <div class="title">Getting Started</div>
          <p>
            electron-vue comes packed with detailed documentation that covers everything from
            internal configurations, using the project structure, building your application,
            and so much more.
          </p>
          <button @click="open('https://simulatedgreg.gitbooks.io/electron-vue/content/')">Read the Docs</button><br><br>
        </div>
        <div class="doc">
          <div class="title alt">Other Documentation</div>
          <button class="alt" @click="open('https://electron.atom.io/docs/')">Electron</button>
          <button class="alt" @click="open('https://vuejs.org/v2/guide/')">Vue.js</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SystemInformation from './LandingPage/SystemInformation'
const { ipcRenderer } = require('electron')
import logo from '@/assets/logo.png'

export default {
  name: 'landing-page',
  components: { SystemInformation },
  data() {
    return {
      logo: logo,
      updateIinfo: ''
    }
  },
  mounted() {
    ipcRenderer.on('updateMsg', (type, data) => {
      switch (data) {
        case 0:
          this.updateIinfo = '正在检查更新'
          break
        case 1:
          this.updateIinfo = '检测到新版本，准备下载'
          break
        case 2:
          this.updateIinfo = '未检测到新版本'
          break
        case 3:
          this.updateIinfo = '下载中'
          break
        case 4:
          this.updateIinfo = '下载暂停'
          break
        case 5:
          this.updateIinfo = '下载暂停恢复'
          break
        case 6:
          this.updateIinfo = '下载完成'
          break
        case 7:
          this.updateIinfo = '下载失败'
          break
        case 8:
          this.updateIinfo = '取消下载'
          break
      }
    })
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link)
    },
    updateCheck() {
      ipcRenderer.send('checkUpdate')
    },
    startUpdate() {
      ipcRenderer.send('updateStart')
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
