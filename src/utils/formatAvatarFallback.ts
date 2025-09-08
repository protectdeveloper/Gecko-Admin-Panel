export function formatAvatarFallback(firstName?: string, lastName?: string): string {
  const firstInitial = firstName?.charAt(0) || '';
  const lastInitial = lastName && lastName.includes(' ') ? lastName.charAt(lastName.indexOf(' ') + 1) : lastName?.charAt(0) || '';

  const initials = `${firstInitial}${lastInitial}`;
  const restrictedInitials = ['AM', 'OÇ', 'OE', 'OC', 'İT'];

  return restrictedInitials.includes(initials.toUpperCase()) ? firstInitial : initials;
}
