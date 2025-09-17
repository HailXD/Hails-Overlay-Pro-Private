/* @preserve
// ==UserScript==
// @name         Hail's OP
// @namespace    http://tampermonkey.net/
// @version      2.8.33
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

(function(){"use strict";const ee=window.fetch,lt=(t,o)=>{try{if(typeof GM<"u"&&typeof GM.getValue=="function")return GM.getValue(t,o);if(typeof GM_getValue=="function")return Promise.resolve(GM_getValue(t,o))}catch{}return Promise.resolve(o)},ct=(t,o)=>{try{if(typeof GM<"u"&&typeof GM.setValue=="function")return GM.setValue(t,o);if(typeof GM_setValue=="function")return Promise.resolve(GM_setValue(t,o))}catch{}return Promise.resolve()};function dt(t){return new Promise((o,i)=>{try{GM_xmlhttpRequest({method:"GET",url:t,responseType:"blob",onload:a=>{a.status>=200&&a.status<300&&a.response?o(a.response):i(new Error(`GM_xhr failed: ${a.status} ${a.statusText}`))},onerror:()=>i(new Error("GM_xhr network error")),ontimeout:()=>i(new Error("GM_xhr timeout"))})}catch(a){i(a)}})}function Ne(t){return new Promise((o,i)=>{const a=new FileReader;a.onload=()=>o(a.result),a.onerror=i,a.readAsDataURL(t)})}async function qe(t){const o=await dt(t);if(!o||!String(o.type).startsWith("image/"))throw new Error("URL did not return an image blob");return await Ne(o)}function pt(t){return new Promise((o,i)=>{const a=new FileReader;a.onload=()=>o(a.result),a.onerror=i,a.readAsDataURL(t)})}const Ue=[{1:[0,0,0],2:[60,60,60],3:[120,120,120],4:[210,210,210],5:[255,255,255],6:[96,0,24],7:[237,28,36],8:[255,127,39],9:[246,170,9],10:[249,221,59],11:[255,250,188],12:[14,185,104],13:[19,230,123],14:[135,255,94],15:[12,129,110],16:[16,174,166],17:[19,225,190],18:[40,80,158],19:[64,147,228],20:[96,247,242],21:[107,80,246],22:[153,177,251],23:[120,12,153],24:[170,56,185],25:[224,159,249],26:[203,0,122],27:[236,31,128],28:[243,141,169],29:[104,70,52],30:[149,104,42],31:[248,178,119],32:[170,170,170],33:[165,14,30],34:[250,128,114],35:[228,92,26],36:[214,181,148],37:[156,132,49],38:[197,173,49],39:[232,212,95],40:[74,107,58],41:[90,148,74],42:[132,197,115],43:[15,121,159],44:[187,250,242],45:[125,199,255],46:[77,49,184],47:[74,66,132],48:[122,113,196],49:[181,174,241],50:[219,164,99],51:[209,128,81],52:[255,197,165],53:[155,82,73],54:[209,128,120],55:[250,182,164],56:[123,99,82],57:[156,132,107],58:[51,57,65],59:[109,117,141],60:[179,185,209],61:[109,100,63],62:[148,140,107],63:[205,197,158]}][0],$e=[],ze=new Map,ut=Object.keys(Ue).map(Number).sort((t,o)=>t-o);for(const t of ut){const o=Ue[t];$e[t-1]=o,ze.set(o.join(","),t)}const Ae=$e.slice(0,31),ne=$e.slice(31),me={"0,0,0":"Black","60,60,60":"Dark Gray","120,120,120":"Gray","210,210,210":"Light Gray","255,255,255":"White","96,0,24":"Deep Red","237,28,36":"Red","255,127,39":"Orange","246,170,9":"Gold","249,221,59":"Yellow","255,250,188":"Light Yellow","14,185,104":"Dark Green","19,230,123":"Green","135,255,94":"Light Green","12,129,110":"Dark Teal","16,174,166":"Teal","19,225,190":"Light Teal","96,247,242":"Cyan","40,80,158":"Dark Blue","64,147,228":"Blue","107,80,246":"Indigo","153,177,251":"Light Indigo","120,12,153":"Dark Purple","170,56,185":"Purple","224,159,249":"Light Purple","203,0,122":"Dark Pink","236,31,128":"Pink","243,141,169":"Light Pink","104,70,52":"Dark Brown","149,104,42":"Brown","248,178,119":"Beige","170,170,170":"Medium Gray","165,14,30":"Dark Red","250,128,114":"Light Red","228,92,26":"Dark Orange","214,181,148":"Light Tan","156,132,49":"Dark Goldenrod","197,173,49":"Goldenrod","232,212,95":"Light Goldenrod","74,107,58":"Dark Olive","90,148,74":"Olive","132,197,115":"Light Olive","15,121,159":"Dark Cyan","187,250,242":"Light Cyan","125,199,255":"Light Blue","77,49,184":"Dark Indigo","74,66,132":"Dark Slate Blue","122,113,196":"Slate Blue","181,174,241":"Light Slate Blue","219,164,99":"Light Brown","209,128,81":"Dark Beige","255,197,165":"Light Beige","155,82,73":"Dark Peach","209,128,120":"Peach","250,182,164":"Light Peach","123,99,82":"Dark Tan","156,132,107":"Tan","51,57,65":"Dark Slate","109,117,141":"Slate","179,185,209":"Light Slate","109,100,63":"Dark Stone","148,140,107":"Stone","205,197,158":"Light Stone"};let gt=new Set;function He(){const t=new Set;try{const o=new Set(ne.map(([a,n,r])=>`${a},${n},${r}`)),i=document.querySelectorAll('svg[class~="text-base-content/80"]');for(const a of i){const n=a.closest("button");if(!n)continue;let r=n.style?.background||n.style?.backgroundColor||"";r||(r=(n.ownerDocument?.defaultView||window).getComputedStyle(n).backgroundColor||"");const s=/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i.exec(r);if(!s)continue;const u=`${parseInt(s[1],10)},${parseInt(s[2],10)},${parseInt(s[3],10)}`;o.has(u)&&t.add(u)}}catch(o){console.debug("scanAndCollectPaidKeysFromButtons failed:",o)}return gt=t,t}const xe=Ae.map(([t,o,i])=>`${t},${o},${i}`),We=[];class he extends Map{constructor(o){super(),this.limit=o}set(o,i){if(this.size>=this.limit){const a=this.keys().next().value;this.delete(a)}return super.set(o,i)}}const Ke=unsafeWindow;function Ve(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function De(t){const o=new Set(c.overlays.map(a=>(a.name||"").toLowerCase()));if(!o.has(t.toLowerCase()))return t;let i=1;for(;o.has(`${t} (${i})`.toLowerCase());)i++;return`${t} (${i})`}function V(t,o){if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(t,o);const i=document.createElement("canvas");return i.width=t,i.height=o,i}function Re(t,o){const i=document.createElement("canvas");return i.width=t,i.height=o,i}function fe(t){return t.convertToBlob?t.convertToBlob():new Promise((o,i)=>t.toBlob(a=>a?o(a):i(new Error("toBlob failed")),"image/png"))}async function je(t){if(t&&typeof t.toDataURL=="function")return t.toDataURL("image/png");if(t&&typeof t.convertToBlob=="function"){const o=await t.convertToBlob();return await Ne(o)}if(typeof OffscreenCanvas<"u"&&t instanceof OffscreenCanvas){const o=t.transferToImageBitmap?.();if(o){const i=Re(t.width,t.height);return i.getContext("2d").drawImage(o,0,0),i.toDataURL("image/png")}}throw new Error("Cannot export canvas to data URL")}async function ce(t){if(typeof createImageBitmap=="function")try{return await createImageBitmap(t)}catch{}return new Promise((o,i)=>{const a=URL.createObjectURL(t),n=new Image;n.onload=()=>{URL.revokeObjectURL(a),o(n)},n.onerror=r=>{URL.revokeObjectURL(a),i(r)},n.src=a})}async function mt(t){const o=await ce(t),a=V(o.width,o.height).getContext("2d");return a.drawImage(o,0,0),a.getImageData(0,0,o.width,o.height)}async function Ze(t){if(!t.imageBase64)return null;if(t.visibleColorKeys==null)return await le(t.imageBase64);const o=t.visibleColorKeys.slice().sort().join(","),a=`${t.imageBase64.slice(0,64)+":"+t.imageBase64.length}|${o}`;if(Me.has(a))return Me.get(a);const n=await le(t.imageBase64),r=n.width,s=n.height,u=V(r,s),l=u.getContext("2d",{willReadFrequently:!0});l.drawImage(n,0,0);const m=l.getImageData(0,0,r,s),g=m.data,y=new Set(t.visibleColorKeys);for(let f=0;f<g.length;f+=4)if(g[f+3]>0){const x=`${g[f]},${g[f+1]},${g[f+2]}`;y.has(x)||(g[f+3]=0)}l.putImageData(m,0,0);const w=await(typeof createImageBitmap=="function"?createImageBitmap(u):le(await je(u)));return Me.set(a,w),w}function le(t){return ke.has(t)?Promise.resolve(ke.get(t)):new Promise((o,i)=>{const a=new Image;a.crossOrigin="anonymous",a.onload=()=>{ke.set(t,a),o(a)},a.onerror=i,a.src=t})}function de(t){try{const o=new URL(t),i=o.pathname.split("/"),a=new URLSearchParams(o.search);return{chunk1:parseInt(i[3],10),chunk2:parseInt(i[4],10),posX:parseInt(a.get("x")||"0",10),posY:parseInt(a.get("y")||"0",10)}}catch{return{chunk1:0,chunk2:0,posX:0,posY:0}}}function ht(t){try{const o=new URL(t,location.href);if(o.hostname!=="backend.wplace.live"||!o.pathname.startsWith("/files/"))return null;const i=o.pathname.match(/\/(\d+)\/(\d+)\.png$/i);return i?{chunk1:parseInt(i[1],10),chunk2:parseInt(i[2],10)}:null}catch{return null}}function ft(t){try{const o=new URL(t,location.href);if(o.hostname!=="backend.wplace.live")return null;const i=o.pathname.match(/\/s0\/pixel\/(\d+)\/(\d+)$/);if(!i)return null;const a=o.searchParams;return{normalized:`https://backend.wplace.live/s0/pixel/${i[1]}/${i[2]}?x=${a.get("x")||0}&y=${a.get("y")||0}`}}catch{return null}}function Ge(t,o,i,a,n,r,s,u){const l=Math.max(t,n),m=Math.max(o,r),g=Math.min(t+i,n+s),y=Math.min(o+a,r+u),w=Math.max(0,g-l),f=Math.max(0,y-m);return{x:l,y:m,w,h:f}}const ae=new he(50),we=new Set,ke=new he(50),Me=new he(50),pe=new he(200),ve=new he(200),Ce=new Map;function Oe(t){return[t.imageBase64?t.imageBase64.slice(0,64)+":"+t.imageBase64.length:"none",t.pixelUrl||"null",t.offsetX,t.offsetY,t.opacity].join("|")}function z(){ae.clear(),ke.clear(),Me.clear(),pe.clear(),ve.clear(),Ce.clear()}async function Je(t,o,i){if(!t.enabled||!t.imageBase64||!t.pixelUrl||we.has(t.id))return null;const a=Oe(t),n=`${t.id}|${a}|${o}|${i}`;if(ae.has(n))return ae.get(n);const r=await Ze(t);if(!r)return null;const s=r.width,u=r.height;if(s>=1e3||u>=1e3)return we.add(t.id),D(`Overlay "${t.name}" skipped: image too large (must be smaller than 1000\xD71000; got ${s}\xD7${u}).`),null;const l=de(t.pixelUrl);if(!Number.isFinite(l.chunk1)||!Number.isFinite(l.chunk2))return null;const m=l.chunk1*1e3+l.posX+t.offsetX-o*1e3,g=l.chunk2*1e3+l.posY+t.offsetY-i*1e3,y=Ge(0,0,1e3,1e3,m,g,s,u);if(y.w===0||y.h===0)return ae.set(n,null),null;const f=V(1e3,1e3).getContext("2d",{willReadFrequently:!0});f.drawImage(r,m,g);const x=f.getImageData(y.x,y.y,y.w,y.h),k=c.overlayMode==="smart"||c.overlayMode==="diff"?new Uint8ClampedArray(x.data):null,v=x.data,b=t.opacity,I=255*(1-b);for(let E=0;E<v.length;E+=4)v[E+3]>0&&(c.highlightPixels?(v[E]=255,v[E+1]=0,v[E+2]=255):(v[E]=Math.round(v[E]*b+I),v[E+1]=Math.round(v[E+1]*b+I),v[E+2]=Math.round(v[E+2]*b+I)),v[E+3]=255);const S={imageData:x,dx:y.x,dy:y.y,rawData:k};return ae.set(n,S),S}async function vt(t,o,i){if(!t.enabled||!t.imageBase64||!t.pixelUrl||we.has(t.id))return null;const a=3,n=Oe(t),r=`${t.id}|${n}|minify|s${a}|${o}|${i}`;if(ae.has(r))return ae.get(r);const s=await Ze(t);if(!s)return null;const u=s.width,l=s.height;if(u>=1e3||l>=1e3)return we.add(t.id),D(`Overlay "${t.name}" skipped: image too large (must be smaller than 1000\xD71000; got ${u}\xD7${l}).`),null;const m=de(t.pixelUrl);if(!Number.isFinite(m.chunk1)||!Number.isFinite(m.chunk2))return null;const g=m.chunk1*1e3+m.posX+t.offsetX-o*1e3,y=m.chunk2*1e3+m.posY+t.offsetY-i*1e3,w=1e3*a,f=1e3*a,x=Math.round(g*a),k=Math.round(y*a),v=u*a,b=l*a,C=Ge(0,0,w,f,x,k,v,b);if(C.w===0||C.h===0)return ae.set(r,null),null;const S=V(w,f).getContext("2d",{willReadFrequently:!0});S.imageSmoothingEnabled=!1,S.clearRect(0,0,w,f),S.drawImage(s,0,0,u,l,x,k,v,b);const E=S.getImageData(C.x,C.y,C.w,C.h),$=E.data,_=t.opacity,R=255*(1-_),P=Math.floor(a/2),Y=C.w;for(let h=0;h<$.length;h+=4){if($[h+3]===0)continue;const A=h/4%Y,O=Math.floor(h/4/Y),X=C.x+A,q=C.y+O;X%a===P&&q%a===P?(c.highlightPixels?($[h]=255,$[h+1]=0,$[h+2]=255):($[h]=Math.round($[h]*_+R),$[h+1]=Math.round($[h+1]*_+R),$[h+2]=Math.round($[h+2]*_+R)),$[h+3]=255):($[h]=0,$[h+1]=0,$[h+2]=0,$[h+3]=0)}const p={imageData:E,dx:C.x,dy:C.y,scaled:!0,scale:a};return ae.set(r,p),p}async function yt(t,o){if(!o||o.length===0)return t;const i=await ce(t),a=i.width,n=i.height,r=V(a,n),s=r.getContext("2d");for(const u of o)u&&s.putImageData(u.imageData,u.dx,u.dy);return s.drawImage(i,0,0),await fe(r)}async function bt(t,o){if(!o||o.length===0)return t;const i=await ce(t),a=i.width,n=i.height,r=V(a,n),s=r.getContext("2d");s.drawImage(i,0,0);for(const u of o){if(!u||!u.imageData||u.imageData.width===0||u.imageData.height===0)continue;const l=V(u.imageData.width,u.imageData.height);l.getContext("2d").putImageData(u.imageData,0,0),s.drawImage(l,u.dx,u.dy)}return await fe(r)}async function xt(t,o){if(!o||o.length===0)return t;const i=await ce(t),a=i.width,n=i.height,r=V(a,n),s=r.getContext("2d",{willReadFrequently:!0});s.drawImage(i,0,0);const u=s.getImageData(0,0,a,n),l=u.data,m=new Uint32Array(l.buffer);for(const g of o){if(!g||!g.rawData)continue;const y=g.rawData,w=g.imageData.data,f=g.imageData.width,x=g.imageData.height,k=new Uint32Array(y.buffer),v=new Uint32Array(w.buffer);for(let b=0;b<x;b++){const C=g.dy+b;if(!(C<0||C>=n))for(let I=0;I<f;I++){const S=g.dx+I;if(S<0||S>=a)continue;const E=(b*f+I)*4;if(y[E+3]>0){const $=C*a+S,_=b*f+I;k[_]!==m[$]&&(m[$]=v[_])}}}}return s.putImageData(u,0,0),await fe(r)}async function wt(t,o){if(!o||o.length===0)return t;const i=await ce(t),a=i.width,n=i.height,r=V(a,n),s=r.getContext("2d",{willReadFrequently:!0});s.drawImage(i,0,0);const u=s.getImageData(0,0,a,n),l=u.data,m=new Uint32Array(l.buffer);for(const g of o){if(!g||!g.rawData)continue;const y=g.rawData,w=g.imageData.data,f=g.imageData.width,x=g.imageData.height,k=new Uint32Array(y.buffer),v=new Uint32Array(w.buffer);for(let b=0;b<x;b++){const C=g.dy+b;if(!(C<0||C>=n))for(let I=0;I<f;I++){const S=g.dx+I;if(S<0||S>=a)continue;const E=(b*f+I)*4;if(y[E+3]>0){const $=C*a+S,_=$,W=b*f+I;l[$*4+3]>0&&k[W]!==m[_]&&(m[_]=v[W])}}}}return s.putImageData(u,0,0),await fe(r)}async function kt(t,o){if(!o||o.length===0)return t;const i=3,a=await ce(t),n=a.width,r=a.height,s=V(n*i,r*i),u=s.getContext("2d",{willReadFrequently:!0});u.imageSmoothingEnabled=!1,u.drawImage(a,0,0,n*i,r*i);for(const l of o){if(!l)continue;const m=l.imageData.width,g=l.imageData.height;if(m===0||g===0)continue;const y=V(m,g);y.getContext("2d",{willReadFrequently:!0}).putImageData(l.imageData,0,0),u.drawImage(y,l.dx,l.dy)}return await fe(s)}function D(t,o=3e3){let i=document.getElementById("op-toast-stack");i||(i=document.createElement("div"),i.className="op-toast-stack",i.id="op-toast-stack",document.body.appendChild(i)),i.classList.toggle("op-dark",c.theme==="dark");const a=document.createElement("div");a.className="op-toast",a.textContent=t,i.appendChild(a),requestAnimationFrame(()=>a.classList.add("show")),setTimeout(()=>{a.classList.remove("show"),setTimeout(()=>a.remove(),200)},o)}async function Mt(t,o,i){let a;try{if(typeof i.body=="string")a=JSON.parse(i.body);else return console.error("Hail's OP: Hijack failed, request body is not a string."),ee(o,i)}catch(R){return console.error("Hail's OP: Hijack failed to parse original body.",R),ee(o,i)}const n=parseInt(t[1],10),r=parseInt(t[2],10),s=F(),u=c.hijackPixelCount||1;if(!s||!s.enabled||!s.imageBase64||!s.pixelUrl)return ee(o,i);const l=await Je(s,n,r);if(!l||!l.rawData)return ee(o,i);const m=`${n},${r}`,g=pe.get(m),y=s.visibleColorKeys?new Set(s.visibleColorKeys):null,w=l.rawData,f=l.imageData.width,x=l.imageData.height,k=[];for(let R=0;R<x;R++)for(let P=0;P<f;P++){const Y=l.dx+P,p=l.dy+R;if(Y<0||Y>=1e3||p<0||p>=1e3)continue;const h=(R*f+P)*4;if(w[h+3]===0)continue;const M=w[h],A=w[h+1],O=w[h+2],X=`${M},${A},${O}`;if(y&&!y.has(X))continue;let q=!1;const B=c.overlayMode;if(B==="behind"||B==="above"||B==="minify")q=!0;else if(B==="smart"||B==="diff"){if(!g)continue;const T=g.data,G=g.width,Z=(p*G+Y)*4,H=T[Z],K=T[Z+1],oe=T[Z+2],U=T[Z+3],J=M!==H||A!==K||O!==oe;console.log({r:M,g:A,b:O,tileR:H,tileG:K,tileB:oe,isDifferent:J,tileA:U,mode:B}),(B==="smart"&&(J||U===0)||B==="diff"&&J&&U>0)&&(q=!0)}q&&k.push({x:Y,y:p,r:M,g:A,b:O})}if(k.length===0)return D("Hijack: No placeable pixels found for this tile."),ee(o,i);const v=a.coords[0],b=a.coords[1];k.sort((R,P)=>{const Y=Math.hypot(R.x-v,R.y-b),p=Math.hypot(P.x-v,P.y-b);return Y-p});const C=k[0];k.sort((R,P)=>{const Y=Math.hypot(R.x-C.x,R.y-C.y),p=Math.hypot(P.x-C.x,P.y-C.y);return Y-p});const I=k.slice(0,u),S=[],E=[];if(I.forEach(R=>{const P=`${R.r},${R.g},${R.b}`,Y=ze.get(P);Y!==void 0&&Y!==0&&(S.push(Y),E.push(R.x,R.y))}),S.length===0)return D("Hijack: Could not map colors for placeable pixels."),ee(o,i);const $={...a,colors:S,coords:E},_=JSON.stringify($);D(`Hijacking: Placing ${S.length} pixels.`);const W={...i,body:_};return W.headers&&W.headers["Content-Length"]&&delete W.headers["Content-Length"],ee(o,W)}let Ee=!1;function Ct(){const t=c.overlays.some(a=>a.enabled&&a.imageBase64),o=!!c.autoCapturePixelUrl&&!!c.activeOverlayId;return(c.overlayMode==="behind"||c.overlayMode==="above"||c.overlayMode==="smart"||c.overlayMode==="diff"||c.overlayMode==="minify")&&(t||o)&&c.overlays.length>0}function j(){Ct()?Et():Lt()}function Et(){if(Ee)return;const t=ee,o=async(i,a)=>{const n=typeof i=="string"?i:i&&i.url||"",r=(a?.method||"GET").toUpperCase();if(c.hijackRequests&&r==="POST"){const l=n.match(/\/s0\/pixel\/(\d+)\/(\d+)$/);if(l)try{return await Mt(l,i,a)}catch(m){console.error("Hail's OP: Error during hijack",m)}}if(c.autoCapturePixelUrl&&c.activeOverlayId){const l=ft(n);if(l){const m=c.overlays.find(g=>g.id===c.activeOverlayId);if(m&&m.pixelUrl!==l.normalized){m.pixelUrl=l.normalized,m.offsetX=0,m.offsetY=0,await L(["overlays"]),z(),c.autoCapturePixelUrl=!1,await L(["autoCapturePixelUrl"]),N();const y=de(m.pixelUrl);D(`Anchor set for "${m.name}": chunk ${y.chunk1}/${y.chunk2} at (${y.posX}, ${y.posY}). Offset reset to (0,0).`),j()}}}const s=ht(n);if(!s||!["behind","above","smart","diff","minify"].includes(c.overlayMode))return t(i,a);try{const l=await t(i,a);if(!l.ok||!(l.headers.get("Content-Type")||"").toLowerCase().includes("image"))return l;const g=c.overlays.filter(x=>x.enabled&&x.imageBase64&&x.pixelUrl);if(g.length===0)return l;const y=await l.blob();try{const x=await mt(y.slice()),k=`${s.chunk1},${s.chunk2}`;pe.set(k,x)}catch(x){console.error("Hail's OP: Failed to cache tile",x)}if(y.size>15*1024*1024)return l;let w;if(c.overlayMode==="minify"){const x=[];for(const k of g)x.push(await vt(k,s.chunk1,s.chunk2));w=await kt(y,x.filter(Boolean))}else{const x=[];for(const k of g)x.push(await Je(k,s.chunk1,s.chunk2));c.overlayMode==="smart"?w=await xt(y,x.filter(Boolean)):c.overlayMode==="diff"?w=await wt(y,x.filter(Boolean)):w=await(c.overlayMode==="behind"?yt(y,x.filter(Boolean)):bt(y,x.filter(Boolean)))}const f=new Headers(l.headers);return f.set("Content-Type","image/png"),f.delete("Content-Length"),new Response(w,{status:l.status,statusText:l.statusText,headers:f})}catch(l){return console.error("Hail's OP: Error processing tile",l),t(i,a)}};Ke.fetch=o,window.fetch=o,Ee=!0}function Lt(){Ee&&(Ke.fetch=ee,window.fetch=ee,Ee=!1)}const c={overlays:[],activeOverlayId:null,overlayMode:"behind",isPanelCollapsed:!1,autoCapturePixelUrl:!1,panelX:null,panelY:null,theme:"light",collapseList:!1,collapseEditor:!1,collapseNudge:!1,collapseColors:!1,highlightPixels:!1,hijackRequests:!1,hijackPixelCount:1,ccFreeKeys:xe.slice(),ccPaidKeys:We.slice(),ccZoom:1,ccRealtime:!1,colorSortBy:"errorCount",colorsScrollTop:0},Qe=Object.keys(c);async function It(){try{await Promise.all(Qe.map(async t=>{c[t]=await lt(t,c[t])})),(!Array.isArray(c.ccFreeKeys)||c.ccFreeKeys.length===0)&&(c.ccFreeKeys=xe.slice()),Array.isArray(c.ccPaidKeys)||(c.ccPaidKeys=We.slice()),(!Number.isFinite(c.ccZoom)||c.ccZoom<=0)&&(c.ccZoom=1),typeof c.ccRealtime!="boolean"&&(c.ccRealtime=!1)}catch(t){console.error("Hail's OP: Failed to load config",t)}}async function L(t=Qe){try{await Promise.all(t.map(o=>ct(o,c[o])))}catch(o){console.error("Hail's OP: Failed to save config",o)}}function St(){const t=document.createElement("style");t.textContent=`
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

      .op-switch { position: relative; display: inline-block; width: 38px; height: 22px; flex-shrink: 0; }
      .op-switch input { opacity: 0; width: 0; height: 0; }
      .op-switch-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: var(--op-btn-border); transition: .2s; border-radius: 22px; }
      .op-switch-slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 3px; bottom: 3px; background-color: white; transition: .2s; border-radius: 50%; }
      input:checked + .op-switch-slider { background-color: var(--op-accent); }
      input:checked + .op-switch-slider:before { transform: translateX(16px); }
    `,document.head.appendChild(t)}function $t(){if(document.getElementById("overlay-pro-panel"))return;const t=document.createElement("div");t.id="overlay-pro-panel";const i=Math.max(12,window.innerWidth-340-80);t.style.left=(Number.isFinite(c.panelX)?c.panelX:i)+"px",t.style.top=(Number.isFinite(c.panelY)?c.panelY:120)+"px",t.innerHTML=`
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
                  <div class="op-row space" style="padding: 4px 0;">
                      <label for="op-highlight-toggle" style="cursor:pointer;">Highlight pixels (pink)</label>
                      <label class="op-switch">
                          <input type="checkbox" id="op-highlight-toggle">
                          <span class="op-switch-slider"></span>
                      </label>
                  </div>
                   <div class="op-row space" style="padding: 4px 0;">
                      <label for="op-hijack-toggle" style="cursor:pointer;">Hijack Requests</label>
                      <div class="op-row">
                          <label class="op-switch">
                              <input type="checkbox" id="op-hijack-toggle">
                              <span class="op-switch-slider"></span>
                          </label>
                          <input class="op-input" id="op-pixel-count" style="width: 60px; margin-left: 8px;" min="1" step="1" title="Pixel Count">
                      </div>
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
                          <button class="op-button" id="op-log-coords" title="Log pixel coordinates to console">Log Coords</button>
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
    `,document.body.appendChild(t),Ft(),zt(),Pt(),Tt(t),N()}function F(){return c.overlays.find(t=>t.id===c.activeOverlayId)||null}function et(){const t=document.getElementById("op-overlay-list");if(t){t.innerHTML="";for(const o of c.overlays){const i=document.createElement("div");i.className="op-item"+(o.id===c.activeOverlayId?" active":"");const a=o.isLocal?" (local)":o.imageBase64?"":" (no image)";i.innerHTML=`
        <input type="radio" name="op-active" ${o.id===c.activeOverlayId?"checked":""} title="Set active"/>
        <input type="checkbox" ${o.enabled?"checked":""} title="Toggle enabled"/>
        <div class="op-item-name" title="${(o.name||"(unnamed)")+a}">${(o.name||"(unnamed)")+a}</div>
        <button class="op-icon-btn" title="Delete overlay">\u{1F5D1}\uFE0F</button>
      `;const[n,r,s,u]=i.children;n.addEventListener("change",async()=>{const l=c.activeOverlayId!==o.id;c.activeOverlayId=o.id,await L(["activeOverlayId"]),N(),l&&await te(!1)}),r.addEventListener("change",()=>{o.enabled=r.checked,L(["overlays"]),z(),j()}),s.addEventListener("click",async()=>{const l=c.activeOverlayId!==o.id;c.activeOverlayId=o.id,await L(["activeOverlayId"]),N(),l&&await te(!1)}),u.addEventListener("click",async l=>{if(l.stopPropagation(),!confirm(`Delete overlay "${o.name||"(unnamed)"}"?`))return;const m=c.overlays.findIndex(g=>g.id===o.id);if(m>=0){const g=c.activeOverlayId===o.id;c.overlays.splice(m,1),g&&(c.activeOverlayId=c.overlays[0]?.id||null),await L(["overlays","activeOverlayId"]),z(),j(),N(),g&&await te()}}),t.appendChild(i)}}}async function At(){const t=De("Overlay"),o={id:Ve(),name:t,enabled:!0,imageUrl:null,imageBase64:null,isLocal:!1,pixelUrl:null,offsetX:0,offsetY:0,opacity:.7,visibleColorKeys:[]};return c.overlays.push(o),c.activeOverlayId=o.id,await L(["overlays","activeOverlayId"]),z(),j(),N(),await te(),o}async function Dt(t,o){const i=await qe(o);t.imageUrl=o,t.imageBase64=i,t.isLocal=!1,await L(["overlays"]),z(),c.autoCapturePixelUrl=!0,await L(["autoCapturePixelUrl"]),j(),N(),await te(),D("Image loaded. Placement mode ON -- click once to set anchor.")}async function tt(t,o){if(!o||!o.type||!o.type.startsWith("image/")){alert("Please choose an image file.");return}if(!confirm("Local PNGs cannot be exported to friends! Are you sure?"))return;const i=await pt(o);t.imageBase64=i,t.imageUrl=null,t.isLocal=!0,await L(["overlays"]),z(),c.autoCapturePixelUrl=!0,await L(["autoCapturePixelUrl"]),j(),N(),await te(),D("Local image loaded. Placement mode ON -- click once to set anchor.")}async function Rt(t){let o;try{o=JSON.parse(t)}catch{alert("Invalid JSON");return}const i=Array.isArray(o)?o:[o];let a=0,n=0;for(const r of i){const s=De(r.name||"Imported Overlay"),u=r.imageUrl,l=r.pixelUrl??null,m=Number.isFinite(r.offsetX)?r.offsetX:0,g=Number.isFinite(r.offsetY)?r.offsetY:0,y=Number.isFinite(r.opacity)?r.opacity:.7;if(!u){n++;continue}try{const w=await qe(u),f={id:Ve(),name:s,enabled:!0,imageUrl:u,imageBase64:w,isLocal:!1,pixelUrl:l,offsetX:m,offsetY:g,opacity:y,visibleColorKeys:[]};c.overlays.push(f),a++}catch(w){console.error("Import failed for",u,w),n++}}a>0&&(c.activeOverlayId=c.overlays[c.overlays.length-1].id,await L(["overlays","activeOverlayId"]),z(),j(),N(),await te()),alert(`Import finished. Imported: ${a}${n?`, Failed: ${n}`:""}`)}function Ot(){const t=F();if(!t){alert("No active overlay selected.");return}if(t.isLocal||!t.imageUrl){alert("This overlay uses a local image and cannot be exported. Please host the image and set an image URL.");return}const o={version:1,name:t.name,imageUrl:t.imageUrl,pixelUrl:t.pixelUrl??null,offsetX:t.offsetX,offsetY:t.offsetY,opacity:t.opacity},i=JSON.stringify(o,null,2);_e(i).then(()=>alert("Overlay JSON copied to clipboard!")).catch(()=>{prompt("Copy the JSON below:",i)})}function _e(t){return navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(t):Promise.reject(new Error("Clipboard API not available"))}let ot;function _t(){clearTimeout(ot),ot=setTimeout(()=>{L(["colorsScrollTop"])},250)}function Pt(){const t=n=>document.getElementById(n);t("op-theme-toggle").addEventListener("click",async n=>{n.stopPropagation(),c.theme=c.theme==="light"?"dark":"light",await L(["theme"]),Pe()}),t("op-refresh-btn").addEventListener("click",n=>{n.stopPropagation(),location.reload()}),t("op-mode-select").addEventListener("change",n=>{c.overlayMode=n.target.value,L(["overlayMode"]),j(),N()}),t("op-autocap-toggle").addEventListener("click",()=>{c.autoCapturePixelUrl=!c.autoCapturePixelUrl,L(["autoCapturePixelUrl"]),j(),N()}),t("op-highlight-toggle").addEventListener("change",async n=>{c.highlightPixels=n.target.checked,await L(["highlightPixels"]),z()}),t("op-hijack-toggle").addEventListener("change",async n=>{c.hijackRequests=n.target.checked,await L(["hijackRequests"]),N()}),t("op-pixel-count").addEventListener("input",async n=>{const r=parseInt(n.target.value,10);Number.isFinite(r)&&r>0&&(c.hijackPixelCount=r,await L(["hijackPixelCount"]))}),t("op-add-overlay").addEventListener("click",async()=>{try{await At()}catch(n){console.error(n)}}),t("op-import-overlay").addEventListener("click",async()=>{const n=prompt("Paste overlay JSON (single or array):");n&&await Rt(n)}),t("op-export-overlay").addEventListener("click",()=>Ot()),t("op-collapse-list").addEventListener("click",()=>{c.collapseList=!c.collapseList,L(["collapseList"]),N()}),t("op-collapse-editor").addEventListener("click",()=>{c.collapseEditor=!c.collapseEditor,L(["collapseEditor"]),N()}),t("op-collapse-nudge").addEventListener("click",()=>{c.collapseNudge=!c.collapseNudge,L(["collapseNudge"]),N()}),t("op-collapse-colors").addEventListener("click",()=>{c.collapseColors=!c.collapseColors,L(["collapseColors"]),N()}),t("op-colors-refresh").addEventListener("click",async()=>{ve.clear(),await te()}),t("op-color-sort-select").addEventListener("change",async n=>{c.colorSortBy=n.target.value,await L(["colorSortBy"]),await te(!1)}),t("op-colors-all").addEventListener("click",async()=>{const n=F();if(!n)return;n.visibleColorKeys=null,await L(["overlays"]),z(),document.getElementById("op-colors-list").querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!0})}),t("op-colors-none").addEventListener("click",async()=>{const n=F();if(!n)return;n.visibleColorKeys=[],await L(["overlays"]),z(),document.getElementById("op-colors-list").querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1})}),t("op-colors-free").addEventListener("click",async()=>{const n=F();if(!n)return;const r=ie.map(l=>l.key),s=new Set(Ae.map(([l,m,g])=>`${l},${m},${g}`));n.visibleColorKeys=r.filter(l=>s.has(l)),await L(["overlays"]),z(),document.getElementById("op-colors-list").querySelectorAll('input[type="checkbox"]').forEach(l=>{l.checked=s.has(l.dataset.key)})}),t("op-colors-paid").addEventListener("click",async()=>{const n=F();if(!n)return;const r=ie.map(l=>l.key),s=new Set(ne.map(([l,m,g])=>`${l},${m},${g}`));n.visibleColorKeys=r.filter(l=>s.has(l)),await L(["overlays"]),z(),document.getElementById("op-colors-list").querySelectorAll('input[type="checkbox"]').forEach(l=>{l.checked=s.has(l.dataset.key)})}),t("op-colors-copy").addEventListener("click",()=>{if(!F())return;const r="Color,type,wrongEmpty,wrongDiff,wrong,correct,total";if(!ie||ie.length===0){_e(r).then(()=>D("No color data to copy.")).catch(()=>D("Failed to copy."));return}const s=new Set(ne.map(([m,g,y])=>`${m},${g},${y}`)),u=ie.map(m=>{const{key:g,name:y,totalCount:w,belowCount:f,smartCount:x,errorCount:k,correctCount:v}=m,b=s.has(g)?"P":"F";return`${y},${b},${f},${x},${k},${v},${w}`}),l=[r,...u].join(`
`);_e(l).then(()=>D("Color data copied to clipboard!")).catch(()=>D("Failed to copy color data."))}),t("op-name").addEventListener("change",async n=>{const r=F();if(!r)return;const s=(n.target.value||"").trim()||"Overlay";c.overlays.some(u=>u.id!==r.id&&(u.name||"").toLowerCase()===s.toLowerCase())?(r.name=De(s),D(`Name in use. Renamed to "${r.name}".`)):r.name=s,await L(["overlays"]),et()}),t("op-fetch").addEventListener("click",async()=>{const n=F();if(!n){alert("No active overlay selected.");return}if(n.imageBase64){alert("This overlay already has an image. Create a new overlay to change the image.");return}const r=t("op-image-url").value.trim();if(!r){alert("Enter an image link first.");return}try{await Dt(n,r)}catch(s){console.error(s),alert("Failed to fetch image.")}});const o=t("op-dropzone");o.addEventListener("click",()=>t("op-file-input").click()),t("op-file-input").addEventListener("change",async n=>{const r=n.target.files&&n.target.files[0];if(n.target.value="",!r)return;const s=F();if(s){if(s.imageBase64){alert("This overlay already has an image. Create a new overlay to change the image.");return}try{await tt(s,r)}catch(u){console.error(u),alert("Failed to load local image.")}}}),["dragenter","dragover"].forEach(n=>o.addEventListener(n,r=>{r.preventDefault(),r.stopPropagation(),o.classList.add("drop-highlight")})),["dragleave","drop"].forEach(n=>o.addEventListener(n,r=>{r.preventDefault(),r.stopPropagation(),!(n==="dragleave"&&r.target!==o)&&o.classList.remove("drop-highlight")})),o.addEventListener("drop",async n=>{const r=n.dataTransfer;if(!r)return;const s=r.files&&r.files[0];if(!s)return;const u=F();if(u){if(u.imageBase64){alert("This overlay already has an image. Create a new overlay to change the image.");return}try{await tt(u,s)}catch(l){console.error(l),alert("Failed to load dropped image.")}}});const i=async(n,r)=>{const s=F();s&&(s.offsetX+=n,s.offsetY+=r,await L(["overlays"]),z(),N())};t("op-nudge-up").addEventListener("click",()=>i(0,-1)),t("op-nudge-down").addEventListener("click",()=>i(0,1)),t("op-nudge-left").addEventListener("click",()=>i(-1,0)),t("op-nudge-right").addEventListener("click",()=>i(1,0)),t("op-opacity-slider").addEventListener("input",n=>{const r=F();r&&(r.opacity=parseFloat(n.target.value),document.getElementById("op-opacity-value").textContent=Math.round(r.opacity*100)+"%")}),t("op-opacity-slider").addEventListener("change",async()=>{await L(["overlays"]),z()}),t("op-download-overlay").addEventListener("click",()=>{const n=F();if(!n||!n.imageBase64){D("No overlay image to download.");return}const r=document.createElement("a");r.href=n.imageBase64,r.download=`${(n.name||"overlay").replace(/[^\w.-]+/g,"_")}.png`,document.body.appendChild(r),r.click(),r.remove()}),t("op-open-cc").addEventListener("click",()=>{const n=F();if(!n||!n.imageBase64){D("No overlay image to edit.");return}Nt(n)}),t("op-log-coords").addEventListener("click",()=>{const n=F();if(!n){D("No active overlay selected.");return}Xt(n),D(`Logged pixel coordinates for "${n.name}" to the console.`)});const a=t("op-open-resize");a&&a.addEventListener("click",()=>{const n=F();if(!n||!n.imageBase64){D("No overlay image to resize.");return}Ht(n)}),window.addEventListener("resize",()=>{}),t("op-colors-list").addEventListener("scroll",()=>{const n=t("op-colors-list");n&&(c.colorsScrollTop=n.scrollTop,_t())})}function Tt(t){const o=t.querySelector("#op-header"),i=t.querySelector("#op-panel-toggle");if(!o||!i)return;let a=!1,n=0,r=0,s=0,u=0,l=!1;const m=(f,x,k)=>Math.min(Math.max(f,x),k),g=f=>{const x=t.classList.contains("collapsed"),k=x?i:o;if(x){if(f.target!==i)return}else if(!f.target.closest("#op-header")||f.target.closest("button"))return;a=!0,l=!1,n=f.clientX,r=f.clientY;const v=t.getBoundingClientRect();s=v.left,u=v.top,k.setPointerCapture?.(f.pointerId),f.preventDefault()},y=f=>{if(!a)return;const x=f.clientX-n,k=f.clientY-r,v=Math.max(8,window.innerWidth-t.offsetWidth-8),b=Math.max(8,window.innerHeight-t.offsetHeight-8);t.style.left=m(s+x,8,v)+"px",t.style.top=m(u+k,8,b)+"px",l=!0},w=f=>{if(!a)return;const k=t.classList.contains("collapsed")?i:o;a=!1,k.releasePointerCapture?.(f.pointerId),l&&(c.panelX=parseInt(t.style.left,10)||0,c.panelY=parseInt(t.style.top,10)||0,L(["panelX","panelY"]))};t.addEventListener("pointerdown",g),t.addEventListener("pointermove",y),t.addEventListener("pointerup",w),t.addEventListener("pointercancel",w),window.addEventListener("resize",()=>{const f=t.getBoundingClientRect(),x=Math.max(8,window.innerWidth-t.offsetWidth-8),k=Math.max(8,window.innerHeight-t.offsetHeight-8),v=Math.min(Math.max(f.left,8),x),b=Math.min(Math.max(f.top,8),k);t.style.left=v+"px",t.style.top=b+"px",c.panelX=v,c.panelY=b,L(["panelX","panelY"])}),i.addEventListener("click",f=>{if(l){f.preventDefault(),f.stopPropagation();return}c.isPanelCollapsed=!c.isPanelCollapsed,L(["isPanelCollapsed"]),N()})}function Pe(){document.body.classList.toggle("op-theme-dark",c.theme==="dark"),document.body.classList.toggle("op-theme-light",c.theme!=="dark");const t=document.getElementById("op-toast-stack");t&&t.classList.toggle("op-dark",c.theme==="dark")}function Yt(){const t=y=>document.getElementById(y),o=F(),i=t("op-editor-section"),a=t("op-editor-body");if(i.style.display=o?"flex":"none",!o)return;t("op-name").value=o.name||"";const n=t("op-image-source"),r=t("op-preview-wrap"),s=t("op-image-preview"),u=t("op-cc-btn-row");o.imageBase64?(n.style.display="none",r.style.display="flex",s.src=o.imageBase64,u.style.display="flex"):(n.style.display="block",r.style.display="none",u.style.display="none",t("op-image-url").value=o.imageUrl||"");const l=o.pixelUrl?de(o.pixelUrl):{chunk1:"-",chunk2:"-",posX:"-",posY:"-"};t("op-coord-display").textContent=o.pixelUrl?`Ref: chunk ${l.chunk1}/${l.chunk2} at (${l.posX}, ${l.posY})`:'No pixel anchor set. Turn ON "Place overlay" and click a pixel once.',t("op-opacity-slider").value=String(o.opacity),t("op-opacity-value").textContent=Math.round(o.opacity*100)+"%";const m=document.getElementById("op-offset-indicator");m&&(m.textContent=`Offset X ${o.offsetX}, Y ${o.offsetY}`),a.style.display=c.collapseEditor?"none":"block";const g=document.getElementById("op-collapse-editor");g&&(g.textContent=c.collapseEditor?"\u25B8":"\u25BE")}async function N(){const t=_=>document.getElementById(_),o=t("overlay-pro-panel");if(!o)return;Pe();const i=t("op-content"),a=t("op-panel-toggle"),n=t("op-header"),r=!!c.isPanelCollapsed;o.classList.toggle("collapsed",r),i.style.display=r?"none":"grid",a.classList.toggle("logo-button",r),a.title=r?"Expand":"Collapse";const s=t("op-mode-select");s&&(s.value=c.overlayMode);const u=t("op-autocap-toggle"),l=t("op-place-label");u.textContent=c.autoCapturePixelUrl?"ON":"OFF",u.classList.toggle("op-danger",!!c.autoCapturePixelUrl),l.classList.toggle("op-danger-text",!!c.autoCapturePixelUrl);const m=t("op-highlight-toggle");m&&(m.checked=!!c.highlightPixels);const g=t("op-hijack-toggle");g&&(g.checked=!!c.hijackRequests);const y=t("op-pixel-count");y&&(y.value=c.hijackPixelCount||1);const w=g?.nextElementSibling;w&&w.classList.toggle("op-danger-text",!!c.hijackRequests);const f=t("op-list-wrap"),x=t("op-collapse-list");f.style.display=c.collapseList?"none":"block",x&&(x.textContent=c.collapseList?"\u25B8":"\u25BE");const k=t("op-nudge-body"),v=t("op-collapse-nudge");k.style.display=c.collapseNudge?"none":"block",v&&(v.textContent=c.collapseNudge?"\u25B8":"\u25BE");const b=t("op-colors-body"),C=t("op-collapse-colors");b&&(b.style.display=c.collapseColors?"none":"block"),C&&(C.textContent=c.collapseColors?"\u25B8":"\u25BE");const I=t("op-color-sort-select");I&&(I.value=c.colorSortBy||"errorCount"),et(),Yt();const S=t("op-export-overlay"),E=F(),$=!!(E&&E.imageUrl&&!E.isLocal);S.disabled=!$,S.title=$?"Export active overlay JSON":"Export disabled for local images"}const Te=new Map;let ie=[];async function Ye(t){if(!t||!t.imageBase64)return{};const o=t.imageBase64.slice(0,64)+":"+t.imageBase64.length;if(Te.has(o))return Te.get(o);const i=await le(t.imageBase64),n=V(i.width,i.height).getContext("2d",{willReadFrequently:!0});n.drawImage(i,0,0);const s=n.getImageData(0,0,i.width,i.height).data,u={};for(let l=0;l<s.length;l+=4)if(s[l+3]>0){const m=`${s[l]},${s[l+1]},${s[l+2]}`;u[m]=(u[m]||0)+1}return Te.set(o,u),u}async function Bt(t){if(!t||!t.imageBase64||!t.pixelUrl)return null;const o=Oe(t),i=Array.from(pe.keys()).sort().join(";"),a=`${t.id}|${o}|${i}`;if(ve.has(a))return ve.get(a);const n=await le(t.imageBase64),r=n.width,s=n.height,l=V(r,s).getContext("2d",{willReadFrequently:!0});l.drawImage(n,0,0);const g=l.getImageData(0,0,r,s).data,y=de(t.pixelUrl);if(!Number.isFinite(y.chunk1)||!Number.isFinite(y.chunk2))return null;const w={};for(let f=0;f<s;f++)for(let x=0;x<r;x++){const k=(f*r+x)*4;if(g[k+3]===0)continue;const v=g[k],b=g[k+1],C=g[k+2],I=`${v},${b},${C}`;w[I]||(w[I]={smart:0,below:0});const S=y.chunk1*1e3+y.posX+t.offsetX+x,E=y.chunk2*1e3+y.posY+t.offsetY+f,$=Math.floor(S/1e3),_=Math.floor(E/1e3),W=`${$},${_}`;if(pe.has(W)){const R=pe.get(W),P=R.data,Y=R.width,p=(S%1e3+1e3)%1e3,M=((E%1e3+1e3)%1e3*Y+p)*4,A=P[M],O=P[M+1],X=P[M+2];P[M+3]===0?w[I].below++:(v!==A||b!==O||C!==X)&&w[I].smart++}}return ve.set(a,w),w}async function Xt(t){if(!t||!t.imageBase64||!t.pixelUrl){D("Overlay is missing image or pixelUrl to log coordinates.");return}const o=await le(t.imageBase64),i=o.width,a=o.height,n=de(t.pixelUrl);if(!Number.isFinite(n.chunk1)||!Number.isFinite(n.chunk2)){D("Invalid pixelUrl in overlay.");return}const r=(s,u,l)=>{if(s<0||s>=i||u<0||u>=a){console.log(`${l} Overlay Pixel: (${s}, ${u}) is out of bounds.`);return}const m=n.chunk1*1e3+n.posX+t.offsetX+s,g=n.chunk2*1e3+n.posY+t.offsetY+u,y=Math.floor(m/1e3),w=Math.floor(g/1e3),f=(m%1e3+1e3)%1e3,x=(g%1e3+1e3)%1e3;console.log(`${l} Overlay Pixel: (${s}, ${u}) -> Tile: (${y}, ${w}), Coordinate in Tile: (${f}, ${x})`)};console.log(`--- Specific Pixel Coordinates for Overlay: ${t.name} ---`),r(0,0,"Top-Left Corner:"),r(2,0,"Top-Left (+2 right):"),r(0,2,"Top-Left (+2 down):"),r(i-1,0,"Top-Right Corner:"),r(i-3,0,"Top-Right (-2 left):"),r(i-1,2,"Top-Right (+2 down):"),r(0,a-1,"Bottom-Left Corner:"),r(2,a-1,"Bottom-Left (+2 right):"),r(0,a-3,"Bottom-Left (-2 up):"),r(i-1,a-1,"Bottom-Right Corner:"),r(i-3,a-1,"Bottom-Right (-2 left):"),r(i-1,a-3,"Bottom-Right (-2 up):"),console.log("--- End of Specific Pixel Coordinates ---")}async function te(t=!0){const o=He(),i=F(),a=document.getElementById("op-colors-section");if(!a)return;if(!i||!i.imageBase64){a.style.display="none",ie=[];return}a.style.display="flex";const n=document.getElementById("op-colors-list");let r;if(t){n.innerHTML='<div class="op-muted" style="text-align:center; padding: 12px 0;">Loading...</div>';const v=await Ye(i),b=await Bt(i)||{};r=Object.entries(v).map(([C,I])=>{const S=b[C]?.below||0,E=b[C]?.smart||0,$=S+E,_=I-$;return{key:C,name:me[C]||C,totalCount:I,belowCount:S,smartCount:E,errorCount:$,correctCount:_}}),Ce.set(i.id,r),ie=r}else{if(Ce.has(i.id))r=Ce.get(i.id);else{const v=await Ye(i);r=Object.entries(v).map(([b,C])=>({key:b,name:me[b]||b,totalCount:C,belowCount:0,smartCount:0,errorCount:0,correctCount:C}))}ie=r}const s=c.colorSortBy||"errorCount";r=[...r].sort((v,b)=>b[s]===v[s]?b.totalCount-v.totalCount:b[s]-v[s]);let l;i.visibleColorKeys===null||i.visibleColorKeys===void 0?l=new Set(r.map(v=>v.key)):l=new Set(i.visibleColorKeys);const m=r.reduce((v,b)=>v+b.correctCount,0),g=r.reduce((v,b)=>v+b.errorCount,0),y=r.reduce((v,b)=>v+b.totalCount,0),w=document.getElementById("op-total-correct"),f=document.getElementById("op-total-wrong"),x=document.getElementById("op-total-pixels");w&&(w.textContent=m.toLocaleString()),f&&(f.textContent=g.toLocaleString()),x&&(x.textContent=y.toLocaleString());const k=new Set(ne.map(([v,b,C])=>`${v},${b},${C}`));if(n.innerHTML="",r.length===0){n.innerHTML='<div class="op-muted" style="text-align:center; padding: 12px 0;">No colors found.</div>';return}for(const v of r){const{key:b,name:C,totalCount:I,belowCount:S,smartCount:E,errorCount:$,correctCount:_}=v,W=k.has(b),R=document.createElement("div");R.className="op-dist-item"+(W?" premium":""),R.title=`${C} (${b}): ${I} pixels`;const P=`<span style="color: lime;">${_}</span>/<span style="color: cyan;">${S}</span>/<span style="color: pink;">${E}</span>/<span style="color: red;">${$}</span>/${I}`;R.innerHTML=`
            <input type="checkbox" data-key="${b}" ${l.has(b)?"checked":""} style="margin-right: 4px;">
            <div class="op-color-list-swatch" style="background-color: rgb(${b});"></div>
            <div class="op-color-list-name">${C}</div>
            <div class="op-color-list-count">${P}</div>
        `;const Y=R.querySelector(".op-color-list-name");Y&&o.has(b)&&(Y.style.color="red"),n.appendChild(R)}n.querySelectorAll('input[type="checkbox"]').forEach(v=>{v.addEventListener("change",async()=>{const b=v.dataset.key,C=F();if(!C)return;if(C.visibleColorKeys===null){const S=Object.keys(await Ye(C));C.visibleColorKeys=S}const I=new Set(C.visibleColorKeys);v.checked?I.add(b):I.delete(b),C.visibleColorKeys=Array.from(I),await L(["overlays"]),z()})}),Number.isFinite(c.colorsScrollTop)&&(n.scrollTop=c.colorsScrollTop)}let d=null;function Ft(){const t=document.createElement("div");t.className="op-cc-backdrop",t.id="op-cc-backdrop",document.body.appendChild(t);const o=document.createElement("div");o.className="op-cc-modal",o.id="op-cc-modal",o.style.display="none",o.innerHTML=`
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
    `,document.body.appendChild(o),o.querySelector("#op-cc-close").addEventListener("click",Le),t.addEventListener("click",Le),o.querySelector("#op-cc-cancel").addEventListener("click",Le),d={backdrop:t,modal:o,previewCanvas:o.querySelector("#op-cc-preview"),previewCtx:o.querySelector("#op-cc-preview").getContext("2d",{willReadFrequently:!0}),sourceCanvas:null,sourceCtx:null,sourceImageData:null,processedCanvas:null,processedCtx:null,freeGrid:o.querySelector("#op-cc-free-grid"),paidGrid:o.querySelector("#op-cc-paid-grid"),freeToggle:o.querySelector("#op-cc-free-toggle"),paidToggle:o.querySelector("#op-cc-paid-toggle"),meta:o.querySelector("#op-cc-meta"),applyBtn:o.querySelector("#op-cc-apply"),recalcBtn:o.querySelector("#op-cc-recalc"),realtimeBtn:o.querySelector("#op-cc-realtime"),zoom:1,selectedFree:new Set(c.ccFreeKeys),selectedPaid:new Set(c.ccPaidKeys),realtime:!!c.ccRealtime,overlay:null,lastColorCounts:{},isStale:!1},d.realtimeBtn.addEventListener("click",async()=>{d.realtime=!d.realtime,d.realtimeBtn.textContent=`Realtime: ${d.realtime?"ON":"OFF"}`,d.realtimeBtn.classList.toggle("op-danger",d.realtime),c.ccRealtime=d.realtime,await L(["ccRealtime"]),d.realtime&&d.isStale&&r()});const i=async()=>{d.zoom=Math.min(8,(d.zoom||1)*1.25),c.ccZoom=d.zoom,await L(["ccZoom"]),re(),se()},a=async()=>{d.zoom=Math.max(.1,(d.zoom||1)/1.25),c.ccZoom=d.zoom,await L(["ccZoom"]),re(),se()};o.querySelector("#op-cc-zoom-in").addEventListener("click",i),o.querySelector("#op-cc-zoom-out").addEventListener("click",a),d.recalcBtn.addEventListener("click",()=>{r()}),d.applyBtn.addEventListener("click",async()=>{const s=d.overlay;if(!s)return;if(at().length===0){D("Select at least one color.");return}if(d.isStale&&r(),!d.processedCanvas){D("Nothing to apply.");return}if(d.processedCanvas.width>=1e3||d.processedCanvas.height>=1e3){D("Image too large to apply (must be < 1000\xD71000).");return}const l=d.processedCanvas.toDataURL("image/png");s.imageBase64=l,s.imageUrl=null,s.isLocal=!0,await L(["overlays"]),z(),j(),N();const m=Object.keys(d.lastColorCounts).length;D(`Overlay updated (${d.processedCanvas.width}\xD7${d.processedCanvas.height}, ${m} colors).`),Le()}),Ut(),d.freeToggle.addEventListener("click",async()=>{const s=it();st("free",!s),c.ccFreeKeys=Array.from(d.selectedFree),await L(["ccFreeKeys"]),d.realtime?r():n(),re(),se(),ye()}),d.paidToggle.addEventListener("click",async()=>{const s=rt();st("paid",!s),c.ccPaidKeys=Array.from(d.selectedPaid),await L(["ccPaidKeys"]),d.realtime?r():n(),re(),se(),ye()});function n(){d.isStale=!0,d.meta.textContent=d.meta.textContent.replace(/ \| Status: .+$/,"")+" | Status: pending recalculation"}function r(){Ie(),d.isStale=!1,re(),se(),nt()}}function Nt(t){if(!d)return;d.overlay=t,document.body.classList.add("op-scroll-lock"),d.zoom=Number(c.ccZoom)||1,d.realtime=!!c.ccRealtime,d.realtimeBtn.textContent=`Realtime: ${d.realtime?"ON":"OFF"}`,d.realtimeBtn.classList.toggle("op-danger",d.realtime);const o=new Image;o.onload=()=>{d.sourceCanvas||(d.sourceCanvas=document.createElement("canvas"),d.sourceCtx=d.sourceCanvas.getContext("2d",{willReadFrequently:!0})),d.sourceCanvas.width=o.width,d.sourceCanvas.height=o.height,d.sourceCtx.clearRect(0,0,o.width,o.height),d.sourceCtx.drawImage(o,0,0),d.sourceImageData=d.sourceCtx.getImageData(0,0,o.width,o.height),d.processedCanvas||(d.processedCanvas=document.createElement("canvas"),d.processedCtx=d.processedCanvas.getContext("2d")),Ie(),d.isStale=!1,re(),se(),nt(),d.backdrop.classList.add("show"),d.modal.style.display="flex"},o.src=t.imageBase64}function Le(){d&&(d.backdrop.classList.remove("show"),d.modal.style.display="none",d.overlay=null,document.body.classList.remove("op-scroll-lock"))}function qt(t,o,i,a){let n=null,r=1/0;for(let s=0;s<a.length;s++){const[u,l,m]=a[s],g=(u+t)/2,y=u-t,w=l-o,f=m-i,x=(512+g)*y*y>>8,k=4*w*w,v=(767-g)*f*f>>8,b=x+k+v;b<r&&(r=b,n=[u,l,m])}return n||[0,0,0]}function at(){const t=[];return d.selectedFree.forEach(o=>{const[i,a,n]=o.split(",").map(r=>parseInt(r,10));Number.isFinite(i)&&t.push([i,a,n])}),d.selectedPaid.forEach(o=>{const[i,a,n]=o.split(",").map(r=>parseInt(r,10));Number.isFinite(i)&&t.push([i,a,n])}),t}function Ie(){if(!d.sourceImageData)return;const t=d.sourceImageData.width,o=d.sourceImageData.height,i=d.sourceImageData.data,a=new Uint8ClampedArray(i.length),n=at(),r={};for(let u=0;u<i.length;u+=4){const l=i[u],m=i[u+1],g=i[u+2];if(i[u+3]===0){a[u]=0,a[u+1]=0,a[u+2]=0,a[u+3]=0;continue}const[w,f,x]=n.length?qt(l,m,g,n):[l,m,g];a[u]=w,a[u+1]=f,a[u+2]=x,a[u+3]=255;const k=`${w},${f},${x}`;r[k]=(r[k]||0)+1}d.processedCanvas||(d.processedCanvas=document.createElement("canvas"),d.processedCtx=d.processedCanvas.getContext("2d")),d.processedCanvas.width=t,d.processedCanvas.height=o;const s=new ImageData(a,t,o);d.processedCtx.putImageData(s,0,0),d.lastColorCounts=r}function re(){const t=Number(d.zoom)||1,o=d.processedCanvas;if(!o)return;const i=Math.max(1,Math.round(o.width*t)),a=Math.max(1,Math.round(o.height*t));d.previewCanvas.width=i,d.previewCanvas.height=a;const n=d.previewCtx;n.clearRect(0,0,i,a),n.imageSmoothingEnabled=!1,n.drawImage(o,0,0,o.width,o.height,0,0,i,a),n.imageSmoothingEnabled=!0}function se(){if(!d.sourceImageData){d.meta.textContent="";return}const t=d.sourceImageData.width,o=d.sourceImageData.height,i=Object.keys(d.lastColorCounts||{}).length,a=d.isStale?"pending recalculation":"up to date";d.meta.textContent=`Size: ${t}\xD7${o} | Zoom: ${d.zoom.toFixed(2)}\xD7 | Colors: ${i} | Status: ${a}`}function nt(){if(!d||!d.lastColorCounts)return;const t=document.getElementById("op-cc-color-list");if(!t)return;const o=He(),i=d.lastColorCounts,a=Object.entries(i).sort(([,r],[,s])=>s-r),n=new Set(ne.map(([r,s,u])=>`${r},${s},${u}`));if(t.innerHTML="",a.length===0){t.innerHTML='<div class="op-muted" style="text-align:center; padding: 12px 0;">No colors in image.</div>';return}for(const[r,s]of a){const u=n.has(r),l=me[r]||r,m=document.createElement("div");m.className="op-color-list-item"+(u?" premium":""),m.title=`${l} (${r}): ${s} pixels`,m.innerHTML=`
        <div class="op-color-list-swatch" style="background-color: rgb(${r});"></div>
        <div class="op-color-list-name">${l}</div>
        <div class="op-color-list-count">${s}</div>
      `;const g=m.querySelector(".op-color-list-name");g&&o.has(r)&&(g.style.color="red"),t.appendChild(m)}}function Ut(){d.freeGrid.innerHTML="",d.paidGrid.innerHTML="";for(const[t,o,i]of Ae){const a=`${t},${o},${i}`,n=document.createElement("div");n.className="op-cc-cell",n.style.background=`rgb(${t},${o},${i})`,n.title=me[a]||a,n.dataset.key=a,n.dataset.type="free",d.selectedFree.has(a)&&n.classList.add("active"),n.addEventListener("click",async()=>{d.selectedFree.has(a)?d.selectedFree.delete(a):d.selectedFree.add(a),n.classList.toggle("active",d.selectedFree.has(a)),c.ccFreeKeys=Array.from(d.selectedFree),await L(["ccFreeKeys"]),d.realtime?Ie():d.isStale=!0,re(),se(),ye()}),d.freeGrid.appendChild(n)}for(const[t,o,i]of ne){const a=`${t},${o},${i}`,n=document.createElement("div");n.className="op-cc-cell",n.style.background=`rgb(${t},${o},${i})`,n.title=me[a]||a,n.dataset.key=a,n.dataset.type="paid",d.selectedPaid.has(a)&&n.classList.add("active"),n.addEventListener("click",async()=>{d.selectedPaid.has(a)?d.selectedPaid.delete(a):d.selectedPaid.add(a),n.classList.toggle("active",d.selectedPaid.has(a)),c.ccPaidKeys=Array.from(d.selectedPaid),await L(["ccPaidKeys"]),d.realtime?Ie():d.isStale=!0,re(),se(),ye()}),d.paidGrid.appendChild(n)}ye()}function ye(){d.freeToggle.textContent=it()?"Unselect All":"Select All",d.paidToggle.textContent=rt()?"Unselect All":"Select All"}function it(){return xe.every(t=>d.selectedFree.has(t))}function rt(){const t=ne.map(([o,i,a])=>`${o},${i},${a}`);return t.every(o=>d.selectedPaid.has(o))&&t.length>0}function st(t,o){if(t==="free")o?xe.forEach(a=>d.selectedFree.add(a)):d.selectedFree.clear(),d.freeGrid.querySelectorAll(".op-cc-cell").forEach(a=>a.classList.toggle("active",o));else{const i=ne.map(([a,n,r])=>`${a},${n},${r}`);o?i.forEach(a=>d.selectedPaid.add(a)):d.selectedPaid.clear(),d.paidGrid.querySelectorAll(".op-cc-cell").forEach(a=>a.classList.toggle("active",o))}}let e=null;function zt(){const t=document.createElement("div");t.className="op-rs-backdrop",t.id="op-rs-backdrop",document.body.appendChild(t);const o=document.createElement("div");o.className="op-rs-modal",o.id="op-rs-modal",o.style.display="none",o.innerHTML=`
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
    `,document.body.appendChild(o);const i={backdrop:t,modal:o,tabSimple:o.querySelector("#op-rs-tab-simple"),tabAdvanced:o.querySelector("#op-rs-tab-advanced"),paneSimple:o.querySelector("#op-rs-pane-simple"),paneAdvanced:o.querySelector("#op-rs-pane-advanced"),orig:o.querySelector("#op-rs-orig"),w:o.querySelector("#op-rs-w"),h:o.querySelector("#op-rs-h"),lock:o.querySelector("#op-rs-lock"),note:o.querySelector("#op-rs-note"),onex:o.querySelector("#op-rs-onex"),half:o.querySelector("#op-rs-half"),third:o.querySelector("#op-rs-third"),quarter:o.querySelector("#op-rs-quarter"),double:o.querySelector("#op-rs-double"),scale:o.querySelector("#op-rs-scale"),applyScale:o.querySelector("#op-rs-apply-scale"),simWrap:o.querySelector("#op-rs-sim-wrap"),simOrig:o.querySelector("#op-rs-sim-orig"),simNew:o.querySelector("#op-rs-sim-new"),colLeft:o.querySelector("#op-rs-col-left"),colRight:o.querySelector("#op-rs-col-right"),advWrap:o.querySelector("#op-rs-adv-wrap"),preview:o.querySelector("#op-rs-preview"),meta:o.querySelector("#op-rs-meta"),zoomIn:o.querySelector("#op-rs-zoom-in"),zoomOut:o.querySelector("#op-rs-zoom-out"),multRange:o.querySelector("#op-rs-mult-range"),multInput:o.querySelector("#op-rs-mult-input"),bind:o.querySelector("#op-rs-bind"),blockW:o.querySelector("#op-rs-blockw"),blockH:o.querySelector("#op-rs-blockh"),offX:o.querySelector("#op-rs-offx"),offY:o.querySelector("#op-rs-offy"),dotR:o.querySelector("#op-rs-dotr"),dotRVal:o.querySelector("#op-rs-dotr-val"),gridToggle:o.querySelector("#op-rs-grid"),advNote:o.querySelector("#op-rs-adv-note"),resWrap:o.querySelector("#op-rs-adv-result-wrap"),resCanvas:o.querySelector("#op-rs-adv-result"),resMeta:o.querySelector("#op-rs-adv-resmeta"),calcBtn:o.querySelector("#op-rs-calc"),applyBtn:o.querySelector("#op-rs-apply"),cancelBtn:o.querySelector("#op-rs-cancel"),closeBtn:o.querySelector("#op-rs-close")},a=i.preview.getContext("2d",{willReadFrequently:!0}),n=i.simOrig.getContext("2d",{willReadFrequently:!0}),r=i.simNew.getContext("2d",{willReadFrequently:!0}),s=i.resCanvas.getContext("2d",{willReadFrequently:!0});e={...i,ov:null,img:null,origW:0,origH:0,mode:"simple",zoom:1,updating:!1,mult:4,gapX:4,gapY:4,offx:0,offy:0,dotr:1,viewX:0,viewY:0,panning:!1,panStart:null,calcCanvas:null,calcCols:0,calcRows:0,calcReady:!1};const u=()=>{const p=parseInt(e.w.value||"0",10),h=parseInt(e.h.value||"0",10),M=Number.isFinite(p)&&Number.isFinite(h)&&p>0&&h>0,A=p>=1e3||h>=1e3;return M?A?`Target: ${p}\xD7${h} (exceeds limit: must be < 1000\xD71000)`:`Target: ${p}\xD7${h} (OK)`:"Enter positive width and height."},l=()=>{const p=Math.floor((e.origW-e.offx)/e.gapX),h=Math.floor((e.origH-e.offy)/e.gapY);return{cols:Math.max(0,p),rows:Math.max(0,h)}},m=()=>{const{cols:p,rows:h}=l(),M=p>=1e3||h>=1e3;return p>0&&h>0?`Samples: ${p} \xD7 ${h} | Output: ${p}\xD7${h}${M?" (exceeds limit: < 1000\xD71000)":""}`:"Adjust multiplier/offset until dots sit at centers."},g=()=>{e.meta.textContent=e.mode==="advanced"?m():u()},y=()=>{const p=parseInt(e.w.value||"0",10),h=parseInt(e.h.value||"0",10),M=Number.isFinite(p)&&Number.isFinite(h)&&p>0&&h>0,A=p>=1e3||h>=1e3,O=M?A?`Target: ${p}\xD7${h} (exceeds limit: must be < 1000\xD71000)`:`Target: ${p}\xD7${h} (OK)`:"Enter positive width and height.";e.note&&(e.note.textContent=O),e.mode==="simple"&&(e.applyBtn.disabled=!M||A),e.mode==="simple"&&(e.meta.textContent=O)};function w(p){const h=Math.max(1,Math.round(e.origW*p)),M=Math.max(1,Math.round(e.origH*p));e.updating=!0,e.w.value=h,e.h.value=e.lock.checked?Math.max(1,Math.round(h*e.origH/e.origW)):M,e.updating=!1,y()}function f(){if(!e.img)return;const p=e.colLeft.querySelector(".pad-top").offsetHeight,h=e.colRight.querySelector(".pad-top").offsetHeight,M=e.colLeft.clientWidth,A=e.colRight.clientWidth,O=e.colLeft.clientHeight-p,X=e.colRight.clientHeight-h;e.simOrig.width=M,e.simOrig.height=O,e.simNew.width=A,e.simNew.height=X,n.save(),n.imageSmoothingEnabled=!1,n.clearRect(0,0,M,O);const q=Math.min(M/e.origW,O/e.origH),B=Math.max(1,Math.floor(e.origW*q)),T=Math.max(1,Math.floor(e.origH*q)),G=Math.floor((M-B)/2),Z=Math.floor((O-T)/2);n.drawImage(e.img,0,0,e.origW,e.origH,G,Z,B,T),n.restore();const H=parseInt(e.w.value||"0",10),K=parseInt(e.h.value||"0",10);if(r.save(),r.imageSmoothingEnabled=!1,r.clearRect(0,0,A,X),Number.isFinite(H)&&Number.isFinite(K)&&H>0&&K>0){const oe=V(H,K),U=oe.getContext("2d",{willReadFrequently:!0});U.imageSmoothingEnabled=!1,U.clearRect(0,0,H,K),U.drawImage(e.img,0,0,e.origW,e.origH,0,0,H,K);const J=U.getImageData(0,0,H,K),Q=J.data;for(let ge=0;ge<Q.length;ge+=4)Q[ge+3]!==0&&(Q[ge+3]=255);U.putImageData(J,0,0);const Xe=Math.min(A/H,X/K),ue=Math.max(1,Math.floor(H*Xe)),Se=Math.max(1,Math.floor(K*Xe)),be=Math.floor((A-ue)/2),Fe=Math.floor((X-Se)/2);r.drawImage(oe,0,0,H,K,be,Fe,ue,Se)}else r.drawImage(e.img,0,0,e.origW,e.origH,G,Z,B,T);r.restore()}const x=()=>{e.updating=!0,e.multRange.value=String(e.mult),e.multInput.value=String(e.mult),e.blockW.value=String(e.gapX),e.blockH.value=String(e.gapY),e.offX.value=String(e.offx),e.offY.value=String(e.offy),e.dotR.value=String(e.dotr),e.dotRVal.textContent=String(e.dotr),e.updating=!1};function k(){const{cols:p,rows:h}=l(),M=p>=1e3||h>=1e3;if(e.mode==="advanced")e.applyBtn.disabled=!e.calcReady;else{const A=parseInt(e.w.value||"0",10),O=parseInt(e.h.value||"0",10),X=Number.isFinite(A)&&Number.isFinite(O)&&A>0&&O>0&&A<1e3&&O<1e3;e.applyBtn.disabled=!X}g()}function v(){if(e.mode!=="advanced"||!e.img)return;const p=e.origW,h=e.origH,M=Math.max(50,Math.floor(e.advWrap.clientWidth)),A=Math.max(50,Math.floor(e.advWrap.clientHeight));e.preview.width=M,e.preview.height=A;const O=Math.max(1,Math.floor(M/e.zoom)),X=Math.max(1,Math.floor(A/e.zoom)),q=Math.max(0,p-O),B=Math.max(0,h-X);if(e.viewX=Math.min(Math.max(0,e.viewX),q),e.viewY=Math.min(Math.max(0,e.viewY),B),a.save(),a.imageSmoothingEnabled=!1,a.clearRect(0,0,M,A),a.drawImage(e.img,e.viewX,e.viewY,O,X,0,0,M,A),e.gridToggle.checked&&e.gapX>=1&&e.gapY>=1){a.strokeStyle="rgba(255,59,48,0.45)",a.lineWidth=1;const T=Math.ceil((e.viewX-e.offx)/e.gapX),G=Math.floor((e.viewX+O-e.offx)/e.gapX),Z=Math.ceil((e.viewY-e.offy)/e.gapY),H=Math.floor((e.viewY+X-e.offy)/e.gapY),K=Math.max(0,G-T+1),oe=Math.max(0,H-Z+1);if(K<=4e3&&oe<=4e3){a.beginPath();for(let U=T;U<=G;U++){const J=e.offx+U*e.gapX,Q=Math.round((J-e.viewX)*e.zoom);a.moveTo(Q+.5,0),a.lineTo(Q+.5,A)}for(let U=Z;U<=H;U++){const J=e.offy+U*e.gapY,Q=Math.round((J-e.viewY)*e.zoom);a.moveTo(0,Q+.5),a.lineTo(M,Q+.5)}a.stroke()}}if(e.gapX>=1&&e.gapY>=1){a.fillStyle="#ff3b30";const T=e.offx+Math.floor(e.gapX/2),G=e.offy+Math.floor(e.gapY/2);if(T>=0&&G>=0){const Z=Math.ceil((e.viewX-T)/e.gapX),H=Math.ceil((e.viewY-G)/e.gapY),K=Math.floor((e.viewY+X-1-G)/e.gapY),oe=Math.floor((e.viewX+O-1-T)/e.gapX),U=e.dotr,J=Math.max(0,oe-Z+1),Q=Math.max(0,K-H+1);if(J*Q<=3e5)for(let ue=H;ue<=K;ue++){const Se=G+ue*e.gapY;for(let be=Z;be<=oe;be++){const Fe=T+be*e.gapX,ge=Math.round((Fe-e.viewX)*e.zoom),jt=Math.round((Se-e.viewY)*e.zoom);a.beginPath(),a.arc(ge,jt,U,0,Math.PI*2),a.fill()}}}}a.restore()}function b(){const p=e.calcCanvas,h=e.resWrap;if(!h||!p){s.clearRect(0,0,e.resCanvas.width,e.resCanvas.height),e.resMeta.textContent="No result. Click Calculate.";return}const M=p.width,A=p.height,O=Math.max(50,Math.floor(h.clientWidth-16)),X=Math.max(50,Math.floor(h.clientHeight-16)),q=Math.min(O/M,X/A),B=Math.max(1,Math.floor(M*q)),T=Math.max(1,Math.floor(A*q));e.resCanvas.width=B,e.resCanvas.height=T,s.save(),s.imageSmoothingEnabled=!1,s.clearRect(0,0,B,T),s.drawImage(p,0,0,M,A,0,0,B,T),s.restore(),e.resMeta.textContent=`Output: ${M}\xD7${A}${M>=1e3||A>=1e3?" (exceeds limit: < 1000\xD71000)":""}`}e._drawSimplePreview=f,e._drawAdvancedPreview=v,e._drawAdvancedResultPreview=b;const C=p=>{e.mode=p,e.tabSimple.classList.toggle("active",p==="simple"),e.tabAdvanced.classList.toggle("active",p==="advanced"),e.paneSimple.classList.toggle("show",p==="simple"),e.paneAdvanced.classList.toggle("show",p==="advanced"),g(),e.calcBtn.style.display=p==="advanced"?"inline-block":"none",p==="advanced"?e.applyBtn.disabled=!e.calcReady:y(),k(),p==="advanced"?(v(),b()):f()};e.tabSimple.addEventListener("click",()=>C("simple")),e.tabAdvanced.addEventListener("click",()=>C("advanced"));const I=()=>{if(e.updating)return;e.updating=!0;const p=parseInt(e.w.value||"0",10);e.lock.checked&&e.origW>0&&e.origH>0&&p>0&&(e.h.value=Math.max(1,Math.round(p*e.origH/e.origW))),e.updating=!1,y(),e.mode==="simple"&&f()},S=()=>{if(e.updating)return;e.updating=!0;const p=parseInt(e.h.value||"0",10);e.lock.checked&&e.origW>0&&e.origH>0&&p>0&&(e.w.value=Math.max(1,Math.round(p*e.origW/e.origH))),e.updating=!1,y(),e.mode==="simple"&&f()};e.w.addEventListener("input",I),e.h.addEventListener("input",S),e.onex.addEventListener("click",()=>{w(1),f()}),e.half.addEventListener("click",()=>{w(.5),f()}),e.third.addEventListener("click",()=>{w(1/3),f()}),e.quarter.addEventListener("click",()=>{w(1/4),f()}),e.double.addEventListener("click",()=>{w(2),f()}),e.applyScale.addEventListener("click",()=>{const p=parseFloat(e.scale.value||"");if(!Number.isFinite(p)||p<=0){D("Enter a valid scale factor > 0");return}w(p),f()});const E=()=>{e.mode==="advanced"&&(e.calcReady=!1,e.applyBtn.disabled=!0,b(),g())},$=p=>{if(e.updating)return;const h=parseFloat(p);if(!Number.isFinite(h))return;const M=Math.min(Math.max(h,1),128);e.mult=M,e.bind.checked&&(e.gapX=M,e.gapY=M),x(),k(),v(),E()};e.multRange.addEventListener("input",p=>{e.updating||$(p.target.value)}),e.multInput.addEventListener("input",p=>{if(e.updating)return;const h=p.target.value;Number.isFinite(parseFloat(h))&&$(h)}),e.bind.addEventListener("change",()=>{e.bind.checked&&(e.gapX=e.mult,e.gapY=e.mult,x()),k(),v(),E()}),e.blockW.addEventListener("input",p=>{if(e.updating)return;const h=p.target.value,M=parseFloat(h);Number.isFinite(M)&&(e.gapX=Math.min(Math.max(M,1),4096),e.bind.checked&&(e.mult=e.gapX,e.gapY=e.gapX),x(),k(),v(),E())}),e.blockH.addEventListener("input",p=>{if(e.updating)return;const h=p.target.value,M=parseFloat(h);Number.isFinite(M)&&(e.gapY=Math.min(Math.max(M,1),4096),e.bind.checked&&(e.mult=e.gapY,e.gapX=e.gapY),x(),k(),v(),E())}),e.offX.addEventListener("input",p=>{const h=p.target.value,M=parseFloat(h);Number.isFinite(M)&&(e.offx=Math.min(Math.max(M,0),Math.max(0,e.origH-1e-4)),e.viewX=Math.min(e.viewX,Math.max(0,e.origW-1)),k(),v(),E())}),e.offY.addEventListener("input",p=>{const h=p.target.value,M=parseFloat(h);Number.isFinite(M)&&(e.offy=Math.min(Math.max(M,0),Math.max(0,e.origH-1e-4)),e.viewY=Math.min(e.viewY,Math.max(0,e.origH-1)),k(),v(),E())}),e.dotR.addEventListener("input",p=>{e.dotr=Math.max(1,Math.round(Number(p.target.value)||1)),e.dotRVal.textContent=String(e.dotr),v()}),e.gridToggle.addEventListener("change",v);const _=p=>{const h=Math.max(50,Math.floor(e.advWrap.clientWidth)),M=Math.max(50,Math.floor(e.advWrap.clientHeight)),A=Math.max(1,Math.floor(h/e.zoom)),O=Math.max(1,Math.floor(M/e.zoom)),X=e.viewX+A/2,q=e.viewY+O/2;e.zoom=Math.min(32,Math.max(.1,e.zoom*p));const B=Math.max(1,Math.floor(h/e.zoom)),T=Math.max(1,Math.floor(M/e.zoom));e.viewX=Math.min(Math.max(0,Math.round(X-B/2)),Math.max(0,e.origW-B)),e.viewY=Math.min(Math.max(0,Math.round(q-T/2)),Math.max(0,e.origH-T)),v()};e.zoomIn.addEventListener("click",()=>_(1.25)),e.zoomOut.addEventListener("click",()=>_(1/1.25)),e.advWrap.addEventListener("wheel",p=>{if(!p.ctrlKey)return;p.preventDefault();const h=p.deltaY||0;_(h>0?1/1.15:1.15)},{passive:!1});const W=p=>{p.target.closest(".op-rs-zoom")||(e.panning=!0,e.panStart={x:p.clientX,y:p.clientY,viewX:e.viewX,viewY:e.viewY},e.advWrap.classList.remove("op-pan-grab"),e.advWrap.classList.add("op-pan-grabbing"),e.advWrap.setPointerCapture?.(p.pointerId))},R=p=>{if(!e.panning)return;const h=p.clientX-e.panStart.x,M=p.clientY-e.panStart.y,A=e.advWrap.clientWidth,O=e.advWrap.clientHeight,X=Math.max(1,Math.floor(A/e.zoom)),q=Math.max(1,Math.floor(O/e.zoom));let B=e.panStart.viewX-Math.round(h/e.zoom),T=e.panStart.viewY-Math.round(M/e.zoom);B=Math.min(Math.max(0,B),Math.max(0,e.origW-X)),T=Math.min(Math.max(0,T),Math.max(0,e.origH-q)),e.viewX=B,e.viewY=T,v()},P=p=>{e.panning&&(e.panning=!1,e.panStart=null,e.advWrap.classList.remove("op-pan-grabbing"),e.advWrap.classList.add("op-pan-grab"),e.advWrap.releasePointerCapture?.(p.pointerId))};e.advWrap.addEventListener("pointerdown",W),e.advWrap.addEventListener("pointermove",R),e.advWrap.addEventListener("pointerup",P),e.advWrap.addEventListener("pointercancel",P),e.advWrap.addEventListener("pointerleave",P);const Y=()=>Be();e.cancelBtn.addEventListener("click",Y),e.closeBtn.addEventListener("click",Y),t.addEventListener("click",Y),e.calcBtn.addEventListener("click",async()=>{if(e.mode==="advanced")try{const{cols:p,rows:h}=l();if(p<=0||h<=0){D("No samples. Adjust multiplier/offset.");return}if(p>=1e3||h>=1e3){D("Output too large. Must be < 1000\xD71000.");return}const M=await Kt(e.img,e.origW,e.origH,e.offx,e.offy,e.gapX,e.gapY);e.calcCanvas=M,e.calcCols=p,e.calcRows=h,e.calcReady=!0,e.applyBtn.disabled=!1,b(),g(),D(`Calculated ${p}\xD7${h}. Review preview, then Apply.`)}catch(p){console.error(p),D("Calculation failed.")}}),e.applyBtn.addEventListener("click",async()=>{if(e.ov)try{if(e.mode==="simple"){const p=parseInt(e.w.value||"0",10),h=parseInt(e.h.value||"0",10);if(!Number.isFinite(p)||!Number.isFinite(h)||p<=0||h<=0){D("Invalid dimensions");return}if(p>=1e3||h>=1e3){D("Too large. Must be < 1000\xD71000.");return}await Wt(e.ov,p,h),Be(),D(`Resized to ${p}\xD7${h}.`)}else{if(!e.calcReady||!e.calcCanvas){D("Calculate first.");return}const p=await je(e.calcCanvas);e.ov.imageBase64=p,e.ov.imageUrl=null,e.ov.isLocal=!0,await L(["overlays"]),z(),j(),N(),Be(),D(`Applied ${e.calcCols}\xD7${e.calcRows}.`)}}catch(p){console.error(p),D("Apply failed.")}}),e._syncAdvancedMeta=k,e._syncSimpleNote=y,e._setMode=p=>{const h=new Event("click");(p==="simple"?e.tabSimple:e.tabAdvanced).dispatchEvent(h)}}function Ht(t){if(!e)return;e.ov=t;const o=new Image;o.onload=()=>{e.img=o,e.origW=o.width,e.origH=o.height,e.orig.value=`${e.origW}\xD7${e.origH}`,e.w.value=String(e.origW),e.h.value=String(e.origH),e.lock.checked=!0,e.zoom=1,e.mult=4,e.gapX=4,e.gapY=4,e.offx=0,e.offy=0,e.dotr=1,e.viewX=0,e.viewY=0,e.bind.checked=!0,e.multRange.value="4",e.multInput.value="4",e.blockW.value="4",e.blockH.value="4",e.offX.value="0",e.offY.value="0",e.dotR.value="1",e.dotRVal.textContent="1",e.gridToggle.checked=!0,e.calcCanvas=null,e.calcCols=0,e.calcRows=0,e.calcReady=!1,e.applyBtn.disabled=e.mode==="advanced",e._setMode("simple"),document.body.classList.add("op-scroll-lock"),e.backdrop.classList.add("show"),e.modal.style.display="flex",e._drawSimplePreview?.(),e._drawAdvancedPreview?.(),e._drawAdvancedResultPreview?.(),e._syncAdvancedMeta?.(),e._syncSimpleNote?.(),(()=>{if(e.mode==="advanced"){const{cols:n,rows:r}=(function(){const s=Math.floor((e.origW-e.offx)/e.gapX),u=Math.floor((e.origH-e.offy)/e.gapY);return{cols:Math.max(0,s),rows:Math.max(0,u)}})();e.meta.textContent=n>0&&r>0?`Samples: ${n} \xD7 ${r} | Output: ${n}\xD7${r}${n>=1e3||r>=1e3?" (exceeds limit: < 1000\xD71000)":""}`:"Adjust multiplier/offset until dots sit at centers."}else{const n=parseInt(e.w.value||"0",10),r=parseInt(e.h.value||"0",10),s=Number.isFinite(n)&&Number.isFinite(r)&&n>0&&r>0,u=n>=1e3||r>=1e3;e.meta.textContent=s?u?`Target: ${n}\xD7${r} (exceeds limit: must be < 1000\xD71000)`:`Target: ${n}\xD7${r} (OK)`:"Enter positive width and height."}})();const a=()=>{e.mode==="simple"?e._drawSimplePreview?.():(e._drawAdvancedPreview?.(),e._drawAdvancedResultPreview?.())};e._resizeHandler=a,window.addEventListener("resize",a)},o.src=t.imageBase64}function Be(){e&&(window.removeEventListener("resize",e._resizeHandler||(()=>{})),e.backdrop.classList.remove("show"),e.modal.style.display="none",e.ov=null,e.img=null,document.body.classList.remove("op-scroll-lock"))}async function Wt(t,o,i){const a=await le(t.imageBase64),n=Re(o,i),r=n.getContext("2d",{willReadFrequently:!0});r.imageSmoothingEnabled=!1,r.clearRect(0,0,o,i),r.drawImage(a,0,0,a.width,a.height,0,0,o,i);const s=r.getImageData(0,0,o,i),u=s.data;for(let m=3;m<u.length;m+=4)u[m]>0&&(u[m]=255);r.putImageData(s,0,0);const l=n.toDataURL("image/png");t.imageBase64=l,t.imageUrl=null,t.isLocal=!0,await L(["overlays"]),z(),j(),N()}async function Kt(t,o,i,a,n,r,s){const l=V(o,i).getContext("2d",{willReadFrequently:!0});l.imageSmoothingEnabled=!1,l.drawImage(t,0,0);const m=l.getImageData(0,0,o,i).data,g=Math.floor((o-a)/r),y=Math.floor((i-n)/s);if(g<=0||y<=0)throw new Error("No samples available with current offset/gap");const w=Re(g,y),f=w.getContext("2d"),x=f.createImageData(g,y),k=x.data,v=a+r/2,b=n+s/2,C=(I,S,E)=>Math.min(Math.max(I,S),E);for(let I=0;I<y;I++)for(let S=0;S<g;S++){const E=Math.round(C(v+S*r,0,o-1)),_=(Math.round(C(b+I*s,0,i-1))*o+E)*4,W=m[_],R=m[_+1],P=m[_+2],Y=m[_+3],p=(I*g+S)*4;Y===0?(k[p]=0,k[p+1]=0,k[p+2]=0,k[p+3]=0):(k[p]=W,k[p+1]=R,k[p+2]=P,k[p+3]=255)}return f.putImageData(x,0,0),w}function Vt(){It().then(()=>{j();const t=async()=>{St(),$t(),Pe(),await te()};document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t(),console.log("Hail's OP: Initialized with Minify (fixed 3\xD7) mode.")})}Vt()})();
