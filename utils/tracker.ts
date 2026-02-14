// tracker.ts

/**
 * Function to get the current date and time in UTC.
 * @returns {string} - Current date and time in 'YYYY-MM-DD HH:MM:SS' format
 */
function getCurrentDateTimeUTC() {
    const now = new Date();
    return now.toISOString().replace('T', ' ').split('.')[0];
}

/**
 * Function to format a date to 'YYYY-MM-DD' format.
 * @param {Date} date - Date object to format
 * @returns {string} - Formatted date string
 */
function formatDate(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export { getCurrentDateTimeUTC, formatDate };