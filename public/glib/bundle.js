/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/glib/src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ "./node_modules/axios/lib/helpers/btoa.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("development" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");
var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--7!./public/glib/src/style.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader??ref--7!./public/glib/src/style.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n}\r\n\r\nbody {\r\n  width: 100vw;\r\n  height: 100vh;\r\n}\r\n\r\n#root, #canvas {\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n#canvas {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./public/glib/src/app.js":
/*!********************************!*\
  !*** ./public/glib/src/app.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _scene = __webpack_require__(/*! ./core/scene */ "./public/glib/src/core/scene.js");

var _scene2 = _interopRequireDefault(_scene);

__webpack_require__(/*! ./style.css */ "./public/glib/src/style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scene = new _scene2.default();
var node = scene.addChild();
scene.getResource('monkey.obj');
scene.getResource('puppy.png');

/***/ }),

/***/ "./public/glib/src/core/resource.js":
/*!******************************************!*\
  !*** ./public/glib/src/core/resource.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Resource = function Resource(url) {
  _classCallCheck(this, Resource);

  this.url = url;
};

exports.default = Resource;

/***/ }),

/***/ "./public/glib/src/core/resourceloader.js":
/*!************************************************!*\
  !*** ./public/glib/src/core/resourceloader.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

var _axios2 = _interopRequireDefault(_axios);

var _mesh = __webpack_require__(/*! ../model/mesh */ "./public/glib/src/model/mesh.js");

var _mesh2 = _interopRequireDefault(_mesh);

var _texture = __webpack_require__(/*! ../model/texture */ "./public/glib/src/model/texture.js");

var _texture2 = _interopRequireDefault(_texture);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_axios2.default.defaults.baseURL = window.location.origin + '/api/glib';

var ResourceLoader = function () {
  function ResourceLoader() {
    _classCallCheck(this, ResourceLoader);

    this.resources = new Map();
    this.resourcesLoading = new Map();
    this.loading = false;
  }

  _createClass(ResourceLoader, [{
    key: 'getResource',
    value: function getResource(url) {
      if (this.resources.has(url)) {
        return this.resources.get(url);
      }
      if (this.resourcesLoading.has(url)) {
        return;
      }
      this.loadResource(this.createResource(url));
    }
  }, {
    key: 'createResource',
    value: function createResource(url) {
      switch (url.slice(url.indexOf('.'), url.length)) {
        case '.obj':
          return new _mesh2.default(url);
        case '.png':
          return new _texture2.default(url);
        default:
          console.error('No resource for file width extension ' + url);
          break;
      }
    }
  }, {
    key: 'loadResource',
    value: function loadResource(resource) {
      var _this = this;

      this.resourcesLoading.set(resource.url, resource);
      _axios2.default.get('' + resource.url, { headers: { 'accept': 'image/png' } }).then(function (res) {
        resource.constructor.parse(resource, res.data);
        _this.resources.set(resource.url, resource);
        _this.resourcesLoading.delete(resource.url);
        if (resource.img) {
          document.getElementById('root').appendChild(resource.img);
        }
      }).catch(function (err) {
        console.error('Unable to load resource ' + resource.url + ' ' + err);
      });
    }
  }]);

  return ResourceLoader;
}();

exports.default = ResourceLoader;

/***/ }),

/***/ "./public/glib/src/core/scene.js":
/*!***************************************!*\
  !*** ./public/glib/src/core/scene.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _scenenode = __webpack_require__(/*! ./scenenode */ "./public/glib/src/core/scenenode.js");

var _scenenode2 = _interopRequireDefault(_scenenode);

var _resourceloader = __webpack_require__(/*! ./resourceloader */ "./public/glib/src/core/resourceloader.js");

var _resourceloader2 = _interopRequireDefault(_resourceloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scene = function (_SceneNode) {
  _inherits(Scene, _SceneNode);

  function Scene() {
    _classCallCheck(this, Scene);

    var _this = _possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this));

    _this.resourceLoader = new _resourceloader2.default();
    _this.scene = _this;
    _this.nodeRegister = [];
    _this.componentRegister = [];
    return _this;
  }

  _createClass(Scene, [{
    key: 'getResource',
    value: function getResource(url) {
      return this.resourceLoader.getResource(url);
    }
  }, {
    key: 'addToNodeRegister',
    value: function addToNodeRegister(node) {
      this.nodeRegister.push(node);
    }
  }, {
    key: 'removeFromNodeRegister',
    value: function removeFromNodeRegister(node) {
      this.nodeRegister.splice(this.nodeRegister.indexOf(node), 1);
    }
  }, {
    key: 'addToComponentRegister',
    value: function addToComponentRegister(component) {
      this.componentRegister.push(component);
    }
  }, {
    key: 'removeFromComponentRegister',
    value: function removeFromComponentRegister(component) {
      this.componentRegister.splice(this.componentRegister.indexOf(component), 1);
    }
  }, {
    key: 'remove',
    value: function remove() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var child = _step.value;

          child.remove();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      while (this.components.length > 0) {
        this.components[this.components.length - 1].remove();
      }
    }
  }]);

  return Scene;
}(_scenenode2.default);

exports.default = Scene;

/***/ }),

/***/ "./public/glib/src/core/scenenode.js":
/*!*******************************************!*\
  !*** ./public/glib/src/core/scenenode.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SceneNode = function () {
  function SceneNode(scene, parent) {
    _classCallCheck(this, SceneNode);

    this.children = [];
    this.components = [];
    this.scene = scene;
    this.parent = parent;
  }

  _createClass(SceneNode, [{
    key: "addChild",
    value: function addChild() {
      var node = new SceneNode(this.scene, this);
      this.scene.addToNodeRegister(node);
      this.children.push(node);
      return node;
    }
  }, {
    key: "removeChild",
    value: function removeChild(node) {
      node.scene = null;
      node.parent = null;
      this.scene.removeFromNodeRegister(node);
      this.children.splice(this.children.indexOf(node), 1);
    }
  }, {
    key: "addComponent",
    value: function addComponent(type) {
      var component = new [type]();
      this.scene.addToComponentRegister(component);
      this.components.push(component);
      return component;
    }
  }, {
    key: "removeComponent",
    value: function removeComponent(component) {
      this.scene.removeFromComponentRegister(component);
      this.components.splice(this.components.indexOf(component), 1);
    }
  }, {
    key: "remove",
    value: function remove() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var child = _step.value;

          child.remove();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      while (this.components.length > 0) {
        this.components[this.components.length - 1].remove();
      }
      this.parent.removeChild(this);
    }
  }, {
    key: "walkEnabled",
    value: function walkEnabled(fn) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var child = _step2.value;

          child.walkEnabled(fn);
          fn(this);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }]);

  return SceneNode;
}();

exports.default = SceneNode;

/***/ }),

