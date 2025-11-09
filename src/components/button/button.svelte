<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements'
  import type * as Props from './props'
  import ProgressRing from '../progress/progressRing.svelte'

  // This black magic comes from this thread:
  // https://github.com/sveltejs/language-tools/issues/442#issuecomment-1278618531
  //
  // To quote that thread - This is "absolute bonkers!"
  //
  // It's interesting, minor variations which I would expect to work on don't,
  // and this is the only combination which seems to do what we want and I'm not
  // clear on why. You're welcome to try other approaches here.
  //
  // Tips, for if things aren't working right:
  // 1) npm run gen-types
  // 2) Reload your VSCode Window (sometimes the Svelte Type Checker struggles).
  // 3) Make sure any script tags on your component have a `lang="ts"` attribute.
  type Href = $$Generic<string | undefined>
  type Disabled = $$Generic<undefined extends Href ? boolean : undefined>
  type Loading = $$Generic<undefined extends Href ? boolean : undefined>
  type ExcludedProps = 'size' | 'href' | 'hreflang'

  interface CommonProps {
    kind?: Props.ButtonKind
    size?: Props.ButtonSize
    fab?: boolean
    onClick?: (e: MouseEvent) => void
  }

  type NalaButtonProps = CommonProps &
    Omit<Partial<SvelteHTMLElements['button']>, ExcludedProps> & {
      isDisabled?: Disabled
      isLoading?: Loading
      href?: never
    }

  type NalaLinkProps = CommonProps &
    Omit<Partial<SvelteHTMLElements['a']>, ExcludedProps> & {
      href: Href
    }

  type $$Props = NalaLinkProps | NalaButtonProps

  export let kind: Props.ButtonKind = 'filled'
  export let size: Props.ButtonSize = 'medium'
  export let isLoading: Loading = undefined
  export let isDisabled: Disabled = undefined
  export let href: Href = undefined
  export let fab = false

  export let onClick: (e: MouseEvent) => void = undefined

  $: tag = href ? 'a' : ('button' as 'a' | 'button')
  $: disabled = !!(isDisabled || (isDisabled as any) === '')
</script>

<svelte:element
  this={tag}
  href={href || undefined}
  class="qoraButton"
  class:isFilled={kind === 'filled'}
  class:isOutline={kind === 'outline'}
  class:isPlain={kind === 'plain'}
  class:isPlainFaint={kind === 'plain-faint'}
  class:isHero={kind === 'hero'}
  class:isJumbo={size === 'jumbo'}
  class:isLarge={size === 'large'}
  class:isMedium={size === 'medium'}
  class:isSmall={size === 'small'}
  class:isTiny={size === 'tiny'}
  class:fab
  class:isLoading
  on:click={onClick}
  {...$$restProps}
  disabled={isLoading || disabled || undefined}
