/**
 * Dependency-free environment parsing.
 *
 * Swap the body of these helpers for a `zod` schema if/when the project takes
 * on that dependency — the exported signatures are what the rest of the app
 * relies on, not the implementation.
 */

export class EnvValidationError extends Error {
  constructor(public readonly issues: readonly string[]) {
    super(`Invalid environment variables:\n- ${issues.join("\n- ")}`);
    this.name = "EnvValidationError";
  }
}

type Raw = Record<string, string | undefined>;

/** Collects issues while reading so every problem is reported in one throw. */
export class EnvReader {
  private readonly issues: string[] = [];

  constructor(private readonly raw: Raw) {}

  string(key: string, fallback?: string): string {
    const value = this.raw[key] ?? fallback;
    if (value === undefined || value === "") {
      this.issues.push(`${key} is required`);
      return "";
    }
    return value;
  }

  enum<const T extends readonly string[]>(
    key: string,
    allowed: T,
    fallback: T[number],
  ): T[number] {
    const value = this.raw[key] ?? fallback;
    if (!allowed.includes(value)) {
      this.issues.push(`${key} must be one of: ${allowed.join(", ")}`);
      return fallback;
    }
    return value as T[number];
  }

  url(key: string, fallback?: string): string {
    const value = this.string(key, fallback);
    if (value && !URL.canParse(value)) {
      this.issues.push(`${key} must be a valid absolute URL`);
    }
    return value;
  }

  /** Throws once with every collected issue, or returns the parsed object. */
  finish<T>(value: T): T {
    if (this.issues.length > 0) throw new EnvValidationError(this.issues);
    return value;
  }
}
