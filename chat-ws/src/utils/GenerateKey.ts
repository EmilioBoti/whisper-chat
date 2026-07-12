export const generateUniqueKey = (userId: string, userBId: string): string => {
  return [userId, userBId].sort().join('_')
}
