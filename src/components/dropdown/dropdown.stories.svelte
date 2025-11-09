<script context="module">
  import Dropdown from './dropdown.svelte'
  import { modes, sizes } from '../formItem/formItem.svelte'

  export const meta = {
    title: 'Components/Dropdown',
    component: Dropdown,
    argTypes: {
      '--qora-menu-control-width': {
        description: '(readonly): Computed width of menu control'
      },
      size: {
        control: 'select',
        options: sizes
      },
      mode: {
        control: 'select',
        options: modes
      }
    },
    args: {
      label: 'Label',
      placeholder: 'select...'
    }
  }
</script>

<script lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf'

  import Icon from '../icon/icon.svelte'
  import SlotInfo from '../../storyHelpers/SlotInfo.svelte'
  import Slot from '../../storyHelpers/Slot.svelte'
  import Link from '../link/link.svelte'

  const countries = {
    'nz': 'New Zealand',
    'au': 'Australia',
    'gb': 'United Kingdom',
    'ca': 'Canada'
  }
</script>

<Template let:args>
  <div class="container">
    <Dropdown value={undefined} {...args}>
      <div slot="label">{args.label}</div>
      <qora-option value="one">
        <div>One</div>
      </qora-option>
      <qora-option value="two">Two</qora-option>
      <qora-option>Three</qora-option>
    </Dropdown>
  </div>
</Template>

<Story name="Slots" let:args>
  <SlotInfo
    description="The dropdown provides several slots for customization. It accepts '<qora-option>'"
  >
    <Slot
      name="default"
      explanation="The dropdown items. Each item should have a `value` attribute set to the value of the dropdown when that item is selected. This is similar to the <option value='1'>Foo</option> element. Items can be any sort of element, but type definitions are provided for <qora-option value='1'>Foo</qora-option>, so it's generally easiest to use that."
    >
      <Dropdown {...args}>
        <qora-option value="1">Foo</qora-option>
        <qora-option value="2">Bar</qora-option>
        <qora-option value="3">Frob</qora-option>
      </Dropdown>
    </Slot>
    <Slot name="label" explanation="A label for the dropdown">
      <Dropdown {...args}>
        <div slot="label"><i>A custom <b>label</b> I made</i></div>
        <qora-option value="1">Foo</qora-option>
        <qora-option value="2">Bar</qora-option>
        <qora-option value="3">Frob</qora-option>
      </Dropdown>
    </Slot>
    <Slot name="left-icon" explanation="A left icon to show in the dropdown">
      <Dropdown {...args}>
        <Icon name="country-nz" slot="left-icon" />
        <qora-option value="1">Foo</qora-option>
        <qora-option value="2">Bar</qora-option>
        <qora-option value="3">Frob</qora-option>
      </Dropdown>
    </Slot>
    <Slot name="right-icon" explanation="A right icon to show in the dropdown">
      <Dropdown {...args}>
        <Icon name="country-nz" slot="right-icon" />
        <qora-option value="1">Foo</qora-option>
        <qora-option value="2">Bar</qora-option>
        <qora-option value="3">Frob</qora-option>
      </Dropdown>
    </Slot>
    <Slot
      name="placeholder"
      explanation="Placeholder text to display when no option is selected"
    >
      <Dropdown {...args}>
        <div
          slot="placeholder"
          style="color: gray; display: flex; flex-direction: row"
        >
          <Icon name="finger-touch" />
          Maybe I should pick something
        </div>
        <qora-option value="1">Foo</qora-option>
        <qora-option value="2">Bar</qora-option>
        <qora-option value="3">Frob</qora-option>
      </Dropdown>
    </Slot>
    <Slot
      name="value"
      explanation="Let's you custom render the selected value. By default, the value will just be displayed"
    >
      <Dropdown {...args}>
        <div slot="value" let:value>
          You picked {value}
        </div>
        <qora-option value="Foo">Foo</qora-option>
        <qora-option value="Bar">Bar</qora-option>
        <qora-option value="Frob">Frob</qora-option>
      </Dropdown>
    </Slot>
    <Slot
      name="error"
      explanation="A slot where any errors related to the component will be shown. Errors are only shown if showErrors is set and an error slot exists on the Dropdown (this one has them forced on)"
    >
      <Dropdown {...args} showErrors>
        <qora-option value="Error 1">Error 1</qora-option>
        <qora-option value="Error 2">Error 2</qora-option>
        <qora-option value="Error 3">Error 3</qora-option>
        <div slot="errors">Something is not quite right here!</div>
      </Dropdown>
    </Slot>
  </SlotInfo>
</Story>

<Story name="Default" />

<Story name="Plain" let:args>
  <Link>Footer link</Link>
  <Link>Footer link</Link>
  <div style="display: inline-block; vertical-align: middle;">
    <Dropdown value={undefined} {...args} mode="plain">
      <Icon name="country-us" slot="left-icon" />
      <qora-option value="one">
        <div>One</div>
      </qora-option>
      <qora-option value="two">Two</qora-option>
      <qora-option>Three</qora-option>
    </Dropdown>
  </div>
  <Link>Footer link</Link>
  <Link>Footer link</Link>
  <Link>Footer link</Link>
</Story>

<Story name="Left Icon" let:args>
  <div class="container">
    <Dropdown {...args}>
      <div slot="label">{args.label}</div>
      <div slot="left-icon">
        <Icon name="check-circle-outline" />
      </div>
      <qora-option>One</qora-option>
      <qora-option>Two</qora-option>
      <qora-option>Three</qora-option>
    </Dropdown>
  </div>
</Story>

<Story name="Right Icon" let:args>
  <div class="container">
    <Dropdown {...args}>
      <div slot="label">{args.label}</div>
      <div slot="right-icon">
        <Icon name="send" />
      </div>
      <qora-option>One</qora-option>
      <qora-option>Two</qora-option>
      <qora-option>Three</qora-option>
    </Dropdown>
  </div>
</Story>

<Story name="Both Icons" let:args>
  <div class="container">
    <Dropdown {...args}>
      <div slot="label">{args.label}</div>
      <div slot="left-icon">
        <Icon name="check-circle-outline" />
      </div>
      <div slot="right-icon">
        <Icon name="send" />
      </div>
      <qora-option>One</qora-option>
      <qora-option>Two</qora-option>
      <qora-option>Three</qora-option>
    </Dropdown>
  </div>
</Story>

<Story name="Custom Options" let:args>
  <div class="container" style={args}>
    <Dropdown {...args}>
      <div slot="label">{args.label}</div>
      <div slot="value" class="country" let:value>
        <Icon name={`country-${value}`} />
        {countries[value]}
      </div>
      {#each Object.entries(countries) as [code, name]}
        <qora-option class="country" value={code}>
          <Icon name={`country-${code}`} />
          {name}
        </qora-option>
      {/each}
    </Dropdown>
  </div>
</Story>

<style>
  .container {
    width: 250px;
  }

  .country {
    display: flex;
    flex-direction: row;
    gap: var(--qora-spacing-xl);
    align-items: center;
  }

  [slot='errors'] {
    display: flex;
    flex-direction: row;
    gap: var(--qora-spacing-m);
    align-items: center;

    margin-top: var(--qora-spacing-s);

    color: var(--qora-color-systemfeedback-error-icon);
  }
</style>
