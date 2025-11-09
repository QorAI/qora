<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements'

  type Href = $$Generic<string | undefined>
  type ExcludedProps = 'class' | 'aria-disabled' | 'href' | 'hreflang'

  interface CommonNalaLinkProps {
    isDisabled?: boolean
  }

  type ButtonProps = CommonNalaLinkProps &
    Omit<Partial<SvelteHTMLElements['button']>, ExcludedProps> & {
      href?: never
      onClick?: (e: MouseEvent) => void
    }

  type AnchorProps = CommonNalaLinkProps &
    Omit<Partial<SvelteHTMLElements['a']>, ExcludedProps> & {
      href: Href
      onClick?: never
    }

  type $$Props = AnchorProps | ButtonProps

  export let href: Href = undefined
  export let isDisabled: boolean = false
  export let onClick: (e: MouseEvent) => void = undefined

  $: tag = href ? 'a' : ('button' as 'a' | 'button')
  $: disabled = !!(isDisabled || (isDisabled as any) === '')
</script>

<svelte:element
  this={tag}
  {...$$restProps}
  rel={href && 'noopener'}
  href={href || undefined}
  class="qoraLink"
  class:disabled
  aria-disabled={disabled || undefined}
  on:click={onClick ||
    ((e) => {
      if (disabled) e.preventDefault()
    })}
  disabled={disabled || undefined}
>
  <slot />
</svelte:element>

<style lang="scss">
  button:where(.qoraLink) {
    all: unset;
  }

  a,
  .qoraLink {
    --color: var(--qora-link-color, var(--qora-color-text-interactive));
    --hover-color: var(--qora-link-hover-color, var(--qora-color-primary-60));
    --visited-color: var(--qora-link-visited-color, var(--qora-color-pink-50));
    --disabled-color: var(
      --qora-link-disabled-color,
      var(--qora-color-text-disabled)
    );
    --focus-color: var(--qora-link-focus-color, var(--color));
    --focus-shadow: var(--qora-link-focus-shadow, var(--qora-effect-focus-state));

    color: var(--color);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    text-decoration: underline;

    &:where(:hover) {
      color: var(--hover-color);
    }

    &:where(:visited:not(:hover)) {
      color: var(--visited-color);
    }

    &:where(:focus-visible:not(.disabled)) {
      color: var(--focus-color);
      outline: none;
      box-shadow: var(--focus-shadow);
      border-radius: var(--qora-radius-xs);
    }

    &:where(.disabled) {
      color: var(--disabled-color);
      pointer-events: none;
    }
  }
</style>
