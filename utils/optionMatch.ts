import { IOption } from '@/types/types'

/**
 *
 * @param value value to find
 * @param options options to match
 * @returns string
 */
export const optionMatch = (
  value: string | undefined,
  options: IOption[] | undefined
) => {
  return (
    options?.find((element) => element.value === value)?.label || value || ''
  )
}
