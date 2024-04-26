import { PatentListItem as Component } from '@/components/search/PatentList'
import { PatentHit } from '@/models/PatentHit'
import { Meta, StoryObj } from '@storybook/react'

import { getDefaultTestParameters } from '@/components/handlers'
import { within } from '@storybook/test'
import PATENTS from '../fixtures/patents.json'
const hit = PATENTS.hits[0] as any as PatentHit

type Story = StoryObj<typeof Component>

const meta: Meta<typeof Component> = {
  title: 'Components/PatentListItem',
  component: Component,
  decorators: [],
  args: {
    hit: hit,
    zebra: true
  }
}

export default meta

export const PatentListItem: Story = {
  parameters: getDefaultTestParameters(),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    await step('Check the title is displayed', async () => {
      await canvas.findAllByText(
        'ARTIFICIAL INTELLIGENCE EYE DISEASE SCREENING AND DIAGNOSTIC SYSTEM BASED ON OPHTHALMIC ROBOT'
      )
    })
  }
}
