/// <reference types="vite/client" />
//为 TypeScript 编译器提供关于 .vue 文件的类型定义
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

