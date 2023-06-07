
/**
 * Module dependencies
 */

import { CssData } from '../types/css';

/**
 * Export `getCss` function
 */

export async function getCss(id: number | string): Promise<CssData | null> {
  const storage = await chrome.storage.local.get();
  const storageCss = storage?.[`${id}Css`] as CssData;

  return storageCss ?? null
}
