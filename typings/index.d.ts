/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />


declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
import history from 'history';

/* eslint-disable @typescript-eslint/no-explicit-any */
// declare namespace screenfull {
//     // 定义基本使用的类型
//     type enabled = boolean;
//     type isEnabled = boolean;

//     type toggle = any;
// }
// export =screenfull

// 定义 jQuery 需要用到的类型命名空间
// declare namespace screenfull {
//     // 定义基本使用的类型
//     type Selector = string;
//     type TypeOrArray<T> = T | T[];
//     type htmlString = string;
// }

// // 定义 jQuery 接口，jquery 是一个 包含 Element 的集合
// interface screenfull {
//     toggle(): void
//     enabled: boolean
//     isEnabled: boolean

// }

// // 对模块 jquery 输出接口
// declare module 'screenfull' {
//     // module 中要使用 export = 而不是 export default
//     export = screenfull;
// }

// declare module "jquery" {
//     export = $;
// }


declare global {
  interface Window {
    type: any,
    deepClone: any,
    webkitStorageInfo: any
  }
  interface SelectInterFace {
    key: string | undefined;
    value: any;
  }
  interface RouteModel {
    path: string;
    component?: any;
    auth?: string[];
    childRoutes?: RouteModel[];
    redirect?: string;
    name?: string;
    isExact?: boolean;
  }
  interface MenuItem {
    name?: string,
    path?: string,
    icon?: string
  }
}
declare module '*.scss' { const content: any; export default content; }

declare module 'history' {
  export interface BrowserHistory {
    multipageRoute: any
  }
} 
