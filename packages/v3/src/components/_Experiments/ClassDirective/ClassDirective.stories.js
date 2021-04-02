import { Benchmark } from '../';
import Cv from './../../../directives/Cv';

import {
  sbCompPrefix,
  storyParametersObject,
} from '../../../global/storybook-utils';

const DEFAULT_NUMBER_OF_RUNS = 1_000_000;

export default {
  title: `${sbCompPrefix}/_Experiment/ClassDirective`,
  component: Benchmark,
  argTypes: {
    numberOfRuns: {
      control: { type: 'number' },
    },
  },
};

const template = `<benchmark v-bind="args" />`;
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Benchmark },
  setup: () => ({ args }),
  template,
});

const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);
const choices = Array.from(
  { length: 26 },
  (_, i) => `cv-${String.fromCharCode(97 + i)}`
);
const choice = () => choices[randomInt(0, choices.length)];

export const WithoutDirective = Template.bind({});
WithoutDirective.args = {
  component: {
    template: `<div>foobar</div>`,
  },
  initializer: () => ({ class: '' }),
  changeFunction(data) {
    data.class = `${choice()} ${choice()} ${choice()} ${choice()} ${choice()}`;
  },
  numberOfRuns: DEFAULT_NUMBER_OF_RUNS,
};
WithoutDirective.argTypes = {
  component: { table: { disable: true } },
  initializer: { table: { disable: true } },
  changeFunction: { table: { disable: true } },
};
WithoutDirective.parameters = storyParametersObject(
  WithoutDirective.parameters,
  template,
  WithoutDirective.args
);

export const WithDirective = Template.bind({});
WithDirective.args = {
  component: {
    template: `<div v-cv>foobar</div>`,
    directives: { Cv },
  },
  initializer: () => ({ class: '' }),
  changeFunction(data) {
    data.value.class = `${choice()} ${choice()} ${choice()} ${choice()} ${choice()}`;
  },
  numberOfRuns: DEFAULT_NUMBER_OF_RUNS,
};
WithDirective.argTypes = {
  component: { table: { disable: true } },
  initializer: { table: { disable: true } },
  changeFunction: { table: { disable: true } },
};
WithDirective.parameters = storyParametersObject(
  WithDirective.parameters,
  template,
  WithDirective.args
);
