import{d as I,u as F,e as p,am as n,a as L,bi as _,aq as U,f as e,m as a,al as f,c3 as x,c4 as y,c5 as A,c6 as B,a9 as l,aO as w,bq as b,c7 as M,bc as v,b0 as $,I as k,F as P,B as o,ae as R,ap as E,c8 as g,W as H,bo as q,n as W}from"./index.c1cf46f4.js";import{o as G}from"./index.ca51fd96.js";import{L as O}from"./LinkWithBase.c715b571.js";const J=()=>{const r=I();G("manage.sidemenu.profile");const{to:i,searchParams:V}=F(),[u,C]=p(n().username),[d,S]=p(""),[h,T]=L(t=>_.post("/me/update",{username:t?n().username:u(),password:t?"":d(),sso_id:n().sso_id})),c=async t=>{const s=await T(t);q(s,()=>{g({...n(),username:u()}),t?i(""):(W.success(r("users.update_profile_success")),i(`/@login?redirect=${encodeURIComponent(location.pathname)}`))})};function m(t){const s=t.data;s.sso_id&&(g({...n(),sso_id:s.sso_id}),c(!0))}return window.addEventListener("message",m),U(()=>{window.removeEventListener("message",m)}),e(H,{w:"$full",spacing:"$4",alignItems:"start",get children(){return[e(a,{get when(){return!f.is_guest(n())},get fallback(){return[e(x,{status:"warning",flexDirection:{"@initial":"column","@lg":"row"},get children(){return[e(y,{mr:"$2_5"}),e(A,{mr:"$2_5",get children(){return r("users.guest-tips")}}),e(B,{get children(){return r("users.modify_nothing")}})]}}),e(l,{spacing:"$2",get children(){return[e(w,{get children(){return r("global.have_account")}}),e(w,{color:"$info9",as:O,get href(){return`/@login?redirect=${encodeURIComponent(location.pathname)}`},get children(){return r("global.go_login")}})]}})]},get children(){return[e(b,{get children(){return r("users.update_profile")}}),e(M,{gap:"$2",columns:{"@initial":1,"@md":2},get children(){return[e(v,{get children(){return[e($,{for:"username",get children(){return r("users.change_username")}}),e(k,{id:"username",get value(){return u()},onInput:t=>{C(t.currentTarget.value)}})]}}),e(v,{get children(){return[e($,{for:"password",get children(){return r("users.change_password")}}),e(k,{id:"password",type:"password",placeholder:"********",get value(){return d()},onInput:t=>{S(t.currentTarget.value)}}),e(P,{get children(){return r("users.change_password-tips")}})]}})]}}),e(l,{spacing:"$2",get children(){return[e(o,{get loading(){return h()},onClick:[c,!1],get children(){return r("global.save")}}),e(a,{get when(){return!n().otp},get children(){return e(o,{colorScheme:"accent",onClick:()=>{i("/@manage/2fa")},get children(){return r("users.enable_2fa")}})}})]}})]}}),e(a,{get when(){return R(()=>!!E("sso_login_enabled"),!0)()&&!f.is_guest(n())},get children(){return[e(b,{get children(){return r("users.sso_login")}}),e(l,{spacing:"$2",get children(){return e(a,{get when(){return n().sso_id},get fallback(){return e(o,{onClick:()=>{const t=_.getUri()+"/auth/sso?method=get_sso_id";window.open(t,"authPopup","width=500,height=600")},get children(){return r("users.connect_sso")}})},get children(){return e(o,{colorScheme:"danger",get loading(){return h()},onClick:()=>{g({...n(),sso_id:""}),c(!0)},get children(){return r("users.disconnect_sso")}})}})}})]}})]}})};export{J as default};
