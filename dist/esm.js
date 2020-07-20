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
class VCheckout extends HTMLElement {
  constructor() {
    super();

    this.contentElement = null;
    this.buttonElement = null;
    this.type = null;
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

    const type = this.getAttribute("type") ?? "embedded";
    this.type = type;

    this.element = VentrataCheckout({
      product: product,
      token: token,
      changeViewType: this.changeViewType,
      closeModal: this.handleCloseModal,
      viewType: this.type,
    }).render(this);

    if (this.type === "modal" && this.firstChild) {
      this.contentElement = document.querySelector(`${VENTRATA_ID} > div`);
      this.contentElement.style.display = "none";
      this.firstChild.addEventListener("click", this.handleModalView);
    }
  }

  disconnectedCallback() {
    if (this.type === "modal" && this.firstChild) {
      this.firstChild.removeEventListener("click", this.handleModalView);
    }
  }

  handleModalView = () => {
    this.contentElement.style.display = "inline-block";
    this.changeViewType("modal");
  };

  handleCloseModal = () => {
    this.contentElement.style.display = "none";
  };

  changeViewType = (viewType) => {
    const el = document.querySelector(`${VENTRATA_ID} iframe`);
    if (viewType === "modal") {
      el.style.position = "fixed";
      el.style.zIndex = 999999999;
    } else {
      el.style.position = "static";
      el.style.zIndex = 0;
    }
  };
}

customElements.define("ventrata-checkout", VCheckout);