/***/ "./public/glib/src/math/color.js":
/*!***************************************!*\
  !*** ./public/glib/src/math/color.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Color = function () {
  _createClass(Color, null, [{
    key: 'fromArray',
    value: function fromArray(a) {
      return new (Function.prototype.bind.apply(Color, [null].concat(_toConsumableArray(a))))();
    }
  }, {
    key: 'fromHex',
    value: function fromHex(h) {
      return new (Function.prototype.bind.apply(Color, [null].concat(_toConsumableArray([h.slice(2, 4), h.slice(4, 6), h.slice(6, 8)].map(function (he) {
        return parseInt(he, 16) / 255;
      })))))();
    }
  }, {
    key: 'white',
    get: function get() {
      return new Color(1.0, 1.0, 1.0);
    }
  }, {
    key: 'red',
    get: function get() {
      return new Color(1.0, 0.0, 0.0);
    }
  }, {
    key: 'green',
    get: function get() {
      return new Color(0.0, 1.0, 0.0);
    }
  }, {
    key: 'blue',
    get: function get() {
      return new Color(0.0, 0.0, 1.0);
    }
  }, {
    key: 'black',
    get: function get() {
      return new Color(0.0, 0.0, 0.0);
    }
  }]);

  function Color(r, g, b) {
    _classCallCheck(this, Color);

    this.r = r || 0.0;
    this.g = g || 0.0;
    this.b = b || 0.0;
  }

  _createClass(Color, [{
    key: 'copy',
    get: function get() {
      return new Color(this.r, this.g, this.b);
    }
  }, {
    key: 'toArray',
    get: function get() {
      return [this.r, this.g, this.b];
    }
  }, {
    key: 'toHex',
    get: function get() {
      return '0x' + [(this.r * 255).toString(16), (this.g * 255).toString(16), (this.b * 255).toString(16)].map(function (cl) {
        return cl.length < 2 ? '"0"' + cl : cl;
      }).join('');
    }
  }]);

  return Color;
}();

exports.default = Color;

/***/ }),

/***/ "./public/glib/src/math/easing.js":
/*!****************************************!*\
  !*** ./public/glib/src/math/easing.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Easing = function () {
    _createClass(Easing, null, [{
        key: 'linear',


        // no easing, no acceleration
        value: function linear(t) {
            return t;
        }
        // accelerating from zero velocity

    }, {
        key: 'easeInQuad',
        value: function easeInQuad(t) {
            return t * t;
        }
        // decelerating to zero velocity

    }, {
        key: 'easeOutQuad',
        value: function easeOutQuad(t) {
            return t * (2 - t);
        }
        // acceleration until halfway, then deceleration

    }, {
        key: 'easeInOutQuad',
        value: function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }
        // accelerating from zero velocity

    }, {
        key: 'easeInCubic',
        value: function easeInCubic(t) {
            return t * t * t;
        }
        // decelerating to zero velocity

    }, {
        key: 'easeOutCubic',
        value: function easeOutCubic(t) {
            return (t -= 1) * t * t + 1;
        }
        // acceleration until halfway, then deceleration

    }, {
        key: 'easeInOutCubic',
        value: function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        }
        // accelerating from zero velocity

    }, {
        key: 'easeInQuart',
        value: function easeInQuart(t) {
            return t * t * t * t;
        }
        // decelerating to zero velocity

    }, {
        key: 'easeOutQuart',
        value: function easeOutQuart(t) {
            return 1 - (t -= 1) * t * t * t;
        }
        // acceleration until halfway, then deceleration

    }, {
        key: 'easeInOutQuart',
        value: function easeInOutQuart(t) {
            return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (t -= 1) * t * t * t;
        }
        // accelerating from zero velocity

    }, {
        key: 'easeInQuint',
        value: function easeInQuint(t) {
            return t * t * t * t * t;
        }
        // decelerating to zero velocity

    }, {
        key: 'easeOutQuint',
        value: function easeOutQuint(t) {
            return 1 + (t -= 1) * t * t * t * t;
        }
        // acceleration until halfway, then deceleration

    }, {
        key: 'easeInOutQuint',
        value: function easeInOutQuint(t) {
            return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (t -= 1) * t * t * t * t;
        }
    }]);

    function Easing() {
        _classCallCheck(this, Easing);

        throw new Error('You should not use Easing contructor...');
    }

    return Easing;
}();

exports.default = Easing;

/***/ }),

/***/ "./public/glib/src/math/index.js":
/*!***************************************!*\
  !*** ./public/glib/src/math/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Easing = exports.Quat = exports.Mat4 = exports.Mat3 = exports.Vec3 = exports.Vec2 = exports.Color = undefined;

var _color = __webpack_require__(/*! ./color */ "./public/glib/src/math/color.js");

var _color2 = _interopRequireDefault(_color);

var _vec = __webpack_require__(/*! ./vec2 */ "./public/glib/src/math/vec2.js");

var _vec2 = _interopRequireDefault(_vec);

var _vec3 = __webpack_require__(/*! ./vec3 */ "./public/glib/src/math/vec3.js");

var _vec4 = _interopRequireDefault(_vec3);

var _mat = __webpack_require__(/*! ./mat3 */ "./public/glib/src/math/mat3.js");

var _mat2 = _interopRequireDefault(_mat);

var _mat3 = __webpack_require__(/*! ./mat4 */ "./public/glib/src/math/mat4.js");

var _mat4 = _interopRequireDefault(_mat3);

var _quat = __webpack_require__(/*! ./quat */ "./public/glib/src/math/quat.js");

var _quat2 = _interopRequireDefault(_quat);

var _easing = __webpack_require__(/*! ./easing */ "./public/glib/src/math/easing.js");

var _easing2 = _interopRequireDefault(_easing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Color = _color2.default;
exports.Vec2 = _vec2.default;
exports.Vec3 = _vec4.default;
exports.Mat3 = _mat2.default;
exports.Mat4 = _mat4.default;
exports.Quat = _quat2.default;
exports.Easing = _easing2.default;

/***/ }),

/***/ "./public/glib/src/math/mat3.js":
/*!**************************************!*\
  !*** ./public/glib/src/math/mat3.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = __webpack_require__(/*! ./ */ "./public/glib/src/math/index.js");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sqrt = Math.sqrt;

