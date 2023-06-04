/**
 * Module dependecies
 */

import { UseMutationOptions, useMutation } from "@tanstack/react-query";

/**
 * `removeCss` function
 */

async function removeCss(id: number) {
  await chrome.storage.local.remove(`${id}Css`);
}

/**
 * Export `useRemoveCss` function
 */

export function useRemoveCss(options: UseMutationOptions<void, any, number, any>) {
  return useMutation(removeCss, options)
}

