export function isEmptyInputValue(
  value?: string | number | readonly string[] | null
) {
  return (
    typeof value === "undefined" ||
    value === null ||
    ((typeof value === "string" || Array.isArray(value)) && value.length === 0)
  );
}

export function isFilled(inputEl: HTMLInputElement | null) {
  return inputEl !== null && !isEmptyInputValue(inputEl.value);
}
