(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["donations"],{1630:function(t,e,n){},2186:function(t,e,n){"use strict";
/*!
 * paypal-js v3.1.9 (2021-04-27T20:55:56.835Z)
 * Copyright 2020-present, PayPal, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function r(t,e){var n=document.querySelector('script[src="'+t+'"]');if(null===n)return null;var r=s(t,e),i=Object.assign({},n.dataset);if(delete i.uidAuto,Object.keys(i).length!==Object.keys(r.dataset).length)return null;var a=!0;return Object.keys(i).forEach((function(t){i[t]!==r.dataset[t]&&(a=!1)})),a?n:null}function i(t){var e=t.url,n=t.attributes,r=t.onSuccess,i=t.onError,a=s(e,n);a.onerror=i,a.onload=r,document.head.insertBefore(a,document.head.firstElementChild)}function a(t){var e="https://www.paypal.com/sdk/js";t.sdkBaseURL&&(e=t.sdkBaseURL,delete t.sdkBaseURL);var n=c(t["merchant-id"],t["data-merchant-id"]),r=Object.assign({},t,n),i=Object.keys(r).filter((function(t){return"undefined"!==typeof r[t]&&null!==r[t]&&""!==r[t]})).reduce((function(t,e){var n=r[e].toString();return"data-"===e.substring(0,5)?t.dataAttributes[e]=n:t.queryParams[e]=n,t}),{queryParams:{},dataAttributes:{}}),a=i.queryParams,s=i.dataAttributes;return{url:e+"?"+o(a),dataAttributes:s}}function o(t){var e="";return Object.keys(t).forEach((function(n){0!==e.length&&(e+="&"),e+=n+"="+t[n]})),e}function s(t,e){void 0===e&&(e={});var n=document.createElement("script");return n.src=t,Object.keys(e).forEach((function(t){n.setAttribute(t,e[t]),"data-csp-nonce"===t&&n.setAttribute("nonce",e["data-csp-nonce"])})),n}function c(t,e){var n="",r="";return Array.isArray(t)?t.length>1?(n="*",r=t.toString()):n=t.toString():"string"===typeof t&&t.length>0?n=t:"string"===typeof e&&e.length>0&&(n="*",r=e),{"merchant-id":n,"data-merchant-id":r}}function u(t,e){if(void 0===e&&(e=d()),f(t,e),"undefined"===typeof window)return e.resolve(null);var n=a(t),i=n.url,o=n.dataAttributes,s=o["data-namespace"]||"paypal",c=p(s);return r(i,o)&&c?e.resolve(c):l({url:i,attributes:o},e).then((function(){var t=p(s);if(t)return t;throw new Error("The window."+s+" global variable is not available.")}))}function l(t,e){void 0===e&&(e=d()),f(t,e);var n=t.url,r=t.attributes;if("string"!==typeof n||0===n.length)throw new Error("Invalid url.");if("undefined"!==typeof r&&"object"!==typeof r)throw new Error("Expected attributes to be an object.");return new e((function(t,e){if("undefined"===typeof window)return t();i({url:n,attributes:r,onSuccess:function(){return t()},onError:function(){return e(new Error('The script "'+n+'" failed to load.'))}})}))}function d(){if("undefined"===typeof Promise)throw new Error("Promise is undefined. To resolve the issue, use a Promise polyfill.");return Promise}function p(t){return window[t]}function f(t,e){if("object"!==typeof t||null===t)throw new Error("Expected an options object.");if("undefined"!==typeof e&&"function"!==typeof e)throw new Error("Expected PromisePonyfill to be a function.")}n.d(e,"a",(function(){return u}))},"5b0a":function(t,e,n){"use strict";n.d(e,"a",(function(){return h}));var r="https://js.stripe.com/v3",i=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,a="loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",o=function(){for(var t=document.querySelectorAll('script[src^="'.concat(r,'"]')),e=0;e<t.length;e++){var n=t[e];if(i.test(n.src))return n}return null},s=function(t){var e=t&&!t.advancedFraudSignals?"?advancedFraudSignals=false":"",n=document.createElement("script");n.src="".concat(r).concat(e);var i=document.head||document.body;if(!i)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return i.appendChild(n),n},c=function(t,e){t&&t._registerWrapper&&t._registerWrapper({name:"stripe-js",version:"1.14.0",startTime:e})},u=null,l=function(t){return null!==u||(u=new Promise((function(e,n){if("undefined"!==typeof window)if(window.Stripe&&t&&console.warn(a),window.Stripe)e(window.Stripe);else try{var r=o();r&&t?console.warn(a):r||(r=s(t)),r.addEventListener("load",(function(){window.Stripe?e(window.Stripe):n(new Error("Stripe.js not available"))})),r.addEventListener("error",(function(){n(new Error("Failed to load Stripe.js"))}))}catch(i){return void n(i)}else e(null)}))),u},d=function(t,e,n){if(null===t)return null;var r=t.apply(void 0,e);return c(r,n),r},p=Promise.resolve().then((function(){return l(null)})),f=!1;p["catch"]((function(t){f||console.warn(t)}));var h=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];f=!0;var r=Date.now();return p.then((function(t){return d(t,e,r)}))}},7757:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"donations"},[n("div",{staticClass:"body has-text-centered"},[n("div",{staticClass:"box is-inline-block"},[n("p",{staticClass:"title has-text-left"},[t._v(" "+t._s(t.L("donations.title"))+" ")]),n("p",{staticClass:"subtitle has-text-left"},[t._v(" "+t._s(t.L("donations.subtitle"))+" ")]),n("b-steps",{scopedSlots:t._u([{key:"navigation",fn:function(e){var r=e.previous,i=e.next;return[1!==t.DepositStep||t.has_button_payment?t._e():n("b-button",{attrs:{outlined:"",type:"is-primary","icon-pack":"fas","icon-left":"chevron-left"},on:{click:function(t){return t.preventDefault(),r.action(t)}}},[t._v(" "+t._s(t.L("helper.prev"))+" ")]),0===t.DepositStep?n("b-button",{attrs:{outlined:"",type:"is-primary","icon-pack":"fas","icon-right":"chevron-right"},on:{click:function(t){return t.preventDefault(),i.action(t)}}},[t._v(" "+t._s(t.L("helper.next"))+" ")]):t._e(),1!==t.DepositStep||t.has_button_payment?t._e():n("b-button",{attrs:{outlined:"",type:"is-primary","icon-pack":"fas","icon-right":"dollar-sign"},on:{click:function(e){return e.preventDefault(),t.to_pay()}}},[t._v(" "+t._s(t.L("donations.to_pay"))+" ")]),2===t.DepositStep?n("b-button",{attrs:{outlined:"",type:"is-primary","icon-pack":"fas","icon-right":"check"}},[t._v(" "+t._s(t.L("helper.finish"))+" ")]):t._e()]}}]),model:{value:t.DepositStep,callback:function(e){t.DepositStep=e},expression:"DepositStep"}},[n("b-step-item",{attrs:{step:"1",label:t.L("donations.step_1")}},t._l(t.deposit_methods,(function(e){return n("div",{key:e,staticClass:"deposit-box"},[n("div",{staticClass:"columns columns-deposit"},[n("div",{staticClass:"column title has-text-left",on:{click:function(n){t.deposit_method_selected=e}}},[t._v(" "+t._s(t.L("payment_method."+e))+" ")]),n("div",{staticClass:"column is-1"},[n("b-radio",{attrs:{"native-value":e},model:{value:t.deposit_method_selected,callback:function(e){t.deposit_method_selected=e},expression:"deposit_method_selected"}})],1)])])})),0),n("b-step-item",{attrs:{step:"2",label:t.L(t.has_button_payment?"donations.to_pay":"donations.step_2")}},[t.has_button_payment||"blockchain"===t.deposit_method_selected?t._e():n("div",{staticClass:"message-deposit"},[n("div",{staticClass:"column title has-text-left"},[t._v(" "+t._s(t.L("donations.description"))+" ")]),n("div",{staticClass:"buttons"},t._l([10,25,50,100,150,225,250],(function(e){return n("button",{key:e,staticClass:"button button-money",class:{"is-primary":t.moneyDonation===e},on:{click:function(n){t.moneyDonation=e}}},[n("h3",[t._v("$"+t._s(e))])])})),0)]),t.has_button_payment||"blockchain"!==t.deposit_method_selected?t._e():n("div",{staticClass:"message-deposit"},[n("div",{staticClass:"column title has-text-left"},[t._v(" "+t._s(t.L("donations.description_dollar"))+" ")]),n("div",{staticClass:"buttons"},t._l([10,25,50,100,150,225,250],(function(e){return n("button",{key:e,staticClass:"button button-money",class:{"is-primary":t.moneyDonation===e},on:{click:function(n){t.moneyDonation=e}}},[n("h3",[t._v("$"+t._s(e))])])})),0),n("div",{staticClass:"columns"},t._l(t.deposit_blockchains,(function(e){return n("div",{key:e.currency,staticClass:"column",on:{click:function(n){t.deposit_blockchain_currency=e}}},[n("div",{staticClass:"card card-blockchain",class:{"blockchain-selected":t.deposit_blockchain_currency===e}},[n("div",{staticClass:"media"},[n("div",{staticClass:"media-content"},[n("b-image",{attrs:{src:e.image,ratio:"1by1"}}),n("h3",[t._v(t._s(e.name))])],1)])])])})),0)]),t.has_button_payment&&"paypal"===t.deposit_method_selected?n("div",{ref:"paypal-button-container",staticClass:"container-pay",attrs:{id:"paypal-button-container"}}):t._e(),t.has_button_payment&&"stripe"===t.deposit_method_selected?n("div",{staticClass:"container-pay"},[n("b-loading",{attrs:{active:""}})],1):t._e(),t.has_button_payment&&"blockchain"===t.deposit_method_selected?n("div",{staticClass:"container-pay"},[n("b-loading",{attrs:{active:""}})],1):t._e()]),n("b-step-item",{attrs:{step:"3",label:t.L("donations.step_3")}},[n("div",{staticClass:"message-deposit"},[n("div",{staticClass:"column title has-text-left"},[t._v(" "+t._s(t.L("donations.completed_description"))+" ")])])])],1)],1)])])},i=[],a=n("3d66"),o=n("64c7"),s=n("a222"),c=n("c030"),u=n("33b3"),l=n("a5df"),d=n("400f"),p=(n("d8cd"),n("921a"),n("22d3"),n("bbcb")),f=n("df07"),h=n("a1f2"),b=n("2186"),_=n("5b0a"),m=function(t){Object(l["a"])(n,t);var e=Object(d["a"])(n);function n(){var t;return Object(o["a"])(this,n),t=e.apply(this,arguments),t.DepositStep=0,t.has_button_payment=!1,t.stripe_button_disabled=!1,t.stripe_client_secret="",t.deposit_suscription=[],t.deposit_membership_selected="",t.deposit_methods=["paypal","stripe","blockchain"],t.deposit_method_selected="paypal",t.deposit_blockchains=t.store.util.deposit_blockchains,t.deposit_blockchain_currency=t.deposit_blockchains[0],t.moneyDonation=10,t}return Object(s["a"])(n,[{key:"created",value:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(c["a"])(Object(u["a"])(n.prototype),"created",this).call(this);case 2:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"to_pay",value:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if("paypal"!==this.deposit_method_selected){t.next=4;break}Object(b["a"])({"client-id":this.store.util.PayPal.client_id||""}).then((function(t){e.has_button_payment=!0,e.exec_is_render("paypal-button-container",(function(){t&&t.Buttons?t.Buttons({createOrder:function(t,n){return n.order.create({purchase_units:[{amount:{value:e.moneyDonation.toString()}}]})},onApprove:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(n,r){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.DepositStep=3;case 2:case"end":return t.stop()}}),t)})));function n(e,n){return t.apply(this,arguments)}return n}()}).render("#paypal-button-container"):e.toastError(e.L("error.e000"))}))})).catch((function(){e.toastError(e.L("error.e000"))})),t.next=22;break;case 4:if("stripe"!==this.deposit_method_selected){t.next=14;break}return this.has_button_payment=!0,t.t0=this,t.next=9,this.store.api.get_stripe_donation({money:this.moneyDonation});case 9:t.t1=t.sent,t.t2=function(t){Object(_["a"])(e.store.util.Stripe.public_key).then((function(n){n&&n.redirectToCheckout({sessionId:t.id}).then((function(t){t.error&&e.toastError(e.L("error.e000"))}))})).catch((function(){e.toastError(e.L("error.e000"))}))},t.t0.load_form_api.call(t.t0,t.t1,t.t2),t.next=22;break;case 14:if("blockchain"!==this.deposit_method_selected){t.next=22;break}return this.has_button_payment=!0,t.t3=this,t.next=19,this.store.api.get_coinpayments_donation({money:this.moneyDonation,currency:this.deposit_blockchain_currency.currency});case 19:t.t4=t.sent,t.t5=function(t){e.has_button_payment=!1,window.location.href=t.checkout_url},t.t3.load_form_api.call(t.t3,t.t4,t.t5);case 22:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}]),n}(f["a"]);m=Object(p["a"])([h["a"]],m);var y=m,v=y,w=(n("bbaf"),n("3583")),k=Object(w["a"])(v,r,i,!1,null,null,null);e["default"]=k.exports},bbaf:function(t,e,n){"use strict";n("1630")},df07:function(t,e,n){"use strict";n.d(e,"a",(function(){return d}));var r=n("3d66"),i=n("64c7"),a=n("a222"),o=n("c030"),s=n("33b3"),c=n("a5df"),u=n("400f"),l=(n("22d3"),n("9939")),d=function(t){Object(c["a"])(n,t);var e=Object(u["a"])(n);function n(){return Object(i["a"])(this,n),e.apply(this,arguments)}return Object(a["a"])(n,[{key:"created",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return Object(o["a"])(Object(s["a"])(n.prototype),"created",this).call(this),t.next=3,this.store.api.isLogged();case 3:if(!t.sent){t.next=5;break}this.auth_data=this.store.api.auth_data;case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"reload",value:function(){}}]),n}(l["a"])}}]);
//# sourceMappingURL=donations.bd9f9503.js.map