var Mat3 = function () {
  _createClass(Mat3, null, [{
    key: 'identity',
    get: function get() {
      return new Mat3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0);
    }
  }]);

  function Mat3(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    _classCallCheck(this, Mat3);

    this.m00 = m00;this.m01 = m01;this.m02 = m02;
    this.m10 = m10;this.m11 = m11;this.m12 = m12;
    this.m20 = m20;this.m21 = m21;this.m22 = m22;
  }

  _createClass(Mat3, [{
    key: 'multiplyVector',
    value: function multiplyVector(v) {
      return new Mat3(this.m00 * v.x + this.m01 * v.y + this.m02 * v.z, this.m10 * v.x + this.m11 * v.y + this.m12 * v.z, this.m20 * v.x + this.m21 * v.y + this.m22 * v.z);
    }
  }, {
    key: 'add',
    value: function add(m) {
      return new Mat3(this.m00 + m.m00, this.m01 + m.m01, this.m02 + m.m02, this.m10 + m.m10, this.m11 + m.m11, this.m12 + m.m12, this.m20 + m.m20, this.m21 + m.m21, this.m22 + m.m22);
    }
  }, {
    key: 'sub',
    value: function sub(m) {
      return new Mat3(this.m00 - m.m00, this.m01 - m.m01, this.m02 - m.m02, this.m10 - m.m10, this.m11 - m.m11, this.m12 - m.m12, this.m20 - m.m20, this.m21 - m.m21, this.m22 - m.m22);
    }
  }, {
    key: 'mul',
    value: function mul(m) {
      var a00 = this.m01;var a01 = this.m02;var a02 = this.m03;
      var a10 = this.m11;var a11 = this.m12;var a12 = this.m13;
      var a20 = this.m21;var a21 = this.m22;var a22 = this.m23;
      var b00 = m.m01;var b01 = m.m02;var b02 = m.m03;
      var b10 = m.m11;var b11 = m.m12;var b12 = m.m13;
      var b20 = m.m21;var b21 = m.m22;var b22 = m.m23;
      return new Mat3(a00 * b00 + a01 * b10 + a02 * b20, a00 * b01 + a01 * b11 + a02 * b21, a00 * b02 + a01 * b12 + a02 * b22, a10 * b00 + a11 * b10 + a12 * b20, a10 * b01 + a11 * b11 + a12 * b21, a10 * b02 + a11 * b12 + a12 * b22, a20 * b00 + a21 * b10 + a22 * b20, a20 * b01 + a21 * b11 + a22 * b21, a20 * b02 + a21 * b12 + a22 * b22);
    }
  }, {
    key: 'clone',
    get: function get() {
      return new Mat3(this.m00, this.m01, this.m02, this.m10, this.m11, this.m12, this.m20, this.m21, this.m22);
    }
  }, {
    key: 'toArray',
    get: function get() {
      return [this.m00, this.m01, this.m02, this.m10, this.m11, this.m12, this.m20, this.m21, this.m22];
    }
  }, {
    key: 'toFloat32Array',
    get: function get() {
      return new Float32Array([this.m00, this.m01, this.m02, this.m10, this.m11, this.m12, this.m20, this.m21, this.m22]);
    }
  }, {
    key: 'toMat4',
    get: function get() {
      return new _.Mat4(this.m00, this.m01, this.m02, 0.0, this.m10, this.m11, this.m12, 0.0, this.m20, this.m21, this.m22, 0.0, 0.0, 0.0, 0.0, 1.0);
    }
  }, {
    key: 'toQuat',
    get: function get() {
      var trace = this.m00 + this.m11 + this.m22;
      var s = void 0;
      if (trace > 0) {
        s = 0.5 / sqrt(trace + 1.0);
        return new _.Quat(0.25 / s, (this.m21 - this.m12) * s, (this.m02 - this.m20) * s);
      }
      if (this.m00 > this.m11 && this.m00 > this.m22) {
        s = 2.0 * sqrt(1.0 + this.m00 - this.m11 - this.m22);
        return new _.Quat((this.m21 - this.m12) / s, 0.25 * s, (this.m01 + this.m10) / s, (this.m02 + this.m20) / s);
      } else if (this.m11 > this.m22) {
        s = 2.0 * sqrt(1.0 + this.m11 - this.m00 - this.m22);
        return new _.Quat((this.m02 - this.m20) / s, (this.m01 + this.m10) / s, 0.25 * s, (this.m12 + this.m21) / s);
      }
      s = 2.0 * sqrt(1.0 + this.m22 - this.m00 - this.m11);
      return new _.Quat((this.m10 - this.m01) / s, (this.m02 + this.m20) / s, (this.m12 + this.m21) / s);
    }
  }]);

  return Mat3;
}();

Mat3.fromArray = function (m) {
  return new (Function.prototype.bind.apply(Mat3, [null].concat(_toConsumableArray(m))))();
};

exports.default = Mat3;

/***/ }),

/***/ "./public/glib/src/math/mat4.js":
/*!**************************************!*\
  !*** ./public/glib/src/math/mat4.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = __webpack_require__(/*! ./ */ "./public/glib/src/math/index.js");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sin = Math.sin,
    cos = Math.cos,
    tan = Math.tan;

