!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.drupalOmekaResource=t())}(self,(()=>(()=>{var e={"ckeditor5/src/core.js":(e,t,r)=>{e.exports=r("dll-reference CKEditor5.dll")("./src/core.js")},"ckeditor5/src/ui.js":(e,t,r)=>{e.exports=r("dll-reference CKEditor5.dll")("./src/ui.js")},"ckeditor5/src/widget.js":(e,t,r)=>{e.exports=r("dll-reference CKEditor5.dll")("./src/widget.js")},"dll-reference CKEditor5.dll":e=>{"use strict";e.exports=CKEditor5.dll}},t={};function r(a){var i=t[a];if(void 0!==i)return i.exports;var o=t[a]={exports:{}};return e[a](o,o.exports,r),o.exports}r.d=(e,t)=>{for(var a in t)r.o(t,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var a={};return(()=>{"use strict";r.d(a,{default:()=>l});var e=r("ckeditor5/src/core.js"),t=r("ckeditor5/src/widget.js");class i extends e.Command{execute(e){const t=this.editor.plugins.get("drupalOmekaResourceEditing"),r=Object.entries(t.attrs).reduce(((e,[t,r])=>(e[r]=t,e)),{}),a=Object.keys(e).reduce(((t,a)=>(r[a]&&(t[r[a]]=e[a]),t)),{});this.editor.model.change((e=>{this.editor.model.insertContent(function(e,t){return e.createElement("drupalOmekaResource",t)}(e,a))}))}refresh(){const e=this.editor.model,t=e.document.selection,r=e.schema.findAllowedParent(t.getFirstPosition(),"drupalOmekaResource");this.isEnabled=null!==r}}function o(e){for(const t of e){if(t.hasAttribute("data-drupal-omeka-resource-preview"))return t;if(t.childCount){const e=o(t.getChildren());if(e)return e}}return null}class s extends e.Plugin{static get requires(){return[t.Widget]}init(){this.attrs={drupalOmekaResourceEntityType:"data-entity-type",drupalOmekaResourceEntityId:"data-entity-id",drupalOmekaResourceEntityBundle:"data-entity-bundle",drupalOmekaResourceViewMode:"data-view-mode"},this.converterAttributes=["drupalOmekaResourceEntityId","drupalOmekaResourceEntityBundle","drupalOmekaResourceEntityType"];const e=this.editor.config.get("drupalOmekaResource");if(!e)return;const{previewURL:t,themeError:r}=e;this.previewUrl=t,this.labelError=Drupal.t("Preview failed"),this.themeError=r||`\n      <p>${Drupal.t("An error occurred while trying to preview the omeka resource. Please save your work and reload this page.")}<p>\n    `,this._defineSchema(),this._defineConverters(),this.editor.commands.add("insertDrupalOmekaResource",new i(this.editor))}async _fetchPreview(e){const t={text:this._renderElement(e),id:e.getAttribute("drupalOmekaResourceEntityId"),bundle:e.getAttribute("drupalOmekaResourceEntityBundle")},r=await fetch(`${this.previewUrl}?${new URLSearchParams(t)}`,{headers:{"X-Drupal-OmekaResourcePreview-CSRF-Token":this.editor.config.get("drupalOmekaResource").previewCsrfToken}});if(r.ok){return{label:t.id,preview:await r.text()}}return{label:this.labelError,preview:this.themeError}}_defineSchema(){this.editor.model.schema.register("drupalOmekaResource",{allowWhere:"$block",isObject:!0,isContent:!0,isBlock:!0,allowAttributes:Object.keys(this.attrs)}),this.editor.editing.view.domConverter.blockElements.push("drupal-omeka-resource")}_defineConverters(){const e=this.editor.conversion;e.for("upcast").elementToElement({view:{name:"drupal-omeka-resource"},model:"drupalOmekaResource"}),e.for("dataDowncast").elementToElement({model:"drupalOmekaResource",view:{name:"drupal-omeka-resource"}}),e.for("editingDowncast").elementToElement({model:"drupalOmekaResource",view:(e,{writer:r})=>{const a=r.createContainerElement("figure",{class:"drupal-omeka-resource"});if(!this.previewUrl){const e=r.createRawElement("div",{"data-drupal-omeka-resource-preview":"unavailable"});r.insert(r.createPositionAt(a,0),e)}return r.setCustomProperty("drupalOmekaResource",!0,a),(0,t.toWidget)(a,r,{label:Drupal.t("Drupal Omeka Resource")})}}).add((e=>{const t=(e,t,r)=>{const a=r.writer,i=t.item,s=r.mapper.toViewElement(t.item);let n=o(s.getChildren());if(n){if("ready"!==n.getAttribute("data-drupal-omeka-resource-preview"))return;a.setAttribute("data-drupal-omeka-resource-preview","loading",n)}else n=a.createRawElement("div",{"data-drupal-omeka-resource-preview":"loading"}),a.insert(a.createPositionAt(s,0),n);this._fetchPreview(i).then((({label:e,preview:t})=>{n&&this.editor.editing.view.change((r=>{const a=r.createRawElement("div",{"data-drupal-omeka-resource-preview":"ready","aria-label":e},(e=>{e.innerHTML=t}));r.insert(r.createPositionBefore(n),a),r.remove(n)}))}))};return this.converterAttributes.forEach((r=>{e.on(`attribute:${r}:drupalOmekaResource`,t)})),e})),Object.keys(this.attrs).forEach((t=>{const r={model:{key:t,name:"drupalOmekaResource"},view:{name:"drupal-omeka-resource",key:this.attrs[t]}};e.for("dataDowncast").attributeToAttribute(r),e.for("upcast").attributeToAttribute(r)}))}_renderElement(e){const t=this.editor.model.change((t=>{const r=t.createDocumentFragment(),a=t.cloneElement(e,!1);return["linkHref"].forEach((e=>{t.removeAttribute(e,a)})),t.append(a,r),r}));return this.editor.data.stringify(t)}static get pluginName(){return"drupalOmekaResourceEditing"}}var n=r("ckeditor5/src/ui.js");class d extends e.Plugin{init(){const e=this.editor,t=this.editor.config.get("drupalOmekaResource");if(!t)return;const{libraryURL:r,openDialog:a,dialogSettings:i={}}=t;r&&"function"==typeof a&&e.ui.componentFactory.add("drupalOmekaResource",(t=>{const o=e.commands.get("insertDrupalOmekaResource"),s=new n.ButtonView(t);return s.set({label:Drupal.t("Insert Drupal Omeka Resource"),icon:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-text" viewBox="0 0 16 16">\n  <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>\n  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>\n  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>\n</svg>',tooltip:!0}),s.bind("isOn","isEnabled").to(o,"value","isEnabled"),this.listenTo(s,"execute",(()=>{a(r,(({attributes:t})=>{e.execute("insertDrupalOmekaResource",t)}),i)})),s}))}}class u extends e.Plugin{static get requires(){return[s,d]}static get pluginName(){return"drupalOmekaResource"}}const l={DrupalOmekaResource:u}})(),a=a.default})()));