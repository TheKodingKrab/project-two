import { html, css } from 'lit';
import { SimpleColors } from '@lrnwebcomponents/simple-colors/simple-colors.js';

export class LrnCard extends SimpleColors {
  static get tag() {
    return 'lrn-card';
  }

  // HTMLElement life-cycle, built in; use this for setting defaults
  // Use this to get icons
  constructor() {
    super();
    this.type = 'objective';
    this.dark = false;
    this.header = 'Unit 1';
    this.subheader = 'learning objectives';
    setTimeout(() => {
      import('./LearningCardBanner.js');
      import('./LearningIcon.js');
      import('./LearningScaffold.js');
    }, 0);
  }

  // properties that you wish to use as data in HTML, CSS, and the updated life-cycle
  static get properties() {
    return {
      ...super.properties,
      type: { type: String, reflect: true },
      header: { type: String, reflect: true },
      subheader: { type: String },
    };
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'type' && this[propName] === 'objective') {
        this.mainheader = 'Unit 1';
        this.subheader = 'Learning Objectives';
      }

      if (propName === 'type' && this[propName] === 'science') {
        this.mainheader = 'Unit 1';
        this.subheader = 'Chem Connection';
      }

      if (propName === 'type' && this[propName] === 'fact') {
        this.mainheader = 'Unit 1';
        this.subheader = 'Did You Know?';
      }
    });
  }

  // CSS - specific to Lit
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          display: block;
          background-color: 'white';
          height: inherit;
          width: inherit;
          font-family: 'sans-serif';
          font-family: 'Open Sans', sans-serif;
        }
        img {
          display: inline-flex;
          height: var(--lrn-card-height, 100px);
          width: var(--lrn-card-width, 100px);
          background-color: 'green';
        }

        summary {
          list-style-position: inside;
          display: flex;
        }

        .larger {
          color: white;
          font-family: 'sans-serif';
          font-family: 'Open Sans', sans-serif;
          font-size: xxx-large;
          text-transform: uppercase;
        }

        .smaller {
          color: white;
          font-family: 'sans-serif';
          font-family: 'Open Sans', sans-serif;
          font-size: xx-large;
          font-weight: 900;
          text-transform: uppercase;
        }

        #drawerContents {
          display: flex;
          flex-direction: column;
          justify-content: left;
          align-items: left;
          border: 1px solid;
          box-shadow: 5px 5px #d3d3d3;
        }
        #cardFrame {
          margin: 30px 0px;
        }

        learning-card-banner {
          padding: 10x;
          width: 100%;
        }
        li {
          font-size: 14px;
          color: #6b6d6c;
        }
      `,
    ];
  }

  render() {
    return html`
      <div id="cardFrame">
        <details open>
          <summary part="banner">
            <div
              class="slot-wrapper"
              data-label="header"
              data-layout-slotname="header"
            >
              <lrn-card-banner type="${this.type}"> </lrn-card-banner>
            </div>
            <learning-card-banner type="${this.type}">
              <div class="thesubheader" data-label="thesubheader">
                <div class="larger" slot="header">${this.mainheader}</div>
                <slot class="smaller" name="thesubheader"
                  >${this.subheader}
                </slot>
              </div>
            </learning-card-banner>
          </summary>
          <div id="drawerContents">
            <slot> </slot>
          </div>
        </details>
      </div>
    `;
  }

  static get haxProperties() {
    return {
      canScale: false,
      canPosition: false,
      canEditSource: false,
      contentEditable: false,
      gizmo: {
        title: 'Learning Card',
        description: 'An element that you have to replace / fix / improve',
        icon: 'credit-card',
        color: 'blue',
        groups: ['content', 'Presentation', 'Education'],
      },
      settings: {
        configure: [
          {
            property: 'type',
            title: 'Type',
            description: 'Identifies the Card',
            inputMethod: 'select',
            options: {
              science: 'Science',
              math: 'Math',
            },
          },
        ],
        advanced: [],
      },
      demoSchema: [
        {
          tag: LrnCard.tag,
          properties: {
            type: 'science',
          },
          content:
            "<p slot='header'>This tag renders in the header</p><ul><li>This renders</li><li>Below the tag</li></ul>",
        },
      ],
    };
  }
}