>
  {#if isLoading}
    <div class:content={!fab}>
      {#if $$slots.loading}
        <slot name="loading" />
      {:else if !fab}
        <slot>Qora Button</slot>
      {/if}
    </div>
    <ProgressRing />
  {:else}
    <slot name="icon-before" />
    <div class:content={!fab}>
      <slot>Qora Button</slot>
    </div>
    <slot name="icon-after" />
  {/if}
</svelte:element>

<style lang="scss">
  :host {
    display: inline-block;
    flex-grow: 1;
    container-type: normal;
  }
  :host button {
    width: 100%;
  }

  .qoraButton {
    /**
     * These are not literally the foreground/background of the button, but
     * rather the base colors, which will be remixed to make generate the
     * button color palette.
     */
    --foreground: var(--qora-color-text-primary);
    --background: transparent;

    --primary-color: var(
      --qora-button-color,
      var(--qora-color-button-background)
    );
    --mixed-primary-color: var(--primary-color);
  }

  // Main styles and states
  .qoraButton,
  .qoraButton:visited:not(:hover) {
    // Gradients cannot have a transition, so we need to reset `transition`
    // to only apply to `box-shadow` and `border-color` in .isHero
    --default-transition:
      box-shadow 0.12s ease-in-out, color 0.12s ease-in-out,
      border-color 0.12s ease-in-out, opacity 0.12s ease-in-out;
    --box-shadow-hover: var(--qora-effect-elevation-01);
    --box-shadow-focus: var(--qora-effect-focus-state);
    --radius: var(--qora-radius-full);
    --border-color: transparent;
    --border-width: 0px;
    --qora-icon-color: var(--icon-color);
    --qora-progressring-size: var(--qora-icon-size);
    --qora-progressring-color: var(--icon-color);

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    transition:
      background 0.12s ease-in-out,
      var(--default-transition);
    box-shadow: none;
    border: solid var(--border-width, 1px) var(--border-color, transparent);
    border-radius: var(--qora-button-radius, var(--radius));
    background: var(--bg);
    color: var(--color);
    text-decoration: none;
    padding: var(
      --qora-button-padding,
      calc(var(--padding-y) - var(--border-width)) var(--padding-x)
    );
    max-height: max-content;

    &.fab {
      max-width: max-content;
    }

    .content {
      padding: 0 var(--icon-gap);
    }

    /*
     * Should only be necessary for Tailwind consumers where there's
     * no guarantee that the button will contain a child element.
     */
    &:not(:has(> *)) {
      padding-left: var(
        --qora-button-padding,
        calc(var(--padding-x) + var(--icon-gap))
      );
      padding-right: var(
        --qora-button-padding,
        calc(var(--padding-x) + var(--icon-gap))
      );
    }
  }

  .qoraButton:not(:disabled) {
    &:hover,
    [data-is-button-target]:hover :host .qoraButton,
    [data-is-button-target]:hover .qoraButton {
      --qora-icon-color: var(--icon-hover-color, var(--icon-color));
      --mixed-primary-color: var(--qora-color-primary-70);

      /** If we support the color-mix syntax, infer the hover color */
      @supports (color: color-mix(in srgb, transparent, transparent)) {
        --mixed-primary-color: color-mix(
          in srgb,
          var(--primary-color),
          var(--foreground) 20%
        );
      }

      background: var(--bg-hover, var(--bg));
      color: var(--color-hover, var(--mixed-primary-color));
      box-shadow: var(--box-shadow-hover);
      border-color: var(--border-color-hover, var(--border-color));
    }

    &:active {
      opacity: 0.75;
      background: var(--bg-active, var(--bg));
      color: var(--color-active, var(--color-hover, var(--color)));
    }

    &:focus-visible {
      outline: none;
      color: var(--color-focus, var(--color));
      box-shadow: var(--box-shadow-focus);
      background: var(--bg-focus, var(--bg));
    }
  }

  // State Definitions
  .qoraButton.isLoading {
    opacity: 0.75;
    background: var(--bg-loading, var(--bg));
    color: var(--color-loading, var(--color));
  }
  :host:disabled .qoraButton,
  .qoraButton:disabled {
    cursor: auto;
  }
  :host:disabled .qoraButton:not(.isLoading),
  .qoraButton:disabled:not(.isLoading) {
    --icon-color: var(--qora-color-icon-disabled);
    background: var(--bg-disabled, var(--bg));
    color: var(--qora-color-text-disabled);
    border-color: var(--qora-color-button-disabled);
  }

  // Size Variations
  .qoraButton.isTiny {
    font: var(--qora-font-components-button-small);
    min-height: 28px;
    --padding-y: var(--qora-spacing-s);
    --padding-x: var(--qora-spacing-m);
    --qora-icon-size: var(--qora-icon-xs);
    --icon-gap: var(--qora-spacing-s);

    &.fab {
      min-height: 0;
      --padding-x: 6px;
      --padding-y: 6px;
    }
  }
  .qoraButton.isSmall {
    font: var(--qora-font-components-button-small);
    min-height: 36px;
    --padding-y: var(--qora-spacing-m);
    --padding-x: var(--qora-spacing-l);
    --qora-icon-size: var(--qora-icon-s);
    --icon-gap: var(--qora-spacing-s);

    &.fab {
      min-height: 0;
      --padding-x: var(--qora-spacing-m);
    }
  }
  .qoraButton.isMedium {
    font: var(--qora-font-components-button-default);
    min-height: 44px;
    --padding-y: var(--qora-spacing-l);
    --padding-x: var(--qora-spacing-l);
    --qora-icon-size: var(--qora-icon-m);
    --icon-gap: var(--qora-spacing-s);

    &.fab {
      min-height: 0;
      --padding-x: var(--qora-spacing-l);
      --padding-y: var(--qora-spacing-l);
    }
  }
  .qoraButton.isLarge {
    font: var(--qora-font-components-button-large);
    min-height: 52px;
    --padding-y: var(--qora-spacing-l);
    --padding-x: var(--qora-spacing-xl);
    --qora-icon-size: var(--qora-icon-l);
    --icon-gap: var(--qora-spacing-s);

    &.fab {
      min-height: 0;
      --padding-x: var(--qora-spacing-xl);
      --padding-y: var(--qora-spacing-xl);
    }
  }
  .qoraButton.isJumbo {
    font: var(--qora-font-components-button-jumbo);
    min-height: 60px;
    --padding-y: var(--qora-spacing-xl);
    --padding-x: var(--qora-spacing-xl);
    --qora-icon-size: 28px;
    --icon-gap: var(--qora-spacing-m);

    &.fab {
      min-height: 0;
      --padding-x: 18px;
      --padding-y: 18px;
    }
  }

  // Kind Variations
  .qoraButton.isOutline,
  .qoraButton.isPlain {
    --bg-hover-mix: 10%;
  }

  .qoraButton.isFilled {
    --bg: var(--mixed-primary-color);
    --bg-disabled: var(--qora-color-button-disabled);
    --color: var(--qora-color-schemes-on-primary);
    --color-hover: var(--qora-color-schemes-on-primary);
    --box-shadow-focus: var(--qora-effect-focus-state-offset);
    --icon-color: var(--color);

    @container style(--qora-button-color) {
      --color: white;
      --color-hover: white;
    }
  }

  .qoraButton.isOutline {
    --bg: transparent;
    --bg-active: --qora-color-neutral-20;
    --color: var(--qora-color-text-interactive);
    --border-width: 1px;
    --border-color: var(--qora-color-divider-interactive);
    --border-color-hover: var(--qora-color-primitive-primary-70);
    --bg-hover: var(--qora-color-neutral-20);

    @container style(--qora-button-color) {
      --color: var(--mixed-primary-color);
    }

    @theme (dark) {
      --border-color-hover: var(--qora-color-primitive-primary-35);
      --bg-hover: var(--qora-color-neutral-30);
    }

    /** If we support color mix, infer border colors from primary color */
    @supports (color: color-mix(in srgb, transparent, transparent)) {
      --border-color: color-mix(
        in srgb,
        var(--primary-color),
        var(--background) 30%
      );
      --border-color-hover: color-mix(
        in srgb,
        var(--mixed-primary-color),
        var(--background) 20%
      );
      --bg-hover: color-mix(
        in srgb,
        var(--primary-color) var(--bg-hover-mix),
        var(--background)
      );
    }
  }
  .qoraButton.isPlain {
    --color: var(--qora-color-text-interactive);
    --box-shadow-hover: none;
    --bg-mix: 5%;

    @container style(--qora-button-color) {
      --color: var(--mixed-primary-color);
    }

    @supports (color: color-mix(in srgb, transparent, transparent)) {
      --bg: color-mix(
        in srgb,
        var(--primary-color) var(--bg-mix),
        var(--background)
      );
      --bg-hover: color-mix(
        in srgb,
        var(--primary-color) var(--bg-hover-mix),
        var(--background)
      );
    }

    &:disabled:not(.isLoading) {
      --color: var(--qora-color-text-primary);
    }
  }
  .qoraButton.isPlainFaint {
    --foreground: black;
    --primary-color: var(--qora-button-color, currentColor);
    --color: var(--mixed-primary-color);
    --box-shadow-hover: none;
    --icon-color: var(--mixed-primary-color);
    --bg-hover-mix: 5%;

    @theme (dark) {
      --foreground: white;
      --bg-hover-mix: 10%;
    }

    @supports (color: color-mix(in srgb, transparent, transparent)) {
      --icon-color: color-mix(
        in srgb,
        var(--primary-color),
        var(--background) 0%
      );

      --icon-hover-color: color-mix(
        in srgb,
        var(--icon-color),
        var(--foreground) 20%
      );

      position: relative;
      z-index: 0;

      // This pseudo-element is frustratingly necessary due to transitions mysteriously not working with our use of currentColor.
      &::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        border-radius: var(--radius);
        background-color: color-mix(
          in srgb,
          var(--primary-color) var(--bg-hover-mix),
          transparent
        );
        transition: var(--default-transition);
        opacity: 0.001;
      }

      &:hover::before {
        opacity: 1;
      }
    }

    &.fab {
      --bg-hover: transparent;
      --padding-y: 0;
      --padding-x: 0;

      &::before {
        content: unset;
      }
    }
  }
  .qoraButton.isHero {
    transition: var(--default-transition);
    --bg: transparent;
    --bg-focus: var(--bg);
    --bg-disabled: var(--qora-color-button-disabled);
    --color: white;
    --color-hover: white;
    --box-shadow-focus: var(--qora-effect-focus-state-offset);
    --icon-color: white;
    --default-bg-opacity: 1;

    position: relative;
    z-index: 0;

    &:not(:disabled:not(.isLoading)) {
      &::before,
      &::after {
        content: '';
        pointer-events: none;
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: var(--qora-button-radius, var(--radius));
      }

      &::before {
        transition: var(--default-transition);
        z-index: -1;
        background: var(--qora-gradient-hero);
        opacity: var(--default-bg-opacity);
      }

      &::after {
        z-index: -2;
        background:
          linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
          linear-gradient(174deg, #f50 2.32%, #f5002d 93.33%);
      }
    }

    &:hover:not(:disabled) {
      --default-bg-opacity: 0;
    }
  }

  .qoraButton.fab {
    aspect-ratio: 1 / 1;
  }
</style>
