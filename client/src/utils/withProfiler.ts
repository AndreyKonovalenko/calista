// utils/withProfiler.ts
import React, { Profiler, ProfilerOnRenderCallback } from 'react';

interface ProfilerConfig {
  id?: string;
  onRender?: ProfilerOnRenderCallback;
  enabled?: boolean | (() => boolean);
}

// Default profiler callback - logs performance data
const defaultOnRender: ProfilerOnRenderCallback = (
  id: string,
  phase: "mount" | "update" | "nested-update",
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) => {
  // Only log in development
  if (process.env.NODE_ENV === 'development') {
    const color = phase === 'mount' ? '#080808' : '#2196F3';
    console.log(
      `%c⚛️ [${id}] ${phase}`,
      `color: ${color}; font-weight: bold`,
      `\n  Render: ${actualDuration.toFixed(2)}ms`,
      `\n  Base: ${baseDuration.toFixed(2)}ms`,
      `\n  Start: ${startTime}ms`,
      `\n  Commit: ${commitTime}ms`
    );
  }

  // Optionally send to analytics in production
  if (process.env.NODE_ENV === 'production' && actualDuration > 16) {
    // Report slow renders (> 16ms = frame drop)
    // analytics.track('slow_render', { id, phase, actualDuration });
  }
};

export function withProfiler<P extends object>(
  Component: React.ComponentType<P>,
  config: ProfilerConfig = {}
): React.ComponentType<P> {  // ✅ Explicit return type
  const {
    id = Component.displayName || Component.name || 'Component',
    onRender = defaultOnRender,
    enabled = process.env.NODE_ENV === 'development',
  } = config;

  const Wrapped = (props: P): React.ReactElement => {  // ✅ Explicit return type
    const shouldProfile = typeof enabled === 'function' ? enabled() : enabled;

    if (!shouldProfile) {
      return React.createElement(Component, props);  // ✅ Alternative to JSX
    }

    return React.createElement(
      Profiler,
      { id, onRender },
      React.createElement(Component, props)
    );
  };

  Wrapped.displayName = `withProfiler(${id})`;
  return Wrapped;
}