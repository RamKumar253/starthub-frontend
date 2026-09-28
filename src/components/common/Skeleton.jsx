import React from 'react';

/** Skeleton pulse bar */
export function SkeletonBar({ className = '' }) {
  return <div className={`skeleton rounded-lg ${className}`} />;
}

/** Skeleton for a service card */
export function ServiceCardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton h-36 w-full rounded-t-2xl rounded-b-none" />
      <div className="p-5 space-y-3">
        <SkeletonBar className="h-4 w-3/4" />
        <SkeletonBar className="h-3 w-full" />
        <SkeletonBar className="h-3 w-2/3" />
        <div className="flex gap-2 pt-1">
          <SkeletonBar className="h-6 w-16 rounded-full" />
          <SkeletonBar className="h-6 w-14 rounded-full" />
        </div>
        <div className="flex justify-between pt-3 border-t border-slate-100">
          <SkeletonBar className="h-5 w-20" />
          <SkeletonBar className="h-8 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

/** Skeleton for a freelancer card */
export function FreelancerCardSkeleton() {
  return (
    <div className="skeleton-card p-5 space-y-4">
      <div className="flex items-start gap-4">
        <SkeletonBar className="skeleton-avatar w-14 h-14 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <SkeletonBar className="h-4 w-2/3" />
          <SkeletonBar className="h-3 w-1/2" />
          <SkeletonBar className="h-5 w-20 rounded-full" />
        </div>
      </div>
      <div className="flex gap-2">
        <SkeletonBar className="h-6 w-16 rounded-full" />
        <SkeletonBar className="h-6 w-14 rounded-full" />
        <SkeletonBar className="h-6 w-16 rounded-full" />
      </div>
      <div className="flex justify-between items-center pt-2 border-t border-slate-100">
        <SkeletonBar className="h-3 w-24" />
        <SkeletonBar className="h-8 w-28 rounded-xl" />
      </div>
    </div>
  );
}

/** Skeleton for a booking card */
export function BookingCardSkeleton() {
  return (
    <div className="skeleton-card p-5 space-y-4">
      <div className="flex justify-between">
        <div className="space-y-2 flex-1">
          <SkeletonBar className="h-4 w-3/4" />
          <SkeletonBar className="h-3 w-1/2" />
        </div>
        <SkeletonBar className="h-6 w-20 rounded-full" />
      </div>
      <SkeletonBar className="h-12 w-full rounded-xl" />
      <div className="grid grid-cols-3 gap-3">
        {[1,2,3].map(i => (
          <div key={i} className="space-y-2">
            <SkeletonBar className="h-3 w-full" />
            <SkeletonBar className="h-3 w-2/3 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Generic stat card skeleton */
export function StatCardSkeleton() {
  return (
    <div className="skeleton-card p-5">
      <div className="flex justify-between items-start mb-4">
        <SkeletonBar className="w-10 h-10 rounded-xl" />
        <SkeletonBar className="h-5 w-14 rounded-full" />
      </div>
      <SkeletonBar className="h-7 w-20 mb-2" />
      <SkeletonBar className="h-3 w-28" />
    </div>
  );
}

/** Grid of service card skeletons */
export function ServiceGridSkeleton({ count = 6 }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <ServiceCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Grid of freelancer card skeletons */
export function FreelancerGridSkeleton({ count = 6 }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <FreelancerCardSkeleton key={i} />
      ))}
    </div>
  );
}
