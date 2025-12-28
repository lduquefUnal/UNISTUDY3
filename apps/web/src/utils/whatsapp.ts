
/**
 * Opens a WhatsApp chat with the specified phone number and optional message.
 * Automatically detects desktop vs mobile to use the appropriate URL scheme.
 * 
 * @param phone Phone number (with country code, e.g., '573001234567')
 * @param message Optional message to pre-fill
 */
export const openWhatsApp = (phone: string, message?: string) => {
    // Clean phone number (remove +, spaces, dashes)
    const cleanPhone = phone.replace(/\D/g, '');
    const encodedMessage = message ? encodeURIComponent(message) : '';

    // Simple mobile detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        // Mobile: use wa.me which triggers the app intent
        const url = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
        window.open(url, '_blank');
    } else {
        // Desktop: force web.whatsapp.com to avoid "Open App" popup
        const url = `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encodedMessage}`;
        // Use a specific window name to try reuse (though browser security might block it, it's worth a try)
        window.open(url, 'whatsapp_web');
    }
};

/**
 * Returns the URL string for href attributes, falling back to wa.me 
 * (since we can't detect click context easily in a pure href string without JS)
 * Ideally use an onClick handler with openWhatsApp instead.
 */
export const getWhatsAppUrl = (phone: string, message?: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const encodedMessage = message ? encodeURIComponent(message) : '';

    // Default to wa.me for hrefs as it's safer for universal links if JS fails
    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};
