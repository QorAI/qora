<header class="qora-navigation-header">
  <slot name="logo" />
  <slot />
</header>

<style>
  .qora-navigation-header {
    display: flex;
    gap: var(--qora-spacing-m);
    align-items: center;
    justify-self: self-start;
    padding: var(--qora-navigation-header-padding, var(--qora-spacing-2xl)) 20px;
  }
</style>