var Mat4 = function () {
  _createClass(Mat4, null, [{
    key: 'fromArray',
    value: function fromArray(a) {
      return new (Function.prototype.bind.apply(Mat4, [null].concat(_toConsumableArray(a))))();
    }
  }, {
    key: 'perspective',
    value: function perspective(fovrad, aspectRatio, near, far) {
      var f = 1.0 / tan(fovrad / 2);
      var rangeInv = 1 / (near - far);
      return new Mat4(f / aspectRatio, 0.0, 0.0, 0.0, 0.0, f, 0.0, 0.0, 0.0, 0.0, (near + far) * rangeInv, -1.0, 0.0, 0.0, near * far * rangeInv * 2, 0.0);
    }
  }, {
    key: 'orthographic',
    value: function orthographic(left, right, bottom, top, near, far) {
      var lr = 1 / (left - right);
      var bt = 1 / (bottom - top);
      var nf = 1 / (near - far);
      return new Mat4(2 * lr, 0, 0, 0, 0, 2 * bt, 0, 0, 0, 0, 2 * nf, 0, (left + right) * lr, (top + bottom) * bt, (far + near) * nf, 1);
    }
  }, {
    key: 'lookAt',
    value: function lookAt(camPos, target, up) {
      var zAxis = camPos.sub(target).normalize;
      var xAxis = up.cross(zAxis);
      var yAxis = zAxis.cross(xAxis);
      return new Mat4(xAxis.x, xAxis.y, xAxis.z, 0.0, yAxis.x, yAxis.y, yAxis.z, 0.0, zAxis.x, zAxis.y, zAxis.z, 0.0, camPos.x, camPos.y, camPos.z, 1.0);
    }
  }, {
    key: 'translate',
    value: function translate(x, y, z) {
      return new Mat4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, x, y, z, 1.0);
    }
  }, {
    key: 'scale',
    value: function scale(w, h, d) {
      return new Mat4(w, 0.0, 0.0, 0.0, 0.0, h, 0.0, 0.0, 0.0, 0.0, d, 0.0, 0.0, 0.0, 0.0, 1.0);
    }
  }, {
    key: 'rotateX',
    value: function rotateX(angle) {
      var cos = cos(angle);
      var sin = sin(angle);
      return new Mat4(1.0, 0.0, 0.0, 0.0, 0.0, cos, -sin, 0.0, 0.0, sin, cos, 0.0, 0.0, 0.0, 0.0, 1.0);
    }
  }, {
    key: 'rotateY',
    value: function rotateY(angle) {
      var cos = cos(angle);
      var sin = sin(angle);
      return new Mat4(cos, 0.0, sin, 0.0, 0.0, 1.0, 0.0, 0.0, -sin, 0.0, cos, 0.0, 0.0, 0.0, 0.0, 1.0);
    }
  }, {
    key: 'rotateZ',
    value: function rotateZ(angle) {
      var cos = cos(angle);
      var sin = sin(angle);
      return new Mat4(cos, -sin, 0.0, 0.0, sin, cos, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);
    }
  }, {
    key: 'identity',
    get: function get() {
      return new Mat4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);
    }
  }]);

  function Mat4(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    _classCallCheck(this, Mat4);

    this.m00 = m00 || 0;this.m01 = m01 || 0;this.m02 = m02 || 0;this.m03 = m03 || 0;
    this.m10 = m10 || 0;this.m11 = m11 || 0;this.m12 = m12 || 0;this.m13 = m13 || 0;
    this.m20 = m20 || 0;this.m21 = m21 || 0;this.m22 = m22 || 0;this.m23 = m23 || 0;
    this.m30 = m30 || 0;this.m31 = m31 || 0;this.m32 = m32 || 0;this.m33 = m33 || 0;
  }

  _createClass(Mat4, [{
    key: 'add',
    value: function add(v) {
      return new Mat4(this.m00 + v.m00, this.m01 + v.m01, this.m02 + v.m02, this.m03 + v.m03, this.m10 + v.m10, this.m11 + v.m11, this.m12 + v.m12, this.m13 + v.m13, this.m20 + v.m20, this.m21 + v.m21, this.m22 + v.m22, this.m23 + v.m23, this.m30 + v.m30, this.m31 + v.m31, this.m32 + v.m32, this.m33 + v.m33);
    }
  }, {
    key: 'sub',
    value: function sub(v) {
      return new Mat4(this.m00 - v.m00, this.m01 - v.m01, this.m02 - v.m02, this.m03 - v.m03, this.m10 - v.m10, this.m11 - v.m11, this.m12 - v.m12, this.m13 - v.m13, this.m20 - v.m20, this.m21 - v.m21, this.m22 - v.m22, this.m23 - v.m23, this.m30 - v.m30, this.m31 - v.m31, this.m32 - v.m32, this.m33 - v.m33);
    }
  }, {
    key: 'mul',
    value: function mul(v) {
      return new Mat4(v.m00 * this.m00 + v.m01 * this.m10 + v.m02 * this.m20 + v.m03 * this.m30, v.m00 * this.m01 + v.m01 * this.m11 + v.m02 * this.m21 + v.m03 * this.m31, v.m00 * this.m02 + v.m01 * this.m12 + v.m02 * this.m22 + v.m03 * this.m32, v.m00 * this.m03 + v.m01 * this.m13 + v.m02 * this.m23 + v.m03 * this.m33, v.m10 * this.m00 + v.m11 * this.m10 + v.m12 * this.m20 + v.m13 * this.m30, v.m10 * this.m01 + v.m11 * this.m11 + v.m12 * this.m21 + v.m13 * this.m31, v.m10 * this.m02 + v.m11 * this.m12 + v.m12 * this.m22 + v.m13 * this.m32, v.m10 * this.m03 + v.m11 * this.m13 + v.m12 * this.m23 + v.m13 * this.m33, v.m20 * this.m00 + v.m21 * this.m10 + v.m22 * this.m20 + v.m23 * this.m30, v.m20 * this.m01 + v.m21 * this.m11 + v.m22 * this.m21 + v.m23 * this.m31, v.m20 * this.m02 + v.m21 * this.m12 + v.m22 * this.m22 + v.m23 * this.m32, v.m20 * this.m03 + v.m21 * this.m13 + v.m22 * this.m23 + v.m23 * this.m33, v.m30 * this.m00 + v.m31 * this.m10 + v.m32 * this.m20 + v.m33 * this.m30, v.m30 * this.m01 + v.m31 * this.m11 + v.m32 * this.m21 + v.m33 * this.m31, v.m30 * this.m02 + v.m31 * this.m12 + v.m32 * this.m22 + v.m33 * this.m32, v.m30 * this.m03 + v.m31 * this.m13 + v.m32 * this.m23 + v.m33 * this.m33);
    }
  }, {
    key: 'clone',
    get: function get() {
      return new Mat4(this.m00, this.m01, this.m02, this.m03, this.m10, this.m11, this.m12, this.m13, this.m20, this.m21, this.m22, this.m23, this.m30, this.m31, this.m32, this.m33);
    }
  }, {
    key: 'toArray',
    get: function get() {
      return [this.m00, this.m01, this.m02, this.m03, this.m10, this.m11, this.m12, this.m13, this.m20, this.m21, this.m22, this.m23, this.m30, this.m31, this.m32, this.m33];
    }
  }, {
    key: 'toFloat32Array',
    get: function get() {
      return new Float32Array([this.m00, this.m01, this.m02, this.m03, this.m10, this.m11, this.m12, this.m13, this.m20, this.m21, this.m22, this.m23, this.m30, this.m31, this.m32, this.m33]);
    }
  }, {
    key: 'toMat3',
    get: function get() {
      return new _.Mat3(this.m00, this.m01, this.m02, this.m10, this.m11, this.m12, this.m20, this.m21, this.m22);
    }
  }, {
    key: 'toQuat',
    get: function get() {
      return this.toMat3.toQuat;
    }
  }, {
    key: 'invert',
    get: function get() {
      var m00 = this.m00,
          m01 = this.m01,
          m02 = this.m02,
          m03 = this.m03,
          m10 = this.m10,
          m11 = this.m11,
          m12 = this.m12,
          m13 = this.m13,
          m20 = this.m20,
          m21 = this.m21,
          m22 = this.m22,
          m23 = this.m23,
          m30 = this.m30,
          m31 = this.m31,
          m32 = this.m32,
          m33 = this.m33;

      var a00 = m11 * m22 * m33 - m11 * m23 * m32 - m21 * m12 * m33 + m21 * m13 * m32 + m31 * m12 * m23 - m31 * m13 * m22;
      var a10 = -m10 * m22 * m33 + m10 * m23 * m32 + m20 * m12 * m33 - m20 * m13 * m32 - m30 * m12 * m23 + m30 * m13 * m22;
      var a20 = m10 * m21 * m33 - m10 * m23 * m31 - m20 * m11 * m33 + m20 * m13 * m31 + m30 * m11 * m23 - m30 * m13 * m21;
      var a30 = -m10 * m21 * m32 + m10 * m22 * m31 + m20 * m11 * m32 - m20 * m12 * m31 - m30 * m11 * m22 + m30 * m12 * m21;

      var det = m00 * a00 + m01 * a10 + m02 * a20 + m03 * a30;
      if (det === 0) {
        throw new Error('Cannot invert matrix: ' + m);
      }
      det = 1.0 / det;

      return new Mat4(det * a00, det * -m01 * m22 * m33 + m01 * m23 * m32 + m21 * m02 * m33 - m21 * m03 * m32 - m31 * m02 * m23 + m31 * m03 * m22, det * m01 * m12 * m33 - m01 * m13 * m32 - m11 * m02 * m33 + m11 * m03 * m32 + m31 * m02 * m13 - m31 * m03 * m12, det * -m01 * m12 * m23 + m01 * m13 * m22 + m11 * m02 * m23 - m11 * m03 * m22 - m21 * m02 * m13 + m21 * m03 * m12, det * a10, det * m00 * m22 * m33 - m00 * m23 * m32 - m20 * m02 * m33 + m20 * m03 * m32 + m30 * m02 * m23 - m30 * m03 * m22, det * -m00 * m12 * m33 + m00 * m13 * m32 + m10 * m02 * m33 - m10 * m03 * m32 - m30 * m02 * m13 + m30 * m03 * m12, det * m00 * m12 * m23 - m00 * m13 * m22 - m10 * m02 * m23 + m10 * m03 * m22 + m20 * m02 * m13 - m20 * m03 * m12, det * a20, det * -m00 * m21 * m33 + m00 * m23 * m31 + m20 * m01 * m33 - m20 * m03 * m31 - m30 * m01 * m23 + m30 * m03 * m21, det * m00 * m11 * m33 - m00 * m13 * m31 - m10 * m01 * m33 + m10 * m03 * m31 + m30 * m01 * m13 - m30 * m03 * m11, det * -m00 * m11 * m23 + m00 * m13 * m21 + m10 * m01 * m23 - m10 * m03 * m21 - m20 * m01 * m13 + m20 * m03 * m11, det * a30, det * m00 * m21 * m32 - m00 * m22 * m31 - m20 * m01 * m32 + m20 * m02 * m31 + m30 * m01 * m22 - m30 * m02 * m21, det * -m00 * m11 * m32 + m00 * m12 * m31 + m10 * m01 * m32 - m10 * m02 * m31 - m30 * m01 * m12 + m30 * m02 * m11, det * m00 * m11 * m22 - m00 * m12 * m21 - m10 * m01 * m22 + m10 * m02 * m21 + m20 * m01 * m12 - m20 * m02 * m11);
    }
  }, {
    key: 'transpose',
    get: function get() {
      return new Mat4(this.m00, this.m10, this.m20, this.m30, this.m01, this.m11, this.m21, this.m31, this.m02, this.m12, this.m22, this.m32, this.m03, this.m13, this.m23, this.m33);
    }
  }, {
    key: 'translation',
    get: function get() {
      return new _.Vec3(this.m30, this.m31, this.m32);
    }
  }, {
    key: 'scale',
    get: function get() {
      return new _.Vec3(new _.Vec3(this.m00, this.m10, this.m20).len, new _.Vec3(this.m01, this.m11, this.m21).len, new _.Vec3(this.m02, this.m12, this.m22).len);
    }
  }, {
    key: 'rotation',
    get: function get() {
      return new _.Mat3(this.m00, this.m01, this.m02, this.m10, this.m11, this.m12, this.m20, this.m21, this.m22);
    }
  }]);

  return Mat4;
}();

