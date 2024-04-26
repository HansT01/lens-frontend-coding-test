import { ViewPatentContainer as Component } from '@/components/ViewPatentContainer'
import { withQueryClient } from '@/decorators'
import { Meta, StoryObj } from '@storybook/react'
import { within } from '@storybook/test'

import { getDefaultTestParameters } from '@/components/handlers'

type Story = StoryObj<typeof Component>

const meta: Meta<typeof Component> = {
  title: 'Components/ViewPatentContainer',
  component: Component,
  decorators: [withQueryClient]
}

export default meta

export const ViewPatentContainer: Story = {
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
