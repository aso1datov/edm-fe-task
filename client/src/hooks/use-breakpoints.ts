import { useMediaMatch } from "rooks";

export function useBreakpoints() {
  const isMobile = useMediaMatch("(max-width: 767px)");
  const isTablet = useMediaMatch("(max-width: 1080px)");
  const isLaptop = useMediaMatch("(max-width: 1366px)");

  const isDesktop = !(isTablet || isMobile);

  return {
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
  };
}
