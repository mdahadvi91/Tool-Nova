import React, { useEffect, useRef } from 'react';
import { AdPlacement } from '../types';
import { adManager } from '../core/AdManager';
import { validatePlacementPolicy } from '../policies/placementPolicy';

interface AdSlotProps {
  placement: AdPlacement;
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ placement, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Validate policy upfront
  const policy = validatePlacementPolicy(placement);
  if (!policy.isValid) {
    if ((import.meta as ImportMeta & { env?: { DEV?: boolean } }).env?.DEV) {
      console.error(policy.reason);
    }
    return null;
  }

  useEffect(() => {
    if (containerRef.current) {
      adManager.renderSlot(containerRef.current, placement).catch((err) => {
        console.warn('Failed to render ad slot:', err);
      });
    }
  }, [placement]);

  return (
    <div
      id={`ad-${placement}`}
      ref={containerRef}
      className={`ad-slot-container my-6 w-full flex justify-center ${className}`}
      data-ad-placement={placement}
    />
  );
};
