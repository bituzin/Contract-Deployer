import{P as c,K as f,L as w,J as u}from"./index-6e4b0420.js";const h=c`
  :host > wui-flex:first-child {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }
`;var p=globalThis&&globalThis.__decorate||function(l,t,i,o){var n=arguments.length,e=n<3?t:o===null?o=Object.getOwnPropertyDescriptor(t,i):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(l,t,i,o);else for(var s=l.length-1;s>=0;s--)(r=l[s])&&(e=(n<3?r(e):n>3?r(t,i,e):r(t,i))||e);return n>3&&e&&Object.defineProperty(t,i,e),e};let a=class extends f{render(){return w`
      <wui-flex flexDirection="column" .padding=${["0","3","3","3"]} gap="3">
        <w3m-activity-list page="activity"></w3m-activity-list>
      </wui-flex>
    `}};a.styles=h;a=p([u("w3m-transactions-view")],a);export{a as W3mTransactionsView};
