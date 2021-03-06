/**
* Player v1.0.0
* (c) 2015 switer
* Released under the MIT License.
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Player"] = factory();
	else
		root["Player"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';


	window.Real = __webpack_require__(1)

	function noop () {}
	function _getRoot() {
		var root = this._$root
		if (!root) {
			root = this._$root = this.$root()
		}
		return root
	}
	Real.prototype.$listen = function () {
		var root = _getRoot.call(this)
		var emitter = root ? root.$message() : null
		if (emitter) {
			return emitter.on.apply(emitter, arguments)
		}
		return noop
	}
	Real.prototype.$unlisten = function () {
		var root = _getRoot.call(this)
		var emitter = root ? root.$message() : null
		emitter && emitter.off.apply(emitter, arguments)
		return this
	}
	Real.prototype.$notify = function () {
		var root = _getRoot.call(this)
		var emitter = root ? root.$message() : null
		emitter && emitter.emit.apply(emitter, arguments)
		return this
	}
	module.exports = __webpack_require__(2)

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* Real v1.2.3
	* (c) 2015 switer
	* Released under the MIT License.
	*/
	(function webpackUniversalModuleDefinition(root, factory) {
	    if(true)
	        module.exports = factory();
	    else if(typeof define === 'function' && define.amd)
	        define(factory);
	    else if(typeof exports === 'object')
	        exports["Reve"] = factory();
	    else
	        root["Reve"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/    // The module cache
	/******/    var installedModules = {};

	/******/    // The require function
	/******/    function __webpack_require__(moduleId) {

	/******/        // Check if module is in cache
	/******/        if(installedModules[moduleId])
	/******/            return installedModules[moduleId].exports;

	/******/        // Create a new module (and put it into the cache)
	/******/        var module = installedModules[moduleId] = {
	/******/            exports: {},
	/******/            id: moduleId,
	/******/            loaded: false
	/******/        };

	/******/        // Execute the module function
	/******/        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/        // Flag the module as loaded
	/******/        module.loaded = true;

	/******/        // Return the exports of the module
	/******/        return module.exports;
	/******/    }


	/******/    // expose the modules object (__webpack_modules__)
	/******/    __webpack_require__.m = modules;

	/******/    // expose the module cache
	/******/    __webpack_require__.c = installedModules;

	/******/    // __webpack_public_path__
	/******/    __webpack_require__.p = "";

	/******/    // Load entry module and return exports
	/******/    return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

	    'use strict';

	    var util = __webpack_require__(1)
	    var conf = __webpack_require__(2)
	    var is = __webpack_require__(3)
	    var Query = __webpack_require__(4)
	    var consoler = __webpack_require__(5)
	    var buildInDirectives = __webpack_require__(6)
	    var Expression = __webpack_require__(8)
	    var supportQuerySelector = __webpack_require__(9).supportQuerySelector
	    var _execute = __webpack_require__(10)
	    var _components = {}
	    var _globalDirectives = {}
	    var _isExpr = Expression.isExpr
	    var _strip = Expression.strip
	    var _did = 0
	    var _diff = function () {
	        return util.diff.apply(util, arguments)
	    }

	    /**
	     * Constructor Function and Class.
	     * @param {Object} options Instance options
	     * @return {Object} Reve component instance
	     */
	    function Reve(options) {
	        var vm = this
	        var NS = conf.namespace
	        var _ready = options.ready
	        var _created = options.created
	        var _shouldUpdate = options.shouldUpdate
	        var $directives = this.$directives = []
	        var $components = this.$components = []
	        var $parent = this.$parent = options.parent || null

	        this.$update = function () {
	            // should update return false will stop UI update
	            if (_shouldUpdate && _shouldUpdate.apply(vm, arguments) === false) return
	            // update child components
	            util.forEach($components, function (c) {
	                c.$update()
	            })
	            // update directive of the VM
	            util.forEach($directives, function (d) {
	                d.$update()
	            })
	        }

	        var el = options.el
	        /**
	         *  Mounted element detect
	         */
	        if (el && options.template) {
	            var hasReplaceOption = _hasAttribute(el, NS + 'replace')
	                ? _getAttribute(el, NS + 'replace') == 'true'
	                : options.replace

	            if (hasReplaceOption && el.parentNode) {
	                var child = _fragmentWrap(options.template)
	                if (!child.children.length) throw new Error('Component with \'' + NS + 'replace\' must has a child element of template.', options.template)
	                var nextEl =child.children[0]
	                var parent = el.parentNode
	                parent.replaceChild(nextEl, el)
	                _cloneArributes(el, nextEl)
	                el = nextEl
	            } else {
	                if (hasReplaceOption && !el.parentNode) {
	                    consoler.warn('Invalid element with \'' + NS + 'replace\' option.', el)
	                }
	                el.innerHTML = options.template
	            }
	        } else if (options.template) {
	            if (options.replace) {
	                el = _fragmentWrap(options.template).children[0]
	                !el && consoler.warn('Component\'s template should has a child element when using \'replace\' option.', options.template)
	            }
	            if (!el) {
	                el = document.createElement('div')
	                el.innerHTML = options.template
	            }
	        } else if (util.type(el) == 'string') {
	            var sel = el
	            if (supportQuerySelector)
	                el = document.querySelector(sel)
	            else if (/^\./.test(sel)) {
	                el = _getElementsByClassName(sel.replace(/^\./, ''))
	                el && (el = el[0])
	            }
	            else if (/^#/.test(sel))
	                el = document.getElementById(sel.replace(/^#/, ''))
	            else el = null
	            if (!el) return consoler.error('Can\'t not found element by selector "' + sel + '"')
	        } else if (!is.Element(el)) {
	            throw new Error('Unmatch el option')
	        }
	        if ($parent && el.parentNode !== $parent.$el) {
	            $parent.$el.appendChild(el)
	        }

	        this.$el = el
	        this.$methods = {}
	        this.$data = (util.type(options.data) == 'function' ? options.data():options.data) || {}
	        this.$refs = {}

	        util.objEach(options.methods, function (key, m) {
	            vm.$methods[key] = vm[key] =util.bind(m, vm)
	        })

	        _created && _created.call(vm)

	        this.$compile(el)
	        _ready && _ready.call(vm)
	    }
	    /**
	     * Get root component instance of the ViewModel
	     */
	    Reve.prototype.$root = function () {
	        var parent = this
	        while(parent.$parent) {
	            parent = parent.$parent 
	        }
	        return parent || null
	    }
	    /**
	     * Compile all directives of the HTMLElement or HTML template in current ViewModel. 
	     * It's useful when load something async then append to current ViewModel's DOM Tree.
	     * @param  {Element} | {String} el The HTMLElement of HTML template need to compile
	     * @return {Element} | {DocumentFragment}
	     */
	    Reve.prototype.$compile = function (el) {
	        if (util.type(el) == 'string') el = _fragmentWrap(el)

	        var NS = conf.namespace
	        var $directives = this.$directives
	        var $components = this.$components
	        var componentDec = NS + 'component'
	        var componentSel = '[' + componentDec + ']'
	        var vm = this
	        // compile directives of the VM
	        var _diretives = util.extend({}, buildInDirectives, _globalDirectives)
	        var attSels = util.keys(_diretives)
	        var querySelectorAll = Query(el, componentDec, util.map(attSels, function (sel) {
	                return conf.namespace + sel
	            }))
	        if (supportQuerySelector) {
	            // nested component
	            var grandChilds = util.slice(el.querySelectorAll(componentSel + ' ' + componentSel))
	        }
	        var childs = util.slice(querySelectorAll(componentSel))

	        // compile components
	        util.forEach(childs, util.bind(function (tar) {
	            // prevent cross level component parse and repeat parse
	            if (tar._component) return
	            if (supportQuerySelector && ~util.indexOf(grandChilds, tar)) return

	            var cname = _getAttribute(tar, componentDec)
	            if (!cname) {
	                return consoler.error(componentDec + ' missing component id.')
	            }
	            var Component = _components[cname]
	            if (!Component) {
	                return consoler.error('Component \'' + cname + '\' not found.')
	            }

	            var refid = _getAttribute(tar, NS + 'ref')
	            var cdata = _getAttribute(tar, NS + 'data')
	            var cmethods = _getAttribute(tar, NS + 'methods')
	            var data = {}
	            var methods = {}

	            // remove 'r-component' attribute
	            _removeAttribute(tar, componentDec)

	            util.forEach(['ref','data', 'methods'], function (a) {
	                _removeAttribute(tar, NS + a)
	            })

	            if (cdata) {
	                data = _execLiteral(cdata, this, NS + 'data')            
	            }
	            if (cmethods) {
	                methods = _execLiteral(cmethods, this, NS + 'methods')
	            }
	            tar._component = componentDec
	            
	            var c = new Component({
	                el: tar,
	                data: data,
	                parent: vm,
	                methods: methods
	            })
	            if (refid) {
	                this.$refs[refid] = c
	            }
	            /**
	             * Hook component instance update method, sync passing data before update.
	             * @type {[type]}
	             */
	            var _$update = c.$update
	            c.$update = function () {
	                cdata && util.extend(c.$data, _execLiteral(cdata, vm))
	                _$update.apply(c, arguments)
	            }
	            $components.push(c)

	        }, this))

	        util.forEach(util.keys(_diretives), function (dname) {

	            var def = _diretives[dname]
	            dname = NS + dname
	            var bindingDrts = util.slice(querySelectorAll('[' + dname + ']'))
	            // compile directive of container 
	            if (_hasAttribute(el, dname)) bindingDrts.unshift(el)

	            util.forEach(bindingDrts, function (tar) {

	                var drefs = tar._diretives || []
	                var expr = _getAttribute(tar, dname) || ''
	                // prevent repetitive binding
	                if (drefs && ~util.indexOf(drefs, dname)) return
	                _removeAttribute(tar, dname)

	                var sep = conf.directiveSep
	                var d
	                if (def.multi && expr.match(sep)) {
	                    // multiple defines expression parse
	                    util.forEach(
	                        _strip(expr).split(sep), 
	                        function(item) {
	                            // discard empty expression 
	                            if (!util.trim(item)) return
	                            d = new Directive(vm, tar, def, dname, '{' + item + '}')
	                        })
	                } else {
	                    d = new Directive(vm, tar, def, dname, expr)
	                }
	                $directives.push(d)
	                drefs.push(dname)
	                tar._diretives = drefs
	            })
	        })

	        return el
	    }
	    /**
	     * Append child ViewModel to parent VideModel
	     * @param  {Reve} parent            Parent container ViewModel
	     * @param  {Function} appendHandler Custom append function
	     */
	    Reve.prototype.$appendTo = function (parent, appendHandler) {
	        if (!parent || !parent.$el) 
	            throw new Error('Unvalid parent viewmodel instance.')

	        this.$parent = parent
	        appendHandler = appendHandler || function (currNode, parentNode) {
	            parentNode.appendChild(currNode)
	        }
	        appendHandler.call(this, this.$el, parent.$el)
	    }
	    /**
	     * Create Reve subc-lass that inherit Reve
	     * @param {Object} options Reve instance options
	     * @return {Function} sub-lass of Reve
	     */
	    function Ctor (options) {
	        var baseMethods = options.methods
	        function Class (opts) {
	            var baseData = options.data ? options.data() : {}
	            var instanOpts = util.extend({}, options, opts)
	            util.type(instanOpts.data) == 'function' && (instanOpts.data = instanOpts.data())  
	            instanOpts.methods = util.extend({}, baseMethods, instanOpts.methods)
	            instanOpts.data = util.extend({}, baseData, instanOpts.data)
	            Reve.call(this, instanOpts)
	        }
	        Class.prototype = Reve.prototype
	        return Class
	    }
	    Reve.create = function (options) {
	        return Ctor(options)
	    }
	    Reve.component = function (id, options) {
	        var c = Ctor(options)
	        _components[id] = c
	        return c
	    }
	    Reve.directive = function (id, def) {
	        _globalDirectives[id] = def
	    }

	    /**
	     * Abstract direcitve
	     * @param {Reve}    vm      Reve instance
	     * @param {Element} tar     Target DOM of the direcitve
	     * @param {Object}  def     Directive definition
	     * @param {String}  name    Attribute name of the directive
	     * @param {String}  expr    Attribute value of the directive
	     */
	    function Directive(vm, tar, def, name, expr) {
	        var d = this
	        var bindParams = []
	        var isExpr = !!_isExpr(expr)

	        isExpr && (expr = _strip(expr))

	        if (def.multi) {
	            // extract key and expr from "key: expression" format
	            var key
	            var keyRE = /^[^:]+:/
	            if (!keyRE.test(expr)) {
	                return consoler.error('Invalid expression of "{' + expr + '}", it should be in this format: ' + name + '="{ key: expression }".')
	            }
	            expr = expr.replace(keyRE, function(m) {
	                key = util.trim(m.replace(/:$/, ''))
	                return ''
	            })
	            expr = util.trim(expr)

	            bindParams.push(key)
	        }

	        d.$el = tar
	        d.$vm = vm
	        d.$id = _did++
	        d.$expr = expr
	        d.$name = name

	        var bind = def.bind
	        var upda = def.update
	        var shouldUpdate = def.shouldUpdate
	        var prev

	        // set properties
	        util.objEach(def, function(k, v) {
	            d[k] = v
	        })

	        /**
	         *  execute wrap with directive name and current VM
	         */
	        var _exec = this.$exec = function (expr) {
	            return _execute(vm, expr, name)
	        }
	        this.$diff = _diff
	        /**
	         *  update handler
	         */
	        function _update() {
	            // empty expression
	            if (!expr) {
	                if (shouldUpdate && shouldUpdate.call(d)) upda && upda.call(d)
	                return
	            }

	            var nexv = _exec(expr) // [error, result]
	            if (!nexv[0]) {
	                if (!shouldUpdate && !util.diff(nexv[1], prev)) {
	                    return false
	                } else if (shouldUpdate && !shouldUpdate.call(d, nexv[1], prev)) {
	                    return false
	                }
	                var p = prev
	                prev = nexv[1]
	                upda && upda.call(d, nexv[1], p, {})
	            }
	        }

	        /**
	         *  If expression is a string iteral, use it as value
	         */
	        var hasError
	        if (isExpr) {
	            prev =  _exec(expr)
	            hasError = prev[0]
	            prev = prev[1]
	        } else {
	            prev = expr
	        }
	        bindParams.push(prev)
	        bindParams.push(expr)
	        d.$update = _update

	        // ([property-name], expression-value, expression) 
	        bind && bind.apply(d, bindParams, expr)
	        // error will stop update
	        !hasError && upda && upda.call(d, prev)
	    }

	    function _execLiteral (expr, vm, name) {
	        if (!_isExpr(expr)) return {}
	        var r = _execute(vm, expr.replace(new RegExp(conf.directiveSep, 'g'), ',').replace(/,\s*}$/, '}'), name) 
	        return r[0] ? {} : r[1]
	    }
	    function _getAttribute (el, an) {
	        return el && el.getAttribute(an)
	    }
	    function _hasAttribute (el, an) {
	        if (el.hasAttribute) return el.hasAttribute(an)
	        return el.getAttribute(an) !== null
	    }
	    function _removeAttribute (el, an) {
	        return el && el.removeAttribute(an)
	    }
	    function _cloneArributes(el, target) {
	        var attrs = util.slice(el.attributes)
	        util.forEach(attrs, function (att) {
	            if (att.name == 'class') {
	                target.className = target.className + (target.className ? ' ' : '') + att.value
	            } else {
	                target[att.name] = att.value
	            }
	        })
	        return target
	    }
	    function _fragmentWrap (html) {
	        var div = document.createElement('div')
	        var frag = document.createDocumentFragment();
	        div.innerHTML = html
	        var children = div.childNodes;
	        while(children.length){
	            frag.appendChild(children[0]);
	        }
	        return frag
	    }
	    function _getElementsByClassName(className) {
	        if (document.getElementsByClassName) return document.getElementsByClassName(className)
	        else {
	            /**
	             * @author eikes
	             * @ref https://gist.github.com/eikes/2299607
	             */
	            var d = document, elements, pattern, i, results = []
	            if (d.querySelectorAll) { // IE8
	                return d.querySelectorAll("." + search)
	            }
	            if (d.evaluate) { // IE6, IE7
	                pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]"
	                elements = d.evaluate(pattern, d, null, 0, null)
	                while ((i = elements.iterateNext())) {
	                    results.push(i)
	                }
	            } else {
	                elements = d.getElementsByTagName("*")
	                pattern = new RegExp("(^|\\s)" + search + "(\\s|$)")
	                for (i = 0; i < elements.length; i++) {
	                    if ( pattern.test(elements[i].className) ) {
	                        results.push(elements[i])
	                    }
	                }
	            }
	            return results;
	        }
	    }

	    module.exports = Reve


	/***/ },
	/* 1 */
	/***/ function(module, exports) {

	    'use strict';

	    function hasOwn (obj, prop) {
	        return obj && obj.hasOwnProperty(prop)
	    }

	    var util = {
	        type: function(obj) {
	            return /\[object (\w+)\]/.exec(Object.prototype.toString.call(obj))[1].toLowerCase()
	        },
	        keys: function (obj) {
	            var keys = []
	            if (!obj) return keys
	            if (Object.keys) return Object.keys(obj)
	            this.objEach(obj, function (key) {
	                keys.push(key)
	            })
	            return keys
	        },
	        bind: function (fn, ctx) {
	            if (fn.bind) return fn.bind(ctx)
	            function bfn () {
	                fn.apply(ctx, arguments)
	            }
	            bfn.toString = function () {
	                return fn.toString()
	            }
	            return bfn
	        },
	        extend: function(obj) {
	            if (this.type(obj) != 'object') return obj;
	            var source, prop;
	            for (var i = 1, length = arguments.length; i < length; i++) {
	                source = arguments[i];
	                for (prop in source) {
	                    obj[prop] = source[prop];
	                }
	            }
	            return obj;
	        },
	        trim: function (str) {
	            if (str.trim) return str.trim()
	            else {
	                return str.replace(/^\s+|\s+$/gm, '')
	            }
	        },
	        indexOf: function (arr, tar) {
	            if (arr.indexOf) return arr.indexOf(tar)
	            else {
	                var i = -1
	                util.some(arr, function (item, index) {
	                    if (item === tar) {
	                        i = index
	                        return true
	                    }
	                })
	                return i
	            }
	        },
	        forEach: function (arr, fn) {
	            if (arr.forEach) return arr.forEach(fn)
	            else {
	                var len = arr.length
	                for (var i = 0 ; i < len; i++) {
	                    fn(arr[i], i)
	                }
	            }
	            return arr
	        },
	        some: function (arr, fn) {
	            if (arr.forEach) return arr.some(fn)
	            else {
	                var len = arr.length
	                var r = false
	                for (var i = 0 ; i < len; i++) {
	                    if (fn(arr[i], i)) {
	                        r = true
	                        break
	                    }
	                }
	            }
	            return r
	        },
	        map: function (arr, fn) {
	            if (arr.map) return arr.map(fn)
	            else {
	                var len = arr.length
	                var next = []
	                for (var i = 0 ; i < len; i++) {
	                    next.push(fn(arr[i], i))
	                }
	                return next
	            }
	        },
	        objEach: function (obj, fn) {
	            if (!obj) return
	            for(var key in obj) {
	                if (hasOwn(obj, key)) {
	                    if(fn(key, obj[key]) === false) break
	                }
	            }
	        },
	        immutable: function (obj) {
	            var that = this
	            var _t = this.type(obj)
	            var n

	            if (_t == 'array') {
	                n = obj.map(function (item) {
	                    return that.immutable(item)
	                })
	            } else if (_t == 'object') {
	                n = {}
	                this.objEach(obj, function (k, v) {
	                    n[k] = that.immutable(v)
	                })
	            } else {
	                n = obj
	            }
	            return n
	        },
	        diff: function(next, pre, _t) {
	            var that = this
	            // defult max 4 level        
	            _t = _t == undefined ? 4 : _t

	            if (_t <= 0) return next !== pre

	            if (this.type(next) == 'array' && this.type(pre) == 'array') {
	                if (next.length !== pre.length) return true
	                return util.some(next, function(item, index) {
	                    return that.diff(item, pre[index], _t - 1)
	                })
	            } else if (this.type(next) == 'object' && this.type(pre) == 'object') {
	                var nkeys = util.keys(next)
	                var pkeys = util.keys(pre)
	                if (nkeys.length != pkeys.length) return true

	                var that = this
	                return util.some(nkeys, function(k) {
	                    return (!~util.indexOf(pkeys, k)) || that.diff(next[k], pre[k], _t - 1)
	                })
	            }
	            return next !== pre
	        },
	        slice: function (a) {
	            if (!a || !a.length) return []
	            var len = a.length
	            var next = []
	            for (var i = 0; i < len; i ++) {
	                next.push(a[i])
	            }
	            return next
	        },
	        walk: function(node, fn) {
	            var into = fn(node) !== false
	            var that = this
	            if (into) {
	                var children = util.slice(node.childNodes)
	                util.forEach(children, function (i) {
	                    that.walk(i, fn)
	                })
	            }
	        },
	        isUndef: function (obj) {
	            return obj === void(0)
	        }
	    }

	    module.exports = util

	/***/ },
	/* 2 */
	/***/ function(module, exports) {

	    var conf = {
	        namespace: 'r-',
	        directiveSep: ';'
	    }

	    module.exports = conf

	/***/ },
	/* 3 */
	/***/ function(module, exports) {

	    'use strict';

	    module.exports = {
	        Element: function(el) {
	            // 1: ELEMENT_NODE, 11: DOCUMENT_FRAGMENT_NODE
	            return el && (el.nodeType == 1 || el.nodeType == 11)
	        },
	        DOM: function (el) {
	            // 8: COMMENT_NODE
	            return el && (this.Element(el) || el.nodeType == 8)
	        }
	    }

	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {

	    'use strict';

	    var util = __webpack_require__(1)
	    var is = __webpack_require__(3)
	    var supportQuerySelector = document.querySelector && document.querySelectorAll

	    function _hasAttribute (el, an) {
	        if (el.hasAttribute) return el.hasAttribute(an)
	        return el.getAttribute(an) !== null
	    }
	    module.exports = function (el, scopedSel, sels) {
	        if (!supportQuerySelector) {
	            var _elements = {}
	            util.walk(el, function (node) {
	                if (!is.Element(node)) return false
	                util.forEach(sels, function (sel) {
	                    if (_hasAttribute(node, sel)) {
	                        if (!_elements[sel]) _elements[sel] = []
	                        _elements[sel].push(node)
	                    }
	                })
	                if (_hasAttribute(node, scopedSel)) {
	                    if (!_elements[scopedSel]) _elements[scopedSel] = []
	                    _elements[scopedSel].push(node)
	                    return false
	                }
	                return true
	            })
	        }


	        return function (selector) {
	            if (supportQuerySelector) return el.querySelectorAll(selector)
	            selector = selector.match(/^\[(.+?)\]$/)[1]
	            return _elements[selector] || []
	        }
	    }

	/***/ },
	/* 5 */
	/***/ function(module, exports) {

	    'use strict';

	    var co = console
	    module.exports = {
	        log: function () {
	            co.log && co.log.apply(co, arguments)
	        },
	        error: function () {
	            (co.error || this.log).apply(co, arguments)
	        },
	        warn: function () {
	            (co.warn || this.log).apply(co, arguments)
	        },
	        info: function () {
	            (co.info || this.log).apply(co, arguments)
	        }
	    }

	/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {

	    /**
	     *  Global Build-in Directives
	     */

	    'use strict';

	    var $ = __webpack_require__(7)
	    var conf = __webpack_require__(2)
	    var util = __webpack_require__(1)
	    var consoler = __webpack_require__(5)
	    var Expression = __webpack_require__(8)

	    function noop () {}

	    module.exports = {
	        'attr': {
	            multi: true,
	            bind: function(attname) {
	                this.attname = attname
	                this._$el = $(this.$el)
	            },
	            update: function(next) {
	                if (util.isUndef(next)) {
	                    this._$el.removeAttr(this.attname)
	                } else {
	                    this._$el.attr(this.attname, next)
	                }
	            },
	            unbind: function () {
	                this._$el = null
	            }
	        },
	        'class': {
	            multi: true,
	            bind: function(className) {
	                this.className = className
	                this._$el = $(this.$el)
	            },
	            update: function(next) {
	                if (next) this._$el.addClass(this.className)
	                else this._$el.removeClass(this.className)
	            },
	            unbind: function () {
	                this._$el = null
	            }
	        },
	        'html': {
	            update: function(nextHTML) {
	                this.$el.innerHTML = util.isUndef(nextHTML) ? '' : nextHTML
	            }
	        },
	        'on': {
	            multi: true,
	            bind: function(evtType, handler, expression) {
	                this._expr = expression
	                this.type = evtType
	            },
	            update: function(handler) {
	                this.unbind()

	                var fn = handler
	                if (util.type(fn) !== 'function')
	                    return consoler.warn('"' + conf.namespace + 'on" only accept function. {' + this._expr + '}')

	                // this.fn = util.bind(fn, this.$vm)
	                var that = this
	                this.fn = function (e) {
	                    e.$currentTarget = that.$el
	                    fn.call(that.$vm, e)
	                }
	                $(this.$el).on(this.type, this.fn, false)

	            },
	            unbind: function() {
	                if (this.fn) {
	                    $(this.$el).off(this.type, this.fn)
	                    this.fn = null
	                }
	            }
	        },
	        'show': {
	            update: function(next) {
	                this.$el.style.display = next ? '' : 'none'
	            }
	        },
	        'style': {
	            multi: true,
	            bind: function(sheet) {
	                this.sheet = sheet
	            },
	            update: function(next) {
	                this.$el.style && (this.$el.style[this.sheet] = next)
	            }
	        },
	        'text': {
	            bind: function () {
	                var reg = Expression.exprRegexp
	                var expr = this.expr = this.$el.innerHTML
	                var veilExpr = Expression.veil(expr)
	                var expressions = this.expressions = util.map(veilExpr.match(reg), function (exp) {
	                    return Expression.strip(exp)
	                })
	                var parts = veilExpr.split(reg)
	                var cache = this.cache = new Array(expressions.length)
	                var that = this

	                var $textNode = this.textNode = new Text()
	                this.render = function () {
	                    // set value
	                    util.forEach(expressions, function(exp, index) {
	                        var v = that.$exec(exp)
	                        if (!v[0]) cache[index] = v[1]
	                    })
	                    // get content
	                    var frags = []
	                    util.forEach(parts, function(item, index) {
	                        frags.push(item)
	                        if (index < expressions.length) {
	                            frags.push(cache[index])
	                        }
	                    })
	                    // TODO, Number Mobile bug, trying to using replaceChild
	                    $textNode.nodeValue = Expression.unveil(frags.join(''))
	                }

	                var pn = this.$el.parentNode
	                if (pn) {
	                    pn.replaceChild($textNode, this.$el)
	                } else {
	                    return consoler.error('"' + conf.namespace + 'text" \'s parentNode is not found. {' + this.$expr + '}')
	                }
	                this.render()
	            },
	            shouldUpdate: function () {
	                var that = this
	                return util.some(this.expressions, function(exp, index) {
	                    var pv = that.cache[index]
	                    var nv = that.$exec(exp)
	                    if (!nv[0]) {
	                        return !!that.$diff(pv, nv[1])
	                    }
	                })
	            },
	            update: function () {
	                this.render()
	            },
	            unbind: function () {
	                this.render = noop
	                this.expressions = this.cache = this.textNode = null
	            }
	        }
	    }


	/***/ },
	/* 7 */
	/***/ function(module, exports, __webpack_require__) {

	    /**
	     *  DOM manipulations
	     */

	    'use strict';
	    var util = __webpack_require__(1)
	    var is = __webpack_require__(3)

	    function Selector(sel) {
	        if (util.type(sel) == 'string') {
	            return Shell(util.copyArray(document.querySelectorAll(sel)))
	        }
	        else if (util.type(sel) == 'array') {
	            return Shell(sel)
	        }
	        else if (sel instanceof Shell) return sel
	        else if (is.DOM(sel)) {
	            return Shell(new ElementArray(sel))
	        }
	        else {
	            throw new Error('Unexpect selector !')
	        }
	    }

	    function Shell(nodes) {
	        if (nodes instanceof Shell) return nodes
	        var $items = new ElementArray()
	        util.forEach(nodes, function (item) {
	            $items.push(item)
	        })
	        return $items
	    }

	    function ElementArray () {
	        var _arr = util.slice(arguments)
	        var that = this
	        this.push = function (el) {
	            _arr.push(el)
	            that[_arr.length - 1] = el
	            that.length = _arr.length
	        }
	        this.forEach = function (fn) {
	            util.forEach(_arr, fn)
	        }
	        this.forEach(function (item, i) {
	            that[i] = item
	        })
	        this.length = _arr.length
	    }

	    ElementArray.prototype = Shell.prototype

	    var proto = Shell.prototype
	    proto.find = function(sel) {
	        var subs = []
	        this.forEach(function(n) {
	            subs = subs.concat(util.copyArray(n.querySelectorAll(sel)))
	        })
	        return Shell(subs)
	    }
	    proto.attr = function(attname, attvalue) {
	        var len = arguments.length
	        var el = this[0]

	        if (len > 1) {
	            el.setAttribute(attname, attvalue)
	        } else if (len == 1) {
	            return (el.getAttribute(attname) || '').toString()
	        }
	        return this
	    }
	    proto.removeAttr = function(attname) {
	        this.forEach(function(el) {
	            el.removeAttribute(attname)
	        })
	        return this
	    }
	    proto.addClass = function(clazz) {
	        this.forEach(function(el) {

	            // IE9 below not support classList
	            // el.classList.add(clazz)

	            var classList = el.className.split(' ')
	            if (!~util.indexOf(classList, clazz)) classList.push(clazz)
	            el.className = classList.join(' ')
	        })
	        return this
	    }
	    proto.removeClass = function(clazz) {
	        this.forEach(function(el) {
	            
	            // IE9 below not support classList
	            // el.classList.remove(clazz)

	            var classList = el.className.split(' ')
	            var index = util.indexOf(classList, clazz)
	            if (~index) classList.splice(index, 1)
	            el.className = classList.join(' ')
	        })
	        return this
	    }
	    proto.hasClass = function(clazz) {
	        if (!this[0]) return false
	        var classList = el.className.split(' ')
	        return ~~util.indexOf(classList, clazz)
	    }
	    proto.each = function(fn) {
	        this.forEach(fn)
	        return this
	    }
	    var ieEvent = !document.addEventListener
	    proto.on = function(type, listener, capture) {
	        this.forEach(function(el) {
	            if (ieEvent) {
	                el.attachEvent('on' + type, listener)
	            } else {
	                el.addEventListener(type, listener, capture)
	            }
	        })
	        return this
	    }
	    proto.off = function(type, listener) {
	        this.forEach(function(el) {
	            if (ieEvent) {
	                el.detachEvent('on' + type, listener)
	            } else {
	                el.removeEventListener(type, listener, capture)
	            }
	        })
	        return this
	    }
	    proto.html = function(html) {
	        var len = arguments.length
	        if (len >= 1) {
	            this.forEach(function(el) {
	                el.innerHTML = html
	            })
	        } else if (this.length) {
	            return this[0].innerHTML
	        }
	        return this
	    }
	    proto.parent = function() {
	        if (!this.length) return null
	        return Shell([_parentNode(this[0])])
	    }
	    proto.remove = function() {
	        this.forEach(function(el) {
	            var parent = _parentNode(el)
	            parent && parent.removeChild(el)
	        })
	        return this
	    }
	    proto.insertBefore = function (pos) {
	        var tar
	        if (!this.length) return this
	        else if (this.length == 1) {
	            tar = this[0]
	        } else {
	            tar = _createDocumentFragment()
	            this.forEach(function (el) {
	                _appendChild(tar, el)
	            })
	        }
	        _parentNode(pos).insertBefore(tar, pos)
	        return this
	    }
	    proto.insertAfter = function (pos) {
	        var tar
	        if (!this.length) return this
	        else if (this.length == 1) {
	            tar = this[0]
	        } else {
	            tar = _createDocumentFragment()
	            this.forEach(function (el) {
	                _appendChild(tar, el)
	            })
	        }
	        _parentNode(pos).insertBefore(tar, pos.nextSibling)
	        return this
	    }
	    // return element by index
	    proto.get = function(i) {
	        return this[i]
	    }
	    proto.append = function(n) {
	        if (this.length) _appendChild(this[0], n)
	        return this
	    }
	    proto.appendTo = function (p) {
	        if (this.length == 1) _appendChild(p, this[0])
	        else if (this.length > 1) {
	            var f = _createDocumentFragment()
	            this.forEach(function (n) {
	                _appendChild(f, n)
	            })
	            _appendChild(p, f)
	        }
	    }
	    proto.replace = function(n) {
	        var tar = this[0]
	        _parentNode(tar).replaceChild(n, tar)
	        return this
	    }

	    function _parentNode (e) {
	        return e && e.parentNode
	    }

	    function _createDocumentFragment () {
	        return document.createDocumentFragment()
	    }

	    function _appendChild (p, c) {
	        return p.appendChild(c)
	    }
	    module.exports = Selector


	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {

	    'use strict';

	    var util = __webpack_require__(1)

	    function _isExpr(c) {
	        return c ? !!util.trim(c).match(/^\{[\s\S]*?\}$/m) : false
	    }
	    function _strip (expr) {
	        return util.trim(expr)
	                .match(/^\{([\s\S]*)\}$/m)[1]
	                .replace(/^- /, '')
	    }
	    module.exports = {
	        isExpr: _isExpr,
	        strip: _strip,
	        exprRegexp: /\{[\s\S]*?\}/g,
	        veil: function (expr) {
	            return expr.replace(/\\{/g, '\uFFF0')
	                       .replace(/\\}/g, '\uFFF1')
	        },
	        unveil: function (expr) {
	            return expr.replace(/\uFFF0/g, '\\{')
	                       .replace(/\uFFF1/g, '\\}')
	        }
	    }

	/***/ },
	/* 9 */
	/***/ function(module, exports) {

	    'use strict';

	    function detect() {
	        var undef
	        var v = 3
	        var div = document.createElement('div')
	        var all = div.getElementsByTagName('i')

	        while (
	            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
	            all[0]
	        )
	        return v > 4 ? v : undef;
	    }

	    var ie = detect()
	    module.exports = {
	        ie: ie,
	        supportQuerySelector: document.querySelector && document.querySelectorAll
	    }


	/***/ },
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {

	    /**
	     *  execute expression from template with specified Scope and ViewModel
	     */

	    var util = __webpack_require__(1)
	    /**
	     *  Calc expression value
	     */
	    function _execute($vm/*, expression, [label], [target]*/) {
	        /**
	         *  $scope is passed when call instance method $compile, 
	         *  Each "scope" object maybe include "$parent, data, method" properties
	         */
	        var $scope = util.extend({}, $vm.$methods, $vm.$data)

	        try {
	            return [null, util.immutable(eval('with($scope){(%s)}'.replace('%s', arguments[1])))]
	        } catch (e) {
	            arguments[1] =  '. '+ arguments[2] + '=' + (/^\{/.test(arguments[1]) 
	                                        ? arguments[1]
	                                        : '{' + arguments[1] + '}') // expr
	            
	            var $consoler = __webpack_require__(5)
	            // arguments[2] // label
	            // arguments[3] // target
	            switch (e.name) {
	                case 'ReferenceError':
	                    $consoler.warn(e.message + arguments[1])
	                    break
	                default:
	                    $consoler.error(
	                        (arguments[2] ? '\'' + arguments[2] + '\': ' : ''),
	                        e.message + arguments[1],
	                        arguments[3] || ''
	                    )
	            }
	            return [e]
	        }
	    }
	    module.exports = _execute

	/***/ }
	/******/ ])
	});
	;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Message = __webpack_require__(3)
	var util = __webpack_require__(4)
	var Video = __webpack_require__(5)
	var Control = __webpack_require__(7)
	var Poster = __webpack_require__(9)
	var proto = Player.prototype

	function Player (opts) {

		var $p = this
		var $con = opts.container || document.createElement('div')
		var message = this.$message = new Message()
		this.$refs = {}
		/**
		 * External listening
		 */
		Object.keys(opts).forEach(function (k) {
			if (/^on/.test(k) && util.type(opts[k])) {
				$p.on(k.replace(/^on/, ''), opts[k])
			}
		})

		/**
		 * Player video
		 */
		var $view = this.$view = new Real({
			el: $con,
			methods: {
				'$message': function () {
					return message
				}
			}
		})

		/**
		 * Video component
		 */
		var $video = this.$refs.video = new Video({
			parent: $view,
			replace: true,
			data: {
				autoplay: false
			}
		})
		$video.$appendTo($view)

		if (opts.ui.control) {
			/**
			 * Video component
			 */
			var $control = this.$refs.control = new Control({
				parent: $view,
				replace: true,
				data: {}
			})
			$control.$appendTo($view)
		}
		/**
		 * Poster component
		 */
		var $poster = this.$refs.poster = new Poster({
			parent: $view,
			replace: true,
			data: {
				poster: opts.ui.poster || ''
			}
		})
		$poster.$appendTo($view)

	}
	/**
	 * Expose methods
	 */
	proto.on = function () {
		return this.$message.on.apply(this.$message, arguments)
	}
	proto.off = function () {
		this.$message.on.apply(this.$message, arguments)
		return this
	}
	proto.stop = function () {
		this.$refs.video.stop()
		return this
	}
	proto.play = function () {
		this.$refs.video.play()
		return this
	}

	module.exports = Player

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 *  Simple Pub/Sub module
	 **/

	'use strict';


	function Message () {
	    this._evtObjs = {};
	}
	Message.prototype.on = function (evtType, handler) {
	    if (!this._evtObjs[evtType]) {
	        this._evtObjs[evtType] = [];
	    }
	    this._evtObjs[evtType].push({
	        handler: handler
	    })
	}
	Message.prototype.off = function (evtType, handler) {
	    var types;
	    if (evtType) {
	        types = [evtType];
	    } else {
	        types = Object.keys(this._evtObjs);
	    }
	    types.forEach(function (evtType) {
	        var handlers = this._evtObjs[evtType] || [],
	            newHandlers = [];
	        handlers.forEach(function (evtObj) {
	            if (evtObj.handler !== handler) {
	                newHandlers.push(evtObj)
	            }
	        });
	        this._evtObjs[evtType] = newHandlers;
	    }.bind(this));

	    return this;
	}
	Message.prototype.emit = function (evtType, data) {
	    var handlers = this._evtObjs[evtType] || [];
	    handlers.forEach(function (item) {
	        item.handler && item.handler(data);
	    });
	}

	/**
	 *  Global Message Central
	 **/
	var msg = new Message();
	Message.on = function () {
	    msg.on.apply(msg, arguments);
	}
	Message.off = function () {
	    msg.off.apply(msg, arguments);
	}
	Message.emit = function () {
	    msg.emit.apply(msg, arguments);
	}


	module.exports = Message;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    type: function (obj) {
	        return /\[object (\w+)\]/.exec(Object.prototype.toString.call(obj))[1].toLowerCase()
	    }
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = Real.create({
		template: __webpack_require__(6),
		data: function () {
			return {
				autoplay: false
			}
		},
		ready: function () {
			this.$el.addEventListener('loadeddata',function () {
				this.$notify('load')
			}.bind(this))

			this.$listen('play', this.play)
			this.$listen('pause', this.pause)
		},
		methods: {
			play: function () {
				this.$el.play()
			},
			pause: function () {
				this.$el.pause()
			}
		}
	})

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "<video \n\tsrc=\"http://www.runoob.com/try/demo_source/movie.mp4\"\n\twidth=\"100%\" \n\theight=\"100%\"\n\tr-attr=\"{\n\t\tautoplay: autoplay ? 'true' : undefined\n\t}\"\n\twebkit-playsinline=\"true\" \n></video>";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = Real.create({
		template: __webpack_require__(8),
		data: function () {
			return {
				play: false
			}
		},
		methods: {
			_onPlay: function() {
				if (this.$data.play) {
					this.$data.play = false
					this.$update()
					this.$notify('pause')
				} else {
					this.$data.play = true
					this.$update()
					this.$notify('play')
				}
			}
		}
	})

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "<div class=\"tvp_controls\">\n\t<div class=\"tvp_button tvp_playpause_button tvp_play\" \n\t\tr-on=\"{click: _onPlay}\"\n\t\tr-class=\"{\n\t\t\ttvp_play: !play;\n\t\t\ttvp_pause: play;\n\t\t}\"\n\t>\n\t\t<button type=\"button\" title=\"播放/暂停\"><span class=\"tvp_btn_value\">播放</span></button>\n\t</div>\n\t<div class=\"tvp_time_rail\">\n\t\t<span class=\"tvp_time_total\">\n\t\t\t<span class=\"tvp_time_loaded\" style=\"width: 100%;\"></span>\n\t\t\t<span class=\"tvp_time_current\" style=\"width: 0px;\"\n\t\t\t><span class=\"tvp_time_handle\"></span></span>\n\t\t</span>\n\t\t<span class=\"tvp_time_panel\">\n\t\t\t<span class=\"tvp_time_panel_current\">00:00</span>\n\t\t\t<span class=\"tvp_time_panel_split\">/</span>\n\t\t\t<span class=\"tvp_time_panel_total\">00:15</span>           \n\t\t</span>  \n\t</div>\n\t<div class=\"tvp_barrage_switch tvp_none\">\n\t\t<div class=\"tvp_btn_barrage\" data-role=\"tvp-bullet-switch\">\n\t\t\t<div class=\"tvp_btn_value\">弹</div>\n\t\t</div>\n\t</div>\n\t<div class=\"tvp_button tvp_volume tvp_none\">\n\t\t<div class=\"tvp_btn_volume\"><div class=\"tvp_icon_volume\"></div></div>\n\t\t<div class=\"tvp_volume_slider\">\n\t\t\t<div class=\"tvp_volume_range\">\n\t\t\t\t<div class=\"tvp_volume_range_current\" style=\"height:50%\"><div class=\"tvp_volume_handle\"></div></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class=\"tvp_button tvp_definition _tvp_definition_ tvp_none\">\n\t\t<div class=\"tvp_definition_button\"><span>清晰度</span></div>\n\t<div class=\"tvp_definition_list\"></div>  \n\t</div>\n\t<div class=\"tvp_button tvp_fullscreen_button tvp_fullscreen\">\n\t\t<button type=\"button\" title=\"切换全屏\"><span class=\"tvp_btn_value\">全屏</span></button>  \n\t</div>\n\t<span class=\"tvp_time_handel_hint\" style=\"display:none\"></span>\n</div>";

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = Real.create({
		data: function () {
			return {
				show: true,
				poster: ''
			}
		},
		template: __webpack_require__(10),
		ready: function () {
			this.$listen('play', this.hide)
		},
		methods: {
			hide: function () {
				this.$data.show = false
				this.$update()
			}
		}
	})

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<div class=\"tvp_overlay_poster\" r-show=\"{show}\">\n\t<img class=\"tvp_poster_img\" \n\t\tr-attr=\"{src: poster}\"\n\t/>\n</div>";

/***/ }
/******/ ])
});
;