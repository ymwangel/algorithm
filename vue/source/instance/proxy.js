
function isNative(Ctor) {
	return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

export function initProxy (vm) {
	const hasProxy = 
		typeof Proxy !== undefined && isNative(Proxy)

	// .... 配置config操作


	if(hasProxy) {
		const options = vm.$options
		const handlers = options.render && options.render._withStripped
			? getHandler
			: hasHandler

			vm._renderProxy = new Proxy(vm, handlers)
	}else {
		vm._renderProxy = vm
	}
}

