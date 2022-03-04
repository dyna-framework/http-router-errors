import { Autoimport } from '@dyna/core'
import { RegisterErrorHandlerInitializer } from './register-error-handler.initializer'

export const DynaAutoimport: Autoimport = {
  initializers: [RegisterErrorHandlerInitializer],
}
