<script lang="ts">
  export let value: string | number
</script>

<button class="qora-tab-item" {value}>
  {#if $$slots['icon-before']}
    <div class="item-icon">
      <slot name="icon-before" />
    </div>
  {/if}
  <div class="content">
    <slot />
  </div>
  {#if $$slots['icon-after']}
    <div class="item-icon">
      <slot name="icon-after" />
    </div>
  {/if}
</button>

<style lang="scss">
  :host {
    display: flex;
    height: 100%;
    flex: 0 0 auto;
  }
  .qora-tab-item {
    all: unset;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    box-sizing: border-box;
    height: 100%;
    padding: var(--qora-tab-item-padding);
    cursor: pointer;
    color: var(--qora-tab-item-color);
    font: var(--qora-tab-item-font);
    background: var(--qora-tab-item-background);
    box-shadow: var(--qora-tab-item-shadow);
    position: relative;
    transition: color 0.2s ease-in-out;

    &,
    .item-icon {
      transition: background 0.12s ease-in-out, color 0.12s ease-in-out, box-shadow 0.12s ease-in-out;
    }

    .item-icon {
      color: var(--qora-tab-item-icon-color);
      width: var(--qora-icon-size);
      height: var(--qora-icon-size);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    & .content {
      display: flex;
      align-items: center;
      white-space: nowrap;
      gap: var(--qora-spacing-m);
    }
  }
</style>