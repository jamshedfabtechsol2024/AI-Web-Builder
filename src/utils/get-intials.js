// utils/getInitials.js
export const getInitials = (firstName = "", lastName = "") => {
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }
  if (firstName) {
    return firstName.slice(0, 2).toUpperCase();
  }
  return "??"; // fallback if no name
};
