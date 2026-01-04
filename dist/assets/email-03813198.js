import{Y as S,a7 as O,b1 as p,a8 as c,b5 as _,a2 as s,a1 as f,Z as b,J as m,F as T,K as g,$ as h,L as u,aB as E,P as D,M as $,O as W,b6 as P,a0 as N}from"./index-6e4b0420.js";import{W as C}from"./index-cbeeaeec.js";var F=globalThis&&globalThis.__decorate||function(r,e,t,a){var n=arguments.length,i=n<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,a);else for(var l=r.length-1;l>=0;l--)(o=r[l])&&(i=(n<3?o(i):n>3?o(e,t,i):o(e,t))||i);return n>3&&i&&Object.defineProperty(e,t,i),i};let I=class extends C{constructor(){super(...arguments),this.onOtpSubmit=async e=>{var t,a;try{if(this.authConnector){const n=S.state.activeChain,i=O.getConnections(n),o=(t=p.state.remoteFeatures)==null?void 0:t.multiWallet,l=i.length>0;if(await this.authConnector.provider.connectOtp({otp:e}),c.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),n)await O.connectExternal(this.authConnector,n);else throw new Error("Active chain is not set on ChainController");if((a=p.state.remoteFeatures)!=null&&a.emailCapture)return;if(p.state.siwx){_.close();return}if(l&&o){s.replace("ProfileWallets"),f.showSuccess("New Wallet Added");return}_.close()}}catch(n){throw c.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:b.parseError(n)}}),n}},this.onOtpResend=async e=>{this.authConnector&&(await this.authConnector.provider.connectEmail({email:e}),c.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}))}}};I=F([m("w3m-email-verify-otp-view")],I);const U=T`
  wui-icon-box {
    height: ${({spacing:r})=>r[16]};
    width: ${({spacing:r})=>r[16]};
  }
`;var R=globalThis&&globalThis.__decorate||function(r,e,t,a){var n=arguments.length,i=n<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,a);else for(var l=r.length-1;l>=0;l--)(o=r[l])&&(i=(n<3?o(i):n>3?o(e,t,i):o(e,t))||i);return n>3&&i&&Object.defineProperty(e,t,i),i};let w=class extends g{constructor(){var e;super(),this.email=(e=s.state.data)==null?void 0:e.email,this.authConnector=h.getAuthConnector(),this.loading=!1,this.listenForDeviceApproval()}render(){if(!this.email)throw new Error("w3m-email-verify-device-view: No email provided");if(!this.authConnector)throw new Error("w3m-email-verify-device-view: No auth connector provided");return u`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["6","3","6","3"]}
        gap="4"
      >
        <wui-icon-box size="xl" color="accent-primary" icon="sealCheck"></wui-icon-box>

        <wui-flex flexDirection="column" alignItems="center" gap="3">
          <wui-flex flexDirection="column" alignItems="center">
            <wui-text variant="md-regular" color="primary">
              Approve the login link we sent to
            </wui-text>
            <wui-text variant="md-regular" color="primary"><b>${this.email}</b></wui-text>
          </wui-flex>

          <wui-text variant="sm-regular" color="secondary" align="center">
            The code expires in 20 minutes
          </wui-text>

          <wui-flex alignItems="center" id="w3m-resend-section" gap="2">
            <wui-text variant="sm-regular" color="primary" align="center">
              Didn't receive it?
            </wui-text>
            <wui-link @click=${this.onResendCode.bind(this)} .disabled=${this.loading}>
              Resend email
            </wui-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}async listenForDeviceApproval(){if(this.authConnector)try{await this.authConnector.provider.connectDevice(),c.sendEvent({type:"track",event:"DEVICE_REGISTERED_FOR_EMAIL"}),c.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}),s.replace("EmailVerifyOtp",{email:this.email})}catch{s.goBack()}}async onResendCode(){try{if(!this.loading){if(!this.authConnector||!this.email)throw new Error("w3m-email-login-widget: Unable to resend email");this.loading=!0,await this.authConnector.provider.connectEmail({email:this.email}),this.listenForDeviceApproval(),f.showSuccess("Code email resent")}}catch(e){f.showError(e)}finally{this.loading=!1}}};w.styles=U;R([E()],w.prototype,"loading",void 0);w=R([m("w3m-email-verify-device-view")],w);const j=D`
  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }
`;var y=globalThis&&globalThis.__decorate||function(r,e,t,a){var n=arguments.length,i=n<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,a);else for(var l=r.length-1;l>=0;l--)(o=r[l])&&(i=(n<3?o(i):n>3?o(e,t,i):o(e,t))||i);return n>3&&i&&Object.defineProperty(e,t,i),i};let d=class extends g{constructor(){var e,t;super(...arguments),this.formRef=$(),this.initialEmail=((e=s.state.data)==null?void 0:e.email)??"",this.redirectView=(t=s.state.data)==null?void 0:t.redirectView,this.email="",this.loading=!1}firstUpdated(){var e;(e=this.formRef.value)==null||e.addEventListener("keydown",t=>{t.key==="Enter"&&this.onSubmitEmail(t)})}render(){return u`
      <wui-flex flexDirection="column" padding="4" gap="4">
        <form ${W(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
          <wui-email-input
            value=${this.initialEmail}
            .disabled=${this.loading}
            @inputChange=${this.onEmailInputChange.bind(this)}
          >
          </wui-email-input>
          <input type="submit" hidden />
        </form>
        ${this.buttonsTemplate()}
      </wui-flex>
    `}onEmailInputChange(e){this.email=e.detail}async onSubmitEmail(e){try{if(this.loading)return;this.loading=!0,e.preventDefault();const t=h.getAuthConnector();if(!t)throw new Error("w3m-update-email-wallet: Auth connector not found");const a=await t.provider.updateEmail({email:this.email});c.sendEvent({type:"track",event:"EMAIL_EDIT"}),a.action==="VERIFY_SECONDARY_OTP"?s.push("UpdateEmailSecondaryOtp",{email:this.initialEmail,newEmail:this.email,redirectView:this.redirectView}):s.push("UpdateEmailPrimaryOtp",{email:this.initialEmail,newEmail:this.email,redirectView:this.redirectView})}catch(t){f.showError(t),this.loading=!1}}buttonsTemplate(){const e=!this.loading&&this.email.length>3&&this.email!==this.initialEmail;return this.redirectView?u`
      <wui-flex gap="3">
        <wui-button size="md" variant="neutral" fullWidth @click=${s.goBack}>
          Cancel
        </wui-button>

        <wui-button
          size="md"
          variant="accent-primary"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!e}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      </wui-flex>
    `:u`
        <wui-button
          size="md"
          variant="accent-primary"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!e}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      `}};d.styles=j;y([E()],d.prototype,"email",void 0);y([E()],d.prototype,"loading",void 0);d=y([m("w3m-update-email-wallet-view")],d);var L=globalThis&&globalThis.__decorate||function(r,e,t,a){var n=arguments.length,i=n<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,a);else for(var l=r.length-1;l>=0;l--)(o=r[l])&&(i=(n<3?o(i):n>3?o(e,t,i):o(e,t))||i);return n>3&&i&&Object.defineProperty(e,t,i),i};let A=class extends C{constructor(){var e;super(),this.email=(e=s.state.data)==null?void 0:e.email,this.onOtpSubmit=async t=>{try{this.authConnector&&(await this.authConnector.provider.updateEmailPrimaryOtp({otp:t}),c.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),s.replace("UpdateEmailSecondaryOtp",s.state.data))}catch(a){throw c.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:b.parseError(a)}}),a}},this.onStartOver=()=>{s.replace("UpdateEmailWallet",s.state.data)}}};A=L([m("w3m-update-email-primary-otp-view")],A);var M=globalThis&&globalThis.__decorate||function(r,e,t,a){var n=arguments.length,i=n<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,a);else for(var l=r.length-1;l>=0;l--)(o=r[l])&&(i=(n<3?o(i):n>3?o(e,t,i):o(e,t))||i);return n>3&&i&&Object.defineProperty(e,t,i),i};let x=class extends C{constructor(){var e,t;super(),this.email=(e=s.state.data)==null?void 0:e.newEmail,this.redirectView=(t=s.state.data)==null?void 0:t.redirectView,this.onOtpSubmit=async a=>{try{this.authConnector&&(await this.authConnector.provider.updateEmailSecondaryOtp({otp:a}),c.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),this.redirectView&&s.reset(this.redirectView))}catch(n){throw c.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:b.parseError(n)}}),n}},this.onStartOver=()=>{s.replace("UpdateEmailWallet",s.state.data)}}};x=M([m("w3m-update-email-secondary-otp-view")],x);var V=globalThis&&globalThis.__decorate||function(r,e,t,a){var n=arguments.length,i=n<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,a);else for(var l=r.length-1;l>=0;l--)(o=r[l])&&(i=(n<3?o(i):n>3?o(e,t,i):o(e,t))||i);return n>3&&i&&Object.defineProperty(e,t,i),i};let v=class extends g{constructor(){var e;super(),this.authConnector=h.getAuthConnector(),this.isEmailEnabled=(e=p.state.remoteFeatures)==null?void 0:e.email,this.isAuthEnabled=this.checkIfAuthEnabled(h.state.connectors),this.connectors=h.state.connectors,h.subscribeKey("connectors",t=>{this.connectors=t,this.isAuthEnabled=this.checkIfAuthEnabled(this.connectors)})}render(){if(!this.isEmailEnabled)throw new Error("w3m-email-login-view: Email is not enabled");if(!this.isAuthEnabled)throw new Error("w3m-email-login-view: No auth connector provided");return u`<wui-flex flexDirection="column" .padding=${["1","3","3","3"]} gap="4">
      <w3m-email-login-widget></w3m-email-login-widget>
    </wui-flex> `}checkIfAuthEnabled(e){const t=e.filter(n=>n.type===P.CONNECTOR_TYPE_AUTH).map(n=>n.chain);return N.AUTH_CONNECTOR_SUPPORTED_CHAINS.some(n=>t.includes(n))}};V([E()],v.prototype,"connectors",void 0);v=V([m("w3m-email-login-view")],v);export{v as W3mEmailLoginView,C as W3mEmailOtpWidget,w as W3mEmailVerifyDeviceView,I as W3mEmailVerifyOtpView,A as W3mUpdateEmailPrimaryOtpView,x as W3mUpdateEmailSecondaryOtpView,d as W3mUpdateEmailWalletView};
