import { FacetFilterGroup as Component } from '@/components/FacetFilterGroup'
import { getDefaultTestParameters } from '@/components/handlers'
import { PatentTermsAggregationKey } from '@/models/PatentTermsAggregationKey'
import { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import AGGREGATIONS from '../fixtures/patent-facets.json'

type Story = StoryObj<typeof Component>

const meta: Meta<typeof Component> = {
  title: 'Components/JurisdictionFilterGroup',
  component: Component,
  decorators: [],
  args: {
    aggregationKey: PatentTermsAggregationKey.Jurisdiction,
    aggregation: AGGREGATIONS.aggregations.jurisdiction,
    label: 'Jurisdiction'
  }
}

export default meta

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const JurisdictionFilterGroup: Story = {
  parameters: getDefaultTestParameters(),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Confirm check all button works correctly', async () => {
      await step('Check all checkboxes are unselected', async () => {
        canvas.queryAllByRole('checkbox').forEach((checkbox: any) => expect(checkbox.checked).toBeFalsy())
      })
      await step('Click check all button', async () => {
        await userEvent.click(canvas.getByText('Check All'))
      })
      await step('Check all checkboxes are selected', async () => {
        canvas.queryAllByRole('checkbox').forEach((checkbox: any) => expect(checkbox.checked).toBeTruthy())
      })
      await step('Click check all button', async () => {
        await userEvent.click(canvas.getByText('Check All'))
      })
      await step('Check all checkboxes are unselected', async () => {
        canvas.queryAllByRole('checkbox').forEach((checkbox: any) => expect(checkbox.checked).toBeFalsy())
      })
    })

    await delay(100)

    await step('Confirm fuzzy search works correctly', async () => {
      await step('Type into search bar', async () => {
        const input = await canvas.findByPlaceholderText('Search jurisdiction')
        userEvent.type(input, 'sin')
      })
      await step('Check first element is Singapore', async () => {
        // I don't know how to do this efficiently
      })
      await step('Check second element is China', async () => {
        // I don't know how to do this efficiently
      })
      await step('Clear search bar', async () => {
        const input = await canvas.findByPlaceholderText('Search jurisdiction')
        userEvent.type(input, '{backspace}{backspace}{backspace}')
      })
      await step('Check first element is WIPO', async () => {
        // I don't know how to do this efficiently
      })
    })
  }
}
