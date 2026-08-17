// // src/profiler.ts
// import { Profiler, ProfilerOnRenderCallback } from 'react';

// // Track all renders
// const trackedComponents = new Map<string, number>();

// export const onRenderCallback: ProfilerOnRenderCallback = (
//   id,
//   phase,
//   actualDuration,
//   baseDuration,
//   startTime,
//   commitTime
// ) => {
//   // Track render counts
//   const count = (trackedComponents.get(id) || 0) + 1;
//   trackedComponents.set(id, count);

//   // Log slow renders
//   if (actualDuration > 16) { // > 1 frame at 60fps
//     console.warn(`🐌 Slow render: ${id} took ${actualDuration.toFixed(2)}ms`);

//     // You could send this to your monitoring service
//     // analytics.track('slow_render', { component: id, duration: actualDuration });
//   }

//   // Log excessive renders
//   if (count > 10 && phase === 'update') {
//     console.warn(`🔄 ${id} has rendered ${count} times`);
//   }
// };

// // Use in components
// export const withProfiler = (Component: React.ComponentType<any>, id: string) => {
//   return (props: any) => (
//     <Profiler id={id} onRender={onRenderCallback}>
//       <Component {...props} />
//     </Profiler>
//   );
// };
