/**
 * Formats duration from seconds into a human-readable string matching Figma designs (e.g., "14m 22sec")
 * @param {number} seconds 
 * @returns {string}
 */
export const formatDuration = (seconds) => {
  if (!seconds || isNaN(seconds) || seconds <= 0) {
    return '0';
  }
  
  if (seconds < 60) {
    return `${seconds}sec`;
  }
  
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hrs > 0) {
    return `${hrs}h ${mins}m ${secs}sec`;
  }
  
  return `${mins}m ${secs}sec`;
};

/**
 * Formats a date into a friendly relative date (e.g., "2 days ago")
 * @param {string|Date} dateVal 
 * @returns {string}
 */
export const formatLastSession = (dateVal) => {
  if (!dateVal) return '-';
  
  const date = new Date(dateVal);
  if (isNaN(date.getTime())) return '-';
  
  const now = new Date();
  const diffMs = now - date;
  
  if (diffMs < 0) return 'Just now'; // Future safety
  
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHrs = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHrs / 24);
  const diffMonths = Math.floor(diffDays / 30);
  
  if (diffSecs < 60) {
    return 'Just now';
  } else if (diffMins < 60) {
    return `${diffMins} ${diffMins === 1 ? 'min' : 'mins'} ago`;
  } else if (diffHrs < 24) {
    return `${diffHrs} ${diffHrs === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffDays < 30) {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  } else {
    return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
  }
};

/**
 * Formats a date into 12-hour clock format with am/pm (e.g., "11:00 am")
 * @param {string|Date} dateVal 
 * @returns {string}
 */
export const formatCallTime = (dateVal) => {
  if (!dateVal) return '';
  const date = new Date(dateVal);
  if (isNaN(date.getTime())) return '';
  
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  
  return `${hours}:${formattedMinutes} ${ampm}`;
};

/**
 * Get the ordinal suffix for a number (e.g. 1 -> "1st", 22 -> "22nd")
 * @param {number} d 
 * @returns {string}
 */
const getOrdinalSuffix = (d) => {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
};

/**
 * Formats a date into Month DayName ordinal headers (e.g., "April 29th")
 * @param {string|Date} dateVal 
 * @returns {string}
 */
export const formatCallDateHeader = (dateVal) => {
  if (!dateVal) return '';
  const date = new Date(dateVal);
  if (isNaN(date.getTime())) return '';
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const monthName = months[date.getMonth()];
  const day = date.getDate();
  const suffix = getOrdinalSuffix(day);
  
  return `${monthName} ${day}${suffix}`;
};
