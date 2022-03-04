import { BaseInitializer } from '@dyna/core'
import { ErrorHandler, HttpError, Response, HttpError500 } from '@dyna/http-router'
import { IncomingMessage, ServerResponse } from 'http'
import Youch from 'youch'
import PrettyError from 'pretty-error'

/**
 * Register error handler initializer
 */
export class RegisterErrorHandlerInitializer extends BaseInitializer {
  async boot() {
    if (this.app?.ex?.httpRouterErrorHandler) {
      // Register handler
      const handler = this.app.ex.httpRouterErrorHandler as ErrorHandler
      handler.register(this.handler.bind(this))
    }
  }

  async handler(err: unknown, req: IncomingMessage, res: ServerResponse) {
    if (err) {
      // Get error (real stack)
      const error = err instanceof HttpError500 ? err.err : err

      // Error to terminal
      const terminal = new PrettyError()
      const rendered = terminal.render(error as any)
      console.error(rendered)

      // Error to browser
      const response = new Response()
      const youch = new Youch(error, req)
      const html = await youch.toHTML()
      response.html(html)
      response.status(err instanceof HttpError ? err.statusCode : 200)

      return response
    }

    return null
  }
}
