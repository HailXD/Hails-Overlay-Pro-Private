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

(function(){"use strict";const J=window.fetch,rt=(t,o)=>{try{if(typeof GM<"u"&&typeof GM.getValue=="function")return GM.getValue(t,o);if(typeof GM_getValue=="function")return Promise.resolve(GM_getValue(t,o))}catch{}return Promise.resolve(o)},st=(t,o)=>{try{if(typeof GM<"u"&&typeof GM.setValue=="function")return GM.setValue(t,o);if(typeof GM_setValue=="function")return Promise.resolve(GM_setValue(t,o))}catch{}return Promise.resolve()};function lt(t){return new Promise((o,i)=>{try{GM_xmlhttpRequest({method:"GET",url:t,responseType:"blob",onload:a=>{a.status>=200&&a.status<300&&a.response?o(a.response):i(new Error(`GM_xhr failed: ${a.status} ${a.statusText}`))},onerror:()=>i(new Error("GM_xhr network error")),ontimeout:()=>i(new Error("GM_xhr timeout"))})}catch(a){i(a)}})}function Fe(t){return new Promise((o,i)=>{const a=new FileReader;a.onload=()=>o(a.result),a.onerror=i,a.readAsDataURL(t)})}async function Ne(t){const o=await lt(t);if(!o||!String(o.type).startsWith("image/"))throw new Error("URL did not return an image blob");return await Fe(o)}function ct(t){return new Promise((o,i)=>{const a=new FileReader;a.onload=()=>o(a.result),a.onerror=i,a.readAsDataURL(t)})}const Gt=[{1:[0,0,0],2:[60,60,60],3:[120,120,120],4:[210,210,210],5:[255,255,255],6:[96,0,24],7:[237,28,36],8:[255,127,39],9:[246,170,9],10:[249,221,59],11:[255,250,188],12:[14,185,104],13:[19,230,123],14:[135,255,94],15:[12,129,110],16:[16,174,166],17:[19,225,190],18:[40,80,158],19:[64,147,228],20:[96,247,242],21:[107,80,246],22:[153,177,251],23:[120,12,153],24:[170,56,185],25:[224,159,249],26:[203,0,122],27:[236,31,128],28:[243,141,169],29:[104,70,52],30:[149,104,42],31:[248,178,119],32:[170,170,170],33:[165,14,30],34:[250,128,114],35:[228,92,26],36:[214,181,148],37:[156,132,49],38:[197,173,49],39:[232,212,95],40:[74,107,58],41:[90,148,74],42:[132,197,115],43:[15,121,159],44:[187,250,242],45:[125,199,255],46:[77,49,184],47:[74,66,132],48:[122,113,196],49:[181,174,241],50:[219,164,99],51:[209,128,81],52:[255,197,165],53:[155,82,73],54:[209,128,120],55:[250,182,164],56:[123,99,82],57:[156,132,107],58:[51,57,65],59:[109,117,141],60:[179,185,209],61:[109,100,63],62:[148,140,107],63:[205,197,158]}],xe=[[0,0,0],[60,60,60],[120,120,120],[210,210,210],[255,255,255],[96,0,24],[237,28,36],[255,127,39],[246,170,9],[249,221,59],[255,250,188],[14,185,104],[19,230,123],[135,255,94],[12,129,110],[16,174,166],[19,225,190],[96,247,242],[40,80,158],[64,147,228],[107,80,246],[153,177,251],[120,12,153],[170,56,185],[224,159,249],[203,0,122],[236,31,128],[243,141,169],[104,70,52],[149,104,42],[248,178,119]],te=[[170,170,170],[165,14,30],[250,128,114],[228,92,26],[156,132,49],[197,173,49],[232,212,95],[74,107,58],[90,148,74],[132,197,115],[15,121,159],[187,250,242],[125,199,255],[77,49,184],[74,66,132],[122,113,196],[181,174,241],[155,82,73],[209,128,120],[250,182,164],[219,164,99],[123,99,82],[156,132,107],[214,181,148],[209,128,81],[255,197,165],[109,100,63],[148,140,107],[205,197,158],[51,57,65],[109,117,141],[179,185,209]],dt=[...xe,...te],qe=new Map;dt.forEach((t,o)=>{qe.set(t.join(","),o+1)});const me={"0,0,0":"Black","60,60,60":"Dark Gray","120,120,120":"Gray","210,210,210":"Light Gray","255,255,255":"White","96,0,24":"Deep Red","237,28,36":"Red","255,127,39":"Orange","246,170,9":"Gold","249,221,59":"Yellow","255,250,188":"Light Yellow","14,185,104":"Dark Green","19,230,123":"Green","135,255,94":"Light Green","12,129,110":"Dark Teal","16,174,166":"Teal","19,225,190":"Light Teal","96,247,242":"Cyan","40,80,158":"Dark Blue","64,147,228":"Blue","107,80,246":"Indigo","153,177,251":"Light Indigo","120,12,153":"Dark Purple","170,56,185":"Purple","224,159,249":"Light Purple","203,0,122":"Dark Pink","236,31,128":"Pink","243,141,169":"Light Pink","104,70,52":"Dark Brown","149,104,42":"Brown","248,178,119":"Beige","170,170,170":"Medium Gray","165,14,30":"Dark Red","250,128,114":"Light Red","228,92,26":"Dark Orange","156,132,49":"Dark Goldenrod","197,173,49":"Goldenrod","232,212,95":"Light Goldenrod","74,107,58":"Dark Olive","90,148,74":"Olive","132,197,115":"Light Olive","15,121,159":"Dark Cyan","187,250,242":"Light Cyan","125,199,255":"Light Blue","77,49,184":"Dark Indigo","74,66,132":"Dark Slate Blue","122,113,196":"Slate Blue","181,174,241":"Light Slate Blue","155,82,73":"Dark Peach","209,128,120":"Peach","250,182,164":"Light Peach","219,164,99":"Light Brown","123,99,82":"Dark Tan","156,132,107":"Tan","214,181,148":"Light Tan","209,128,81":"Dark Beige","255,197,165":"Light Beige","109,100,63":"Dark Stone","148,140,107":"Stone","205,197,158":"Light Stone","51,57,65":"Dark Slate","109,117,141":"Slate","179,185,209":"Light Slate"};let pt=new Set;function Ue(){const t=new Set;try{const o=new Set(te.map(([a,n,r])=>`${a},${n},${r}`)),i=document.querySelectorAll('svg[class~="text-base-content/80"]');for(const a of i){const n=a.closest("button");if(!n)continue;let r=n.style?.background||n.style?.backgroundColor||"";r||(r=(n.ownerDocument?.defaultView||window).getComputedStyle(n).backgroundColor||"");const s=/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i.exec(r);if(!s)continue;const d=`${parseInt(s[1],10)},${parseInt(s[2],10)},${parseInt(s[3],10)}`;o.has(d)&&t.add(d)}}catch(o){console.debug("scanAndCollectPaidKeysFromButtons failed:",o)}return pt=t,t}const we=xe.map(([t,o,i])=>`${t},${o},${i}`),ze=[];class he extends Map{constructor(o){super(),this.limit=o}set(o,i){if(this.size>=this.limit){const a=this.keys().next().value;this.delete(a)}return super.set(o,i)}}const He=unsafeWindow;function We(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function Ae(t){const o=new Set(c.overlays.map(a=>(a.name||"").toLowerCase()));if(!o.has(t.toLowerCase()))return t;let i=1;for(;o.has(`${t} (${i})`.toLowerCase());)i++;return`${t} (${i})`}function V(t,o){if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(t,o);const i=document.createElement("canvas");return i.width=t,i.height=o,i}function De(t,o){const i=document.createElement("canvas");return i.width=t,i.height=o,i}function fe(t){return t.convertToBlob?t.convertToBlob():new Promise((o,i)=>t.toBlob(a=>a?o(a):i(new Error("toBlob failed")),"image/png"))}async function Ke(t){if(t&&typeof t.toDataURL=="function")return t.toDataURL("image/png");if(t&&typeof t.convertToBlob=="function"){const o=await t.convertToBlob();return await Fe(o)}if(typeof OffscreenCanvas<"u"&&t instanceof OffscreenCanvas){const o=t.transferToImageBitmap?.();if(o){const i=De(t.width,t.height);return i.getContext("2d").drawImage(o,0,0),i.toDataURL("image/png")}}throw new Error("Cannot export canvas to data URL")}async function ce(t){if(typeof createImageBitmap=="function")try{return await createImageBitmap(t)}catch{}return new Promise((o,i)=>{const a=URL.createObjectURL(t),n=new Image;n.onload=()=>{URL.revokeObjectURL(a),o(n)},n.onerror=r=>{URL.revokeObjectURL(a),i(r)},n.src=a})}async function ut(t){const o=await ce(t),a=V(o.width,o.height).getContext("2d");return a.drawImage(o,0,0),a.getImageData(0,0,o.width,o.height)}async function Ve(t){if(!t.imageBase64)return null;if(t.visibleColorKeys==null)return await le(t.imageBase64);const o=t.visibleColorKeys.slice().sort().join(","),a=`${t.imageBase64.slice(0,64)+":"+t.imageBase64.length}|${o}`;if(Ee.has(a))return Ee.get(a);const n=await le(t.imageBase64),r=n.width,s=n.height,d=V(r,s),l=d.getContext("2d",{willReadFrequently:!0});l.drawImage(n,0,0);const m=l.getImageData(0,0,r,s),g=m.data,v=new Set(t.visibleColorKeys);for(let f=0;f<g.length;f+=4)if(g[f+3]>0){const b=`${g[f]},${g[f+1]},${g[f+2]}`;v.has(b)||(g[f+3]=0)}l.putImageData(m,0,0);const w=await(typeof createImageBitmap=="function"?createImageBitmap(d):le(await Ke(d)));return Ee.set(a,w),w}function le(t){return Me.has(t)?Promise.resolve(Me.get(t)):new Promise((o,i)=>{const a=new Image;a.crossOrigin="anonymous",a.onload=()=>{Me.set(t,a),o(a)},a.onerror=i,a.src=t})}function de(t){try{const o=new URL(t),i=o.pathname.split("/"),a=new URLSearchParams(o.search);return{chunk1:parseInt(i[3],10),chunk2:parseInt(i[4],10),posX:parseInt(a.get("x")||"0",10),posY:parseInt(a.get("y")||"0",10)}}catch{return{chunk1:0,chunk2:0,posX:0,posY:0}}}function gt(t){try{const o=new URL(t,location.href);if(o.hostname!=="backend.wplace.live"||!o.pathname.startsWith("/files/"))return null;const i=o.pathname.match(/\/(\d+)\/(\d+)\.png$/i);return i?{chunk1:parseInt(i[1],10),chunk2:parseInt(i[2],10)}:null}catch{return null}}function mt(t){try{const o=new URL(t,location.href);if(o.hostname!=="backend.wplace.live")return null;const i=o.pathname.match(/\/s0\/pixel\/(\d+)\/(\d+)$/);if(!i)return null;const a=o.searchParams;return{normalized:`https://backend.wplace.live/s0/pixel/${i[1]}/${i[2]}?x=${a.get("x")||0}&y=${a.get("y")||0}`}}catch{return null}}function je(t,o,i,a,n,r,s,d){const l=Math.max(t,n),m=Math.max(o,r),g=Math.min(t+i,n+s),v=Math.min(o+a,r+d),w=Math.max(0,g-l),f=Math.max(0,v-m);return{x:l,y:m,w,h:f}}const oe=new he(50),ke=new Set,Me=new he(50),Ee=new he(50),pe=new he(200),ve=new he(200),Ce=new Map;function Re(t){return[t.imageBase64?t.imageBase64.slice(0,64)+":"+t.imageBase64.length:"none",t.pixelUrl||"null",t.offsetX,t.offsetY,t.opacity].join("|")}function U(){oe.clear(),Me.clear(),Ee.clear(),pe.clear(),ve.clear(),Ce.clear()}async function Ze(t,o,i){if(!t.enabled||!t.imageBase64||!t.pixelUrl||ke.has(t.id))return null;const a=Re(t),n=`${t.id}|${a}|${o}|${i}`;if(oe.has(n))return oe.get(n);const r=await Ve(t);if(!r)return null;const s=r.width,d=r.height;if(s>=1e3||d>=1e3)return ke.add(t.id),D(`Overlay "${t.name}" skipped: image too large (must be smaller than 1000\xD71000; got ${s}\xD7${d}).`),null;const l=de(t.pixelUrl);if(!Number.isFinite(l.chunk1)||!Number.isFinite(l.chunk2))return null;const m=l.chunk1*1e3+l.posX+t.offsetX-o*1e3,g=l.chunk2*1e3+l.posY+t.offsetY-i*1e3,v=je(0,0,1e3,1e3,m,g,s,d);if(v.w===0||v.h===0)return oe.set(n,null),null;const f=V(1e3,1e3).getContext("2d",{willReadFrequently:!0});f.drawImage(r,m,g);const b=f.getImageData(v.x,v.y,v.w,v.h),k=c.overlayMode==="smart"||c.overlayMode==="diff"?new Uint8ClampedArray(b.data):null,y=b.data,x=t.opacity,C=255*(1-x);for(let I=0;I<y.length;I+=4)y[I+3]>0&&(c.highlightPixels?(y[I]=255,y[I+1]=0,y[I+2]=255):(y[I]=Math.round(y[I]*x+C),y[I+1]=Math.round(y[I+1]*x+C),y[I+2]=Math.round(y[I+2]*x+C)),y[I+3]=255);const S={imageData:b,dx:v.x,dy:v.y,rawData:k};return oe.set(n,S),S}async function ht(t,o,i){if(!t.enabled||!t.imageBase64||!t.pixelUrl||ke.has(t.id))return null;const a=3,n=Re(t),r=`${t.id}|${n}|minify|s${a}|${o}|${i}`;if(oe.has(r))return oe.get(r);const s=await Ve(t);if(!s)return null;const d=s.width,l=s.height;if(d>=1e3||l>=1e3)return ke.add(t.id),D(`Overlay "${t.name}" skipped: image too large (must be smaller than 1000\xD71000; got ${d}\xD7${l}).`),null;const m=de(t.pixelUrl);if(!Number.isFinite(m.chunk1)||!Number.isFinite(m.chunk2))return null;const g=m.chunk1*1e3+m.posX+t.offsetX-o*1e3,v=m.chunk2*1e3+m.posY+t.offsetY-i*1e3,w=1e3*a,f=1e3*a,b=Math.round(g*a),k=Math.round(v*a),y=d*a,x=l*a,E=je(0,0,w,f,b,k,y,x);if(E.w===0||E.h===0)return oe.set(r,null),null;const S=V(w,f).getContext("2d",{willReadFrequently:!0});S.imageSmoothingEnabled=!1,S.clearRect(0,0,w,f),S.drawImage(s,0,0,d,l,b,k,y,x);const I=S.getImageData(E.x,E.y,E.w,E.h),$=I.data,O=t.opacity,_=255*(1-O),B=Math.floor(a/2),z=E.w;for(let h=0;h<$.length;h+=4){if($[h+3]===0)continue;const A=h/4%z,P=Math.floor(h/4/z),T=E.x+A,X=E.y+P;T%a===B&&X%a===B?(c.highlightPixels?($[h]=255,$[h+1]=0,$[h+2]=255):($[h]=Math.round($[h]*O+_),$[h+1]=Math.round($[h+1]*O+_),$[h+2]=Math.round($[h+2]*O+_)),$[h+3]=255):($[h]=0,$[h+1]=0,$[h+2]=0,$[h+3]=0)}const u={imageData:I,dx:E.x,dy:E.y,scaled:!0,scale:a};return oe.set(r,u),u}async function ft(t,o){if(!o||o.length===0)return t;const i=await ce(t),a=i.width,n=i.height,r=V(a,n),s=r.getContext("2d");for(const d of o)d&&s.putImageData(d.imageData,d.dx,d.dy);return s.drawImage(i,0,0),await fe(r)}async function vt(t,o){if(!o||o.length===0)return t;const i=await ce(t),a=i.width,n=i.height,r=V(a,n),s=r.getContext("2d");s.drawImage(i,0,0);for(const d of o){if(!d||!d.imageData||d.imageData.width===0||d.imageData.height===0)continue;const l=V(d.imageData.width,d.imageData.height);l.getContext("2d").putImageData(d.imageData,0,0),s.drawImage(l,d.dx,d.dy)}return await fe(r)}async function yt(t,o){if(!o||o.length===0)return t;const i=await ce(t),a=i.width,n=i.height,r=V(a,n),s=r.getContext("2d",{willReadFrequently:!0});s.drawImage(i,0,0);const d=s.getImageData(0,0,a,n),l=d.data,m=new Uint32Array(l.buffer);for(const g of o){if(!g||!g.rawData)continue;const v=g.rawData,w=g.imageData.data,f=g.imageData.width,b=g.imageData.height,k=new Uint32Array(v.buffer),y=new Uint32Array(w.buffer);for(let x=0;x<b;x++){const E=g.dy+x;if(!(E<0||E>=n))for(let C=0;C<f;C++){const S=g.dx+C;if(S<0||S>=a)continue;const I=(x*f+C)*4;if(v[I+3]>0){const $=E*a+S,O=x*f+C;k[O]!==m[$]&&(m[$]=y[O])}}}}return s.putImageData(d,0,0),await fe(r)}async function bt(t,o){if(!o||o.length===0)return t;const i=await ce(t),a=i.width,n=i.height,r=V(a,n),s=r.getContext("2d",{willReadFrequently:!0});s.drawImage(i,0,0);const d=s.getImageData(0,0,a,n),l=d.data,m=new Uint32Array(l.buffer);for(const g of o){if(!g||!g.rawData)continue;const v=g.rawData,w=g.imageData.data,f=g.imageData.width,b=g.imageData.height,k=new Uint32Array(v.buffer),y=new Uint32Array(w.buffer);for(let x=0;x<b;x++){const E=g.dy+x;if(!(E<0||E>=n))for(let C=0;C<f;C++){const S=g.dx+C;if(S<0||S>=a)continue;const I=(x*f+C)*4;if(v[I+3]>0){const $=E*a+S,O=$,R=x*f+C;l[$*4+3]>0&&k[R]!==m[O]&&(m[O]=y[R])}}}}return s.putImageData(d,0,0),await fe(r)}async function xt(t,o){if(!o||o.length===0)return t;const i=3,a=await ce(t),n=a.width,r=a.height,s=V(n*i,r*i),d=s.getContext("2d",{willReadFrequently:!0});d.imageSmoothingEnabled=!1,d.drawImage(a,0,0,n*i,r*i);for(const l of o){if(!l)continue;const m=l.imageData.width,g=l.imageData.height;if(m===0||g===0)continue;const v=V(m,g);v.getContext("2d",{willReadFrequently:!0}).putImageData(l.imageData,0,0),d.drawImage(v,l.dx,l.dy)}return await fe(s)}function D(t,o=3e3){let i=document.getElementById("op-toast-stack");i||(i=document.createElement("div"),i.className="op-toast-stack",i.id="op-toast-stack",document.body.appendChild(i)),i.classList.toggle("op-dark",c.theme==="dark");const a=document.createElement("div");a.className="op-toast",a.textContent=t,i.appendChild(a),requestAnimationFrame(()=>a.classList.add("show")),setTimeout(()=>{a.classList.remove("show"),setTimeout(()=>a.remove(),200)},o)}async function wt(t,o,i){const a=parseInt(t[1],10),n=parseInt(t[2],10),r=F(),s=c.hijackPixelCount||1;if(!r||!r.enabled||!r.imageBase64||!r.pixelUrl)return J(o,i);const d=await Ze(r,a,n);if(!d||!d.rawData)return J(o,i);const l=`${a},${n}`,m=pe.get(l),g=r.visibleColorKeys?new Set(r.visibleColorKeys):null,v=d.rawData,w=d.imageData.width,f=d.imageData.height,b=[];for(let R=0;R<f;R++)for(let _=0;_<w;_++){const B=d.dx+_,z=d.dy+R;if(B<0||B>=1e3||z<0||z>=1e3)continue;const u=(R*w+_)*4;if(v[u+3]===0)continue;const h=v[u],M=v[u+1],A=v[u+2],P=`${h},${M},${A}`;if(g&&!g.has(P))continue;let T=!1;const X=c.overlayMode;if(X==="behind"||X==="above"||X==="minify")T=!0;else if(X==="smart"||X==="diff"){if(!m)continue;const q=m.data,Y=m.width,j=(z*Y+B)*4,ee=q[j],W=q[j+1],K=q[j+2],ae=q[j+3],H=h!==ee||M!==W||A!==K;(X==="smart"&&H||X==="diff"&&H&&ae>0)&&(T=!0)}T&&b.push({x:B,y:z,r:h,g:M,b:A})}if(b.length===0)return D("Hijack: No placeable pixels found for this tile."),J(o,i);b.sort((R,_)=>R.y!==_.y?R.y-_.y:R.x-_.x);const k=b[0],y=R=>Math.sqrt(Math.pow(R.x-k.x,2)+Math.pow(R.y-k.y,2));b.sort((R,_)=>y(R)-y(_));const x=b.slice(0,s),E=[],C=[];if(x.forEach(R=>{const _=`${R.r},${R.g},${R.b}`,B=qe.get(_);B!==void 0&&(E.push(B),C.push(R.x,R.y))}),E.length===0)return D("Hijack: Could not map colors for placeable pixels."),J(o,i);let S;try{if(typeof i.body=="string")S=JSON.parse(i.body);else return console.error("Hail's OP: Hijack failed, request body is not a string."),J(o,i)}catch(R){return console.error("Hail's OP: Hijack failed to parse original body.",R),J(o,i)}const I={...S,colors:E,coords:C},$=JSON.stringify(I);D(`Hijacking: Placing ${E.length} pixels.`);const O={...i,body:$};return O.headers&&O.headers["Content-Length"]&&delete O.headers["Content-Length"],J(o,O)}let Le=!1;function kt(){const t=c.overlays.some(a=>a.enabled&&a.imageBase64),o=!!c.autoCapturePixelUrl&&!!c.activeOverlayId;return(c.overlayMode==="behind"||c.overlayMode==="above"||c.overlayMode==="smart"||c.overlayMode==="diff"||c.overlayMode==="minify")&&(t||o)&&c.overlays.length>0}function Z(){kt()?Mt():Et()}function Mt(){if(Le)return;const t=J,o=async(i,a)=>{const n=typeof i=="string"?i:i&&i.url||"",r=(a?.method||"GET").toUpperCase();if(c.hijackRequests&&r==="POST"){const l=n.match(/\/s0\/pixel\/(\d+)\/(\d+)$/);if(l)try{return await wt(l,i,a)}catch(m){console.error("Hail's OP: Error during hijack",m)}}if(c.autoCapturePixelUrl&&c.activeOverlayId){const l=mt(n);if(l){const m=c.overlays.find(g=>g.id===c.activeOverlayId);if(m&&m.pixelUrl!==l.normalized){m.pixelUrl=l.normalized,m.offsetX=0,m.offsetY=0,await L(["overlays"]),U(),c.autoCapturePixelUrl=!1,await L(["autoCapturePixelUrl"]),N();const v=de(m.pixelUrl);D(`Anchor set for "${m.name}": chunk ${v.chunk1}/${v.chunk2} at (${v.posX}, ${v.posY}). Offset reset to (0,0).`),Z()}}}const s=gt(n);if(!s||!["behind","above","smart","diff","minify"].includes(c.overlayMode))return t(i,a);try{const l=await t(i,a);if(!l.ok||!(l.headers.get("Content-Type")||"").toLowerCase().includes("image"))return l;const g=c.overlays.filter(b=>b.enabled&&b.imageBase64&&b.pixelUrl);if(g.length===0)return l;const v=await l.blob();try{const b=await ut(v.slice()),k=`${s.chunk1},${s.chunk2}`;pe.set(k,b)}catch(b){console.error("Hail's OP: Failed to cache tile",b)}if(v.size>15*1024*1024)return l;let w;if(c.overlayMode==="minify"){const b=[];for(const k of g)b.push(await ht(k,s.chunk1,s.chunk2));w=await xt(v,b.filter(Boolean))}else{const b=[];for(const k of g)b.push(await Ze(k,s.chunk1,s.chunk2));c.overlayMode==="smart"?w=await yt(v,b.filter(Boolean)):c.overlayMode==="diff"?w=await bt(v,b.filter(Boolean)):w=await(c.overlayMode==="behind"?ft(v,b.filter(Boolean)):vt(v,b.filter(Boolean)))}const f=new Headers(l.headers);return f.set("Content-Type","image/png"),f.delete("Content-Length"),new Response(w,{status:l.status,statusText:l.statusText,headers:f})}catch(l){return console.error("Hail's OP: Error processing tile",l),t(i,a)}};He.fetch=o,window.fetch=o,Le=!0}function Et(){Le&&(He.fetch=J,window.fetch=J,Le=!1)}const c={overlays:[],activeOverlayId:null,overlayMode:"behind",isPanelCollapsed:!1,autoCapturePixelUrl:!1,panelX:null,panelY:null,theme:"light",collapseList:!1,collapseEditor:!1,collapseNudge:!1,collapseColors:!1,highlightPixels:!1,hijackRequests:!1,hijackPixelCount:1,ccFreeKeys:we.slice(),ccPaidKeys:ze.slice(),ccZoom:1,ccRealtime:!1,colorSortBy:"errorCount",colorsScrollTop:0},Ge=Object.keys(c);async function Ct(){try{await Promise.all(Ge.map(async t=>{c[t]=await rt(t,c[t])})),(!Array.isArray(c.ccFreeKeys)||c.ccFreeKeys.length===0)&&(c.ccFreeKeys=we.slice()),Array.isArray(c.ccPaidKeys)||(c.ccPaidKeys=ze.slice()),(!Number.isFinite(c.ccZoom)||c.ccZoom<=0)&&(c.ccZoom=1),typeof c.ccRealtime!="boolean"&&(c.ccRealtime=!1)}catch(t){console.error("Hail's OP: Failed to load config",t)}}async function L(t=Ge){try{await Promise.all(t.map(o=>st(o,c[o])))}catch(o){console.error("Hail's OP: Failed to save config",o)}}function Lt(){const t=document.createElement("style");t.textContent=`
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
    `,document.head.appendChild(t)}function It(){if(document.getElementById("overlay-pro-panel"))return;const t=document.createElement("div");t.id="overlay-pro-panel";const i=Math.max(12,window.innerWidth-340-80);t.style.left=(Number.isFinite(c.panelX)?c.panelX:i)+"px",t.style.top=(Number.isFinite(c.panelY)?c.panelY:120)+"px",t.innerHTML=`
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
                   <div class="op-row space" style="padding: 4px 0;">
                      <div>
                          <input type="checkbox" id="op-hijack-toggle" style="margin-left: 4px;">
                          <label for="op-hijack-toggle" style="cursor:pointer;">Hijack Requests</label>
                      </div>
                      <div class="op-row">
                          <label for="op-pixel-count" class="op-muted">Pixel Count:</label>
                          <input type="number" class="op-input" id="op-pixel-count" style="width: 60px;" min="1" step="1">
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
    `,document.body.appendChild(t),Bt(),qt(),Ot(),_t(t),N()}function F(){return c.overlays.find(t=>t.id===c.activeOverlayId)||null}function Je(){const t=document.getElementById("op-overlay-list");if(t){t.innerHTML="";for(const o of c.overlays){const i=document.createElement("div");i.className="op-item"+(o.id===c.activeOverlayId?" active":"");const a=o.isLocal?" (local)":o.imageBase64?"":" (no image)";i.innerHTML=`
        <input type="radio" name="op-active" ${o.id===c.activeOverlayId?"checked":""} title="Set active"/>
        <input type="checkbox" ${o.enabled?"checked":""} title="Toggle enabled"/>
        <div class="op-item-name" title="${(o.name||"(unnamed)")+a}">${(o.name||"(unnamed)")+a}</div>
        <button class="op-icon-btn" title="Delete overlay">\u{1F5D1}\uFE0F</button>
      `;const[n,r,s,d]=i.children;n.addEventListener("change",async()=>{const l=c.activeOverlayId!==o.id;c.activeOverlayId=o.id,await L(["activeOverlayId"]),N(),l&&await Q(!1)}),r.addEventListener("change",()=>{o.enabled=r.checked,L(["overlays"]),U(),Z()}),s.addEventListener("click",async()=>{const l=c.activeOverlayId!==o.id;c.activeOverlayId=o.id,await L(["activeOverlayId"]),N(),l&&await Q(!1)}),d.addEventListener("click",async l=>{if(l.stopPropagation(),!confirm(`Delete overlay "${o.name||"(unnamed)"}"?`))return;const m=c.overlays.findIndex(g=>g.id===o.id);if(m>=0){const g=c.activeOverlayId===o.id;c.overlays.splice(m,1),g&&(c.activeOverlayId=c.overlays[0]?.id||null),await L(["overlays","activeOverlayId"]),U(),Z(),N(),g&&await Q()}}),t.appendChild(i)}}}async function St(){const t=Ae("Overlay"),o={id:We(),name:t,enabled:!0,imageUrl:null,imageBase64:null,isLocal:!1,pixelUrl:null,offsetX:0,offsetY:0,opacity:.7,visibleColorKeys:[]};return c.overlays.push(o),c.activeOverlayId=o.id,await L(["overlays","activeOverlayId"]),U(),Z(),N(),await Q(),o}async function $t(t,o){const i=await Ne(o);t.imageUrl=o,t.imageBase64=i,t.isLocal=!1,await L(["overlays"]),U(),c.autoCapturePixelUrl=!0,await L(["autoCapturePixelUrl"]),Z(),N(),await Q(),D("Image loaded. Placement mode ON -- click once to set anchor.")}async function Qe(t,o){if(!o||!o.type||!o.type.startsWith("image/")){alert("Please choose an image file.");return}if(!confirm("Local PNGs cannot be exported to friends! Are you sure?"))return;const i=await ct(o);t.imageBase64=i,t.imageUrl=null,t.isLocal=!0,await L(["overlays"]),U(),c.autoCapturePixelUrl=!0,await L(["autoCapturePixelUrl"]),Z(),N(),await Q(),D("Local image loaded. Placement mode ON -- click once to set anchor.")}async function At(t){let o;try{o=JSON.parse(t)}catch{alert("Invalid JSON");return}const i=Array.isArray(o)?o:[o];let a=0,n=0;for(const r of i){const s=Ae(r.name||"Imported Overlay"),d=r.imageUrl,l=r.pixelUrl??null,m=Number.isFinite(r.offsetX)?r.offsetX:0,g=Number.isFinite(r.offsetY)?r.offsetY:0,v=Number.isFinite(r.opacity)?r.opacity:.7;if(!d){n++;continue}try{const w=await Ne(d),f={id:We(),name:s,enabled:!0,imageUrl:d,imageBase64:w,isLocal:!1,pixelUrl:l,offsetX:m,offsetY:g,opacity:v,visibleColorKeys:[]};c.overlays.push(f),a++}catch(w){console.error("Import failed for",d,w),n++}}a>0&&(c.activeOverlayId=c.overlays[c.overlays.length-1].id,await L(["overlays","activeOverlayId"]),U(),Z(),N(),await Q()),alert(`Import finished. Imported: ${a}${n?`, Failed: ${n}`:""}`)}function Dt(){const t=F();if(!t){alert("No active overlay selected.");return}if(t.isLocal||!t.imageUrl){alert("This overlay uses a local image and cannot be exported. Please host the image and set an image URL.");return}const o={version:1,name:t.name,imageUrl:t.imageUrl,pixelUrl:t.pixelUrl??null,offsetX:t.offsetX,offsetY:t.offsetY,opacity:t.opacity},i=JSON.stringify(o,null,2);Oe(i).then(()=>alert("Overlay JSON copied to clipboard!")).catch(()=>{prompt("Copy the JSON below:",i)})}function Oe(t){return navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(t):Promise.reject(new Error("Clipboard API not available"))}let et;function Rt(){clearTimeout(et),et=setTimeout(()=>{L(["colorsScrollTop"])},250)}function Ot(){const t=n=>document.getElementById(n);t("op-theme-toggle").addEventListener("click",async n=>{n.stopPropagation(),c.theme=c.theme==="light"?"dark":"light",await L(["theme"]),_e()}),t("op-refresh-btn").addEventListener("click",n=>{n.stopPropagation(),location.reload()}),t("op-mode-select").addEventListener("change",n=>{c.overlayMode=n.target.value,L(["overlayMode"]),Z(),N()}),t("op-autocap-toggle").addEventListener("click",()=>{c.autoCapturePixelUrl=!c.autoCapturePixelUrl,L(["autoCapturePixelUrl"]),Z(),N()}),t("op-highlight-toggle").addEventListener("change",async n=>{c.highlightPixels=n.target.checked,await L(["highlightPixels"]),U()}),t("op-hijack-toggle").addEventListener("change",async n=>{c.hijackRequests=n.target.checked,await L(["hijackRequests"]),N()}),t("op-pixel-count").addEventListener("input",async n=>{const r=parseInt(n.target.value,10);Number.isFinite(r)&&r>0&&(c.hijackPixelCount=r,await L(["hijackPixelCount"]))}),t("op-add-overlay").addEventListener("click",async()=>{try{await St()}catch(n){console.error(n)}}),t("op-import-overlay").addEventListener("click",async()=>{const n=prompt("Paste overlay JSON (single or array):");n&&await At(n)}),t("op-export-overlay").addEventListener("click",()=>Dt()),t("op-collapse-list").addEventListener("click",()=>{c.collapseList=!c.collapseList,L(["collapseList"]),N()}),t("op-collapse-editor").addEventListener("click",()=>{c.collapseEditor=!c.collapseEditor,L(["collapseEditor"]),N()}),t("op-collapse-nudge").addEventListener("click",()=>{c.collapseNudge=!c.collapseNudge,L(["collapseNudge"]),N()}),t("op-collapse-colors").addEventListener("click",()=>{c.collapseColors=!c.collapseColors,L(["collapseColors"]),N()}),t("op-colors-refresh").addEventListener("click",async()=>{ve.clear(),await Q()}),t("op-color-sort-select").addEventListener("change",async n=>{c.colorSortBy=n.target.value,await L(["colorSortBy"]),await Q(!1)}),t("op-colors-all").addEventListener("click",async()=>{const n=F();if(!n)return;n.visibleColorKeys=null,await L(["overlays"]),U(),document.getElementById("op-colors-list").querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!0})}),t("op-colors-none").addEventListener("click",async()=>{const n=F();if(!n)return;n.visibleColorKeys=[],await L(["overlays"]),U(),document.getElementById("op-colors-list").querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1})}),t("op-colors-free").addEventListener("click",async()=>{const n=F();if(!n)return;const r=ne.map(l=>l.key),s=new Set(xe.map(([l,m,g])=>`${l},${m},${g}`));n.visibleColorKeys=r.filter(l=>s.has(l)),await L(["overlays"]),U(),document.getElementById("op-colors-list").querySelectorAll('input[type="checkbox"]').forEach(l=>{l.checked=s.has(l.dataset.key)})}),t("op-colors-paid").addEventListener("click",async()=>{const n=F();if(!n)return;const r=ne.map(l=>l.key),s=new Set(te.map(([l,m,g])=>`${l},${m},${g}`));n.visibleColorKeys=r.filter(l=>s.has(l)),await L(["overlays"]),U(),document.getElementById("op-colors-list").querySelectorAll('input[type="checkbox"]').forEach(l=>{l.checked=s.has(l.dataset.key)})}),t("op-colors-copy").addEventListener("click",()=>{if(!F())return;const r="Color,type,wrongEmpty,wrongDiff,wrong,correct,total";if(!ne||ne.length===0){Oe(r).then(()=>D("No color data to copy.")).catch(()=>D("Failed to copy."));return}const s=new Set(te.map(([m,g,v])=>`${m},${g},${v}`)),d=ne.map(m=>{const{key:g,name:v,totalCount:w,belowCount:f,smartCount:b,errorCount:k,correctCount:y}=m,x=s.has(g)?"P":"F";return`${v},${x},${f},${b},${k},${y},${w}`}),l=[r,...d].join(`
`);Oe(l).then(()=>D("Color data copied to clipboard!")).catch(()=>D("Failed to copy color data."))}),t("op-name").addEventListener("change",async n=>{const r=F();if(!r)return;const s=(n.target.value||"").trim()||"Overlay";c.overlays.some(d=>d.id!==r.id&&(d.name||"").toLowerCase()===s.toLowerCase())?(r.name=Ae(s),D(`Name in use. Renamed to "${r.name}".`)):r.name=s,await L(["overlays"]),Je()}),t("op-fetch").addEventListener("click",async()=>{const n=F();if(!n){alert("No active overlay selected.");return}if(n.imageBase64){alert("This overlay already has an image. Create a new overlay to change the image.");return}const r=t("op-image-url").value.trim();if(!r){alert("Enter an image link first.");return}try{await $t(n,r)}catch(s){console.error(s),alert("Failed to fetch image.")}});const o=t("op-dropzone");o.addEventListener("click",()=>t("op-file-input").click()),t("op-file-input").addEventListener("change",async n=>{const r=n.target.files&&n.target.files[0];if(n.target.value="",!r)return;const s=F();if(s){if(s.imageBase64){alert("This overlay already has an image. Create a new overlay to change the image.");return}try{await Qe(s,r)}catch(d){console.error(d),alert("Failed to load local image.")}}}),["dragenter","dragover"].forEach(n=>o.addEventListener(n,r=>{r.preventDefault(),r.stopPropagation(),o.classList.add("drop-highlight")})),["dragleave","drop"].forEach(n=>o.addEventListener(n,r=>{r.preventDefault(),r.stopPropagation(),!(n==="dragleave"&&r.target!==o)&&o.classList.remove("drop-highlight")})),o.addEventListener("drop",async n=>{const r=n.dataTransfer;if(!r)return;const s=r.files&&r.files[0];if(!s)return;const d=F();if(d){if(d.imageBase64){alert("This overlay already has an image. Create a new overlay to change the image.");return}try{await Qe(d,s)}catch(l){console.error(l),alert("Failed to load dropped image.")}}});const i=async(n,r)=>{const s=F();s&&(s.offsetX+=n,s.offsetY+=r,await L(["overlays"]),U(),N())};t("op-nudge-up").addEventListener("click",()=>i(0,-1)),t("op-nudge-down").addEventListener("click",()=>i(0,1)),t("op-nudge-left").addEventListener("click",()=>i(-1,0)),t("op-nudge-right").addEventListener("click",()=>i(1,0)),t("op-opacity-slider").addEventListener("input",n=>{const r=F();r&&(r.opacity=parseFloat(n.target.value),document.getElementById("op-opacity-value").textContent=Math.round(r.opacity*100)+"%")}),t("op-opacity-slider").addEventListener("change",async()=>{await L(["overlays"]),U()}),t("op-download-overlay").addEventListener("click",()=>{const n=F();if(!n||!n.imageBase64){D("No overlay image to download.");return}const r=document.createElement("a");r.href=n.imageBase64,r.download=`${(n.name||"overlay").replace(/[^\w.-]+/g,"_")}.png`,document.body.appendChild(r),r.click(),r.remove()}),t("op-open-cc").addEventListener("click",()=>{const n=F();if(!n||!n.imageBase64){D("No overlay image to edit.");return}Xt(n)}),t("op-log-coords").addEventListener("click",()=>{const n=F();if(!n){D("No active overlay selected.");return}Yt(n),D(`Logged pixel coordinates for "${n.name}" to the console.`)});const a=t("op-open-resize");a&&a.addEventListener("click",()=>{const n=F();if(!n||!n.imageBase64){D("No overlay image to resize.");return}Ut(n)}),window.addEventListener("resize",()=>{}),t("op-colors-list").addEventListener("scroll",()=>{const n=t("op-colors-list");n&&(c.colorsScrollTop=n.scrollTop,Rt())})}function _t(t){const o=t.querySelector("#op-header"),i=t.querySelector("#op-panel-toggle");if(!o||!i)return;let a=!1,n=0,r=0,s=0,d=0,l=!1;const m=(f,b,k)=>Math.min(Math.max(f,b),k),g=f=>{const b=t.classList.contains("collapsed"),k=b?i:o;if(b){if(f.target!==i)return}else if(!f.target.closest("#op-header")||f.target.closest("button"))return;a=!0,l=!1,n=f.clientX,r=f.clientY;const y=t.getBoundingClientRect();s=y.left,d=y.top,k.setPointerCapture?.(f.pointerId),f.preventDefault()},v=f=>{if(!a)return;const b=f.clientX-n,k=f.clientY-r,y=Math.max(8,window.innerWidth-t.offsetWidth-8),x=Math.max(8,window.innerHeight-t.offsetHeight-8);t.style.left=m(s+b,8,y)+"px",t.style.top=m(d+k,8,x)+"px",l=!0},w=f=>{if(!a)return;const k=t.classList.contains("collapsed")?i:o;a=!1,k.releasePointerCapture?.(f.pointerId),l&&(c.panelX=parseInt(t.style.left,10)||0,c.panelY=parseInt(t.style.top,10)||0,L(["panelX","panelY"]))};t.addEventListener("pointerdown",g),t.addEventListener("pointermove",v),t.addEventListener("pointerup",w),t.addEventListener("pointercancel",w),window.addEventListener("resize",()=>{const f=t.getBoundingClientRect(),b=Math.max(8,window.innerWidth-t.offsetWidth-8),k=Math.max(8,window.innerHeight-t.offsetHeight-8),y=Math.min(Math.max(f.left,8),b),x=Math.min(Math.max(f.top,8),k);t.style.left=y+"px",t.style.top=x+"px",c.panelX=y,c.panelY=x,L(["panelX","panelY"])}),i.addEventListener("click",f=>{if(l){f.preventDefault(),f.stopPropagation();return}c.isPanelCollapsed=!c.isPanelCollapsed,L(["isPanelCollapsed"]),N()})}function _e(){document.body.classList.toggle("op-theme-dark",c.theme==="dark"),document.body.classList.toggle("op-theme-light",c.theme!=="dark");const t=document.getElementById("op-toast-stack");t&&t.classList.toggle("op-dark",c.theme==="dark")}function Pt(){const t=v=>document.getElementById(v),o=F(),i=t("op-editor-section"),a=t("op-editor-body");if(i.style.display=o?"flex":"none",!o)return;t("op-name").value=o.name||"";const n=t("op-image-source"),r=t("op-preview-wrap"),s=t("op-image-preview"),d=t("op-cc-btn-row");o.imageBase64?(n.style.display="none",r.style.display="flex",s.src=o.imageBase64,d.style.display="flex"):(n.style.display="block",r.style.display="none",d.style.display="none",t("op-image-url").value=o.imageUrl||"");const l=o.pixelUrl?de(o.pixelUrl):{chunk1:"-",chunk2:"-",posX:"-",posY:"-"};t("op-coord-display").textContent=o.pixelUrl?`Ref: chunk ${l.chunk1}/${l.chunk2} at (${l.posX}, ${l.posY})`:'No pixel anchor set. Turn ON "Place overlay" and click a pixel once.',t("op-opacity-slider").value=String(o.opacity),t("op-opacity-value").textContent=Math.round(o.opacity*100)+"%";const m=document.getElementById("op-offset-indicator");m&&(m.textContent=`Offset X ${o.offsetX}, Y ${o.offsetY}`),a.style.display=c.collapseEditor?"none":"block";const g=document.getElementById("op-collapse-editor");g&&(g.textContent=c.collapseEditor?"\u25B8":"\u25BE")}async function N(){const t=O=>document.getElementById(O),o=t("overlay-pro-panel");if(!o)return;_e();const i=t("op-content"),a=t("op-panel-toggle"),n=t("op-header"),r=!!c.isPanelCollapsed;o.classList.toggle("collapsed",r),i.style.display=r?"none":"grid",a.classList.toggle("logo-button",r),a.title=r?"Expand":"Collapse";const s=t("op-mode-select");s&&(s.value=c.overlayMode);const d=t("op-autocap-toggle"),l=t("op-place-label");d.textContent=c.autoCapturePixelUrl?"ON":"OFF",d.classList.toggle("op-danger",!!c.autoCapturePixelUrl),l.classList.toggle("op-danger-text",!!c.autoCapturePixelUrl);const m=t("op-highlight-toggle");m&&(m.checked=!!c.highlightPixels);const g=t("op-hijack-toggle");g&&(g.checked=!!c.hijackRequests);const v=t("op-pixel-count");v&&(v.value=c.hijackPixelCount||1);const w=g?.nextElementSibling;w&&w.classList.toggle("op-danger-text",!!c.hijackRequests);const f=t("op-list-wrap"),b=t("op-collapse-list");f.style.display=c.collapseList?"none":"block",b&&(b.textContent=c.collapseList?"\u25B8":"\u25BE");const k=t("op-nudge-body"),y=t("op-collapse-nudge");k.style.display=c.collapseNudge?"none":"block",y&&(y.textContent=c.collapseNudge?"\u25B8":"\u25BE");const x=t("op-colors-body"),E=t("op-collapse-colors");x&&(x.style.display=c.collapseColors?"none":"block"),E&&(E.textContent=c.collapseColors?"\u25B8":"\u25BE");const C=t("op-color-sort-select");C&&(C.value=c.colorSortBy||"errorCount"),Je(),Pt();const S=t("op-export-overlay"),I=F(),$=!!(I&&I.imageUrl&&!I.isLocal);S.disabled=!$,S.title=$?"Export active overlay JSON":"Export disabled for local images"}const Pe=new Map;let ne=[];async function Te(t){if(!t||!t.imageBase64)return{};const o=t.imageBase64.slice(0,64)+":"+t.imageBase64.length;if(Pe.has(o))return Pe.get(o);const i=await le(t.imageBase64),n=V(i.width,i.height).getContext("2d",{willReadFrequently:!0});n.drawImage(i,0,0);const s=n.getImageData(0,0,i.width,i.height).data,d={};for(let l=0;l<s.length;l+=4)if(s[l+3]>0){const m=`${s[l]},${s[l+1]},${s[l+2]}`;d[m]=(d[m]||0)+1}return Pe.set(o,d),d}async function Tt(t){if(!t||!t.imageBase64||!t.pixelUrl)return null;const o=Re(t),i=Array.from(pe.keys()).sort().join(";"),a=`${t.id}|${o}|${i}`;if(ve.has(a))return ve.get(a);const n=await le(t.imageBase64),r=n.width,s=n.height,l=V(r,s).getContext("2d",{willReadFrequently:!0});l.drawImage(n,0,0);const g=l.getImageData(0,0,r,s).data,v=de(t.pixelUrl);if(!Number.isFinite(v.chunk1)||!Number.isFinite(v.chunk2))return null;const w={};for(let f=0;f<s;f++)for(let b=0;b<r;b++){const k=(f*r+b)*4;if(g[k+3]===0)continue;const y=g[k],x=g[k+1],E=g[k+2],C=`${y},${x},${E}`;w[C]||(w[C]={smart:0,below:0});const S=v.chunk1*1e3+v.posX+t.offsetX+b,I=v.chunk2*1e3+v.posY+t.offsetY+f,$=Math.floor(S/1e3),O=Math.floor(I/1e3),R=`${$},${O}`;if(pe.has(R)){const _=pe.get(R),B=_.data,z=_.width,u=(S%1e3+1e3)%1e3,M=((I%1e3+1e3)%1e3*z+u)*4,A=B[M],P=B[M+1],T=B[M+2];B[M+3]===0?w[C].below++:(y!==A||x!==P||E!==T)&&w[C].smart++}}return ve.set(a,w),w}async function Yt(t){if(!t||!t.imageBase64||!t.pixelUrl){D("Overlay is missing image or pixelUrl to log coordinates.");return}const o=await le(t.imageBase64),i=o.width,a=o.height,n=de(t.pixelUrl);if(!Number.isFinite(n.chunk1)||!Number.isFinite(n.chunk2)){D("Invalid pixelUrl in overlay.");return}const r=(s,d,l)=>{if(s<0||s>=i||d<0||d>=a){console.log(`${l} Overlay Pixel: (${s}, ${d}) is out of bounds.`);return}const m=n.chunk1*1e3+n.posX+t.offsetX+s,g=n.chunk2*1e3+n.posY+t.offsetY+d,v=Math.floor(m/1e3),w=Math.floor(g/1e3),f=(m%1e3+1e3)%1e3,b=(g%1e3+1e3)%1e3;console.log(`${l} Overlay Pixel: (${s}, ${d}) -> Tile: (${v}, ${w}), Coordinate in Tile: (${f}, ${b})`)};console.log(`--- Specific Pixel Coordinates for Overlay: ${t.name} ---`),r(0,0,"Top-Left Corner:"),r(2,0,"Top-Left (+2 right):"),r(0,2,"Top-Left (+2 down):"),r(i-1,0,"Top-Right Corner:"),r(i-3,0,"Top-Right (-2 left):"),r(i-1,2,"Top-Right (+2 down):"),r(0,a-1,"Bottom-Left Corner:"),r(2,a-1,"Bottom-Left (+2 right):"),r(0,a-3,"Bottom-Left (-2 up):"),r(i-1,a-1,"Bottom-Right Corner:"),r(i-3,a-1,"Bottom-Right (-2 left):"),r(i-1,a-3,"Bottom-Right (-2 up):"),console.log("--- End of Specific Pixel Coordinates ---")}async function Q(t=!0){const o=Ue(),i=F(),a=document.getElementById("op-colors-section");if(!a)return;if(!i||!i.imageBase64){a.style.display="none",ne=[];return}a.style.display="flex";const n=document.getElementById("op-colors-list");let r;if(t){n.innerHTML='<div class="op-muted" style="text-align:center; padding: 12px 0;">Loading...</div>';const y=await Te(i),x=await Tt(i)||{};r=Object.entries(y).map(([E,C])=>{const S=x[E]?.below||0,I=x[E]?.smart||0,$=S+I,O=C-$;return{key:E,name:me[E]||E,totalCount:C,belowCount:S,smartCount:I,errorCount:$,correctCount:O}}),Ce.set(i.id,r),ne=r}else{if(Ce.has(i.id))r=Ce.get(i.id);else{const y=await Te(i);r=Object.entries(y).map(([x,E])=>({key:x,name:me[x]||x,totalCount:E,belowCount:0,smartCount:0,errorCount:0,correctCount:E}))}ne=r}const s=c.colorSortBy||"errorCount";r=[...r].sort((y,x)=>x[s]===y[s]?x.totalCount-y.totalCount:x[s]-y[s]);let l;i.visibleColorKeys===null||i.visibleColorKeys===void 0?l=new Set(r.map(y=>y.key)):l=new Set(i.visibleColorKeys);const m=r.reduce((y,x)=>y+x.correctCount,0),g=r.reduce((y,x)=>y+x.errorCount,0),v=r.reduce((y,x)=>y+x.totalCount,0),w=document.getElementById("op-total-correct"),f=document.getElementById("op-total-wrong"),b=document.getElementById("op-total-pixels");w&&(w.textContent=m.toLocaleString()),f&&(f.textContent=g.toLocaleString()),b&&(b.textContent=v.toLocaleString());const k=new Set(te.map(([y,x,E])=>`${y},${x},${E}`));if(n.innerHTML="",r.length===0){n.innerHTML='<div class="op-muted" style="text-align:center; padding: 12px 0;">No colors found.</div>';return}for(const y of r){const{key:x,name:E,totalCount:C,belowCount:S,smartCount:I,errorCount:$,correctCount:O}=y,R=k.has(x),_=document.createElement("div");_.className="op-dist-item"+(R?" premium":""),_.title=`${E} (${x}): ${C} pixels`;const B=`<span style="color: lime;">${O}</span>/<span style="color: cyan;">${S}</span>/<span style="color: pink;">${I}</span>/<span style="color: red;">${$}</span>/${C}`;_.innerHTML=`
            <input type="checkbox" data-key="${x}" ${l.has(x)?"checked":""} style="margin-right: 4px;">
            <div class="op-color-list-swatch" style="background-color: rgb(${x});"></div>
            <div class="op-color-list-name">${E}</div>
            <div class="op-color-list-count">${B}</div>
        `;const z=_.querySelector(".op-color-list-name");z&&o.has(x)&&(z.style.color="red"),n.appendChild(_)}n.querySelectorAll('input[type="checkbox"]').forEach(y=>{y.addEventListener("change",async()=>{const x=y.dataset.key,E=F();if(!E)return;if(E.visibleColorKeys===null){const S=Object.keys(await Te(E));E.visibleColorKeys=S}const C=new Set(E.visibleColorKeys);y.checked?C.add(x):C.delete(x),E.visibleColorKeys=Array.from(C),await L(["overlays"]),U()})}),Number.isFinite(c.colorsScrollTop)&&(n.scrollTop=c.colorsScrollTop)}let p=null;function Bt(){const t=document.createElement("div");t.className="op-cc-backdrop",t.id="op-cc-backdrop",document.body.appendChild(t);const o=document.createElement("div");o.className="op-cc-modal",o.id="op-cc-modal",o.style.display="none",o.innerHTML=`
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
    `,document.body.appendChild(o),o.querySelector("#op-cc-close").addEventListener("click",Ie),t.addEventListener("click",Ie),o.querySelector("#op-cc-cancel").addEventListener("click",Ie),p={backdrop:t,modal:o,previewCanvas:o.querySelector("#op-cc-preview"),previewCtx:o.querySelector("#op-cc-preview").getContext("2d",{willReadFrequently:!0}),sourceCanvas:null,sourceCtx:null,sourceImageData:null,processedCanvas:null,processedCtx:null,freeGrid:o.querySelector("#op-cc-free-grid"),paidGrid:o.querySelector("#op-cc-paid-grid"),freeToggle:o.querySelector("#op-cc-free-toggle"),paidToggle:o.querySelector("#op-cc-paid-toggle"),meta:o.querySelector("#op-cc-meta"),applyBtn:o.querySelector("#op-cc-apply"),recalcBtn:o.querySelector("#op-cc-recalc"),realtimeBtn:o.querySelector("#op-cc-realtime"),zoom:1,selectedFree:new Set(c.ccFreeKeys),selectedPaid:new Set(c.ccPaidKeys),realtime:!!c.ccRealtime,overlay:null,lastColorCounts:{},isStale:!1},p.realtimeBtn.addEventListener("click",async()=>{p.realtime=!p.realtime,p.realtimeBtn.textContent=`Realtime: ${p.realtime?"ON":"OFF"}`,p.realtimeBtn.classList.toggle("op-danger",p.realtime),c.ccRealtime=p.realtime,await L(["ccRealtime"]),p.realtime&&p.isStale&&r()});const i=async()=>{p.zoom=Math.min(8,(p.zoom||1)*1.25),c.ccZoom=p.zoom,await L(["ccZoom"]),ie(),re()},a=async()=>{p.zoom=Math.max(.1,(p.zoom||1)/1.25),c.ccZoom=p.zoom,await L(["ccZoom"]),ie(),re()};o.querySelector("#op-cc-zoom-in").addEventListener("click",i),o.querySelector("#op-cc-zoom-out").addEventListener("click",a),p.recalcBtn.addEventListener("click",()=>{r()}),p.applyBtn.addEventListener("click",async()=>{const s=p.overlay;if(!s)return;if(tt().length===0){D("Select at least one color.");return}if(p.isStale&&r(),!p.processedCanvas){D("Nothing to apply.");return}if(p.processedCanvas.width>=1e3||p.processedCanvas.height>=1e3){D("Image too large to apply (must be < 1000\xD71000).");return}const l=p.processedCanvas.toDataURL("image/png");s.imageBase64=l,s.imageUrl=null,s.isLocal=!0,await L(["overlays"]),U(),Z(),N();const m=Object.keys(p.lastColorCounts).length;D(`Overlay updated (${p.processedCanvas.width}\xD7${p.processedCanvas.height}, ${m} colors).`),Ie()}),Nt(),p.freeToggle.addEventListener("click",async()=>{const s=at();it("free",!s),c.ccFreeKeys=Array.from(p.selectedFree),await L(["ccFreeKeys"]),p.realtime?r():n(),ie(),re(),ye()}),p.paidToggle.addEventListener("click",async()=>{const s=nt();it("paid",!s),c.ccPaidKeys=Array.from(p.selectedPaid),await L(["ccPaidKeys"]),p.realtime?r():n(),ie(),re(),ye()});function n(){p.isStale=!0,p.meta.textContent=p.meta.textContent.replace(/ \| Status: .+$/,"")+" | Status: pending recalculation"}function r(){Se(),p.isStale=!1,ie(),re(),ot()}}function Xt(t){if(!p)return;p.overlay=t,document.body.classList.add("op-scroll-lock"),p.zoom=Number(c.ccZoom)||1,p.realtime=!!c.ccRealtime,p.realtimeBtn.textContent=`Realtime: ${p.realtime?"ON":"OFF"}`,p.realtimeBtn.classList.toggle("op-danger",p.realtime);const o=new Image;o.onload=()=>{p.sourceCanvas||(p.sourceCanvas=document.createElement("canvas"),p.sourceCtx=p.sourceCanvas.getContext("2d",{willReadFrequently:!0})),p.sourceCanvas.width=o.width,p.sourceCanvas.height=o.height,p.sourceCtx.clearRect(0,0,o.width,o.height),p.sourceCtx.drawImage(o,0,0),p.sourceImageData=p.sourceCtx.getImageData(0,0,o.width,o.height),p.processedCanvas||(p.processedCanvas=document.createElement("canvas"),p.processedCtx=p.processedCanvas.getContext("2d")),Se(),p.isStale=!1,ie(),re(),ot(),p.backdrop.classList.add("show"),p.modal.style.display="flex"},o.src=t.imageBase64}function Ie(){p&&(p.backdrop.classList.remove("show"),p.modal.style.display="none",p.overlay=null,document.body.classList.remove("op-scroll-lock"))}function Ft(t,o,i,a){let n=null,r=1/0;for(let s=0;s<a.length;s++){const[d,l,m]=a[s],g=(d+t)/2,v=d-t,w=l-o,f=m-i,b=(512+g)*v*v>>8,k=4*w*w,y=(767-g)*f*f>>8,x=b+k+y;x<r&&(r=x,n=[d,l,m])}return n||[0,0,0]}function tt(){const t=[];return p.selectedFree.forEach(o=>{const[i,a,n]=o.split(",").map(r=>parseInt(r,10));Number.isFinite(i)&&t.push([i,a,n])}),p.selectedPaid.forEach(o=>{const[i,a,n]=o.split(",").map(r=>parseInt(r,10));Number.isFinite(i)&&t.push([i,a,n])}),t}function Se(){if(!p.sourceImageData)return;const t=p.sourceImageData.width,o=p.sourceImageData.height,i=p.sourceImageData.data,a=new Uint8ClampedArray(i.length),n=tt(),r={};for(let d=0;d<i.length;d+=4){const l=i[d],m=i[d+1],g=i[d+2];if(i[d+3]===0){a[d]=0,a[d+1]=0,a[d+2]=0,a[d+3]=0;continue}const[w,f,b]=n.length?Ft(l,m,g,n):[l,m,g];a[d]=w,a[d+1]=f,a[d+2]=b,a[d+3]=255;const k=`${w},${f},${b}`;r[k]=(r[k]||0)+1}p.processedCanvas||(p.processedCanvas=document.createElement("canvas"),p.processedCtx=p.processedCanvas.getContext("2d")),p.processedCanvas.width=t,p.processedCanvas.height=o;const s=new ImageData(a,t,o);p.processedCtx.putImageData(s,0,0),p.lastColorCounts=r}function ie(){const t=Number(p.zoom)||1,o=p.processedCanvas;if(!o)return;const i=Math.max(1,Math.round(o.width*t)),a=Math.max(1,Math.round(o.height*t));p.previewCanvas.width=i,p.previewCanvas.height=a;const n=p.previewCtx;n.clearRect(0,0,i,a),n.imageSmoothingEnabled=!1,n.drawImage(o,0,0,o.width,o.height,0,0,i,a),n.imageSmoothingEnabled=!0}function re(){if(!p.sourceImageData){p.meta.textContent="";return}const t=p.sourceImageData.width,o=p.sourceImageData.height,i=Object.keys(p.lastColorCounts||{}).length,a=p.isStale?"pending recalculation":"up to date";p.meta.textContent=`Size: ${t}\xD7${o} | Zoom: ${p.zoom.toFixed(2)}\xD7 | Colors: ${i} | Status: ${a}`}function ot(){if(!p||!p.lastColorCounts)return;const t=document.getElementById("op-cc-color-list");if(!t)return;const o=Ue(),i=p.lastColorCounts,a=Object.entries(i).sort(([,r],[,s])=>s-r),n=new Set(te.map(([r,s,d])=>`${r},${s},${d}`));if(t.innerHTML="",a.length===0){t.innerHTML='<div class="op-muted" style="text-align:center; padding: 12px 0;">No colors in image.</div>';return}for(const[r,s]of a){const d=n.has(r),l=me[r]||r,m=document.createElement("div");m.className="op-color-list-item"+(d?" premium":""),m.title=`${l} (${r}): ${s} pixels`,m.innerHTML=`
        <div class="op-color-list-swatch" style="background-color: rgb(${r});"></div>
        <div class="op-color-list-name">${l}</div>
        <div class="op-color-list-count">${s}</div>
      `;const g=m.querySelector(".op-color-list-name");g&&o.has(r)&&(g.style.color="red"),t.appendChild(m)}}function Nt(){p.freeGrid.innerHTML="",p.paidGrid.innerHTML="";for(const[t,o,i]of xe){const a=`${t},${o},${i}`,n=document.createElement("div");n.className="op-cc-cell",n.style.background=`rgb(${t},${o},${i})`,n.title=me[a]||a,n.dataset.key=a,n.dataset.type="free",p.selectedFree.has(a)&&n.classList.add("active"),n.addEventListener("click",async()=>{p.selectedFree.has(a)?p.selectedFree.delete(a):p.selectedFree.add(a),n.classList.toggle("active",p.selectedFree.has(a)),c.ccFreeKeys=Array.from(p.selectedFree),await L(["ccFreeKeys"]),p.realtime?Se():p.isStale=!0,ie(),re(),ye()}),p.freeGrid.appendChild(n)}for(const[t,o,i]of te){const a=`${t},${o},${i}`,n=document.createElement("div");n.className="op-cc-cell",n.style.background=`rgb(${t},${o},${i})`,n.title=me[a]||a,n.dataset.key=a,n.dataset.type="paid",p.selectedPaid.has(a)&&n.classList.add("active"),n.addEventListener("click",async()=>{p.selectedPaid.has(a)?p.selectedPaid.delete(a):p.selectedPaid.add(a),n.classList.toggle("active",p.selectedPaid.has(a)),c.ccPaidKeys=Array.from(p.selectedPaid),await L(["ccPaidKeys"]),p.realtime?Se():p.isStale=!0,ie(),re(),ye()}),p.paidGrid.appendChild(n)}ye()}function ye(){p.freeToggle.textContent=at()?"Unselect All":"Select All",p.paidToggle.textContent=nt()?"Unselect All":"Select All"}function at(){return we.every(t=>p.selectedFree.has(t))}function nt(){const t=te.map(([o,i,a])=>`${o},${i},${a}`);return t.every(o=>p.selectedPaid.has(o))&&t.length>0}function it(t,o){if(t==="free")o?we.forEach(a=>p.selectedFree.add(a)):p.selectedFree.clear(),p.freeGrid.querySelectorAll(".op-cc-cell").forEach(a=>a.classList.toggle("active",o));else{const i=te.map(([a,n,r])=>`${a},${n},${r}`);o?i.forEach(a=>p.selectedPaid.add(a)):p.selectedPaid.clear(),p.paidGrid.querySelectorAll(".op-cc-cell").forEach(a=>a.classList.toggle("active",o))}}let e=null;function qt(){const t=document.createElement("div");t.className="op-rs-backdrop",t.id="op-rs-backdrop",document.body.appendChild(t);const o=document.createElement("div");o.className="op-rs-modal",o.id="op-rs-modal",o.style.display="none",o.innerHTML=`
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
    `,document.body.appendChild(o);const i={backdrop:t,modal:o,tabSimple:o.querySelector("#op-rs-tab-simple"),tabAdvanced:o.querySelector("#op-rs-tab-advanced"),paneSimple:o.querySelector("#op-rs-pane-simple"),paneAdvanced:o.querySelector("#op-rs-pane-advanced"),orig:o.querySelector("#op-rs-orig"),w:o.querySelector("#op-rs-w"),h:o.querySelector("#op-rs-h"),lock:o.querySelector("#op-rs-lock"),note:o.querySelector("#op-rs-note"),onex:o.querySelector("#op-rs-onex"),half:o.querySelector("#op-rs-half"),third:o.querySelector("#op-rs-third"),quarter:o.querySelector("#op-rs-quarter"),double:o.querySelector("#op-rs-double"),scale:o.querySelector("#op-rs-scale"),applyScale:o.querySelector("#op-rs-apply-scale"),simWrap:o.querySelector("#op-rs-sim-wrap"),simOrig:o.querySelector("#op-rs-sim-orig"),simNew:o.querySelector("#op-rs-sim-new"),colLeft:o.querySelector("#op-rs-col-left"),colRight:o.querySelector("#op-rs-col-right"),advWrap:o.querySelector("#op-rs-adv-wrap"),preview:o.querySelector("#op-rs-preview"),meta:o.querySelector("#op-rs-meta"),zoomIn:o.querySelector("#op-rs-zoom-in"),zoomOut:o.querySelector("#op-rs-zoom-out"),multRange:o.querySelector("#op-rs-mult-range"),multInput:o.querySelector("#op-rs-mult-input"),bind:o.querySelector("#op-rs-bind"),blockW:o.querySelector("#op-rs-blockw"),blockH:o.querySelector("#op-rs-blockh"),offX:o.querySelector("#op-rs-offx"),offY:o.querySelector("#op-rs-offy"),dotR:o.querySelector("#op-rs-dotr"),dotRVal:o.querySelector("#op-rs-dotr-val"),gridToggle:o.querySelector("#op-rs-grid"),advNote:o.querySelector("#op-rs-adv-note"),resWrap:o.querySelector("#op-rs-adv-result-wrap"),resCanvas:o.querySelector("#op-rs-adv-result"),resMeta:o.querySelector("#op-rs-adv-resmeta"),calcBtn:o.querySelector("#op-rs-calc"),applyBtn:o.querySelector("#op-rs-apply"),cancelBtn:o.querySelector("#op-rs-cancel"),closeBtn:o.querySelector("#op-rs-close")},a=i.preview.getContext("2d",{willReadFrequently:!0}),n=i.simOrig.getContext("2d",{willReadFrequently:!0}),r=i.simNew.getContext("2d",{willReadFrequently:!0}),s=i.resCanvas.getContext("2d",{willReadFrequently:!0});e={...i,ov:null,img:null,origW:0,origH:0,mode:"simple",zoom:1,updating:!1,mult:4,gapX:4,gapY:4,offx:0,offy:0,dotr:1,viewX:0,viewY:0,panning:!1,panStart:null,calcCanvas:null,calcCols:0,calcRows:0,calcReady:!1};const d=()=>{const u=parseInt(e.w.value||"0",10),h=parseInt(e.h.value||"0",10),M=Number.isFinite(u)&&Number.isFinite(h)&&u>0&&h>0,A=u>=1e3||h>=1e3;return M?A?`Target: ${u}\xD7${h} (exceeds limit: must be < 1000\xD71000)`:`Target: ${u}\xD7${h} (OK)`:"Enter positive width and height."},l=()=>{const u=Math.floor((e.origW-e.offx)/e.gapX),h=Math.floor((e.origH-e.offy)/e.gapY);return{cols:Math.max(0,u),rows:Math.max(0,h)}},m=()=>{const{cols:u,rows:h}=l(),M=u>=1e3||h>=1e3;return u>0&&h>0?`Samples: ${u} \xD7 ${h} | Output: ${u}\xD7${h}${M?" (exceeds limit: < 1000\xD71000)":""}`:"Adjust multiplier/offset until dots sit at centers."},g=()=>{e.meta.textContent=e.mode==="advanced"?m():d()},v=()=>{const u=parseInt(e.w.value||"0",10),h=parseInt(e.h.value||"0",10),M=Number.isFinite(u)&&Number.isFinite(h)&&u>0&&h>0,A=u>=1e3||h>=1e3,P=M?A?`Target: ${u}\xD7${h} (exceeds limit: must be < 1000\xD71000)`:`Target: ${u}\xD7${h} (OK)`:"Enter positive width and height.";e.note&&(e.note.textContent=P),e.mode==="simple"&&(e.applyBtn.disabled=!M||A),e.mode==="simple"&&(e.meta.textContent=P)};function w(u){const h=Math.max(1,Math.round(e.origW*u)),M=Math.max(1,Math.round(e.origH*u));e.updating=!0,e.w.value=h,e.h.value=e.lock.checked?Math.max(1,Math.round(h*e.origH/e.origW)):M,e.updating=!1,v()}function f(){if(!e.img)return;const u=e.colLeft.querySelector(".pad-top").offsetHeight,h=e.colRight.querySelector(".pad-top").offsetHeight,M=e.colLeft.clientWidth,A=e.colRight.clientWidth,P=e.colLeft.clientHeight-u,T=e.colRight.clientHeight-h;e.simOrig.width=M,e.simOrig.height=P,e.simNew.width=A,e.simNew.height=T,n.save(),n.imageSmoothingEnabled=!1,n.clearRect(0,0,M,P);const X=Math.min(M/e.origW,P/e.origH),q=Math.max(1,Math.floor(e.origW*X)),Y=Math.max(1,Math.floor(e.origH*X)),j=Math.floor((M-q)/2),ee=Math.floor((P-Y)/2);n.drawImage(e.img,0,0,e.origW,e.origH,j,ee,q,Y),n.restore();const W=parseInt(e.w.value||"0",10),K=parseInt(e.h.value||"0",10);if(r.save(),r.imageSmoothingEnabled=!1,r.clearRect(0,0,A,T),Number.isFinite(W)&&Number.isFinite(K)&&W>0&&K>0){const ae=V(W,K),H=ae.getContext("2d",{willReadFrequently:!0});H.imageSmoothingEnabled=!1,H.clearRect(0,0,W,K),H.drawImage(e.img,0,0,e.origW,e.origH,0,0,W,K);const se=H.getImageData(0,0,W,K),G=se.data;for(let ge=0;ge<G.length;ge+=4)G[ge+3]!==0&&(G[ge+3]=255);H.putImageData(se,0,0);const Be=Math.min(A/W,T/K),ue=Math.max(1,Math.floor(W*Be)),$e=Math.max(1,Math.floor(K*Be)),be=Math.floor((A-ue)/2),Xe=Math.floor((T-$e)/2);r.drawImage(ae,0,0,W,K,be,Xe,ue,$e)}else r.drawImage(e.img,0,0,e.origW,e.origH,j,ee,q,Y);r.restore()}const b=()=>{e.updating=!0,e.multRange.value=String(e.mult),e.multInput.value=String(e.mult),e.blockW.value=String(e.gapX),e.blockH.value=String(e.gapY),e.offX.value=String(e.offx),e.offY.value=String(e.offy),e.dotR.value=String(e.dotr),e.dotRVal.textContent=String(e.dotr),e.updating=!1};function k(){const{cols:u,rows:h}=l(),M=u>=1e3||h>=1e3;if(e.mode==="advanced")e.applyBtn.disabled=!e.calcReady;else{const A=parseInt(e.w.value||"0",10),P=parseInt(e.h.value||"0",10),T=Number.isFinite(A)&&Number.isFinite(P)&&A>0&&P>0&&A<1e3&&P<1e3;e.applyBtn.disabled=!T}g()}function y(){if(e.mode!=="advanced"||!e.img)return;const u=e.origW,h=e.origH,M=Math.max(50,Math.floor(e.advWrap.clientWidth)),A=Math.max(50,Math.floor(e.advWrap.clientHeight));e.preview.width=M,e.preview.height=A;const P=Math.max(1,Math.floor(M/e.zoom)),T=Math.max(1,Math.floor(A/e.zoom)),X=Math.max(0,u-P),q=Math.max(0,h-T);if(e.viewX=Math.min(Math.max(0,e.viewX),X),e.viewY=Math.min(Math.max(0,e.viewY),q),a.save(),a.imageSmoothingEnabled=!1,a.clearRect(0,0,M,A),a.drawImage(e.img,e.viewX,e.viewY,P,T,0,0,M,A),e.gridToggle.checked&&e.gapX>=1&&e.gapY>=1){a.strokeStyle="rgba(255,59,48,0.45)",a.lineWidth=1;const Y=Math.ceil((e.viewX-e.offx)/e.gapX),j=Math.floor((e.viewX+P-e.offx)/e.gapX),ee=Math.ceil((e.viewY-e.offy)/e.gapY),W=Math.floor((e.viewY+T-e.offy)/e.gapY),K=Math.max(0,j-Y+1),ae=Math.max(0,W-ee+1);if(K<=4e3&&ae<=4e3){a.beginPath();for(let H=Y;H<=j;H++){const se=e.offx+H*e.gapX,G=Math.round((se-e.viewX)*e.zoom);a.moveTo(G+.5,0),a.lineTo(G+.5,A)}for(let H=ee;H<=W;H++){const se=e.offy+H*e.gapY,G=Math.round((se-e.viewY)*e.zoom);a.moveTo(0,G+.5),a.lineTo(M,G+.5)}a.stroke()}}if(e.gapX>=1&&e.gapY>=1){a.fillStyle="#ff3b30";const Y=e.offx+Math.floor(e.gapX/2),j=e.offy+Math.floor(e.gapY/2);if(Y>=0&&j>=0){const ee=Math.ceil((e.viewX-Y)/e.gapX),W=Math.ceil((e.viewY-j)/e.gapY),K=Math.floor((e.viewY+T-1-j)/e.gapY),ae=Math.floor((e.viewX+P-1-Y)/e.gapX),H=e.dotr,se=Math.max(0,ae-ee+1),G=Math.max(0,K-W+1);if(se*G<=3e5)for(let ue=W;ue<=K;ue++){const $e=j+ue*e.gapY;for(let be=ee;be<=ae;be++){const Xe=Y+be*e.gapX,ge=Math.round((Xe-e.viewX)*e.zoom),Kt=Math.round(($e-e.viewY)*e.zoom);a.beginPath(),a.arc(ge,Kt,H,0,Math.PI*2),a.fill()}}}}a.restore()}function x(){const u=e.calcCanvas,h=e.resWrap;if(!h||!u){s.clearRect(0,0,e.resCanvas.width,e.resCanvas.height),e.resMeta.textContent="No result. Click Calculate.";return}const M=u.width,A=u.height,P=Math.max(50,Math.floor(h.clientWidth-16)),T=Math.max(50,Math.floor(h.clientHeight-16)),X=Math.min(P/M,T/A),q=Math.max(1,Math.floor(M*X)),Y=Math.max(1,Math.floor(A*X));e.resCanvas.width=q,e.resCanvas.height=Y,s.save(),s.imageSmoothingEnabled=!1,s.clearRect(0,0,q,Y),s.drawImage(u,0,0,M,A,0,0,q,Y),s.restore(),e.resMeta.textContent=`Output: ${M}\xD7${A}${M>=1e3||A>=1e3?" (exceeds limit: < 1000\xD71000)":""}`}e._drawSimplePreview=f,e._drawAdvancedPreview=y,e._drawAdvancedResultPreview=x;const E=u=>{e.mode=u,e.tabSimple.classList.toggle("active",u==="simple"),e.tabAdvanced.classList.toggle("active",u==="advanced"),e.paneSimple.classList.toggle("show",u==="simple"),e.paneAdvanced.classList.toggle("show",u==="advanced"),g(),e.calcBtn.style.display=u==="advanced"?"inline-block":"none",u==="advanced"?e.applyBtn.disabled=!e.calcReady:v(),k(),u==="advanced"?(y(),x()):f()};e.tabSimple.addEventListener("click",()=>E("simple")),e.tabAdvanced.addEventListener("click",()=>E("advanced"));const C=()=>{if(e.updating)return;e.updating=!0;const u=parseInt(e.w.value||"0",10);e.lock.checked&&e.origW>0&&e.origH>0&&u>0&&(e.h.value=Math.max(1,Math.round(u*e.origH/e.origW))),e.updating=!1,v(),e.mode==="simple"&&f()},S=()=>{if(e.updating)return;e.updating=!0;const u=parseInt(e.h.value||"0",10);e.lock.checked&&e.origW>0&&e.origH>0&&u>0&&(e.w.value=Math.max(1,Math.round(u*e.origW/e.origH))),e.updating=!1,v(),e.mode==="simple"&&f()};e.w.addEventListener("input",C),e.h.addEventListener("input",S),e.onex.addEventListener("click",()=>{w(1),f()}),e.half.addEventListener("click",()=>{w(.5),f()}),e.third.addEventListener("click",()=>{w(1/3),f()}),e.quarter.addEventListener("click",()=>{w(1/4),f()}),e.double.addEventListener("click",()=>{w(2),f()}),e.applyScale.addEventListener("click",()=>{const u=parseFloat(e.scale.value||"");if(!Number.isFinite(u)||u<=0){D("Enter a valid scale factor > 0");return}w(u),f()});const I=()=>{e.mode==="advanced"&&(e.calcReady=!1,e.applyBtn.disabled=!0,x(),g())},$=u=>{if(e.updating)return;const h=parseFloat(u);if(!Number.isFinite(h))return;const M=Math.min(Math.max(h,1),128);e.mult=M,e.bind.checked&&(e.gapX=M,e.gapY=M),b(),k(),y(),I()};e.multRange.addEventListener("input",u=>{e.updating||$(u.target.value)}),e.multInput.addEventListener("input",u=>{if(e.updating)return;const h=u.target.value;Number.isFinite(parseFloat(h))&&$(h)}),e.bind.addEventListener("change",()=>{e.bind.checked&&(e.gapX=e.mult,e.gapY=e.mult,b()),k(),y(),I()}),e.blockW.addEventListener("input",u=>{if(e.updating)return;const h=u.target.value,M=parseFloat(h);Number.isFinite(M)&&(e.gapX=Math.min(Math.max(M,1),4096),e.bind.checked&&(e.mult=e.gapX,e.gapY=e.gapX),b(),k(),y(),I())}),e.blockH.addEventListener("input",u=>{if(e.updating)return;const h=u.target.value,M=parseFloat(h);Number.isFinite(M)&&(e.gapY=Math.min(Math.max(M,1),4096),e.bind.checked&&(e.mult=e.gapY,e.gapX=e.gapY),b(),k(),y(),I())}),e.offX.addEventListener("input",u=>{const h=u.target.value,M=parseFloat(h);Number.isFinite(M)&&(e.offx=Math.min(Math.max(M,0),Math.max(0,e.origH-1e-4)),e.viewX=Math.min(e.viewX,Math.max(0,e.origW-1)),k(),y(),I())}),e.offY.addEventListener("input",u=>{const h=u.target.value,M=parseFloat(h);Number.isFinite(M)&&(e.offy=Math.min(Math.max(M,0),Math.max(0,e.origH-1e-4)),e.viewY=Math.min(e.viewY,Math.max(0,e.origH-1)),k(),y(),I())}),e.dotR.addEventListener("input",u=>{e.dotr=Math.max(1,Math.round(Number(u.target.value)||1)),e.dotRVal.textContent=String(e.dotr),y()}),e.gridToggle.addEventListener("change",y);const O=u=>{const h=Math.max(50,Math.floor(e.advWrap.clientWidth)),M=Math.max(50,Math.floor(e.advWrap.clientHeight)),A=Math.max(1,Math.floor(h/e.zoom)),P=Math.max(1,Math.floor(M/e.zoom)),T=e.viewX+A/2,X=e.viewY+P/2;e.zoom=Math.min(32,Math.max(.1,e.zoom*u));const q=Math.max(1,Math.floor(h/e.zoom)),Y=Math.max(1,Math.floor(M/e.zoom));e.viewX=Math.min(Math.max(0,Math.round(T-q/2)),Math.max(0,e.origW-q)),e.viewY=Math.min(Math.max(0,Math.round(X-Y/2)),Math.max(0,e.origH-Y)),y()};e.zoomIn.addEventListener("click",()=>O(1.25)),e.zoomOut.addEventListener("click",()=>O(1/1.25)),e.advWrap.addEventListener("wheel",u=>{if(!u.ctrlKey)return;u.preventDefault();const h=u.deltaY||0;O(h>0?1/1.15:1.15)},{passive:!1});const R=u=>{u.target.closest(".op-rs-zoom")||(e.panning=!0,e.panStart={x:u.clientX,y:u.clientY,viewX:e.viewX,viewY:e.viewY},e.advWrap.classList.remove("op-pan-grab"),e.advWrap.classList.add("op-pan-grabbing"),e.advWrap.setPointerCapture?.(u.pointerId))},_=u=>{if(!e.panning)return;const h=u.clientX-e.panStart.x,M=u.clientY-e.panStart.y,A=e.advWrap.clientWidth,P=e.advWrap.clientHeight,T=Math.max(1,Math.floor(A/e.zoom)),X=Math.max(1,Math.floor(P/e.zoom));let q=e.panStart.viewX-Math.round(h/e.zoom),Y=e.panStart.viewY-Math.round(M/e.zoom);q=Math.min(Math.max(0,q),Math.max(0,e.origW-T)),Y=Math.min(Math.max(0,Y),Math.max(0,e.origH-X)),e.viewX=q,e.viewY=Y,y()},B=u=>{e.panning&&(e.panning=!1,e.panStart=null,e.advWrap.classList.remove("op-pan-grabbing"),e.advWrap.classList.add("op-pan-grab"),e.advWrap.releasePointerCapture?.(u.pointerId))};e.advWrap.addEventListener("pointerdown",R),e.advWrap.addEventListener("pointermove",_),e.advWrap.addEventListener("pointerup",B),e.advWrap.addEventListener("pointercancel",B),e.advWrap.addEventListener("pointerleave",B);const z=()=>Ye();e.cancelBtn.addEventListener("click",z),e.closeBtn.addEventListener("click",z),t.addEventListener("click",z),e.calcBtn.addEventListener("click",async()=>{if(e.mode==="advanced")try{const{cols:u,rows:h}=l();if(u<=0||h<=0){D("No samples. Adjust multiplier/offset.");return}if(u>=1e3||h>=1e3){D("Output too large. Must be < 1000\xD71000.");return}const M=await Ht(e.img,e.origW,e.origH,e.offx,e.offy,e.gapX,e.gapY);e.calcCanvas=M,e.calcCols=u,e.calcRows=h,e.calcReady=!0,e.applyBtn.disabled=!1,x(),g(),D(`Calculated ${u}\xD7${h}. Review preview, then Apply.`)}catch(u){console.error(u),D("Calculation failed.")}}),e.applyBtn.addEventListener("click",async()=>{if(e.ov)try{if(e.mode==="simple"){const u=parseInt(e.w.value||"0",10),h=parseInt(e.h.value||"0",10);if(!Number.isFinite(u)||!Number.isFinite(h)||u<=0||h<=0){D("Invalid dimensions");return}if(u>=1e3||h>=1e3){D("Too large. Must be < 1000\xD71000.");return}await zt(e.ov,u,h),Ye(),D(`Resized to ${u}\xD7${h}.`)}else{if(!e.calcReady||!e.calcCanvas){D("Calculate first.");return}const u=await Ke(e.calcCanvas);e.ov.imageBase64=u,e.ov.imageUrl=null,e.ov.isLocal=!0,await L(["overlays"]),U(),Z(),N(),Ye(),D(`Applied ${e.calcCols}\xD7${e.calcRows}.`)}}catch(u){console.error(u),D("Apply failed.")}}),e._syncAdvancedMeta=k,e._syncSimpleNote=v,e._setMode=u=>{const h=new Event("click");(u==="simple"?e.tabSimple:e.tabAdvanced).dispatchEvent(h)}}function Ut(t){if(!e)return;e.ov=t;const o=new Image;o.onload=()=>{e.img=o,e.origW=o.width,e.origH=o.height,e.orig.value=`${e.origW}\xD7${e.origH}`,e.w.value=String(e.origW),e.h.value=String(e.origH),e.lock.checked=!0,e.zoom=1,e.mult=4,e.gapX=4,e.gapY=4,e.offx=0,e.offy=0,e.dotr=1,e.viewX=0,e.viewY=0,e.bind.checked=!0,e.multRange.value="4",e.multInput.value="4",e.blockW.value="4",e.blockH.value="4",e.offX.value="0",e.offY.value="0",e.dotR.value="1",e.dotRVal.textContent="1",e.gridToggle.checked=!0,e.calcCanvas=null,e.calcCols=0,e.calcRows=0,e.calcReady=!1,e.applyBtn.disabled=e.mode==="advanced",e._setMode("simple"),document.body.classList.add("op-scroll-lock"),e.backdrop.classList.add("show"),e.modal.style.display="flex",e._drawSimplePreview?.(),e._drawAdvancedPreview?.(),e._drawAdvancedResultPreview?.(),e._syncAdvancedMeta?.(),e._syncSimpleNote?.(),(()=>{if(e.mode==="advanced"){const{cols:n,rows:r}=(function(){const s=Math.floor((e.origW-e.offx)/e.gapX),d=Math.floor((e.origH-e.offy)/e.gapY);return{cols:Math.max(0,s),rows:Math.max(0,d)}})();e.meta.textContent=n>0&&r>0?`Samples: ${n} \xD7 ${r} | Output: ${n}\xD7${r}${n>=1e3||r>=1e3?" (exceeds limit: < 1000\xD71000)":""}`:"Adjust multiplier/offset until dots sit at centers."}else{const n=parseInt(e.w.value||"0",10),r=parseInt(e.h.value||"0",10),s=Number.isFinite(n)&&Number.isFinite(r)&&n>0&&r>0,d=n>=1e3||r>=1e3;e.meta.textContent=s?d?`Target: ${n}\xD7${r} (exceeds limit: must be < 1000\xD71000)`:`Target: ${n}\xD7${r} (OK)`:"Enter positive width and height."}})();const a=()=>{e.mode==="simple"?e._drawSimplePreview?.():(e._drawAdvancedPreview?.(),e._drawAdvancedResultPreview?.())};e._resizeHandler=a,window.addEventListener("resize",a)},o.src=t.imageBase64}function Ye(){e&&(window.removeEventListener("resize",e._resizeHandler||(()=>{})),e.backdrop.classList.remove("show"),e.modal.style.display="none",e.ov=null,e.img=null,document.body.classList.remove("op-scroll-lock"))}async function zt(t,o,i){const a=await le(t.imageBase64),n=De(o,i),r=n.getContext("2d",{willReadFrequently:!0});r.imageSmoothingEnabled=!1,r.clearRect(0,0,o,i),r.drawImage(a,0,0,a.width,a.height,0,0,o,i);const s=r.getImageData(0,0,o,i),d=s.data;for(let m=3;m<d.length;m+=4)d[m]>0&&(d[m]=255);r.putImageData(s,0,0);const l=n.toDataURL("image/png");t.imageBase64=l,t.imageUrl=null,t.isLocal=!0,await L(["overlays"]),U(),Z(),N()}async function Ht(t,o,i,a,n,r,s){const l=V(o,i).getContext("2d",{willReadFrequently:!0});l.imageSmoothingEnabled=!1,l.drawImage(t,0,0);const m=l.getImageData(0,0,o,i).data,g=Math.floor((o-a)/r),v=Math.floor((i-n)/s);if(g<=0||v<=0)throw new Error("No samples available with current offset/gap");const w=De(g,v),f=w.getContext("2d"),b=f.createImageData(g,v),k=b.data,y=a+r/2,x=n+s/2,E=(C,S,I)=>Math.min(Math.max(C,S),I);for(let C=0;C<v;C++)for(let S=0;S<g;S++){const I=Math.round(E(y+S*r,0,o-1)),O=(Math.round(E(x+C*s,0,i-1))*o+I)*4,R=m[O],_=m[O+1],B=m[O+2],z=m[O+3],u=(C*g+S)*4;z===0?(k[u]=0,k[u+1]=0,k[u+2]=0,k[u+3]=0):(k[u]=R,k[u+1]=_,k[u+2]=B,k[u+3]=255)}return f.putImageData(b,0,0),w}function Wt(){Ct().then(()=>{Z();const t=async()=>{Lt(),It(),_e(),await Q()};document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t(),console.log("Hail's OP: Initialized with Minify (fixed 3\xD7) mode.")})}Wt()})();
