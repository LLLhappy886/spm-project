//关于layout组件相关的设置的仓库
import { defineStore } from "pinia";

let useLayoutSettingStore = defineStore('SettingStore',{
  state: () => {
    return {
      fold: false, //侧边栏折叠状态
      refresh: false, //页面刷新状态
      isFullScreen: false, //全屏状态
    }
  }
})

export default useLayoutSettingStore;