exports.default = Mat4;

/***/ }),

/***/ "./public/glib/src/math/quat.js":
/*!**************************************!*\
  !*** ./public/glib/src/math/quat.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = __webpack_require__(/*! ./ */ "./public/glib/src/math/index.js");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sin = Math.sin,
    cos = Math.cos,
    acos = Math.acos,
    abs = Math.abs,
    sqrt = Math.sqrt;

var Quat = function () {
  _createClass(Quat, null, [{
    key: 'fromArray',
    value: function fromArray(a) {
      return new (Function.prototype.bind.apply(Quat, [null].concat(_toConsumableArray(a))))();
    }
  }, {
    key: 'fromEulers',
    value: function fromEulers(x, y, z) {
      var c1 = cos(y * 0.5);
      var c2 = cos(z * 0.5);
      var c3 = cos(x * 0.5);
      var s1 = sin(y * 0.5);
      var s2 = sin(z * 0.5);
      var s3 = sin(x * 0.5);
      return new Quat(c1 * c2 * c3 - s1 * s2 * s3, c1 * c2 * s3 + s1 * s2 * c3, s1 * c2 * c3 + c1 * s2 * s3, c1 * s2 * c3 - s1 * c2 * s3).normalize;
    }
  }, {
    key: 'fromAxisAngle',
    value: function fromAxisAngle(axis, angle) {
      var r = 1 / axis.len;
      var s = sin(angle / 2);
      return new Quat(cos(angle / 2), s * axis.x * r, s * axis.y * r, s * axis.z * r).normalize;
    }
  }, {
    key: 'fromRotation',
    value: function fromRotation(v1, v2) {
      // https://stackoverflow.com/a/1171995
      var half = v1.add(v2);
      var axis = v1.cross(half);
      var angle = v1.dot(half);
      return new Quat(angle, axis.x, axis.y, axis.z).normalize;
    }
  }, {
    key: 'identity',
    get: function get() {
      return new Quat(1.000, 0.000, 0.000, 0.000);
    }
  }, {
    key: 'up',
    get: function get() {
      return new Quat(0.707, 0.707, 0.000, 0.000);
    }
  }, {
    key: 'down',
    get: function get() {
      return new Quat(0.707, -0.707, 0.000, 0.000);
    }
  }, {
    key: 'left',
    get: function get() {
      return new Quat(0.707, 0.000, 0.707, 0.000);
    }
  }, {
    key: 'right',
    get: function get() {
      return new Quat(0.707, 0.000, -0.707, 0.000);
    }
  }, {
    key: 'backward',
    get: function get() {
      return new Quat(0.000, 0.000, 1.000, 0.000);
    }
  }, {
    key: 'upsideDown',
    get: function get() {
      return new Quat(0.000, 0.000, 0.000, 1.000);
    }
  }, {
    key: 'tiltLeft',
    get: function get() {
      return new Quat(0.707, 0.000, 0.000, 0.707);
    }
  }, {
    key: 'tiltRight',
    get: function get() {
      return new Quat(0.707, 0.000, 0.000, -0.707);
    }
  }]);

  function Quat(w, x, y, z) {
    _classCallCheck(this, Quat);

    this.w = w || 0.0;
    this.x = x || 0.0;
    this.y = y || 0.0;
    this.z = z || 0.0;
  }

  _createClass(Quat, [{
    key: 'mul',
    value: function mul(q) {
      var aw = this.w;
      var ax = this.x;
      var ay = this.y;
      var az = this.z;
      var bw = q.w;
      var bx = q.x;
      var by = q.y;
      var bz = q.z;
      return new Quat(aw * bw - ax * bx - ay * by - az * bz, ax * bw + aw * bx + ay * bz - az * by, ay * bw + aw * by + az * bx - ax * bz, az * bw + aw * bz + ax * by - ay * bx).normalize;
    }
  }, {
    key: 'dot',
    value: function dot(q) {
      return this.w * q.w + this.x * q.x + this.y * q.y + this.z * q.z;
    }
  }, {
    key: 'cross',
    value: function cross(q) {
      throw new Error('Quaternion cross not implemented');
    }
  }, {
    key: 'scaleRotation',
    value: function scaleRotation(t) {
      // Redundant multiplication
      var angle = acos(this.w) * t;
      var axis = new _.Vec3(this.x, this.y, this.z).scale(sin(angle));
      return new Quat(cos(angle), axis.x, axis.y, axis.z);
    }
  }, {
    key: 'lerp',
    value: function lerp(q, t) {
      return t >= 1.0 ? q : this.scaleRotation(1 - t).multiply(q.scaleRotation(t));
    }
  }, {
    key: 'nlerp',
    value: function nlerp(q, t) {
      return this.lerp(q, t).normalize;
    }
  }, {
    key: 'slerp',
    value: function slerp(q, t) {
      // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/
      if (t <= 0.0) {
        return this;
      } else if (t >= 1.0) {
        return q;
      }
      // Calculate angle between a and b
      var cosHalfTheta = this.dot(q);
      // if a=b or a=-b then theta = 0 and we can return a
      if (abs(cosHalfTheta) >= 1.0) {
        return this;
      }

      if (cosHalfTheta < 0.0) {
        q.w = -q.w;q.x = -q.x;q.y = -q.y;q.z = -q.z;
        cosHalfTheta = -cosHalfTheta;
      }

      // Calculate temporary values
      var sinHalfTheta = sqrt(1.0 - cosHalfTheta * cosHalfTheta);

      // if theta = 180 degrees then result is not fully defined, we could rotate around any axis normal to a or b
      if (abs(sinHalfTheta) < 0.001) {
        return new Quat((this.w + q.w) * 0.5, (this.x + q.x) * 0.5, (this.y + q.y) * 0.5, (this.z + q.z) * 0.5).normalize;
      }

      var halfTheta = acos(cosHalfTheta);
      var ratioA = sin((1 - t) * halfTheta) / sinHalfTheta;
      var ratioB = sin(t * halfTheta) / sinHalfTheta;
      return new Quat(this.w * ratioA + q.w * ratioB, this.x * ratioA + q.x * ratioB, this.y * ratioA + q.y * ratioB, this.z * ratioA + q.z * ratioB).normalize;
    }
  }, {
    key: 'copy',
    get: function get() {
      return new Quat(this.w, this.x, this.y, this.z);
    }
  }, {
    key: 'toArray',
    get: function get() {
      return [this.w, this.x, this.y, this.z];
    }
  }, {
    key: 'toMat3',
    get: function get() {
      var w = this.w,
          x = this.x,
          y = this.y,
          z = this.z;

      var xw = x * w;
      var xx = x * x;
      var xy = x * y;
      var xz = x * z;
      var yw = y * w;
      var yy = y * y;
      var yz = y * z;
      var zw = z * w;
      var zz = z * z;
      return new _.Mat3(1 - 2 * (yy + zz), 2 * (xy - zw), 2 * (xz + yw), 2 * (xy + zw), 1 - 2 * (xx + zz), 2 * (yz - xw), 2 * (xz - yw), 2 * (yz + xw), 1 - 2 * (xx + yy));
    }
  }, {
    key: 'toMat4',
    get: function get() {
      return this.toMat3.toMat4;
    }
  }, {
    key: 'toEulers',
    get: function get() {
      throw new Error('Quaternion toEuler not implemented');
    }
  }, {
    key: 'len',
    get: function get() {
      return sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
    }
  }, {
    key: 'lenSqrt',
    get: function get() {
      return this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z;
    }
  }, {
    key: 'conjugate',
    get: function get() {
      return new Quat(this.w, -this.x, -this.y, -this.z);
    }
  }, {
    key: 'normalize',
    get: function get() {
      var r = q.len;
      if (r > 0) {
        r = 1 / r;
        return new Quat(this.w * r, this.x * r, this.y * r, this.z * r);
      }
      return new Quat(1.0, 0.0, 0.0, 0.0);
    }
  }, {
    key: 'invert',
    get: function get() {
      var r = 1 / this.len;
      return new Quat(this.w * r, -this.x * r, -this.y * r, -this.z * r);
    }
  }]);

  return Quat;
}();

