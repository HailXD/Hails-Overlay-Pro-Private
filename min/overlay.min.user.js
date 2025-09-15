/* @preserve
// ==UserScript==
// @name         Hail's OP
// @namespace    http://tampermonkey.net/
// @version      2.8.30
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

(function(){"use strict";const Se=window.fetch,nt=(t,o)=>{try{if(typeof GM<"u"&&typeof GM.getValue=="function")return GM.getValue(t,o);if(typeof GM_getValue=="function")return Promise.resolve(GM_getValue(t,o))}catch{}return Promise.resolve(o)},rt=(t,o)=>{try{if(typeof GM<"u"&&typeof GM.setValue=="function")return GM.setValue(t,o);if(typeof GM_setValue=="function")return Promise.resolve(GM_setValue(t,o))}catch{}return Promise.resolve()};function it(t){return new Promise((o,r)=>{try{GM_xmlhttpRequest({method:"GET",url:t,responseType:"blob",onload:a=>{a.status>=200&&a.status<300&&a.response?o(a.response):r(new Error(`GM_xhr failed: ${a.status} ${a.statusText}`))},onerror:()=>r(new Error("GM_xhr network error")),ontimeout:()=>r(new Error("GM_xhr timeout"))})}catch(a){r(a)}})}function Te(t){return new Promise((o,r)=>{const a=new FileReader;a.onload=()=>o(a.result),a.onerror=r,a.readAsDataURL(t)})}async function Ne(t){const o=await it(t);if(!o||!String(o.type).startsWith("image/"))throw new Error("URL did not return an image blob");return await Te(o)}function st(t){return new Promise((o,r)=>{const a=new FileReader;a.onload=()=>o(a.result),a.onerror=r,a.readAsDataURL(t)})}const $e=[[0,0,0],[60,60,60],[120,120,120],[210,210,210],[255,255,255],[96,0,24],[237,28,36],[255,127,39],[246,170,9],[249,221,59],[255,250,188],[14,185,104],[19,230,123],[135,255,94],[12,129,110],[16,174,166],[19,225,190],[96,247,242],[40,80,158],[64,147,228],[107,80,246],[153,177,251],[120,12,153],[170,56,185],[224,159,249],[203,0,122],[236,31,128],[243,141,169],[104,70,52],[149,104,42],[248,178,119]],ee=[[170,170,170],[165,14,30],[250,128,114],[228,92,26],[156,132,49],[197,173,49],[232,212,95],[74,107,58],[90,148,74],[132,197,115],[15,121,159],[187,250,242],[125,199,255],[77,49,184],[74,66,132],[122,113,196],[181,174,241],[155,82,73],[209,128,120],[250,182,164],[219,164,99],[123,99,82],[156,132,107],[214,181,148],[209,128,81],[255,197,165],[109,100,63],[148,140,107],[205,197,158],[51,57,65],[109,117,141],[179,185,209]],pe={"0,0,0":"Black","60,60,60":"Dark Gray","120,120,120":"Gray","210,210,210":"Light Gray","255,255,255":"White","96,0,24":"Deep Red","237,28,36":"Red","255,127,39":"Orange","246,170,9":"Gold","249,221,59":"Yellow","255,250,188":"Light Yellow","14,185,104":"Dark Green","19,230,123":"Green","135,255,94":"Light Green","12,129,110":"Dark Teal","16,174,166":"Teal","19,225,190":"Light Teal","96,247,242":"Cyan","40,80,158":"Dark Blue","64,147,228":"Blue","107,80,246":"Indigo","153,177,251":"Light Indigo","120,12,153":"Dark Purple","170,56,185":"Purple","224,159,249":"Light Purple","203,0,122":"Dark Pink","236,31,128":"Pink","243,141,169":"Light Pink","104,70,52":"Dark Brown","149,104,42":"Brown","248,178,119":"Beige","170,170,170":"Medium Gray","165,14,30":"Dark Red","250,128,114":"Light Red","228,92,26":"Dark Orange","156,132,49":"Dark Goldenrod","197,173,49":"Goldenrod","232,212,95":"Light Goldenrod","74,107,58":"Dark Olive","90,148,74":"Olive","132,197,115":"Light Olive","15,121,159":"Dark Cyan","187,250,242":"Light Cyan","125,199,255":"Light Blue","77,49,184":"Dark Indigo","74,66,132":"Dark Slate Blue","122,113,196":"Slate Blue","181,174,241":"Light Slate Blue","155,82,73":"Dark Peach","209,128,120":"Peach","250,182,164":"Light Peach","219,164,99":"Light Brown","123,99,82":"Dark Tan","156,132,107":"Tan","214,181,148":"Light Tan","209,128,81":"Dark Beige","255,197,165":"Light Beige","109,100,63":"Dark Stone","148,140,107":"Stone","205,197,158":"Light Stone","51,57,65":"Dark Slate","109,117,141":"Slate","179,185,209":"Light Slate"};let lt=new Set;function ze(){const t=new Set;try{const o=new Set(ee.map(([a,n,i])=>`${a},${n},${i}`)),r=document.querySelectorAll('svg[class~="text-base-content/80"]');for(const a of r){const n=a.closest("button");if(!n)continue;let i=n.style?.background||n.style?.backgroundColor||"";i||(i=(n.ownerDocument?.defaultView||window).getComputedStyle(n).backgroundColor||"");const s=/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i.exec(i);if(!s)continue;const l=`${parseInt(s[1],10)},${parseInt(s[2],10)},${parseInt(s[3],10)}`;o.has(l)&&t.add(l)}}catch(o){console.debug("scanAndCollectPaidKeysFromButtons failed:",o)}return lt=t,t}const be=$e.map(([t,o,r])=>`${t},${o},${r}`),Ue=[];class ue extends Map{constructor(o){super(),this.limit=o}set(o,r){if(this.size>=this.limit){const a=this.keys().next().value;this.delete(a)}return super.set(o,r)}}const qe=unsafeWindow;function We(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function Ae(t){const o=new Set(d.overlays.map(a=>(a.name||"").toLowerCase()));if(!o.has(t.toLowerCase()))return t;let r=1;for(;o.has(`${t} (${r})`.toLowerCase());)r++;return`${t} (${r})`}function N(t,o){if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(t,o);const r=document.createElement("canvas");return r.width=t,r.height=o,r}function De(t,o){const r=document.createElement("canvas");return r.width=t,r.height=o,r}function ge(t){return t.convertToBlob?t.convertToBlob():new Promise((o,r)=>t.toBlob(a=>a?o(a):r(new Error("toBlob failed")),"image/png"))}async function He(t){if(t&&typeof t.toDataURL=="function")return t.toDataURL("image/png");if(t&&typeof t.convertToBlob=="function"){const o=await t.convertToBlob();return await Te(o)}if(typeof OffscreenCanvas<"u"&&t instanceof OffscreenCanvas){const o=t.transferToImageBitmap?.();if(o){const r=De(t.width,t.height);return r.getContext("2d").drawImage(o,0,0),r.toDataURL("image/png")}}throw new Error("Cannot export canvas to data URL")}async function se(t){if(typeof createImageBitmap=="function")try{return await createImageBitmap(t)}catch{}return new Promise((o,r)=>{const a=URL.createObjectURL(t),n=new Image;n.onload=()=>{URL.revokeObjectURL(a),o(n)},n.onerror=i=>{URL.revokeObjectURL(a),r(i)},n.src=a})}async function ct(t){const o=await se(t),a=N(o.width,o.height).getContext("2d");return a.drawImage(o,0,0),a.getImageData(0,0,o.width,o.height)}async function Ke(t){if(!t.imageBase64)return null;if(t.visibleColorKeys==null)return await le(t.imageBase64);const o=t.visibleColorKeys.slice().sort().join(","),a=`${t.imageBase64.slice(0,64)+":"+t.imageBase64.length}|${o}`;if(Me.has(a))return Me.get(a);const n=await le(t.imageBase64),i=n.width,s=n.height,l=N(i,s),p=l.getContext("2d",{willReadFrequently:!0});p.drawImage(n,0,0);const v=p.getImageData(0,0,i,s),m=v.data,b=new Set(t.visibleColorKeys);for(let g=0;g<m.length;g+=4)if(m[g+3]>0){const M=`${m[g]},${m[g+1]},${m[g+2]}`;b.has(M)||(m[g+3]=0)}p.putImageData(v,0,0);const x=await(typeof createImageBitmap=="function"?createImageBitmap(l):le(await He(l)));return Me.set(a,x),x}function le(t){return we.has(t)?Promise.resolve(we.get(t)):new Promise((o,r)=>{const a=new Image;a.crossOrigin="anonymous",a.onload=()=>{we.set(t,a),o(a)},a.onerror=r,a.src=t})}function me(t){try{const o=new URL(t),r=o.pathname.split("/"),a=new URLSearchParams(o.search);return{chunk1:parseInt(r[3],10),chunk2:parseInt(r[4],10),posX:parseInt(a.get("x")||"0",10),posY:parseInt(a.get("y")||"0",10)}}catch{return{chunk1:0,chunk2:0,posX:0,posY:0}}}function dt(t){try{const o=new URL(t,location.href);if(o.hostname!=="backend.wplace.live"||!o.pathname.startsWith("/files/"))return null;const r=o.pathname.match(/\/(\d+)\/(\d+)\.png$/i);return r?{chunk1:parseInt(r[1],10),chunk2:parseInt(r[2],10)}:null}catch{return null}}function pt(t){try{const o=new URL(t,location.href);if(o.hostname!=="backend.wplace.live")return null;const r=o.pathname.match(/\/s0\/pixel\/(\d+)\/(\d+)$/);if(!r)return null;const a=o.searchParams;return{normalized:`https://backend.wplace.live/s0/pixel/${r[1]}/${r[2]}?x=${a.get("x")||0}&y=${a.get("y")||0}`}}catch{return null}}function Ve(t,o,r,a,n,i,s,l){const p=Math.max(t,n),v=Math.max(o,i),m=Math.min(t+r,n+s),b=Math.min(o+a,i+l),x=Math.max(0,m-p),g=Math.max(0,b-v);return{x:p,y:v,w:x,h:g}}const Q=new ue(50),xe=new Set,we=new ue(50),Me=new ue(50),ve=new ue(200),he=new ue(200),ke=new Map;function Re(t){return[t.imageBase64?t.imageBase64.slice(0,64)+":"+t.imageBase64.length:"none",t.pixelUrl||"null",t.offsetX,t.offsetY,t.opacity].join("|")}function B(){Q.clear(),we.clear(),Me.clear(),ve.clear(),he.clear(),ke.clear()}async function ut(t,o,r){if(!t.enabled||!t.imageBase64||!t.pixelUrl||xe.has(t.id))return null;const a=Re(t),n=`${t.id}|${a}|${o}|${r}`;if(Q.has(n))return Q.get(n);const i=await Ke(t);if(!i)return null;const s=i.width,l=i.height;if(s>=1e3||l>=1e3)return xe.add(t.id),D(`Overlay "${t.name}" skipped: image too large (must be smaller than 1000\xD71000; got ${s}\xD7${l}).`),null;const p=me(t.pixelUrl);if(!Number.isFinite(p.chunk1)||!Number.isFinite(p.chunk2))return null;const v=p.chunk1*1e3+p.posX+t.offsetX-o*1e3,m=p.chunk2*1e3+p.posY+t.offsetY-r*1e3,b=Ve(0,0,1e3,1e3,v,m,s,l);if(b.w===0||b.h===0)return Q.set(n,null),null;const g=N(1e3,1e3).getContext("2d",{willReadFrequently:!0});g.drawImage(i,v,m);const M=g.getImageData(b.x,b.y,b.w,b.h),C=d.overlayMode==="smart"||d.overlayMode==="diff"?new Uint8ClampedArray(M.data):null,f=M.data,y=t.opacity,I=255*(1-y);for(let L=0;L<f.length;L+=4)f[L+3]>0&&(d.highlightPixels?(f[L]=255,f[L+1]=0,f[L+2]=255):(f[L]=Math.round(f[L]*y+I),f[L+1]=Math.round(f[L+1]*y+I),f[L+2]=Math.round(f[L+2]*y+I)),f[L+3]=255);const S={imageData:M,dx:b.x,dy:b.y,rawData:C};return Q.set(n,S),S}async function gt(t,o,r){if(!t.enabled||!t.imageBase64||!t.pixelUrl||xe.has(t.id))return null;const a=3,n=Re(t),i=`${t.id}|${n}|minify|s${a}|${o}|${r}`;if(Q.has(i))return Q.get(i);const s=await Ke(t);if(!s)return null;const l=s.width,p=s.height;if(l>=1e3||p>=1e3)return xe.add(t.id),D(`Overlay "${t.name}" skipped: image too large (must be smaller than 1000\xD71000; got ${l}\xD7${p}).`),null;const v=me(t.pixelUrl);if(!Number.isFinite(v.chunk1)||!Number.isFinite(v.chunk2))return null;const m=v.chunk1*1e3+v.posX+t.offsetX-o*1e3,b=v.chunk2*1e3+v.posY+t.offsetY-r*1e3,x=1e3*a,g=1e3*a,M=Math.round(m*a),C=Math.round(b*a),f=l*a,y=p*a,k=Ve(0,0,x,g,M,C,f,y);if(k.w===0||k.h===0)return Q.set(i,null),null;const S=N(x,g).getContext("2d",{willReadFrequently:!0});S.imageSmoothingEnabled=!1,S.clearRect(0,0,x,g),S.drawImage(s,0,0,l,p,M,C,f,y);const L=S.getImageData(k.x,k.y,k.w,k.h),$=L.data,O=t.opacity,F=255*(1-O),z=Math.floor(a/2),V=k.w;for(let h=0;h<$.length;h+=4){if($[h+3]===0)continue;const A=h/4%V,R=Math.floor(h/4/V),Y=k.x+A,W=k.y+R;Y%a===z&&W%a===z?(d.highlightPixels?($[h]=255,$[h+1]=0,$[h+2]=255):($[h]=Math.round($[h]*O+F),$[h+1]=Math.round($[h+1]*O+F),$[h+2]=Math.round($[h+2]*O+F)),$[h+3]=255):($[h]=0,$[h+1]=0,$[h+2]=0,$[h+3]=0)}const u={imageData:L,dx:k.x,dy:k.y,scaled:!0,scale:a};return Q.set(i,u),u}async function mt(t,o){if(!o||o.length===0)return t;const r=await se(t),a=r.width,n=r.height,i=N(a,n),s=i.getContext("2d");for(const l of o)l&&s.putImageData(l.imageData,l.dx,l.dy);return s.drawImage(r,0,0),await ge(i)}async function vt(t,o){if(!o||o.length===0)return t;const r=await se(t),a=r.width,n=r.height,i=N(a,n),s=i.getContext("2d");s.drawImage(r,0,0);for(const l of o){if(!l||!l.imageData||l.imageData.width===0||l.imageData.height===0)continue;const p=N(l.imageData.width,l.imageData.height);p.getContext("2d").putImageData(l.imageData,0,0),s.drawImage(p,l.dx,l.dy)}return await ge(i)}async function ht(t,o){if(!o||o.length===0)return t;const r=await se(t),a=r.width,n=r.height,i=N(a,n),s=i.getContext("2d",{willReadFrequently:!0});s.drawImage(r,0,0);const l=s.getImageData(0,0,a,n),p=l.data,v=new Uint32Array(p.buffer);for(const m of o){if(!m||!m.rawData)continue;const b=m.rawData,x=m.imageData.data,g=m.imageData.width,M=m.imageData.height,C=new Uint32Array(b.buffer),f=new Uint32Array(x.buffer);for(let y=0;y<M;y++){const k=m.dy+y;if(!(k<0||k>=n))for(let I=0;I<g;I++){const S=m.dx+I;if(S<0||S>=a)continue;const L=(y*g+I)*4;if(b[L+3]>0){const $=k*a+S,O=y*g+I;C[O]!==v[$]&&(v[$]=f[O])}}}}return s.putImageData(l,0,0),await ge(i)}async function ft(t,o){if(!o||o.length===0)return t;const r=await se(t),a=r.width,n=r.height,i=N(a,n),s=i.getContext("2d",{willReadFrequently:!0});s.drawImage(r,0,0);const l=s.getImageData(0,0,a,n),p=l.data,v=new Uint32Array(p.buffer);for(const m of o){if(!m||!m.rawData)continue;const b=m.rawData,x=m.imageData.data,g=m.imageData.width,M=m.imageData.height,C=new Uint32Array(b.buffer),f=new Uint32Array(x.buffer);for(let y=0;y<M;y++){const k=m.dy+y;if(!(k<0||k>=n))for(let I=0;I<g;I++){const S=m.dx+I;if(S<0||S>=a)continue;const L=(y*g+I)*4;if(b[L+3]>0){const $=k*a+S,O=$,G=y*g+I;p[$*4+3]>0&&C[G]!==v[O]&&(v[O]=f[G])}}}}return s.putImageData(l,0,0),await ge(i)}async function yt(t,o){if(!o||o.length===0)return t;const r=3,a=await se(t),n=a.width,i=a.height,s=N(n*r,i*r),l=s.getContext("2d",{willReadFrequently:!0});l.imageSmoothingEnabled=!1,l.drawImage(a,0,0,n*r,i*r);for(const p of o){if(!p)continue;const v=p.imageData.width,m=p.imageData.height;if(v===0||m===0)continue;const b=N(v,m);b.getContext("2d",{willReadFrequently:!0}).putImageData(p.imageData,0,0),l.drawImage(b,p.dx,p.dy)}return await ge(s)}function D(t,o=3e3){let r=document.getElementById("op-toast-stack");r||(r=document.createElement("div"),r.className="op-toast-stack",r.id="op-toast-stack",document.body.appendChild(r)),r.classList.toggle("op-dark",d.theme==="dark");const a=document.createElement("div");a.className="op-toast",a.textContent=t,r.appendChild(a),requestAnimationFrame(()=>a.classList.add("show")),setTimeout(()=>{a.classList.remove("show"),setTimeout(()=>a.remove(),200)},o)}let Ce=!1;function bt(){const t=d.overlays.some(a=>a.enabled&&a.imageBase64),o=!!d.autoCapturePixelUrl&&!!d.activeOverlayId;return(d.overlayMode==="behind"||d.overlayMode==="above"||d.overlayMode==="smart"||d.overlayMode==="diff"||d.overlayMode==="minify")&&(t||o)&&d.overlays.length>0}function K(){bt()?xt():wt()}function xt(){if(Ce)return;const t=Se,o=async(r,a)=>{const n=typeof r=="string"?r:r&&r.url||"";if(d.autoCapturePixelUrl&&d.activeOverlayId){const l=pt(n);if(l){const p=d.overlays.find(v=>v.id===d.activeOverlayId);if(p&&p.pixelUrl!==l.normalized){p.pixelUrl=l.normalized,p.offsetX=0,p.offsetY=0,await E(["overlays"]),B(),d.autoCapturePixelUrl=!1,await E(["autoCapturePixelUrl"]),P();const m=me(p.pixelUrl);D(`Anchor set for "${p.name}": chunk ${m.chunk1}/${m.chunk2} at (${m.posX}, ${m.posY}). Offset reset to (0,0).`),K()}}}const i=dt(n);if(!i||!["behind","above","smart","diff","minify"].includes(d.overlayMode))return t(r,a);try{const l=await t(r,a);if(!l.ok||!(l.headers.get("Content-Type")||"").toLowerCase().includes("image"))return l;const v=d.overlays.filter(g=>g.enabled&&g.imageBase64&&g.pixelUrl);if(v.length===0)return l;const m=await l.blob();try{const g=await ct(m.slice()),M=`${i.chunk1},${i.chunk2}`;ve.set(M,g)}catch(g){console.error("Hail's OP: Failed to cache tile",g)}if(m.size>15*1024*1024)return l;let b;if(d.overlayMode==="minify"){const g=[];for(const M of v)g.push(await gt(M,i.chunk1,i.chunk2));b=await yt(m,g.filter(Boolean))}else{const g=[];for(const M of v)g.push(await ut(M,i.chunk1,i.chunk2));d.overlayMode==="smart"?b=await ht(m,g.filter(Boolean)):d.overlayMode==="diff"?b=await ft(m,g.filter(Boolean)):b=await(d.overlayMode==="behind"?mt(m,g.filter(Boolean)):vt(m,g.filter(Boolean)))}const x=new Headers(l.headers);return x.set("Content-Type","image/png"),x.delete("Content-Length"),new Response(b,{status:l.status,statusText:l.statusText,headers:x})}catch(l){return console.error("Hail's OP: Error processing tile",l),t(r,a)}};qe.fetch=o,window.fetch=o,Ce=!0}function wt(){Ce&&(qe.fetch=Se,window.fetch=Se,Ce=!1)}const d={overlays:[],activeOverlayId:null,overlayMode:"behind",isPanelCollapsed:!1,autoCapturePixelUrl:!1,panelX:null,panelY:null,theme:"light",collapseList:!1,collapseEditor:!1,collapseNudge:!1,collapseColors:!1,highlightPixels:!1,ccFreeKeys:be.slice(),ccPaidKeys:Ue.slice(),ccZoom:1,ccRealtime:!1,colorSortBy:"errorCount",colorsScrollTop:0},Ge=Object.keys(d);async function Mt(){try{await Promise.all(Ge.map(async t=>{d[t]=await nt(t,d[t])})),(!Array.isArray(d.ccFreeKeys)||d.ccFreeKeys.length===0)&&(d.ccFreeKeys=be.slice()),Array.isArray(d.ccPaidKeys)||(d.ccPaidKeys=Ue.slice()),(!Number.isFinite(d.ccZoom)||d.ccZoom<=0)&&(d.ccZoom=1),typeof d.ccRealtime!="boolean"&&(d.ccRealtime=!1)}catch(t){console.error("Hail's OP: Failed to load config",t)}}async function E(t=Ge){try{await Promise.all(t.map(o=>rt(o,d[o])))}catch(o){console.error("Hail's OP: Failed to save config",o)}}function kt(){const t=document.createElement("style");t.textContent=`
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
    `,document.head.appendChild(t)}function Ct(){if(document.getElementById("overlay-pro-panel"))return;const t=document.createElement("div");t.id="overlay-pro-panel";const r=Math.max(12,window.innerWidth-340-80);t.style.left=(Number.isFinite(d.panelX)?d.panelX:r)+"px",t.style.top=(Number.isFinite(d.panelY)?d.panelY:120)+"px",t.innerHTML=`
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
    `,document.body.appendChild(t),_t(),Bt(),At(),Dt(t),P()}function X(){return d.overlays.find(t=>t.id===d.activeOverlayId)||null}function Ze(){const t=document.getElementById("op-overlay-list");if(t){t.innerHTML="";for(const o of d.overlays){const r=document.createElement("div");r.className="op-item"+(o.id===d.activeOverlayId?" active":"");const a=o.isLocal?" (local)":o.imageBase64?"":" (no image)";r.innerHTML=`
        <input type="radio" name="op-active" ${o.id===d.activeOverlayId?"checked":""} title="Set active"/>
        <input type="checkbox" ${o.enabled?"checked":""} title="Toggle enabled"/>
        <div class="op-item-name" title="${(o.name||"(unnamed)")+a}">${(o.name||"(unnamed)")+a}</div>
        <button class="op-icon-btn" title="Delete overlay">\u{1F5D1}\uFE0F</button>
      `;const[n,i,s,l]=r.children;n.addEventListener("change",async()=>{const p=d.activeOverlayId!==o.id;d.activeOverlayId=o.id,await E(["activeOverlayId"]),P(),p&&await j(!1)}),i.addEventListener("change",()=>{o.enabled=i.checked,E(["overlays"]),B(),K()}),s.addEventListener("click",async()=>{const p=d.activeOverlayId!==o.id;d.activeOverlayId=o.id,await E(["activeOverlayId"]),P(),p&&await j(!1)}),l.addEventListener("click",async p=>{if(p.stopPropagation(),!confirm(`Delete overlay "${o.name||"(unnamed)"}"?`))return;const v=d.overlays.findIndex(m=>m.id===o.id);if(v>=0){const m=d.activeOverlayId===o.id;d.overlays.splice(v,1),m&&(d.activeOverlayId=d.overlays[0]?.id||null),await E(["overlays","activeOverlayId"]),B(),K(),P(),m&&await j()}}),t.appendChild(r)}}}async function Et(){const t=Ae("Overlay"),o={id:We(),name:t,enabled:!0,imageUrl:null,imageBase64:null,isLocal:!1,pixelUrl:null,offsetX:0,offsetY:0,opacity:.7,visibleColorKeys:[]};return d.overlays.push(o),d.activeOverlayId=o.id,await E(["overlays","activeOverlayId"]),B(),K(),P(),await j(),o}async function It(t,o){const r=await Ne(o);t.imageUrl=o,t.imageBase64=r,t.isLocal=!1,await E(["overlays"]),B(),d.autoCapturePixelUrl=!0,await E(["autoCapturePixelUrl"]),K(),P(),await j(),D("Image loaded. Placement mode ON -- click once to set anchor.")}async function je(t,o){if(!o||!o.type||!o.type.startsWith("image/")){alert("Please choose an image file.");return}if(!confirm("Local PNGs cannot be exported to friends! Are you sure?"))return;const r=await st(o);t.imageBase64=r,t.imageUrl=null,t.isLocal=!0,await E(["overlays"]),B(),d.autoCapturePixelUrl=!0,await E(["autoCapturePixelUrl"]),K(),P(),await j(),D("Local image loaded. Placement mode ON -- click once to set anchor.")}async function Lt(t){let o;try{o=JSON.parse(t)}catch{alert("Invalid JSON");return}const r=Array.isArray(o)?o:[o];let a=0,n=0;for(const i of r){const s=Ae(i.name||"Imported Overlay"),l=i.imageUrl,p=i.pixelUrl??null,v=Number.isFinite(i.offsetX)?i.offsetX:0,m=Number.isFinite(i.offsetY)?i.offsetY:0,b=Number.isFinite(i.opacity)?i.opacity:.7;if(!l){n++;continue}try{const x=await Ne(l),g={id:We(),name:s,enabled:!0,imageUrl:l,imageBase64:x,isLocal:!1,pixelUrl:p,offsetX:v,offsetY:m,opacity:b,visibleColorKeys:[]};d.overlays.push(g),a++}catch(x){console.error("Import failed for",l,x),n++}}a>0&&(d.activeOverlayId=d.overlays[d.overlays.length-1].id,await E(["overlays","activeOverlayId"]),B(),K(),P(),await j()),alert(`Import finished. Imported: ${a}${n?`, Failed: ${n}`:""}`)}function St(){const t=X();if(!t){alert("No active overlay selected.");return}if(t.isLocal||!t.imageUrl){alert("This overlay uses a local image and cannot be exported. Please host the image and set an image URL.");return}const o={version:1,name:t.name,imageUrl:t.imageUrl,pixelUrl:t.pixelUrl??null,offsetX:t.offsetX,offsetY:t.offsetY,opacity:t.opacity},r=JSON.stringify(o,null,2);Oe(r).then(()=>alert("Overlay JSON copied to clipboard!")).catch(()=>{prompt("Copy the JSON below:",r)})}function Oe(t){return navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(t):Promise.reject(new Error("Clipboard API not available"))}let Je;function $t(){clearTimeout(Je),Je=setTimeout(()=>{E(["colorsScrollTop"])},250)}function At(){const t=n=>document.getElementById(n);t("op-theme-toggle").addEventListener("click",async n=>{n.stopPropagation(),d.theme=d.theme==="light"?"dark":"light",await E(["theme"]),_e()}),t("op-refresh-btn").addEventListener("click",n=>{n.stopPropagation(),location.reload()}),t("op-mode-select").addEventListener("change",n=>{d.overlayMode=n.target.value,E(["overlayMode"]),K(),P()}),t("op-autocap-toggle").addEventListener("click",()=>{d.autoCapturePixelUrl=!d.autoCapturePixelUrl,E(["autoCapturePixelUrl"]),K(),P()}),t("op-highlight-toggle").addEventListener("change",async n=>{d.highlightPixels=n.target.checked,await E(["highlightPixels"]),B()}),t("op-add-overlay").addEventListener("click",async()=>{try{await Et()}catch(n){console.error(n)}}),t("op-import-overlay").addEventListener("click",async()=>{const n=prompt("Paste overlay JSON (single or array):");n&&await Lt(n)}),t("op-export-overlay").addEventListener("click",()=>St()),t("op-collapse-list").addEventListener("click",()=>{d.collapseList=!d.collapseList,E(["collapseList"]),P()}),t("op-collapse-editor").addEventListener("click",()=>{d.collapseEditor=!d.collapseEditor,E(["collapseEditor"]),P()}),t("op-collapse-nudge").addEventListener("click",()=>{d.collapseNudge=!d.collapseNudge,E(["collapseNudge"]),P()}),t("op-collapse-colors").addEventListener("click",()=>{d.collapseColors=!d.collapseColors,E(["collapseColors"]),P()}),t("op-colors-refresh").addEventListener("click",async()=>{he.clear(),await j()}),t("op-color-sort-select").addEventListener("change",async n=>{d.colorSortBy=n.target.value,await E(["colorSortBy"]),await j(!1)}),t("op-colors-all").addEventListener("click",async()=>{const n=X();if(!n)return;n.visibleColorKeys=null,await E(["overlays"]),B(),document.getElementById("op-colors-list").querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!0})}),t("op-colors-none").addEventListener("click",async()=>{const n=X();if(!n)return;n.visibleColorKeys=[],await E(["overlays"]),B(),document.getElementById("op-colors-list").querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1})}),t("op-colors-free").addEventListener("click",async()=>{const n=X();if(!n)return;const i=te.map(p=>p.key),s=new Set($e.map(([p,v,m])=>`${p},${v},${m}`));n.visibleColorKeys=i.filter(p=>s.has(p)),await E(["overlays"]),B(),document.getElementById("op-colors-list").querySelectorAll('input[type="checkbox"]').forEach(p=>{p.checked=s.has(p.dataset.key)})}),t("op-colors-paid").addEventListener("click",async()=>{const n=X();if(!n)return;const i=te.map(p=>p.key),s=new Set(ee.map(([p,v,m])=>`${p},${v},${m}`));n.visibleColorKeys=i.filter(p=>s.has(p)),await E(["overlays"]),B(),document.getElementById("op-colors-list").querySelectorAll('input[type="checkbox"]').forEach(p=>{p.checked=s.has(p.dataset.key)})}),t("op-colors-copy").addEventListener("click",()=>{if(!X())return;const i="Color,type,wrongEmpty,wrongDiff,wrong,correct,total";if(!te||te.length===0){Oe(i).then(()=>D("No color data to copy.")).catch(()=>D("Failed to copy."));return}const s=new Set(ee.map(([v,m,b])=>`${v},${m},${b}`)),l=te.map(v=>{const{key:m,name:b,totalCount:x,belowCount:g,smartCount:M,errorCount:C,correctCount:f}=v,y=s.has(m)?"P":"F";return`${b},${y},${g},${M},${C},${f},${x}`}),p=[i,...l].join(`
`);Oe(p).then(()=>D("Color data copied to clipboard!")).catch(()=>D("Failed to copy color data."))}),t("op-name").addEventListener("change",async n=>{const i=X();if(!i)return;const s=(n.target.value||"").trim()||"Overlay";d.overlays.some(l=>l.id!==i.id&&(l.name||"").toLowerCase()===s.toLowerCase())?(i.name=Ae(s),D(`Name in use. Renamed to "${i.name}".`)):i.name=s,await E(["overlays"]),Ze()}),t("op-fetch").addEventListener("click",async()=>{const n=X();if(!n){alert("No active overlay selected.");return}if(n.imageBase64){alert("This overlay already has an image. Create a new overlay to change the image.");return}const i=t("op-image-url").value.trim();if(!i){alert("Enter an image link first.");return}try{await It(n,i)}catch(s){console.error(s),alert("Failed to fetch image.")}});const o=t("op-dropzone");o.addEventListener("click",()=>t("op-file-input").click()),t("op-file-input").addEventListener("change",async n=>{const i=n.target.files&&n.target.files[0];if(n.target.value="",!i)return;const s=X();if(s){if(s.imageBase64){alert("This overlay already has an image. Create a new overlay to change the image.");return}try{await je(s,i)}catch(l){console.error(l),alert("Failed to load local image.")}}}),["dragenter","dragover"].forEach(n=>o.addEventListener(n,i=>{i.preventDefault(),i.stopPropagation(),o.classList.add("drop-highlight")})),["dragleave","drop"].forEach(n=>o.addEventListener(n,i=>{i.preventDefault(),i.stopPropagation(),!(n==="dragleave"&&i.target!==o)&&o.classList.remove("drop-highlight")})),o.addEventListener("drop",async n=>{const i=n.dataTransfer;if(!i)return;const s=i.files&&i.files[0];if(!s)return;const l=X();if(l){if(l.imageBase64){alert("This overlay already has an image. Create a new overlay to change the image.");return}try{await je(l,s)}catch(p){console.error(p),alert("Failed to load dropped image.")}}});const r=async(n,i)=>{const s=X();s&&(s.offsetX+=n,s.offsetY+=i,await E(["overlays"]),B(),P())};t("op-nudge-up").addEventListener("click",()=>r(0,-1)),t("op-nudge-down").addEventListener("click",()=>r(0,1)),t("op-nudge-left").addEventListener("click",()=>r(-1,0)),t("op-nudge-right").addEventListener("click",()=>r(1,0)),t("op-opacity-slider").addEventListener("input",n=>{const i=X();i&&(i.opacity=parseFloat(n.target.value),document.getElementById("op-opacity-value").textContent=Math.round(i.opacity*100)+"%")}),t("op-opacity-slider").addEventListener("change",async()=>{await E(["overlays"]),B()}),t("op-download-overlay").addEventListener("click",()=>{const n=X();if(!n||!n.imageBase64){D("No overlay image to download.");return}const i=document.createElement("a");i.href=n.imageBase64,i.download=`${(n.name||"overlay").replace(/[^\w.-]+/g,"_")}.png`,document.body.appendChild(i),i.click(),i.remove()}),t("op-open-cc").addEventListener("click",()=>{const n=X();if(!n||!n.imageBase64){D("No overlay image to edit.");return}Yt(n)});const a=t("op-open-resize");a&&a.addEventListener("click",()=>{const n=X();if(!n||!n.imageBase64){D("No overlay image to resize.");return}Ft(n)}),window.addEventListener("resize",()=>{}),t("op-colors-list").addEventListener("scroll",()=>{const n=t("op-colors-list");n&&(d.colorsScrollTop=n.scrollTop,$t())})}function Dt(t){const o=t.querySelector("#op-header"),r=t.querySelector("#op-panel-toggle");if(!o||!r)return;let a=!1,n=0,i=0,s=0,l=0,p=!1;const v=(g,M,C)=>Math.min(Math.max(g,M),C),m=g=>{const M=t.classList.contains("collapsed"),C=M?r:o;if(M){if(g.target!==r)return}else if(!g.target.closest("#op-header")||g.target.closest("button"))return;a=!0,p=!1,n=g.clientX,i=g.clientY;const f=t.getBoundingClientRect();s=f.left,l=f.top,C.setPointerCapture?.(g.pointerId),g.preventDefault()},b=g=>{if(!a)return;const M=g.clientX-n,C=g.clientY-i,f=Math.max(8,window.innerWidth-t.offsetWidth-8),y=Math.max(8,window.innerHeight-t.offsetHeight-8);t.style.left=v(s+M,8,f)+"px",t.style.top=v(l+C,8,y)+"px",p=!0},x=g=>{if(!a)return;const C=t.classList.contains("collapsed")?r:o;a=!1,C.releasePointerCapture?.(g.pointerId),p&&(d.panelX=parseInt(t.style.left,10)||0,d.panelY=parseInt(t.style.top,10)||0,E(["panelX","panelY"]))};t.addEventListener("pointerdown",m),t.addEventListener("pointermove",b),t.addEventListener("pointerup",x),t.addEventListener("pointercancel",x),window.addEventListener("resize",()=>{const g=t.getBoundingClientRect(),M=Math.max(8,window.innerWidth-t.offsetWidth-8),C=Math.max(8,window.innerHeight-t.offsetHeight-8),f=Math.min(Math.max(g.left,8),M),y=Math.min(Math.max(g.top,8),C);t.style.left=f+"px",t.style.top=y+"px",d.panelX=f,d.panelY=y,E(["panelX","panelY"])}),r.addEventListener("click",g=>{if(p){g.preventDefault(),g.stopPropagation();return}d.isPanelCollapsed=!d.isPanelCollapsed,E(["isPanelCollapsed"]),P()})}function _e(){document.body.classList.toggle("op-theme-dark",d.theme==="dark"),document.body.classList.toggle("op-theme-light",d.theme!=="dark");const t=document.getElementById("op-toast-stack");t&&t.classList.toggle("op-dark",d.theme==="dark")}function Rt(){const t=b=>document.getElementById(b),o=X(),r=t("op-editor-section"),a=t("op-editor-body");if(r.style.display=o?"flex":"none",!o)return;t("op-name").value=o.name||"";const n=t("op-image-source"),i=t("op-preview-wrap"),s=t("op-image-preview"),l=t("op-cc-btn-row");o.imageBase64?(n.style.display="none",i.style.display="flex",s.src=o.imageBase64,l.style.display="flex"):(n.style.display="block",i.style.display="none",l.style.display="none",t("op-image-url").value=o.imageUrl||"");const p=o.pixelUrl?me(o.pixelUrl):{chunk1:"-",chunk2:"-",posX:"-",posY:"-"};t("op-coord-display").textContent=o.pixelUrl?`Ref: chunk ${p.chunk1}/${p.chunk2} at (${p.posX}, ${p.posY})`:'No pixel anchor set. Turn ON "Place overlay" and click a pixel once.',t("op-opacity-slider").value=String(o.opacity),t("op-opacity-value").textContent=Math.round(o.opacity*100)+"%";const v=document.getElementById("op-offset-indicator");v&&(v.textContent=`Offset X ${o.offsetX}, Y ${o.offsetY}`),a.style.display=d.collapseEditor?"none":"block";const m=document.getElementById("op-collapse-editor");m&&(m.textContent=d.collapseEditor?"\u25B8":"\u25BE")}async function P(){const t=S=>document.getElementById(S),o=t("overlay-pro-panel");if(!o)return;_e();const r=t("op-content"),a=t("op-panel-toggle"),n=t("op-header"),i=!!d.isPanelCollapsed;o.classList.toggle("collapsed",i),r.style.display=i?"none":"grid",a.classList.toggle("logo-button",i),a.title=i?"Expand":"Collapse";const s=t("op-mode-select");s&&(s.value=d.overlayMode);const l=t("op-autocap-toggle"),p=t("op-place-label");l.textContent=d.autoCapturePixelUrl?"ON":"OFF",l.classList.toggle("op-danger",!!d.autoCapturePixelUrl),p.classList.toggle("op-danger-text",!!d.autoCapturePixelUrl);const v=t("op-highlight-toggle");v&&(v.checked=!!d.highlightPixels);const m=t("op-list-wrap"),b=t("op-collapse-list");m.style.display=d.collapseList?"none":"block",b&&(b.textContent=d.collapseList?"\u25B8":"\u25BE");const x=t("op-nudge-body"),g=t("op-collapse-nudge");x.style.display=d.collapseNudge?"none":"block",g&&(g.textContent=d.collapseNudge?"\u25B8":"\u25BE");const M=t("op-colors-body"),C=t("op-collapse-colors");M&&(M.style.display=d.collapseColors?"none":"block"),C&&(C.textContent=d.collapseColors?"\u25B8":"\u25BE");const f=t("op-color-sort-select");f&&(f.value=d.colorSortBy||"errorCount"),Ze(),Rt();const y=t("op-export-overlay"),k=X(),I=!!(k&&k.imageUrl&&!k.isLocal);y.disabled=!I,y.title=I?"Export active overlay JSON":"Export disabled for local images"}const Ye=new Map;let te=[];async function Pe(t){if(!t||!t.imageBase64)return{};const o=t.imageBase64.slice(0,64)+":"+t.imageBase64.length;if(Ye.has(o))return Ye.get(o);const r=await le(t.imageBase64),n=N(r.width,r.height).getContext("2d",{willReadFrequently:!0});n.drawImage(r,0,0);const s=n.getImageData(0,0,r.width,r.height).data,l={};for(let p=0;p<s.length;p+=4)if(s[p+3]>0){const v=`${s[p]},${s[p+1]},${s[p+2]}`;l[v]=(l[v]||0)+1}return Ye.set(o,l),l}async function Ot(t){if(!t||!t.imageBase64||!t.pixelUrl)return null;const o=Re(t),r=Array.from(ve.keys()).sort().join(";"),a=`${t.id}|${o}|${r}`;if(he.has(a))return he.get(a);const n=await le(t.imageBase64),i=n.width,s=n.height,p=N(i,s).getContext("2d",{willReadFrequently:!0});p.drawImage(n,0,0);const m=p.getImageData(0,0,i,s).data,b=me(t.pixelUrl);if(!Number.isFinite(b.chunk1)||!Number.isFinite(b.chunk2))return null;const x={};for(let g=0;g<s;g++)for(let M=0;M<i;M++){const C=(g*i+M)*4;if(m[C+3]===0)continue;const f=m[C],y=m[C+1],k=m[C+2],I=`${f},${y},${k}`;x[I]||(x[I]={smart:0,below:0});const S=b.chunk1*1e3+b.posX+t.offsetX+M,L=b.chunk2*1e3+b.posY+t.offsetY+g,$=Math.floor(S/1e3),O=Math.floor(L/1e3),G=`${$},${O}`;if(ve.has(G)){const F=ve.get(G),z=F.data,V=F.width,u=(S%1e3+1e3)%1e3,w=((L%1e3+1e3)%1e3*V+u)*4,A=z[w],R=z[w+1],Y=z[w+2];z[w+3]===0?x[I].below++:(f!==A||y!==R||k!==Y)&&x[I].smart++}}return he.set(a,x),x}async function j(t=!0){const o=ze(),r=X(),a=document.getElementById("op-colors-section");if(!a)return;if(!r||!r.imageBase64){a.style.display="none",te=[];return}a.style.display="flex";const n=document.getElementById("op-colors-list");let i;if(t){n.innerHTML='<div class="op-muted" style="text-align:center; padding: 12px 0;">Loading...</div>';const f=await Pe(r),y=await Ot(r)||{};i=Object.entries(f).map(([k,I])=>{const S=y[k]?.below||0,L=y[k]?.smart||0,$=S+L,O=I-$;return{key:k,name:pe[k]||k,totalCount:I,belowCount:S,smartCount:L,errorCount:$,correctCount:O}}),ke.set(r.id,i),te=i}else{if(ke.has(r.id))i=ke.get(r.id);else{const f=await Pe(r);i=Object.entries(f).map(([y,k])=>({key:y,name:pe[y]||y,totalCount:k,belowCount:0,smartCount:0,errorCount:0,correctCount:k}))}te=i}const s=d.colorSortBy||"errorCount";i=[...i].sort((f,y)=>y[s]===f[s]?y.totalCount-f.totalCount:y[s]-f[s]);let p;r.visibleColorKeys===null||r.visibleColorKeys===void 0?p=new Set(i.map(f=>f.key)):p=new Set(r.visibleColorKeys);const v=i.reduce((f,y)=>f+y.correctCount,0),m=i.reduce((f,y)=>f+y.errorCount,0),b=i.reduce((f,y)=>f+y.totalCount,0),x=document.getElementById("op-total-correct"),g=document.getElementById("op-total-wrong"),M=document.getElementById("op-total-pixels");x&&(x.textContent=v.toLocaleString()),g&&(g.textContent=m.toLocaleString()),M&&(M.textContent=b.toLocaleString());const C=new Set(ee.map(([f,y,k])=>`${f},${y},${k}`));if(n.innerHTML="",i.length===0){n.innerHTML='<div class="op-muted" style="text-align:center; padding: 12px 0;">No colors found.</div>';return}for(const f of i){const{key:y,name:k,totalCount:I,belowCount:S,smartCount:L,errorCount:$,correctCount:O}=f,G=C.has(y),F=document.createElement("div");F.className="op-dist-item"+(G?" premium":""),F.title=`${k} (${y}): ${I} pixels`;const z=`<span style="color: lime;">${O}</span>/<span style="color: cyan;">${S}</span>/<span style="color: pink;">${L}</span>/<span style="color: red;">${$}</span>/${I}`;F.innerHTML=`
            <input type="checkbox" data-key="${y}" ${p.has(y)?"checked":""} style="margin-right: 4px;">
            <div class="op-color-list-swatch" style="background-color: rgb(${y});"></div>
            <div class="op-color-list-name">${k}</div>
            <div class="op-color-list-count">${z}</div>
        `;const V=F.querySelector(".op-color-list-name");V&&o.has(y)&&(V.style.color="red"),n.appendChild(F)}n.querySelectorAll('input[type="checkbox"]').forEach(f=>{f.addEventListener("change",async()=>{const y=f.dataset.key,k=X();if(!k)return;if(k.visibleColorKeys===null){const S=Object.keys(await Pe(k));k.visibleColorKeys=S}const I=new Set(k.visibleColorKeys);f.checked?I.add(y):I.delete(y),k.visibleColorKeys=Array.from(I),await E(["overlays"]),B()})}),Number.isFinite(d.colorsScrollTop)&&(n.scrollTop=d.colorsScrollTop)}let c=null;function _t(){const t=document.createElement("div");t.className="op-cc-backdrop",t.id="op-cc-backdrop",document.body.appendChild(t);const o=document.createElement("div");o.className="op-cc-modal",o.id="op-cc-modal",o.style.display="none",o.innerHTML=`
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
    `,document.body.appendChild(o),o.querySelector("#op-cc-close").addEventListener("click",Ee),t.addEventListener("click",Ee),o.querySelector("#op-cc-cancel").addEventListener("click",Ee),c={backdrop:t,modal:o,previewCanvas:o.querySelector("#op-cc-preview"),previewCtx:o.querySelector("#op-cc-preview").getContext("2d",{willReadFrequently:!0}),sourceCanvas:null,sourceCtx:null,sourceImageData:null,processedCanvas:null,processedCtx:null,freeGrid:o.querySelector("#op-cc-free-grid"),paidGrid:o.querySelector("#op-cc-paid-grid"),freeToggle:o.querySelector("#op-cc-free-toggle"),paidToggle:o.querySelector("#op-cc-paid-toggle"),meta:o.querySelector("#op-cc-meta"),applyBtn:o.querySelector("#op-cc-apply"),recalcBtn:o.querySelector("#op-cc-recalc"),realtimeBtn:o.querySelector("#op-cc-realtime"),zoom:1,selectedFree:new Set(d.ccFreeKeys),selectedPaid:new Set(d.ccPaidKeys),realtime:!!d.ccRealtime,overlay:null,lastColorCounts:{},isStale:!1},c.realtimeBtn.addEventListener("click",async()=>{c.realtime=!c.realtime,c.realtimeBtn.textContent=`Realtime: ${c.realtime?"ON":"OFF"}`,c.realtimeBtn.classList.toggle("op-danger",c.realtime),d.ccRealtime=c.realtime,await E(["ccRealtime"]),c.realtime&&c.isStale&&i()});const r=async()=>{c.zoom=Math.min(8,(c.zoom||1)*1.25),d.ccZoom=c.zoom,await E(["ccZoom"]),oe(),ae()},a=async()=>{c.zoom=Math.max(.1,(c.zoom||1)/1.25),d.ccZoom=c.zoom,await E(["ccZoom"]),oe(),ae()};o.querySelector("#op-cc-zoom-in").addEventListener("click",r),o.querySelector("#op-cc-zoom-out").addEventListener("click",a),c.recalcBtn.addEventListener("click",()=>{i()}),c.applyBtn.addEventListener("click",async()=>{const s=c.overlay;if(!s)return;if(Qe().length===0){D("Select at least one color.");return}if(c.isStale&&i(),!c.processedCanvas){D("Nothing to apply.");return}if(c.processedCanvas.width>=1e3||c.processedCanvas.height>=1e3){D("Image too large to apply (must be < 1000\xD71000).");return}const p=c.processedCanvas.toDataURL("image/png");s.imageBase64=p,s.imageUrl=null,s.isLocal=!0,await E(["overlays"]),B(),K(),P();const v=Object.keys(c.lastColorCounts).length;D(`Overlay updated (${c.processedCanvas.width}\xD7${c.processedCanvas.height}, ${v} colors).`),Ee()}),Xt(),c.freeToggle.addEventListener("click",async()=>{const s=tt();at("free",!s),d.ccFreeKeys=Array.from(c.selectedFree),await E(["ccFreeKeys"]),c.realtime?i():n(),oe(),ae(),fe()}),c.paidToggle.addEventListener("click",async()=>{const s=ot();at("paid",!s),d.ccPaidKeys=Array.from(c.selectedPaid),await E(["ccPaidKeys"]),c.realtime?i():n(),oe(),ae(),fe()});function n(){c.isStale=!0,c.meta.textContent=c.meta.textContent.replace(/ \| Status: .+$/,"")+" | Status: pending recalculation"}function i(){Ie(),c.isStale=!1,oe(),ae(),et()}}function Yt(t){if(!c)return;c.overlay=t,document.body.classList.add("op-scroll-lock"),c.zoom=Number(d.ccZoom)||1,c.realtime=!!d.ccRealtime,c.realtimeBtn.textContent=`Realtime: ${c.realtime?"ON":"OFF"}`,c.realtimeBtn.classList.toggle("op-danger",c.realtime);const o=new Image;o.onload=()=>{c.sourceCanvas||(c.sourceCanvas=document.createElement("canvas"),c.sourceCtx=c.sourceCanvas.getContext("2d",{willReadFrequently:!0})),c.sourceCanvas.width=o.width,c.sourceCanvas.height=o.height,c.sourceCtx.clearRect(0,0,o.width,o.height),c.sourceCtx.drawImage(o,0,0),c.sourceImageData=c.sourceCtx.getImageData(0,0,o.width,o.height),c.processedCanvas||(c.processedCanvas=document.createElement("canvas"),c.processedCtx=c.processedCanvas.getContext("2d")),Ie(),c.isStale=!1,oe(),ae(),et(),c.backdrop.classList.add("show"),c.modal.style.display="flex"},o.src=t.imageBase64}function Ee(){c&&(c.backdrop.classList.remove("show"),c.modal.style.display="none",c.overlay=null,document.body.classList.remove("op-scroll-lock"))}function Pt(t,o,r,a){let n=null,i=1/0;for(let s=0;s<a.length;s++){const[l,p,v]=a[s],m=(l+t)/2,b=l-t,x=p-o,g=v-r,M=(512+m)*b*b>>8,C=4*x*x,f=(767-m)*g*g>>8,y=M+C+f;y<i&&(i=y,n=[l,p,v])}return n||[0,0,0]}function Qe(){const t=[];return c.selectedFree.forEach(o=>{const[r,a,n]=o.split(",").map(i=>parseInt(i,10));Number.isFinite(r)&&t.push([r,a,n])}),c.selectedPaid.forEach(o=>{const[r,a,n]=o.split(",").map(i=>parseInt(i,10));Number.isFinite(r)&&t.push([r,a,n])}),t}function Ie(){if(!c.sourceImageData)return;const t=c.sourceImageData.width,o=c.sourceImageData.height,r=c.sourceImageData.data,a=new Uint8ClampedArray(r.length),n=Qe(),i={};for(let l=0;l<r.length;l+=4){const p=r[l],v=r[l+1],m=r[l+2];if(r[l+3]===0){a[l]=0,a[l+1]=0,a[l+2]=0,a[l+3]=0;continue}const[x,g,M]=n.length?Pt(p,v,m,n):[p,v,m];a[l]=x,a[l+1]=g,a[l+2]=M,a[l+3]=255;const C=`${x},${g},${M}`;i[C]=(i[C]||0)+1}c.processedCanvas||(c.processedCanvas=document.createElement("canvas"),c.processedCtx=c.processedCanvas.getContext("2d")),c.processedCanvas.width=t,c.processedCanvas.height=o;const s=new ImageData(a,t,o);c.processedCtx.putImageData(s,0,0),c.lastColorCounts=i}function oe(){const t=Number(c.zoom)||1,o=c.processedCanvas;if(!o)return;const r=Math.max(1,Math.round(o.width*t)),a=Math.max(1,Math.round(o.height*t));c.previewCanvas.width=r,c.previewCanvas.height=a;const n=c.previewCtx;n.clearRect(0,0,r,a),n.imageSmoothingEnabled=!1,n.drawImage(o,0,0,o.width,o.height,0,0,r,a),n.imageSmoothingEnabled=!0}function ae(){if(!c.sourceImageData){c.meta.textContent="";return}const t=c.sourceImageData.width,o=c.sourceImageData.height,r=Object.keys(c.lastColorCounts||{}).length,a=c.isStale?"pending recalculation":"up to date";c.meta.textContent=`Size: ${t}\xD7${o} | Zoom: ${c.zoom.toFixed(2)}\xD7 | Colors: ${r} | Status: ${a}`}function et(){if(!c||!c.lastColorCounts)return;const t=document.getElementById("op-cc-color-list");if(!t)return;const o=ze(),r=c.lastColorCounts,a=Object.entries(r).sort(([,i],[,s])=>s-i),n=new Set(ee.map(([i,s,l])=>`${i},${s},${l}`));if(t.innerHTML="",a.length===0){t.innerHTML='<div class="op-muted" style="text-align:center; padding: 12px 0;">No colors in image.</div>';return}for(const[i,s]of a){const l=n.has(i),p=pe[i]||i,v=document.createElement("div");v.className="op-color-list-item"+(l?" premium":""),v.title=`${p} (${i}): ${s} pixels`,v.innerHTML=`
        <div class="op-color-list-swatch" style="background-color: rgb(${i});"></div>
        <div class="op-color-list-name">${p}</div>
        <div class="op-color-list-count">${s}</div>
      `;const m=v.querySelector(".op-color-list-name");m&&o.has(i)&&(m.style.color="red"),t.appendChild(v)}}function Xt(){c.freeGrid.innerHTML="",c.paidGrid.innerHTML="";for(const[t,o,r]of $e){const a=`${t},${o},${r}`,n=document.createElement("div");n.className="op-cc-cell",n.style.background=`rgb(${t},${o},${r})`,n.title=pe[a]||a,n.dataset.key=a,n.dataset.type="free",c.selectedFree.has(a)&&n.classList.add("active"),n.addEventListener("click",async()=>{c.selectedFree.has(a)?c.selectedFree.delete(a):c.selectedFree.add(a),n.classList.toggle("active",c.selectedFree.has(a)),d.ccFreeKeys=Array.from(c.selectedFree),await E(["ccFreeKeys"]),c.realtime?Ie():c.isStale=!0,oe(),ae(),fe()}),c.freeGrid.appendChild(n)}for(const[t,o,r]of ee){const a=`${t},${o},${r}`,n=document.createElement("div");n.className="op-cc-cell",n.style.background=`rgb(${t},${o},${r})`,n.title=pe[a]||a,n.dataset.key=a,n.dataset.type="paid",c.selectedPaid.has(a)&&n.classList.add("active"),n.addEventListener("click",async()=>{c.selectedPaid.has(a)?c.selectedPaid.delete(a):c.selectedPaid.add(a),n.classList.toggle("active",c.selectedPaid.has(a)),d.ccPaidKeys=Array.from(c.selectedPaid),await E(["ccPaidKeys"]),c.realtime?Ie():c.isStale=!0,oe(),ae(),fe()}),c.paidGrid.appendChild(n)}fe()}function fe(){c.freeToggle.textContent=tt()?"Unselect All":"Select All",c.paidToggle.textContent=ot()?"Unselect All":"Select All"}function tt(){return be.every(t=>c.selectedFree.has(t))}function ot(){const t=ee.map(([o,r,a])=>`${o},${r},${a}`);return t.every(o=>c.selectedPaid.has(o))&&t.length>0}function at(t,o){if(t==="free")o?be.forEach(a=>c.selectedFree.add(a)):c.selectedFree.clear(),c.freeGrid.querySelectorAll(".op-cc-cell").forEach(a=>a.classList.toggle("active",o));else{const r=ee.map(([a,n,i])=>`${a},${n},${i}`);o?r.forEach(a=>c.selectedPaid.add(a)):c.selectedPaid.clear(),c.paidGrid.querySelectorAll(".op-cc-cell").forEach(a=>a.classList.toggle("active",o))}}let e=null;function Bt(){const t=document.createElement("div");t.className="op-rs-backdrop",t.id="op-rs-backdrop",document.body.appendChild(t);const o=document.createElement("div");o.className="op-rs-modal",o.id="op-rs-modal",o.style.display="none",o.innerHTML=`
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
    `,document.body.appendChild(o);const r={backdrop:t,modal:o,tabSimple:o.querySelector("#op-rs-tab-simple"),tabAdvanced:o.querySelector("#op-rs-tab-advanced"),paneSimple:o.querySelector("#op-rs-pane-simple"),paneAdvanced:o.querySelector("#op-rs-pane-advanced"),orig:o.querySelector("#op-rs-orig"),w:o.querySelector("#op-rs-w"),h:o.querySelector("#op-rs-h"),lock:o.querySelector("#op-rs-lock"),note:o.querySelector("#op-rs-note"),onex:o.querySelector("#op-rs-onex"),half:o.querySelector("#op-rs-half"),third:o.querySelector("#op-rs-third"),quarter:o.querySelector("#op-rs-quarter"),double:o.querySelector("#op-rs-double"),scale:o.querySelector("#op-rs-scale"),applyScale:o.querySelector("#op-rs-apply-scale"),simWrap:o.querySelector("#op-rs-sim-wrap"),simOrig:o.querySelector("#op-rs-sim-orig"),simNew:o.querySelector("#op-rs-sim-new"),colLeft:o.querySelector("#op-rs-col-left"),colRight:o.querySelector("#op-rs-col-right"),advWrap:o.querySelector("#op-rs-adv-wrap"),preview:o.querySelector("#op-rs-preview"),meta:o.querySelector("#op-rs-meta"),zoomIn:o.querySelector("#op-rs-zoom-in"),zoomOut:o.querySelector("#op-rs-zoom-out"),multRange:o.querySelector("#op-rs-mult-range"),multInput:o.querySelector("#op-rs-mult-input"),bind:o.querySelector("#op-rs-bind"),blockW:o.querySelector("#op-rs-blockw"),blockH:o.querySelector("#op-rs-blockh"),offX:o.querySelector("#op-rs-offx"),offY:o.querySelector("#op-rs-offy"),dotR:o.querySelector("#op-rs-dotr"),dotRVal:o.querySelector("#op-rs-dotr-val"),gridToggle:o.querySelector("#op-rs-grid"),advNote:o.querySelector("#op-rs-adv-note"),resWrap:o.querySelector("#op-rs-adv-result-wrap"),resCanvas:o.querySelector("#op-rs-adv-result"),resMeta:o.querySelector("#op-rs-adv-resmeta"),calcBtn:o.querySelector("#op-rs-calc"),applyBtn:o.querySelector("#op-rs-apply"),cancelBtn:o.querySelector("#op-rs-cancel"),closeBtn:o.querySelector("#op-rs-close")},a=r.preview.getContext("2d",{willReadFrequently:!0}),n=r.simOrig.getContext("2d",{willReadFrequently:!0}),i=r.simNew.getContext("2d",{willReadFrequently:!0}),s=r.resCanvas.getContext("2d",{willReadFrequently:!0});e={...r,ov:null,img:null,origW:0,origH:0,mode:"simple",zoom:1,updating:!1,mult:4,gapX:4,gapY:4,offx:0,offy:0,dotr:1,viewX:0,viewY:0,panning:!1,panStart:null,calcCanvas:null,calcCols:0,calcRows:0,calcReady:!1};const l=()=>{const u=parseInt(e.w.value||"0",10),h=parseInt(e.h.value||"0",10),w=Number.isFinite(u)&&Number.isFinite(h)&&u>0&&h>0,A=u>=1e3||h>=1e3;return w?A?`Target: ${u}\xD7${h} (exceeds limit: must be < 1000\xD71000)`:`Target: ${u}\xD7${h} (OK)`:"Enter positive width and height."},p=()=>{const u=Math.floor((e.origW-e.offx)/e.gapX),h=Math.floor((e.origH-e.offy)/e.gapY);return{cols:Math.max(0,u),rows:Math.max(0,h)}},v=()=>{const{cols:u,rows:h}=p(),w=u>=1e3||h>=1e3;return u>0&&h>0?`Samples: ${u} \xD7 ${h} | Output: ${u}\xD7${h}${w?" (exceeds limit: < 1000\xD71000)":""}`:"Adjust multiplier/offset until dots sit at centers."},m=()=>{e.meta.textContent=e.mode==="advanced"?v():l()},b=()=>{const u=parseInt(e.w.value||"0",10),h=parseInt(e.h.value||"0",10),w=Number.isFinite(u)&&Number.isFinite(h)&&u>0&&h>0,A=u>=1e3||h>=1e3,R=w?A?`Target: ${u}\xD7${h} (exceeds limit: must be < 1000\xD71000)`:`Target: ${u}\xD7${h} (OK)`:"Enter positive width and height.";e.note&&(e.note.textContent=R),e.mode==="simple"&&(e.applyBtn.disabled=!w||A),e.mode==="simple"&&(e.meta.textContent=R)};function x(u){const h=Math.max(1,Math.round(e.origW*u)),w=Math.max(1,Math.round(e.origH*u));e.updating=!0,e.w.value=h,e.h.value=e.lock.checked?Math.max(1,Math.round(h*e.origH/e.origW)):w,e.updating=!1,b()}function g(){if(!e.img)return;const u=e.colLeft.querySelector(".pad-top").offsetHeight,h=e.colRight.querySelector(".pad-top").offsetHeight,w=e.colLeft.clientWidth,A=e.colRight.clientWidth,R=e.colLeft.clientHeight-u,Y=e.colRight.clientHeight-h;e.simOrig.width=w,e.simOrig.height=R,e.simNew.width=A,e.simNew.height=Y,n.save(),n.imageSmoothingEnabled=!1,n.clearRect(0,0,w,R);const W=Math.min(w/e.origW,R/e.origH),T=Math.max(1,Math.floor(e.origW*W)),_=Math.max(1,Math.floor(e.origH*W)),J=Math.floor((w-T)/2),ne=Math.floor((R-_)/2);n.drawImage(e.img,0,0,e.origW,e.origH,J,ne,T,_),n.restore();const U=parseInt(e.w.value||"0",10),H=parseInt(e.h.value||"0",10);if(i.save(),i.imageSmoothingEnabled=!1,i.clearRect(0,0,A,Y),Number.isFinite(U)&&Number.isFinite(H)&&U>0&&H>0){const ie=N(U,H),q=ie.getContext("2d",{willReadFrequently:!0});q.imageSmoothingEnabled=!1,q.clearRect(0,0,U,H),q.drawImage(e.img,0,0,e.origW,e.origH,0,0,U,H);const re=q.getImageData(0,0,U,H),Z=re.data;for(let de=0;de<Z.length;de+=4)Z[de+3]!==0&&(Z[de+3]=255);q.putImageData(re,0,0);const Be=Math.min(A/U,Y/H),ce=Math.max(1,Math.floor(U*Be)),Le=Math.max(1,Math.floor(H*Be)),ye=Math.floor((A-ce)/2),Fe=Math.floor((Y-Le)/2);i.drawImage(ie,0,0,U,H,ye,Fe,ce,Le)}else i.drawImage(e.img,0,0,e.origW,e.origH,J,ne,T,_);i.restore()}const M=()=>{e.updating=!0,e.multRange.value=String(e.mult),e.multInput.value=String(e.mult),e.blockW.value=String(e.gapX),e.blockH.value=String(e.gapY),e.offX.value=String(e.offx),e.offY.value=String(e.offy),e.dotR.value=String(e.dotr),e.dotRVal.textContent=String(e.dotr),e.updating=!1};function C(){const{cols:u,rows:h}=p(),w=u>=1e3||h>=1e3;if(e.mode==="advanced")e.applyBtn.disabled=!e.calcReady;else{const A=parseInt(e.w.value||"0",10),R=parseInt(e.h.value||"0",10),Y=Number.isFinite(A)&&Number.isFinite(R)&&A>0&&R>0&&A<1e3&&R<1e3;e.applyBtn.disabled=!Y}m()}function f(){if(e.mode!=="advanced"||!e.img)return;const u=e.origW,h=e.origH,w=Math.max(50,Math.floor(e.advWrap.clientWidth)),A=Math.max(50,Math.floor(e.advWrap.clientHeight));e.preview.width=w,e.preview.height=A;const R=Math.max(1,Math.floor(w/e.zoom)),Y=Math.max(1,Math.floor(A/e.zoom)),W=Math.max(0,u-R),T=Math.max(0,h-Y);if(e.viewX=Math.min(Math.max(0,e.viewX),W),e.viewY=Math.min(Math.max(0,e.viewY),T),a.save(),a.imageSmoothingEnabled=!1,a.clearRect(0,0,w,A),a.drawImage(e.img,e.viewX,e.viewY,R,Y,0,0,w,A),e.gridToggle.checked&&e.gapX>=1&&e.gapY>=1){a.strokeStyle="rgba(255,59,48,0.45)",a.lineWidth=1;const _=Math.ceil((e.viewX-e.offx)/e.gapX),J=Math.floor((e.viewX+R-e.offx)/e.gapX),ne=Math.ceil((e.viewY-e.offy)/e.gapY),U=Math.floor((e.viewY+Y-e.offy)/e.gapY),H=Math.max(0,J-_+1),ie=Math.max(0,U-ne+1);if(H<=4e3&&ie<=4e3){a.beginPath();for(let q=_;q<=J;q++){const re=e.offx+q*e.gapX,Z=Math.round((re-e.viewX)*e.zoom);a.moveTo(Z+.5,0),a.lineTo(Z+.5,A)}for(let q=ne;q<=U;q++){const re=e.offy+q*e.gapY,Z=Math.round((re-e.viewY)*e.zoom);a.moveTo(0,Z+.5),a.lineTo(w,Z+.5)}a.stroke()}}if(e.gapX>=1&&e.gapY>=1){a.fillStyle="#ff3b30";const _=e.offx+Math.floor(e.gapX/2),J=e.offy+Math.floor(e.gapY/2);if(_>=0&&J>=0){const ne=Math.ceil((e.viewX-_)/e.gapX),U=Math.ceil((e.viewY-J)/e.gapY),H=Math.floor((e.viewY+Y-1-J)/e.gapY),ie=Math.floor((e.viewX+R-1-_)/e.gapX),q=e.dotr,re=Math.max(0,ie-ne+1),Z=Math.max(0,H-U+1);if(re*Z<=3e5)for(let ce=U;ce<=H;ce++){const Le=J+ce*e.gapY;for(let ye=ne;ye<=ie;ye++){const Fe=_+ye*e.gapX,de=Math.round((Fe-e.viewX)*e.zoom),Ut=Math.round((Le-e.viewY)*e.zoom);a.beginPath(),a.arc(de,Ut,q,0,Math.PI*2),a.fill()}}}}a.restore()}function y(){const u=e.calcCanvas,h=e.resWrap;if(!h||!u){s.clearRect(0,0,e.resCanvas.width,e.resCanvas.height),e.resMeta.textContent="No result. Click Calculate.";return}const w=u.width,A=u.height,R=Math.max(50,Math.floor(h.clientWidth-16)),Y=Math.max(50,Math.floor(h.clientHeight-16)),W=Math.min(R/w,Y/A),T=Math.max(1,Math.floor(w*W)),_=Math.max(1,Math.floor(A*W));e.resCanvas.width=T,e.resCanvas.height=_,s.save(),s.imageSmoothingEnabled=!1,s.clearRect(0,0,T,_),s.drawImage(u,0,0,w,A,0,0,T,_),s.restore(),e.resMeta.textContent=`Output: ${w}\xD7${A}${w>=1e3||A>=1e3?" (exceeds limit: < 1000\xD71000)":""}`}e._drawSimplePreview=g,e._drawAdvancedPreview=f,e._drawAdvancedResultPreview=y;const k=u=>{e.mode=u,e.tabSimple.classList.toggle("active",u==="simple"),e.tabAdvanced.classList.toggle("active",u==="advanced"),e.paneSimple.classList.toggle("show",u==="simple"),e.paneAdvanced.classList.toggle("show",u==="advanced"),m(),e.calcBtn.style.display=u==="advanced"?"inline-block":"none",u==="advanced"?e.applyBtn.disabled=!e.calcReady:b(),C(),u==="advanced"?(f(),y()):g()};e.tabSimple.addEventListener("click",()=>k("simple")),e.tabAdvanced.addEventListener("click",()=>k("advanced"));const I=()=>{if(e.updating)return;e.updating=!0;const u=parseInt(e.w.value||"0",10);e.lock.checked&&e.origW>0&&e.origH>0&&u>0&&(e.h.value=Math.max(1,Math.round(u*e.origH/e.origW))),e.updating=!1,b(),e.mode==="simple"&&g()},S=()=>{if(e.updating)return;e.updating=!0;const u=parseInt(e.h.value||"0",10);e.lock.checked&&e.origW>0&&e.origH>0&&u>0&&(e.w.value=Math.max(1,Math.round(u*e.origW/e.origH))),e.updating=!1,b(),e.mode==="simple"&&g()};e.w.addEventListener("input",I),e.h.addEventListener("input",S),e.onex.addEventListener("click",()=>{x(1),g()}),e.half.addEventListener("click",()=>{x(.5),g()}),e.third.addEventListener("click",()=>{x(1/3),g()}),e.quarter.addEventListener("click",()=>{x(1/4),g()}),e.double.addEventListener("click",()=>{x(2),g()}),e.applyScale.addEventListener("click",()=>{const u=parseFloat(e.scale.value||"");if(!Number.isFinite(u)||u<=0){D("Enter a valid scale factor > 0");return}x(u),g()});const L=()=>{e.mode==="advanced"&&(e.calcReady=!1,e.applyBtn.disabled=!0,y(),m())},$=u=>{if(e.updating)return;const h=parseFloat(u);if(!Number.isFinite(h))return;const w=Math.min(Math.max(h,1),128);e.mult=w,e.bind.checked&&(e.gapX=w,e.gapY=w),M(),C(),f(),L()};e.multRange.addEventListener("input",u=>{e.updating||$(u.target.value)}),e.multInput.addEventListener("input",u=>{if(e.updating)return;const h=u.target.value;Number.isFinite(parseFloat(h))&&$(h)}),e.bind.addEventListener("change",()=>{e.bind.checked&&(e.gapX=e.mult,e.gapY=e.mult,M()),C(),f(),L()}),e.blockW.addEventListener("input",u=>{if(e.updating)return;const h=u.target.value,w=parseFloat(h);Number.isFinite(w)&&(e.gapX=Math.min(Math.max(w,1),4096),e.bind.checked&&(e.mult=e.gapX,e.gapY=e.gapX),M(),C(),f(),L())}),e.blockH.addEventListener("input",u=>{if(e.updating)return;const h=u.target.value,w=parseFloat(h);Number.isFinite(w)&&(e.gapY=Math.min(Math.max(w,1),4096),e.bind.checked&&(e.mult=e.gapY,e.gapX=e.gapY),M(),C(),f(),L())}),e.offX.addEventListener("input",u=>{const h=u.target.value,w=parseFloat(h);Number.isFinite(w)&&(e.offx=Math.min(Math.max(w,0),Math.max(0,e.origH-1e-4)),e.viewX=Math.min(e.viewX,Math.max(0,e.origW-1)),C(),f(),L())}),e.offY.addEventListener("input",u=>{const h=u.target.value,w=parseFloat(h);Number.isFinite(w)&&(e.offy=Math.min(Math.max(w,0),Math.max(0,e.origH-1e-4)),e.viewY=Math.min(e.viewY,Math.max(0,e.origH-1)),C(),f(),L())}),e.dotR.addEventListener("input",u=>{e.dotr=Math.max(1,Math.round(Number(u.target.value)||1)),e.dotRVal.textContent=String(e.dotr),f()}),e.gridToggle.addEventListener("change",f);const O=u=>{const h=Math.max(50,Math.floor(e.advWrap.clientWidth)),w=Math.max(50,Math.floor(e.advWrap.clientHeight)),A=Math.max(1,Math.floor(h/e.zoom)),R=Math.max(1,Math.floor(w/e.zoom)),Y=e.viewX+A/2,W=e.viewY+R/2;e.zoom=Math.min(32,Math.max(.1,e.zoom*u));const T=Math.max(1,Math.floor(h/e.zoom)),_=Math.max(1,Math.floor(w/e.zoom));e.viewX=Math.min(Math.max(0,Math.round(Y-T/2)),Math.max(0,e.origW-T)),e.viewY=Math.min(Math.max(0,Math.round(W-_/2)),Math.max(0,e.origH-_)),f()};e.zoomIn.addEventListener("click",()=>O(1.25)),e.zoomOut.addEventListener("click",()=>O(1/1.25)),e.advWrap.addEventListener("wheel",u=>{if(!u.ctrlKey)return;u.preventDefault();const h=u.deltaY||0;O(h>0?1/1.15:1.15)},{passive:!1});const G=u=>{u.target.closest(".op-rs-zoom")||(e.panning=!0,e.panStart={x:u.clientX,y:u.clientY,viewX:e.viewX,viewY:e.viewY},e.advWrap.classList.remove("op-pan-grab"),e.advWrap.classList.add("op-pan-grabbing"),e.advWrap.setPointerCapture?.(u.pointerId))},F=u=>{if(!e.panning)return;const h=u.clientX-e.panStart.x,w=u.clientY-e.panStart.y,A=e.advWrap.clientWidth,R=e.advWrap.clientHeight,Y=Math.max(1,Math.floor(A/e.zoom)),W=Math.max(1,Math.floor(R/e.zoom));let T=e.panStart.viewX-Math.round(h/e.zoom),_=e.panStart.viewY-Math.round(w/e.zoom);T=Math.min(Math.max(0,T),Math.max(0,e.origW-Y)),_=Math.min(Math.max(0,_),Math.max(0,e.origH-W)),e.viewX=T,e.viewY=_,f()},z=u=>{e.panning&&(e.panning=!1,e.panStart=null,e.advWrap.classList.remove("op-pan-grabbing"),e.advWrap.classList.add("op-pan-grab"),e.advWrap.releasePointerCapture?.(u.pointerId))};e.advWrap.addEventListener("pointerdown",G),e.advWrap.addEventListener("pointermove",F),e.advWrap.addEventListener("pointerup",z),e.advWrap.addEventListener("pointercancel",z),e.advWrap.addEventListener("pointerleave",z);const V=()=>Xe();e.cancelBtn.addEventListener("click",V),e.closeBtn.addEventListener("click",V),t.addEventListener("click",V),e.calcBtn.addEventListener("click",async()=>{if(e.mode==="advanced")try{const{cols:u,rows:h}=p();if(u<=0||h<=0){D("No samples. Adjust multiplier/offset.");return}if(u>=1e3||h>=1e3){D("Output too large. Must be < 1000\xD71000.");return}const w=await Nt(e.img,e.origW,e.origH,e.offx,e.offy,e.gapX,e.gapY);e.calcCanvas=w,e.calcCols=u,e.calcRows=h,e.calcReady=!0,e.applyBtn.disabled=!1,y(),m(),D(`Calculated ${u}\xD7${h}. Review preview, then Apply.`)}catch(u){console.error(u),D("Calculation failed.")}}),e.applyBtn.addEventListener("click",async()=>{if(e.ov)try{if(e.mode==="simple"){const u=parseInt(e.w.value||"0",10),h=parseInt(e.h.value||"0",10);if(!Number.isFinite(u)||!Number.isFinite(h)||u<=0||h<=0){D("Invalid dimensions");return}if(u>=1e3||h>=1e3){D("Too large. Must be < 1000\xD71000.");return}await Tt(e.ov,u,h),Xe(),D(`Resized to ${u}\xD7${h}.`)}else{if(!e.calcReady||!e.calcCanvas){D("Calculate first.");return}const u=await He(e.calcCanvas);e.ov.imageBase64=u,e.ov.imageUrl=null,e.ov.isLocal=!0,await E(["overlays"]),B(),K(),P(),Xe(),D(`Applied ${e.calcCols}\xD7${e.calcRows}.`)}}catch(u){console.error(u),D("Apply failed.")}}),e._syncAdvancedMeta=C,e._syncSimpleNote=b,e._setMode=u=>{const h=new Event("click");(u==="simple"?e.tabSimple:e.tabAdvanced).dispatchEvent(h)}}function Ft(t){if(!e)return;e.ov=t;const o=new Image;o.onload=()=>{e.img=o,e.origW=o.width,e.origH=o.height,e.orig.value=`${e.origW}\xD7${e.origH}`,e.w.value=String(e.origW),e.h.value=String(e.origH),e.lock.checked=!0,e.zoom=1,e.mult=4,e.gapX=4,e.gapY=4,e.offx=0,e.offy=0,e.dotr=1,e.viewX=0,e.viewY=0,e.bind.checked=!0,e.multRange.value="4",e.multInput.value="4",e.blockW.value="4",e.blockH.value="4",e.offX.value="0",e.offY.value="0",e.dotR.value="1",e.dotRVal.textContent="1",e.gridToggle.checked=!0,e.calcCanvas=null,e.calcCols=0,e.calcRows=0,e.calcReady=!1,e.applyBtn.disabled=e.mode==="advanced",e._setMode("simple"),document.body.classList.add("op-scroll-lock"),e.backdrop.classList.add("show"),e.modal.style.display="flex",e._drawSimplePreview?.(),e._drawAdvancedPreview?.(),e._drawAdvancedResultPreview?.(),e._syncAdvancedMeta?.(),e._syncSimpleNote?.(),(()=>{if(e.mode==="advanced"){const{cols:n,rows:i}=(function(){const s=Math.floor((e.origW-e.offx)/e.gapX),l=Math.floor((e.origH-e.offy)/e.gapY);return{cols:Math.max(0,s),rows:Math.max(0,l)}})();e.meta.textContent=n>0&&i>0?`Samples: ${n} \xD7 ${i} | Output: ${n}\xD7${i}${n>=1e3||i>=1e3?" (exceeds limit: < 1000\xD71000)":""}`:"Adjust multiplier/offset until dots sit at centers."}else{const n=parseInt(e.w.value||"0",10),i=parseInt(e.h.value||"0",10),s=Number.isFinite(n)&&Number.isFinite(i)&&n>0&&i>0,l=n>=1e3||i>=1e3;e.meta.textContent=s?l?`Target: ${n}\xD7${i} (exceeds limit: must be < 1000\xD71000)`:`Target: ${n}\xD7${i} (OK)`:"Enter positive width and height."}})();const a=()=>{e.mode==="simple"?e._drawSimplePreview?.():(e._drawAdvancedPreview?.(),e._drawAdvancedResultPreview?.())};e._resizeHandler=a,window.addEventListener("resize",a)},o.src=t.imageBase64}function Xe(){e&&(window.removeEventListener("resize",e._resizeHandler||(()=>{})),e.backdrop.classList.remove("show"),e.modal.style.display="none",e.ov=null,e.img=null,document.body.classList.remove("op-scroll-lock"))}async function Tt(t,o,r){const a=await le(t.imageBase64),n=De(o,r),i=n.getContext("2d",{willReadFrequently:!0});i.imageSmoothingEnabled=!1,i.clearRect(0,0,o,r),i.drawImage(a,0,0,a.width,a.height,0,0,o,r);const s=i.getImageData(0,0,o,r),l=s.data;for(let v=3;v<l.length;v+=4)l[v]>0&&(l[v]=255);i.putImageData(s,0,0);const p=n.toDataURL("image/png");t.imageBase64=p,t.imageUrl=null,t.isLocal=!0,await E(["overlays"]),B(),K(),P()}async function Nt(t,o,r,a,n,i,s){const p=N(o,r).getContext("2d",{willReadFrequently:!0});p.imageSmoothingEnabled=!1,p.drawImage(t,0,0);const v=p.getImageData(0,0,o,r).data,m=Math.floor((o-a)/i),b=Math.floor((r-n)/s);if(m<=0||b<=0)throw new Error("No samples available with current offset/gap");const x=De(m,b),g=x.getContext("2d"),M=g.createImageData(m,b),C=M.data,f=a+i/2,y=n+s/2,k=(I,S,L)=>Math.min(Math.max(I,S),L);for(let I=0;I<b;I++)for(let S=0;S<m;S++){const L=Math.round(k(f+S*i,0,o-1)),O=(Math.round(k(y+I*s,0,r-1))*o+L)*4,G=v[O],F=v[O+1],z=v[O+2],V=v[O+3],u=(I*m+S)*4;V===0?(C[u]=0,C[u+1]=0,C[u+2]=0,C[u+3]=0):(C[u]=G,C[u+1]=F,C[u+2]=z,C[u+3]=255)}return g.putImageData(M,0,0),x}function zt(){Mt().then(()=>{K();const t=async()=>{kt(),Ct(),_e(),await j()};document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t(),console.log("Hail's OP: Initialized with Minify (fixed 3\xD7) mode.")})}zt()})();
