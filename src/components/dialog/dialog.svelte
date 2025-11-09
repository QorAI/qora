<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements'
  import { scale } from 'svelte/transition'
  import Button from '../button/button.svelte'
  import Icon from '../icon/icon.svelte'

  type $$Props = Omit<Partial<SvelteHTMLElements['dialog']>, 'open'> & {
    isOpen?: boolean
    modal?: boolean
    showClose?: boolean
    showBack?: boolean
    escapeCloses?: boolean
    backdropClickCloses?: boolean
    animate?: boolean
    onClose?: () => void
    onBack?: () => void
  }

  export let isOpen = false
  export let modal = true
  export let showClose = false
  export let showBack = false
  export let escapeCloses = true
  export let backdropClickCloses = true
  export let animate = true

  export let onClose: () => void = undefined
  export let onBack: () => void = undefined

  let dialog: HTMLDialogElement

  $: {
    if (isOpen && !dialog?.open && dialog?.isConnected) dialog?.showModal()
  }

  const hasHeader = showBack || $$slots.title || $$slots.subtitle

  const close = () => {
    isOpen = false
    onClose?.()
  }
</script>

{#if isOpen}
  <dialog
    transition:scale={{ duration: animate ? 60 : 0, start: 0.8 }}
    {...$$restProps}
    class="qora-dialog"
    class:modal
    class:hasHeader
    class:hasActions={$$slots.actions}
    bind:this={dialog}
    on:close={close}
    on:cancel={(e) => {
      // We handle the modal being opened by adding/removing from the DOM - this
      // let's the animations work properly.
      e.preventDefault()

      if (escapeCloses) close()
    }}
  >
    {#if showClose}
      <div class="close-button">
        <Button kind="plain-faint" fab onClick={close}>
          <Icon name="close" />
        </Button>
      </div>
    {/if}
    {#if hasHeader}
      <header>
        {#if showBack || $$slots.title}
          <div class="title-row">
            {#if showBack}
              <div class="back-button">
                <Button kind="plain-faint" fab onClick={onBack}>
                  <Icon name="arrow-left" />
                </Button>
              </div>
            {/if}
            <div class="title">
              <slot name="title" />
            </div>
          </div>
        {/if}
        {#if $$slots.subtitle}
          <div class="subtitle">
            <slot name="subtitle" />
          </div>
        {/if}
      </header>
    {/if}
    <div class="body">
      <slot />
    </div>
    {#if $$slots.actions}
      <div class="actions">
        <slot name="actions" />
      </div>
    {/if}
  </dialog>
{/if}

<svelte:window
  on:click|capture={(e) => {
    if (!dialog || !isOpen || !backdropClickCloses || !dialog.checkVisibility()) return

    const rect = dialog.getBoundingClientRect()
    const clickedOutside =
      e.clientX < rect.x ||
      e.clientY < rect.y ||
      e.clientX > rect.x + rect.width ||
      e.clientY > rect.y + rect.height
    if (clickedOutside) {
      close()
    }
  }}
/>

<style lang="scss">
  .qora-dialog {
    --padding: var(--qora-dialog-padding, var(--qora-spacing-2xl));
    --border-radius: var(--qora-dialog-border-radius, var(--qora-radius-xl));
    --background: var(
      --qora-dialog-background,
      var(--qora-color-container-background)
    );
    --color: var(--qora-dialog-color, var(--qora-color-text-primary));

    --backdrop-background: var(
      --qora-dialog-backdrop-background,
      rgba(0, 0, 0, 0.1)
    );
    --backdrop-filter: var(--qora-dialog-backdrop-filter);

    position: fixed;
    margin: auto;
    border: none;
    display: grid;
    align-content: start;

    width: calc(100% - var(--qora-spacing-m) * 2);
    max-width: var(--qora-dialog-width, 374px);

    border-radius: var(--border-radius);
    outline: none;

    color: var(--color);

    padding: 0;
    background: transparent;
    box-shadow: var(--qora-effect-elevation-05);

    &::backdrop {
      background: var(--backdrop-background);
      backdrop-filter: var(--backdrop-filter);
    }
  }

  .qora-dialog.hasHeader {
    grid-template-rows: auto auto;
  }

  /** Since Svelte 4 doesn't support conditional slots in the consumer,
   * we only want to account for actions if there's actually content in the slot
   * however for webcomponents, we don't need to check for this, so we special
   * case the selector with :host. */
  :host .qora-dialog.hasActions,
  .qora-dialog.hasActions:has([slot='actions']:not(:empty)) {
    grid-template-rows: auto auto;
  }

  :host .qora-dialog.hasHeader.hasActions,
  .qora-dialog.hasHeader.hasActions:has(.actions [slot='actions']:not(:empty)) {
    grid-template-rows: auto auto auto;
  }

  .qora-dialog:not(.modal) {
    box-shadow: var(--qora-effect-elevation-04);
    border: 1px solid var(--qora-color-divider-subtle);
    &::backdrop {
      display: none;
    }
  }

  .qora-dialog header {
    background: var(--background);
    padding: var(--padding);
    position: sticky;
    top: 0;
    z-index: 1;

    border-bottom: 1px solid transparent;

    @supports (animation-timeline: scroll()) {
      animation-timeline: scroll();
      animation-range: 0px var(--qora-spacing-6xl);
      animation-name: header-scroll-border;
      animation-duration: 1ms;
      animation-fill-mode: forwards;
    }
  }

  @keyframes header-scroll-border {
    from {
      border-bottom-color: transparent;
    }
    to {
      border-bottom-color: var(--qora-color-divider-subtle);
    }
  }

  .qora-dialog .title {
    font: var(--qora-font-heading-h2);
  }

  .qora-dialog .close-button {
    position: absolute;
    inset-inline-end: var(--qora-spacing-xl);
    top: var(--qora-spacing-xl);
  }

  .qora-dialog {
    .close-button,
    .back-button {
      --qora-button-padding: var(--qora-spacing-s);

      flex: 0;
      z-index: 2;
    }
  }

  .qora-dialog .subtitle {
    font: var(--qora-font-heading-h4);
  }

  .qora-dialog .body {
    background: var(--background);
    color: var(--qora-color-text-secondary);
    font: var(--qora-font-default-regular);
    padding: var(--padding);
  }

  .qora-dialog.hasHeader .body {
    padding-top: 0;
  }

  :host .qora-dialog .actions .body,
  .qora-dialog.hasActions:has([slot='actions']:not(:empty)) .body {
    padding-bottom: 0;
  }

  :host .qora-dialog .actions,
  .qora-dialog .actions:has([slot='actions']:not(:empty)) {
    background: var(--background);
    padding: var(--padding);
  }

  /** The below :global selectors are so that Svelte doesn't remove the classes
    * at compile time (as the slotted content is put in via the parent).
    * Note: We have to handle the case where we're in a web component (via the
    * ::slotted selector) and the case where we're in a Svelte component (via
    * the [slot='actions'] selector).
    *
    * The :global selector doesn't seem to be able to handle nesting, so we have
    * two separate selectors for mobile & non-mobile layouts */
  :global(.qora-dialog .actions ::slotted(*)),
  :global(.qora-dialog .actions [slot='actions']:not(:empty)) {
    display: flex;
    gap: var(--qora-spacing-xl);
    flex-direction: column;
    align-items: stretch;
    justify-content: end;
  }

  @media (orientation: portrait) {
    :global(.qora-dialog .actions ::slotted(*)),
    :global(.qora-dialog .actions div[slot='actions']) {
      flex-direction: column;
      align-items: stretch;
    }
  }

  .qora-dialog .title-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: stretch;
    gap: var(--qora-spacing-l);
  }

  @media (min-width: 480px) and (min-height: 480px) {
    .qora-dialog {
      --padding: var(--qora-dialog-padding, var(--qora-spacing-4xl));
      max-width: var(--qora-dialog-width, 500px);
    }

    :global(.qora-dialog .actions ::slotted(*)),
    :global(.qora-dialog [slot='actions']:not(:empty)) {
      flex-direction: row;
      align-items: center;
      justify-content: end;
    }
  }

  @media (orientation: landscape) {
    .qora-dialog {
      max-width: var(--qora-dialog-width, 520px);
    }
  }
</style>
