

export const emptyObject = Object.freeze({})
export function initRender(vm) {
	vm._vnode = null
	vm._staticTrees = null
	const options = vm.$options
	const parentVnode = vm.$vnode = options._parentVnode
	const renderContext = parentVnode && parentVnode.context
	vm.$slots = resolveSlots(options._renderChildren, renderContext)
	vm.$scopedSlots = emptyObject

}