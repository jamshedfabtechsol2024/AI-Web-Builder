/**
 * Utility functions for smooth scrolling and navigation
 */

/**
 * Smoothly scrolls to an element by ID
 * @param {string} elementId - The ID of the element to scroll to
 * @param {Object} options - Scroll options
 * @param {string} options.behavior - Scroll behavior ('smooth' | 'instant' | 'auto')
 * @param {string} options.inline - Horizontal alignment ('start' | 'center' | 'end' | 'nearest')
 * @param {number} options.offset - Additional offset in pixels
 * @returns {boolean} - Whether the scroll was successful
 */
export const scrollToElement = (elementId, options = {}) => {
  const { behavior = "smooth", inline = "nearest", offset = 0 } = options;

  const element = document.getElementById(elementId);

  if (!element) {
    return false;
  }

  const elementRect = element.getBoundingClientRect();
  const absoluteElementTop = elementRect.top + window.pageYOffset;
  const targetPosition = absoluteElementTop - offset;

  window.scrollTo({
    top: targetPosition,
    behavior,
    inline,
  });

  return true;
};

/**
 * Handles navigation click events with scroll support
 * @param {string} path - The navigation path
 * @param {Event} event - The click event
 * @param {Function} onMenuClose - Callback to close mobile menu
 * @param {Function} onNavigate - Callback for regular navigation
 * @returns {boolean} - Whether the event was handled
 */
export const handleNavigationClick = (path, event, onMenuClose, onNavigate) => {
  // Handle hash links for smooth scrolling
  if (path.startsWith("#")) {
    event.preventDefault();
    const elementId = path.slice(1); // Remove the # symbol

    if (scrollToElement(elementId)) {
      onMenuClose?.(); // Close mobile menu if provided
      return true;
    }
  }

  // Handle regular navigation
  onNavigate?.(path);
  onMenuClose?.();
  return false;
};

/**
 * Checks if a path is currently active
 * @param {string} path - The path to check
 * @param {string} currentPath - The current location pathname
 * @returns {boolean} - Whether the path is active
 */
export const isPathActive = (path, currentPath) => {
  if (path === "/" && currentPath === "/") {
    return true;
  }
  return currentPath === path;
};

/**
 * Debounced scroll handler for performance optimization
 * @param {Function} callback - The callback function to execute
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} - The debounced function
 */
export const createDebouncedScrollHandler = (callback, delay = 16) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
};
