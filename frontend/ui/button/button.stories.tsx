import { Button } from '.';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'UI/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export const Primary: StoryObj<typeof Button> = {
  args: {
    children: 'Click Me',
    variant: 'primary',
  },
};
