import { PatentListItem as Component } from '@/components/search/PatentList'
import { PatentHit } from '@/models/PatentHit'
import { Meta, StoryObj } from '@storybook/react'

import { getDefaultTestParameters } from '@/components/handlers'
import { expect, userEvent, within } from '@storybook/test'
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
    const patentTitle = 'ARTIFICIAL INTELLIGENCE EYE DISEASE SCREENING AND DIAGNOSTIC SYSTEM BASED ON OPHTHALMIC ROBOT'
    const patentDisplayKey = '🇺🇸 US 20220079429 A1'
    const applicants = ['NING BO EYE HOSPITAL']
    const inventors = ['CHEN WEI', 'LI ZHONGWEN', 'ZHENG QINXIANG']
    const claim =
      'The system according to claim 6 , wherein the artificial intelligence eye disease screening and diagnostic system is installed on the ophthalmic robot, and the ophthalmic robot is specifically a tabletop ophthalmic robot.'

    await step('Check the title is displayed', async () => {
      await canvas.findAllByText(patentTitle)
    })
    await step('Check for correct display key', async () => {
      await canvas.findAllByText(patentDisplayKey)
    })
    await step('Check for all applicants and inventors', async () => {
      applicants.forEach((applicant) => canvas.findAllByText(applicant))
      inventors.forEach((inventor) => canvas.findAllByText(inventor))
    })

    await step('Check abstract and claims are not visible', async () => {
      expect(canvas.queryByText('Abstract')).not.toBeVisible()
      expect(canvas.queryByText('Document Preview')).not.toBeVisible()
      expect(canvas.queryByText('History')).not.toBeVisible()
    })
    await step('Expand patent preview', async () => {
      await userEvent.click(canvas.getByRole('button'))
    })
    await step('Check abstract and claims are visible', async () => {
      expect(canvas.queryByText('Abstract')).toBeVisible()
      expect(canvas.queryByText('Document Preview')).toBeVisible()
      expect(canvas.queryByText('History')).toBeVisible()
    })

    await step('Check claims are not visible', async () => {
      expect(canvas.queryByText(claim)).not.toBeVisible()
    })
    await step('Expand patent preview', async () => {
      await userEvent.click(canvas.getByText('Show Claims'))
    })
    await step('Check claims are visible', async () => {
      expect(canvas.queryByText(claim)).toBeVisible()
    })
  }
}
