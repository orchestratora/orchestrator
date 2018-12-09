export interface UiWebSelectOptionGroup {
  children: (string | UiWebSelectOptionPair)[];
  label?: string;
  disabled?: boolean;
}

export interface UiWebSelectOptionPair {
  label: string;
  value: any;
  disabled?: boolean;
  selected?: boolean;
}

export type UiWebSelectOption = string | UiWebSelectOptionPair | UiWebSelectOptionGroup;
