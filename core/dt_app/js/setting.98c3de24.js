(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["setting"],{5040:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"setting"},[a("article",{staticClass:"box"},[a("b-tabs",[a("b-tab-item",{attrs:{label:t.$t("setting.user.title")}},[a("section",{staticClass:"form-user has-text-centered"},[a("div",{staticClass:"columns"},[a("div",{staticClass:"column"},[a("c-input",{ref:"input",staticClass:"md",attrs:{placeholder:t.$t("setting.user.a")},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.update()}},model:{value:t.update_form.username,callback:function(e){t.$set(t.update_form,"username",e)},expression:"update_form.username"}})],1),a("div",{staticClass:"column"})]),a("div",{staticClass:"columns"},[a("div",{staticClass:"column"},[a("c-input",{ref:"input",staticClass:"md",attrs:{placeholder:t.$t("setting.user.b")},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.update()}},model:{value:t.update_form.firstname,callback:function(e){t.$set(t.update_form,"firstname",e)},expression:"update_form.firstname"}})],1),a("div",{staticClass:"column"},[a("c-input",{staticClass:"md",attrs:{placeholder:t.$t("setting.user.c")},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.update()}},model:{value:t.update_form.lastname,callback:function(e){t.$set(t.update_form,"lastname",e)},expression:"update_form.lastname"}})],1)]),a("div",{staticClass:"columns"},[a("div",{staticClass:"column"},[a("c-input",{staticClass:"md",attrs:{placeholder:t.$t("setting.user.d")},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.update()}},model:{value:t.update_form.email,callback:function(e){t.$set(t.update_form,"email",e)},expression:"update_form.email"}})],1),a("div",{staticClass:"column"},[a("c-tel-input",{staticClass:"md",attrs:{defaultCountry:t.default_country,autoDefaultCountry:!1,placeholder:t.$t("setting.user.e")},on:{validate:t.validateNumber,"country-changed":t.changeCountry},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.update()}},model:{value:t.update_form.telephone,callback:function(e){t.$set(t.update_form,"telephone",e)},expression:"update_form.telephone"}})],1)]),a("div",{staticClass:"columns"},[a("div",{staticClass:"column"},[a("c-input",{staticClass:"md",attrs:{placeholder:t.$t("setting.user.f")},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.update()}},model:{value:t.update_form.state,callback:function(e){t.$set(t.update_form,"state",e)},expression:"update_form.state"}})],1),a("div",{staticClass:"column"},[a("c-input",{staticClass:"md",attrs:{placeholder:t.$t("setting.user.g")},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.update()}},model:{value:t.update_form.address,callback:function(e){t.$set(t.update_form,"address",e)},expression:"update_form.address"}})],1)]),a("div",{staticClass:"columns"},[a("div",{staticClass:"column"},[a("c-input",{staticClass:"md",attrs:{placeholder:t.$t("setting.user.h"),password:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.update()}},model:{value:t.update_form.password,callback:function(e){t.$set(t.update_form,"password",e)},expression:"update_form.password"}})],1),a("div",{staticClass:"column"},[a("c-input",{staticClass:"md",attrs:{placeholder:t.$t("setting.user.i"),password:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.update()}},model:{value:t.update_form.password_confirm,callback:function(e){t.$set(t.update_form,"password_confirm",e)},expression:"update_form.password_confirm"}})],1)])])]),t.is_admin?t._e():a("b-tab-item",{attrs:{label:t.$t("setting.accounts.a")}},[a("div",{staticClass:"columns"},[a("div",{staticClass:"column"},[a("section",{staticClass:"form-user has-text-centered"},[a("div",{staticClass:"columns"},[a("div",{staticClass:"column"},[a("c-input",{staticClass:"md",attrs:{placeholder:t.$t("setting.accounts.b")},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.update()}},model:{value:t.update_form.paypal_account,callback:function(e){t.$set(t.update_form,"paypal_account",e)},expression:"update_form.paypal_account"}})],1),a("div",{staticClass:"column"},[a("c-input",{staticClass:"md",attrs:{placeholder:t.$t("setting.accounts.c")},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.update()}},model:{value:t.update_form.stripe_account,callback:function(e){t.$set(t.update_form,"stripe_account",e)},expression:"update_form.stripe_account"}})],1)]),a("div",{staticClass:"columns"},[a("div",{staticClass:"column"},[a("c-input",{staticClass:"md",attrs:{placeholder:t.$t("setting.accounts.d")},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.update()}},model:{value:t.update_form.coinpayments_account,callback:function(e){t.$set(t.update_form,"coinpayments_account",e)},expression:"update_form.coinpayments_account"}})],1),a("div",{staticClass:"column"})]),a("div",{staticClass:"columns"},[a("div",{staticClass:"column has-text-left"},[a("h3",{staticClass:"title has-text-weight-bold"},[t._v(t._s(t.$t("setting.accounts.e")))])]),a("div",{staticClass:"column is-hidden-mobile"})]),a("div",{staticClass:"columns"},[a("div",{staticClass:"column"},[a("c-input",{staticClass:"md",attrs:{placeholder:t.$t("setting.accounts.f")},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.update()}},model:{value:t.update_form.banck_name,callback:function(e){t.$set(t.update_form,"banck_name",e)},expression:"update_form.banck_name"}})],1),a("div",{staticClass:"column"},[a("c-input",{staticClass:"md",attrs:{placeholder:t.$t("setting.accounts.g")},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.update()}},model:{value:t.update_form.banck_address,callback:function(e){t.$set(t.update_form,"banck_address",e)},expression:"update_form.banck_address"}})],1)]),a("div",{staticClass:"columns"},[a("div",{staticClass:"column"},[a("c-input",{staticClass:"md",attrs:{placeholder:t.$t("setting.accounts.h")},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.update()}},model:{value:t.update_form.banck_account_name,callback:function(e){t.$set(t.update_form,"banck_account_name",e)},expression:"update_form.banck_account_name"}})],1),a("div",{staticClass:"column"},[a("c-input",{staticClass:"md",attrs:{placeholder:t.$t("setting.accounts.i")},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.update()}},model:{value:t.update_form.banck_account,callback:function(e){t.$set(t.update_form,"banck_account",e)},expression:"update_form.banck_account"}})],1)]),a("div",{staticClass:"columns"},[a("div",{staticClass:"column"},[a("c-input",{staticClass:"md",attrs:{placeholder:t.$t("setting.accounts.j")},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.update()}},model:{value:t.update_form.banck_routing_name,callback:function(e){t.$set(t.update_form,"banck_routing_name",e)},expression:"update_form.banck_routing_name"}})],1),a("div",{staticClass:"column"},[a("c-input",{staticClass:"md",attrs:{placeholder:t.$t("setting.accounts.k")},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.update()}},model:{value:t.update_form.banck_account_username,callback:function(e){t.$set(t.update_form,"banck_account_username",e)},expression:"update_form.banck_account_username"}})],1)]),a("div",{staticClass:"columns"},[a("div",{staticClass:"column"},[a("c-input",{staticClass:"md",attrs:{placeholder:t.$t("setting.accounts.l")},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.update()}},model:{value:t.update_form.banck_swift_code,callback:function(e){t.$set(t.update_form,"banck_swift_code",e)},expression:"update_form.banck_swift_code"}})],1),a("div",{staticClass:"column"},[a("c-input",{staticClass:"md",attrs:{placeholder:t.$t("setting.accounts.m")},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.update()}},model:{value:t.update_form.banck_iban,callback:function(e){t.$set(t.update_form,"banck_iban",e)},expression:"update_form.banck_iban"}})],1)])])])])])],1),a("b-field",{staticClass:"has-text-right"},[a("b-button",{attrs:{id:"driver-guide-c-3",type:"is-primary",inverted:"",outlined:""},on:{click:function(e){return t.update()}}},[t._v(t._s(t.$t("setting.save")))])],1)],1)])},s=[],u=a("4956"),r=a("fb07"),i=a("c0ac"),c=a("b361"),o=a("64b4"),l=a("922f"),d=a("be31"),p=a("f433"),f=(a("833b"),a("c4bc"),a("7983"),a("3dec"),a("a9d4"),a("6b14")),m=a("df07"),k=a("567d"),_=a("0613"),y=function(t){Object(d["a"])(a,t);var e=Object(p["a"])(a);function a(){var t;return Object(i["a"])(this,a),t=e.apply(this,arguments),t.update_form=new _["c"],t.default_country="",t.telephoneInternational="",t.countryEnabled="",t.countriesAllow=[],t.countriesAllowIDS=[],t}return Object(c["a"])(a,[{key:"created",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["a"])(Object(l["a"])(a.prototype),"created",this).call(this);case 2:return t.next=4,this.store.util.getCountries();case 4:t.sent.map((function(t){e.countriesAllow.push(t.code||""),e.countriesAllowIDS.push(t.id||"")})),this.default_country=this.store.api.country.code,this.auth_data&&this.auth_data.user&&(this.update_form=new _["c"](this.auth_data.user));case 7:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"mounted",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:this.exec_is_render("input",(function(t){t.focus()}));case 1:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"update",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){var e,a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!this.update_form){t.next=15;break}if(e=this.update_form.validate(),this.validationTelephone||e.push("validator.auth.h"),!e.length){t.next=7;break}this.toastError(this.$t(e[0])),t.next=15;break;case 7:return t.t0=this,t.next=10,this.store.api.update(this.update_form);case 10:t.t1=t.sent,t.t2=function(t){if(a.update_form=new _["c"](t.user),t.user.errors.length){a.toastWarning(a.$t("setting.not_ok"));var e,n=Object(u["a"])(t.user.errors);try{for(n.s();!(e=n.n()).done;){var s=e.value;a.toastError(a.$t(s))}}catch(r){n.e(r)}finally{n.f()}}else a.toastSuccess(a.$t("setting.ok"))},t.t3={e000:function(){a.toastError(a.$t("error.e000"))}},t.t0.load_form_api.call(t.t0,t.t1,t.t2,t.t3),this.auth_data=this.store.api.auth_data;case 15:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"validateNumber",value:function(t){t.valid&&(this.validationTelephone=t.valid,t.number&&(this.telephoneInternational=t.number))}},{key:"changeCountry",value:function(t){if(this.update_form){var e,a;this.countryEnabled=null!==(e=this.countriesAllow.find((function(e){return e==t.iso2})))&&void 0!==e?e:"",this.update_form.telephone="";var n=this.countriesAllow.findIndex((function(e){return e==t.iso2}));this.update_form.country=null!==(a=this.countriesAllowIDS[null!==n&&void 0!==n?n:""])&&void 0!==a?a:""}}}]),a}(m["a"]);y=Object(f["a"])([k["a"]],y);var v=y,h=v,b=(a("663a"),a("bdd7")),C=Object(b["a"])(h,n,s,!1,null,null,null);e["default"]=C.exports},"555e":function(t,e,a){},"663a":function(t,e,a){"use strict";a("555e")},a9d4:function(t,e,a){"use strict";var n=a("deba"),s=a("25ff").findIndex,u=a("c460"),r="findIndex",i=!0;r in[]&&Array(1)[r]((function(){i=!1})),n({target:"Array",proto:!0,forced:i},{findIndex:function(t){return s(this,t,arguments.length>1?arguments[1]:void 0)}}),u(r)},df07:function(t,e,a){"use strict";a.d(e,"a",(function(){return d}));var n=a("fb07"),s=a("c0ac"),u=a("b361"),r=a("64b4"),i=a("922f"),c=a("be31"),o=a("f433"),l=(a("833b"),a("9939")),d=function(t){Object(c["a"])(a,t);var e=Object(o["a"])(a);function a(){return Object(s["a"])(this,a),e.apply(this,arguments)}return Object(u["a"])(a,[{key:"created",value:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return Object(r["a"])(Object(i["a"])(a.prototype),"created",this).call(this),t.next=3,this.store.api.isLogged();case 3:if(!t.sent){t.next=5;break}this.auth_data=this.store.api.auth_data;case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"reload",value:function(){}}]),a}(l["a"])}}]);
//# sourceMappingURL=setting.98c3de24.js.map