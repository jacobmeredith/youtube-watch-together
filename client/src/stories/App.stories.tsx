import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import App from './../components/App';
import { IStateInterface, defaultState } from './../state/state';

export default {
  title: 'App',
  component: App,
  argTypes: {},
} as Meta;

const Template: Story<{ initialState: IStateInterface }> = (args) => <App {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialState: {
    ...defaultState,
    user: 'user 1'
  }
};
