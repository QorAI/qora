<script context="module" lang="ts">
  export const colors = [
    'neutral',
    'secondary',
    'primary',
    'red',
    'yellow',
    'green',
    'blue',
    'purple',
    'pink',
    'teal'
  ] as const
  export type Color = (typeof colors)[number]

  export const modes = ['default', 'loud', 'outline'] as const
  export type Mode = (typeof modes)[number]
</script>

<script lang="ts">
  export let mode: Mode = 'default'
  export let color: Color = 'neutral'

  $: background =
    mode === 'default'
      ? `var(--qora-color-${color}-10)`
      : mode === 'loud'
        ? `var(--qora-color-${color}-40)`
        : 'transparent'

  $: text =
    mode === 'default'
      ? `var(--qora-color-${color}-60)`
      : mode === 'loud'
        ? `var(--qora-color-white)`
        : `var(--qora-color-${color}-50)`

  $: border = mode === 'outline' ? `var(--qora-color-${color}-50)` : `transparent`
</script>

<div
  class="qora-label"
  style:background
  style:color={text}
  style:border="1px solid {border}"
>
  <slot name="icon-before" />
  <div class="content">
    <slot>Label</slot>
  </div>
  <slot name="icon-after" />
</div>

<style lang="scss">
  :host {
    display: inline-block;
  }

  .qora-label {
    --icon-size: var(--qora-label-icon-size, 14px);
    --font-text: var(--qora-label-font-text, var(--qora-font-components-label));
    --padding: var(--qora-label-padding, 0 var(--qora-spacing-s));
    --radius: var(--qora-label-radius, 6px);

    --qora-icon-size: var(--icon-size);

    display: inline-flex;
    flex-direction: row;
    gap: var(--qora-spacing-xs);
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    border-radius: var(--radius);
    padding: var(--padding);
    font: var(--font-text);
    height: var(--qora-icon-m);
    text-transform: var(--qora-label-capitalization, none);
  }

  .content {
    padding: 0 var(--qora-spacing-xs);
  }
</style>
