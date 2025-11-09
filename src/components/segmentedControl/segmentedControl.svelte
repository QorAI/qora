<script lang="ts" context="module">
  export const segmentedControlSizes = ['default', 'small', 'tiny'] as const
  type Size = (typeof segmentedControlSizes)[number]
</script>

<script lang="ts">
  import { onMount } from 'svelte'

  export let value: string | undefined = undefined
  export let size: Size = 'default'

  export let onChange: (detail: { value: string | undefined }) => void =
    undefined

  let segmentedControl: HTMLDivElement

  let pillWidth: number
  let pillPosition: number

  function getValue(e: Element) {
    // If the option element doesn't have a value, fallback to using the text
    // content - this allows writing simplified options:
    // i.e. <o>1</o>
    return e.getAttribute('value') ?? e['value'] ?? e.textContent
  }

  $: controlItems = Array.from(
    (segmentedControl?.querySelector('slot') as HTMLSlotElement)
      ?.assignedElements()
      ?.filter((element) => element.tagName === 'LEO-SEGMENTEDCONTROLITEM') ??
      segmentedControl?.querySelectorAll('.qora-segmented-control-item') ??
      []
  ) as HTMLElement[]

  function setPill(item: HTMLElement) {
    pillWidth = item.getBoundingClientRect().width
    pillPosition = item.offsetLeft
  }

  const itemResizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      setPill(entry.target as HTMLElement)
    }
  })

  $: {
    for (const controlItem of controlItems) {
      controlItem.setAttribute('role', 'option')

      if (value === getValue(controlItem)) {
        controlItem.setAttribute('aria-selected', '')
        itemResizeObserver.observe(controlItem)
      } else {
        controlItem.removeAttribute('aria-selected')
        itemResizeObserver.unobserve(controlItem)
      }
    }
  }

  function selectItem(e: Event) {
    // Find the option which was clicked on, if any.
    const item = controlItems.find((item) => e.composedPath().includes(item))

    // If the event was triggered for something which isn't an option don't fire
    // a change event.
    if (!item) return

    value = getValue(item)

    onChange?.({ value })
  }

  let pill: HTMLDivElement

  onMount(() => {
    pill.addEventListener('transitionstart', () => {
      segmentedControl.classList.add('transitioning')
    })

    pill.addEventListener('transitionend', () => {
      segmentedControl.classList.remove('transitioning')
    })
  })
</script>

<div
  bind:this={segmentedControl}
  class="qora-segmented-control size-{size}"
  role="listbox"
  tabindex="-1"
  on:keypress={(e) => {
    if (e.code !== 'Enter' && e.code !== 'Space') return
    selectItem(e)
  }}
  on:click={selectItem}
>
  <div
    class="pill"
    style:width={`${pillWidth}px`}
    style:left={`${pillPosition}px`}
    bind:this={pill}
  />
  <slot />
</div>

<style lang="scss">
  :host {
    display: flex;
    position: relative;
    width: var(--qora-segmented-control-width, fit-content);

    & .qora-segmented-control {
        width: 100%;
    }
  }

  .qora-segmented-control {
    --qora-icon-size: var(--qora-icon-m);
    --bg: var(--qora-color-neutral-10);
    --control-padding: var(--qora-control-padding, var(--qora-spacing-s));
    --gap: var(--qora-spacing-s);
    --control-height: 44px;
    --radius: var(--qora-radius-full);

    --qora-segmented-control-item-padding: var(--qora-spacing-l);
    --qora-segmented-control-item-icon-gap: var(--qora-spacing-m);
    --qora-segmented-control-item-font: var(--qora-font-components-button-default);

    display: flex;
    min-width: max-content;
    width: var(--qora-segmented-control-width, fit-content);
    align-items: center;
    position: relative;
    box-sizing: border-box;

    background: var(--qora-segmented-control-bg, var(--bg));
    padding: var(--control-padding);
    gap: var(--qora-segmented-control-gap, var(--gap));
    height: var(--qora-segmented-control-height, var(--control-height));
    border-radius: var(--qora-segmented-control-radius, var(--radius));

    &.size-small {
      --qora-icon-size: var(--qora-icon-s);
      --control-height: 36px;
      --qora-segmented-control-item-padding: var(--qora-spacing-m);
      --qora-segmented-control-item-font: var(--qora-font-components-button-small);
    }

    &.size-tiny {
      --qora-icon-size: var(--qora-icon-xs);
      --control-padding: var(--qora-control-padding, var(--qora-spacing-xs));
      --gap: var(--qora-spacing-xs);
      --control-height: 28px;
      --qora-segmented-control-item-padding: var(--qora-spacing-m);
      --qora-segmented-control-item-font: var(--qora-font-components-button-small);
    }

    .pill {
      background: var(--qora-color-container-background);
      position: absolute;
      height: calc(100% - (var(--control-padding) * 2));
      min-width: var(--control-height);
      border-radius: calc(var(--radius) - var(--control-padding));
      box-shadow: var(--qora-effect-elevation-01);
      transition:
        width 0.2s cubic-bezier(0.22, 1, 0.36, 1),
        left 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    :where(&) > :global(.qora-segmented-control-item),
    :where(&) > :global(::slotted(qora-segmented-controlitem)) {
      --qora-segmented-control-item-icon-color: var(--qora-color-icon-default);
      --qora-segmented-control-item-color: var(--qora-color-text-secondary);
      --qora-segmented-control-item-background: transparent;
      --qora-segmented-control-item-radius: calc(var(--radius) - var(--control-padding));
    }

    :where(&:not(.transitioning)) > :global(.qora-segmented-control-item:hover),
    :where(&:not(.transitioning)) > :global(::slotted(qora-segmented-controlitem:hover)) {
      --qora-segmented-control-item-background: var(--qora-color-container-highlight);
      --qora-segmented-control-item-color: var(--qora-color-text-primary);
    }

    :where(&) > :global(.qora-segmented-control-item:focus-visible),
    :where(&) > :global(::slotted(qora-segmented-controlitem:focus-visible)) {
      --qora-segmented-control-item-shadow: var(--qora-effect-focus-state);
    }

    :where(&) > :global(.qora-segmented-control-item[aria-selected]),
    :where(&) > :global(::slotted(qora-segmented-controlitem[aria-selected])) {
      --qora-segmented-control-item-color: var(--qora-color-text-interactive);
      --qora-icon-color: var(--qora-color-icon-interactive);
    }

    :where(&.transitioning) > :global(.qora-segmented-control-item[aria-selected]),
    :where(&.transitioning) > :global(::slotted(qora-segmented-controlitem[aria-selected])),
    :where(&) > :global(.qora-segmented-control-item[aria-selected]:hover),
    :where(&) > :global(::slotted(qora-segmented-controlitem[aria-selected]:hover)) {
      --qora-segmented-control-item-icon-color: currentColor;
      --qora-segmented-control-item-background: var(--qora-color-container-background);
    }
  }
</style>
