import { html, css } from 'lit';
import { SimpleColors } from '@lrnwebcomponents/simple-colors/simple-colors.js';
import './LearningIcon.js';

// const beaker = new URL('../assets/beaker.svg', import.meta.url).href;
// const lightbulb = new URL('../assets/lightbulb.svg', import.meta.url).href;
// const question = new URL('../assets/question.svg', import.meta.url).href;

export class LearningCardBanner extends SimpleColors {
  static get tag() {
    return 'learning-card-banner';
  }

  constructor() {
    super();
    this.type = null;
    this.accentColor = 'blue';
    this.dark = false;
  }

  static get properties() {
    return {
      ...super.properties,
      type: { type: String, reflect: true },
    };
  }

  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          display: inline-block;
          font-family: 'sans-serif';
          font-family: 'Open Sans', sans-serif;
          border: 1px transparent;
        }
        :host([type='objective']) {
          background-color: var(--simple-colors-default-theme-orange-5);
        }
        :host([type='science']) {
          background-color: var(--simple-colors-default-theme-green-8);
        }
        :host([type='fact']) {
          background-color: var(--simple-colors-default-theme-blue-6);
        }
        img {
          display: inline-flex;
          height: var(--lrn-card-height, 150px);
          width: var(--lrn-card-width, 150px);
          background-color: transparent;
        }
        #main-header {
          font-size: 200%;
          text-transform: uppercase;
          font-weight: 300;
        }
        #sub-header {
          font-size: 250%;
          text-transform: lowercase;
          font-weight: 500;
        }
        #banner-element {
          display: flex;
          flex-direction: row;
        }
        .top {
          justify-content: center;
          align-items: center;
        }
      `,
    ];
  }

  render() {
    return html`
      <div id="banner-element" style="display: flex;">
        <learning-icon type="${this.type}"></learning-icon>
        <div id="banner">
          <div id="header">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define(LearningCardBanner.tag, LearningCardBanner);
