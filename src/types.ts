export type ParsedStyleObject = {
  [key: string]: string
}

export type Config = {
  prefix?: string
  createElement?: any
  shouldForwardProp?: ((name: string) => boolean) | undefined
  theme?: any
}

export type StyleObject = unknown
export type StyleApplyFn = <T>(props?: T, theme?: any) => unknown
export type Styles = StyleObject | StyleApplyFn