# Coisou: photography first in an existing storefront

Public observation: 24 November 2026, 15:54:18–15:55:10 UTC.

This case study records interface geometry and interaction observations on the [Coisou storefront](https://www.coisou.store/). It is a PiP learning example, not a payment, accessibility or commercial-performance certification. No storefront source code, product photography or customer data is distributed here.

## The interface problem

On a narrow screen, a long header, persistent filters and repeated information can push the first product photograph and purchase action below the initial viewport. This iteration prioritizes the photograph, product name, price, quick action and supporting details, in that order.

The visible patterns are a compact header with the menu on the left, a centered mobile brand, expandable search, separate wishlist and shopping bag, a two-column mobile grid, and more columns as the viewport grows. Product names receive greater emphasis than prices. A heart, a plus button and the direct-purchase action have distinct purposes. The product page places its gallery and purchase controls before long descriptions and collapsible specifications.

## Measured public interface

The same home page and [Winter Pro product page](https://www.coisou.store/produto/mascara-termica-de-esqui-winter-pro/) were measured with Chromium using a 390 × 844 CSS-pixel viewport. The baseline was the previous public site; the final observation was the updated public site. Values are positions relative to the top of the document, rounded to one decimal place.

| Observation | Previous public site | Updated public site |
| --- | ---: | ---: |
| Top of the first home-page product photograph | 492.2 px | 220.0 px |
| Top of the product-page direct-purchase control | 1,094.1 px | 765.2 px |
| Scroll needed to reveal that entire control | 322.1 px | 0 px |
| Home-page product grid columns | 2 | 2 |

The final observation covered viewport widths of 320, 375, 390, 430, 768, 1024, 1440 and 1920 CSS pixels. Within the observed pages and interactions, the recorded checks found no horizontal overflow, broken visible images or JavaScript page errors. This does not establish that every page, device or catalog image was inspected.

The current public build metadata was independently fetched at 15:57:30 UTC from [the storefront build manifest](https://www.coisou.store/catalog-build.json), which reported revision `2ea135185ec8f74d103884faccb818c7f156c401`. That public revision identifies the observed storefront, not a new PiP library release. A compact, reviewed [measurement receipt](../../examples/qa/coisou-public-geometry-20261124.json) retains the values, observation times and original receipt hashes without private source references or infrastructure identifiers.

## What the observation does not prove

These are laboratory measurements of a live web page using browser emulation. They are not measurements on physical iOS or Android devices or inside the Instagram application. They do not establish field LCP, INP or CLS percentiles, a change in sales, checkout completion, payment eligibility or full WCAG conformance. A visible purchase control does not by itself prove that an offer is commercially enabled.

The browser run was read-only. It did not place an order, create a payment or submit customer information. Separate tests using simulated offers must remain labeled as such and cannot certify a live payment flow.

## Reusing the lesson

1. Preserve the existing store and its product identities, price validation and availability rules.
2. Record the first photograph and main action positions before changing the layout.
3. Give wishlist, add-to-cart and direct purchase distinct meanings. Require an explicit choice when multiple variants exist.
4. Reduce layout overhead and repeated steps without removing price, delivery or payment checks.
5. Compare the same pages and viewport after the change, and distinguish public-site observations from local builds and simulated commerce.

Original PiP documentation, published with the owner's authorization under the library's MIT license. The store's trademarks, photographs and catalog are not relicensed by this document. See the [release evidence standard](../release-evidence-standard.md) for the distinction between observed checks and release approval.
