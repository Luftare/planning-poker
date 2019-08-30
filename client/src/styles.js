import { css } from 'styled-components';

export const sizes = {
  desktop: 1090,
  tablet: 600,
};

export const media = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

export const theme = {
  colors: {
    primary: '#fdc500',
    black: '#000',
    grey: '#898989',
    lightGrey: '#f9f9f9',
    success: '#0c6',
    danger: '#d88',
    info: '#8bf',
    white: '#fff',
  },
  shadow: '2px 2px 3px 0 rgba(0, 0, 0, 0.05)',
};
