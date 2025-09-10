/* @preserve
// ==UserScript==
// @name         Hail's OP
// @namespace    http://tampermonkey.net/
// @version      2.8.14
// @author       shinkonet (Altered by Hail)
// @match        https://wplace.live/*
// @license      GPLv3
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      *
// @run-at       document-start
// @updateURL    https://github.com/HailXD/Hails-Overlay-Pro/raw/refs/heads/main/overlay.min.user.js
// @downloadURL  https://github.com/HailXD/Hails-Overlay-Pro/raw/refs/heads/main/overlay.min.user.js
// ==/UserScript==
@endpreserve */

(function(){"use strict";const Ce=window.fetch,et=(t,o)=>{try{if(typeof GM<"u"&&typeof GM.getValue=="function")return GM.getValue(t,o);if(typeof GM_getValue=="function")return Promise.resolve(GM_getValue(t,o))}catch{}return Promise.resolve(o)},tt=(t,o)=>{try{if(typeof GM<"u"&&typeof GM.setValue=="function")return GM.setValue(t,o);if(typeof GM_setValue=="function")return Promise.resolve(GM_setValue(t,o))}catch{}return Promise.resolve()};function ot(t){return new Promise((o,i)=>{try{GM_xmlhttpRequest({method:"GET",url:t,responseType:"blob",onload:a=>{a.status>=200&&a.status<300&&a.response?o(a.response):i(new Error(`GM_xhr failed: ${a.status} ${a.statusText}`))},onerror:()=>i(new Error("GM_xhr network error")),ontimeout:()=>i(new Error("GM_xhr timeout"))})}catch(a){i(a)}})}function Fe(t){return new Promise((o,i)=>{const a=new FileReader;a.onload=()=>o(a.result),a.onerror=i,a.readAsDataURL(t)})}async function Be(t){const o=await ot(t);if(!o||!String(o.type).startsWith("image/"))throw new Error("URL did not return an image blob");return await Fe(o)}function at(t){return new Promise((o,i)=>{const a=new FileReader;a.onload=()=>o(a.result),a.onerror=i,a.readAsDataURL(t)})}const Se=[[0,0,0],[60,60,60],[120,120,120],[210,210,210],[255,255,255],[96,0,24],[237,28,36],[255,127,39],[246,170,9],[249,221,59],[255,250,188],[14,185,104],[19,230,123],[135,255,94],[12,129,110],[16,174,166],[19,225,190],[96,247,242],[40,80,158],[64,147,228],[107,80,246],[153,177,251],[120,12,153],[170,56,185],[224,159,249],[203,0,122],[236,31,128],[243,141,169],[104,70,52],[149,104,42],[248,178,119]],ae=[[170,170,170],[165,14,30],[250,128,114],[228,92,26],[156,132,49],[197,173,49],[232,212,95],[74,107,58],[90,148,74],[132,197,115],[15,121,159],[187,250,242],[125,199,255],[77,49,184],[74,66,132],[122,113,196],[181,174,241],[155,82,73],[209,128,120],[250,182,164],[219,164,99],[123,99,82],[156,132,107],[214,181,148],[209,128,81],[255,197,165],[109,100,63],[148,140,107],[205,197,158],[51,57,65],[109,117,141],[179,185,209]],de={"0,0,0":"Black","60,60,60":"Dark Gray","120,120,120":"Gray","210,210,210":"Light Gray","255,255,255":"White","96,0,24":"Deep Red","237,28,36":"Red","255,127,39":"Orange","246,170,9":"Gold","249,221,59":"Yellow","255,250,188":"Light Yellow","14,185,104":"Dark Green","19,230,123":"Green","135,255,94":"Light Green","12,129,110":"Dark Teal","16,174,166":"Teal","19,225,190":"Light Teal","96,247,242":"Cyan","40,80,158":"Dark Blue","64,147,228":"Blue","107,80,246":"Indigo","153,177,251":"Light Indigo","120,12,153":"Dark Purple","170,56,185":"Purple","224,159,249":"Light Purple","203,0,122":"Dark Pink","236,31,128":"Pink","243,141,169":"Light Pink","104,70,52":"Dark Brown","149,104,42":"Brown","248,178,119":"Beige","170,170,170":"Medium Gray","165,14,30":"Dark Red","250,128,114":"Light Red","228,92,26":"Dark Orange","156,132,49":"Dark Goldenrod","197,173,49":"Goldenrod","232,212,95":"Light Goldenrod","74,107,58":"Dark Olive","90,148,74":"Olive","132,197,115":"Light Olive","15,121,159":"Dark Cyan","187,250,242":"Light Cyan","125,199,255":"Light Blue","77,49,184":"Dark Indigo","74,66,132":"Dark Slate Blue","122,113,196":"Slate Blue","181,174,241":"Light Slate Blue","155,82,73":"Dark Peach","209,128,120":"Peach","250,182,164":"Light Peach","219,164,99":"Light Brown","123,99,82":"Dark Tan","156,132,107":"Tan","214,181,148":"Light Tan","209,128,81":"Dark Beige","255,197,165":"Light Beige","109,100,63":"Dark Stone","148,140,107":"Stone","205,197,158":"Light Stone","51,57,65":"Dark Slate","109,117,141":"Slate","179,185,209":"Light Slate"},be=Se.map(([t,o,i])=>`${t},${o},${i}`),Te=[];class pe extends Map{constructor(o){super(),this.limit=o}set(o,i){if(this.size>=this.limit){const a=this.keys().next().value;this.delete(a)}return super.set(o,i)}}const Ne=unsafeWindow;function ze(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function Ae(t){const o=new Set(u.overlays.map(a=>(a.name||"").toLowerCase()));if(!o.has(t.toLowerCase()))return t;let i=1;for(;o.has(`${t} (${i})`.toLowerCase());)i++;return`${t} (${i})`}function T(t,o){if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(t,o);const i=document.createElement("canvas");return i.width=t,i.height=o,i}function $e(t,o){const i=document.createElement("canvas");return i.width=t,i.height=o,i}function ue(t){return t.convertToBlob?t.convertToBlob():new Promise((o,i)=>t.toBlob(a=>a?o(a):i(new Error("toBlob failed")),"image/png"))}async function Ue(t){if(t&&typeof t.toDataURL=="function")return t.toDataURL("image/png");if(t&&typeof t.convertToBlob=="function"){const o=await t.convertToBlob();return await Fe(o)}if(typeof OffscreenCanvas<"u"&&t instanceof OffscreenCanvas){const o=t.transferToImageBitmap?.();if(o){const i=$e(t.width,t.height);return i.getContext("2d").drawImage(o,0,0),i.toDataURL("image/png")}}throw new Error("Cannot export canvas to data URL")}async function re(t){if(typeof createImageBitmap=="function")try{return await createImageBitmap(t)}catch{}return new Promise((o,i)=>{const a=URL.createObjectURL(t),n=new Image;n.onload=()=>{URL.revokeObjectURL(a),o(n)},n.onerror=r=>{URL.revokeObjectURL(a),i(r)},n.src=a})}async function nt(t){const o=await re(t),a=T(o.width,o.height).getContext("2d");return a.drawImage(o,0,0),a.getImageData(0,0,o.width,o.height)}async function qe(t){if(!t.imageBase64)return null;if(t.visibleColorKeys==null)return await se(t.imageBase64);const o=t.visibleColorKeys.slice().sort().join(","),a=`${t.imageBase64.slice(0,64)+":"+t.imageBase64.length}|${o}`;if(Me.has(a))return Me.get(a);const n=await se(t.imageBase64),r=n.width,d=n.height,s=T(r,d),c=s.getContext("2d",{willReadFrequently:!0});c.drawImage(n,0,0);const v=c.getImageData(0,0,r,d),g=v.data,f=new Set(t.visibleColorKeys);for(let m=0;m<g.length;m+=4)if(g[m+3]>0){const M=`${g[m]},${g[m+1]},${g[m+2]}`;f.has(M)||(g[m+3]=0)}c.putImageData(v,0,0);const x=await(typeof createImageBitmap=="function"?createImageBitmap(s):se(await Ue(s)));return Me.set(a,x),x}function se(t){return we.has(t)?Promise.resolve(we.get(t)):new Promise((o,i)=>{const a=new Image;a.crossOrigin="anonymous",a.onload=()=>{we.set(t,a),o(a)},a.onerror=i,a.src=t})}function ge(t){try{const o=new URL(t),i=o.pathname.split("/"),a=new URLSearchParams(o.search);return{chunk1:parseInt(i[3],10),chunk2:parseInt(i[4],10),posX:parseInt(a.get("x")||"0",10),posY:parseInt(a.get("y")||"0",10)}}catch{return{chunk1:0,chunk2:0,posX:0,posY:0}}}function it(t){try{const o=new URL(t,location.href);if(o.hostname!=="backend.wplace.live"||!o.pathname.startsWith("/files/"))return null;const i=o.pathname.match(/\/(\d+)\/(\d+)\.png$/i);return i?{chunk1:parseInt(i[1],10),chunk2:parseInt(i[2],10)}:null}catch{return null}}function rt(t){try{const o=new URL(t,location.href);if(o.hostname!=="backend.wplace.live")return null;const i=o.pathname.match(/\/s0\/pixel\/(\d+)\/(\d+)$/);if(!i)return null;const a=o.searchParams;return{normalized:`https://backend.wplace.live/s0/pixel/${i[1]}/${i[2]}?x=${a.get("x")||0}&y=${a.get("y")||0}`}}catch{return null}}function He(t,o,i,a,n,r,d,s){const c=Math.max(t,n),v=Math.max(o,r),g=Math.min(t+i,n+d),f=Math.min(o+a,r+s),x=Math.max(0,g-c),m=Math.max(0,f-v);return{x:c,y:v,w:x,h:m}}const J=new pe(50),xe=new Set,we=new pe(50),Me=new pe(50),me=new pe(200),ve=new pe(200);function De(t){return[t.imageBase64?t.imageBase64.slice(0,64)+":"+t.imageBase64.length:"none",t.pixelUrl||"null",t.offsetX,t.offsetY,t.opacity].join("|")}function F(){J.clear(),we.clear(),Me.clear(),me.clear(),ve.clear()}async function st(t,o,i){if(!t.enabled||!t.imageBase64||!t.pixelUrl||xe.has(t.id))return null;const a=De(t),n=`${t.id}|${a}|${o}|${i}`;if(J.has(n))return J.get(n);const r=await qe(t);if(!r)return null;const d=r.width,s=r.height;if(d>=1e3||s>=1e3)return xe.add(t.id),D(`Overlay "${t.name}" skipped: image too large (must be smaller than 1000\xD71000; got ${d}\xD7${s}).`),null;const c=ge(t.pixelUrl);if(!Number.isFinite(c.chunk1)||!Number.isFinite(c.chunk2))return null;const v=c.chunk1*1e3+c.posX+t.offsetX-o*1e3,g=c.chunk2*1e3+c.posY+t.offsetY-i*1e3,f=He(0,0,1e3,1e3,v,g,d,s);if(f.w===0||f.h===0)return J.set(n,null),null;const m=T(1e3,1e3).getContext("2d",{willReadFrequently:!0});m.drawImage(r,v,g);const M=m.getImageData(f.x,f.y,f.w,f.h),y=u.overlayMode==="smart"||u.overlayMode==="diff"?new Uint8ClampedArray(M.data):null,b=M.data,k=t.opacity,C=255*(1-k);for(let E=0;E<b.length;E+=4)b[E+3]>0&&(u.highlightPixels?(b[E]=255,b[E+1]=0,b[E+2]=255):(b[E]=Math.round(b[E]*k+C),b[E+1]=Math.round(b[E+1]*k+C),b[E+2]=Math.round(b[E+2]*k+C)),b[E+3]=255);const $={imageData:M,dx:f.x,dy:f.y,rawData:y};return J.set(n,$),$}async function lt(t,o,i){if(!t.enabled||!t.imageBase64||!t.pixelUrl||xe.has(t.id))return null;const a=3,n=De(t),r=`${t.id}|${n}|minify|s${a}|${o}|${i}`;if(J.has(r))return J.get(r);const d=await qe(t);if(!d)return null;const s=d.width,c=d.height;if(s>=1e3||c>=1e3)return xe.add(t.id),D(`Overlay "${t.name}" skipped: image too large (must be smaller than 1000\xD71000; got ${s}\xD7${c}).`),null;const v=ge(t.pixelUrl);if(!Number.isFinite(v.chunk1)||!Number.isFinite(v.chunk2))return null;const g=v.chunk1*1e3+v.posX+t.offsetX-o*1e3,f=v.chunk2*1e3+v.posY+t.offsetY-i*1e3,x=1e3*a,m=1e3*a,M=Math.round(g*a),y=Math.round(f*a),b=s*a,k=c*a,I=He(0,0,x,m,M,y,b,k);if(I.w===0||I.h===0)return J.set(r,null),null;const $=T(x,m).getContext("2d",{willReadFrequently:!0});$.imageSmoothingEnabled=!1,$.clearRect(0,0,x,m),$.drawImage(d,0,0,s,c,M,y,b,k);const E=$.getImageData(I.x,I.y,I.w,I.h),A=E.data,O=t.opacity,G=255*(1-O),W=Math.floor(a/2),Z=I.w;for(let h=0;h<A.length;h+=4){if(A[h+3]===0)continue;const S=h/4%Z,R=Math.floor(h/4/Z),Y=I.x+S,U=I.y+R;Y%a===W&&U%a===W?(u.highlightPixels?(A[h]=255,A[h+1]=0,A[h+2]=255):(A[h]=Math.round(A[h]*O+G),A[h+1]=Math.round(A[h+1]*O+G),A[h+2]=Math.round(A[h+2]*O+G)),A[h+3]=255):(A[h]=0,A[h+1]=0,A[h+2]=0,A[h+3]=0)}const p={imageData:E,dx:I.x,dy:I.y,scaled:!0,scale:a};return J.set(r,p),p}async function ct(t,o){if(!o||o.length===0)return t;const i=await re(t),a=i.width,n=i.height,r=T(a,n),d=r.getContext("2d");for(const s of o)s&&d.putImageData(s.imageData,s.dx,s.dy);return d.drawImage(i,0,0),await ue(r)}async function dt(t,o){if(!o||o.length===0)return t;const i=await re(t),a=i.width,n=i.height,r=T(a,n),d=r.getContext("2d");d.drawImage(i,0,0);for(const s of o){if(!s||!s.imageData||s.imageData.width===0||s.imageData.height===0)continue;const c=T(s.imageData.width,s.imageData.height);c.getContext("2d").putImageData(s.imageData,0,0),d.drawImage(c,s.dx,s.dy)}return await ue(r)}async function pt(t,o){if(!o||o.length===0)return t;const i=await re(t),a=i.width,n=i.height,r=T(a,n),d=r.getContext("2d",{willReadFrequently:!0});d.drawImage(i,0,0);const s=d.getImageData(0,0,a,n),c=s.data,v=new Uint32Array(c.buffer);for(const g of o){if(!g||!g.rawData)continue;const f=g.rawData,x=g.imageData.data,m=g.imageData.width,M=g.imageData.height,y=new Uint32Array(f.buffer),b=new Uint32Array(x.buffer);for(let k=0;k<M;k++){const I=g.dy+k;if(!(I<0||I>=n))for(let C=0;C<m;C++){const $=g.dx+C;if($<0||$>=a)continue;const E=(k*m+C)*4;if(f[E+3]>0){const A=I*a+$,O=k*m+C;y[O]!==v[A]&&(v[A]=b[O])}}}}return d.putImageData(s,0,0),await ue(r)}async function ut(t,o){if(!o||o.length===0)return t;const i=await re(t),a=i.width,n=i.height,r=T(a,n),d=r.getContext("2d",{willReadFrequently:!0});d.drawImage(i,0,0);const s=d.getImageData(0,0,a,n),c=s.data,v=new Uint32Array(c.buffer);for(const g of o){if(!g||!g.rawData)continue;const f=g.rawData,x=g.imageData.data,m=g.imageData.width,M=g.imageData.height,y=new Uint32Array(f.buffer),b=new Uint32Array(x.buffer);for(let k=0;k<M;k++){const I=g.dy+k;if(!(I<0||I>=n))for(let C=0;C<m;C++){const $=g.dx+C;if($<0||$>=a)continue;const E=(k*m+C)*4;if(f[E+3]>0){const A=I*a+$,O=A,V=k*m+C;c[A*4+3]>0&&y[V]!==v[O]&&(v[O]=b[V])}}}}return d.putImageData(s,0,0),await ue(r)}async function gt(t,o){if(!o||o.length===0)return t;const i=3,a=await re(t),n=a.width,r=a.height,d=T(n*i,r*i),s=d.getContext("2d",{willReadFrequently:!0});s.imageSmoothingEnabled=!1,s.drawImage(a,0,0,n*i,r*i);for(const c of o){if(!c)continue;const v=c.imageData.width,g=c.imageData.height;if(v===0||g===0)continue;const f=T(v,g);f.getContext("2d",{willReadFrequently:!0}).putImageData(c.imageData,0,0),s.drawImage(f,c.dx,c.dy)}return await ue(d)}function D(t,o=3e3){let i=document.getElementById("op-toast-stack");i||(i=document.createElement("div"),i.className="op-toast-stack",i.id="op-toast-stack",document.body.appendChild(i)),i.classList.toggle("op-dark",u.theme==="dark");const a=document.createElement("div");a.className="op-toast",a.textContent=t,i.appendChild(a),requestAnimationFrame(()=>a.classList.add("show")),setTimeout(()=>{a.classList.remove("show"),setTimeout(()=>a.remove(),200)},o)}let ke=!1;function mt(){const t=u.overlays.some(a=>a.enabled&&a.imageBase64),o=!!u.autoCapturePixelUrl&&!!u.activeOverlayId;return(u.overlayMode==="behind"||u.overlayMode==="above"||u.overlayMode==="smart"||u.overlayMode==="diff"||u.overlayMode==="minify")&&(t||o)&&u.overlays.length>0}function H(){mt()?vt():ht()}function vt(){if(ke)return;const t=Ce,o=async(i,a)=>{const n=typeof i=="string"?i:i&&i.url||"";if(u.autoCapturePixelUrl&&u.activeOverlayId){const s=rt(n);if(s){const c=u.overlays.find(v=>v.id===u.activeOverlayId);if(c&&c.pixelUrl!==s.normalized){c.pixelUrl=s.normalized,c.offsetX=0,c.offsetY=0,await L(["overlays"]),F(),u.autoCapturePixelUrl=!1,await L(["autoCapturePixelUrl"]),X();const g=ge(c.pixelUrl);D(`Anchor set for "${c.name}": chunk ${g.chunk1}/${g.chunk2} at (${g.posX}, ${g.posY}). Offset reset to (0,0).`),H()}}}const r=it(n);if(!r||!["behind","above","smart","diff","minify"].includes(u.overlayMode))return t(i,a);try{const s=await t(i,a);if(!s.ok||!(s.headers.get("Content-Type")||"").toLowerCase().includes("image"))return s;const v=u.overlays.filter(m=>m.enabled&&m.imageBase64&&m.pixelUrl);if(v.length===0)return s;const g=await s.blob();try{const m=await nt(g.slice()),M=`${r.chunk1},${r.chunk2}`;me.set(M,m),ne()}catch(m){console.error("Hail's OP: Failed to cache tile",m)}if(g.size>15*1024*1024)return s;let f;if(u.overlayMode==="minify"){const m=[];for(const M of v)m.push(await lt(M,r.chunk1,r.chunk2));f=await gt(g,m.filter(Boolean))}else{const m=[];for(const M of v)m.push(await st(M,r.chunk1,r.chunk2));u.overlayMode==="smart"?f=await pt(g,m.filter(Boolean)):u.overlayMode==="diff"?f=await ut(g,m.filter(Boolean)):f=await(u.overlayMode==="behind"?ct(g,m.filter(Boolean)):dt(g,m.filter(Boolean)))}const x=new Headers(s.headers);return x.set("Content-Type","image/png"),x.delete("Content-Length"),new Response(f,{status:s.status,statusText:s.statusText,headers:x})}catch(s){return console.error("Hail's OP: Error processing tile",s),t(i,a)}};Ne.fetch=o,window.fetch=o,ke=!0}function ht(){ke&&(Ne.fetch=Ce,window.fetch=Ce,ke=!1)}const u={overlays:[],activeOverlayId:null,overlayMode:"behind",isPanelCollapsed:!1,autoCapturePixelUrl:!1,panelX:null,panelY:null,theme:"light",collapseList:!1,collapseEditor:!1,collapseNudge:!1,collapseColors:!1,highlightPixels:!1,ccFreeKeys:be.slice(),ccPaidKeys:Te.slice(),ccZoom:1,ccRealtime:!1},We=Object.keys(u);async function ft(){try{await Promise.all(We.map(async t=>{u[t]=await et(t,u[t])})),(!Array.isArray(u.ccFreeKeys)||u.ccFreeKeys.length===0)&&(u.ccFreeKeys=be.slice()),Array.isArray(u.ccPaidKeys)||(u.ccPaidKeys=Te.slice()),(!Number.isFinite(u.ccZoom)||u.ccZoom<=0)&&(u.ccZoom=1),typeof u.ccRealtime!="boolean"&&(u.ccRealtime=!1)}catch(t){console.error("Hail's OP: Failed to load config",t)}}async function L(t=We){try{await Promise.all(t.map(o=>tt(o,u[o])))}catch(o){console.error("Hail's OP: Failed to save config",o)}}function yt(){const t=document.createElement("style");t.textContent=`
      body.op-theme-light {
        --op-bg: #f7f9fc;
        --op-border: #e1e8f2;
        --op-muted: #6b7280;
        --op-text: #1f2937;
        --op-subtle: #ffffff;
        --op-btn: #ffffff;
        --op-btn-border: #d1d9e6;
        --op-btn-hover: #f0f3f8;
        --op-accent: #2563eb;
      }
      body.op-theme-dark {
        --op-bg: #111827;
        --op-border: #374151;
        --op-muted: #9ca3af;
        --op-text: #f3f4f6;
        --op-subtle: #1f2937;
        --op-btn: #374151;
        --op-btn-border: #4b5563;
        --op-btn-hover: #4b5563;
        --op-accent: #3b82f6;
      }
      .op-scroll-lock { overflow: hidden !important; }

      #overlay-pro-panel {
        position: fixed; z-index: 9999; background: var(--op-bg); border: 1px solid var(--op-border);
        border-radius: 12px; color: var(--op-text); font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
        font-size: 14px; width: auto; box-shadow: 0 8px 16px rgba(0,0,0,0.1); user-select: none;
      }
      #overlay-pro-panel.collapsed {
        width: auto;
        background: transparent;
        border: none;
        box-shadow: none;
      }

      .op-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border-bottom: 1px solid var(--op-border); border-radius: 12px 12px 0 0; cursor: grab; }
      .op-header:active { cursor: grabbing; }
      .op-header h3 { margin: 0; font-size: 15px; font-weight: 600; }
      .op-header-actions { display: flex; gap: 6px; }
      #overlay-pro-panel.collapsed .op-header h3,
      #overlay-pro-panel.collapsed .op-header #op-theme-toggle,
      #overlay-pro-panel.collapsed .op-header #op-refresh-btn {
        display: none;
      }
      #overlay-pro-panel.collapsed .op-header {
        border-bottom: none;
        padding: 0;
        cursor: default;
      }
      #overlay-pro-panel.collapsed .op-header .op-header-actions {
        justify-content: flex-end;
        width: 100%;
      }
      .op-toggle-btn, .op-hdr-btn { background: var(--op-btn); border: 1px solid var(--op-btn-border); color: var(--op-text); border-radius: 8px; padding: 4px 8px; cursor: pointer; }
      .op-toggle-btn:hover, .op-hdr-btn:hover { background: var(--op-btn); }
      #op-panel-toggle.logo-button {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232563eb' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M12 2.69l5.66 5.66a8 8 0 1 1-11.32 0L12 2.69z'/%3e%3c/svg%3e");
          background-color: var(--op-bg);
          background-size: 24px 24px;
          background-repeat: no-repeat;
          background-position: center;
          width: 42px;
          height: 42px;
          border: 1px solid var(--op-border);
          border-radius: 50%;
          text-indent: -9999px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.2s ease-in-out;
          cursor: grab;
      }
      #op-panel-toggle.logo-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(0,0,0,0.15);
      }

      .op-content { padding: 12px; display: grid; grid-template-columns: 1fr 320px; gap: 12px; }
      .op-section { display: flex; flex-direction: column; gap: 8px; background: var(--op-subtle); border: 1px solid var(--op-border); border-radius: 10px; padding: 8px; }

      .op-section-title { display: flex; align-items: center; justify-content: space-between; }
      .op-title-text { font-weight: 600; }
      .op-chevron { background: var(--op-btn); border: 1px solid var(--op-btn-border); border-radius: 6px; padding: 2px 6px; cursor: pointer; }
      .op-chevron:hover { background: var(--op-btn); }

      .op-row { display: flex; align-items: center; gap: 8px; }
      .op-row.space { justify-content: space-between; }

      .op-button { background: var(--op-btn); color: var(--op-text); border: 1px solid var(--op-btn-border); border-radius: 8px; padding: 6px 10px; cursor: pointer; }
      .op-button:hover { background: var(--op-btn-hover); }
      .op-button:disabled { opacity: 0.5; cursor: not-allowed; }
      .op-button.icon { width: 30px; height: 30px; padding: 0; display: inline-flex; align-items: center; justify-content: center; font-size: 16px; }

      .op-input, .op-select { background: var(--op-bg); border: 1px solid var(--op-border); color: var(--op-text); border-radius: 8px; padding: 6px 8px; }
      .op-slider { width: 100%; }

      .op-list { display: flex; flex-direction: column; gap: 6px; max-height: 140px; overflow: auto; border: 1px solid var(--op-border); padding: 6px; border-radius: 8px; background: var(--op-bg); }

      .op-item { display: flex; align-items: center; gap: 6px; padding: 6px; border-radius: 8px; border: 1px solid var(--op-border); background: var(--op-subtle); }
      .op-item.active { outline: 2px solid color-mix(in oklab, var(--op-accent) 35%, transparent); background: var(--op-bg); }
      .op-item-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

      .op-muted { color: var(--op-muted); font-size: 12px; }

      .op-preview { width: 100%; height: 90px; background: var(--op-bg); display: flex; align-items: center; justify-content: center; border: 2px dashed var(--op-border); border-radius: 8px; overflow: hidden; position: relative; cursor: pointer; }
      .op-preview img { max-width: 100%; max-height: 100%; display: block; pointer-events: none; }
      .op-preview.drop-highlight { background: color-mix(in oklab, var(--op-accent) 12%, transparent); }
      .op-preview .op-drop-hint { position: absolute; bottom: 6px; right: 8px; font-size: 11px; color: var(--op-muted); pointer-events: none; }

      .op-icon-btn { background: var(--op-btn); color: var(--op-text); border: 1px solid var(--op-btn-border); border-radius: 8px; width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; }
      .op-icon-btn:hover { background: var(--op-btn-hover); }

      .op-danger { background: #fee2e2; border-color: #fecaca; color: #7f1d1d; }
      .op-danger-text { color: #dc2626; font-weight: 600; }

      .op-toast-stack { position: fixed; top: 12px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; pointer-events: none; z-index: 999999; width: min(92vw, 480px); }
      .op-toast { background: var(--op-bg); border: 1px solid var(--op-border); color: var(--op-text); padding: 8px 16px; border-radius: 8px; font-size: 13px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); opacity: 0; transform: translateY(-8px); transition: opacity .2s ease, transform .2s ease; max-width: 100%; text-align: center; }
      .op-toast.show { opacity: 1; transform: translateY(0); }
      .op-toast-stack.op-dark .op-toast { background: var(--op-bg); border-color: var(--op-border); color: var(--op-text); }

      /* Color Match Modal */
      .op-cc-backdrop { position: fixed; inset: 0; z-index: 10000; background: rgba(0,0,0,0.45); display: none; }
      .op-cc-backdrop.show { display: block; }

      .op-cc-modal {
        position: fixed; z-index: 10001;
        width: min(1280px, 98vw);
        max-height: 92vh;
        left: 50%; top: 50%; transform: translate(-50%, -50%);
        background: var(--op-bg); color: var(--op-text);
        border: 1px solid var(--op-border);
        border-radius: 14px;
        box-shadow: 0 16px 48px rgba(0,0,0,0.28);
        display: none; flex-direction: column;
      }
      .op-cc-header { padding: 10px 12px; border-bottom: 1px solid var(--op-border); display: flex; align-items: center; justify-content: space-between; user-select: none; cursor: default; }
      .op-cc-title { font-weight: 600; }
      .op-cc-close { border: 1px solid var(--op-btn-border); background: var(--op-btn); border-radius: 8px; padding: 4px 8px; cursor: pointer; }
      .op-cc-close:hover { background: var(--op-btn); }
      .op-cc-pill { border-radius: 999px; padding: 4px 10px; border: 1px solid var(--op-border); background: var(--op-bg); }

      .op-cc-body {
        display: grid;
        grid-template-columns: 2fr 420px;
        grid-template-areas: "preview controls";
        gap: 12px;
        padding: 12px;
        overflow: hidden;
      }
      @media (max-width: 860px) {
        .op-cc-body { grid-template-columns: 1fr; grid-template-areas: "preview" "controls"; max-height: calc(92vh - 100px); overflow: auto; }
      }

      .op-cc-preview-wrap { grid-area: preview; background: var(--op-subtle); border: 1px solid var(--op-border); border-radius: 10px; position: relative; min-height: 320px; display: flex; align-items: center; justify-content: center; overflow: auto; }
      .op-cc-canvas { image-rendering: pixelated; }
      .op-cc-zoom { position: absolute; top: 8px; right: 8px; display: inline-flex; gap: 6px; }
      .op-cc-zoom .op-icon-btn { width: 34px; height: 34px; }

      .op-cc-controls { grid-area: controls; display: flex; flex-direction: column; gap: 12px; background: var(--op-subtle); border: 1px solid var(--op-border); border-radius: 10px; padding: 10px; overflow: auto; max-height: calc(92vh - 160px); }
      .op-cc-block { display: flex; flex-direction: column; gap: 6px; }
      .op-cc-block label { color: var(--op-muted); font-weight: 600; }

      .op-cc-palette { display: flex; flex-direction: column; gap: 8px; background: var(--op-bg); border: 1px solid var(--op-border); border-radius: 8px; padding: 8px; }
      .op-list-subtle { background: var(--op-bg); border: 1px solid var(--op-border); border-radius: 8px; padding: 6px; }
      .op-cc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(22px, 22px)); gap: 6px; }
      .op-cc-cell { width: 22px; height: 22px; border-radius: 4px; border: 2px solid #fff; box-shadow: 0 0 0 1px rgba(0,0,0,0.15) inset; cursor: pointer; }
      .op-cc-cell.active { outline: 2px solid var(--op-accent); }

      .op-cc-footer { padding: 10px 12px; border-top: 1px solid var(--op-border); display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
      .op-cc-actions { display: inline-flex; gap: 8px; }
      .op-cc-ghost { color: var(--op-muted); font-size: 12px; }

      .op-color-list-item { display: flex; align-items: center; gap: 8px; font-size: 12px; padding: 2px 4px; }
      .op-color-list-swatch { width: 14px; height: 14px; border-radius: 4px; border: 1px solid var(--op-border); flex-shrink: 0; }
      .op-color-list-name { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .op-color-list-count { font-weight: 600; }
      .op-color-list-item.premium .op-color-list-name { color: #eeff00ff; font-weight: bold; }
      .op-theme-dark .op-color-list-item.premium .op-color-list-name { color: #fdd835; }

      .op-dist-item { display: flex; align-items: center; gap: 8px; font-size: 12px; padding: 2px 4px; }
      .op-dist-item.premium .op-color-list-name { color: #eeff00ff; font-weight: bold; }
      .op-theme-dark .op-dist-item.premium .op-color-list-name { color: #fdd835; }

      /* Resize Modal */
      .op-rs-backdrop { position: fixed; inset: 0; z-index: 10000; background: rgba(0,0,0,0.45); display: none; }
      .op-rs-backdrop.show { display: block; }

      .op-rs-modal {
        position: fixed; z-index: 10001;
        width: min(1200px, 96vw);
        left: 50%; top: 50%; transform: translate(-50%, -50%);
        background: var(--op-bg); color: var(--op-text);
        border: 1px solid var(--op-border);
        border-radius: 12px;
        box-shadow: 0 12px 24px rgba(0,0,0,0.2);
        display: none; flex-direction: column;
        max-height: 92vh;
      }
      .op-rs-header { padding: 10px 12px; border-bottom: 1px solid var(--op-border); display: flex; align-items: center; justify-content: space-between; user-select: none; cursor: default; }
      .op-rs-title { font-weight: 600; }
      .op-rs-close { border: 1px solid var(--op-border); background: transparent; border-radius: 8px; padding: 4px 8px; cursor: pointer; }
      .op-rs-close:hover { background: var(--op-btn); }

      .op-rs-tabs { display: flex; gap: 6px; padding: 8px 12px 0 12px; }
      .op-rs-tab-btn { background: var(--op-btn); color: var(--op-text); border: 1px solid var(--op-btn-border); border-radius: 10px; padding: 6px 10px; cursor: pointer; }
      .op-rs-tab-btn.active { outline: 2px solid color-mix(in oklab, var(--op-accent) 35%, transparent); background: var(--op-btn-hover); }

      .op-rs-body { padding: 12px; display: grid; grid-template-columns: 1fr; gap: 10px; overflow: auto; }
      .op-rs-row { display: flex; align-items: center; gap: 8px; }
      .op-rs-row .op-input { flex: 1; }

      .op-rs-pane { display: none; }
      .op-rs-pane.show { display: block; }

      .op-rs-preview-wrap { background: var(--op-subtle); border: 1px solid var(--op-border); border-radius: 12px; position: relative; height: clamp(260px, 36vh, 540px); display: flex; align-items: center; justify-content: center; overflow: hidden; }
      .op-rs-canvas { image-rendering: pixelated; }

      .op-rs-zoom { position: absolute; top: 8px; right: 8px; display: inline-flex; gap: 6px; }

      .op-rs-grid-note { color: var(--op-muted); font-size: 12px; }
      .op-rs-mini { width: 96px; }

      .op-rs-dual { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; width: 100%; height: 100%; padding: 8px; box-sizing: border-box; }
      .op-rs-col { position: relative; background: var(--op-bg); border: 1px dashed var(--op-border); border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; overflow: hidden; }
      .op-rs-col .label { position: absolute; top: 2px; left: 0; right: 0; text-align: center; font-size: 12px; color: var(--op-muted); pointer-events: none; }
      .op-rs-col .pad-top { height: 18px; width: 100%; flex: 0 0 auto; }
      .op-rs-thumb { width: 100%; height: calc(100% - 18px); display: block; }

      .op-pan-grab { cursor: grab; }
      .op-pan-grabbing { cursor: grabbing; }

      .op-rs-footer { padding: 10px 12px; border-top: 1px solid var(--op-border); display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
    `,document.head.appendChild(t)}function bt(){if(document.getElementById("overlay-pro-panel"))return;const t=document.createElement("div");t.id="overlay-pro-panel";const i=Math.max(12,window.innerWidth-340-80);t.style.left=(Number.isFinite(u.panelX)?u.panelX:i)+"px",t.style.top=(Number.isFinite(u.panelY)?u.panelY:120)+"px",t.innerHTML=`
      <div class="op-header" id="op-header">
          <h3>Hail's OP</h3>
          <div class="op-header-actions">
              <button class="op-hdr-btn" id="op-theme-toggle" title="Toggle theme">\u2600\uFE0F/\u{1F319}</button>
              <button class="op-hdr-btn" id="op-refresh-btn" title="Refresh">\u27F2</button>
              <button class="op-toggle-btn" id="op-panel-toggle" title="Collapse">\u25BE</button>
          </div>
      </div>
      <div class="op-content" id="op-content">
          <div class="op-column">
              <div class="op-section">
                  <div class="op-row space">
                      <select class="op-select" id="op-mode-select" style="flex: 1;">
                          <option value="behind" style="color: cyan;">Overlay Behind</option>
                          <option value="above">Overlay Above</option>
                          <option value="smart">Smart</option>
                          <option value="diff" style="color: red;">Diff</option>
                          <option value="minify">Minified</option>
                          <option value="original">Original</option>
                      </select>
                      <div class="op-row">
                          <span class="op-muted" id="op-place-label">Place overlay:</span>
                          <button class="op-button" id="op-autocap-toggle" title="Capture next clicked pixel as anchor">OFF</button>
                      </div>
                  </div>
                  <div class="op-row" style="padding: 4px 0;">
                      <input type="checkbox" id="op-highlight-toggle" style="margin-left: 4px;">
                      <label for="op-highlight-toggle" style="cursor:pointer;">Highlight pixels (pink)</label>
                  </div>
              </div>
              <div class="op-section">
                  <div class="op-section-title">
                      <div class="op-title-left">
                          <span class="op-title-text">Overlays</span>
                      </div>
                      <div class="op-title-right">
                          <div class="op-row">
                              <button class="op-button" id="op-add-overlay" title="Create a new overlay">+ Add</button>
                              <button class="op-button" id="op-import-overlay" title="Import overlay JSON">Import</button>
                              <button class="op-button" id="op-export-overlay" title="Export active overlay JSON">Export</button>
                              <button class="op-chevron" id="op-collapse-list" title="Collapse/Expand">\u25BE</button>
                          </div>
                      </div>
                  </div>
                  <div id="op-list-wrap">
                      <div class="op-list" id="op-overlay-list"></div>
                  </div>
              </div>
              <div class="op-section" id="op-editor-section">
                  <div class="op-section-title">
                      <div class="op-title-left">
                          <span class="op-title-text">Editor</span>
                      </div>
                      <div class="op-title-right">
                          <button class="op-chevron" id="op-collapse-editor" title="Collapse/Expand">\u25BE</button>
                      </div>
                  </div>
                  <div id="op-editor-body">
                      <div class="op-row">
                          <label style="width: 90px;">Name</label>
                          <input type="text" class="op-input op-grow" id="op-name">
                      </div>
                      <div id="op-image-source">
                          <div class="op-row">
                              <label style="width: 90px;">Image</label>
                              <input type="text" class="op-input op-grow" id="op-image-url" placeholder="Paste a direct image link">
                              <button class="op-button" id="op-fetch">Fetch</button>
                          </div>
                          <div class="op-preview" id="op-dropzone">
                              <div class="op-drop-hint">Drop here or click to browse.</div>
                              <input type="file" id="op-file-input" accept="image/*" style="display:none">
                          </div>
                      </div>
                      <div class="op-preview" id="op-preview-wrap" style="display:none;">
                          <img id="op-image-preview" alt="No image">
                      </div>
                      <div class="op-row" id="op-cc-btn-row" style="display:none; justify-content:space-between; gap:8px; flex-wrap:wrap;">
                          <button class="op-button" id="op-download-overlay" title="Download this overlay image">Download</button>
                          <button class="op-button" id="op-open-resize" title="Resize the overlay image">Resize</button>
                          <button class="op-button" id="op-open-cc" title="Match colors to Wplace palette">Color Match</button>
                      </div>
                      <div class="op-row"><span class="op-muted" id="op-coord-display"></span></div>
                      <div class="op-row" style="width: 100%; gap: 12px; padding: 6px 0;">
                          <label style="width: 60px;">Opacity</label>
                          <input type="range" min="0" max="1" step="0.05" class="op-slider op-grow" id="op-opacity-slider">
                          <span id="op-opacity-value" style="width: 36px; text-align: right;">70%</span>
                      </div>
                  </div>
              </div>
              <div class="op-section" id="op-nudge-section">
                  <div class="op-section-title">
                      <div class="op-title-left">
                          <span class="op-title-text">Nudge overlay</span>
                      </div>
                      <div class="op-title-right">
                          <span class="op-muted" id="op-offset-indicator">Offset X 0, Y 0</span>
                          <button class="op-chevron" id="op-collapse-nudge" title="Collapse/Expand">\u25BE</button>
                      </div>
                  </div>
                  <div id="op-nudge-body">
                      <div class="op-nudge-row" style="text-align: right;">
                          <button class="op-icon-btn" id="op-nudge-left" title="Left">\u2190</button>
                          <button class="op-icon-btn" id="op-nudge-down" title="Down">\u2193</button>
                          <button class="op-icon-btn" id="op-nudge-up" title="Up">\u2191</button>
                          <button class="op-icon-btn" id="op-nudge-right" title="Right">\u2192</button>
                      </div>
                  </div>
              </div>
          </div>
          <div class="op-column">
              <div class="op-section" id="op-colors-section" style="flex-grow: 1;">
                  <div class="op-section-title">
                      <div class="op-title-left">
                          <span class="op-title-text">Color Toggle</span>
                      </div>
                      <div class="op-title-right">
                           <button class="op-button" id="op-colors-refresh" title="Refresh counts" style="padding: 2px 6px; font-size: 12px;">Refresh</button>
                          <button class="op-chevron" id="op-collapse-colors" title="Collapse/Expand">\u25BE</button>
                      </div>
                  </div>
                  <div id="op-colors-body">
                      <div class="op-row" style="gap: 6px; flex-wrap: wrap;">
                          <button class="op-button" id="op-colors-all">All</button>
                          <button class="op-button" id="op-colors-none">None</button>
                          <button class="op-button" id="op-colors-free">All Free</button>
                          <button class="op-button" id="op-colors-paid">All Paid</button>
                          <button class="op-button" id="op-colors-copy">Copy</button>
                      </div>
                      <div class="op-list" id="op-colors-list" style="max-height: 480px; gap: 4px;"></div>
                  </div>
              </div>
          </div>
      </div>
    `,document.body.appendChild(t),St(),Rt(),Lt(),It(t),X()}function P(){return u.overlays.find(t=>t.id===u.activeOverlayId)||null}function Ke(){const t=document.getElementById("op-overlay-list");if(t){t.innerHTML="";for(const o of u.overlays){const i=document.createElement("div");i.className="op-item"+(o.id===u.activeOverlayId?" active":"");const a=o.isLocal?" (local)":o.imageBase64?"":" (no image)";i.innerHTML=`
        <input type="radio" name="op-active" ${o.id===u.activeOverlayId?"checked":""} title="Set active"/>
        <input type="checkbox" ${o.enabled?"checked":""} title="Toggle enabled"/>
        <div class="op-item-name" title="${(o.name||"(unnamed)")+a}">${(o.name||"(unnamed)")+a}</div>
        <button class="op-icon-btn" title="Delete overlay">\u{1F5D1}\uFE0F</button>
      `;const[n,r,d,s]=i.children;n.addEventListener("change",()=>{u.activeOverlayId=o.id,L(["activeOverlayId"]),X()}),r.addEventListener("change",()=>{o.enabled=r.checked,L(["overlays"]),F(),H()}),d.addEventListener("click",()=>{u.activeOverlayId=o.id,L(["activeOverlayId"]),X()}),s.addEventListener("click",async c=>{if(c.stopPropagation(),!confirm(`Delete overlay "${o.name||"(unnamed)"}"?`))return;const v=u.overlays.findIndex(g=>g.id===o.id);v>=0&&(u.overlays.splice(v,1),u.activeOverlayId===o.id&&(u.activeOverlayId=u.overlays[0]?.id||null),await L(["overlays","activeOverlayId"]),F(),H(),X())}),t.appendChild(i)}}}async function xt(){const t=Ae("Overlay"),o={id:ze(),name:t,enabled:!0,imageUrl:null,imageBase64:null,isLocal:!1,pixelUrl:null,offsetX:0,offsetY:0,opacity:.7,visibleColorKeys:[]};return u.overlays.push(o),u.activeOverlayId=o.id,await L(["overlays","activeOverlayId"]),F(),H(),X(),o}async function wt(t,o){const i=await Be(o);t.imageUrl=o,t.imageBase64=i,t.isLocal=!1,await L(["overlays"]),F(),u.autoCapturePixelUrl=!0,await L(["autoCapturePixelUrl"]),H(),X(),D("Image loaded. Placement mode ON -- click once to set anchor.")}async function Ve(t,o){if(!o||!o.type||!o.type.startsWith("image/")){alert("Please choose an image file.");return}if(!confirm("Local PNGs cannot be exported to friends! Are you sure?"))return;const i=await at(o);t.imageBase64=i,t.imageUrl=null,t.isLocal=!0,await L(["overlays"]),F(),u.autoCapturePixelUrl=!0,await L(["autoCapturePixelUrl"]),H(),X(),D("Local image loaded. Placement mode ON -- click once to set anchor.")}async function Mt(t){let o;try{o=JSON.parse(t)}catch{alert("Invalid JSON");return}const i=Array.isArray(o)?o:[o];let a=0,n=0;for(const r of i){const d=Ae(r.name||"Imported Overlay"),s=r.imageUrl,c=r.pixelUrl??null,v=Number.isFinite(r.offsetX)?r.offsetX:0,g=Number.isFinite(r.offsetY)?r.offsetY:0,f=Number.isFinite(r.opacity)?r.opacity:.7;if(!s){n++;continue}try{const x=await Be(s),m={id:ze(),name:d,enabled:!0,imageUrl:s,imageBase64:x,isLocal:!1,pixelUrl:c,offsetX:v,offsetY:g,opacity:f,visibleColorKeys:[]};u.overlays.push(m),a++}catch(x){console.error("Import failed for",s,x),n++}}a>0&&(u.activeOverlayId=u.overlays[u.overlays.length-1].id,await L(["overlays","activeOverlayId"]),F(),H(),X()),alert(`Import finished. Imported: ${a}${n?`, Failed: ${n}`:""}`)}function kt(){const t=P();if(!t){alert("No active overlay selected.");return}if(t.isLocal||!t.imageUrl){alert("This overlay uses a local image and cannot be exported. Please host the image and set an image URL.");return}const o={version:1,name:t.name,imageUrl:t.imageUrl,pixelUrl:t.pixelUrl??null,offsetX:t.offsetX,offsetY:t.offsetY,opacity:t.opacity},i=JSON.stringify(o,null,2);Re(i).then(()=>alert("Overlay JSON copied to clipboard!")).catch(()=>{prompt("Copy the JSON below:",i)})}function Re(t){return navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(t):Promise.reject(new Error("Clipboard API not available"))}function Lt(){const t=n=>document.getElementById(n);t("op-theme-toggle").addEventListener("click",async n=>{n.stopPropagation(),u.theme=u.theme==="light"?"dark":"light",await L(["theme"]),Oe()}),t("op-refresh-btn").addEventListener("click",n=>{n.stopPropagation(),location.reload()}),t("op-mode-select").addEventListener("change",n=>{u.overlayMode=n.target.value,L(["overlayMode"]),H(),X()}),t("op-autocap-toggle").addEventListener("click",()=>{u.autoCapturePixelUrl=!u.autoCapturePixelUrl,L(["autoCapturePixelUrl"]),H(),X()}),t("op-highlight-toggle").addEventListener("change",async n=>{u.highlightPixels=n.target.checked,await L(["highlightPixels"]),F()}),t("op-add-overlay").addEventListener("click",async()=>{try{await xt()}catch(n){console.error(n)}}),t("op-import-overlay").addEventListener("click",async()=>{const n=prompt("Paste overlay JSON (single or array):");n&&await Mt(n)}),t("op-export-overlay").addEventListener("click",()=>kt()),t("op-collapse-list").addEventListener("click",()=>{u.collapseList=!u.collapseList,L(["collapseList"]),X()}),t("op-collapse-editor").addEventListener("click",()=>{u.collapseEditor=!u.collapseEditor,L(["collapseEditor"]),X()}),t("op-collapse-nudge").addEventListener("click",()=>{u.collapseNudge=!u.collapseNudge,L(["collapseNudge"]),X()}),t("op-collapse-colors").addEventListener("click",()=>{u.collapseColors=!u.collapseColors,L(["collapseColors"]),X()}),t("op-colors-refresh").addEventListener("click",async()=>{ve.clear(),await ne()}),t("op-colors-all").addEventListener("click",async()=>{const n=P();n&&(n.visibleColorKeys=null,await L(["overlays"]),F(),await ne())}),t("op-colors-none").addEventListener("click",async()=>{const n=P();n&&(n.visibleColorKeys=[],await L(["overlays"]),F(),await ne())}),t("op-colors-free").addEventListener("click",async()=>{const n=P();if(!n)return;const r=await he(n),d=Object.keys(r),s=new Set(Se.map(([c,v,g])=>`${c},${v},${g}`));n.visibleColorKeys=d.filter(c=>s.has(c)),await L(["overlays"]),F(),await ne()}),t("op-colors-paid").addEventListener("click",async()=>{const n=P();if(!n)return;const r=await he(n),d=Object.keys(r),s=new Set(ae.map(([c,v,g])=>`${c},${v},${g}`));n.visibleColorKeys=d.filter(c=>s.has(c)),await L(["overlays"]),F(),await ne()}),t("op-colors-copy").addEventListener("click",async()=>{const n=P();if(!n)return;const r=await he(n),d=new Set(ae.map(([y,b,k])=>`${y},${b},${k}`)),s=Object.entries(r).sort(([,y],[,b])=>b-y);let c;n.visibleColorKeys===null||n.visibleColorKeys===void 0?c=new Set(Object.keys(r)):c=new Set(n.visibleColorKeys);const v=s.map(([y,b])=>{const k=d.has(y),I=de[y]||y;return{key:y,name:I,premiumStatus:k?"PAID":"FREE",count:b.toString()}});if(v.length===0){Re("```\n```").then(()=>D("No color data to copy.")).catch(()=>D("Failed to copy."));return}const g=Math.max(...v.map(y=>y.name.length)),f=Math.max(...v.map(y=>y.premiumStatus.length)),x=Math.max(...v.map(y=>y.count.length)),M="```\n"+v.map(({key:y,name:b,premiumStatus:k,count:I})=>{const $=c.has(y)?"x":" ",E=b.padEnd(g," "),A=k.padEnd(f," "),O=I.padEnd(x," ");return`- [${$}] ${E};${A};${O};`}).join(`
`)+"\n```";Re(M).then(()=>D("Color data copied to clipboard!")).catch(()=>D("Failed to copy color data."))}),t("op-name").addEventListener("change",async n=>{const r=P();if(!r)return;const d=(n.target.value||"").trim()||"Overlay";u.overlays.some(s=>s.id!==r.id&&(s.name||"").toLowerCase()===d.toLowerCase())?(r.name=Ae(d),D(`Name in use. Renamed to "${r.name}".`)):r.name=d,await L(["overlays"]),Ke()}),t("op-fetch").addEventListener("click",async()=>{const n=P();if(!n){alert("No active overlay selected.");return}if(n.imageBase64){alert("This overlay already has an image. Create a new overlay to change the image.");return}const r=t("op-image-url").value.trim();if(!r){alert("Enter an image link first.");return}try{await wt(n,r)}catch(d){console.error(d),alert("Failed to fetch image.")}});const o=t("op-dropzone");o.addEventListener("click",()=>t("op-file-input").click()),t("op-file-input").addEventListener("change",async n=>{const r=n.target.files&&n.target.files[0];if(n.target.value="",!r)return;const d=P();if(d){if(d.imageBase64){alert("This overlay already has an image. Create a new overlay to change the image.");return}try{await Ve(d,r)}catch(s){console.error(s),alert("Failed to load local image.")}}}),["dragenter","dragover"].forEach(n=>o.addEventListener(n,r=>{r.preventDefault(),r.stopPropagation(),o.classList.add("drop-highlight")})),["dragleave","drop"].forEach(n=>o.addEventListener(n,r=>{r.preventDefault(),r.stopPropagation(),!(n==="dragleave"&&r.target!==o)&&o.classList.remove("drop-highlight")})),o.addEventListener("drop",async n=>{const r=n.dataTransfer;if(!r)return;const d=r.files&&r.files[0];if(!d)return;const s=P();if(s){if(s.imageBase64){alert("This overlay already has an image. Create a new overlay to change the image.");return}try{await Ve(s,d)}catch(c){console.error(c),alert("Failed to load dropped image.")}}});const i=async(n,r)=>{const d=P();d&&(d.offsetX+=n,d.offsetY+=r,await L(["overlays"]),F(),X())};t("op-nudge-up").addEventListener("click",()=>i(0,-1)),t("op-nudge-down").addEventListener("click",()=>i(0,1)),t("op-nudge-left").addEventListener("click",()=>i(-1,0)),t("op-nudge-right").addEventListener("click",()=>i(1,0)),t("op-opacity-slider").addEventListener("input",n=>{const r=P();r&&(r.opacity=parseFloat(n.target.value),document.getElementById("op-opacity-value").textContent=Math.round(r.opacity*100)+"%")}),t("op-opacity-slider").addEventListener("change",async()=>{await L(["overlays"]),F()}),t("op-download-overlay").addEventListener("click",()=>{const n=P();if(!n||!n.imageBase64){D("No overlay image to download.");return}const r=document.createElement("a");r.href=n.imageBase64,r.download=`${(n.name||"overlay").replace(/[^\w.-]+/g,"_")}.png`,document.body.appendChild(r),r.click(),r.remove()}),t("op-open-cc").addEventListener("click",()=>{const n=P();if(!n||!n.imageBase64){D("No overlay image to edit.");return}At(n)});const a=t("op-open-resize");a&&a.addEventListener("click",()=>{const n=P();if(!n||!n.imageBase64){D("No overlay image to resize.");return}Ot(n)}),window.addEventListener("resize",()=>{})}function It(t){const o=t.querySelector("#op-header"),i=t.querySelector("#op-panel-toggle");if(!o||!i)return;let a=!1,n=0,r=0,d=0,s=0,c=!1;const v=(m,M,y)=>Math.min(Math.max(m,M),y),g=m=>{const M=t.classList.contains("collapsed"),y=M?i:o;if(M){if(m.target!==i)return}else if(!m.target.closest("#op-header")||m.target.closest("button"))return;a=!0,c=!1,n=m.clientX,r=m.clientY;const b=t.getBoundingClientRect();d=b.left,s=b.top,y.setPointerCapture?.(m.pointerId),m.preventDefault()},f=m=>{if(!a)return;const M=m.clientX-n,y=m.clientY-r,b=Math.max(8,window.innerWidth-t.offsetWidth-8),k=Math.max(8,window.innerHeight-t.offsetHeight-8);t.style.left=v(d+M,8,b)+"px",t.style.top=v(s+y,8,k)+"px",c=!0},x=m=>{if(!a)return;const y=t.classList.contains("collapsed")?i:o;a=!1,y.releasePointerCapture?.(m.pointerId),c&&(u.panelX=parseInt(t.style.left,10)||0,u.panelY=parseInt(t.style.top,10)||0,L(["panelX","panelY"]))};t.addEventListener("pointerdown",g),t.addEventListener("pointermove",f),t.addEventListener("pointerup",x),t.addEventListener("pointercancel",x),window.addEventListener("resize",()=>{const m=t.getBoundingClientRect(),M=Math.max(8,window.innerWidth-t.offsetWidth-8),y=Math.max(8,window.innerHeight-t.offsetHeight-8),b=Math.min(Math.max(m.left,8),M),k=Math.min(Math.max(m.top,8),y);t.style.left=b+"px",t.style.top=k+"px",u.panelX=b,u.panelY=k,L(["panelX","panelY"])}),i.addEventListener("click",m=>{if(c){m.preventDefault(),m.stopPropagation();return}u.isPanelCollapsed=!u.isPanelCollapsed,L(["isPanelCollapsed"]),X()})}function Oe(){document.body.classList.toggle("op-theme-dark",u.theme==="dark"),document.body.classList.toggle("op-theme-light",u.theme!=="dark");const t=document.getElementById("op-toast-stack");t&&t.classList.toggle("op-dark",u.theme==="dark")}function Et(){const t=f=>document.getElementById(f),o=P(),i=t("op-editor-section"),a=t("op-editor-body");if(i.style.display=o?"flex":"none",!o)return;t("op-name").value=o.name||"";const n=t("op-image-source"),r=t("op-preview-wrap"),d=t("op-image-preview"),s=t("op-cc-btn-row");o.imageBase64?(n.style.display="none",r.style.display="flex",d.src=o.imageBase64,s.style.display="flex"):(n.style.display="block",r.style.display="none",s.style.display="none",t("op-image-url").value=o.imageUrl||"");const c=o.pixelUrl?ge(o.pixelUrl):{chunk1:"-",chunk2:"-",posX:"-",posY:"-"};t("op-coord-display").textContent=o.pixelUrl?`Ref: chunk ${c.chunk1}/${c.chunk2} at (${c.posX}, ${c.posY})`:'No pixel anchor set. Turn ON "Place overlay" and click a pixel once.',t("op-opacity-slider").value=String(o.opacity),t("op-opacity-value").textContent=Math.round(o.opacity*100)+"%";const v=document.getElementById("op-offset-indicator");v&&(v.textContent=`Offset X ${o.offsetX}, Y ${o.offsetY}`),a.style.display=u.collapseEditor?"none":"block";const g=document.getElementById("op-collapse-editor");g&&(g.textContent=u.collapseEditor?"\u25B8":"\u25BE")}async function X(){const t=C=>document.getElementById(C),o=t("overlay-pro-panel");if(!o)return;Oe();const i=t("op-content"),a=t("op-panel-toggle"),n=t("op-header"),r=!!u.isPanelCollapsed;o.classList.toggle("collapsed",r),i.style.display=r?"none":"grid",a.classList.toggle("logo-button",r),a.title=r?"Expand":"Collapse";const d=t("op-mode-select");d&&(d.value=u.overlayMode);const s=t("op-autocap-toggle"),c=t("op-place-label");s.textContent=u.autoCapturePixelUrl?"ON":"OFF",s.classList.toggle("op-danger",!!u.autoCapturePixelUrl),c.classList.toggle("op-danger-text",!!u.autoCapturePixelUrl);const v=t("op-highlight-toggle");v&&(v.checked=!!u.highlightPixels);const g=t("op-list-wrap"),f=t("op-collapse-list");g.style.display=u.collapseList?"none":"block",f&&(f.textContent=u.collapseList?"\u25B8":"\u25BE");const x=t("op-nudge-body"),m=t("op-collapse-nudge");x.style.display=u.collapseNudge?"none":"block",m&&(m.textContent=u.collapseNudge?"\u25B8":"\u25BE");const M=t("op-colors-body"),y=t("op-collapse-colors");M&&(M.style.display=u.collapseColors?"none":"block"),y&&(y.textContent=u.collapseColors?"\u25B8":"\u25BE"),Ke(),Et(),await ne();const b=t("op-export-overlay"),k=P(),I=!!(k&&k.imageUrl&&!k.isLocal);b.disabled=!I,b.title=I?"Export active overlay JSON":"Export disabled for local images"}const _e=new Map;async function he(t){if(!t||!t.imageBase64)return{};const o=t.imageBase64.slice(0,64)+":"+t.imageBase64.length;if(_e.has(o))return _e.get(o);const i=await se(t.imageBase64),n=T(i.width,i.height).getContext("2d",{willReadFrequently:!0});n.drawImage(i,0,0);const d=n.getImageData(0,0,i.width,i.height).data,s={};for(let c=0;c<d.length;c+=4)if(d[c+3]>0){const v=`${d[c]},${d[c+1]},${d[c+2]}`;s[v]=(s[v]||0)+1}return _e.set(o,s),s}async function Ct(t){if(!t||!t.imageBase64||!t.pixelUrl)return null;const o=De(t),i=Array.from(me.keys()).sort().join(";"),a=`${t.id}|${o}|${i}`;if(ve.has(a))return ve.get(a);const n=await se(t.imageBase64),r=n.width,d=n.height,c=T(r,d).getContext("2d",{willReadFrequently:!0});c.drawImage(n,0,0);const g=c.getImageData(0,0,r,d).data,f=ge(t.pixelUrl);if(!Number.isFinite(f.chunk1)||!Number.isFinite(f.chunk2))return null;const x={};for(let m=0;m<d;m++)for(let M=0;M<r;M++){const y=(m*r+M)*4;if(g[y+3]===0)continue;const b=g[y],k=g[y+1],I=g[y+2],C=`${b},${k},${I}`;x[C]||(x[C]={smart:0,below:0});const $=f.chunk1*1e3+f.posX+t.offsetX+M,E=f.chunk2*1e3+f.posY+t.offsetY+m,A=Math.floor($/1e3),O=Math.floor(E/1e3),V=`${A},${O}`;if(me.has(V)){const G=me.get(V),W=G.data,Z=G.width,p=($%1e3+1e3)%1e3,w=((E%1e3+1e3)%1e3*Z+p)*4,S=W[w],R=W[w+1],Y=W[w+2];W[w+3]===0?x[C].below++:(b!==S||k!==R||I!==Y)&&x[C].smart++}}return ve.set(a,x),x}async function ne(){const t=P(),o=document.getElementById("op-colors-section");if(!o)return;if(!t||!t.imageBase64){o.style.display="none";return}o.style.display="flex";const i=document.getElementById("op-colors-list");i.innerHTML='<div class="op-muted" style="text-align:center; padding: 12px 0;">Loading...</div>';const a=await he(t),n=await Ct(t)||{};let r;t.visibleColorKeys===null||t.visibleColorKeys===void 0?r=new Set(Object.keys(a)):r=new Set(t.visibleColorKeys);const d=Object.entries(a).sort(([,c],[,v])=>v-c),s=new Set(ae.map(([c,v,g])=>`${c},${v},${g}`));if(i.innerHTML="",d.length===0){i.innerHTML='<div class="op-muted" style="text-align:center; padding: 12px 0;">No colors found.</div>';return}for(const[c,v]of d){const g=s.has(c),f=de[c]||c,x=document.createElement("div");x.className="op-dist-item"+(g?" premium":""),x.title=`${f} (${c}): ${v} pixels`;const m=n[c]?.below||0,M=n[c]?.smart||0,b=`<span style="color: lime;">${v-m-M}</span>/<span style="color: cyan;">${m}</span>/<span style="color: red;">${M}</span>/${v}`;x.innerHTML=`
            <input type="checkbox" data-key="${c}" ${r.has(c)?"checked":""} style="margin-right: 4px;">
            <div class="op-color-list-swatch" style="background-color: rgb(${c});"></div>
            <div class="op-color-list-name">${f}</div>
            <div class="op-color-list-count">${b}</div>
        `,i.appendChild(x)}i.querySelectorAll('input[type="checkbox"]').forEach(c=>{c.addEventListener("change",async()=>{const v=c.dataset.key,g=P();if(!g)return;if(g.visibleColorKeys===null){const x=Object.keys(await he(g));g.visibleColorKeys=x}const f=new Set(g.visibleColorKeys);c.checked?f.add(v):f.delete(v),g.visibleColorKeys=Array.from(f),await L(["overlays"]),F()})})}let l=null;function St(){const t=document.createElement("div");t.className="op-cc-backdrop",t.id="op-cc-backdrop",document.body.appendChild(t);const o=document.createElement("div");o.className="op-cc-modal",o.id="op-cc-modal",o.style.display="none",o.innerHTML=`
      <div class="op-cc-header" id="op-cc-header">
        <div class="op-cc-title">Color Match</div>
        <div class="op-row" style="gap:6px;">
          <button class="op-button op-cc-pill" id="op-cc-realtime">Realtime: OFF</button>
          <button class="op-cc-close" id="op-cc-close" title="Close">\u2715</button>
        </div>
      </div>

      <div class="op-cc-body">
        <div class="op-cc-preview-wrap" style="grid-area: preview;">
          <canvas id="op-cc-preview" class="op-cc-canvas"></canvas>
          <div class="op-cc-zoom">
            <button class="op-icon-btn" id="op-cc-zoom-out" title="Zoom out">\u2212</button>
            <button class="op-icon-btn" id="op-cc-zoom-in" title="Zoom in">+</button>
          </div>
        </div>

        <div class="op-cc-controls" style="grid-area: controls;">
          <div class="op-cc-palette" id="op-cc-free">
            <div class="op-row space">
              <label>Free Colors</label>
              <button class="op-button" id="op-cc-free-toggle">Unselect All</button>
            </div>
            <div id="op-cc-free-grid" class="op-cc-grid"></div>
          </div>

          <div class="op-cc-palette" id="op-cc-paid">
            <div class="op-row space">
              <label>Paid Colors (2000\u{1F4A7}each)</label>
              <button class="op-button" id="op-cc-paid-toggle">Select All</button>
            </div>
            <div id="op-cc-paid-grid" class="op-cc-grid"></div>
          </div>

          <div class="op-cc-block">
            <label>Color Counts</label>
            <div id="op-cc-color-list" class="op-list op-list-subtle" style="max-height: 160px;"></div>
          </div>
        </div>
      </div>

      <div class="op-cc-footer">
        <div class="op-cc-ghost" id="op-cc-meta"></div>
        <div class="op-cc-actions">
          <button class="op-button" id="op-cc-recalc" title="Recalculate color mapping">Calculate</button>
          <button class="op-button" id="op-cc-apply" title="Apply changes to overlay">Apply</button>
          <button class="op-button" id="op-cc-cancel" title="Close without saving">Cancel</button>
        </div>
      </div>
    `,document.body.appendChild(o),o.querySelector("#op-cc-close").addEventListener("click",Le),t.addEventListener("click",Le),o.querySelector("#op-cc-cancel").addEventListener("click",Le),l={backdrop:t,modal:o,previewCanvas:o.querySelector("#op-cc-preview"),previewCtx:o.querySelector("#op-cc-preview").getContext("2d",{willReadFrequently:!0}),sourceCanvas:null,sourceCtx:null,sourceImageData:null,processedCanvas:null,processedCtx:null,freeGrid:o.querySelector("#op-cc-free-grid"),paidGrid:o.querySelector("#op-cc-paid-grid"),freeToggle:o.querySelector("#op-cc-free-toggle"),paidToggle:o.querySelector("#op-cc-paid-toggle"),meta:o.querySelector("#op-cc-meta"),applyBtn:o.querySelector("#op-cc-apply"),recalcBtn:o.querySelector("#op-cc-recalc"),realtimeBtn:o.querySelector("#op-cc-realtime"),zoom:1,selectedFree:new Set(u.ccFreeKeys),selectedPaid:new Set(u.ccPaidKeys),realtime:!!u.ccRealtime,overlay:null,lastColorCounts:{},isStale:!1},l.realtimeBtn.addEventListener("click",async()=>{l.realtime=!l.realtime,l.realtimeBtn.textContent=`Realtime: ${l.realtime?"ON":"OFF"}`,l.realtimeBtn.classList.toggle("op-danger",l.realtime),u.ccRealtime=l.realtime,await L(["ccRealtime"]),l.realtime&&l.isStale&&r()});const i=async()=>{l.zoom=Math.min(8,(l.zoom||1)*1.25),u.ccZoom=l.zoom,await L(["ccZoom"]),Q(),ee()},a=async()=>{l.zoom=Math.max(.1,(l.zoom||1)/1.25),u.ccZoom=l.zoom,await L(["ccZoom"]),Q(),ee()};o.querySelector("#op-cc-zoom-in").addEventListener("click",i),o.querySelector("#op-cc-zoom-out").addEventListener("click",a),l.recalcBtn.addEventListener("click",()=>{r()}),l.applyBtn.addEventListener("click",async()=>{const d=l.overlay;if(!d)return;if(Ge().length===0){D("Select at least one color.");return}if(l.isStale&&r(),!l.processedCanvas){D("Nothing to apply.");return}if(l.processedCanvas.width>=1e3||l.processedCanvas.height>=1e3){D("Image too large to apply (must be < 1000\xD71000).");return}const c=l.processedCanvas.toDataURL("image/png");d.imageBase64=c,d.imageUrl=null,d.isLocal=!0,await L(["overlays"]),F(),H(),X();const v=Object.keys(l.lastColorCounts).length;D(`Overlay updated (${l.processedCanvas.width}\xD7${l.processedCanvas.height}, ${v} colors).`),Le()}),Dt(),l.freeToggle.addEventListener("click",async()=>{const d=je();Qe("free",!d),u.ccFreeKeys=Array.from(l.selectedFree),await L(["ccFreeKeys"]),l.realtime?r():n(),Q(),ee(),fe()}),l.paidToggle.addEventListener("click",async()=>{const d=Je();Qe("paid",!d),u.ccPaidKeys=Array.from(l.selectedPaid),await L(["ccPaidKeys"]),l.realtime?r():n(),Q(),ee(),fe()});function n(){l.isStale=!0,l.meta.textContent=l.meta.textContent.replace(/ \| Status: .+$/,"")+" | Status: pending recalculation"}function r(){Ie(),l.isStale=!1,Q(),ee(),Ze()}}function At(t){if(!l)return;l.overlay=t,document.body.classList.add("op-scroll-lock"),l.zoom=Number(u.ccZoom)||1,l.realtime=!!u.ccRealtime,l.realtimeBtn.textContent=`Realtime: ${l.realtime?"ON":"OFF"}`,l.realtimeBtn.classList.toggle("op-danger",l.realtime);const o=new Image;o.onload=()=>{l.sourceCanvas||(l.sourceCanvas=document.createElement("canvas"),l.sourceCtx=l.sourceCanvas.getContext("2d",{willReadFrequently:!0})),l.sourceCanvas.width=o.width,l.sourceCanvas.height=o.height,l.sourceCtx.clearRect(0,0,o.width,o.height),l.sourceCtx.drawImage(o,0,0),l.sourceImageData=l.sourceCtx.getImageData(0,0,o.width,o.height),l.processedCanvas||(l.processedCanvas=document.createElement("canvas"),l.processedCtx=l.processedCanvas.getContext("2d")),Ie(),l.isStale=!1,Q(),ee(),Ze(),l.backdrop.classList.add("show"),l.modal.style.display="flex"},o.src=t.imageBase64}function Le(){l&&(l.backdrop.classList.remove("show"),l.modal.style.display="none",l.overlay=null,document.body.classList.remove("op-scroll-lock"))}function $t(t,o,i,a){let n=null,r=1/0;for(let d=0;d<a.length;d++){const[s,c,v]=a[d],g=(s+t)/2,f=s-t,x=c-o,m=v-i,M=(512+g)*f*f>>8,y=4*x*x,b=(767-g)*m*m>>8,k=M+y+b;k<r&&(r=k,n=[s,c,v])}return n||[0,0,0]}function Ge(){const t=[];return l.selectedFree.forEach(o=>{const[i,a,n]=o.split(",").map(r=>parseInt(r,10));Number.isFinite(i)&&t.push([i,a,n])}),l.selectedPaid.forEach(o=>{const[i,a,n]=o.split(",").map(r=>parseInt(r,10));Number.isFinite(i)&&t.push([i,a,n])}),t}function Ie(){if(!l.sourceImageData)return;const t=l.sourceImageData.width,o=l.sourceImageData.height,i=l.sourceImageData.data,a=new Uint8ClampedArray(i.length),n=Ge(),r={};for(let s=0;s<i.length;s+=4){const c=i[s],v=i[s+1],g=i[s+2];if(i[s+3]===0){a[s]=0,a[s+1]=0,a[s+2]=0,a[s+3]=0;continue}const[x,m,M]=n.length?$t(c,v,g,n):[c,v,g];a[s]=x,a[s+1]=m,a[s+2]=M,a[s+3]=255;const y=`${x},${m},${M}`;r[y]=(r[y]||0)+1}l.processedCanvas||(l.processedCanvas=document.createElement("canvas"),l.processedCtx=l.processedCanvas.getContext("2d")),l.processedCanvas.width=t,l.processedCanvas.height=o;const d=new ImageData(a,t,o);l.processedCtx.putImageData(d,0,0),l.lastColorCounts=r}function Q(){const t=Number(l.zoom)||1,o=l.processedCanvas;if(!o)return;const i=Math.max(1,Math.round(o.width*t)),a=Math.max(1,Math.round(o.height*t));l.previewCanvas.width=i,l.previewCanvas.height=a;const n=l.previewCtx;n.clearRect(0,0,i,a),n.imageSmoothingEnabled=!1,n.drawImage(o,0,0,o.width,o.height,0,0,i,a),n.imageSmoothingEnabled=!0}function ee(){if(!l.sourceImageData){l.meta.textContent="";return}const t=l.sourceImageData.width,o=l.sourceImageData.height,i=Object.keys(l.lastColorCounts||{}).length,a=l.isStale?"pending recalculation":"up to date";l.meta.textContent=`Size: ${t}\xD7${o} | Zoom: ${l.zoom.toFixed(2)}\xD7 | Colors: ${i} | Status: ${a}`}function Ze(){if(!l||!l.lastColorCounts)return;const t=document.getElementById("op-cc-color-list");if(!t)return;const o=l.lastColorCounts,i=Object.entries(o).sort(([,n],[,r])=>r-n),a=new Set(ae.map(([n,r,d])=>`${n},${r},${d}`));if(t.innerHTML="",i.length===0){t.innerHTML='<div class="op-muted" style="text-align:center; padding: 12px 0;">No colors in image.</div>';return}for(const[n,r]of i){const d=a.has(n),s=de[n]||n,c=document.createElement("div");c.className="op-color-list-item"+(d?" premium":""),c.title=`${s} (${n}): ${r} pixels`,c.innerHTML=`
        <div class="op-color-list-swatch" style="background-color: rgb(${n});"></div>
        <div class="op-color-list-name">${s}</div>
        <div class="op-color-list-count">${r}</div>
      `,t.appendChild(c)}}function Dt(){l.freeGrid.innerHTML="",l.paidGrid.innerHTML="";for(const[t,o,i]of Se){const a=`${t},${o},${i}`,n=document.createElement("div");n.className="op-cc-cell",n.style.background=`rgb(${t},${o},${i})`,n.title=de[a]||a,n.dataset.key=a,n.dataset.type="free",l.selectedFree.has(a)&&n.classList.add("active"),n.addEventListener("click",async()=>{l.selectedFree.has(a)?l.selectedFree.delete(a):l.selectedFree.add(a),n.classList.toggle("active",l.selectedFree.has(a)),u.ccFreeKeys=Array.from(l.selectedFree),await L(["ccFreeKeys"]),l.realtime?Ie():l.isStale=!0,Q(),ee(),fe()}),l.freeGrid.appendChild(n)}for(const[t,o,i]of ae){const a=`${t},${o},${i}`,n=document.createElement("div");n.className="op-cc-cell",n.style.background=`rgb(${t},${o},${i})`,n.title=de[a]||a,n.dataset.key=a,n.dataset.type="paid",l.selectedPaid.has(a)&&n.classList.add("active"),n.addEventListener("click",async()=>{l.selectedPaid.has(a)?l.selectedPaid.delete(a):l.selectedPaid.add(a),n.classList.toggle("active",l.selectedPaid.has(a)),u.ccPaidKeys=Array.from(l.selectedPaid),await L(["ccPaidKeys"]),l.realtime?Ie():l.isStale=!0,Q(),ee(),fe()}),l.paidGrid.appendChild(n)}fe()}function fe(){l.freeToggle.textContent=je()?"Unselect All":"Select All",l.paidToggle.textContent=Je()?"Unselect All":"Select All"}function je(){return be.every(t=>l.selectedFree.has(t))}function Je(){const t=ae.map(([o,i,a])=>`${o},${i},${a}`);return t.every(o=>l.selectedPaid.has(o))&&t.length>0}function Qe(t,o){if(t==="free")o?be.forEach(a=>l.selectedFree.add(a)):l.selectedFree.clear(),l.freeGrid.querySelectorAll(".op-cc-cell").forEach(a=>a.classList.toggle("active",o));else{const i=ae.map(([a,n,r])=>`${a},${n},${r}`);o?i.forEach(a=>l.selectedPaid.add(a)):l.selectedPaid.clear(),l.paidGrid.querySelectorAll(".op-cc-cell").forEach(a=>a.classList.toggle("active",o))}}let e=null;function Rt(){const t=document.createElement("div");t.className="op-rs-backdrop",t.id="op-rs-backdrop",document.body.appendChild(t);const o=document.createElement("div");o.className="op-rs-modal",o.id="op-rs-modal",o.style.display="none",o.innerHTML=`
      <div class="op-rs-header" id="op-rs-header">
        <div class="op-rs-title">Resize Overlay</div>
        <button class="op-rs-close" id="op-rs-close" title="Close">\u2715</button>
      </div>

      <div class="op-rs-tabs">
        <button class="op-rs-tab-btn active" id="op-rs-tab-simple">Simple</button>
        <button class="op-rs-tab-btn" id="op-rs-tab-advanced">Advanced (grid)</button>
      </div>

      <div class="op-rs-body">
        <div class="op-rs-pane show" id="op-rs-pane-simple">
          <div class="op-rs-row">
            <label style="width:110px;">Original</label>
            <input type="text" class="op-input" id="op-rs-orig" disabled>
          </div>
          <div class="op-rs-row">
            <label style="width:110px;">Width</label>
            <input type="number" min="1" step="1" class="op-input" id="op-rs-w">
          </div>
          <div class="op-rs-row">
            <label style="width:110px;">Height</label>
            <input type="number" min="1" step="1" class="op-input" id="op-rs-h">
          </div>
          <div class="op-rs-row">
            <input type="checkbox" id="op-rs-lock" checked>
            <label for="op-rs-lock">Lock aspect ratio</label>
          </div>
          <div class="op-rs-row" style="gap:6px; flex-wrap:wrap;">
            <label style="width:110px;">Quick</label>
            <button class="op-button" id="op-rs-double">2x</button>
            <button class="op-button" id="op-rs-onex">1x</button>
            <button class="op-button" id="op-rs-half">0.5x</button>
            <button class="op-button" id="op-rs-third">0.33x</button>
            <button class="op-button" id="op-rs-quarter">0.25x</button>
          </div>
          <div class="op-rs-row">
            <label style="width:110px;">Scale factor</label>
            <input type="number" step="0.01" min="0.01" class="op-input" id="op-rs-scale" placeholder="e.g. 0.5">
            <button class="op-button" id="op-rs-apply-scale">Apply</button>
          </div>

          <div class="op-rs-preview-wrap" id="op-rs-sim-wrap">
            <div class="op-rs-dual">
              <div class="op-rs-col" id="op-rs-col-left">
                <div class="label">Original</div>
                <div class="pad-top"></div>
                <canvas id="op-rs-sim-orig" class="op-rs-canvas op-rs-thumb"></canvas>
              </div>
              <div class="op-rs-col" id="op-rs-col-right">
                <div class="label">Result (downscale \u2192 upscale preview)</div>
                <div class="pad-top"></div>
                <canvas id="op-rs-sim-new" class="op-rs-canvas op-rs-thumb"></canvas>
              </div>
            </div>
          </div>
        </div>

        <div class="op-rs-pane" id="op-rs-pane-advanced">
          <div class="op-rs-preview-wrap op-pan-grab" id="op-rs-adv-wrap">
            <canvas id="op-rs-preview" class="op-rs-canvas"></canvas>
            <div class="op-rs-zoom">
              <button class="op-icon-btn" id="op-rs-zoom-out" title="Zoom out">\u2212</button>
              <button class="op-icon-btn" id="op-rs-zoom-in" title="Zoom in">+</button>
            </div>
          </div>

          <div class="op-rs-row" style="margin-top:8px;">
            <label style="width:160px;">Multiplier</label>
            <input type="range" id="op-rs-mult-range" min="1" max="64" step="0.1" style="flex:1;">
            <input type="number" id="op-rs-mult-input" class="op-input op-rs-mini" min="1" step="0.05">
          </div>

          <div class="op-rs-row">
            <input type="checkbox" id="op-rs-bind" checked>
            <label for="op-rs-bind">Bind X/Y block sizes</label>
          </div>

          <div class="op-rs-row">
            <label style="width:160px;">Block W / H</label>
            <input type="number" id="op-rs-blockw" class="op-input op-rs-mini" min="1" step="0.1">
            <input type="number" id="op-rs-blockh" class="op-input op-rs-mini" min="1" step="0.1">
          </div>

          <div class="op-rs-row">
            <label style="width:160px;">Offset X / Y</label>
            <input type="number" id="op-rs-offx" class="op-input op-rs-mini" min="0" step="0.1">
            <input type="number" id="op-rs-offy" class="op-input op-rs-mini" min="0" step="0.1">
          </div>

          <div class="op-rs-row">
            <label style="width:160px;">Dot radius</label>
            <input type="range" id="op-rs-dotr" min="1" max="8" step="1" style="flex:1;">
            <span id="op-rs-dotr-val" class="op-muted" style="width:36px; text-align:right;"></span>
          </div>

          <div class="op-rs-row">
            <input type="checkbox" id="op-rs-grid" checked>
            <label for="op-rs-grid">Show grid wireframe</label>
          </div>

          <div class="op-rs-grid-note" id="op-rs-adv-note">Align red dots to block centers. Drag to pan; use buttons or Ctrl+wheel to zoom.</div>

          <div class="op-rs-row" style="margin-top:8px;">
            <label style="width:160px;">Calculated preview</label>
            <span class="op-muted" id="op-rs-adv-resmeta"></span>
          </div>
          <div class="op-rs-preview-wrap" id="op-rs-adv-result-wrap" style="height: clamp(200px, 26vh, 420px);">
            <canvas id="op-rs-adv-result" class="op-rs-canvas"></canvas>
          </div>
        </div>
      </div>

      <div class="op-rs-footer">
        <div class="op-cc-ghost" id="op-rs-meta">Nearest-neighbor OR grid center sampling; alpha hardened (no semi-transparent pixels).</div>
        <div class="op-cc-actions">
          <button class="op-button" id="op-rs-calc">Calculate</button>
          <button class="op-button" id="op-rs-apply">Apply</button>
          <button class="op-button" id="op-rs-cancel">Cancel</button>
        </div>
      </div>
    `,document.body.appendChild(o);const i={backdrop:t,modal:o,tabSimple:o.querySelector("#op-rs-tab-simple"),tabAdvanced:o.querySelector("#op-rs-tab-advanced"),paneSimple:o.querySelector("#op-rs-pane-simple"),paneAdvanced:o.querySelector("#op-rs-pane-advanced"),orig:o.querySelector("#op-rs-orig"),w:o.querySelector("#op-rs-w"),h:o.querySelector("#op-rs-h"),lock:o.querySelector("#op-rs-lock"),note:o.querySelector("#op-rs-note"),onex:o.querySelector("#op-rs-onex"),half:o.querySelector("#op-rs-half"),third:o.querySelector("#op-rs-third"),quarter:o.querySelector("#op-rs-quarter"),double:o.querySelector("#op-rs-double"),scale:o.querySelector("#op-rs-scale"),applyScale:o.querySelector("#op-rs-apply-scale"),simWrap:o.querySelector("#op-rs-sim-wrap"),simOrig:o.querySelector("#op-rs-sim-orig"),simNew:o.querySelector("#op-rs-sim-new"),colLeft:o.querySelector("#op-rs-col-left"),colRight:o.querySelector("#op-rs-col-right"),advWrap:o.querySelector("#op-rs-adv-wrap"),preview:o.querySelector("#op-rs-preview"),meta:o.querySelector("#op-rs-meta"),zoomIn:o.querySelector("#op-rs-zoom-in"),zoomOut:o.querySelector("#op-rs-zoom-out"),multRange:o.querySelector("#op-rs-mult-range"),multInput:o.querySelector("#op-rs-mult-input"),bind:o.querySelector("#op-rs-bind"),blockW:o.querySelector("#op-rs-blockw"),blockH:o.querySelector("#op-rs-blockh"),offX:o.querySelector("#op-rs-offx"),offY:o.querySelector("#op-rs-offy"),dotR:o.querySelector("#op-rs-dotr"),dotRVal:o.querySelector("#op-rs-dotr-val"),gridToggle:o.querySelector("#op-rs-grid"),advNote:o.querySelector("#op-rs-adv-note"),resWrap:o.querySelector("#op-rs-adv-result-wrap"),resCanvas:o.querySelector("#op-rs-adv-result"),resMeta:o.querySelector("#op-rs-adv-resmeta"),calcBtn:o.querySelector("#op-rs-calc"),applyBtn:o.querySelector("#op-rs-apply"),cancelBtn:o.querySelector("#op-rs-cancel"),closeBtn:o.querySelector("#op-rs-close")},a=i.preview.getContext("2d",{willReadFrequently:!0}),n=i.simOrig.getContext("2d",{willReadFrequently:!0}),r=i.simNew.getContext("2d",{willReadFrequently:!0}),d=i.resCanvas.getContext("2d",{willReadFrequently:!0});e={...i,ov:null,img:null,origW:0,origH:0,mode:"simple",zoom:1,updating:!1,mult:4,gapX:4,gapY:4,offx:0,offy:0,dotr:1,viewX:0,viewY:0,panning:!1,panStart:null,calcCanvas:null,calcCols:0,calcRows:0,calcReady:!1};const s=()=>{const p=parseInt(e.w.value||"0",10),h=parseInt(e.h.value||"0",10),w=Number.isFinite(p)&&Number.isFinite(h)&&p>0&&h>0,S=p>=1e3||h>=1e3;return w?S?`Target: ${p}\xD7${h} (exceeds limit: must be < 1000\xD71000)`:`Target: ${p}\xD7${h} (OK)`:"Enter positive width and height."},c=()=>{const p=Math.floor((e.origW-e.offx)/e.gapX),h=Math.floor((e.origH-e.offy)/e.gapY);return{cols:Math.max(0,p),rows:Math.max(0,h)}},v=()=>{const{cols:p,rows:h}=c(),w=p>=1e3||h>=1e3;return p>0&&h>0?`Samples: ${p} \xD7 ${h} | Output: ${p}\xD7${h}${w?" (exceeds limit: < 1000\xD71000)":""}`:"Adjust multiplier/offset until dots sit at centers."},g=()=>{e.meta.textContent=e.mode==="advanced"?v():s()},f=()=>{const p=parseInt(e.w.value||"0",10),h=parseInt(e.h.value||"0",10),w=Number.isFinite(p)&&Number.isFinite(h)&&p>0&&h>0,S=p>=1e3||h>=1e3,R=w?S?`Target: ${p}\xD7${h} (exceeds limit: must be < 1000\xD71000)`:`Target: ${p}\xD7${h} (OK)`:"Enter positive width and height.";e.note&&(e.note.textContent=R),e.mode==="simple"&&(e.applyBtn.disabled=!w||S),e.mode==="simple"&&(e.meta.textContent=R)};function x(p){const h=Math.max(1,Math.round(e.origW*p)),w=Math.max(1,Math.round(e.origH*p));e.updating=!0,e.w.value=h,e.h.value=e.lock.checked?Math.max(1,Math.round(h*e.origH/e.origW)):w,e.updating=!1,f()}function m(){if(!e.img)return;const p=e.colLeft.querySelector(".pad-top").offsetHeight,h=e.colRight.querySelector(".pad-top").offsetHeight,w=e.colLeft.clientWidth,S=e.colRight.clientWidth,R=e.colLeft.clientHeight-p,Y=e.colRight.clientHeight-h;e.simOrig.width=w,e.simOrig.height=R,e.simNew.width=S,e.simNew.height=Y,n.save(),n.imageSmoothingEnabled=!1,n.clearRect(0,0,w,R);const U=Math.min(w/e.origW,R/e.origH),B=Math.max(1,Math.floor(e.origW*U)),_=Math.max(1,Math.floor(e.origH*U)),j=Math.floor((w-B)/2),te=Math.floor((R-_)/2);n.drawImage(e.img,0,0,e.origW,e.origH,j,te,B,_),n.restore();const N=parseInt(e.w.value||"0",10),q=parseInt(e.h.value||"0",10);if(r.save(),r.imageSmoothingEnabled=!1,r.clearRect(0,0,S,Y),Number.isFinite(N)&&Number.isFinite(q)&&N>0&&q>0){const ie=T(N,q),z=ie.getContext("2d",{willReadFrequently:!0});z.imageSmoothingEnabled=!1,z.clearRect(0,0,N,q),z.drawImage(e.img,0,0,e.origW,e.origH,0,0,N,q);const oe=z.getImageData(0,0,N,q),K=oe.data;for(let ce=0;ce<K.length;ce+=4)K[ce+3]!==0&&(K[ce+3]=255);z.putImageData(oe,0,0);const Xe=Math.min(S/N,Y/q),le=Math.max(1,Math.floor(N*Xe)),Ee=Math.max(1,Math.floor(q*Xe)),ye=Math.floor((S-le)/2),Pe=Math.floor((Y-Ee)/2);r.drawImage(ie,0,0,N,q,ye,Pe,le,Ee)}else r.drawImage(e.img,0,0,e.origW,e.origH,j,te,B,_);r.restore()}const M=()=>{e.updating=!0,e.multRange.value=String(e.mult),e.multInput.value=String(e.mult),e.blockW.value=String(e.gapX),e.blockH.value=String(e.gapY),e.offX.value=String(e.offx),e.offY.value=String(e.offy),e.dotR.value=String(e.dotr),e.dotRVal.textContent=String(e.dotr),e.updating=!1};function y(){const{cols:p,rows:h}=c(),w=p>=1e3||h>=1e3;if(e.mode==="advanced")e.applyBtn.disabled=!e.calcReady;else{const S=parseInt(e.w.value||"0",10),R=parseInt(e.h.value||"0",10),Y=Number.isFinite(S)&&Number.isFinite(R)&&S>0&&R>0&&S<1e3&&R<1e3;e.applyBtn.disabled=!Y}g()}function b(){if(e.mode!=="advanced"||!e.img)return;const p=e.origW,h=e.origH,w=Math.max(50,Math.floor(e.advWrap.clientWidth)),S=Math.max(50,Math.floor(e.advWrap.clientHeight));e.preview.width=w,e.preview.height=S;const R=Math.max(1,Math.floor(w/e.zoom)),Y=Math.max(1,Math.floor(S/e.zoom)),U=Math.max(0,p-R),B=Math.max(0,h-Y);if(e.viewX=Math.min(Math.max(0,e.viewX),U),e.viewY=Math.min(Math.max(0,e.viewY),B),a.save(),a.imageSmoothingEnabled=!1,a.clearRect(0,0,w,S),a.drawImage(e.img,e.viewX,e.viewY,R,Y,0,0,w,S),e.gridToggle.checked&&e.gapX>=1&&e.gapY>=1){a.strokeStyle="rgba(255,59,48,0.45)",a.lineWidth=1;const _=Math.ceil((e.viewX-e.offx)/e.gapX),j=Math.floor((e.viewX+R-e.offx)/e.gapX),te=Math.ceil((e.viewY-e.offy)/e.gapY),N=Math.floor((e.viewY+Y-e.offy)/e.gapY),q=Math.max(0,j-_+1),ie=Math.max(0,N-te+1);if(q<=4e3&&ie<=4e3){a.beginPath();for(let z=_;z<=j;z++){const oe=e.offx+z*e.gapX,K=Math.round((oe-e.viewX)*e.zoom);a.moveTo(K+.5,0),a.lineTo(K+.5,S)}for(let z=te;z<=N;z++){const oe=e.offy+z*e.gapY,K=Math.round((oe-e.viewY)*e.zoom);a.moveTo(0,K+.5),a.lineTo(w,K+.5)}a.stroke()}}if(e.gapX>=1&&e.gapY>=1){a.fillStyle="#ff3b30";const _=e.offx+Math.floor(e.gapX/2),j=e.offy+Math.floor(e.gapY/2);if(_>=0&&j>=0){const te=Math.ceil((e.viewX-_)/e.gapX),N=Math.ceil((e.viewY-j)/e.gapY),q=Math.floor((e.viewY+Y-1-j)/e.gapY),ie=Math.floor((e.viewX+R-1-_)/e.gapX),z=e.dotr,oe=Math.max(0,ie-te+1),K=Math.max(0,q-N+1);if(oe*K<=3e5)for(let le=N;le<=q;le++){const Ee=j+le*e.gapY;for(let ye=te;ye<=ie;ye++){const Pe=_+ye*e.gapX,ce=Math.round((Pe-e.viewX)*e.zoom),Pt=Math.round((Ee-e.viewY)*e.zoom);a.beginPath(),a.arc(ce,Pt,z,0,Math.PI*2),a.fill()}}}}a.restore()}function k(){const p=e.calcCanvas,h=e.resWrap;if(!h||!p){d.clearRect(0,0,e.resCanvas.width,e.resCanvas.height),e.resMeta.textContent="No result. Click Calculate.";return}const w=p.width,S=p.height,R=Math.max(50,Math.floor(h.clientWidth-16)),Y=Math.max(50,Math.floor(h.clientHeight-16)),U=Math.min(R/w,Y/S),B=Math.max(1,Math.floor(w*U)),_=Math.max(1,Math.floor(S*U));e.resCanvas.width=B,e.resCanvas.height=_,d.save(),d.imageSmoothingEnabled=!1,d.clearRect(0,0,B,_),d.drawImage(p,0,0,w,S,0,0,B,_),d.restore(),e.resMeta.textContent=`Output: ${w}\xD7${S}${w>=1e3||S>=1e3?" (exceeds limit: < 1000\xD71000)":""}`}e._drawSimplePreview=m,e._drawAdvancedPreview=b,e._drawAdvancedResultPreview=k;const I=p=>{e.mode=p,e.tabSimple.classList.toggle("active",p==="simple"),e.tabAdvanced.classList.toggle("active",p==="advanced"),e.paneSimple.classList.toggle("show",p==="simple"),e.paneAdvanced.classList.toggle("show",p==="advanced"),g(),e.calcBtn.style.display=p==="advanced"?"inline-block":"none",p==="advanced"?e.applyBtn.disabled=!e.calcReady:f(),y(),p==="advanced"?(b(),k()):m()};e.tabSimple.addEventListener("click",()=>I("simple")),e.tabAdvanced.addEventListener("click",()=>I("advanced"));const C=()=>{if(e.updating)return;e.updating=!0;const p=parseInt(e.w.value||"0",10);e.lock.checked&&e.origW>0&&e.origH>0&&p>0&&(e.h.value=Math.max(1,Math.round(p*e.origH/e.origW))),e.updating=!1,f(),e.mode==="simple"&&m()},$=()=>{if(e.updating)return;e.updating=!0;const p=parseInt(e.h.value||"0",10);e.lock.checked&&e.origW>0&&e.origH>0&&p>0&&(e.w.value=Math.max(1,Math.round(p*e.origW/e.origH))),e.updating=!1,f(),e.mode==="simple"&&m()};e.w.addEventListener("input",C),e.h.addEventListener("input",$),e.onex.addEventListener("click",()=>{x(1),m()}),e.half.addEventListener("click",()=>{x(.5),m()}),e.third.addEventListener("click",()=>{x(1/3),m()}),e.quarter.addEventListener("click",()=>{x(1/4),m()}),e.double.addEventListener("click",()=>{x(2),m()}),e.applyScale.addEventListener("click",()=>{const p=parseFloat(e.scale.value||"");if(!Number.isFinite(p)||p<=0){D("Enter a valid scale factor > 0");return}x(p),m()});const E=()=>{e.mode==="advanced"&&(e.calcReady=!1,e.applyBtn.disabled=!0,k(),g())},A=p=>{if(e.updating)return;const h=parseFloat(p);if(!Number.isFinite(h))return;const w=Math.min(Math.max(h,1),128);e.mult=w,e.bind.checked&&(e.gapX=w,e.gapY=w),M(),y(),b(),E()};e.multRange.addEventListener("input",p=>{e.updating||A(p.target.value)}),e.multInput.addEventListener("input",p=>{if(e.updating)return;const h=p.target.value;Number.isFinite(parseFloat(h))&&A(h)}),e.bind.addEventListener("change",()=>{e.bind.checked&&(e.gapX=e.mult,e.gapY=e.mult,M()),y(),b(),E()}),e.blockW.addEventListener("input",p=>{if(e.updating)return;const h=p.target.value,w=parseFloat(h);Number.isFinite(w)&&(e.gapX=Math.min(Math.max(w,1),4096),e.bind.checked&&(e.mult=e.gapX,e.gapY=e.gapX),M(),y(),b(),E())}),e.blockH.addEventListener("input",p=>{if(e.updating)return;const h=p.target.value,w=parseFloat(h);Number.isFinite(w)&&(e.gapY=Math.min(Math.max(w,1),4096),e.bind.checked&&(e.mult=e.gapY,e.gapX=e.gapY),M(),y(),b(),E())}),e.offX.addEventListener("input",p=>{const h=p.target.value,w=parseFloat(h);Number.isFinite(w)&&(e.offx=Math.min(Math.max(w,0),Math.max(0,e.origH-1e-4)),e.viewX=Math.min(e.viewX,Math.max(0,e.origW-1)),y(),b(),E())}),e.offY.addEventListener("input",p=>{const h=p.target.value,w=parseFloat(h);Number.isFinite(w)&&(e.offy=Math.min(Math.max(w,0),Math.max(0,e.origH-1e-4)),e.viewY=Math.min(e.viewY,Math.max(0,e.origH-1)),y(),b(),E())}),e.dotR.addEventListener("input",p=>{e.dotr=Math.max(1,Math.round(Number(p.target.value)||1)),e.dotRVal.textContent=String(e.dotr),b()}),e.gridToggle.addEventListener("change",b);const O=p=>{const h=Math.max(50,Math.floor(e.advWrap.clientWidth)),w=Math.max(50,Math.floor(e.advWrap.clientHeight)),S=Math.max(1,Math.floor(h/e.zoom)),R=Math.max(1,Math.floor(w/e.zoom)),Y=e.viewX+S/2,U=e.viewY+R/2;e.zoom=Math.min(32,Math.max(.1,e.zoom*p));const B=Math.max(1,Math.floor(h/e.zoom)),_=Math.max(1,Math.floor(w/e.zoom));e.viewX=Math.min(Math.max(0,Math.round(Y-B/2)),Math.max(0,e.origW-B)),e.viewY=Math.min(Math.max(0,Math.round(U-_/2)),Math.max(0,e.origH-_)),b()};e.zoomIn.addEventListener("click",()=>O(1.25)),e.zoomOut.addEventListener("click",()=>O(1/1.25)),e.advWrap.addEventListener("wheel",p=>{if(!p.ctrlKey)return;p.preventDefault();const h=p.deltaY||0;O(h>0?1/1.15:1.15)},{passive:!1});const V=p=>{p.target.closest(".op-rs-zoom")||(e.panning=!0,e.panStart={x:p.clientX,y:p.clientY,viewX:e.viewX,viewY:e.viewY},e.advWrap.classList.remove("op-pan-grab"),e.advWrap.classList.add("op-pan-grabbing"),e.advWrap.setPointerCapture?.(p.pointerId))},G=p=>{if(!e.panning)return;const h=p.clientX-e.panStart.x,w=p.clientY-e.panStart.y,S=e.advWrap.clientWidth,R=e.advWrap.clientHeight,Y=Math.max(1,Math.floor(S/e.zoom)),U=Math.max(1,Math.floor(R/e.zoom));let B=e.panStart.viewX-Math.round(h/e.zoom),_=e.panStart.viewY-Math.round(w/e.zoom);B=Math.min(Math.max(0,B),Math.max(0,e.origW-Y)),_=Math.min(Math.max(0,_),Math.max(0,e.origH-U)),e.viewX=B,e.viewY=_,b()},W=p=>{e.panning&&(e.panning=!1,e.panStart=null,e.advWrap.classList.remove("op-pan-grabbing"),e.advWrap.classList.add("op-pan-grab"),e.advWrap.releasePointerCapture?.(p.pointerId))};e.advWrap.addEventListener("pointerdown",V),e.advWrap.addEventListener("pointermove",G),e.advWrap.addEventListener("pointerup",W),e.advWrap.addEventListener("pointercancel",W),e.advWrap.addEventListener("pointerleave",W);const Z=()=>Ye();e.cancelBtn.addEventListener("click",Z),e.closeBtn.addEventListener("click",Z),t.addEventListener("click",Z),e.calcBtn.addEventListener("click",async()=>{if(e.mode==="advanced")try{const{cols:p,rows:h}=c();if(p<=0||h<=0){D("No samples. Adjust multiplier/offset.");return}if(p>=1e3||h>=1e3){D("Output too large. Must be < 1000\xD71000.");return}const w=await Yt(e.img,e.origW,e.origH,e.offx,e.offy,e.gapX,e.gapY);e.calcCanvas=w,e.calcCols=p,e.calcRows=h,e.calcReady=!0,e.applyBtn.disabled=!1,k(),g(),D(`Calculated ${p}\xD7${h}. Review preview, then Apply.`)}catch(p){console.error(p),D("Calculation failed.")}}),e.applyBtn.addEventListener("click",async()=>{if(e.ov)try{if(e.mode==="simple"){const p=parseInt(e.w.value||"0",10),h=parseInt(e.h.value||"0",10);if(!Number.isFinite(p)||!Number.isFinite(h)||p<=0||h<=0){D("Invalid dimensions");return}if(p>=1e3||h>=1e3){D("Too large. Must be < 1000\xD71000.");return}await _t(e.ov,p,h),Ye(),D(`Resized to ${p}\xD7${h}.`)}else{if(!e.calcReady||!e.calcCanvas){D("Calculate first.");return}const p=await Ue(e.calcCanvas);e.ov.imageBase64=p,e.ov.imageUrl=null,e.ov.isLocal=!0,await L(["overlays"]),F(),H(),X(),Ye(),D(`Applied ${e.calcCols}\xD7${e.calcRows}.`)}}catch(p){console.error(p),D("Apply failed.")}}),e._syncAdvancedMeta=y,e._syncSimpleNote=f,e._setMode=p=>{const h=new Event("click");(p==="simple"?e.tabSimple:e.tabAdvanced).dispatchEvent(h)}}function Ot(t){if(!e)return;e.ov=t;const o=new Image;o.onload=()=>{e.img=o,e.origW=o.width,e.origH=o.height,e.orig.value=`${e.origW}\xD7${e.origH}`,e.w.value=String(e.origW),e.h.value=String(e.origH),e.lock.checked=!0,e.zoom=1,e.mult=4,e.gapX=4,e.gapY=4,e.offx=0,e.offy=0,e.dotr=1,e.viewX=0,e.viewY=0,e.bind.checked=!0,e.multRange.value="4",e.multInput.value="4",e.blockW.value="4",e.blockH.value="4",e.offX.value="0",e.offY.value="0",e.dotR.value="1",e.dotRVal.textContent="1",e.gridToggle.checked=!0,e.calcCanvas=null,e.calcCols=0,e.calcRows=0,e.calcReady=!1,e.applyBtn.disabled=e.mode==="advanced",e._setMode("simple"),document.body.classList.add("op-scroll-lock"),e.backdrop.classList.add("show"),e.modal.style.display="flex",e._drawSimplePreview?.(),e._drawAdvancedPreview?.(),e._drawAdvancedResultPreview?.(),e._syncAdvancedMeta?.(),e._syncSimpleNote?.(),(()=>{if(e.mode==="advanced"){const{cols:n,rows:r}=(function(){const d=Math.floor((e.origW-e.offx)/e.gapX),s=Math.floor((e.origH-e.offy)/e.gapY);return{cols:Math.max(0,d),rows:Math.max(0,s)}})();e.meta.textContent=n>0&&r>0?`Samples: ${n} \xD7 ${r} | Output: ${n}\xD7${r}${n>=1e3||r>=1e3?" (exceeds limit: < 1000\xD71000)":""}`:"Adjust multiplier/offset until dots sit at centers."}else{const n=parseInt(e.w.value||"0",10),r=parseInt(e.h.value||"0",10),d=Number.isFinite(n)&&Number.isFinite(r)&&n>0&&r>0,s=n>=1e3||r>=1e3;e.meta.textContent=d?s?`Target: ${n}\xD7${r} (exceeds limit: must be < 1000\xD71000)`:`Target: ${n}\xD7${r} (OK)`:"Enter positive width and height."}})();const a=()=>{e.mode==="simple"?e._drawSimplePreview?.():(e._drawAdvancedPreview?.(),e._drawAdvancedResultPreview?.())};e._resizeHandler=a,window.addEventListener("resize",a)},o.src=t.imageBase64}function Ye(){e&&(window.removeEventListener("resize",e._resizeHandler||(()=>{})),e.backdrop.classList.remove("show"),e.modal.style.display="none",e.ov=null,e.img=null,document.body.classList.remove("op-scroll-lock"))}async function _t(t,o,i){const a=await se(t.imageBase64),n=$e(o,i),r=n.getContext("2d",{willReadFrequently:!0});r.imageSmoothingEnabled=!1,r.clearRect(0,0,o,i),r.drawImage(a,0,0,a.width,a.height,0,0,o,i);const d=r.getImageData(0,0,o,i),s=d.data;for(let v=3;v<s.length;v+=4)s[v]>0&&(s[v]=255);r.putImageData(d,0,0);const c=n.toDataURL("image/png");t.imageBase64=c,t.imageUrl=null,t.isLocal=!0,await L(["overlays"]),F(),H(),X()}async function Yt(t,o,i,a,n,r,d){const c=T(o,i).getContext("2d",{willReadFrequently:!0});c.imageSmoothingEnabled=!1,c.drawImage(t,0,0);const v=c.getImageData(0,0,o,i).data,g=Math.floor((o-a)/r),f=Math.floor((i-n)/d);if(g<=0||f<=0)throw new Error("No samples available with current offset/gap");const x=$e(g,f),m=x.getContext("2d"),M=m.createImageData(g,f),y=M.data,b=a+r/2,k=n+d/2,I=(C,$,E)=>Math.min(Math.max(C,$),E);for(let C=0;C<f;C++)for(let $=0;$<g;$++){const E=Math.round(I(b+$*r,0,o-1)),O=(Math.round(I(k+C*d,0,i-1))*o+E)*4,V=v[O],G=v[O+1],W=v[O+2],Z=v[O+3],p=(C*g+$)*4;Z===0?(y[p]=0,y[p+1]=0,y[p+2]=0,y[p+3]=0):(y[p]=V,y[p+1]=G,y[p+2]=W,y[p+3]=255)}return m.putImageData(M,0,0),x}function Xt(){ft().then(()=>{H();const t=()=>{yt(),bt(),Oe()};document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t(),console.log("Hail's OP: Initialized with Minify (fixed 3\xD7) mode.")})}Xt()})();
