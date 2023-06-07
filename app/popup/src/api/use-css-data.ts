/**
 * Module dependencies.
 */

import { CssData } from '../types/css';
import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import { getCss } from './get-css-data';

/**
 * `Options` type.
 */

type Options = UseQueryOptions<CssData | null, any, CssData | null, any>;

/**
 * `Result` type.
 */

type Result = UseQueryResult<CssData | null, unknown>;


/**
 * `useCssData` hook.
 */

export function useCssData(id: number | string, options?: Options): Result {
  const result = useQuery(
    ['get-css', id],
    () => {
      return getCss(id);
    },
    options
  );

  return result;
}
