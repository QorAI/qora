<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements'

  type $$Props = SvelteHTMLElements['ul']

  let isSubnav = $$props.slot === 'subnav'
</script>

<ul class:isSubnav hidden={$$props.hidden ? true : undefined}>
  <slot />
</ul>

<style>
  ul {
    display: flex;
    flex-direction: var(--nav-direction);
    gap: var(--qora-spacing-m);
    margin: 0;
    padding: var(--qora-spacing-2xl) 0;
    list-style: none;
  }

  ul.isSubnav,
  :host([slot='subnav']) ul {
    padding: var(--qora-spacing-m) 0 0;
    margin-left: 33px;
    border-left: 1px solid var(--qora-color-divider-subtle);
  }

  [hidden] {
    display: none !important;
  }
</style>
