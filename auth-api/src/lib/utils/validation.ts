/**
 *
 * @param username validete username length
 * @returns true is username lenght is greater than 3 characters, false otherwise
 */
export const isValidUsername = (username: string): boolean => {
  return username.length >= 3
}

/**
 *
 * @param password validate user's password
 * @returns true is user password has at least:
 * - One digit number
 * - More than 8 caracter
 * - one capital letter
 */
export const isValidPwdFormat = (password: string): boolean => {
  const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/
  return regex.test(password)
}

/**
 *
 * @param email validate user's email
 * @returns true if:
 * - include "@""
 * - at least one character before @
 * - domain
 */
export const isValidEmailFormat = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}
