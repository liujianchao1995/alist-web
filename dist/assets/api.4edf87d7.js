import{bi as n,b as c}from"./index.c1cf46f4.js";const i=(s="/",t="")=>n.post("/fs/get",{path:s,password:t}),d=(s="/",t="",e=1,o=0,r=!1,a)=>n.post("/fs/list",{path:s,password:t,page:e,per_page:o,refresh:r},{cancelToken:a}),u=(s="/",t="",e=!1)=>n.post("/fs/dirs",{path:s,password:t,force_root:e}),m=s=>n.post("/fs/mkdir",{path:s}),y=(s,t)=>n.post("/fs/rename",{path:s,name:t}),v=(s,t)=>n.post("/fs/batch_rename",{src_dir:s,rename_objects:t}),h=(s,t,e)=>n.post("/fs/move",{src_dir:s,dst_dir:t,names:e}),l=(s,t)=>n.post("/fs/recursive_move",{src_dir:s,dst_dir:t}),b=(s,t,e)=>n.post("/fs/copy",{src_dir:s,dst_dir:t,names:e}),x=(s,t)=>n.post("/fs/remove",{dir:s,names:t}),w=s=>n.post("/fs/remove_empty_directory",{src_dir:s}),R=(s,t)=>n.put("/fs/put",void 0,{headers:{"File-Path":encodeURIComponent(s),Password:t}}),_=(s,t,e)=>n.post(`/fs/add_${e}`,{path:s,urls:t}),f=async(s,t=!0)=>{try{const e=await c.get(s,{responseType:"blob",params:t?{ts:new Date().getTime()}:void 0}),o=await e.data.text(),r=e.headers["content-type"];return{content:o,contentType:r}}catch(e){return t?await f(s,!1):{content:`Failed to fetch ${s}: ${e}`,contentType:""}}},T=async(s,t,e="",o=1,r=100)=>n.post("/fs/search",{parent:s,keywords:t,page:o,per_page:r,password:e}),g=async(s=["/"],t=-1)=>n.post("/admin/index/build",{paths:s,max_depth:t}),D=async(s=[],t=-1)=>n.post("/admin/index/update",{paths:s,max_depth:t});export{d as a,f as b,b as c,h as d,x as e,i as f,y as g,R as h,m as i,l as j,w as k,v as l,u as m,T as n,_ as o,g as p,D as u};
