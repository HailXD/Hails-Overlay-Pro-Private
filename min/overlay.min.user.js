/* @preserve
// ==UserScript==
// @name         Hail's OP
// @namespace    http://tampermonkey.net/
// @version      2.8.29
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
// @updateURL    https://github.com/HailXD/Hails-Overlay-Pro/raw/refs/heads/main/min/overlay.min.user.js
// @downloadURL  https://github.com/HailXD/Hails-Overlay-Pro/raw/refs/heads/main/min/overlay.min.user.js
// ==/UserScript==
@endpreserve */

(function(){"use strict";const Se=window.fetch,at=(t,o)=>{try{if(typeof GM<"u"&&typeof GM.getValue=="function")return GM.getValue(t,o);if(typeof GM_getValue=="function")return Promise.resolve(GM_getValue(t,o))}catch{}return Promise.resolve(o)},nt=(t,o)=>{try{if(typeof GM<"u"&&typeof GM.setValue=="function")return GM.setValue(t,o);if(typeof GM_setValue=="function")return Promise.resolve(GM_setValue(t,o))}catch{}return Promise.resolve()};function rt(t){return new Promise((o,r)=>{try{GM_xmlhttpRequest({method:"GET",url:t,responseType:"blob",onload:a=>{a.status>=200&&a.status<300&&a.response?o(a.response):r(new Error(`GM_xhr failed: ${a.status} ${a.statusText}`))},onerror:()=>r(new Error("GM_xhr network error")),ontimeout:()=>r(new Error("GM_xhr timeout"))})}catch(a){r(a)}})}function Te(t){return new Promise((o,r)=>{const a=new FileReader;a.onload=()=>o(a.result),a.onerror=r,a.readAsDataURL(t)})}async function Ne(t){const o=await rt(t);if(!o||!String(o.type).startsWith("image/"))throw new Error("URL did not return an image blob");return await Te(o)}function it(t){return new Promise((o,r)=>{const a=new FileReader;a.onload=()=>o(a.result),a.onerror=r,a.readAsDataURL(t)})}const $e=[[0,0,0],[60,60,60],[120,120,120],[210,210,210],[255,255,255],[96,0,24],[237,28,36],[255,127,39],[246,170,9],[249,221,59],[255,250,188],[14,185,104],[19,230,123],[135,255,94],[12,129,110],[16,174,166],[19,225,190],[96,247,242],[40,80,158],[64,147,228],[107,80,246],[153,177,251],[120,12,153],[170,56,185],[224,159,249],[203,0,122],[236,31,128],[243,141,169],[104,70,52],[149,104,42],[248,178,119]],re=[[170,170,170],[165,14,30],[250,128,114],[228,92,26],[156,132,49],[197,173,49],[232,212,95],[74,107,58],[90,148,74],[132,197,115],[15,121,159],[187,250,242],[125,199,255],[77,49,184],[74,66,132],[122,113,196],[181,174,241],[155,82,73],[209,128,120],[250,182,164],[219,164,99],[123,99,82],[156,132,107],[214,181,148],[209,128,81],[255,197,165],[109,100,63],[148,140,107],[205,197,158],[51,57,65],[109,117,141],[179,185,209]],pe={"0,0,0":"Black","60,60,60":"Dark Gray","120,120,120":"Gray","210,210,210":"Light Gray","255,255,255":"White","96,0,24":"Deep Red","237,28,36":"Red","255,127,39":"Orange","246,170,9":"Gold","249,221,59":"Yellow","255,250,188":"Light Yellow","14,185,104":"Dark Green","19,230,123":"Green","135,255,94":"Light Green","12,129,110":"Dark Teal","16,174,166":"Teal","19,225,190":"Light Teal","96,247,242":"Cyan","40,80,158":"Dark Blue","64,147,228":"Blue","107,80,246":"Indigo","153,177,251":"Light Indigo","120,12,153":"Dark Purple","170,56,185":"Purple","224,159,249":"Light Purple","203,0,122":"Dark Pink","236,31,128":"Pink","243,141,169":"Light Pink","104,70,52":"Dark Brown","149,104,42":"Brown","248,178,119":"Beige","170,170,170":"Medium Gray","165,14,30":"Dark Red","250,128,114":"Light Red","228,92,26":"Dark Orange","156,132,49":"Dark Goldenrod","197,173,49":"Goldenrod","232,212,95":"Light Goldenrod","74,107,58":"Dark Olive","90,148,74":"Olive","132,197,115":"Light Olive","15,121,159":"Dark Cyan","187,250,242":"Light Cyan","125,199,255":"Light Blue","77,49,184":"Dark Indigo","74,66,132":"Dark Slate Blue","122,113,196":"Slate Blue","181,174,241":"Light Slate Blue","155,82,73":"Dark Peach","209,128,120":"Peach","250,182,164":"Light Peach","219,164,99":"Light Brown","123,99,82":"Dark Tan","156,132,107":"Tan","214,181,148":"Light Tan","209,128,81":"Dark Beige","255,197,165":"Light Beige","109,100,63":"Dark Stone","148,140,107":"Stone","205,197,158":"Light Stone","51,57,65":"Dark Slate","109,117,141":"Slate","179,185,209":"Light Slate"},be=$e.map(([t,o,r])=>`${t},${o},${r}`),ze=[];class ue extends Map{constructor(o){super(),this.limit=o}set(o,r){if(this.size>=this.limit){const a=this.keys().next().value;this.delete(a)}return super.set(o,r)}}const Ue=unsafeWindow;function qe(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function Ae(t){const o=new Set(c.overlays.map(a=>(a.name||"").toLowerCase()));if(!o.has(t.toLowerCase()))return t;let r=1;for(;o.has(`${t} (${r})`.toLowerCase());)r++;return`${t} (${r})`}function T(t,o){if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(t,o);const r=document.createElement("canvas");return r.width=t,r.height=o,r}function De(t,o){const r=document.createElement("canvas");return r.width=t,r.height=o,r}function ge(t){return t.convertToBlob?t.convertToBlob():new Promise((o,r)=>t.toBlob(a=>a?o(a):r(new Error("toBlob failed")),"image/png"))}async function We(t){if(t&&typeof t.toDataURL=="function")return t.toDataURL("image/png");if(t&&typeof t.convertToBlob=="function"){const o=await t.convertToBlob();return await Te(o)}if(typeof OffscreenCanvas<"u"&&t instanceof OffscreenCanvas){const o=t.transferToImageBitmap?.();if(o){const r=De(t.width,t.height);return r.getContext("2d").drawImage(o,0,0),r.toDataURL("image/png")}}throw new Error("Cannot export canvas to data URL")}async function se(t){if(typeof createImageBitmap=="function")try{return await createImageBitmap(t)}catch{}return new Promise((o,r)=>{const a=URL.createObjectURL(t),n=new Image;n.onload=()=>{URL.revokeObjectURL(a),o(n)},n.onerror=i=>{URL.revokeObjectURL(a),r(i)},n.src=a})}async function st(t){const o=await se(t),a=T(o.width,o.height).getContext("2d");return a.drawImage(o,0,0),a.getImageData(0,0,o.width,o.height)}async function He(t){if(!t.imageBase64)return null;if(t.visibleColorKeys==null)return await le(t.imageBase64);const o=t.visibleColorKeys.slice().sort().join(","),a=`${t.imageBase64.slice(0,64)+":"+t.imageBase64.length}|${o}`;if(Me.has(a))return Me.get(a);const n=await le(t.imageBase64),i=n.width,d=n.height,s=T(i,d),p=s.getContext("2d",{willReadFrequently:!0});p.drawImage(n,0,0);const h=p.getImageData(0,0,i,d),m=h.data,b=new Set(t.visibleColorKeys);for(let g=0;g<m.length;g+=4)if(m[g+3]>0){const k=`${m[g]},${m[g+1]},${m[g+2]}`;b.has(k)||(m[g+3]=0)}p.putImageData(h,0,0);const w=await(typeof createImageBitmap=="function"?createImageBitmap(s):le(await We(s)));return Me.set(a,w),w}function le(t){return we.has(t)?Promise.resolve(we.get(t)):new Promise((o,r)=>{const a=new Image;a.crossOrigin="anonymous",a.onload=()=>{we.set(t,a),o(a)},a.onerror=r,a.src=t})}function me(t){try{const o=new URL(t),r=o.pathname.split("/"),a=new URLSearchParams(o.search);return{chunk1:parseInt(r[3],10),chunk2:parseInt(r[4],10),posX:parseInt(a.get("x")||"0",10),posY:parseInt(a.get("y")||"0",10)}}catch{return{chunk1:0,chunk2:0,posX:0,posY:0}}}function lt(t){try{const o=new URL(t,location.href);if(o.hostname!=="backend.wplace.live"||!o.pathname.startsWith("/files/"))return null;const r=o.pathname.match(/\/(\d+)\/(\d+)\.png$/i);return r?{chunk1:parseInt(r[1],10),chunk2:parseInt(r[2],10)}:null}catch{return null}}function ct(t){try{const o=new URL(t,location.href);if(o.hostname!=="backend.wplace.live")return null;const r=o.pathname.match(/\/s0\/pixel\/(\d+)\/(\d+)$/);if(!r)return null;const a=o.searchParams;return{normalized:`https://backend.wplace.live/s0/pixel/${r[1]}/${r[2]}?x=${a.get("x")||0}&y=${a.get("y")||0}`}}catch{return null}}function Ve(t,o,r,a,n,i,d,s){const p=Math.max(t,n),h=Math.max(o,i),m=Math.min(t+r,n+d),b=Math.min(o+a,i+s),w=Math.max(0,m-p),g=Math.max(0,b-h);return{x:p,y:h,w,h:g}}const Q=new ue(50),xe=new Set,we=new ue(50),Me=new ue(50),ve=new ue(200),he=new ue(200),ke=new Map;function Re(t){return[t.imageBase64?t.imageBase64.slice(0,64)+":"+t.imageBase64.length:"none",t.pixelUrl||"null",t.offsetX,t.offsetY,t.opacity].join("|")}function B(){Q.clear(),we.clear(),Me.clear(),ve.clear(),he.clear(),ke.clear()}async function dt(t,o,r){if(!t.enabled||!t.imageBase64||!t.pixelUrl||xe.has(t.id))return null;const a=Re(t),n=`${t.id}|${a}|${o}|${r}`;if(Q.has(n))return Q.get(n);const i=await He(t);if(!i)return null;const d=i.width,s=i.height;if(d>=1e3||s>=1e3)return xe.add(t.id),D(`Overlay "${t.name}" skipped: image too large (must be smaller than 1000\xD71000; got ${d}\xD7${s}).`),null;const p=me(t.pixelUrl);if(!Number.isFinite(p.chunk1)||!Number.isFinite(p.chunk2))return null;const h=p.chunk1*1e3+p.posX+t.offsetX-o*1e3,m=p.chunk2*1e3+p.posY+t.offsetY-r*1e3,b=Ve(0,0,1e3,1e3,h,m,d,s);if(b.w===0||b.h===0)return Q.set(n,null),null;const g=T(1e3,1e3).getContext("2d",{willReadFrequently:!0});g.drawImage(i,h,m);const k=g.getImageData(b.x,b.y,b.w,b.h),y=c.overlayMode==="smart"||c.overlayMode==="diff"?new Uint8ClampedArray(k.data):null,f=k.data,x=t.opacity,L=255*(1-x);for(let I=0;I<f.length;I+=4)f[I+3]>0&&(c.highlightPixels?(f[I]=255,f[I+1]=0,f[I+2]=255):(f[I]=Math.round(f[I]*x+L),f[I+1]=Math.round(f[I+1]*x+L),f[I+2]=Math.round(f[I+2]*x+L)),f[I+3]=255);const S={imageData:k,dx:b.x,dy:b.y,rawData:y};return Q.set(n,S),S}async function pt(t,o,r){if(!t.enabled||!t.imageBase64||!t.pixelUrl||xe.has(t.id))return null;const a=3,n=Re(t),i=`${t.id}|${n}|minify|s${a}|${o}|${r}`;if(Q.has(i))return Q.get(i);const d=await He(t);if(!d)return null;const s=d.width,p=d.height;if(s>=1e3||p>=1e3)return xe.add(t.id),D(`Overlay "${t.name}" skipped: image too large (must be smaller than 1000\xD71000; got ${s}\xD7${p}).`),null;const h=me(t.pixelUrl);if(!Number.isFinite(h.chunk1)||!Number.isFinite(h.chunk2))return null;const m=h.chunk1*1e3+h.posX+t.offsetX-o*1e3,b=h.chunk2*1e3+h.posY+t.offsetY-r*1e3,w=1e3*a,g=1e3*a,k=Math.round(m*a),y=Math.round(b*a),f=s*a,x=p*a,E=Ve(0,0,w,g,k,y,f,x);if(E.w===0||E.h===0)return Q.set(i,null),null;const S=T(w,g).getContext("2d",{willReadFrequently:!0});S.imageSmoothingEnabled=!1,S.clearRect(0,0,w,g),S.drawImage(d,0,0,s,p,k,y,f,x);const I=S.getImageData(E.x,E.y,E.w,E.h),A=I.data,O=t.opacity,K=255*(1-O),V=Math.floor(a/2),j=E.w;for(let v=0;v<A.length;v+=4){if(A[v+3]===0)continue;const $=v/4%j,R=Math.floor(v/4/j),Y=E.x+$,q=E.y+R;Y%a===V&&q%a===V?(c.highlightPixels?(A[v]=255,A[v+1]=0,A[v+2]=255):(A[v]=Math.round(A[v]*O+K),A[v+1]=Math.round(A[v+1]*O+K),A[v+2]=Math.round(A[v+2]*O+K)),A[v+3]=255):(A[v]=0,A[v+1]=0,A[v+2]=0,A[v+3]=0)}const u={imageData:I,dx:E.x,dy:E.y,scaled:!0,scale:a};return Q.set(i,u),u}async function ut(t,o){if(!o||o.length===0)return t;const r=await se(t),a=r.width,n=r.height,i=T(a,n),d=i.getContext("2d");for(const s of o)s&&d.putImageData(s.imageData,s.dx,s.dy);return d.drawImage(r,0,0),await ge(i)}async function gt(t,o){if(!o||o.length===0)return t;const r=await se(t),a=r.width,n=r.height,i=T(a,n),d=i.getContext("2d");d.drawImage(r,0,0);for(const s of o){if(!s||!s.imageData||s.imageData.width===0||s.imageData.height===0)continue;const p=T(s.imageData.width,s.imageData.height);p.getContext("2d").putImageData(s.imageData,0,0),d.drawImage(p,s.dx,s.dy)}return await ge(i)}async function mt(t,o){if(!o||o.length===0)return t;const r=await se(t),a=r.width,n=r.height,i=T(a,n),d=i.getContext("2d",{willReadFrequently:!0});d.drawImage(r,0,0);const s=d.getImageData(0,0,a,n),p=s.data,h=new Uint32Array(p.buffer);for(const m of o){if(!m||!m.rawData)continue;const b=m.rawData,w=m.imageData.data,g=m.imageData.width,k=m.imageData.height,y=new Uint32Array(b.buffer),f=new Uint32Array(w.buffer);for(let x=0;x<k;x++){const E=m.dy+x;if(!(E<0||E>=n))for(let L=0;L<g;L++){const S=m.dx+L;if(S<0||S>=a)continue;const I=(x*g+L)*4;if(b[I+3]>0){const A=E*a+S,O=x*g+L;y[O]!==h[A]&&(h[A]=f[O])}}}}return d.putImageData(s,0,0),await ge(i)}async function vt(t,o){if(!o||o.length===0)return t;const r=await se(t),a=r.width,n=r.height,i=T(a,n),d=i.getContext("2d",{willReadFrequently:!0});d.drawImage(r,0,0);const s=d.getImageData(0,0,a,n),p=s.data,h=new Uint32Array(p.buffer);for(const m of o){if(!m||!m.rawData)continue;const b=m.rawData,w=m.imageData.data,g=m.imageData.width,k=m.imageData.height,y=new Uint32Array(b.buffer),f=new Uint32Array(w.buffer);for(let x=0;x<k;x++){const E=m.dy+x;if(!(E<0||E>=n))for(let L=0;L<g;L++){const S=m.dx+L;if(S<0||S>=a)continue;const I=(x*g+L)*4;if(b[I+3]>0){const A=E*a+S,O=A,N=x*g+L;p[A*4+3]>0&&y[N]!==h[O]&&(h[O]=f[N])}}}}return d.putImageData(s,0,0),await ge(i)}async function ht(t,o){if(!o||o.length===0)return t;const r=3,a=await se(t),n=a.width,i=a.height,d=T(n*r,i*r),s=d.getContext("2d",{willReadFrequently:!0});s.imageSmoothingEnabled=!1,s.drawImage(a,0,0,n*r,i*r);for(const p of o){if(!p)continue;const h=p.imageData.width,m=p.imageData.height;if(h===0||m===0)continue;const b=T(h,m);b.getContext("2d",{willReadFrequently:!0}).putImageData(p.imageData,0,0),s.drawImage(b,p.dx,p.dy)}return await ge(d)}function D(t,o=3e3){let r=document.getElementById("op-toast-stack");r||(r=document.createElement("div"),r.className="op-toast-stack",r.id="op-toast-stack",document.body.appendChild(r)),r.classList.toggle("op-dark",c.theme==="dark");const a=document.createElement("div");a.className="op-toast",a.textContent=t,r.appendChild(a),requestAnimationFrame(()=>a.classList.add("show")),setTimeout(()=>{a.classList.remove("show"),setTimeout(()=>a.remove(),200)},o)}let Ce=!1;function ft(){const t=c.overlays.some(a=>a.enabled&&a.imageBase64),o=!!c.autoCapturePixelUrl&&!!c.activeOverlayId;return(c.overlayMode==="behind"||c.overlayMode==="above"||c.overlayMode==="smart"||c.overlayMode==="diff"||c.overlayMode==="minify")&&(t||o)&&c.overlays.length>0}function H(){ft()?yt():bt()}function yt(){if(Ce)return;const t=Se,o=async(r,a)=>{const n=typeof r=="string"?r:r&&r.url||"";if(c.autoCapturePixelUrl&&c.activeOverlayId){const s=ct(n);if(s){const p=c.overlays.find(h=>h.id===c.activeOverlayId);if(p&&p.pixelUrl!==s.normalized){p.pixelUrl=s.normalized,p.offsetX=0,p.offsetY=0,await C(["overlays"]),B(),c.autoCapturePixelUrl=!1,await C(["autoCapturePixelUrl"]),P();const m=me(p.pixelUrl);D(`Anchor set for "${p.name}": chunk ${m.chunk1}/${m.chunk2} at (${m.posX}, ${m.posY}). Offset reset to (0,0).`),H()}}}const i=lt(n);if(!i||!["behind","above","smart","diff","minify"].includes(c.overlayMode))return t(r,a);try{const s=await t(r,a);if(!s.ok||!(s.headers.get("Content-Type")||"").toLowerCase().includes("image"))return s;const h=c.overlays.filter(g=>g.enabled&&g.imageBase64&&g.pixelUrl);if(h.length===0)return s;const m=await s.blob();try{const g=await st(m.slice()),k=`${i.chunk1},${i.chunk2}`;ve.set(k,g)}catch(g){console.error("Hail's OP: Failed to cache tile",g)}if(m.size>15*1024*1024)return s;let b;if(c.overlayMode==="minify"){const g=[];for(const k of h)g.push(await pt(k,i.chunk1,i.chunk2));b=await ht(m,g.filter(Boolean))}else{const g=[];for(const k of h)g.push(await dt(k,i.chunk1,i.chunk2));c.overlayMode==="smart"?b=await mt(m,g.filter(Boolean)):c.overlayMode==="diff"?b=await vt(m,g.filter(Boolean)):b=await(c.overlayMode==="behind"?ut(m,g.filter(Boolean)):gt(m,g.filter(Boolean)))}const w=new Headers(s.headers);return w.set("Content-Type","image/png"),w.delete("Content-Length"),new Response(b,{status:s.status,statusText:s.statusText,headers:w})}catch(s){return console.error("Hail's OP: Error processing tile",s),t(r,a)}};Ue.fetch=o,window.fetch=o,Ce=!0}function bt(){Ce&&(Ue.fetch=Se,window.fetch=Se,Ce=!1)}const c={overlays:[],activeOverlayId:null,overlayMode:"behind",isPanelCollapsed:!1,autoCapturePixelUrl:!1,panelX:null,panelY:null,theme:"light",collapseList:!1,collapseEditor:!1,collapseNudge:!1,collapseColors:!1,highlightPixels:!1,ccFreeKeys:be.slice(),ccPaidKeys:ze.slice(),ccZoom:1,ccRealtime:!1,colorSortBy:"errorCount",colorsScrollTop:0},Ke=Object.keys(c);async function xt(){try{await Promise.all(Ke.map(async t=>{c[t]=await at(t,c[t])})),(!Array.isArray(c.ccFreeKeys)||c.ccFreeKeys.length===0)&&(c.ccFreeKeys=be.slice()),Array.isArray(c.ccPaidKeys)||(c.ccPaidKeys=ze.slice()),(!Number.isFinite(c.ccZoom)||c.ccZoom<=0)&&(c.ccZoom=1),typeof c.ccRealtime!="boolean"&&(c.ccRealtime=!1)}catch(t){console.error("Hail's OP: Failed to load config",t)}}async function C(t=Ke){try{await Promise.all(t.map(o=>nt(o,c[o])))}catch(o){console.error("Hail's OP: Failed to save config",o)}}function wt(){const t=document.createElement("style");t.textContent=`
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

      .op-row { display: flex; align-items: center; gap: 8px; margin-bottom: 1rem;}
      .op-row.space { justify-content: space-between; }

      .op-button { background: var(--op-btn); color: var(--op-text); border: 1px solid var(--op-btn-border); border-radius: 8px; padding: 6px 10px; cursor: pointer; }
      .op-button:hover { background: var(--op-btn-hover); }
      .op-button:disabled { opacity: 0.5; cursor: not-allowed; }
      .op-button.icon { width: 30px; height: 30px; padding: 0; display: inline-flex; align-items: center; justify-content: center; font-size: 16px; }

      .op-color-btn { background: var(--op-btn); color: var(--op-text); border: 1px solid var(--op-btn-border); border-radius: 8px; padding: 6px 10px; cursor: pointer; }
      .op-color-btn:hover { background: var(--op-btn-hover); }
      .op-color-btn.active { background: var(--op-accent); color: white; }

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
    `,document.head.appendChild(t)}function Mt(){if(document.getElementById("overlay-pro-panel"))return;const t=document.createElement("div");t.id="overlay-pro-panel";const r=Math.max(12,window.innerWidth-340-80);t.style.left=(Number.isFinite(c.panelX)?c.panelX:r)+"px",t.style.top=(Number.isFinite(c.panelY)?c.panelY:120)+"px",t.innerHTML=`
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
                           <select id="op-color-sort-select" class="op-select" style="padding: 2px 4px; font-size: 12px; margin-right: 6px;">
                               <option value="errorCount">Sort: Errors</option>
                               <option value="totalCount">Sort: Total</option>
                               <option value="correctCount">Sort: Correct</option>
                               <option value="belowCount">Sort: Below</option>
                               <option value="smartCount">Sort: Smart</option>
                           </select>
                           <button class="op-button" id="op-colors-refresh" title="Refresh counts" style="padding: 2px 6px; font-size: 12px;">Refresh</button>
                           <button class="op-chevron" id="op-collapse-colors" title="Collapse/Expand">\u25BE</button>
                      </div>
                  </div>
                  <div id="op-colors-body">
                      <div class="op-button-group" style="gap: 6px; flex-wrap: wrap;">
                          <button class="op-color-btn" id="op-colors-all">All</button>
                          <button class="op-color-btn" id="op-colors-none">None</button>
                          <button class="op-color-btn" id="op-colors-free">Free</button>
                          <button class="op-color-btn" id="op-colors-paid">Paid</button>
                          <button class="op-color-btn" id="op-colors-copy">Copy</button>
                      </div>
                      <div class="op-list" id="op-colors-list" style="max-height: 480px; gap: 4px;"></div>
                      <div id="op-colors-summary" style="padding-top: 8px; border-top: 1px solid var(--op-border); margin-top: 8px; font-size: 12px;">
                        <div class="op-row space" style="margin-bottom: 0.25rem;"><span>Total Correct:</span><span id="op-total-correct" style="font-weight: 600; color: lime;">0</span></div>
                        <div class="op-row space" style="margin-bottom: 0.25rem;"><span>Total Wrong:</span><span id="op-total-wrong" style="font-weight: 600; color: red;">0</span></div>
                        <div class="op-row space" style="margin-bottom: 0.25rem;"><span>Total Pixels:</span><span id="op-total-pixels" style="font-weight: 600;">0</span></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    `,document.body.appendChild(t),Rt(),Pt(),St(),$t(t),P()}function X(){return c.overlays.find(t=>t.id===c.activeOverlayId)||null}function Ge(){const t=document.getElementById("op-overlay-list");if(t){t.innerHTML="";for(const o of c.overlays){const r=document.createElement("div");r.className="op-item"+(o.id===c.activeOverlayId?" active":"");const a=o.isLocal?" (local)":o.imageBase64?"":" (no image)";r.innerHTML=`
        <input type="radio" name="op-active" ${o.id===c.activeOverlayId?"checked":""} title="Set active"/>
        <input type="checkbox" ${o.enabled?"checked":""} title="Toggle enabled"/>
        <div class="op-item-name" title="${(o.name||"(unnamed)")+a}">${(o.name||"(unnamed)")+a}</div>
        <button class="op-icon-btn" title="Delete overlay">\u{1F5D1}\uFE0F</button>
      `;const[n,i,d,s]=r.children;n.addEventListener("change",async()=>{const p=c.activeOverlayId!==o.id;c.activeOverlayId=o.id,await C(["activeOverlayId"]),P(),p&&await Z(!1)}),i.addEventListener("change",()=>{o.enabled=i.checked,C(["overlays"]),B(),H()}),d.addEventListener("click",async()=>{const p=c.activeOverlayId!==o.id;c.activeOverlayId=o.id,await C(["activeOverlayId"]),P(),p&&await Z(!1)}),s.addEventListener("click",async p=>{if(p.stopPropagation(),!confirm(`Delete overlay "${o.name||"(unnamed)"}"?`))return;const h=c.overlays.findIndex(m=>m.id===o.id);if(h>=0){const m=c.activeOverlayId===o.id;c.overlays.splice(h,1),m&&(c.activeOverlayId=c.overlays[0]?.id||null),await C(["overlays","activeOverlayId"]),B(),H(),P(),m&&await Z()}}),t.appendChild(r)}}}async function kt(){const t=Ae("Overlay"),o={id:qe(),name:t,enabled:!0,imageUrl:null,imageBase64:null,isLocal:!1,pixelUrl:null,offsetX:0,offsetY:0,opacity:.7,visibleColorKeys:[]};return c.overlays.push(o),c.activeOverlayId=o.id,await C(["overlays","activeOverlayId"]),B(),H(),P(),await Z(),o}async function Ct(t,o){const r=await Ne(o);t.imageUrl=o,t.imageBase64=r,t.isLocal=!1,await C(["overlays"]),B(),c.autoCapturePixelUrl=!0,await C(["autoCapturePixelUrl"]),H(),P(),await Z(),D("Image loaded. Placement mode ON -- click once to set anchor.")}async function Ze(t,o){if(!o||!o.type||!o.type.startsWith("image/")){alert("Please choose an image file.");return}if(!confirm("Local PNGs cannot be exported to friends! Are you sure?"))return;const r=await it(o);t.imageBase64=r,t.imageUrl=null,t.isLocal=!0,await C(["overlays"]),B(),c.autoCapturePixelUrl=!0,await C(["autoCapturePixelUrl"]),H(),P(),await Z(),D("Local image loaded. Placement mode ON -- click once to set anchor.")}async function Et(t){let o;try{o=JSON.parse(t)}catch{alert("Invalid JSON");return}const r=Array.isArray(o)?o:[o];let a=0,n=0;for(const i of r){const d=Ae(i.name||"Imported Overlay"),s=i.imageUrl,p=i.pixelUrl??null,h=Number.isFinite(i.offsetX)?i.offsetX:0,m=Number.isFinite(i.offsetY)?i.offsetY:0,b=Number.isFinite(i.opacity)?i.opacity:.7;if(!s){n++;continue}try{const w=await Ne(s),g={id:qe(),name:d,enabled:!0,imageUrl:s,imageBase64:w,isLocal:!1,pixelUrl:p,offsetX:h,offsetY:m,opacity:b,visibleColorKeys:[]};c.overlays.push(g),a++}catch(w){console.error("Import failed for",s,w),n++}}a>0&&(c.activeOverlayId=c.overlays[c.overlays.length-1].id,await C(["overlays","activeOverlayId"]),B(),H(),P(),await Z()),alert(`Import finished. Imported: ${a}${n?`, Failed: ${n}`:""}`)}function Lt(){const t=X();if(!t){alert("No active overlay selected.");return}if(t.isLocal||!t.imageUrl){alert("This overlay uses a local image and cannot be exported. Please host the image and set an image URL.");return}const o={version:1,name:t.name,imageUrl:t.imageUrl,pixelUrl:t.pixelUrl??null,offsetX:t.offsetX,offsetY:t.offsetY,opacity:t.opacity},r=JSON.stringify(o,null,2);Oe(r).then(()=>alert("Overlay JSON copied to clipboard!")).catch(()=>{prompt("Copy the JSON below:",r)})}function Oe(t){return navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(t):Promise.reject(new Error("Clipboard API not available"))}let je;function It(){clearTimeout(je),je=setTimeout(()=>{C(["colorsScrollTop"])},250)}function St(){const t=n=>document.getElementById(n);t("op-theme-toggle").addEventListener("click",async n=>{n.stopPropagation(),c.theme=c.theme==="light"?"dark":"light",await C(["theme"]),_e()}),t("op-refresh-btn").addEventListener("click",n=>{n.stopPropagation(),location.reload()}),t("op-mode-select").addEventListener("change",n=>{c.overlayMode=n.target.value,C(["overlayMode"]),H(),P()}),t("op-autocap-toggle").addEventListener("click",()=>{c.autoCapturePixelUrl=!c.autoCapturePixelUrl,C(["autoCapturePixelUrl"]),H(),P()}),t("op-highlight-toggle").addEventListener("change",async n=>{c.highlightPixels=n.target.checked,await C(["highlightPixels"]),B()}),t("op-add-overlay").addEventListener("click",async()=>{try{await kt()}catch(n){console.error(n)}}),t("op-import-overlay").addEventListener("click",async()=>{const n=prompt("Paste overlay JSON (single or array):");n&&await Et(n)}),t("op-export-overlay").addEventListener("click",()=>Lt()),t("op-collapse-list").addEventListener("click",()=>{c.collapseList=!c.collapseList,C(["collapseList"]),P()}),t("op-collapse-editor").addEventListener("click",()=>{c.collapseEditor=!c.collapseEditor,C(["collapseEditor"]),P()}),t("op-collapse-nudge").addEventListener("click",()=>{c.collapseNudge=!c.collapseNudge,C(["collapseNudge"]),P()}),t("op-collapse-colors").addEventListener("click",()=>{c.collapseColors=!c.collapseColors,C(["collapseColors"]),P()}),t("op-colors-refresh").addEventListener("click",async()=>{he.clear(),await Z()}),t("op-color-sort-select").addEventListener("change",async n=>{c.colorSortBy=n.target.value,await C(["colorSortBy"]),await Z(!1)}),t("op-colors-all").addEventListener("click",async()=>{const n=X();if(!n)return;n.visibleColorKeys=null,await C(["overlays"]),B(),document.getElementById("op-colors-list").querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=!0})}),t("op-colors-none").addEventListener("click",async()=>{const n=X();if(!n)return;n.visibleColorKeys=[],await C(["overlays"]),B(),document.getElementById("op-colors-list").querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=!1})}),t("op-colors-free").addEventListener("click",async()=>{const n=X();if(!n)return;const i=ee.map(p=>p.key),d=new Set($e.map(([p,h,m])=>`${p},${h},${m}`));n.visibleColorKeys=i.filter(p=>d.has(p)),await C(["overlays"]),B(),document.getElementById("op-colors-list").querySelectorAll('input[type="checkbox"]').forEach(p=>{p.checked=d.has(p.dataset.key)})}),t("op-colors-paid").addEventListener("click",async()=>{const n=X();if(!n)return;const i=ee.map(p=>p.key),d=new Set(re.map(([p,h,m])=>`${p},${h},${m}`));n.visibleColorKeys=i.filter(p=>d.has(p)),await C(["overlays"]),B(),document.getElementById("op-colors-list").querySelectorAll('input[type="checkbox"]').forEach(p=>{p.checked=d.has(p.dataset.key)})}),t("op-colors-copy").addEventListener("click",()=>{if(!X())return;const i="Color,type,wrongEmpty,wrongDiff,wrong,correct,total";if(!ee||ee.length===0){Oe(i).then(()=>D("No color data to copy.")).catch(()=>D("Failed to copy."));return}const d=new Set(re.map(([h,m,b])=>`${h},${m},${b}`)),s=ee.map(h=>{const{key:m,name:b,totalCount:w,belowCount:g,smartCount:k,errorCount:y,correctCount:f}=h,x=d.has(m)?"P":"F";return`${b},${x},${g},${k},${y},${f},${w}`}),p=[i,...s].join(`
`);Oe(p).then(()=>D("Color data copied to clipboard!")).catch(()=>D("Failed to copy color data."))}),t("op-name").addEventListener("change",async n=>{const i=X();if(!i)return;const d=(n.target.value||"").trim()||"Overlay";c.overlays.some(s=>s.id!==i.id&&(s.name||"").toLowerCase()===d.toLowerCase())?(i.name=Ae(d),D(`Name in use. Renamed to "${i.name}".`)):i.name=d,await C(["overlays"]),Ge()}),t("op-fetch").addEventListener("click",async()=>{const n=X();if(!n){alert("No active overlay selected.");return}if(n.imageBase64){alert("This overlay already has an image. Create a new overlay to change the image.");return}const i=t("op-image-url").value.trim();if(!i){alert("Enter an image link first.");return}try{await Ct(n,i)}catch(d){console.error(d),alert("Failed to fetch image.")}});const o=t("op-dropzone");o.addEventListener("click",()=>t("op-file-input").click()),t("op-file-input").addEventListener("change",async n=>{const i=n.target.files&&n.target.files[0];if(n.target.value="",!i)return;const d=X();if(d){if(d.imageBase64){alert("This overlay already has an image. Create a new overlay to change the image.");return}try{await Ze(d,i)}catch(s){console.error(s),alert("Failed to load local image.")}}}),["dragenter","dragover"].forEach(n=>o.addEventListener(n,i=>{i.preventDefault(),i.stopPropagation(),o.classList.add("drop-highlight")})),["dragleave","drop"].forEach(n=>o.addEventListener(n,i=>{i.preventDefault(),i.stopPropagation(),!(n==="dragleave"&&i.target!==o)&&o.classList.remove("drop-highlight")})),o.addEventListener("drop",async n=>{const i=n.dataTransfer;if(!i)return;const d=i.files&&i.files[0];if(!d)return;const s=X();if(s){if(s.imageBase64){alert("This overlay already has an image. Create a new overlay to change the image.");return}try{await Ze(s,d)}catch(p){console.error(p),alert("Failed to load dropped image.")}}});const r=async(n,i)=>{const d=X();d&&(d.offsetX+=n,d.offsetY+=i,await C(["overlays"]),B(),P())};t("op-nudge-up").addEventListener("click",()=>r(0,-1)),t("op-nudge-down").addEventListener("click",()=>r(0,1)),t("op-nudge-left").addEventListener("click",()=>r(-1,0)),t("op-nudge-right").addEventListener("click",()=>r(1,0)),t("op-opacity-slider").addEventListener("input",n=>{const i=X();i&&(i.opacity=parseFloat(n.target.value),document.getElementById("op-opacity-value").textContent=Math.round(i.opacity*100)+"%")}),t("op-opacity-slider").addEventListener("change",async()=>{await C(["overlays"]),B()}),t("op-download-overlay").addEventListener("click",()=>{const n=X();if(!n||!n.imageBase64){D("No overlay image to download.");return}const i=document.createElement("a");i.href=n.imageBase64,i.download=`${(n.name||"overlay").replace(/[^\w.-]+/g,"_")}.png`,document.body.appendChild(i),i.click(),i.remove()}),t("op-open-cc").addEventListener("click",()=>{const n=X();if(!n||!n.imageBase64){D("No overlay image to edit.");return}Ot(n)});const a=t("op-open-resize");a&&a.addEventListener("click",()=>{const n=X();if(!n||!n.imageBase64){D("No overlay image to resize.");return}Xt(n)}),window.addEventListener("resize",()=>{}),t("op-colors-list").addEventListener("scroll",()=>{const n=t("op-colors-list");n&&(c.colorsScrollTop=n.scrollTop,It())})}function $t(t){const o=t.querySelector("#op-header"),r=t.querySelector("#op-panel-toggle");if(!o||!r)return;let a=!1,n=0,i=0,d=0,s=0,p=!1;const h=(g,k,y)=>Math.min(Math.max(g,k),y),m=g=>{const k=t.classList.contains("collapsed"),y=k?r:o;if(k){if(g.target!==r)return}else if(!g.target.closest("#op-header")||g.target.closest("button"))return;a=!0,p=!1,n=g.clientX,i=g.clientY;const f=t.getBoundingClientRect();d=f.left,s=f.top,y.setPointerCapture?.(g.pointerId),g.preventDefault()},b=g=>{if(!a)return;const k=g.clientX-n,y=g.clientY-i,f=Math.max(8,window.innerWidth-t.offsetWidth-8),x=Math.max(8,window.innerHeight-t.offsetHeight-8);t.style.left=h(d+k,8,f)+"px",t.style.top=h(s+y,8,x)+"px",p=!0},w=g=>{if(!a)return;const y=t.classList.contains("collapsed")?r:o;a=!1,y.releasePointerCapture?.(g.pointerId),p&&(c.panelX=parseInt(t.style.left,10)||0,c.panelY=parseInt(t.style.top,10)||0,C(["panelX","panelY"]))};t.addEventListener("pointerdown",m),t.addEventListener("pointermove",b),t.addEventListener("pointerup",w),t.addEventListener("pointercancel",w),window.addEventListener("resize",()=>{const g=t.getBoundingClientRect(),k=Math.max(8,window.innerWidth-t.offsetWidth-8),y=Math.max(8,window.innerHeight-t.offsetHeight-8),f=Math.min(Math.max(g.left,8),k),x=Math.min(Math.max(g.top,8),y);t.style.left=f+"px",t.style.top=x+"px",c.panelX=f,c.panelY=x,C(["panelX","panelY"])}),r.addEventListener("click",g=>{if(p){g.preventDefault(),g.stopPropagation();return}c.isPanelCollapsed=!c.isPanelCollapsed,C(["isPanelCollapsed"]),P()})}function _e(){document.body.classList.toggle("op-theme-dark",c.theme==="dark"),document.body.classList.toggle("op-theme-light",c.theme!=="dark");const t=document.getElementById("op-toast-stack");t&&t.classList.toggle("op-dark",c.theme==="dark")}function At(){const t=b=>document.getElementById(b),o=X(),r=t("op-editor-section"),a=t("op-editor-body");if(r.style.display=o?"flex":"none",!o)return;t("op-name").value=o.name||"";const n=t("op-image-source"),i=t("op-preview-wrap"),d=t("op-image-preview"),s=t("op-cc-btn-row");o.imageBase64?(n.style.display="none",i.style.display="flex",d.src=o.imageBase64,s.style.display="flex"):(n.style.display="block",i.style.display="none",s.style.display="none",t("op-image-url").value=o.imageUrl||"");const p=o.pixelUrl?me(o.pixelUrl):{chunk1:"-",chunk2:"-",posX:"-",posY:"-"};t("op-coord-display").textContent=o.pixelUrl?`Ref: chunk ${p.chunk1}/${p.chunk2} at (${p.posX}, ${p.posY})`:'No pixel anchor set. Turn ON "Place overlay" and click a pixel once.',t("op-opacity-slider").value=String(o.opacity),t("op-opacity-value").textContent=Math.round(o.opacity*100)+"%";const h=document.getElementById("op-offset-indicator");h&&(h.textContent=`Offset X ${o.offsetX}, Y ${o.offsetY}`),a.style.display=c.collapseEditor?"none":"block";const m=document.getElementById("op-collapse-editor");m&&(m.textContent=c.collapseEditor?"\u25B8":"\u25BE")}async function P(){const t=S=>document.getElementById(S),o=t("overlay-pro-panel");if(!o)return;_e();const r=t("op-content"),a=t("op-panel-toggle"),n=t("op-header"),i=!!c.isPanelCollapsed;o.classList.toggle("collapsed",i),r.style.display=i?"none":"grid",a.classList.toggle("logo-button",i),a.title=i?"Expand":"Collapse";const d=t("op-mode-select");d&&(d.value=c.overlayMode);const s=t("op-autocap-toggle"),p=t("op-place-label");s.textContent=c.autoCapturePixelUrl?"ON":"OFF",s.classList.toggle("op-danger",!!c.autoCapturePixelUrl),p.classList.toggle("op-danger-text",!!c.autoCapturePixelUrl);const h=t("op-highlight-toggle");h&&(h.checked=!!c.highlightPixels);const m=t("op-list-wrap"),b=t("op-collapse-list");m.style.display=c.collapseList?"none":"block",b&&(b.textContent=c.collapseList?"\u25B8":"\u25BE");const w=t("op-nudge-body"),g=t("op-collapse-nudge");w.style.display=c.collapseNudge?"none":"block",g&&(g.textContent=c.collapseNudge?"\u25B8":"\u25BE");const k=t("op-colors-body"),y=t("op-collapse-colors");k&&(k.style.display=c.collapseColors?"none":"block"),y&&(y.textContent=c.collapseColors?"\u25B8":"\u25BE");const f=t("op-color-sort-select");f&&(f.value=c.colorSortBy||"errorCount"),Ge(),At();const x=t("op-export-overlay"),E=X(),L=!!(E&&E.imageUrl&&!E.isLocal);x.disabled=!L,x.title=L?"Export active overlay JSON":"Export disabled for local images"}const Ye=new Map;let ee=[];async function Pe(t){if(!t||!t.imageBase64)return{};const o=t.imageBase64.slice(0,64)+":"+t.imageBase64.length;if(Ye.has(o))return Ye.get(o);const r=await le(t.imageBase64),n=T(r.width,r.height).getContext("2d",{willReadFrequently:!0});n.drawImage(r,0,0);const d=n.getImageData(0,0,r.width,r.height).data,s={};for(let p=0;p<d.length;p+=4)if(d[p+3]>0){const h=`${d[p]},${d[p+1]},${d[p+2]}`;s[h]=(s[h]||0)+1}return Ye.set(o,s),s}async function Dt(t){if(!t||!t.imageBase64||!t.pixelUrl)return null;const o=Re(t),r=Array.from(ve.keys()).sort().join(";"),a=`${t.id}|${o}|${r}`;if(he.has(a))return he.get(a);const n=await le(t.imageBase64),i=n.width,d=n.height,p=T(i,d).getContext("2d",{willReadFrequently:!0});p.drawImage(n,0,0);const m=p.getImageData(0,0,i,d).data,b=me(t.pixelUrl);if(!Number.isFinite(b.chunk1)||!Number.isFinite(b.chunk2))return null;const w={};for(let g=0;g<d;g++)for(let k=0;k<i;k++){const y=(g*i+k)*4;if(m[y+3]===0)continue;const f=m[y],x=m[y+1],E=m[y+2],L=`${f},${x},${E}`;w[L]||(w[L]={smart:0,below:0});const S=b.chunk1*1e3+b.posX+t.offsetX+k,I=b.chunk2*1e3+b.posY+t.offsetY+g,A=Math.floor(S/1e3),O=Math.floor(I/1e3),N=`${A},${O}`;if(ve.has(N)){const K=ve.get(N),V=K.data,j=K.width,u=(S%1e3+1e3)%1e3,M=((I%1e3+1e3)%1e3*j+u)*4,$=V[M],R=V[M+1],Y=V[M+2];V[M+3]===0?w[L].below++:(f!==$||x!==R||E!==Y)&&w[L].smart++}}return he.set(a,w),w}async function Z(t=!0){const o=X(),r=document.getElementById("op-colors-section");if(!r)return;if(!o||!o.imageBase64){r.style.display="none",ee=[];return}r.style.display="flex";const a=document.getElementById("op-colors-list");let n;if(t){a.innerHTML='<div class="op-muted" style="text-align:center; padding: 12px 0;">Loading...</div>';const y=await Pe(o),f=await Dt(o)||{};n=Object.entries(y).map(([x,E])=>{const L=f[x]?.below||0,S=f[x]?.smart||0,I=L+S,A=E-I;return{key:x,name:pe[x]||x,totalCount:E,belowCount:L,smartCount:S,errorCount:I,correctCount:A}}),ke.set(o.id,n),ee=n}else{if(ke.has(o.id))n=ke.get(o.id);else{const y=await Pe(o);n=Object.entries(y).map(([f,x])=>({key:f,name:pe[f]||f,totalCount:x,belowCount:0,smartCount:0,errorCount:0,correctCount:x}))}ee=n}const i=c.colorSortBy||"errorCount";n=[...n].sort((y,f)=>f[i]===y[i]?f.totalCount-y.totalCount:f[i]-y[i]);let s;o.visibleColorKeys===null||o.visibleColorKeys===void 0?s=new Set(n.map(y=>y.key)):s=new Set(o.visibleColorKeys);const p=n.reduce((y,f)=>y+f.correctCount,0),h=n.reduce((y,f)=>y+f.errorCount,0),m=n.reduce((y,f)=>y+f.totalCount,0),b=document.getElementById("op-total-correct"),w=document.getElementById("op-total-wrong"),g=document.getElementById("op-total-pixels");b&&(b.textContent=p.toLocaleString()),w&&(w.textContent=h.toLocaleString()),g&&(g.textContent=m.toLocaleString());const k=new Set(re.map(([y,f,x])=>`${y},${f},${x}`));if(a.innerHTML="",n.length===0){a.innerHTML='<div class="op-muted" style="text-align:center; padding: 12px 0;">No colors found.</div>';return}for(const y of n){const{key:f,name:x,totalCount:E,belowCount:L,smartCount:S,errorCount:I,correctCount:A}=y,O=k.has(f),N=document.createElement("div");N.className="op-dist-item"+(O?" premium":""),N.title=`${x} (${f}): ${E} pixels`;const K=`<span style="color: lime;">${A}</span>/<span style="color: cyan;">${L}</span>/<span style="color: pink;">${S}</span>/<span style="color: red;">${I}</span>/${E}`;N.innerHTML=`
            <input type="checkbox" data-key="${f}" ${s.has(f)?"checked":""} style="margin-right: 4px;">
            <div class="op-color-list-swatch" style="background-color: rgb(${f});"></div>
            <div class="op-color-list-name">${x}</div>
            <div class="op-color-list-count">${K}</div>
        `,a.appendChild(N)}a.querySelectorAll('input[type="checkbox"]').forEach(y=>{y.addEventListener("change",async()=>{const f=y.dataset.key,x=X();if(!x)return;if(x.visibleColorKeys===null){const L=Object.keys(await Pe(x));x.visibleColorKeys=L}const E=new Set(x.visibleColorKeys);y.checked?E.add(f):E.delete(f),x.visibleColorKeys=Array.from(E),await C(["overlays"]),B()})}),Number.isFinite(c.colorsScrollTop)&&(a.scrollTop=c.colorsScrollTop)}let l=null;function Rt(){const t=document.createElement("div");t.className="op-cc-backdrop",t.id="op-cc-backdrop",document.body.appendChild(t);const o=document.createElement("div");o.className="op-cc-modal",o.id="op-cc-modal",o.style.display="none",o.innerHTML=`
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
    `,document.body.appendChild(o),o.querySelector("#op-cc-close").addEventListener("click",Ee),t.addEventListener("click",Ee),o.querySelector("#op-cc-cancel").addEventListener("click",Ee),l={backdrop:t,modal:o,previewCanvas:o.querySelector("#op-cc-preview"),previewCtx:o.querySelector("#op-cc-preview").getContext("2d",{willReadFrequently:!0}),sourceCanvas:null,sourceCtx:null,sourceImageData:null,processedCanvas:null,processedCtx:null,freeGrid:o.querySelector("#op-cc-free-grid"),paidGrid:o.querySelector("#op-cc-paid-grid"),freeToggle:o.querySelector("#op-cc-free-toggle"),paidToggle:o.querySelector("#op-cc-paid-toggle"),meta:o.querySelector("#op-cc-meta"),applyBtn:o.querySelector("#op-cc-apply"),recalcBtn:o.querySelector("#op-cc-recalc"),realtimeBtn:o.querySelector("#op-cc-realtime"),zoom:1,selectedFree:new Set(c.ccFreeKeys),selectedPaid:new Set(c.ccPaidKeys),realtime:!!c.ccRealtime,overlay:null,lastColorCounts:{},isStale:!1},l.realtimeBtn.addEventListener("click",async()=>{l.realtime=!l.realtime,l.realtimeBtn.textContent=`Realtime: ${l.realtime?"ON":"OFF"}`,l.realtimeBtn.classList.toggle("op-danger",l.realtime),c.ccRealtime=l.realtime,await C(["ccRealtime"]),l.realtime&&l.isStale&&i()});const r=async()=>{l.zoom=Math.min(8,(l.zoom||1)*1.25),c.ccZoom=l.zoom,await C(["ccZoom"]),te(),oe()},a=async()=>{l.zoom=Math.max(.1,(l.zoom||1)/1.25),c.ccZoom=l.zoom,await C(["ccZoom"]),te(),oe()};o.querySelector("#op-cc-zoom-in").addEventListener("click",r),o.querySelector("#op-cc-zoom-out").addEventListener("click",a),l.recalcBtn.addEventListener("click",()=>{i()}),l.applyBtn.addEventListener("click",async()=>{const d=l.overlay;if(!d)return;if(Je().length===0){D("Select at least one color.");return}if(l.isStale&&i(),!l.processedCanvas){D("Nothing to apply.");return}if(l.processedCanvas.width>=1e3||l.processedCanvas.height>=1e3){D("Image too large to apply (must be < 1000\xD71000).");return}const p=l.processedCanvas.toDataURL("image/png");d.imageBase64=p,d.imageUrl=null,d.isLocal=!0,await C(["overlays"]),B(),H(),P();const h=Object.keys(l.lastColorCounts).length;D(`Overlay updated (${l.processedCanvas.width}\xD7${l.processedCanvas.height}, ${h} colors).`),Ee()}),Yt(),l.freeToggle.addEventListener("click",async()=>{const d=et();ot("free",!d),c.ccFreeKeys=Array.from(l.selectedFree),await C(["ccFreeKeys"]),l.realtime?i():n(),te(),oe(),fe()}),l.paidToggle.addEventListener("click",async()=>{const d=tt();ot("paid",!d),c.ccPaidKeys=Array.from(l.selectedPaid),await C(["ccPaidKeys"]),l.realtime?i():n(),te(),oe(),fe()});function n(){l.isStale=!0,l.meta.textContent=l.meta.textContent.replace(/ \| Status: .+$/,"")+" | Status: pending recalculation"}function i(){Le(),l.isStale=!1,te(),oe(),Qe()}}function Ot(t){if(!l)return;l.overlay=t,document.body.classList.add("op-scroll-lock"),l.zoom=Number(c.ccZoom)||1,l.realtime=!!c.ccRealtime,l.realtimeBtn.textContent=`Realtime: ${l.realtime?"ON":"OFF"}`,l.realtimeBtn.classList.toggle("op-danger",l.realtime);const o=new Image;o.onload=()=>{l.sourceCanvas||(l.sourceCanvas=document.createElement("canvas"),l.sourceCtx=l.sourceCanvas.getContext("2d",{willReadFrequently:!0})),l.sourceCanvas.width=o.width,l.sourceCanvas.height=o.height,l.sourceCtx.clearRect(0,0,o.width,o.height),l.sourceCtx.drawImage(o,0,0),l.sourceImageData=l.sourceCtx.getImageData(0,0,o.width,o.height),l.processedCanvas||(l.processedCanvas=document.createElement("canvas"),l.processedCtx=l.processedCanvas.getContext("2d")),Le(),l.isStale=!1,te(),oe(),Qe(),l.backdrop.classList.add("show"),l.modal.style.display="flex"},o.src=t.imageBase64}function Ee(){l&&(l.backdrop.classList.remove("show"),l.modal.style.display="none",l.overlay=null,document.body.classList.remove("op-scroll-lock"))}function _t(t,o,r,a){let n=null,i=1/0;for(let d=0;d<a.length;d++){const[s,p,h]=a[d],m=(s+t)/2,b=s-t,w=p-o,g=h-r,k=(512+m)*b*b>>8,y=4*w*w,f=(767-m)*g*g>>8,x=k+y+f;x<i&&(i=x,n=[s,p,h])}return n||[0,0,0]}function Je(){const t=[];return l.selectedFree.forEach(o=>{const[r,a,n]=o.split(",").map(i=>parseInt(i,10));Number.isFinite(r)&&t.push([r,a,n])}),l.selectedPaid.forEach(o=>{const[r,a,n]=o.split(",").map(i=>parseInt(i,10));Number.isFinite(r)&&t.push([r,a,n])}),t}function Le(){if(!l.sourceImageData)return;const t=l.sourceImageData.width,o=l.sourceImageData.height,r=l.sourceImageData.data,a=new Uint8ClampedArray(r.length),n=Je(),i={};for(let s=0;s<r.length;s+=4){const p=r[s],h=r[s+1],m=r[s+2];if(r[s+3]===0){a[s]=0,a[s+1]=0,a[s+2]=0,a[s+3]=0;continue}const[w,g,k]=n.length?_t(p,h,m,n):[p,h,m];a[s]=w,a[s+1]=g,a[s+2]=k,a[s+3]=255;const y=`${w},${g},${k}`;i[y]=(i[y]||0)+1}l.processedCanvas||(l.processedCanvas=document.createElement("canvas"),l.processedCtx=l.processedCanvas.getContext("2d")),l.processedCanvas.width=t,l.processedCanvas.height=o;const d=new ImageData(a,t,o);l.processedCtx.putImageData(d,0,0),l.lastColorCounts=i}function te(){const t=Number(l.zoom)||1,o=l.processedCanvas;if(!o)return;const r=Math.max(1,Math.round(o.width*t)),a=Math.max(1,Math.round(o.height*t));l.previewCanvas.width=r,l.previewCanvas.height=a;const n=l.previewCtx;n.clearRect(0,0,r,a),n.imageSmoothingEnabled=!1,n.drawImage(o,0,0,o.width,o.height,0,0,r,a),n.imageSmoothingEnabled=!0}function oe(){if(!l.sourceImageData){l.meta.textContent="";return}const t=l.sourceImageData.width,o=l.sourceImageData.height,r=Object.keys(l.lastColorCounts||{}).length,a=l.isStale?"pending recalculation":"up to date";l.meta.textContent=`Size: ${t}\xD7${o} | Zoom: ${l.zoom.toFixed(2)}\xD7 | Colors: ${r} | Status: ${a}`}function Qe(){if(!l||!l.lastColorCounts)return;const t=document.getElementById("op-cc-color-list");if(!t)return;const o=l.lastColorCounts,r=Object.entries(o).sort(([,n],[,i])=>i-n),a=new Set(re.map(([n,i,d])=>`${n},${i},${d}`));if(t.innerHTML="",r.length===0){t.innerHTML='<div class="op-muted" style="text-align:center; padding: 12px 0;">No colors in image.</div>';return}for(const[n,i]of r){const d=a.has(n),s=pe[n]||n,p=document.createElement("div");p.className="op-color-list-item"+(d?" premium":""),p.title=`${s} (${n}): ${i} pixels`,p.innerHTML=`
        <div class="op-color-list-swatch" style="background-color: rgb(${n});"></div>
        <div class="op-color-list-name">${s}</div>
        <div class="op-color-list-count">${i}</div>
      `,t.appendChild(p)}}function Yt(){l.freeGrid.innerHTML="",l.paidGrid.innerHTML="";for(const[t,o,r]of $e){const a=`${t},${o},${r}`,n=document.createElement("div");n.className="op-cc-cell",n.style.background=`rgb(${t},${o},${r})`,n.title=pe[a]||a,n.dataset.key=a,n.dataset.type="free",l.selectedFree.has(a)&&n.classList.add("active"),n.addEventListener("click",async()=>{l.selectedFree.has(a)?l.selectedFree.delete(a):l.selectedFree.add(a),n.classList.toggle("active",l.selectedFree.has(a)),c.ccFreeKeys=Array.from(l.selectedFree),await C(["ccFreeKeys"]),l.realtime?Le():l.isStale=!0,te(),oe(),fe()}),l.freeGrid.appendChild(n)}for(const[t,o,r]of re){const a=`${t},${o},${r}`,n=document.createElement("div");n.className="op-cc-cell",n.style.background=`rgb(${t},${o},${r})`,n.title=pe[a]||a,n.dataset.key=a,n.dataset.type="paid",l.selectedPaid.has(a)&&n.classList.add("active"),n.addEventListener("click",async()=>{l.selectedPaid.has(a)?l.selectedPaid.delete(a):l.selectedPaid.add(a),n.classList.toggle("active",l.selectedPaid.has(a)),c.ccPaidKeys=Array.from(l.selectedPaid),await C(["ccPaidKeys"]),l.realtime?Le():l.isStale=!0,te(),oe(),fe()}),l.paidGrid.appendChild(n)}fe()}function fe(){l.freeToggle.textContent=et()?"Unselect All":"Select All",l.paidToggle.textContent=tt()?"Unselect All":"Select All"}function et(){return be.every(t=>l.selectedFree.has(t))}function tt(){const t=re.map(([o,r,a])=>`${o},${r},${a}`);return t.every(o=>l.selectedPaid.has(o))&&t.length>0}function ot(t,o){if(t==="free")o?be.forEach(a=>l.selectedFree.add(a)):l.selectedFree.clear(),l.freeGrid.querySelectorAll(".op-cc-cell").forEach(a=>a.classList.toggle("active",o));else{const r=re.map(([a,n,i])=>`${a},${n},${i}`);o?r.forEach(a=>l.selectedPaid.add(a)):l.selectedPaid.clear(),l.paidGrid.querySelectorAll(".op-cc-cell").forEach(a=>a.classList.toggle("active",o))}}let e=null;function Pt(){const t=document.createElement("div");t.className="op-rs-backdrop",t.id="op-rs-backdrop",document.body.appendChild(t);const o=document.createElement("div");o.className="op-rs-modal",o.id="op-rs-modal",o.style.display="none",o.innerHTML=`
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
    `,document.body.appendChild(o);const r={backdrop:t,modal:o,tabSimple:o.querySelector("#op-rs-tab-simple"),tabAdvanced:o.querySelector("#op-rs-tab-advanced"),paneSimple:o.querySelector("#op-rs-pane-simple"),paneAdvanced:o.querySelector("#op-rs-pane-advanced"),orig:o.querySelector("#op-rs-orig"),w:o.querySelector("#op-rs-w"),h:o.querySelector("#op-rs-h"),lock:o.querySelector("#op-rs-lock"),note:o.querySelector("#op-rs-note"),onex:o.querySelector("#op-rs-onex"),half:o.querySelector("#op-rs-half"),third:o.querySelector("#op-rs-third"),quarter:o.querySelector("#op-rs-quarter"),double:o.querySelector("#op-rs-double"),scale:o.querySelector("#op-rs-scale"),applyScale:o.querySelector("#op-rs-apply-scale"),simWrap:o.querySelector("#op-rs-sim-wrap"),simOrig:o.querySelector("#op-rs-sim-orig"),simNew:o.querySelector("#op-rs-sim-new"),colLeft:o.querySelector("#op-rs-col-left"),colRight:o.querySelector("#op-rs-col-right"),advWrap:o.querySelector("#op-rs-adv-wrap"),preview:o.querySelector("#op-rs-preview"),meta:o.querySelector("#op-rs-meta"),zoomIn:o.querySelector("#op-rs-zoom-in"),zoomOut:o.querySelector("#op-rs-zoom-out"),multRange:o.querySelector("#op-rs-mult-range"),multInput:o.querySelector("#op-rs-mult-input"),bind:o.querySelector("#op-rs-bind"),blockW:o.querySelector("#op-rs-blockw"),blockH:o.querySelector("#op-rs-blockh"),offX:o.querySelector("#op-rs-offx"),offY:o.querySelector("#op-rs-offy"),dotR:o.querySelector("#op-rs-dotr"),dotRVal:o.querySelector("#op-rs-dotr-val"),gridToggle:o.querySelector("#op-rs-grid"),advNote:o.querySelector("#op-rs-adv-note"),resWrap:o.querySelector("#op-rs-adv-result-wrap"),resCanvas:o.querySelector("#op-rs-adv-result"),resMeta:o.querySelector("#op-rs-adv-resmeta"),calcBtn:o.querySelector("#op-rs-calc"),applyBtn:o.querySelector("#op-rs-apply"),cancelBtn:o.querySelector("#op-rs-cancel"),closeBtn:o.querySelector("#op-rs-close")},a=r.preview.getContext("2d",{willReadFrequently:!0}),n=r.simOrig.getContext("2d",{willReadFrequently:!0}),i=r.simNew.getContext("2d",{willReadFrequently:!0}),d=r.resCanvas.getContext("2d",{willReadFrequently:!0});e={...r,ov:null,img:null,origW:0,origH:0,mode:"simple",zoom:1,updating:!1,mult:4,gapX:4,gapY:4,offx:0,offy:0,dotr:1,viewX:0,viewY:0,panning:!1,panStart:null,calcCanvas:null,calcCols:0,calcRows:0,calcReady:!1};const s=()=>{const u=parseInt(e.w.value||"0",10),v=parseInt(e.h.value||"0",10),M=Number.isFinite(u)&&Number.isFinite(v)&&u>0&&v>0,$=u>=1e3||v>=1e3;return M?$?`Target: ${u}\xD7${v} (exceeds limit: must be < 1000\xD71000)`:`Target: ${u}\xD7${v} (OK)`:"Enter positive width and height."},p=()=>{const u=Math.floor((e.origW-e.offx)/e.gapX),v=Math.floor((e.origH-e.offy)/e.gapY);return{cols:Math.max(0,u),rows:Math.max(0,v)}},h=()=>{const{cols:u,rows:v}=p(),M=u>=1e3||v>=1e3;return u>0&&v>0?`Samples: ${u} \xD7 ${v} | Output: ${u}\xD7${v}${M?" (exceeds limit: < 1000\xD71000)":""}`:"Adjust multiplier/offset until dots sit at centers."},m=()=>{e.meta.textContent=e.mode==="advanced"?h():s()},b=()=>{const u=parseInt(e.w.value||"0",10),v=parseInt(e.h.value||"0",10),M=Number.isFinite(u)&&Number.isFinite(v)&&u>0&&v>0,$=u>=1e3||v>=1e3,R=M?$?`Target: ${u}\xD7${v} (exceeds limit: must be < 1000\xD71000)`:`Target: ${u}\xD7${v} (OK)`:"Enter positive width and height.";e.note&&(e.note.textContent=R),e.mode==="simple"&&(e.applyBtn.disabled=!M||$),e.mode==="simple"&&(e.meta.textContent=R)};function w(u){const v=Math.max(1,Math.round(e.origW*u)),M=Math.max(1,Math.round(e.origH*u));e.updating=!0,e.w.value=v,e.h.value=e.lock.checked?Math.max(1,Math.round(v*e.origH/e.origW)):M,e.updating=!1,b()}function g(){if(!e.img)return;const u=e.colLeft.querySelector(".pad-top").offsetHeight,v=e.colRight.querySelector(".pad-top").offsetHeight,M=e.colLeft.clientWidth,$=e.colRight.clientWidth,R=e.colLeft.clientHeight-u,Y=e.colRight.clientHeight-v;e.simOrig.width=M,e.simOrig.height=R,e.simNew.width=$,e.simNew.height=Y,n.save(),n.imageSmoothingEnabled=!1,n.clearRect(0,0,M,R);const q=Math.min(M/e.origW,R/e.origH),F=Math.max(1,Math.floor(e.origW*q)),_=Math.max(1,Math.floor(e.origH*q)),J=Math.floor((M-F)/2),ae=Math.floor((R-_)/2);n.drawImage(e.img,0,0,e.origW,e.origH,J,ae,F,_),n.restore();const z=parseInt(e.w.value||"0",10),W=parseInt(e.h.value||"0",10);if(i.save(),i.imageSmoothingEnabled=!1,i.clearRect(0,0,$,Y),Number.isFinite(z)&&Number.isFinite(W)&&z>0&&W>0){const ie=T(z,W),U=ie.getContext("2d",{willReadFrequently:!0});U.imageSmoothingEnabled=!1,U.clearRect(0,0,z,W),U.drawImage(e.img,0,0,e.origW,e.origH,0,0,z,W);const ne=U.getImageData(0,0,z,W),G=ne.data;for(let de=0;de<G.length;de+=4)G[de+3]!==0&&(G[de+3]=255);U.putImageData(ne,0,0);const Be=Math.min($/z,Y/W),ce=Math.max(1,Math.floor(z*Be)),Ie=Math.max(1,Math.floor(W*Be)),ye=Math.floor(($-ce)/2),Fe=Math.floor((Y-Ie)/2);i.drawImage(ie,0,0,z,W,ye,Fe,ce,Ie)}else i.drawImage(e.img,0,0,e.origW,e.origH,J,ae,F,_);i.restore()}const k=()=>{e.updating=!0,e.multRange.value=String(e.mult),e.multInput.value=String(e.mult),e.blockW.value=String(e.gapX),e.blockH.value=String(e.gapY),e.offX.value=String(e.offx),e.offY.value=String(e.offy),e.dotR.value=String(e.dotr),e.dotRVal.textContent=String(e.dotr),e.updating=!1};function y(){const{cols:u,rows:v}=p(),M=u>=1e3||v>=1e3;if(e.mode==="advanced")e.applyBtn.disabled=!e.calcReady;else{const $=parseInt(e.w.value||"0",10),R=parseInt(e.h.value||"0",10),Y=Number.isFinite($)&&Number.isFinite(R)&&$>0&&R>0&&$<1e3&&R<1e3;e.applyBtn.disabled=!Y}m()}function f(){if(e.mode!=="advanced"||!e.img)return;const u=e.origW,v=e.origH,M=Math.max(50,Math.floor(e.advWrap.clientWidth)),$=Math.max(50,Math.floor(e.advWrap.clientHeight));e.preview.width=M,e.preview.height=$;const R=Math.max(1,Math.floor(M/e.zoom)),Y=Math.max(1,Math.floor($/e.zoom)),q=Math.max(0,u-R),F=Math.max(0,v-Y);if(e.viewX=Math.min(Math.max(0,e.viewX),q),e.viewY=Math.min(Math.max(0,e.viewY),F),a.save(),a.imageSmoothingEnabled=!1,a.clearRect(0,0,M,$),a.drawImage(e.img,e.viewX,e.viewY,R,Y,0,0,M,$),e.gridToggle.checked&&e.gapX>=1&&e.gapY>=1){a.strokeStyle="rgba(255,59,48,0.45)",a.lineWidth=1;const _=Math.ceil((e.viewX-e.offx)/e.gapX),J=Math.floor((e.viewX+R-e.offx)/e.gapX),ae=Math.ceil((e.viewY-e.offy)/e.gapY),z=Math.floor((e.viewY+Y-e.offy)/e.gapY),W=Math.max(0,J-_+1),ie=Math.max(0,z-ae+1);if(W<=4e3&&ie<=4e3){a.beginPath();for(let U=_;U<=J;U++){const ne=e.offx+U*e.gapX,G=Math.round((ne-e.viewX)*e.zoom);a.moveTo(G+.5,0),a.lineTo(G+.5,$)}for(let U=ae;U<=z;U++){const ne=e.offy+U*e.gapY,G=Math.round((ne-e.viewY)*e.zoom);a.moveTo(0,G+.5),a.lineTo(M,G+.5)}a.stroke()}}if(e.gapX>=1&&e.gapY>=1){a.fillStyle="#ff3b30";const _=e.offx+Math.floor(e.gapX/2),J=e.offy+Math.floor(e.gapY/2);if(_>=0&&J>=0){const ae=Math.ceil((e.viewX-_)/e.gapX),z=Math.ceil((e.viewY-J)/e.gapY),W=Math.floor((e.viewY+Y-1-J)/e.gapY),ie=Math.floor((e.viewX+R-1-_)/e.gapX),U=e.dotr,ne=Math.max(0,ie-ae+1),G=Math.max(0,W-z+1);if(ne*G<=3e5)for(let ce=z;ce<=W;ce++){const Ie=J+ce*e.gapY;for(let ye=ae;ye<=ie;ye++){const Fe=_+ye*e.gapX,de=Math.round((Fe-e.viewX)*e.zoom),Nt=Math.round((Ie-e.viewY)*e.zoom);a.beginPath(),a.arc(de,Nt,U,0,Math.PI*2),a.fill()}}}}a.restore()}function x(){const u=e.calcCanvas,v=e.resWrap;if(!v||!u){d.clearRect(0,0,e.resCanvas.width,e.resCanvas.height),e.resMeta.textContent="No result. Click Calculate.";return}const M=u.width,$=u.height,R=Math.max(50,Math.floor(v.clientWidth-16)),Y=Math.max(50,Math.floor(v.clientHeight-16)),q=Math.min(R/M,Y/$),F=Math.max(1,Math.floor(M*q)),_=Math.max(1,Math.floor($*q));e.resCanvas.width=F,e.resCanvas.height=_,d.save(),d.imageSmoothingEnabled=!1,d.clearRect(0,0,F,_),d.drawImage(u,0,0,M,$,0,0,F,_),d.restore(),e.resMeta.textContent=`Output: ${M}\xD7${$}${M>=1e3||$>=1e3?" (exceeds limit: < 1000\xD71000)":""}`}e._drawSimplePreview=g,e._drawAdvancedPreview=f,e._drawAdvancedResultPreview=x;const E=u=>{e.mode=u,e.tabSimple.classList.toggle("active",u==="simple"),e.tabAdvanced.classList.toggle("active",u==="advanced"),e.paneSimple.classList.toggle("show",u==="simple"),e.paneAdvanced.classList.toggle("show",u==="advanced"),m(),e.calcBtn.style.display=u==="advanced"?"inline-block":"none",u==="advanced"?e.applyBtn.disabled=!e.calcReady:b(),y(),u==="advanced"?(f(),x()):g()};e.tabSimple.addEventListener("click",()=>E("simple")),e.tabAdvanced.addEventListener("click",()=>E("advanced"));const L=()=>{if(e.updating)return;e.updating=!0;const u=parseInt(e.w.value||"0",10);e.lock.checked&&e.origW>0&&e.origH>0&&u>0&&(e.h.value=Math.max(1,Math.round(u*e.origH/e.origW))),e.updating=!1,b(),e.mode==="simple"&&g()},S=()=>{if(e.updating)return;e.updating=!0;const u=parseInt(e.h.value||"0",10);e.lock.checked&&e.origW>0&&e.origH>0&&u>0&&(e.w.value=Math.max(1,Math.round(u*e.origW/e.origH))),e.updating=!1,b(),e.mode==="simple"&&g()};e.w.addEventListener("input",L),e.h.addEventListener("input",S),e.onex.addEventListener("click",()=>{w(1),g()}),e.half.addEventListener("click",()=>{w(.5),g()}),e.third.addEventListener("click",()=>{w(1/3),g()}),e.quarter.addEventListener("click",()=>{w(1/4),g()}),e.double.addEventListener("click",()=>{w(2),g()}),e.applyScale.addEventListener("click",()=>{const u=parseFloat(e.scale.value||"");if(!Number.isFinite(u)||u<=0){D("Enter a valid scale factor > 0");return}w(u),g()});const I=()=>{e.mode==="advanced"&&(e.calcReady=!1,e.applyBtn.disabled=!0,x(),m())},A=u=>{if(e.updating)return;const v=parseFloat(u);if(!Number.isFinite(v))return;const M=Math.min(Math.max(v,1),128);e.mult=M,e.bind.checked&&(e.gapX=M,e.gapY=M),k(),y(),f(),I()};e.multRange.addEventListener("input",u=>{e.updating||A(u.target.value)}),e.multInput.addEventListener("input",u=>{if(e.updating)return;const v=u.target.value;Number.isFinite(parseFloat(v))&&A(v)}),e.bind.addEventListener("change",()=>{e.bind.checked&&(e.gapX=e.mult,e.gapY=e.mult,k()),y(),f(),I()}),e.blockW.addEventListener("input",u=>{if(e.updating)return;const v=u.target.value,M=parseFloat(v);Number.isFinite(M)&&(e.gapX=Math.min(Math.max(M,1),4096),e.bind.checked&&(e.mult=e.gapX,e.gapY=e.gapX),k(),y(),f(),I())}),e.blockH.addEventListener("input",u=>{if(e.updating)return;const v=u.target.value,M=parseFloat(v);Number.isFinite(M)&&(e.gapY=Math.min(Math.max(M,1),4096),e.bind.checked&&(e.mult=e.gapY,e.gapX=e.gapY),k(),y(),f(),I())}),e.offX.addEventListener("input",u=>{const v=u.target.value,M=parseFloat(v);Number.isFinite(M)&&(e.offx=Math.min(Math.max(M,0),Math.max(0,e.origH-1e-4)),e.viewX=Math.min(e.viewX,Math.max(0,e.origW-1)),y(),f(),I())}),e.offY.addEventListener("input",u=>{const v=u.target.value,M=parseFloat(v);Number.isFinite(M)&&(e.offy=Math.min(Math.max(M,0),Math.max(0,e.origH-1e-4)),e.viewY=Math.min(e.viewY,Math.max(0,e.origH-1)),y(),f(),I())}),e.dotR.addEventListener("input",u=>{e.dotr=Math.max(1,Math.round(Number(u.target.value)||1)),e.dotRVal.textContent=String(e.dotr),f()}),e.gridToggle.addEventListener("change",f);const O=u=>{const v=Math.max(50,Math.floor(e.advWrap.clientWidth)),M=Math.max(50,Math.floor(e.advWrap.clientHeight)),$=Math.max(1,Math.floor(v/e.zoom)),R=Math.max(1,Math.floor(M/e.zoom)),Y=e.viewX+$/2,q=e.viewY+R/2;e.zoom=Math.min(32,Math.max(.1,e.zoom*u));const F=Math.max(1,Math.floor(v/e.zoom)),_=Math.max(1,Math.floor(M/e.zoom));e.viewX=Math.min(Math.max(0,Math.round(Y-F/2)),Math.max(0,e.origW-F)),e.viewY=Math.min(Math.max(0,Math.round(q-_/2)),Math.max(0,e.origH-_)),f()};e.zoomIn.addEventListener("click",()=>O(1.25)),e.zoomOut.addEventListener("click",()=>O(1/1.25)),e.advWrap.addEventListener("wheel",u=>{if(!u.ctrlKey)return;u.preventDefault();const v=u.deltaY||0;O(v>0?1/1.15:1.15)},{passive:!1});const N=u=>{u.target.closest(".op-rs-zoom")||(e.panning=!0,e.panStart={x:u.clientX,y:u.clientY,viewX:e.viewX,viewY:e.viewY},e.advWrap.classList.remove("op-pan-grab"),e.advWrap.classList.add("op-pan-grabbing"),e.advWrap.setPointerCapture?.(u.pointerId))},K=u=>{if(!e.panning)return;const v=u.clientX-e.panStart.x,M=u.clientY-e.panStart.y,$=e.advWrap.clientWidth,R=e.advWrap.clientHeight,Y=Math.max(1,Math.floor($/e.zoom)),q=Math.max(1,Math.floor(R/e.zoom));let F=e.panStart.viewX-Math.round(v/e.zoom),_=e.panStart.viewY-Math.round(M/e.zoom);F=Math.min(Math.max(0,F),Math.max(0,e.origW-Y)),_=Math.min(Math.max(0,_),Math.max(0,e.origH-q)),e.viewX=F,e.viewY=_,f()},V=u=>{e.panning&&(e.panning=!1,e.panStart=null,e.advWrap.classList.remove("op-pan-grabbing"),e.advWrap.classList.add("op-pan-grab"),e.advWrap.releasePointerCapture?.(u.pointerId))};e.advWrap.addEventListener("pointerdown",N),e.advWrap.addEventListener("pointermove",K),e.advWrap.addEventListener("pointerup",V),e.advWrap.addEventListener("pointercancel",V),e.advWrap.addEventListener("pointerleave",V);const j=()=>Xe();e.cancelBtn.addEventListener("click",j),e.closeBtn.addEventListener("click",j),t.addEventListener("click",j),e.calcBtn.addEventListener("click",async()=>{if(e.mode==="advanced")try{const{cols:u,rows:v}=p();if(u<=0||v<=0){D("No samples. Adjust multiplier/offset.");return}if(u>=1e3||v>=1e3){D("Output too large. Must be < 1000\xD71000.");return}const M=await Ft(e.img,e.origW,e.origH,e.offx,e.offy,e.gapX,e.gapY);e.calcCanvas=M,e.calcCols=u,e.calcRows=v,e.calcReady=!0,e.applyBtn.disabled=!1,x(),m(),D(`Calculated ${u}\xD7${v}. Review preview, then Apply.`)}catch(u){console.error(u),D("Calculation failed.")}}),e.applyBtn.addEventListener("click",async()=>{if(e.ov)try{if(e.mode==="simple"){const u=parseInt(e.w.value||"0",10),v=parseInt(e.h.value||"0",10);if(!Number.isFinite(u)||!Number.isFinite(v)||u<=0||v<=0){D("Invalid dimensions");return}if(u>=1e3||v>=1e3){D("Too large. Must be < 1000\xD71000.");return}await Bt(e.ov,u,v),Xe(),D(`Resized to ${u}\xD7${v}.`)}else{if(!e.calcReady||!e.calcCanvas){D("Calculate first.");return}const u=await We(e.calcCanvas);e.ov.imageBase64=u,e.ov.imageUrl=null,e.ov.isLocal=!0,await C(["overlays"]),B(),H(),P(),Xe(),D(`Applied ${e.calcCols}\xD7${e.calcRows}.`)}}catch(u){console.error(u),D("Apply failed.")}}),e._syncAdvancedMeta=y,e._syncSimpleNote=b,e._setMode=u=>{const v=new Event("click");(u==="simple"?e.tabSimple:e.tabAdvanced).dispatchEvent(v)}}function Xt(t){if(!e)return;e.ov=t;const o=new Image;o.onload=()=>{e.img=o,e.origW=o.width,e.origH=o.height,e.orig.value=`${e.origW}\xD7${e.origH}`,e.w.value=String(e.origW),e.h.value=String(e.origH),e.lock.checked=!0,e.zoom=1,e.mult=4,e.gapX=4,e.gapY=4,e.offx=0,e.offy=0,e.dotr=1,e.viewX=0,e.viewY=0,e.bind.checked=!0,e.multRange.value="4",e.multInput.value="4",e.blockW.value="4",e.blockH.value="4",e.offX.value="0",e.offY.value="0",e.dotR.value="1",e.dotRVal.textContent="1",e.gridToggle.checked=!0,e.calcCanvas=null,e.calcCols=0,e.calcRows=0,e.calcReady=!1,e.applyBtn.disabled=e.mode==="advanced",e._setMode("simple"),document.body.classList.add("op-scroll-lock"),e.backdrop.classList.add("show"),e.modal.style.display="flex",e._drawSimplePreview?.(),e._drawAdvancedPreview?.(),e._drawAdvancedResultPreview?.(),e._syncAdvancedMeta?.(),e._syncSimpleNote?.(),(()=>{if(e.mode==="advanced"){const{cols:n,rows:i}=(function(){const d=Math.floor((e.origW-e.offx)/e.gapX),s=Math.floor((e.origH-e.offy)/e.gapY);return{cols:Math.max(0,d),rows:Math.max(0,s)}})();e.meta.textContent=n>0&&i>0?`Samples: ${n} \xD7 ${i} | Output: ${n}\xD7${i}${n>=1e3||i>=1e3?" (exceeds limit: < 1000\xD71000)":""}`:"Adjust multiplier/offset until dots sit at centers."}else{const n=parseInt(e.w.value||"0",10),i=parseInt(e.h.value||"0",10),d=Number.isFinite(n)&&Number.isFinite(i)&&n>0&&i>0,s=n>=1e3||i>=1e3;e.meta.textContent=d?s?`Target: ${n}\xD7${i} (exceeds limit: must be < 1000\xD71000)`:`Target: ${n}\xD7${i} (OK)`:"Enter positive width and height."}})();const a=()=>{e.mode==="simple"?e._drawSimplePreview?.():(e._drawAdvancedPreview?.(),e._drawAdvancedResultPreview?.())};e._resizeHandler=a,window.addEventListener("resize",a)},o.src=t.imageBase64}function Xe(){e&&(window.removeEventListener("resize",e._resizeHandler||(()=>{})),e.backdrop.classList.remove("show"),e.modal.style.display="none",e.ov=null,e.img=null,document.body.classList.remove("op-scroll-lock"))}async function Bt(t,o,r){const a=await le(t.imageBase64),n=De(o,r),i=n.getContext("2d",{willReadFrequently:!0});i.imageSmoothingEnabled=!1,i.clearRect(0,0,o,r),i.drawImage(a,0,0,a.width,a.height,0,0,o,r);const d=i.getImageData(0,0,o,r),s=d.data;for(let h=3;h<s.length;h+=4)s[h]>0&&(s[h]=255);i.putImageData(d,0,0);const p=n.toDataURL("image/png");t.imageBase64=p,t.imageUrl=null,t.isLocal=!0,await C(["overlays"]),B(),H(),P()}async function Ft(t,o,r,a,n,i,d){const p=T(o,r).getContext("2d",{willReadFrequently:!0});p.imageSmoothingEnabled=!1,p.drawImage(t,0,0);const h=p.getImageData(0,0,o,r).data,m=Math.floor((o-a)/i),b=Math.floor((r-n)/d);if(m<=0||b<=0)throw new Error("No samples available with current offset/gap");const w=De(m,b),g=w.getContext("2d"),k=g.createImageData(m,b),y=k.data,f=a+i/2,x=n+d/2,E=(L,S,I)=>Math.min(Math.max(L,S),I);for(let L=0;L<b;L++)for(let S=0;S<m;S++){const I=Math.round(E(f+S*i,0,o-1)),O=(Math.round(E(x+L*d,0,r-1))*o+I)*4,N=h[O],K=h[O+1],V=h[O+2],j=h[O+3],u=(L*m+S)*4;j===0?(y[u]=0,y[u+1]=0,y[u+2]=0,y[u+3]=0):(y[u]=N,y[u+1]=K,y[u+2]=V,y[u+3]=255)}return g.putImageData(k,0,0),w}function Tt(){xt().then(()=>{H();const t=async()=>{wt(),Mt(),_e(),await Z()};document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t(),console.log("Hail's OP: Initialized with Minify (fixed 3\xD7) mode.")})}Tt()})();
