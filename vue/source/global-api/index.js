import { initMixin } from "../instance/init"

export function initGlobalAPI (Vue) {
    // ... 配置信息
    Vue.options._base = Vue
    // extend(Vue.options.components, builtInComponents)

    initUse(Vue)
    initMixin(Vue)
    
}