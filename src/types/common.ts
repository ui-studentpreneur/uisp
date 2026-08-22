/** Types shared by more than one feature. Feature-local types stay in the feature. */

export type Nullable<T> = T | null;

export type Maybe<T> = T | null | undefined;

/** A page of records from any paginated source. */
export type Paginated<T> = {
  items: readonly T[];
  page: number;
  pageSize: number;
  total: number;
};

/** Discriminated state for anything that loads. */
export type AsyncState<T, E = string> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: E };
