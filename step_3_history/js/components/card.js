
/**
 * attributeChangedCallback example
 */

class Card extends HTMLElement {

  static observedAttributes = ['title', 'description', 'footer'];

  get title() {
    return this.getAttribute('title');
  }
  set title(value) {
    this.setAttribute('title', value);
  }

  get description() {
    return this.getAttribute('description');
  }
  set description(value) {
    this.setAttribute('description', value);
  }

  get footer() {
    return this.getAttribute('footer');
  }
  set footer(value) {
    this.setAttribute('footer', value);
  }

  constructor() {
    super();

    this.connectedCallback = this.connectedCallback.bind(this);
    this.attributeChangedCallback = this.attributeChangedCallback.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'title': {
        this.setText('.card-title', newValue);
      } break;
      case 'description': {
        this.setText('.card-content', newValue);
      } break;
      case 'footer': {
        this.setText('.card-footer', newValue);
      } break;
    }
  }

  render() {
    this.innerHTML = '';

    const card = this.appendChild(document.createElement('div'));
    card.setAttribute('class', 'card');

    const cardTitle = card.appendChild(document.createElement('h3'));
    cardTitle.setAttribute('class', 'card-title');
    cardTitle.textContent = this.title;

    const cardContent = card.appendChild(document.createElement('div'));
    cardContent.setAttribute('class', 'card-content');
    cardContent.textContent = this.description;

    const cardFooter = card.appendChild(document.createElement('div'));
    cardFooter.setAttribute('class', 'card-footer');
    cardFooter.textContent = this.footer;
  }

  setText(selector, text) {
    const element = this.querySelector(selector);
    if (!!element) {
      element.textContent = text;
    }
  }
}

customElements.define('app-card', Card);