// Geometry of the fixed burger button.
//
// The button is `position: fixed`, so it is not part of any layout flow and
// nothing in the header can "see" it. The header therefore has to reserve the
// space explicitly -- otherwise the social icons slide underneath the button on
// narrow viewports. Both sides of that contract read their numbers from here so
// they can never drift apart again.

export const BURGER = {
  base: { width: 36, height: 30, right: 36, top: 36 }, // > 640px
  sm: { width: 32, height: 26, right: 20, top: 24 }, //   <= 640px
  xs: { width: 28, height: 22, right: 16, top: 20 }, //   <= 480px
};

// Breathing room between the rightmost header item and the burger button.
export const BURGER_GAP = 12;

// Horizontal space to keep free at the right edge of the header, measured from
// the viewport's right edge.
export const burgerReserve = (size) => size.right + size.width + BURGER_GAP;
