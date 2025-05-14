interface FormatNumberOptions {
  /**
   * Whether to abbreviate large numbers with K (thousands), M (millions), B (billions), T (trillions)
   * @default false
   */
  abbreviate?: boolean;

  /**
   * Whether to use thousand separators (e.g., 1,000,000)
   * @default true
   */
  useSeparators?: boolean;

  /**
   * Maximum number of decimal places to show
   * @default 2
   */
  decimals?: number;

  /**
   * Whether to show decimal places at all
   * @default true
   */
  showDecimals?: boolean;

  /**
   * Whether to convert Wei to Ether (divide by 10^18)
   * @default false
   */
  etherConverter?: boolean;
}

/**
 * Formats a number according to the provided options
 * @param value The number to format
 * @param options Formatting options
 * @returns Formatted number as string
 */
export function formatNumber(
  value: number | string,
  options: FormatNumberOptions = {}
): string {
  // Convert to number if string is provided
  const num = typeof value === "string" ? parseFloat(value) : value;

  // Use US number format (e.g., 1,234.56)
  const {
    abbreviate = false,
    useSeparators = true,
    decimals = 2,
    showDecimals = true,
    etherConverter = false,
  } = options;

  // Handle NaN or invalid number
  if (isNaN(num)) {
    return "N/A";
  }

  // Convert Wei to Ether if etherConverter is enabled
  const processedNum = etherConverter ? num / 1e18 : num;

  // Abbreviate large numbers
  if (abbreviate) {
    const absNum = Math.abs(processedNum);

    if (absNum >= 1e12) {
      return formatAbbreviatedNumber(
        processedNum / 1e12,
        "T",
        decimals,
        showDecimals,
        useSeparators
      );
    } else if (absNum >= 1e9) {
      return formatAbbreviatedNumber(
        processedNum / 1e9,
        "B",
        decimals,
        showDecimals,
        useSeparators
      );
    } else if (absNum >= 1e6) {
      return formatAbbreviatedNumber(
        processedNum / 1e6,
        "M",
        decimals,
        showDecimals,
        useSeparators
      );
    } else if (absNum >= 1e3) {
      return formatAbbreviatedNumber(
        processedNum / 1e3,
        "K",
        decimals,
        showDecimals,
        useSeparators
      );
    }
  }

  // Regular number formatting
  return formatRegularNumber(
    processedNum,
    decimals,
    showDecimals,
    useSeparators
  );
}

/**
 * Helper function to format abbreviated numbers
 */
function formatAbbreviatedNumber(
  value: number,
  suffix: string,
  decimals: number,
  showDecimals: boolean,
  useSeparators: boolean
): string {
  const formattedNumber = formatRegularNumber(
    value,
    decimals,
    showDecimals,
    useSeparators
  );
  return `${formattedNumber}${suffix}`;
}

/**
 * Helper function to format regular numbers
 */
function formatRegularNumber(
  value: number,
  decimals: number,
  showDecimals: boolean,
  useSeparators: boolean
): string {
  // Create formatting options object for Intl.NumberFormat
  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: showDecimals ? 0 : 0,
    maximumFractionDigits: showDecimals ? decimals : 0,
    useGrouping: useSeparators,
  };

  // Format number using US locale (1,234.56 format)
  return new Intl.NumberFormat("en-US", options).format(value);
}
