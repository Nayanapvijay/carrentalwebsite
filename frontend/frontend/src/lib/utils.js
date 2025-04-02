/**
 * Utility function to conditionally join class names
 */
export function cn(...classes) {
    return classes.filter(Boolean).join(" ")
  }
  
  /**
   * Format a date to a string
   * @param {Date} date - The date to format
   * @param {string} format - The format to use
   * @returns {string} The formatted date
   */
  export function formatDate(date = "MMM dd, yyyy") {
    if (!date) return ""
    const d = new Date(date)
    return d.toLocaleDateString()
  }
  
  /**
   * Format a number as currency
   * @param {number} amount - The amount to format
   * @param {string} currency - The currency to use
   * @returns {string} The formatted currency
   */
  export function formatCurrency(amount, currency = "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount)
  }
  
  /**
   * Calculate the duration between two dates in days
   * @param {Date} startDate - The start date
   * @param {Date} endDate - The end date
   * @returns {number} The duration in days
   */
  export function calculateDuration(startDate, endDate) {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }
  
  