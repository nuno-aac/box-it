/**
 * Module dependecies
 */

import { CssData } from '../types/css';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

/**
 * `Props` type
 */

type Props = {
  css: CssData;
  id: number | string;
};

/**
 * `addCss` function
 */

async function addCss({ css, id }: Props) {
  await chrome.storage.local.set({
    [`${id}Css`]: css
  });

  return;
}

/**
 * Export `useAddCss` function
 */

export function useAddCss(options?: UseMutationOptions<void, any, Props, any>) {
  return useMutation(addCss, options);
}
