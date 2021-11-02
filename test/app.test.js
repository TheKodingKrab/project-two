import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../src/app.js';

describe('LearningCard', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html` <lrn-card type="science">
      <span slot="header">Science Card</span>
      <span slot="subheader">Test Subheader</span>
      <p>Whatever</p>
      <ul>
        <li>Plz</li>
        <li>Just</li>
        <li>Work</li>
      </ul>
    </lrn-card>`);
  });
  it('renders a learning-banner', () => {
    const banner = element.shadowRoot.querySelector('banner');
    expect(banner).to.exist;
  });

  it('renders main header', () => {
    const h1 = element.shadowRoot.querySelector('h1 slot');
    expect(h1).to.exist;
    // Test claims h1 does not exist
    expect(h1.assignedElements({ flat: true })[0].innerText).to.equal(
      'Science Card'
    );
  });

  it('renders the sub header', () => {
    const h2 = element.shadowRoot.querySelector('h2 slot');
    expect(h2).to.exist;
    // Test claims that h2 does not exist. Says it is null.
    expect(h2.assignedElements({ flat: true })[0].innerText).to.equal(
      'Test Subheader'
    );
  });

  it('renders main content', () => {
    const para = element.querySelector('p');
    expect(para).to.exist;
    expect(para.textContent).to.equal('Whatever');

    const list = element.querySelector('ul');
    expect(list).to.exist;
    expect(list.children.length).to.equal(3);
  });

  it('checks updatedProperties', () => {
    element.type = 'science';
    expect(element.type).to.equal('science');
    expect(element.icon).to.equal('fact');
    // Issue here: "expect undefined to equal beaker"
    element.type = 'objective';
    setTimeout(() => {
      expect(element.type).to.equal('objective');
      expect(element.icon).to.equal('lightbulb');
    }, 100);
    element.type = 'question';
    setTimeout(() => {
      expect(element.type).to.equal('question');
      expect(element.icon).to.equal('question');
    }, 100);
  });

  it('check card content', async () => {
    const element2 = await fixture(html` <lrn-card type="objective">
      <span slot="header">Unit 1</span>
      <span slot="subheader">Learning Objectives</span>
      <ul>
        <li>What makes an element an Isotope?</li>
        <li>Quarks and Gluons make up what?</li>
        <li>What was the first element created after the big bang?</li>
      </ul>
    </lrn-card>`);
    const element3 = await fixture(html` <lrn-card type="question">
      <span slot="header">Unit 1</span>
      <span slot="subheader">Did you know?</span>
      <p>Walter White used High School Chemistry Equipment to cook Meth?</p>
    </lrn-card>`);
    expect(element.type).to.equal('science');
    // Issue here: "expect undefined to equal beaker";
    expect(element.icon).to.equal('beaker');
    expect(element2.type).to.equal('objective');
    expect(element2.icon).to.equal('lightbulb');
    expect(element3.type).to.equal('question');
    expect(element3.icon).to.equal('question');
  });

  it('passes the a11y audit', async () => {
    element.type = 'science';
    setTimeout(() => {
      expect(element).shadowDom.to.be.accessible();
    }, 100);
    element.type = 'objective';
    setTimeout(() => {
      expect(element).shadowDom.to.be.accessible();
    }, 100);
    element.type = 'question';
    setTimeout(() => {
      expect(element).shadowDom.to.be.accessible();
    }, 100);
  });
});
