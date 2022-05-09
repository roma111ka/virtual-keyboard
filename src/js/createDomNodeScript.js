/* eslint-disable no-undef */
// eslint-disable-next-line import/prefer-default-export
export const createDomNode = (element, innerHTML, ...classes) => {
  const node = document.createElement(element);
  node.classList.add(...classes);
  node.innerHTML = innerHTML;
  return node;
};
