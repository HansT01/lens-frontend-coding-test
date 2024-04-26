import { ViewPatent as Component } from '@/components/ViewPatent'
import { getDefaultTestParameters, getTestPatent } from '@/components/handlers'
import { Meta, StoryObj } from '@storybook/react'
import { within } from '@storybook/test'

type Story = StoryObj<typeof Component>

const meta: Meta<typeof Component> = {
  title: 'Components/ViewPatent',
  component: Component,
  args: {
    patent: getTestPatent().document
  }
}

export default meta

export const ViewPatent: Story = {
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
