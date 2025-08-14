import type { Meta, StoryObj } from '@storybook/react';
import { HTMLBlock } from './html-block';

const meta: Meta = {
  title: 'HTML Content',
};

export default meta;

type Story = StoryObj;

const FakeHtml = `<h1>This is HTML content<h1>`;
export const Primary: Story = {
  name: 'HtmlBlock',
  render: () => {
    return (
      <>
        <h2>HTMLBlock</h2>
        <HTMLBlock content={FakeHtml} />
      </>
    );
  },
};
