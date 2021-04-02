import { carbonPrefix } from '../global/settings';

const CARBON_PREFIX_PLACEHOLDER = 'cv';
const REGEX_PLACEHOLDER = new RegExp(CARBON_PREFIX_PLACEHOLDER, 'g');

const replaceCarbonPrefix = el => {
  if (typeof el.className === 'string') {
    if (
      el.className.length === 0 ||
      !el.className.includes(CARBON_PREFIX_PLACEHOLDER)
    ) {
      return;
    }

    el.className = el.className.replace(REGEX_PLACEHOLDER, carbonPrefix);
    return;
  }

  if (el.className instanceof SVGAnimatedString) {
    el.className.baseVal = el.className.baseVal.replace(
      REGEX_PLACEHOLDER,
      carbonPrefix
    );
    return;
  }

  throw new Error(`Unknown className type for element ${el}`);
};

export default {
  mounted(el) {
    replaceCarbonPrefix(el);
  },
  updated(el, binding, node, prevNode) {
    if (node.props.class === prevNode.props.class) {
      return;
    }

    replaceCarbonPrefix(el);
  },
};
