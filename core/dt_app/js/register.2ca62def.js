(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["register"],{3410:function(e,t,n){"use strict";n("b2da")},4762:function(e,t,n){"use strict";var s=n("c4b4"),r=n("f0cd").findIndex,i=n("90d2"),a="findIndex",c=!0;a in[]&&Array(1)[a]((function(){c=!1})),s({target:"Array",proto:!0,forced:c},{findIndex:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}}),i(a)},"56b4":function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"register"},[n("div",{staticClass:"body has-text-centered"},[n("div",{staticClass:"box is-inline-block"},[n("article",{staticClass:"media"},[n("div",{staticClass:"media-content has-text-centered"},[n("p",{staticClass:"title"},[e._v(e._s(e.$t("register.a")))]),e.ref_name?n("p",{staticClass:"subtitle"},[e._v(" "+e._s(e.$t("register.b"))+" "),n("b",[e._v(e._s(e.ref_name)+".")])]):e.ref_error?n("p",{staticClass:"subtitle"},[e._v(" "+e._s(e.$t("register.ref_error"))+" ")]):e._e(),n("section",{staticClass:"form has-text-centered"},[n("div",{staticClass:"columns"},[n("div",{staticClass:"column"},[n("c-input",{ref:"input",staticClass:"md",attrs:{placeholder:e.$t("register.u")},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.signup()}},model:{value:e.signup_form.username,callback:function(t){e.$set(e.signup_form,"username",t)},expression:"signup_form.username"}})],1),n("div",{staticClass:"column"})]),n("div",{staticClass:"columns"},[n("div",{staticClass:"column"},[n("c-input",{staticClass:"md",attrs:{placeholder:e.$t("register.c")},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.signup()}},model:{value:e.signup_form.firstname,callback:function(t){e.$set(e.signup_form,"firstname",t)},expression:"signup_form.firstname"}})],1),n("div",{staticClass:"column"},[n("c-input",{staticClass:"md",attrs:{placeholder:e.$t("register.d")},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.signup()}},model:{value:e.signup_form.lastname,callback:function(t){e.$set(e.signup_form,"lastname",t)},expression:"signup_form.lastname"}})],1)]),n("div",{staticClass:"columns"},[n("div",{staticClass:"column"},[n("c-input",{staticClass:"md",attrs:{placeholder:e.$t("register.e")},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.signup()}},model:{value:e.signup_form.email,callback:function(t){e.$set(e.signup_form,"email",t)},expression:"signup_form.email"}})],1),n("div",{staticClass:"column"},[n("c-tel-input",{staticClass:"md",attrs:{placeholder:e.$t("register.f")},on:{validate:e.validateNumber,"country-changed":e.changeCountry},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.signup()}},model:{value:e.signup_form.telephone,callback:function(t){e.$set(e.signup_form,"telephone",t)},expression:"signup_form.telephone"}})],1)]),n("div",{staticClass:"columns"},[n("div",{staticClass:"column"},[n("c-input",{staticClass:"md",attrs:{placeholder:e.$t("register.g")},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.signup()}},model:{value:e.signup_form.state,callback:function(t){e.$set(e.signup_form,"state",t)},expression:"signup_form.state"}})],1),n("div",{staticClass:"column"},[n("c-input",{staticClass:"md",attrs:{placeholder:e.$t("register.h")},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.signup()}},model:{value:e.signup_form.address,callback:function(t){e.$set(e.signup_form,"address",t)},expression:"signup_form.address"}})],1)]),n("div",{staticClass:"columns"},[n("div",{staticClass:"column"},[n("c-input",{staticClass:"md",attrs:{placeholder:e.$t("register.i"),password:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.signup()}},model:{value:e.signup_form.password,callback:function(t){e.$set(e.signup_form,"password",t)},expression:"signup_form.password"}})],1),n("div",{staticClass:"column"},[n("c-input",{staticClass:"md",attrs:{placeholder:e.$t("register.j"),password:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.signup()}},model:{value:e.signup_form.password_confirm,callback:function(t){e.$set(e.signup_form,"password_confirm",t)},expression:"signup_form.password_confirm"}})],1)]),n("div",{staticClass:"columns"},[n("div",{staticClass:"column"}),n("div",{staticClass:"column column-check is-6 has-text-left"},[n("b-field",[n("b-checkbox",{model:{value:e.check1,callback:function(t){e.check1=t},expression:"check1"}},[e._v(" "+e._s(e.$t("helper.see"))+" "),n("a",{attrs:{href:e.publicPath+"doc1.pdf",target:"_blank"}},[e._v(e._s(e.$t("register.k")))])])],1),n("b-field",[n("b-checkbox",{model:{value:e.check2,callback:function(t){e.check2=t},expression:"check2"}},[e._v(" "+e._s(e.$t("helper.see"))+" "),n("a",{attrs:{href:e.publicPath+"doc2.pdf",target:"_blank"}},[e._v(e._s(e.$t("register.l")))])])],1)],1),n("div",{staticClass:"column"})]),n("b-field",[n("b-button",{attrs:{type:"is-white",disabled:!(e.check1&&e.check2)},on:{click:function(t){return e.signup()}}},[e._v(e._s(e.$t("register.m")))])],1)],1)])])])])])},r=[],i=n("9c3f"),a=n("fbd4"),c=n("8e72"),o=n("8c6f"),u=n("4d0f"),l=n("e07f"),p=n("3a3f"),f=(n("833b"),n("193d"),n("6984"),n("86c5"),n("108f"),n("4762"),n("6b14")),d=n("df07"),h=n("567d"),m=n("0613"),k=function(e){Object(l["a"])(n,e);var t=Object(p["a"])(n);function n(){var e;return Object(a["a"])(this,n),e=t.apply(this,arguments),e.signup_form=new m["b"],e.ref_name="",e.ref_error=!1,e.check1=!1,e.check2=!1,e.telephoneInternational="",e.countryEnabled="",e.countriesAllow=[],e.countriesAllowIDS=[],e}return Object(c["a"])(n,[{key:"created",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(o["a"])(Object(u["a"])(n.prototype),"created",this).call(this);case 2:return e.next=4,this.store.util.getCountries();case 4:if(e.sent.map((function(e){t.countriesAllow.push(e.code||""),t.countriesAllowIDS.push(e.id||"")})),!("ref"in this.$route.query)){e.next=15;break}return e.t0=this,e.next=9,this.store.api.ref_user(this.$route.query.ref);case 9:e.t1=e.sent,e.t2=function(e){e.id?(t.signup_form.ref=e.id,t.ref_name=e.name):(t.ref_error=!0,t.$router.push({name:"Preregister"}))},e.t3={e000:function(){t.toastError(t.$t("register.e000"))}},e.t0.load_form_api.call(e.t0,e.t1,e.t2,e.t3),e.next=16;break;case 15:this.$router.push({name:"Preregister"});case 16:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"mounted",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.exec_is_render("input",(function(e){e.focus()}));case 1:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"signup",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t,n,s=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!this.check1||!this.check2){e.next=23;break}if(t=this.signup_form.validate(),this.validationTelephone||t.push("validator.auth.h"),!t.length){e.next=7;break}this.toastError(this.$t(t[0])),e.next=23;break;case 7:return n=this.signup_form.telephone,this.signup_form.telephone=this.telephoneInternational,e.t0=this,e.next=12,this.store.api.signup(this.signup_form);case 12:return e.t1=e.sent,e.t2=function(){},e.t3={e000:function(){s.toastError(s.$t("error.e000"))}},e.t0.load_form_api.call(e.t0,e.t1,e.t2,e.t3),this.auth_data=this.store.api.auth_data,this.signup_form.telephone=n,e.next=20,this.store.api.isLogged();case 20:if(!e.sent){e.next=23;break}this.toastSuccess("".concat(this.$t("helper.welcome"),", ").concat(this.store.api.name)),this.$router.push("/");case 23:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"validateNumber",value:function(e){e&&(this.validationTelephone=e.valid,e.number&&(this.telephoneInternational=e.number))}},{key:"changeCountry",value:function(e){var t,n;this.countryEnabled=null!==(t=this.countriesAllow.find((function(t){return t==e.iso2})))&&void 0!==t?t:"",this.signup_form.telephone="";var s=this.countriesAllow.findIndex((function(t){return t==e.iso2}));this.signup_form.country=null!==(n=this.countriesAllowIDS[null!==s&&void 0!==s?s:""])&&void 0!==n?n:""}}]),n}(d["a"]);k=Object(f["a"])([h["a"]],k);var v=k,g=v,_=(n("3410"),n("bdd7")),b=Object(_["a"])(g,s,r,!1,null,null,null);t["default"]=b.exports},b2da:function(e,t,n){},df07:function(e,t,n){"use strict";n.d(t,"a",(function(){return p}));var s=n("9c3f"),r=n("fbd4"),i=n("8e72"),a=n("8c6f"),c=n("4d0f"),o=n("e07f"),u=n("3a3f"),l=(n("833b"),n("9939")),p=function(e){Object(o["a"])(n,e);var t=Object(u["a"])(n);function n(){return Object(r["a"])(this,n),t.apply(this,arguments)}return Object(i["a"])(n,[{key:"created",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return Object(a["a"])(Object(c["a"])(n.prototype),"created",this).call(this),e.next=3,this.store.api.isLogged();case 3:if(!e.sent){e.next=5;break}this.auth_data=this.store.api.auth_data;case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"reload",value:function(){}}]),n}(l["a"])}}]);
//# sourceMappingURL=register.2ca62def.js.map