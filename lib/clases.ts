/** Une nombres de clase e ignora los valores vacíos. */
export function unirClases(...clases: Array<string | false | null | undefined>): string {
  return clases.filter(Boolean).join(' ');
}
