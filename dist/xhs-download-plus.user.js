// ==UserScript==
// @name       xhs-download-plus
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @author     monkey
// @icon       https://vitejs.dev/logo.svg
// @match      http*://www.xiaohongshu.com/*
// @match      http*://xhslink.com/*
// @match      http*://www.xiaohongshu.com/explore*
// @match      http*://www.xiaohongshu.com/user/profile/*
// @match      http*://www.xiaohongshu.com/search_result*
// @require    https://cdn.jsdelivr.net/npm/vue@3.4.27/dist/vue.global.prod.js
// @require    data:application/javascript,%3Bwindow.Vue%3DVue%3B
// @grant      GM_addStyle
// @grant      GM_xmlhttpRequest
// ==/UserScript==

(e=>{if(typeof GM_addStyle=="function"){GM_addStyle(e);return}const o=document.createElement("style");o.textContent=e,document.head.append(o)})(' @charset "UTF-8";:root{--el-color-white:#ffffff;--el-color-black:#000000;--el-color-primary-rgb:64,158,255;--el-color-success-rgb:103,194,58;--el-color-warning-rgb:230,162,60;--el-color-danger-rgb:245,108,108;--el-color-error-rgb:245,108,108;--el-color-info-rgb:144,147,153;--el-font-size-extra-large:20px;--el-font-size-large:18px;--el-font-size-medium:16px;--el-font-size-base:14px;--el-font-size-small:13px;--el-font-size-extra-small:12px;--el-font-family:"Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\u5FAE\u8F6F\u96C5\u9ED1",Arial,sans-serif;--el-font-weight-primary:500;--el-font-line-height-primary:24px;--el-index-normal:1;--el-index-top:1000;--el-index-popper:2000;--el-border-radius-base:4px;--el-border-radius-small:2px;--el-border-radius-round:20px;--el-border-radius-circle:100%;--el-transition-duration:.3s;--el-transition-duration-fast:.2s;--el-transition-function-ease-in-out-bezier:cubic-bezier(.645,.045,.355,1);--el-transition-function-fast-bezier:cubic-bezier(.23,1,.32,1);--el-transition-all:all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);--el-transition-fade:opacity var(--el-transition-duration) var(--el-transition-function-fast-bezier);--el-transition-md-fade:transform var(--el-transition-duration) var(--el-transition-function-fast-bezier),opacity var(--el-transition-duration) var(--el-transition-function-fast-bezier);--el-transition-fade-linear:opacity var(--el-transition-duration-fast) linear;--el-transition-border:border-color var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);--el-transition-box-shadow:box-shadow var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);--el-transition-color:color var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);--el-component-size-large:40px;--el-component-size:32px;--el-component-size-small:24px}:root{color-scheme:light;--el-color-primary:#409eff;--el-color-primary-light-3:#79bbff;--el-color-primary-light-5:#a0cfff;--el-color-primary-light-7:#c6e2ff;--el-color-primary-light-8:#d9ecff;--el-color-primary-light-9:#ecf5ff;--el-color-primary-dark-2:#337ecc;--el-color-success:#67c23a;--el-color-success-light-3:#95d475;--el-color-success-light-5:#b3e19d;--el-color-success-light-7:#d1edc4;--el-color-success-light-8:#e1f3d8;--el-color-success-light-9:#f0f9eb;--el-color-success-dark-2:#529b2e;--el-color-warning:#e6a23c;--el-color-warning-light-3:#eebe77;--el-color-warning-light-5:#f3d19e;--el-color-warning-light-7:#f8e3c5;--el-color-warning-light-8:#faecd8;--el-color-warning-light-9:#fdf6ec;--el-color-warning-dark-2:#b88230;--el-color-danger:#f56c6c;--el-color-danger-light-3:#f89898;--el-color-danger-light-5:#fab6b6;--el-color-danger-light-7:#fcd3d3;--el-color-danger-light-8:#fde2e2;--el-color-danger-light-9:#fef0f0;--el-color-danger-dark-2:#c45656;--el-color-error:#f56c6c;--el-color-error-light-3:#f89898;--el-color-error-light-5:#fab6b6;--el-color-error-light-7:#fcd3d3;--el-color-error-light-8:#fde2e2;--el-color-error-light-9:#fef0f0;--el-color-error-dark-2:#c45656;--el-color-info:#909399;--el-color-info-light-3:#b1b3b8;--el-color-info-light-5:#c8c9cc;--el-color-info-light-7:#dedfe0;--el-color-info-light-8:#e9e9eb;--el-color-info-light-9:#f4f4f5;--el-color-info-dark-2:#73767a;--el-bg-color:#ffffff;--el-bg-color-page:#f2f3f5;--el-bg-color-overlay:#ffffff;--el-text-color-primary:#303133;--el-text-color-regular:#606266;--el-text-color-secondary:#909399;--el-text-color-placeholder:#a8abb2;--el-text-color-disabled:#c0c4cc;--el-border-color:#dcdfe6;--el-border-color-light:#e4e7ed;--el-border-color-lighter:#ebeef5;--el-border-color-extra-light:#f2f6fc;--el-border-color-dark:#d4d7de;--el-border-color-darker:#cdd0d6;--el-fill-color:#f0f2f5;--el-fill-color-light:#f5f7fa;--el-fill-color-lighter:#fafafa;--el-fill-color-extra-light:#fafcff;--el-fill-color-dark:#ebedf0;--el-fill-color-darker:#e6e8eb;--el-fill-color-blank:#ffffff;--el-box-shadow:0px 12px 32px 4px rgba(0,0,0,.04),0px 8px 20px rgba(0,0,0,.08);--el-box-shadow-light:0px 0px 12px rgba(0,0,0,.12);--el-box-shadow-lighter:0px 0px 6px rgba(0,0,0,.12);--el-box-shadow-dark:0px 16px 48px 16px rgba(0,0,0,.08),0px 12px 32px rgba(0,0,0,.12),0px 8px 16px -8px rgba(0,0,0,.16);--el-disabled-bg-color:var(--el-fill-color-light);--el-disabled-text-color:var(--el-text-color-placeholder);--el-disabled-border-color:var(--el-border-color-light);--el-overlay-color:rgba(0,0,0,.8);--el-overlay-color-light:rgba(0,0,0,.7);--el-overlay-color-lighter:rgba(0,0,0,.5);--el-mask-color:rgba(255,255,255,.9);--el-mask-color-extra-light:rgba(255,255,255,.3);--el-border-width:1px;--el-border-style:solid;--el-border-color-hover:var(--el-text-color-disabled);--el-border:var(--el-border-width) var(--el-border-style) var(--el-border-color);--el-svg-monochrome-grey:var(--el-border-color)}.fade-in-linear-enter-active,.fade-in-linear-leave-active{transition:var(--el-transition-fade-linear)}.fade-in-linear-enter-from,.fade-in-linear-leave-to{opacity:0}.el-fade-in-linear-enter-active,.el-fade-in-linear-leave-active{transition:var(--el-transition-fade-linear)}.el-fade-in-linear-enter-from,.el-fade-in-linear-leave-to{opacity:0}.el-fade-in-enter-active,.el-fade-in-leave-active{transition:all var(--el-transition-duration) cubic-bezier(.55,0,.1,1)}.el-fade-in-enter-from,.el-fade-in-leave-active{opacity:0}.el-zoom-in-center-enter-active,.el-zoom-in-center-leave-active{transition:all var(--el-transition-duration) cubic-bezier(.55,0,.1,1)}.el-zoom-in-center-enter-from,.el-zoom-in-center-leave-active{opacity:0;transform:scaleX(0)}.el-zoom-in-top-enter-active,.el-zoom-in-top-leave-active{opacity:1;transform:scaleY(1);transform-origin:center top;transition:var(--el-transition-md-fade)}.el-zoom-in-top-enter-active[data-popper-placement^=top],.el-zoom-in-top-leave-active[data-popper-placement^=top]{transform-origin:center bottom}.el-zoom-in-top-enter-from,.el-zoom-in-top-leave-active{opacity:0;transform:scaleY(0)}.el-zoom-in-bottom-enter-active,.el-zoom-in-bottom-leave-active{opacity:1;transform:scaleY(1);transform-origin:center bottom;transition:var(--el-transition-md-fade)}.el-zoom-in-bottom-enter-from,.el-zoom-in-bottom-leave-active{opacity:0;transform:scaleY(0)}.el-zoom-in-left-enter-active,.el-zoom-in-left-leave-active{opacity:1;transform:scale(1);transform-origin:top left;transition:var(--el-transition-md-fade)}.el-zoom-in-left-enter-from,.el-zoom-in-left-leave-active{opacity:0;transform:scale(.45)}.collapse-transition{transition:var(--el-transition-duration) height ease-in-out,var(--el-transition-duration) padding-top ease-in-out,var(--el-transition-duration) padding-bottom ease-in-out}.el-collapse-transition-enter-active,.el-collapse-transition-leave-active{transition:var(--el-transition-duration) max-height ease-in-out,var(--el-transition-duration) padding-top ease-in-out,var(--el-transition-duration) padding-bottom ease-in-out}.horizontal-collapse-transition{transition:var(--el-transition-duration) width ease-in-out,var(--el-transition-duration) padding-left ease-in-out,var(--el-transition-duration) padding-right ease-in-out}.el-list-enter-active,.el-list-leave-active{transition:all 1s}.el-list-enter-from,.el-list-leave-to{opacity:0;transform:translateY(-30px)}.el-list-leave-active{position:absolute!important}.el-opacity-transition{transition:opacity var(--el-transition-duration) cubic-bezier(.55,0,.1,1)}.el-icon-loading{-webkit-animation:rotating 2s linear infinite;animation:rotating 2s linear infinite}.el-icon--right{margin-left:5px}.el-icon--left{margin-right:5px}@-webkit-keyframes rotating{0%{transform:rotate(0)}to{transform:rotate(1turn)}}@keyframes rotating{0%{transform:rotate(0)}to{transform:rotate(1turn)}}.el-icon{--color:inherit;align-items:center;display:inline-flex;height:1em;justify-content:center;line-height:1em;position:relative;width:1em;fill:currentColor;color:var(--color);font-size:inherit}.el-icon.is-loading{-webkit-animation:rotating 2s linear infinite;animation:rotating 2s linear infinite}.el-icon svg{height:1em;width:1em}:root{--el-loading-spinner-size:42px;--el-loading-fullscreen-spinner-size:50px}.el-loading-parent--relative{position:relative!important}.el-loading-parent--hidden{overflow:hidden!important}.el-loading-mask{background-color:var(--el-mask-color);bottom:0;left:0;margin:0;position:absolute;right:0;top:0;transition:opacity var(--el-transition-duration);z-index:2000}.el-loading-mask.is-fullscreen{position:fixed}.el-loading-mask.is-fullscreen .el-loading-spinner{margin-top:calc((0px - var(--el-loading-fullscreen-spinner-size))/2)}.el-loading-mask.is-fullscreen .el-loading-spinner .circular{height:var(--el-loading-fullscreen-spinner-size);width:var(--el-loading-fullscreen-spinner-size)}.el-loading-spinner{margin-top:calc((0px - var(--el-loading-spinner-size))/2);position:absolute;text-align:center;top:50%;width:100%}.el-loading-spinner .el-loading-text{color:var(--el-color-primary);font-size:14px;margin:3px 0}.el-loading-spinner .circular{-webkit-animation:loading-rotate 2s linear infinite;animation:loading-rotate 2s linear infinite;display:inline;height:var(--el-loading-spinner-size);width:var(--el-loading-spinner-size)}.el-loading-spinner .path{-webkit-animation:loading-dash 1.5s ease-in-out infinite;animation:loading-dash 1.5s ease-in-out infinite;stroke-dasharray:90,150;stroke-dashoffset:0;stroke-width:2;stroke:var(--el-color-primary);stroke-linecap:round}.el-loading-spinner i{color:var(--el-color-primary)}.el-loading-fade-enter-from,.el-loading-fade-leave-to{opacity:0}@-webkit-keyframes loading-rotate{to{transform:rotate(1turn)}}@keyframes loading-rotate{to{transform:rotate(1turn)}}@-webkit-keyframes loading-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-40px}to{stroke-dasharray:90,150;stroke-dashoffset:-120px}}@keyframes loading-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-40px}to{stroke-dasharray:90,150;stroke-dashoffset:-120px}}:root{--el-popup-modal-bg-color:var(--el-color-black);--el-popup-modal-opacity:.5}.v-modal-enter{-webkit-animation:v-modal-in var(--el-transition-duration-fast) ease;animation:v-modal-in var(--el-transition-duration-fast) ease}.v-modal-leave{-webkit-animation:v-modal-out var(--el-transition-duration-fast) ease forwards;animation:v-modal-out var(--el-transition-duration-fast) ease forwards}@-webkit-keyframes v-modal-in{0%{opacity:0}}@keyframes v-modal-in{0%{opacity:0}}@-webkit-keyframes v-modal-out{to{opacity:0}}@keyframes v-modal-out{to{opacity:0}}.v-modal{background:var(--el-popup-modal-bg-color);height:100%;left:0;opacity:var(--el-popup-modal-opacity);position:fixed;top:0;width:100%}.el-popup-parent--hidden{overflow:hidden}.el-dialog{--el-dialog-width:50%;--el-dialog-margin-top:15vh;--el-dialog-bg-color:var(--el-bg-color);--el-dialog-box-shadow:var(--el-box-shadow);--el-dialog-title-font-size:var(--el-font-size-large);--el-dialog-content-font-size:14px;--el-dialog-font-line-height:var(--el-font-line-height-primary);--el-dialog-padding-primary:16px;--el-dialog-border-radius:var(--el-border-radius-small);background:var(--el-dialog-bg-color);border-radius:var(--el-dialog-border-radius);box-shadow:var(--el-dialog-box-shadow);box-sizing:border-box;margin:var(--el-dialog-margin-top,15vh) auto 50px;overflow-wrap:break-word;padding:var(--el-dialog-padding-primary);position:relative;width:var(--el-dialog-width,50%)}.el-dialog:focus{outline:none!important}.el-dialog.is-align-center{margin:auto}.el-dialog.is-fullscreen{--el-dialog-width:100%;--el-dialog-margin-top:0;height:100%;margin-bottom:0;overflow:auto}.el-dialog__wrapper{bottom:0;left:0;margin:0;overflow:auto;position:fixed;right:0;top:0}.el-dialog.is-draggable .el-dialog__header{cursor:move;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.el-dialog__header{padding-bottom:var(--el-dialog-padding-primary)}.el-dialog__header.show-close{padding-right:calc(var(--el-dialog-padding-primary) + var(--el-message-close-size, 16px))}.el-dialog__headerbtn{background:transparent;border:none;cursor:pointer;font-size:var(--el-message-close-size,16px);height:48px;outline:none;padding:0;position:absolute;right:0;top:0;width:48px}.el-dialog__headerbtn .el-dialog__close{color:var(--el-color-info);font-size:inherit}.el-dialog__headerbtn:focus .el-dialog__close,.el-dialog__headerbtn:hover .el-dialog__close{color:var(--el-color-primary)}.el-dialog__title{color:var(--el-text-color-primary);font-size:var(--el-dialog-title-font-size);line-height:var(--el-dialog-font-line-height)}.el-dialog__body{color:var(--el-text-color-regular);font-size:var(--el-dialog-content-font-size)}.el-dialog__footer{box-sizing:border-box;padding-top:var(--el-dialog-padding-primary);text-align:right}.el-dialog--center{text-align:center}.el-dialog--center .el-dialog__body{text-align:initial}.el-dialog--center .el-dialog__footer{text-align:inherit}.el-overlay-dialog{bottom:0;left:0;overflow:auto;position:fixed;right:0;top:0}.dialog-fade-enter-active{-webkit-animation:modal-fade-in var(--el-transition-duration);animation:modal-fade-in var(--el-transition-duration)}.dialog-fade-enter-active .el-overlay-dialog{-webkit-animation:dialog-fade-in var(--el-transition-duration);animation:dialog-fade-in var(--el-transition-duration)}.dialog-fade-leave-active{-webkit-animation:modal-fade-out var(--el-transition-duration);animation:modal-fade-out var(--el-transition-duration)}.dialog-fade-leave-active .el-overlay-dialog{-webkit-animation:dialog-fade-out var(--el-transition-duration);animation:dialog-fade-out var(--el-transition-duration)}@-webkit-keyframes dialog-fade-in{0%{opacity:0;transform:translate3d(0,-20px,0)}to{opacity:1;transform:translateZ(0)}}@keyframes dialog-fade-in{0%{opacity:0;transform:translate3d(0,-20px,0)}to{opacity:1;transform:translateZ(0)}}@-webkit-keyframes dialog-fade-out{0%{opacity:1;transform:translateZ(0)}to{opacity:0;transform:translate3d(0,-20px,0)}}@keyframes dialog-fade-out{0%{opacity:1;transform:translateZ(0)}to{opacity:0;transform:translate3d(0,-20px,0)}}@-webkit-keyframes modal-fade-in{0%{opacity:0}to{opacity:1}}@keyframes modal-fade-in{0%{opacity:0}to{opacity:1}}@-webkit-keyframes modal-fade-out{0%{opacity:1}to{opacity:0}}@keyframes modal-fade-out{0%{opacity:1}to{opacity:0}}.el-overlay{background-color:var(--el-overlay-color-lighter);bottom:0;height:100%;left:0;overflow:auto;position:fixed;right:0;top:0;z-index:2000}.el-overlay .el-overlay-root{height:0}.el-textarea{--el-input-text-color:var(--el-text-color-regular);--el-input-border:var(--el-border);--el-input-hover-border:var(--el-border-color-hover);--el-input-focus-border:var(--el-color-primary);--el-input-transparent-border:0 0 0 1px transparent inset;--el-input-border-color:var(--el-border-color);--el-input-border-radius:var(--el-border-radius-base);--el-input-bg-color:var(--el-fill-color-blank);--el-input-icon-color:var(--el-text-color-placeholder);--el-input-placeholder-color:var(--el-text-color-placeholder);--el-input-hover-border-color:var(--el-border-color-hover);--el-input-clear-hover-color:var(--el-text-color-secondary);--el-input-focus-border-color:var(--el-color-primary);--el-input-width:100%;display:inline-block;font-size:var(--el-font-size-base);position:relative;vertical-align:bottom;width:100%}.el-textarea__inner{-webkit-appearance:none;background-color:var(--el-input-bg-color,var(--el-fill-color-blank));background-image:none;border:none;border-radius:var(--el-input-border-radius,var(--el-border-radius-base));box-shadow:0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset;box-sizing:border-box;color:var(--el-input-text-color,var(--el-text-color-regular));display:block;font-family:inherit;font-size:inherit;line-height:1.5;padding:5px 11px;position:relative;resize:vertical;transition:var(--el-transition-box-shadow);width:100%}.el-textarea__inner::-moz-placeholder{color:var(--el-input-placeholder-color,var(--el-text-color-placeholder))}.el-textarea__inner:-ms-input-placeholder{color:var(--el-input-placeholder-color,var(--el-text-color-placeholder))}.el-textarea__inner::placeholder{color:var(--el-input-placeholder-color,var(--el-text-color-placeholder))}.el-textarea__inner:hover{box-shadow:0 0 0 1px var(--el-input-hover-border-color) inset}.el-textarea__inner:focus{box-shadow:0 0 0 1px var(--el-input-focus-border-color) inset;outline:none}.el-textarea .el-input__count{background:var(--el-fill-color-blank);bottom:5px;color:var(--el-color-info);font-size:12px;line-height:14px;position:absolute;right:10px}.el-textarea.is-disabled .el-textarea__inner{background-color:var(--el-disabled-bg-color);box-shadow:0 0 0 1px var(--el-disabled-border-color) inset;color:var(--el-disabled-text-color);cursor:not-allowed}.el-textarea.is-disabled .el-textarea__inner::-moz-placeholder{color:var(--el-text-color-placeholder)}.el-textarea.is-disabled .el-textarea__inner:-ms-input-placeholder{color:var(--el-text-color-placeholder)}.el-textarea.is-disabled .el-textarea__inner::placeholder{color:var(--el-text-color-placeholder)}.el-textarea.is-exceed .el-textarea__inner{box-shadow:0 0 0 1px var(--el-color-danger) inset}.el-textarea.is-exceed .el-input__count{color:var(--el-color-danger)}.el-input{--el-input-text-color:var(--el-text-color-regular);--el-input-border:var(--el-border);--el-input-hover-border:var(--el-border-color-hover);--el-input-focus-border:var(--el-color-primary);--el-input-transparent-border:0 0 0 1px transparent inset;--el-input-border-color:var(--el-border-color);--el-input-border-radius:var(--el-border-radius-base);--el-input-bg-color:var(--el-fill-color-blank);--el-input-icon-color:var(--el-text-color-placeholder);--el-input-placeholder-color:var(--el-text-color-placeholder);--el-input-hover-border-color:var(--el-border-color-hover);--el-input-clear-hover-color:var(--el-text-color-secondary);--el-input-focus-border-color:var(--el-color-primary);--el-input-width:100%;--el-input-height:var(--el-component-size);box-sizing:border-box;display:inline-flex;font-size:var(--el-font-size-base);line-height:var(--el-input-height);position:relative;vertical-align:middle;width:var(--el-input-width)}.el-input::-webkit-scrollbar{width:6px;z-index:11}.el-input::-webkit-scrollbar:horizontal{height:6px}.el-input::-webkit-scrollbar-thumb{background:var(--el-text-color-disabled);border-radius:5px;width:6px}.el-input::-webkit-scrollbar-corner,.el-input::-webkit-scrollbar-track{background:var(--el-fill-color-blank)}.el-input::-webkit-scrollbar-track-piece{background:var(--el-fill-color-blank);width:6px}.el-input .el-input__clear,.el-input .el-input__password{color:var(--el-input-icon-color);cursor:pointer;font-size:14px}.el-input .el-input__clear:hover,.el-input .el-input__password:hover{color:var(--el-input-clear-hover-color)}.el-input .el-input__count{align-items:center;color:var(--el-color-info);display:inline-flex;font-size:12px;height:100%}.el-input .el-input__count .el-input__count-inner{background:var(--el-fill-color-blank);display:inline-block;line-height:normal;padding-left:8px}.el-input__wrapper{align-items:center;background-color:var(--el-input-bg-color,var(--el-fill-color-blank));background-image:none;border-radius:var(--el-input-border-radius,var(--el-border-radius-base));box-shadow:0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset;cursor:text;display:inline-flex;flex-grow:1;justify-content:center;padding:1px 11px;transform:translateZ(0);transition:var(--el-transition-box-shadow)}.el-input__wrapper:hover{box-shadow:0 0 0 1px var(--el-input-hover-border-color) inset}.el-input__wrapper.is-focus{box-shadow:0 0 0 1px var(--el-input-focus-border-color) inset}.el-input__inner{--el-input-inner-height:calc(var(--el-input-height, 32px) - 2px);-webkit-appearance:none;background:none;border:none;box-sizing:border-box;color:var(--el-input-text-color,var(--el-text-color-regular));flex-grow:1;font-size:inherit;height:var(--el-input-inner-height);line-height:var(--el-input-inner-height);outline:none;padding:0;width:100%}.el-input__inner:focus{outline:none}.el-input__inner::-moz-placeholder{color:var(--el-input-placeholder-color,var(--el-text-color-placeholder))}.el-input__inner:-ms-input-placeholder{color:var(--el-input-placeholder-color,var(--el-text-color-placeholder))}.el-input__inner::placeholder{color:var(--el-input-placeholder-color,var(--el-text-color-placeholder))}.el-input__inner[type=password]::-ms-reveal{display:none}.el-input__inner[type=number]{line-height:1}.el-input__prefix{color:var(--el-input-icon-color,var(--el-text-color-placeholder));display:inline-flex;flex-shrink:0;flex-wrap:nowrap;height:100%;pointer-events:none;text-align:center;transition:all var(--el-transition-duration);white-space:nowrap}.el-input__prefix-inner{align-items:center;display:inline-flex;justify-content:center;pointer-events:all}.el-input__prefix-inner>:last-child{margin-right:8px}.el-input__prefix-inner>:first-child,.el-input__prefix-inner>:first-child.el-input__icon{margin-left:0}.el-input__suffix{color:var(--el-input-icon-color,var(--el-text-color-placeholder));display:inline-flex;flex-shrink:0;flex-wrap:nowrap;height:100%;pointer-events:none;text-align:center;transition:all var(--el-transition-duration);white-space:nowrap}.el-input__suffix-inner{align-items:center;display:inline-flex;justify-content:center;pointer-events:all}.el-input__suffix-inner>:first-child{margin-left:8px}.el-input .el-input__icon{align-items:center;display:flex;height:inherit;justify-content:center;line-height:inherit;margin-left:8px;transition:all var(--el-transition-duration)}.el-input__validateIcon{pointer-events:none}.el-input.is-active .el-input__wrapper{box-shadow:0 0 0 1px var(--el-input-focus-color, ) inset}.el-input.is-disabled{cursor:not-allowed}.el-input.is-disabled .el-input__wrapper{background-color:var(--el-disabled-bg-color);box-shadow:0 0 0 1px var(--el-disabled-border-color) inset}.el-input.is-disabled .el-input__inner{color:var(--el-disabled-text-color);-webkit-text-fill-color:var(--el-disabled-text-color);cursor:not-allowed}.el-input.is-disabled .el-input__inner::-moz-placeholder{color:var(--el-text-color-placeholder)}.el-input.is-disabled .el-input__inner:-ms-input-placeholder{color:var(--el-text-color-placeholder)}.el-input.is-disabled .el-input__inner::placeholder{color:var(--el-text-color-placeholder)}.el-input.is-disabled .el-input__icon{cursor:not-allowed}.el-input.is-exceed .el-input__wrapper{box-shadow:0 0 0 1px var(--el-color-danger) inset}.el-input.is-exceed .el-input__suffix .el-input__count{color:var(--el-color-danger)}.el-input--large{--el-input-height:var(--el-component-size-large);font-size:14px}.el-input--large .el-input__wrapper{padding:1px 15px}.el-input--large .el-input__inner{--el-input-inner-height:calc(var(--el-input-height, 40px) - 2px)}.el-input--small{--el-input-height:var(--el-component-size-small);font-size:12px}.el-input--small .el-input__wrapper{padding:1px 7px}.el-input--small .el-input__inner{--el-input-inner-height:calc(var(--el-input-height, 24px) - 2px)}.el-input-group{align-items:stretch;display:inline-flex;width:100%}.el-input-group__append,.el-input-group__prepend{align-items:center;background-color:var(--el-fill-color-light);border-radius:var(--el-input-border-radius);color:var(--el-color-info);display:inline-flex;justify-content:center;min-height:100%;padding:0 20px;position:relative;white-space:nowrap}.el-input-group__append:focus,.el-input-group__prepend:focus{outline:none}.el-input-group__append .el-button,.el-input-group__append .el-select,.el-input-group__prepend .el-button,.el-input-group__prepend .el-select{display:inline-block;margin:0 -20px}.el-input-group__append button.el-button,.el-input-group__append button.el-button:hover,.el-input-group__append div.el-select .el-select__wrapper,.el-input-group__append div.el-select:hover .el-select__wrapper,.el-input-group__prepend button.el-button,.el-input-group__prepend button.el-button:hover,.el-input-group__prepend div.el-select .el-select__wrapper,.el-input-group__prepend div.el-select:hover .el-select__wrapper{background-color:transparent;border-color:transparent;color:inherit}.el-input-group__append .el-button,.el-input-group__append .el-input,.el-input-group__prepend .el-button,.el-input-group__prepend .el-input{font-size:inherit}.el-input-group__prepend{border-bottom-right-radius:0;border-right:0;border-top-right-radius:0;box-shadow:1px 0 0 0 var(--el-input-border-color) inset,0 1px 0 0 var(--el-input-border-color) inset,0 -1px 0 0 var(--el-input-border-color) inset}.el-input-group__append{border-bottom-left-radius:0;border-left:0;border-top-left-radius:0;box-shadow:0 1px 0 0 var(--el-input-border-color) inset,0 -1px 0 0 var(--el-input-border-color) inset,-1px 0 0 0 var(--el-input-border-color) inset}.el-input-group--prepend>.el-input__wrapper{border-bottom-left-radius:0;border-top-left-radius:0}.el-input-group--prepend .el-input-group__prepend .el-select .el-select__wrapper{border-bottom-right-radius:0;border-top-right-radius:0;box-shadow:1px 0 0 0 var(--el-input-border-color) inset,0 1px 0 0 var(--el-input-border-color) inset,0 -1px 0 0 var(--el-input-border-color) inset}.el-input-group--append>.el-input__wrapper{border-bottom-right-radius:0;border-top-right-radius:0}.el-input-group--append .el-input-group__append .el-select .el-select__wrapper{border-bottom-left-radius:0;border-top-left-radius:0;box-shadow:0 1px 0 0 var(--el-input-border-color) inset,0 -1px 0 0 var(--el-input-border-color) inset,-1px 0 0 0 var(--el-input-border-color) inset}.el-input-hidden{display:none!important}.el-button{--el-button-font-weight:var(--el-font-weight-primary);--el-button-border-color:var(--el-border-color);--el-button-bg-color:var(--el-fill-color-blank);--el-button-text-color:var(--el-text-color-regular);--el-button-disabled-text-color:var(--el-disabled-text-color);--el-button-disabled-bg-color:var(--el-fill-color-blank);--el-button-disabled-border-color:var(--el-border-color-light);--el-button-divide-border-color:rgba(255,255,255,.5);--el-button-hover-text-color:var(--el-color-primary);--el-button-hover-bg-color:var(--el-color-primary-light-9);--el-button-hover-border-color:var(--el-color-primary-light-7);--el-button-active-text-color:var(--el-button-hover-text-color);--el-button-active-border-color:var(--el-color-primary);--el-button-active-bg-color:var(--el-button-hover-bg-color);--el-button-outline-color:var(--el-color-primary-light-5);--el-button-hover-link-text-color:var(--el-color-info);--el-button-active-color:var(--el-text-color-primary);align-items:center;-webkit-appearance:none;background-color:var(--el-button-bg-color);border:var(--el-border);border-color:var(--el-button-border-color);border-radius:var(--el-border-radius-base);box-sizing:border-box;color:var(--el-button-text-color);cursor:pointer;display:inline-flex;font-size:var(--el-font-size-base);font-weight:var(--el-button-font-weight);height:32px;justify-content:center;line-height:1;outline:none;padding:8px 15px;text-align:center;transition:.1s;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;vertical-align:middle;white-space:nowrap}.el-button:hover{background-color:var(--el-button-hover-bg-color);border-color:var(--el-button-hover-border-color);color:var(--el-button-hover-text-color);outline:none}.el-button:active{background-color:var(--el-button-active-bg-color);border-color:var(--el-button-active-border-color);color:var(--el-button-active-text-color);outline:none}.el-button:focus-visible{outline:2px solid var(--el-button-outline-color);outline-offset:1px;transition:outline-offset 0s,outline 0s}.el-button>span{align-items:center;display:inline-flex}.el-button+.el-button{margin-left:12px}.el-button.is-round{padding:8px 15px}.el-button::-moz-focus-inner{border:0}.el-button [class*=el-icon]+span{margin-left:6px}.el-button [class*=el-icon] svg{vertical-align:bottom}.el-button.is-plain{--el-button-hover-text-color:var(--el-color-primary);--el-button-hover-bg-color:var(--el-fill-color-blank);--el-button-hover-border-color:var(--el-color-primary)}.el-button.is-active{background-color:var(--el-button-active-bg-color);border-color:var(--el-button-active-border-color);color:var(--el-button-active-text-color);outline:none}.el-button.is-disabled,.el-button.is-disabled:hover{background-color:var(--el-button-disabled-bg-color);background-image:none;border-color:var(--el-button-disabled-border-color);color:var(--el-button-disabled-text-color);cursor:not-allowed}.el-button.is-loading{pointer-events:none;position:relative}.el-button.is-loading:before{background-color:var(--el-mask-color-extra-light);border-radius:inherit;bottom:-1px;content:"";left:-1px;pointer-events:none;position:absolute;right:-1px;top:-1px;z-index:1}.el-button.is-round{border-radius:var(--el-border-radius-round)}.el-button.is-circle{border-radius:50%;padding:8px;width:32px}.el-button.is-text{background-color:transparent;border:0 solid transparent;color:var(--el-button-text-color)}.el-button.is-text.is-disabled{background-color:transparent!important;color:var(--el-button-disabled-text-color)}.el-button.is-text:not(.is-disabled):hover{background-color:var(--el-fill-color-light)}.el-button.is-text:not(.is-disabled):focus-visible{outline:2px solid var(--el-button-outline-color);outline-offset:1px;transition:outline-offset 0s,outline 0s}.el-button.is-text:not(.is-disabled):active{background-color:var(--el-fill-color)}.el-button.is-text:not(.is-disabled).is-has-bg{background-color:var(--el-fill-color-light)}.el-button.is-text:not(.is-disabled).is-has-bg:hover{background-color:var(--el-fill-color)}.el-button.is-text:not(.is-disabled).is-has-bg:active{background-color:var(--el-fill-color-dark)}.el-button__text--expand{letter-spacing:.3em;margin-right:-.3em}.el-button.is-link{background:transparent;border-color:transparent;color:var(--el-button-text-color);height:auto;padding:2px}.el-button.is-link:hover{color:var(--el-button-hover-link-text-color)}.el-button.is-link.is-disabled{background-color:transparent!important;border-color:transparent!important;color:var(--el-button-disabled-text-color)}.el-button.is-link:not(.is-disabled):hover{background-color:transparent;border-color:transparent}.el-button.is-link:not(.is-disabled):active{background-color:transparent;border-color:transparent;color:var(--el-button-active-color)}.el-button--text{background:transparent;border-color:transparent;color:var(--el-color-primary);padding-left:0;padding-right:0}.el-button--text.is-disabled{background-color:transparent!important;border-color:transparent!important;color:var(--el-button-disabled-text-color)}.el-button--text:not(.is-disabled):hover{background-color:transparent;border-color:transparent;color:var(--el-color-primary-light-3)}.el-button--text:not(.is-disabled):active{background-color:transparent;border-color:transparent;color:var(--el-color-primary-dark-2)}.el-button__link--expand{letter-spacing:.3em;margin-right:-.3em}.el-button--primary{--el-button-text-color:var(--el-color-white);--el-button-bg-color:var(--el-color-primary);--el-button-border-color:var(--el-color-primary);--el-button-outline-color:var(--el-color-primary-light-5);--el-button-active-color:var(--el-color-primary-dark-2);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-link-text-color:var(--el-color-primary-light-5);--el-button-hover-bg-color:var(--el-color-primary-light-3);--el-button-hover-border-color:var(--el-color-primary-light-3);--el-button-active-bg-color:var(--el-color-primary-dark-2);--el-button-active-border-color:var(--el-color-primary-dark-2);--el-button-disabled-text-color:var(--el-color-white);--el-button-disabled-bg-color:var(--el-color-primary-light-5);--el-button-disabled-border-color:var(--el-color-primary-light-5)}.el-button--primary.is-link,.el-button--primary.is-plain,.el-button--primary.is-text{--el-button-text-color:var(--el-color-primary);--el-button-bg-color:var(--el-color-primary-light-9);--el-button-border-color:var(--el-color-primary-light-5);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-bg-color:var(--el-color-primary);--el-button-hover-border-color:var(--el-color-primary);--el-button-active-text-color:var(--el-color-white)}.el-button--primary.is-link.is-disabled,.el-button--primary.is-link.is-disabled:active,.el-button--primary.is-link.is-disabled:focus,.el-button--primary.is-link.is-disabled:hover,.el-button--primary.is-plain.is-disabled,.el-button--primary.is-plain.is-disabled:active,.el-button--primary.is-plain.is-disabled:focus,.el-button--primary.is-plain.is-disabled:hover,.el-button--primary.is-text.is-disabled,.el-button--primary.is-text.is-disabled:active,.el-button--primary.is-text.is-disabled:focus,.el-button--primary.is-text.is-disabled:hover{background-color:var(--el-color-primary-light-9);border-color:var(--el-color-primary-light-8);color:var(--el-color-primary-light-5)}.el-button--success{--el-button-text-color:var(--el-color-white);--el-button-bg-color:var(--el-color-success);--el-button-border-color:var(--el-color-success);--el-button-outline-color:var(--el-color-success-light-5);--el-button-active-color:var(--el-color-success-dark-2);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-link-text-color:var(--el-color-success-light-5);--el-button-hover-bg-color:var(--el-color-success-light-3);--el-button-hover-border-color:var(--el-color-success-light-3);--el-button-active-bg-color:var(--el-color-success-dark-2);--el-button-active-border-color:var(--el-color-success-dark-2);--el-button-disabled-text-color:var(--el-color-white);--el-button-disabled-bg-color:var(--el-color-success-light-5);--el-button-disabled-border-color:var(--el-color-success-light-5)}.el-button--success.is-link,.el-button--success.is-plain,.el-button--success.is-text{--el-button-text-color:var(--el-color-success);--el-button-bg-color:var(--el-color-success-light-9);--el-button-border-color:var(--el-color-success-light-5);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-bg-color:var(--el-color-success);--el-button-hover-border-color:var(--el-color-success);--el-button-active-text-color:var(--el-color-white)}.el-button--success.is-link.is-disabled,.el-button--success.is-link.is-disabled:active,.el-button--success.is-link.is-disabled:focus,.el-button--success.is-link.is-disabled:hover,.el-button--success.is-plain.is-disabled,.el-button--success.is-plain.is-disabled:active,.el-button--success.is-plain.is-disabled:focus,.el-button--success.is-plain.is-disabled:hover,.el-button--success.is-text.is-disabled,.el-button--success.is-text.is-disabled:active,.el-button--success.is-text.is-disabled:focus,.el-button--success.is-text.is-disabled:hover{background-color:var(--el-color-success-light-9);border-color:var(--el-color-success-light-8);color:var(--el-color-success-light-5)}.el-button--warning{--el-button-text-color:var(--el-color-white);--el-button-bg-color:var(--el-color-warning);--el-button-border-color:var(--el-color-warning);--el-button-outline-color:var(--el-color-warning-light-5);--el-button-active-color:var(--el-color-warning-dark-2);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-link-text-color:var(--el-color-warning-light-5);--el-button-hover-bg-color:var(--el-color-warning-light-3);--el-button-hover-border-color:var(--el-color-warning-light-3);--el-button-active-bg-color:var(--el-color-warning-dark-2);--el-button-active-border-color:var(--el-color-warning-dark-2);--el-button-disabled-text-color:var(--el-color-white);--el-button-disabled-bg-color:var(--el-color-warning-light-5);--el-button-disabled-border-color:var(--el-color-warning-light-5)}.el-button--warning.is-link,.el-button--warning.is-plain,.el-button--warning.is-text{--el-button-text-color:var(--el-color-warning);--el-button-bg-color:var(--el-color-warning-light-9);--el-button-border-color:var(--el-color-warning-light-5);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-bg-color:var(--el-color-warning);--el-button-hover-border-color:var(--el-color-warning);--el-button-active-text-color:var(--el-color-white)}.el-button--warning.is-link.is-disabled,.el-button--warning.is-link.is-disabled:active,.el-button--warning.is-link.is-disabled:focus,.el-button--warning.is-link.is-disabled:hover,.el-button--warning.is-plain.is-disabled,.el-button--warning.is-plain.is-disabled:active,.el-button--warning.is-plain.is-disabled:focus,.el-button--warning.is-plain.is-disabled:hover,.el-button--warning.is-text.is-disabled,.el-button--warning.is-text.is-disabled:active,.el-button--warning.is-text.is-disabled:focus,.el-button--warning.is-text.is-disabled:hover{background-color:var(--el-color-warning-light-9);border-color:var(--el-color-warning-light-8);color:var(--el-color-warning-light-5)}.el-button--danger{--el-button-text-color:var(--el-color-white);--el-button-bg-color:var(--el-color-danger);--el-button-border-color:var(--el-color-danger);--el-button-outline-color:var(--el-color-danger-light-5);--el-button-active-color:var(--el-color-danger-dark-2);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-link-text-color:var(--el-color-danger-light-5);--el-button-hover-bg-color:var(--el-color-danger-light-3);--el-button-hover-border-color:var(--el-color-danger-light-3);--el-button-active-bg-color:var(--el-color-danger-dark-2);--el-button-active-border-color:var(--el-color-danger-dark-2);--el-button-disabled-text-color:var(--el-color-white);--el-button-disabled-bg-color:var(--el-color-danger-light-5);--el-button-disabled-border-color:var(--el-color-danger-light-5)}.el-button--danger.is-link,.el-button--danger.is-plain,.el-button--danger.is-text{--el-button-text-color:var(--el-color-danger);--el-button-bg-color:var(--el-color-danger-light-9);--el-button-border-color:var(--el-color-danger-light-5);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-bg-color:var(--el-color-danger);--el-button-hover-border-color:var(--el-color-danger);--el-button-active-text-color:var(--el-color-white)}.el-button--danger.is-link.is-disabled,.el-button--danger.is-link.is-disabled:active,.el-button--danger.is-link.is-disabled:focus,.el-button--danger.is-link.is-disabled:hover,.el-button--danger.is-plain.is-disabled,.el-button--danger.is-plain.is-disabled:active,.el-button--danger.is-plain.is-disabled:focus,.el-button--danger.is-plain.is-disabled:hover,.el-button--danger.is-text.is-disabled,.el-button--danger.is-text.is-disabled:active,.el-button--danger.is-text.is-disabled:focus,.el-button--danger.is-text.is-disabled:hover{background-color:var(--el-color-danger-light-9);border-color:var(--el-color-danger-light-8);color:var(--el-color-danger-light-5)}.el-button--info{--el-button-text-color:var(--el-color-white);--el-button-bg-color:var(--el-color-info);--el-button-border-color:var(--el-color-info);--el-button-outline-color:var(--el-color-info-light-5);--el-button-active-color:var(--el-color-info-dark-2);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-link-text-color:var(--el-color-info-light-5);--el-button-hover-bg-color:var(--el-color-info-light-3);--el-button-hover-border-color:var(--el-color-info-light-3);--el-button-active-bg-color:var(--el-color-info-dark-2);--el-button-active-border-color:var(--el-color-info-dark-2);--el-button-disabled-text-color:var(--el-color-white);--el-button-disabled-bg-color:var(--el-color-info-light-5);--el-button-disabled-border-color:var(--el-color-info-light-5)}.el-button--info.is-link,.el-button--info.is-plain,.el-button--info.is-text{--el-button-text-color:var(--el-color-info);--el-button-bg-color:var(--el-color-info-light-9);--el-button-border-color:var(--el-color-info-light-5);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-bg-color:var(--el-color-info);--el-button-hover-border-color:var(--el-color-info);--el-button-active-text-color:var(--el-color-white)}.el-button--info.is-link.is-disabled,.el-button--info.is-link.is-disabled:active,.el-button--info.is-link.is-disabled:focus,.el-button--info.is-link.is-disabled:hover,.el-button--info.is-plain.is-disabled,.el-button--info.is-plain.is-disabled:active,.el-button--info.is-plain.is-disabled:focus,.el-button--info.is-plain.is-disabled:hover,.el-button--info.is-text.is-disabled,.el-button--info.is-text.is-disabled:active,.el-button--info.is-text.is-disabled:focus,.el-button--info.is-text.is-disabled:hover{background-color:var(--el-color-info-light-9);border-color:var(--el-color-info-light-8);color:var(--el-color-info-light-5)}.el-button--large{--el-button-size:40px;border-radius:var(--el-border-radius-base);font-size:var(--el-font-size-base);height:var(--el-button-size);padding:12px 19px}.el-button--large [class*=el-icon]+span{margin-left:8px}.el-button--large.is-round{padding:12px 19px}.el-button--large.is-circle{padding:12px;width:var(--el-button-size)}.el-button--small{--el-button-size:24px;border-radius:calc(var(--el-border-radius-base) - 1px);font-size:12px;height:var(--el-button-size);padding:5px 11px}.el-button--small [class*=el-icon]+span{margin-left:4px}.el-button--small.is-round{padding:5px 11px}.el-button--small.is-circle{padding:5px;width:var(--el-button-size)}.xhs-menu-container[data-v-304f7edd]{width:210px;display:flex;justify-content:center;align-items:flex-start;flex-direction:column;position:fixed;bottom:15%;left:10px;background-color:#fff;color:#2f3542;padding:10px;border-radius:0 32px 32px 0;box-shadow:0 3.2px 12px #00000014,0 5px 24px #0000000a;text-align:center;font-size:14px;z-index:99999}.xhs-menu-container .el-button[data-v-304f7edd]{width:98%;margin-bottom:3px}.xhs-menu-container .el-button+.el-button[data-v-304f7edd]{margin-left:0}.xhs-menu-container .citys[data-v-304f7edd]{width:98%;border:2px solid red;border-radius:5px;margin:5px 0;padding:5px;text-align:left}.xhs-menu-container .citys .title[data-v-304f7edd]{font-weight:700;font-size:14px}.xhs-menu-container .citys .input[data-v-304f7edd]{margin:5px 0}.xhs-menu-container .citys .city-one[data-v-304f7edd]{width:31%;border:1px solid #eee;border-radius:5px;display:inline-flex;justify-content:center;align-items:center;cursor:pointer;margin:2px;font-size:12px;padding:2px}.xhs-menu-container .citys .city-one[data-v-304f7edd]:hover,.xhs-menu-container .citys .active-city-one[data-v-304f7edd]{background-color:#f56c6d;color:#fff}.xhs-menu-container .bottom[data-v-304f7edd]{width:100%;display:flex;justify-content:flex-start;align-items:center}.xhs-menu-container .bottom img[data-v-304f7edd]{width:24px;height:24px;margin-right:5px}.xhs-menu-container .bottom span[data-v-304f7edd]{font-size:16px;font-weight:700}.dialog-content[data-v-304f7edd]{width:100vw;height:100vh;border-radius:5px;display:flex;border:4px solid red;position:fixed;top:0;left:0;background-color:#fff}.dialog-content .left-content[data-v-304f7edd]{width:55%;height:100%}.dialog-content .left-content h2[data-v-304f7edd]{font-size:28px;text-align:center;width:100%;height:20px;line-height:20px}.dialog-content .left-content .canvas[data-v-304f7edd]{height:100%;overflow:scroll;width:100%}.dialog-content .left-content .canvas .canvas-one[data-v-304f7edd]{border-top:4px solid red;display:flex;justify-content:space-between}.dialog-content .left-content .canvas .canvas-one .add-text[data-v-304f7edd]{min-width:100px;display:flex;justify-content:center;align-items:center;flex-direction:column}.dialog-content .left-content .canvas .canvas-one .add-text input[data-v-304f7edd]{border:2px solid red;width:90%;height:36px;border-radius:5px;padding-left:10px}.dialog-content .left-content .canvas .canvas-one .add-text .el-button--danger[data-v-304f7edd]{margin-left:0!important;width:90%}.dialog-content .left-content .canvas .canvas-one .add-text .el-button--primary[data-v-304f7edd]{margin:10px 0;width:90%}.dialog-content .right-content[data-v-304f7edd]{width:45%;border-left:4px solid red}.dialog-content .right-content h2[data-v-304f7edd]{font-size:28px;text-align:center;width:100%;height:20px;line-height:20px}.dialog-content .right-content .content-btns[data-v-304f7edd]{width:100%;height:100px;border-top:4px solid red;padding:10px 20px;border-bottom:4px solid red}.dialog-content .right-content .content-btns .not-used[data-v-304f7edd],.dialog-content .right-content .content-btns .used[data-v-304f7edd]{height:40px;line-height:40px}.dialog-content .right-content .content-btns .not-used .el-button[data-v-304f7edd],.dialog-content .right-content .content-btns .used .el-button[data-v-304f7edd]{margin-right:5px}.dialog-content .right-content .bottom-content-text[data-v-304f7edd]{width:100%;height:calc(100% - 144px)}.dialog-content .right-content .bottom-content-text .note-need-content[data-v-304f7edd]{width:100%;height:40%;padding:10px;overflow:scroll;border-bottom:4px solid red}.dialog-content .right-content .bottom-content-text .note-need-content-ai[data-v-304f7edd]{width:100%;height:50%;padding:10px;overflow:scroll;font-weight:400;font-size:16px;line-height:150%;color:var(--color-primary-label);white-space:pre-wrap;overflow-wrap:break-word;border-bottom:4px solid red}.dialog-content .right-content .bottom-content-text .places[data-v-304f7edd]{width:100%;height:10%;color:#00f;padding-left:10px;vertical-align:middle}.need-item{border:4px solid red;overflow:hidden}.img-count{width:30px;height:30px;position:absolute;top:3px;right:3px;border-radius:50%;background:red;display:flex;justify-content:center;align-items:center;font-size:16px;color:#fff;font-weight:700}.img-count-default{background:#aaa}.note-need-content .note-content-emoji{width:16px;height:16px}.note-need-content .desc{color:#333!important}.note-need-content .date,.note-need-content .tag{color:#666!important}.places{font-size:24px;margin:10px 0;color:#00f} ');

(function (vue) {
  'use strict';

  var _a;
  const isClient = typeof window !== "undefined";
  const isString$1 = (val) => typeof val === "string";
  const noop = () => {
  };
  isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
  function resolveUnref(r) {
    return typeof r === "function" ? r() : vue.unref(r);
  }
  function identity$1(arg) {
    return arg;
  }
  function tryOnScopeDispose(fn) {
    if (vue.getCurrentScope()) {
      vue.onScopeDispose(fn);
      return true;
    }
    return false;
  }
  function tryOnMounted(fn, sync = true) {
    if (vue.getCurrentInstance())
      vue.onMounted(fn);
    else if (sync)
      fn();
    else
      vue.nextTick(fn);
  }
  function useTimeoutFn(cb, interval, options = {}) {
    const {
      immediate = true
    } = options;
    const isPending = vue.ref(false);
    let timer = null;
    function clear() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    }
    function stop() {
      isPending.value = false;
      clear();
    }
    function start(...args) {
      clear();
      isPending.value = true;
      timer = setTimeout(() => {
        isPending.value = false;
        timer = null;
        cb(...args);
      }, resolveUnref(interval));
    }
    if (immediate) {
      isPending.value = true;
      if (isClient)
        start();
    }
    tryOnScopeDispose(stop);
    return {
      isPending: vue.readonly(isPending),
      start,
      stop
    };
  }
  function unrefElement(elRef) {
    var _a2;
    const plain = resolveUnref(elRef);
    return (_a2 = plain == null ? void 0 : plain.$el) != null ? _a2 : plain;
  }
  const defaultWindow = isClient ? window : void 0;
  function useEventListener(...args) {
    let target;
    let events;
    let listeners;
    let options;
    if (isString$1(args[0]) || Array.isArray(args[0])) {
      [events, listeners, options] = args;
      target = defaultWindow;
    } else {
      [target, events, listeners, options] = args;
    }
    if (!target)
      return noop;
    if (!Array.isArray(events))
      events = [events];
    if (!Array.isArray(listeners))
      listeners = [listeners];
    const cleanups = [];
    const cleanup = () => {
      cleanups.forEach((fn) => fn());
      cleanups.length = 0;
    };
    const register = (el, event, listener, options2) => {
      el.addEventListener(event, listener, options2);
      return () => el.removeEventListener(event, listener, options2);
    };
    const stopWatch = vue.watch(() => [unrefElement(target), resolveUnref(options)], ([el, options2]) => {
      cleanup();
      if (!el)
        return;
      cleanups.push(...events.flatMap((event) => {
        return listeners.map((listener) => register(el, event, listener, options2));
      }));
    }, { immediate: true, flush: "post" });
    const stop = () => {
      stopWatch();
      cleanup();
    };
    tryOnScopeDispose(stop);
    return stop;
  }
  function useSupported(callback, sync = false) {
    const isSupported = vue.ref();
    const update = () => isSupported.value = Boolean(callback());
    update();
    tryOnMounted(update, sync);
    return isSupported;
  }
  const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  const globalKey = "__vueuse_ssr_handlers__";
  _global[globalKey] = _global[globalKey] || {};
  var __getOwnPropSymbols$g = Object.getOwnPropertySymbols;
  var __hasOwnProp$g = Object.prototype.hasOwnProperty;
  var __propIsEnum$g = Object.prototype.propertyIsEnumerable;
  var __objRest$2 = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp$g.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols$g)
      for (var prop of __getOwnPropSymbols$g(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum$g.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  function useResizeObserver(target, callback, options = {}) {
    const _a2 = options, { window: window2 = defaultWindow } = _a2, observerOptions = __objRest$2(_a2, ["window"]);
    let observer;
    const isSupported = useSupported(() => window2 && "ResizeObserver" in window2);
    const cleanup = () => {
      if (observer) {
        observer.disconnect();
        observer = void 0;
      }
    };
    const stopWatch = vue.watch(() => unrefElement(target), (el) => {
      cleanup();
      if (isSupported.value && window2 && el) {
        observer = new ResizeObserver(callback);
        observer.observe(el, observerOptions);
      }
    }, { immediate: true, flush: "post" });
    const stop = () => {
      cleanup();
      stopWatch();
    };
    tryOnScopeDispose(stop);
    return {
      isSupported,
      stop
    };
  }
  var SwipeDirection;
  (function(SwipeDirection2) {
    SwipeDirection2["UP"] = "UP";
    SwipeDirection2["RIGHT"] = "RIGHT";
    SwipeDirection2["DOWN"] = "DOWN";
    SwipeDirection2["LEFT"] = "LEFT";
    SwipeDirection2["NONE"] = "NONE";
  })(SwipeDirection || (SwipeDirection = {}));
  var __defProp = Object.defineProperty;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  const _TransitionPresets = {
    easeInSine: [0.12, 0, 0.39, 0],
    easeOutSine: [0.61, 1, 0.88, 1],
    easeInOutSine: [0.37, 0, 0.63, 1],
    easeInQuad: [0.11, 0, 0.5, 0],
    easeOutQuad: [0.5, 1, 0.89, 1],
    easeInOutQuad: [0.45, 0, 0.55, 1],
    easeInCubic: [0.32, 0, 0.67, 0],
    easeOutCubic: [0.33, 1, 0.68, 1],
    easeInOutCubic: [0.65, 0, 0.35, 1],
    easeInQuart: [0.5, 0, 0.75, 0],
    easeOutQuart: [0.25, 1, 0.5, 1],
    easeInOutQuart: [0.76, 0, 0.24, 1],
    easeInQuint: [0.64, 0, 0.78, 0],
    easeOutQuint: [0.22, 1, 0.36, 1],
    easeInOutQuint: [0.83, 0, 0.17, 1],
    easeInExpo: [0.7, 0, 0.84, 0],
    easeOutExpo: [0.16, 1, 0.3, 1],
    easeInOutExpo: [0.87, 0, 0.13, 1],
    easeInCirc: [0.55, 0, 1, 0.45],
    easeOutCirc: [0, 0.55, 0.45, 1],
    easeInOutCirc: [0.85, 0, 0.15, 1],
    easeInBack: [0.36, 0, 0.66, -0.56],
    easeOutBack: [0.34, 1.56, 0.64, 1],
    easeInOutBack: [0.68, -0.6, 0.32, 1.6]
  };
  __spreadValues({
    linear: identity$1
  }, _TransitionPresets);
  const isFirefox = () => isClient && /firefox/i.test(window.navigator.userAgent);
  /**
  * @vue/shared v3.4.27
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  const NOOP = () => {
  };
  const hasOwnProperty$6 = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty$6.call(val, key);
  const isFunction$1 = (val) => typeof val === "function";
  const isString = (val) => typeof val === "string";
  const isSymbol$1 = (val) => typeof val === "symbol";
  const isObject$1 = (val) => val !== null && typeof val === "object";
  const cacheStringFunction = (fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };
  const camelizeRE = /-(\w)/g;
  const camelize = cacheStringFunction((str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
  });
  const hyphenateRE = /\B([A-Z])/g;
  const hyphenate = cacheStringFunction(
    (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
  );
  const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal || freeSelf || Function("return this")();
  var Symbol$1 = root.Symbol;
  var objectProto$6 = Object.prototype;
  var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
  var nativeObjectToString$1 = objectProto$6.toString;
  var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty$5.call(value, symToStringTag$1), tag = value[symToStringTag$1];
    try {
      value[symToStringTag$1] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }
  var objectProto$5 = Object.prototype;
  var nativeObjectToString = objectProto$5.toString;
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }
  var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
  var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  var symbolTag = "[object Symbol]";
  function isSymbol(value) {
    return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
  }
  function arrayMap(array, iteratee) {
    var index = -1, length = array == null ? 0 : array.length, result = Array(length);
    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }
  var isArray = Array.isArray;
  var INFINITY$1 = 1 / 0;
  var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
  function baseToString(value) {
    if (typeof value == "string") {
      return value;
    }
    if (isArray(value)) {
      return arrayMap(value, baseToString) + "";
    }
    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : "";
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
  }
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  function identity(value) {
    return value;
  }
  var asyncTag = "[object AsyncFunction]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }
  var coreJsData = root["__core-js_shared__"];
  var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  var funcProto$1 = Function.prototype;
  var funcToString$1 = funcProto$1.toString;
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString$1.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var funcProto = Function.prototype, objectProto$4 = Object.prototype;
  var funcToString = funcProto.toString;
  var hasOwnProperty$4 = objectProto$4.hasOwnProperty;
  var reIsNative = RegExp(
    "^" + funcToString.call(hasOwnProperty$4).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0:
        return func.call(thisArg);
      case 1:
        return func.call(thisArg, args[0]);
      case 2:
        return func.call(thisArg, args[0], args[1]);
      case 3:
        return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }
  var HOT_COUNT = 800, HOT_SPAN = 16;
  var nativeNow = Date.now;
  function shortOut(func) {
    var count = 0, lastCalled = 0;
    return function() {
      var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(void 0, arguments);
    };
  }
  function constant(value) {
    return function() {
      return value;
    };
  }
  var defineProperty = function() {
    try {
      var func = getNative(Object, "defineProperty");
      func({}, "", {});
      return func;
    } catch (e) {
    }
  }();
  var baseSetToString = !defineProperty ? identity : function(func, string) {
    return defineProperty(func, "toString", {
      "configurable": true,
      "enumerable": false,
      "value": constant(string),
      "writable": true
    });
  };
  var setToString = shortOut(baseSetToString);
  var MAX_SAFE_INTEGER$1 = 9007199254740991;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER$1 : length;
    return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  function baseAssignValue(object, key, value) {
    if (key == "__proto__" && defineProperty) {
      defineProperty(object, key, {
        "configurable": true,
        "enumerable": true,
        "value": value,
        "writable": true
      });
    } else {
      object[key] = value;
    }
  }
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  var objectProto$3 = Object.prototype;
  var hasOwnProperty$3 = objectProto$3.hasOwnProperty;
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty$3.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
      baseAssignValue(object, key, value);
    }
  }
  var nativeMax = Math.max;
  function overRest(func, start, transform) {
    start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
    return function() {
      var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = transform(array);
      return apply(func, this, otherArgs);
    };
  }
  var MAX_SAFE_INTEGER = 9007199254740991;
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  var argsTag = "[object Arguments]";
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag;
  }
  var objectProto$2 = Object.prototype;
  var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
  var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;
  var isArguments = baseIsArguments(/* @__PURE__ */ function() {
    return arguments;
  }()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty$2.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
  };
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
  function isKey(value, object) {
    if (isArray(value)) {
      return false;
    }
    var type = typeof value;
    if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
  }
  var nativeCreate = getNative(Object, "create");
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
    this.size = 0;
  }
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
  var objectProto$1 = Object.prototype;
  var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED$1 ? void 0 : result;
    }
    return hasOwnProperty$1.call(data, key) ? data[key] : void 0;
  }
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
  }
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
    return this;
  }
  function Hash(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype["delete"] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  var arrayProto = Array.prototype;
  var splice = arrayProto.splice;
  function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  function ListCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype["delete"] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  var Map$1 = getNative(root, "Map");
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash(),
      "map": new (Map$1 || ListCache)(),
      "string": new Hash()
    };
  }
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  function mapCacheDelete(key) {
    var result = getMapData(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  function mapCacheSet(key, value) {
    var data = getMapData(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
  function MapCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype["delete"] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  var FUNC_ERROR_TEXT = "Expected a function";
  function memoize(func, resolver) {
    if (typeof func != "function" || resolver != null && typeof resolver != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
      var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize.Cache || MapCache)();
    return memoized;
  }
  memoize.Cache = MapCache;
  var MAX_MEMOIZE_SIZE = 500;
  function memoizeCapped(func) {
    var result = memoize(func, function(key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }
      return key;
    });
    var cache = result.cache;
    return result;
  }
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
  var reEscapeChar = /\\(\\)?/g;
  var stringToPath = memoizeCapped(function(string) {
    var result = [];
    if (string.charCodeAt(0) === 46) {
      result.push("");
    }
    string.replace(rePropName, function(match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
    });
    return result;
  });
  function toString(value) {
    return value == null ? "" : baseToString(value);
  }
  function castPath(value, object) {
    if (isArray(value)) {
      return value;
    }
    return isKey(value, object) ? [value] : stringToPath(toString(value));
  }
  var INFINITY = 1 / 0;
  function toKey(value) {
    if (typeof value == "string" || isSymbol(value)) {
      return value;
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY ? "-0" : result;
  }
  function baseGet(object, path) {
    path = castPath(path, object);
    var index = 0, length = path.length;
    while (object != null && index < length) {
      object = object[toKey(path[index++])];
    }
    return index && index == length ? object : void 0;
  }
  function get(object, path, defaultValue) {
    var result = object == null ? void 0 : baseGet(object, path);
    return result === void 0 ? defaultValue : result;
  }
  function arrayPush(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }
  var spreadableSymbol = Symbol$1 ? Symbol$1.isConcatSpreadable : void 0;
  function isFlattenable(value) {
    return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
  }
  function baseFlatten(array, depth, predicate, isStrict, result) {
    var index = -1, length = array.length;
    predicate || (predicate = isFlattenable);
    result || (result = []);
    while (++index < length) {
      var value = array[index];
      if (predicate(value)) {
        {
          arrayPush(result, value);
        }
      } else {
        result[result.length] = value;
      }
    }
    return result;
  }
  function flatten(array) {
    var length = array == null ? 0 : array.length;
    return length ? baseFlatten(array) : [];
  }
  function flatRest(func) {
    return setToString(overRest(func, void 0, flatten), func + "");
  }
  function baseHasIn(object, key) {
    return object != null && key in Object(object);
  }
  function hasPath(object, path, hasFunc) {
    path = castPath(path, object);
    var index = -1, length = path.length, result = false;
    while (++index < length) {
      var key = toKey(path[index]);
      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }
      object = object[key];
    }
    if (result || ++index != length) {
      return result;
    }
    length = object == null ? 0 : object.length;
    return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
  }
  function hasIn(object, path) {
    return object != null && hasPath(object, path, baseHasIn);
  }
  function fromPairs(pairs) {
    var index = -1, length = pairs == null ? 0 : pairs.length, result = {};
    while (++index < length) {
      var pair = pairs[index];
      result[pair[0]] = pair[1];
    }
    return result;
  }
  function isNil(value) {
    return value == null;
  }
  function isUndefined$1(value) {
    return value === void 0;
  }
  function baseSet(object, path, value, customizer) {
    if (!isObject(object)) {
      return object;
    }
    path = castPath(path, object);
    var index = -1, length = path.length, lastIndex = length - 1, nested = object;
    while (nested != null && ++index < length) {
      var key = toKey(path[index]), newValue = value;
      if (key === "__proto__" || key === "constructor" || key === "prototype") {
        return object;
      }
      if (index != lastIndex) {
        var objValue = nested[key];
        newValue = void 0;
        if (newValue === void 0) {
          newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
        }
      }
      assignValue(nested, key, newValue);
      nested = nested[key];
    }
    return object;
  }
  function basePickBy(object, paths, predicate) {
    var index = -1, length = paths.length, result = {};
    while (++index < length) {
      var path = paths[index], value = baseGet(object, path);
      if (predicate(value, path)) {
        baseSet(result, castPath(path, object), value);
      }
    }
    return result;
  }
  function basePick(object, paths) {
    return basePickBy(object, paths, function(value, path) {
      return hasIn(object, path);
    });
  }
  var pick = flatRest(function(object, paths) {
    return object == null ? {} : basePick(object, paths);
  });
  const isUndefined = (val) => val === void 0;
  const isBoolean = (val) => typeof val === "boolean";
  const isNumber = (val) => typeof val === "number";
  const isStringNumber = (val) => {
    if (!isString(val)) {
      return false;
    }
    return !Number.isNaN(Number(val));
  };
  const keysOf = (arr) => Object.keys(arr);
  class ElementPlusError extends Error {
    constructor(m) {
      super(m);
      this.name = "ElementPlusError";
    }
  }
  function throwError(scope, m) {
    throw new ElementPlusError(`[${scope}] ${m}`);
  }
  function debugWarn(scope, message) {
  }
  const classNameToArray = (cls = "") => cls.split(" ").filter((item) => !!item.trim());
  const hasClass = (el, cls) => {
    if (!el || !cls)
      return false;
    if (cls.includes(" "))
      throw new Error("className should not contain space.");
    return el.classList.contains(cls);
  };
  const addClass = (el, cls) => {
    if (!el || !cls.trim())
      return;
    el.classList.add(...classNameToArray(cls));
  };
  const removeClass = (el, cls) => {
    if (!el || !cls.trim())
      return;
    el.classList.remove(...classNameToArray(cls));
  };
  const getStyle = (element, styleName) => {
    var _a2;
    if (!isClient || !element || !styleName)
      return "";
    let key = camelize(styleName);
    if (key === "float")
      key = "cssFloat";
    try {
      const style = element.style[key];
      if (style)
        return style;
      const computed2 = (_a2 = document.defaultView) == null ? void 0 : _a2.getComputedStyle(element, "");
      return computed2 ? computed2[key] : "";
    } catch (e) {
      return element.style[key];
    }
  };
  function addUnit(value, defaultUnit = "px") {
    if (!value)
      return "";
    if (isNumber(value) || isStringNumber(value)) {
      return `${value}${defaultUnit}`;
    } else if (isString(value)) {
      return value;
    }
  }
  let scrollBarWidth;
  const getScrollBarWidth = (namespace) => {
    var _a2;
    if (!isClient)
      return 0;
    if (scrollBarWidth !== void 0)
      return scrollBarWidth;
    const outer = document.createElement("div");
    outer.className = `${namespace}-scrollbar__wrap`;
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.position = "absolute";
    outer.style.top = "-9999px";
    document.body.appendChild(outer);
    const widthNoScroll = outer.offsetWidth;
    outer.style.overflow = "scroll";
    const inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);
    const widthWithScroll = inner.offsetWidth;
    (_a2 = outer.parentNode) == null ? void 0 : _a2.removeChild(outer);
    scrollBarWidth = widthNoScroll - widthWithScroll;
    return scrollBarWidth;
  };
  /*! Element Plus Icons Vue v2.3.1 */
  var circle_check_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
    name: "CircleCheck",
    __name: "circle-check",
    setup(__props) {
      return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, [
        vue.createElementVNode("path", {
          fill: "currentColor",
          d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"
        }),
        vue.createElementVNode("path", {
          fill: "currentColor",
          d: "M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752l265.344-265.408z"
        })
      ]));
    }
  });
  var circle_check_default = circle_check_vue_vue_type_script_setup_true_lang_default;
  var circle_close_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
    name: "CircleClose",
    __name: "circle-close",
    setup(__props) {
      return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, [
        vue.createElementVNode("path", {
          fill: "currentColor",
          d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248z"
        }),
        vue.createElementVNode("path", {
          fill: "currentColor",
          d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"
        })
      ]));
    }
  });
  var circle_close_default = circle_close_vue_vue_type_script_setup_true_lang_default;
  var close_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
    name: "Close",
    __name: "close",
    setup(__props) {
      return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, [
        vue.createElementVNode("path", {
          fill: "currentColor",
          d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
        })
      ]));
    }
  });
  var close_default = close_vue_vue_type_script_setup_true_lang_default;
  var hide_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
    name: "Hide",
    __name: "hide",
    setup(__props) {
      return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, [
        vue.createElementVNode("path", {
          fill: "currentColor",
          d: "M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2zM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z"
        }),
        vue.createElementVNode("path", {
          fill: "currentColor",
          d: "M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z"
        })
      ]));
    }
  });
  var hide_default = hide_vue_vue_type_script_setup_true_lang_default;
  var loading_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
    name: "Loading",
    __name: "loading",
    setup(__props) {
      return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, [
        vue.createElementVNode("path", {
          fill: "currentColor",
          d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
        })
      ]));
    }
  });
  var loading_default = loading_vue_vue_type_script_setup_true_lang_default;
  var view_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
    name: "View",
    __name: "view",
    setup(__props) {
      return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, [
        vue.createElementVNode("path", {
          fill: "currentColor",
          d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352m0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448m0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160"
        })
      ]));
    }
  });
  var view_default = view_vue_vue_type_script_setup_true_lang_default;
  const epPropKey = "__epPropKey";
  const definePropType = (val) => val;
  const isEpProp = (val) => isObject$1(val) && !!val[epPropKey];
  const buildProp = (prop, key) => {
    if (!isObject$1(prop) || isEpProp(prop))
      return prop;
    const { values, required, default: defaultValue, type, validator } = prop;
    const _validator = values || validator ? (val) => {
      let valid = false;
      let allowedValues = [];
      if (values) {
        allowedValues = Array.from(values);
        if (hasOwn(prop, "default")) {
          allowedValues.push(defaultValue);
        }
        valid || (valid = allowedValues.includes(val));
      }
      if (validator)
        valid || (valid = validator(val));
      if (!valid && allowedValues.length > 0) {
        const allowValuesText = [...new Set(allowedValues)].map((value) => JSON.stringify(value)).join(", ");
        vue.warn(`Invalid prop: validation failed${key ? ` for prop "${key}"` : ""}. Expected one of [${allowValuesText}], got value ${JSON.stringify(val)}.`);
      }
      return valid;
    } : void 0;
    const epProp = {
      type,
      required: !!required,
      validator: _validator,
      [epPropKey]: true
    };
    if (hasOwn(prop, "default"))
      epProp.default = defaultValue;
    return epProp;
  };
  const buildProps = (props) => fromPairs(Object.entries(props).map(([key, option]) => [
    key,
    buildProp(option, key)
  ]));
  const iconPropType = definePropType([
    String,
    Object,
    Function
  ]);
  const CloseComponents = {
    Close: close_default
  };
  const ValidateComponentsMap = {
    validating: loading_default,
    success: circle_check_default,
    error: circle_close_default
  };
  const withInstall = (main, extra) => {
    main.install = (app) => {
      for (const comp of [main, ...Object.values(extra != null ? extra : {})]) {
        app.component(comp.name, comp);
      }
    };
    if (extra) {
      for (const [key, comp] of Object.entries(extra)) {
        main[key] = comp;
      }
    }
    return main;
  };
  const withNoopInstall = (component) => {
    component.install = NOOP;
    return component;
  };
  const composeRefs = (...refs) => {
    return (el) => {
      refs.forEach((ref2) => {
        if (isFunction$1(ref2)) {
          ref2(el);
        } else {
          ref2.value = el;
        }
      });
    };
  };
  const EVENT_CODE = {
    tab: "Tab",
    enter: "Enter",
    space: "Space",
    left: "ArrowLeft",
    up: "ArrowUp",
    right: "ArrowRight",
    down: "ArrowDown",
    esc: "Escape",
    delete: "Delete",
    backspace: "Backspace",
    numpadEnter: "NumpadEnter",
    pageUp: "PageUp",
    pageDown: "PageDown",
    home: "Home",
    end: "End"
  };
  const UPDATE_MODEL_EVENT = "update:modelValue";
  const componentSizes = ["", "default", "small", "large"];
  var PatchFlags = /* @__PURE__ */ ((PatchFlags2) => {
    PatchFlags2[PatchFlags2["TEXT"] = 1] = "TEXT";
    PatchFlags2[PatchFlags2["CLASS"] = 2] = "CLASS";
    PatchFlags2[PatchFlags2["STYLE"] = 4] = "STYLE";
    PatchFlags2[PatchFlags2["PROPS"] = 8] = "PROPS";
    PatchFlags2[PatchFlags2["FULL_PROPS"] = 16] = "FULL_PROPS";
    PatchFlags2[PatchFlags2["HYDRATE_EVENTS"] = 32] = "HYDRATE_EVENTS";
    PatchFlags2[PatchFlags2["STABLE_FRAGMENT"] = 64] = "STABLE_FRAGMENT";
    PatchFlags2[PatchFlags2["KEYED_FRAGMENT"] = 128] = "KEYED_FRAGMENT";
    PatchFlags2[PatchFlags2["UNKEYED_FRAGMENT"] = 256] = "UNKEYED_FRAGMENT";
    PatchFlags2[PatchFlags2["NEED_PATCH"] = 512] = "NEED_PATCH";
    PatchFlags2[PatchFlags2["DYNAMIC_SLOTS"] = 1024] = "DYNAMIC_SLOTS";
    PatchFlags2[PatchFlags2["HOISTED"] = -1] = "HOISTED";
    PatchFlags2[PatchFlags2["BAIL"] = -2] = "BAIL";
    return PatchFlags2;
  })(PatchFlags || {});
  const isKorean = (text) => /([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(text);
  const mutable = (val) => val;
  const DEFAULT_EXCLUDE_KEYS = ["class", "style"];
  const LISTENER_PREFIX = /^on[A-Z]/;
  const useAttrs = (params = {}) => {
    const { excludeListeners = false, excludeKeys } = params;
    const allExcludeKeys = vue.computed(() => {
      return ((excludeKeys == null ? void 0 : excludeKeys.value) || []).concat(DEFAULT_EXCLUDE_KEYS);
    });
    const instance = vue.getCurrentInstance();
    if (!instance) {
      return vue.computed(() => ({}));
    }
    return vue.computed(() => {
      var _a2;
      return fromPairs(Object.entries((_a2 = instance.proxy) == null ? void 0 : _a2.$attrs).filter(([key]) => !allExcludeKeys.value.includes(key) && !(excludeListeners && LISTENER_PREFIX.test(key))));
    });
  };
  const useDeprecated = ({ from, replacement, scope, version, ref: ref2, type = "API" }, condition) => {
    vue.watch(() => vue.unref(condition), (val) => {
    }, {
      immediate: true
    });
  };
  const useDraggable = (targetRef, dragRef, draggable, overflow) => {
    let transform = {
      offsetX: 0,
      offsetY: 0
    };
    const onMousedown = (e) => {
      const downX = e.clientX;
      const downY = e.clientY;
      const { offsetX, offsetY } = transform;
      const targetRect = targetRef.value.getBoundingClientRect();
      const targetLeft = targetRect.left;
      const targetTop = targetRect.top;
      const targetWidth = targetRect.width;
      const targetHeight = targetRect.height;
      const clientWidth = document.documentElement.clientWidth;
      const clientHeight = document.documentElement.clientHeight;
      const minLeft = -targetLeft + offsetX;
      const minTop = -targetTop + offsetY;
      const maxLeft = clientWidth - targetLeft - targetWidth + offsetX;
      const maxTop = clientHeight - targetTop - targetHeight + offsetY;
      const onMousemove = (e2) => {
        let moveX = offsetX + e2.clientX - downX;
        let moveY = offsetY + e2.clientY - downY;
        if (!(overflow == null ? void 0 : overflow.value)) {
          moveX = Math.min(Math.max(moveX, minLeft), maxLeft);
          moveY = Math.min(Math.max(moveY, minTop), maxTop);
        }
        transform = {
          offsetX: moveX,
          offsetY: moveY
        };
        if (targetRef.value) {
          targetRef.value.style.transform = `translate(${addUnit(moveX)}, ${addUnit(moveY)})`;
        }
      };
      const onMouseup = () => {
        document.removeEventListener("mousemove", onMousemove);
        document.removeEventListener("mouseup", onMouseup);
      };
      document.addEventListener("mousemove", onMousemove);
      document.addEventListener("mouseup", onMouseup);
    };
    const onDraggable = () => {
      if (dragRef.value && targetRef.value) {
        dragRef.value.addEventListener("mousedown", onMousedown);
      }
    };
    const offDraggable = () => {
      if (dragRef.value && targetRef.value) {
        dragRef.value.removeEventListener("mousedown", onMousedown);
      }
    };
    vue.onMounted(() => {
      vue.watchEffect(() => {
        if (draggable.value) {
          onDraggable();
        } else {
          offDraggable();
        }
      });
    });
    vue.onBeforeUnmount(() => {
      offDraggable();
    });
  };
  var English = {
    name: "en",
    el: {
      breadcrumb: {
        label: "Breadcrumb"
      },
      colorpicker: {
        confirm: "OK",
        clear: "Clear",
        defaultLabel: "color picker",
        description: "current color is {color}. press enter to select a new color."
      },
      datepicker: {
        now: "Now",
        today: "Today",
        cancel: "Cancel",
        clear: "Clear",
        confirm: "OK",
        dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
        monthTablePrompt: "Use the arrow keys and enter to select the month",
        yearTablePrompt: "Use the arrow keys and enter to select the year",
        selectedDate: "Selected date",
        selectDate: "Select date",
        selectTime: "Select time",
        startDate: "Start Date",
        startTime: "Start Time",
        endDate: "End Date",
        endTime: "End Time",
        prevYear: "Previous Year",
        nextYear: "Next Year",
        prevMonth: "Previous Month",
        nextMonth: "Next Month",
        year: "",
        month1: "January",
        month2: "February",
        month3: "March",
        month4: "April",
        month5: "May",
        month6: "June",
        month7: "July",
        month8: "August",
        month9: "September",
        month10: "October",
        month11: "November",
        month12: "December",
        week: "week",
        weeks: {
          sun: "Sun",
          mon: "Mon",
          tue: "Tue",
          wed: "Wed",
          thu: "Thu",
          fri: "Fri",
          sat: "Sat"
        },
        weeksFull: {
          sun: "Sunday",
          mon: "Monday",
          tue: "Tuesday",
          wed: "Wednesday",
          thu: "Thursday",
          fri: "Friday",
          sat: "Saturday"
        },
        months: {
          jan: "Jan",
          feb: "Feb",
          mar: "Mar",
          apr: "Apr",
          may: "May",
          jun: "Jun",
          jul: "Jul",
          aug: "Aug",
          sep: "Sep",
          oct: "Oct",
          nov: "Nov",
          dec: "Dec"
        }
      },
      inputNumber: {
        decrease: "decrease number",
        increase: "increase number"
      },
      select: {
        loading: "Loading",
        noMatch: "No matching data",
        noData: "No data",
        placeholder: "Select"
      },
      dropdown: {
        toggleDropdown: "Toggle Dropdown"
      },
      cascader: {
        noMatch: "No matching data",
        loading: "Loading",
        placeholder: "Select",
        noData: "No data"
      },
      pagination: {
        goto: "Go to",
        pagesize: "/page",
        total: "Total {total}",
        pageClassifier: "",
        page: "Page",
        prev: "Go to previous page",
        next: "Go to next page",
        currentPage: "page {pager}",
        prevPages: "Previous {pager} pages",
        nextPages: "Next {pager} pages",
        deprecationWarning: "Deprecated usages detected, please refer to the el-pagination documentation for more details"
      },
      dialog: {
        close: "Close this dialog"
      },
      drawer: {
        close: "Close this dialog"
      },
      messagebox: {
        title: "Message",
        confirm: "OK",
        cancel: "Cancel",
        error: "Illegal input",
        close: "Close this dialog"
      },
      upload: {
        deleteTip: "press delete to remove",
        delete: "Delete",
        preview: "Preview",
        continue: "Continue"
      },
      slider: {
        defaultLabel: "slider between {min} and {max}",
        defaultRangeStartLabel: "pick start value",
        defaultRangeEndLabel: "pick end value"
      },
      table: {
        emptyText: "No Data",
        confirmFilter: "Confirm",
        resetFilter: "Reset",
        clearFilter: "All",
        sumText: "Sum"
      },
      tour: {
        next: "Next",
        previous: "Previous",
        finish: "Finish"
      },
      tree: {
        emptyText: "No Data"
      },
      transfer: {
        noMatch: "No matching data",
        noData: "No data",
        titles: ["List 1", "List 2"],
        filterPlaceholder: "Enter keyword",
        noCheckedFormat: "{total} items",
        hasCheckedFormat: "{checked}/{total} checked"
      },
      image: {
        error: "FAILED"
      },
      pageHeader: {
        title: "Back"
      },
      popconfirm: {
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      },
      carousel: {
        leftArrow: "Carousel arrow left",
        rightArrow: "Carousel arrow right",
        indicator: "Carousel switch to index {index}"
      }
    }
  };
  const buildTranslator = (locale) => (path, option) => translate(path, option, vue.unref(locale));
  const translate = (path, option, locale) => get(locale, path, path).replace(/\{(\w+)\}/g, (_, key) => {
    var _a2;
    return `${(_a2 = option == null ? void 0 : option[key]) != null ? _a2 : `{${key}}`}`;
  });
  const buildLocaleContext = (locale) => {
    const lang = vue.computed(() => vue.unref(locale).name);
    const localeRef = vue.isRef(locale) ? locale : vue.ref(locale);
    return {
      lang,
      locale: localeRef,
      t: buildTranslator(locale)
    };
  };
  const localeContextKey = Symbol("localeContextKey");
  const useLocale = (localeOverrides) => {
    const locale = localeOverrides || vue.inject(localeContextKey, vue.ref());
    return buildLocaleContext(vue.computed(() => locale.value || English));
  };
  /**
  * @vue/reactivity v3.4.27
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  let activeEffectScope;
  function recordEffectScope(effect2, scope = activeEffectScope) {
    if (scope && scope.active) {
      scope.effects.push(effect2);
    }
  }
  let activeEffect;
  class ReactiveEffect {
    constructor(fn, trigger2, scheduler, scope) {
      this.fn = fn;
      this.trigger = trigger2;
      this.scheduler = scheduler;
      this.active = true;
      this.deps = [];
      this._dirtyLevel = 4;
      this._trackId = 0;
      this._runnings = 0;
      this._shouldSchedule = false;
      this._depsLength = 0;
      recordEffectScope(this, scope);
    }
    get dirty() {
      if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
        this._dirtyLevel = 1;
        pauseTracking();
        for (let i = 0; i < this._depsLength; i++) {
          const dep = this.deps[i];
          if (dep.computed) {
            triggerComputed(dep.computed);
            if (this._dirtyLevel >= 4) {
              break;
            }
          }
        }
        if (this._dirtyLevel === 1) {
          this._dirtyLevel = 0;
        }
        resetTracking();
      }
      return this._dirtyLevel >= 4;
    }
    set dirty(v) {
      this._dirtyLevel = v ? 4 : 0;
    }
    run() {
      this._dirtyLevel = 0;
      if (!this.active) {
        return this.fn();
      }
      let lastShouldTrack = shouldTrack;
      let lastEffect = activeEffect;
      try {
        shouldTrack = true;
        activeEffect = this;
        this._runnings++;
        preCleanupEffect(this);
        return this.fn();
      } finally {
        postCleanupEffect(this);
        this._runnings--;
        activeEffect = lastEffect;
        shouldTrack = lastShouldTrack;
      }
    }
    stop() {
      if (this.active) {
        preCleanupEffect(this);
        postCleanupEffect(this);
        this.onStop && this.onStop();
        this.active = false;
      }
    }
  }
  function triggerComputed(computed2) {
    return computed2.value;
  }
  function preCleanupEffect(effect2) {
    effect2._trackId++;
    effect2._depsLength = 0;
  }
  function postCleanupEffect(effect2) {
    if (effect2.deps.length > effect2._depsLength) {
      for (let i = effect2._depsLength; i < effect2.deps.length; i++) {
        cleanupDepEffect(effect2.deps[i], effect2);
      }
      effect2.deps.length = effect2._depsLength;
    }
  }
  function cleanupDepEffect(dep, effect2) {
    const trackId = dep.get(effect2);
    if (trackId !== void 0 && effect2._trackId !== trackId) {
      dep.delete(effect2);
      if (dep.size === 0) {
        dep.cleanup();
      }
    }
  }
  let shouldTrack = true;
  let pauseScheduleStack = 0;
  const trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
  }
  function pauseScheduling() {
    pauseScheduleStack++;
  }
  function resetScheduling() {
    pauseScheduleStack--;
    while (!pauseScheduleStack && queueEffectSchedulers.length) {
      queueEffectSchedulers.shift()();
    }
  }
  function trackEffect(effect2, dep, debuggerEventExtraInfo) {
    if (dep.get(effect2) !== effect2._trackId) {
      dep.set(effect2, effect2._trackId);
      const oldDep = effect2.deps[effect2._depsLength];
      if (oldDep !== dep) {
        if (oldDep) {
          cleanupDepEffect(oldDep, effect2);
        }
        effect2.deps[effect2._depsLength++] = dep;
      } else {
        effect2._depsLength++;
      }
    }
  }
  const queueEffectSchedulers = [];
  function triggerEffects(dep, dirtyLevel, debuggerEventExtraInfo) {
    pauseScheduling();
    for (const effect2 of dep.keys()) {
      let tracking;
      if (effect2._dirtyLevel < dirtyLevel && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
        effect2._shouldSchedule || (effect2._shouldSchedule = effect2._dirtyLevel === 0);
        effect2._dirtyLevel = dirtyLevel;
      }
      if (effect2._shouldSchedule && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
        effect2.trigger();
        if ((!effect2._runnings || effect2.allowRecurse) && effect2._dirtyLevel !== 2) {
          effect2._shouldSchedule = false;
          if (effect2.scheduler) {
            queueEffectSchedulers.push(effect2.scheduler);
          }
        }
      }
    }
    resetScheduling();
  }
  const createDep = (cleanup, computed2) => {
    const dep = /* @__PURE__ */ new Map();
    dep.cleanup = cleanup;
    dep.computed = computed2;
    return dep;
  };
  new Set(
    /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol$1)
  );
  function toRaw(observed) {
    const raw = observed && observed["__v_raw"];
    return raw ? toRaw(raw) : observed;
  }
  class ComputedRefImpl {
    constructor(getter, _setter, isReadonly2, isSSR) {
      this.getter = getter;
      this._setter = _setter;
      this.dep = void 0;
      this.__v_isRef = true;
      this["__v_isReadonly"] = false;
      this.effect = new ReactiveEffect(
        () => getter(this._value),
        () => triggerRefValue(
          this,
          this.effect._dirtyLevel === 2 ? 2 : 3
        )
      );
      this.effect.computed = this;
      this.effect.active = this._cacheable = !isSSR;
      this["__v_isReadonly"] = isReadonly2;
    }
    get value() {
      const self2 = toRaw(this);
      if ((!self2._cacheable || self2.effect.dirty) && hasChanged(self2._value, self2._value = self2.effect.run())) {
        triggerRefValue(self2, 4);
      }
      trackRefValue(self2);
      if (self2.effect._dirtyLevel >= 2) {
        triggerRefValue(self2, 2);
      }
      return self2._value;
    }
    set value(newValue) {
      this._setter(newValue);
    }
    // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
    get _dirty() {
      return this.effect.dirty;
    }
    set _dirty(v) {
      this.effect.dirty = v;
    }
    // #endregion
  }
  function computed(getterOrOptions, debugOptions, isSSR = false) {
    let getter;
    let setter;
    const onlyGetter = isFunction$1(getterOrOptions);
    if (onlyGetter) {
      getter = getterOrOptions;
      setter = NOOP;
    } else {
      getter = getterOrOptions.get;
      setter = getterOrOptions.set;
    }
    const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
    return cRef;
  }
  function trackRefValue(ref2) {
    var _a2;
    if (shouldTrack && activeEffect) {
      ref2 = toRaw(ref2);
      trackEffect(
        activeEffect,
        (_a2 = ref2.dep) != null ? _a2 : ref2.dep = createDep(
          () => ref2.dep = void 0,
          ref2 instanceof ComputedRefImpl ? ref2 : void 0
        )
      );
    }
  }
  function triggerRefValue(ref2, dirtyLevel = 4, newVal) {
    ref2 = toRaw(ref2);
    const dep = ref2.dep;
    if (dep) {
      triggerEffects(
        dep,
        dirtyLevel
      );
    }
  }
  const defaultNamespace = "el";
  const statePrefix = "is-";
  const _bem = (namespace, block, blockSuffix, element, modifier) => {
    let cls = `${namespace}-${block}`;
    if (blockSuffix) {
      cls += `-${blockSuffix}`;
    }
    if (element) {
      cls += `__${element}`;
    }
    if (modifier) {
      cls += `--${modifier}`;
    }
    return cls;
  };
  const namespaceContextKey = Symbol("namespaceContextKey");
  const useGetDerivedNamespace = (namespaceOverrides) => {
    const derivedNamespace = namespaceOverrides || (vue.getCurrentInstance() ? vue.inject(namespaceContextKey, vue.ref(defaultNamespace)) : vue.ref(defaultNamespace));
    const namespace = vue.computed(() => {
      return vue.unref(derivedNamespace) || defaultNamespace;
    });
    return namespace;
  };
  const useNamespace = (block, namespaceOverrides) => {
    const namespace = useGetDerivedNamespace(namespaceOverrides);
    const b = (blockSuffix = "") => _bem(namespace.value, block, blockSuffix, "", "");
    const e = (element) => element ? _bem(namespace.value, block, "", element, "") : "";
    const m = (modifier) => modifier ? _bem(namespace.value, block, "", "", modifier) : "";
    const be = (blockSuffix, element) => blockSuffix && element ? _bem(namespace.value, block, blockSuffix, element, "") : "";
    const em = (element, modifier) => element && modifier ? _bem(namespace.value, block, "", element, modifier) : "";
    const bm = (blockSuffix, modifier) => blockSuffix && modifier ? _bem(namespace.value, block, blockSuffix, "", modifier) : "";
    const bem = (blockSuffix, element, modifier) => blockSuffix && element && modifier ? _bem(namespace.value, block, blockSuffix, element, modifier) : "";
    const is = (name, ...args) => {
      const state = args.length >= 1 ? args[0] : true;
      return name && state ? `${statePrefix}${name}` : "";
    };
    const cssVar = (object) => {
      const styles = {};
      for (const key in object) {
        if (object[key]) {
          styles[`--${namespace.value}-${key}`] = object[key];
        }
      }
      return styles;
    };
    const cssVarBlock = (object) => {
      const styles = {};
      for (const key in object) {
        if (object[key]) {
          styles[`--${namespace.value}-${block}-${key}`] = object[key];
        }
      }
      return styles;
    };
    const cssVarName = (name) => `--${namespace.value}-${name}`;
    const cssVarBlockName = (name) => `--${namespace.value}-${block}-${name}`;
    return {
      namespace,
      b,
      e,
      m,
      be,
      em,
      bm,
      bem,
      is,
      cssVar,
      cssVarName,
      cssVarBlock,
      cssVarBlockName
    };
  };
  const useLockscreen = (trigger, options = {}) => {
    if (!vue.isRef(trigger)) {
      throwError("[useLockscreen]", "You need to pass a ref param to this function");
    }
    const ns = options.ns || useNamespace("popup");
    const hiddenCls = computed(() => ns.bm("parent", "hidden"));
    if (!isClient || hasClass(document.body, hiddenCls.value)) {
      return;
    }
    let scrollBarWidth2 = 0;
    let withoutHiddenClass = false;
    let bodyWidth = "0";
    const cleanup = () => {
      setTimeout(() => {
        removeClass(document == null ? void 0 : document.body, hiddenCls.value);
        if (withoutHiddenClass && document) {
          document.body.style.width = bodyWidth;
        }
      }, 200);
    };
    vue.watch(trigger, (val) => {
      if (!val) {
        cleanup();
        return;
      }
      withoutHiddenClass = !hasClass(document.body, hiddenCls.value);
      if (withoutHiddenClass) {
        bodyWidth = document.body.style.width;
      }
      scrollBarWidth2 = getScrollBarWidth(ns.namespace.value);
      const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
      const bodyOverflowY = getStyle(document.body, "overflowY");
      if (scrollBarWidth2 > 0 && (bodyHasOverflow || bodyOverflowY === "scroll") && withoutHiddenClass) {
        document.body.style.width = `calc(100% - ${scrollBarWidth2}px)`;
      }
      addClass(document.body, hiddenCls.value);
    });
    vue.onScopeDispose(() => cleanup());
  };
  const useProp = (name) => {
    const vm = vue.getCurrentInstance();
    return vue.computed(() => {
      var _a2, _b;
      return (_b = (_a2 = vm == null ? void 0 : vm.proxy) == null ? void 0 : _a2.$props) == null ? void 0 : _b[name];
    });
  };
  const useSameTarget = (handleClick) => {
    if (!handleClick) {
      return { onClick: NOOP, onMousedown: NOOP, onMouseup: NOOP };
    }
    let mousedownTarget = false;
    let mouseupTarget = false;
    const onClick = (e) => {
      if (mousedownTarget && mouseupTarget) {
        handleClick(e);
      }
      mousedownTarget = mouseupTarget = false;
    };
    const onMousedown = (e) => {
      mousedownTarget = e.target === e.currentTarget;
    };
    const onMouseup = (e) => {
      mouseupTarget = e.target === e.currentTarget;
    };
    return { onClick, onMousedown, onMouseup };
  };
  const defaultIdInjection = {
    prefix: Math.floor(Math.random() * 1e4),
    current: 0
  };
  const ID_INJECTION_KEY = Symbol("elIdInjection");
  const useIdInjection = () => {
    return vue.getCurrentInstance() ? vue.inject(ID_INJECTION_KEY, defaultIdInjection) : defaultIdInjection;
  };
  const useId = (deterministicId) => {
    const idInjection = useIdInjection();
    const namespace = useGetDerivedNamespace();
    const idRef = vue.computed(() => vue.unref(deterministicId) || `${namespace.value}-id-${idInjection.prefix}-${idInjection.current++}`);
    return idRef;
  };
  let registeredEscapeHandlers = [];
  const cachedHandler = (e) => {
    const event = e;
    if (event.key === EVENT_CODE.esc) {
      registeredEscapeHandlers.forEach((registeredHandler) => registeredHandler(event));
    }
  };
  const useEscapeKeydown = (handler) => {
    vue.onMounted(() => {
      if (registeredEscapeHandlers.length === 0) {
        document.addEventListener("keydown", cachedHandler);
      }
      if (isClient)
        registeredEscapeHandlers.push(handler);
    });
    vue.onBeforeUnmount(() => {
      registeredEscapeHandlers = registeredEscapeHandlers.filter((registeredHandler) => registeredHandler !== handler);
      if (registeredEscapeHandlers.length === 0) {
        if (isClient)
          document.removeEventListener("keydown", cachedHandler);
      }
    });
  };
  const initial = {
    current: 0
  };
  const zIndex = vue.ref(0);
  const defaultInitialZIndex = 2e3;
  const ZINDEX_INJECTION_KEY = Symbol("elZIndexContextKey");
  const zIndexContextKey = Symbol("zIndexContextKey");
  const useZIndex = (zIndexOverrides) => {
    const increasingInjection = vue.getCurrentInstance() ? vue.inject(ZINDEX_INJECTION_KEY, initial) : initial;
    const zIndexInjection = zIndexOverrides || (vue.getCurrentInstance() ? vue.inject(zIndexContextKey, void 0) : void 0);
    const initialZIndex = vue.computed(() => {
      const zIndexFromInjection = vue.unref(zIndexInjection);
      return isNumber(zIndexFromInjection) ? zIndexFromInjection : defaultInitialZIndex;
    });
    const currentZIndex = vue.computed(() => initialZIndex.value + zIndex.value);
    const nextZIndex = () => {
      increasingInjection.current++;
      zIndex.value = increasingInjection.current;
      return currentZIndex.value;
    };
    if (!isClient && !vue.inject(ZINDEX_INJECTION_KEY))
      ;
    return {
      initialZIndex,
      currentZIndex,
      nextZIndex
    };
  };
  function useCursor(input) {
    const selectionRef = vue.ref();
    function recordCursor() {
      if (input.value == void 0)
        return;
      const { selectionStart, selectionEnd, value } = input.value;
      if (selectionStart == null || selectionEnd == null)
        return;
      const beforeTxt = value.slice(0, Math.max(0, selectionStart));
      const afterTxt = value.slice(Math.max(0, selectionEnd));
      selectionRef.value = {
        selectionStart,
        selectionEnd,
        value,
        beforeTxt,
        afterTxt
      };
    }
    function setCursor() {
      if (input.value == void 0 || selectionRef.value == void 0)
        return;
      const { value } = input.value;
      const { beforeTxt, afterTxt, selectionStart } = selectionRef.value;
      if (beforeTxt == void 0 || afterTxt == void 0 || selectionStart == void 0)
        return;
      let startPos = value.length;
      if (value.endsWith(afterTxt)) {
        startPos = value.length - afterTxt.length;
      } else if (value.startsWith(beforeTxt)) {
        startPos = beforeTxt.length;
      } else {
        const beforeLastChar = beforeTxt[selectionStart - 1];
        const newIndex = value.indexOf(beforeLastChar, selectionStart - 1);
        if (newIndex !== -1) {
          startPos = newIndex + 1;
        }
      }
      input.value.setSelectionRange(startPos, startPos);
    }
    return [recordCursor, setCursor];
  }
  const useSizeProp = buildProp({
    type: String,
    values: componentSizes,
    required: false
  });
  const SIZE_INJECTION_KEY = Symbol("size");
  const useGlobalSize = () => {
    const injectedSize = vue.inject(SIZE_INJECTION_KEY, {});
    return vue.computed(() => {
      return vue.unref(injectedSize.size) || "";
    });
  };
  function useFocusController(target, { afterFocus, beforeBlur, afterBlur } = {}) {
    const instance = vue.getCurrentInstance();
    const { emit } = instance;
    const wrapperRef = vue.shallowRef();
    const isFocused = vue.ref(false);
    const handleFocus = (event) => {
      if (isFocused.value)
        return;
      isFocused.value = true;
      emit("focus", event);
      afterFocus == null ? void 0 : afterFocus();
    };
    const handleBlur = (event) => {
      var _a2;
      const cancelBlur = isFunction$1(beforeBlur) ? beforeBlur(event) : false;
      if (cancelBlur || event.relatedTarget && ((_a2 = wrapperRef.value) == null ? void 0 : _a2.contains(event.relatedTarget)))
        return;
      isFocused.value = false;
      emit("blur", event);
      afterBlur == null ? void 0 : afterBlur();
    };
    const handleClick = () => {
      var _a2;
      (_a2 = target.value) == null ? void 0 : _a2.focus();
    };
    vue.watch(wrapperRef, (el) => {
      if (el) {
        el.setAttribute("tabindex", "-1");
      }
    });
    useEventListener(wrapperRef, "click", handleClick);
    return {
      wrapperRef,
      isFocused,
      handleFocus,
      handleBlur
    };
  }
  const ariaProps = buildProps({
    ariaLabel: String,
    ariaOrientation: {
      type: String,
      values: ["horizontal", "vertical", "undefined"]
    },
    ariaControls: String
  });
  const useAriaProps = (arias) => {
    return pick(ariaProps, arias);
  };
  const configProviderContextKey = Symbol();
  const globalConfig = vue.ref();
  function useGlobalConfig(key, defaultValue = void 0) {
    const config = vue.getCurrentInstance() ? vue.inject(configProviderContextKey, globalConfig) : globalConfig;
    if (key) {
      return vue.computed(() => {
        var _a2, _b;
        return (_b = (_a2 = config.value) == null ? void 0 : _a2[key]) != null ? _b : defaultValue;
      });
    } else {
      return config;
    }
  }
  function useGlobalComponentSettings(block, sizeFallback) {
    const config = useGlobalConfig();
    const ns = useNamespace(block, vue.computed(() => {
      var _a2;
      return ((_a2 = config.value) == null ? void 0 : _a2.namespace) || defaultNamespace;
    }));
    const locale = useLocale(vue.computed(() => {
      var _a2;
      return (_a2 = config.value) == null ? void 0 : _a2.locale;
    }));
    const zIndex2 = useZIndex(vue.computed(() => {
      var _a2;
      return ((_a2 = config.value) == null ? void 0 : _a2.zIndex) || defaultInitialZIndex;
    }));
    const size = vue.computed(() => {
      var _a2;
      return vue.unref(sizeFallback) || ((_a2 = config.value) == null ? void 0 : _a2.size) || "";
    });
    provideGlobalConfig(vue.computed(() => vue.unref(config) || {}));
    return {
      ns,
      locale,
      zIndex: zIndex2,
      size
    };
  }
  const provideGlobalConfig = (config, app, global2 = false) => {
    var _a2;
    const inSetup = !!vue.getCurrentInstance();
    const oldConfig = inSetup ? useGlobalConfig() : void 0;
    const provideFn = (_a2 = void 0) != null ? _a2 : inSetup ? vue.provide : void 0;
    if (!provideFn) {
      return;
    }
    const context = vue.computed(() => {
      const cfg = vue.unref(config);
      if (!(oldConfig == null ? void 0 : oldConfig.value))
        return cfg;
      return mergeConfig(oldConfig.value, cfg);
    });
    provideFn(configProviderContextKey, context);
    provideFn(localeContextKey, vue.computed(() => context.value.locale));
    provideFn(namespaceContextKey, vue.computed(() => context.value.namespace));
    provideFn(zIndexContextKey, vue.computed(() => context.value.zIndex));
    provideFn(SIZE_INJECTION_KEY, {
      size: vue.computed(() => context.value.size || "")
    });
    if (global2 || !globalConfig.value) {
      globalConfig.value = context.value;
    }
    return context;
  };
  const mergeConfig = (a, b) => {
    const keys = [.../* @__PURE__ */ new Set([...keysOf(a), ...keysOf(b)])];
    const obj = {};
    for (const key of keys) {
      obj[key] = b[key] !== void 0 ? b[key] : a[key];
    }
    return obj;
  };
  var _export_sfc$1 = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const iconProps = buildProps({
    size: {
      type: definePropType([Number, String])
    },
    color: {
      type: String
    }
  });
  const __default__$5 = vue.defineComponent({
    name: "ElIcon",
    inheritAttrs: false
  });
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
    ...__default__$5,
    props: iconProps,
    setup(__props) {
      const props = __props;
      const ns = useNamespace("icon");
      const style = vue.computed(() => {
        const { size, color } = props;
        if (!size && !color)
          return {};
        return {
          fontSize: isUndefined(size) ? void 0 : addUnit(size),
          "--color": color
        };
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("i", vue.mergeProps({
          class: vue.unref(ns).b(),
          style: vue.unref(style)
        }, _ctx.$attrs), [
          vue.renderSlot(_ctx.$slots, "default")
        ], 16);
      };
    }
  });
  var Icon = /* @__PURE__ */ _export_sfc$1(_sfc_main$7, [["__file", "icon.vue"]]);
  const ElIcon = withInstall(Icon);
  const formContextKey = Symbol("formContextKey");
  const formItemContextKey = Symbol("formItemContextKey");
  const useFormSize = (fallback, ignore = {}) => {
    const emptyRef = vue.ref(void 0);
    const size = ignore.prop ? emptyRef : useProp("size");
    const globalConfig2 = ignore.global ? emptyRef : useGlobalSize();
    const form = ignore.form ? { size: void 0 } : vue.inject(formContextKey, void 0);
    const formItem = ignore.formItem ? { size: void 0 } : vue.inject(formItemContextKey, void 0);
    return vue.computed(() => size.value || vue.unref(fallback) || (formItem == null ? void 0 : formItem.size) || (form == null ? void 0 : form.size) || globalConfig2.value || "");
  };
  const useFormDisabled = (fallback) => {
    const disabled = useProp("disabled");
    const form = vue.inject(formContextKey, void 0);
    return vue.computed(() => disabled.value || vue.unref(fallback) || (form == null ? void 0 : form.disabled) || false);
  };
  const useFormItem = () => {
    const form = vue.inject(formContextKey, void 0);
    const formItem = vue.inject(formItemContextKey, void 0);
    return {
      form,
      formItem
    };
  };
  const useFormItemInputId = (props, {
    formItemContext,
    disableIdGeneration,
    disableIdManagement
  }) => {
    if (!disableIdGeneration) {
      disableIdGeneration = vue.ref(false);
    }
    if (!disableIdManagement) {
      disableIdManagement = vue.ref(false);
    }
    const inputId = vue.ref();
    let idUnwatch = void 0;
    const isLabeledByFormItem = vue.computed(() => {
      var _a2;
      return !!(!(props.label || props.ariaLabel) && formItemContext && formItemContext.inputIds && ((_a2 = formItemContext.inputIds) == null ? void 0 : _a2.length) <= 1);
    });
    vue.onMounted(() => {
      idUnwatch = vue.watch([vue.toRef(props, "id"), disableIdGeneration], ([id, disableIdGeneration2]) => {
        const newId = id != null ? id : !disableIdGeneration2 ? useId().value : void 0;
        if (newId !== inputId.value) {
          if (formItemContext == null ? void 0 : formItemContext.removeInputId) {
            inputId.value && formItemContext.removeInputId(inputId.value);
            if (!(disableIdManagement == null ? void 0 : disableIdManagement.value) && !disableIdGeneration2 && newId) {
              formItemContext.addInputId(newId);
            }
          }
          inputId.value = newId;
        }
      }, { immediate: true });
    });
    vue.onUnmounted(() => {
      idUnwatch && idUnwatch();
      if (formItemContext == null ? void 0 : formItemContext.removeInputId) {
        inputId.value && formItemContext.removeInputId(inputId.value);
      }
    });
    return {
      isLabeledByFormItem,
      inputId
    };
  };
  let hiddenTextarea = void 0;
  const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  ${isFirefox() ? "" : "overflow:hidden !important;"}
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`;
  const CONTEXT_STYLE = [
    "letter-spacing",
    "line-height",
    "padding-top",
    "padding-bottom",
    "font-family",
    "font-weight",
    "font-size",
    "text-rendering",
    "text-transform",
    "width",
    "text-indent",
    "padding-left",
    "padding-right",
    "border-width",
    "box-sizing"
  ];
  function calculateNodeStyling(targetElement) {
    const style = window.getComputedStyle(targetElement);
    const boxSizing = style.getPropertyValue("box-sizing");
    const paddingSize = Number.parseFloat(style.getPropertyValue("padding-bottom")) + Number.parseFloat(style.getPropertyValue("padding-top"));
    const borderSize = Number.parseFloat(style.getPropertyValue("border-bottom-width")) + Number.parseFloat(style.getPropertyValue("border-top-width"));
    const contextStyle = CONTEXT_STYLE.map((name) => `${name}:${style.getPropertyValue(name)}`).join(";");
    return { contextStyle, paddingSize, borderSize, boxSizing };
  }
  function calcTextareaHeight(targetElement, minRows = 1, maxRows) {
    var _a2;
    if (!hiddenTextarea) {
      hiddenTextarea = document.createElement("textarea");
      document.body.appendChild(hiddenTextarea);
    }
    const { paddingSize, borderSize, boxSizing, contextStyle } = calculateNodeStyling(targetElement);
    hiddenTextarea.setAttribute("style", `${contextStyle};${HIDDEN_STYLE}`);
    hiddenTextarea.value = targetElement.value || targetElement.placeholder || "";
    let height = hiddenTextarea.scrollHeight;
    const result = {};
    if (boxSizing === "border-box") {
      height = height + borderSize;
    } else if (boxSizing === "content-box") {
      height = height - paddingSize;
    }
    hiddenTextarea.value = "";
    const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
    if (isNumber(minRows)) {
      let minHeight = singleRowHeight * minRows;
      if (boxSizing === "border-box") {
        minHeight = minHeight + paddingSize + borderSize;
      }
      height = Math.max(minHeight, height);
      result.minHeight = `${minHeight}px`;
    }
    if (isNumber(maxRows)) {
      let maxHeight = singleRowHeight * maxRows;
      if (boxSizing === "border-box") {
        maxHeight = maxHeight + paddingSize + borderSize;
      }
      height = Math.min(maxHeight, height);
    }
    result.height = `${height}px`;
    (_a2 = hiddenTextarea.parentNode) == null ? void 0 : _a2.removeChild(hiddenTextarea);
    hiddenTextarea = void 0;
    return result;
  }
  const inputProps = buildProps({
    id: {
      type: String,
      default: void 0
    },
    size: useSizeProp,
    disabled: Boolean,
    modelValue: {
      type: definePropType([
        String,
        Number,
        Object
      ]),
      default: ""
    },
    maxlength: {
      type: [String, Number]
    },
    minlength: {
      type: [String, Number]
    },
    type: {
      type: String,
      default: "text"
    },
    resize: {
      type: String,
      values: ["none", "both", "horizontal", "vertical"]
    },
    autosize: {
      type: definePropType([Boolean, Object]),
      default: false
    },
    autocomplete: {
      type: String,
      default: "off"
    },
    formatter: {
      type: Function
    },
    parser: {
      type: Function
    },
    placeholder: {
      type: String
    },
    form: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    suffixIcon: {
      type: iconPropType
    },
    prefixIcon: {
      type: iconPropType
    },
    containerRole: {
      type: String,
      default: void 0
    },
    label: {
      type: String,
      default: void 0
    },
    tabindex: {
      type: [String, Number],
      default: 0
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    inputStyle: {
      type: definePropType([Object, Array, String]),
      default: () => mutable({})
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    ...useAriaProps(["ariaLabel"])
  });
  const inputEmits = {
    [UPDATE_MODEL_EVENT]: (value) => isString(value),
    input: (value) => isString(value),
    change: (value) => isString(value),
    focus: (evt) => evt instanceof FocusEvent,
    blur: (evt) => evt instanceof FocusEvent,
    clear: () => true,
    mouseleave: (evt) => evt instanceof MouseEvent,
    mouseenter: (evt) => evt instanceof MouseEvent,
    keydown: (evt) => evt instanceof Event,
    compositionstart: (evt) => evt instanceof CompositionEvent,
    compositionupdate: (evt) => evt instanceof CompositionEvent,
    compositionend: (evt) => evt instanceof CompositionEvent
  };
  const _hoisted_1$3 = ["role"];
  const _hoisted_2$2 = ["id", "minlength", "maxlength", "type", "disabled", "readonly", "autocomplete", "tabindex", "aria-label", "placeholder", "form", "autofocus"];
  const _hoisted_3$2 = ["id", "minlength", "maxlength", "tabindex", "disabled", "readonly", "autocomplete", "aria-label", "placeholder", "form", "autofocus"];
  const __default__$4 = vue.defineComponent({
    name: "ElInput",
    inheritAttrs: false
  });
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
    ...__default__$4,
    props: inputProps,
    emits: inputEmits,
    setup(__props, { expose, emit }) {
      const props = __props;
      const rawAttrs = vue.useAttrs();
      const slots = vue.useSlots();
      const containerAttrs = vue.computed(() => {
        const comboBoxAttrs = {};
        if (props.containerRole === "combobox") {
          comboBoxAttrs["aria-haspopup"] = rawAttrs["aria-haspopup"];
          comboBoxAttrs["aria-owns"] = rawAttrs["aria-owns"];
          comboBoxAttrs["aria-expanded"] = rawAttrs["aria-expanded"];
        }
        return comboBoxAttrs;
      });
      const containerKls = vue.computed(() => [
        props.type === "textarea" ? nsTextarea.b() : nsInput.b(),
        nsInput.m(inputSize.value),
        nsInput.is("disabled", inputDisabled.value),
        nsInput.is("exceed", inputExceed.value),
        {
          [nsInput.b("group")]: slots.prepend || slots.append,
          [nsInput.bm("group", "append")]: slots.append,
          [nsInput.bm("group", "prepend")]: slots.prepend,
          [nsInput.m("prefix")]: slots.prefix || props.prefixIcon,
          [nsInput.m("suffix")]: slots.suffix || props.suffixIcon || props.clearable || props.showPassword,
          [nsInput.bm("suffix", "password-clear")]: showClear.value && showPwdVisible.value,
          [nsInput.b("hidden")]: props.type === "hidden"
        },
        rawAttrs.class
      ]);
      const wrapperKls = vue.computed(() => [
        nsInput.e("wrapper"),
        nsInput.is("focus", isFocused.value)
      ]);
      const attrs = useAttrs({
        excludeKeys: vue.computed(() => {
          return Object.keys(containerAttrs.value);
        })
      });
      const { form: elForm, formItem: elFormItem } = useFormItem();
      const { inputId } = useFormItemInputId(props, {
        formItemContext: elFormItem
      });
      const inputSize = useFormSize();
      const inputDisabled = useFormDisabled();
      const nsInput = useNamespace("input");
      const nsTextarea = useNamespace("textarea");
      const input = vue.shallowRef();
      const textarea = vue.shallowRef();
      const hovering = vue.ref(false);
      const isComposing = vue.ref(false);
      const passwordVisible = vue.ref(false);
      const countStyle = vue.ref();
      const textareaCalcStyle = vue.shallowRef(props.inputStyle);
      const _ref = vue.computed(() => input.value || textarea.value);
      const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(_ref, {
        afterBlur() {
          var _a2;
          if (props.validateEvent) {
            (_a2 = elFormItem == null ? void 0 : elFormItem.validate) == null ? void 0 : _a2.call(elFormItem, "blur").catch((err) => debugWarn());
          }
        }
      });
      const needStatusIcon = vue.computed(() => {
        var _a2;
        return (_a2 = elForm == null ? void 0 : elForm.statusIcon) != null ? _a2 : false;
      });
      const validateState = vue.computed(() => (elFormItem == null ? void 0 : elFormItem.validateState) || "");
      const validateIcon = vue.computed(() => validateState.value && ValidateComponentsMap[validateState.value]);
      const passwordIcon = vue.computed(() => passwordVisible.value ? view_default : hide_default);
      const containerStyle = vue.computed(() => [
        rawAttrs.style
      ]);
      const textareaStyle = vue.computed(() => [
        props.inputStyle,
        textareaCalcStyle.value,
        { resize: props.resize }
      ]);
      const nativeInputValue = vue.computed(() => isNil(props.modelValue) ? "" : String(props.modelValue));
      const showClear = vue.computed(() => props.clearable && !inputDisabled.value && !props.readonly && !!nativeInputValue.value && (isFocused.value || hovering.value));
      const showPwdVisible = vue.computed(() => props.showPassword && !inputDisabled.value && !props.readonly && !!nativeInputValue.value && (!!nativeInputValue.value || isFocused.value));
      const isWordLimitVisible = vue.computed(() => props.showWordLimit && !!props.maxlength && (props.type === "text" || props.type === "textarea") && !inputDisabled.value && !props.readonly && !props.showPassword);
      const textLength = vue.computed(() => nativeInputValue.value.length);
      const inputExceed = vue.computed(() => !!isWordLimitVisible.value && textLength.value > Number(props.maxlength));
      const suffixVisible = vue.computed(() => !!slots.suffix || !!props.suffixIcon || showClear.value || props.showPassword || isWordLimitVisible.value || !!validateState.value && needStatusIcon.value);
      const [recordCursor, setCursor] = useCursor(input);
      useResizeObserver(textarea, (entries) => {
        onceInitSizeTextarea();
        if (!isWordLimitVisible.value || props.resize !== "both")
          return;
        const entry = entries[0];
        const { width } = entry.contentRect;
        countStyle.value = {
          right: `calc(100% - ${width + 15 + 6}px)`
        };
      });
      const resizeTextarea = () => {
        const { type, autosize } = props;
        if (!isClient || type !== "textarea" || !textarea.value)
          return;
        if (autosize) {
          const minRows = isObject$1(autosize) ? autosize.minRows : void 0;
          const maxRows = isObject$1(autosize) ? autosize.maxRows : void 0;
          const textareaStyle2 = calcTextareaHeight(textarea.value, minRows, maxRows);
          textareaCalcStyle.value = {
            overflowY: "hidden",
            ...textareaStyle2
          };
          vue.nextTick(() => {
            textarea.value.offsetHeight;
            textareaCalcStyle.value = textareaStyle2;
          });
        } else {
          textareaCalcStyle.value = {
            minHeight: calcTextareaHeight(textarea.value).minHeight
          };
        }
      };
      const createOnceInitResize = (resizeTextarea2) => {
        let isInit = false;
        return () => {
          var _a2;
          if (isInit || !props.autosize)
            return;
          const isElHidden = ((_a2 = textarea.value) == null ? void 0 : _a2.offsetParent) === null;
          if (!isElHidden) {
            resizeTextarea2();
            isInit = true;
          }
        };
      };
      const onceInitSizeTextarea = createOnceInitResize(resizeTextarea);
      const setNativeInputValue = () => {
        const input2 = _ref.value;
        const formatterValue = props.formatter ? props.formatter(nativeInputValue.value) : nativeInputValue.value;
        if (!input2 || input2.value === formatterValue)
          return;
        input2.value = formatterValue;
      };
      const handleInput = async (event) => {
        recordCursor();
        let { value } = event.target;
        if (props.formatter) {
          value = props.parser ? props.parser(value) : value;
        }
        if (isComposing.value)
          return;
        if (value === nativeInputValue.value) {
          setNativeInputValue();
          return;
        }
        emit(UPDATE_MODEL_EVENT, value);
        emit("input", value);
        await vue.nextTick();
        setNativeInputValue();
        setCursor();
      };
      const handleChange = (event) => {
        emit("change", event.target.value);
      };
      const handleCompositionStart = (event) => {
        emit("compositionstart", event);
        isComposing.value = true;
      };
      const handleCompositionUpdate = (event) => {
        var _a2;
        emit("compositionupdate", event);
        const text = (_a2 = event.target) == null ? void 0 : _a2.value;
        const lastCharacter = text[text.length - 1] || "";
        isComposing.value = !isKorean(lastCharacter);
      };
      const handleCompositionEnd = (event) => {
        emit("compositionend", event);
        if (isComposing.value) {
          isComposing.value = false;
          handleInput(event);
        }
      };
      const handlePasswordVisible = () => {
        passwordVisible.value = !passwordVisible.value;
        focus();
      };
      const focus = async () => {
        var _a2;
        await vue.nextTick();
        (_a2 = _ref.value) == null ? void 0 : _a2.focus();
      };
      const blur = () => {
        var _a2;
        return (_a2 = _ref.value) == null ? void 0 : _a2.blur();
      };
      const handleMouseLeave = (evt) => {
        hovering.value = false;
        emit("mouseleave", evt);
      };
      const handleMouseEnter = (evt) => {
        hovering.value = true;
        emit("mouseenter", evt);
      };
      const handleKeydown = (evt) => {
        emit("keydown", evt);
      };
      const select = () => {
        var _a2;
        (_a2 = _ref.value) == null ? void 0 : _a2.select();
      };
      const clear = () => {
        emit(UPDATE_MODEL_EVENT, "");
        emit("change", "");
        emit("clear");
        emit("input", "");
      };
      vue.watch(() => props.modelValue, () => {
        var _a2;
        vue.nextTick(() => resizeTextarea());
        if (props.validateEvent) {
          (_a2 = elFormItem == null ? void 0 : elFormItem.validate) == null ? void 0 : _a2.call(elFormItem, "change").catch((err) => debugWarn());
        }
      });
      vue.watch(nativeInputValue, () => setNativeInputValue());
      vue.watch(() => props.type, async () => {
        await vue.nextTick();
        setNativeInputValue();
        resizeTextarea();
      });
      vue.onMounted(() => {
        if (!props.formatter && props.parser)
          ;
        setNativeInputValue();
        vue.nextTick(resizeTextarea);
      });
      useDeprecated({
        from: "label",
        replacement: "aria-label",
        version: "2.8.0",
        scope: "el-input",
        ref: "https://element-plus.org/en-US/component/input.html"
      }, vue.computed(() => !!props.label));
      expose({
        input,
        textarea,
        ref: _ref,
        textareaStyle,
        autosize: vue.toRef(props, "autosize"),
        focus,
        blur,
        select,
        clear,
        resizeTextarea
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps(vue.unref(containerAttrs), {
          class: vue.unref(containerKls),
          style: vue.unref(containerStyle),
          role: _ctx.containerRole,
          onMouseenter: handleMouseEnter,
          onMouseleave: handleMouseLeave
        }), [
          vue.createCommentVNode(" input "),
          _ctx.type !== "textarea" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
            vue.createCommentVNode(" prepend slot "),
            _ctx.$slots.prepend ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 0,
              class: vue.normalizeClass(vue.unref(nsInput).be("group", "prepend"))
            }, [
              vue.renderSlot(_ctx.$slots, "prepend")
            ], 2)) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("div", {
              ref_key: "wrapperRef",
              ref: wrapperRef,
              class: vue.normalizeClass(vue.unref(wrapperKls))
            }, [
              vue.createCommentVNode(" prefix slot "),
              _ctx.$slots.prefix || _ctx.prefixIcon ? (vue.openBlock(), vue.createElementBlock("span", {
                key: 0,
                class: vue.normalizeClass(vue.unref(nsInput).e("prefix"))
              }, [
                vue.createElementVNode("span", {
                  class: vue.normalizeClass(vue.unref(nsInput).e("prefix-inner"))
                }, [
                  vue.renderSlot(_ctx.$slots, "prefix"),
                  _ctx.prefixIcon ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                    key: 0,
                    class: vue.normalizeClass(vue.unref(nsInput).e("icon"))
                  }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.prefixIcon)))
                    ]),
                    _: 1
                  }, 8, ["class"])) : vue.createCommentVNode("v-if", true)
                ], 2)
              ], 2)) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("input", vue.mergeProps({
                id: vue.unref(inputId),
                ref_key: "input",
                ref: input,
                class: vue.unref(nsInput).e("inner")
              }, vue.unref(attrs), {
                minlength: _ctx.minlength,
                maxlength: _ctx.maxlength,
                type: _ctx.showPassword ? passwordVisible.value ? "text" : "password" : _ctx.type,
                disabled: vue.unref(inputDisabled),
                readonly: _ctx.readonly,
                autocomplete: _ctx.autocomplete,
                tabindex: _ctx.tabindex,
                "aria-label": _ctx.label || _ctx.ariaLabel,
                placeholder: _ctx.placeholder,
                style: _ctx.inputStyle,
                form: _ctx.form,
                autofocus: _ctx.autofocus,
                onCompositionstart: handleCompositionStart,
                onCompositionupdate: handleCompositionUpdate,
                onCompositionend: handleCompositionEnd,
                onInput: handleInput,
                onFocus: _cache[0] || (_cache[0] = (...args) => vue.unref(handleFocus) && vue.unref(handleFocus)(...args)),
                onBlur: _cache[1] || (_cache[1] = (...args) => vue.unref(handleBlur) && vue.unref(handleBlur)(...args)),
                onChange: handleChange,
                onKeydown: handleKeydown
              }), null, 16, _hoisted_2$2),
              vue.createCommentVNode(" suffix slot "),
              vue.unref(suffixVisible) ? (vue.openBlock(), vue.createElementBlock("span", {
                key: 1,
                class: vue.normalizeClass(vue.unref(nsInput).e("suffix"))
              }, [
                vue.createElementVNode("span", {
                  class: vue.normalizeClass(vue.unref(nsInput).e("suffix-inner"))
                }, [
                  !vue.unref(showClear) || !vue.unref(showPwdVisible) || !vue.unref(isWordLimitVisible) ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                    vue.renderSlot(_ctx.$slots, "suffix"),
                    _ctx.suffixIcon ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                      key: 0,
                      class: vue.normalizeClass(vue.unref(nsInput).e("icon"))
                    }, {
                      default: vue.withCtx(() => [
                        (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.suffixIcon)))
                      ]),
                      _: 1
                    }, 8, ["class"])) : vue.createCommentVNode("v-if", true)
                  ], 64)) : vue.createCommentVNode("v-if", true),
                  vue.unref(showClear) ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                    key: 1,
                    class: vue.normalizeClass([vue.unref(nsInput).e("icon"), vue.unref(nsInput).e("clear")]),
                    onMousedown: vue.withModifiers(vue.unref(NOOP), ["prevent"]),
                    onClick: clear
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(vue.unref(circle_close_default))
                    ]),
                    _: 1
                  }, 8, ["class", "onMousedown"])) : vue.createCommentVNode("v-if", true),
                  vue.unref(showPwdVisible) ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                    key: 2,
                    class: vue.normalizeClass([vue.unref(nsInput).e("icon"), vue.unref(nsInput).e("password")]),
                    onClick: handlePasswordVisible
                  }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(passwordIcon))))
                    ]),
                    _: 1
                  }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
                  vue.unref(isWordLimitVisible) ? (vue.openBlock(), vue.createElementBlock("span", {
                    key: 3,
                    class: vue.normalizeClass(vue.unref(nsInput).e("count"))
                  }, [
                    vue.createElementVNode("span", {
                      class: vue.normalizeClass(vue.unref(nsInput).e("count-inner"))
                    }, vue.toDisplayString(vue.unref(textLength)) + " / " + vue.toDisplayString(_ctx.maxlength), 3)
                  ], 2)) : vue.createCommentVNode("v-if", true),
                  vue.unref(validateState) && vue.unref(validateIcon) && vue.unref(needStatusIcon) ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                    key: 4,
                    class: vue.normalizeClass([
                      vue.unref(nsInput).e("icon"),
                      vue.unref(nsInput).e("validateIcon"),
                      vue.unref(nsInput).is("loading", vue.unref(validateState) === "validating")
                    ])
                  }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(validateIcon))))
                    ]),
                    _: 1
                  }, 8, ["class"])) : vue.createCommentVNode("v-if", true)
                ], 2)
              ], 2)) : vue.createCommentVNode("v-if", true)
            ], 2),
            vue.createCommentVNode(" append slot "),
            _ctx.$slots.append ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 1,
              class: vue.normalizeClass(vue.unref(nsInput).be("group", "append"))
            }, [
              vue.renderSlot(_ctx.$slots, "append")
            ], 2)) : vue.createCommentVNode("v-if", true)
          ], 64)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
            vue.createCommentVNode(" textarea "),
            vue.createElementVNode("textarea", vue.mergeProps({
              id: vue.unref(inputId),
              ref_key: "textarea",
              ref: textarea,
              class: vue.unref(nsTextarea).e("inner")
            }, vue.unref(attrs), {
              minlength: _ctx.minlength,
              maxlength: _ctx.maxlength,
              tabindex: _ctx.tabindex,
              disabled: vue.unref(inputDisabled),
              readonly: _ctx.readonly,
              autocomplete: _ctx.autocomplete,
              style: vue.unref(textareaStyle),
              "aria-label": _ctx.label || _ctx.ariaLabel,
              placeholder: _ctx.placeholder,
              form: _ctx.form,
              autofocus: _ctx.autofocus,
              onCompositionstart: handleCompositionStart,
              onCompositionupdate: handleCompositionUpdate,
              onCompositionend: handleCompositionEnd,
              onInput: handleInput,
              onFocus: _cache[2] || (_cache[2] = (...args) => vue.unref(handleFocus) && vue.unref(handleFocus)(...args)),
              onBlur: _cache[3] || (_cache[3] = (...args) => vue.unref(handleBlur) && vue.unref(handleBlur)(...args)),
              onChange: handleChange,
              onKeydown: handleKeydown
            }), null, 16, _hoisted_3$2),
            vue.unref(isWordLimitVisible) ? (vue.openBlock(), vue.createElementBlock("span", {
              key: 0,
              style: vue.normalizeStyle(countStyle.value),
              class: vue.normalizeClass(vue.unref(nsInput).e("count"))
            }, vue.toDisplayString(vue.unref(textLength)) + " / " + vue.toDisplayString(_ctx.maxlength), 7)) : vue.createCommentVNode("v-if", true)
          ], 64))
        ], 16, _hoisted_1$3);
      };
    }
  });
  var Input = /* @__PURE__ */ _export_sfc$1(_sfc_main$6, [["__file", "input.vue"]]);
  const ElInput = withInstall(Input);
  const FOCUS_AFTER_TRAPPED = "focus-trap.focus-after-trapped";
  const FOCUS_AFTER_RELEASED = "focus-trap.focus-after-released";
  const FOCUSOUT_PREVENTED = "focus-trap.focusout-prevented";
  const FOCUS_AFTER_TRAPPED_OPTS = {
    cancelable: true,
    bubbles: false
  };
  const FOCUSOUT_PREVENTED_OPTS = {
    cancelable: true,
    bubbles: false
  };
  const ON_TRAP_FOCUS_EVT = "focusAfterTrapped";
  const ON_RELEASE_FOCUS_EVT = "focusAfterReleased";
  const FOCUS_TRAP_INJECTION_KEY = Symbol("elFocusTrap");
  const focusReason = vue.ref();
  const lastUserFocusTimestamp = vue.ref(0);
  const lastAutomatedFocusTimestamp = vue.ref(0);
  let focusReasonUserCount = 0;
  const obtainAllFocusableElements = (element) => {
    const nodes = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (node) => {
        const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
        if (node.disabled || node.hidden || isHiddenInput)
          return NodeFilter.FILTER_SKIP;
        return node.tabIndex >= 0 || node === document.activeElement ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    while (walker.nextNode())
      nodes.push(walker.currentNode);
    return nodes;
  };
  const getVisibleElement = (elements, container) => {
    for (const element of elements) {
      if (!isHidden(element, container))
        return element;
    }
  };
  const isHidden = (element, container) => {
    if (getComputedStyle(element).visibility === "hidden")
      return true;
    while (element) {
      if (container && element === container)
        return false;
      if (getComputedStyle(element).display === "none")
        return true;
      element = element.parentElement;
    }
    return false;
  };
  const getEdges = (container) => {
    const focusable = obtainAllFocusableElements(container);
    const first = getVisibleElement(focusable, container);
    const last = getVisibleElement(focusable.reverse(), container);
    return [first, last];
  };
  const isSelectable = (element) => {
    return element instanceof HTMLInputElement && "select" in element;
  };
  const tryFocus = (element, shouldSelect) => {
    if (element && element.focus) {
      const prevFocusedElement = document.activeElement;
      element.focus({ preventScroll: true });
      lastAutomatedFocusTimestamp.value = window.performance.now();
      if (element !== prevFocusedElement && isSelectable(element) && shouldSelect) {
        element.select();
      }
    }
  };
  function removeFromStack(list, item) {
    const copy = [...list];
    const idx = list.indexOf(item);
    if (idx !== -1) {
      copy.splice(idx, 1);
    }
    return copy;
  }
  const createFocusableStack = () => {
    let stack = [];
    const push = (layer) => {
      const currentLayer = stack[0];
      if (currentLayer && layer !== currentLayer) {
        currentLayer.pause();
      }
      stack = removeFromStack(stack, layer);
      stack.unshift(layer);
    };
    const remove = (layer) => {
      var _a2, _b;
      stack = removeFromStack(stack, layer);
      (_b = (_a2 = stack[0]) == null ? void 0 : _a2.resume) == null ? void 0 : _b.call(_a2);
    };
    return {
      push,
      remove
    };
  };
  const focusFirstDescendant = (elements, shouldSelect = false) => {
    const prevFocusedElement = document.activeElement;
    for (const element of elements) {
      tryFocus(element, shouldSelect);
      if (document.activeElement !== prevFocusedElement)
        return;
    }
  };
  const focusableStack = createFocusableStack();
  const isFocusCausedByUserEvent = () => {
    return lastUserFocusTimestamp.value > lastAutomatedFocusTimestamp.value;
  };
  const notifyFocusReasonPointer = () => {
    focusReason.value = "pointer";
    lastUserFocusTimestamp.value = window.performance.now();
  };
  const notifyFocusReasonKeydown = () => {
    focusReason.value = "keyboard";
    lastUserFocusTimestamp.value = window.performance.now();
  };
  const useFocusReason = () => {
    vue.onMounted(() => {
      if (focusReasonUserCount === 0) {
        document.addEventListener("mousedown", notifyFocusReasonPointer);
        document.addEventListener("touchstart", notifyFocusReasonPointer);
        document.addEventListener("keydown", notifyFocusReasonKeydown);
      }
      focusReasonUserCount++;
    });
    vue.onBeforeUnmount(() => {
      focusReasonUserCount--;
      if (focusReasonUserCount <= 0) {
        document.removeEventListener("mousedown", notifyFocusReasonPointer);
        document.removeEventListener("touchstart", notifyFocusReasonPointer);
        document.removeEventListener("keydown", notifyFocusReasonKeydown);
      }
    });
    return {
      focusReason,
      lastUserFocusTimestamp,
      lastAutomatedFocusTimestamp
    };
  };
  const createFocusOutPreventedEvent = (detail) => {
    return new CustomEvent(FOCUSOUT_PREVENTED, {
      ...FOCUSOUT_PREVENTED_OPTS,
      detail
    });
  };
  const _sfc_main$5 = vue.defineComponent({
    name: "ElFocusTrap",
    inheritAttrs: false,
    props: {
      loop: Boolean,
      trapped: Boolean,
      focusTrapEl: Object,
      focusStartEl: {
        type: [Object, String],
        default: "first"
      }
    },
    emits: [
      ON_TRAP_FOCUS_EVT,
      ON_RELEASE_FOCUS_EVT,
      "focusin",
      "focusout",
      "focusout-prevented",
      "release-requested"
    ],
    setup(props, { emit }) {
      const forwardRef = vue.ref();
      let lastFocusBeforeTrapped;
      let lastFocusAfterTrapped;
      const { focusReason: focusReason2 } = useFocusReason();
      useEscapeKeydown((event) => {
        if (props.trapped && !focusLayer.paused) {
          emit("release-requested", event);
        }
      });
      const focusLayer = {
        paused: false,
        pause() {
          this.paused = true;
        },
        resume() {
          this.paused = false;
        }
      };
      const onKeydown = (e) => {
        if (!props.loop && !props.trapped)
          return;
        if (focusLayer.paused)
          return;
        const { key, altKey, ctrlKey, metaKey, currentTarget, shiftKey } = e;
        const { loop } = props;
        const isTabbing = key === EVENT_CODE.tab && !altKey && !ctrlKey && !metaKey;
        const currentFocusingEl = document.activeElement;
        if (isTabbing && currentFocusingEl) {
          const container = currentTarget;
          const [first, last] = getEdges(container);
          const isTabbable = first && last;
          if (!isTabbable) {
            if (currentFocusingEl === container) {
              const focusoutPreventedEvent = createFocusOutPreventedEvent({
                focusReason: focusReason2.value
              });
              emit("focusout-prevented", focusoutPreventedEvent);
              if (!focusoutPreventedEvent.defaultPrevented) {
                e.preventDefault();
              }
            }
          } else {
            if (!shiftKey && currentFocusingEl === last) {
              const focusoutPreventedEvent = createFocusOutPreventedEvent({
                focusReason: focusReason2.value
              });
              emit("focusout-prevented", focusoutPreventedEvent);
              if (!focusoutPreventedEvent.defaultPrevented) {
                e.preventDefault();
                if (loop)
                  tryFocus(first, true);
              }
            } else if (shiftKey && [first, container].includes(currentFocusingEl)) {
              const focusoutPreventedEvent = createFocusOutPreventedEvent({
                focusReason: focusReason2.value
              });
              emit("focusout-prevented", focusoutPreventedEvent);
              if (!focusoutPreventedEvent.defaultPrevented) {
                e.preventDefault();
                if (loop)
                  tryFocus(last, true);
              }
            }
          }
        }
      };
      vue.provide(FOCUS_TRAP_INJECTION_KEY, {
        focusTrapRef: forwardRef,
        onKeydown
      });
      vue.watch(() => props.focusTrapEl, (focusTrapEl) => {
        if (focusTrapEl) {
          forwardRef.value = focusTrapEl;
        }
      }, { immediate: true });
      vue.watch([forwardRef], ([forwardRef2], [oldForwardRef]) => {
        if (forwardRef2) {
          forwardRef2.addEventListener("keydown", onKeydown);
          forwardRef2.addEventListener("focusin", onFocusIn);
          forwardRef2.addEventListener("focusout", onFocusOut);
        }
        if (oldForwardRef) {
          oldForwardRef.removeEventListener("keydown", onKeydown);
          oldForwardRef.removeEventListener("focusin", onFocusIn);
          oldForwardRef.removeEventListener("focusout", onFocusOut);
        }
      });
      const trapOnFocus = (e) => {
        emit(ON_TRAP_FOCUS_EVT, e);
      };
      const releaseOnFocus = (e) => emit(ON_RELEASE_FOCUS_EVT, e);
      const onFocusIn = (e) => {
        const trapContainer = vue.unref(forwardRef);
        if (!trapContainer)
          return;
        const target = e.target;
        const relatedTarget = e.relatedTarget;
        const isFocusedInTrap = target && trapContainer.contains(target);
        if (!props.trapped) {
          const isPrevFocusedInTrap = relatedTarget && trapContainer.contains(relatedTarget);
          if (!isPrevFocusedInTrap) {
            lastFocusBeforeTrapped = relatedTarget;
          }
        }
        if (isFocusedInTrap)
          emit("focusin", e);
        if (focusLayer.paused)
          return;
        if (props.trapped) {
          if (isFocusedInTrap) {
            lastFocusAfterTrapped = target;
          } else {
            tryFocus(lastFocusAfterTrapped, true);
          }
        }
      };
      const onFocusOut = (e) => {
        const trapContainer = vue.unref(forwardRef);
        if (focusLayer.paused || !trapContainer)
          return;
        if (props.trapped) {
          const relatedTarget = e.relatedTarget;
          if (!isNil(relatedTarget) && !trapContainer.contains(relatedTarget)) {
            setTimeout(() => {
              if (!focusLayer.paused && props.trapped) {
                const focusoutPreventedEvent = createFocusOutPreventedEvent({
                  focusReason: focusReason2.value
                });
                emit("focusout-prevented", focusoutPreventedEvent);
                if (!focusoutPreventedEvent.defaultPrevented) {
                  tryFocus(lastFocusAfterTrapped, true);
                }
              }
            }, 0);
          }
        } else {
          const target = e.target;
          const isFocusedInTrap = target && trapContainer.contains(target);
          if (!isFocusedInTrap)
            emit("focusout", e);
        }
      };
      async function startTrap() {
        await vue.nextTick();
        const trapContainer = vue.unref(forwardRef);
        if (trapContainer) {
          focusableStack.push(focusLayer);
          const prevFocusedElement = trapContainer.contains(document.activeElement) ? lastFocusBeforeTrapped : document.activeElement;
          lastFocusBeforeTrapped = prevFocusedElement;
          const isPrevFocusContained = trapContainer.contains(prevFocusedElement);
          if (!isPrevFocusContained) {
            const focusEvent = new Event(FOCUS_AFTER_TRAPPED, FOCUS_AFTER_TRAPPED_OPTS);
            trapContainer.addEventListener(FOCUS_AFTER_TRAPPED, trapOnFocus);
            trapContainer.dispatchEvent(focusEvent);
            if (!focusEvent.defaultPrevented) {
              vue.nextTick(() => {
                let focusStartEl = props.focusStartEl;
                if (!isString(focusStartEl)) {
                  tryFocus(focusStartEl);
                  if (document.activeElement !== focusStartEl) {
                    focusStartEl = "first";
                  }
                }
                if (focusStartEl === "first") {
                  focusFirstDescendant(obtainAllFocusableElements(trapContainer), true);
                }
                if (document.activeElement === prevFocusedElement || focusStartEl === "container") {
                  tryFocus(trapContainer);
                }
              });
            }
          }
        }
      }
      function stopTrap() {
        const trapContainer = vue.unref(forwardRef);
        if (trapContainer) {
          trapContainer.removeEventListener(FOCUS_AFTER_TRAPPED, trapOnFocus);
          const releasedEvent = new CustomEvent(FOCUS_AFTER_RELEASED, {
            ...FOCUS_AFTER_TRAPPED_OPTS,
            detail: {
              focusReason: focusReason2.value
            }
          });
          trapContainer.addEventListener(FOCUS_AFTER_RELEASED, releaseOnFocus);
          trapContainer.dispatchEvent(releasedEvent);
          if (!releasedEvent.defaultPrevented && (focusReason2.value == "keyboard" || !isFocusCausedByUserEvent() || trapContainer.contains(document.activeElement))) {
            tryFocus(lastFocusBeforeTrapped != null ? lastFocusBeforeTrapped : document.body);
          }
          trapContainer.removeEventListener(FOCUS_AFTER_RELEASED, releaseOnFocus);
          focusableStack.remove(focusLayer);
        }
      }
      vue.onMounted(() => {
        if (props.trapped) {
          startTrap();
        }
        vue.watch(() => props.trapped, (trapped) => {
          if (trapped) {
            startTrap();
          } else {
            stopTrap();
          }
        });
      });
      vue.onBeforeUnmount(() => {
        if (props.trapped) {
          stopTrap();
        }
      });
      return {
        onKeydown
      };
    }
  });
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.renderSlot(_ctx.$slots, "default", { handleKeydown: _ctx.onKeydown });
  }
  var ElFocusTrap = /* @__PURE__ */ _export_sfc$1(_sfc_main$5, [["render", _sfc_render], ["__file", "focus-trap.vue"]]);
  const buttonGroupContextKey = Symbol("buttonGroupContextKey");
  const useButton = (props, emit) => {
    useDeprecated({
      from: "type.text",
      replacement: "link",
      version: "3.0.0",
      scope: "props",
      ref: "https://element-plus.org/en-US/component/button.html#button-attributes"
    }, vue.computed(() => props.type === "text"));
    const buttonGroupContext = vue.inject(buttonGroupContextKey, void 0);
    const globalConfig2 = useGlobalConfig("button");
    const { form } = useFormItem();
    const _size = useFormSize(vue.computed(() => buttonGroupContext == null ? void 0 : buttonGroupContext.size));
    const _disabled = useFormDisabled();
    const _ref = vue.ref();
    const slots = vue.useSlots();
    const _type = vue.computed(() => props.type || (buttonGroupContext == null ? void 0 : buttonGroupContext.type) || "");
    const autoInsertSpace = vue.computed(() => {
      var _a2, _b, _c;
      return (_c = (_b = props.autoInsertSpace) != null ? _b : (_a2 = globalConfig2.value) == null ? void 0 : _a2.autoInsertSpace) != null ? _c : false;
    });
    const _props = vue.computed(() => {
      if (props.tag === "button") {
        return {
          ariaDisabled: _disabled.value || props.loading,
          disabled: _disabled.value || props.loading,
          autofocus: props.autofocus,
          type: props.nativeType
        };
      }
      return {};
    });
    const shouldAddSpace = vue.computed(() => {
      var _a2;
      const defaultSlot = (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
      if (autoInsertSpace.value && (defaultSlot == null ? void 0 : defaultSlot.length) === 1) {
        const slot = defaultSlot[0];
        if ((slot == null ? void 0 : slot.type) === vue.Text) {
          const text = slot.children;
          return new RegExp("^\\p{Unified_Ideograph}{2}$", "u").test(text.trim());
        }
      }
      return false;
    });
    const handleClick = (evt) => {
      if (props.nativeType === "reset") {
        form == null ? void 0 : form.resetFields();
      }
      emit("click", evt);
    };
    return {
      _disabled,
      _size,
      _type,
      _ref,
      _props,
      shouldAddSpace,
      handleClick
    };
  };
  const buttonTypes = [
    "default",
    "primary",
    "success",
    "warning",
    "info",
    "danger",
    "text",
    ""
  ];
  const buttonNativeTypes = ["button", "submit", "reset"];
  const buttonProps = buildProps({
    size: useSizeProp,
    disabled: Boolean,
    type: {
      type: String,
      values: buttonTypes,
      default: ""
    },
    icon: {
      type: iconPropType
    },
    nativeType: {
      type: String,
      values: buttonNativeTypes,
      default: "button"
    },
    loading: Boolean,
    loadingIcon: {
      type: iconPropType,
      default: () => loading_default
    },
    plain: Boolean,
    text: Boolean,
    link: Boolean,
    bg: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean,
    color: String,
    dark: Boolean,
    autoInsertSpace: {
      type: Boolean,
      default: void 0
    },
    tag: {
      type: definePropType([String, Object]),
      default: "button"
    }
  });
  const buttonEmits = {
    click: (evt) => evt instanceof MouseEvent
  };
  function bound01(n, max) {
    if (isOnePointZero(n)) {
      n = "100%";
    }
    var isPercent = isPercentage(n);
    n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
    if (isPercent) {
      n = parseInt(String(n * max), 10) / 100;
    }
    if (Math.abs(n - max) < 1e-6) {
      return 1;
    }
    if (max === 360) {
      n = (n < 0 ? n % max + max : n % max) / parseFloat(String(max));
    } else {
      n = n % max / parseFloat(String(max));
    }
    return n;
  }
  function clamp01(val) {
    return Math.min(1, Math.max(0, val));
  }
  function isOnePointZero(n) {
    return typeof n === "string" && n.indexOf(".") !== -1 && parseFloat(n) === 1;
  }
  function isPercentage(n) {
    return typeof n === "string" && n.indexOf("%") !== -1;
  }
  function boundAlpha(a) {
    a = parseFloat(a);
    if (isNaN(a) || a < 0 || a > 1) {
      a = 1;
    }
    return a;
  }
  function convertToPercentage(n) {
    if (n <= 1) {
      return "".concat(Number(n) * 100, "%");
    }
    return n;
  }
  function pad2(c) {
    return c.length === 1 ? "0" + c : String(c);
  }
  function rgbToRgb(r, g, b) {
    return {
      r: bound01(r, 255) * 255,
      g: bound01(g, 255) * 255,
      b: bound01(b, 255) * 255
    };
  }
  function rgbToHsl(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h2 = 0;
    var s = 0;
    var l = (max + min) / 2;
    if (max === min) {
      s = 0;
      h2 = 0;
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h2 = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h2 = (b - r) / d + 2;
          break;
        case b:
          h2 = (r - g) / d + 4;
          break;
      }
      h2 /= 6;
    }
    return { h: h2, s, l };
  }
  function hue2rgb(p, q, t) {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return p + (q - p) * (6 * t);
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
  }
  function hslToRgb(h2, s, l) {
    var r;
    var g;
    var b;
    h2 = bound01(h2, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);
    if (s === 0) {
      g = l;
      b = l;
      r = l;
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h2 + 1 / 3);
      g = hue2rgb(p, q, h2);
      b = hue2rgb(p, q, h2 - 1 / 3);
    }
    return { r: r * 255, g: g * 255, b: b * 255 };
  }
  function rgbToHsv(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h2 = 0;
    var v = max;
    var d = max - min;
    var s = max === 0 ? 0 : d / max;
    if (max === min) {
      h2 = 0;
    } else {
      switch (max) {
        case r:
          h2 = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h2 = (b - r) / d + 2;
          break;
        case b:
          h2 = (r - g) / d + 4;
          break;
      }
      h2 /= 6;
    }
    return { h: h2, s, v };
  }
  function hsvToRgb(h2, s, v) {
    h2 = bound01(h2, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);
    var i = Math.floor(h2);
    var f = h2 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
    var mod = i % 6;
    var r = [v, q, p, p, t, v][mod];
    var g = [t, v, v, q, p, p][mod];
    var b = [p, p, t, v, v, q][mod];
    return { r: r * 255, g: g * 255, b: b * 255 };
  }
  function rgbToHex(r, g, b, allow3Char) {
    var hex = [
      pad2(Math.round(r).toString(16)),
      pad2(Math.round(g).toString(16)),
      pad2(Math.round(b).toString(16))
    ];
    if (allow3Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1))) {
      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }
    return hex.join("");
  }
  function rgbaToHex(r, g, b, a, allow4Char) {
    var hex = [
      pad2(Math.round(r).toString(16)),
      pad2(Math.round(g).toString(16)),
      pad2(Math.round(b).toString(16)),
      pad2(convertDecimalToHex(a))
    ];
    if (allow4Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1)) && hex[3].startsWith(hex[3].charAt(1))) {
      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }
    return hex.join("");
  }
  function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
  }
  function convertHexToDecimal(h2) {
    return parseIntFromHex(h2) / 255;
  }
  function parseIntFromHex(val) {
    return parseInt(val, 16);
  }
  function numberInputToObject(color) {
    return {
      r: color >> 16,
      g: (color & 65280) >> 8,
      b: color & 255
    };
  }
  var names = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    goldenrod: "#daa520",
    gold: "#ffd700",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavenderblush: "#fff0f5",
    lavender: "#e6e6fa",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
  };
  function inputToRGB(color) {
    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;
    if (typeof color === "string") {
      color = stringInputToObject(color);
    }
    if (typeof color === "object") {
      if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
        rgb = rgbToRgb(color.r, color.g, color.b);
        ok = true;
        format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
      } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
        s = convertToPercentage(color.s);
        v = convertToPercentage(color.v);
        rgb = hsvToRgb(color.h, s, v);
        ok = true;
        format = "hsv";
      } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
        s = convertToPercentage(color.s);
        l = convertToPercentage(color.l);
        rgb = hslToRgb(color.h, s, l);
        ok = true;
        format = "hsl";
      }
      if (Object.prototype.hasOwnProperty.call(color, "a")) {
        a = color.a;
      }
    }
    a = boundAlpha(a);
    return {
      ok,
      format: color.format || format,
      r: Math.min(255, Math.max(rgb.r, 0)),
      g: Math.min(255, Math.max(rgb.g, 0)),
      b: Math.min(255, Math.max(rgb.b, 0)),
      a
    };
  }
  var CSS_INTEGER = "[-\\+]?\\d+%?";
  var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
  var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
  var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
  var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
  var matchers = {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
    rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
    hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
    hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
    hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
    hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
  };
  function stringInputToObject(color) {
    color = color.trim().toLowerCase();
    if (color.length === 0) {
      return false;
    }
    var named = false;
    if (names[color]) {
      color = names[color];
      named = true;
    } else if (color === "transparent") {
      return { r: 0, g: 0, b: 0, a: 0, format: "name" };
    }
    var match = matchers.rgb.exec(color);
    if (match) {
      return { r: match[1], g: match[2], b: match[3] };
    }
    match = matchers.rgba.exec(color);
    if (match) {
      return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    match = matchers.hsl.exec(color);
    if (match) {
      return { h: match[1], s: match[2], l: match[3] };
    }
    match = matchers.hsla.exec(color);
    if (match) {
      return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    match = matchers.hsv.exec(color);
    if (match) {
      return { h: match[1], s: match[2], v: match[3] };
    }
    match = matchers.hsva.exec(color);
    if (match) {
      return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    match = matchers.hex8.exec(color);
    if (match) {
      return {
        r: parseIntFromHex(match[1]),
        g: parseIntFromHex(match[2]),
        b: parseIntFromHex(match[3]),
        a: convertHexToDecimal(match[4]),
        format: named ? "name" : "hex8"
      };
    }
    match = matchers.hex6.exec(color);
    if (match) {
      return {
        r: parseIntFromHex(match[1]),
        g: parseIntFromHex(match[2]),
        b: parseIntFromHex(match[3]),
        format: named ? "name" : "hex"
      };
    }
    match = matchers.hex4.exec(color);
    if (match) {
      return {
        r: parseIntFromHex(match[1] + match[1]),
        g: parseIntFromHex(match[2] + match[2]),
        b: parseIntFromHex(match[3] + match[3]),
        a: convertHexToDecimal(match[4] + match[4]),
        format: named ? "name" : "hex8"
      };
    }
    match = matchers.hex3.exec(color);
    if (match) {
      return {
        r: parseIntFromHex(match[1] + match[1]),
        g: parseIntFromHex(match[2] + match[2]),
        b: parseIntFromHex(match[3] + match[3]),
        format: named ? "name" : "hex"
      };
    }
    return false;
  }
  function isValidCSSUnit(color) {
    return Boolean(matchers.CSS_UNIT.exec(String(color)));
  }
  var TinyColor = (
    /** @class */
    function() {
      function TinyColor2(color, opts) {
        if (color === void 0) {
          color = "";
        }
        if (opts === void 0) {
          opts = {};
        }
        var _a2;
        if (color instanceof TinyColor2) {
          return color;
        }
        if (typeof color === "number") {
          color = numberInputToObject(color);
        }
        this.originalInput = color;
        var rgb = inputToRGB(color);
        this.originalInput = color;
        this.r = rgb.r;
        this.g = rgb.g;
        this.b = rgb.b;
        this.a = rgb.a;
        this.roundA = Math.round(100 * this.a) / 100;
        this.format = (_a2 = opts.format) !== null && _a2 !== void 0 ? _a2 : rgb.format;
        this.gradientType = opts.gradientType;
        if (this.r < 1) {
          this.r = Math.round(this.r);
        }
        if (this.g < 1) {
          this.g = Math.round(this.g);
        }
        if (this.b < 1) {
          this.b = Math.round(this.b);
        }
        this.isValid = rgb.ok;
      }
      TinyColor2.prototype.isDark = function() {
        return this.getBrightness() < 128;
      };
      TinyColor2.prototype.isLight = function() {
        return !this.isDark();
      };
      TinyColor2.prototype.getBrightness = function() {
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
      };
      TinyColor2.prototype.getLuminance = function() {
        var rgb = this.toRgb();
        var R;
        var G;
        var B;
        var RsRGB = rgb.r / 255;
        var GsRGB = rgb.g / 255;
        var BsRGB = rgb.b / 255;
        if (RsRGB <= 0.03928) {
          R = RsRGB / 12.92;
        } else {
          R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
        }
        if (GsRGB <= 0.03928) {
          G = GsRGB / 12.92;
        } else {
          G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
        }
        if (BsRGB <= 0.03928) {
          B = BsRGB / 12.92;
        } else {
          B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
        }
        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
      };
      TinyColor2.prototype.getAlpha = function() {
        return this.a;
      };
      TinyColor2.prototype.setAlpha = function(alpha) {
        this.a = boundAlpha(alpha);
        this.roundA = Math.round(100 * this.a) / 100;
        return this;
      };
      TinyColor2.prototype.isMonochrome = function() {
        var s = this.toHsl().s;
        return s === 0;
      };
      TinyColor2.prototype.toHsv = function() {
        var hsv = rgbToHsv(this.r, this.g, this.b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
      };
      TinyColor2.prototype.toHsvString = function() {
        var hsv = rgbToHsv(this.r, this.g, this.b);
        var h2 = Math.round(hsv.h * 360);
        var s = Math.round(hsv.s * 100);
        var v = Math.round(hsv.v * 100);
        return this.a === 1 ? "hsv(".concat(h2, ", ").concat(s, "%, ").concat(v, "%)") : "hsva(".concat(h2, ", ").concat(s, "%, ").concat(v, "%, ").concat(this.roundA, ")");
      };
      TinyColor2.prototype.toHsl = function() {
        var hsl = rgbToHsl(this.r, this.g, this.b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
      };
      TinyColor2.prototype.toHslString = function() {
        var hsl = rgbToHsl(this.r, this.g, this.b);
        var h2 = Math.round(hsl.h * 360);
        var s = Math.round(hsl.s * 100);
        var l = Math.round(hsl.l * 100);
        return this.a === 1 ? "hsl(".concat(h2, ", ").concat(s, "%, ").concat(l, "%)") : "hsla(".concat(h2, ", ").concat(s, "%, ").concat(l, "%, ").concat(this.roundA, ")");
      };
      TinyColor2.prototype.toHex = function(allow3Char) {
        if (allow3Char === void 0) {
          allow3Char = false;
        }
        return rgbToHex(this.r, this.g, this.b, allow3Char);
      };
      TinyColor2.prototype.toHexString = function(allow3Char) {
        if (allow3Char === void 0) {
          allow3Char = false;
        }
        return "#" + this.toHex(allow3Char);
      };
      TinyColor2.prototype.toHex8 = function(allow4Char) {
        if (allow4Char === void 0) {
          allow4Char = false;
        }
        return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
      };
      TinyColor2.prototype.toHex8String = function(allow4Char) {
        if (allow4Char === void 0) {
          allow4Char = false;
        }
        return "#" + this.toHex8(allow4Char);
      };
      TinyColor2.prototype.toHexShortString = function(allowShortChar) {
        if (allowShortChar === void 0) {
          allowShortChar = false;
        }
        return this.a === 1 ? this.toHexString(allowShortChar) : this.toHex8String(allowShortChar);
      };
      TinyColor2.prototype.toRgb = function() {
        return {
          r: Math.round(this.r),
          g: Math.round(this.g),
          b: Math.round(this.b),
          a: this.a
        };
      };
      TinyColor2.prototype.toRgbString = function() {
        var r = Math.round(this.r);
        var g = Math.round(this.g);
        var b = Math.round(this.b);
        return this.a === 1 ? "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")") : "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(this.roundA, ")");
      };
      TinyColor2.prototype.toPercentageRgb = function() {
        var fmt = function(x) {
          return "".concat(Math.round(bound01(x, 255) * 100), "%");
        };
        return {
          r: fmt(this.r),
          g: fmt(this.g),
          b: fmt(this.b),
          a: this.a
        };
      };
      TinyColor2.prototype.toPercentageRgbString = function() {
        var rnd = function(x) {
          return Math.round(bound01(x, 255) * 100);
        };
        return this.a === 1 ? "rgb(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%)") : "rgba(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%, ").concat(this.roundA, ")");
      };
      TinyColor2.prototype.toName = function() {
        if (this.a === 0) {
          return "transparent";
        }
        if (this.a < 1) {
          return false;
        }
        var hex = "#" + rgbToHex(this.r, this.g, this.b, false);
        for (var _i = 0, _a2 = Object.entries(names); _i < _a2.length; _i++) {
          var _b = _a2[_i], key = _b[0], value = _b[1];
          if (hex === value) {
            return key;
          }
        }
        return false;
      };
      TinyColor2.prototype.toString = function(format) {
        var formatSet = Boolean(format);
        format = format !== null && format !== void 0 ? format : this.format;
        var formattedString = false;
        var hasAlpha = this.a < 1 && this.a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format.startsWith("hex") || format === "name");
        if (needsAlphaFormat) {
          if (format === "name" && this.a === 0) {
            return this.toName();
          }
          return this.toRgbString();
        }
        if (format === "rgb") {
          formattedString = this.toRgbString();
        }
        if (format === "prgb") {
          formattedString = this.toPercentageRgbString();
        }
        if (format === "hex" || format === "hex6") {
          formattedString = this.toHexString();
        }
        if (format === "hex3") {
          formattedString = this.toHexString(true);
        }
        if (format === "hex4") {
          formattedString = this.toHex8String(true);
        }
        if (format === "hex8") {
          formattedString = this.toHex8String();
        }
        if (format === "name") {
          formattedString = this.toName();
        }
        if (format === "hsl") {
          formattedString = this.toHslString();
        }
        if (format === "hsv") {
          formattedString = this.toHsvString();
        }
        return formattedString || this.toHexString();
      };
      TinyColor2.prototype.toNumber = function() {
        return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
      };
      TinyColor2.prototype.clone = function() {
        return new TinyColor2(this.toString());
      };
      TinyColor2.prototype.lighten = function(amount) {
        if (amount === void 0) {
          amount = 10;
        }
        var hsl = this.toHsl();
        hsl.l += amount / 100;
        hsl.l = clamp01(hsl.l);
        return new TinyColor2(hsl);
      };
      TinyColor2.prototype.brighten = function(amount) {
        if (amount === void 0) {
          amount = 10;
        }
        var rgb = this.toRgb();
        rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
        rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
        rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
        return new TinyColor2(rgb);
      };
      TinyColor2.prototype.darken = function(amount) {
        if (amount === void 0) {
          amount = 10;
        }
        var hsl = this.toHsl();
        hsl.l -= amount / 100;
        hsl.l = clamp01(hsl.l);
        return new TinyColor2(hsl);
      };
      TinyColor2.prototype.tint = function(amount) {
        if (amount === void 0) {
          amount = 10;
        }
        return this.mix("white", amount);
      };
      TinyColor2.prototype.shade = function(amount) {
        if (amount === void 0) {
          amount = 10;
        }
        return this.mix("black", amount);
      };
      TinyColor2.prototype.desaturate = function(amount) {
        if (amount === void 0) {
          amount = 10;
        }
        var hsl = this.toHsl();
        hsl.s -= amount / 100;
        hsl.s = clamp01(hsl.s);
        return new TinyColor2(hsl);
      };
      TinyColor2.prototype.saturate = function(amount) {
        if (amount === void 0) {
          amount = 10;
        }
        var hsl = this.toHsl();
        hsl.s += amount / 100;
        hsl.s = clamp01(hsl.s);
        return new TinyColor2(hsl);
      };
      TinyColor2.prototype.greyscale = function() {
        return this.desaturate(100);
      };
      TinyColor2.prototype.spin = function(amount) {
        var hsl = this.toHsl();
        var hue = (hsl.h + amount) % 360;
        hsl.h = hue < 0 ? 360 + hue : hue;
        return new TinyColor2(hsl);
      };
      TinyColor2.prototype.mix = function(color, amount) {
        if (amount === void 0) {
          amount = 50;
        }
        var rgb1 = this.toRgb();
        var rgb2 = new TinyColor2(color).toRgb();
        var p = amount / 100;
        var rgba = {
          r: (rgb2.r - rgb1.r) * p + rgb1.r,
          g: (rgb2.g - rgb1.g) * p + rgb1.g,
          b: (rgb2.b - rgb1.b) * p + rgb1.b,
          a: (rgb2.a - rgb1.a) * p + rgb1.a
        };
        return new TinyColor2(rgba);
      };
      TinyColor2.prototype.analogous = function(results, slices) {
        if (results === void 0) {
          results = 6;
        }
        if (slices === void 0) {
          slices = 30;
        }
        var hsl = this.toHsl();
        var part = 360 / slices;
        var ret = [this];
        for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
          hsl.h = (hsl.h + part) % 360;
          ret.push(new TinyColor2(hsl));
        }
        return ret;
      };
      TinyColor2.prototype.complement = function() {
        var hsl = this.toHsl();
        hsl.h = (hsl.h + 180) % 360;
        return new TinyColor2(hsl);
      };
      TinyColor2.prototype.monochromatic = function(results) {
        if (results === void 0) {
          results = 6;
        }
        var hsv = this.toHsv();
        var h2 = hsv.h;
        var s = hsv.s;
        var v = hsv.v;
        var res = [];
        var modification = 1 / results;
        while (results--) {
          res.push(new TinyColor2({ h: h2, s, v }));
          v = (v + modification) % 1;
        }
        return res;
      };
      TinyColor2.prototype.splitcomplement = function() {
        var hsl = this.toHsl();
        var h2 = hsl.h;
        return [
          this,
          new TinyColor2({ h: (h2 + 72) % 360, s: hsl.s, l: hsl.l }),
          new TinyColor2({ h: (h2 + 216) % 360, s: hsl.s, l: hsl.l })
        ];
      };
      TinyColor2.prototype.onBackground = function(background) {
        var fg = this.toRgb();
        var bg = new TinyColor2(background).toRgb();
        var alpha = fg.a + bg.a * (1 - fg.a);
        return new TinyColor2({
          r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / alpha,
          g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / alpha,
          b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / alpha,
          a: alpha
        });
      };
      TinyColor2.prototype.triad = function() {
        return this.polyad(3);
      };
      TinyColor2.prototype.tetrad = function() {
        return this.polyad(4);
      };
      TinyColor2.prototype.polyad = function(n) {
        var hsl = this.toHsl();
        var h2 = hsl.h;
        var result = [this];
        var increment = 360 / n;
        for (var i = 1; i < n; i++) {
          result.push(new TinyColor2({ h: (h2 + i * increment) % 360, s: hsl.s, l: hsl.l }));
        }
        return result;
      };
      TinyColor2.prototype.equals = function(color) {
        return this.toRgbString() === new TinyColor2(color).toRgbString();
      };
      return TinyColor2;
    }()
  );
  function darken(color, amount = 20) {
    return color.mix("#141414", amount).toString();
  }
  function useButtonCustomStyle(props) {
    const _disabled = useFormDisabled();
    const ns = useNamespace("button");
    return vue.computed(() => {
      let styles = {};
      const buttonColor = props.color;
      if (buttonColor) {
        const color = new TinyColor(buttonColor);
        const activeBgColor = props.dark ? color.tint(20).toString() : darken(color, 20);
        if (props.plain) {
          styles = ns.cssVarBlock({
            "bg-color": props.dark ? darken(color, 90) : color.tint(90).toString(),
            "text-color": buttonColor,
            "border-color": props.dark ? darken(color, 50) : color.tint(50).toString(),
            "hover-text-color": `var(${ns.cssVarName("color-white")})`,
            "hover-bg-color": buttonColor,
            "hover-border-color": buttonColor,
            "active-bg-color": activeBgColor,
            "active-text-color": `var(${ns.cssVarName("color-white")})`,
            "active-border-color": activeBgColor
          });
          if (_disabled.value) {
            styles[ns.cssVarBlockName("disabled-bg-color")] = props.dark ? darken(color, 90) : color.tint(90).toString();
            styles[ns.cssVarBlockName("disabled-text-color")] = props.dark ? darken(color, 50) : color.tint(50).toString();
            styles[ns.cssVarBlockName("disabled-border-color")] = props.dark ? darken(color, 80) : color.tint(80).toString();
          }
        } else {
          const hoverBgColor = props.dark ? darken(color, 30) : color.tint(30).toString();
          const textColor = color.isDark() ? `var(${ns.cssVarName("color-white")})` : `var(${ns.cssVarName("color-black")})`;
          styles = ns.cssVarBlock({
            "bg-color": buttonColor,
            "text-color": textColor,
            "border-color": buttonColor,
            "hover-bg-color": hoverBgColor,
            "hover-text-color": textColor,
            "hover-border-color": hoverBgColor,
            "active-bg-color": activeBgColor,
            "active-border-color": activeBgColor
          });
          if (_disabled.value) {
            const disabledButtonColor = props.dark ? darken(color, 50) : color.tint(50).toString();
            styles[ns.cssVarBlockName("disabled-bg-color")] = disabledButtonColor;
            styles[ns.cssVarBlockName("disabled-text-color")] = props.dark ? "rgba(255, 255, 255, 0.5)" : `var(${ns.cssVarName("color-white")})`;
            styles[ns.cssVarBlockName("disabled-border-color")] = disabledButtonColor;
          }
        }
      }
      return styles;
    });
  }
  const __default__$3 = vue.defineComponent({
    name: "ElButton"
  });
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
    ...__default__$3,
    props: buttonProps,
    emits: buttonEmits,
    setup(__props, { expose, emit }) {
      const props = __props;
      const buttonStyle = useButtonCustomStyle(props);
      const ns = useNamespace("button");
      const { _ref, _size, _type, _disabled, _props, shouldAddSpace, handleClick } = useButton(props, emit);
      const buttonKls = vue.computed(() => [
        ns.b(),
        ns.m(_type.value),
        ns.m(_size.value),
        ns.is("disabled", _disabled.value),
        ns.is("loading", props.loading),
        ns.is("plain", props.plain),
        ns.is("round", props.round),
        ns.is("circle", props.circle),
        ns.is("text", props.text),
        ns.is("link", props.link),
        ns.is("has-bg", props.bg)
      ]);
      expose({
        ref: _ref,
        size: _size,
        type: _type,
        disabled: _disabled,
        shouldAddSpace
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.tag), vue.mergeProps({
          ref_key: "_ref",
          ref: _ref
        }, vue.unref(_props), {
          class: vue.unref(buttonKls),
          style: vue.unref(buttonStyle),
          onClick: vue.unref(handleClick)
        }), {
          default: vue.withCtx(() => [
            _ctx.loading ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
              _ctx.$slots.loading ? vue.renderSlot(_ctx.$slots, "loading", { key: 0 }) : (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                key: 1,
                class: vue.normalizeClass(vue.unref(ns).is("loading"))
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.loadingIcon)))
                ]),
                _: 1
              }, 8, ["class"]))
            ], 64)) : _ctx.icon || _ctx.$slots.icon ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), { key: 1 }, {
              default: vue.withCtx(() => [
                _ctx.icon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.icon), { key: 0 })) : vue.renderSlot(_ctx.$slots, "icon", { key: 1 })
              ]),
              _: 3
            })) : vue.createCommentVNode("v-if", true),
            _ctx.$slots.default ? (vue.openBlock(), vue.createElementBlock("span", {
              key: 2,
              class: vue.normalizeClass({ [vue.unref(ns).em("text", "expand")]: vue.unref(shouldAddSpace) })
            }, [
              vue.renderSlot(_ctx.$slots, "default")
            ], 2)) : vue.createCommentVNode("v-if", true)
          ]),
          _: 3
        }, 16, ["class", "style", "onClick"]);
      };
    }
  });
  var Button = /* @__PURE__ */ _export_sfc$1(_sfc_main$4, [["__file", "button.vue"]]);
  const buttonGroupProps = {
    size: buttonProps.size,
    type: buttonProps.type
  };
  const __default__$2 = vue.defineComponent({
    name: "ElButtonGroup"
  });
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    ...__default__$2,
    props: buttonGroupProps,
    setup(__props) {
      const props = __props;
      vue.provide(buttonGroupContextKey, vue.reactive({
        size: vue.toRef(props, "size"),
        type: vue.toRef(props, "type")
      }));
      const ns = useNamespace("button");
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(`${vue.unref(ns).b("group")}`)
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 2);
      };
    }
  });
  var ButtonGroup = /* @__PURE__ */ _export_sfc$1(_sfc_main$3, [["__file", "button-group.vue"]]);
  const ElButton = withInstall(Button, {
    ButtonGroup
  });
  withNoopInstall(ButtonGroup);
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  const overlayProps = buildProps({
    mask: {
      type: Boolean,
      default: true
    },
    customMaskEvent: {
      type: Boolean,
      default: false
    },
    overlayClass: {
      type: definePropType([
        String,
        Array,
        Object
      ])
    },
    zIndex: {
      type: definePropType([String, Number])
    }
  });
  const overlayEmits = {
    click: (evt) => evt instanceof MouseEvent
  };
  const BLOCK = "overlay";
  var Overlay = vue.defineComponent({
    name: "ElOverlay",
    props: overlayProps,
    emits: overlayEmits,
    setup(props, { slots, emit }) {
      const ns = useNamespace(BLOCK);
      const onMaskClick = (e) => {
        emit("click", e);
      };
      const { onClick, onMousedown, onMouseup } = useSameTarget(props.customMaskEvent ? void 0 : onMaskClick);
      return () => {
        return props.mask ? vue.createVNode("div", {
          class: [ns.b(), props.overlayClass],
          style: {
            zIndex: props.zIndex
          },
          onClick,
          onMousedown,
          onMouseup
        }, [vue.renderSlot(slots, "default")], PatchFlags.STYLE | PatchFlags.CLASS | PatchFlags.PROPS, ["onClick", "onMouseup", "onMousedown"]) : vue.h("div", {
          class: props.overlayClass,
          style: {
            zIndex: props.zIndex,
            position: "fixed",
            top: "0px",
            right: "0px",
            bottom: "0px",
            left: "0px"
          }
        }, [vue.renderSlot(slots, "default")]);
      };
    }
  });
  const ElOverlay = Overlay;
  const dialogInjectionKey = Symbol("dialogInjectionKey");
  const dialogContentProps = buildProps({
    center: Boolean,
    alignCenter: Boolean,
    closeIcon: {
      type: iconPropType
    },
    draggable: Boolean,
    overflow: Boolean,
    fullscreen: Boolean,
    showClose: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ""
    },
    ariaLevel: {
      type: String,
      default: "2"
    }
  });
  const dialogContentEmits = {
    close: () => true
  };
  const _hoisted_1$2 = ["aria-level"];
  const _hoisted_2$1 = ["aria-label"];
  const _hoisted_3$1 = ["id"];
  const __default__$1 = vue.defineComponent({ name: "ElDialogContent" });
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    ...__default__$1,
    props: dialogContentProps,
    emits: dialogContentEmits,
    setup(__props) {
      const props = __props;
      const { t } = useLocale();
      const { Close } = CloseComponents;
      const { dialogRef, headerRef, bodyId, ns, style } = vue.inject(dialogInjectionKey);
      const { focusTrapRef } = vue.inject(FOCUS_TRAP_INJECTION_KEY);
      const dialogKls = vue.computed(() => [
        ns.b(),
        ns.is("fullscreen", props.fullscreen),
        ns.is("draggable", props.draggable),
        ns.is("align-center", props.alignCenter),
        { [ns.m("center")]: props.center }
      ]);
      const composedDialogRef = composeRefs(focusTrapRef, dialogRef);
      const draggable = vue.computed(() => props.draggable);
      const overflow = vue.computed(() => props.overflow);
      useDraggable(dialogRef, headerRef, draggable, overflow);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          ref: vue.unref(composedDialogRef),
          class: vue.normalizeClass(vue.unref(dialogKls)),
          style: vue.normalizeStyle(vue.unref(style)),
          tabindex: "-1"
        }, [
          vue.createElementVNode("header", {
            ref_key: "headerRef",
            ref: headerRef,
            class: vue.normalizeClass([vue.unref(ns).e("header"), { "show-close": _ctx.showClose }])
          }, [
            vue.renderSlot(_ctx.$slots, "header", {}, () => [
              vue.createElementVNode("span", {
                role: "heading",
                "aria-level": _ctx.ariaLevel,
                class: vue.normalizeClass(vue.unref(ns).e("title"))
              }, vue.toDisplayString(_ctx.title), 11, _hoisted_1$2)
            ]),
            _ctx.showClose ? (vue.openBlock(), vue.createElementBlock("button", {
              key: 0,
              "aria-label": vue.unref(t)("el.dialog.close"),
              class: vue.normalizeClass(vue.unref(ns).e("headerbtn")),
              type: "button",
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
            }, [
              vue.createVNode(vue.unref(ElIcon), {
                class: vue.normalizeClass(vue.unref(ns).e("close"))
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.closeIcon || vue.unref(Close))))
                ]),
                _: 1
              }, 8, ["class"])
            ], 10, _hoisted_2$1)) : vue.createCommentVNode("v-if", true)
          ], 2),
          vue.createElementVNode("div", {
            id: vue.unref(bodyId),
            class: vue.normalizeClass(vue.unref(ns).e("body"))
          }, [
            vue.renderSlot(_ctx.$slots, "default")
          ], 10, _hoisted_3$1),
          _ctx.$slots.footer ? (vue.openBlock(), vue.createElementBlock("footer", {
            key: 0,
            class: vue.normalizeClass(vue.unref(ns).e("footer"))
          }, [
            vue.renderSlot(_ctx.$slots, "footer")
          ], 2)) : vue.createCommentVNode("v-if", true)
        ], 6);
      };
    }
  });
  var ElDialogContent = /* @__PURE__ */ _export_sfc$1(_sfc_main$2, [["__file", "dialog-content.vue"]]);
  const dialogProps = buildProps({
    ...dialogContentProps,
    appendToBody: Boolean,
    appendTo: {
      type: definePropType(String),
      default: "body"
    },
    beforeClose: {
      type: definePropType(Function)
    },
    destroyOnClose: Boolean,
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    modal: {
      type: Boolean,
      default: true
    },
    openDelay: {
      type: Number,
      default: 0
    },
    closeDelay: {
      type: Number,
      default: 0
    },
    top: {
      type: String
    },
    modelValue: Boolean,
    modalClass: String,
    width: {
      type: [String, Number]
    },
    zIndex: {
      type: Number
    },
    trapFocus: {
      type: Boolean,
      default: false
    },
    headerAriaLevel: {
      type: String,
      default: "2"
    }
  });
  const dialogEmits = {
    open: () => true,
    opened: () => true,
    close: () => true,
    closed: () => true,
    [UPDATE_MODEL_EVENT]: (value) => isBoolean(value),
    openAutoFocus: () => true,
    closeAutoFocus: () => true
  };
  const useDialog = (props, targetRef) => {
    var _a2;
    const instance = vue.getCurrentInstance();
    const emit = instance.emit;
    const { nextZIndex } = useZIndex();
    let lastPosition = "";
    const titleId = useId();
    const bodyId = useId();
    const visible = vue.ref(false);
    const closed = vue.ref(false);
    const rendered = vue.ref(false);
    const zIndex2 = vue.ref((_a2 = props.zIndex) != null ? _a2 : nextZIndex());
    let openTimer = void 0;
    let closeTimer = void 0;
    const namespace = useGlobalConfig("namespace", defaultNamespace);
    const style = vue.computed(() => {
      const style2 = {};
      const varPrefix = `--${namespace.value}-dialog`;
      if (!props.fullscreen) {
        if (props.top) {
          style2[`${varPrefix}-margin-top`] = props.top;
        }
        if (props.width) {
          style2[`${varPrefix}-width`] = addUnit(props.width);
        }
      }
      return style2;
    });
    const overlayDialogStyle = vue.computed(() => {
      if (props.alignCenter) {
        return { display: "flex" };
      }
      return {};
    });
    function afterEnter() {
      emit("opened");
    }
    function afterLeave() {
      emit("closed");
      emit(UPDATE_MODEL_EVENT, false);
      if (props.destroyOnClose) {
        rendered.value = false;
      }
    }
    function beforeLeave() {
      emit("close");
    }
    function open() {
      closeTimer == null ? void 0 : closeTimer();
      openTimer == null ? void 0 : openTimer();
      if (props.openDelay && props.openDelay > 0) {
        ({ stop: openTimer } = useTimeoutFn(() => doOpen(), props.openDelay));
      } else {
        doOpen();
      }
    }
    function close() {
      openTimer == null ? void 0 : openTimer();
      closeTimer == null ? void 0 : closeTimer();
      if (props.closeDelay && props.closeDelay > 0) {
        ({ stop: closeTimer } = useTimeoutFn(() => doClose(), props.closeDelay));
      } else {
        doClose();
      }
    }
    function handleClose() {
      function hide(shouldCancel) {
        if (shouldCancel)
          return;
        closed.value = true;
        visible.value = false;
      }
      if (props.beforeClose) {
        props.beforeClose(hide);
      } else {
        close();
      }
    }
    function onModalClick() {
      if (props.closeOnClickModal) {
        handleClose();
      }
    }
    function doOpen() {
      if (!isClient)
        return;
      visible.value = true;
    }
    function doClose() {
      visible.value = false;
    }
    function onOpenAutoFocus() {
      emit("openAutoFocus");
    }
    function onCloseAutoFocus() {
      emit("closeAutoFocus");
    }
    function onFocusoutPrevented(event) {
      var _a22;
      if (((_a22 = event.detail) == null ? void 0 : _a22.focusReason) === "pointer") {
        event.preventDefault();
      }
    }
    if (props.lockScroll) {
      useLockscreen(visible);
    }
    function onCloseRequested() {
      if (props.closeOnPressEscape) {
        handleClose();
      }
    }
    vue.watch(() => props.modelValue, (val) => {
      if (val) {
        closed.value = false;
        open();
        rendered.value = true;
        zIndex2.value = isUndefined$1(props.zIndex) ? nextZIndex() : zIndex2.value++;
        vue.nextTick(() => {
          emit("open");
          if (targetRef.value) {
            targetRef.value.scrollTop = 0;
          }
        });
      } else {
        if (visible.value) {
          close();
        }
      }
    });
    vue.watch(() => props.fullscreen, (val) => {
      if (!targetRef.value)
        return;
      if (val) {
        lastPosition = targetRef.value.style.transform;
        targetRef.value.style.transform = "";
      } else {
        targetRef.value.style.transform = lastPosition;
      }
    });
    vue.onMounted(() => {
      if (props.modelValue) {
        visible.value = true;
        rendered.value = true;
        open();
      }
    });
    return {
      afterEnter,
      afterLeave,
      beforeLeave,
      handleClose,
      onModalClick,
      close,
      doClose,
      onOpenAutoFocus,
      onCloseAutoFocus,
      onCloseRequested,
      onFocusoutPrevented,
      titleId,
      bodyId,
      closed,
      style,
      overlayDialogStyle,
      rendered,
      visible,
      zIndex: zIndex2
    };
  };
  const _hoisted_1$1 = ["aria-label", "aria-labelledby", "aria-describedby"];
  const __default__ = vue.defineComponent({
    name: "ElDialog",
    inheritAttrs: false
  });
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    ...__default__,
    props: dialogProps,
    emits: dialogEmits,
    setup(__props, { expose }) {
      const props = __props;
      const slots = vue.useSlots();
      useDeprecated({
        scope: "el-dialog",
        from: "the title slot",
        replacement: "the header slot",
        version: "3.0.0",
        ref: "https://element-plus.org/en-US/component/dialog.html#slots"
      }, vue.computed(() => !!slots.title));
      const ns = useNamespace("dialog");
      const dialogRef = vue.ref();
      const headerRef = vue.ref();
      const dialogContentRef = vue.ref();
      const {
        visible,
        titleId,
        bodyId,
        style,
        overlayDialogStyle,
        rendered,
        zIndex: zIndex2,
        afterEnter,
        afterLeave,
        beforeLeave,
        handleClose,
        onModalClick,
        onOpenAutoFocus,
        onCloseAutoFocus,
        onCloseRequested,
        onFocusoutPrevented
      } = useDialog(props, dialogRef);
      vue.provide(dialogInjectionKey, {
        dialogRef,
        headerRef,
        bodyId,
        ns,
        rendered,
        style
      });
      const overlayEvent = useSameTarget(onModalClick);
      const draggable = vue.computed(() => props.draggable && !props.fullscreen);
      expose({
        visible,
        dialogContentRef
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.Teleport, {
          to: _ctx.appendTo,
          disabled: _ctx.appendTo !== "body" ? false : !_ctx.appendToBody
        }, [
          vue.createVNode(vue.Transition, {
            name: "dialog-fade",
            onAfterEnter: vue.unref(afterEnter),
            onAfterLeave: vue.unref(afterLeave),
            onBeforeLeave: vue.unref(beforeLeave),
            persisted: ""
          }, {
            default: vue.withCtx(() => [
              vue.withDirectives(vue.createVNode(vue.unref(ElOverlay), {
                "custom-mask-event": "",
                mask: _ctx.modal,
                "overlay-class": _ctx.modalClass,
                "z-index": vue.unref(zIndex2)
              }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("div", {
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-label": _ctx.title || void 0,
                    "aria-labelledby": !_ctx.title ? vue.unref(titleId) : void 0,
                    "aria-describedby": vue.unref(bodyId),
                    class: vue.normalizeClass(`${vue.unref(ns).namespace.value}-overlay-dialog`),
                    style: vue.normalizeStyle(vue.unref(overlayDialogStyle)),
                    onClick: _cache[0] || (_cache[0] = (...args) => vue.unref(overlayEvent).onClick && vue.unref(overlayEvent).onClick(...args)),
                    onMousedown: _cache[1] || (_cache[1] = (...args) => vue.unref(overlayEvent).onMousedown && vue.unref(overlayEvent).onMousedown(...args)),
                    onMouseup: _cache[2] || (_cache[2] = (...args) => vue.unref(overlayEvent).onMouseup && vue.unref(overlayEvent).onMouseup(...args))
                  }, [
                    vue.createVNode(vue.unref(ElFocusTrap), {
                      loop: "",
                      trapped: vue.unref(visible),
                      "focus-start-el": "container",
                      onFocusAfterTrapped: vue.unref(onOpenAutoFocus),
                      onFocusAfterReleased: vue.unref(onCloseAutoFocus),
                      onFocusoutPrevented: vue.unref(onFocusoutPrevented),
                      onReleaseRequested: vue.unref(onCloseRequested)
                    }, {
                      default: vue.withCtx(() => [
                        vue.unref(rendered) ? (vue.openBlock(), vue.createBlock(ElDialogContent, vue.mergeProps({
                          key: 0,
                          ref_key: "dialogContentRef",
                          ref: dialogContentRef
                        }, _ctx.$attrs, {
                          center: _ctx.center,
                          "align-center": _ctx.alignCenter,
                          "close-icon": _ctx.closeIcon,
                          draggable: vue.unref(draggable),
                          overflow: _ctx.overflow,
                          fullscreen: _ctx.fullscreen,
                          "show-close": _ctx.showClose,
                          title: _ctx.title,
                          "aria-level": _ctx.headerAriaLevel,
                          onClose: vue.unref(handleClose)
                        }), vue.createSlots({
                          header: vue.withCtx(() => [
                            !_ctx.$slots.title ? vue.renderSlot(_ctx.$slots, "header", {
                              key: 0,
                              close: vue.unref(handleClose),
                              titleId: vue.unref(titleId),
                              titleClass: vue.unref(ns).e("title")
                            }) : vue.renderSlot(_ctx.$slots, "title", { key: 1 })
                          ]),
                          default: vue.withCtx(() => [
                            vue.renderSlot(_ctx.$slots, "default")
                          ]),
                          _: 2
                        }, [
                          _ctx.$slots.footer ? {
                            name: "footer",
                            fn: vue.withCtx(() => [
                              vue.renderSlot(_ctx.$slots, "footer")
                            ])
                          } : void 0
                        ]), 1040, ["center", "align-center", "close-icon", "draggable", "overflow", "fullscreen", "show-close", "title", "aria-level", "onClose"])) : vue.createCommentVNode("v-if", true)
                      ]),
                      _: 3
                    }, 8, ["trapped", "onFocusAfterTrapped", "onFocusAfterReleased", "onFocusoutPrevented", "onReleaseRequested"])
                  ], 46, _hoisted_1$1)
                ]),
                _: 3
              }, 8, ["mask", "overlay-class", "z-index"]), [
                [vue.vShow, vue.unref(visible)]
              ])
            ]),
            _: 3
          }, 8, ["onAfterEnter", "onAfterLeave", "onBeforeLeave"])
        ], 8, ["to", "disabled"]);
      };
    }
  });
  var Dialog = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["__file", "dialog.vue"]]);
  const ElDialog = withInstall(Dialog);
  function createLoadingComponent(options) {
    let afterLeaveTimer;
    const afterLeaveFlag = vue.ref(false);
    const data = vue.reactive({
      ...options,
      originalPosition: "",
      originalOverflow: "",
      visible: false
    });
    function setText(text) {
      data.text = text;
    }
    function destroySelf() {
      const target = data.parent;
      const ns = vm.ns;
      if (!target.vLoadingAddClassList) {
        let loadingNumber = target.getAttribute("loading-number");
        loadingNumber = Number.parseInt(loadingNumber) - 1;
        if (!loadingNumber) {
          removeClass(target, ns.bm("parent", "relative"));
          target.removeAttribute("loading-number");
        } else {
          target.setAttribute("loading-number", loadingNumber.toString());
        }
        removeClass(target, ns.bm("parent", "hidden"));
      }
      removeElLoadingChild();
      loadingInstance.unmount();
    }
    function removeElLoadingChild() {
      var _a2, _b;
      (_b = (_a2 = vm.$el) == null ? void 0 : _a2.parentNode) == null ? void 0 : _b.removeChild(vm.$el);
    }
    function close() {
      var _a2;
      if (options.beforeClose && !options.beforeClose())
        return;
      afterLeaveFlag.value = true;
      clearTimeout(afterLeaveTimer);
      afterLeaveTimer = window.setTimeout(handleAfterLeave, 400);
      data.visible = false;
      (_a2 = options.closed) == null ? void 0 : _a2.call(options);
    }
    function handleAfterLeave() {
      if (!afterLeaveFlag.value)
        return;
      const target = data.parent;
      afterLeaveFlag.value = false;
      target.vLoadingAddClassList = void 0;
      destroySelf();
    }
    const elLoadingComponent = vue.defineComponent({
      name: "ElLoading",
      setup(_, { expose }) {
        const { ns, zIndex: zIndex2 } = useGlobalComponentSettings("loading");
        expose({
          ns,
          zIndex: zIndex2
        });
        return () => {
          const svg = data.spinner || data.svg;
          const spinner = vue.h("svg", {
            class: "circular",
            viewBox: data.svgViewBox ? data.svgViewBox : "0 0 50 50",
            ...svg ? { innerHTML: svg } : {}
          }, [
            vue.h("circle", {
              class: "path",
              cx: "25",
              cy: "25",
              r: "20",
              fill: "none"
            })
          ]);
          const spinnerText = data.text ? vue.h("p", { class: ns.b("text") }, [data.text]) : void 0;
          return vue.h(vue.Transition, {
            name: ns.b("fade"),
            onAfterLeave: handleAfterLeave
          }, {
            default: vue.withCtx(() => [
              vue.withDirectives(vue.createVNode("div", {
                style: {
                  backgroundColor: data.background || ""
                },
                class: [
                  ns.b("mask"),
                  data.customClass,
                  data.fullscreen ? "is-fullscreen" : ""
                ]
              }, [
                vue.h("div", {
                  class: ns.b("spinner")
                }, [spinner, spinnerText])
              ]), [[vue.vShow, data.visible]])
            ])
          });
        };
      }
    });
    const loadingInstance = vue.createApp(elLoadingComponent);
    const vm = loadingInstance.mount(document.createElement("div"));
    return {
      ...vue.toRefs(data),
      setText,
      removeElLoadingChild,
      close,
      handleAfterLeave,
      vm,
      get $el() {
        return vm.$el;
      }
    };
  }
  let fullscreenInstance = void 0;
  const Loading = function(options = {}) {
    if (!isClient)
      return void 0;
    const resolved = resolveOptions(options);
    if (resolved.fullscreen && fullscreenInstance) {
      return fullscreenInstance;
    }
    const instance = createLoadingComponent({
      ...resolved,
      closed: () => {
        var _a2;
        (_a2 = resolved.closed) == null ? void 0 : _a2.call(resolved);
        if (resolved.fullscreen)
          fullscreenInstance = void 0;
      }
    });
    addStyle(resolved, resolved.parent, instance);
    addClassList(resolved, resolved.parent, instance);
    resolved.parent.vLoadingAddClassList = () => addClassList(resolved, resolved.parent, instance);
    let loadingNumber = resolved.parent.getAttribute("loading-number");
    if (!loadingNumber) {
      loadingNumber = "1";
    } else {
      loadingNumber = `${Number.parseInt(loadingNumber) + 1}`;
    }
    resolved.parent.setAttribute("loading-number", loadingNumber);
    resolved.parent.appendChild(instance.$el);
    vue.nextTick(() => instance.visible.value = resolved.visible);
    if (resolved.fullscreen) {
      fullscreenInstance = instance;
    }
    return instance;
  };
  const resolveOptions = (options) => {
    var _a2, _b, _c, _d;
    let target;
    if (isString(options.target)) {
      target = (_a2 = document.querySelector(options.target)) != null ? _a2 : document.body;
    } else {
      target = options.target || document.body;
    }
    return {
      parent: target === document.body || options.body ? document.body : target,
      background: options.background || "",
      svg: options.svg || "",
      svgViewBox: options.svgViewBox || "",
      spinner: options.spinner || false,
      text: options.text || "",
      fullscreen: target === document.body && ((_b = options.fullscreen) != null ? _b : true),
      lock: (_c = options.lock) != null ? _c : false,
      customClass: options.customClass || "",
      visible: (_d = options.visible) != null ? _d : true,
      target
    };
  };
  const addStyle = async (options, parent, instance) => {
    const { nextZIndex } = instance.vm.zIndex || instance.vm._.exposed.zIndex;
    const maskStyle = {};
    if (options.fullscreen) {
      instance.originalPosition.value = getStyle(document.body, "position");
      instance.originalOverflow.value = getStyle(document.body, "overflow");
      maskStyle.zIndex = nextZIndex();
    } else if (options.parent === document.body) {
      instance.originalPosition.value = getStyle(document.body, "position");
      await vue.nextTick();
      for (const property of ["top", "left"]) {
        const scroll = property === "top" ? "scrollTop" : "scrollLeft";
        maskStyle[property] = `${options.target.getBoundingClientRect()[property] + document.body[scroll] + document.documentElement[scroll] - Number.parseInt(getStyle(document.body, `margin-${property}`), 10)}px`;
      }
      for (const property of ["height", "width"]) {
        maskStyle[property] = `${options.target.getBoundingClientRect()[property]}px`;
      }
    } else {
      instance.originalPosition.value = getStyle(parent, "position");
    }
    for (const [key, value] of Object.entries(maskStyle)) {
      instance.$el.style[key] = value;
    }
  };
  const addClassList = (options, parent, instance) => {
    const ns = instance.vm.ns || instance.vm._.exposed.ns;
    if (!["absolute", "fixed", "sticky"].includes(instance.originalPosition.value)) {
      addClass(parent, ns.bm("parent", "relative"));
    } else {
      removeClass(parent, ns.bm("parent", "relative"));
    }
    if (options.fullscreen && options.lock) {
      addClass(parent, ns.bm("parent", "hidden"));
    } else {
      removeClass(parent, ns.bm("parent", "hidden"));
    }
  };
  const INSTANCE_KEY = Symbol("ElLoading");
  const createInstance = (el, binding) => {
    var _a2, _b, _c, _d;
    const vm = binding.instance;
    const getBindingProp = (key) => isObject$1(binding.value) ? binding.value[key] : void 0;
    const resolveExpression = (key) => {
      const data = isString(key) && (vm == null ? void 0 : vm[key]) || key;
      if (data)
        return vue.ref(data);
      else
        return data;
    };
    const getProp = (name) => resolveExpression(getBindingProp(name) || el.getAttribute(`element-loading-${hyphenate(name)}`));
    const fullscreen = (_a2 = getBindingProp("fullscreen")) != null ? _a2 : binding.modifiers.fullscreen;
    const options = {
      text: getProp("text"),
      svg: getProp("svg"),
      svgViewBox: getProp("svgViewBox"),
      spinner: getProp("spinner"),
      background: getProp("background"),
      customClass: getProp("customClass"),
      fullscreen,
      target: (_b = getBindingProp("target")) != null ? _b : fullscreen ? void 0 : el,
      body: (_c = getBindingProp("body")) != null ? _c : binding.modifiers.body,
      lock: (_d = getBindingProp("lock")) != null ? _d : binding.modifiers.lock
    };
    el[INSTANCE_KEY] = {
      options,
      instance: Loading(options)
    };
  };
  const updateOptions = (newOptions, originalOptions) => {
    for (const key of Object.keys(originalOptions)) {
      if (vue.isRef(originalOptions[key]))
        originalOptions[key].value = newOptions[key];
    }
  };
  const vLoading = {
    mounted(el, binding) {
      if (binding.value) {
        createInstance(el, binding);
      }
    },
    updated(el, binding) {
      const instance = el[INSTANCE_KEY];
      if (binding.oldValue !== binding.value) {
        if (binding.value && !binding.oldValue) {
          createInstance(el, binding);
        } else if (binding.value && binding.oldValue) {
          if (isObject$1(binding.value))
            updateOptions(binding.value, instance.options);
        } else {
          instance == null ? void 0 : instance.instance.close();
        }
      }
    },
    unmounted(el) {
      var _a2;
      (_a2 = el[INSTANCE_KEY]) == null ? void 0 : _a2.instance.close();
      el[INSTANCE_KEY] = null;
    }
  };
  var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  var lodash = { exports: {} };
  /**
   * @license
   * Lodash <https://lodash.com/>
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */
  lodash.exports;
  (function(module, exports) {
    (function() {
      var undefined$1;
      var VERSION = "4.17.21";
      var LARGE_ARRAY_SIZE = 200;
      var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT2 = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
      var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
      var MAX_MEMOIZE_SIZE2 = 500;
      var PLACEHOLDER = "__lodash_placeholder__";
      var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
      var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
      var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
      var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
      var HOT_COUNT2 = 800, HOT_SPAN2 = 16;
      var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
      var INFINITY2 = 1 / 0, MAX_SAFE_INTEGER2 = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
      var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
      var wrapFlags = [
        ["ary", WRAP_ARY_FLAG],
        ["bind", WRAP_BIND_FLAG],
        ["bindKey", WRAP_BIND_KEY_FLAG],
        ["curry", WRAP_CURRY_FLAG],
        ["curryRight", WRAP_CURRY_RIGHT_FLAG],
        ["flip", WRAP_FLIP_FLAG],
        ["partial", WRAP_PARTIAL_FLAG],
        ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
        ["rearg", WRAP_REARG_FLAG]
      ];
      var argsTag2 = "[object Arguments]", arrayTag = "[object Array]", asyncTag2 = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag2 = "[object Function]", genTag2 = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag2 = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag2 = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag2 = "[object Symbol]", undefinedTag2 = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
      var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
      var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
      var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
      var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
      var reIsDeepProp2 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp2 = /^\w*$/, rePropName2 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reRegExpChar2 = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar2.source);
      var reTrimStart = /^\s+/;
      var reWhitespace = /\s/;
      var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
      var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
      var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
      var reEscapeChar2 = /\\(\\)?/g;
      var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
      var reFlags = /\w*$/;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsHostCtor2 = /^\[object .+?Constructor\]$/;
      var reIsOctal = /^0o[0-7]+$/i;
      var reIsUint2 = /^(?:0|[1-9]\d*)$/;
      var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
      var reNoMatch = /($^)/;
      var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
      var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
      var rsApos = "['’]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
      var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
      var reApos = RegExp(rsApos, "g");
      var reComboMark = RegExp(rsCombo, "g");
      var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
      var reUnicodeWord = RegExp([
        rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
        rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
        rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
        rsUpper + "+" + rsOptContrUpper,
        rsOrdUpper,
        rsOrdLower,
        rsDigits,
        rsEmoji
      ].join("|"), "g");
      var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
      var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
      var contextProps = [
        "Array",
        "Buffer",
        "DataView",
        "Date",
        "Error",
        "Float32Array",
        "Float64Array",
        "Function",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Map",
        "Math",
        "Object",
        "Promise",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "TypeError",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "WeakMap",
        "_",
        "clearTimeout",
        "isFinite",
        "parseInt",
        "setTimeout"
      ];
      var templateCounter = -1;
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag2] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag2] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      var cloneableTags = {};
      cloneableTags[argsTag2] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag2] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
      cloneableTags[errorTag] = cloneableTags[funcTag2] = cloneableTags[weakMapTag] = false;
      var deburredLetters = {
        // Latin-1 Supplement block.
        "À": "A",
        "Á": "A",
        "Â": "A",
        "Ã": "A",
        "Ä": "A",
        "Å": "A",
        "à": "a",
        "á": "a",
        "â": "a",
        "ã": "a",
        "ä": "a",
        "å": "a",
        "Ç": "C",
        "ç": "c",
        "Ð": "D",
        "ð": "d",
        "È": "E",
        "É": "E",
        "Ê": "E",
        "Ë": "E",
        "è": "e",
        "é": "e",
        "ê": "e",
        "ë": "e",
        "Ì": "I",
        "Í": "I",
        "Î": "I",
        "Ï": "I",
        "ì": "i",
        "í": "i",
        "î": "i",
        "ï": "i",
        "Ñ": "N",
        "ñ": "n",
        "Ò": "O",
        "Ó": "O",
        "Ô": "O",
        "Õ": "O",
        "Ö": "O",
        "Ø": "O",
        "ò": "o",
        "ó": "o",
        "ô": "o",
        "õ": "o",
        "ö": "o",
        "ø": "o",
        "Ù": "U",
        "Ú": "U",
        "Û": "U",
        "Ü": "U",
        "ù": "u",
        "ú": "u",
        "û": "u",
        "ü": "u",
        "Ý": "Y",
        "ý": "y",
        "ÿ": "y",
        "Æ": "Ae",
        "æ": "ae",
        "Þ": "Th",
        "þ": "th",
        "ß": "ss",
        // Latin Extended-A block.
        "Ā": "A",
        "Ă": "A",
        "Ą": "A",
        "ā": "a",
        "ă": "a",
        "ą": "a",
        "Ć": "C",
        "Ĉ": "C",
        "Ċ": "C",
        "Č": "C",
        "ć": "c",
        "ĉ": "c",
        "ċ": "c",
        "č": "c",
        "Ď": "D",
        "Đ": "D",
        "ď": "d",
        "đ": "d",
        "Ē": "E",
        "Ĕ": "E",
        "Ė": "E",
        "Ę": "E",
        "Ě": "E",
        "ē": "e",
        "ĕ": "e",
        "ė": "e",
        "ę": "e",
        "ě": "e",
        "Ĝ": "G",
        "Ğ": "G",
        "Ġ": "G",
        "Ģ": "G",
        "ĝ": "g",
        "ğ": "g",
        "ġ": "g",
        "ģ": "g",
        "Ĥ": "H",
        "Ħ": "H",
        "ĥ": "h",
        "ħ": "h",
        "Ĩ": "I",
        "Ī": "I",
        "Ĭ": "I",
        "Į": "I",
        "İ": "I",
        "ĩ": "i",
        "ī": "i",
        "ĭ": "i",
        "į": "i",
        "ı": "i",
        "Ĵ": "J",
        "ĵ": "j",
        "Ķ": "K",
        "ķ": "k",
        "ĸ": "k",
        "Ĺ": "L",
        "Ļ": "L",
        "Ľ": "L",
        "Ŀ": "L",
        "Ł": "L",
        "ĺ": "l",
        "ļ": "l",
        "ľ": "l",
        "ŀ": "l",
        "ł": "l",
        "Ń": "N",
        "Ņ": "N",
        "Ň": "N",
        "Ŋ": "N",
        "ń": "n",
        "ņ": "n",
        "ň": "n",
        "ŋ": "n",
        "Ō": "O",
        "Ŏ": "O",
        "Ő": "O",
        "ō": "o",
        "ŏ": "o",
        "ő": "o",
        "Ŕ": "R",
        "Ŗ": "R",
        "Ř": "R",
        "ŕ": "r",
        "ŗ": "r",
        "ř": "r",
        "Ś": "S",
        "Ŝ": "S",
        "Ş": "S",
        "Š": "S",
        "ś": "s",
        "ŝ": "s",
        "ş": "s",
        "š": "s",
        "Ţ": "T",
        "Ť": "T",
        "Ŧ": "T",
        "ţ": "t",
        "ť": "t",
        "ŧ": "t",
        "Ũ": "U",
        "Ū": "U",
        "Ŭ": "U",
        "Ů": "U",
        "Ű": "U",
        "Ų": "U",
        "ũ": "u",
        "ū": "u",
        "ŭ": "u",
        "ů": "u",
        "ű": "u",
        "ų": "u",
        "Ŵ": "W",
        "ŵ": "w",
        "Ŷ": "Y",
        "ŷ": "y",
        "Ÿ": "Y",
        "Ź": "Z",
        "Ż": "Z",
        "Ž": "Z",
        "ź": "z",
        "ż": "z",
        "ž": "z",
        "Ĳ": "IJ",
        "ĳ": "ij",
        "Œ": "Oe",
        "œ": "oe",
        "ŉ": "'n",
        "ſ": "s"
      };
      var htmlEscapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      var htmlUnescapes = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      };
      var stringEscapes = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      };
      var freeParseFloat = parseFloat, freeParseInt = parseInt;
      var freeGlobal2 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
      var freeSelf2 = typeof self == "object" && self && self.Object === Object && self;
      var root2 = freeGlobal2 || freeSelf2 || Function("return this")();
      var freeExports = exports && !exports.nodeType && exports;
      var freeModule = freeExports && true && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var freeProcess = moduleExports && freeGlobal2.process;
      var nodeUtil = function() {
        try {
          var types = freeModule && freeModule.require && freeModule.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      }();
      var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      function apply2(func, thisArg, args) {
        switch (args.length) {
          case 0:
            return func.call(thisArg);
          case 1:
            return func.call(thisArg, args[0]);
          case 2:
            return func.call(thisArg, args[0], args[1]);
          case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
        }
        return func.apply(thisArg, args);
      }
      function arrayAggregator(array, setter, iteratee, accumulator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          var value = array[index];
          setter(accumulator, value, iteratee(value), array);
        }
        return accumulator;
      }
      function arrayEach(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (iteratee(array[index], index, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEachRight(array, iteratee) {
        var length = array == null ? 0 : array.length;
        while (length--) {
          if (iteratee(array[length], length, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEvery(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (!predicate(array[index], index, array)) {
            return false;
          }
        }
        return true;
      }
      function arrayFilter(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result[resIndex++] = value;
          }
        }
        return result;
      }
      function arrayIncludes(array, value) {
        var length = array == null ? 0 : array.length;
        return !!length && baseIndexOf(array, value, 0) > -1;
      }
      function arrayIncludesWith(array, value, comparator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (comparator(value, array[index])) {
            return true;
          }
        }
        return false;
      }
      function arrayMap2(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index < length) {
          result[index] = iteratee(array[index], index, array);
        }
        return result;
      }
      function arrayPush2(array, values) {
        var index = -1, length = values.length, offset = array.length;
        while (++index < length) {
          array[offset + index] = values[index];
        }
        return array;
      }
      function arrayReduce(array, iteratee, accumulator, initAccum) {
        var index = -1, length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[++index];
        }
        while (++index < length) {
          accumulator = iteratee(accumulator, array[index], index, array);
        }
        return accumulator;
      }
      function arrayReduceRight(array, iteratee, accumulator, initAccum) {
        var length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[--length];
        }
        while (length--) {
          accumulator = iteratee(accumulator, array[length], length, array);
        }
        return accumulator;
      }
      function arraySome(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (predicate(array[index], index, array)) {
            return true;
          }
        }
        return false;
      }
      var asciiSize = baseProperty("length");
      function asciiToArray(string) {
        return string.split("");
      }
      function asciiWords(string) {
        return string.match(reAsciiWord) || [];
      }
      function baseFindKey(collection, predicate, eachFunc) {
        var result;
        eachFunc(collection, function(value, key, collection2) {
          if (predicate(value, key, collection2)) {
            result = key;
            return false;
          }
        });
        return result;
      }
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index-- : ++index < length) {
          if (predicate(array[index], index, array)) {
            return index;
          }
        }
        return -1;
      }
      function baseIndexOf(array, value, fromIndex) {
        return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
      }
      function baseIndexOfWith(array, value, fromIndex, comparator) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (comparator(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function baseIsNaN(value) {
        return value !== value;
      }
      function baseMean(array, iteratee) {
        var length = array == null ? 0 : array.length;
        return length ? baseSum(array, iteratee) / length : NAN;
      }
      function baseProperty(key) {
        return function(object) {
          return object == null ? undefined$1 : object[key];
        };
      }
      function basePropertyOf(object) {
        return function(key) {
          return object == null ? undefined$1 : object[key];
        };
      }
      function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
        eachFunc(collection, function(value, index, collection2) {
          accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
        });
        return accumulator;
      }
      function baseSortBy(array, comparer) {
        var length = array.length;
        array.sort(comparer);
        while (length--) {
          array[length] = array[length].value;
        }
        return array;
      }
      function baseSum(array, iteratee) {
        var result, index = -1, length = array.length;
        while (++index < length) {
          var current = iteratee(array[index]);
          if (current !== undefined$1) {
            result = result === undefined$1 ? current : result + current;
          }
        }
        return result;
      }
      function baseTimes(n, iteratee) {
        var index = -1, result = Array(n);
        while (++index < n) {
          result[index] = iteratee(index);
        }
        return result;
      }
      function baseToPairs(object, props) {
        return arrayMap2(props, function(key) {
          return [key, object[key]];
        });
      }
      function baseTrim(string) {
        return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
      }
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      function baseValues(object, props) {
        return arrayMap2(props, function(key) {
          return object[key];
        });
      }
      function cacheHas(cache, key) {
        return cache.has(key);
      }
      function charsStartIndex(strSymbols, chrSymbols) {
        var index = -1, length = strSymbols.length;
        while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
        }
        return index;
      }
      function charsEndIndex(strSymbols, chrSymbols) {
        var index = strSymbols.length;
        while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
        }
        return index;
      }
      function countHolders(array, placeholder) {
        var length = array.length, result = 0;
        while (length--) {
          if (array[length] === placeholder) {
            ++result;
          }
        }
        return result;
      }
      var deburrLetter = basePropertyOf(deburredLetters);
      var escapeHtmlChar = basePropertyOf(htmlEscapes);
      function escapeStringChar(chr) {
        return "\\" + stringEscapes[chr];
      }
      function getValue2(object, key) {
        return object == null ? undefined$1 : object[key];
      }
      function hasUnicode(string) {
        return reHasUnicode.test(string);
      }
      function hasUnicodeWord(string) {
        return reHasUnicodeWord.test(string);
      }
      function iteratorToArray(iterator) {
        var data, result = [];
        while (!(data = iterator.next()).done) {
          result.push(data.value);
        }
        return result;
      }
      function mapToArray(map) {
        var index = -1, result = Array(map.size);
        map.forEach(function(value, key) {
          result[++index] = [key, value];
        });
        return result;
      }
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      function replaceHolders(array, placeholder) {
        var index = -1, length = array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (value === placeholder || value === PLACEHOLDER) {
            array[index] = PLACEHOLDER;
            result[resIndex++] = index;
          }
        }
        return result;
      }
      function setToArray(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = value;
        });
        return result;
      }
      function setToPairs(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = [value, value];
        });
        return result;
      }
      function strictIndexOf(array, value, fromIndex) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (array[index] === value) {
            return index;
          }
        }
        return -1;
      }
      function strictLastIndexOf(array, value, fromIndex) {
        var index = fromIndex + 1;
        while (index--) {
          if (array[index] === value) {
            return index;
          }
        }
        return index;
      }
      function stringSize(string) {
        return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
      }
      function stringToArray(string) {
        return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
      }
      function trimmedEndIndex(string) {
        var index = string.length;
        while (index-- && reWhitespace.test(string.charAt(index))) {
        }
        return index;
      }
      var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
      function unicodeSize(string) {
        var result = reUnicode.lastIndex = 0;
        while (reUnicode.test(string)) {
          ++result;
        }
        return result;
      }
      function unicodeToArray(string) {
        return string.match(reUnicode) || [];
      }
      function unicodeWords(string) {
        return string.match(reUnicodeWord) || [];
      }
      var runInContext = function runInContext2(context) {
        context = context == null ? root2 : _.defaults(root2.Object(), context, _.pick(root2, contextProps));
        var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
        var arrayProto2 = Array2.prototype, funcProto2 = Function2.prototype, objectProto2 = Object2.prototype;
        var coreJsData2 = context["__core-js_shared__"];
        var funcToString2 = funcProto2.toString;
        var hasOwnProperty2 = objectProto2.hasOwnProperty;
        var idCounter = 0;
        var maskSrcKey2 = function() {
          var uid = /[^.]+$/.exec(coreJsData2 && coreJsData2.keys && coreJsData2.keys.IE_PROTO || "");
          return uid ? "Symbol(src)_1." + uid : "";
        }();
        var nativeObjectToString2 = objectProto2.toString;
        var objectCtorString = funcToString2.call(Object2);
        var oldDash = root2._;
        var reIsNative2 = RegExp2(
          "^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        );
        var Buffer = moduleExports ? context.Buffer : undefined$1, Symbol2 = context.Symbol, Uint8Array = context.Uint8Array, allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined$1, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable2 = objectProto2.propertyIsEnumerable, splice2 = arrayProto2.splice, spreadableSymbol2 = Symbol2 ? Symbol2.isConcatSpreadable : undefined$1, symIterator = Symbol2 ? Symbol2.iterator : undefined$1, symToStringTag2 = Symbol2 ? Symbol2.toStringTag : undefined$1;
        var defineProperty2 = function() {
          try {
            var func = getNative2(Object2, "defineProperty");
            func({}, "", {});
            return func;
          } catch (e) {
          }
        }();
        var ctxClearTimeout = context.clearTimeout !== root2.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root2.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root2.setTimeout && context.setTimeout;
        var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined$1, nativeIsFinite = context.isFinite, nativeJoin = arrayProto2.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax2 = Math2.max, nativeMin = Math2.min, nativeNow2 = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto2.reverse;
        var DataView = getNative2(context, "DataView"), Map2 = getNative2(context, "Map"), Promise2 = getNative2(context, "Promise"), Set2 = getNative2(context, "Set"), WeakMap = getNative2(context, "WeakMap"), nativeCreate2 = getNative2(Object2, "create");
        var metaMap = WeakMap && new WeakMap();
        var realNames = {};
        var dataViewCtorString = toSource2(DataView), mapCtorString = toSource2(Map2), promiseCtorString = toSource2(Promise2), setCtorString = toSource2(Set2), weakMapCtorString = toSource2(WeakMap);
        var symbolProto2 = Symbol2 ? Symbol2.prototype : undefined$1, symbolValueOf = symbolProto2 ? symbolProto2.valueOf : undefined$1, symbolToString2 = symbolProto2 ? symbolProto2.toString : undefined$1;
        function lodash2(value) {
          if (isObjectLike2(value) && !isArray2(value) && !(value instanceof LazyWrapper)) {
            if (value instanceof LodashWrapper) {
              return value;
            }
            if (hasOwnProperty2.call(value, "__wrapped__")) {
              return wrapperClone(value);
            }
          }
          return new LodashWrapper(value);
        }
        var baseCreate = /* @__PURE__ */ function() {
          function object() {
          }
          return function(proto) {
            if (!isObject2(proto)) {
              return {};
            }
            if (objectCreate) {
              return objectCreate(proto);
            }
            object.prototype = proto;
            var result2 = new object();
            object.prototype = undefined$1;
            return result2;
          };
        }();
        function baseLodash() {
        }
        function LodashWrapper(value, chainAll) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__chain__ = !!chainAll;
          this.__index__ = 0;
          this.__values__ = undefined$1;
        }
        lodash2.templateSettings = {
          /**
           * Used to detect `data` property values to be HTML-escaped.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "escape": reEscape,
          /**
           * Used to detect code to be evaluated.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "evaluate": reEvaluate,
          /**
           * Used to detect `data` property values to inject.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "interpolate": reInterpolate,
          /**
           * Used to reference the data object in the template text.
           *
           * @memberOf _.templateSettings
           * @type {string}
           */
          "variable": "",
          /**
           * Used to import variables into the compiled template.
           *
           * @memberOf _.templateSettings
           * @type {Object}
           */
          "imports": {
            /**
             * A reference to the `lodash` function.
             *
             * @memberOf _.templateSettings.imports
             * @type {Function}
             */
            "_": lodash2
          }
        };
        lodash2.prototype = baseLodash.prototype;
        lodash2.prototype.constructor = lodash2;
        LodashWrapper.prototype = baseCreate(baseLodash.prototype);
        LodashWrapper.prototype.constructor = LodashWrapper;
        function LazyWrapper(value) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__dir__ = 1;
          this.__filtered__ = false;
          this.__iteratees__ = [];
          this.__takeCount__ = MAX_ARRAY_LENGTH;
          this.__views__ = [];
        }
        function lazyClone() {
          var result2 = new LazyWrapper(this.__wrapped__);
          result2.__actions__ = copyArray(this.__actions__);
          result2.__dir__ = this.__dir__;
          result2.__filtered__ = this.__filtered__;
          result2.__iteratees__ = copyArray(this.__iteratees__);
          result2.__takeCount__ = this.__takeCount__;
          result2.__views__ = copyArray(this.__views__);
          return result2;
        }
        function lazyReverse() {
          if (this.__filtered__) {
            var result2 = new LazyWrapper(this);
            result2.__dir__ = -1;
            result2.__filtered__ = true;
          } else {
            result2 = this.clone();
            result2.__dir__ *= -1;
          }
          return result2;
        }
        function lazyValue() {
          var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray2(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
          if (!isArr || !isRight && arrLength == length && takeCount == length) {
            return baseWrapperValue(array, this.__actions__);
          }
          var result2 = [];
          outer:
            while (length-- && resIndex < takeCount) {
              index += dir;
              var iterIndex = -1, value = array[index];
              while (++iterIndex < iterLength) {
                var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed2 = iteratee2(value);
                if (type == LAZY_MAP_FLAG) {
                  value = computed2;
                } else if (!computed2) {
                  if (type == LAZY_FILTER_FLAG) {
                    continue outer;
                  } else {
                    break outer;
                  }
                }
              }
              result2[resIndex++] = value;
            }
          return result2;
        }
        LazyWrapper.prototype = baseCreate(baseLodash.prototype);
        LazyWrapper.prototype.constructor = LazyWrapper;
        function Hash2(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function hashClear2() {
          this.__data__ = nativeCreate2 ? nativeCreate2(null) : {};
          this.size = 0;
        }
        function hashDelete2(key) {
          var result2 = this.has(key) && delete this.__data__[key];
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function hashGet2(key) {
          var data = this.__data__;
          if (nativeCreate2) {
            var result2 = data[key];
            return result2 === HASH_UNDEFINED2 ? undefined$1 : result2;
          }
          return hasOwnProperty2.call(data, key) ? data[key] : undefined$1;
        }
        function hashHas2(key) {
          var data = this.__data__;
          return nativeCreate2 ? data[key] !== undefined$1 : hasOwnProperty2.call(data, key);
        }
        function hashSet2(key, value) {
          var data = this.__data__;
          this.size += this.has(key) ? 0 : 1;
          data[key] = nativeCreate2 && value === undefined$1 ? HASH_UNDEFINED2 : value;
          return this;
        }
        Hash2.prototype.clear = hashClear2;
        Hash2.prototype["delete"] = hashDelete2;
        Hash2.prototype.get = hashGet2;
        Hash2.prototype.has = hashHas2;
        Hash2.prototype.set = hashSet2;
        function ListCache2(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function listCacheClear2() {
          this.__data__ = [];
          this.size = 0;
        }
        function listCacheDelete2(key) {
          var data = this.__data__, index = assocIndexOf2(data, key);
          if (index < 0) {
            return false;
          }
          var lastIndex = data.length - 1;
          if (index == lastIndex) {
            data.pop();
          } else {
            splice2.call(data, index, 1);
          }
          --this.size;
          return true;
        }
        function listCacheGet2(key) {
          var data = this.__data__, index = assocIndexOf2(data, key);
          return index < 0 ? undefined$1 : data[index][1];
        }
        function listCacheHas2(key) {
          return assocIndexOf2(this.__data__, key) > -1;
        }
        function listCacheSet2(key, value) {
          var data = this.__data__, index = assocIndexOf2(data, key);
          if (index < 0) {
            ++this.size;
            data.push([key, value]);
          } else {
            data[index][1] = value;
          }
          return this;
        }
        ListCache2.prototype.clear = listCacheClear2;
        ListCache2.prototype["delete"] = listCacheDelete2;
        ListCache2.prototype.get = listCacheGet2;
        ListCache2.prototype.has = listCacheHas2;
        ListCache2.prototype.set = listCacheSet2;
        function MapCache2(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function mapCacheClear2() {
          this.size = 0;
          this.__data__ = {
            "hash": new Hash2(),
            "map": new (Map2 || ListCache2)(),
            "string": new Hash2()
          };
        }
        function mapCacheDelete2(key) {
          var result2 = getMapData2(this, key)["delete"](key);
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function mapCacheGet2(key) {
          return getMapData2(this, key).get(key);
        }
        function mapCacheHas2(key) {
          return getMapData2(this, key).has(key);
        }
        function mapCacheSet2(key, value) {
          var data = getMapData2(this, key), size2 = data.size;
          data.set(key, value);
          this.size += data.size == size2 ? 0 : 1;
          return this;
        }
        MapCache2.prototype.clear = mapCacheClear2;
        MapCache2.prototype["delete"] = mapCacheDelete2;
        MapCache2.prototype.get = mapCacheGet2;
        MapCache2.prototype.has = mapCacheHas2;
        MapCache2.prototype.set = mapCacheSet2;
        function SetCache(values2) {
          var index = -1, length = values2 == null ? 0 : values2.length;
          this.__data__ = new MapCache2();
          while (++index < length) {
            this.add(values2[index]);
          }
        }
        function setCacheAdd(value) {
          this.__data__.set(value, HASH_UNDEFINED2);
          return this;
        }
        function setCacheHas(value) {
          return this.__data__.has(value);
        }
        SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
        SetCache.prototype.has = setCacheHas;
        function Stack(entries) {
          var data = this.__data__ = new ListCache2(entries);
          this.size = data.size;
        }
        function stackClear() {
          this.__data__ = new ListCache2();
          this.size = 0;
        }
        function stackDelete(key) {
          var data = this.__data__, result2 = data["delete"](key);
          this.size = data.size;
          return result2;
        }
        function stackGet(key) {
          return this.__data__.get(key);
        }
        function stackHas(key) {
          return this.__data__.has(key);
        }
        function stackSet(key, value) {
          var data = this.__data__;
          if (data instanceof ListCache2) {
            var pairs = data.__data__;
            if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
              pairs.push([key, value]);
              this.size = ++data.size;
              return this;
            }
            data = this.__data__ = new MapCache2(pairs);
          }
          data.set(key, value);
          this.size = data.size;
          return this;
        }
        Stack.prototype.clear = stackClear;
        Stack.prototype["delete"] = stackDelete;
        Stack.prototype.get = stackGet;
        Stack.prototype.has = stackHas;
        Stack.prototype.set = stackSet;
        function arrayLikeKeys(value, inherited) {
          var isArr = isArray2(value), isArg = !isArr && isArguments2(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
          for (var key in value) {
            if ((inherited || hasOwnProperty2.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
            (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
            isIndex2(key, length)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function arraySample(array) {
          var length = array.length;
          return length ? array[baseRandom(0, length - 1)] : undefined$1;
        }
        function arraySampleSize(array, n) {
          return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
        }
        function arrayShuffle(array) {
          return shuffleSelf(copyArray(array));
        }
        function assignMergeValue(object, key, value) {
          if (value !== undefined$1 && !eq2(object[key], value) || value === undefined$1 && !(key in object)) {
            baseAssignValue2(object, key, value);
          }
        }
        function assignValue2(object, key, value) {
          var objValue = object[key];
          if (!(hasOwnProperty2.call(object, key) && eq2(objValue, value)) || value === undefined$1 && !(key in object)) {
            baseAssignValue2(object, key, value);
          }
        }
        function assocIndexOf2(array, key) {
          var length = array.length;
          while (length--) {
            if (eq2(array[length][0], key)) {
              return length;
            }
          }
          return -1;
        }
        function baseAggregator(collection, setter, iteratee2, accumulator) {
          baseEach(collection, function(value, key, collection2) {
            setter(accumulator, value, iteratee2(value), collection2);
          });
          return accumulator;
        }
        function baseAssign(object, source) {
          return object && copyObject(source, keys(source), object);
        }
        function baseAssignIn(object, source) {
          return object && copyObject(source, keysIn(source), object);
        }
        function baseAssignValue2(object, key, value) {
          if (key == "__proto__" && defineProperty2) {
            defineProperty2(object, key, {
              "configurable": true,
              "enumerable": true,
              "value": value,
              "writable": true
            });
          } else {
            object[key] = value;
          }
        }
        function baseAt(object, paths) {
          var index = -1, length = paths.length, result2 = Array2(length), skip = object == null;
          while (++index < length) {
            result2[index] = skip ? undefined$1 : get2(object, paths[index]);
          }
          return result2;
        }
        function baseClamp(number, lower, upper) {
          if (number === number) {
            if (upper !== undefined$1) {
              number = number <= upper ? number : upper;
            }
            if (lower !== undefined$1) {
              number = number >= lower ? number : lower;
            }
          }
          return number;
        }
        function baseClone(value, bitmask, customizer, key, object, stack) {
          var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
          if (customizer) {
            result2 = object ? customizer(value, key, object, stack) : customizer(value);
          }
          if (result2 !== undefined$1) {
            return result2;
          }
          if (!isObject2(value)) {
            return value;
          }
          var isArr = isArray2(value);
          if (isArr) {
            result2 = initCloneArray(value);
            if (!isDeep) {
              return copyArray(value, result2);
            }
          } else {
            var tag = getTag(value), isFunc = tag == funcTag2 || tag == genTag2;
            if (isBuffer(value)) {
              return cloneBuffer(value, isDeep);
            }
            if (tag == objectTag || tag == argsTag2 || isFunc && !object) {
              result2 = isFlat || isFunc ? {} : initCloneObject(value);
              if (!isDeep) {
                return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
              }
            } else {
              if (!cloneableTags[tag]) {
                return object ? value : {};
              }
              result2 = initCloneByTag(value, tag, isDeep);
            }
          }
          stack || (stack = new Stack());
          var stacked = stack.get(value);
          if (stacked) {
            return stacked;
          }
          stack.set(value, result2);
          if (isSet(value)) {
            value.forEach(function(subValue) {
              result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
            });
          } else if (isMap(value)) {
            value.forEach(function(subValue, key2) {
              result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
            });
          }
          var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
          var props = isArr ? undefined$1 : keysFunc(value);
          arrayEach(props || value, function(subValue, key2) {
            if (props) {
              key2 = subValue;
              subValue = value[key2];
            }
            assignValue2(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
          });
          return result2;
        }
        function baseConforms(source) {
          var props = keys(source);
          return function(object) {
            return baseConformsTo(object, source, props);
          };
        }
        function baseConformsTo(object, source, props) {
          var length = props.length;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (length--) {
            var key = props[length], predicate = source[key], value = object[key];
            if (value === undefined$1 && !(key in object) || !predicate(value)) {
              return false;
            }
          }
          return true;
        }
        function baseDelay(func, wait, args) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT2);
          }
          return setTimeout2(function() {
            func.apply(undefined$1, args);
          }, wait);
        }
        function baseDifference(array, values2, iteratee2, comparator) {
          var index = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
          if (!length) {
            return result2;
          }
          if (iteratee2) {
            values2 = arrayMap2(values2, baseUnary(iteratee2));
          }
          if (comparator) {
            includes2 = arrayIncludesWith;
            isCommon = false;
          } else if (values2.length >= LARGE_ARRAY_SIZE) {
            includes2 = cacheHas;
            isCommon = false;
            values2 = new SetCache(values2);
          }
          outer:
            while (++index < length) {
              var value = array[index], computed2 = iteratee2 == null ? value : iteratee2(value);
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed2 === computed2) {
                var valuesIndex = valuesLength;
                while (valuesIndex--) {
                  if (values2[valuesIndex] === computed2) {
                    continue outer;
                  }
                }
                result2.push(value);
              } else if (!includes2(values2, computed2, comparator)) {
                result2.push(value);
              }
            }
          return result2;
        }
        var baseEach = createBaseEach(baseForOwn);
        var baseEachRight = createBaseEach(baseForOwnRight, true);
        function baseEvery(collection, predicate) {
          var result2 = true;
          baseEach(collection, function(value, index, collection2) {
            result2 = !!predicate(value, index, collection2);
            return result2;
          });
          return result2;
        }
        function baseExtremum(array, iteratee2, comparator) {
          var index = -1, length = array.length;
          while (++index < length) {
            var value = array[index], current = iteratee2(value);
            if (current != null && (computed2 === undefined$1 ? current === current && !isSymbol2(current) : comparator(current, computed2))) {
              var computed2 = current, result2 = value;
            }
          }
          return result2;
        }
        function baseFill(array, value, start, end) {
          var length = array.length;
          start = toInteger(start);
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end === undefined$1 || end > length ? length : toInteger(end);
          if (end < 0) {
            end += length;
          }
          end = start > end ? 0 : toLength(end);
          while (start < end) {
            array[start++] = value;
          }
          return array;
        }
        function baseFilter(collection, predicate) {
          var result2 = [];
          baseEach(collection, function(value, index, collection2) {
            if (predicate(value, index, collection2)) {
              result2.push(value);
            }
          });
          return result2;
        }
        function baseFlatten2(array, depth, predicate, isStrict, result2) {
          var index = -1, length = array.length;
          predicate || (predicate = isFlattenable2);
          result2 || (result2 = []);
          while (++index < length) {
            var value = array[index];
            if (depth > 0 && predicate(value)) {
              if (depth > 1) {
                baseFlatten2(value, depth - 1, predicate, isStrict, result2);
              } else {
                arrayPush2(result2, value);
              }
            } else if (!isStrict) {
              result2[result2.length] = value;
            }
          }
          return result2;
        }
        var baseFor = createBaseFor();
        var baseForRight = createBaseFor(true);
        function baseForOwn(object, iteratee2) {
          return object && baseFor(object, iteratee2, keys);
        }
        function baseForOwnRight(object, iteratee2) {
          return object && baseForRight(object, iteratee2, keys);
        }
        function baseFunctions(object, props) {
          return arrayFilter(props, function(key) {
            return isFunction2(object[key]);
          });
        }
        function baseGet2(object, path) {
          path = castPath2(path, object);
          var index = 0, length = path.length;
          while (object != null && index < length) {
            object = object[toKey2(path[index++])];
          }
          return index && index == length ? object : undefined$1;
        }
        function baseGetAllKeys(object, keysFunc, symbolsFunc) {
          var result2 = keysFunc(object);
          return isArray2(object) ? result2 : arrayPush2(result2, symbolsFunc(object));
        }
        function baseGetTag2(value) {
          if (value == null) {
            return value === undefined$1 ? undefinedTag2 : nullTag2;
          }
          return symToStringTag2 && symToStringTag2 in Object2(value) ? getRawTag2(value) : objectToString2(value);
        }
        function baseGt(value, other) {
          return value > other;
        }
        function baseHas(object, key) {
          return object != null && hasOwnProperty2.call(object, key);
        }
        function baseHasIn2(object, key) {
          return object != null && key in Object2(object);
        }
        function baseInRange(number, start, end) {
          return number >= nativeMin(start, end) && number < nativeMax2(start, end);
        }
        function baseIntersection(arrays, iteratee2, comparator) {
          var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
          while (othIndex--) {
            var array = arrays[othIndex];
            if (othIndex && iteratee2) {
              array = arrayMap2(array, baseUnary(iteratee2));
            }
            maxLength = nativeMin(array.length, maxLength);
            caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined$1;
          }
          array = arrays[0];
          var index = -1, seen = caches[0];
          outer:
            while (++index < length && result2.length < maxLength) {
              var value = array[index], computed2 = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (!(seen ? cacheHas(seen, computed2) : includes2(result2, computed2, comparator))) {
                othIndex = othLength;
                while (--othIndex) {
                  var cache = caches[othIndex];
                  if (!(cache ? cacheHas(cache, computed2) : includes2(arrays[othIndex], computed2, comparator))) {
                    continue outer;
                  }
                }
                if (seen) {
                  seen.push(computed2);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseInverter(object, setter, iteratee2, accumulator) {
          baseForOwn(object, function(value, key, object2) {
            setter(accumulator, iteratee2(value), key, object2);
          });
          return accumulator;
        }
        function baseInvoke(object, path, args) {
          path = castPath2(path, object);
          object = parent(object, path);
          var func = object == null ? object : object[toKey2(last(path))];
          return func == null ? undefined$1 : apply2(func, object, args);
        }
        function baseIsArguments2(value) {
          return isObjectLike2(value) && baseGetTag2(value) == argsTag2;
        }
        function baseIsArrayBuffer(value) {
          return isObjectLike2(value) && baseGetTag2(value) == arrayBufferTag;
        }
        function baseIsDate(value) {
          return isObjectLike2(value) && baseGetTag2(value) == dateTag;
        }
        function baseIsEqual(value, other, bitmask, customizer, stack) {
          if (value === other) {
            return true;
          }
          if (value == null || other == null || !isObjectLike2(value) && !isObjectLike2(other)) {
            return value !== value && other !== other;
          }
          return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
        }
        function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
          var objIsArr = isArray2(object), othIsArr = isArray2(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
          objTag = objTag == argsTag2 ? objectTag : objTag;
          othTag = othTag == argsTag2 ? objectTag : othTag;
          var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
          if (isSameTag && isBuffer(object)) {
            if (!isBuffer(other)) {
              return false;
            }
            objIsArr = true;
            objIsObj = false;
          }
          if (isSameTag && !objIsObj) {
            stack || (stack = new Stack());
            return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
          }
          if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
            var objIsWrapped = objIsObj && hasOwnProperty2.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty2.call(other, "__wrapped__");
            if (objIsWrapped || othIsWrapped) {
              var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
              stack || (stack = new Stack());
              return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
            }
          }
          if (!isSameTag) {
            return false;
          }
          stack || (stack = new Stack());
          return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
        }
        function baseIsMap(value) {
          return isObjectLike2(value) && getTag(value) == mapTag;
        }
        function baseIsMatch(object, source, matchData, customizer) {
          var index = matchData.length, length = index, noCustomizer = !customizer;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (index--) {
            var data = matchData[index];
            if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
              return false;
            }
          }
          while (++index < length) {
            data = matchData[index];
            var key = data[0], objValue = object[key], srcValue = data[1];
            if (noCustomizer && data[2]) {
              if (objValue === undefined$1 && !(key in object)) {
                return false;
              }
            } else {
              var stack = new Stack();
              if (customizer) {
                var result2 = customizer(objValue, srcValue, key, object, source, stack);
              }
              if (!(result2 === undefined$1 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
                return false;
              }
            }
          }
          return true;
        }
        function baseIsNative2(value) {
          if (!isObject2(value) || isMasked2(value)) {
            return false;
          }
          var pattern = isFunction2(value) ? reIsNative2 : reIsHostCtor2;
          return pattern.test(toSource2(value));
        }
        function baseIsRegExp(value) {
          return isObjectLike2(value) && baseGetTag2(value) == regexpTag;
        }
        function baseIsSet(value) {
          return isObjectLike2(value) && getTag(value) == setTag;
        }
        function baseIsTypedArray(value) {
          return isObjectLike2(value) && isLength2(value.length) && !!typedArrayTags[baseGetTag2(value)];
        }
        function baseIteratee(value) {
          if (typeof value == "function") {
            return value;
          }
          if (value == null) {
            return identity2;
          }
          if (typeof value == "object") {
            return isArray2(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
          }
          return property(value);
        }
        function baseKeys(object) {
          if (!isPrototype(object)) {
            return nativeKeys(object);
          }
          var result2 = [];
          for (var key in Object2(object)) {
            if (hasOwnProperty2.call(object, key) && key != "constructor") {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseKeysIn(object) {
          if (!isObject2(object)) {
            return nativeKeysIn(object);
          }
          var isProto = isPrototype(object), result2 = [];
          for (var key in object) {
            if (!(key == "constructor" && (isProto || !hasOwnProperty2.call(object, key)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseLt(value, other) {
          return value < other;
        }
        function baseMap(collection, iteratee2) {
          var index = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value, key, collection2) {
            result2[++index] = iteratee2(value, key, collection2);
          });
          return result2;
        }
        function baseMatches(source) {
          var matchData = getMatchData(source);
          if (matchData.length == 1 && matchData[0][2]) {
            return matchesStrictComparable(matchData[0][0], matchData[0][1]);
          }
          return function(object) {
            return object === source || baseIsMatch(object, source, matchData);
          };
        }
        function baseMatchesProperty(path, srcValue) {
          if (isKey2(path) && isStrictComparable(srcValue)) {
            return matchesStrictComparable(toKey2(path), srcValue);
          }
          return function(object) {
            var objValue = get2(object, path);
            return objValue === undefined$1 && objValue === srcValue ? hasIn2(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
          };
        }
        function baseMerge(object, source, srcIndex, customizer, stack) {
          if (object === source) {
            return;
          }
          baseFor(source, function(srcValue, key) {
            stack || (stack = new Stack());
            if (isObject2(srcValue)) {
              baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
            } else {
              var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined$1;
              if (newValue === undefined$1) {
                newValue = srcValue;
              }
              assignMergeValue(object, key, newValue);
            }
          }, keysIn);
        }
        function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
          var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
          if (stacked) {
            assignMergeValue(object, key, stacked);
            return;
          }
          var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined$1;
          var isCommon = newValue === undefined$1;
          if (isCommon) {
            var isArr = isArray2(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
            newValue = srcValue;
            if (isArr || isBuff || isTyped) {
              if (isArray2(objValue)) {
                newValue = objValue;
              } else if (isArrayLikeObject(objValue)) {
                newValue = copyArray(objValue);
              } else if (isBuff) {
                isCommon = false;
                newValue = cloneBuffer(srcValue, true);
              } else if (isTyped) {
                isCommon = false;
                newValue = cloneTypedArray(srcValue, true);
              } else {
                newValue = [];
              }
            } else if (isPlainObject(srcValue) || isArguments2(srcValue)) {
              newValue = objValue;
              if (isArguments2(objValue)) {
                newValue = toPlainObject(objValue);
              } else if (!isObject2(objValue) || isFunction2(objValue)) {
                newValue = initCloneObject(srcValue);
              }
            } else {
              isCommon = false;
            }
          }
          if (isCommon) {
            stack.set(srcValue, newValue);
            mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
            stack["delete"](srcValue);
          }
          assignMergeValue(object, key, newValue);
        }
        function baseNth(array, n) {
          var length = array.length;
          if (!length) {
            return;
          }
          n += n < 0 ? length : 0;
          return isIndex2(n, length) ? array[n] : undefined$1;
        }
        function baseOrderBy(collection, iteratees, orders) {
          if (iteratees.length) {
            iteratees = arrayMap2(iteratees, function(iteratee2) {
              if (isArray2(iteratee2)) {
                return function(value) {
                  return baseGet2(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                };
              }
              return iteratee2;
            });
          } else {
            iteratees = [identity2];
          }
          var index = -1;
          iteratees = arrayMap2(iteratees, baseUnary(getIteratee()));
          var result2 = baseMap(collection, function(value, key, collection2) {
            var criteria = arrayMap2(iteratees, function(iteratee2) {
              return iteratee2(value);
            });
            return { "criteria": criteria, "index": ++index, "value": value };
          });
          return baseSortBy(result2, function(object, other) {
            return compareMultiple(object, other, orders);
          });
        }
        function basePick2(object, paths) {
          return basePickBy2(object, paths, function(value, path) {
            return hasIn2(object, path);
          });
        }
        function basePickBy2(object, paths, predicate) {
          var index = -1, length = paths.length, result2 = {};
          while (++index < length) {
            var path = paths[index], value = baseGet2(object, path);
            if (predicate(value, path)) {
              baseSet2(result2, castPath2(path, object), value);
            }
          }
          return result2;
        }
        function basePropertyDeep(path) {
          return function(object) {
            return baseGet2(object, path);
          };
        }
        function basePullAll(array, values2, iteratee2, comparator) {
          var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values2.length, seen = array;
          if (array === values2) {
            values2 = copyArray(values2);
          }
          if (iteratee2) {
            seen = arrayMap2(array, baseUnary(iteratee2));
          }
          while (++index < length) {
            var fromIndex = 0, value = values2[index], computed2 = iteratee2 ? iteratee2(value) : value;
            while ((fromIndex = indexOf2(seen, computed2, fromIndex, comparator)) > -1) {
              if (seen !== array) {
                splice2.call(seen, fromIndex, 1);
              }
              splice2.call(array, fromIndex, 1);
            }
          }
          return array;
        }
        function basePullAt(array, indexes) {
          var length = array ? indexes.length : 0, lastIndex = length - 1;
          while (length--) {
            var index = indexes[length];
            if (length == lastIndex || index !== previous) {
              var previous = index;
              if (isIndex2(index)) {
                splice2.call(array, index, 1);
              } else {
                baseUnset(array, index);
              }
            }
          }
          return array;
        }
        function baseRandom(lower, upper) {
          return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
        }
        function baseRange(start, end, step, fromRight) {
          var index = -1, length = nativeMax2(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
          while (length--) {
            result2[fromRight ? length : ++index] = start;
            start += step;
          }
          return result2;
        }
        function baseRepeat(string, n) {
          var result2 = "";
          if (!string || n < 1 || n > MAX_SAFE_INTEGER2) {
            return result2;
          }
          do {
            if (n % 2) {
              result2 += string;
            }
            n = nativeFloor(n / 2);
            if (n) {
              string += string;
            }
          } while (n);
          return result2;
        }
        function baseRest(func, start) {
          return setToString2(overRest2(func, start, identity2), func + "");
        }
        function baseSample(collection) {
          return arraySample(values(collection));
        }
        function baseSampleSize(collection, n) {
          var array = values(collection);
          return shuffleSelf(array, baseClamp(n, 0, array.length));
        }
        function baseSet2(object, path, value, customizer) {
          if (!isObject2(object)) {
            return object;
          }
          path = castPath2(path, object);
          var index = -1, length = path.length, lastIndex = length - 1, nested = object;
          while (nested != null && ++index < length) {
            var key = toKey2(path[index]), newValue = value;
            if (key === "__proto__" || key === "constructor" || key === "prototype") {
              return object;
            }
            if (index != lastIndex) {
              var objValue = nested[key];
              newValue = customizer ? customizer(objValue, key, nested) : undefined$1;
              if (newValue === undefined$1) {
                newValue = isObject2(objValue) ? objValue : isIndex2(path[index + 1]) ? [] : {};
              }
            }
            assignValue2(nested, key, newValue);
            nested = nested[key];
          }
          return object;
        }
        var baseSetData = !metaMap ? identity2 : function(func, data) {
          metaMap.set(func, data);
          return func;
        };
        var baseSetToString2 = !defineProperty2 ? identity2 : function(func, string) {
          return defineProperty2(func, "toString", {
            "configurable": true,
            "enumerable": false,
            "value": constant2(string),
            "writable": true
          });
        };
        function baseShuffle(collection) {
          return shuffleSelf(values(collection));
        }
        function baseSlice(array, start, end) {
          var index = -1, length = array.length;
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end > length ? length : end;
          if (end < 0) {
            end += length;
          }
          length = start > end ? 0 : end - start >>> 0;
          start >>>= 0;
          var result2 = Array2(length);
          while (++index < length) {
            result2[index] = array[index + start];
          }
          return result2;
        }
        function baseSome(collection, predicate) {
          var result2;
          baseEach(collection, function(value, index, collection2) {
            result2 = predicate(value, index, collection2);
            return !result2;
          });
          return !!result2;
        }
        function baseSortedIndex(array, value, retHighest) {
          var low = 0, high = array == null ? low : array.length;
          if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
            while (low < high) {
              var mid = low + high >>> 1, computed2 = array[mid];
              if (computed2 !== null && !isSymbol2(computed2) && (retHighest ? computed2 <= value : computed2 < value)) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return high;
          }
          return baseSortedIndexBy(array, value, identity2, retHighest);
        }
        function baseSortedIndexBy(array, value, iteratee2, retHighest) {
          var low = 0, high = array == null ? 0 : array.length;
          if (high === 0) {
            return 0;
          }
          value = iteratee2(value);
          var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol2(value), valIsUndefined = value === undefined$1;
          while (low < high) {
            var mid = nativeFloor((low + high) / 2), computed2 = iteratee2(array[mid]), othIsDefined = computed2 !== undefined$1, othIsNull = computed2 === null, othIsReflexive = computed2 === computed2, othIsSymbol = isSymbol2(computed2);
            if (valIsNaN) {
              var setLow = retHighest || othIsReflexive;
            } else if (valIsUndefined) {
              setLow = othIsReflexive && (retHighest || othIsDefined);
            } else if (valIsNull) {
              setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
            } else if (valIsSymbol) {
              setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
            } else if (othIsNull || othIsSymbol) {
              setLow = false;
            } else {
              setLow = retHighest ? computed2 <= value : computed2 < value;
            }
            if (setLow) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return nativeMin(high, MAX_ARRAY_INDEX);
        }
        function baseSortedUniq(array, iteratee2) {
          var index = -1, length = array.length, resIndex = 0, result2 = [];
          while (++index < length) {
            var value = array[index], computed2 = iteratee2 ? iteratee2(value) : value;
            if (!index || !eq2(computed2, seen)) {
              var seen = computed2;
              result2[resIndex++] = value === 0 ? 0 : value;
            }
          }
          return result2;
        }
        function baseToNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol2(value)) {
            return NAN;
          }
          return +value;
        }
        function baseToString2(value) {
          if (typeof value == "string") {
            return value;
          }
          if (isArray2(value)) {
            return arrayMap2(value, baseToString2) + "";
          }
          if (isSymbol2(value)) {
            return symbolToString2 ? symbolToString2.call(value) : "";
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY2 ? "-0" : result2;
        }
        function baseUniq(array, iteratee2, comparator) {
          var index = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
          if (comparator) {
            isCommon = false;
            includes2 = arrayIncludesWith;
          } else if (length >= LARGE_ARRAY_SIZE) {
            var set2 = iteratee2 ? null : createSet(array);
            if (set2) {
              return setToArray(set2);
            }
            isCommon = false;
            includes2 = cacheHas;
            seen = new SetCache();
          } else {
            seen = iteratee2 ? [] : result2;
          }
          outer:
            while (++index < length) {
              var value = array[index], computed2 = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed2 === computed2) {
                var seenIndex = seen.length;
                while (seenIndex--) {
                  if (seen[seenIndex] === computed2) {
                    continue outer;
                  }
                }
                if (iteratee2) {
                  seen.push(computed2);
                }
                result2.push(value);
              } else if (!includes2(seen, computed2, comparator)) {
                if (seen !== result2) {
                  seen.push(computed2);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseUnset(object, path) {
          path = castPath2(path, object);
          object = parent(object, path);
          return object == null || delete object[toKey2(last(path))];
        }
        function baseUpdate(object, path, updater, customizer) {
          return baseSet2(object, path, updater(baseGet2(object, path)), customizer);
        }
        function baseWhile(array, predicate, isDrop, fromRight) {
          var length = array.length, index = fromRight ? length : -1;
          while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
          }
          return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
        }
        function baseWrapperValue(value, actions) {
          var result2 = value;
          if (result2 instanceof LazyWrapper) {
            result2 = result2.value();
          }
          return arrayReduce(actions, function(result3, action) {
            return action.func.apply(action.thisArg, arrayPush2([result3], action.args));
          }, result2);
        }
        function baseXor(arrays, iteratee2, comparator) {
          var length = arrays.length;
          if (length < 2) {
            return length ? baseUniq(arrays[0]) : [];
          }
          var index = -1, result2 = Array2(length);
          while (++index < length) {
            var array = arrays[index], othIndex = -1;
            while (++othIndex < length) {
              if (othIndex != index) {
                result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
              }
            }
          }
          return baseUniq(baseFlatten2(result2, 1), iteratee2, comparator);
        }
        function baseZipObject(props, values2, assignFunc) {
          var index = -1, length = props.length, valsLength = values2.length, result2 = {};
          while (++index < length) {
            var value = index < valsLength ? values2[index] : undefined$1;
            assignFunc(result2, props[index], value);
          }
          return result2;
        }
        function castArrayLikeObject(value) {
          return isArrayLikeObject(value) ? value : [];
        }
        function castFunction(value) {
          return typeof value == "function" ? value : identity2;
        }
        function castPath2(value, object) {
          if (isArray2(value)) {
            return value;
          }
          return isKey2(value, object) ? [value] : stringToPath2(toString2(value));
        }
        var castRest = baseRest;
        function castSlice(array, start, end) {
          var length = array.length;
          end = end === undefined$1 ? length : end;
          return !start && end >= length ? array : baseSlice(array, start, end);
        }
        var clearTimeout2 = ctxClearTimeout || function(id) {
          return root2.clearTimeout(id);
        };
        function cloneBuffer(buffer, isDeep) {
          if (isDeep) {
            return buffer.slice();
          }
          var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
          buffer.copy(result2);
          return result2;
        }
        function cloneArrayBuffer(arrayBuffer) {
          var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
          new Uint8Array(result2).set(new Uint8Array(arrayBuffer));
          return result2;
        }
        function cloneDataView(dataView, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
          return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
        }
        function cloneRegExp(regexp) {
          var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
          result2.lastIndex = regexp.lastIndex;
          return result2;
        }
        function cloneSymbol(symbol) {
          return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
        }
        function cloneTypedArray(typedArray, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
          return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
        }
        function compareAscending(value, other) {
          if (value !== other) {
            var valIsDefined = value !== undefined$1, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol2(value);
            var othIsDefined = other !== undefined$1, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol2(other);
            if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
              return 1;
            }
            if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
              return -1;
            }
          }
          return 0;
        }
        function compareMultiple(object, other, orders) {
          var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
          while (++index < length) {
            var result2 = compareAscending(objCriteria[index], othCriteria[index]);
            if (result2) {
              if (index >= ordersLength) {
                return result2;
              }
              var order = orders[index];
              return result2 * (order == "desc" ? -1 : 1);
            }
          }
          return object.index - other.index;
        }
        function composeArgs(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax2(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
          while (++leftIndex < leftLength) {
            result2[leftIndex] = partials[leftIndex];
          }
          while (++argsIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[holders[argsIndex]] = args[argsIndex];
            }
          }
          while (rangeLength--) {
            result2[leftIndex++] = args[argsIndex++];
          }
          return result2;
        }
        function composeArgsRight(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax2(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
          while (++argsIndex < rangeLength) {
            result2[argsIndex] = args[argsIndex];
          }
          var offset = argsIndex;
          while (++rightIndex < rightLength) {
            result2[offset + rightIndex] = partials[rightIndex];
          }
          while (++holdersIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[offset + holders[holdersIndex]] = args[argsIndex++];
            }
          }
          return result2;
        }
        function copyArray(source, array) {
          var index = -1, length = source.length;
          array || (array = Array2(length));
          while (++index < length) {
            array[index] = source[index];
          }
          return array;
        }
        function copyObject(source, props, object, customizer) {
          var isNew = !object;
          object || (object = {});
          var index = -1, length = props.length;
          while (++index < length) {
            var key = props[index];
            var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined$1;
            if (newValue === undefined$1) {
              newValue = source[key];
            }
            if (isNew) {
              baseAssignValue2(object, key, newValue);
            } else {
              assignValue2(object, key, newValue);
            }
          }
          return object;
        }
        function copySymbols(source, object) {
          return copyObject(source, getSymbols(source), object);
        }
        function copySymbolsIn(source, object) {
          return copyObject(source, getSymbolsIn(source), object);
        }
        function createAggregator(setter, initializer) {
          return function(collection, iteratee2) {
            var func = isArray2(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
            return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
          };
        }
        function createAssigner(assigner) {
          return baseRest(function(object, sources) {
            var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined$1, guard = length > 2 ? sources[2] : undefined$1;
            customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined$1;
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              customizer = length < 3 ? undefined$1 : customizer;
              length = 1;
            }
            object = Object2(object);
            while (++index < length) {
              var source = sources[index];
              if (source) {
                assigner(object, source, index, customizer);
              }
            }
            return object;
          });
        }
        function createBaseEach(eachFunc, fromRight) {
          return function(collection, iteratee2) {
            if (collection == null) {
              return collection;
            }
            if (!isArrayLike(collection)) {
              return eachFunc(collection, iteratee2);
            }
            var length = collection.length, index = fromRight ? length : -1, iterable = Object2(collection);
            while (fromRight ? index-- : ++index < length) {
              if (iteratee2(iterable[index], index, iterable) === false) {
                break;
              }
            }
            return collection;
          };
        }
        function createBaseFor(fromRight) {
          return function(object, iteratee2, keysFunc) {
            var index = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
            while (length--) {
              var key = props[fromRight ? length : ++index];
              if (iteratee2(iterable[key], key, iterable) === false) {
                break;
              }
            }
            return object;
          };
        }
        function createBind(func, bitmask, thisArg) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var fn = this && this !== root2 && this instanceof wrapper ? Ctor : func;
            return fn.apply(isBind ? thisArg : this, arguments);
          }
          return wrapper;
        }
        function createCaseFirst(methodName) {
          return function(string) {
            string = toString2(string);
            var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined$1;
            var chr = strSymbols ? strSymbols[0] : string.charAt(0);
            var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
            return chr[methodName]() + trailing;
          };
        }
        function createCompounder(callback) {
          return function(string) {
            return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
          };
        }
        function createCtor(Ctor) {
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return new Ctor();
              case 1:
                return new Ctor(args[0]);
              case 2:
                return new Ctor(args[0], args[1]);
              case 3:
                return new Ctor(args[0], args[1], args[2]);
              case 4:
                return new Ctor(args[0], args[1], args[2], args[3]);
              case 5:
                return new Ctor(args[0], args[1], args[2], args[3], args[4]);
              case 6:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
              case 7:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
            }
            var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
            return isObject2(result2) ? result2 : thisBinding;
          };
        }
        function createCurry(func, bitmask, arity) {
          var Ctor = createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index = length, placeholder = getHolder(wrapper);
            while (index--) {
              args[index] = arguments[index];
            }
            var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
            length -= holders.length;
            if (length < arity) {
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                undefined$1,
                args,
                holders,
                undefined$1,
                undefined$1,
                arity - length
              );
            }
            var fn = this && this !== root2 && this instanceof wrapper ? Ctor : func;
            return apply2(fn, this, args);
          }
          return wrapper;
        }
        function createFind(findIndexFunc) {
          return function(collection, predicate, fromIndex) {
            var iterable = Object2(collection);
            if (!isArrayLike(collection)) {
              var iteratee2 = getIteratee(predicate, 3);
              collection = keys(collection);
              predicate = function(key) {
                return iteratee2(iterable[key], key, iterable);
              };
            }
            var index = findIndexFunc(collection, predicate, fromIndex);
            return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined$1;
          };
        }
        function createFlow(fromRight) {
          return flatRest2(function(funcs) {
            var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
            if (fromRight) {
              funcs.reverse();
            }
            while (index--) {
              var func = funcs[index];
              if (typeof func != "function") {
                throw new TypeError2(FUNC_ERROR_TEXT2);
              }
              if (prereq && !wrapper && getFuncName(func) == "wrapper") {
                var wrapper = new LodashWrapper([], true);
              }
            }
            index = wrapper ? index : length;
            while (++index < length) {
              func = funcs[index];
              var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined$1;
              if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
              } else {
                wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
              }
            }
            return function() {
              var args = arguments, value = args[0];
              if (wrapper && args.length == 1 && isArray2(value)) {
                return wrapper.plant(value).value();
              }
              var index2 = 0, result2 = length ? funcs[index2].apply(this, args) : value;
              while (++index2 < length) {
                result2 = funcs[index2].call(this, result2);
              }
              return result2;
            };
          });
        }
        function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
          var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined$1 : createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index = length;
            while (index--) {
              args[index] = arguments[index];
            }
            if (isCurried) {
              var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
            }
            if (partials) {
              args = composeArgs(args, partials, holders, isCurried);
            }
            if (partialsRight) {
              args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
            }
            length -= holdersCount;
            if (isCurried && length < arity) {
              var newHolders = replaceHolders(args, placeholder);
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                thisArg,
                args,
                newHolders,
                argPos,
                ary2,
                arity - length
              );
            }
            var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
            length = args.length;
            if (argPos) {
              args = reorder(args, argPos);
            } else if (isFlip && length > 1) {
              args.reverse();
            }
            if (isAry && ary2 < length) {
              args.length = ary2;
            }
            if (this && this !== root2 && this instanceof wrapper) {
              fn = Ctor || createCtor(fn);
            }
            return fn.apply(thisBinding, args);
          }
          return wrapper;
        }
        function createInverter(setter, toIteratee) {
          return function(object, iteratee2) {
            return baseInverter(object, setter, toIteratee(iteratee2), {});
          };
        }
        function createMathOperation(operator, defaultValue) {
          return function(value, other) {
            var result2;
            if (value === undefined$1 && other === undefined$1) {
              return defaultValue;
            }
            if (value !== undefined$1) {
              result2 = value;
            }
            if (other !== undefined$1) {
              if (result2 === undefined$1) {
                return other;
              }
              if (typeof value == "string" || typeof other == "string") {
                value = baseToString2(value);
                other = baseToString2(other);
              } else {
                value = baseToNumber(value);
                other = baseToNumber(other);
              }
              result2 = operator(value, other);
            }
            return result2;
          };
        }
        function createOver(arrayFunc) {
          return flatRest2(function(iteratees) {
            iteratees = arrayMap2(iteratees, baseUnary(getIteratee()));
            return baseRest(function(args) {
              var thisArg = this;
              return arrayFunc(iteratees, function(iteratee2) {
                return apply2(iteratee2, thisArg, args);
              });
            });
          });
        }
        function createPadding(length, chars) {
          chars = chars === undefined$1 ? " " : baseToString2(chars);
          var charsLength = chars.length;
          if (charsLength < 2) {
            return charsLength ? baseRepeat(chars, length) : chars;
          }
          var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
          return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
        }
        function createPartial(func, bitmask, thisArg, partials) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root2 && this instanceof wrapper ? Ctor : func;
            while (++leftIndex < leftLength) {
              args[leftIndex] = partials[leftIndex];
            }
            while (argsLength--) {
              args[leftIndex++] = arguments[++argsIndex];
            }
            return apply2(fn, isBind ? thisArg : this, args);
          }
          return wrapper;
        }
        function createRange(fromRight) {
          return function(start, end, step) {
            if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
              end = step = undefined$1;
            }
            start = toFinite(start);
            if (end === undefined$1) {
              end = start;
              start = 0;
            } else {
              end = toFinite(end);
            }
            step = step === undefined$1 ? start < end ? 1 : -1 : toFinite(step);
            return baseRange(start, end, step, fromRight);
          };
        }
        function createRelationalOperation(operator) {
          return function(value, other) {
            if (!(typeof value == "string" && typeof other == "string")) {
              value = toNumber(value);
              other = toNumber(other);
            }
            return operator(value, other);
          };
        }
        function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
          var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined$1, newHoldersRight = isCurry ? undefined$1 : holders, newPartials = isCurry ? partials : undefined$1, newPartialsRight = isCurry ? undefined$1 : partials;
          bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
          bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
          if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
            bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
          }
          var newData = [
            func,
            bitmask,
            thisArg,
            newPartials,
            newHolders,
            newPartialsRight,
            newHoldersRight,
            argPos,
            ary2,
            arity
          ];
          var result2 = wrapFunc.apply(undefined$1, newData);
          if (isLaziable(func)) {
            setData(result2, newData);
          }
          result2.placeholder = placeholder;
          return setWrapToString(result2, func, bitmask);
        }
        function createRound(methodName) {
          var func = Math2[methodName];
          return function(number, precision) {
            number = toNumber(number);
            precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
            if (precision && nativeIsFinite(number)) {
              var pair = (toString2(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
              pair = (toString2(value) + "e").split("e");
              return +(pair[0] + "e" + (+pair[1] - precision));
            }
            return func(number);
          };
        }
        var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY2) ? noop2 : function(values2) {
          return new Set2(values2);
        };
        function createToPairs(keysFunc) {
          return function(object) {
            var tag = getTag(object);
            if (tag == mapTag) {
              return mapToArray(object);
            }
            if (tag == setTag) {
              return setToPairs(object);
            }
            return baseToPairs(object, keysFunc(object));
          };
        }
        function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
          var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
          if (!isBindKey && typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT2);
          }
          var length = partials ? partials.length : 0;
          if (!length) {
            bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
            partials = holders = undefined$1;
          }
          ary2 = ary2 === undefined$1 ? ary2 : nativeMax2(toInteger(ary2), 0);
          arity = arity === undefined$1 ? arity : toInteger(arity);
          length -= holders ? holders.length : 0;
          if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
            var partialsRight = partials, holdersRight = holders;
            partials = holders = undefined$1;
          }
          var data = isBindKey ? undefined$1 : getData(func);
          var newData = [
            func,
            bitmask,
            thisArg,
            partials,
            holders,
            partialsRight,
            holdersRight,
            argPos,
            ary2,
            arity
          ];
          if (data) {
            mergeData(newData, data);
          }
          func = newData[0];
          bitmask = newData[1];
          thisArg = newData[2];
          partials = newData[3];
          holders = newData[4];
          arity = newData[9] = newData[9] === undefined$1 ? isBindKey ? 0 : func.length : nativeMax2(newData[9] - length, 0);
          if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
            bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
          }
          if (!bitmask || bitmask == WRAP_BIND_FLAG) {
            var result2 = createBind(func, bitmask, thisArg);
          } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
            result2 = createCurry(func, bitmask, arity);
          } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
            result2 = createPartial(func, bitmask, thisArg, partials);
          } else {
            result2 = createHybrid.apply(undefined$1, newData);
          }
          var setter = data ? baseSetData : setData;
          return setWrapToString(setter(result2, newData), func, bitmask);
        }
        function customDefaultsAssignIn(objValue, srcValue, key, object) {
          if (objValue === undefined$1 || eq2(objValue, objectProto2[key]) && !hasOwnProperty2.call(object, key)) {
            return srcValue;
          }
          return objValue;
        }
        function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
          if (isObject2(objValue) && isObject2(srcValue)) {
            stack.set(srcValue, objValue);
            baseMerge(objValue, srcValue, undefined$1, customDefaultsMerge, stack);
            stack["delete"](srcValue);
          }
          return objValue;
        }
        function customOmitClone(value) {
          return isPlainObject(value) ? undefined$1 : value;
        }
        function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
          if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
            return false;
          }
          var arrStacked = stack.get(array);
          var othStacked = stack.get(other);
          if (arrStacked && othStacked) {
            return arrStacked == other && othStacked == array;
          }
          var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined$1;
          stack.set(array, other);
          stack.set(other, array);
          while (++index < arrLength) {
            var arrValue = array[index], othValue = other[index];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
            }
            if (compared !== undefined$1) {
              if (compared) {
                continue;
              }
              result2 = false;
              break;
            }
            if (seen) {
              if (!arraySome(other, function(othValue2, othIndex) {
                if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
                result2 = false;
                break;
              }
            } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              result2 = false;
              break;
            }
          }
          stack["delete"](array);
          stack["delete"](other);
          return result2;
        }
        function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
          switch (tag) {
            case dataViewTag:
              if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                return false;
              }
              object = object.buffer;
              other = other.buffer;
            case arrayBufferTag:
              if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
                return false;
              }
              return true;
            case boolTag:
            case dateTag:
            case numberTag:
              return eq2(+object, +other);
            case errorTag:
              return object.name == other.name && object.message == other.message;
            case regexpTag:
            case stringTag:
              return object == other + "";
            case mapTag:
              var convert = mapToArray;
            case setTag:
              var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
              convert || (convert = setToArray);
              if (object.size != other.size && !isPartial) {
                return false;
              }
              var stacked = stack.get(object);
              if (stacked) {
                return stacked == other;
              }
              bitmask |= COMPARE_UNORDERED_FLAG;
              stack.set(object, other);
              var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
              stack["delete"](object);
              return result2;
            case symbolTag2:
              if (symbolValueOf) {
                return symbolValueOf.call(object) == symbolValueOf.call(other);
              }
          }
          return false;
        }
        function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
          if (objLength != othLength && !isPartial) {
            return false;
          }
          var index = objLength;
          while (index--) {
            var key = objProps[index];
            if (!(isPartial ? key in other : hasOwnProperty2.call(other, key))) {
              return false;
            }
          }
          var objStacked = stack.get(object);
          var othStacked = stack.get(other);
          if (objStacked && othStacked) {
            return objStacked == other && othStacked == object;
          }
          var result2 = true;
          stack.set(object, other);
          stack.set(other, object);
          var skipCtor = isPartial;
          while (++index < objLength) {
            key = objProps[index];
            var objValue = object[key], othValue = other[key];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
            }
            if (!(compared === undefined$1 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
              result2 = false;
              break;
            }
            skipCtor || (skipCtor = key == "constructor");
          }
          if (result2 && !skipCtor) {
            var objCtor = object.constructor, othCtor = other.constructor;
            if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
              result2 = false;
            }
          }
          stack["delete"](object);
          stack["delete"](other);
          return result2;
        }
        function flatRest2(func) {
          return setToString2(overRest2(func, undefined$1, flatten2), func + "");
        }
        function getAllKeys(object) {
          return baseGetAllKeys(object, keys, getSymbols);
        }
        function getAllKeysIn(object) {
          return baseGetAllKeys(object, keysIn, getSymbolsIn);
        }
        var getData = !metaMap ? noop2 : function(func) {
          return metaMap.get(func);
        };
        function getFuncName(func) {
          var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty2.call(realNames, result2) ? array.length : 0;
          while (length--) {
            var data = array[length], otherFunc = data.func;
            if (otherFunc == null || otherFunc == func) {
              return data.name;
            }
          }
          return result2;
        }
        function getHolder(func) {
          var object = hasOwnProperty2.call(lodash2, "placeholder") ? lodash2 : func;
          return object.placeholder;
        }
        function getIteratee() {
          var result2 = lodash2.iteratee || iteratee;
          result2 = result2 === iteratee ? baseIteratee : result2;
          return arguments.length ? result2(arguments[0], arguments[1]) : result2;
        }
        function getMapData2(map2, key) {
          var data = map2.__data__;
          return isKeyable2(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
        }
        function getMatchData(object) {
          var result2 = keys(object), length = result2.length;
          while (length--) {
            var key = result2[length], value = object[key];
            result2[length] = [key, value, isStrictComparable(value)];
          }
          return result2;
        }
        function getNative2(object, key) {
          var value = getValue2(object, key);
          return baseIsNative2(value) ? value : undefined$1;
        }
        function getRawTag2(value) {
          var isOwn = hasOwnProperty2.call(value, symToStringTag2), tag = value[symToStringTag2];
          try {
            value[symToStringTag2] = undefined$1;
            var unmasked = true;
          } catch (e) {
          }
          var result2 = nativeObjectToString2.call(value);
          if (unmasked) {
            if (isOwn) {
              value[symToStringTag2] = tag;
            } else {
              delete value[symToStringTag2];
            }
          }
          return result2;
        }
        var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
          if (object == null) {
            return [];
          }
          object = Object2(object);
          return arrayFilter(nativeGetSymbols(object), function(symbol) {
            return propertyIsEnumerable2.call(object, symbol);
          });
        };
        var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
          var result2 = [];
          while (object) {
            arrayPush2(result2, getSymbols(object));
            object = getPrototype(object);
          }
          return result2;
        };
        var getTag = baseGetTag2;
        if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
          getTag = function(value) {
            var result2 = baseGetTag2(value), Ctor = result2 == objectTag ? value.constructor : undefined$1, ctorString = Ctor ? toSource2(Ctor) : "";
            if (ctorString) {
              switch (ctorString) {
                case dataViewCtorString:
                  return dataViewTag;
                case mapCtorString:
                  return mapTag;
                case promiseCtorString:
                  return promiseTag;
                case setCtorString:
                  return setTag;
                case weakMapCtorString:
                  return weakMapTag;
              }
            }
            return result2;
          };
        }
        function getView(start, end, transforms) {
          var index = -1, length = transforms.length;
          while (++index < length) {
            var data = transforms[index], size2 = data.size;
            switch (data.type) {
              case "drop":
                start += size2;
                break;
              case "dropRight":
                end -= size2;
                break;
              case "take":
                end = nativeMin(end, start + size2);
                break;
              case "takeRight":
                start = nativeMax2(start, end - size2);
                break;
            }
          }
          return { "start": start, "end": end };
        }
        function getWrapDetails(source) {
          var match = source.match(reWrapDetails);
          return match ? match[1].split(reSplitDetails) : [];
        }
        function hasPath2(object, path, hasFunc) {
          path = castPath2(path, object);
          var index = -1, length = path.length, result2 = false;
          while (++index < length) {
            var key = toKey2(path[index]);
            if (!(result2 = object != null && hasFunc(object, key))) {
              break;
            }
            object = object[key];
          }
          if (result2 || ++index != length) {
            return result2;
          }
          length = object == null ? 0 : object.length;
          return !!length && isLength2(length) && isIndex2(key, length) && (isArray2(object) || isArguments2(object));
        }
        function initCloneArray(array) {
          var length = array.length, result2 = new array.constructor(length);
          if (length && typeof array[0] == "string" && hasOwnProperty2.call(array, "index")) {
            result2.index = array.index;
            result2.input = array.input;
          }
          return result2;
        }
        function initCloneObject(object) {
          return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
        }
        function initCloneByTag(object, tag, isDeep) {
          var Ctor = object.constructor;
          switch (tag) {
            case arrayBufferTag:
              return cloneArrayBuffer(object);
            case boolTag:
            case dateTag:
              return new Ctor(+object);
            case dataViewTag:
              return cloneDataView(object, isDeep);
            case float32Tag:
            case float64Tag:
            case int8Tag:
            case int16Tag:
            case int32Tag:
            case uint8Tag:
            case uint8ClampedTag:
            case uint16Tag:
            case uint32Tag:
              return cloneTypedArray(object, isDeep);
            case mapTag:
              return new Ctor();
            case numberTag:
            case stringTag:
              return new Ctor(object);
            case regexpTag:
              return cloneRegExp(object);
            case setTag:
              return new Ctor();
            case symbolTag2:
              return cloneSymbol(object);
          }
        }
        function insertWrapDetails(source, details) {
          var length = details.length;
          if (!length) {
            return source;
          }
          var lastIndex = length - 1;
          details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
          details = details.join(length > 2 ? ", " : " ");
          return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
        }
        function isFlattenable2(value) {
          return isArray2(value) || isArguments2(value) || !!(spreadableSymbol2 && value && value[spreadableSymbol2]);
        }
        function isIndex2(value, length) {
          var type = typeof value;
          length = length == null ? MAX_SAFE_INTEGER2 : length;
          return !!length && (type == "number" || type != "symbol" && reIsUint2.test(value)) && (value > -1 && value % 1 == 0 && value < length);
        }
        function isIterateeCall(value, index, object) {
          if (!isObject2(object)) {
            return false;
          }
          var type = typeof index;
          if (type == "number" ? isArrayLike(object) && isIndex2(index, object.length) : type == "string" && index in object) {
            return eq2(object[index], value);
          }
          return false;
        }
        function isKey2(value, object) {
          if (isArray2(value)) {
            return false;
          }
          var type = typeof value;
          if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol2(value)) {
            return true;
          }
          return reIsPlainProp2.test(value) || !reIsDeepProp2.test(value) || object != null && value in Object2(object);
        }
        function isKeyable2(value) {
          var type = typeof value;
          return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
        }
        function isLaziable(func) {
          var funcName = getFuncName(func), other = lodash2[funcName];
          if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
            return false;
          }
          if (func === other) {
            return true;
          }
          var data = getData(other);
          return !!data && func === data[0];
        }
        function isMasked2(func) {
          return !!maskSrcKey2 && maskSrcKey2 in func;
        }
        var isMaskable = coreJsData2 ? isFunction2 : stubFalse;
        function isPrototype(value) {
          var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto2;
          return value === proto;
        }
        function isStrictComparable(value) {
          return value === value && !isObject2(value);
        }
        function matchesStrictComparable(key, srcValue) {
          return function(object) {
            if (object == null) {
              return false;
            }
            return object[key] === srcValue && (srcValue !== undefined$1 || key in Object2(object));
          };
        }
        function memoizeCapped2(func) {
          var result2 = memoize2(func, function(key) {
            if (cache.size === MAX_MEMOIZE_SIZE2) {
              cache.clear();
            }
            return key;
          });
          var cache = result2.cache;
          return result2;
        }
        function mergeData(data, source) {
          var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
          var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
          if (!(isCommon || isCombo)) {
            return data;
          }
          if (srcBitmask & WRAP_BIND_FLAG) {
            data[2] = source[2];
            newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
          }
          var value = source[3];
          if (value) {
            var partials = data[3];
            data[3] = partials ? composeArgs(partials, value, source[4]) : value;
            data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
          }
          value = source[5];
          if (value) {
            partials = data[5];
            data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
            data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
          }
          value = source[7];
          if (value) {
            data[7] = value;
          }
          if (srcBitmask & WRAP_ARY_FLAG) {
            data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
          }
          if (data[9] == null) {
            data[9] = source[9];
          }
          data[0] = source[0];
          data[1] = newBitmask;
          return data;
        }
        function nativeKeysIn(object) {
          var result2 = [];
          if (object != null) {
            for (var key in Object2(object)) {
              result2.push(key);
            }
          }
          return result2;
        }
        function objectToString2(value) {
          return nativeObjectToString2.call(value);
        }
        function overRest2(func, start, transform2) {
          start = nativeMax2(start === undefined$1 ? func.length - 1 : start, 0);
          return function() {
            var args = arguments, index = -1, length = nativeMax2(args.length - start, 0), array = Array2(length);
            while (++index < length) {
              array[index] = args[start + index];
            }
            index = -1;
            var otherArgs = Array2(start + 1);
            while (++index < start) {
              otherArgs[index] = args[index];
            }
            otherArgs[start] = transform2(array);
            return apply2(func, this, otherArgs);
          };
        }
        function parent(object, path) {
          return path.length < 2 ? object : baseGet2(object, baseSlice(path, 0, -1));
        }
        function reorder(array, indexes) {
          var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
          while (length--) {
            var index = indexes[length];
            array[length] = isIndex2(index, arrLength) ? oldArray[index] : undefined$1;
          }
          return array;
        }
        function safeGet(object, key) {
          if (key === "constructor" && typeof object[key] === "function") {
            return;
          }
          if (key == "__proto__") {
            return;
          }
          return object[key];
        }
        var setData = shortOut2(baseSetData);
        var setTimeout2 = ctxSetTimeout || function(func, wait) {
          return root2.setTimeout(func, wait);
        };
        var setToString2 = shortOut2(baseSetToString2);
        function setWrapToString(wrapper, reference, bitmask) {
          var source = reference + "";
          return setToString2(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
        }
        function shortOut2(func) {
          var count = 0, lastCalled = 0;
          return function() {
            var stamp = nativeNow2(), remaining = HOT_SPAN2 - (stamp - lastCalled);
            lastCalled = stamp;
            if (remaining > 0) {
              if (++count >= HOT_COUNT2) {
                return arguments[0];
              }
            } else {
              count = 0;
            }
            return func.apply(undefined$1, arguments);
          };
        }
        function shuffleSelf(array, size2) {
          var index = -1, length = array.length, lastIndex = length - 1;
          size2 = size2 === undefined$1 ? length : size2;
          while (++index < size2) {
            var rand = baseRandom(index, lastIndex), value = array[rand];
            array[rand] = array[index];
            array[index] = value;
          }
          array.length = size2;
          return array;
        }
        var stringToPath2 = memoizeCapped2(function(string) {
          var result2 = [];
          if (string.charCodeAt(0) === 46) {
            result2.push("");
          }
          string.replace(rePropName2, function(match, number, quote, subString) {
            result2.push(quote ? subString.replace(reEscapeChar2, "$1") : number || match);
          });
          return result2;
        });
        function toKey2(value) {
          if (typeof value == "string" || isSymbol2(value)) {
            return value;
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY2 ? "-0" : result2;
        }
        function toSource2(func) {
          if (func != null) {
            try {
              return funcToString2.call(func);
            } catch (e) {
            }
            try {
              return func + "";
            } catch (e) {
            }
          }
          return "";
        }
        function updateWrapDetails(details, bitmask) {
          arrayEach(wrapFlags, function(pair) {
            var value = "_." + pair[0];
            if (bitmask & pair[1] && !arrayIncludes(details, value)) {
              details.push(value);
            }
          });
          return details.sort();
        }
        function wrapperClone(wrapper) {
          if (wrapper instanceof LazyWrapper) {
            return wrapper.clone();
          }
          var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
          result2.__actions__ = copyArray(wrapper.__actions__);
          result2.__index__ = wrapper.__index__;
          result2.__values__ = wrapper.__values__;
          return result2;
        }
        function chunk(array, size2, guard) {
          if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined$1) {
            size2 = 1;
          } else {
            size2 = nativeMax2(toInteger(size2), 0);
          }
          var length = array == null ? 0 : array.length;
          if (!length || size2 < 1) {
            return [];
          }
          var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
          while (index < length) {
            result2[resIndex++] = baseSlice(array, index, index += size2);
          }
          return result2;
        }
        function compact(array) {
          var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
          while (++index < length) {
            var value = array[index];
            if (value) {
              result2[resIndex++] = value;
            }
          }
          return result2;
        }
        function concat() {
          var length = arguments.length;
          if (!length) {
            return [];
          }
          var args = Array2(length - 1), array = arguments[0], index = length;
          while (index--) {
            args[index - 1] = arguments[index];
          }
          return arrayPush2(isArray2(array) ? copyArray(array) : [array], baseFlatten2(args, 1));
        }
        var difference = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten2(values2, 1, isArrayLikeObject, true)) : [];
        });
        var differenceBy = baseRest(function(array, values2) {
          var iteratee2 = last(values2);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined$1;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten2(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
        });
        var differenceWith = baseRest(function(array, values2) {
          var comparator = last(values2);
          if (isArrayLikeObject(comparator)) {
            comparator = undefined$1;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten2(values2, 1, isArrayLikeObject, true), undefined$1, comparator) : [];
        });
        function drop(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined$1 ? 1 : toInteger(n);
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        function dropRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined$1 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function dropRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
        }
        function dropWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
        }
        function fill(array, value, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
            start = 0;
            end = length;
          }
          return baseFill(array, value, start, end);
        }
        function findIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax2(length + index, 0);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index);
        }
        function findLastIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length - 1;
          if (fromIndex !== undefined$1) {
            index = toInteger(fromIndex);
            index = fromIndex < 0 ? nativeMax2(length + index, 0) : nativeMin(index, length - 1);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index, true);
        }
        function flatten2(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten2(array, 1) : [];
        }
        function flattenDeep(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten2(array, INFINITY2) : [];
        }
        function flattenDepth(array, depth) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          depth = depth === undefined$1 ? 1 : toInteger(depth);
          return baseFlatten2(array, depth);
        }
        function fromPairs2(pairs) {
          var index = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
          while (++index < length) {
            var pair = pairs[index];
            result2[pair[0]] = pair[1];
          }
          return result2;
        }
        function head(array) {
          return array && array.length ? array[0] : undefined$1;
        }
        function indexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax2(length + index, 0);
          }
          return baseIndexOf(array, value, index);
        }
        function initial2(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 0, -1) : [];
        }
        var intersection = baseRest(function(arrays) {
          var mapped = arrayMap2(arrays, castArrayLikeObject);
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
        });
        var intersectionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays), mapped = arrayMap2(arrays, castArrayLikeObject);
          if (iteratee2 === last(mapped)) {
            iteratee2 = undefined$1;
          } else {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
        });
        var intersectionWith = baseRest(function(arrays) {
          var comparator = last(arrays), mapped = arrayMap2(arrays, castArrayLikeObject);
          comparator = typeof comparator == "function" ? comparator : undefined$1;
          if (comparator) {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined$1, comparator) : [];
        });
        function join(array, separator) {
          return array == null ? "" : nativeJoin.call(array, separator);
        }
        function last(array) {
          var length = array == null ? 0 : array.length;
          return length ? array[length - 1] : undefined$1;
        }
        function lastIndexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length;
          if (fromIndex !== undefined$1) {
            index = toInteger(fromIndex);
            index = index < 0 ? nativeMax2(length + index, 0) : nativeMin(index, length - 1);
          }
          return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
        }
        function nth(array, n) {
          return array && array.length ? baseNth(array, toInteger(n)) : undefined$1;
        }
        var pull = baseRest(pullAll);
        function pullAll(array, values2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
        }
        function pullAllBy(array, values2, iteratee2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
        }
        function pullAllWith(array, values2, comparator) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined$1, comparator) : array;
        }
        var pullAt = flatRest2(function(array, indexes) {
          var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
          basePullAt(array, arrayMap2(indexes, function(index) {
            return isIndex2(index, length) ? +index : index;
          }).sort(compareAscending));
          return result2;
        });
        function remove(array, predicate) {
          var result2 = [];
          if (!(array && array.length)) {
            return result2;
          }
          var index = -1, indexes = [], length = array.length;
          predicate = getIteratee(predicate, 3);
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result2.push(value);
              indexes.push(index);
            }
          }
          basePullAt(array, indexes);
          return result2;
        }
        function reverse(array) {
          return array == null ? array : nativeReverse.call(array);
        }
        function slice(array, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
            start = 0;
            end = length;
          } else {
            start = start == null ? 0 : toInteger(start);
            end = end === undefined$1 ? length : toInteger(end);
          }
          return baseSlice(array, start, end);
        }
        function sortedIndex(array, value) {
          return baseSortedIndex(array, value);
        }
        function sortedIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
        }
        function sortedIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value);
            if (index < length && eq2(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function sortedLastIndex(array, value) {
          return baseSortedIndex(array, value, true);
        }
        function sortedLastIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
        }
        function sortedLastIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value, true) - 1;
            if (eq2(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function sortedUniq(array) {
          return array && array.length ? baseSortedUniq(array) : [];
        }
        function sortedUniqBy(array, iteratee2) {
          return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function tail(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 1, length) : [];
        }
        function take(array, n, guard) {
          if (!(array && array.length)) {
            return [];
          }
          n = guard || n === undefined$1 ? 1 : toInteger(n);
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function takeRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined$1 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        function takeRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
        }
        function takeWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
        }
        var union = baseRest(function(arrays) {
          return baseUniq(baseFlatten2(arrays, 1, isArrayLikeObject, true));
        });
        var unionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined$1;
          }
          return baseUniq(baseFlatten2(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
        });
        var unionWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined$1;
          return baseUniq(baseFlatten2(arrays, 1, isArrayLikeObject, true), undefined$1, comparator);
        });
        function uniq(array) {
          return array && array.length ? baseUniq(array) : [];
        }
        function uniqBy(array, iteratee2) {
          return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function uniqWith(array, comparator) {
          comparator = typeof comparator == "function" ? comparator : undefined$1;
          return array && array.length ? baseUniq(array, undefined$1, comparator) : [];
        }
        function unzip(array) {
          if (!(array && array.length)) {
            return [];
          }
          var length = 0;
          array = arrayFilter(array, function(group) {
            if (isArrayLikeObject(group)) {
              length = nativeMax2(group.length, length);
              return true;
            }
          });
          return baseTimes(length, function(index) {
            return arrayMap2(array, baseProperty(index));
          });
        }
        function unzipWith(array, iteratee2) {
          if (!(array && array.length)) {
            return [];
          }
          var result2 = unzip(array);
          if (iteratee2 == null) {
            return result2;
          }
          return arrayMap2(result2, function(group) {
            return apply2(iteratee2, undefined$1, group);
          });
        }
        var without = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
        });
        var xor = baseRest(function(arrays) {
          return baseXor(arrayFilter(arrays, isArrayLikeObject));
        });
        var xorBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined$1;
          }
          return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
        });
        var xorWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined$1;
          return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined$1, comparator);
        });
        var zip = baseRest(unzip);
        function zipObject(props, values2) {
          return baseZipObject(props || [], values2 || [], assignValue2);
        }
        function zipObjectDeep(props, values2) {
          return baseZipObject(props || [], values2 || [], baseSet2);
        }
        var zipWith = baseRest(function(arrays) {
          var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined$1;
          iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined$1;
          return unzipWith(arrays, iteratee2);
        });
        function chain(value) {
          var result2 = lodash2(value);
          result2.__chain__ = true;
          return result2;
        }
        function tap(value, interceptor) {
          interceptor(value);
          return value;
        }
        function thru(value, interceptor) {
          return interceptor(value);
        }
        var wrapperAt = flatRest2(function(paths) {
          var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
            return baseAt(object, paths);
          };
          if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex2(start)) {
            return this.thru(interceptor);
          }
          value = value.slice(start, +start + (length ? 1 : 0));
          value.__actions__.push({
            "func": thru,
            "args": [interceptor],
            "thisArg": undefined$1
          });
          return new LodashWrapper(value, this.__chain__).thru(function(array) {
            if (length && !array.length) {
              array.push(undefined$1);
            }
            return array;
          });
        });
        function wrapperChain() {
          return chain(this);
        }
        function wrapperCommit() {
          return new LodashWrapper(this.value(), this.__chain__);
        }
        function wrapperNext() {
          if (this.__values__ === undefined$1) {
            this.__values__ = toArray(this.value());
          }
          var done = this.__index__ >= this.__values__.length, value = done ? undefined$1 : this.__values__[this.__index__++];
          return { "done": done, "value": value };
        }
        function wrapperToIterator() {
          return this;
        }
        function wrapperPlant(value) {
          var result2, parent2 = this;
          while (parent2 instanceof baseLodash) {
            var clone2 = wrapperClone(parent2);
            clone2.__index__ = 0;
            clone2.__values__ = undefined$1;
            if (result2) {
              previous.__wrapped__ = clone2;
            } else {
              result2 = clone2;
            }
            var previous = clone2;
            parent2 = parent2.__wrapped__;
          }
          previous.__wrapped__ = value;
          return result2;
        }
        function wrapperReverse() {
          var value = this.__wrapped__;
          if (value instanceof LazyWrapper) {
            var wrapped = value;
            if (this.__actions__.length) {
              wrapped = new LazyWrapper(this);
            }
            wrapped = wrapped.reverse();
            wrapped.__actions__.push({
              "func": thru,
              "args": [reverse],
              "thisArg": undefined$1
            });
            return new LodashWrapper(wrapped, this.__chain__);
          }
          return this.thru(reverse);
        }
        function wrapperValue() {
          return baseWrapperValue(this.__wrapped__, this.__actions__);
        }
        var countBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty2.call(result2, key)) {
            ++result2[key];
          } else {
            baseAssignValue2(result2, key, 1);
          }
        });
        function every(collection, predicate, guard) {
          var func = isArray2(collection) ? arrayEvery : baseEvery;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined$1;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        function filter(collection, predicate) {
          var func = isArray2(collection) ? arrayFilter : baseFilter;
          return func(collection, getIteratee(predicate, 3));
        }
        var find = createFind(findIndex);
        var findLast = createFind(findLastIndex);
        function flatMap(collection, iteratee2) {
          return baseFlatten2(map(collection, iteratee2), 1);
        }
        function flatMapDeep(collection, iteratee2) {
          return baseFlatten2(map(collection, iteratee2), INFINITY2);
        }
        function flatMapDepth(collection, iteratee2, depth) {
          depth = depth === undefined$1 ? 1 : toInteger(depth);
          return baseFlatten2(map(collection, iteratee2), depth);
        }
        function forEach(collection, iteratee2) {
          var func = isArray2(collection) ? arrayEach : baseEach;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function forEachRight(collection, iteratee2) {
          var func = isArray2(collection) ? arrayEachRight : baseEachRight;
          return func(collection, getIteratee(iteratee2, 3));
        }
        var groupBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty2.call(result2, key)) {
            result2[key].push(value);
          } else {
            baseAssignValue2(result2, key, [value]);
          }
        });
        function includes(collection, value, fromIndex, guard) {
          collection = isArrayLike(collection) ? collection : values(collection);
          fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
          var length = collection.length;
          if (fromIndex < 0) {
            fromIndex = nativeMax2(length + fromIndex, 0);
          }
          return isString2(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
        }
        var invokeMap = baseRest(function(collection, path, args) {
          var index = -1, isFunc = typeof path == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value) {
            result2[++index] = isFunc ? apply2(path, value, args) : baseInvoke(value, path, args);
          });
          return result2;
        });
        var keyBy = createAggregator(function(result2, value, key) {
          baseAssignValue2(result2, key, value);
        });
        function map(collection, iteratee2) {
          var func = isArray2(collection) ? arrayMap2 : baseMap;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function orderBy(collection, iteratees, orders, guard) {
          if (collection == null) {
            return [];
          }
          if (!isArray2(iteratees)) {
            iteratees = iteratees == null ? [] : [iteratees];
          }
          orders = guard ? undefined$1 : orders;
          if (!isArray2(orders)) {
            orders = orders == null ? [] : [orders];
          }
          return baseOrderBy(collection, iteratees, orders);
        }
        var partition = createAggregator(function(result2, value, key) {
          result2[key ? 0 : 1].push(value);
        }, function() {
          return [[], []];
        });
        function reduce(collection, iteratee2, accumulator) {
          var func = isArray2(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
        }
        function reduceRight(collection, iteratee2, accumulator) {
          var func = isArray2(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
        }
        function reject(collection, predicate) {
          var func = isArray2(collection) ? arrayFilter : baseFilter;
          return func(collection, negate(getIteratee(predicate, 3)));
        }
        function sample(collection) {
          var func = isArray2(collection) ? arraySample : baseSample;
          return func(collection);
        }
        function sampleSize(collection, n, guard) {
          if (guard ? isIterateeCall(collection, n, guard) : n === undefined$1) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          var func = isArray2(collection) ? arraySampleSize : baseSampleSize;
          return func(collection, n);
        }
        function shuffle(collection) {
          var func = isArray2(collection) ? arrayShuffle : baseShuffle;
          return func(collection);
        }
        function size(collection) {
          if (collection == null) {
            return 0;
          }
          if (isArrayLike(collection)) {
            return isString2(collection) ? stringSize(collection) : collection.length;
          }
          var tag = getTag(collection);
          if (tag == mapTag || tag == setTag) {
            return collection.size;
          }
          return baseKeys(collection).length;
        }
        function some(collection, predicate, guard) {
          var func = isArray2(collection) ? arraySome : baseSome;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined$1;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        var sortBy = baseRest(function(collection, iteratees) {
          if (collection == null) {
            return [];
          }
          var length = iteratees.length;
          if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
            iteratees = [];
          } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
            iteratees = [iteratees[0]];
          }
          return baseOrderBy(collection, baseFlatten2(iteratees, 1), []);
        });
        var now = ctxNow || function() {
          return root2.Date.now();
        };
        function after(n, func) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT2);
          }
          n = toInteger(n);
          return function() {
            if (--n < 1) {
              return func.apply(this, arguments);
            }
          };
        }
        function ary(func, n, guard) {
          n = guard ? undefined$1 : n;
          n = func && n == null ? func.length : n;
          return createWrap(func, WRAP_ARY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, n);
        }
        function before(n, func) {
          var result2;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT2);
          }
          n = toInteger(n);
          return function() {
            if (--n > 0) {
              result2 = func.apply(this, arguments);
            }
            if (n <= 1) {
              func = undefined$1;
            }
            return result2;
          };
        }
        var bind = baseRest(function(func, thisArg, partials) {
          var bitmask = WRAP_BIND_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bind));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(func, bitmask, thisArg, partials, holders);
        });
        var bindKey = baseRest(function(object, key, partials) {
          var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bindKey));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(key, bitmask, object, partials, holders);
        });
        function curry(func, arity, guard) {
          arity = guard ? undefined$1 : arity;
          var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
          result2.placeholder = curry.placeholder;
          return result2;
        }
        function curryRight(func, arity, guard) {
          arity = guard ? undefined$1 : arity;
          var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
          result2.placeholder = curryRight.placeholder;
          return result2;
        }
        function debounce(func, wait, options) {
          var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT2);
          }
          wait = toNumber(wait) || 0;
          if (isObject2(options)) {
            leading = !!options.leading;
            maxing = "maxWait" in options;
            maxWait = maxing ? nativeMax2(toNumber(options.maxWait) || 0, wait) : maxWait;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          function invokeFunc(time) {
            var args = lastArgs, thisArg = lastThis;
            lastArgs = lastThis = undefined$1;
            lastInvokeTime = time;
            result2 = func.apply(thisArg, args);
            return result2;
          }
          function leadingEdge(time) {
            lastInvokeTime = time;
            timerId = setTimeout2(timerExpired, wait);
            return leading ? invokeFunc(time) : result2;
          }
          function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
            return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
          }
          function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
            return lastCallTime === undefined$1 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
          }
          function timerExpired() {
            var time = now();
            if (shouldInvoke(time)) {
              return trailingEdge(time);
            }
            timerId = setTimeout2(timerExpired, remainingWait(time));
          }
          function trailingEdge(time) {
            timerId = undefined$1;
            if (trailing && lastArgs) {
              return invokeFunc(time);
            }
            lastArgs = lastThis = undefined$1;
            return result2;
          }
          function cancel() {
            if (timerId !== undefined$1) {
              clearTimeout2(timerId);
            }
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined$1;
          }
          function flush() {
            return timerId === undefined$1 ? result2 : trailingEdge(now());
          }
          function debounced() {
            var time = now(), isInvoking = shouldInvoke(time);
            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;
            if (isInvoking) {
              if (timerId === undefined$1) {
                return leadingEdge(lastCallTime);
              }
              if (maxing) {
                clearTimeout2(timerId);
                timerId = setTimeout2(timerExpired, wait);
                return invokeFunc(lastCallTime);
              }
            }
            if (timerId === undefined$1) {
              timerId = setTimeout2(timerExpired, wait);
            }
            return result2;
          }
          debounced.cancel = cancel;
          debounced.flush = flush;
          return debounced;
        }
        var defer = baseRest(function(func, args) {
          return baseDelay(func, 1, args);
        });
        var delay = baseRest(function(func, wait, args) {
          return baseDelay(func, toNumber(wait) || 0, args);
        });
        function flip(func) {
          return createWrap(func, WRAP_FLIP_FLAG);
        }
        function memoize2(func, resolver) {
          if (typeof func != "function" || resolver != null && typeof resolver != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT2);
          }
          var memoized = function() {
            var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
            if (cache.has(key)) {
              return cache.get(key);
            }
            var result2 = func.apply(this, args);
            memoized.cache = cache.set(key, result2) || cache;
            return result2;
          };
          memoized.cache = new (memoize2.Cache || MapCache2)();
          return memoized;
        }
        memoize2.Cache = MapCache2;
        function negate(predicate) {
          if (typeof predicate != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT2);
          }
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return !predicate.call(this);
              case 1:
                return !predicate.call(this, args[0]);
              case 2:
                return !predicate.call(this, args[0], args[1]);
              case 3:
                return !predicate.call(this, args[0], args[1], args[2]);
            }
            return !predicate.apply(this, args);
          };
        }
        function once(func) {
          return before(2, func);
        }
        var overArgs = castRest(function(func, transforms) {
          transforms = transforms.length == 1 && isArray2(transforms[0]) ? arrayMap2(transforms[0], baseUnary(getIteratee())) : arrayMap2(baseFlatten2(transforms, 1), baseUnary(getIteratee()));
          var funcsLength = transforms.length;
          return baseRest(function(args) {
            var index = -1, length = nativeMin(args.length, funcsLength);
            while (++index < length) {
              args[index] = transforms[index].call(this, args[index]);
            }
            return apply2(func, this, args);
          });
        });
        var partial = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partial));
          return createWrap(func, WRAP_PARTIAL_FLAG, undefined$1, partials, holders);
        });
        var partialRight = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partialRight));
          return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined$1, partials, holders);
        });
        var rearg = flatRest2(function(func, indexes) {
          return createWrap(func, WRAP_REARG_FLAG, undefined$1, undefined$1, undefined$1, indexes);
        });
        function rest(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT2);
          }
          start = start === undefined$1 ? start : toInteger(start);
          return baseRest(func, start);
        }
        function spread(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT2);
          }
          start = start == null ? 0 : nativeMax2(toInteger(start), 0);
          return baseRest(function(args) {
            var array = args[start], otherArgs = castSlice(args, 0, start);
            if (array) {
              arrayPush2(otherArgs, array);
            }
            return apply2(func, this, otherArgs);
          });
        }
        function throttle(func, wait, options) {
          var leading = true, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT2);
          }
          if (isObject2(options)) {
            leading = "leading" in options ? !!options.leading : leading;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          return debounce(func, wait, {
            "leading": leading,
            "maxWait": wait,
            "trailing": trailing
          });
        }
        function unary(func) {
          return ary(func, 1);
        }
        function wrap(value, wrapper) {
          return partial(castFunction(wrapper), value);
        }
        function castArray() {
          if (!arguments.length) {
            return [];
          }
          var value = arguments[0];
          return isArray2(value) ? value : [value];
        }
        function clone(value) {
          return baseClone(value, CLONE_SYMBOLS_FLAG);
        }
        function cloneWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
        }
        function cloneDeep(value) {
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
        }
        function cloneDeepWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
        }
        function conformsTo(object, source) {
          return source == null || baseConformsTo(object, source, keys(source));
        }
        function eq2(value, other) {
          return value === other || value !== value && other !== other;
        }
        var gt = createRelationalOperation(baseGt);
        var gte = createRelationalOperation(function(value, other) {
          return value >= other;
        });
        var isArguments2 = baseIsArguments2(/* @__PURE__ */ function() {
          return arguments;
        }()) ? baseIsArguments2 : function(value) {
          return isObjectLike2(value) && hasOwnProperty2.call(value, "callee") && !propertyIsEnumerable2.call(value, "callee");
        };
        var isArray2 = Array2.isArray;
        var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
        function isArrayLike(value) {
          return value != null && isLength2(value.length) && !isFunction2(value);
        }
        function isArrayLikeObject(value) {
          return isObjectLike2(value) && isArrayLike(value);
        }
        function isBoolean2(value) {
          return value === true || value === false || isObjectLike2(value) && baseGetTag2(value) == boolTag;
        }
        var isBuffer = nativeIsBuffer || stubFalse;
        var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
        function isElement(value) {
          return isObjectLike2(value) && value.nodeType === 1 && !isPlainObject(value);
        }
        function isEmpty(value) {
          if (value == null) {
            return true;
          }
          if (isArrayLike(value) && (isArray2(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments2(value))) {
            return !value.length;
          }
          var tag = getTag(value);
          if (tag == mapTag || tag == setTag) {
            return !value.size;
          }
          if (isPrototype(value)) {
            return !baseKeys(value).length;
          }
          for (var key in value) {
            if (hasOwnProperty2.call(value, key)) {
              return false;
            }
          }
          return true;
        }
        function isEqual(value, other) {
          return baseIsEqual(value, other);
        }
        function isEqualWith(value, other, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          var result2 = customizer ? customizer(value, other) : undefined$1;
          return result2 === undefined$1 ? baseIsEqual(value, other, undefined$1, customizer) : !!result2;
        }
        function isError(value) {
          if (!isObjectLike2(value)) {
            return false;
          }
          var tag = baseGetTag2(value);
          return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
        }
        function isFinite(value) {
          return typeof value == "number" && nativeIsFinite(value);
        }
        function isFunction2(value) {
          if (!isObject2(value)) {
            return false;
          }
          var tag = baseGetTag2(value);
          return tag == funcTag2 || tag == genTag2 || tag == asyncTag2 || tag == proxyTag2;
        }
        function isInteger(value) {
          return typeof value == "number" && value == toInteger(value);
        }
        function isLength2(value) {
          return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
        }
        function isObject2(value) {
          var type = typeof value;
          return value != null && (type == "object" || type == "function");
        }
        function isObjectLike2(value) {
          return value != null && typeof value == "object";
        }
        var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
        function isMatch(object, source) {
          return object === source || baseIsMatch(object, source, getMatchData(source));
        }
        function isMatchWith(object, source, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          return baseIsMatch(object, source, getMatchData(source), customizer);
        }
        function isNaN2(value) {
          return isNumber2(value) && value != +value;
        }
        function isNative(value) {
          if (isMaskable(value)) {
            throw new Error2(CORE_ERROR_TEXT);
          }
          return baseIsNative2(value);
        }
        function isNull(value) {
          return value === null;
        }
        function isNil2(value) {
          return value == null;
        }
        function isNumber2(value) {
          return typeof value == "number" || isObjectLike2(value) && baseGetTag2(value) == numberTag;
        }
        function isPlainObject(value) {
          if (!isObjectLike2(value) || baseGetTag2(value) != objectTag) {
            return false;
          }
          var proto = getPrototype(value);
          if (proto === null) {
            return true;
          }
          var Ctor = hasOwnProperty2.call(proto, "constructor") && proto.constructor;
          return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString2.call(Ctor) == objectCtorString;
        }
        var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
        function isSafeInteger(value) {
          return isInteger(value) && value >= -MAX_SAFE_INTEGER2 && value <= MAX_SAFE_INTEGER2;
        }
        var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
        function isString2(value) {
          return typeof value == "string" || !isArray2(value) && isObjectLike2(value) && baseGetTag2(value) == stringTag;
        }
        function isSymbol2(value) {
          return typeof value == "symbol" || isObjectLike2(value) && baseGetTag2(value) == symbolTag2;
        }
        var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
        function isUndefined2(value) {
          return value === undefined$1;
        }
        function isWeakMap(value) {
          return isObjectLike2(value) && getTag(value) == weakMapTag;
        }
        function isWeakSet(value) {
          return isObjectLike2(value) && baseGetTag2(value) == weakSetTag;
        }
        var lt = createRelationalOperation(baseLt);
        var lte = createRelationalOperation(function(value, other) {
          return value <= other;
        });
        function toArray(value) {
          if (!value) {
            return [];
          }
          if (isArrayLike(value)) {
            return isString2(value) ? stringToArray(value) : copyArray(value);
          }
          if (symIterator && value[symIterator]) {
            return iteratorToArray(value[symIterator]());
          }
          var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
          return func(value);
        }
        function toFinite(value) {
          if (!value) {
            return value === 0 ? value : 0;
          }
          value = toNumber(value);
          if (value === INFINITY2 || value === -INFINITY2) {
            var sign = value < 0 ? -1 : 1;
            return sign * MAX_INTEGER;
          }
          return value === value ? value : 0;
        }
        function toInteger(value) {
          var result2 = toFinite(value), remainder = result2 % 1;
          return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
        }
        function toLength(value) {
          return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
        }
        function toNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol2(value)) {
            return NAN;
          }
          if (isObject2(value)) {
            var other = typeof value.valueOf == "function" ? value.valueOf() : value;
            value = isObject2(other) ? other + "" : other;
          }
          if (typeof value != "string") {
            return value === 0 ? value : +value;
          }
          value = baseTrim(value);
          var isBinary = reIsBinary.test(value);
          return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
        }
        function toPlainObject(value) {
          return copyObject(value, keysIn(value));
        }
        function toSafeInteger(value) {
          return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER2, MAX_SAFE_INTEGER2) : value === 0 ? value : 0;
        }
        function toString2(value) {
          return value == null ? "" : baseToString2(value);
        }
        var assign = createAssigner(function(object, source) {
          if (isPrototype(source) || isArrayLike(source)) {
            copyObject(source, keys(source), object);
            return;
          }
          for (var key in source) {
            if (hasOwnProperty2.call(source, key)) {
              assignValue2(object, key, source[key]);
            }
          }
        });
        var assignIn = createAssigner(function(object, source) {
          copyObject(source, keysIn(source), object);
        });
        var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keysIn(source), object, customizer);
        });
        var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keys(source), object, customizer);
        });
        var at = flatRest2(baseAt);
        function create(prototype, properties) {
          var result2 = baseCreate(prototype);
          return properties == null ? result2 : baseAssign(result2, properties);
        }
        var defaults = baseRest(function(object, sources) {
          object = Object2(object);
          var index = -1;
          var length = sources.length;
          var guard = length > 2 ? sources[2] : undefined$1;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            length = 1;
          }
          while (++index < length) {
            var source = sources[index];
            var props = keysIn(source);
            var propsIndex = -1;
            var propsLength = props.length;
            while (++propsIndex < propsLength) {
              var key = props[propsIndex];
              var value = object[key];
              if (value === undefined$1 || eq2(value, objectProto2[key]) && !hasOwnProperty2.call(object, key)) {
                object[key] = source[key];
              }
            }
          }
          return object;
        });
        var defaultsDeep = baseRest(function(args) {
          args.push(undefined$1, customDefaultsMerge);
          return apply2(mergeWith, undefined$1, args);
        });
        function findKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
        }
        function findLastKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
        }
        function forIn(object, iteratee2) {
          return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
        }
        function forInRight(object, iteratee2) {
          return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
        }
        function forOwn(object, iteratee2) {
          return object && baseForOwn(object, getIteratee(iteratee2, 3));
        }
        function forOwnRight(object, iteratee2) {
          return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
        }
        function functions(object) {
          return object == null ? [] : baseFunctions(object, keys(object));
        }
        function functionsIn(object) {
          return object == null ? [] : baseFunctions(object, keysIn(object));
        }
        function get2(object, path, defaultValue) {
          var result2 = object == null ? undefined$1 : baseGet2(object, path);
          return result2 === undefined$1 ? defaultValue : result2;
        }
        function has(object, path) {
          return object != null && hasPath2(object, path, baseHas);
        }
        function hasIn2(object, path) {
          return object != null && hasPath2(object, path, baseHasIn2);
        }
        var invert = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString2.call(value);
          }
          result2[value] = key;
        }, constant2(identity2));
        var invertBy = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString2.call(value);
          }
          if (hasOwnProperty2.call(result2, value)) {
            result2[value].push(key);
          } else {
            result2[value] = [key];
          }
        }, getIteratee);
        var invoke = baseRest(baseInvoke);
        function keys(object) {
          return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
        }
        function keysIn(object) {
          return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
        }
        function mapKeys(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue2(result2, iteratee2(value, key, object2), value);
          });
          return result2;
        }
        function mapValues(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue2(result2, key, iteratee2(value, key, object2));
          });
          return result2;
        }
        var merge = createAssigner(function(object, source, srcIndex) {
          baseMerge(object, source, srcIndex);
        });
        var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
          baseMerge(object, source, srcIndex, customizer);
        });
        var omit = flatRest2(function(object, paths) {
          var result2 = {};
          if (object == null) {
            return result2;
          }
          var isDeep = false;
          paths = arrayMap2(paths, function(path) {
            path = castPath2(path, object);
            isDeep || (isDeep = path.length > 1);
            return path;
          });
          copyObject(object, getAllKeysIn(object), result2);
          if (isDeep) {
            result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
          }
          var length = paths.length;
          while (length--) {
            baseUnset(result2, paths[length]);
          }
          return result2;
        });
        function omitBy(object, predicate) {
          return pickBy(object, negate(getIteratee(predicate)));
        }
        var pick2 = flatRest2(function(object, paths) {
          return object == null ? {} : basePick2(object, paths);
        });
        function pickBy(object, predicate) {
          if (object == null) {
            return {};
          }
          var props = arrayMap2(getAllKeysIn(object), function(prop) {
            return [prop];
          });
          predicate = getIteratee(predicate);
          return basePickBy2(object, props, function(value, path) {
            return predicate(value, path[0]);
          });
        }
        function result(object, path, defaultValue) {
          path = castPath2(path, object);
          var index = -1, length = path.length;
          if (!length) {
            length = 1;
            object = undefined$1;
          }
          while (++index < length) {
            var value = object == null ? undefined$1 : object[toKey2(path[index])];
            if (value === undefined$1) {
              index = length;
              value = defaultValue;
            }
            object = isFunction2(value) ? value.call(object) : value;
          }
          return object;
        }
        function set(object, path, value) {
          return object == null ? object : baseSet2(object, path, value);
        }
        function setWith(object, path, value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          return object == null ? object : baseSet2(object, path, value, customizer);
        }
        var toPairs = createToPairs(keys);
        var toPairsIn = createToPairs(keysIn);
        function transform(object, iteratee2, accumulator) {
          var isArr = isArray2(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
          iteratee2 = getIteratee(iteratee2, 4);
          if (accumulator == null) {
            var Ctor = object && object.constructor;
            if (isArrLike) {
              accumulator = isArr ? new Ctor() : [];
            } else if (isObject2(object)) {
              accumulator = isFunction2(Ctor) ? baseCreate(getPrototype(object)) : {};
            } else {
              accumulator = {};
            }
          }
          (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
            return iteratee2(accumulator, value, index, object2);
          });
          return accumulator;
        }
        function unset(object, path) {
          return object == null ? true : baseUnset(object, path);
        }
        function update(object, path, updater) {
          return object == null ? object : baseUpdate(object, path, castFunction(updater));
        }
        function updateWith(object, path, updater, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
        }
        function values(object) {
          return object == null ? [] : baseValues(object, keys(object));
        }
        function valuesIn(object) {
          return object == null ? [] : baseValues(object, keysIn(object));
        }
        function clamp(number, lower, upper) {
          if (upper === undefined$1) {
            upper = lower;
            lower = undefined$1;
          }
          if (upper !== undefined$1) {
            upper = toNumber(upper);
            upper = upper === upper ? upper : 0;
          }
          if (lower !== undefined$1) {
            lower = toNumber(lower);
            lower = lower === lower ? lower : 0;
          }
          return baseClamp(toNumber(number), lower, upper);
        }
        function inRange(number, start, end) {
          start = toFinite(start);
          if (end === undefined$1) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          number = toNumber(number);
          return baseInRange(number, start, end);
        }
        function random(lower, upper, floating) {
          if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
            upper = floating = undefined$1;
          }
          if (floating === undefined$1) {
            if (typeof upper == "boolean") {
              floating = upper;
              upper = undefined$1;
            } else if (typeof lower == "boolean") {
              floating = lower;
              lower = undefined$1;
            }
          }
          if (lower === undefined$1 && upper === undefined$1) {
            lower = 0;
            upper = 1;
          } else {
            lower = toFinite(lower);
            if (upper === undefined$1) {
              upper = lower;
              lower = 0;
            } else {
              upper = toFinite(upper);
            }
          }
          if (lower > upper) {
            var temp = lower;
            lower = upper;
            upper = temp;
          }
          if (floating || lower % 1 || upper % 1) {
            var rand = nativeRandom();
            return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
          }
          return baseRandom(lower, upper);
        }
        var camelCase = createCompounder(function(result2, word, index) {
          word = word.toLowerCase();
          return result2 + (index ? capitalize(word) : word);
        });
        function capitalize(string) {
          return upperFirst(toString2(string).toLowerCase());
        }
        function deburr(string) {
          string = toString2(string);
          return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
        }
        function endsWith(string, target, position) {
          string = toString2(string);
          target = baseToString2(target);
          var length = string.length;
          position = position === undefined$1 ? length : baseClamp(toInteger(position), 0, length);
          var end = position;
          position -= target.length;
          return position >= 0 && string.slice(position, end) == target;
        }
        function escape(string) {
          string = toString2(string);
          return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
        }
        function escapeRegExp(string) {
          string = toString2(string);
          return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar2, "\\$&") : string;
        }
        var kebabCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? "-" : "") + word.toLowerCase();
        });
        var lowerCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + word.toLowerCase();
        });
        var lowerFirst = createCaseFirst("toLowerCase");
        function pad(string, length, chars) {
          string = toString2(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          if (!length || strLength >= length) {
            return string;
          }
          var mid = (length - strLength) / 2;
          return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
        }
        function padEnd(string, length, chars) {
          string = toString2(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
        }
        function padStart(string, length, chars) {
          string = toString2(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
        }
        function parseInt2(string, radix, guard) {
          if (guard || radix == null) {
            radix = 0;
          } else if (radix) {
            radix = +radix;
          }
          return nativeParseInt(toString2(string).replace(reTrimStart, ""), radix || 0);
        }
        function repeat(string, n, guard) {
          if (guard ? isIterateeCall(string, n, guard) : n === undefined$1) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          return baseRepeat(toString2(string), n);
        }
        function replace() {
          var args = arguments, string = toString2(args[0]);
          return args.length < 3 ? string : string.replace(args[1], args[2]);
        }
        var snakeCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? "_" : "") + word.toLowerCase();
        });
        function split(string, separator, limit) {
          if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
            separator = limit = undefined$1;
          }
          limit = limit === undefined$1 ? MAX_ARRAY_LENGTH : limit >>> 0;
          if (!limit) {
            return [];
          }
          string = toString2(string);
          if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
            separator = baseToString2(separator);
            if (!separator && hasUnicode(string)) {
              return castSlice(stringToArray(string), 0, limit);
            }
          }
          return string.split(separator, limit);
        }
        var startCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + upperFirst(word);
        });
        function startsWith(string, target, position) {
          string = toString2(string);
          position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
          target = baseToString2(target);
          return string.slice(position, position + target.length) == target;
        }
        function template(string, options, guard) {
          var settings = lodash2.templateSettings;
          if (guard && isIterateeCall(string, options, guard)) {
            options = undefined$1;
          }
          string = toString2(string);
          options = assignInWith({}, options, settings, customDefaultsAssignIn);
          var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
          var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
          var reDelimiters = RegExp2(
            (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
            "g"
          );
          var sourceURL = "//# sourceURL=" + (hasOwnProperty2.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
          string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
            interpolateValue || (interpolateValue = esTemplateValue);
            source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
            if (escapeValue) {
              isEscaping = true;
              source += "' +\n__e(" + escapeValue + ") +\n'";
            }
            if (evaluateValue) {
              isEvaluating = true;
              source += "';\n" + evaluateValue + ";\n__p += '";
            }
            if (interpolateValue) {
              source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
            }
            index = offset + match.length;
            return match;
          });
          source += "';\n";
          var variable = hasOwnProperty2.call(options, "variable") && options.variable;
          if (!variable) {
            source = "with (obj) {\n" + source + "\n}\n";
          } else if (reForbiddenIdentifierChars.test(variable)) {
            throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
          }
          source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
          source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
          var result2 = attempt(function() {
            return Function2(importsKeys, sourceURL + "return " + source).apply(undefined$1, importsValues);
          });
          result2.source = source;
          if (isError(result2)) {
            throw result2;
          }
          return result2;
        }
        function toLower(value) {
          return toString2(value).toLowerCase();
        }
        function toUpper(value) {
          return toString2(value).toUpperCase();
        }
        function trim(string, chars, guard) {
          string = toString2(string);
          if (string && (guard || chars === undefined$1)) {
            return baseTrim(string);
          }
          if (!string || !(chars = baseToString2(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
          return castSlice(strSymbols, start, end).join("");
        }
        function trimEnd(string, chars, guard) {
          string = toString2(string);
          if (string && (guard || chars === undefined$1)) {
            return string.slice(0, trimmedEndIndex(string) + 1);
          }
          if (!string || !(chars = baseToString2(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
          return castSlice(strSymbols, 0, end).join("");
        }
        function trimStart(string, chars, guard) {
          string = toString2(string);
          if (string && (guard || chars === undefined$1)) {
            return string.replace(reTrimStart, "");
          }
          if (!string || !(chars = baseToString2(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
          return castSlice(strSymbols, start).join("");
        }
        function truncate(string, options) {
          var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
          if (isObject2(options)) {
            var separator = "separator" in options ? options.separator : separator;
            length = "length" in options ? toInteger(options.length) : length;
            omission = "omission" in options ? baseToString2(options.omission) : omission;
          }
          string = toString2(string);
          var strLength = string.length;
          if (hasUnicode(string)) {
            var strSymbols = stringToArray(string);
            strLength = strSymbols.length;
          }
          if (length >= strLength) {
            return string;
          }
          var end = length - stringSize(omission);
          if (end < 1) {
            return omission;
          }
          var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
          if (separator === undefined$1) {
            return result2 + omission;
          }
          if (strSymbols) {
            end += result2.length - end;
          }
          if (isRegExp(separator)) {
            if (string.slice(end).search(separator)) {
              var match, substring = result2;
              if (!separator.global) {
                separator = RegExp2(separator.source, toString2(reFlags.exec(separator)) + "g");
              }
              separator.lastIndex = 0;
              while (match = separator.exec(substring)) {
                var newEnd = match.index;
              }
              result2 = result2.slice(0, newEnd === undefined$1 ? end : newEnd);
            }
          } else if (string.indexOf(baseToString2(separator), end) != end) {
            var index = result2.lastIndexOf(separator);
            if (index > -1) {
              result2 = result2.slice(0, index);
            }
          }
          return result2 + omission;
        }
        function unescape(string) {
          string = toString2(string);
          return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
        }
        var upperCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + word.toUpperCase();
        });
        var upperFirst = createCaseFirst("toUpperCase");
        function words(string, pattern, guard) {
          string = toString2(string);
          pattern = guard ? undefined$1 : pattern;
          if (pattern === undefined$1) {
            return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
          }
          return string.match(pattern) || [];
        }
        var attempt = baseRest(function(func, args) {
          try {
            return apply2(func, undefined$1, args);
          } catch (e) {
            return isError(e) ? e : new Error2(e);
          }
        });
        var bindAll = flatRest2(function(object, methodNames) {
          arrayEach(methodNames, function(key) {
            key = toKey2(key);
            baseAssignValue2(object, key, bind(object[key], object));
          });
          return object;
        });
        function cond(pairs) {
          var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
          pairs = !length ? [] : arrayMap2(pairs, function(pair) {
            if (typeof pair[1] != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT2);
            }
            return [toIteratee(pair[0]), pair[1]];
          });
          return baseRest(function(args) {
            var index = -1;
            while (++index < length) {
              var pair = pairs[index];
              if (apply2(pair[0], this, args)) {
                return apply2(pair[1], this, args);
              }
            }
          });
        }
        function conforms(source) {
          return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
        }
        function constant2(value) {
          return function() {
            return value;
          };
        }
        function defaultTo(value, defaultValue) {
          return value == null || value !== value ? defaultValue : value;
        }
        var flow = createFlow();
        var flowRight = createFlow(true);
        function identity2(value) {
          return value;
        }
        function iteratee(func) {
          return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
        }
        function matches(source) {
          return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
        }
        function matchesProperty(path, srcValue) {
          return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
        }
        var method = baseRest(function(path, args) {
          return function(object) {
            return baseInvoke(object, path, args);
          };
        });
        var methodOf = baseRest(function(object, args) {
          return function(path) {
            return baseInvoke(object, path, args);
          };
        });
        function mixin(object, source, options) {
          var props = keys(source), methodNames = baseFunctions(source, props);
          if (options == null && !(isObject2(source) && (methodNames.length || !props.length))) {
            options = source;
            source = object;
            object = this;
            methodNames = baseFunctions(source, keys(source));
          }
          var chain2 = !(isObject2(options) && "chain" in options) || !!options.chain, isFunc = isFunction2(object);
          arrayEach(methodNames, function(methodName) {
            var func = source[methodName];
            object[methodName] = func;
            if (isFunc) {
              object.prototype[methodName] = function() {
                var chainAll = this.__chain__;
                if (chain2 || chainAll) {
                  var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                  actions.push({ "func": func, "args": arguments, "thisArg": object });
                  result2.__chain__ = chainAll;
                  return result2;
                }
                return func.apply(object, arrayPush2([this.value()], arguments));
              };
            }
          });
          return object;
        }
        function noConflict() {
          if (root2._ === this) {
            root2._ = oldDash;
          }
          return this;
        }
        function noop2() {
        }
        function nthArg(n) {
          n = toInteger(n);
          return baseRest(function(args) {
            return baseNth(args, n);
          });
        }
        var over = createOver(arrayMap2);
        var overEvery = createOver(arrayEvery);
        var overSome = createOver(arraySome);
        function property(path) {
          return isKey2(path) ? baseProperty(toKey2(path)) : basePropertyDeep(path);
        }
        function propertyOf(object) {
          return function(path) {
            return object == null ? undefined$1 : baseGet2(object, path);
          };
        }
        var range = createRange();
        var rangeRight = createRange(true);
        function stubArray() {
          return [];
        }
        function stubFalse() {
          return false;
        }
        function stubObject() {
          return {};
        }
        function stubString() {
          return "";
        }
        function stubTrue() {
          return true;
        }
        function times(n, iteratee2) {
          n = toInteger(n);
          if (n < 1 || n > MAX_SAFE_INTEGER2) {
            return [];
          }
          var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
          iteratee2 = getIteratee(iteratee2);
          n -= MAX_ARRAY_LENGTH;
          var result2 = baseTimes(length, iteratee2);
          while (++index < n) {
            iteratee2(index);
          }
          return result2;
        }
        function toPath(value) {
          if (isArray2(value)) {
            return arrayMap2(value, toKey2);
          }
          return isSymbol2(value) ? [value] : copyArray(stringToPath2(toString2(value)));
        }
        function uniqueId(prefix) {
          var id = ++idCounter;
          return toString2(prefix) + id;
        }
        var add = createMathOperation(function(augend, addend) {
          return augend + addend;
        }, 0);
        var ceil = createRound("ceil");
        var divide = createMathOperation(function(dividend, divisor) {
          return dividend / divisor;
        }, 1);
        var floor = createRound("floor");
        function max(array) {
          return array && array.length ? baseExtremum(array, identity2, baseGt) : undefined$1;
        }
        function maxBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined$1;
        }
        function mean(array) {
          return baseMean(array, identity2);
        }
        function meanBy(array, iteratee2) {
          return baseMean(array, getIteratee(iteratee2, 2));
        }
        function min(array) {
          return array && array.length ? baseExtremum(array, identity2, baseLt) : undefined$1;
        }
        function minBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined$1;
        }
        var multiply = createMathOperation(function(multiplier, multiplicand) {
          return multiplier * multiplicand;
        }, 1);
        var round = createRound("round");
        var subtract = createMathOperation(function(minuend, subtrahend) {
          return minuend - subtrahend;
        }, 0);
        function sum(array) {
          return array && array.length ? baseSum(array, identity2) : 0;
        }
        function sumBy(array, iteratee2) {
          return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
        }
        lodash2.after = after;
        lodash2.ary = ary;
        lodash2.assign = assign;
        lodash2.assignIn = assignIn;
        lodash2.assignInWith = assignInWith;
        lodash2.assignWith = assignWith;
        lodash2.at = at;
        lodash2.before = before;
        lodash2.bind = bind;
        lodash2.bindAll = bindAll;
        lodash2.bindKey = bindKey;
        lodash2.castArray = castArray;
        lodash2.chain = chain;
        lodash2.chunk = chunk;
        lodash2.compact = compact;
        lodash2.concat = concat;
        lodash2.cond = cond;
        lodash2.conforms = conforms;
        lodash2.constant = constant2;
        lodash2.countBy = countBy;
        lodash2.create = create;
        lodash2.curry = curry;
        lodash2.curryRight = curryRight;
        lodash2.debounce = debounce;
        lodash2.defaults = defaults;
        lodash2.defaultsDeep = defaultsDeep;
        lodash2.defer = defer;
        lodash2.delay = delay;
        lodash2.difference = difference;
        lodash2.differenceBy = differenceBy;
        lodash2.differenceWith = differenceWith;
        lodash2.drop = drop;
        lodash2.dropRight = dropRight;
        lodash2.dropRightWhile = dropRightWhile;
        lodash2.dropWhile = dropWhile;
        lodash2.fill = fill;
        lodash2.filter = filter;
        lodash2.flatMap = flatMap;
        lodash2.flatMapDeep = flatMapDeep;
        lodash2.flatMapDepth = flatMapDepth;
        lodash2.flatten = flatten2;
        lodash2.flattenDeep = flattenDeep;
        lodash2.flattenDepth = flattenDepth;
        lodash2.flip = flip;
        lodash2.flow = flow;
        lodash2.flowRight = flowRight;
        lodash2.fromPairs = fromPairs2;
        lodash2.functions = functions;
        lodash2.functionsIn = functionsIn;
        lodash2.groupBy = groupBy;
        lodash2.initial = initial2;
        lodash2.intersection = intersection;
        lodash2.intersectionBy = intersectionBy;
        lodash2.intersectionWith = intersectionWith;
        lodash2.invert = invert;
        lodash2.invertBy = invertBy;
        lodash2.invokeMap = invokeMap;
        lodash2.iteratee = iteratee;
        lodash2.keyBy = keyBy;
        lodash2.keys = keys;
        lodash2.keysIn = keysIn;
        lodash2.map = map;
        lodash2.mapKeys = mapKeys;
        lodash2.mapValues = mapValues;
        lodash2.matches = matches;
        lodash2.matchesProperty = matchesProperty;
        lodash2.memoize = memoize2;
        lodash2.merge = merge;
        lodash2.mergeWith = mergeWith;
        lodash2.method = method;
        lodash2.methodOf = methodOf;
        lodash2.mixin = mixin;
        lodash2.negate = negate;
        lodash2.nthArg = nthArg;
        lodash2.omit = omit;
        lodash2.omitBy = omitBy;
        lodash2.once = once;
        lodash2.orderBy = orderBy;
        lodash2.over = over;
        lodash2.overArgs = overArgs;
        lodash2.overEvery = overEvery;
        lodash2.overSome = overSome;
        lodash2.partial = partial;
        lodash2.partialRight = partialRight;
        lodash2.partition = partition;
        lodash2.pick = pick2;
        lodash2.pickBy = pickBy;
        lodash2.property = property;
        lodash2.propertyOf = propertyOf;
        lodash2.pull = pull;
        lodash2.pullAll = pullAll;
        lodash2.pullAllBy = pullAllBy;
        lodash2.pullAllWith = pullAllWith;
        lodash2.pullAt = pullAt;
        lodash2.range = range;
        lodash2.rangeRight = rangeRight;
        lodash2.rearg = rearg;
        lodash2.reject = reject;
        lodash2.remove = remove;
        lodash2.rest = rest;
        lodash2.reverse = reverse;
        lodash2.sampleSize = sampleSize;
        lodash2.set = set;
        lodash2.setWith = setWith;
        lodash2.shuffle = shuffle;
        lodash2.slice = slice;
        lodash2.sortBy = sortBy;
        lodash2.sortedUniq = sortedUniq;
        lodash2.sortedUniqBy = sortedUniqBy;
        lodash2.split = split;
        lodash2.spread = spread;
        lodash2.tail = tail;
        lodash2.take = take;
        lodash2.takeRight = takeRight;
        lodash2.takeRightWhile = takeRightWhile;
        lodash2.takeWhile = takeWhile;
        lodash2.tap = tap;
        lodash2.throttle = throttle;
        lodash2.thru = thru;
        lodash2.toArray = toArray;
        lodash2.toPairs = toPairs;
        lodash2.toPairsIn = toPairsIn;
        lodash2.toPath = toPath;
        lodash2.toPlainObject = toPlainObject;
        lodash2.transform = transform;
        lodash2.unary = unary;
        lodash2.union = union;
        lodash2.unionBy = unionBy;
        lodash2.unionWith = unionWith;
        lodash2.uniq = uniq;
        lodash2.uniqBy = uniqBy;
        lodash2.uniqWith = uniqWith;
        lodash2.unset = unset;
        lodash2.unzip = unzip;
        lodash2.unzipWith = unzipWith;
        lodash2.update = update;
        lodash2.updateWith = updateWith;
        lodash2.values = values;
        lodash2.valuesIn = valuesIn;
        lodash2.without = without;
        lodash2.words = words;
        lodash2.wrap = wrap;
        lodash2.xor = xor;
        lodash2.xorBy = xorBy;
        lodash2.xorWith = xorWith;
        lodash2.zip = zip;
        lodash2.zipObject = zipObject;
        lodash2.zipObjectDeep = zipObjectDeep;
        lodash2.zipWith = zipWith;
        lodash2.entries = toPairs;
        lodash2.entriesIn = toPairsIn;
        lodash2.extend = assignIn;
        lodash2.extendWith = assignInWith;
        mixin(lodash2, lodash2);
        lodash2.add = add;
        lodash2.attempt = attempt;
        lodash2.camelCase = camelCase;
        lodash2.capitalize = capitalize;
        lodash2.ceil = ceil;
        lodash2.clamp = clamp;
        lodash2.clone = clone;
        lodash2.cloneDeep = cloneDeep;
        lodash2.cloneDeepWith = cloneDeepWith;
        lodash2.cloneWith = cloneWith;
        lodash2.conformsTo = conformsTo;
        lodash2.deburr = deburr;
        lodash2.defaultTo = defaultTo;
        lodash2.divide = divide;
        lodash2.endsWith = endsWith;
        lodash2.eq = eq2;
        lodash2.escape = escape;
        lodash2.escapeRegExp = escapeRegExp;
        lodash2.every = every;
        lodash2.find = find;
        lodash2.findIndex = findIndex;
        lodash2.findKey = findKey;
        lodash2.findLast = findLast;
        lodash2.findLastIndex = findLastIndex;
        lodash2.findLastKey = findLastKey;
        lodash2.floor = floor;
        lodash2.forEach = forEach;
        lodash2.forEachRight = forEachRight;
        lodash2.forIn = forIn;
        lodash2.forInRight = forInRight;
        lodash2.forOwn = forOwn;
        lodash2.forOwnRight = forOwnRight;
        lodash2.get = get2;
        lodash2.gt = gt;
        lodash2.gte = gte;
        lodash2.has = has;
        lodash2.hasIn = hasIn2;
        lodash2.head = head;
        lodash2.identity = identity2;
        lodash2.includes = includes;
        lodash2.indexOf = indexOf;
        lodash2.inRange = inRange;
        lodash2.invoke = invoke;
        lodash2.isArguments = isArguments2;
        lodash2.isArray = isArray2;
        lodash2.isArrayBuffer = isArrayBuffer;
        lodash2.isArrayLike = isArrayLike;
        lodash2.isArrayLikeObject = isArrayLikeObject;
        lodash2.isBoolean = isBoolean2;
        lodash2.isBuffer = isBuffer;
        lodash2.isDate = isDate;
        lodash2.isElement = isElement;
        lodash2.isEmpty = isEmpty;
        lodash2.isEqual = isEqual;
        lodash2.isEqualWith = isEqualWith;
        lodash2.isError = isError;
        lodash2.isFinite = isFinite;
        lodash2.isFunction = isFunction2;
        lodash2.isInteger = isInteger;
        lodash2.isLength = isLength2;
        lodash2.isMap = isMap;
        lodash2.isMatch = isMatch;
        lodash2.isMatchWith = isMatchWith;
        lodash2.isNaN = isNaN2;
        lodash2.isNative = isNative;
        lodash2.isNil = isNil2;
        lodash2.isNull = isNull;
        lodash2.isNumber = isNumber2;
        lodash2.isObject = isObject2;
        lodash2.isObjectLike = isObjectLike2;
        lodash2.isPlainObject = isPlainObject;
        lodash2.isRegExp = isRegExp;
        lodash2.isSafeInteger = isSafeInteger;
        lodash2.isSet = isSet;
        lodash2.isString = isString2;
        lodash2.isSymbol = isSymbol2;
        lodash2.isTypedArray = isTypedArray;
        lodash2.isUndefined = isUndefined2;
        lodash2.isWeakMap = isWeakMap;
        lodash2.isWeakSet = isWeakSet;
        lodash2.join = join;
        lodash2.kebabCase = kebabCase;
        lodash2.last = last;
        lodash2.lastIndexOf = lastIndexOf;
        lodash2.lowerCase = lowerCase;
        lodash2.lowerFirst = lowerFirst;
        lodash2.lt = lt;
        lodash2.lte = lte;
        lodash2.max = max;
        lodash2.maxBy = maxBy;
        lodash2.mean = mean;
        lodash2.meanBy = meanBy;
        lodash2.min = min;
        lodash2.minBy = minBy;
        lodash2.stubArray = stubArray;
        lodash2.stubFalse = stubFalse;
        lodash2.stubObject = stubObject;
        lodash2.stubString = stubString;
        lodash2.stubTrue = stubTrue;
        lodash2.multiply = multiply;
        lodash2.nth = nth;
        lodash2.noConflict = noConflict;
        lodash2.noop = noop2;
        lodash2.now = now;
        lodash2.pad = pad;
        lodash2.padEnd = padEnd;
        lodash2.padStart = padStart;
        lodash2.parseInt = parseInt2;
        lodash2.random = random;
        lodash2.reduce = reduce;
        lodash2.reduceRight = reduceRight;
        lodash2.repeat = repeat;
        lodash2.replace = replace;
        lodash2.result = result;
        lodash2.round = round;
        lodash2.runInContext = runInContext2;
        lodash2.sample = sample;
        lodash2.size = size;
        lodash2.snakeCase = snakeCase;
        lodash2.some = some;
        lodash2.sortedIndex = sortedIndex;
        lodash2.sortedIndexBy = sortedIndexBy;
        lodash2.sortedIndexOf = sortedIndexOf;
        lodash2.sortedLastIndex = sortedLastIndex;
        lodash2.sortedLastIndexBy = sortedLastIndexBy;
        lodash2.sortedLastIndexOf = sortedLastIndexOf;
        lodash2.startCase = startCase;
        lodash2.startsWith = startsWith;
        lodash2.subtract = subtract;
        lodash2.sum = sum;
        lodash2.sumBy = sumBy;
        lodash2.template = template;
        lodash2.times = times;
        lodash2.toFinite = toFinite;
        lodash2.toInteger = toInteger;
        lodash2.toLength = toLength;
        lodash2.toLower = toLower;
        lodash2.toNumber = toNumber;
        lodash2.toSafeInteger = toSafeInteger;
        lodash2.toString = toString2;
        lodash2.toUpper = toUpper;
        lodash2.trim = trim;
        lodash2.trimEnd = trimEnd;
        lodash2.trimStart = trimStart;
        lodash2.truncate = truncate;
        lodash2.unescape = unescape;
        lodash2.uniqueId = uniqueId;
        lodash2.upperCase = upperCase;
        lodash2.upperFirst = upperFirst;
        lodash2.each = forEach;
        lodash2.eachRight = forEachRight;
        lodash2.first = head;
        mixin(lodash2, function() {
          var source = {};
          baseForOwn(lodash2, function(func, methodName) {
            if (!hasOwnProperty2.call(lodash2.prototype, methodName)) {
              source[methodName] = func;
            }
          });
          return source;
        }(), { "chain": false });
        lodash2.VERSION = VERSION;
        arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
          lodash2[methodName].placeholder = lodash2;
        });
        arrayEach(["drop", "take"], function(methodName, index) {
          LazyWrapper.prototype[methodName] = function(n) {
            n = n === undefined$1 ? 1 : nativeMax2(toInteger(n), 0);
            var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
            if (result2.__filtered__) {
              result2.__takeCount__ = nativeMin(n, result2.__takeCount__);
            } else {
              result2.__views__.push({
                "size": nativeMin(n, MAX_ARRAY_LENGTH),
                "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
              });
            }
            return result2;
          };
          LazyWrapper.prototype[methodName + "Right"] = function(n) {
            return this.reverse()[methodName](n).reverse();
          };
        });
        arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
          var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
          LazyWrapper.prototype[methodName] = function(iteratee2) {
            var result2 = this.clone();
            result2.__iteratees__.push({
              "iteratee": getIteratee(iteratee2, 3),
              "type": type
            });
            result2.__filtered__ = result2.__filtered__ || isFilter;
            return result2;
          };
        });
        arrayEach(["head", "last"], function(methodName, index) {
          var takeName = "take" + (index ? "Right" : "");
          LazyWrapper.prototype[methodName] = function() {
            return this[takeName](1).value()[0];
          };
        });
        arrayEach(["initial", "tail"], function(methodName, index) {
          var dropName = "drop" + (index ? "" : "Right");
          LazyWrapper.prototype[methodName] = function() {
            return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
          };
        });
        LazyWrapper.prototype.compact = function() {
          return this.filter(identity2);
        };
        LazyWrapper.prototype.find = function(predicate) {
          return this.filter(predicate).head();
        };
        LazyWrapper.prototype.findLast = function(predicate) {
          return this.reverse().find(predicate);
        };
        LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
          if (typeof path == "function") {
            return new LazyWrapper(this);
          }
          return this.map(function(value) {
            return baseInvoke(value, path, args);
          });
        });
        LazyWrapper.prototype.reject = function(predicate) {
          return this.filter(negate(getIteratee(predicate)));
        };
        LazyWrapper.prototype.slice = function(start, end) {
          start = toInteger(start);
          var result2 = this;
          if (result2.__filtered__ && (start > 0 || end < 0)) {
            return new LazyWrapper(result2);
          }
          if (start < 0) {
            result2 = result2.takeRight(-start);
          } else if (start) {
            result2 = result2.drop(start);
          }
          if (end !== undefined$1) {
            end = toInteger(end);
            result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
          }
          return result2;
        };
        LazyWrapper.prototype.takeRightWhile = function(predicate) {
          return this.reverse().takeWhile(predicate).reverse();
        };
        LazyWrapper.prototype.toArray = function() {
          return this.take(MAX_ARRAY_LENGTH);
        };
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash2[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
          if (!lodashFunc) {
            return;
          }
          lodash2.prototype[methodName] = function() {
            var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray2(value);
            var interceptor = function(value2) {
              var result3 = lodashFunc.apply(lodash2, arrayPush2([value2], args));
              return isTaker && chainAll ? result3[0] : result3;
            };
            if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
              isLazy = useLazy = false;
            }
            var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
            if (!retUnwrapped && useLazy) {
              value = onlyLazy ? value : new LazyWrapper(this);
              var result2 = func.apply(value, args);
              result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined$1 });
              return new LodashWrapper(result2, chainAll);
            }
            if (isUnwrapped && onlyLazy) {
              return func.apply(this, args);
            }
            result2 = this.thru(interceptor);
            return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
          };
        });
        arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
          var func = arrayProto2[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
          lodash2.prototype[methodName] = function() {
            var args = arguments;
            if (retUnwrapped && !this.__chain__) {
              var value = this.value();
              return func.apply(isArray2(value) ? value : [], args);
            }
            return this[chainName](function(value2) {
              return func.apply(isArray2(value2) ? value2 : [], args);
            });
          };
        });
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var lodashFunc = lodash2[methodName];
          if (lodashFunc) {
            var key = lodashFunc.name + "";
            if (!hasOwnProperty2.call(realNames, key)) {
              realNames[key] = [];
            }
            realNames[key].push({ "name": methodName, "func": lodashFunc });
          }
        });
        realNames[createHybrid(undefined$1, WRAP_BIND_KEY_FLAG).name] = [{
          "name": "wrapper",
          "func": undefined$1
        }];
        LazyWrapper.prototype.clone = lazyClone;
        LazyWrapper.prototype.reverse = lazyReverse;
        LazyWrapper.prototype.value = lazyValue;
        lodash2.prototype.at = wrapperAt;
        lodash2.prototype.chain = wrapperChain;
        lodash2.prototype.commit = wrapperCommit;
        lodash2.prototype.next = wrapperNext;
        lodash2.prototype.plant = wrapperPlant;
        lodash2.prototype.reverse = wrapperReverse;
        lodash2.prototype.toJSON = lodash2.prototype.valueOf = lodash2.prototype.value = wrapperValue;
        lodash2.prototype.first = lodash2.prototype.head;
        if (symIterator) {
          lodash2.prototype[symIterator] = wrapperToIterator;
        }
        return lodash2;
      };
      var _ = runInContext();
      if (freeModule) {
        (freeModule.exports = _)._ = _;
        freeExports._ = _;
      } else {
        root2._ = _;
      }
    }).call(commonjsGlobal);
  })(lodash, lodash.exports);
  var lodashExports = lodash.exports;
  const xhsIcon = "data:image/png;base64,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";
  const addImg = "data:image/png;base64,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";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _withScopeId = (n) => (vue.pushScopeId("data-v-304f7edd"), n = n(), vue.popScopeId(), n);
  const _hoisted_1 = {
    key: 0,
    class: "xhs-menu-container"
  };
  const _hoisted_2 = { class: "citys" };
  const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "title" }, "自动搜索关键字", -1));
  const _hoisted_4 = ["onClick"];
  const _hoisted_5 = { class: "bottom" };
  const _hoisted_6 = ["src"];
  const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("span", null, "XHS-Download-Plus", -1));
  const _hoisted_8 = { class: "dialog-content" };
  const _hoisted_9 = { class: "left-content" };
  const _hoisted_10 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("h2", { class: "canvas-title" }, "图片预览", -1));
  const _hoisted_11 = { class: "canvas" };
  const _hoisted_12 = { class: "canvas-one" };
  const _hoisted_13 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("canvas", { id: "cover-canvas" }, null, -1));
  const _hoisted_14 = { class: "add-text" };
  const _hoisted_15 = ["id"];
  const _hoisted_16 = { class: "add-text" };
  const _hoisted_17 = ["id", "onKeyup"];
  const _hoisted_18 = { class: "right-content" };
  const _hoisted_19 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("h2", { class: "canvas-title" }, "文案区域", -1));
  const _hoisted_20 = { class: "content-btns" };
  const _hoisted_21 = { class: "not-used" };
  const _hoisted_22 = { class: "used" };
  const _hoisted_23 = { class: "bottom-content-text" };
  const _hoisted_24 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("div", {
    class: "note-need-content",
    contenteditable: "true"
  }, null, -1));
  const _hoisted_25 = {
    class: "note-need-content-ai",
    contenteditable: "true"
  };
  const _hoisted_26 = { class: "places" };
  const _hoisted_27 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("span", null, "关键字：", -1));
  const _hoisted_28 = { key: 0 };
  const _hoisted_29 = { key: 1 };
  const _hoisted_30 = { key: 3 };
  const _sfc_main = {
    __name: "App",
    setup(__props) {
      let pageInfo = {};
      const allNotes = [];
      let allInputText = {};
      let allImg = {};
      let activeCityName = "";
      let onloadImageLength = 0;
      let copedNoteIds = /* @__PURE__ */ new Set();
      let coverImgIndex = 0;
      let imgListNum = vue.ref(8);
      let initWidth = 900;
      let initHeight = 1400;
      const placeAiList = vue.ref([]);
      const showAiContentLoading = vue.ref(false);
      const showMenu = vue.ref(true);
      const cityLastFix = vue.ref("周边旅游");
      const dialogVisible = vue.ref(false);
      let downloadType = vue.ref("collage");
      const cityList = vue.reactive([
        { city: "佛山", active: false },
        { city: "湛江", active: false },
        { city: "广州", active: false },
        { city: "泉州", active: false },
        { city: "温州", active: false },
        { city: "北京", active: false },
        { city: "南宁", active: false },
        { city: "无锡", active: false },
        { city: "杭州", active: false },
        { city: "石家庄", active: false },
        { city: "大连", active: false },
        { city: "郑州", active: false },
        { city: "长沙", active: false },
        { city: "青岛", active: false },
        { city: "沈阳", active: false },
        { city: "哈尔滨", active: false },
        { city: "贵阳", active: false },
        { city: "上海", active: false },
        { city: "苏州", active: false },
        { city: "重庆", active: false },
        { city: "天津", active: false },
        { city: "济南", active: false },
        { city: "成都", active: false },
        { city: "宁波", active: false },
        { city: "合肥", active: false },
        { city: "西安", active: false },
        { city: "南京", active: false },
        { city: "武汉", active: false },
        { city: "深圳", active: false },
        { city: "东莞", active: false },
        { city: "福州", active: false }
      ]);
      const imgNum = vue.ref(4);
      const initTextLineHeight = vue.ref(0);
      const initTextLineHeightScale = vue.ref(0.04);
      const scaleAddSize = vue.ref(40);
      const initSmileWidth = vue.ref(0);
      const initSmileHeight = vue.ref(0);
      const initSmileScale = vue.ref(0.05);
      listenScrollToChangeStyle();
      function listenScrollToChangeStyle() {
        window.addEventListener("scroll", function() {
          changeListStyle();
        });
      }
      getXHSIds();
      function getXHSIds() {
        _GM_xmlhttpRequest({
          method: "POST",
          url: "http://60.205.226.243:3003/getXHSIds",
          headers: {
            "Content-Type": "application/json"
          },
          onload: function(response) {
            let res = JSON.parse(response.responseText);
            let ids = res.data.map((item) => item.xhsid);
            copedNoteIds = new Set(ids);
            interceptRequest();
          }
        });
      }
      function addXHSId() {
        let currentUrl = window.location.href;
        let currentUrlArr = currentUrl.split("/");
        let noteId = currentUrlArr[currentUrlArr.length - 1];
        if (noteId.includes("?")) {
          noteId = noteId.split("?")[0];
        }
        if (copedNoteIds.has(noteId)) {
          console.log("已保存");
          return;
        }
        _GM_xmlhttpRequest({
          method: "POST",
          url: "http://60.205.226.243:3003/addXHSId",
          headers: {
            "Content-Type": "application/json"
          },
          data: JSON.stringify({
            xhsid: noteId
          }),
          onload: function(response) {
            console.log("已保存");
          }
        });
      }
      function changeListStyle() {
        const list = document.querySelectorAll(".note-item");
        list.forEach((item) => {
          let id = "";
          try {
            id = item.children[0].children[0].href.split("/");
            id = id[id.length - 1];
          } catch (error) {
            id = "";
          }
          allNotes.forEach((item1) => {
            var _a2, _b, _c;
            if (id === item1.id) {
              if (item.querySelector("img-count") === null) {
                const countEl = document.createElement("div");
                ((_a2 = item1 == null ? void 0 : item1.note_card) == null ? void 0 : _a2.image_list.length) >= imgListNum.value ? countEl.setAttribute("class", "img-count") : countEl.setAttribute("class", "img-count img-count-default");
                countEl.textContent = (_b = item1 == null ? void 0 : item1.note_card) == null ? void 0 : _b.image_list.length;
                item.appendChild(countEl);
              }
              if (((_c = item1 == null ? void 0 : item1.note_card) == null ? void 0 : _c.image_list.length) >= imgListNum.value) {
                item.classList.add("need-item");
              }
            }
          });
        });
      }
      function interceptRequest() {
        const originOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(_, url) {
          if (url.includes("notes")) {
            this.addEventListener("readystatechange", function() {
              if (this.readyState === 4) {
                const res = JSON.parse(this.responseText);
                Object.defineProperty(this, "responseText", {
                  writable: true
                });
                const allNeedItems = [];
                res.data.items.forEach((item) => {
                  var _a2, _b;
                  if (((_b = (_a2 = item == null ? void 0 : item.note_card) == null ? void 0 : _a2.image_list) == null ? void 0 : _b.length) >= imgListNum.value) {
                    if (!copedNoteIds.has(item.id)) {
                      allNeedItems.push(item);
                      allNotes.push(item);
                    } else {
                      console.log(item.id + "已经采集过");
                    }
                  }
                });
                res.data.items = allNeedItems;
                changeListStyle();
                this.responseText = JSON.stringify(res);
              }
            });
          }
          if (url.includes("feed")) {
            this.addEventListener("readystatechange", function() {
              var _a2;
              if (this.readyState === 4) {
                const res = JSON.parse(this.responseText);
                Object.defineProperty(this, "responseText", {
                  writable: true
                });
                pageInfo = {};
                pageInfo = res && res.data && res.data.items && res.data.items[0] && ((_a2 = res.data.items[0]) == null ? void 0 : _a2.note_card) || {};
                this.responseText = JSON.stringify(res);
              }
            });
          }
          originOpen.apply(this, arguments);
        };
      }
      function closeDialog() {
        allInputText = {};
        dialogVisible.value = false;
        showAiContentLoading.value = false;
        showMenu.value = true;
        placeAiList.value = [];
        clearEvents();
      }
      const overlayImage = new Image();
      overlayImage.crossOrigin = "Anonymous";
      overlayImage.src = addImg;
      function createCanvasImg(id) {
        let canvas = document.getElementById(id);
        const ctx = canvas.getContext("2d");
        allImg[id].forEach((item) => {
          doRenderImg(item);
        });
        function doRenderImg(item) {
          ctx.drawImage(
            overlayImage,
            item.x - item.width / 2,
            item.y - item.height / 2,
            item.width,
            item.height
          );
        }
      }
      function clearEvents() {
        const canvasEls = document.querySelectorAll(".canvas canvas");
        canvasEls.forEach((item) => {
          item.removeEventListener("click", listenEventLeftClick);
          item.removeEventListener("contextmenu", listenEventRightClick);
        });
      }
      function addImgToCanvasEvent(id) {
        let canvas = null;
        if (id === "cover") {
          canvas = document.getElementById("cover-canvas");
        } else {
          canvas = document.getElementById(`canvas${id}`);
        }
        canvas.addEventListener("click", listenEventLeftClick);
        canvas.addEventListener("contextmenu", listenEventRightClick);
      }
      function listenEventLeftClick(event) {
        const x = event.clientX;
        const y = event.clientY;
        const id = event.target.id;
        imgManage(true, id, x, y);
      }
      function listenEventRightClick(event) {
        const x = event.clientX;
        const y = event.clientY;
        const id = event.target.id;
        imgManage(false, id, x, y);
        event.preventDefault();
      }
      function imgManage(type, id, x, y) {
        if (!id || !x || !y) {
          return false;
        }
        const canvas = document.getElementById(id);
        const rect = canvas.getBoundingClientRect();
        const scale = canvas.width / canvas.clientWidth;
        x = x - rect.left;
        y = y - rect.top;
        x = x * scale;
        y = y * scale;
        if (type) {
          if (!allImg.hasOwnProperty(id)) {
            allImg[id] = [];
          }
          let isExist = false;
          allImg[id].forEach((item) => {
            if (x <= item.x + item.width / 2 && x >= item.x - item.width / 2 && y <= item.y + item.height / 2 && y >= item.y - item.height / 2) {
              isExist = true;
              item.width = item.width + parseInt(scaleAddSize.value);
              item.height = item.height + parseInt(scaleAddSize.value);
            }
          });
          if (!isExist) {
            allImg[id].push({
              x,
              y,
              width: initSmileWidth.value,
              height: initSmileHeight.value
            });
          }
        } else {
          if (allImg.hasOwnProperty(id) && allImg[id].length > 0) {
            allImg[id] = allImg[id].filter((item) => {
              return !(x <= item.x + item.width / 2 && x >= item.x - item.width / 2 && y <= item.y + item.height / 2 && y >= item.y - item.height / 2);
            });
          }
        }
        debounceDoRender();
      }
      const debounceDoRender = lodashExports.debounce(function() {
        if (downloadType.value === "collage") {
          getCollage(true);
        } else {
          getOriginImg(true);
        }
        let timer = setInterval(() => {
          if (onloadImageLength >= imgNum.value) {
            for (let id in allImg) {
              createCanvasImg(id);
            }
            for (let id in allInputText) {
              createCanvasText(id);
            }
            clearInterval(timer);
            timer = null;
          }
        }, 500);
      }, 1e3);
      function getNoteContent() {
        setTimeout(() => {
          const noteContent = document.querySelector(".note-content");
          const noteNeedContent = document.querySelector(".note-need-content");
          noteNeedContent.innerHTML = noteContent.innerHTML;
          const bottomContainerEl = noteNeedContent.querySelector(".bottom-container");
          if (bottomContainerEl)
            bottomContainerEl.remove();
          const descEl = noteNeedContent.querySelector(".desc");
          const tags = descEl.querySelectorAll(".tag");
          tags.forEach((item) => {
            item.remove();
          });
          let refers = descEl.querySelectorAll(".note-content-user");
          refers.forEach((item) => {
            item.remove();
          });
        }, 0);
      }
      function copyArticle() {
        let element = document.querySelector(".note-need-content");
        const titleEl = element.querySelector(".title");
        titleEl.remove();
        const bottomContainerEl = element.querySelector(".bottom-container");
        bottomContainerEl.remove();
        const descEl = element.querySelector(".desc");
        const tags = descEl.querySelectorAll(".tag");
        tags.forEach((item) => {
          item.remove();
        });
        let refers = descEl.querySelectorAll(".note-content-user");
        refers.forEach((item) => {
          item.remove();
        });
        navigator.clipboard.writeText(element.innerText).then(() => {
          console.log("文本已复制到剪贴板");
        }).catch((err) => {
          console.error("复制文本失败：", err);
        });
        element.innerHTML = document.querySelector(".note-content").innerHTML;
      }
      addCopyTextToTextManage();
      function addCopyTextToTextManage() {
        document.addEventListener("copy", function(e) {
          if (dialogVisible.value === true && downloadType.value === "collage") {
            let clipboardData = e.clipboardData || window.clipboardData;
            if (!clipboardData)
              return;
            let text = window.getSelection().toString();
            if (text) {
              e.preventDefault();
              let id = "";
              for (let key in allInputText) {
                id = Number(key);
              }
              if (id === "") {
                id = 0;
              } else {
                id = id + 1;
              }
              if (id >= 0 && id <= 3) {
                textManage(true, id, text);
              }
              clipboardData.setData("text/plain", text);
            }
          }
        });
      }
      function textManage(type, id, text = null) {
        if (type) {
          if (text === "") {
            return false;
          }
          if (!allInputText.hasOwnProperty(id)) {
            allInputText[id] = [];
          }
          if (allInputText[id].length === 3) {
            alert("最多添加3个文案");
            return false;
          }
          if (id !== "cover" || text.includes("周边游")) {
            allInputText[id].push("(" + text + ")");
          } else {
            allInputText[id].push(text);
          }
        } else {
          if (allInputText.hasOwnProperty(id) && allInputText[id].length > 0) {
            allInputText[id].pop();
          }
          if (allInputText.hasOwnProperty(id) && allInputText[id].length === 0) {
            delete allInputText[id];
          }
        }
        debounceDoRender();
      }
      function addCoverText(text) {
        textManage(true, "cover", text);
      }
      function createText(id) {
        let input;
        if (id === "cover") {
          input = document.getElementById("cover-input");
        } else {
          input = document.getElementById(`input${id}`);
        }
        const text = input.value;
        textManage(true, id, text);
        input.value = "";
      }
      async function createCanvasText(id) {
        let canvas;
        if (id === "cover") {
          canvas = document.getElementById("cover-canvas");
        } else {
          canvas = document.getElementById(`canvas${id}`);
        }
        let textBaseX = (canvas == null ? void 0 : canvas.width) / 2;
        let textBaseY = (canvas == null ? void 0 : canvas.height) / 2;
        const ctx = canvas.getContext("2d");
        const fontSize = textBaseX * 0.16;
        ctx.font = `italic bold ${fontSize}px 黑体, Hei`;
        ctx.lineWidth = 10;
        const texts = allInputText[id];
        const points = [];
        let metrics, x, y;
        if (texts.length === 1) {
          metrics = ctx.measureText(texts[0]);
          x = textBaseX - (metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft) / 2;
          y = textBaseY;
          points.push({ x, y });
        } else if (texts.length === 2) {
          metrics = ctx.measureText(texts[0]);
          x = textBaseX - (metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft) / 2;
          metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
          y = textBaseY - initTextLineHeight.value;
          points.push({ x, y });
          metrics = ctx.measureText(texts[1]);
          x = textBaseX - (metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft) / 2;
          metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
          y = textBaseY + initTextLineHeight.value;
          points.push({ x, y });
        } else if (texts.length === 3) {
          metrics = ctx.measureText(texts[0]);
          x = textBaseX - (metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft) / 2;
          metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
          y = textBaseY - initTextLineHeight.value * 2;
          points.push({ x, y });
          metrics = ctx.measureText(texts[1]);
          x = textBaseX - (metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft) / 2;
          metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
          y = textBaseY;
          points.push({ x, y });
          metrics = ctx.measureText(texts[2]);
          x = textBaseX - (metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft) / 2;
          metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
          y = textBaseY + initTextLineHeight.value * 2;
          points.push({ x, y });
        }
        points.forEach((item, index) => {
          doCreateText(ctx, texts[index], item);
        });
        function doCreateText(ctx2, text, point) {
          ctx2.textBaseline = "middle";
          ctx2.strokeStyle = "#000000";
          ctx2.strokeText(text, point.x, point.y);
          if (text.includes("(") || text.includes(")")) {
            const colorForBrackets = "#FD7933";
            const colorForContent = "#ffffff";
            ctx2.fillStyle = colorForBrackets;
            ctx2.fillText("(", point.x, point.y);
            const bracketWidth = ctx2.measureText("(").width;
            ctx2.fillStyle = colorForContent;
            ctx2.fillText(
              text.substring(1, text.length - 1),
              point.x + bracketWidth,
              point.y
            );
            const contentWidth = ctx2.measureText(
              text.substring(1, text.length - 1)
            ).width;
            ctx2.fillStyle = colorForBrackets;
            ctx2.fillText(")", point.x + bracketWidth + contentWidth, point.y);
          } else {
            ctx2.fillStyle = "#ffffff";
            ctx2.fillText(text, point.x, point.y);
          }
        }
      }
      function getCollage(reRender = false) {
        downloadType.value = "collage";
        getNoteContent();
        if (!reRender) {
          allInputText = {};
          allImg = {};
          coverImgIndex = 0;
          showMenu.value = false;
        }
        imgNum.value = 4;
        dialogVisible.value = true;
        onloadImageLength = 0;
        setTimeout(() => {
          createCover();
          const needImgList = pageInfo == null ? void 0 : pageInfo.image_list;
          createImgs(needImgList);
          addImgToCanvasEvent("cover");
          for (let i = 0; i < imgNum.value; i++) {
            addImgToCanvasEvent(i);
          }
        }, 0);
      }
      function getOriginImg(reRender = false) {
        var _a2;
        downloadType.value = "origin";
        getNoteContent();
        if (!reRender) {
          allInputText = {};
          allImg = {};
          coverImgIndex = 0;
          showMenu.value = false;
        }
        let imageListLength = ((_a2 = pageInfo == null ? void 0 : pageInfo.image_list) == null ? void 0 : _a2.length) || 0;
        imgNum.value = imageListLength - 1;
        dialogVisible.value = true;
        onloadImageLength = 0;
        setTimeout(() => {
          createCover();
          const needImgList = pageInfo == null ? void 0 : pageInfo.image_list.filter((_, index) => {
            return index !== coverImgIndex;
          });
          createOriginImgs(needImgList);
          addImgToCanvasEvent("cover");
          for (let i = 0; i < imgNum.value; i++) {
            addImgToCanvasEvent(i);
          }
        }, 0);
      }
      async function createCover(change = false) {
        var _a2;
        const canvas = document.getElementById("cover-canvas");
        const ctx = canvas.getContext("2d");
        if (change) {
          if (coverImgIndex < ((_a2 = pageInfo == null ? void 0 : pageInfo.image_list) == null ? void 0 : _a2.length) - 1) {
            coverImgIndex = coverImgIndex + 1;
          } else {
            coverImgIndex = 0;
          }
        }
        let originImages = (pageInfo == null ? void 0 : pageInfo.image_list[coverImgIndex].url_default) ?? "";
        let image = await loadImage(originImages);
        const needImageInfo = calcImgWidthAndHeight(image);
        canvas.width = initWidth;
        canvas.height = initHeight;
        ctx.drawImage(
          image,
          needImageInfo.startX,
          needImageInfo.startY,
          needImageInfo.width,
          needImageInfo.height,
          0,
          0,
          initWidth,
          initHeight
        );
        if (downloadType.value === "origin") {
          const needImgList = pageInfo == null ? void 0 : pageInfo.image_list.filter((_, index) => {
            return index !== coverImgIndex;
          });
          createOriginImgs(needImgList);
        }
        changeImgStyle();
      }
      async function createOriginImgs(allImgList) {
        for (let index = 0; index < allImgList.length; index++) {
          const canvas = document.getElementById("canvas" + index);
          const ctx = canvas.getContext("2d");
          let image = await loadImage(allImgList[index].url_default);
          const needImageInfo = calcImgWidthAndHeight(image);
          canvas.width = initWidth;
          canvas.height = initHeight;
          ctx.drawImage(
            image,
            needImageInfo.startX,
            needImageInfo.startY,
            needImageInfo.width,
            needImageInfo.height,
            0,
            0,
            initWidth,
            initHeight
          );
          onloadImageLength++;
        }
        changeImgStyle();
      }
      async function createImgs(allImgList) {
        const imgNumType = distributeImages(allImgList.length);
        let startIndex = 0;
        imgNumType.forEach((item1, index1) => {
          let needImgs = allImgList.slice(startIndex, startIndex + item1);
          const promises = needImgs.map((item2) => {
            return loadImage(item2.url_default);
          });
          Promise.all(promises).then((images) => {
            createCollageImg(images, index1);
            onloadImageLength++;
          });
          startIndex = startIndex + item1;
        });
        changeImgStyle();
      }
      function createCollageImg(imgs, id) {
        const canvas = document.getElementById("canvas" + id);
        const ctx = canvas.getContext("2d");
        canvas.width = initWidth * 2;
        canvas.height = initHeight * 2;
        if (imgs.length === 4) {
          imgs.forEach((item, index) => {
            const needImageInfo = calcImgWidthAndHeight(item);
            let heightIndex = index === 0 || index === 1 ? 0 : 1;
            ctx.drawImage(
              item,
              needImageInfo.startX,
              needImageInfo.startY,
              needImageInfo.width,
              needImageInfo.height,
              index % 2 * initWidth,
              heightIndex * initHeight,
              initWidth,
              initHeight
            );
          });
        } else if (imgs.length === 3) {
          let needImageInfo = calcImgWidthAndHeight(imgs[0]);
          ctx.drawImage(
            imgs[0],
            needImageInfo.startX,
            needImageInfo.height * 0.25,
            needImageInfo.width,
            needImageInfo.height * 0.5,
            0,
            0,
            initWidth * 2,
            initHeight
          );
          needImageInfo = calcImgWidthAndHeight(imgs[1]);
          ctx.drawImage(
            imgs[1],
            needImageInfo.startX,
            needImageInfo.startY,
            needImageInfo.width,
            needImageInfo.height,
            0,
            initHeight,
            initWidth,
            initHeight
          );
          needImageInfo = calcImgWidthAndHeight(imgs[2]);
          ctx.drawImage(
            imgs[2],
            needImageInfo.startX,
            needImageInfo.startY,
            needImageInfo.width,
            needImageInfo.height,
            initWidth,
            initHeight,
            initWidth,
            initHeight
          );
        } else if (imgs.length === 2) {
          let needImageInfo = calcImgWidthAndHeight(imgs[0]);
          ctx.drawImage(
            imgs[0],
            needImageInfo.startX,
            needImageInfo.height * 0.25,
            needImageInfo.width,
            needImageInfo.height * 0.5,
            0,
            0,
            initWidth * 2,
            initHeight
          );
          needImageInfo = calcImgWidthAndHeight(imgs[1]);
          ctx.drawImage(
            imgs[1],
            needImageInfo.startX,
            needImageInfo.height * 0.25,
            needImageInfo.width,
            needImageInfo.height * 0.5,
            0,
            initHeight,
            initWidth * 2,
            initHeight
          );
        }
      }
      function distributeImages(totalImages) {
        const validCombinations = {
          20: [4, 4, 4, 4],
          19: [4, 4, 4, 4],
          18: [4, 4, 4, 4],
          17: [4, 4, 4, 4],
          16: [4, 4, 4, 4],
          15: [4, 4, 4, 3],
          14: [4, 4, 3, 3],
          13: [4, 3, 3, 3],
          12: [4, 3, 3, 2],
          11: [4, 3, 2, 2],
          10: [3, 3, 2, 2],
          9: [3, 2, 2, 2],
          8: [2, 2, 2, 2],
          7: [3, 2, 2],
          6: [2, 2, 2],
          5: [3, 2],
          4: [2, 2],
          3: [3],
          2: [2]
        };
        return validCombinations[totalImages];
      }
      function calcImgWidthAndHeight(image) {
        let scaleWidth = image.width / initWidth;
        let scaleHeight = image.height / initHeight;
        let scale = Math.min(scaleWidth, scaleHeight);
        image.width = image.width / scale;
        image.height = image.height / scale;
        return {
          startX: (image.width - initWidth) / 2,
          startY: (image.height - initHeight) / 2,
          width: initWidth * scale,
          height: initHeight * scale
        };
      }
      function loadImage(src) {
        return new Promise((resolve) => {
          let image = new Image();
          image.crossOrigin = "Anonymous";
          image.src = src;
          image.onload = () => resolve(image);
        });
      }
      function changeImgStyle() {
        const leftContentEl = document.querySelector(
          ".dialog-content > .left-content"
        );
        const canvasEls = document.querySelectorAll(".canvas canvas");
        const canvasWidth = (leftContentEl == null ? void 0 : leftContentEl.clientWidth) - 200;
        const canvasHeight = leftContentEl == null ? void 0 : leftContentEl.clientHeight;
        canvasEls.forEach((item) => {
          item.style.width = canvasWidth + "px";
        });
        initSmileWidth.value = initSmileHeight.value = canvasWidth * initSmileScale.value;
        initTextLineHeight.value = canvasHeight * initTextLineHeightScale.value;
        const addTextEls = document.querySelectorAll(".add-text");
        addTextEls.forEach((item, index) => {
          item.style.width = "200px";
        });
      }
      async function handDownload() {
        addXHSId();
        const canvas1 = document.getElementById("cover-canvas");
        downloadCanvasAsync(canvas1, activeCityName + "-cover.webp");
        for (let i = 0; i < imgNum.value; i++) {
          const canvas = document.getElementById("canvas" + i);
          await downloadCanvasAsync(canvas, activeCityName + "-" + (i + 1) + ".webp");
        }
        function downloadCanvasAsync(canvasEl, imgName) {
          return new Promise((resolve, reject) => {
            canvasEl.toBlob(
              function(blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = imgName;
                document.body.appendChild(link);
                setTimeout(() => {
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(url);
                  resolve();
                }, 0);
              },
              "image/webp",
              0.8
            );
          });
        }
      }
      function handDownloadTxt() {
        let element = document.querySelector(".note-need-content");
        downloadText(element.innerText);
      }
      function handDownloadTxtAi() {
        let element = document.querySelector(".note-need-content-ai");
        downloadText(element.innerText);
      }
      function downloadText(textToDownload) {
        let blob = new Blob([textToDownload], { type: "text/plain;charset=utf-8" });
        let url = URL.createObjectURL(blob);
        let downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = activeCityName + ".txt";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
      }
      const handleSearch = (value) => {
        const searchEl = document.querySelector("#search-input");
        changeReactInputValue(searchEl, value + cityLastFix.value);
        const searchBtn = document.querySelector(".search-icon");
        triggerClick(searchBtn);
        cityList.forEach((item, index) => {
          item.active = false;
          if (item.city === value) {
            item.active = true;
            activeCityName = item.city;
          }
        });
      };
      function triggerClick(el) {
        if (el.click) {
          el.click();
        } else {
          try {
            var evt = document.createEvent("Event");
            evt.initEvent("click", true, true);
            el.dispatchEvent(evt);
          } catch (e) {
            alert(e);
          }
        }
      }
      function changeReactInputValue(inputDom, newText) {
        let lastValue = inputDom.value;
        inputDom.value = newText;
        let event = new Event("input", { bubbles: true });
        event.simulated = true;
        let tracker = inputDom._valueTracker;
        if (tracker) {
          tracker.setValue(lastValue);
        }
        inputDom.dispatchEvent(event);
      }
      function aiFn() {
        showAiContentLoading.value = true;
        placeAiList.value = [];
        allInputText = {};
        let originElement = document.querySelector(".note-need-content");
        let content = originElement.innerText;
        let aiElement = document.querySelector(".note-need-content-ai");
        _GM_xmlhttpRequest({
          method: "POST",
          url: "https://api.deepseek.com/chat/completions",
          headers: {
            Authorization: "Bearer sk-feec788847764a0ea44e1487a4312a26",
            "Content-Type": "application/json"
          },
          data: JSON.stringify({
            model: "deepseek-chat",
            messages: [
              {
                role: "system",
                content: "改写旅游内容，并添加一些emoji"
              },
              {
                role: "user",
                content
              }
            ],
            stream: false
          }),
          onload: function(response) {
            var _a2, _b, _c, _d, _e, _f, _g;
            showAiContentLoading.value = false;
            const result = JSON.parse(response.response);
            console.log(111, result);
            if ((_c = (_b = (_a2 = result == null ? void 0 : result.choices) == null ? void 0 : _a2[0]) == null ? void 0 : _b.message) == null ? void 0 : _c.content) {
              let contentStripped = (_g = (_f = (_e = (_d = result == null ? void 0 : result.choices) == null ? void 0 : _d[0]) == null ? void 0 : _e.message) == null ? void 0 : _f.content) == null ? void 0 : _g.replace(
                /\*\*/g,
                ""
              );
              contentStripped = contentStripped.replace(/- /g, "• ");
              if (contentStripped) {
                aiElement.innerText = contentStripped;
              }
            }
          }
        });
        _GM_xmlhttpRequest({
          method: "POST",
          url: "https://api.coze.cn/open_api/v2/chat",
          headers: {
            Authorization: "Bearer pat_SQEDtuwfbazgIEEcEpUzndPkMeCbJh1eN4Dt7Om8RJ3ReMFHf4tdt2hrDrWtwmEW",
            "Content-Type": "application/json"
          },
          data: JSON.stringify({
            conversation_id: "",
            bot_id: "7392030733609091123",
            user: "29032201862555",
            stream: false,
            query: content
          }),
          onload: function(response) {
            var _a2, _b;
            const result = JSON.parse(response.response);
            console.log(222, result);
            if ((_a2 = result == null ? void 0 : result.messages) == null ? void 0 : _a2[0].content) {
              let contentStripped = (_b = result == null ? void 0 : result.messages) == null ? void 0 : _b[0].content;
              let completeTxt = JSON.parse(contentStripped);
              if (completeTxt == null ? void 0 : completeTxt.key_words) {
                placeAiList.value = completeTxt.key_words;
                placeAiList.value = placeAiList.value.filter((item) => {
                  return item !== activeCityName;
                });
                addCoverText(activeCityName + "周边游");
                if (downloadType.value === "collage") {
                  let id = 0;
                  placeAiList.value.forEach((item, index) => {
                    if (item && index >= 0 && index < 2) {
                      addCoverText(item);
                    }
                    if (item && index >= 0 && index < 4) {
                      if (id >= 0 && id <= 3) {
                        textManage(true, id, item);
                      }
                      id = id + 1;
                    }
                  });
                } else {
                  placeAiList.value.forEach((item, index) => {
                    if (item && index >= 0 && index < 2) {
                      addCoverText(item);
                    }
                  });
                }
              }
            }
          }
        });
      }
      return (_ctx, _cache) => {
        const _component_el_button = ElButton;
        const _component_el_input = ElInput;
        const _component_el_dialog = ElDialog;
        const _directive_loading = vLoading;
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          showMenu.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
            vue.createVNode(_component_el_button, {
              type: "success",
              onClick: _cache[0] || (_cache[0] = ($event) => getOriginImg(false))
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("获取原图")
              ]),
              _: 1
            }),
            vue.createVNode(_component_el_button, {
              type: "danger",
              onClick: _cache[1] || (_cache[1] = ($event) => getCollage(false))
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("获取拼图")
              ]),
              _: 1
            }),
            vue.createVNode(_component_el_button, {
              type: "primary",
              onClick: addXHSId
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("标记为已下载")
              ]),
              _: 1
            }),
            vue.createVNode(_component_el_input, {
              class: "input",
              modelValue: initSmileScale.value,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => initSmileScale.value = $event),
              placeholder: "请输入马赛克大小缩放比例"
            }, {
              prepend: vue.withCtx(() => [
                vue.createTextVNode("笑脸比例")
              ]),
              _: 1
            }, 8, ["modelValue"]),
            vue.createVNode(_component_el_input, {
              class: "input",
              modelValue: scaleAddSize.value,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => scaleAddSize.value = $event),
              placeholder: "请输入马赛克每次放大像素"
            }, {
              prepend: vue.withCtx(() => [
                vue.createTextVNode("每次放大")
              ]),
              _: 1
            }, 8, ["modelValue"]),
            vue.createVNode(_component_el_input, {
              class: "input",
              modelValue: initTextLineHeightScale.value,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => initTextLineHeightScale.value = $event),
              placeholder: "请输入文案间距缩放比例"
            }, {
              prepend: vue.withCtx(() => [
                vue.createTextVNode("文案比例")
              ]),
              _: 1
            }, 8, ["modelValue"]),
            vue.createVNode(_component_el_input, {
              class: "input",
              modelValue: vue.unref(imgListNum),
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => vue.isRef(imgListNum) ? imgListNum.value = $event : imgListNum = $event),
              placeholder: "请输入图片数量"
            }, {
              prepend: vue.withCtx(() => [
                vue.createTextVNode("图片数量")
              ]),
              _: 1
            }, 8, ["modelValue"]),
            vue.createElementVNode("div", _hoisted_2, [
              _hoisted_3,
              vue.createVNode(_component_el_input, {
                class: "input",
                modelValue: cityLastFix.value,
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => cityLastFix.value = $event),
                size: "small",
                placeholder: "关键词后缀"
              }, {
                prepend: vue.withCtx(() => [
                  vue.createTextVNode("后缀")
                ]),
                _: 1
              }, 8, ["modelValue"]),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(cityList), (item) => {
                return vue.openBlock(), vue.createElementBlock("div", {
                  class: vue.normalizeClass(["city-one", item.active ? "active-city-one" : ""]),
                  key: item.city,
                  onClick: ($event) => handleSearch(item.city)
                }, vue.toDisplayString(item.city), 11, _hoisted_4);
              }), 128))
            ]),
            vue.createElementVNode("div", _hoisted_5, [
              vue.createElementVNode("img", {
                src: vue.unref(xhsIcon),
                alt: ""
              }, null, 8, _hoisted_6),
              _hoisted_7
            ])
          ])) : vue.createCommentVNode("", true),
          vue.createVNode(_component_el_dialog, {
            modelValue: dialogVisible.value,
            "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => dialogVisible.value = $event),
            title: "",
            width: "100%",
            "before-close": closeDialog,
            "destroy-on-close": true
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("div", _hoisted_8, [
                vue.createElementVNode("div", _hoisted_9, [
                  _hoisted_10,
                  vue.createElementVNode("div", _hoisted_11, [
                    vue.createElementVNode("div", _hoisted_12, [
                      _hoisted_13,
                      vue.createElementVNode("div", _hoisted_14, [
                        vue.createElementVNode("input", {
                          id: "cover-input",
                          type: "text",
                          placeholder: "请输入文案",
                          onKeyup: _cache[7] || (_cache[7] = vue.withKeys(($event) => createText("cover"), ["enter"]))
                        }, null, 32),
                        vue.createVNode(_component_el_button, {
                          type: "primary",
                          onClick: _cache[8] || (_cache[8] = ($event) => createText("cover"))
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode("增加文案")
                          ]),
                          _: 1
                        }),
                        vue.createVNode(_component_el_button, {
                          type: "danger",
                          onClick: _cache[9] || (_cache[9] = ($event) => textManage(false, "cover"))
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode("删除文案")
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(imgNum.value, (item, index) => {
                      return vue.openBlock(), vue.createElementBlock("div", {
                        class: "canvas-one",
                        key: index
                      }, [
                        vue.createElementVNode("canvas", {
                          id: "canvas" + index
                        }, null, 8, _hoisted_15),
                        vue.createElementVNode("div", _hoisted_16, [
                          vue.createElementVNode("input", {
                            type: "text",
                            placeholder: "请输入文案",
                            id: `input${index}`,
                            onKeyup: vue.withKeys(($event) => createText(index), ["enter"])
                          }, null, 40, _hoisted_17),
                          vue.createVNode(_component_el_button, {
                            type: "primary",
                            onClick: ($event) => createText(index)
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode("增加文案")
                            ]),
                            _: 2
                          }, 1032, ["onClick"]),
                          vue.createVNode(_component_el_button, {
                            type: "danger",
                            onClick: ($event) => textManage(false, index)
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode("删除文案")
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ])
                      ]);
                    }), 128))
                  ])
                ]),
                vue.createElementVNode("div", _hoisted_18, [
                  _hoisted_19,
                  vue.createElementVNode("div", _hoisted_20, [
                    vue.createElementVNode("div", _hoisted_21, [
                      vue.createVNode(_component_el_button, {
                        type: "primary",
                        onClick: handDownloadTxt
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode("下载文案(原)")
                        ]),
                        _: 1
                      }),
                      vue.createVNode(_component_el_button, {
                        type: "success",
                        onClick: _cache[10] || (_cache[10] = ($event) => createCover(true))
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode("切换首图")
                        ]),
                        _: 1
                      }),
                      vue.createVNode(_component_el_button, {
                        type: "success",
                        onClick: copyArticle
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode("复制文案")
                        ]),
                        _: 1
                      }),
                      vue.createVNode(_component_el_button, {
                        type: "primary",
                        onClick: _cache[11] || (_cache[11] = ($event) => getCollage(false))
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode("获取拼图")
                        ]),
                        _: 1
                      }),
                      vue.createVNode(_component_el_button, {
                        type: "success",
                        onClick: _cache[12] || (_cache[12] = ($event) => getOriginImg(false))
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode("获取原图")
                        ]),
                        _: 1
                      })
                    ]),
                    vue.createElementVNode("div", _hoisted_22, [
                      vue.createVNode(_component_el_button, {
                        type: "primary",
                        onClick: aiFn
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode("AI改写生成")
                        ]),
                        _: 1
                      }),
                      vue.createVNode(_component_el_button, {
                        type: "success",
                        onClick: handDownloadTxtAi
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode("下载文案(AI)")
                        ]),
                        _: 1
                      }),
                      vue.createVNode(_component_el_button, {
                        type: "primary",
                        onClick: handDownload
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode("下载图片")
                        ]),
                        _: 1
                      }),
                      vue.createVNode(_component_el_button, {
                        type: "danger",
                        onClick: closeDialog
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode("关闭弹窗")
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  vue.createElementVNode("div", _hoisted_23, [
                    _hoisted_24,
                    vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", _hoisted_25, [
                      vue.createTextVNode(" 请使用AI生成... ")
                    ])), [
                      [_directive_loading, showAiContentLoading.value]
                    ]),
                    vue.createElementVNode("div", _hoisted_26, [
                      _hoisted_27,
                      !placeAiList.value.length && !showAiContentLoading.value ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_28, "请使用AI生成...")) : vue.createCommentVNode("", true),
                      showAiContentLoading.value ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_29, "识别中...")) : vue.createCommentVNode("", true),
                      placeAiList.value.length ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 2 }, vue.renderList(placeAiList.value, (item) => {
                        return vue.openBlock(), vue.createElementBlock("span", null, vue.toDisplayString(item) + " | ", 1);
                      }), 256)) : vue.createCommentVNode("", true),
                      placeAiList.value.length ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_30, "length: " + vue.toDisplayString(placeAiList.value.length), 1)) : vue.createCommentVNode("", true)
                    ])
                  ])
                ])
              ])
            ]),
            _: 1
          }, 8, ["modelValue"])
        ], 64);
      };
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-304f7edd"]]);
  vue.createApp(App).mount(
    (() => {
      const app = document.createElement("div");
      document.body.append(app);
      return app;
    })()
  );

})(Vue);