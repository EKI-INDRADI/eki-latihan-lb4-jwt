import {AuthenticationBindings, AuthenticationMetadata} from '@loopback/authentication';
import {
  Getter,
  globalInterceptor,
  inject,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise
} from '@loopback/core';
import {MyUserProfile, RequiredPermissions} from '../types';

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@globalInterceptor('', {tags: {name: 'authorize'}})
export class AuthorizeInterceptor implements Provider<Interceptor> {
  /*
  constructor() {}
  */
  constructor(
    @inject(AuthenticationBindings.METADATA)
    //injectnya pake lib loopback/core
    //public metadata: AuthenticationMetadata
    // ----29-04-2021
    public metadata: AuthenticationMetadata,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    public getCurrentUser: Getter<MyUserProfile>,
    // ----29-04-2021


  ) { }






  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    try {
      // Add pre-invocation logic here
      console.log('Log from authorize global interceptor')
      console.log(this.metadata);

      // ----25-04-2021
      // if you will not  provide options in your @authenticate decorator
      // this line will be executed
      if (!this.metadata) return await next();
      // ----25-04-2021


      const result = await next();

      // ----25-04-2021
      const requiredPermissions = this.metadata.options as RequiredPermissions
      // RequiredPermissions dari src/types.ts

      console.log(requiredPermissions)
      // ----25-04-2021

      // ----29-04-2021
      // check user permission
      // console.log(requiredPermissions)
      const user = await this.getCurrentUser()
      console.log('User Permissions: ', user.permissions);
      // ----29-04-2021

      // Add post-invocation logic here
      return result;
    } catch (err) {
      // Add error handling logic here
      throw err;
    }
  }
}
