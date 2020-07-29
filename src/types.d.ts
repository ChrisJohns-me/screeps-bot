/* eslint-disable no-null/no-null */

/**
 * Generally needed for functions' return value, or local variables.
 */
type Optional<T> = T | undefined;

/**
 * `null` should generally be avoided.
 * This might be helpful however, when interfacing with other libraries.
 */
type Nullable<T> = T | undefined | null;

/**
 * Shortened interface of the one found in 'lib.dom.d.ts'
 */
interface Performance {
  now(): number;
}
