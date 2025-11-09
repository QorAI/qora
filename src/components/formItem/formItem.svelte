<script lang="ts" context="module">
  export let sizes = ['small', 'normal', 'large'] as const
  export type Size = (typeof sizes)[number]

  export let modes = ['filled', 'outline', 'plain'] as const
  export type Mode = (typeof modes)[number]

  export let cssProperties: {
    [key: `--qora-control-${string}`]: {
      description: string
      control?: string
      options?: string[]
      type?: string
    }
  } = {
    '--qora-control-label-direction': {
      description:
        'Controls how the label and control flow together. Accepts a <flex-direction>',
      control: 'select',
      options: ['column', 'column-reverse', 'row', 'row-reverse']
    },
    '--qora-control-radius': {
      description: 'The border radius of the control',
      type: 'string'
    },
    '--qora-control-padding': {
      description: 'The padding of the control',
      type: 'string'
    },
    '--qora-control-border-color': {
      description: 'The border color of the control',
      type: 'string'
    },
    '--qora-control-font': {
      description: 'The font used by the control',
      type: 'string'
    },
    '--qora-control-icon-size': {
      description: 'The icon size used by the control',
      type: 'string'
    },
    '--qora-control-icon-color': {
      description: 'The icon color used by the control',
      control: 'color'
    },
    '--qora-control-color': {
      description:
        'The color of the control, which other colors are derived from',
      control: 'color'
    },
    '--qora-control-text-color': {
      description: 'The color of the text in the control',
      control: 'color'
    },
    '--qora-control-label-gap': {
      description: 'The gap between the label and the control',
      type: 'string'
    },
    '--qora-control-focus-effect': {
      description: 'The focus effect for the control',
      type: 'string'
    }
  }
</script>

<script lang="ts">
  export let disabled = false
  export let size: Size = 'normal'

  export let required = false
  export let mode: Mode = 'outline'

  export let showFocusOutline: boolean = false
  export let error = false

  // Unfortunately, we can't conditionally render slots in Svelte, so we provide
  // a flag so the consumer can let us know if they're actually setting a label.
  export let renderLabel: boolean

  export let controlElement: HTMLDivElement = undefined
</script>

<label
  class="qora-control"
  class:isSmall={size === 'small'}
  class:isLarge={size === 'large'}
  class:isFilled={mode === 'filled'}
  class:isOutline={mode === 'outline'}
  class:isPlain={mode === 'plain'}
  class:isFocused={showFocusOutline}
  class:error
  aria-disabled={disabled}
