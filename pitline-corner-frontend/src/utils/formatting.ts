import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

/**
 * Format F1 lap time from seconds to "1:23.456" format
 * @param seconds - Time in seconds (e.g., 83.456)
 * @returns Formatted lap time string
 */
export function formatLapTime(seconds: number): string {
  if (seconds === 0 || !seconds) return '--:---'
  
  const mins = Math.floor(seconds / 60)
  const secs = (seconds % 60).toFixed(3)
  
  return mins > 0 ? `${mins}:${secs.padStart(6, '0')}` : secs
}

/**
 * Format gap to leader in F1 format
 * @param gapSeconds - Gap in seconds
 * @returns Formatted gap string
 */
export function formatGap(gapSeconds: number): string {
  if (gapSeconds === 0) return '0.000'
  if (!gapSeconds) return '--.---'
  
  return gapSeconds.toFixed(3)
}

/**
 * Format date in French locale
 * @param date - Date string or Date object
 * @param formatStr - Date format string (default: 'dd MMMM yyyy')
 * @returns Formatted date string
 */
export function formatDate(date: string | Date, formatStr: string = 'dd MMMM yyyy'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, formatStr, { locale: fr })
}

/**
 * Format date with time in French locale
 * @param date - Date string or Date object
 * @returns Formatted date-time string
 */
export function formatDateTime(date: string | Date): string {
  return formatDate(date, 'dd MMMM yyyy HH:mm')
}

/**
 * Format speed in km/h
 * @param speedKmh - Speed in km/h
 * @returns Formatted speed string
 */
export function formatSpeed(speedKmh: number): string {
  if (!speedKmh) return '-- km/h'
  return `${Math.round(speedKmh).toLocaleString('fr-FR')} km/h`
}

/**
 * Format position with suffix
 * @param position - Position number
 * @returns Formatted position string
 */
export function formatPosition(position: number): string {
  if (!position) return '--'
  
  const suffix = position === 1 ? 'er' : 'ème'
  
  return `${position}${suffix}`
}

/**
 * Format tire compound with emoji
 * @param compound - Tire compound code
 * @returns Formatted tire compound with emoji
 */
export function formatTireCompound(compound: string): string {
  const compounds = {
    'SOFT': '🔴 Soft',
    'MEDIUM': '🟡 Medium', 
    'HARD': '⚪ Hard',
    'INTERMEDIATE': '🟢 Intermédiaire',
    'WET': '🔵 Wet',
    'UNKNOWN': '❓ Inconnu'
  }
  
  return compounds[compound as keyof typeof compounds] || compounds.UNKNOWN
}

/**
 * Calculate position delta with sign
 * @param predicted - Predicted position
 * @param actual - Actual position
 * @returns Position delta with sign (+/-)
 */
export function calculatePositionDelta(predicted: number, actual: number): number {
  return actual - predicted
}

/**
 * Format position delta with color indicator
 * @param delta - Position delta
 * @returns Formatted delta with sign
 */
export function formatPositionDelta(delta: number): string {
  if (delta > 0) return `+${delta}`
  if (delta < 0) return `${delta}`
  return '0'
}

/**
 * Get tire compound color class
 * @param compound - Tire compound code
 * @returns Tailwind CSS color class
 */
export function getTireCompoundColor(compound: string): string {
  const colors = {
    'SOFT': 'text-tire-soft',
    'MEDIUM': 'text-tire-medium',
    'HARD': 'text-tire-hard',
    'INTERMEDIATE': 'text-tire-intermediate',
    'WET': 'text-tire-wet',
  }
  
  return colors[compound as keyof typeof colors] || 'text-gray-500'
}

/**
 * Get position delta color class
 * @param delta - Position delta
 * @returns Tailwind CSS color class
 */
export function getPositionDeltaColor(delta: number): string {
  if (delta > 0) return 'text-position-gain'
  if (delta < 0) return 'text-position-loss'
  return 'text-position-same'
}
