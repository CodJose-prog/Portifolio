export type TerminalAutocompleteResult = {
  nextValue: string;
  matches: string[];
  completed: boolean;
  exactMatch: boolean;
};

export function normalizeCommand(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function commonPrefix(values: string[]) {
  if (values.length === 0) {
    return "";
  }

  let prefix = values[0];

  for (const value of values.slice(1)) {
    let index = 0;
    while (index < prefix.length && index < value.length && prefix[index] === value[index]) {
      index += 1;
    }
    prefix = prefix.slice(0, index);
  }

  return prefix.trimEnd();
}

export function findCommandMatches(input: string, catalog: string[], limit = 8) {
  const normalized = normalizeCommand(input);

  if (!normalized) {
    return catalog.slice(0, limit);
  }

  return catalog
    .filter((command) => normalizeCommand(command).startsWith(normalized))
    .slice(0, limit);
}

export function autocompleteCommand(input: string, catalog: string[]): TerminalAutocompleteResult {
  const normalized = normalizeCommand(input);
  const matches = findCommandMatches(input, catalog, catalog.length);
  const exactMatch = matches.some((command) => normalizeCommand(command) === normalized);

  if (!normalized || matches.length === 0 || exactMatch) {
    return {
      nextValue: normalized || input,
      matches,
      completed: false,
      exactMatch,
    };
  }

  if (matches.length === 1) {
    return {
      nextValue: matches[0],
      matches,
      completed: true,
      exactMatch: false,
    };
  }

  const prefix = commonPrefix(matches);
  if (prefix.length > normalized.length) {
    return {
      nextValue: prefix,
      matches,
      completed: true,
      exactMatch: false,
    };
  }

  return {
    nextValue: input,
    matches,
    completed: false,
    exactMatch: false,
  };
}
