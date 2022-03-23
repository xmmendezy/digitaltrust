import{o as i,c as m,h as e,d as J,k as h,q as B,S as K,U as Q,V as de,n as O,W as oe,b as a,i as x,a as r,w as c,T as U,F as D,z as R,t as f,X as ie,Y as ce,Z as ue,j,_ as me,$ as _e,u as ve,R as ee,r as w,l as A,a0 as ae}from"./vendor.589a500a.js";import{_ as pe,u as fe,S as he,a as ge}from"./index.da5060a4.js";const be={width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 512 512"},ye=e("path",{d:"M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46s46-20.595 46-46s-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z",fill:"currentColor"},null,-1),ke=[ye];function Ce(d,I){return i(),m("svg",be,ke)}var xe={name:"fa-solid-exclamation-circle",render:Ce},$e="/td_app/images/chip.png";const te=d=>(ce("data-v-10cb1eab"),d=d(),ue(),d),Ve={class:"card-item__side -front"},Fe=["aria-label"],Ne=["src"],Ie={class:"card-item__wrapper"},we={class:"card-item__top"},Me=te(()=>e("img",{src:$e,class:"card-item__chip",alt:"Card chip image"},null,-1)),Ye={class:"card-item__type"},Pe=["src","alt"],je=["for"],Se={key:0,class:"card-item__numberItem"},Te={class:"card-item__content"},Be=["for"],Ee={class:"card-item__holder"},Ue={class:"card-item__name",key:"1"},De={class:"card-item__name",key:"2"},Re=["for"],Ae=["for"],ze={key:"2"},He=j(" / "),Le=["for"],Oe={key:"2"},qe={class:"card-item__side -back"},We=["aria-label"],Xe=["src"],Ge=te(()=>e("div",{class:"card-item__band"},null,-1)),Ze={class:"card-item__cvv"},Je=["for"],Ke={class:"card-item__cvvTitle"},Qe={class:"card-item__cvvBand"},ea={class:"card-item__type"},aa=["src"],ta=J({props:{valueFields:{type:Object,required:!0},inputFields:{type:Object,default:()=>({cardNumber:"v-card-number",cardName:"v-card-name",cardMonth:"v-card-month",cardYear:"v-card-year",cardCvv:"v-card-cvv"})},labels:{type:Object,default:()=>({cardName:"Full Name",cardHolder:"Card Holder",cardMonth:"MM",cardYear:"YY",cardExpires:"Expires",cardCvv:"CVV"})},isCardNumberMasked:{type:Boolean,default:!0},hasRandomBackgrounds:{type:Boolean,default:!0},backgroundImage:{type:[String,Number],default:""},setType:{type:String,default:""}},emits:["get-type"],setup(d,{emit:I}){const s=d,F="#### #### #### ####",M=h(null),b=h(null),N=h(!1),k=h(!1),Y=h("#### ###### #####"),u=h("#### #### #### ###"),y=h("#### ###### ####"),p=h("###### ####### ######"),q=h(F),S=h(F),$=h({}),W=B(()=>{const t=s.valueFields.cardNumber.replace(/\s+/g,"");return t.startsWith("2131")||t.startsWith("1800")?u:F}),z=B(()=>`/td_app/images/${V.value}.png`),H=["visaelectron","visa","elo","amex","mastercard","discover","unionpay","troy","dinersclub","jcb","laser","dankort","uatp","mir","hipercard","aura","maestro"],V=B(()=>{var n,g;const t=(g=(n=s.setType)==null?void 0:n.toLowerCase())==null?void 0:g.replace(/ /g,"");if((t==null?void 0:t.length)&&Object.values(H).includes(t))return t;const _=s.valueFields.cardNumber.replace(/\s+/g,"");return _.match(/^4(026|17500|405|508|844|91[37])/)?"visaelectron":_.match(/^4\d{12}(\d{3})?$/)?"visa":_.match(/^((509091)|(636368)|(636297)|(504175)|(438935)|(40117[8-9])|(45763[1-2])|(457393)|(431274)|(50990[0-2])|(5099[7-9][0-9])|(50996[4-9])|(509[1-8][0-9][0-9])|(5090(0[0-2]|0[4-9]|1[2-9]|[24589][0-9]|3[1-9]|6[0-46-9]|7[0-24-9]))|(5067(0[0-24-8]|1[0-24-9]|2[014-9]|3[0-379]|4[0-9]|5[0-3]|6[0-5]|7[0-8]))|(6504(0[5-9]|1[0-9]|2[0-9]|3[0-9]))|(6504(8[5-9]|9[0-9])|6505(0[0-9]|1[0-9]|2[0-9]|3[0-8]))|(6505(4[1-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-8]))|(6507(0[0-9]|1[0-8]))|(65072[0-7])|(6509(0[1-9]|1[0-9]|20))|(6516(5[2-9]|6[0-9]|7[0-9]))|(6550(0[0-9]|1[0-9]))|(6550(2[1-9]|3[0-9]|4[0-9]|5[0-8])))/)?"elo":_.match(/^3[47]\d{13}$/)?"amex":_.match(/^(5[1-5]\d{4}|677189)\d{10}$/)?"mastercard":_.match(/^6(?:011|5[0-9]{2})[0-9]{12}$/)?"discover":_.match(/^62[0-9]\d{14,17}$/)?"unionpay":_.match(/^9792\d{12}$/)?"troy":_.match(/^3(0[0-5]|[68]\d)\d{11,16}/)?"dinersclub":_.match(/(?:2131|1800|35[0-9]{3})[0-9]{11}$/)?"jcb":_.match(/^(6304|6706|6709|6771)[0-9]{12,15}$/)?"laser":_.match(/^5019\d{12}$/)?"dankort":_.match(/^1\d{14}$/)?"uatp":_.match(/^220[0-4]\d{12}$/)?"mir":_.match(/^(606282\d{10}(\d{3})?)|(3841\d{15})$/)?"hipercard":_.match(/^((?!504175))^((?!5067))(^50[0-9])/)?"aura":_.match(/(?:5[0678]\d\d|6304|6390|67\d\d)\d{8,15}$/)?"maestro":""}),L=B(()=>!s.hasRandomBackgrounds&&parseInt(s.backgroundImage)?"Image cover":""),X=B(()=>{const t=parseInt(s.backgroundImage);return Number.isFinite(t)&&t<26&&t>0}),P=B(()=>{const t=parseInt(s.backgroundImage);return X.value?`/td_app/images/${t}.jpg`:s.backgroundImage&&!Number.isFinite(t)?s.backgroundImage:s.hasRandomBackgrounds?`/td_app/images/${Math.floor(Math.random()*25+1)}.jpg`:null}),E=(t="addEventListener")=>{document.querySelectorAll("[data-card-field]").forEach(n=>{n[t]("focus",()=>{N.value=!0,n.id===s.inputFields.cardYear||n.id===s.inputFields.cardMonth?b.value="cardDate":b.value=n.id,k.value=n.id===s.inputFields.cardCvv}),n[t]("blur",()=>{k.value=!n.id===s.inputFields.cardCvv;const g=setTimeout(()=>{N.value||(b.value=null),clearTimeout(g)},300);N.value=!1})})},v=()=>{const t=$.value[b.value||""];M.value=t?{width:`${t.offsetWidth}px`,height:`${t.offsetHeight}px`,transform:`translateX(${t.offsetLeft}px) translateY(${t.offsetTop}px)`}:null},o=(t,_)=>{const n=V.value==="amex"?13:14;return t<n&&s.valueFields.cardNumber.length>t&&_.trim()!==""&&s.isCardNumberMasked},C=()=>{const t={amex:Y,dinersclub:y,jcb:W,uatp:u,unionpay:p};S.value=(t[V.value]||q).value,me(()=>{v()})};return K(b,()=>{b.value?v():M.value=null}),K(V,t=>{I("get-type",t),C()}),Q(E),de(()=>E("removeEventListener")),(t,_)=>d.labels&&d.inputFields?(i(),m("div",{key:0,class:O(["card-item",{"-active":k.value}])},[e("div",Ve,[e("div",{class:O([{"-active":M.value},"card-item__focus"]),style:oe(M.value),ref:n=>{n&&($.value.focusElement=n)}},null,6),e("div",{class:"card-item__cover","aria-label":a(L)},[typeof a(P)=="string"?(i(),m("img",{key:0,src:a(P),class:"card-item__bg",alt:"Background image"},null,8,Ne)):x("",!0)],8,Fe),e("div",Ie,[e("div",we,[Me,e("div",Ye,[r(U,{name:"slide-fade-up"},{default:c(()=>[a(V)?(i(),m("img",{src:a(z),key:a(V),alt:`${a(V)} brand image`,class:"card-item__typeImg"},null,8,Pe)):x("",!0)]),_:1})])]),e("label",{for:d.inputFields.cardNumber,ref:n=>{n&&($.value[d.inputFields.cardNumber]=n)},"aria-label":"Card number",class:"card-item__number"},[(i(!0),m(D,null,R(S.value.split(""),(n,g)=>(i(),m("span",{key:g},[r(U,{name:"slide-fade-up"},{default:c(()=>[o(g,n)?(i(),m("div",Se,"*")):d.valueFields.cardNumber.length>g?(i(),m("div",{class:O([{"-active":n.trim()===""},"card-item__numberItem"]),key:S.value},f(d.valueFields.cardNumber[g]),3)):(i(),m("div",{class:O([{"-active":n.trim()===""},"card-item__numberItem"]),key:S.value+1},f(n),3))]),_:2},1024)]))),128))],8,je),e("div",Te,[e("label",{for:d.inputFields.cardName,ref:n=>{n&&($.value[d.inputFields.cardName]=n)},"aria-label":"Card name",class:"card-item__info"},[e("div",Ee,f(d.labels.cardHolder||"Card Holder"),1),r(U,{name:"slide-fade-up"},{default:c(()=>[d.valueFields.cardName.length?(i(),m("div",Ue,[r(ie,{name:"slide-fade-right"},{default:c(()=>[(i(!0),m(D,null,R(d.valueFields.cardName.replace(/\s\s+/g," "),(n,g)=>(i(),m("span",{key:g+1,class:"card-item__nameItem"},f(n),1))),128))]),_:1})])):(i(),m("div",De,f(d.labels.cardName||"Full Name"),1))]),_:1})],8,Be),e("div",{class:"card-item__date",ref:n=>{n&&($.value.cardDate=n)}},[e("label",{for:d.inputFields.cardMonth,class:"card-item__dateTitle","aria-label":"Expiration date"},f(d.labels.cardExpires||"Expires"),9,Re),e("label",{for:d.inputFields.cardMonth,class:"card-item__dateItem","aria-label":"Card month"},[r(U,{name:"slide-fade-up"},{default:c(()=>[d.valueFields.cardMonth?(i(),m("span",{key:d.valueFields.cardMonth},f(d.valueFields.cardMonth),1)):(i(),m("span",ze,f(d.labels.cardMonth||"MM"),1))]),_:1})],8,Ae),He,e("label",{for:d.inputFields.cardYear,class:"card-item__dateItem","aria-label":"Card year"},[r(U,{name:"slide-fade-up"},{default:c(()=>[d.valueFields.cardYear?(i(),m("span",{key:d.valueFields.cardYear},f(String(d.valueFields.cardYear).slice(2,4)),1)):(i(),m("span",Oe,f(d.labels.cardYear||"YY"),1))]),_:1})],8,Le)],512)])])]),e("div",qe,[e("div",{class:"card-item__cover","aria-label":a(L)},[typeof a(P)=="string"?(i(),m("img",{key:0,src:a(P),class:"card-item__bg",alt:"Background image"},null,8,Xe)):x("",!0)],8,We),Ge,e("div",Ze,[e("label",{for:d.inputFields.cardCvv,"aria-label":"Card CVV"},[e("div",Ke,f(d.labels.cardCvv),1),e("div",Qe,[e("span",null,f(d.valueFields.cardCvv),1)])],8,Je),e("div",ea,[a(V)?(i(),m("img",{key:0,src:a(z),class:"card-item__typeImg",alt:"Dark bar image"},null,8,aa)):x("",!0)])])])],2)):x("",!0)}});var sa=pe(ta,[["__scopeId","data-v-10cb1eab"]]),se={};const la={class:"signup has-text-centered"},ra={class:"card card-main"},na={class:"card-content"},da={class:"is-flex is-justify-content-center"},oa={class:"logo"},ia=e("img",{class:"is-justify-content-center",alt:"TradingDigital",src:ge},null,-1),ca={class:"is-size-4 has-text-weight-bold is-justify-content-center"},ua={class:"form mt-3"},ma={class:"form mt-3"},_a={class:"form mt-3"},va={class:"card-content media"},pa={class:"media-content"},fa={class:"content"},ha=e("br",null,null,-1),ga={class:"media-right"},ba={class:"buttons is-justify-content-center mt-6"},ya=j(" Registrarse "),ka=j(" Pagar el curso "),Ca={key:1},xa={class:"form mt-3"},$a={class:"buttons",style:{gap:"1.5rem"}},Va=["value"],Fa=["value"],Na={class:"buttons is-centered mb-0"},Ia=j(" Pagar "),wa={class:"buttons is-centered mt-0"},Ma=j(" Salir "),Ya={class:"mt-5"},Pa=e("span",null,[j("Si tienes problemas con el pago, \xA1contactanos por "),e("a",{href:"https://t.me/soportealclientetrading",target:"_blank"},"telegram"),j("!")],-1),ja=J({emits:["loading"],setup(d,{emit:I}){var P,E;const s=fe(),F=_e(),M=ve(),b=((P=M.query)==null?void 0:P.digital_trust)==="true",N=((E=M.query)==null?void 0:E.signup_course)==="true",k=h(1),Y=h(!1);Q(()=>{s.authenticated&&!s.payed&&(Y.value=!0,N&&(Y.value=!1,k.value=3))});const u=ee(new he),y=h(s.course||""),p=ee({cardName:"",cardNumber:"",cardMonth:"",cardYear:"",cardCvv:""}),q={cardName:"Nombre Completo",cardHolder:"Propietario",cardMonth:"MM",cardYear:"YY",cardExpires:"Expira",cardCvv:"CVV"},S=s.countries.map(v=>({value:v.id,label:v.name})),$=h([]);s.authenticated&&!N?s.myCourse().then(v=>{v&&($.value=[v])}):s.courses().then(v=>{$.value=v});const W=v=>"$"+v.price+"/90 d\xEDas",z=v=>{p.cardNumber=v.target.value.replace(/ /g,""),p.cardNumber=(p.cardNumber.match(/.{1,4}/g)||[""]).join(" ")},H=async()=>{b&&(u.digital_trust=!0),await s.signup(u).then(v=>{I("loading"),v||(b&&s.user?window.location.replace("https://www.digitaltrustonline.net/dt_app/link_traiding?id="+s.user.id):y.value?s.subscribeCourse(y.value).then(o=>{}):F.push("/"))}).catch(()=>{I("loading")})},V=async()=>{const v=$.value.find(o=>o.id===y.value);if(s.authenticated||(u.validate().length?F.push("/login"):(I("loading"),await H())),N)if(y.value)s.subscribeCourse(y.value).then(o=>{});else return;I("loading"),v&&s.post_4geeks({amount:v.price,description:"TradingDigital - "+v.name,entity_description:"TradingDigital - "+v.name,currency:"usd",credit_card_number:parseInt(p.cardNumber.split(" ").join("")),credit_card_security_code_number:parseInt(p.cardCvv),exp_month:parseInt(p.cardMonth),exp_year:parseInt(p.cardYear)}).then(async()=>{await s.status().then(async o=>{s.payed=o.payed,F.push("/")})}).finally(()=>{I("loading")})},L=()=>{Y.value=!0},X=()=>{s.authenticated?N?F.push("/"):s.logout():F.push("/login")};return(v,o)=>{const C=w("o-input"),t=w("o-field"),_=w("Multiselect"),n=w("o-step-item"),g=w("o-switch"),T=w("o-button"),le=w("o-steps"),re=sa,G=w("o-select"),ne=xe;return i(),m("div",la,[e("div",ra,[e("div",na,[e("div",da,[e("div",oa,[ia,e("p",ca,f(a(s).authenticated&&!a(s).payed?"Pagar curso":"Bienvenido a TradingDigital"),1)])]),Y.value?x("",!0):(i(),A(le,{key:0,modelValue:k.value,"onUpdate:modelValue":o[7]||(o[7]=l=>k.value=l),class:"mt-5","icon-prev":"chevron-left","icon-next":"chevron-right","label-position":"bottom"},{navigation:c(({previous:l,next:Z})=>[e("div",ba,[l.disabled?x("",!0):(i(),A(T,{key:0,variant:"primary","icon-pack":"fas","icon-left":"chevron-left",onClick:ae(l.action,["prevent"])},null,8,["onClick"])),k.value===1&&a(u).firstname&&a(u).lastname&&a(u).country||k.value===2&&a(u).username&&a(u).email&&a(u).password&&a(u).password_confirm&&!b?(i(),A(T,{key:1,variant:"primary","icon-pack":"fas","icon-left":"chevron-right",onClick:ae(Z.action,["prevent"])},null,8,["onClick"])):x("",!0),k.value===2&&b?(i(),A(T,{key:2,variant:"primary","icon-pack":"fas","icon-left":"chevron-right",onClick:H},{default:c(()=>[ya]),_:1})):x("",!0),k.value===3&&y.value&&y.value!=="none"?(i(),A(T,{key:3,variant:"primary","icon-pack":"fas","icon-left":"chevron-right",onClick:L},{default:c(()=>[ka]),_:1})):x("",!0)])]),default:c(()=>[r(n,{step:"1",label:"Datos del Perfil",visible:!a(s).authenticated},{default:c(()=>[e("form",ua,[r(t,{label:"Nombre"},{default:c(()=>[r(C,{modelValue:a(u).firstname,"onUpdate:modelValue":o[0]||(o[0]=l=>a(u).firstname=l),maxlength:"30"},null,8,["modelValue"])]),_:1}),r(t,{label:"Apellido"},{default:c(()=>[r(C,{modelValue:a(u).lastname,"onUpdate:modelValue":o[1]||(o[1]=l=>a(u).lastname=l),maxlength:"30"},null,8,["modelValue"])]),_:1}),r(t,{label:"Pa\xEDs"},{default:c(()=>[r(_,{modelValue:a(u).country,"onUpdate:modelValue":o[2]||(o[2]=l=>a(u).country=l),options:a(S),placeholder:"Seleccionar...",noOptionsText:"No hay opciones a\xFAn",noResultsText:"No hay opciones a\xFAn",searchable:""},null,8,["modelValue","options"])]),_:1})])]),_:1},8,["visible"]),r(n,{step:"2",label:"Datos del Usuario",visible:!a(s).authenticated},{default:c(()=>[e("form",ma,[r(t,{label:"Nombre de usuario"},{default:c(()=>[r(C,{modelValue:a(u).username,"onUpdate:modelValue":o[3]||(o[3]=l=>a(u).username=l),maxlength:"10"},null,8,["modelValue"])]),_:1}),r(t,{label:"Correo"},{default:c(()=>[r(C,{modelValue:a(u).email,"onUpdate:modelValue":o[4]||(o[4]=l=>a(u).email=l),type:"email",maxlength:"40"},null,8,["modelValue"])]),_:1}),r(t,{label:"Contrase\xF1a"},{default:c(()=>[r(C,{modelValue:a(u).password,"onUpdate:modelValue":o[5]||(o[5]=l=>a(u).password=l),type:"password",maxlength:"20","password-reveal":""},null,8,["modelValue"])]),_:1}),r(t,{label:"Confirmar contrase\xF1a"},{default:c(()=>[r(C,{modelValue:a(u).password_confirm,"onUpdate:modelValue":o[6]||(o[6]=l=>a(u).password_confirm=l),type:"password",maxlength:"20","password-reveal":""},null,8,["modelValue"])]),_:1})])]),_:1},8,["visible"]),r(n,{step:"3",label:"Curso",visible:!a(s).authenticated&&!b||a(s).authenticated&&N},{default:c(()=>[e("form",_a,[(i(!0),m(D,null,R($.value,l=>(i(),m("article",{class:"card",key:l.id},[e("div",va,[e("div",pa,[e("div",fa,[e("p",null,[e("strong",null,f(l.name),1),ha,e("small",null,f(W(l)),1)])])]),e("div",ga,[r(t,null,{default:c(()=>[r(g,{modelValue:y.value===l.id,disabled:y.value===l.id,variant:"primary",onInput:Z=>y.value=l.id},null,8,["modelValue","disabled","onInput"])]),_:2},1024)])])]))),128))])]),_:1},8,["visible"])]),_:1},8,["modelValue"])),Y.value?(i(),m("div",Ca,[r(re,{"value-fields":a(p),labels:q},null,8,["value-fields"]),e("form",xa,[r(t,{label:"N\xFAmero de tarjeta"},{default:c(()=>[r(C,{modelValue:a(p).cardNumber,id:"v-card-number","data-card-field":"",maxlength:"19",type:"tel",onInput:z},null,8,["modelValue"])]),_:1}),r(t,{label:"Propietario"},{default:c(()=>[r(C,{modelValue:a(p).cardName,"onUpdate:modelValue":o[8]||(o[8]=l=>a(p).cardName=l),id:"v-card-name","data-card-field":"",type:"text"},null,8,["modelValue"])]),_:1}),e("div",$a,[r(t,{"root-class":"no",label:"Fecha de expiraci\xF3n",grouped:""},{default:c(()=>[r(G,{modelValue:a(p).cardMonth,"onUpdate:modelValue":o[9]||(o[9]=l=>a(p).cardMonth=l),id:"v-card-month","data-card-field":""},{default:c(()=>[(i(),m(D,null,R(12,l=>e("option",{key:"m"+l,value:l},f(l),9,Va)),64))]),_:1},8,["modelValue"]),r(G,{modelValue:a(p).cardYear,"onUpdate:modelValue":o[10]||(o[10]=l=>a(p).cardYear=l),id:"v-card-year","data-card-field":""},{default:c(()=>[(i(),m(D,null,R(12,l=>e("option",{key:"y"+l,value:2020+l},f(2020+l),9,Fa)),64))]),_:1},8,["modelValue"])]),_:1}),r(t,{label:"CVV"},{default:c(()=>[r(C,{modelValue:a(p).cardCvv,"onUpdate:modelValue":o[11]||(o[11]=l=>a(p).cardCvv=l),id:"v-card-cvv","data-card-field":"",type:"text"},null,8,["modelValue"])]),_:1})]),e("div",Na,[r(T,{variant:"primary",onClick:V},{default:c(()=>[Ia]),_:1})]),e("div",wa,[r(T,{variant:"white",onClick:X},{default:c(()=>[Ma]),_:1})])]),e("p",Ya,[r(ne,{class:"icon has-text-danger",style:{"vertical-align":"text-bottom"}}),Pa])])):x("",!0)])])])}}});typeof se=="function"&&se(ja);export{ja as default};
