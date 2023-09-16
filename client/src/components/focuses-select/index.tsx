import { forwardRef, useMemo } from "react";

import { useGetAllFocusesQuery } from "../../services/focuses";
import { BaseSelect, type BaseSelectProps } from "../base-select";

type Props = Omit<BaseSelectProps, "options" | "label">;

export const FocusesSelect = forwardRef<HTMLSelectElement, Props>(
  (props, forwardedRef) => {
    const { data = [] } = useGetAllFocusesQuery();

    const options = useMemo(
      () => data.map(({ name, _id }) => ({ label: name, value: _id })),
      [data]
    );

    return (
      <BaseSelect
        ref={forwardedRef}
        label="Focus"
        options={options}
        {...props}
      />
    );
  }
);
