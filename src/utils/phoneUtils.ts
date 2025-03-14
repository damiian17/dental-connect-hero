
/**
 * Formats a phone number to ensure it has the Spanish country code
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Make sure the number starts with Spain's country code
  if (cleaned.startsWith('34')) {
    return cleaned;
  } else {
    return `34${cleaned}`;
  }
};
