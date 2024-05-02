"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/auth/[...nextauth]";
exports.ids = ["pages/api/auth/[...nextauth]"];
exports.modules = {

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ "next-auth/providers/credentials":
/*!**************************************************!*\
  !*** external "next-auth/providers/credentials" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/credentials");

/***/ }),

/***/ "(api)/./pages/api/auth/[...nextauth].js":
/*!*****************************************!*\
  !*** ./pages/api/auth/[...nextauth].js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"next-auth/providers/credentials\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__);\n// pages/api/auth/[...nextauth].js\n\n\n/*\nCS5356 TODO 1b. Authentication\n\nAdd sign in to your app by setting up NextAuth.\n\nDefine a CredentialsProvider with a username, and authorize the user\nwhen they sign in by creating a user token that sets the user name\nto be the provided username.\n\nNote - For our prototype authentication system, we only need the username\nand no password is required from the user.\n\nSee here for an example - https://next-auth.js.org/providers/credentials#example---username--password\n*/ const options = {\n    providers: [\n        next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default()({\n            // The name to display on the sign in form (e.g. \"Sign in with...\")\n            name: \"Credentials\",\n            // `credentials` is used to generate a form on the sign in page.\n            // You can specify which fields should be submitted, by adding keys to the `credentials` object.\n            // e.g. domain, username, password, 2FA token, etc.\n            // You can pass any HTML attribute to the <input> tag through the object.\n            credentials: {\n                username: {\n                    label: \"Username\",\n                    type: \"text\",\n                    placeholder: \"jsmith\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials, req) {\n                // Add logic here to look up the user from the credentials supplied\n                const user = {\n                    id: `${Math.random()}`,\n                    name: credentials.username\n                };\n                return user;\n                if (user) {\n                    // Any object returned will be saved in `user` property of the JWT\n                    return user;\n                } else {\n                    // If you return null then an error will be displayed advising the user to check their details.\n                    return null;\n                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter\n                }\n            }\n        })\n    ],\n    session: {\n        jwt: true\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((req, res)=>next_auth__WEBPACK_IMPORTED_MODULE_0___default()(req, res, options));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsa0NBQWtDO0FBRUQ7QUFDaUM7QUFFbEU7Ozs7Ozs7Ozs7Ozs7QUFhQSxHQUVBLE1BQU1FLE9BQU8sR0FBRztJQUNkQyxTQUFTLEVBQUU7UUFDVEYsc0VBQW1CLENBQUM7WUFDbEIsbUVBQW1FO1lBQ25FRyxJQUFJLEVBQUUsYUFBYTtZQUNuQixnRUFBZ0U7WUFDaEUsZ0dBQWdHO1lBQ2hHLG1EQUFtRDtZQUNuRCx5RUFBeUU7WUFDekVDLFdBQVcsRUFBRTtnQkFDWEMsUUFBUSxFQUFFO29CQUFFQyxLQUFLLEVBQUUsVUFBVTtvQkFBRUMsSUFBSSxFQUFFLE1BQU07b0JBQUVDLFdBQVcsRUFBRSxRQUFRO2lCQUFFO2dCQUNwRUMsUUFBUSxFQUFFO29CQUFFSCxLQUFLLEVBQUUsVUFBVTtvQkFBRUMsSUFBSSxFQUFFLFVBQVU7aUJBQUU7YUFDbEQ7WUFDRCxNQUFNRyxTQUFTLEVBQUNOLFdBQVcsRUFBRU8sR0FBRyxFQUFFO2dCQUNoQyxtRUFBbUU7Z0JBQ25FLE1BQU1DLElBQUksR0FBRztvQkFBRUMsRUFBRSxFQUFFLENBQUMsRUFBRUMsSUFBSSxDQUFDQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO29CQUFFWixJQUFJLEVBQUVDLFdBQVcsQ0FBQ0MsUUFBUTtpQkFBRTtnQkFDbkUsT0FBT08sSUFBSTtnQkFDWCxJQUFJQSxJQUFJLEVBQUU7b0JBQ1Isa0VBQWtFO29CQUNsRSxPQUFPQSxJQUFJO2dCQUNiLE9BQU87b0JBQ0wsK0ZBQStGO29CQUMvRixPQUFPLElBQUk7Z0JBRVgsMklBQTJJO2dCQUM3SSxDQUFDO1lBQ0gsQ0FBQztTQUNGLENBQUM7S0FDSDtJQUNESSxPQUFPLEVBQUU7UUFDUEMsR0FBRyxFQUFFLElBQUk7S0FDVjtDQUNGO0FBRUQsaUVBQWUsQ0FBQ04sR0FBRyxFQUFFTyxHQUFHLEdBQUtuQixnREFBUSxDQUFDWSxHQUFHLEVBQUVPLEdBQUcsRUFBRWpCLE9BQU8sQ0FBQyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvamVjdC8uL3BhZ2VzL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0uanM/NTI3ZiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBwYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLmpzXG5cbmltcG9ydCBOZXh0QXV0aCBmcm9tIFwibmV4dC1hdXRoXCI7XG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFsc1wiO1xuXG4vKlxuQ1M1MzU2IFRPRE8gMWIuIEF1dGhlbnRpY2F0aW9uXG5cbkFkZCBzaWduIGluIHRvIHlvdXIgYXBwIGJ5IHNldHRpbmcgdXAgTmV4dEF1dGguXG5cbkRlZmluZSBhIENyZWRlbnRpYWxzUHJvdmlkZXIgd2l0aCBhIHVzZXJuYW1lLCBhbmQgYXV0aG9yaXplIHRoZSB1c2VyXG53aGVuIHRoZXkgc2lnbiBpbiBieSBjcmVhdGluZyBhIHVzZXIgdG9rZW4gdGhhdCBzZXRzIHRoZSB1c2VyIG5hbWVcbnRvIGJlIHRoZSBwcm92aWRlZCB1c2VybmFtZS5cblxuTm90ZSAtIEZvciBvdXIgcHJvdG90eXBlIGF1dGhlbnRpY2F0aW9uIHN5c3RlbSwgd2Ugb25seSBuZWVkIHRoZSB1c2VybmFtZVxuYW5kIG5vIHBhc3N3b3JkIGlzIHJlcXVpcmVkIGZyb20gdGhlIHVzZXIuXG5cblNlZSBoZXJlIGZvciBhbiBleGFtcGxlIC0gaHR0cHM6Ly9uZXh0LWF1dGguanMub3JnL3Byb3ZpZGVycy9jcmVkZW50aWFscyNleGFtcGxlLS0tdXNlcm5hbWUtLXBhc3N3b3JkXG4qL1xuXG5jb25zdCBvcHRpb25zID0ge1xuICBwcm92aWRlcnM6IFtcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcbiAgICAgIC8vIFRoZSBuYW1lIHRvIGRpc3BsYXkgb24gdGhlIHNpZ24gaW4gZm9ybSAoZS5nLiBcIlNpZ24gaW4gd2l0aC4uLlwiKVxuICAgICAgbmFtZTogXCJDcmVkZW50aWFsc1wiLFxuICAgICAgLy8gYGNyZWRlbnRpYWxzYCBpcyB1c2VkIHRvIGdlbmVyYXRlIGEgZm9ybSBvbiB0aGUgc2lnbiBpbiBwYWdlLlxuICAgICAgLy8gWW91IGNhbiBzcGVjaWZ5IHdoaWNoIGZpZWxkcyBzaG91bGQgYmUgc3VibWl0dGVkLCBieSBhZGRpbmcga2V5cyB0byB0aGUgYGNyZWRlbnRpYWxzYCBvYmplY3QuXG4gICAgICAvLyBlLmcuIGRvbWFpbiwgdXNlcm5hbWUsIHBhc3N3b3JkLCAyRkEgdG9rZW4sIGV0Yy5cbiAgICAgIC8vIFlvdSBjYW4gcGFzcyBhbnkgSFRNTCBhdHRyaWJ1dGUgdG8gdGhlIDxpbnB1dD4gdGFnIHRocm91Z2ggdGhlIG9iamVjdC5cbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIHVzZXJuYW1lOiB7IGxhYmVsOiBcIlVzZXJuYW1lXCIsIHR5cGU6IFwidGV4dFwiLCBwbGFjZWhvbGRlcjogXCJqc21pdGhcIiB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogXCJQYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfVxuICAgICAgfSxcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscywgcmVxKSB7XG4gICAgICAgIC8vIEFkZCBsb2dpYyBoZXJlIHRvIGxvb2sgdXAgdGhlIHVzZXIgZnJvbSB0aGUgY3JlZGVudGlhbHMgc3VwcGxpZWRcbiAgICAgICAgY29uc3QgdXNlciA9IHsgaWQ6IGAke01hdGgucmFuZG9tKCl9YCwgbmFtZTogY3JlZGVudGlhbHMudXNlcm5hbWUgfVxuICAgICAgICByZXR1cm4gdXNlclxuICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgIC8vIEFueSBvYmplY3QgcmV0dXJuZWQgd2lsbCBiZSBzYXZlZCBpbiBgdXNlcmAgcHJvcGVydHkgb2YgdGhlIEpXVFxuICAgICAgICAgIHJldHVybiB1c2VyXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gSWYgeW91IHJldHVybiBudWxsIHRoZW4gYW4gZXJyb3Igd2lsbCBiZSBkaXNwbGF5ZWQgYWR2aXNpbmcgdGhlIHVzZXIgdG8gY2hlY2sgdGhlaXIgZGV0YWlscy5cbiAgICAgICAgICByZXR1cm4gbnVsbFxuICBcbiAgICAgICAgICAvLyBZb3UgY2FuIGFsc28gUmVqZWN0IHRoaXMgY2FsbGJhY2sgd2l0aCBhbiBFcnJvciB0aHVzIHRoZSB1c2VyIHdpbGwgYmUgc2VudCB0byB0aGUgZXJyb3IgcGFnZSB3aXRoIHRoZSBlcnJvciBtZXNzYWdlIGFzIGEgcXVlcnkgcGFyYW1ldGVyXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICBdLFxuICBzZXNzaW9uOiB7XG4gICAgand0OiB0cnVlLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgKHJlcSwgcmVzKSA9PiBOZXh0QXV0aChyZXEsIHJlcywgb3B0aW9ucyk7XG4iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJDcmVkZW50aWFsc1Byb3ZpZGVyIiwib3B0aW9ucyIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsInVzZXJuYW1lIiwibGFiZWwiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsInJlcSIsInVzZXIiLCJpZCIsIk1hdGgiLCJyYW5kb20iLCJzZXNzaW9uIiwiand0IiwicmVzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/[...nextauth].js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/[...nextauth].js"));
module.exports = __webpack_exports__;

})();