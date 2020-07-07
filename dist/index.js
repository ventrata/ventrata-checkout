'use strict';

var zoid_frameworks_js = require('zoid/dist/zoid.frameworks.js');

const VentrataCheckout = zoid_frameworks_js.create({
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
    changeViewType: {
      type: "function",
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
    this.setAttribute("id", "ventrata-checkout");

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
      changeViewType: this.changeViewType,
    }).render(this);
  }

  changeViewType(viewType) {
    const el = document.querySelector("#ventrata-checkout iframe");
    if (viewType === "modal") {
      el.style.position = "fixed";
    } else {
      el.style.position = "static";
    }
  }
}

customElements.define("ventrata-checkout", VCheckout);
