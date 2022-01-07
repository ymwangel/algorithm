
import { initProxy } from "./proxy"
import { initState } from "./state"
import { initLifecycle,callHook } from "./lifecycle"
import { initEvents } from "./events"
import { initRender } from "./render"
import { initProvide, initInjections } from "./inject"
import { extend, mergeOptions, formatComponentName } from '../util/index'
// mergeOptions: ../util/options.js

let uid = 0

export function resolveConstructorOptions (Ctor: Class<Component>) {
	let options = Ctor.options
	if (Ctor.super) {
	  const superOptions = resolveConstructorOptions(Ctor.super)
	  const cachedSuperOptions = Ctor.superOptions
	  if (superOptions !== cachedSuperOptions) {
		// super option changed,
		// need to resolve new options.
		Ctor.superOptions = superOptions
		// check if there are any late-modified/attached options (#4976)
		const modifiedOptions = resolveModifiedOptions(Ctor)
		// update base extend options
		if (modifiedOptions) {
		  extend(Ctor.extendOptions, modifiedOptions)
		}
		options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
		if (options.name) {
		  options.components[options.name] = Ctor
		}
	  }
	}
	return options
  }

export function initMixin(Vue) {
	Vue.prototype._init = function(options) {
		const vm = this
		vm._uid = uid++
		vm._isVue = true

		if(options && options._isComponent) {
			initInternalCompnent(vm, options)
		}else {
			// 
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