# @ventrata/checkout

## Installation

The `@ventrata/checkout` library is published to the public [npm](https://www.npmjs.com/)
registry. You can install it using:

    $ npm install --save @ventrata/checkout

### Using a Bundler

```js
import "@ventrata/checkout/dist/esm";
```

or when you need `CommonJS`

```js
require("ventrata-checkout/dist/index");
```

### Using `<script>` Tags

```html
<script src="https://unpkg.com/@ventrata/checkout/dist/umd.js"></script>
```

## Usage

Just insert the `ventrata-checkout` custom element yo your website.

```html
<ventrata-checkout
  product="{YOUR_PRODUCT_ID}"
  token="{YOUR_TOKEN}"
></ventrata-checkout>
```
