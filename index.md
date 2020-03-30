### 1. Vue.use(plugins) 插件原理
https://www.jianshu.com/p/710fbbff15ba


```
export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
		// 判断 是否 重复安装 plugin 插件
		const installedPlugins = (this._installedPlugins) || (this._installedPlugins = [])
		if(installedPlugins.indexOf(plugin) > -1 ) {
				return this
		}
		
		const args = toArray(arguments, 1)
		// 把Vue 加入参数中
		args.unshift(this)
		if(typeof plugin.install === 'function') {
			// 如果组件是对象，且提供install方法，调用install方法将参数数组传入，改变'this'指针为该组件
			plugin.install.apply(plugin, args)
		}else if(typeof plugin === 'function') {
			// 如果传入组件是 函数，直接调用，此时的'this' 指针 为null
			plugin.apply(null, args)
		}

		installedPlugins.push(plugin)
		return this
	}
}

export function toArray (list: any, start?: number): Array<any> {
	start = start || 0
	let i = list.length - start
	const ret: Array<any> = new Array(i)
	while (i--) {
		ret[i] = list[i + start]
	}
	return ret
}
```

### 2. vue.mixin 源码解析

```
const strats = config.optionMergeStrategies //包含：methods、data、compnents、derective 等属性

const defaultStrat = function (parentVal: any, childVal: any): any {
  return childVal === undefined
    ? parentVal
    : childVal
}


export function initMixin (Vue:GlobalAPI) {
  Vue.mixin = function(mixin: Object) {
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}

export function mergeOptions (
	parent: Object,
	child: Object,
	vm?: Component
):Object {
	if(process.env.NODE_ENV !== 'production') {
		checkComponents(child)
	}

	if(typeof child === 'function') {
		child = child.options
	}
	normalizeProps(child, vm)
	normalizeInject(child, vm)
	normalizeDirectives(child)

	if(!child._base) {
		if(child.extends) {
			parent = mergeOptions(parent, child.extends, vm)
		}
		if(child.mixins) { // 判断child 有没有mixin，也就是 mixin 里面挂mixin的情况，如果有，递归进行合并
			for(let i=0;l<child.mixins.lneght;i<l,i++) {
				parent = mergeOptions(parent, child.mixins[i], vm)
			}
		}
	}

	const options = {}
	let key
	for(key in parent) { //先遍历parent 的key，调用 starts[xxx] 方法进行合并
		mergeField(key)
	}

	for(key in child) {
		if(!hasOwn(parent, key)) { // 如果parent已经处理过某个key，就不处理了
			mergeField(key) //处理child中的key
		}
	}

	function mergeField(key) {
		// 选项合并策略(Vue官网)：
		// 1.当组件和混入对象含有同名选项时，这些选项将以恰当的方式混合。比如：数据对象在内部会进行递归合并，在和组件的数据发生冲突时 以组件数据优先
		// 2. 值为对象的选项，例如：methods、components 和 directives，将被混合为 同一个对象。两个对象 key冲突时，取组件对象的 键值对
		const strat = strats[key] || defaultStart
		options[key] = strat(parent[key], child[key], vm, key)
	}

	return options
}
```


### 3. vue-router 源码解析
https://juejin.im/post/5b5697675188251b11097464

目前单页面使用的路由就只有两种模式：

  1. hash模式
  2. history 模式
    
    
第一步：Vue.use(VueRouter), 让VueRouter 让插件 可以使用vue， use源代码 在 第一问中 已提到。

第二步：install 函数第部分实现

```
Myplugin.install = function (Vue, options) {
	// 1. 添加全局方法或属性
	Vue.myGlobalMethod = function () {

	}
	// 2. 添加全局资源
	Vue.directive('my-directive', {
		bind(el, binding, vnode, oldVnode) {

		}
		...
	})
	// 3. 注入组件选项
	Vue.mixin( {
		created: function() {
			
		}
		...
	})
	// 4. 添加实例方法
	Vue.prototype.$mymethod = function (methodOptions) {

	}
}



export let _Vue
export function install (Vue) {
	// 避免重复安装
	if(install.installed && _Vue === Vue) return 
	install.installed = true
	_Vue = vue

	const isDef = v => v !== undefined
	const registerInstance = (vm, callVal) +> {
		let i = vim.$options._parentVnode
		if(isDef(i) && isDef(i = i.data) && isDef(i = i.registerInstance)) {
			i(vm, callVal)
		}
	}

	Vue.mixin({
		beforeCreate() {
			if(isDef(this.$options.router)) {
				this._routerRoot = this
				this._router = this.$options.router
				this._router.init(this)
				Vue.util.defineReactive(this, '_route', this._router.history.current)
			}else {
				this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
			}
			registerInstance(this)
		},
		destoryed() {
			registerInstance(this)
		}
	})

	Object.defineProperty(Vue.prototype, '$router', {
		get() {return this._routerRoot._router}
	})

	Object.defineProperty(Vue.prototype, '$route', {
		get() {return this._routerRoot._route}
	})

	Vue.component('RouterView', View)
	Vue.component('RouterLink', Link)
	
}
```



