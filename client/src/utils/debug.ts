type DebugProps<T = Record<string, unknown>> = T | null | undefined;

export const debugLog = <T extends Record<string, unknown>>(
  componentName: string,
  props?: DebugProps<T>,
): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`🔄 ${componentName} rendered`, props ?? 'no props');
  }
};
