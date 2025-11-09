<script context="module">
  import Link from './link.svelte'

  export const meta = {
    title: 'Components/Link',
    component: Link,
    argTypes: {
      href: {
        control: 'text',
        description: 'The href for the link',
        type: 'string'
      },
      target: {
        control: 'text',
        description: 'The target for the link',
        type: 'string'
      },
      text: {
        control: 'text',
        description: 'The text content of the link',
        type: 'string'
      },
      '--qora-link-color': {
        type: 'string',
        control: 'color',
        description: 'The color of the link'
      },
      '--qora-link-hover-color': {
        type: 'string',
        control: 'color',
        description: 'The hover color of the link'
      },
      '--qora-link-visited-color': {
        type: 'string',
        control: 'color',
        description: 'The visited color of the link'
      },
      '--qora-link-disabled-color': {
        type: 'string',
        control: 'color',
        description: 'The disabled color of the link'
      },
      '--qora-link-focus-color': {
        type: 'string',
        control: 'color',
        description:
          'The focused color of the link. Defaults to the link color, if not set'
      },
      '--qora-link-focus-shadow': {
        type: 'string',
        control: 'text',
        description: 'The focused shadow for the link'
      }
    },
    args: {
      text: 'Download QorAI',
      target: '_blank',
      href: 'https://qorai.com'
    }
  }
</script>

<script lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf'

  import SlotInfo from '../../storyHelpers/SlotInfo.svelte'
  import Slot from '../../storyHelpers/Slot.svelte'
</script>

<Template let:args>
  <Link href="#foo" {...args} />
</Template>

<Story name="Slots" let:args>
  <SlotInfo
    description="The link has a single slot, which works the same as the slot on the anchor tag"
  >
    <Slot name="default" explanation="The text of the link">
      <div>
        <Link {...args} text={null}>{args.text}</Link>
      </div>
    </Slot>
  </SlotInfo>
</Story>

<Story name="Default" />
