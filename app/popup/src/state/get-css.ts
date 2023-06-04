/**
 * Export `getCss` function
 */

export async function getCss(id: number): Promise<string | null> {
  const storage = await chrome.storage.local.get();
  const storageCss = storage?.[`${id}Css`] as string;

  return storageCss ?? null
}
