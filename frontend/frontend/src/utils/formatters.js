// Date formatters
export const formatDate = (date) => {
    if (!date) return ""
    const d = new Date(date)
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
  
  export const formatDateTime = (date) => {
    if (!date) return ""
    const d = new Date(date)
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
  
  export const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return ""
    return `${formatDate(startDate)} - ${formatDate(endDate)}`
  }
  
  // Currency formatters
  export const formatCurrency = (amount, currency = "USD") => {
    if (amount === undefined || amount === null) return ""
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount)
  }
  
  export const formatPrice = (price) => {
    if (price === undefined || price === null) return ""
    return `$${price}`
  }
  
  // Text formatters
  export const capitalizeFirstLetter = (string) => {
    if (!string) return ""
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  
  export const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text
    return text.slice(0, maxLength) + "..."
  }
  
  // Duration formatters
  export const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }
  
  export const formatDuration = (days) => {
    if (days === 1) return "1 day"
    return `${days} days`
  }
  
  // Phone number formatter
  export const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return ""
    const cleaned = ("" + phoneNumber).replace(/\D/g, "")
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3]
    }
    return phoneNumber
  }
  
  