var A=Object.create;var S=Object.defineProperty,g=Object.defineProperties,C=Object.getOwnPropertyDescriptor,I=Object.getOwnPropertyDescriptors,E=Object.getOwnPropertyNames,R=Object.getOwnPropertySymbols,T=Object.getPrototypeOf,w=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable;var y=(t,e,a)=>e in t?S(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a,O=(t,e)=>{for(var a in e||(e={}))w.call(e,a)&&y(t,a,e[a]);if(R)for(var a of R(e))b.call(e,a)&&y(t,a,e[a]);return t},h=(t,e)=>g(t,I(e)),x=t=>S(t,"__esModule",{value:!0});var F=(t,e)=>{x(t);for(var a in e)S(t,a,{get:e[a],enumerable:!0})},M=(t,e,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of E(e))!w.call(t,s)&&s!=="default"&&S(t,s,{get:()=>e[s],enumerable:!(a=C(e,s))||a.enumerable});return t},N=t=>M(x(S(t!=null?A(T(t)):{},"default",t&&t.__esModule&&"default"in t?{get:()=>t.default,enumerable:!0}:{value:t,enumerable:!0})),t);F(exports,{addDevtools:()=>W,createState:()=>k});var u=N(require("react")),V=t=>t+1;function k({init:t,reducer:e}){let a=new Map,s=new Map,p={_state:t,get state(){return this._state},set state(o){this._state=o;for(let[n,i]of a.entries()){if(!i)continue;let m=s.get(n),_=n(this._state);_!=m&&(s.set(n,_),i())}}};function d(){return p.state}async function c(o){let n=await e(o,d,c);p.state=n}function f(o){a.delete(o),s.delete(o)}function l(o){let n=(0,u.useRef)(o),[,i]=(0,u.useReducer)(V,0),m=n.current(p.state);return a.set(n.current,i),(0,u.useEffect)(()=>()=>f(n.current),[]),m}return[c,l,d]}var D="__REDUX_DEVTOOLS_EXTENSION__",r=(()=>{try{return window[D]||window.top[D]}catch{return}})(),P=0;function W({init:t,reducer:e,name:a,replacer:s,reviver:p}){return r==null||r.connect({name:a||`ProxyState ${P++}`,serialize:{replacer:s,reviver:p},features:{persist:!1,export:!0,import:"custom",jump:!1,skip:!1,reorder:!1,dispatch:!0,test:!0}}),r==null||r.send("__INIT__",t),{reducer:async(c,f,l)=>{let o=new Date().toISOString(),n=e(c,f,l),i=await n;return n instanceof Promise?r==null||r.send(h(O({},c),{__startTime:o,__endTime:new Date().toISOString()}),i):r==null||r.send(c,n),n},init:t}}