>
  {#if $$slots.label && renderLabel}
    <div class="label-row">
      <slot name="label" />{#if required}<span class="required-indicator">*</span>{/if}
    </div>
  {/if}
  <div class="control" bind:this={controlElement}>
    <div class="container">
      <div class="extra-content">
        <slot name="left-icon" />
      </div>
      <div class="content">
        <slot />
      </div>
      <div class="extra-content">
        <slot name="right-icon" />
      </div>
    </div>
    <slot name="after" />
  </div>
</label>

<style lang="scss">
  .qora-control {
    --foreground: var(--qora-color-text-primary);
    --base: var(--qora-color-container-background);
    --primary: var(--qora-control-color, var(--base));

    --radius: var(--qora-control-radius, var(--qora-radius-m));
    --padding: var(--qora-control-padding, 11px var(--qora-spacing-m));
    --font: var(--qora-control-font, var(--qora-font-default-regular));
    --qora-icon-size: var(--qora-control-icon-size, 20px);
    --qora-icon-color: var(
      --qora-control-icon-color,
      var(--qora-color-icon-default)
    );
    --gap: var(--qora-control-label-gap, var(--qora-spacing-s));
    --direction: var(--qora-control-label-direction, column);

    --color: var(--qora-control-text-color, var(--qora-color-text-primary));
    --color-hover: var(--color);
    --color-focus: var(--color);

    --background: var(--primary);
    --background-hover: var(--background);
    --background-focus: var(--background);

    --shadow: ;
    --shadow-hover: var(--shadow);
    --shadow-focus: var(
      --qora-control-focus-effect,
      var(--qora-effect-focus-state)
    );

    --border-color: var(--qora-control-border-color, transparent);
    --border-color-hover: var(--qora-control-border-color, transparent);
    --border-color-focus: var(--qora-control-border-color, transparent);
    --border-color-error: var(
      --qora-control-border-color,
      var(--qora-color-systemfeedback-error-icon)
    );
    --border-color-error-hover: var(
      --qora-control-border-color,
      var(--qora-color-red-50)
    );

    display: flex;
    flex-direction: var(--direction);
    justify-content: stretch;
    font: var(--font);
    gap: var(--gap);
    transition: color 0.2s ease-in-out;

    .content {
      flex: 1;
      padding: 0 var(--qora-spacing-s);
    }

    .extra-content:empty {
      display: none;
    }

    &:not([aria-disabled='true']) {
      & .container:hover {
        color: var(--color-hover);
        background: var(--background-hover);
        box-shadow: var(--shadow-hover);
        border-color: var(--border-color-hover);
      }

      & .container:has(*:focus-visible),
      &.isFocused .container {
        &:not(:has(.extra-content:focus-within)) {
          color: var(--color-focus);
          background: var(--background-focus);
          box-shadow: var(--shadow-focus);
          border-color: var(--border-color-focus);
        }
      }

      &.error {
        color: var(--qora-color-systemfeedback-error-icon);
      }

      &.error .container:hover:not(:has(*:focus-visible)) {
        border-color: var(--border-color-error-hover);
      }
    }
  }

  .qora-control.isSmall {
    --qora-icon-size: 16px;
    --font: var(--qora-control-font, var(--qora-font-small-regular));
    --padding: var(--qora-control-padding, var(--qora-spacing-m));
    --gap: var(--qora-control-label-gap, 2px);
  }

  .qora-control.isLarge {
    --qora-icon-size: 22px;
    --padding: var(--qora-control-padding, 14px var(--qora-spacing-l));
    --gap: var(--qora-control-label-gap, 12px);
  }

  .qora-control.isFilled {
    --background: var(--qora-color-container-highlight);
    --shadow-hover: var(--qora-effect-elevation-01);
    --border-color: transparent;
    --border-color-hover: var(--qora-color-divider-subtle);

    @supports (color: color-mix(in srgb, transparent, transparent)) {
      --background: color-mix(in srgb, var(--primary), var(--foreground) 10%);
      --border-color-hover: var(
        --qora-control-border-color,
        color-mix(in srgb, var(--primary), var(--foreground) 20%)
      );
    }
  }

  .qora-control.isOutline {
    --background: var(--primary);
    --border-color: var(
      --qora-control-border-color,
      var(--qora-color-divider-subtle)
    );
    --border-color-hover: var(
      --qora-control-border-color,
      var(--qora-color-neutral-30)
    );
    --shadow-hover: var(--qora-effect-elevation-01);

    @supports (color: color-mix(in srgb, transparent, transparent)) {
      --border-color-hover: var(
        --qora-control-border-color,
        color-mix(in srgb, var(--primary), var(--foreground) 20%)
      );
    }
  }

  .qora-control.isPlain {
    --background: transparent;
    --padding: none;
    --border-color: transparent;
    --border-color-hover: transparent;
    --shadow-hover: none;
    --font: inherit;
    /**
     * This magic number is meant to preserve the proportions
     * between icon and text found the `normal` size:
     * 20px ('normal' icon size) / 14px ('normal' font-size)
     */
    --qora-icon-size: 1.43em;
  }

  .qora-control.error {
    --border-color: var(--border-color-error);
  }

  .qora-control .control {
    flex: 1;
  }

  .qora-control .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: var(--qora-spacing-m);

    border-radius: var(--radius);
    padding: var(--padding);

    color: var(--color);
    background: var(--background);
    box-shadow: var(--shadow);
    border: 1px solid var(--border-color);
    transition:
      box-shadow 0.2s ease-in-out,
      border-color 0.2s ease-in-out;

    cursor: pointer;
  }

  .qora-control[aria-disabled='true'] .container {
    --background: var(--qora-color-container-disabled);
    color: var(--qora-color-text-disabled);
    cursor: not-allowed;
  }

  .qora-control .label-row {
    display: flex;
    flex-direction: row;
    gap: var(--qora-spacing-s);

    &:empty {
      display: none;
    }
  }

  .qora-control .required-indicator {
    color: var(--qora-color-systemfeedback-error-icon);
  }
</style>
