(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const c=document.querySelector("page-transition"),a=document.querySelectorAll("nav a"),l=document.querySelectorAll(".page");a.forEach(r=>{r.addEventListener("click",o=>{o.preventDefault();const i=r.getAttribute("href"),s=document.querySelector(i);l.forEach(e=>e.classList.remove("active")),c.show(),setTimeout(()=>{s.classList.add("active"),c.hide()},200)})});class d extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=`
        <style>
          :host {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(256, 256, 256, 0.05);
            display: flex;
            z-index: 1000; /* Ensure it's on top */
            transition: transform opacity 1s ease-in-out;
            transform: translate(5rem, 0);
            opacity: 0;
            height: 0;
          }
  
          :host(.active) {
            display: flex;
            opacity: 1;
            height: 100%;
            transform: translate(0);
          }
        </style>
        <slot></slot> 
      `}show(){this.classList.add("active")}hide(){this.classList.remove("active")}}customElements.define("page-transition",d);
