<script lang="ts">
  export let kind: 'vertical' | 'horizontal' = 'vertical'
</script>

<div class="qora-navigation kind-{kind}">
  {#if $$slots.header}
    <slot name="header" />
  {/if}

  <nav>
    <slot />
  </nav>

  {#if $$slots.actions}
    <slot name="actions" />
  {/if}

  <div class="active-indicator" />
</div>

<style lang="scss">
  :host, .qora-navigation {
    --anchor-padding: var(--qora-spacing-m);
    position: relative;
  }

  :global(qora-navigation::before), .active-indicator {
    @supports (anchor-name: --active-indicator) {
      position-anchor: --active-indicator;

      transition:
        top 0.12s ease-in-out,
        bottom 0.12s ease-in-out,
        left 0.12s ease-in;

      content: '';
      width: 4px;
      border-top-right-radius: var(--qora-radius-xs);
      border-bottom-right-radius: var(--qora-radius-xs);
      background: var(--qora-color-text-interactive);
      position: absolute;
      left: anchor(left);
      top: calc(anchor(top) + var(--anchor-padding));
      bottom: calc(anchor(bottom) + var(--anchor-padding));
      z-index: 1;
    }
  }

  // Fallback active indicator for when the browser doesn't support anchor positioning
  @supports (not (anchor-name: --active-indicator)) {
    :global(qora-navigation [data-selected=true]::before), .qora-navigation [data-selected=true]::before {
      content: '';
      width: 4px;
      height: calc(100% - var(--anchor-padding) * 2);
      border-top-right-radius: var(--qora-radius-xs);
      border-bottom-right-radius: var(--qora-radius-xs);
      background: var(--qora-color-text-interactive);
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
    }
  }

  .qora-navigation {
    --nav-direction: row;
    --qora-icon-size: var(--qora-icon-s);

    display: flex;
    flex-direction: var(--nav-direction);
    height: 100%;

    &.kind-vertical {
      --nav-direction: column;
    }
  }
</style>
