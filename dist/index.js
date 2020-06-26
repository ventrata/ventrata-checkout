'use strict';

var zoid = require('zoid/dist/zoid.frameworks.js');

const VentrataCheckout = zoid.create({
  tag: "ventrata-checkout",
  url: "https://ventrata.github.io/ventrata-checkout-spa/",
  props: {
    token: {
      type: "string",
      required: true,
    },
    product: {
      type: "string",
      required: true,
    },
  },
  dimensions: {
    width: "345px",
  },
  autoResize: { height: true, width: false },
});

class VCheckout extends HTMLElement {
  connectedCallback() {
    const product = this.getAttribute("product");

    if (product == null) {
      throw new Error('Expected prop "product" to be defined');
    }

    const token = this.getAttribute("token");
    if (token == null) {
      throw new Error('Expected prop "token" to be defined');
    }

    VentrataCheckout({
      product: product,
      token: token,
    }).render(this);
  }
}

customElements.define("ventrata-checkout", VCheckout);
