import{F as O,K as w,bK as l,bL as C,b9 as _,b1 as j,L as u,ab as m,b5 as $,aB as c,J as g,I as p,Y as I,az as E,a2 as U,Z as W,a8 as z,a9 as V,aa as K,a7 as M,aA as F,a1 as B}from"./index-6e4b0420.js";const Y=O`
  :host > wui-grid {
    max-height: 360px;
    overflow: auto;
  }

  wui-flex {
    transition: opacity ${({easings:t})=>t["ease-out-power-1"]}
      ${({durations:t})=>t.md};
    will-change: opacity;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`;var T=globalThis&&globalThis.__decorate||function(t,e,i,o){var n=arguments.length,r=n<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,i):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(n<3?s(r):n>3?s(e,i,r):s(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let P=class extends w{constructor(){super(),this.unsubscribe=[],this.selectedCurrency=l.state.paymentCurrency,this.currencies=l.state.paymentCurrencies,this.currencyImages=C.state.currencyImages,this.checked=_.state.isLegalCheckboxChecked,this.unsubscribe.push(l.subscribe(e=>{this.selectedCurrency=e.paymentCurrency,this.currencies=e.paymentCurrencies}),C.subscribeKey("currencyImages",e=>this.currencyImages=e),_.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){var a;const{termsConditionsUrl:e,privacyPolicyUrl:i}=j.state,o=(a=j.state.features)==null?void 0:a.legalCheckbox,s=!!(e||i)&&!!o&&!this.checked;return u`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${["0","3","3","3"]}
        gap="2"
        class=${m(s?"disabled":void 0)}
      >
        ${this.currenciesTemplate(s)}
      </wui-flex>
    `}currenciesTemplate(e=!1){return this.currencies.map(i=>{var o;return u`
        <wui-list-item
          imageSrc=${m((o=this.currencyImages)==null?void 0:o[i.id])}
          @click=${()=>this.selectCurrency(i)}
          variant="image"
          tabIdx=${m(e?-1:void 0)}
        >
          <wui-text variant="md-medium" color="primary">${i.id}</wui-text>
        </wui-list-item>
      `})}selectCurrency(e){e&&(l.setPaymentCurrency(e),$.close())}};P.styles=Y;T([c()],P.prototype,"selectedCurrency",void 0);T([c()],P.prototype,"currencies",void 0);T([c()],P.prototype,"currencyImages",void 0);T([c()],P.prototype,"checked",void 0);P=T([g("w3m-onramp-fiat-select-view")],P);const N=O`
  button {
    padding: ${({spacing:t})=>t[3]};
    border-radius: ${({borderRadius:t})=>t[4]};
    border: none;
    outline: none;
    background-color: ${({tokens:t})=>t.core.glass010};
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: ${({spacing:t})=>t[3]};
    transition: background-color ${({easings:t})=>t["ease-out-power-1"]}
      ${({durations:t})=>t.md};
    will-change: background-color;
    cursor: pointer;
  }

  button:hover {
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
  }

  .provider-image {
    width: ${({spacing:t})=>t[10]};
    min-width: ${({spacing:t})=>t[10]};
    height: ${({spacing:t})=>t[10]};
    border-radius: calc(
      ${({borderRadius:t})=>t[4]} - calc(${({spacing:t})=>t[3]} / 2)
    );
    position: relative;
    overflow: hidden;
  }

  .network-icon {
    width: ${({spacing:t})=>t[3]};
    height: ${({spacing:t})=>t[3]};
    border-radius: calc(${({spacing:t})=>t[3]} / 2);
    overflow: hidden;
    box-shadow:
      0 0 0 3px ${({tokens:t})=>t.theme.foregroundPrimary},
      0 0 0 3px ${({tokens:t})=>t.theme.backgroundPrimary};
    transition: box-shadow ${({easings:t})=>t["ease-out-power-1"]}
      ${({durations:t})=>t.md};
    will-change: box-shadow;
  }

  button:hover .network-icon {
    box-shadow:
      0 0 0 3px ${({tokens:t})=>t.core.glass010},
      0 0 0 3px ${({tokens:t})=>t.theme.backgroundPrimary};
  }
`;var v=globalThis&&globalThis.__decorate||function(t,e,i,o){var n=arguments.length,r=n<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,i):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(n<3?s(r):n>3?s(e,i,r):s(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let h=class extends w{constructor(){super(...arguments),this.disabled=!1,this.color="inherit",this.label="",this.feeRange="",this.loading=!1,this.onClick=null}render(){return u`
      <button ?disabled=${this.disabled} @click=${this.onClick} ontouchstart>
        <wui-visual name=${m(this.name)} class="provider-image"></wui-visual>
        <wui-flex flexDirection="column" gap="01">
          <wui-text variant="md-regular" color="primary">${this.label}</wui-text>
          <wui-flex alignItems="center" justifyContent="flex-start" gap="4">
            <wui-text variant="sm-medium" color="primary">
              <wui-text variant="sm-regular" color="secondary">Fees</wui-text>
              ${this.feeRange}
            </wui-text>
            <wui-flex gap="2">
              <wui-icon name="bank" size="sm" color="default"></wui-icon>
              <wui-icon name="card" size="sm" color="default"></wui-icon>
            </wui-flex>
            ${this.networksTemplate()}
          </wui-flex>
        </wui-flex>
        ${this.loading?u`<wui-loading-spinner color="secondary" size="md"></wui-loading-spinner>`:u`<wui-icon name="chevronRight" color="default" size="sm"></wui-icon>`}
      </button>
    `}networksTemplate(){var o;const e=I.getAllRequestedCaipNetworks(),i=(o=e==null?void 0:e.filter(n=>{var r;return(r=n==null?void 0:n.assets)==null?void 0:r.imageId}))==null?void 0:o.slice(0,5);return u`
      <wui-flex class="networks">
        ${i==null?void 0:i.map(n=>u`
            <wui-flex class="network-icon">
              <wui-image src=${m(E.getNetworkImage(n))}></wui-image>
            </wui-flex>
          `)}
      </wui-flex>
    `}};h.styles=[N];v([p({type:Boolean})],h.prototype,"disabled",void 0);v([p()],h.prototype,"color",void 0);v([p()],h.prototype,"name",void 0);v([p()],h.prototype,"label",void 0);v([p()],h.prototype,"feeRange",void 0);v([p({type:Boolean})],h.prototype,"loading",void 0);v([p()],h.prototype,"onClick",void 0);h=v([g("w3m-onramp-provider-item")],h);var S=globalThis&&globalThis.__decorate||function(t,e,i,o){var n=arguments.length,r=n<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,i):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(n<3?s(r):n>3?s(e,i,r):s(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let L=class extends w{constructor(){super(),this.unsubscribe=[],this.providers=l.state.providers,this.unsubscribe.push(l.subscribeKey("providers",e=>{this.providers=e}))}render(){return u`
      <wui-flex flexDirection="column" .padding=${["0","3","3","3"]} gap="2">
        ${this.onRampProvidersTemplate()}
      </wui-flex>
    `}onRampProvidersTemplate(){return this.providers.filter(e=>e.supportedChains.includes(I.state.activeChain??"eip155")).map(e=>u`
          <w3m-onramp-provider-item
            label=${e.label}
            name=${e.name}
            feeRange=${e.feeRange}
            @click=${()=>{this.onClickProvider(e)}}
            ?disabled=${!e.url}
            data-testid=${`onramp-provider-${e.name}`}
          ></w3m-onramp-provider-item>
        `)}onClickProvider(e){var i;l.setSelectedProvider(e),U.push("BuyInProgress"),W.openHref(((i=l.state.selectedProvider)==null?void 0:i.url)||e.url,"popupWindow","width=600,height=800,scrollbars=yes"),z.sendEvent({type:"track",event:"SELECT_BUY_PROVIDER",properties:{provider:e.name,isSmartAccount:V(I.state.activeChain)===K.ACCOUNT_TYPES.SMART_ACCOUNT}})}};S([c()],L.prototype,"providers",void 0);L=S([g("w3m-onramp-providers-view")],L);const q=O`
  :host > wui-grid {
    max-height: 360px;
    overflow: auto;
  }

  wui-flex {
    transition: opacity ${({easings:t})=>t["ease-out-power-1"]}
      ${({durations:t})=>t.md};
    will-change: opacity;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`;var A=globalThis&&globalThis.__decorate||function(t,e,i,o){var n=arguments.length,r=n<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,i):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(n<3?s(r):n>3?s(e,i,r):s(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let k=class extends w{constructor(){super(),this.unsubscribe=[],this.selectedCurrency=l.state.purchaseCurrencies,this.tokens=l.state.purchaseCurrencies,this.tokenImages=C.state.tokenImages,this.checked=_.state.isLegalCheckboxChecked,this.unsubscribe.push(l.subscribe(e=>{this.selectedCurrency=e.purchaseCurrencies,this.tokens=e.purchaseCurrencies}),C.subscribeKey("tokenImages",e=>this.tokenImages=e),_.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){var a;const{termsConditionsUrl:e,privacyPolicyUrl:i}=j.state,o=(a=j.state.features)==null?void 0:a.legalCheckbox,s=!!(e||i)&&!!o&&!this.checked;return u`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${["0","3","3","3"]}
        gap="2"
        class=${m(s?"disabled":void 0)}
      >
        ${this.currenciesTemplate(s)}
      </wui-flex>
    `}currenciesTemplate(e=!1){return this.tokens.map(i=>{var o;return u`
        <wui-list-item
          imageSrc=${m((o=this.tokenImages)==null?void 0:o[i.symbol])}
          @click=${()=>this.selectToken(i)}
          variant="image"
          tabIdx=${m(e?-1:void 0)}
        >
          <wui-flex gap="1" alignItems="center">
            <wui-text variant="md-medium" color="primary">${i.name}</wui-text>
            <wui-text variant="sm-regular" color="secondary">${i.symbol}</wui-text>
          </wui-flex>
        </wui-list-item>
      `})}selectToken(e){e&&(l.setPurchaseCurrency(e),$.close())}};k.styles=q;A([c()],k.prototype,"selectedCurrency",void 0);A([c()],k.prototype,"tokens",void 0);A([c()],k.prototype,"tokenImages",void 0);A([c()],k.prototype,"checked",void 0);k=A([g("w3m-onramp-token-select-view")],k);const Q=O`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-visual {
    border-radius: calc(
      ${({borderRadius:t})=>t[1]} * 9 - ${({borderRadius:t})=>t[3]}
    );
    position: relative;
    overflow: hidden;
  }

  wui-icon-box {
    position: absolute;
    right: calc(${({spacing:t})=>t[1]} * -1);
    bottom: calc(${({spacing:t})=>t[1]} * -1);
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]},
      transform ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]};
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px ${({spacing:t})=>t[4]};
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms ${({easings:t})=>t["ease-out-power-2"]} both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }

  wui-link {
    padding: ${({spacing:t})=>t["01"]} ${({spacing:t})=>t[2]};
  }
`;var f=globalThis&&globalThis.__decorate||function(t,e,i,o){var n=arguments.length,r=n<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,i):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(n<3?s(r):n>3?s(e,i,r):s(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let d=class extends w{constructor(){super(),this.unsubscribe=[],this.selectedOnRampProvider=l.state.selectedProvider,this.uri=M.state.wcUri,this.ready=!1,this.showRetry=!1,this.buffering=!1,this.error=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(l.subscribeKey("selectedProvider",e=>{this.selectedOnRampProvider=e}))}disconnectedCallback(){this.intervalId&&clearInterval(this.intervalId)}render(){var o,n;let e="Continue in external window";this.error?e="Buy failed":this.selectedOnRampProvider&&(e=`Buy in ${(o=this.selectedOnRampProvider)==null?void 0:o.label}`);const i=this.error?"Buy can be declined from your side or due to and error on the provider app":"We’ll notify you once your Buy is processed";return u`
      <wui-flex
        data-error=${m(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["10","5","5","5"]}
        gap="5"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-visual
            name=${m((n=this.selectedOnRampProvider)==null?void 0:n.name)}
            size="lg"
            class="provider-image"
          >
          </wui-visual>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            color="error"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="2"
          .padding=${["4","0","0","0"]}
        >
          <wui-text variant="md-medium" color=${this.error?"error":"primary"}>
            ${e}
          </wui-text>
          <wui-text align="center" variant="sm-medium" color="secondary">${i}</wui-text>
        </wui-flex>

        ${this.error?this.tryAgainTemplate():null}
      </wui-flex>

      <wui-flex .padding=${["0","5","5","5"]} justifyContent="center">
        <wui-link @click=${this.onCopyUri} color="secondary">
          <wui-icon size="sm" color="default" slot="iconLeft" name="copy"></wui-icon>
          Copy link
        </wui-link>
      </wui-flex>
    `}onTryAgain(){this.selectedOnRampProvider&&(this.error=!1,W.openHref(this.selectedOnRampProvider.url,"popupWindow","width=600,height=800,scrollbars=yes"))}tryAgainTemplate(){var e;return(e=this.selectedOnRampProvider)!=null&&e.url?u`<wui-button size="md" variant="accent" @click=${this.onTryAgain.bind(this)}>
      <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
      Try again
    </wui-button>`:null}loaderTemplate(){const e=F.state.themeVariables["--w3m-border-radius-master"],i=e?parseInt(e.replace("px",""),10):4;return u`<wui-loading-thumbnail radius=${i*9}></wui-loading-thumbnail>`}onCopyUri(){var e;if(!((e=this.selectedOnRampProvider)!=null&&e.url)){B.showError("No link found"),U.goBack();return}try{W.copyToClopboard(this.selectedOnRampProvider.url),B.showSuccess("Link copied")}catch{B.showError("Failed to copy")}}};d.styles=Q;f([c()],d.prototype,"intervalId",void 0);f([c()],d.prototype,"selectedOnRampProvider",void 0);f([c()],d.prototype,"uri",void 0);f([c()],d.prototype,"ready",void 0);f([c()],d.prototype,"showRetry",void 0);f([c()],d.prototype,"buffering",void 0);f([c()],d.prototype,"error",void 0);f([p({type:Boolean})],d.prototype,"isMobile",void 0);f([p()],d.prototype,"onRetry",void 0);d=f([g("w3m-buy-in-progress-view")],d);var X=globalThis&&globalThis.__decorate||function(t,e,i,o){var n=arguments.length,r=n<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,i):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(n<3?s(r):n>3?s(e,i,r):s(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let D=class extends w{render(){return u`
      <wui-flex
        flexDirection="column"
        .padding=${["6","10","5","10"]}
        alignItems="center"
        gap="5"
      >
        <wui-visual name="onrampCard"></wui-visual>
        <wui-flex flexDirection="column" gap="2" alignItems="center">
          <wui-text align="center" variant="md-medium" color="primary">
            Quickly and easily buy digital assets!
          </wui-text>
          <wui-text align="center" variant="sm-regular" color="secondary">
            Simply select your preferred onramp provider and add digital assets to your account
            using your credit card or bank transfer
          </wui-text>
        </wui-flex>
        <wui-button @click=${U.goBack}>
          <wui-icon size="sm" color="inherit" name="add" slot="iconLeft"></wui-icon>
          Buy
        </wui-button>
      </wui-flex>
    `}};D=X([g("w3m-what-is-a-buy-view")],D);const H=O`
  :host {
    width: 100%;
  }

  wui-loading-spinner {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }

  .currency-container {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({spacing:t})=>t[2]};
    height: 40px;
    padding: ${({spacing:t})=>t[2]} ${({spacing:t})=>t[2]}
      ${({spacing:t})=>t[2]} ${({spacing:t})=>t[2]};
    min-width: 95px;
    border-radius: ${({borderRadius:t})=>t.round};
    border: 1px solid ${({tokens:t})=>t.theme.foregroundPrimary};
    background: ${({tokens:t})=>t.theme.foregroundPrimary};
    cursor: pointer;
  }

  .currency-container > wui-image {
    height: 24px;
    width: 24px;
    border-radius: 50%;
  }
`;var R=globalThis&&globalThis.__decorate||function(t,e,i,o){var n=arguments.length,r=n<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,i):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(n<3?s(r):n>3?s(e,i,r):s(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let b=class extends w{constructor(){var e;super(),this.unsubscribe=[],this.type="Token",this.value=0,this.currencies=[],this.selectedCurrency=(e=this.currencies)==null?void 0:e[0],this.currencyImages=C.state.currencyImages,this.tokenImages=C.state.tokenImages,this.unsubscribe.push(l.subscribeKey("purchaseCurrency",i=>{!i||this.type==="Fiat"||(this.selectedCurrency=this.formatPurchaseCurrency(i))}),l.subscribeKey("paymentCurrency",i=>{!i||this.type==="Token"||(this.selectedCurrency=this.formatPaymentCurrency(i))}),l.subscribe(i=>{this.type==="Fiat"?this.currencies=i.purchaseCurrencies.map(this.formatPurchaseCurrency):this.currencies=i.paymentCurrencies.map(this.formatPaymentCurrency)}),C.subscribe(i=>{this.currencyImages={...i.currencyImages},this.tokenImages={...i.tokenImages}}))}firstUpdated(){l.getAvailableCurrencies()}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){var o;const e=((o=this.selectedCurrency)==null?void 0:o.symbol)||"",i=this.currencyImages[e]||this.tokenImages[e];return u`<wui-input-text type="number" size="lg" value=${this.value}>
      ${this.selectedCurrency?u` <wui-flex
            class="currency-container"
            justifyContent="space-between"
            alignItems="center"
            gap="1"
            @click=${()=>$.open({view:`OnRamp${this.type}Select`})}
          >
            <wui-image src=${m(i)}></wui-image>
            <wui-text color="primary">${this.selectedCurrency.symbol}</wui-text>
          </wui-flex>`:u`<wui-loading-spinner></wui-loading-spinner>`}
    </wui-input-text>`}formatPaymentCurrency(e){return{name:e.id,symbol:e.id}}formatPurchaseCurrency(e){return{name:e.name,symbol:e.symbol}}};b.styles=H;R([p({type:String})],b.prototype,"type",void 0);R([p({type:Number})],b.prototype,"value",void 0);R([c()],b.prototype,"currencies",void 0);R([c()],b.prototype,"selectedCurrency",void 0);R([c()],b.prototype,"currencyImages",void 0);R([c()],b.prototype,"tokenImages",void 0);b=R([g("w3m-onramp-input")],b);const G=O`
  :host > wui-flex {
    width: 100%;
    max-width: 360px;
  }

  :host > wui-flex > wui-flex {
    border-radius: ${({borderRadius:t})=>t[8]};
    width: 100%;
  }

  .amounts-container {
    width: 100%;
  }
`;var x=globalThis&&globalThis.__decorate||function(t,e,i,o){var n=arguments.length,r=n<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,i):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(n<3?s(r):n>3?s(e,i,r):s(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};const J={USD:"$",EUR:"€",GBP:"£"},Z=[100,250,500,1e3];let y=class extends w{constructor(){super(),this.unsubscribe=[],this.disabled=!1,this.caipAddress=I.state.activeCaipAddress,this.loading=$.state.loading,this.paymentCurrency=l.state.paymentCurrency,this.paymentAmount=l.state.paymentAmount,this.purchaseAmount=l.state.purchaseAmount,this.quoteLoading=l.state.quotesLoading,this.unsubscribe.push(I.subscribeKey("activeCaipAddress",e=>this.caipAddress=e),$.subscribeKey("loading",e=>{this.loading=e}),l.subscribe(e=>{this.paymentCurrency=e.paymentCurrency,this.paymentAmount=e.paymentAmount,this.purchaseAmount=e.purchaseAmount,this.quoteLoading=e.quotesLoading}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return u`
      <wui-flex flexDirection="column" justifyContent="center" alignItems="center">
        <wui-flex flexDirection="column" alignItems="center" gap="2">
          <w3m-onramp-input
            type="Fiat"
            @inputChange=${this.onPaymentAmountChange.bind(this)}
            .value=${this.paymentAmount||0}
          ></w3m-onramp-input>
          <w3m-onramp-input
            type="Token"
            .value=${this.purchaseAmount||0}
            .loading=${this.quoteLoading}
          ></w3m-onramp-input>
          <wui-flex justifyContent="space-evenly" class="amounts-container" gap="2">
            ${Z.map(e=>{var i;return u`<wui-button
                  variant=${this.paymentAmount===e?"accent-secondary":"neutral-secondary"}
                  size="md"
                  textVariant="md-medium"
                  fullWidth
                  @click=${()=>this.selectPresetAmount(e)}
                  >${`${J[((i=this.paymentCurrency)==null?void 0:i.id)||"USD"]} ${e}`}</wui-button
                >`})}
          </wui-flex>
          ${this.templateButton()}
        </wui-flex>
      </wui-flex>
    `}templateButton(){return this.caipAddress?u`<wui-button
          @click=${this.getQuotes.bind(this)}
          variant="accent-primary"
          fullWidth
          size="lg"
          borderRadius="xs"
        >
          Get quotes
        </wui-button>`:u`<wui-button
          @click=${this.openModal.bind(this)}
          variant="accent"
          fullWidth
          size="lg"
          borderRadius="xs"
        >
          Connect wallet
        </wui-button>`}getQuotes(){this.loading||$.open({view:"OnRampProviders"})}openModal(){$.open({view:"Connect"})}async onPaymentAmountChange(e){l.setPaymentAmount(Number(e.detail)),await l.getQuote()}async selectPresetAmount(e){l.setPaymentAmount(e),await l.getQuote()}};y.styles=G;x([p({type:Boolean})],y.prototype,"disabled",void 0);x([c()],y.prototype,"caipAddress",void 0);x([c()],y.prototype,"loading",void 0);x([c()],y.prototype,"paymentCurrency",void 0);x([c()],y.prototype,"paymentAmount",void 0);x([c()],y.prototype,"purchaseAmount",void 0);x([c()],y.prototype,"quoteLoading",void 0);y=x([g("w3m-onramp-widget")],y);export{d as W3mBuyInProgressView,L as W3mOnRampProvidersView,P as W3mOnrampFiatSelectView,k as W3mOnrampTokensView,y as W3mOnrampWidget,D as W3mWhatIsABuyView};
