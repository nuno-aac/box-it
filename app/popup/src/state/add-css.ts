/**
 * Module dependecies
 */

import { UseMutationOptions, useMutation } from '@tanstack/react-query';

/**
 * `Props` type
 */

type Props = {
  css: string;
  id: number;
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

export function useAddCss(options: UseMutationOptions<void, any, Props, any>) {
  return useMutation(addCss, options);
}