exports.default = Quat;

/***/ }),

/***/ "./public/glib/src/math/vec2.js":
/*!**************************************!*\
  !*** ./public/glib/src/math/vec2.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sqrt = Math.sqrt;

var Vec2 = function () {
  _createClass(Vec2, null, [{
    key: "fromArray",
    value: function fromArray(a) {
      return new (Function.prototype.bind.apply(Vec2, [null].concat(_toConsumableArray(a))))();
    }
  }, {
    key: "zero",
    get: function get() {
      return new Vec2(0, 0);
    }
  }, {
    key: "up",
    get: function get() {
      return new Vec2(0, 1);
    }
  }, {
    key: "down",
    get: function get() {
      return new Vec2(0, -1);
    }
  }, {
    key: "left",
    get: function get() {
      return new Vec2(-1, 0);
    }
  }, {
    key: "right",
    get: function get() {
      return new Vec2(1, 0);
    }
  }]);

  function Vec2(x, y) {
    _classCallCheck(this, Vec2);

    this.x = x || 0;
    this.y = y || 0;
  }

  _createClass(Vec2, [{
    key: "add",
    value: function add(v) {
      return new Vec2(this.x + v.x, this.y + v.y);
    }
  }, {
    key: "sub",
    value: function sub(v) {
      return new Vec2(this.x - v.x, this.y - v.y);
    }
  }, {
    key: "scale",
    value: function scale(f) {
      return new Vec2(this.x * f, this.y * f);
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return this.x * v.x + this.y * v.y;
    }
  }, {
    key: "getAngle",
    value: function getAngle(v) {
      return this.normalize.dot(v.normalize);
    }
  }, {
    key: "invert",
    value: function invert() {
      return new Vec2(-this.x, -this.y);
    }
  }, {
    key: "clone",
    get: function get() {
      return new Vec2(this.x, this.y);
    }
  }, {
    key: "len",
    get: function get() {
      return sqrt(this.x * this.x + this.y * this.y);
    }
  }, {
    key: "lenSqrt",
    get: function get() {
      return this.x * this.x + this.y * this.y;
    }
  }, {
    key: "normalize",
    get: function get() {
      var r = sqrt(this.x * this.x + this.y * this.y);
      if (r > 0) {
        r = 1 / r;
        return new Vec2(this.x * r, this.y * r);
      }
      return new Vec2(0, 0);
    }
  }]);

  return Vec2;
}();

exports.default = Vec2;

/***/ }),

