import{u as v,a as g,b as h}from"./index.275b3ce1.js";import{d as f,k as b,r,c as k,h as e,a,w as d,o as l,T as x,l as C,p as w}from"./vendor.1f7293ac.js";const y={class:"ebook-layout"},B={class:"card card-main"},D={class:"card-header"},T=e("figure",{class:"image is-64x64 logo"},[e("img",{alt:"TradingDigital",src:g})],-1),L=e("p",{class:"card-header-title"},"TradingDigital",-1),N={class:"card-content"},j={style:{position:"relative"}},M=f({setup(V){const s=v(),o=b(!1),_=()=>{o.value=!o.value};return s.myCourse().then(t=>{s.course=t.id,s.course_data=t}),(t,i)=>{const c=h,m=r("router-view"),u=r("o-loading");return l(),k("div",y,[e("div",B,[e("header",D,[T,L,a(c,{class:"is-hidden-mobile"})]),e("div",N,[a(c,{class:"is-hidden-tablet"}),e("div",j,[a(m,null,{default:d(({Component:n,route:p})=>[a(x,{name:p.meta.transitionName},{default:d(()=>[(l(),C(w(n),{onLoading:_}))]),_:2},1032,["name"])]),_:1}),a(u,{active:o.value,"onUpdate:active":i[0]||(i[0]=n=>o.value=n)},null,8,["active"])])])])])}}});export{M as default};