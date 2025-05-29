export const canAccess = (user, allowedRoles) =>
  user && allowedRoles.includes(user.role);
