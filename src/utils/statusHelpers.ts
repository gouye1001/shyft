/**
 * Status Helpers Utility
 * Centralized functions for mapping statuses to UI variants.
 */

import type { JobStatus, InvoiceStatus, TeamMemberStatus, TeamAvailability } from '../types';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'default';

/**
 * Get badge variant for job status
 */
export function getJobStatusVariant(status: JobStatus): BadgeVariant {
    switch (status) {
        case 'completed':
            return 'success';
        case 'in-progress':
            return 'info';
        case 'scheduled':
            return 'warning';
        case 'cancelled':
            return 'danger';
        default:
            return 'default';
    }
}

/**
 * Get badge variant for invoice status
 */
export function getInvoiceStatusVariant(status: InvoiceStatus): BadgeVariant {
    switch (status) {
        case 'paid':
            return 'success';
        case 'pending':
            return 'warning';
        case 'overdue':
            return 'danger';
        default:
            return 'default';
    }
}

/**
 * Get badge variant for team member status
 */
export function getTeamStatusVariant(status: TeamMemberStatus): BadgeVariant {
    switch (status) {
        case 'active':
            return 'success';
        case 'pending':
            return 'warning';
        case 'inactive':
            return 'danger';
        default:
            return 'default';
    }
}

/**
 * Get badge variant for team availability
 */
export function getAvailabilityVariant(availability: TeamAvailability): BadgeVariant {
    switch (availability) {
        case 'available':
            return 'success';
        case 'on-job':
            return 'info';
        case 'off-duty':
            return 'default';
        default:
            return 'default';
    }
}

/**
 * Get human-readable label for job status
 */
export function getJobStatusLabel(status: JobStatus): string {
    switch (status) {
        case 'in-progress':
            return 'In Progress';
        case 'scheduled':
            return 'Scheduled';
        case 'completed':
            return 'Completed';
        case 'cancelled':
            return 'Cancelled';
        default:
            return status;
    }
}

/**
 * Get human-readable label for availability
 */
export function getAvailabilityLabel(availability: TeamAvailability): string {
    switch (availability) {
        case 'on-job':
            return 'On Job';
        case 'off-duty':
            return 'Off Duty';
        case 'available':
            return 'Available';
        default:
            return availability;
    }
}
