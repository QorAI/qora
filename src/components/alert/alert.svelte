<script lang="ts" context="module">
  import type { IconName } from '@QorAI/qora/icons/meta'

  export const types = ['info', 'warning', 'error', 'success', 'notice'] as const
  export type AlertType = (typeof types)[number]

  const defaultIcons: { [P in AlertType]: IconName } = {
    'info': 'info-filled',
    'error': 'warning-circle-filled',
    'warning': 'warning-triangle-filled',
    'success': 'check-circle-filled',
    'notice': 'info-outline'
  }
</script>

<script lang="ts">
  import Icon from '../icon/icon.svelte'

  export let type: AlertType = 'error'
  export let isToast = false
  export let hideIcon = false

  // TODO: Remove when only supporting svelte >5 which can render slotted content conditionally
  export let hasActions = $$slots.actions
  export let hasContentAfter = $$slots['content-after']

  $: currentType = type ?? 'error'
</script>

<div
  class="qora-alert {currentType}"
  class:toast={isToast}
>
  {#if !hideIcon}
  <div class="icon">
    <slot name="icon">
      <Icon name={defaultIcons[currentType]} />
    </slot>
  </div>
  {/if}
  <div class="content">
    {#if $$slots.title}
      <div class="title">
        <slot name="title" />
      </div>
    {/if}
    <slot />
  </div>
  {#if hasContentAfter && $$slots['content-after']}
    <div class="content-after">
      <slot name="content-after" />
    </div>
  {/if}
  {#if hasActions && $$slots.actions}
    <div class="actions">
      <slot name="actions" />
    </div>
  {/if}
</div>

<style lang="scss">
  :host {
    display: block;
  }

  :global(.qora-alert .actions > *),
  .qora-alert .actions ::slotted(*) {
    display: flex;
    flex-direction: row;
    gap: var(--qora-spacing-m);
  }
  .qora-alert {
    --qora-icon-color: var(--qora-alert-icon-color, var(--default-icon-color));
    background-color: var(
      --qora-alert-background-color,
      var(--default-background)
    );
    color: var(--default-text-color, var(--qora-color-text-primary));
    padding: var(--qora-alert-padding, var(--qora-spacing-xl));
    border-radius: var(--qora-radius-l);
    border: var(--qora-alert-border-width, var(--default-border-width)) solid
      var(--qora-alert-border-color, var(--default-border-color));
    gap: var(--qora-spacing-xl) 0;
    font: var(--qora-font-default-regular);

    display: grid;
    grid-template-columns: min-content 1fr;

    &.notice {
      --default-background: transparent;
      --default-icon-color: var(--qora-color-text-tertiary);
      --default-text-color: var(--qora-alert-text-color, var(--qora-color-text-tertiary));
      --default-border-width: 1px;
      --default-border-color: var(--qora-color-divider-subtle);
    }
    &.success {
      --default-background: var(--qora-color-systemfeedback-success-background);
      --default-icon-color: var(--qora-color-systemfeedback-success-icon);
      --default-text-color: var(--qora-color-systemfeedback-success-text);
    }
    &.info {
      --default-background: var(--qora-color-systemfeedback-info-background);
      --default-icon-color: var(--qora-color-systemfeedback-info-icon);
      --default-text-color: var(--qora-color-systemfeedback-info-text);
    }
    &.error {
      --default-background: var(--qora-color-systemfeedback-error-background);
      --default-icon-color: var(--qora-color-systemfeedback-error-icon);
      --default-text-color: var(--qora-color-systemfeedback-error-text);
    }
    &.warning {
      --default-background: var(--qora-color-systemfeedback-warning-background);
      --default-icon-color: var(--qora-color-systemfeedback-warning-icon);
      --default-text-color: var(--qora-color-systemfeedback-warning-text);
    }

    &:has(.content-after) {
      grid-template-columns: min-content 1fr auto;
    }

    & .icon {
      --qora-icon-size: var(--qora-icon-m);

      color: var(--qora-icon-color);
      margin-right: var(--qora-spacing-xl);
    }

    & .title {
      font: var(--qora-font-heading-h4);
    }

    & .content {
      grid-column: 2;
      align-content: center;
    }

    & .content-after {
      grid-column: 3;
      margin-left: var(--qora-spacing-xl);
    }

    & .actions {
      grid-column: 2;
    }
  }

  .qora-alert.toast {
    &.error {
      background-color: var(--qora-color-red-20);
    }

    &.warning {
      background: var(--qora-color-yellow-20);
    }

    &.info {
      background: var(--qora-color-blue-20);
    }

    &.success {
      background: var(--qora-color-green-20);
    }
  }
</style>
