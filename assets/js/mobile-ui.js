(function () {
  /**
   * Mobile UI bootstrap
   * - toggles the `data-mobile-ui` flag used by the CSS overlay
   * - swaps in bespoke bubble animations for potion vials
   */
  const mq = window.matchMedia('(max-width: 768px)');
  const vialSelector = '.potion-vial .vial-liquid';

  /**
   * Safely read a CSS custom property that stores a percentage.
   * Some browsers report `""` if the property is missing, so we
   * coerce to a usable number.
   */
  const parsePercentVar = (rawValue) => {
    if (!rawValue) return 0;
    const numeric = parseFloat(rawValue);
    return Number.isNaN(numeric) ? 0 : numeric;
  };

  /**
   * Resolve the inline `--fill-percent` (preferred) or the computed
   * value so the JS stays in sync with whatever the CMS outputs.
   */
  const getFillPercent = (liquid) => {
    const inlineValue = liquid.style.getPropertyValue('--fill-percent');
    if (inlineValue) return parsePercentVar(inlineValue);
    return parsePercentVar(window.getComputedStyle(liquid).getPropertyValue('--fill-percent'));
  };

  /** Convenience helper for tiny Brownian-motion offsets. */
  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  /**
   * Replace the desktop bubbles with mobile-friendly ones.
   * We cache and later restore the original markup so the desktop
   * experience stays untouched when the viewport grows again.
   */
  const buildMobileBubbles = (liquid) => {
    const fillPercent = getFillPercent(liquid);
    if (!liquid.dataset.originalBubbles) {
      liquid.dataset.originalBubbles = liquid.innerHTML;
    }

    liquid.innerHTML = '';
    liquid.dataset.mobileBubbleState = 'active';

    const bubbleCount = fillPercent < 5 ? 0 : Math.min(10, Math.max(2, Math.round(fillPercent / 10)));

    for (let i = 0; i < bubbleCount; i += 1) {
      const bubble = document.createElement('span');
      bubble.className = 'mobile-vial-bubble';

      const size = randomInRange(3, 7).toFixed(1);
      bubble.style.setProperty('--bubble-size', `${size}px`);
      bubble.style.setProperty('--bubble-top', `${randomInRange(20, 80).toFixed(1)}%`);
      bubble.style.setProperty('--bubble-left', `${randomInRange(8, 92).toFixed(1)}%`);
      bubble.style.setProperty('--bubble-duration', `${randomInRange(5, 9).toFixed(1)}s`);
      bubble.style.setProperty('--bubble-delay', `${randomInRange(0, 2.5).toFixed(1)}s`);

      for (let step = 1; step <= 4; step += 1) {
        bubble.style.setProperty(`--bubble-drift-x${step}`, `${randomInRange(-4, 4).toFixed(1)}px`);
        bubble.style.setProperty(`--bubble-drift-y${step}`, `${randomInRange(-5, 5).toFixed(1)}px`);
      }

      liquid.appendChild(bubble);
    }
  };

  /** Apply the mobile bubble treatment to every potion vial. */
  const activateMobileVialBubbles = () => {
    document.querySelectorAll(vialSelector).forEach((liquid) => {
      buildMobileBubbles(liquid);
    });
  };

  /** Restore each vial back to the markup the desktop view expects. */
  const deactivateMobileVialBubbles = () => {
    document.querySelectorAll(vialSelector).forEach((liquid) => {
      if (liquid.dataset.mobileBubbleState === 'active' && liquid.dataset.originalBubbles) {
        liquid.innerHTML = liquid.dataset.originalBubbles;
        delete liquid.dataset.mobileBubbleState;
      }
    });
  };

  /**
   * Central toggle that either enables or disables the entire
   * mobile overlay depending on the current media query state.
   */
  const applyMobileFlag = () => {
    if (mq.matches) {
      document.body.dataset.mobileUi = 'true';
      activateMobileVialBubbles();
    } else {
      delete document.body.dataset.mobileUi;
      deactivateMobileVialBubbles();
    }
  };

  // Safari still ships `addListener`, so we support both APIs.
  if (mq.addEventListener) {
    mq.addEventListener('change', applyMobileFlag);
  } else if (mq.addListener) {
    mq.addListener(applyMobileFlag);
  }

  // Run immediately if the DOM is ready; otherwise wait once.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyMobileFlag, { once: true });
  } else {
    applyMobileFlag();
  }
})();
