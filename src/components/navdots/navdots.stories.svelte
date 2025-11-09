<script context="module">
  import NavDots from './navdots.svelte'

  export const meta = {
    title: 'Components/Nav Dots',
    component: NavDots,
    argTypes: {
      dotCount: { control: 'number' },
      '--qora-navdots-size': {
        type: 'string',
        description: 'The size of the navdots (a CSS unit)'
      },
      '--qora-navdots-expanded-size': {
        type: 'string',
        description: 'The size of the expanded navdot'
      },
      '--qora-navdots-spacing': {
        type: 'string',
        description: 'The space between the individual dots'
      },
      '--qora-navdots-vertical-margin': {
        type: 'string',
        description: 'The margin above and below the navdots'
      },
      '--qora-navdots-transition-duration': {
        type: 'string',
        description:
          'The amount of time it takes for the dot to slide into position. Only used if animateSlide is true'
      },
      '--qora-navdots-transition-easing': {
        type: 'string',
        description: 'The easing function for the slide animation'
      },
      '--qora-navdots-active-color': {
        control: 'color',
        description: 'The color of the active dot'
      },
      '--qora-navdots-active-color-hover': {
        control: 'color',
        description: 'The color of the active dot when hovering'
      },
      '--qora-navdots-color': {
        control: 'color',
        description: 'The color of the non-active dots'
      },
      '--qora-navdots-color-hover': {
        control: 'color',
        description: 'The color of the non-active dots when hovering'
      }
    },
    args: {
      dotCount: 10
    }
  }
</script>

<script lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import SlotInfo from '../../storyHelpers/SlotInfo.svelte'

  let activeDot = 0
  function handleChange(n: CustomEvent<{ activeDot: number }>) {
    activeDot = n.detail.activeDot
  }
</script>

<Template let:args>
  <NavDots {activeDot} onChange={handleChange} {...args} />
</Template>

<Story name="Slots">
  <SlotInfo description="The navdots component has no slots" />
</Story>

<Story name="Default" />
