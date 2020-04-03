
import { initProxy } from "./proxy"
import { initState } from "./state"
import { initLifecycle,callHook } from "./lifecycle"
import { initEvents } from "./events"
import { initRender } from "./render"
import { initProvide, initInjections } from "./inject"

let uid = 0

export function initMixin(Vue) {
	Vue.prototype._init = function(options) {
		const vm = this
		vm._uid = uid++
		vm._isVue = true

		if(options && options._isComponent) {
			initInternalCompnent(vm, options)
		}else {
			vm.$options = mergeOptions ( 
				resolveConstructorOptions(vm.constructor),
				options || {},
				vm
			)
		}

		if(ProcessingInstruction.env.NODE_ENV !== 'production'){
			initProxy(vm) //目的就是 vm._renderProxy = vm
		}else {
			vm._renderProxy = vm
		}

		vm._self = vm
		initLifecycle(vm)
		initEvents(vm)
		initRender(vm)
		callHook(vm, 'beforeCreate')
		initInjections(vm)
		initState(vm)
		initProvide(vm)
		callHook(vm, 'created')
	}
}