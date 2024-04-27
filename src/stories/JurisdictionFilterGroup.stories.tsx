import { FacetFilterGroup as Component } from '@/components/FacetFilterGroup'
import { PatentTermsAggregationKey } from '@/models/PatentTermsAggregationKey'
import { Meta, StoryObj } from '@storybook/react'
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

export const JurisdictionFilterGroup: Story = {}
