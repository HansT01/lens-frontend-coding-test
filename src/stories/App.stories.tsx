import { App as Component } from '@/components/App'
import { getDefaultTestParameters } from '@/components/handlers'
import { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'

type Story = StoryObj<typeof Component>

const meta: Meta<typeof Component> = {
  title: 'Integration/App',
  component: Component,
  decorators: []
}

export default meta

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const App: Story = {
  parameters: getDefaultTestParameters(),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const patentTitle = 'ARTIFICIAL INTELLIGENCE EYE DISEASE SCREENING AND DIAGNOSTIC SYSTEM BASED ON OPHTHALMIC ROBOT'
    const scholarTitle =
      'Performance of an artificial intelligence automated system for diabetic eye screening in a large English population.'

    await step('Confirm no search results yet', async () => {
      expect(canvas.queryByText(scholarTitle)).not.toBeInTheDocument()
      expect(canvas.queryByText(patentTitle)).not.toBeInTheDocument()
    })
    await step('Type in the search bar', async () => {
      const input = await canvas.findByPlaceholderText('Search patents and scholarship')
      userEvent.type(input, 'diabetic retinopathy')
      await delay(100)
      userEvent.type(input, '{enter}')
    })
    // await step('Click the search button', async () => { })
    await step('Confirm patent result visible', async () => {
      const patents = await canvas.findAllByText(patentTitle)
      expect(patents[0]).toBeVisible()
    })
    await step('Change to scholar tab', async () => {
      userEvent.click(await canvas.findByText('Scholar'))
    })
    await step('Confirm patent result visible', async () => {
      expect(await canvas.findByText(scholarTitle)).toBeVisible()
    })
  }
}
