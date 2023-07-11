(function(I,g){typeof exports=="object"&&typeof module<"u"?g(exports):typeof define=="function"&&define.amd?define(["exports"],g):(I=typeof globalThis<"u"?globalThis:I||self,g(I.maptilerGeocoder={}))})(this,function(I){var Y;"use strict";var jn=Object.defineProperty;var On=(I,g,Z)=>g in I?jn(I,g,{enumerable:!0,configurable:!0,writable:!0,value:Z}):I[g]=Z;var Ye=(I,g,Z)=>(On(I,typeof g!="symbol"?g+"":g,Z),Z),vt=(I,g,Z)=>{if(!g.has(I))throw TypeError("Cannot "+Z)};var we=(I,g,Z)=>(vt(I,g,"read from private field"),Z?Z.call(I):g.get(I)),pt=(I,g,Z)=>{if(g.has(I))throw TypeError("Cannot add the same private member more than once");g instanceof WeakSet?g.add(I):g.set(I,Z)},Tt=(I,g,Z,Be)=>(vt(I,g,"write to private field"),Be?Be.call(I,Z):g.set(I,Z),Z);function g(){}function Z(n,e){for(const t in e)n[t]=e[t];return n}function Be(n){return n()}function xe(){return Object.create(null)}function te(n){n.forEach(Be)}function $e(n){return typeof n=="function"}function ae(n,e){return n!=n?e==e:n!==e||n&&typeof n=="object"||typeof n=="function"}let Ie;function Q(n,e){return n===e?!0:(Ie||(Ie=document.createElement("a")),Ie.href=e,n===Ie.href)}function Mt(n){return Object.keys(n).length===0}function Ct(n,e,t,l){if(n){const r=et(n,e,t,l);return n[0](r)}}function et(n,e,t,l){return n[1]&&l?Z(t.ctx.slice(),n[1](l(e))):t.ctx}function Bt(n,e,t,l){if(n[2]&&l){const r=n[2](l(t));if(e.dirty===void 0)return r;if(typeof r=="object"){const a=[],c=Math.max(e.dirty.length,r.length);for(let f=0;f<c;f+=1)a[f]=e.dirty[f]|r[f];return a}return e.dirty|r}return e.dirty}function Lt(n,e,t,l,r,a){if(r){const c=et(e,t,l,a);n.p(c,r)}}function Rt(n){if(n.ctx.length>32){const e=[],t=n.ctx.length/32;for(let l=0;l<t;l++)e[l]=-1;return e}return-1}function tt(n){return n??""}function p(n,e){n.appendChild(e)}function U(n,e,t){n.insertBefore(e,t||null)}function z(n){n.parentNode&&n.parentNode.removeChild(n)}function E(n){return document.createElement(n)}function ie(n){return document.createElementNS("http://www.w3.org/2000/svg",n)}function se(n){return document.createTextNode(n)}function J(){return se(" ")}function St(){return se("")}function V(n,e,t,l){return n.addEventListener(e,t,l),()=>n.removeEventListener(e,t,l)}function Et(n){return function(e){return e.preventDefault(),n.call(this,e)}}function s(n,e,t){t==null?n.removeAttribute(e):n.getAttribute(e)!==t&&n.setAttribute(e,t)}function It(n){return Array.from(n.childNodes)}function Le(n,e){e=""+e,n.data!==e&&(n.data=e)}function nt(n,e){n.value=e??""}function ce(n,e,t){n.classList.toggle(e,!!t)}function Pt(n,e,{bubbles:t=!1,cancelable:l=!1}={}){return new CustomEvent(n,{detail:e,bubbles:t,cancelable:l})}let Re;function Se(n){Re=n}function lt(){if(!Re)throw new Error("Function called outside component initialization");return Re}function zt(n){lt().$$.on_destroy.push(n)}function Ut(){const n=lt();return(e,t,{cancelable:l=!1}={})=>{const r=n.$$.callbacks[e];if(r){const a=Pt(e,t,{cancelable:l});return r.slice().forEach(c=>{c.call(n,a)}),!a.defaultPrevented}return!0}}function rt(n,e){const t=n.$$.callbacks[e.type];t&&t.slice().forEach(l=>l.call(this,e))}const ke=[],Ge=[];let ve=[];const it=[],At=Promise.resolve();let Ne=!1;function Wt(){Ne||(Ne=!0,At.then(st))}function Ze(n){ve.push(n)}const Fe=new Set;let pe=0;function st(){if(pe!==0)return;const n=Re;do{try{for(;pe<ke.length;){const e=ke[pe];pe++,Se(e),jt(e.$$)}}catch(e){throw ke.length=0,pe=0,e}for(Se(null),ke.length=0,pe=0;Ge.length;)Ge.pop()();for(let e=0;e<ve.length;e+=1){const t=ve[e];Fe.has(t)||(Fe.add(t),t())}ve.length=0}while(ke.length);for(;it.length;)it.pop()();Ne=!1,Fe.clear(),Se(n)}function jt(n){if(n.fragment!==null){n.update(),te(n.before_update);const e=n.dirty;n.dirty=[-1],n.fragment&&n.fragment.p(n.ctx,e),n.after_update.forEach(Ze)}}function Ot(n){const e=[],t=[];ve.forEach(l=>n.indexOf(l)===-1?e.push(l):t.push(l)),t.forEach(l=>l()),ve=e}const Pe=new Set;let de;function ze(){de={r:0,c:[],p:de}}function Ue(){de.r||te(de.c),de=de.p}function W(n,e){n&&n.i&&(Pe.delete(n),n.i(e))}function q(n,e,t,l){if(n&&n.o){if(Pe.has(n))return;Pe.add(n),de.c.push(()=>{Pe.delete(n),l&&(t&&n.d(1),l())}),n.o(e)}else l&&l()}function ct(n){return(n==null?void 0:n.length)!==void 0?n:Array.from(n)}function Gt(n,e){q(n,1,1,()=>{e.delete(n.key)})}function Nt(n,e,t,l,r,a,c,f,h,o,m,v){let y=n.length,B=a.length,P=y;const M={};for(;P--;)M[n[P].key]=P;const C=[],j=new Map,b=new Map,N=[];for(P=B;P--;){const L=v(r,a,P),R=t(L);let _=c.get(R);_?l&&N.push(()=>_.p(L,e)):(_=o(R,L),_.c()),j.set(R,C[P]=_),R in M&&b.set(R,Math.abs(P-M[R]))}const F=new Set,d=new Set;function w(L){W(L,1),L.m(f,m),c.set(L.key,L),m=L.first,B--}for(;y&&B;){const L=C[B-1],R=n[y-1],_=L.key,k=R.key;L===R?(m=L.first,y--,B--):j.has(k)?!c.has(_)||F.has(_)?w(L):d.has(k)?y--:b.get(_)>b.get(k)?(d.add(_),w(L)):(F.add(k),y--):(h(R,c),y--)}for(;y--;){const L=n[y];j.has(L.key)||h(L,c)}for(;B;)w(C[B-1]);return te(N),C}function oe(n){n&&n.c()}function ne(n,e,t){const{fragment:l,after_update:r}=n.$$;l&&l.m(e,t),Ze(()=>{const a=n.$$.on_mount.map(Be).filter($e);n.$$.on_destroy?n.$$.on_destroy.push(...a):te(a),n.$$.on_mount=[]}),r.forEach(Ze)}function le(n,e){const t=n.$$;t.fragment!==null&&(Ot(t.after_update),te(t.on_destroy),t.fragment&&t.fragment.d(e),t.on_destroy=t.fragment=null,t.ctx=[])}function Zt(n,e){n.$$.dirty[0]===-1&&(ke.push(n),Wt(),n.$$.dirty.fill(0)),n.$$.dirty[e/31|0]|=1<<e%31}function he(n,e,t,l,r,a,c,f=[-1]){const h=Re;Se(n);const o=n.$$={fragment:null,ctx:[],props:a,update:g,not_equal:r,bound:xe(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(h?h.$$.context:[])),callbacks:xe(),dirty:f,skip_bound:!1,root:e.target||h.$$.root};c&&c(o.root);let m=!1;if(o.ctx=t?t(n,e.props||{},(v,y,...B)=>{const P=B.length?B[0]:y;return o.ctx&&r(o.ctx[v],o.ctx[v]=P)&&(!o.skip_bound&&o.bound[v]&&o.bound[v](P),m&&Zt(n,v)),y}):[],o.update(),m=!0,te(o.before_update),o.fragment=l?l(o.ctx):!1,e.target){if(e.hydrate){const v=It(e.target);o.fragment&&o.fragment.l(v),v.forEach(z)}else o.fragment&&o.fragment.c();e.intro&&W(n.$$.fragment),ne(n,e.target,e.anchor),st()}Se(h)}class me{constructor(){Ye(this,"$$");Ye(this,"$$set")}$destroy(){le(this,1),this.$destroy=g}$on(e,t){if(!$e(t))return g;const l=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return l.push(t),()=>{const r=l.indexOf(t);r!==-1&&l.splice(r,1)}}$set(e){this.$$set&&!Mt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const Ft="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Ft);const Gn="";function qt(n){let e,t;return{c(){e=ie("svg"),t=ie("path"),s(t,"d","M13.12.706a.982.982 0 0 0-1.391 0L6.907 5.517 2.087.696a.982.982 0 1 0-1.391 1.39l4.821 4.821L.696 11.73a.982.982 0 1 0 1.39 1.39l4.821-4.821 4.822 4.821a.982.982 0 1 0 1.39-1.39L8.298 6.908l4.821-4.822a.988.988 0 0 0 0-1.38Z"),s(e,"viewBox","0 0 14 14"),s(e,"width","13"),s(e,"height","13"),s(e,"class","svelte-en2qvf")},m(l,r){U(l,e,r),p(e,t)},p:g,i:g,o:g,d(l){l&&z(e)}}}class ot extends me{constructor(e){super(),he(this,e,null,qt,ae,{})}}const Nn="";function Vt(n){let e,t;return{c(){e=ie("svg"),t=ie("path"),s(t,"d","M15 0C6.705 0 0 6.705 0 15C0 23.295 6.705 30 15 30C23.295 30 30 23.295 30 15C30 6.705 23.295 0 15 0ZM22.5 20.385L20.385 22.5L15 17.115L9.615 22.5L7.5 20.385L12.885 15L7.5 9.615L9.615 7.5L15 12.885L20.385 7.5L22.5 9.615L17.115 15L22.5 20.385Z"),s(e,"viewBox","0 0 30 30"),s(e,"fill","none"),s(e,"xmlns","http://www.w3.org/2000/svg"),s(e,"class","svelte-d2loi5")},m(l,r){U(l,e,r),p(e,t)},p:g,i:g,o:g,d(l){l&&z(e)}}}class ft extends me{constructor(e){super(),he(this,e,null,Vt,ae,{})}}const Zn="";function Dt(n){let e,t;return{c(){e=E("img"),Q(e.src,t=n[3]+"area.svg")||s(e,"src",t),s(e,"alt",n[6]),s(e,"class","svelte-ltkwvy")},m(l,r){U(l,e,r)},p(l,r){r&8&&!Q(e.src,t=l[3]+"area.svg")&&s(e,"src",t),r&64&&s(e,"alt",l[6])},d(l){l&&z(e)}}}function Kt(n){let e,t;return{c(){e=E("img"),Q(e.src,t=n[3]+"poi.svg")||s(e,"src",t),s(e,"alt",n[6]),s(e,"class","svelte-ltkwvy")},m(l,r){U(l,e,r)},p(l,r){r&8&&!Q(e.src,t=l[3]+"poi.svg")&&s(e,"src",t),r&64&&s(e,"alt",l[6])},d(l){l&&z(e)}}}function Qt(n){let e,t;return{c(){e=E("img"),Q(e.src,t=n[3]+"postal_code.svg")||s(e,"src",t),s(e,"alt",n[6]),s(e,"class","svelte-ltkwvy")},m(l,r){U(l,e,r)},p(l,r){r&8&&!Q(e.src,t=l[3]+"postal_code.svg")&&s(e,"src",t),r&64&&s(e,"alt",l[6])},d(l){l&&z(e)}}}function Ht(n){let e,t;return{c(){e=E("img"),Q(e.src,t=n[3]+"street.svg")||s(e,"src",t),s(e,"alt",n[6]),s(e,"class","svelte-ltkwvy")},m(l,r){U(l,e,r)},p(l,r){r&8&&!Q(e.src,t=l[3]+"street.svg")&&s(e,"src",t),r&64&&s(e,"alt",l[6])},d(l){l&&z(e)}}}function Jt(n){let e,t;return{c(){e=E("img"),Q(e.src,t=n[3]+"road.svg")||s(e,"src",t),s(e,"alt",n[6]),s(e,"class","svelte-ltkwvy")},m(l,r){U(l,e,r)},p(l,r){r&8&&!Q(e.src,t=l[3]+"road.svg")&&s(e,"src",t),r&64&&s(e,"alt",l[6])},d(l){l&&z(e)}}}function Xt(n){let e,t;return{c(){e=E("img"),Q(e.src,t=n[3]+"housenumber.svg")||s(e,"src",t),s(e,"alt",n[6]),s(e,"class","svelte-ltkwvy")},m(l,r){U(l,e,r)},p(l,r){r&8&&!Q(e.src,t=l[3]+"housenumber.svg")&&s(e,"src",t),r&64&&s(e,"alt",l[6])},d(l){l&&z(e)}}}function Yt(n){let e,t,l,r;return{c(){e=E("img"),Q(e.src,t=n[5])||s(e,"src",t),s(e,"alt",n[4]),s(e,"class","svelte-ltkwvy")},m(a,c){U(a,e,c),l||(r=V(e,"error",n[12]),l=!0)},p(a,c){c&32&&!Q(e.src,t=a[5])&&s(e,"src",t),c&16&&s(e,"alt",a[4])},d(a){a&&z(e),l=!1,r()}}}function ut(n){let e,t;return{c(){e=E("span"),t=se(n[6]),s(e,"class","secondary svelte-ltkwvy")},m(l,r){U(l,e,r),p(e,t)},p(l,r){r&64&&Le(t,l[6])},d(l){l&&z(e)}}}function xt(n){var L,R;let e,t,l,r,a,c,f,h,o=n[0].place_name.replace(/,.*/,"")+"",m,v,y=n[2]==="always"||n[2]&&!n[0].address&&((L=n[0].properties)==null?void 0:L.kind)!=="road"&&((R=n[0].properties)==null?void 0:R.kind)!=="road_relation"&&!n[0].id.startsWith("address.")&&!n[0].id.startsWith("postal_code.")&&(!n[0].id.startsWith("poi.")||!n[5]),B,P,M=n[0].place_name.replace(/[^,]*,?\s*/,"")+"",C,j,b;function N(_,k){var X,u;return k&1&&(t=null),k&1&&(l=null),k&1&&(r=null),_[5]?Yt:_[0].address?Xt:((X=_[0].properties)==null?void 0:X.kind)==="road"||((u=_[0].properties)==null?void 0:u.kind)==="road_relation"?Jt:(t==null&&(t=!!_[0].id.startsWith("address.")),t?Ht:(l==null&&(l=!!_[0].id.startsWith("postal_code.")),l?Qt:(r==null&&(r=!!_[0].id.startsWith("poi.")),r?Kt:Dt)))}let F=N(n,-1),d=F(n),w=y&&ut(n);return{c(){e=E("li"),d.c(),a=J(),c=E("span"),f=E("span"),h=E("span"),m=se(o),v=J(),w&&w.c(),B=J(),P=E("span"),C=se(M),s(h,"class","primary svelte-ltkwvy"),s(f,"class","svelte-ltkwvy"),s(P,"class","line2 svelte-ltkwvy"),s(c,"class","texts svelte-ltkwvy"),s(e,"tabindex","0"),s(e,"data-selected",n[1]),s(e,"class","svelte-ltkwvy"),ce(e,"selected",n[1])},m(_,k){U(_,e,k),d.m(e,null),p(e,a),p(e,c),p(c,f),p(f,h),p(h,m),p(f,v),w&&w.m(f,null),p(c,B),p(c,P),p(P,C),j||(b=[V(e,"mouseenter",n[10]),V(e,"focus",n[11])],j=!0)},p(_,[k]){var X,u;F===(F=N(_,k))&&d?d.p(_,k):(d.d(1),d=F(_),d&&(d.c(),d.m(e,a))),k&1&&o!==(o=_[0].place_name.replace(/,.*/,"")+"")&&Le(m,o),k&37&&(y=_[2]==="always"||_[2]&&!_[0].address&&((X=_[0].properties)==null?void 0:X.kind)!=="road"&&((u=_[0].properties)==null?void 0:u.kind)!=="road_relation"&&!_[0].id.startsWith("address.")&&!_[0].id.startsWith("postal_code.")&&(!_[0].id.startsWith("poi.")||!_[5])),y?w?w.p(_,k):(w=ut(_),w.c(),w.m(f,null)):w&&(w.d(1),w=null),k&1&&M!==(M=_[0].place_name.replace(/[^,]*,?\s*/,"")+"")&&Le(C,M),k&2&&s(e,"data-selected",_[1]),k&2&&ce(e,"selected",_[1])},i:g,o:g,d(_){_&&z(e),d.d(),w&&w.d(),j=!1,te(b)}}}function $t(n,e,t){var j;let l,r,{feature:a}=e,{selected:c=!1}=e,{showPlaceType:f}=e,{missingIconsCache:h}=e,{iconsBaseUrl:o}=e;const m=(j=a.properties)==null?void 0:j.categories;let v,y;function B(b){y&&h.add(y),t(9,l--,l)}function P(b){rt.call(this,n,b)}function M(b){rt.call(this,n,b)}const C=b=>B(b.currentTarget);return n.$$set=b=>{"feature"in b&&t(0,a=b.feature),"selected"in b&&t(1,c=b.selected),"showPlaceType"in b&&t(2,f=b.showPlaceType),"missingIconsCache"in b&&t(8,h=b.missingIconsCache),"iconsBaseUrl"in b&&t(3,o=b.iconsBaseUrl)},n.$$.update=()=>{var b,N,F,d;if(n.$$.dirty&824)do t(9,l--,l),t(4,v=m==null?void 0:m[l]),t(5,y=v?o+v.replace(/ /g,"_")+".svg":void 0);while(l>-1&&(!y||h.has(y)));n.$$.dirty&1&&t(6,r=a.id.startsWith("poi.")?(N=(b=a.properties)==null?void 0:b.categories)==null?void 0:N.join(", "):((d=(F=a.properties)==null?void 0:F.place_type_name)==null?void 0:d[0])??a.place_type[0])},t(9,l=(m==null?void 0:m.length)??0),[a,c,f,o,v,y,r,B,h,l,P,M,C]}class en extends me{constructor(e){super(),he(this,e,$t,xt,ae,{feature:0,selected:1,showPlaceType:2,missingIconsCache:8,iconsBaseUrl:3})}}const Fn="";function tn(n){let e;return{c(){e=E("div"),e.innerHTML='<svg viewBox="0 0 18 18" width="24" height="24" class="svelte-7cmwmc"><path fill="#333" d="M4.4 4.4l.8.8c2.1-2.1 5.5-2.1 7.6 0l.8-.8c-2.5-2.5-6.7-2.5-9.2 0z"></path><path opacity=".1" d="M12.8 12.9c-2.1 2.1-5.5 2.1-7.6 0-2.1-2.1-2.1-5.5 0-7.7l-.8-.8c-2.5 2.5-2.5 6.7 0 9.2s6.6 2.5 9.2 0 2.5-6.6 0-9.2l-.8.8c2.2 2.1 2.2 5.6 0 7.7z"></path></svg>',s(e,"class","svelte-7cmwmc")},m(t,l){U(t,e,l)},p:g,i:g,o:g,d(t){t&&z(e)}}}class nn extends me{constructor(e){super(),he(this,e,null,tn,ae,{})}}const qn="";function ln(n){let e,t;return{c(){e=ie("svg"),t=ie("path"),s(t,"d","M30.003-26.765C13.46-26.765 0-14.158 0 1.337c0 23.286 24.535 42.952 28.39 46.04.24.192.402.316.471.376.323.282.732.424 1.142.424.41 0 .82-.142 1.142-.424.068-.06.231-.183.471-.376 3.856-3.09 28.39-22.754 28.39-46.04 0-15.495-13.46-28.102-30.003-28.102Zm1.757 12.469c4.38 0 7.858 1.052 10.431 3.158 2.595 2.105 3.89 4.913 3.89 8.422 0 2.34-.53 4.362-1.593 6.063-1.063 1.702-3.086 3.616-6.063 5.742-2.042 1.51-3.337 2.659-3.89 3.446-.532.787-.8 1.82-.8 3.096v1.914h-8.449V15.18c0-2.041.434-3.815 1.306-5.325.872-1.51 2.467-3.118 4.785-4.82 2.233-1.594 3.7-2.89 4.402-3.889a5.582 5.582 0 0 0 1.087-3.35c0-1.382-.51-2.435-1.531-3.158-1.02-.723-2.45-1.087-4.28-1.087-3.19 0-6.826 1.047-10.91 3.131l-3.472-6.986c4.742-2.659 9.77-3.992 15.087-3.992Zm-1.88 37.324c1.765 0 3.124.472 4.08 1.408.98.936 1.47 2.276 1.47 4.02 0 1.68-.49 3.007-1.47 3.985-.977.957-2.336 1.435-4.08 1.435-1.787 0-3.171-.465-4.15-1.4-.978-.958-1.47-2.298-1.47-4.02 0-1.787.48-3.14 1.436-4.054.957-.915 2.355-1.374 4.184-1.374Z"),s(e,"viewBox","0 0 60.006 21.412"),s(e,"width","14"),s(e,"height","20"),s(e,"class","svelte-en2qvf")},m(l,r){U(l,e,r),p(e,t)},p:g,i:g,o:g,d(l){l&&z(e)}}}class rn extends me{constructor(e){super(),he(this,e,null,ln,ae,{})}}const Vn="";function sn(n){let e,t;return{c(){e=ie("svg"),t=ie("path"),s(t,"d","M13.101 14.261 8.74 9.899a4.797 4.797 0 0 1-1.425.748 5.165 5.165 0 0 1-1.603.248c-1.446 0-2.677-.5-3.693-1.503S.495 7.164.495 5.717c0-1.446.508-2.678 1.524-3.693C3.035 1.008 4.266.5 5.712.5c1.448 0 2.672.508 3.675 1.524 1.002 1.015 1.503 2.247 1.503 3.693 0 .558-.08 1.092-.239 1.603-.159.512-.411.98-.757 1.405l4.382 4.4a.74.74 0 0 1 .229.568.81.81 0 0 1-.249.568.787.787 0 0 1-.577.239.787.787 0 0 1-.578-.239ZM5.712 9.223c.97 0 1.796-.342 2.48-1.026a3.378 3.378 0 0 0 1.026-2.48c0-.982-.34-1.818-1.016-2.509-.677-.69-1.507-1.035-2.49-1.035a3.42 3.42 0 0 0-2.509 1.035 3.42 3.42 0 0 0-1.035 2.51c0 .982.345 1.812 1.035 2.488.691.678 1.527 1.017 2.51 1.017Z"),s(e,"width","14"),s(e,"height","14"),s(e,"viewBox","0 0 15 15"),s(e,"class","svelte-en2qvf")},m(l,r){U(l,e,r),p(e,t)},p:g,i:g,o:g,d(l){l&&z(e)}}}class cn extends me{constructor(e){super(),he(this,e,null,sn,ae,{})}}const Dn="";function at(n,e,t){const l=n.slice();return l[75]=e[t],l[77]=t,l}function dt(n){let e,t;return e=new nn({}),{c(){oe(e.$$.fragment)},m(l,r){ne(e,l,r),t=!0},i(l){t||(W(e.$$.fragment,l),t=!0)},o(l){q(e.$$.fragment,l),t=!1},d(l){le(e,l)}}}function ht(n){let e,t,l,r,a;return t=new rn({}),{c(){e=E("button"),oe(t.$$.fragment),s(e,"type","button"),s(e,"title",n[9]),s(e,"class","svelte-1r7dvt7"),ce(e,"active",n[0])},m(c,f){U(c,e,f),ne(t,e,null),l=!0,r||(a=V(e,"click",n[61]),r=!0)},p(c,f){(!l||f[0]&512)&&s(e,"title",c[9]),(!l||f[0]&1)&&ce(e,"active",c[0])},i(c){l||(W(t.$$.fragment,c),l=!0)},o(c){q(t.$$.fragment,c),l=!1},d(c){c&&z(e),le(t),r=!1,a()}}}function on(n){let e,t=[],l=new Map,r,a,c,f=ct(n[13]);const h=o=>o[75].id+(o[75].address?","+o[75].address:"");for(let o=0;o<f.length;o+=1){let m=at(n,f,o),v=h(m);l.set(v,t[o]=mt(v,m))}return{c(){e=E("ul");for(let o=0;o<t.length;o+=1)t[o].c();s(e,"class","svelte-1r7dvt7")},m(o,m){U(o,e,m);for(let v=0;v<t.length;v+=1)t[v]&&t[v].m(e,null);r=!0,a||(c=[V(e,"mouseleave",n[65]),V(e,"blur",n[66])],a=!0)},p(o,m){m[0]&8940544&&(f=ct(o[13]),ze(),t=Nt(t,m,h,1,o,f,l,e,Gt,mt,null,at),Ue())},i(o){if(!r){for(let m=0;m<f.length;m+=1)W(t[m]);r=!0}},o(o){for(let m=0;m<t.length;m+=1)q(t[m]);r=!1},d(o){o&&z(e);for(let m=0;m<t.length;m+=1)t[m].d();a=!1,te(c)}}}function fn(n){let e,t,l,r,a,c;return t=new ft({}),{c(){e=E("div"),oe(t.$$.fragment),l=J(),r=E("div"),a=se(n[7]),s(r,"class","svelte-1r7dvt7"),s(e,"class","no-results svelte-1r7dvt7")},m(f,h){U(f,e,h),ne(t,e,null),p(e,l),p(e,r),p(r,a),c=!0},p(f,h){(!c||h[0]&128)&&Le(a,f[7])},i(f){c||(W(t.$$.fragment,f),c=!0)},o(f){q(t.$$.fragment,f),c=!1},d(f){f&&z(e),le(t)}}}function un(n){let e="",t;return{c(){t=se(e)},m(l,r){U(l,t,r)},p:g,i:g,o:g,d(l){l&&z(t)}}}function an(n){let e,t,l,r,a,c,f,h,o,m,v;return t=new ft({}),h=new ot({}),{c(){e=E("div"),oe(t.$$.fragment),l=J(),r=E("div"),a=se(n[6]),c=J(),f=E("button"),oe(h.$$.fragment),s(r,"class","svelte-1r7dvt7"),s(f,"class","svelte-1r7dvt7"),s(e,"class","error svelte-1r7dvt7")},m(y,B){U(y,e,B),ne(t,e,null),p(e,l),p(e,r),p(r,a),p(e,c),p(e,f),ne(h,f,null),o=!0,m||(v=V(f,"click",n[62]),m=!0)},p(y,B){(!o||B[0]&64)&&Le(a,y[6])},i(y){o||(W(t.$$.fragment,y),W(h.$$.fragment,y),o=!0)},o(y){q(t.$$.fragment,y),q(h.$$.fragment,y),o=!1},d(y){y&&z(e),le(t),le(h),m=!1,v()}}}function mt(n,e){let t,l,r;function a(){return e[63](e[77])}function c(){return e[64](e[75])}return l=new en({props:{feature:e[75],showPlaceType:e[10],selected:e[14]===e[77],missingIconsCache:e[19],iconsBaseUrl:e[11]}}),l.$on("mouseenter",a),l.$on("focus",c),{key:n,first:null,c(){t=St(),oe(l.$$.fragment),this.first=t},m(f,h){U(f,t,h),ne(l,f,h),r=!0},p(f,h){e=f;const o={};h[0]&8192&&(o.feature=e[75]),h[0]&1024&&(o.showPlaceType=e[10]),h[0]&24576&&(o.selected=e[14]===e[77]),h[0]&2048&&(o.iconsBaseUrl=e[11]),l.$set(o)},i(f){r||(W(l.$$.fragment,f),r=!0)},o(f){q(l.$$.fragment,f),r=!1},d(f){f&&z(t),le(l,f)}}}function dn(n){let e,t,l,r,a,c,f,h,o,m,v,y,B,P,M,C,j,b,N,F;r=new cn({}),m=new ot({});let d=n[18]&&dt(),w=n[5]===!0&&ht(n);const L=n[53].default,R=Ct(L,n,n[52],null),_=[an,un,fn,on],k=[];function X(u,A){var re,_e;return u[17]?0:u[15]?((re=u[13])==null?void 0:re.length)===0?2:u[15]&&((_e=u[13])!=null&&_e.length)?3:-1:1}return~(M=X(n))&&(C=k[M]=_[M](n)),{c(){e=E("form"),t=E("div"),l=E("button"),oe(r.$$.fragment),a=J(),c=E("input"),f=J(),h=E("div"),o=E("button"),oe(m.$$.fragment),v=J(),d&&d.c(),y=J(),w&&w.c(),B=J(),R&&R.c(),P=J(),C&&C.c(),s(l,"class","search-button svelte-1r7dvt7"),s(l,"type","button"),s(c,"placeholder",n[8]),s(c,"aria-label",n[8]),s(c,"class","svelte-1r7dvt7"),s(o,"type","button"),s(o,"title",n[3]),s(o,"class","svelte-1r7dvt7"),s(h,"class","clear-button-container svelte-1r7dvt7"),ce(h,"displayable",n[1]!==""),s(t,"class","input-group svelte-1r7dvt7"),s(e,"tabindex","0"),s(e,"class",j=tt(n[2])+" svelte-1r7dvt7"),ce(e,"can-collapse",n[4]&&n[1]==="")},m(u,A){U(u,e,A),p(e,t),p(t,l),ne(r,l,null),p(t,a),p(t,c),n[55](c),nt(c,n[1]),p(t,f),p(t,h),p(h,o),ne(m,o,null),p(h,v),d&&d.m(h,null),p(t,y),w&&w.m(t,null),p(t,B),R&&R.m(t,null),p(e,P),~M&&k[M].m(e,null),b=!0,N||(F=[V(l,"click",n[54]),V(c,"input",n[56]),V(c,"focus",n[57]),V(c,"blur",n[58]),V(c,"keydown",n[21]),V(c,"input",n[59]),V(o,"click",n[60]),V(e,"submit",Et(n[20]))],N=!0)},p(u,A){(!b||A[0]&256)&&s(c,"placeholder",u[8]),(!b||A[0]&256)&&s(c,"aria-label",u[8]),A[0]&2&&c.value!==u[1]&&nt(c,u[1]),(!b||A[0]&8)&&s(o,"title",u[3]),u[18]?d?A[0]&262144&&W(d,1):(d=dt(),d.c(),W(d,1),d.m(h,null)):d&&(ze(),q(d,1,1,()=>{d=null}),Ue()),(!b||A[0]&2)&&ce(h,"displayable",u[1]!==""),u[5]===!0?w?(w.p(u,A),A[0]&32&&W(w,1)):(w=ht(u),w.c(),W(w,1),w.m(t,B)):w&&(ze(),q(w,1,1,()=>{w=null}),Ue()),R&&R.p&&(!b||A[1]&2097152)&&Lt(R,L,u,u[52],b?Bt(L,u[52],A,null):Rt(u[52]),null);let re=M;M=X(u),M===re?~M&&k[M].p(u,A):(C&&(ze(),q(k[re],1,1,()=>{k[re]=null}),Ue()),~M?(C=k[M],C?C.p(u,A):(C=k[M]=_[M](u),C.c()),W(C,1),C.m(e,null)):C=null),(!b||A[0]&4&&j!==(j=tt(u[2])+" svelte-1r7dvt7"))&&s(e,"class",j),(!b||A[0]&22)&&ce(e,"can-collapse",u[4]&&u[1]==="")},i(u){b||(W(r.$$.fragment,u),W(m.$$.fragment,u),W(d),W(w),W(R,u),W(C),b=!0)},o(u){q(r.$$.fragment,u),q(m.$$.fragment,u),q(d),q(w),q(R,u),q(C),b=!1},d(u){u&&z(e),le(r),n[55](null),le(m),d&&d.d(),w&&w.d(),R&&R.d(u),~M&&k[M].d(),N=!1,te(F)}}}function hn(n,e,t){const l=e[1],r=e[0],a=l-r;return n===l&&t?n:((n-r)%a+a)%a+r}function _t(n){let e=[...n];return e[2]<e[0]&&(e[2]+=360),e}function mn(n,e,t){let l,{$$slots:r={},$$scope:a}=e,{class:c=void 0}=e,{apiKey:f}=e,{bbox:h=void 0}=e,{clearButtonTitle:o="clear"}=e,{clearOnBlur:m=!1}=e,{collapsed:v=!1}=e,{country:y=void 0}=e,{debounceSearch:B=200}=e,{enableReverse:P=!1}=e,{errorMessage:M="Something went wrong…"}=e,{filter:C=()=>!0}=e,{flyTo:j=!0}=e,{fuzzyMatch:b=!0}=e,{language:N=void 0}=e,{limit:F=void 0}=e,{mapController:d=void 0}=e,{minLength:w=2}=e,{noResultsMessage:L="Oops! Looks like you're trying to predict something that's not quite right. We can't seem to find what you're looking for. Maybe try double-checking your spelling or try a different search term. Keep on typing - we'll do our best to get you where you need to go!"}=e,{placeholder:R="Search"}=e,{proximity:_=void 0}=e,{reverseActive:k=P==="always"}=e,{reverseButtonTitle:X="toggle reverse geocoding"}=e,{searchValue:u=""}=e,{showFullGeometry:A=!0}=e,{showPlaceType:re="ifNeeded"}=e,{showResultsWhileTyping:_e=!0}=e,{trackProximity:Ae=!0}=e,{types:ge=void 0}=e,{zoom:We=16}=e,{maxZoom:Ee=18}=e,{apiUrl:qe="https://api.maptiler.com/geocoding"}=e,{fetchParameters:Ve={}}=e,{iconsBaseUrl:gt="https://cdn.maptiler.com/maptiler-geocoding-control/v0.0.97/icons/"}=e;function bn(){x.focus()}function wn(){x.blur()}function yt(i,G=!0){t(1,u=i),G?(t(14,O=-1),wt()):(Qe(),setTimeout(()=>{x.focus(),x.select()}))}let Te=!1,S,D,T,bt="",x,O=-1,$,je=[],ye,Me,Oe,De;const kn=new Set,fe=Ut();zt(()=>{d&&(d.setEventHandler(void 0),d.indicateReverse(!1),d.setSelectedMarker(-1),d.setMarkers(void 0,void 0))});function wt(i){if(Me&&(clearTimeout(Me),Me=void 0),O>-1&&S)t(49,T=S[O]),t(1,u=T.place_name.replace(/,.*/,"")),t(17,$=void 0),t(48,D=void 0),t(14,O=-1);else if(u){const G=i||!kt();Ke(u,{exact:!0}).then(()=>{t(48,D=S),t(49,T=void 0),G&&vn()}).catch(ee=>t(17,$=ee))}}function kt(){return/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(u)}async function Ke(i,{byId:G=!1,exact:ee=!1}={}){t(17,$=void 0);const Ce=kt(),H=new URLSearchParams;N!=null&&H.set("language",Array.isArray(N)?N.join(","):N),ge&&H.set("types",ge.join(",")),Ce||(h&&H.set("bbox",h.map(ue=>ue.toFixed(6)).join(",")),y&&H.set("country",Array.isArray(y)?y.join(","):y)),G||(_&&H.set("proximity",_.map(ue=>ue.toFixed(6)).join(",")),(ee||!_e)&&H.set("autocomplete","false"),H.set("fuzzyMatch",String(b))),F!==void 0&&(!Ce||(ge==null?void 0:ge.length)===1)&&H.set("limit",String(F)),H.set("key",f);const be=qe+"/"+encodeURIComponent(i)+".json?"+H.toString();if(be===bt){G?(t(13,S=void 0),t(49,T=je[0])):t(13,S=je);return}bt=be,ye==null||ye.abort();const K=new AbortController;t(18,ye=K);let Je;try{Je=await fetch(be,{signal:K.signal,...Ve}).finally(()=>{K===ye&&t(18,ye=void 0)})}catch(ue){if(ue&&typeof ue=="object"&&"name"in ue&&ue.name==="AbortError")return;throw new Error}if(!Je.ok)throw new Error;const Xe=await Je.json();fe("response",{url:be,featureCollection:Xe}),G?(t(13,S=void 0),t(49,T=Xe.features[0]),je=[T]):(t(13,S=Xe.features.filter(C)),je=S,Ce&&x.focus())}function vn(){var ee,Ce,H,be;if(!(D!=null&&D.length)||!j)return;const i=[180,90,-180,-90],G=!D.some(K=>!K.matching_text);for(const K of D)(G||!K.matching_text)&&(i[0]=Math.min(i[0],((ee=K.bbox)==null?void 0:ee[0])??K.center[0]),i[1]=Math.min(i[1],((Ce=K.bbox)==null?void 0:Ce[1])??K.center[1]),i[2]=Math.max(i[2],((H=K.bbox)==null?void 0:H[2])??K.center[0]),i[3]=Math.max(i[3],((be=K.bbox)==null?void 0:be[3])??K.center[1]));d&&D.length>0&&(T&&i[0]===i[2]&&i[1]===i[3]?d.flyTo(T.center,We):d.fitBounds(_t(i),50,Ee))}function pn(i){t(0,k=P==="always"),yt(hn(i[0],[-180,180],!0).toFixed(6)+","+i[1].toFixed(6))}function Tn(i){if(!S)return;let G=i.key==="ArrowDown"?1:i.key==="ArrowUp"?-1:0;G?(O===-1&&G===-1&&t(14,O=S.length),t(14,O+=G),O>=S.length&&t(14,O=-1),i.preventDefault()):["ArrowLeft","ArrowRight","Home","End"].includes(i.key)&&t(14,O=-1)}function Qe(i=!0){if(t(17,$=void 0),_e){if(Me&&clearTimeout(Me),u.length<w)return;const G=u;Me=window.setTimeout(()=>{Ke(G).catch(ee=>t(17,$=ee))},i?B:0)}else t(13,S=void 0),t(17,$=void 0)}function He(i){t(49,T=i),t(1,u=i.place_name),t(14,O=-1)}const Mn=()=>x.focus();function Cn(i){Ge[i?"unshift":"push"](()=>{x=i,t(16,x)})}function Bn(){u=this.value,t(1,u),t(12,Te),t(27,m)}const Ln=()=>t(12,Te=!0),Rn=()=>t(12,Te=!1),Sn=()=>Qe(),En=()=>{t(1,u=""),x.focus()},In=()=>t(0,k=!k),Pn=()=>t(17,$=void 0),zn=i=>t(14,O=i),Un=i=>He(i),An=()=>t(14,O=-1),Wn=()=>{};return n.$$set=i=>{"class"in i&&t(2,c=i.class),"apiKey"in i&&t(25,f=i.apiKey),"bbox"in i&&t(26,h=i.bbox),"clearButtonTitle"in i&&t(3,o=i.clearButtonTitle),"clearOnBlur"in i&&t(27,m=i.clearOnBlur),"collapsed"in i&&t(4,v=i.collapsed),"country"in i&&t(28,y=i.country),"debounceSearch"in i&&t(29,B=i.debounceSearch),"enableReverse"in i&&t(5,P=i.enableReverse),"errorMessage"in i&&t(6,M=i.errorMessage),"filter"in i&&t(30,C=i.filter),"flyTo"in i&&t(31,j=i.flyTo),"fuzzyMatch"in i&&t(32,b=i.fuzzyMatch),"language"in i&&t(33,N=i.language),"limit"in i&&t(34,F=i.limit),"mapController"in i&&t(35,d=i.mapController),"minLength"in i&&t(36,w=i.minLength),"noResultsMessage"in i&&t(7,L=i.noResultsMessage),"placeholder"in i&&t(8,R=i.placeholder),"proximity"in i&&t(24,_=i.proximity),"reverseActive"in i&&t(0,k=i.reverseActive),"reverseButtonTitle"in i&&t(9,X=i.reverseButtonTitle),"searchValue"in i&&t(1,u=i.searchValue),"showFullGeometry"in i&&t(37,A=i.showFullGeometry),"showPlaceType"in i&&t(10,re=i.showPlaceType),"showResultsWhileTyping"in i&&t(38,_e=i.showResultsWhileTyping),"trackProximity"in i&&t(39,Ae=i.trackProximity),"types"in i&&t(40,ge=i.types),"zoom"in i&&t(41,We=i.zoom),"maxZoom"in i&&t(42,Ee=i.maxZoom),"apiUrl"in i&&t(43,qe=i.apiUrl),"fetchParameters"in i&&t(44,Ve=i.fetchParameters),"iconsBaseUrl"in i&&t(11,gt=i.iconsBaseUrl),"$$scope"in i&&t(52,a=i.$$scope)},n.$$.update=()=>{if(n.$$.dirty[1]&256&&(Ae||t(24,_=void 0)),n.$$.dirty[0]&134221824&&setTimeout(()=>{t(15,Oe=Te),m&&!Te&&t(1,u="")}),n.$$.dirty[0]&8194|n.$$.dirty[1]&32&&u.length<w&&(t(49,T=void 0),t(13,S=void 0),t(17,$=void 0),t(48,D=S)),n.$$.dirty[1]&262208&&A&&T&&!T.address&&T.geometry.type==="Point"&&Ke(T.id,{byId:!0}).catch(i=>t(17,$=i)),n.$$.dirty[1]&789521&&(d&&T&&T.id!==De&&j&&(!T.bbox||T.bbox[0]===T.bbox[2]&&T.bbox[1]===T.bbox[3]?d.flyTo(T.center,T.id.startsWith("poi.")||T.id.startsWith("address.")?Ee:We):d.fitBounds(_t(T.bbox),50,Ee),t(13,S=void 0),t(48,D=void 0),t(14,O=-1)),t(50,De=T==null?void 0:T.id)),n.$$.dirty[0]&8192|n.$$.dirty[1]&131072&&D!==S&&t(48,D=void 0),n.$$.dirty[1]&393232&&d&&d.setMarkers(D,T),n.$$.dirty[0]&2&&t(14,O=-1),n.$$.dirty[0]&40961|n.$$.dirty[1]&272&&d&&d.setEventHandler(i=>{switch(i.type){case"mapClick":k&&pn(i.coordinates);break;case"proximityChange":t(24,_=Ae?i.proximity:void 0);break;case"markerClick":{const G=S==null?void 0:S.find(ee=>ee.id===i.id);G&&He(G)}break;case"markerMouseEnter":t(14,O=Oe?(S==null?void 0:S.findIndex(G=>G.id===i.id))??-1:-1);break;case"markerMouseLeave":t(14,O=-1);break}}),n.$$.dirty[0]&16384|n.$$.dirty[1]&16&&(d==null||d.setSelectedMarker(O)),n.$$.dirty[0]&24576&&t(51,l=S==null?void 0:S[O]),n.$$.dirty[0]&2|n.$$.dirty[1]&16){const i=/^(-?\d+(?:\.\d*)?),(-?\d+(?:\.\d*)?)$/.exec(u);d==null||d.setReverseMarker(i?[Number(i[1]),Number(i[2])]:void 0)}n.$$.dirty[1]&1048576&&fe("select",l),n.$$.dirty[1]&262144&&fe("pick",T),n.$$.dirty[0]&40960&&fe("optionsVisibilityChange",Oe&&!!S),n.$$.dirty[0]&8192&&fe("featuresListed",S),n.$$.dirty[1]&131072&&fe("featuresMarked",D),n.$$.dirty[0]&1&&fe("reverseToggle",k),n.$$.dirty[0]&2&&fe("queryChange",u),n.$$.dirty[0]&1|n.$$.dirty[1]&16&&d&&d.indicateReverse(k)},[k,u,c,o,v,P,M,L,R,X,re,gt,Te,S,O,Oe,x,$,ye,kn,wt,Tn,Qe,He,_,f,h,m,y,B,C,j,b,N,F,d,w,A,_e,Ae,ge,We,Ee,qe,Ve,bn,wn,yt,D,T,De,l,a,r,Mn,Cn,Bn,Ln,Rn,Sn,En,In,Pn,zn,Un,An,Wn]}let _n=class extends me{constructor(e){super(),he(this,e,mn,dn,ae,{class:2,apiKey:25,bbox:26,clearButtonTitle:3,clearOnBlur:27,collapsed:4,country:28,debounceSearch:29,enableReverse:5,errorMessage:6,filter:30,flyTo:31,fuzzyMatch:32,language:33,limit:34,mapController:35,minLength:36,noResultsMessage:7,placeholder:8,proximity:24,reverseActive:0,reverseButtonTitle:9,searchValue:1,showFullGeometry:37,showPlaceType:10,showResultsWhileTyping:38,trackProximity:39,types:40,zoom:41,maxZoom:42,apiUrl:43,fetchParameters:44,iconsBaseUrl:11,focus:45,blur:46,setQuery:47},null,[-1,-1,-1])}get focus(){return this.$$.ctx[45]}get blur(){return this.$$.ctx[46]}get setQuery(){return this.$$.ctx[47]}};const gn=new FinalizationRegistry(n=>{n.$destroy()});class yn extends EventTarget{constructor({target:t,...l}){super();pt(this,Y,void 0);Tt(this,Y,new _n({target:t,props:l}));for(const r of["select","pick","featuresListed","featuresMarked","response","optionsVisibilityChange","reverseToggle","queryChange"])we(this,Y).$on(r,a=>this.dispatchEvent(a));gn.register(this,we(this,Y))}setOptions(t){we(this,Y).$set(t)}setQuery(t,l=!0){var r;(r=we(this,Y))==null||r.setQuery(t,l)}focus(){var t;(t=we(this,Y))==null||t.focus()}blur(){var t;(t=we(this,Y))==null||t.blur()}}Y=new WeakMap,I.GeocodingControl=yn,Object.defineProperty(I,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=vanilla.umd.cjs.map
