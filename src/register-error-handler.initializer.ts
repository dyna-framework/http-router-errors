import { BaseInitializer } from '@dyna/core'
import { ErrorHandler, ErrorHandlerFn, Response } from '@dyna/http-router'
import { IncomingMessage, ServerResponse } from 'http'

/**
 * Register error handler initializer
 */
export class RegisterErrorHandlerInitializer extends BaseInitializer {
  async register() {
    if (this.app) {
      const handler = this.app.ex.httpRouterErrorHandler as ErrorHandler

      handler.register(this.handler.bind(this))
    }
  }

  async handler(err: unknown, req: IncomingMessage, res: ServerResponse) {
    return new Response()
  }
}
