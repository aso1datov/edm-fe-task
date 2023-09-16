import type { FC } from "react";

import { ReactComponent as CloseIcon } from "../../../assets/cross.svg";
import { IconButton } from "../../icon-button";

type Props = {
  className?: string;
  onClick: () => void;
};

export const Close: FC<Props> = ({ className, onClick }) => (
  <IconButton className={className} onClick={onClick} aria-label="Close">
    <CloseIcon />
  </IconButton>
);
