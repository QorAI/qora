<script lang="ts">
  import { onMount } from 'svelte'
  import type { TabSize } from './props'

  export let value: string | undefined = undefined
  export let size: TabSize = 'large'

  export let onChange: (detail: { value: string | undefined }) => void =
    undefined

  let tabsContainer: HTMLDivElement

  let underlineWidth: number
  let underlinePosition: number

  function getValue(e: Element) {
    // If the tab element doesn't have a value, fallback to using the text
    // content - this allows writing simplified tabs:
    // i.e. <TabItem>Home</TabItem>
    return e.getAttribute('value') ?? e['value'] ?? e.textContent
  }

  $: tabItems = Array.from(
    (tabsContainer?.querySelector('slot') as HTMLSlotElement)
      ?.assignedElements()
      ?.filter((element) => element.tagName === 'LEO-TABITEM') ??
      tabsContainer?.querySelectorAll('.qora-tab-item') ??
      []
  ) as HTMLElement[]

  function setUnderline(item: HTMLElement) {
    underlineWidth = item.getBoundingClientRect().width
    underlinePosition = item.offsetLeft
  }

  const itemResizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      setUnderline(entry.target as HTMLElement)
    }
  })

  $: {
    for (const tabItem of tabItems) {
      tabItem.setAttribute('role', 'tab')

      if (value === getValue(tabItem)) {
        tabItem.setAttribute('aria-selected', 'true')
        itemResizeObserver.observe(tabItem)
      } else {
        tabItem.setAttribute('aria-selected', 'false')
        itemResizeObserver.unobserve(tabItem)
      }
    }
  }

  function selectItem(e: Event) {
    // Find the tab which was clicked on, if any.
    const item = tabItems.find((item) => e.composedPath().includes(item))

    // If the event was triggered for something which isn't a tab don't fire
    // a change event.
    if (!item) return

    value = getValue(item)

    onChange?.({ value })
  }

  let underline: HTMLDivElement

  onMount(() => {
    underline.addEventListener('transitionstart', () => {
      tabsContainer.classList.add('transitioning')
    })

    underline.addEventListener('transitionend', () => {
      tabsContainer.classList.remove('transitioning')
    })
  })
</script>

<div
  bind:this={tabsContainer}
  class="qora-tabs size-{size}"
  role="tablist"
  tabindex="-1"
  on:keypress={(e) => {
    if (e.code !== 'Enter' && e.code !== 'Space') return
    selectItem(e)
  }}
  on:click={selectItem}
>
  <div
    class="underline"
    style:width={`${underlineWidth}px`}
    style:left={`${underlinePosition}px`}
    bind:this={underline}
  />
  <slot />
</div>

<style lang="scss">
  :host {
    display: flex;
    position: relative;
    width: var(--qora-tabs-width, 100%);

    & .qora-tabs {
        width: 100%;
    }
  }

  .qora-tabs {
    --qora-icon-size: var(--qora-icon-size-m);
    --indicator-color: var(--qora-color-text-interactive);
    --indicator-height: 4px;

    --qora-tab-item-padding: 20px var(--qora-spacing-l);
    --qora-tab-item-icon-gap: var(--qora-spacing-m);
    --qora-tab-item-font: var(--qora-font-components-button-large);

    display: flex;
    position: relative;
    border-bottom: 1px solid var(--qora-color-divider-subtle);

    &.size-medium {
      --indicator-height: 3px;
      --qora-tab-item-padding: var(--qora-spacing-xl) var(--qora-spacing-l);
      --qora-tab-item-font: var(--qora-font-components-button-default);
    }

    &.size-small {
      --qora-icon-size: var(--qora-icon-size-s);
      --indicator-height: 3px;
      --qora-tab-item-padding: var(--qora-spacing-l) var(--qora-spacing-m);
      --qora-tab-item-font: var(--qora-font-components-button-small);
    }

    .underline {
      position: absolute;
      bottom: 0;
      height: var(--indicator-height);
      background-color: var(--indicator-color);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 3px 3px 0 0;
    }

    :where(&) > :global(.qora-tab-item),
    :where(&) > :global(::slotted(qora-tabitem)) {
      --qora-tab-item-icon-color: var(--qora-color-icon-default);
      --qora-tab-item-color: var(--qora-color-text-secondary);
      --qora-tab-item-background: transparent;
    }

    :where(&:not(.transitioning)) > :global(.qora-tab-item:hover),
    :where(&:not(.transitioning)) > :global(::slotted(qora-tabitem:hover)) {
      --qora-tab-item-color: var(--qora-color-text-interactive);
      --qora-tab-item-icon-color: var(--qora-color-icon-interactive);
    }

    :where(&) > :global(.qora-tab-item:focus-visible),
    :where(&) > :global(::slotted(qora-tabitem:focus-visible)) {
      --qora-tab-item-shadow: var(--qora-effect-focus-state);
    }

    :where(&) > :global(.qora-tab-item[aria-selected="true"]),
    :where(&) > :global(::slotted(qora-tabitem[aria-selected="true"])) {
      --qora-tab-item-color: var(--qora-color-text-interactive);
      --qora-tab-item-icon-color: var(--qora-color-icon-interactive);
    }

    :where(&) > :global(.qora-tab-item[aria-selected="true"]:hover),
    :where(&) > :global(::slotted(qora-tabitem[aria-selected="true"]:hover)) {
      --qora-tab-item-color: var(--qora-color-blurple-60);
      --qora-tab-item-icon-color: var(--qora-color-blurple-60);
    }
  }
</style>