<script lang="ts">
  import Icon from '../icon/icon.svelte'

  export let title = ''

  // We have a separate external and internal isOpen flag because if the parent
  // doesn't pass anything in we want to be able to toggle open & closed
  // normally. However, if they didn't pass anything in, we just emit an event
  // and let the parent handle toggling the flag.
  export let isOpen: boolean | undefined
  export let onToggle: (detail: { open: boolean }) => void = undefined
  $: isOpenInternal = isOpen ?? false

  const toggle = (e: Event) => {
    e.preventDefault()

    // We only support toggling if this component isn't being 'controlled'
    const toggleTo = !isOpenInternal
    if (isOpen === undefined) isOpenInternal = toggleTo
    onToggle?.({ open: toggleTo })
  }
</script>

<details class="qoraCollapse" open={isOpenInternal}>
  <summary on:click={toggle}>
    {#if $$slots.icon}
      <div class="icon">
        <slot name="icon" />
      </div>
    {/if}
    <div class="title">
      <slot name="title">
        {title}
      </slot>
    </div>
    <div class="arrow">
      <Icon name="carat-down" />
    </div>
  </summary>
  <div class="content">
    <slot />
  </div>
</details>

<style lang="scss">
  :host {
    display: block;
  }

  .qoraCollapse {
    --summary-padding: var(
      --qora-collapse-summary-padding,
      var(--qora-spacing-xl) 18px
    );
    --content-padding: var(
      --qora-collapse-content-padding,
      var(--qora-spacing-m) var(--qora-spacing-2xl) var(--qora-spacing-2xl)
        var(--qora-spacing-2xl)
    );
    --background-color: var(
      --qora-collapse-background-color,
      var(--qora-color-container-background)
    );
    --background-color-hover: var(
      --qora-collapse-background-color-hover,
      var(--qora-color-container-interactive)
    );
    --icon-size: var(--qora-collapse-icon-size, 24px);
    --transition-duration: var(--qora-collapse-transition-duration, 0.12s);
    --border-color: var(
      --qora-collapse-border-color,
      var(--qora-color-divider-subtle)
    );
    --border-color-hover: var(
      --qora-collapse-border-color-hover,
      var(--qora-color-primary-20)
    );
    --shadow: var(--qora-collapse-shadow, var(--qora-effect-elevation-01));
    --shadow-hover: var(
      --qora-collapse-shadow-hover,
      var(--qora-effect-elevation-02)
    );
    --shadow-focus: var(
      --qora-collapse-shadow-focus,
      var(--qora-effect-focus-state)
    );
    --radius: var(--qora-collapse-radius, var(--qora-radius-xl));
    --summary-color: var(
      --qora-collapse-summary-color,
      var(--qora-color-text-primary)
    );
    --summary-color-hover: var(
      --qora-collapse-summary-color-hover,
      var(--qora-color-text-interactive)
    );
    --icon-color: var(--qora-collapse-icon-color, var(--qora-color-icon-default));
    --icon-color-hover: var(
      --qora-collapse-icon-color-hover,
      var(--summary-color-hover)
    );

    @media (prefers-reduced-motion) {
      --transition-duration: 0s;
    }

    background-color: var(--background-color);
    box-shadow: var(--shadow);
    border-radius: var(--radius);
    border: 1px solid var(--border-color);
    transition:
      box-shadow var(--transition-duration) ease-in-out,
      background-color var(--transition-duration) ease-in-out;

    &:has(summary:hover) {
      border-color: var(--border-color-hover);
    }

    &:hover {
      box-shadow: var(--shadow-hover);

      &:not([open]) {
        --background-color: var(--background-color-hover);
      }
    }

    &:focus-within:has(summary:focus-visible) {
      box-shadow: var(--shadow-focus);
    }

  summary {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--qora-spacing-m);

    padding: var(--summary-padding);

    list-style: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    color: var(--summary-color);
    transition: color var(--transition-duration) ease-in-out;

    &:hover {
      color: var(--summary-color-hover);

      & .icon,
      .arrow {
        color: var(--icon-color-hover);
      }
    }
  }

  .icon {
    transition: color var(--transition-duration) ease-in-out;
    color: var(--icon-color);
    width: var(--icon-size);
    height: var(--icon-size);
  }

  .title {
    flex-grow: 1;
    font: var(--qora-font-heading-h3);
  }

  .content {
    padding: var(--content-padding);
    font: var(--qora-font-default-regular);
  }

  .arrow {
    color: var(--icon-color);
    transition:
      transform var(--transition-duration) ease-in-out,
      color var(--transition-duration) ease-in-out;
    transform: rotate(360deg);
  }

  summary {
    outline: none;
  }

  details[open] .arrow {
    transform: rotate(180deg);
  }
}
</style>
