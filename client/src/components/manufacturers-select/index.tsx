import { forwardRef, useMemo } from "react";

import { useGetAllManufacturersQuery } from "../../services/manufacturers";
import { BaseSelect, type BaseSelectProps } from "../base-select";

type Props = Omit<BaseSelectProps, "options" | "label">;

export const ManufacturersSelect = forwardRef<HTMLSelectElement, Props>(
  (props, forwardedRef) => {
    const { data = [] } = useGetAllManufacturersQuery();

    const options = useMemo(
      () => data.map(({ name, _id }) => ({ label: name, value: _id })),
      [data]
    );

    return (
      <BaseSelect
        ref={forwardedRef}
        label="Manufacturer"
        options={options}
        {...props}
      />
    );
  }
);
