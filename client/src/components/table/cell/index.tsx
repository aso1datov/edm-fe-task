import {
  type FC,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react";
import clsx from "clsx";

import { ReactComponent as SortIcon } from "../../../assets/sort.svg";
import { IconButton } from "../../icon-button";
import { TableContentContext } from "..";

import styles from "./index.module.scss";

type SortDirection = "asc" | "desc" | null;

type Props = TdHTMLAttributes<HTMLTableCellElement> &
  ThHTMLAttributes<HTMLTableCellElement> & {
    sortable?: boolean;
    onSortByChange?: (order: SortDirection) => void;
  };

export const Cell: FC<Props> = ({
  children,
  className,
  sortable = false,
  onSortByChange,
  ...cellProps
}) => {
  const [sortBy, setSortBy] = useState<SortDirection>(null);
  const { variant } = useContext(TableContentContext)!;
  const Tag = variant === "header" ? "th" : "td";

  const showSortIcon = sortable && variant === "header";

  const toggleSortBy = () => {
    setSortBy((prevSort) => {
      if (prevSort === null) {
        return "asc";
      } else if (prevSort === "asc") {
        return "desc";
      } else {
        return null;
      }
    });
  };

  useEffect(() => {
    onSortByChange?.(sortBy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  return (
    <Tag {...cellProps} className={clsx(className, styles.cell, styles[Tag])}>
      <span className={styles.container}>
        {children}
        {showSortIcon && (
          <IconButton className={styles.sortButton} onClick={toggleSortBy}>
            <SortIcon className={styles.sortIcon} />
          </IconButton>
        )}
      </span>
    </Tag>
  );
};