/***/ "./public/glib/src/math/vec3.js":
/*!**************************************!*\
  !*** ./public/glib/src/math/vec3.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sqrt = Math.sqrt;

var Vec3 = function () {
  _createClass(Vec3, null, [{
    key: "fromArray",
    value: function fromArray(a) {
      return new (Function.prototype.bind.apply(Vec3, [null].concat(_toConsumableArray(a))))();
    }
  }, {
    key: "fromQuat",
    value: function fromQuat(q) {
      var x = this.x;
      var y = this.y;
      var z = this.z;
      var qx = q.x;
      var qy = q.y;
      var qz = q.z;
      var qw = q.w;
      var ix = qw * x + qy * z - qz * y;
      var iy = qw * y + qz * x - qx * z;
      var iz = qw * z + qx * y - qy * x;
      var iw = -qx * x - qy * y - qz * z;
      return new Vec3(ix * qw + iw * -qx + iy * -qz - iz * -qy, iy * qw + iw * -qy + iz * -qx - ix * -qz, iz * qw + iw * -qz + ix * -qy - iy * -qx);
    }
  }, {
    key: "fromMat4",
    value: function fromMat4(m) {
      return new Vec3(m.a14 + m.a11 * this.x + m.a12 * this.y + m.a13 * this.z, m.a24 + m.a21 * this.x + m.a22 * this.y + m.a23 * this.z, m.a34 + m.a31 * this.x + m.a32 * this.y + m.a33 * this.z);
    }
  }, {
    key: "zero",
    get: function get() {
      return new Vec3(0, 0, 0);
    }
  }, {
    key: "up",
    get: function get() {
      return new Vec3(0, 1, 0);
    }
  }, {
    key: "down",
    get: function get() {
      return new Vec3(0, -1, 0);
    }
  }, {
    key: "left",
    get: function get() {
      return new Vec3(-1, 0, 0);
    }
  }, {
    key: "right",
    get: function get() {
      return new Vec3(1, 0, 0);
    }
  }, {
    key: "forward",
    get: function get() {
      return new Vec3(0, 0, 1);
    }
  }, {
    key: "backward",
    get: function get() {
      return new Vec3(0, 0, -1);
    }
  }]);

  function Vec3(x, y, z) {
    _classCallCheck(this, Vec3);

    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  _createClass(Vec3, [{
    key: "add",
    value: function add(v) {
      return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
    }
  }, {
    key: "sub",
    value: function sub(v) {
      return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
    }
  }, {
    key: "scale",
    value: function scale(f) {
      return new Vec3(this.x * f, this.y * f, this.z * f);
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    }
  }, {
    key: "cross",
    value: function cross(v) {
      return new Vec3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
    }
  }, {
    key: "lerp",
    value: function lerp(v, t) {
      return new Vec3(this.x + (v.x - this.x) * t, this.y + (v.y - this.y) * t, this.z + (v.z - this.z) * t);
    }
  }, {
    key: "getNormal",
    value: function getNormal(b, c) {
      return this.sub(b).cross(this.sub(c)).normalize;
    }
  }, {
    key: "getAngle",
    value: function getAngle(v) {
      return this.normalize.dot(v.normalize);
    }
  }, {
    key: "forward",
    get: function get() {
      return this.normalize;
    }
  }, {
    key: "backward",
    get: function get() {
      return this.normalize.invert;
    }
  }, {
    key: "left",
    get: function get() {
      return this.forward.cross(Vec3.up).normalize;
    }
  }, {
    key: "right",
    get: function get() {
      return this.forward.cross(Vec3.up).normalize.invert;
    }
  }, {
    key: "down",
    get: function get() {
      return this.forward.cross(this.left).normalize;
    }
  }, {
    key: "up",
    get: function get() {
      return this.forward.cross(this.left).normalize.invert;
    }
  }, {
    key: "clone",
    get: function get() {
      return new Vec3(this.x, this.y, this.z);
    }
  }, {
    key: "len",
    get: function get() {
      return sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
  }, {
    key: "lenSqrt",
    get: function get() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }
  }, {
    key: "normalize",
    get: function get() {
      var r = sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
      if (r > 0) {
        r = 1 / r;
        return new Vec3(this.x * r, this.y * r, this.z * r);
      }
      return new Vec3(0, 0, 0);
    }
  }, {
    key: "invert",
    get: function get() {
      return new Vec3(-this.x, -this.y, -this.z);
    }
  }]);

  return Vec3;
}();

exports.default = Vec3;

/***/ }),

/***/ "./public/glib/src/model/geometry.js":
/*!*******************************************!*\
  !*** ./public/glib/src/model/geometry.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Geometry = function Geometry(vertexOffset, vertexCount) {
  _classCallCheck(this, Geometry);

  this.vertexOffset = vertexOffset;
  this.vertexCount = vertexCount;
  this.mesh = null;
};

exports.default = Geometry;

/***/ }),

