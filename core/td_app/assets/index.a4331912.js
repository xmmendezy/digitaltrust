var X=Object.defineProperty,ee=Object.defineProperties;var te=Object.getOwnPropertyDescriptors;var H=Object.getOwnPropertySymbols;var ae=Object.prototype.hasOwnProperty,se=Object.prototype.propertyIsEnumerable;var j=(a,e,t)=>e in a?X(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,E=(a,e)=>{for(var t in e||(e={}))ae.call(e,t)&&j(a,t,e[t]);if(H)for(var t of H(e))se.call(e,t)&&j(a,t,e[t]);return a},x=(a,e)=>ee(a,te(e));var i=(a,e,t)=>(j(a,typeof e!="symbol"?e+"":e,t),t);import{d as C,c as _,a as h,n as re,u as f,b as oe,r as P,o as m,e as ie,m as ne,f as ce,M as p,I as l,g as R,L as $,v as le,h as s,w as A,i as M,j as O,k as Z,T as de,l as ue,p as pe,t as T,q as he,s as fe,F as B,x as me,y as _e,z as ge,A as ve,D as q,B as N,C as be,E as ye,G as we,O as Ee,H as xe,P as Ae,Q as De}from"./vendor.0c19fb08.js";const Pe=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function t(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=t(r);fetch(r.href,n)}};Pe();const Te=C({setup(a){const e=oe();return(t,o)=>{const r=P("router-view");return m(),_("div",{class:re(["trading-app-page",{auth:f(e).meta.isFree}])},[h(r)],2)}}}),ke="modulepreload",U={},Le="/td_app/",u=function(e,t){return!t||t.length===0?e():Promise.all(t.map(o=>{if(o=`${Le}${o}`,o in U)return;U[o]=!0;const r=o.endsWith(".css"),n=r?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${n}`))return;const c=document.createElement("link");if(c.rel=r?"stylesheet":ke,r||(c.as="script",c.crossOrigin=""),c.href=o,document.head.appendChild(c),r)return new Promise((k,D)=>{c.addEventListener("load",k),c.addEventListener("error",D)})})).then(()=>e())},G={"e0bf3ed3-90ee-444c-a5e7-433c4c5deefb":{id:"e0bf3ed3-90ee-444c-a5e7-433c4c5deefb",name:"Costa Rica"},"b9d0adc0-0e8c-4d21-a38c-6eb4bc391b0a":{id:"b9d0adc0-0e8c-4d21-a38c-6eb4bc391b0a",name:"M\xE9xico"},"c0771aec-6bc6-425d-a98a-e925e486fa01":{id:"c0771aec-6bc6-425d-a98a-e925e486fa01",name:"Colombia"},"7e0539e2-95dd-436f-9318-f360d8fa02ab":{id:"7e0539e2-95dd-436f-9318-f360d8fa02ab",name:"Per\xFA"},"b7e7a241-8b46-4c46-8912-cdd820c44a89":{id:"b7e7a241-8b46-4c46-8912-cdd820c44a89",name:"Argentina"},"8324c485-c22d-433d-98d8-f92f2403cd96":{id:"8324c485-c22d-433d-98d8-f92f2403cd96",name:"Ecuador"},"c5e764d9-ba4f-4052-93e2-83d58109738e":{id:"c5e764d9-ba4f-4052-93e2-83d58109738e",name:"Bolivia"},"a455be64-bb49-45cd-ad87-d1db2df1fbb6":{id:"a455be64-bb49-45cd-ad87-d1db2df1fbb6",name:"Chile"},"c2db137d-4faa-4f86-b181-810a497736fc":{id:"c2db137d-4faa-4f86-b181-810a497736fc",name:"Venezuela"},"e784fabe-cc6b-4673-81dc-9d433dcdc31a":{id:"e784fabe-cc6b-4673-81dc-9d433dcdc31a",name:"El Salvador"},"74a20402-2d7e-4d60-91c3-3d90f0bbd411":{id:"74a20402-2d7e-4d60-91c3-3d90f0bbd411",name:"Guatemala"},"2c940872-fda0-4302-94df-2ffc7948601b":{id:"2c940872-fda0-4302-94df-2ffc7948601b",name:"Honduras"},"ec79c66f-b68c-40f2-a587-fa7e1092653e":{id:"ec79c66f-b68c-40f2-a587-fa7e1092653e",name:"Nicaragua"},"4286534d-98bf-4b79-b125-a453e4a9aad5":{id:"4286534d-98bf-4b79-b125-a453e4a9aad5",name:"Panam\xE1"},"dbe26aab-ad01-48cb-973d-d5c20dcd42b5":{id:"dbe26aab-ad01-48cb-973d-d5c20dcd42b5",name:"Paraguay"},"7a87a585-2a2f-4748-93bf-5221dbeb7f67":{id:"7a87a585-2a2f-4748-93bf-5221dbeb7f67",name:"Uruguay"}},Ce={e000:"Ha ocurrido un error","login.error.u1":"No se ha podido iniciar sessi\xF3n, confirme que su usuario y contrase\xF1a sean validos","login.error.u2":"No se ha podido iniciar sessi\xF3n, su contrase\xF1a no es valida","login.error.u3":"No se ha podido iniciar sessi\xF3n, no ha proporcinado sus credenciales completas","validator.auth.a":"No puede haber campos vac\xEDos","validator.auth.b":"El nombre debe ser solo caracteres alfab\xE9ticos","validator.auth.c":"El apellido debe ser solo caracteres alfab\xE9ticos","validator.auth.d":"Debe ser un correo valido","validator.auth.e":"La contrase\xF1a debe ser solo caracteres alfanum\xE9ricos, comenzar con may\xFAscula y contener al menos un n\xFAmero.","validator.auth.f":"La contrase\xF1a debe tener entre 8 y 50 caracteres","validator.auth.g":"Las contrase\xF1as no coinciden","validator.auth.i":"Pa\xEDs no valido","validator.auth.k":"Correo no disponible, ya registrado","validator.auth.l":"El usuario debe tener solo caracteres alfanum\xE9ricos","validator.auth.m":"Usuario no disponible, ya registrado","course.a":"No se ha encontrado el curso","course.b":"El usuario no puede tener m\xE1s de un curso","invoice.a":"No se ha podido procesar su pago, por favor contacte a servicio al cliente","invoice.b":"No se ha podido procesar su pago, confirme que su tarjeta es valida y los datos correctos","validator.editor.a":"El T\xEDtulo no puede estar vac\xEDo","validator.editor.b":"El T\xEDtulo debe ser solo caracteres alfanum\xE9ricos","validator.editor.c":"No hay pa\xEDses validos","validator.editor.d":"No puede haber campos vac\xEDos","validator.editor.e":"Ha ocurrido un error con el formulario"},$e={PayPal:{client_id:{}.VITE_PAYPAL_PUBLIC_KEY}},F=ie("data",{state:()=>({base_url:"https://www.tradingdigital.net/td/api",authenticated:!1,jwt:void 0,user:void 0,course:void 0,course_data:void 0,payed:void 0,notice_edit:void 0}),getters:{countries(){return Object.values(G)},config(){return $e}},actions:{http(a,e=!1){const t=ne(this.base_url+"/"+a);return this.jwt&&e&&(t.options.headers.Authorization="Bearer "+this.jwt),t},notification(a,e){const{oruga:t}=ce(),o=Ce[a];t.notification.open({duration:5e3,message:o||(e==="link"?a:`Mensaje con c\xF3digo de error: ${a}`),position:"bottom-right",variant:e,closable:!0})},async login(a){if(a.username&&a.password){const e=await this.http("login").post("",a);return e.accessToken?(this.authenticated=!0,this.jwt=e.accessToken,this.user=e.user,""):(this.notification(e.error,"warning"),e.error)}else return this.notification("login.error.u3","warning"),"login.error.u3"},logout(){this.jwt=void 0,this.user=void 0,this.course=void 0,this.course_data=void 0,this.notice_edit=void 0,this.authenticated=!1,S.push({path:"/login"})},async signup(a){const e=a.validate();if(e.length)return this.notification(e[0],"warning"),e[0];{const t=await this.http("signup").post("",a);return t.accessToken?(this.authenticated=!0,this.jwt=t.accessToken,this.user=t.user,""):(this.notification(t.error,"warning"),t.error)}},async update(a){const e=a.validate();if(e.length)return this.notification(e[0],"warning"),e[0];{const t=await this.http("user",!0).patch("",a);return t.error?(this.notification(t.error,"warning"),t.error):(this.user=t,"")}},async reset_password(a){const e=await this.http("reset_password",!0).get("?email="+a);return e.error?(this.notification(e.error,"warning"),e):""},async myCourse(){const a=await this.http("subscribe_course",!0).get("");return a.error?(this.notification(a.error,"warning"),a):(this.course=a.id,a)},async subscribeCourse(a){const e=await this.http("subscribe_course",!0).post("",{course:a});return e.error?(this.notification(e.error,"warning"),e.error):(this.course=e.id,"")},async courses(){return await this.http("courses").get("")},async status(){return await this.http("status",!0).get("")},async post_paypal(a){const e=await this.http("paypal",!0).post("",{reference:a});return e.error?(this.notification(e.error,"warning"),e.error):""},async get_coinbase(){const a=await this.http("coinbase",!0).get("");return a.error?(this.notification(a.error,"warning"),""):a.url},async post_4geeks(a){const e=await this.http("4geeks",!0).post("",a);return e.error?(this.notification(e.error,"warning"),e.error):""},async clients(){return await this.http("clients",!0).get("")},async subscribe_mails(){return await this.http("subscribe_mails",!0).get("")},async notice(a){const e=a.validate();if(e.length)return this.notification(e[0],"warning"),e[0];{const t=await this.http("notice",!0).post("",{id:a.id,title:a.title,courses:a.courses,description:a.description,url:a.url});return t.error?(this.notification(t.error,"warning"),t.error):""}},async notices(){return await this.http("notice",!0).get("")},async delete_notice(a){return(await this.http("notice",!0).delete(a)).error},async blog(a){const e=a.validate();if(e.length)return this.notification(e[0],"warning"),e[0];{const t=await this.http("blog",!0).post("",{id:a.id,title:a.title,courses:a.courses,description:a.description,content:a.content});return t.error?(this.notification(t.error,"warning"),t.error):""}},async blogs(){return await this.http("blog",!0).get("")},async delete_blog(a){return(await this.http("blog",!0).delete(a)).error}}});var Oe=Object.defineProperty,Ne=Object.getOwnPropertyDescriptor,d=(a,e,t,o)=>{for(var r=o>1?void 0:o?Ne(e,t):e,n=a.length-1,c;n>=0;n--)(c=a[n])&&(r=(o?c(e,t,r):c(r))||r);return o&&r&&Oe(e,t,r),r};const Q=Object.keys(G);function J(a){return(a.constraints?Object.values(a.constraints):[]).concat(...(a.children||[]).map(J))}class I{validate(){return Array.from(new Set([].concat(...le(this).map(J))))}}class v extends I{constructor(){super();i(this,"username");i(this,"firstname");i(this,"lastname");i(this,"email");i(this,"password");i(this,"password_confirm");i(this,"country");i(this,"ref");this.username="",this.firstname="",this.lastname="",this.email="",this.password="",this.password_confirm="",this.country="",this.ref=""}validate(){const e=super.validate();return this.equalsPassword||e.push("validator.auth.g"),this.country&&!Q.find(t=>t===this.country)&&e.push("validator.auth.g"),Array.from(new Set(e))}get equalsPassword(){return this.password===this.password_confirm}}d([p(/^[a-z][a-z0-9_-]{3,16}$/,{always:!0,message:"validator.auth.l"}),l({message:"validator.auth.a"})],v.prototype,"username",2);d([p(/^[a-zA-Z-ZñÑáéíóúÁÉÍÓÚ\s]+$/,{always:!0,message:"validator.auth.b"}),l({message:"validator.auth.a"})],v.prototype,"firstname",2);d([p(/^[a-zA-Z-ZñÑáéíóúÁÉÍÓÚ\s]+$/,{always:!0,message:"validator.auth.c"}),l({message:"validator.auth.a"})],v.prototype,"lastname",2);d([R({},{message:"validator.auth.d"}),l({message:"validator.auth.a"})],v.prototype,"email",2);d([p(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,}$/,{always:!0,message:"validator.auth.e"}),$(8,50,{message:"validator.auth.f"}),l({message:"validator.auth.a"})],v.prototype,"password",2);d([p(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,}$/,{always:!0,message:"validator.auth.e"}),$(8,50,{message:"validator.auth.f"}),l({message:"validator.auth.a"})],v.prototype,"password_confirm",2);d([l({message:"validator.auth.a"})],v.prototype,"country",2);var z;(function(a){a.ADMIN="admin",a.USER="user"})(z||(z={}));var K;(function(a){a.REMOVED="removed",a.PENDING="pending",a.CONFIRM="confirm"})(K||(K={}));class b extends I{constructor(e){super();i(this,"data");i(this,"firstname");i(this,"lastname");i(this,"username");i(this,"email");i(this,"password");i(this,"password_confirm");i(this,"country");e?(this.data=e,this.firstname=e.firstname,this.lastname=e.lastname,this.username=e.username,this.email=e.email,this.password="Secret00__",this.password_confirm="Secret00__",this.country=e.country__id):(this.firstname="",this.lastname="",this.username="",this.email="",this.password="",this.password_confirm="",this.country="")}validate(){const e=super.validate();return this.equalsPassword||e.push("validator.auth.g"),this.country&&!Q.find(t=>t===this.country)&&e.push("validator.auth.g"),Array.from(new Set(e))}get equalsPassword(){return this.password===this.password_confirm}}d([p(/^[a-zA-Z-ZñÑáéíóúÁÉÍÓÚ\s]+$/,{always:!0,message:"validator.auth.b"}),l({message:"validator.auth.a"})],b.prototype,"firstname",2);d([p(/^[a-zA-Z-ZñÑáéíóúÁÉÍÓÚ\s]+$/,{always:!0,message:"validator.auth.c"}),l({message:"validator.auth.a"})],b.prototype,"lastname",2);d([p(/^[a-z][a-z0-9_-]{3,16}$/,{always:!0,message:"validator.auth.l"}),l({message:"validator.auth.a"})],b.prototype,"username",2);d([R({},{message:"validator.auth.d"}),l({message:"validator.auth.a"})],b.prototype,"email",2);d([p(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,}$/,{always:!0,message:"validator.auth.e"}),$(8,50,{message:"validator.auth.f"}),l({message:"validator.auth.a"})],b.prototype,"password",2);d([p(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,}$/,{always:!0,message:"validator.auth.e"}),$(8,50,{message:"validator.auth.f"}),l({message:"validator.auth.a"})],b.prototype,"password_confirm",2);d([l({message:"validator.auth.a"})],b.prototype,"country",2);class Fe extends I{constructor(e){super();i(this,"id");i(this,"title");i(this,"courses");i(this,"description");i(this,"url");i(this,"all_courses");i(this,"editor");this.id="",this.title="",this.courses=[],this.url="",this.editor=e}clean(){var e;this.id="",this.title="",this.courses=[],(e=this.editor)==null||e.setContents(""),this.url=""}setHTML(e){var t;(t=this.editor)==null||t.setHTML(e)}validate(){const e=super.validate();return this.all_courses.filter(t=>this.courses.includes(t)).length||e.push("validator.editor.c"),this.editor!==void 0?(this.editor.getText()===`
`&&e.push("validator.editor.d"),this.description=this.editor.getHTML()):e.push("validator.editor.e"),Array.from(new Set(e))}}d([p(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9¿¡][a-zA-ZñÑáéíóúÁÉÍÓÚ0-9][a-zA-ZñÑáéíóúÁÉÍÓÚ0-9_\-,.¿?¡!\s]{3,70}$/,{always:!0,message:"validator.editor.b"}),l({message:"validator.editor.a"})],Fe.prototype,"title",2);class Ie extends I{constructor(e,t){super();i(this,"id");i(this,"title");i(this,"courses");i(this,"description");i(this,"content");i(this,"all_courses");i(this,"editor_description");i(this,"editor_content");this.id="",this.title="",this.courses=[],this.editor_description=e,this.editor_content=t}clean(){var e,t;this.id="",this.title="",this.courses=[],(e=this.editor_description)==null||e.setContents(""),(t=this.editor_content)==null||t.setContents("")}setDescriptionHTML(e){var t;(t=this.editor_description)==null||t.setHTML(e)}setContentHTML(e){var t;(t=this.editor_content)==null||t.setHTML(e)}validate(){const e=super.validate();return this.all_courses.filter(t=>this.courses.includes(t)).length||e.push("validator.editor.c"),this.editor_description!==void 0?(this.editor_description.getText()===`
`&&e.push("validator.editor.d"),this.description=this.editor_description.getHTML()):e.push("validator.editor.e"),this.editor_content!==void 0?(this.editor_content.getText()===`
`&&e.push("validator.editor.d"),this.content=this.editor_content.getHTML()):e.push("validator.editor.e"),Array.from(new Set(e))}}d([p(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9¿¡][a-zA-ZñÑáéíóúÁÉÍÓÚ0-9][a-zA-ZñÑáéíóúÁÉÍÓÚ0-9_\-,.¿?¡!\s]{3,70}$/,{always:!0,message:"validator.editor.b"}),l({message:"validator.editor.a"})],Ie.prototype,"title",2);var Se=(a,e)=>{const t=a.__vccOpts||a;for(const[o,r]of e)t[o]=r;return t};const je={class:"tabs"},Me=O("Inicio"),ze={key:0},Ve=O("Blog"),He=O("Configuraci\xF3n"),Re=C({setup(a){const e=F();return(t,o)=>{var n;const r=P("router-link");return m(),_("div",je,[s("ul",null,[s("li",null,[h(r,{to:"/"},{default:A(()=>[Me]),_:1})]),((n=f(e).course_data)==null?void 0:n.blog)?(m(),_("li",ze,[h(r,{to:"/blog"},{default:A(()=>[Ve]),_:1})])):M("",!0),s("li",null,[h(r,{to:"/setting"},{default:A(()=>[He]),_:1})]),s("li",null,[s("a",{onClick:o[0]||(o[0]=c=>f(e).logout())},"Salir")])])])}}});var Ze=Se(Re,[["__scopeId","data-v-8d03299c"]]),Be="/td_app/assets/logo.955e6a20.png";const qe={class:"default"},Ue={class:"card card-main"},Ge={class:"card-header"},Qe=s("figure",{class:"image is-64x64 logo"},[s("img",{alt:"TradingDigital",src:Be})],-1),Je=s("p",{class:"card-header-title"},"TradingDigital",-1),Ke={class:"card-content"},We={style:{position:"relative"}},Ye=C({setup(a){const e=F(),t=Z(!1),o=()=>{t.value=!t.value};return e.myCourse().then(r=>{e.course=r.id,e.course_data=r}),(r,n)=>{const c=Ze,k=P("router-view"),D=P("o-loading");return m(),_("div",qe,[s("div",Ue,[s("header",Ge,[Qe,Je,h(c,{class:"is-hidden-mobile"})]),s("div",Ke,[h(c,{class:"is-hidden-tablet"}),s("div",We,[h(k,null,{default:A(({Component:y,route:L})=>[h(de,{name:L.meta.transitionName},{default:A(()=>[(m(),ue(pe(y),{onLoading:o}))]),_:2},1032,["name"])]),_:1}),h(D,{active:t.value,"onUpdate:active":n[0]||(n[0]=y=>t.value=y)},null,8,["active"])])])])])}}}),Xe={admin:()=>u(()=>import("./admin.9c6d890f.js"),["assets/admin.9c6d890f.js","assets/admin.f39759a3.css","assets/vendor.0c19fb08.js","assets/vendor.8a18f9ae.css"]),auth:()=>u(()=>import("./auth.19b3b6b6.js"),["assets/auth.19b3b6b6.js","assets/vendor.0c19fb08.js","assets/vendor.8a18f9ae.css"]),default:Ye,ebook:()=>u(()=>import("./ebook.3f1688e0.js"),["assets/ebook.3f1688e0.js","assets/vendor.0c19fb08.js","assets/vendor.8a18f9ae.css"])};function et(a){return a.map(e=>{var t;return{path:e.path,component:Xe[((t=e.meta)==null?void 0:t.layout)||"default"],children:[x(E({},e),{path:""})]}})}const tt={class:"index"},at={class:"columns-content"},st={class:"column-content has-text-centered"},rt={class:"card"},ot={class:"card-content media"},it={class:"media-content"},nt={class:"content"},ct=s("br",null,null,-1),lt=s("br",null,null,-1),dt={class:"elements fa-ul has-text-left"},ut=s("span",{class:"fa-li"},[s("i",{class:"fas fa-book"})],-1),pt=O(" Ebook - La biblia de las candelas "),ht=s("li",null,[s("span",{class:"fa-li"},[s("i",{class:"fab fa-facebook"})]),s("a",{href:"https://www.facebook.com/groups/1581445272215796",target:"_blank"}," Grupo privado de Facebook ")],-1),ft=s("span",{class:"fa-li"},[s("i",{class:"fab fa-telegram"})],-1),mt=["href"],_t=_e('<p class="mt-5 mb-0 is-size-5 has-text-weight-bold">Enlaces de interes</p><ul class="elements fa-ul mt-3 has-text-left"><li><span class="fa-li"><i class="fas fa-star"></i></span><a href="https://www.investing.com/economic-calendar/" target="_blank"> Economic Calendar </a></li><li><span class="fa-li"><i class="fas fa-star"></i></span><a href="https://www.forexfactory.com" target="_blank"> Forexfactory </a></li><li><span class="fa-li"><i class="fas fa-star"></i></span><a href="https://www.dailyfx.com/sentiment" target="_blank"> Dailyfx </a></li><li><span class="fa-li"><i class="fas fa-star"></i></span><a href="https://www.myfxbook.com/es/forex-calculators/position-size" target="_blank"> Forex Calculators </a></li><li><span class="fa-li"><i class="fas fa-star"></i></span><a href="https://es.tradingview.com/u/DigitalTrust/" target="_blank"> DigitalTrust en TradingView </a></li></ul>',2),gt={class:"column-content main"},vt=s("p",{class:"has-text-centered"},"Comunicados",-1),bt={class:"card-content media"},yt={class:"media-content"},wt={class:"content"},Et={class:"level is-mobile"},xt={class:"level-left"},At={class:"level-right"},Dt=s("p",null,[s("strong",null,"Descripci\xF3n")],-1),Pt=["innerHTML"],Tt={key:0},kt=["href"],Lt=C({emits:["loading"],setup(a,{emit:e}){const t=F(),o=Z([]);e("loading"),t.notices().then(c=>{o.value=c,e("loading")});const r=c=>c?"$"+c.price+"/90 d\xEDas":"---",n=c=>he(fe(c),"dd/MM/yyyy");return(c,k)=>{var y,L,V;const D=P("router-link");return m(),_("div",tt,[s("div",at,[s("div",st,[s("article",rt,[s("div",ot,[s("div",it,[s("div",nt,[s("p",null,[s("strong",null,T((y=f(t).course_data)==null?void 0:y.name),1),ct,s("small",null,T(r(f(t).course_data)),1),lt,s("small",null,"Pr\xF3ximo pago: "+T(((L=f(t))==null?void 0:L.course_data)?n(f(t).course_data.nextPayment):"---"),1)])])])])]),s("ul",dt,[s("li",null,[ut,h(D,{to:"/ebook/1"},{default:A(()=>[pt]),_:1})]),ht,s("li",null,[ft,s("a",{href:(V=f(t).course_data)==null?void 0:V.telegram,target:"_blank"}," Comunidad de Telegram ",8,mt)])]),f(t).course_data&&f(t).course_data.id!=="b19b80ca-bfe2-4b58-8a24-8b0723e5c2ec"?(m(),_(B,{key:0},[_t],64)):M("",!0)]),s("div",gt,[vt,(m(!0),_(B,null,me(o.value,w=>(m(),_("article",{class:"card",key:w.id},[s("div",bt,[s("div",yt,[s("div",wt,[s("nav",Et,[s("div",xt,[s("strong",null,T(w.title),1)]),s("div",At,T(n(w.created)),1)]),Dt,s("div",{class:"notice-description ql-editor",innerHTML:w.description},null,8,Pt),w.url?(m(),_("p",Tt,[s("a",{href:w.url,target:"_blank"}," Enlace",8,kt)])):M("",!0)])])])]))),128))])])])}}}),Ct=[{name:"signup",path:"/signup",component:()=>u(()=>import("./signup.4790dcd3.js"),["assets/signup.4790dcd3.js","assets/signup.15b50671.css","assets/vendor.0c19fb08.js","assets/vendor.8a18f9ae.css"]),props:!0,meta:{layout:"auth",isFree:!0}},{name:"setting",path:"/setting",component:()=>u(()=>import("./setting.b10241f3.js"),["assets/setting.b10241f3.js","assets/vendor.0c19fb08.js","assets/vendor.8a18f9ae.css"]),props:!0},{name:"logout",path:"/logout",component:()=>u(()=>import("./logout.38afa8b9.js"),["assets/logout.38afa8b9.js","assets/vendor.0c19fb08.js","assets/vendor.8a18f9ae.css"]),props:!0},{name:"login",path:"/login",component:()=>u(()=>import("./login.583abf78.js"),["assets/login.583abf78.js","assets/vendor.0c19fb08.js","assets/vendor.8a18f9ae.css"]),props:!0,meta:{layout:"auth",isFree:!0}},{name:"ebook-1",path:"/ebook/1",component:()=>u(()=>import("./1.070cc682.js"),["assets/1.070cc682.js","assets/vendor.0c19fb08.js","assets/vendor.8a18f9ae.css"]),props:!0,meta:{layout:"ebook"}},{name:"blog",path:"/blog",component:()=>u(()=>import("./blog.b6e6a023.js"),["assets/blog.b6e6a023.js","assets/vendor.0c19fb08.js","assets/vendor.8a18f9ae.css"]),props:!0},{name:"admin-notice",path:"/admin/notice",component:()=>u(()=>import("./notice.20a24cdc.js"),["assets/notice.20a24cdc.js","assets/vendor.0c19fb08.js","assets/vendor.8a18f9ae.css"]),props:!0,meta:{layout:"admin",isAdmin:!0}},{name:"admin-blog",path:"/admin/blog",component:()=>u(()=>import("./blog.75729127.js"),["assets/blog.75729127.js","assets/vendor.0c19fb08.js","assets/vendor.8a18f9ae.css"]),props:!0,meta:{layout:"admin",isAdmin:!0}},{name:"admin",path:"/admin",component:()=>u(()=>import("./index.da4602d2.js"),["assets/index.da4602d2.js","assets/vendor.0c19fb08.js","assets/vendor.8a18f9ae.css"]),props:!0,meta:{layout:"admin",isAdmin:!0}},{name:"index",path:"/",component:Lt,props:!0},{name:"all",path:"/:all(.*)*",component:()=>u(()=>import("./_...all_.d063e4ff.js"),["assets/_...all_.d063e4ff.js","assets/vendor.0c19fb08.js","assets/vendor.8a18f9ae.css"]),props:!0,meta:{layout:"auth",isFree:!0}}],S=ge({routes:et(Ct),history:ve("/td_app/")});S.beforeEach(async(a,e,t)=>{var r;const o=F();o.authenticated?((r=o.user)==null?void 0:r.role)===z.ADMIN?a.meta.isAdmin?t():t("/admin"):(a.path==="/logout"&&t(),o.payed===void 0&&await o.status().then(n=>{o.payed=n.payed}),console.log("Hola"),o.payed?a.meta.isFree||a.meta.isAdmin?t("/"):t():await o.myCourse().then(n=>{a.path==="/signup"?t():(console.log(q.now().minus({days:5}).toMillis()>n.nextPayment),q.now().minus({days:5}).toMillis()>n.nextPayment?t("/signup"):t())})):a.meta.isFree?t():t("/login")});S.afterEach((a,e)=>{const t=a.path.split("/").length,o=e.path.split("/").length;a.meta.transitionName=t===o?"fade":t<o?"slide-right":"slide-left"});const W=["payed","base_url","notice_edit","couse","course_data"];function $t({store:a}){if(a.$subscribe((e,t)=>{if(e.storeId==="data")for(const o in t)W.includes(o)||localStorage.setItem("data_"+o,JSON.stringify({data:t[o]}))}),a.$id==="data"){for(const e in a.$state)if(!W.includes(e)){const t=localStorage.getItem("data_"+e);t&&(a.$state[e]=JSON.parse(t).data)}}}var Ot=x(E({},N.exports.bulmaConfig),{iconPack:"fas",field:x(E({},N.exports.bulmaConfig.field),{rootClass:(a,e)=>e.props.rootClass==="no"?"field has-text-left":"field is-floating-in-label"}),table:x(E({},N.exports.bulmaConfig.table),{mobileCards:!1}),modal:x(E({},N.exports.bulmaConfig.modal),{canCancel:["escape","x"]})});const g=be(Te);g.use(S);const Y=ye();Y.use($t);g.use(Y);g.use(we());g.use(Ee,Ot);g.use(xe);g.component("Multiselect",Ae);g.component("QuillEditor",De);g.mount("#main_app");export{Ie as B,Fe as N,v as S,b as U,Se as _,Be as a,Ze as b,z as c,F as u};