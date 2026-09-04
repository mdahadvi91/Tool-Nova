import { AdPlacement } from '../types';

// Strict blacklist of prohibited placements according to Section 15 & 64
export const FORBIDDEN_PLACEMENTS = [
  'beside-upload',
  'beside-generate',
  'beside-convert',
  'beside-process',
  'beside-result',
  'beside-download',
  'beside-nav',
  'inside-action-bar'
];

export function validatePlacementPolicy(placement: string): { isValid: boolean; reason?: string } {
  for (const forbidden of FORBIDDEN_PLACEMENTS) {
    if (placement.toLowerCase().includes(forbidden)) {
      return {
        isValid: false,
        reason: `Ad placement violation: "${placement}" conflicts with forbidden functional zone policy ("${forbidden}"). Ads must remain strictly outside the tool execution zone.`
      };
    }
  }
  return { isValid: true };
}