/***/ "./public/glib/src/model/mesh.js":
/*!***************************************!*\
  !*** ./public/glib/src/model/mesh.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _resource = __webpack_require__(/*! ../core/resource */ "./public/glib/src/core/resource.js");

var _resource2 = _interopRequireDefault(_resource);

var _geometry = __webpack_require__(/*! ./geometry */ "./public/glib/src/model/geometry.js");

var _geometry2 = _interopRequireDefault(_geometry);

var _math = __webpack_require__(/*! ../math */ "./public/glib/src/math/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var generateGeometries = function generateGeometries(ind) {
  var geometries = [];
  var count = 0;
  var regex = /[a-z_]+(?:\.\w+)?/i;
  geometries.push(new _geometry2.default(0, null));
  if (regex.test(ind[0])) {
    ind.splice(0, 1);
  }
  for (var i = 0; i < ind.length; i += 1) {
    if (regex.test(ind[i])) {
      ind.splice(i, 1);
      geometries[geometries.length - 1].vertexCount = count * 3;
      geometries.push(new _geometry2.default(i * 3, null));
      count = 0;
      i -= 1;
      continue;
    }
    count += 1;
  }
  geometries[geometries.length - 1].count = count * 3;
  return geometries;
};
var generateNormals = function generateNormals(vertices, indices, hasTexCoords) {
  var normals = [];
  var newIndices = [];
  if (indices) {
    var il = indices.length;
    if (hasTexCoords) {
      for (var i = 0; i < il; i += 6) {
        var normal = vertices[indices[i + 0]].getNormal(vertices[indices[i + 2]], vertices[indices[i + 4]]);
        normals.push(normal, normal, normal);
        newIndices.push(indices[i + 0], indices[i + 1], i / 2 + 0, indices[i + 2], indices[i + 3], i / 2 + 1, indices[i + 4], indices[i + 5], i / 2 + 2);
      }
    } else {
      for (var _i = 0; _i < il; _i += 3) {
        var _normal = vertices[indices[_i + 0]].getNormal(vertices[indices[_i + 1]], vertices[indices[_i + 2]]);
        normals.push(_normal, _normal, _normal);
        newIndices.push(indices[_i + 0], normalIndice, _i + 0, indices[_i + 1], normalIndice, _i + 1, indices[_i + 2], normalIndice, _i + 2);
      }
    }
  } else {
    var vl = vertices.length;
    for (var _i2 = 0; _i2 < vl; _i2 += 3) {
      var _normal2 = vertices[_i2 + 0].getNormal(vertices[_i2 + 1], vertices[_i2 + 2]);
      normals.push(_normal2, _normal2, _normal2);
    }
  }
  return { normals: normals, indices: newIndices };
};

var Mesh = function (_Resource) {
  _inherits(Mesh, _Resource);

  _createClass(Mesh, null, [{
    key: 'parse',
    value: function parse(resource, data) {
      var vertices = [];
      var texCoords = [];
      var normals = [];
      var indices = [];

      var nextLine = /^(\w+) (.+)$/gm;
      var allFloats = /-?\d+\.\d+/g;
      var allInts = /\d+/g;
      var line = '';
      while (line = lineRegEx.exec(nextLine)) {
        switch (line[1]) {
          // Vertice
          case 'v':
            vertices.push(new (Function.prototype.bind.apply(_math.Vec3, [null].concat(_toConsumableArray(line[2].match(allFloats).map(parseFloat)))))());break;
          // Texturecoordinate
          case 'vt':
            texCoords.push(new (Function.prototype.bind.apply(_math.Vec2, [null].concat(_toConsumableArray(line[2].match(allFloats).map(parseFloat)))))());break;
          // Normal
          case 'vn':
            normals.push(new (Function.prototype.bind.apply(_math.Vec3, [null].concat(_toConsumableArray(line[2].match(allFloats).map(parseFloat)))))());break;
          // Indices for next 3 vertices
          case 'f':
            indices.push.apply(indices, _toConsumableArray(line[2].match(allInts).map(function (num) {
              return parseInt(num, 10) - 1;
            })));break;
          // Point where material usage starts
          case 'g':
            indices.push(line[2]);break;
          // Comment
          case '#':
            break;
          // Object name
          case 'o':
            break;
          // Name to switch to at this point of indices
          case 'usemtl':
            break;
          // Smooth shading 1 (on) or off (off)
          case 's':
            break;
          // Materials library and filename
          case 'mtllib':
            break;
          // For now log if there is unknown line start
          default:
            throw new Error(row);
        }
      }

      var geometries = generateGeometries(indices);

      if (vertices.length > 0) {
        attributes.push('a_position');
      }
      var hasTexCoords = texCoords.length > 0;
      if (hasTexCoords) {
        attributes.push('a_texcoord');
      }
      if (normals.length === 0) {
        normals.push(generateNormals(vertices, indices.length > 0 ? indices : null, hasTexCoords));
      }
      attributes.push('a_normal');
    }
  }]);

  function Mesh(url) {
    _classCallCheck(this, Mesh);

    var _this = _possibleConstructorReturn(this, (Mesh.__proto__ || Object.getPrototypeOf(Mesh)).call(this, url));

    _this.vertexBuffer = null;
    _this.indexBuffer = null;
    return _this;
  }

  return Mesh;
}(_resource2.default);

exports.default = Mesh;

/***/ }),

/***/ "./public/glib/src/model/texture.js":
/*!******************************************!*\
  !*** ./public/glib/src/model/texture.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _resource = __webpack_require__(/*! ../core/resource */ "./public/glib/src/core/resource.js");

var _resource2 = _interopRequireDefault(_resource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Texture = function (_Resource) {
  _inherits(Texture, _Resource);

  _createClass(Texture, null, [{
    key: 'parse',
    value: function parse(resource, data) {
      resource.img.src = 'data:image/png;base64,' + data;
    }
  }]);

  function Texture(url) {
    _classCallCheck(this, Texture);

    var _this = _possibleConstructorReturn(this, (Texture.__proto__ || Object.getPrototypeOf(Texture)).call(this, url));

    _this.img = new Image();
    return _this;
  }

  return Texture;
}(_resource2.default);

exports.default = Texture;

/***/ }),

/***/ "./public/glib/src/style.css":
/*!***********************************!*\
  !*** ./public/glib/src/style.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--7!./style.css */ "./node_modules/css-loader/index.js??ref--7!./public/glib/src/style.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"singleton":true,"sourceMap":false,"convertToAbsoluteUrls":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map