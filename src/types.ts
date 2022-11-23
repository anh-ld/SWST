export type ParsedStyleObject = {
  [key: string]: string
}

export type Config = {
  prefix?: string
  createElement?: any
  forwardRef?: any
  shouldForwardProp?: ((name: string) => boolean) | undefined
}