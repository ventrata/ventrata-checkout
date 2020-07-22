import { create } from 'zoid/dist/zoid.frameworks.js';

const VentrataCheckout = create({
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
    closeModal: {
      type: "function",
      required: true,
    },
    viewType: {
      type: "string",
      required: true,
    },
  },
  dimensions: {
    width: "345px",
  },
  autoResize: { height: true, width: false },
});

const VENTRATA_ID = "ventrata-checkout";
const MODAL = "modal";
const EMBEDDED = "embedded";
const TYPES = [MODAL, EMBEDDED];

function changeViewType(viewType) {
  const el = document.querySelector(`${VENTRATA_ID} iframe`);
  if (viewType === MODAL) {
    el.style.position = "fixed";
    el.style.zIndex = 999999999;
  } else {
    el.style.position = "static";
    el.style.zIndex = 0;
  }
}

class VCheckout extends HTMLElement {
  constructor() {
    super();

    this.contentElement = null;
    this.buttonElement = null;
  }

  connectedCallback() {
    const product = this.getAttribute("product");
    this.setAttribute("id", VENTRATA_ID);
    if (product == null) {
      throw new Error('Expected prop "product" to be defined');
    }

    const token = this.getAttribute("token");
    if (token == null) {
      throw new Error('Expected prop "token" to be defined');
    }

    const type = this.getAttribute("type");
    if (type == null) {
      throw new Error('Expected prop "type" to be defined');
    }

    if (!TYPES.includes(type)) {
      throw new Error(
        `Prop "type" has invalid value, valid values are: "modal" | "embedded"`
      );
    }

    this.element = VentrataCheckout({
      product: product,
      token: token,
      changeViewType: changeViewType,
      closeModal: () => this.handleCloseModal(type),
      viewType: type,
    }).render(this);

    if (type === MODAL && this.firstChild) {
      const contentElement = document.querySelector(`${VENTRATA_ID} > div`);
      contentElement.style.display = "none";
      this.firstChild.addEventListener("click", this.handleModalView);
    }
  }

  disconnectedCallback() {
    if (this.type === MODAL && this.firstChild) {
      this.firstChild.removeEventListener("click", this.handleModalView);
    }
  }

  handleModalView() {
    const contentElement = document.querySelector(`${VENTRATA_ID} > div`);
    contentElement.style.display = "inline-block";
    changeViewType(MODAL);
  }

  handleCloseModal(type) {
    const contentElement = document.querySelector(`${VENTRATA_ID} > div`);
    if (type === MODAL) {
      contentElement.style.display = "none";
    }
  }
}

customElements.define("ventrata-checkout", VCheckout);
