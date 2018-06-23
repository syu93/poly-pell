import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import pell from '/node_modules/pell/src/pell.js';

/**
 * `poly-pell`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
export class PolyPell extends PolymerElement {
  static get is() { return 'poly-pell'; }
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          padding: 16px;
        }
        .pell{border:1px solid hsla(0,0%,4%,.1)}.pell,.pell-content{box-sizing:border-box}.pell-content{height:300px;outline:0;overflow-y:auto;padding:10px}.pell-actionbar{background-color:#fff;border-bottom:1px solid hsla(0,0%,4%,.1)}.pell-button{background-color:transparent;border:none;cursor:pointer;height:30px;outline:0;width:30px;vertical-align:bottom}.pell-button-selected{background-color:#f0f0f0}
        #pell {min-height: 50vh;border: solid 1px #000000;background-color: #f7f7f7;@apply --pell-container}
        .pell-actionbar {height: 48px;box-sizing: content-box;@apply --pell-actionbar}
        .pell-actionbar button {color: #000000;border: none;font-size: 1.2em;background-color: #fefefe;width: 48px;height: 48px;cursor: pointer;@apply --pell-actionbar-button}
        .pell-actionbar button.pell-button-selected {font-weight: bold;color: var(--app-primary-color, royalblue);border-bottom: 4px solid var(--app-primary-color, royalblue);box-sizing: border-box;@apply --pell-actionbar-button-selected}
        .pell-content {min-height: 100%;height: 50vh;@apply --pell-content}
        .pell-content p {margin: 0;margin-bottom: 1em;}
        pre {background-color: #eeeeee;padding: 1em;border-radius: 4px;}
      </style>
      <section><div id="pell"></div></section>
    `;
  }
  static get properties() {
    return {
      html: {
        type: String,
        notify: true
      },
      classes: {
        type: Object,
        value: () => {
          return {
            actionbar: 'pell-actionbar',
            button: 'pell-button',
            content: 'pell-content',
            selected: 'pell-button-selected'
          }
        }
      },
      actions: {
        type: Array,
        value: () => {return null}
      }
    };
  }
  ready() {
    super.ready();
    pell.init({
      // <HTMLElement>, required
      element: this.shadowRoot.querySelector('#pell'),

      // <Function>, required
      // Use the output html, triggered by element's `oninput` event
      onChange: html => {
        this.html = html;
        this.dispatchEvent(new CustomEvent('html-changed', {detail: {value: html}, bubbles: true, composed: true}));
      },

      // <string>, optional, default = 'div'
      // Instructs the editor which element to inject via the return key
      defaultParagraphSeparator: 'p',

      // <boolean>, optional, default = false
      // Outputs <span style="font-weight: bold;"></span> instead of <b></b>
      styleWithCSS: false,

      // <Array[string | Object]>, string if overwriting, object if customizing/creating
      // action.name<string> (only required if overwriting)
      // action.icon<string> (optional if overwriting, required if custom action)
      // action.title<string> (optional)
      // action.result<Function> (required)
      // Specify the actions you specifically want (in order)
      actions: this.actions,

      // classes<Array[string]> (optional)
      // Choose your custom class names
      classes: this.classes
    });
  }
}

window.customElements.define(PolyPell.is, PolyPell);
