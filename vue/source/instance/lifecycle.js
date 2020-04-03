

export function initLifecycle (vm) {
    const options = vm.$options

    let parent = options.parent
    // ....

    vm.$parent = parent
    vm.$root = parent ? parent.$root : vm
    
    vm.$children = []
    vm.$refs = {}

    vm._watcher = null
    vm._inactive = null
    vm._directInavtive = null
    vm._isMounted = false
    vm._isDestroyed = false
    vm._isBeingDestroyed = false
}

export function callHook () {

}