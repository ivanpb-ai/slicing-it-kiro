
import { QoSValues } from '../../../types/nodeTypes';
import { fiveQIValues } from '../data/fiveQIData';

/**
 * Parameters that drive the visual animation of a QoS flow path,
 * derived from the 5QI characteristics (resource type, priority, latency).
 */
export interface AnimationParams {
  strokeWidth: number;
  strokeWidthPulse: number;
  animationDuration: number;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  dashArray: string;
  glowColor: string;
  glowSize: number;
  categoryLabel: string;
}

/**
 * Derive animation visual parameters from 5QI QoS values.
 *
 * - Thicker lines for GBR / higher-priority flows (more guaranteed throughput)
 * - Faster pulsing for lower packet delay (lower latency)
 * - Color palette reflects resource type and priority tier
 * - Dash pattern shortens for lower latency (more urgent appearance)
 */
export const getAnimationParamsFromQoS = (qosValues: QoSValues): AnimationParams => {
  const priority = parseInt(qosValues.priority) || 50;
  const delayMs = parseInt(qosValues.packetDelay) || 100;
  const isGBR = qosValues.resourceType === 'GBR';

  // --- Animation speed: lower delay → faster pulse ---
  // 5 ms → ~0.4 s, 100 ms → ~1.2 s, 500 ms → ~2.8 s (log scale)
  const animationDuration = parseFloat(
    Math.max(0.4, Math.min(3.0, 0.3 + Math.log(delayMs / 5 + 1) * 0.55)).toFixed(2)
  );

  // --- Stroke width: GBR thicker; lower priority number = more important = thicker ---
  let strokeWidth: number;
  if (isGBR) {
    strokeWidth = priority <= 10 ? 10 : priority <= 25 ? 8 : priority <= 50 ? 7 : 6;
  } else {
    strokeWidth = priority <= 10 ? 7 : priority <= 25 ? 6 : priority <= 60 ? 5 : 4;
  }
  const strokeWidthPulse = strokeWidth + (isGBR ? 4 : 3);

  // --- Color palette based on resource type + priority tier ---
  let primaryColor: string;
  let secondaryColor: string;
  let tertiaryColor: string;
  let glowColor: string;

  if (isGBR) {
    if (priority <= 10) {
      // Mission-critical GBR — red
      primaryColor = '#ef4444'; secondaryColor = '#dc2626';
      tertiaryColor = '#b91c1c'; glowColor = '#ef4444';
    } else if (priority <= 25) {
      // High-priority GBR — orange
      primaryColor = '#f97316'; secondaryColor = '#ea580c';
      tertiaryColor = '#c2410c'; glowColor = '#f97316';
    } else {
      // Standard GBR — amber
      primaryColor = '#f59e0b'; secondaryColor = '#d97706';
      tertiaryColor = '#b45309'; glowColor = '#f59e0b';
    }
  } else {
    if (priority <= 10) {
      // High-priority Non-GBR — teal
      primaryColor = '#14b8a6'; secondaryColor = '#0d9488';
      tertiaryColor = '#0f766e'; glowColor = '#14b8a6';
    } else if (priority <= 50) {
      // Standard Non-GBR — cyan
      primaryColor = '#06b6d4'; secondaryColor = '#0891b2';
      tertiaryColor = '#0e7490'; glowColor = '#06b6d4';
    } else {
      // Best-effort Non-GBR — sky blue
      primaryColor = '#38bdf8'; secondaryColor = '#0ea5e9';
      tertiaryColor = '#0284c7'; glowColor = '#38bdf8';
    }
  }

  // --- Dash pattern: shorter dashes for lower latency ---
  const dashLength = Math.round(Math.max(8, Math.min(25, delayMs / 12)));
  const gapLength = Math.round(Math.max(5, Math.min(15, delayMs / 22)));
  const dashArray = `${dashLength},${gapLength}`;

  // --- Glow size: bigger for higher-priority ---
  const glowSize = priority <= 10 ? 10 : priority <= 25 ? 7 : 4;

  // --- Human-readable category label ---
  let categoryLabel: string;
  if (isGBR) {
    categoryLabel = priority <= 10 ? 'Mission Critical GBR' : priority <= 25 ? 'High Priority GBR' : 'Standard GBR';
  } else {
    categoryLabel = priority <= 10 ? 'High Priority' : priority <= 50 ? 'Standard' : 'Best Effort';
  }

  return {
    strokeWidth, strokeWidthPulse, animationDuration,
    primaryColor, secondaryColor, tertiaryColor,
    dashArray, glowColor, glowSize, categoryLabel,
  };
};

/**
 * Get a random 5QI value
 * @returns A random QoSValues object
 */
export const getRandomFiveQIValue = (): QoSValues => {
  return fiveQIValues[Math.floor(Math.random() * fiveQIValues.length)];
};

/**
 * Get a specific 5QI value by ID
 * @param id The 5QI ID to look up
 * @returns The QoSValues object for the given ID, or null if not found
 */
export const getFiveQIValueById = (id: string): QoSValues | null => {
  if (!id) {
    console.warn("getFiveQIValueById called with empty ID");
    return null;
  }
  
  console.log(`Looking up 5QI with ID: "${id}"`);
  
  // Normalize the ID to a string for consistent comparison
  const normalizedId = String(id).trim();
  
  // Find the exact match with normalized comparison
  const match = fiveQIValues.find(qos => String(qos.value).trim() === normalizedId);
  
  if (match) {
    console.log(`Found matching 5QI for ID "${id}":`, match);
    // Return a deep copy to avoid reference issues
    const copy = JSON.parse(JSON.stringify(match));
    // Ensure the value is exactly the ID that was requested
    copy.value = normalizedId;
    return copy;
  }
  
  console.warn(`No matching 5QI found for ID "${id}"`);
  return null; // Return null if not found
};

/**
 * Get service name from 5QI value for naming DNN nodes
 * @param fiveQIValue The 5QI value to get the service name for
 * @returns A simplified service name suitable for use as a DNN name
 */
export const getServiceNameFromFiveQI = (fiveQIValue?: string): string => {
  if (!fiveQIValue) return 'Unknown Service';
  
  const qos = fiveQIValues.find(q => q.value === fiveQIValue);
  if (!qos) return 'Unknown Service';
  
  // Get the service name and format it for use as a DNN name
  const serviceName = qos.service;
  
  // Extract the main part of the service description (before any commas or special chars)
  let simplifiedName = serviceName.split(',')[0].split('(')[0].trim();
  
  // Convert to lowercase and replace spaces with hyphens
  simplifiedName = simplifiedName.toLowerCase().replace(/\s+/g, '-');
  
  return simplifiedName;
};
