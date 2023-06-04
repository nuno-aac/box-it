/**
 * Module dependencies.
 */

import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import { getCss } from './get-css';

/**
 * `Options` type.
 */

type Options = UseQueryOptions<string | null, any, string | null, any>;

/**
 * `Result` type.
 */

type Result = UseQueryResult<string | null, unknown>;


/**
 * `useCssData` hook.
 */

export function useCssData(id: number, options?: Options): Result {
  const result = useQuery(
    ['get-css', id],
    () => {
      return getCss(id);
    },
    options
  );

  return result;
}
