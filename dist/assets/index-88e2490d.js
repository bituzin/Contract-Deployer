import{F as l,G as h,H as p,I as a,J as b,K as y,L as f,ab as v}from"./index-6e4b0420.js";const w=l`
  :host {
    position: relative;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    padding: ${({spacing:t})=>t[1]};
  }

  /* -- Colors --------------------------------------------------- */
  button[data-type='accent'] wui-icon {
    color: ${({tokens:t})=>t.core.iconAccentPrimary};
  }

  button[data-type='neutral'][data-variant='primary'] wui-icon {
    color: ${({tokens:t})=>t.theme.iconInverse};
  }

  button[data-type='neutral'][data-variant='secondary'] wui-icon {
    color: ${({tokens:t})=>t.theme.iconDefault};
  }

  button[data-type='success'] wui-icon {
    color: ${({tokens:t})=>t.core.iconSuccess};
  }

  button[data-type='error'] wui-icon {
    color: ${({tokens:t})=>t.core.iconError};
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='xs'] {
    width: 16px;
    height: 16px;

    border-radius: ${({borderRadius:t})=>t[1]};
  }

  button[data-size='sm'] {
    width: 20px;
    height: 20px;
    border-radius: ${({borderRadius:t})=>t[1]};
  }

  button[data-size='md'] {
    width: 24px;
    height: 24px;
    border-radius: ${({borderRadius:t})=>t[2]};
  }

  button[data-size='lg'] {
    width: 28px;
    height: 28px;
    border-radius: ${({borderRadius:t})=>t[2]};
  }

  button[data-size='xs'] wui-icon {
    width: 8px;
    height: 8px;
  }

  button[data-size='sm'] wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] wui-icon {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] wui-icon {
    width: 20px;
    height: 20px;
  }

  /* -- Hover --------------------------------------------------- */
  @media (hover: hover) {
    button[data-type='accent']:hover:enabled {
      background-color: ${({tokens:t})=>t.core.foregroundAccent010};
    }

    button[data-variant='primary'][data-type='neutral']:hover:enabled {
      background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    }

    button[data-variant='secondary'][data-type='neutral']:hover:enabled {
      background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    }

    button[data-type='success']:hover:enabled {
      background-color: ${({tokens:t})=>t.core.backgroundSuccess};
    }

    button[data-type='error']:hover:enabled {
      background-color: ${({tokens:t})=>t.core.backgroundError};
    }
  }

  /* -- Focus --------------------------------------------------- */
  button:focus-visible {
    box-shadow: 0 0 0 4px ${({tokens:t})=>t.core.foregroundAccent020};
  }

  /* -- Properties --------------------------------------------------- */
  button[data-full-width='true'] {
    width: 100%;
  }

  :host([fullWidth]) {
    width: 100%;
  }

  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;var i=globalThis&&globalThis.__decorate||function(t,r,n,d){var c=arguments.length,e=c<3?r:d===null?d=Object.getOwnPropertyDescriptor(r,n):d,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(t,r,n,d);else for(var u=t.length-1;u>=0;u--)(s=t[u])&&(e=(c<3?s(e):c>3?s(r,n,e):s(r,n))||e);return c>3&&e&&Object.defineProperty(r,n,e),e};let o=class extends y{constructor(){super(...arguments),this.icon="card",this.variant="primary",this.type="accent",this.size="md",this.iconSize=void 0,this.fullWidth=!1,this.disabled=!1}render(){return f`<button
      data-variant=${this.variant}
      data-type=${this.type}
      data-size=${this.size}
      data-full-width=${this.fullWidth}
      ?disabled=${this.disabled}
    >
      <wui-icon color="inherit" name=${this.icon} size=${v(this.iconSize)}></wui-icon>
    </button>`}};o.styles=[h,p,w];i([a()],o.prototype,"icon",void 0);i([a()],o.prototype,"variant",void 0);i([a()],o.prototype,"type",void 0);i([a()],o.prototype,"size",void 0);i([a()],o.prototype,"iconSize",void 0);i([a({type:Boolean})],o.prototype,"fullWidth",void 0);i([a({type:Boolean})],o.prototype,"disabled",void 0);o=i([b("wui-icon-button")],o);
