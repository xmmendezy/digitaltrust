import{u as l}from"./index.3f2501d9.js";import{d as u,k as p,r as a,c as v,a as s,o as _}from"./vendor.0a427255.js";const m={style:{position:"relative"}},k=u({setup(f){const o=l(),e=p(!1),r=()=>{e.value=!e.value};return o.authenticated&&o.myCourse().then(t=>{o.course=t.id}),(t,n)=>{const i=a("router-view"),c=a("o-loading");return _(),v("div",m,[s(i,{onLoading:r}),s(c,{active:e.value,"onUpdate:active":n[0]||(n[0]=d=>e.value=d)},null,8,["active"])])}}});export{k as default};