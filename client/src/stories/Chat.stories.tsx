import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Chat, { IChatInterface } from './../components/Chat/Chat';

export default {
  title: 'Chat',
  component: Chat,
  argTypes: {},
} as Meta;

const Template: Story<IChatInterface> = (args) => <Chat {...args} />;

export const Default = Template.bind({});
Default.args = {
  messages: []
};

export const Messages = Template.bind({});
Messages.args = {
  messages: [
    {
      id: '1',
      content: 'This is some message content 1',
      from: 'user 1'
    },
    {
      id: '2',
      content: 'This is some message content 2',
      from: 'user 2'
    },
    {
      id: '3',
      content: 'This is some message content 3',
      from: 'user 1'
    },
  ]
};
