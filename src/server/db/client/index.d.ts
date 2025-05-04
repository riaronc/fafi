
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model accounts
 * 
 */
export type accounts = $Result.DefaultSelection<Prisma.$accountsPayload>
/**
 * Model transactions
 * 
 */
export type transactions = $Result.DefaultSelection<Prisma.$transactionsPayload>
/**
 * Model categories
 * 
 */
export type categories = $Result.DefaultSelection<Prisma.$categoriesPayload>
/**
 * Model budgets
 * 
 */
export type budgets = $Result.DefaultSelection<Prisma.$budgetsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AccountType: {
  CHECKING: 'CHECKING',
  SAVINGS: 'SAVINGS',
  CREDIT: 'CREDIT',
  INVESTMENT: 'INVESTMENT',
  CASH: 'CASH'
};

export type AccountType = (typeof AccountType)[keyof typeof AccountType]


export const TransactionType: {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
  TRANSFER: 'TRANSFER'
};

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]


export const CategoryType: {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
  BOTH: 'BOTH'
};

export type CategoryType = (typeof CategoryType)[keyof typeof CategoryType]


export const BudgetPeriod: {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  YEARLY: 'YEARLY'
};

export type BudgetPeriod = (typeof BudgetPeriod)[keyof typeof BudgetPeriod]

}

export type AccountType = $Enums.AccountType

export const AccountType: typeof $Enums.AccountType

export type TransactionType = $Enums.TransactionType

export const TransactionType: typeof $Enums.TransactionType

export type CategoryType = $Enums.CategoryType

export const CategoryType: typeof $Enums.CategoryType

export type BudgetPeriod = $Enums.BudgetPeriod

export const BudgetPeriod: typeof $Enums.BudgetPeriod

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.users.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.users.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.accounts`: Exposes CRUD operations for the **accounts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.accounts.findMany()
    * ```
    */
  get accounts(): Prisma.accountsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transactions`: Exposes CRUD operations for the **transactions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transactions.findMany()
    * ```
    */
  get transactions(): Prisma.transactionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.categories`: Exposes CRUD operations for the **categories** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.categories.findMany()
    * ```
    */
  get categories(): Prisma.categoriesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.budgets`: Exposes CRUD operations for the **budgets** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Budgets
    * const budgets = await prisma.budgets.findMany()
    * ```
    */
  get budgets(): Prisma.budgetsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    users: 'users',
    accounts: 'accounts',
    transactions: 'transactions',
    categories: 'categories',
    budgets: 'budgets'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "users" | "accounts" | "transactions" | "categories" | "budgets"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      accounts: {
        payload: Prisma.$accountsPayload<ExtArgs>
        fields: Prisma.accountsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.accountsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.accountsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountsPayload>
          }
          findFirst: {
            args: Prisma.accountsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.accountsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountsPayload>
          }
          findMany: {
            args: Prisma.accountsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountsPayload>[]
          }
          create: {
            args: Prisma.accountsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountsPayload>
          }
          createMany: {
            args: Prisma.accountsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.accountsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountsPayload>[]
          }
          delete: {
            args: Prisma.accountsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountsPayload>
          }
          update: {
            args: Prisma.accountsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountsPayload>
          }
          deleteMany: {
            args: Prisma.accountsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.accountsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.accountsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountsPayload>[]
          }
          upsert: {
            args: Prisma.accountsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountsPayload>
          }
          aggregate: {
            args: Prisma.AccountsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccounts>
          }
          groupBy: {
            args: Prisma.accountsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountsGroupByOutputType>[]
          }
          count: {
            args: Prisma.accountsCountArgs<ExtArgs>
            result: $Utils.Optional<AccountsCountAggregateOutputType> | number
          }
        }
      }
      transactions: {
        payload: Prisma.$transactionsPayload<ExtArgs>
        fields: Prisma.transactionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.transactionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.transactionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload>
          }
          findFirst: {
            args: Prisma.transactionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.transactionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload>
          }
          findMany: {
            args: Prisma.transactionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload>[]
          }
          create: {
            args: Prisma.transactionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload>
          }
          createMany: {
            args: Prisma.transactionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.transactionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload>[]
          }
          delete: {
            args: Prisma.transactionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload>
          }
          update: {
            args: Prisma.transactionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload>
          }
          deleteMany: {
            args: Prisma.transactionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.transactionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.transactionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload>[]
          }
          upsert: {
            args: Prisma.transactionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload>
          }
          aggregate: {
            args: Prisma.TransactionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransactions>
          }
          groupBy: {
            args: Prisma.transactionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.transactionsCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionsCountAggregateOutputType> | number
          }
        }
      }
      categories: {
        payload: Prisma.$categoriesPayload<ExtArgs>
        fields: Prisma.categoriesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.categoriesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.categoriesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          findFirst: {
            args: Prisma.categoriesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.categoriesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          findMany: {
            args: Prisma.categoriesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>[]
          }
          create: {
            args: Prisma.categoriesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          createMany: {
            args: Prisma.categoriesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.categoriesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>[]
          }
          delete: {
            args: Prisma.categoriesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          update: {
            args: Prisma.categoriesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          deleteMany: {
            args: Prisma.categoriesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.categoriesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.categoriesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>[]
          }
          upsert: {
            args: Prisma.categoriesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          aggregate: {
            args: Prisma.CategoriesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategories>
          }
          groupBy: {
            args: Prisma.categoriesGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoriesGroupByOutputType>[]
          }
          count: {
            args: Prisma.categoriesCountArgs<ExtArgs>
            result: $Utils.Optional<CategoriesCountAggregateOutputType> | number
          }
        }
      }
      budgets: {
        payload: Prisma.$budgetsPayload<ExtArgs>
        fields: Prisma.budgetsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.budgetsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$budgetsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.budgetsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$budgetsPayload>
          }
          findFirst: {
            args: Prisma.budgetsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$budgetsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.budgetsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$budgetsPayload>
          }
          findMany: {
            args: Prisma.budgetsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$budgetsPayload>[]
          }
          create: {
            args: Prisma.budgetsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$budgetsPayload>
          }
          createMany: {
            args: Prisma.budgetsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.budgetsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$budgetsPayload>[]
          }
          delete: {
            args: Prisma.budgetsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$budgetsPayload>
          }
          update: {
            args: Prisma.budgetsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$budgetsPayload>
          }
          deleteMany: {
            args: Prisma.budgetsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.budgetsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.budgetsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$budgetsPayload>[]
          }
          upsert: {
            args: Prisma.budgetsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$budgetsPayload>
          }
          aggregate: {
            args: Prisma.BudgetsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBudgets>
          }
          groupBy: {
            args: Prisma.budgetsGroupByArgs<ExtArgs>
            result: $Utils.Optional<BudgetsGroupByOutputType>[]
          }
          count: {
            args: Prisma.budgetsCountArgs<ExtArgs>
            result: $Utils.Optional<BudgetsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    users?: usersOmit
    accounts?: accountsOmit
    transactions?: transactionsOmit
    categories?: categoriesOmit
    budgets?: budgetsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    accounts: number
    transactions: number
    categories: number
    budgets: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UsersCountOutputTypeCountAccountsArgs
    transactions?: boolean | UsersCountOutputTypeCountTransactionsArgs
    categories?: boolean | UsersCountOutputTypeCountCategoriesArgs
    budgets?: boolean | UsersCountOutputTypeCountBudgetsArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: accountsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: transactionsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: categoriesWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountBudgetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: budgetsWhereInput
  }


  /**
   * Count Type AccountsCountOutputType
   */

  export type AccountsCountOutputType = {
    sourceTransactions: number
    destinationTransactions: number
  }

  export type AccountsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sourceTransactions?: boolean | AccountsCountOutputTypeCountSourceTransactionsArgs
    destinationTransactions?: boolean | AccountsCountOutputTypeCountDestinationTransactionsArgs
  }

  // Custom InputTypes
  /**
   * AccountsCountOutputType without action
   */
  export type AccountsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountsCountOutputType
     */
    select?: AccountsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AccountsCountOutputType without action
   */
  export type AccountsCountOutputTypeCountSourceTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: transactionsWhereInput
  }

  /**
   * AccountsCountOutputType without action
   */
  export type AccountsCountOutputTypeCountDestinationTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: transactionsWhereInput
  }


  /**
   * Count Type CategoriesCountOutputType
   */

  export type CategoriesCountOutputType = {
    transactions: number
    budgets: number
  }

  export type CategoriesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | CategoriesCountOutputTypeCountTransactionsArgs
    budgets?: boolean | CategoriesCountOutputTypeCountBudgetsArgs
  }

  // Custom InputTypes
  /**
   * CategoriesCountOutputType without action
   */
  export type CategoriesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesCountOutputType
     */
    select?: CategoriesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoriesCountOutputType without action
   */
  export type CategoriesCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: transactionsWhereInput
  }

  /**
   * CategoriesCountOutputType without action
   */
  export type CategoriesCountOutputTypeCountBudgetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: budgetsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    monobankToken: string | null
  }

  export type UsersMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    monobankToken: string | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    createdAt: number
    updatedAt: number
    monobankToken: number
    _all: number
  }


  export type UsersMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    monobankToken?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    monobankToken?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    monobankToken?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string
    createdAt: Date
    updatedAt: Date
    monobankToken: string | null
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    monobankToken?: boolean
    accounts?: boolean | users$accountsArgs<ExtArgs>
    transactions?: boolean | users$transactionsArgs<ExtArgs>
    categories?: boolean | users$categoriesArgs<ExtArgs>
    budgets?: boolean | users$budgetsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    monobankToken?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    monobankToken?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    monobankToken?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "createdAt" | "updatedAt" | "monobankToken", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | users$accountsArgs<ExtArgs>
    transactions?: boolean | users$transactionsArgs<ExtArgs>
    categories?: boolean | users$categoriesArgs<ExtArgs>
    budgets?: boolean | users$budgetsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      accounts: Prisma.$accountsPayload<ExtArgs>[]
      transactions: Prisma.$transactionsPayload<ExtArgs>[]
      categories: Prisma.$categoriesPayload<ExtArgs>[]
      budgets: Prisma.$budgetsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string
      createdAt: Date
      updatedAt: Date
      monobankToken: string | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends users$accountsArgs<ExtArgs> = {}>(args?: Subset<T, users$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$accountsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions<T extends users$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, users$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    categories<T extends users$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, users$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    budgets<T extends users$budgetsArgs<ExtArgs> = {}>(args?: Subset<T, users$budgetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly password: FieldRef<"users", 'String'>
    readonly name: FieldRef<"users", 'String'>
    readonly createdAt: FieldRef<"users", 'DateTime'>
    readonly updatedAt: FieldRef<"users", 'DateTime'>
    readonly monobankToken: FieldRef<"users", 'String'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.accounts
   */
  export type users$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the accounts
     */
    select?: accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the accounts
     */
    omit?: accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountsInclude<ExtArgs> | null
    where?: accountsWhereInput
    orderBy?: accountsOrderByWithRelationInput | accountsOrderByWithRelationInput[]
    cursor?: accountsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountsScalarFieldEnum | AccountsScalarFieldEnum[]
  }

  /**
   * users.transactions
   */
  export type users$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    where?: transactionsWhereInput
    orderBy?: transactionsOrderByWithRelationInput | transactionsOrderByWithRelationInput[]
    cursor?: transactionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionsScalarFieldEnum | TransactionsScalarFieldEnum[]
  }

  /**
   * users.categories
   */
  export type users$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    where?: categoriesWhereInput
    orderBy?: categoriesOrderByWithRelationInput | categoriesOrderByWithRelationInput[]
    cursor?: categoriesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoriesScalarFieldEnum | CategoriesScalarFieldEnum[]
  }

  /**
   * users.budgets
   */
  export type users$budgetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the budgets
     */
    select?: budgetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the budgets
     */
    omit?: budgetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: budgetsInclude<ExtArgs> | null
    where?: budgetsWhereInput
    orderBy?: budgetsOrderByWithRelationInput | budgetsOrderByWithRelationInput[]
    cursor?: budgetsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BudgetsScalarFieldEnum | BudgetsScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Model accounts
   */

  export type AggregateAccounts = {
    _count: AccountsCountAggregateOutputType | null
    _avg: AccountsAvgAggregateOutputType | null
    _sum: AccountsSumAggregateOutputType | null
    _min: AccountsMinAggregateOutputType | null
    _max: AccountsMaxAggregateOutputType | null
  }

  export type AccountsAvgAggregateOutputType = {
    balance: number | null
  }

  export type AccountsSumAggregateOutputType = {
    balance: number | null
  }

  export type AccountsMinAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.AccountType | null
    balance: number | null
    currency: string | null
    bankId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type AccountsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.AccountType | null
    balance: number | null
    currency: string | null
    bankId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type AccountsCountAggregateOutputType = {
    id: number
    name: number
    type: number
    balance: number
    currency: number
    bankId: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type AccountsAvgAggregateInputType = {
    balance?: true
  }

  export type AccountsSumAggregateInputType = {
    balance?: true
  }

  export type AccountsMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    balance?: true
    currency?: true
    bankId?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type AccountsMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    balance?: true
    currency?: true
    bankId?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type AccountsCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    balance?: true
    currency?: true
    bankId?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type AccountsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which accounts to aggregate.
     */
    where?: accountsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of accounts to fetch.
     */
    orderBy?: accountsOrderByWithRelationInput | accountsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: accountsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned accounts
    **/
    _count?: true | AccountsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountsMaxAggregateInputType
  }

  export type GetAccountsAggregateType<T extends AccountsAggregateArgs> = {
        [P in keyof T & keyof AggregateAccounts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccounts[P]>
      : GetScalarType<T[P], AggregateAccounts[P]>
  }




  export type accountsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: accountsWhereInput
    orderBy?: accountsOrderByWithAggregationInput | accountsOrderByWithAggregationInput[]
    by: AccountsScalarFieldEnum[] | AccountsScalarFieldEnum
    having?: accountsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountsCountAggregateInputType | true
    _avg?: AccountsAvgAggregateInputType
    _sum?: AccountsSumAggregateInputType
    _min?: AccountsMinAggregateInputType
    _max?: AccountsMaxAggregateInputType
  }

  export type AccountsGroupByOutputType = {
    id: string
    name: string
    type: $Enums.AccountType
    balance: number
    currency: string
    bankId: string | null
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: AccountsCountAggregateOutputType | null
    _avg: AccountsAvgAggregateOutputType | null
    _sum: AccountsSumAggregateOutputType | null
    _min: AccountsMinAggregateOutputType | null
    _max: AccountsMaxAggregateOutputType | null
  }

  type GetAccountsGroupByPayload<T extends accountsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountsGroupByOutputType[P]>
            : GetScalarType<T[P], AccountsGroupByOutputType[P]>
        }
      >
    >


  export type accountsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    balance?: boolean
    currency?: boolean
    bankId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
    sourceTransactions?: boolean | accounts$sourceTransactionsArgs<ExtArgs>
    destinationTransactions?: boolean | accounts$destinationTransactionsArgs<ExtArgs>
    _count?: boolean | AccountsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["accounts"]>

  export type accountsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    balance?: boolean
    currency?: boolean
    bankId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["accounts"]>

  export type accountsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    balance?: boolean
    currency?: boolean
    bankId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["accounts"]>

  export type accountsSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    balance?: boolean
    currency?: boolean
    bankId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type accountsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "type" | "balance" | "currency" | "bankId" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["accounts"]>
  export type accountsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
    sourceTransactions?: boolean | accounts$sourceTransactionsArgs<ExtArgs>
    destinationTransactions?: boolean | accounts$destinationTransactionsArgs<ExtArgs>
    _count?: boolean | AccountsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type accountsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type accountsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $accountsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "accounts"
    objects: {
      user: Prisma.$usersPayload<ExtArgs>
      sourceTransactions: Prisma.$transactionsPayload<ExtArgs>[]
      destinationTransactions: Prisma.$transactionsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      type: $Enums.AccountType
      balance: number
      currency: string
      bankId: string | null
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["accounts"]>
    composites: {}
  }

  type accountsGetPayload<S extends boolean | null | undefined | accountsDefaultArgs> = $Result.GetResult<Prisma.$accountsPayload, S>

  type accountsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<accountsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountsCountAggregateInputType | true
    }

  export interface accountsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['accounts'], meta: { name: 'accounts' } }
    /**
     * Find zero or one Accounts that matches the filter.
     * @param {accountsFindUniqueArgs} args - Arguments to find a Accounts
     * @example
     * // Get one Accounts
     * const accounts = await prisma.accounts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends accountsFindUniqueArgs>(args: SelectSubset<T, accountsFindUniqueArgs<ExtArgs>>): Prisma__accountsClient<$Result.GetResult<Prisma.$accountsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Accounts that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {accountsFindUniqueOrThrowArgs} args - Arguments to find a Accounts
     * @example
     * // Get one Accounts
     * const accounts = await prisma.accounts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends accountsFindUniqueOrThrowArgs>(args: SelectSubset<T, accountsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__accountsClient<$Result.GetResult<Prisma.$accountsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountsFindFirstArgs} args - Arguments to find a Accounts
     * @example
     * // Get one Accounts
     * const accounts = await prisma.accounts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends accountsFindFirstArgs>(args?: SelectSubset<T, accountsFindFirstArgs<ExtArgs>>): Prisma__accountsClient<$Result.GetResult<Prisma.$accountsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Accounts that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountsFindFirstOrThrowArgs} args - Arguments to find a Accounts
     * @example
     * // Get one Accounts
     * const accounts = await prisma.accounts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends accountsFindFirstOrThrowArgs>(args?: SelectSubset<T, accountsFindFirstOrThrowArgs<ExtArgs>>): Prisma__accountsClient<$Result.GetResult<Prisma.$accountsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.accounts.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.accounts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountsWithIdOnly = await prisma.accounts.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends accountsFindManyArgs>(args?: SelectSubset<T, accountsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$accountsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Accounts.
     * @param {accountsCreateArgs} args - Arguments to create a Accounts.
     * @example
     * // Create one Accounts
     * const Accounts = await prisma.accounts.create({
     *   data: {
     *     // ... data to create a Accounts
     *   }
     * })
     * 
     */
    create<T extends accountsCreateArgs>(args: SelectSubset<T, accountsCreateArgs<ExtArgs>>): Prisma__accountsClient<$Result.GetResult<Prisma.$accountsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {accountsCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const accounts = await prisma.accounts.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends accountsCreateManyArgs>(args?: SelectSubset<T, accountsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {accountsCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const accounts = await prisma.accounts.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountsWithIdOnly = await prisma.accounts.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends accountsCreateManyAndReturnArgs>(args?: SelectSubset<T, accountsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$accountsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Accounts.
     * @param {accountsDeleteArgs} args - Arguments to delete one Accounts.
     * @example
     * // Delete one Accounts
     * const Accounts = await prisma.accounts.delete({
     *   where: {
     *     // ... filter to delete one Accounts
     *   }
     * })
     * 
     */
    delete<T extends accountsDeleteArgs>(args: SelectSubset<T, accountsDeleteArgs<ExtArgs>>): Prisma__accountsClient<$Result.GetResult<Prisma.$accountsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Accounts.
     * @param {accountsUpdateArgs} args - Arguments to update one Accounts.
     * @example
     * // Update one Accounts
     * const accounts = await prisma.accounts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends accountsUpdateArgs>(args: SelectSubset<T, accountsUpdateArgs<ExtArgs>>): Prisma__accountsClient<$Result.GetResult<Prisma.$accountsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {accountsDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.accounts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends accountsDeleteManyArgs>(args?: SelectSubset<T, accountsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const accounts = await prisma.accounts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends accountsUpdateManyArgs>(args: SelectSubset<T, accountsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {accountsUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const accounts = await prisma.accounts.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountsWithIdOnly = await prisma.accounts.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends accountsUpdateManyAndReturnArgs>(args: SelectSubset<T, accountsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$accountsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Accounts.
     * @param {accountsUpsertArgs} args - Arguments to update or create a Accounts.
     * @example
     * // Update or create a Accounts
     * const accounts = await prisma.accounts.upsert({
     *   create: {
     *     // ... data to create a Accounts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Accounts we want to update
     *   }
     * })
     */
    upsert<T extends accountsUpsertArgs>(args: SelectSubset<T, accountsUpsertArgs<ExtArgs>>): Prisma__accountsClient<$Result.GetResult<Prisma.$accountsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountsCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.accounts.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends accountsCountArgs>(
      args?: Subset<T, accountsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountsAggregateArgs>(args: Subset<T, AccountsAggregateArgs>): Prisma.PrismaPromise<GetAccountsAggregateType<T>>

    /**
     * Group by Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends accountsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: accountsGroupByArgs['orderBy'] }
        : { orderBy?: accountsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, accountsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the accounts model
   */
  readonly fields: accountsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for accounts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__accountsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sourceTransactions<T extends accounts$sourceTransactionsArgs<ExtArgs> = {}>(args?: Subset<T, accounts$sourceTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    destinationTransactions<T extends accounts$destinationTransactionsArgs<ExtArgs> = {}>(args?: Subset<T, accounts$destinationTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the accounts model
   */
  interface accountsFieldRefs {
    readonly id: FieldRef<"accounts", 'String'>
    readonly name: FieldRef<"accounts", 'String'>
    readonly type: FieldRef<"accounts", 'AccountType'>
    readonly balance: FieldRef<"accounts", 'Int'>
    readonly currency: FieldRef<"accounts", 'String'>
    readonly bankId: FieldRef<"accounts", 'String'>
    readonly createdAt: FieldRef<"accounts", 'DateTime'>
    readonly updatedAt: FieldRef<"accounts", 'DateTime'>
    readonly userId: FieldRef<"accounts", 'String'>
  }
    

  // Custom InputTypes
  /**
   * accounts findUnique
   */
  export type accountsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the accounts
     */
    select?: accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the accounts
     */
    omit?: accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountsInclude<ExtArgs> | null
    /**
     * Filter, which accounts to fetch.
     */
    where: accountsWhereUniqueInput
  }

  /**
   * accounts findUniqueOrThrow
   */
  export type accountsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the accounts
     */
    select?: accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the accounts
     */
    omit?: accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountsInclude<ExtArgs> | null
    /**
     * Filter, which accounts to fetch.
     */
    where: accountsWhereUniqueInput
  }

  /**
   * accounts findFirst
   */
  export type accountsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the accounts
     */
    select?: accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the accounts
     */
    omit?: accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountsInclude<ExtArgs> | null
    /**
     * Filter, which accounts to fetch.
     */
    where?: accountsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of accounts to fetch.
     */
    orderBy?: accountsOrderByWithRelationInput | accountsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for accounts.
     */
    cursor?: accountsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of accounts.
     */
    distinct?: AccountsScalarFieldEnum | AccountsScalarFieldEnum[]
  }

  /**
   * accounts findFirstOrThrow
   */
  export type accountsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the accounts
     */
    select?: accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the accounts
     */
    omit?: accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountsInclude<ExtArgs> | null
    /**
     * Filter, which accounts to fetch.
     */
    where?: accountsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of accounts to fetch.
     */
    orderBy?: accountsOrderByWithRelationInput | accountsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for accounts.
     */
    cursor?: accountsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of accounts.
     */
    distinct?: AccountsScalarFieldEnum | AccountsScalarFieldEnum[]
  }

  /**
   * accounts findMany
   */
  export type accountsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the accounts
     */
    select?: accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the accounts
     */
    omit?: accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountsInclude<ExtArgs> | null
    /**
     * Filter, which accounts to fetch.
     */
    where?: accountsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of accounts to fetch.
     */
    orderBy?: accountsOrderByWithRelationInput | accountsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing accounts.
     */
    cursor?: accountsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` accounts.
     */
    skip?: number
    distinct?: AccountsScalarFieldEnum | AccountsScalarFieldEnum[]
  }

  /**
   * accounts create
   */
  export type accountsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the accounts
     */
    select?: accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the accounts
     */
    omit?: accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountsInclude<ExtArgs> | null
    /**
     * The data needed to create a accounts.
     */
    data: XOR<accountsCreateInput, accountsUncheckedCreateInput>
  }

  /**
   * accounts createMany
   */
  export type accountsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many accounts.
     */
    data: accountsCreateManyInput | accountsCreateManyInput[]
  }

  /**
   * accounts createManyAndReturn
   */
  export type accountsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the accounts
     */
    select?: accountsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the accounts
     */
    omit?: accountsOmit<ExtArgs> | null
    /**
     * The data used to create many accounts.
     */
    data: accountsCreateManyInput | accountsCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * accounts update
   */
  export type accountsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the accounts
     */
    select?: accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the accounts
     */
    omit?: accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountsInclude<ExtArgs> | null
    /**
     * The data needed to update a accounts.
     */
    data: XOR<accountsUpdateInput, accountsUncheckedUpdateInput>
    /**
     * Choose, which accounts to update.
     */
    where: accountsWhereUniqueInput
  }

  /**
   * accounts updateMany
   */
  export type accountsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update accounts.
     */
    data: XOR<accountsUpdateManyMutationInput, accountsUncheckedUpdateManyInput>
    /**
     * Filter which accounts to update
     */
    where?: accountsWhereInput
    /**
     * Limit how many accounts to update.
     */
    limit?: number
  }

  /**
   * accounts updateManyAndReturn
   */
  export type accountsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the accounts
     */
    select?: accountsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the accounts
     */
    omit?: accountsOmit<ExtArgs> | null
    /**
     * The data used to update accounts.
     */
    data: XOR<accountsUpdateManyMutationInput, accountsUncheckedUpdateManyInput>
    /**
     * Filter which accounts to update
     */
    where?: accountsWhereInput
    /**
     * Limit how many accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * accounts upsert
   */
  export type accountsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the accounts
     */
    select?: accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the accounts
     */
    omit?: accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountsInclude<ExtArgs> | null
    /**
     * The filter to search for the accounts to update in case it exists.
     */
    where: accountsWhereUniqueInput
    /**
     * In case the accounts found by the `where` argument doesn't exist, create a new accounts with this data.
     */
    create: XOR<accountsCreateInput, accountsUncheckedCreateInput>
    /**
     * In case the accounts was found with the provided `where` argument, update it with this data.
     */
    update: XOR<accountsUpdateInput, accountsUncheckedUpdateInput>
  }

  /**
   * accounts delete
   */
  export type accountsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the accounts
     */
    select?: accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the accounts
     */
    omit?: accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountsInclude<ExtArgs> | null
    /**
     * Filter which accounts to delete.
     */
    where: accountsWhereUniqueInput
  }

  /**
   * accounts deleteMany
   */
  export type accountsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which accounts to delete
     */
    where?: accountsWhereInput
    /**
     * Limit how many accounts to delete.
     */
    limit?: number
  }

  /**
   * accounts.sourceTransactions
   */
  export type accounts$sourceTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    where?: transactionsWhereInput
    orderBy?: transactionsOrderByWithRelationInput | transactionsOrderByWithRelationInput[]
    cursor?: transactionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionsScalarFieldEnum | TransactionsScalarFieldEnum[]
  }

  /**
   * accounts.destinationTransactions
   */
  export type accounts$destinationTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    where?: transactionsWhereInput
    orderBy?: transactionsOrderByWithRelationInput | transactionsOrderByWithRelationInput[]
    cursor?: transactionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionsScalarFieldEnum | TransactionsScalarFieldEnum[]
  }

  /**
   * accounts without action
   */
  export type accountsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the accounts
     */
    select?: accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the accounts
     */
    omit?: accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountsInclude<ExtArgs> | null
  }


  /**
   * Model transactions
   */

  export type AggregateTransactions = {
    _count: TransactionsCountAggregateOutputType | null
    _avg: TransactionsAvgAggregateOutputType | null
    _sum: TransactionsSumAggregateOutputType | null
    _min: TransactionsMinAggregateOutputType | null
    _max: TransactionsMaxAggregateOutputType | null
  }

  export type TransactionsAvgAggregateOutputType = {
    sourceAmount: number | null
    destinationAmount: number | null
  }

  export type TransactionsSumAggregateOutputType = {
    sourceAmount: number | null
    destinationAmount: number | null
  }

  export type TransactionsMinAggregateOutputType = {
    id: string | null
    sourceAmount: number | null
    destinationAmount: number | null
    description: string | null
    date: Date | null
    type: $Enums.TransactionType | null
    bankTransactionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    sourceAccountId: string | null
    destinationAccountId: string | null
    categoryId: string | null
    userId: string | null
  }

  export type TransactionsMaxAggregateOutputType = {
    id: string | null
    sourceAmount: number | null
    destinationAmount: number | null
    description: string | null
    date: Date | null
    type: $Enums.TransactionType | null
    bankTransactionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    sourceAccountId: string | null
    destinationAccountId: string | null
    categoryId: string | null
    userId: string | null
  }

  export type TransactionsCountAggregateOutputType = {
    id: number
    sourceAmount: number
    destinationAmount: number
    description: number
    date: number
    type: number
    bankTransactionId: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    sourceAccountId: number
    destinationAccountId: number
    categoryId: number
    userId: number
    _all: number
  }


  export type TransactionsAvgAggregateInputType = {
    sourceAmount?: true
    destinationAmount?: true
  }

  export type TransactionsSumAggregateInputType = {
    sourceAmount?: true
    destinationAmount?: true
  }

  export type TransactionsMinAggregateInputType = {
    id?: true
    sourceAmount?: true
    destinationAmount?: true
    description?: true
    date?: true
    type?: true
    bankTransactionId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    sourceAccountId?: true
    destinationAccountId?: true
    categoryId?: true
    userId?: true
  }

  export type TransactionsMaxAggregateInputType = {
    id?: true
    sourceAmount?: true
    destinationAmount?: true
    description?: true
    date?: true
    type?: true
    bankTransactionId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    sourceAccountId?: true
    destinationAccountId?: true
    categoryId?: true
    userId?: true
  }

  export type TransactionsCountAggregateInputType = {
    id?: true
    sourceAmount?: true
    destinationAmount?: true
    description?: true
    date?: true
    type?: true
    bankTransactionId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    sourceAccountId?: true
    destinationAccountId?: true
    categoryId?: true
    userId?: true
    _all?: true
  }

  export type TransactionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which transactions to aggregate.
     */
    where?: transactionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transactions to fetch.
     */
    orderBy?: transactionsOrderByWithRelationInput | transactionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: transactionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned transactions
    **/
    _count?: true | TransactionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionsMaxAggregateInputType
  }

  export type GetTransactionsAggregateType<T extends TransactionsAggregateArgs> = {
        [P in keyof T & keyof AggregateTransactions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransactions[P]>
      : GetScalarType<T[P], AggregateTransactions[P]>
  }




  export type transactionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: transactionsWhereInput
    orderBy?: transactionsOrderByWithAggregationInput | transactionsOrderByWithAggregationInput[]
    by: TransactionsScalarFieldEnum[] | TransactionsScalarFieldEnum
    having?: transactionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionsCountAggregateInputType | true
    _avg?: TransactionsAvgAggregateInputType
    _sum?: TransactionsSumAggregateInputType
    _min?: TransactionsMinAggregateInputType
    _max?: TransactionsMaxAggregateInputType
  }

  export type TransactionsGroupByOutputType = {
    id: string
    sourceAmount: number
    destinationAmount: number
    description: string
    date: Date
    type: $Enums.TransactionType
    bankTransactionId: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    sourceAccountId: string | null
    destinationAccountId: string | null
    categoryId: string | null
    userId: string
    _count: TransactionsCountAggregateOutputType | null
    _avg: TransactionsAvgAggregateOutputType | null
    _sum: TransactionsSumAggregateOutputType | null
    _min: TransactionsMinAggregateOutputType | null
    _max: TransactionsMaxAggregateOutputType | null
  }

  type GetTransactionsGroupByPayload<T extends transactionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionsGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionsGroupByOutputType[P]>
        }
      >
    >


  export type transactionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sourceAmount?: boolean
    destinationAmount?: boolean
    description?: boolean
    date?: boolean
    type?: boolean
    bankTransactionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    sourceAccountId?: boolean
    destinationAccountId?: boolean
    categoryId?: boolean
    userId?: boolean
    sourceAccount?: boolean | transactions$sourceAccountArgs<ExtArgs>
    destinationAccount?: boolean | transactions$destinationAccountArgs<ExtArgs>
    category?: boolean | transactions$categoryArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transactions"]>

  export type transactionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sourceAmount?: boolean
    destinationAmount?: boolean
    description?: boolean
    date?: boolean
    type?: boolean
    bankTransactionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    sourceAccountId?: boolean
    destinationAccountId?: boolean
    categoryId?: boolean
    userId?: boolean
    sourceAccount?: boolean | transactions$sourceAccountArgs<ExtArgs>
    destinationAccount?: boolean | transactions$destinationAccountArgs<ExtArgs>
    category?: boolean | transactions$categoryArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transactions"]>

  export type transactionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sourceAmount?: boolean
    destinationAmount?: boolean
    description?: boolean
    date?: boolean
    type?: boolean
    bankTransactionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    sourceAccountId?: boolean
    destinationAccountId?: boolean
    categoryId?: boolean
    userId?: boolean
    sourceAccount?: boolean | transactions$sourceAccountArgs<ExtArgs>
    destinationAccount?: boolean | transactions$destinationAccountArgs<ExtArgs>
    category?: boolean | transactions$categoryArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transactions"]>

  export type transactionsSelectScalar = {
    id?: boolean
    sourceAmount?: boolean
    destinationAmount?: boolean
    description?: boolean
    date?: boolean
    type?: boolean
    bankTransactionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    sourceAccountId?: boolean
    destinationAccountId?: boolean
    categoryId?: boolean
    userId?: boolean
  }

  export type transactionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sourceAmount" | "destinationAmount" | "description" | "date" | "type" | "bankTransactionId" | "createdAt" | "updatedAt" | "deletedAt" | "sourceAccountId" | "destinationAccountId" | "categoryId" | "userId", ExtArgs["result"]["transactions"]>
  export type transactionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sourceAccount?: boolean | transactions$sourceAccountArgs<ExtArgs>
    destinationAccount?: boolean | transactions$destinationAccountArgs<ExtArgs>
    category?: boolean | transactions$categoryArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type transactionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sourceAccount?: boolean | transactions$sourceAccountArgs<ExtArgs>
    destinationAccount?: boolean | transactions$destinationAccountArgs<ExtArgs>
    category?: boolean | transactions$categoryArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type transactionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sourceAccount?: boolean | transactions$sourceAccountArgs<ExtArgs>
    destinationAccount?: boolean | transactions$destinationAccountArgs<ExtArgs>
    category?: boolean | transactions$categoryArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $transactionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "transactions"
    objects: {
      sourceAccount: Prisma.$accountsPayload<ExtArgs> | null
      destinationAccount: Prisma.$accountsPayload<ExtArgs> | null
      category: Prisma.$categoriesPayload<ExtArgs> | null
      user: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sourceAmount: number
      destinationAmount: number
      description: string
      date: Date
      type: $Enums.TransactionType
      bankTransactionId: string | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
      sourceAccountId: string | null
      destinationAccountId: string | null
      categoryId: string | null
      userId: string
    }, ExtArgs["result"]["transactions"]>
    composites: {}
  }

  type transactionsGetPayload<S extends boolean | null | undefined | transactionsDefaultArgs> = $Result.GetResult<Prisma.$transactionsPayload, S>

  type transactionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<transactionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionsCountAggregateInputType | true
    }

  export interface transactionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['transactions'], meta: { name: 'transactions' } }
    /**
     * Find zero or one Transactions that matches the filter.
     * @param {transactionsFindUniqueArgs} args - Arguments to find a Transactions
     * @example
     * // Get one Transactions
     * const transactions = await prisma.transactions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends transactionsFindUniqueArgs>(args: SelectSubset<T, transactionsFindUniqueArgs<ExtArgs>>): Prisma__transactionsClient<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transactions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {transactionsFindUniqueOrThrowArgs} args - Arguments to find a Transactions
     * @example
     * // Get one Transactions
     * const transactions = await prisma.transactions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends transactionsFindUniqueOrThrowArgs>(args: SelectSubset<T, transactionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__transactionsClient<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionsFindFirstArgs} args - Arguments to find a Transactions
     * @example
     * // Get one Transactions
     * const transactions = await prisma.transactions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends transactionsFindFirstArgs>(args?: SelectSubset<T, transactionsFindFirstArgs<ExtArgs>>): Prisma__transactionsClient<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transactions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionsFindFirstOrThrowArgs} args - Arguments to find a Transactions
     * @example
     * // Get one Transactions
     * const transactions = await prisma.transactions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends transactionsFindFirstOrThrowArgs>(args?: SelectSubset<T, transactionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__transactionsClient<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transactions.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transactions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionsWithIdOnly = await prisma.transactions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends transactionsFindManyArgs>(args?: SelectSubset<T, transactionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transactions.
     * @param {transactionsCreateArgs} args - Arguments to create a Transactions.
     * @example
     * // Create one Transactions
     * const Transactions = await prisma.transactions.create({
     *   data: {
     *     // ... data to create a Transactions
     *   }
     * })
     * 
     */
    create<T extends transactionsCreateArgs>(args: SelectSubset<T, transactionsCreateArgs<ExtArgs>>): Prisma__transactionsClient<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {transactionsCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transactions = await prisma.transactions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends transactionsCreateManyArgs>(args?: SelectSubset<T, transactionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {transactionsCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transactions = await prisma.transactions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionsWithIdOnly = await prisma.transactions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends transactionsCreateManyAndReturnArgs>(args?: SelectSubset<T, transactionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transactions.
     * @param {transactionsDeleteArgs} args - Arguments to delete one Transactions.
     * @example
     * // Delete one Transactions
     * const Transactions = await prisma.transactions.delete({
     *   where: {
     *     // ... filter to delete one Transactions
     *   }
     * })
     * 
     */
    delete<T extends transactionsDeleteArgs>(args: SelectSubset<T, transactionsDeleteArgs<ExtArgs>>): Prisma__transactionsClient<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transactions.
     * @param {transactionsUpdateArgs} args - Arguments to update one Transactions.
     * @example
     * // Update one Transactions
     * const transactions = await prisma.transactions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends transactionsUpdateArgs>(args: SelectSubset<T, transactionsUpdateArgs<ExtArgs>>): Prisma__transactionsClient<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {transactionsDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transactions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends transactionsDeleteManyArgs>(args?: SelectSubset<T, transactionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transactions = await prisma.transactions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends transactionsUpdateManyArgs>(args: SelectSubset<T, transactionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {transactionsUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transactions = await prisma.transactions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionsWithIdOnly = await prisma.transactions.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends transactionsUpdateManyAndReturnArgs>(args: SelectSubset<T, transactionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transactions.
     * @param {transactionsUpsertArgs} args - Arguments to update or create a Transactions.
     * @example
     * // Update or create a Transactions
     * const transactions = await prisma.transactions.upsert({
     *   create: {
     *     // ... data to create a Transactions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transactions we want to update
     *   }
     * })
     */
    upsert<T extends transactionsUpsertArgs>(args: SelectSubset<T, transactionsUpsertArgs<ExtArgs>>): Prisma__transactionsClient<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionsCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transactions.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends transactionsCountArgs>(
      args?: Subset<T, transactionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionsAggregateArgs>(args: Subset<T, TransactionsAggregateArgs>): Prisma.PrismaPromise<GetTransactionsAggregateType<T>>

    /**
     * Group by Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends transactionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: transactionsGroupByArgs['orderBy'] }
        : { orderBy?: transactionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, transactionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the transactions model
   */
  readonly fields: transactionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for transactions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__transactionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sourceAccount<T extends transactions$sourceAccountArgs<ExtArgs> = {}>(args?: Subset<T, transactions$sourceAccountArgs<ExtArgs>>): Prisma__accountsClient<$Result.GetResult<Prisma.$accountsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    destinationAccount<T extends transactions$destinationAccountArgs<ExtArgs> = {}>(args?: Subset<T, transactions$destinationAccountArgs<ExtArgs>>): Prisma__accountsClient<$Result.GetResult<Prisma.$accountsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    category<T extends transactions$categoryArgs<ExtArgs> = {}>(args?: Subset<T, transactions$categoryArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the transactions model
   */
  interface transactionsFieldRefs {
    readonly id: FieldRef<"transactions", 'String'>
    readonly sourceAmount: FieldRef<"transactions", 'Int'>
    readonly destinationAmount: FieldRef<"transactions", 'Int'>
    readonly description: FieldRef<"transactions", 'String'>
    readonly date: FieldRef<"transactions", 'DateTime'>
    readonly type: FieldRef<"transactions", 'TransactionType'>
    readonly bankTransactionId: FieldRef<"transactions", 'String'>
    readonly createdAt: FieldRef<"transactions", 'DateTime'>
    readonly updatedAt: FieldRef<"transactions", 'DateTime'>
    readonly deletedAt: FieldRef<"transactions", 'DateTime'>
    readonly sourceAccountId: FieldRef<"transactions", 'String'>
    readonly destinationAccountId: FieldRef<"transactions", 'String'>
    readonly categoryId: FieldRef<"transactions", 'String'>
    readonly userId: FieldRef<"transactions", 'String'>
  }
    

  // Custom InputTypes
  /**
   * transactions findUnique
   */
  export type transactionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * Filter, which transactions to fetch.
     */
    where: transactionsWhereUniqueInput
  }

  /**
   * transactions findUniqueOrThrow
   */
  export type transactionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * Filter, which transactions to fetch.
     */
    where: transactionsWhereUniqueInput
  }

  /**
   * transactions findFirst
   */
  export type transactionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * Filter, which transactions to fetch.
     */
    where?: transactionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transactions to fetch.
     */
    orderBy?: transactionsOrderByWithRelationInput | transactionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for transactions.
     */
    cursor?: transactionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of transactions.
     */
    distinct?: TransactionsScalarFieldEnum | TransactionsScalarFieldEnum[]
  }

  /**
   * transactions findFirstOrThrow
   */
  export type transactionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * Filter, which transactions to fetch.
     */
    where?: transactionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transactions to fetch.
     */
    orderBy?: transactionsOrderByWithRelationInput | transactionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for transactions.
     */
    cursor?: transactionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of transactions.
     */
    distinct?: TransactionsScalarFieldEnum | TransactionsScalarFieldEnum[]
  }

  /**
   * transactions findMany
   */
  export type transactionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * Filter, which transactions to fetch.
     */
    where?: transactionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transactions to fetch.
     */
    orderBy?: transactionsOrderByWithRelationInput | transactionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing transactions.
     */
    cursor?: transactionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transactions.
     */
    skip?: number
    distinct?: TransactionsScalarFieldEnum | TransactionsScalarFieldEnum[]
  }

  /**
   * transactions create
   */
  export type transactionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * The data needed to create a transactions.
     */
    data: XOR<transactionsCreateInput, transactionsUncheckedCreateInput>
  }

  /**
   * transactions createMany
   */
  export type transactionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many transactions.
     */
    data: transactionsCreateManyInput | transactionsCreateManyInput[]
  }

  /**
   * transactions createManyAndReturn
   */
  export type transactionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * The data used to create many transactions.
     */
    data: transactionsCreateManyInput | transactionsCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * transactions update
   */
  export type transactionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * The data needed to update a transactions.
     */
    data: XOR<transactionsUpdateInput, transactionsUncheckedUpdateInput>
    /**
     * Choose, which transactions to update.
     */
    where: transactionsWhereUniqueInput
  }

  /**
   * transactions updateMany
   */
  export type transactionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update transactions.
     */
    data: XOR<transactionsUpdateManyMutationInput, transactionsUncheckedUpdateManyInput>
    /**
     * Filter which transactions to update
     */
    where?: transactionsWhereInput
    /**
     * Limit how many transactions to update.
     */
    limit?: number
  }

  /**
   * transactions updateManyAndReturn
   */
  export type transactionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * The data used to update transactions.
     */
    data: XOR<transactionsUpdateManyMutationInput, transactionsUncheckedUpdateManyInput>
    /**
     * Filter which transactions to update
     */
    where?: transactionsWhereInput
    /**
     * Limit how many transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * transactions upsert
   */
  export type transactionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * The filter to search for the transactions to update in case it exists.
     */
    where: transactionsWhereUniqueInput
    /**
     * In case the transactions found by the `where` argument doesn't exist, create a new transactions with this data.
     */
    create: XOR<transactionsCreateInput, transactionsUncheckedCreateInput>
    /**
     * In case the transactions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<transactionsUpdateInput, transactionsUncheckedUpdateInput>
  }

  /**
   * transactions delete
   */
  export type transactionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * Filter which transactions to delete.
     */
    where: transactionsWhereUniqueInput
  }

  /**
   * transactions deleteMany
   */
  export type transactionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which transactions to delete
     */
    where?: transactionsWhereInput
    /**
     * Limit how many transactions to delete.
     */
    limit?: number
  }

  /**
   * transactions.sourceAccount
   */
  export type transactions$sourceAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the accounts
     */
    select?: accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the accounts
     */
    omit?: accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountsInclude<ExtArgs> | null
    where?: accountsWhereInput
  }

  /**
   * transactions.destinationAccount
   */
  export type transactions$destinationAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the accounts
     */
    select?: accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the accounts
     */
    omit?: accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountsInclude<ExtArgs> | null
    where?: accountsWhereInput
  }

  /**
   * transactions.category
   */
  export type transactions$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    where?: categoriesWhereInput
  }

  /**
   * transactions without action
   */
  export type transactionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
  }


  /**
   * Model categories
   */

  export type AggregateCategories = {
    _count: CategoriesCountAggregateOutputType | null
    _min: CategoriesMinAggregateOutputType | null
    _max: CategoriesMaxAggregateOutputType | null
  }

  export type CategoriesMinAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.CategoryType | null
    bgColor: string | null
    fgColor: string | null
    icon: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type CategoriesMaxAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.CategoryType | null
    bgColor: string | null
    fgColor: string | null
    icon: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type CategoriesCountAggregateOutputType = {
    id: number
    name: number
    type: number
    bgColor: number
    fgColor: number
    icon: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type CategoriesMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    bgColor?: true
    fgColor?: true
    icon?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type CategoriesMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    bgColor?: true
    fgColor?: true
    icon?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type CategoriesCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    bgColor?: true
    fgColor?: true
    icon?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type CategoriesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which categories to aggregate.
     */
    where?: categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoriesOrderByWithRelationInput | categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned categories
    **/
    _count?: true | CategoriesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoriesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoriesMaxAggregateInputType
  }

  export type GetCategoriesAggregateType<T extends CategoriesAggregateArgs> = {
        [P in keyof T & keyof AggregateCategories]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategories[P]>
      : GetScalarType<T[P], AggregateCategories[P]>
  }




  export type categoriesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: categoriesWhereInput
    orderBy?: categoriesOrderByWithAggregationInput | categoriesOrderByWithAggregationInput[]
    by: CategoriesScalarFieldEnum[] | CategoriesScalarFieldEnum
    having?: categoriesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoriesCountAggregateInputType | true
    _min?: CategoriesMinAggregateInputType
    _max?: CategoriesMaxAggregateInputType
  }

  export type CategoriesGroupByOutputType = {
    id: string
    name: string
    type: $Enums.CategoryType
    bgColor: string
    fgColor: string
    icon: string
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: CategoriesCountAggregateOutputType | null
    _min: CategoriesMinAggregateOutputType | null
    _max: CategoriesMaxAggregateOutputType | null
  }

  type GetCategoriesGroupByPayload<T extends categoriesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoriesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoriesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoriesGroupByOutputType[P]>
            : GetScalarType<T[P], CategoriesGroupByOutputType[P]>
        }
      >
    >


  export type categoriesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    bgColor?: boolean
    fgColor?: boolean
    icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
    transactions?: boolean | categories$transactionsArgs<ExtArgs>
    budgets?: boolean | categories$budgetsArgs<ExtArgs>
    _count?: boolean | CategoriesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categories"]>

  export type categoriesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    bgColor?: boolean
    fgColor?: boolean
    icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categories"]>

  export type categoriesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    bgColor?: boolean
    fgColor?: boolean
    icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categories"]>

  export type categoriesSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    bgColor?: boolean
    fgColor?: boolean
    icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type categoriesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "type" | "bgColor" | "fgColor" | "icon" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["categories"]>
  export type categoriesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
    transactions?: boolean | categories$transactionsArgs<ExtArgs>
    budgets?: boolean | categories$budgetsArgs<ExtArgs>
    _count?: boolean | CategoriesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type categoriesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type categoriesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $categoriesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "categories"
    objects: {
      user: Prisma.$usersPayload<ExtArgs>
      transactions: Prisma.$transactionsPayload<ExtArgs>[]
      budgets: Prisma.$budgetsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      type: $Enums.CategoryType
      bgColor: string
      fgColor: string
      icon: string
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["categories"]>
    composites: {}
  }

  type categoriesGetPayload<S extends boolean | null | undefined | categoriesDefaultArgs> = $Result.GetResult<Prisma.$categoriesPayload, S>

  type categoriesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<categoriesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoriesCountAggregateInputType | true
    }

  export interface categoriesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['categories'], meta: { name: 'categories' } }
    /**
     * Find zero or one Categories that matches the filter.
     * @param {categoriesFindUniqueArgs} args - Arguments to find a Categories
     * @example
     * // Get one Categories
     * const categories = await prisma.categories.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends categoriesFindUniqueArgs>(args: SelectSubset<T, categoriesFindUniqueArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Categories that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {categoriesFindUniqueOrThrowArgs} args - Arguments to find a Categories
     * @example
     * // Get one Categories
     * const categories = await prisma.categories.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends categoriesFindUniqueOrThrowArgs>(args: SelectSubset<T, categoriesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesFindFirstArgs} args - Arguments to find a Categories
     * @example
     * // Get one Categories
     * const categories = await prisma.categories.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends categoriesFindFirstArgs>(args?: SelectSubset<T, categoriesFindFirstArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categories that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesFindFirstOrThrowArgs} args - Arguments to find a Categories
     * @example
     * // Get one Categories
     * const categories = await prisma.categories.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends categoriesFindFirstOrThrowArgs>(args?: SelectSubset<T, categoriesFindFirstOrThrowArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.categories.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.categories.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoriesWithIdOnly = await prisma.categories.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends categoriesFindManyArgs>(args?: SelectSubset<T, categoriesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Categories.
     * @param {categoriesCreateArgs} args - Arguments to create a Categories.
     * @example
     * // Create one Categories
     * const Categories = await prisma.categories.create({
     *   data: {
     *     // ... data to create a Categories
     *   }
     * })
     * 
     */
    create<T extends categoriesCreateArgs>(args: SelectSubset<T, categoriesCreateArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {categoriesCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const categories = await prisma.categories.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends categoriesCreateManyArgs>(args?: SelectSubset<T, categoriesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {categoriesCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const categories = await prisma.categories.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoriesWithIdOnly = await prisma.categories.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends categoriesCreateManyAndReturnArgs>(args?: SelectSubset<T, categoriesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Categories.
     * @param {categoriesDeleteArgs} args - Arguments to delete one Categories.
     * @example
     * // Delete one Categories
     * const Categories = await prisma.categories.delete({
     *   where: {
     *     // ... filter to delete one Categories
     *   }
     * })
     * 
     */
    delete<T extends categoriesDeleteArgs>(args: SelectSubset<T, categoriesDeleteArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Categories.
     * @param {categoriesUpdateArgs} args - Arguments to update one Categories.
     * @example
     * // Update one Categories
     * const categories = await prisma.categories.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends categoriesUpdateArgs>(args: SelectSubset<T, categoriesUpdateArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {categoriesDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.categories.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends categoriesDeleteManyArgs>(args?: SelectSubset<T, categoriesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const categories = await prisma.categories.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends categoriesUpdateManyArgs>(args: SelectSubset<T, categoriesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {categoriesUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const categories = await prisma.categories.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoriesWithIdOnly = await prisma.categories.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends categoriesUpdateManyAndReturnArgs>(args: SelectSubset<T, categoriesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Categories.
     * @param {categoriesUpsertArgs} args - Arguments to update or create a Categories.
     * @example
     * // Update or create a Categories
     * const categories = await prisma.categories.upsert({
     *   create: {
     *     // ... data to create a Categories
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Categories we want to update
     *   }
     * })
     */
    upsert<T extends categoriesUpsertArgs>(args: SelectSubset<T, categoriesUpsertArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.categories.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends categoriesCountArgs>(
      args?: Subset<T, categoriesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoriesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoriesAggregateArgs>(args: Subset<T, CategoriesAggregateArgs>): Prisma.PrismaPromise<GetCategoriesAggregateType<T>>

    /**
     * Group by Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends categoriesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: categoriesGroupByArgs['orderBy'] }
        : { orderBy?: categoriesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, categoriesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoriesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the categories model
   */
  readonly fields: categoriesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for categories.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__categoriesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transactions<T extends categories$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, categories$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    budgets<T extends categories$budgetsArgs<ExtArgs> = {}>(args?: Subset<T, categories$budgetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the categories model
   */
  interface categoriesFieldRefs {
    readonly id: FieldRef<"categories", 'String'>
    readonly name: FieldRef<"categories", 'String'>
    readonly type: FieldRef<"categories", 'CategoryType'>
    readonly bgColor: FieldRef<"categories", 'String'>
    readonly fgColor: FieldRef<"categories", 'String'>
    readonly icon: FieldRef<"categories", 'String'>
    readonly createdAt: FieldRef<"categories", 'DateTime'>
    readonly updatedAt: FieldRef<"categories", 'DateTime'>
    readonly userId: FieldRef<"categories", 'String'>
  }
    

  // Custom InputTypes
  /**
   * categories findUnique
   */
  export type categoriesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where: categoriesWhereUniqueInput
  }

  /**
   * categories findUniqueOrThrow
   */
  export type categoriesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where: categoriesWhereUniqueInput
  }

  /**
   * categories findFirst
   */
  export type categoriesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where?: categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoriesOrderByWithRelationInput | categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categories.
     */
    cursor?: categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categories.
     */
    distinct?: CategoriesScalarFieldEnum | CategoriesScalarFieldEnum[]
  }

  /**
   * categories findFirstOrThrow
   */
  export type categoriesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where?: categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoriesOrderByWithRelationInput | categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categories.
     */
    cursor?: categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categories.
     */
    distinct?: CategoriesScalarFieldEnum | CategoriesScalarFieldEnum[]
  }

  /**
   * categories findMany
   */
  export type categoriesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where?: categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoriesOrderByWithRelationInput | categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing categories.
     */
    cursor?: categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    distinct?: CategoriesScalarFieldEnum | CategoriesScalarFieldEnum[]
  }

  /**
   * categories create
   */
  export type categoriesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * The data needed to create a categories.
     */
    data: XOR<categoriesCreateInput, categoriesUncheckedCreateInput>
  }

  /**
   * categories createMany
   */
  export type categoriesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many categories.
     */
    data: categoriesCreateManyInput | categoriesCreateManyInput[]
  }

  /**
   * categories createManyAndReturn
   */
  export type categoriesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * The data used to create many categories.
     */
    data: categoriesCreateManyInput | categoriesCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * categories update
   */
  export type categoriesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * The data needed to update a categories.
     */
    data: XOR<categoriesUpdateInput, categoriesUncheckedUpdateInput>
    /**
     * Choose, which categories to update.
     */
    where: categoriesWhereUniqueInput
  }

  /**
   * categories updateMany
   */
  export type categoriesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update categories.
     */
    data: XOR<categoriesUpdateManyMutationInput, categoriesUncheckedUpdateManyInput>
    /**
     * Filter which categories to update
     */
    where?: categoriesWhereInput
    /**
     * Limit how many categories to update.
     */
    limit?: number
  }

  /**
   * categories updateManyAndReturn
   */
  export type categoriesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * The data used to update categories.
     */
    data: XOR<categoriesUpdateManyMutationInput, categoriesUncheckedUpdateManyInput>
    /**
     * Filter which categories to update
     */
    where?: categoriesWhereInput
    /**
     * Limit how many categories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * categories upsert
   */
  export type categoriesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * The filter to search for the categories to update in case it exists.
     */
    where: categoriesWhereUniqueInput
    /**
     * In case the categories found by the `where` argument doesn't exist, create a new categories with this data.
     */
    create: XOR<categoriesCreateInput, categoriesUncheckedCreateInput>
    /**
     * In case the categories was found with the provided `where` argument, update it with this data.
     */
    update: XOR<categoriesUpdateInput, categoriesUncheckedUpdateInput>
  }

  /**
   * categories delete
   */
  export type categoriesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter which categories to delete.
     */
    where: categoriesWhereUniqueInput
  }

  /**
   * categories deleteMany
   */
  export type categoriesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which categories to delete
     */
    where?: categoriesWhereInput
    /**
     * Limit how many categories to delete.
     */
    limit?: number
  }

  /**
   * categories.transactions
   */
  export type categories$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    where?: transactionsWhereInput
    orderBy?: transactionsOrderByWithRelationInput | transactionsOrderByWithRelationInput[]
    cursor?: transactionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionsScalarFieldEnum | TransactionsScalarFieldEnum[]
  }

  /**
   * categories.budgets
   */
  export type categories$budgetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the budgets
     */
    select?: budgetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the budgets
     */
    omit?: budgetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: budgetsInclude<ExtArgs> | null
    where?: budgetsWhereInput
    orderBy?: budgetsOrderByWithRelationInput | budgetsOrderByWithRelationInput[]
    cursor?: budgetsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BudgetsScalarFieldEnum | BudgetsScalarFieldEnum[]
  }

  /**
   * categories without action
   */
  export type categoriesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
  }


  /**
   * Model budgets
   */

  export type AggregateBudgets = {
    _count: BudgetsCountAggregateOutputType | null
    _avg: BudgetsAvgAggregateOutputType | null
    _sum: BudgetsSumAggregateOutputType | null
    _min: BudgetsMinAggregateOutputType | null
    _max: BudgetsMaxAggregateOutputType | null
  }

  export type BudgetsAvgAggregateOutputType = {
    plannedAmount: number | null
    actualAmount: number | null
  }

  export type BudgetsSumAggregateOutputType = {
    plannedAmount: number | null
    actualAmount: number | null
  }

  export type BudgetsMinAggregateOutputType = {
    id: string | null
    name: string | null
    plannedAmount: number | null
    actualAmount: number | null
    period: $Enums.BudgetPeriod | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    categoryId: string | null
    userId: string | null
  }

  export type BudgetsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    plannedAmount: number | null
    actualAmount: number | null
    period: $Enums.BudgetPeriod | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    categoryId: string | null
    userId: string | null
  }

  export type BudgetsCountAggregateOutputType = {
    id: number
    name: number
    plannedAmount: number
    actualAmount: number
    period: number
    startDate: number
    endDate: number
    createdAt: number
    updatedAt: number
    categoryId: number
    userId: number
    _all: number
  }


  export type BudgetsAvgAggregateInputType = {
    plannedAmount?: true
    actualAmount?: true
  }

  export type BudgetsSumAggregateInputType = {
    plannedAmount?: true
    actualAmount?: true
  }

  export type BudgetsMinAggregateInputType = {
    id?: true
    name?: true
    plannedAmount?: true
    actualAmount?: true
    period?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
    categoryId?: true
    userId?: true
  }

  export type BudgetsMaxAggregateInputType = {
    id?: true
    name?: true
    plannedAmount?: true
    actualAmount?: true
    period?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
    categoryId?: true
    userId?: true
  }

  export type BudgetsCountAggregateInputType = {
    id?: true
    name?: true
    plannedAmount?: true
    actualAmount?: true
    period?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
    categoryId?: true
    userId?: true
    _all?: true
  }

  export type BudgetsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which budgets to aggregate.
     */
    where?: budgetsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of budgets to fetch.
     */
    orderBy?: budgetsOrderByWithRelationInput | budgetsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: budgetsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` budgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` budgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned budgets
    **/
    _count?: true | BudgetsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BudgetsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BudgetsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BudgetsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BudgetsMaxAggregateInputType
  }

  export type GetBudgetsAggregateType<T extends BudgetsAggregateArgs> = {
        [P in keyof T & keyof AggregateBudgets]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBudgets[P]>
      : GetScalarType<T[P], AggregateBudgets[P]>
  }




  export type budgetsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: budgetsWhereInput
    orderBy?: budgetsOrderByWithAggregationInput | budgetsOrderByWithAggregationInput[]
    by: BudgetsScalarFieldEnum[] | BudgetsScalarFieldEnum
    having?: budgetsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BudgetsCountAggregateInputType | true
    _avg?: BudgetsAvgAggregateInputType
    _sum?: BudgetsSumAggregateInputType
    _min?: BudgetsMinAggregateInputType
    _max?: BudgetsMaxAggregateInputType
  }

  export type BudgetsGroupByOutputType = {
    id: string
    name: string
    plannedAmount: number
    actualAmount: number
    period: $Enums.BudgetPeriod
    startDate: Date
    endDate: Date
    createdAt: Date
    updatedAt: Date
    categoryId: string
    userId: string
    _count: BudgetsCountAggregateOutputType | null
    _avg: BudgetsAvgAggregateOutputType | null
    _sum: BudgetsSumAggregateOutputType | null
    _min: BudgetsMinAggregateOutputType | null
    _max: BudgetsMaxAggregateOutputType | null
  }

  type GetBudgetsGroupByPayload<T extends budgetsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BudgetsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BudgetsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BudgetsGroupByOutputType[P]>
            : GetScalarType<T[P], BudgetsGroupByOutputType[P]>
        }
      >
    >


  export type budgetsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    plannedAmount?: boolean
    actualAmount?: boolean
    period?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categoryId?: boolean
    userId?: boolean
    category?: boolean | categoriesDefaultArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["budgets"]>

  export type budgetsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    plannedAmount?: boolean
    actualAmount?: boolean
    period?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categoryId?: boolean
    userId?: boolean
    category?: boolean | categoriesDefaultArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["budgets"]>

  export type budgetsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    plannedAmount?: boolean
    actualAmount?: boolean
    period?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categoryId?: boolean
    userId?: boolean
    category?: boolean | categoriesDefaultArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["budgets"]>

  export type budgetsSelectScalar = {
    id?: boolean
    name?: boolean
    plannedAmount?: boolean
    actualAmount?: boolean
    period?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categoryId?: boolean
    userId?: boolean
  }

  export type budgetsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "plannedAmount" | "actualAmount" | "period" | "startDate" | "endDate" | "createdAt" | "updatedAt" | "categoryId" | "userId", ExtArgs["result"]["budgets"]>
  export type budgetsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | categoriesDefaultArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type budgetsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | categoriesDefaultArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type budgetsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | categoriesDefaultArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $budgetsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "budgets"
    objects: {
      category: Prisma.$categoriesPayload<ExtArgs>
      user: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      plannedAmount: number
      actualAmount: number
      period: $Enums.BudgetPeriod
      startDate: Date
      endDate: Date
      createdAt: Date
      updatedAt: Date
      categoryId: string
      userId: string
    }, ExtArgs["result"]["budgets"]>
    composites: {}
  }

  type budgetsGetPayload<S extends boolean | null | undefined | budgetsDefaultArgs> = $Result.GetResult<Prisma.$budgetsPayload, S>

  type budgetsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<budgetsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BudgetsCountAggregateInputType | true
    }

  export interface budgetsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['budgets'], meta: { name: 'budgets' } }
    /**
     * Find zero or one Budgets that matches the filter.
     * @param {budgetsFindUniqueArgs} args - Arguments to find a Budgets
     * @example
     * // Get one Budgets
     * const budgets = await prisma.budgets.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends budgetsFindUniqueArgs>(args: SelectSubset<T, budgetsFindUniqueArgs<ExtArgs>>): Prisma__budgetsClient<$Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Budgets that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {budgetsFindUniqueOrThrowArgs} args - Arguments to find a Budgets
     * @example
     * // Get one Budgets
     * const budgets = await prisma.budgets.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends budgetsFindUniqueOrThrowArgs>(args: SelectSubset<T, budgetsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__budgetsClient<$Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Budgets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {budgetsFindFirstArgs} args - Arguments to find a Budgets
     * @example
     * // Get one Budgets
     * const budgets = await prisma.budgets.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends budgetsFindFirstArgs>(args?: SelectSubset<T, budgetsFindFirstArgs<ExtArgs>>): Prisma__budgetsClient<$Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Budgets that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {budgetsFindFirstOrThrowArgs} args - Arguments to find a Budgets
     * @example
     * // Get one Budgets
     * const budgets = await prisma.budgets.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends budgetsFindFirstOrThrowArgs>(args?: SelectSubset<T, budgetsFindFirstOrThrowArgs<ExtArgs>>): Prisma__budgetsClient<$Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Budgets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {budgetsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Budgets
     * const budgets = await prisma.budgets.findMany()
     * 
     * // Get first 10 Budgets
     * const budgets = await prisma.budgets.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const budgetsWithIdOnly = await prisma.budgets.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends budgetsFindManyArgs>(args?: SelectSubset<T, budgetsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Budgets.
     * @param {budgetsCreateArgs} args - Arguments to create a Budgets.
     * @example
     * // Create one Budgets
     * const Budgets = await prisma.budgets.create({
     *   data: {
     *     // ... data to create a Budgets
     *   }
     * })
     * 
     */
    create<T extends budgetsCreateArgs>(args: SelectSubset<T, budgetsCreateArgs<ExtArgs>>): Prisma__budgetsClient<$Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Budgets.
     * @param {budgetsCreateManyArgs} args - Arguments to create many Budgets.
     * @example
     * // Create many Budgets
     * const budgets = await prisma.budgets.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends budgetsCreateManyArgs>(args?: SelectSubset<T, budgetsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Budgets and returns the data saved in the database.
     * @param {budgetsCreateManyAndReturnArgs} args - Arguments to create many Budgets.
     * @example
     * // Create many Budgets
     * const budgets = await prisma.budgets.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Budgets and only return the `id`
     * const budgetsWithIdOnly = await prisma.budgets.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends budgetsCreateManyAndReturnArgs>(args?: SelectSubset<T, budgetsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Budgets.
     * @param {budgetsDeleteArgs} args - Arguments to delete one Budgets.
     * @example
     * // Delete one Budgets
     * const Budgets = await prisma.budgets.delete({
     *   where: {
     *     // ... filter to delete one Budgets
     *   }
     * })
     * 
     */
    delete<T extends budgetsDeleteArgs>(args: SelectSubset<T, budgetsDeleteArgs<ExtArgs>>): Prisma__budgetsClient<$Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Budgets.
     * @param {budgetsUpdateArgs} args - Arguments to update one Budgets.
     * @example
     * // Update one Budgets
     * const budgets = await prisma.budgets.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends budgetsUpdateArgs>(args: SelectSubset<T, budgetsUpdateArgs<ExtArgs>>): Prisma__budgetsClient<$Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Budgets.
     * @param {budgetsDeleteManyArgs} args - Arguments to filter Budgets to delete.
     * @example
     * // Delete a few Budgets
     * const { count } = await prisma.budgets.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends budgetsDeleteManyArgs>(args?: SelectSubset<T, budgetsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Budgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {budgetsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Budgets
     * const budgets = await prisma.budgets.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends budgetsUpdateManyArgs>(args: SelectSubset<T, budgetsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Budgets and returns the data updated in the database.
     * @param {budgetsUpdateManyAndReturnArgs} args - Arguments to update many Budgets.
     * @example
     * // Update many Budgets
     * const budgets = await prisma.budgets.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Budgets and only return the `id`
     * const budgetsWithIdOnly = await prisma.budgets.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends budgetsUpdateManyAndReturnArgs>(args: SelectSubset<T, budgetsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Budgets.
     * @param {budgetsUpsertArgs} args - Arguments to update or create a Budgets.
     * @example
     * // Update or create a Budgets
     * const budgets = await prisma.budgets.upsert({
     *   create: {
     *     // ... data to create a Budgets
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Budgets we want to update
     *   }
     * })
     */
    upsert<T extends budgetsUpsertArgs>(args: SelectSubset<T, budgetsUpsertArgs<ExtArgs>>): Prisma__budgetsClient<$Result.GetResult<Prisma.$budgetsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Budgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {budgetsCountArgs} args - Arguments to filter Budgets to count.
     * @example
     * // Count the number of Budgets
     * const count = await prisma.budgets.count({
     *   where: {
     *     // ... the filter for the Budgets we want to count
     *   }
     * })
    **/
    count<T extends budgetsCountArgs>(
      args?: Subset<T, budgetsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BudgetsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Budgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BudgetsAggregateArgs>(args: Subset<T, BudgetsAggregateArgs>): Prisma.PrismaPromise<GetBudgetsAggregateType<T>>

    /**
     * Group by Budgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {budgetsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends budgetsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: budgetsGroupByArgs['orderBy'] }
        : { orderBy?: budgetsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, budgetsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBudgetsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the budgets model
   */
  readonly fields: budgetsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for budgets.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__budgetsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends categoriesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, categoriesDefaultArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the budgets model
   */
  interface budgetsFieldRefs {
    readonly id: FieldRef<"budgets", 'String'>
    readonly name: FieldRef<"budgets", 'String'>
    readonly plannedAmount: FieldRef<"budgets", 'Int'>
    readonly actualAmount: FieldRef<"budgets", 'Int'>
    readonly period: FieldRef<"budgets", 'BudgetPeriod'>
    readonly startDate: FieldRef<"budgets", 'DateTime'>
    readonly endDate: FieldRef<"budgets", 'DateTime'>
    readonly createdAt: FieldRef<"budgets", 'DateTime'>
    readonly updatedAt: FieldRef<"budgets", 'DateTime'>
    readonly categoryId: FieldRef<"budgets", 'String'>
    readonly userId: FieldRef<"budgets", 'String'>
  }
    

  // Custom InputTypes
  /**
   * budgets findUnique
   */
  export type budgetsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the budgets
     */
    select?: budgetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the budgets
     */
    omit?: budgetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: budgetsInclude<ExtArgs> | null
    /**
     * Filter, which budgets to fetch.
     */
    where: budgetsWhereUniqueInput
  }

  /**
   * budgets findUniqueOrThrow
   */
  export type budgetsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the budgets
     */
    select?: budgetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the budgets
     */
    omit?: budgetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: budgetsInclude<ExtArgs> | null
    /**
     * Filter, which budgets to fetch.
     */
    where: budgetsWhereUniqueInput
  }

  /**
   * budgets findFirst
   */
  export type budgetsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the budgets
     */
    select?: budgetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the budgets
     */
    omit?: budgetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: budgetsInclude<ExtArgs> | null
    /**
     * Filter, which budgets to fetch.
     */
    where?: budgetsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of budgets to fetch.
     */
    orderBy?: budgetsOrderByWithRelationInput | budgetsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for budgets.
     */
    cursor?: budgetsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` budgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` budgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of budgets.
     */
    distinct?: BudgetsScalarFieldEnum | BudgetsScalarFieldEnum[]
  }

  /**
   * budgets findFirstOrThrow
   */
  export type budgetsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the budgets
     */
    select?: budgetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the budgets
     */
    omit?: budgetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: budgetsInclude<ExtArgs> | null
    /**
     * Filter, which budgets to fetch.
     */
    where?: budgetsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of budgets to fetch.
     */
    orderBy?: budgetsOrderByWithRelationInput | budgetsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for budgets.
     */
    cursor?: budgetsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` budgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` budgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of budgets.
     */
    distinct?: BudgetsScalarFieldEnum | BudgetsScalarFieldEnum[]
  }

  /**
   * budgets findMany
   */
  export type budgetsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the budgets
     */
    select?: budgetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the budgets
     */
    omit?: budgetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: budgetsInclude<ExtArgs> | null
    /**
     * Filter, which budgets to fetch.
     */
    where?: budgetsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of budgets to fetch.
     */
    orderBy?: budgetsOrderByWithRelationInput | budgetsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing budgets.
     */
    cursor?: budgetsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` budgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` budgets.
     */
    skip?: number
    distinct?: BudgetsScalarFieldEnum | BudgetsScalarFieldEnum[]
  }

  /**
   * budgets create
   */
  export type budgetsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the budgets
     */
    select?: budgetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the budgets
     */
    omit?: budgetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: budgetsInclude<ExtArgs> | null
    /**
     * The data needed to create a budgets.
     */
    data: XOR<budgetsCreateInput, budgetsUncheckedCreateInput>
  }

  /**
   * budgets createMany
   */
  export type budgetsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many budgets.
     */
    data: budgetsCreateManyInput | budgetsCreateManyInput[]
  }

  /**
   * budgets createManyAndReturn
   */
  export type budgetsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the budgets
     */
    select?: budgetsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the budgets
     */
    omit?: budgetsOmit<ExtArgs> | null
    /**
     * The data used to create many budgets.
     */
    data: budgetsCreateManyInput | budgetsCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: budgetsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * budgets update
   */
  export type budgetsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the budgets
     */
    select?: budgetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the budgets
     */
    omit?: budgetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: budgetsInclude<ExtArgs> | null
    /**
     * The data needed to update a budgets.
     */
    data: XOR<budgetsUpdateInput, budgetsUncheckedUpdateInput>
    /**
     * Choose, which budgets to update.
     */
    where: budgetsWhereUniqueInput
  }

  /**
   * budgets updateMany
   */
  export type budgetsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update budgets.
     */
    data: XOR<budgetsUpdateManyMutationInput, budgetsUncheckedUpdateManyInput>
    /**
     * Filter which budgets to update
     */
    where?: budgetsWhereInput
    /**
     * Limit how many budgets to update.
     */
    limit?: number
  }

  /**
   * budgets updateManyAndReturn
   */
  export type budgetsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the budgets
     */
    select?: budgetsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the budgets
     */
    omit?: budgetsOmit<ExtArgs> | null
    /**
     * The data used to update budgets.
     */
    data: XOR<budgetsUpdateManyMutationInput, budgetsUncheckedUpdateManyInput>
    /**
     * Filter which budgets to update
     */
    where?: budgetsWhereInput
    /**
     * Limit how many budgets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: budgetsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * budgets upsert
   */
  export type budgetsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the budgets
     */
    select?: budgetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the budgets
     */
    omit?: budgetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: budgetsInclude<ExtArgs> | null
    /**
     * The filter to search for the budgets to update in case it exists.
     */
    where: budgetsWhereUniqueInput
    /**
     * In case the budgets found by the `where` argument doesn't exist, create a new budgets with this data.
     */
    create: XOR<budgetsCreateInput, budgetsUncheckedCreateInput>
    /**
     * In case the budgets was found with the provided `where` argument, update it with this data.
     */
    update: XOR<budgetsUpdateInput, budgetsUncheckedUpdateInput>
  }

  /**
   * budgets delete
   */
  export type budgetsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the budgets
     */
    select?: budgetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the budgets
     */
    omit?: budgetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: budgetsInclude<ExtArgs> | null
    /**
     * Filter which budgets to delete.
     */
    where: budgetsWhereUniqueInput
  }

  /**
   * budgets deleteMany
   */
  export type budgetsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which budgets to delete
     */
    where?: budgetsWhereInput
    /**
     * Limit how many budgets to delete.
     */
    limit?: number
  }

  /**
   * budgets without action
   */
  export type budgetsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the budgets
     */
    select?: budgetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the budgets
     */
    omit?: budgetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: budgetsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsersScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    monobankToken: 'monobankToken'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const AccountsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    balance: 'balance',
    currency: 'currency',
    bankId: 'bankId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type AccountsScalarFieldEnum = (typeof AccountsScalarFieldEnum)[keyof typeof AccountsScalarFieldEnum]


  export const TransactionsScalarFieldEnum: {
    id: 'id',
    sourceAmount: 'sourceAmount',
    destinationAmount: 'destinationAmount',
    description: 'description',
    date: 'date',
    type: 'type',
    bankTransactionId: 'bankTransactionId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    sourceAccountId: 'sourceAccountId',
    destinationAccountId: 'destinationAccountId',
    categoryId: 'categoryId',
    userId: 'userId'
  };

  export type TransactionsScalarFieldEnum = (typeof TransactionsScalarFieldEnum)[keyof typeof TransactionsScalarFieldEnum]


  export const CategoriesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    bgColor: 'bgColor',
    fgColor: 'fgColor',
    icon: 'icon',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type CategoriesScalarFieldEnum = (typeof CategoriesScalarFieldEnum)[keyof typeof CategoriesScalarFieldEnum]


  export const BudgetsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    plannedAmount: 'plannedAmount',
    actualAmount: 'actualAmount',
    period: 'period',
    startDate: 'startDate',
    endDate: 'endDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    categoryId: 'categoryId',
    userId: 'userId'
  };

  export type BudgetsScalarFieldEnum = (typeof BudgetsScalarFieldEnum)[keyof typeof BudgetsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'AccountType'
   */
  export type EnumAccountTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountType'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'TransactionType'
   */
  export type EnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType'>
    


  /**
   * Reference to a field of type 'CategoryType'
   */
  export type EnumCategoryTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CategoryType'>
    


  /**
   * Reference to a field of type 'BudgetPeriod'
   */
  export type EnumBudgetPeriodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BudgetPeriod'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    name?: StringFilter<"users"> | string
    createdAt?: DateTimeFilter<"users"> | Date | string
    updatedAt?: DateTimeFilter<"users"> | Date | string
    monobankToken?: StringNullableFilter<"users"> | string | null
    accounts?: AccountsListRelationFilter
    transactions?: TransactionsListRelationFilter
    categories?: CategoriesListRelationFilter
    budgets?: BudgetsListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    monobankToken?: SortOrderInput | SortOrder
    accounts?: accountsOrderByRelationAggregateInput
    transactions?: transactionsOrderByRelationAggregateInput
    categories?: categoriesOrderByRelationAggregateInput
    budgets?: budgetsOrderByRelationAggregateInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    password?: StringFilter<"users"> | string
    name?: StringFilter<"users"> | string
    createdAt?: DateTimeFilter<"users"> | Date | string
    updatedAt?: DateTimeFilter<"users"> | Date | string
    monobankToken?: StringNullableFilter<"users"> | string | null
    accounts?: AccountsListRelationFilter
    transactions?: TransactionsListRelationFilter
    categories?: CategoriesListRelationFilter
    budgets?: BudgetsListRelationFilter
  }, "id" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    monobankToken?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    password?: StringWithAggregatesFilter<"users"> | string
    name?: StringWithAggregatesFilter<"users"> | string
    createdAt?: DateTimeWithAggregatesFilter<"users"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"users"> | Date | string
    monobankToken?: StringNullableWithAggregatesFilter<"users"> | string | null
  }

  export type accountsWhereInput = {
    AND?: accountsWhereInput | accountsWhereInput[]
    OR?: accountsWhereInput[]
    NOT?: accountsWhereInput | accountsWhereInput[]
    id?: StringFilter<"accounts"> | string
    name?: StringFilter<"accounts"> | string
    type?: EnumAccountTypeFilter<"accounts"> | $Enums.AccountType
    balance?: IntFilter<"accounts"> | number
    currency?: StringFilter<"accounts"> | string
    bankId?: StringNullableFilter<"accounts"> | string | null
    createdAt?: DateTimeFilter<"accounts"> | Date | string
    updatedAt?: DateTimeFilter<"accounts"> | Date | string
    userId?: StringFilter<"accounts"> | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
    sourceTransactions?: TransactionsListRelationFilter
    destinationTransactions?: TransactionsListRelationFilter
  }

  export type accountsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    balance?: SortOrder
    currency?: SortOrder
    bankId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: usersOrderByWithRelationInput
    sourceTransactions?: transactionsOrderByRelationAggregateInput
    destinationTransactions?: transactionsOrderByRelationAggregateInput
  }

  export type accountsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_bankId?: accountsUserIdBankIdCompoundUniqueInput
    AND?: accountsWhereInput | accountsWhereInput[]
    OR?: accountsWhereInput[]
    NOT?: accountsWhereInput | accountsWhereInput[]
    name?: StringFilter<"accounts"> | string
    type?: EnumAccountTypeFilter<"accounts"> | $Enums.AccountType
    balance?: IntFilter<"accounts"> | number
    currency?: StringFilter<"accounts"> | string
    bankId?: StringNullableFilter<"accounts"> | string | null
    createdAt?: DateTimeFilter<"accounts"> | Date | string
    updatedAt?: DateTimeFilter<"accounts"> | Date | string
    userId?: StringFilter<"accounts"> | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
    sourceTransactions?: TransactionsListRelationFilter
    destinationTransactions?: TransactionsListRelationFilter
  }, "id" | "userId_bankId">

  export type accountsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    balance?: SortOrder
    currency?: SortOrder
    bankId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: accountsCountOrderByAggregateInput
    _avg?: accountsAvgOrderByAggregateInput
    _max?: accountsMaxOrderByAggregateInput
    _min?: accountsMinOrderByAggregateInput
    _sum?: accountsSumOrderByAggregateInput
  }

  export type accountsScalarWhereWithAggregatesInput = {
    AND?: accountsScalarWhereWithAggregatesInput | accountsScalarWhereWithAggregatesInput[]
    OR?: accountsScalarWhereWithAggregatesInput[]
    NOT?: accountsScalarWhereWithAggregatesInput | accountsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"accounts"> | string
    name?: StringWithAggregatesFilter<"accounts"> | string
    type?: EnumAccountTypeWithAggregatesFilter<"accounts"> | $Enums.AccountType
    balance?: IntWithAggregatesFilter<"accounts"> | number
    currency?: StringWithAggregatesFilter<"accounts"> | string
    bankId?: StringNullableWithAggregatesFilter<"accounts"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"accounts"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"accounts"> | Date | string
    userId?: StringWithAggregatesFilter<"accounts"> | string
  }

  export type transactionsWhereInput = {
    AND?: transactionsWhereInput | transactionsWhereInput[]
    OR?: transactionsWhereInput[]
    NOT?: transactionsWhereInput | transactionsWhereInput[]
    id?: StringFilter<"transactions"> | string
    sourceAmount?: IntFilter<"transactions"> | number
    destinationAmount?: IntFilter<"transactions"> | number
    description?: StringFilter<"transactions"> | string
    date?: DateTimeFilter<"transactions"> | Date | string
    type?: EnumTransactionTypeFilter<"transactions"> | $Enums.TransactionType
    bankTransactionId?: StringNullableFilter<"transactions"> | string | null
    createdAt?: DateTimeFilter<"transactions"> | Date | string
    updatedAt?: DateTimeFilter<"transactions"> | Date | string
    deletedAt?: DateTimeNullableFilter<"transactions"> | Date | string | null
    sourceAccountId?: StringNullableFilter<"transactions"> | string | null
    destinationAccountId?: StringNullableFilter<"transactions"> | string | null
    categoryId?: StringNullableFilter<"transactions"> | string | null
    userId?: StringFilter<"transactions"> | string
    sourceAccount?: XOR<AccountsNullableScalarRelationFilter, accountsWhereInput> | null
    destinationAccount?: XOR<AccountsNullableScalarRelationFilter, accountsWhereInput> | null
    category?: XOR<CategoriesNullableScalarRelationFilter, categoriesWhereInput> | null
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type transactionsOrderByWithRelationInput = {
    id?: SortOrder
    sourceAmount?: SortOrder
    destinationAmount?: SortOrder
    description?: SortOrder
    date?: SortOrder
    type?: SortOrder
    bankTransactionId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    sourceAccountId?: SortOrderInput | SortOrder
    destinationAccountId?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    userId?: SortOrder
    sourceAccount?: accountsOrderByWithRelationInput
    destinationAccount?: accountsOrderByWithRelationInput
    category?: categoriesOrderByWithRelationInput
    user?: usersOrderByWithRelationInput
  }

  export type transactionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    bankTransactionId?: string
    AND?: transactionsWhereInput | transactionsWhereInput[]
    OR?: transactionsWhereInput[]
    NOT?: transactionsWhereInput | transactionsWhereInput[]
    sourceAmount?: IntFilter<"transactions"> | number
    destinationAmount?: IntFilter<"transactions"> | number
    description?: StringFilter<"transactions"> | string
    date?: DateTimeFilter<"transactions"> | Date | string
    type?: EnumTransactionTypeFilter<"transactions"> | $Enums.TransactionType
    createdAt?: DateTimeFilter<"transactions"> | Date | string
    updatedAt?: DateTimeFilter<"transactions"> | Date | string
    deletedAt?: DateTimeNullableFilter<"transactions"> | Date | string | null
    sourceAccountId?: StringNullableFilter<"transactions"> | string | null
    destinationAccountId?: StringNullableFilter<"transactions"> | string | null
    categoryId?: StringNullableFilter<"transactions"> | string | null
    userId?: StringFilter<"transactions"> | string
    sourceAccount?: XOR<AccountsNullableScalarRelationFilter, accountsWhereInput> | null
    destinationAccount?: XOR<AccountsNullableScalarRelationFilter, accountsWhereInput> | null
    category?: XOR<CategoriesNullableScalarRelationFilter, categoriesWhereInput> | null
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id" | "bankTransactionId">

  export type transactionsOrderByWithAggregationInput = {
    id?: SortOrder
    sourceAmount?: SortOrder
    destinationAmount?: SortOrder
    description?: SortOrder
    date?: SortOrder
    type?: SortOrder
    bankTransactionId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    sourceAccountId?: SortOrderInput | SortOrder
    destinationAccountId?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: transactionsCountOrderByAggregateInput
    _avg?: transactionsAvgOrderByAggregateInput
    _max?: transactionsMaxOrderByAggregateInput
    _min?: transactionsMinOrderByAggregateInput
    _sum?: transactionsSumOrderByAggregateInput
  }

  export type transactionsScalarWhereWithAggregatesInput = {
    AND?: transactionsScalarWhereWithAggregatesInput | transactionsScalarWhereWithAggregatesInput[]
    OR?: transactionsScalarWhereWithAggregatesInput[]
    NOT?: transactionsScalarWhereWithAggregatesInput | transactionsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"transactions"> | string
    sourceAmount?: IntWithAggregatesFilter<"transactions"> | number
    destinationAmount?: IntWithAggregatesFilter<"transactions"> | number
    description?: StringWithAggregatesFilter<"transactions"> | string
    date?: DateTimeWithAggregatesFilter<"transactions"> | Date | string
    type?: EnumTransactionTypeWithAggregatesFilter<"transactions"> | $Enums.TransactionType
    bankTransactionId?: StringNullableWithAggregatesFilter<"transactions"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"transactions"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"transactions"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"transactions"> | Date | string | null
    sourceAccountId?: StringNullableWithAggregatesFilter<"transactions"> | string | null
    destinationAccountId?: StringNullableWithAggregatesFilter<"transactions"> | string | null
    categoryId?: StringNullableWithAggregatesFilter<"transactions"> | string | null
    userId?: StringWithAggregatesFilter<"transactions"> | string
  }

  export type categoriesWhereInput = {
    AND?: categoriesWhereInput | categoriesWhereInput[]
    OR?: categoriesWhereInput[]
    NOT?: categoriesWhereInput | categoriesWhereInput[]
    id?: StringFilter<"categories"> | string
    name?: StringFilter<"categories"> | string
    type?: EnumCategoryTypeFilter<"categories"> | $Enums.CategoryType
    bgColor?: StringFilter<"categories"> | string
    fgColor?: StringFilter<"categories"> | string
    icon?: StringFilter<"categories"> | string
    createdAt?: DateTimeFilter<"categories"> | Date | string
    updatedAt?: DateTimeFilter<"categories"> | Date | string
    userId?: StringFilter<"categories"> | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
    transactions?: TransactionsListRelationFilter
    budgets?: BudgetsListRelationFilter
  }

  export type categoriesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    bgColor?: SortOrder
    fgColor?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: usersOrderByWithRelationInput
    transactions?: transactionsOrderByRelationAggregateInput
    budgets?: budgetsOrderByRelationAggregateInput
  }

  export type categoriesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: categoriesWhereInput | categoriesWhereInput[]
    OR?: categoriesWhereInput[]
    NOT?: categoriesWhereInput | categoriesWhereInput[]
    name?: StringFilter<"categories"> | string
    type?: EnumCategoryTypeFilter<"categories"> | $Enums.CategoryType
    bgColor?: StringFilter<"categories"> | string
    fgColor?: StringFilter<"categories"> | string
    icon?: StringFilter<"categories"> | string
    createdAt?: DateTimeFilter<"categories"> | Date | string
    updatedAt?: DateTimeFilter<"categories"> | Date | string
    userId?: StringFilter<"categories"> | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
    transactions?: TransactionsListRelationFilter
    budgets?: BudgetsListRelationFilter
  }, "id">

  export type categoriesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    bgColor?: SortOrder
    fgColor?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: categoriesCountOrderByAggregateInput
    _max?: categoriesMaxOrderByAggregateInput
    _min?: categoriesMinOrderByAggregateInput
  }

  export type categoriesScalarWhereWithAggregatesInput = {
    AND?: categoriesScalarWhereWithAggregatesInput | categoriesScalarWhereWithAggregatesInput[]
    OR?: categoriesScalarWhereWithAggregatesInput[]
    NOT?: categoriesScalarWhereWithAggregatesInput | categoriesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"categories"> | string
    name?: StringWithAggregatesFilter<"categories"> | string
    type?: EnumCategoryTypeWithAggregatesFilter<"categories"> | $Enums.CategoryType
    bgColor?: StringWithAggregatesFilter<"categories"> | string
    fgColor?: StringWithAggregatesFilter<"categories"> | string
    icon?: StringWithAggregatesFilter<"categories"> | string
    createdAt?: DateTimeWithAggregatesFilter<"categories"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"categories"> | Date | string
    userId?: StringWithAggregatesFilter<"categories"> | string
  }

  export type budgetsWhereInput = {
    AND?: budgetsWhereInput | budgetsWhereInput[]
    OR?: budgetsWhereInput[]
    NOT?: budgetsWhereInput | budgetsWhereInput[]
    id?: StringFilter<"budgets"> | string
    name?: StringFilter<"budgets"> | string
    plannedAmount?: IntFilter<"budgets"> | number
    actualAmount?: IntFilter<"budgets"> | number
    period?: EnumBudgetPeriodFilter<"budgets"> | $Enums.BudgetPeriod
    startDate?: DateTimeFilter<"budgets"> | Date | string
    endDate?: DateTimeFilter<"budgets"> | Date | string
    createdAt?: DateTimeFilter<"budgets"> | Date | string
    updatedAt?: DateTimeFilter<"budgets"> | Date | string
    categoryId?: StringFilter<"budgets"> | string
    userId?: StringFilter<"budgets"> | string
    category?: XOR<CategoriesScalarRelationFilter, categoriesWhereInput>
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type budgetsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    plannedAmount?: SortOrder
    actualAmount?: SortOrder
    period?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categoryId?: SortOrder
    userId?: SortOrder
    category?: categoriesOrderByWithRelationInput
    user?: usersOrderByWithRelationInput
  }

  export type budgetsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: budgetsWhereInput | budgetsWhereInput[]
    OR?: budgetsWhereInput[]
    NOT?: budgetsWhereInput | budgetsWhereInput[]
    name?: StringFilter<"budgets"> | string
    plannedAmount?: IntFilter<"budgets"> | number
    actualAmount?: IntFilter<"budgets"> | number
    period?: EnumBudgetPeriodFilter<"budgets"> | $Enums.BudgetPeriod
    startDate?: DateTimeFilter<"budgets"> | Date | string
    endDate?: DateTimeFilter<"budgets"> | Date | string
    createdAt?: DateTimeFilter<"budgets"> | Date | string
    updatedAt?: DateTimeFilter<"budgets"> | Date | string
    categoryId?: StringFilter<"budgets"> | string
    userId?: StringFilter<"budgets"> | string
    category?: XOR<CategoriesScalarRelationFilter, categoriesWhereInput>
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type budgetsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    plannedAmount?: SortOrder
    actualAmount?: SortOrder
    period?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categoryId?: SortOrder
    userId?: SortOrder
    _count?: budgetsCountOrderByAggregateInput
    _avg?: budgetsAvgOrderByAggregateInput
    _max?: budgetsMaxOrderByAggregateInput
    _min?: budgetsMinOrderByAggregateInput
    _sum?: budgetsSumOrderByAggregateInput
  }

  export type budgetsScalarWhereWithAggregatesInput = {
    AND?: budgetsScalarWhereWithAggregatesInput | budgetsScalarWhereWithAggregatesInput[]
    OR?: budgetsScalarWhereWithAggregatesInput[]
    NOT?: budgetsScalarWhereWithAggregatesInput | budgetsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"budgets"> | string
    name?: StringWithAggregatesFilter<"budgets"> | string
    plannedAmount?: IntWithAggregatesFilter<"budgets"> | number
    actualAmount?: IntWithAggregatesFilter<"budgets"> | number
    period?: EnumBudgetPeriodWithAggregatesFilter<"budgets"> | $Enums.BudgetPeriod
    startDate?: DateTimeWithAggregatesFilter<"budgets"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"budgets"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"budgets"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"budgets"> | Date | string
    categoryId?: StringWithAggregatesFilter<"budgets"> | string
    userId?: StringWithAggregatesFilter<"budgets"> | string
  }

  export type usersCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    monobankToken?: string | null
    accounts?: accountsCreateNestedManyWithoutUserInput
    transactions?: transactionsCreateNestedManyWithoutUserInput
    categories?: categoriesCreateNestedManyWithoutUserInput
    budgets?: budgetsCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    monobankToken?: string | null
    accounts?: accountsUncheckedCreateNestedManyWithoutUserInput
    transactions?: transactionsUncheckedCreateNestedManyWithoutUserInput
    categories?: categoriesUncheckedCreateNestedManyWithoutUserInput
    budgets?: budgetsUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    monobankToken?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: accountsUpdateManyWithoutUserNestedInput
    transactions?: transactionsUpdateManyWithoutUserNestedInput
    categories?: categoriesUpdateManyWithoutUserNestedInput
    budgets?: budgetsUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    monobankToken?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: accountsUncheckedUpdateManyWithoutUserNestedInput
    transactions?: transactionsUncheckedUpdateManyWithoutUserNestedInput
    categories?: categoriesUncheckedUpdateManyWithoutUserNestedInput
    budgets?: budgetsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type usersCreateManyInput = {
    id?: string
    email: string
    password: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    monobankToken?: string | null
  }

  export type usersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    monobankToken?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    monobankToken?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type accountsCreateInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    balance: number
    currency: string
    bankId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: usersCreateNestedOneWithoutAccountsInput
    sourceTransactions?: transactionsCreateNestedManyWithoutSourceAccountInput
    destinationTransactions?: transactionsCreateNestedManyWithoutDestinationAccountInput
  }

  export type accountsUncheckedCreateInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    balance: number
    currency: string
    bankId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    sourceTransactions?: transactionsUncheckedCreateNestedManyWithoutSourceAccountInput
    destinationTransactions?: transactionsUncheckedCreateNestedManyWithoutDestinationAccountInput
  }

  export type accountsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    balance?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutAccountsNestedInput
    sourceTransactions?: transactionsUpdateManyWithoutSourceAccountNestedInput
    destinationTransactions?: transactionsUpdateManyWithoutDestinationAccountNestedInput
  }

  export type accountsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    balance?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    sourceTransactions?: transactionsUncheckedUpdateManyWithoutSourceAccountNestedInput
    destinationTransactions?: transactionsUncheckedUpdateManyWithoutDestinationAccountNestedInput
  }

  export type accountsCreateManyInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    balance: number
    currency: string
    bankId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type accountsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    balance?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type accountsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    balance?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type transactionsCreateInput = {
    id?: string
    sourceAmount: number
    destinationAmount: number
    description: string
    date: Date | string
    type: $Enums.TransactionType
    bankTransactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    sourceAccount?: accountsCreateNestedOneWithoutSourceTransactionsInput
    destinationAccount?: accountsCreateNestedOneWithoutDestinationTransactionsInput
    category?: categoriesCreateNestedOneWithoutTransactionsInput
    user: usersCreateNestedOneWithoutTransactionsInput
  }

  export type transactionsUncheckedCreateInput = {
    id?: string
    sourceAmount: number
    destinationAmount: number
    description: string
    date: Date | string
    type: $Enums.TransactionType
    bankTransactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    sourceAccountId?: string | null
    destinationAccountId?: string | null
    categoryId?: string | null
    userId: string
  }

  export type transactionsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceAmount?: IntFieldUpdateOperationsInput | number
    destinationAmount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    bankTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sourceAccount?: accountsUpdateOneWithoutSourceTransactionsNestedInput
    destinationAccount?: accountsUpdateOneWithoutDestinationTransactionsNestedInput
    category?: categoriesUpdateOneWithoutTransactionsNestedInput
    user?: usersUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type transactionsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceAmount?: IntFieldUpdateOperationsInput | number
    destinationAmount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    bankTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type transactionsCreateManyInput = {
    id?: string
    sourceAmount: number
    destinationAmount: number
    description: string
    date: Date | string
    type: $Enums.TransactionType
    bankTransactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    sourceAccountId?: string | null
    destinationAccountId?: string | null
    categoryId?: string | null
    userId: string
  }

  export type transactionsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceAmount?: IntFieldUpdateOperationsInput | number
    destinationAmount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    bankTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type transactionsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceAmount?: IntFieldUpdateOperationsInput | number
    destinationAmount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    bankTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type categoriesCreateInput = {
    id?: string
    name: string
    type: $Enums.CategoryType
    bgColor: string
    fgColor: string
    icon: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: usersCreateNestedOneWithoutCategoriesInput
    transactions?: transactionsCreateNestedManyWithoutCategoryInput
    budgets?: budgetsCreateNestedManyWithoutCategoryInput
  }

  export type categoriesUncheckedCreateInput = {
    id?: string
    name: string
    type: $Enums.CategoryType
    bgColor: string
    fgColor: string
    icon: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    transactions?: transactionsUncheckedCreateNestedManyWithoutCategoryInput
    budgets?: budgetsUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type categoriesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCategoryTypeFieldUpdateOperationsInput | $Enums.CategoryType
    bgColor?: StringFieldUpdateOperationsInput | string
    fgColor?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutCategoriesNestedInput
    transactions?: transactionsUpdateManyWithoutCategoryNestedInput
    budgets?: budgetsUpdateManyWithoutCategoryNestedInput
  }

  export type categoriesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCategoryTypeFieldUpdateOperationsInput | $Enums.CategoryType
    bgColor?: StringFieldUpdateOperationsInput | string
    fgColor?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    transactions?: transactionsUncheckedUpdateManyWithoutCategoryNestedInput
    budgets?: budgetsUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type categoriesCreateManyInput = {
    id?: string
    name: string
    type: $Enums.CategoryType
    bgColor: string
    fgColor: string
    icon: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type categoriesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCategoryTypeFieldUpdateOperationsInput | $Enums.CategoryType
    bgColor?: StringFieldUpdateOperationsInput | string
    fgColor?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type categoriesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCategoryTypeFieldUpdateOperationsInput | $Enums.CategoryType
    bgColor?: StringFieldUpdateOperationsInput | string
    fgColor?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type budgetsCreateInput = {
    id?: string
    name: string
    plannedAmount: number
    actualAmount: number
    period: $Enums.BudgetPeriod
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    category: categoriesCreateNestedOneWithoutBudgetsInput
    user: usersCreateNestedOneWithoutBudgetsInput
  }

  export type budgetsUncheckedCreateInput = {
    id?: string
    name: string
    plannedAmount: number
    actualAmount: number
    period: $Enums.BudgetPeriod
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: string
    userId: string
  }

  export type budgetsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plannedAmount?: IntFieldUpdateOperationsInput | number
    actualAmount?: IntFieldUpdateOperationsInput | number
    period?: EnumBudgetPeriodFieldUpdateOperationsInput | $Enums.BudgetPeriod
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: categoriesUpdateOneRequiredWithoutBudgetsNestedInput
    user?: usersUpdateOneRequiredWithoutBudgetsNestedInput
  }

  export type budgetsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plannedAmount?: IntFieldUpdateOperationsInput | number
    actualAmount?: IntFieldUpdateOperationsInput | number
    period?: EnumBudgetPeriodFieldUpdateOperationsInput | $Enums.BudgetPeriod
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type budgetsCreateManyInput = {
    id?: string
    name: string
    plannedAmount: number
    actualAmount: number
    period: $Enums.BudgetPeriod
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: string
    userId: string
  }

  export type budgetsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plannedAmount?: IntFieldUpdateOperationsInput | number
    actualAmount?: IntFieldUpdateOperationsInput | number
    period?: EnumBudgetPeriodFieldUpdateOperationsInput | $Enums.BudgetPeriod
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type budgetsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plannedAmount?: IntFieldUpdateOperationsInput | number
    actualAmount?: IntFieldUpdateOperationsInput | number
    period?: EnumBudgetPeriodFieldUpdateOperationsInput | $Enums.BudgetPeriod
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type AccountsListRelationFilter = {
    every?: accountsWhereInput
    some?: accountsWhereInput
    none?: accountsWhereInput
  }

  export type TransactionsListRelationFilter = {
    every?: transactionsWhereInput
    some?: transactionsWhereInput
    none?: transactionsWhereInput
  }

  export type CategoriesListRelationFilter = {
    every?: categoriesWhereInput
    some?: categoriesWhereInput
    none?: categoriesWhereInput
  }

  export type BudgetsListRelationFilter = {
    every?: budgetsWhereInput
    some?: budgetsWhereInput
    none?: budgetsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type accountsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type transactionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type categoriesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type budgetsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    monobankToken?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    monobankToken?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    monobankToken?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumAccountTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[]
    notIn?: $Enums.AccountType[]
    not?: NestedEnumAccountTypeFilter<$PrismaModel> | $Enums.AccountType
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type accountsUserIdBankIdCompoundUniqueInput = {
    userId: string
    bankId: string
  }

  export type accountsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    balance?: SortOrder
    currency?: SortOrder
    bankId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type accountsAvgOrderByAggregateInput = {
    balance?: SortOrder
  }

  export type accountsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    balance?: SortOrder
    currency?: SortOrder
    bankId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type accountsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    balance?: SortOrder
    currency?: SortOrder
    bankId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type accountsSumOrderByAggregateInput = {
    balance?: SortOrder
  }

  export type EnumAccountTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[]
    notIn?: $Enums.AccountType[]
    not?: NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel> | $Enums.AccountType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccountTypeFilter<$PrismaModel>
    _max?: NestedEnumAccountTypeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[]
    notIn?: $Enums.TransactionType[]
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AccountsNullableScalarRelationFilter = {
    is?: accountsWhereInput | null
    isNot?: accountsWhereInput | null
  }

  export type CategoriesNullableScalarRelationFilter = {
    is?: categoriesWhereInput | null
    isNot?: categoriesWhereInput | null
  }

  export type transactionsCountOrderByAggregateInput = {
    id?: SortOrder
    sourceAmount?: SortOrder
    destinationAmount?: SortOrder
    description?: SortOrder
    date?: SortOrder
    type?: SortOrder
    bankTransactionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    sourceAccountId?: SortOrder
    destinationAccountId?: SortOrder
    categoryId?: SortOrder
    userId?: SortOrder
  }

  export type transactionsAvgOrderByAggregateInput = {
    sourceAmount?: SortOrder
    destinationAmount?: SortOrder
  }

  export type transactionsMaxOrderByAggregateInput = {
    id?: SortOrder
    sourceAmount?: SortOrder
    destinationAmount?: SortOrder
    description?: SortOrder
    date?: SortOrder
    type?: SortOrder
    bankTransactionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    sourceAccountId?: SortOrder
    destinationAccountId?: SortOrder
    categoryId?: SortOrder
    userId?: SortOrder
  }

  export type transactionsMinOrderByAggregateInput = {
    id?: SortOrder
    sourceAmount?: SortOrder
    destinationAmount?: SortOrder
    description?: SortOrder
    date?: SortOrder
    type?: SortOrder
    bankTransactionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    sourceAccountId?: SortOrder
    destinationAccountId?: SortOrder
    categoryId?: SortOrder
    userId?: SortOrder
  }

  export type transactionsSumOrderByAggregateInput = {
    sourceAmount?: SortOrder
    destinationAmount?: SortOrder
  }

  export type EnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[]
    notIn?: $Enums.TransactionType[]
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumCategoryTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CategoryType | EnumCategoryTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CategoryType[]
    notIn?: $Enums.CategoryType[]
    not?: NestedEnumCategoryTypeFilter<$PrismaModel> | $Enums.CategoryType
  }

  export type categoriesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    bgColor?: SortOrder
    fgColor?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type categoriesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    bgColor?: SortOrder
    fgColor?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type categoriesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    bgColor?: SortOrder
    fgColor?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type EnumCategoryTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CategoryType | EnumCategoryTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CategoryType[]
    notIn?: $Enums.CategoryType[]
    not?: NestedEnumCategoryTypeWithAggregatesFilter<$PrismaModel> | $Enums.CategoryType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCategoryTypeFilter<$PrismaModel>
    _max?: NestedEnumCategoryTypeFilter<$PrismaModel>
  }

  export type EnumBudgetPeriodFilter<$PrismaModel = never> = {
    equals?: $Enums.BudgetPeriod | EnumBudgetPeriodFieldRefInput<$PrismaModel>
    in?: $Enums.BudgetPeriod[]
    notIn?: $Enums.BudgetPeriod[]
    not?: NestedEnumBudgetPeriodFilter<$PrismaModel> | $Enums.BudgetPeriod
  }

  export type CategoriesScalarRelationFilter = {
    is?: categoriesWhereInput
    isNot?: categoriesWhereInput
  }

  export type budgetsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    plannedAmount?: SortOrder
    actualAmount?: SortOrder
    period?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categoryId?: SortOrder
    userId?: SortOrder
  }

  export type budgetsAvgOrderByAggregateInput = {
    plannedAmount?: SortOrder
    actualAmount?: SortOrder
  }

  export type budgetsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    plannedAmount?: SortOrder
    actualAmount?: SortOrder
    period?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categoryId?: SortOrder
    userId?: SortOrder
  }

  export type budgetsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    plannedAmount?: SortOrder
    actualAmount?: SortOrder
    period?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categoryId?: SortOrder
    userId?: SortOrder
  }

  export type budgetsSumOrderByAggregateInput = {
    plannedAmount?: SortOrder
    actualAmount?: SortOrder
  }

  export type EnumBudgetPeriodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BudgetPeriod | EnumBudgetPeriodFieldRefInput<$PrismaModel>
    in?: $Enums.BudgetPeriod[]
    notIn?: $Enums.BudgetPeriod[]
    not?: NestedEnumBudgetPeriodWithAggregatesFilter<$PrismaModel> | $Enums.BudgetPeriod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBudgetPeriodFilter<$PrismaModel>
    _max?: NestedEnumBudgetPeriodFilter<$PrismaModel>
  }

  export type accountsCreateNestedManyWithoutUserInput = {
    create?: XOR<accountsCreateWithoutUserInput, accountsUncheckedCreateWithoutUserInput> | accountsCreateWithoutUserInput[] | accountsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: accountsCreateOrConnectWithoutUserInput | accountsCreateOrConnectWithoutUserInput[]
    createMany?: accountsCreateManyUserInputEnvelope
    connect?: accountsWhereUniqueInput | accountsWhereUniqueInput[]
  }

  export type transactionsCreateNestedManyWithoutUserInput = {
    create?: XOR<transactionsCreateWithoutUserInput, transactionsUncheckedCreateWithoutUserInput> | transactionsCreateWithoutUserInput[] | transactionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: transactionsCreateOrConnectWithoutUserInput | transactionsCreateOrConnectWithoutUserInput[]
    createMany?: transactionsCreateManyUserInputEnvelope
    connect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
  }

  export type categoriesCreateNestedManyWithoutUserInput = {
    create?: XOR<categoriesCreateWithoutUserInput, categoriesUncheckedCreateWithoutUserInput> | categoriesCreateWithoutUserInput[] | categoriesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: categoriesCreateOrConnectWithoutUserInput | categoriesCreateOrConnectWithoutUserInput[]
    createMany?: categoriesCreateManyUserInputEnvelope
    connect?: categoriesWhereUniqueInput | categoriesWhereUniqueInput[]
  }

  export type budgetsCreateNestedManyWithoutUserInput = {
    create?: XOR<budgetsCreateWithoutUserInput, budgetsUncheckedCreateWithoutUserInput> | budgetsCreateWithoutUserInput[] | budgetsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: budgetsCreateOrConnectWithoutUserInput | budgetsCreateOrConnectWithoutUserInput[]
    createMany?: budgetsCreateManyUserInputEnvelope
    connect?: budgetsWhereUniqueInput | budgetsWhereUniqueInput[]
  }

  export type accountsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<accountsCreateWithoutUserInput, accountsUncheckedCreateWithoutUserInput> | accountsCreateWithoutUserInput[] | accountsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: accountsCreateOrConnectWithoutUserInput | accountsCreateOrConnectWithoutUserInput[]
    createMany?: accountsCreateManyUserInputEnvelope
    connect?: accountsWhereUniqueInput | accountsWhereUniqueInput[]
  }

  export type transactionsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<transactionsCreateWithoutUserInput, transactionsUncheckedCreateWithoutUserInput> | transactionsCreateWithoutUserInput[] | transactionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: transactionsCreateOrConnectWithoutUserInput | transactionsCreateOrConnectWithoutUserInput[]
    createMany?: transactionsCreateManyUserInputEnvelope
    connect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
  }

  export type categoriesUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<categoriesCreateWithoutUserInput, categoriesUncheckedCreateWithoutUserInput> | categoriesCreateWithoutUserInput[] | categoriesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: categoriesCreateOrConnectWithoutUserInput | categoriesCreateOrConnectWithoutUserInput[]
    createMany?: categoriesCreateManyUserInputEnvelope
    connect?: categoriesWhereUniqueInput | categoriesWhereUniqueInput[]
  }

  export type budgetsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<budgetsCreateWithoutUserInput, budgetsUncheckedCreateWithoutUserInput> | budgetsCreateWithoutUserInput[] | budgetsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: budgetsCreateOrConnectWithoutUserInput | budgetsCreateOrConnectWithoutUserInput[]
    createMany?: budgetsCreateManyUserInputEnvelope
    connect?: budgetsWhereUniqueInput | budgetsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type accountsUpdateManyWithoutUserNestedInput = {
    create?: XOR<accountsCreateWithoutUserInput, accountsUncheckedCreateWithoutUserInput> | accountsCreateWithoutUserInput[] | accountsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: accountsCreateOrConnectWithoutUserInput | accountsCreateOrConnectWithoutUserInput[]
    upsert?: accountsUpsertWithWhereUniqueWithoutUserInput | accountsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: accountsCreateManyUserInputEnvelope
    set?: accountsWhereUniqueInput | accountsWhereUniqueInput[]
    disconnect?: accountsWhereUniqueInput | accountsWhereUniqueInput[]
    delete?: accountsWhereUniqueInput | accountsWhereUniqueInput[]
    connect?: accountsWhereUniqueInput | accountsWhereUniqueInput[]
    update?: accountsUpdateWithWhereUniqueWithoutUserInput | accountsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: accountsUpdateManyWithWhereWithoutUserInput | accountsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: accountsScalarWhereInput | accountsScalarWhereInput[]
  }

  export type transactionsUpdateManyWithoutUserNestedInput = {
    create?: XOR<transactionsCreateWithoutUserInput, transactionsUncheckedCreateWithoutUserInput> | transactionsCreateWithoutUserInput[] | transactionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: transactionsCreateOrConnectWithoutUserInput | transactionsCreateOrConnectWithoutUserInput[]
    upsert?: transactionsUpsertWithWhereUniqueWithoutUserInput | transactionsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: transactionsCreateManyUserInputEnvelope
    set?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    disconnect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    delete?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    connect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    update?: transactionsUpdateWithWhereUniqueWithoutUserInput | transactionsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: transactionsUpdateManyWithWhereWithoutUserInput | transactionsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: transactionsScalarWhereInput | transactionsScalarWhereInput[]
  }

  export type categoriesUpdateManyWithoutUserNestedInput = {
    create?: XOR<categoriesCreateWithoutUserInput, categoriesUncheckedCreateWithoutUserInput> | categoriesCreateWithoutUserInput[] | categoriesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: categoriesCreateOrConnectWithoutUserInput | categoriesCreateOrConnectWithoutUserInput[]
    upsert?: categoriesUpsertWithWhereUniqueWithoutUserInput | categoriesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: categoriesCreateManyUserInputEnvelope
    set?: categoriesWhereUniqueInput | categoriesWhereUniqueInput[]
    disconnect?: categoriesWhereUniqueInput | categoriesWhereUniqueInput[]
    delete?: categoriesWhereUniqueInput | categoriesWhereUniqueInput[]
    connect?: categoriesWhereUniqueInput | categoriesWhereUniqueInput[]
    update?: categoriesUpdateWithWhereUniqueWithoutUserInput | categoriesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: categoriesUpdateManyWithWhereWithoutUserInput | categoriesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: categoriesScalarWhereInput | categoriesScalarWhereInput[]
  }

  export type budgetsUpdateManyWithoutUserNestedInput = {
    create?: XOR<budgetsCreateWithoutUserInput, budgetsUncheckedCreateWithoutUserInput> | budgetsCreateWithoutUserInput[] | budgetsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: budgetsCreateOrConnectWithoutUserInput | budgetsCreateOrConnectWithoutUserInput[]
    upsert?: budgetsUpsertWithWhereUniqueWithoutUserInput | budgetsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: budgetsCreateManyUserInputEnvelope
    set?: budgetsWhereUniqueInput | budgetsWhereUniqueInput[]
    disconnect?: budgetsWhereUniqueInput | budgetsWhereUniqueInput[]
    delete?: budgetsWhereUniqueInput | budgetsWhereUniqueInput[]
    connect?: budgetsWhereUniqueInput | budgetsWhereUniqueInput[]
    update?: budgetsUpdateWithWhereUniqueWithoutUserInput | budgetsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: budgetsUpdateManyWithWhereWithoutUserInput | budgetsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: budgetsScalarWhereInput | budgetsScalarWhereInput[]
  }

  export type accountsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<accountsCreateWithoutUserInput, accountsUncheckedCreateWithoutUserInput> | accountsCreateWithoutUserInput[] | accountsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: accountsCreateOrConnectWithoutUserInput | accountsCreateOrConnectWithoutUserInput[]
    upsert?: accountsUpsertWithWhereUniqueWithoutUserInput | accountsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: accountsCreateManyUserInputEnvelope
    set?: accountsWhereUniqueInput | accountsWhereUniqueInput[]
    disconnect?: accountsWhereUniqueInput | accountsWhereUniqueInput[]
    delete?: accountsWhereUniqueInput | accountsWhereUniqueInput[]
    connect?: accountsWhereUniqueInput | accountsWhereUniqueInput[]
    update?: accountsUpdateWithWhereUniqueWithoutUserInput | accountsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: accountsUpdateManyWithWhereWithoutUserInput | accountsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: accountsScalarWhereInput | accountsScalarWhereInput[]
  }

  export type transactionsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<transactionsCreateWithoutUserInput, transactionsUncheckedCreateWithoutUserInput> | transactionsCreateWithoutUserInput[] | transactionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: transactionsCreateOrConnectWithoutUserInput | transactionsCreateOrConnectWithoutUserInput[]
    upsert?: transactionsUpsertWithWhereUniqueWithoutUserInput | transactionsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: transactionsCreateManyUserInputEnvelope
    set?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    disconnect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    delete?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    connect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    update?: transactionsUpdateWithWhereUniqueWithoutUserInput | transactionsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: transactionsUpdateManyWithWhereWithoutUserInput | transactionsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: transactionsScalarWhereInput | transactionsScalarWhereInput[]
  }

  export type categoriesUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<categoriesCreateWithoutUserInput, categoriesUncheckedCreateWithoutUserInput> | categoriesCreateWithoutUserInput[] | categoriesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: categoriesCreateOrConnectWithoutUserInput | categoriesCreateOrConnectWithoutUserInput[]
    upsert?: categoriesUpsertWithWhereUniqueWithoutUserInput | categoriesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: categoriesCreateManyUserInputEnvelope
    set?: categoriesWhereUniqueInput | categoriesWhereUniqueInput[]
    disconnect?: categoriesWhereUniqueInput | categoriesWhereUniqueInput[]
    delete?: categoriesWhereUniqueInput | categoriesWhereUniqueInput[]
    connect?: categoriesWhereUniqueInput | categoriesWhereUniqueInput[]
    update?: categoriesUpdateWithWhereUniqueWithoutUserInput | categoriesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: categoriesUpdateManyWithWhereWithoutUserInput | categoriesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: categoriesScalarWhereInput | categoriesScalarWhereInput[]
  }

  export type budgetsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<budgetsCreateWithoutUserInput, budgetsUncheckedCreateWithoutUserInput> | budgetsCreateWithoutUserInput[] | budgetsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: budgetsCreateOrConnectWithoutUserInput | budgetsCreateOrConnectWithoutUserInput[]
    upsert?: budgetsUpsertWithWhereUniqueWithoutUserInput | budgetsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: budgetsCreateManyUserInputEnvelope
    set?: budgetsWhereUniqueInput | budgetsWhereUniqueInput[]
    disconnect?: budgetsWhereUniqueInput | budgetsWhereUniqueInput[]
    delete?: budgetsWhereUniqueInput | budgetsWhereUniqueInput[]
    connect?: budgetsWhereUniqueInput | budgetsWhereUniqueInput[]
    update?: budgetsUpdateWithWhereUniqueWithoutUserInput | budgetsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: budgetsUpdateManyWithWhereWithoutUserInput | budgetsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: budgetsScalarWhereInput | budgetsScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutAccountsInput = {
    create?: XOR<usersCreateWithoutAccountsInput, usersUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: usersCreateOrConnectWithoutAccountsInput
    connect?: usersWhereUniqueInput
  }

  export type transactionsCreateNestedManyWithoutSourceAccountInput = {
    create?: XOR<transactionsCreateWithoutSourceAccountInput, transactionsUncheckedCreateWithoutSourceAccountInput> | transactionsCreateWithoutSourceAccountInput[] | transactionsUncheckedCreateWithoutSourceAccountInput[]
    connectOrCreate?: transactionsCreateOrConnectWithoutSourceAccountInput | transactionsCreateOrConnectWithoutSourceAccountInput[]
    createMany?: transactionsCreateManySourceAccountInputEnvelope
    connect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
  }

  export type transactionsCreateNestedManyWithoutDestinationAccountInput = {
    create?: XOR<transactionsCreateWithoutDestinationAccountInput, transactionsUncheckedCreateWithoutDestinationAccountInput> | transactionsCreateWithoutDestinationAccountInput[] | transactionsUncheckedCreateWithoutDestinationAccountInput[]
    connectOrCreate?: transactionsCreateOrConnectWithoutDestinationAccountInput | transactionsCreateOrConnectWithoutDestinationAccountInput[]
    createMany?: transactionsCreateManyDestinationAccountInputEnvelope
    connect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
  }

  export type transactionsUncheckedCreateNestedManyWithoutSourceAccountInput = {
    create?: XOR<transactionsCreateWithoutSourceAccountInput, transactionsUncheckedCreateWithoutSourceAccountInput> | transactionsCreateWithoutSourceAccountInput[] | transactionsUncheckedCreateWithoutSourceAccountInput[]
    connectOrCreate?: transactionsCreateOrConnectWithoutSourceAccountInput | transactionsCreateOrConnectWithoutSourceAccountInput[]
    createMany?: transactionsCreateManySourceAccountInputEnvelope
    connect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
  }

  export type transactionsUncheckedCreateNestedManyWithoutDestinationAccountInput = {
    create?: XOR<transactionsCreateWithoutDestinationAccountInput, transactionsUncheckedCreateWithoutDestinationAccountInput> | transactionsCreateWithoutDestinationAccountInput[] | transactionsUncheckedCreateWithoutDestinationAccountInput[]
    connectOrCreate?: transactionsCreateOrConnectWithoutDestinationAccountInput | transactionsCreateOrConnectWithoutDestinationAccountInput[]
    createMany?: transactionsCreateManyDestinationAccountInputEnvelope
    connect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
  }

  export type EnumAccountTypeFieldUpdateOperationsInput = {
    set?: $Enums.AccountType
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type usersUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<usersCreateWithoutAccountsInput, usersUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: usersCreateOrConnectWithoutAccountsInput
    upsert?: usersUpsertWithoutAccountsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutAccountsInput, usersUpdateWithoutAccountsInput>, usersUncheckedUpdateWithoutAccountsInput>
  }

  export type transactionsUpdateManyWithoutSourceAccountNestedInput = {
    create?: XOR<transactionsCreateWithoutSourceAccountInput, transactionsUncheckedCreateWithoutSourceAccountInput> | transactionsCreateWithoutSourceAccountInput[] | transactionsUncheckedCreateWithoutSourceAccountInput[]
    connectOrCreate?: transactionsCreateOrConnectWithoutSourceAccountInput | transactionsCreateOrConnectWithoutSourceAccountInput[]
    upsert?: transactionsUpsertWithWhereUniqueWithoutSourceAccountInput | transactionsUpsertWithWhereUniqueWithoutSourceAccountInput[]
    createMany?: transactionsCreateManySourceAccountInputEnvelope
    set?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    disconnect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    delete?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    connect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    update?: transactionsUpdateWithWhereUniqueWithoutSourceAccountInput | transactionsUpdateWithWhereUniqueWithoutSourceAccountInput[]
    updateMany?: transactionsUpdateManyWithWhereWithoutSourceAccountInput | transactionsUpdateManyWithWhereWithoutSourceAccountInput[]
    deleteMany?: transactionsScalarWhereInput | transactionsScalarWhereInput[]
  }

  export type transactionsUpdateManyWithoutDestinationAccountNestedInput = {
    create?: XOR<transactionsCreateWithoutDestinationAccountInput, transactionsUncheckedCreateWithoutDestinationAccountInput> | transactionsCreateWithoutDestinationAccountInput[] | transactionsUncheckedCreateWithoutDestinationAccountInput[]
    connectOrCreate?: transactionsCreateOrConnectWithoutDestinationAccountInput | transactionsCreateOrConnectWithoutDestinationAccountInput[]
    upsert?: transactionsUpsertWithWhereUniqueWithoutDestinationAccountInput | transactionsUpsertWithWhereUniqueWithoutDestinationAccountInput[]
    createMany?: transactionsCreateManyDestinationAccountInputEnvelope
    set?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    disconnect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    delete?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    connect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    update?: transactionsUpdateWithWhereUniqueWithoutDestinationAccountInput | transactionsUpdateWithWhereUniqueWithoutDestinationAccountInput[]
    updateMany?: transactionsUpdateManyWithWhereWithoutDestinationAccountInput | transactionsUpdateManyWithWhereWithoutDestinationAccountInput[]
    deleteMany?: transactionsScalarWhereInput | transactionsScalarWhereInput[]
  }

  export type transactionsUncheckedUpdateManyWithoutSourceAccountNestedInput = {
    create?: XOR<transactionsCreateWithoutSourceAccountInput, transactionsUncheckedCreateWithoutSourceAccountInput> | transactionsCreateWithoutSourceAccountInput[] | transactionsUncheckedCreateWithoutSourceAccountInput[]
    connectOrCreate?: transactionsCreateOrConnectWithoutSourceAccountInput | transactionsCreateOrConnectWithoutSourceAccountInput[]
    upsert?: transactionsUpsertWithWhereUniqueWithoutSourceAccountInput | transactionsUpsertWithWhereUniqueWithoutSourceAccountInput[]
    createMany?: transactionsCreateManySourceAccountInputEnvelope
    set?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    disconnect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    delete?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    connect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    update?: transactionsUpdateWithWhereUniqueWithoutSourceAccountInput | transactionsUpdateWithWhereUniqueWithoutSourceAccountInput[]
    updateMany?: transactionsUpdateManyWithWhereWithoutSourceAccountInput | transactionsUpdateManyWithWhereWithoutSourceAccountInput[]
    deleteMany?: transactionsScalarWhereInput | transactionsScalarWhereInput[]
  }

  export type transactionsUncheckedUpdateManyWithoutDestinationAccountNestedInput = {
    create?: XOR<transactionsCreateWithoutDestinationAccountInput, transactionsUncheckedCreateWithoutDestinationAccountInput> | transactionsCreateWithoutDestinationAccountInput[] | transactionsUncheckedCreateWithoutDestinationAccountInput[]
    connectOrCreate?: transactionsCreateOrConnectWithoutDestinationAccountInput | transactionsCreateOrConnectWithoutDestinationAccountInput[]
    upsert?: transactionsUpsertWithWhereUniqueWithoutDestinationAccountInput | transactionsUpsertWithWhereUniqueWithoutDestinationAccountInput[]
    createMany?: transactionsCreateManyDestinationAccountInputEnvelope
    set?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    disconnect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    delete?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    connect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    update?: transactionsUpdateWithWhereUniqueWithoutDestinationAccountInput | transactionsUpdateWithWhereUniqueWithoutDestinationAccountInput[]
    updateMany?: transactionsUpdateManyWithWhereWithoutDestinationAccountInput | transactionsUpdateManyWithWhereWithoutDestinationAccountInput[]
    deleteMany?: transactionsScalarWhereInput | transactionsScalarWhereInput[]
  }

  export type accountsCreateNestedOneWithoutSourceTransactionsInput = {
    create?: XOR<accountsCreateWithoutSourceTransactionsInput, accountsUncheckedCreateWithoutSourceTransactionsInput>
    connectOrCreate?: accountsCreateOrConnectWithoutSourceTransactionsInput
    connect?: accountsWhereUniqueInput
  }

  export type accountsCreateNestedOneWithoutDestinationTransactionsInput = {
    create?: XOR<accountsCreateWithoutDestinationTransactionsInput, accountsUncheckedCreateWithoutDestinationTransactionsInput>
    connectOrCreate?: accountsCreateOrConnectWithoutDestinationTransactionsInput
    connect?: accountsWhereUniqueInput
  }

  export type categoriesCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<categoriesCreateWithoutTransactionsInput, categoriesUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: categoriesCreateOrConnectWithoutTransactionsInput
    connect?: categoriesWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<usersCreateWithoutTransactionsInput, usersUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: usersCreateOrConnectWithoutTransactionsInput
    connect?: usersWhereUniqueInput
  }

  export type EnumTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.TransactionType
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type accountsUpdateOneWithoutSourceTransactionsNestedInput = {
    create?: XOR<accountsCreateWithoutSourceTransactionsInput, accountsUncheckedCreateWithoutSourceTransactionsInput>
    connectOrCreate?: accountsCreateOrConnectWithoutSourceTransactionsInput
    upsert?: accountsUpsertWithoutSourceTransactionsInput
    disconnect?: accountsWhereInput | boolean
    delete?: accountsWhereInput | boolean
    connect?: accountsWhereUniqueInput
    update?: XOR<XOR<accountsUpdateToOneWithWhereWithoutSourceTransactionsInput, accountsUpdateWithoutSourceTransactionsInput>, accountsUncheckedUpdateWithoutSourceTransactionsInput>
  }

  export type accountsUpdateOneWithoutDestinationTransactionsNestedInput = {
    create?: XOR<accountsCreateWithoutDestinationTransactionsInput, accountsUncheckedCreateWithoutDestinationTransactionsInput>
    connectOrCreate?: accountsCreateOrConnectWithoutDestinationTransactionsInput
    upsert?: accountsUpsertWithoutDestinationTransactionsInput
    disconnect?: accountsWhereInput | boolean
    delete?: accountsWhereInput | boolean
    connect?: accountsWhereUniqueInput
    update?: XOR<XOR<accountsUpdateToOneWithWhereWithoutDestinationTransactionsInput, accountsUpdateWithoutDestinationTransactionsInput>, accountsUncheckedUpdateWithoutDestinationTransactionsInput>
  }

  export type categoriesUpdateOneWithoutTransactionsNestedInput = {
    create?: XOR<categoriesCreateWithoutTransactionsInput, categoriesUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: categoriesCreateOrConnectWithoutTransactionsInput
    upsert?: categoriesUpsertWithoutTransactionsInput
    disconnect?: categoriesWhereInput | boolean
    delete?: categoriesWhereInput | boolean
    connect?: categoriesWhereUniqueInput
    update?: XOR<XOR<categoriesUpdateToOneWithWhereWithoutTransactionsInput, categoriesUpdateWithoutTransactionsInput>, categoriesUncheckedUpdateWithoutTransactionsInput>
  }

  export type usersUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<usersCreateWithoutTransactionsInput, usersUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: usersCreateOrConnectWithoutTransactionsInput
    upsert?: usersUpsertWithoutTransactionsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutTransactionsInput, usersUpdateWithoutTransactionsInput>, usersUncheckedUpdateWithoutTransactionsInput>
  }

  export type usersCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<usersCreateWithoutCategoriesInput, usersUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: usersCreateOrConnectWithoutCategoriesInput
    connect?: usersWhereUniqueInput
  }

  export type transactionsCreateNestedManyWithoutCategoryInput = {
    create?: XOR<transactionsCreateWithoutCategoryInput, transactionsUncheckedCreateWithoutCategoryInput> | transactionsCreateWithoutCategoryInput[] | transactionsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: transactionsCreateOrConnectWithoutCategoryInput | transactionsCreateOrConnectWithoutCategoryInput[]
    createMany?: transactionsCreateManyCategoryInputEnvelope
    connect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
  }

  export type budgetsCreateNestedManyWithoutCategoryInput = {
    create?: XOR<budgetsCreateWithoutCategoryInput, budgetsUncheckedCreateWithoutCategoryInput> | budgetsCreateWithoutCategoryInput[] | budgetsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: budgetsCreateOrConnectWithoutCategoryInput | budgetsCreateOrConnectWithoutCategoryInput[]
    createMany?: budgetsCreateManyCategoryInputEnvelope
    connect?: budgetsWhereUniqueInput | budgetsWhereUniqueInput[]
  }

  export type transactionsUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<transactionsCreateWithoutCategoryInput, transactionsUncheckedCreateWithoutCategoryInput> | transactionsCreateWithoutCategoryInput[] | transactionsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: transactionsCreateOrConnectWithoutCategoryInput | transactionsCreateOrConnectWithoutCategoryInput[]
    createMany?: transactionsCreateManyCategoryInputEnvelope
    connect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
  }

  export type budgetsUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<budgetsCreateWithoutCategoryInput, budgetsUncheckedCreateWithoutCategoryInput> | budgetsCreateWithoutCategoryInput[] | budgetsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: budgetsCreateOrConnectWithoutCategoryInput | budgetsCreateOrConnectWithoutCategoryInput[]
    createMany?: budgetsCreateManyCategoryInputEnvelope
    connect?: budgetsWhereUniqueInput | budgetsWhereUniqueInput[]
  }

  export type EnumCategoryTypeFieldUpdateOperationsInput = {
    set?: $Enums.CategoryType
  }

  export type usersUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<usersCreateWithoutCategoriesInput, usersUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: usersCreateOrConnectWithoutCategoriesInput
    upsert?: usersUpsertWithoutCategoriesInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutCategoriesInput, usersUpdateWithoutCategoriesInput>, usersUncheckedUpdateWithoutCategoriesInput>
  }

  export type transactionsUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<transactionsCreateWithoutCategoryInput, transactionsUncheckedCreateWithoutCategoryInput> | transactionsCreateWithoutCategoryInput[] | transactionsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: transactionsCreateOrConnectWithoutCategoryInput | transactionsCreateOrConnectWithoutCategoryInput[]
    upsert?: transactionsUpsertWithWhereUniqueWithoutCategoryInput | transactionsUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: transactionsCreateManyCategoryInputEnvelope
    set?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    disconnect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    delete?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    connect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    update?: transactionsUpdateWithWhereUniqueWithoutCategoryInput | transactionsUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: transactionsUpdateManyWithWhereWithoutCategoryInput | transactionsUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: transactionsScalarWhereInput | transactionsScalarWhereInput[]
  }

  export type budgetsUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<budgetsCreateWithoutCategoryInput, budgetsUncheckedCreateWithoutCategoryInput> | budgetsCreateWithoutCategoryInput[] | budgetsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: budgetsCreateOrConnectWithoutCategoryInput | budgetsCreateOrConnectWithoutCategoryInput[]
    upsert?: budgetsUpsertWithWhereUniqueWithoutCategoryInput | budgetsUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: budgetsCreateManyCategoryInputEnvelope
    set?: budgetsWhereUniqueInput | budgetsWhereUniqueInput[]
    disconnect?: budgetsWhereUniqueInput | budgetsWhereUniqueInput[]
    delete?: budgetsWhereUniqueInput | budgetsWhereUniqueInput[]
    connect?: budgetsWhereUniqueInput | budgetsWhereUniqueInput[]
    update?: budgetsUpdateWithWhereUniqueWithoutCategoryInput | budgetsUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: budgetsUpdateManyWithWhereWithoutCategoryInput | budgetsUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: budgetsScalarWhereInput | budgetsScalarWhereInput[]
  }

  export type transactionsUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<transactionsCreateWithoutCategoryInput, transactionsUncheckedCreateWithoutCategoryInput> | transactionsCreateWithoutCategoryInput[] | transactionsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: transactionsCreateOrConnectWithoutCategoryInput | transactionsCreateOrConnectWithoutCategoryInput[]
    upsert?: transactionsUpsertWithWhereUniqueWithoutCategoryInput | transactionsUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: transactionsCreateManyCategoryInputEnvelope
    set?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    disconnect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    delete?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    connect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    update?: transactionsUpdateWithWhereUniqueWithoutCategoryInput | transactionsUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: transactionsUpdateManyWithWhereWithoutCategoryInput | transactionsUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: transactionsScalarWhereInput | transactionsScalarWhereInput[]
  }

  export type budgetsUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<budgetsCreateWithoutCategoryInput, budgetsUncheckedCreateWithoutCategoryInput> | budgetsCreateWithoutCategoryInput[] | budgetsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: budgetsCreateOrConnectWithoutCategoryInput | budgetsCreateOrConnectWithoutCategoryInput[]
    upsert?: budgetsUpsertWithWhereUniqueWithoutCategoryInput | budgetsUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: budgetsCreateManyCategoryInputEnvelope
    set?: budgetsWhereUniqueInput | budgetsWhereUniqueInput[]
    disconnect?: budgetsWhereUniqueInput | budgetsWhereUniqueInput[]
    delete?: budgetsWhereUniqueInput | budgetsWhereUniqueInput[]
    connect?: budgetsWhereUniqueInput | budgetsWhereUniqueInput[]
    update?: budgetsUpdateWithWhereUniqueWithoutCategoryInput | budgetsUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: budgetsUpdateManyWithWhereWithoutCategoryInput | budgetsUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: budgetsScalarWhereInput | budgetsScalarWhereInput[]
  }

  export type categoriesCreateNestedOneWithoutBudgetsInput = {
    create?: XOR<categoriesCreateWithoutBudgetsInput, categoriesUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: categoriesCreateOrConnectWithoutBudgetsInput
    connect?: categoriesWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutBudgetsInput = {
    create?: XOR<usersCreateWithoutBudgetsInput, usersUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: usersCreateOrConnectWithoutBudgetsInput
    connect?: usersWhereUniqueInput
  }

  export type EnumBudgetPeriodFieldUpdateOperationsInput = {
    set?: $Enums.BudgetPeriod
  }

  export type categoriesUpdateOneRequiredWithoutBudgetsNestedInput = {
    create?: XOR<categoriesCreateWithoutBudgetsInput, categoriesUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: categoriesCreateOrConnectWithoutBudgetsInput
    upsert?: categoriesUpsertWithoutBudgetsInput
    connect?: categoriesWhereUniqueInput
    update?: XOR<XOR<categoriesUpdateToOneWithWhereWithoutBudgetsInput, categoriesUpdateWithoutBudgetsInput>, categoriesUncheckedUpdateWithoutBudgetsInput>
  }

  export type usersUpdateOneRequiredWithoutBudgetsNestedInput = {
    create?: XOR<usersCreateWithoutBudgetsInput, usersUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: usersCreateOrConnectWithoutBudgetsInput
    upsert?: usersUpsertWithoutBudgetsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutBudgetsInput, usersUpdateWithoutBudgetsInput>, usersUncheckedUpdateWithoutBudgetsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumAccountTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[]
    notIn?: $Enums.AccountType[]
    not?: NestedEnumAccountTypeFilter<$PrismaModel> | $Enums.AccountType
  }

  export type NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[]
    notIn?: $Enums.AccountType[]
    not?: NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel> | $Enums.AccountType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccountTypeFilter<$PrismaModel>
    _max?: NestedEnumAccountTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[]
    notIn?: $Enums.TransactionType[]
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[]
    notIn?: $Enums.TransactionType[]
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumCategoryTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CategoryType | EnumCategoryTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CategoryType[]
    notIn?: $Enums.CategoryType[]
    not?: NestedEnumCategoryTypeFilter<$PrismaModel> | $Enums.CategoryType
  }

  export type NestedEnumCategoryTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CategoryType | EnumCategoryTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CategoryType[]
    notIn?: $Enums.CategoryType[]
    not?: NestedEnumCategoryTypeWithAggregatesFilter<$PrismaModel> | $Enums.CategoryType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCategoryTypeFilter<$PrismaModel>
    _max?: NestedEnumCategoryTypeFilter<$PrismaModel>
  }

  export type NestedEnumBudgetPeriodFilter<$PrismaModel = never> = {
    equals?: $Enums.BudgetPeriod | EnumBudgetPeriodFieldRefInput<$PrismaModel>
    in?: $Enums.BudgetPeriod[]
    notIn?: $Enums.BudgetPeriod[]
    not?: NestedEnumBudgetPeriodFilter<$PrismaModel> | $Enums.BudgetPeriod
  }

  export type NestedEnumBudgetPeriodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BudgetPeriod | EnumBudgetPeriodFieldRefInput<$PrismaModel>
    in?: $Enums.BudgetPeriod[]
    notIn?: $Enums.BudgetPeriod[]
    not?: NestedEnumBudgetPeriodWithAggregatesFilter<$PrismaModel> | $Enums.BudgetPeriod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBudgetPeriodFilter<$PrismaModel>
    _max?: NestedEnumBudgetPeriodFilter<$PrismaModel>
  }

  export type accountsCreateWithoutUserInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    balance: number
    currency: string
    bankId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sourceTransactions?: transactionsCreateNestedManyWithoutSourceAccountInput
    destinationTransactions?: transactionsCreateNestedManyWithoutDestinationAccountInput
  }

  export type accountsUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    balance: number
    currency: string
    bankId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sourceTransactions?: transactionsUncheckedCreateNestedManyWithoutSourceAccountInput
    destinationTransactions?: transactionsUncheckedCreateNestedManyWithoutDestinationAccountInput
  }

  export type accountsCreateOrConnectWithoutUserInput = {
    where: accountsWhereUniqueInput
    create: XOR<accountsCreateWithoutUserInput, accountsUncheckedCreateWithoutUserInput>
  }

  export type accountsCreateManyUserInputEnvelope = {
    data: accountsCreateManyUserInput | accountsCreateManyUserInput[]
  }

  export type transactionsCreateWithoutUserInput = {
    id?: string
    sourceAmount: number
    destinationAmount: number
    description: string
    date: Date | string
    type: $Enums.TransactionType
    bankTransactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    sourceAccount?: accountsCreateNestedOneWithoutSourceTransactionsInput
    destinationAccount?: accountsCreateNestedOneWithoutDestinationTransactionsInput
    category?: categoriesCreateNestedOneWithoutTransactionsInput
  }

  export type transactionsUncheckedCreateWithoutUserInput = {
    id?: string
    sourceAmount: number
    destinationAmount: number
    description: string
    date: Date | string
    type: $Enums.TransactionType
    bankTransactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    sourceAccountId?: string | null
    destinationAccountId?: string | null
    categoryId?: string | null
  }

  export type transactionsCreateOrConnectWithoutUserInput = {
    where: transactionsWhereUniqueInput
    create: XOR<transactionsCreateWithoutUserInput, transactionsUncheckedCreateWithoutUserInput>
  }

  export type transactionsCreateManyUserInputEnvelope = {
    data: transactionsCreateManyUserInput | transactionsCreateManyUserInput[]
  }

  export type categoriesCreateWithoutUserInput = {
    id?: string
    name: string
    type: $Enums.CategoryType
    bgColor: string
    fgColor: string
    icon: string
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: transactionsCreateNestedManyWithoutCategoryInput
    budgets?: budgetsCreateNestedManyWithoutCategoryInput
  }

  export type categoriesUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    type: $Enums.CategoryType
    bgColor: string
    fgColor: string
    icon: string
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: transactionsUncheckedCreateNestedManyWithoutCategoryInput
    budgets?: budgetsUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type categoriesCreateOrConnectWithoutUserInput = {
    where: categoriesWhereUniqueInput
    create: XOR<categoriesCreateWithoutUserInput, categoriesUncheckedCreateWithoutUserInput>
  }

  export type categoriesCreateManyUserInputEnvelope = {
    data: categoriesCreateManyUserInput | categoriesCreateManyUserInput[]
  }

  export type budgetsCreateWithoutUserInput = {
    id?: string
    name: string
    plannedAmount: number
    actualAmount: number
    period: $Enums.BudgetPeriod
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    category: categoriesCreateNestedOneWithoutBudgetsInput
  }

  export type budgetsUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    plannedAmount: number
    actualAmount: number
    period: $Enums.BudgetPeriod
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: string
  }

  export type budgetsCreateOrConnectWithoutUserInput = {
    where: budgetsWhereUniqueInput
    create: XOR<budgetsCreateWithoutUserInput, budgetsUncheckedCreateWithoutUserInput>
  }

  export type budgetsCreateManyUserInputEnvelope = {
    data: budgetsCreateManyUserInput | budgetsCreateManyUserInput[]
  }

  export type accountsUpsertWithWhereUniqueWithoutUserInput = {
    where: accountsWhereUniqueInput
    update: XOR<accountsUpdateWithoutUserInput, accountsUncheckedUpdateWithoutUserInput>
    create: XOR<accountsCreateWithoutUserInput, accountsUncheckedCreateWithoutUserInput>
  }

  export type accountsUpdateWithWhereUniqueWithoutUserInput = {
    where: accountsWhereUniqueInput
    data: XOR<accountsUpdateWithoutUserInput, accountsUncheckedUpdateWithoutUserInput>
  }

  export type accountsUpdateManyWithWhereWithoutUserInput = {
    where: accountsScalarWhereInput
    data: XOR<accountsUpdateManyMutationInput, accountsUncheckedUpdateManyWithoutUserInput>
  }

  export type accountsScalarWhereInput = {
    AND?: accountsScalarWhereInput | accountsScalarWhereInput[]
    OR?: accountsScalarWhereInput[]
    NOT?: accountsScalarWhereInput | accountsScalarWhereInput[]
    id?: StringFilter<"accounts"> | string
    name?: StringFilter<"accounts"> | string
    type?: EnumAccountTypeFilter<"accounts"> | $Enums.AccountType
    balance?: IntFilter<"accounts"> | number
    currency?: StringFilter<"accounts"> | string
    bankId?: StringNullableFilter<"accounts"> | string | null
    createdAt?: DateTimeFilter<"accounts"> | Date | string
    updatedAt?: DateTimeFilter<"accounts"> | Date | string
    userId?: StringFilter<"accounts"> | string
  }

  export type transactionsUpsertWithWhereUniqueWithoutUserInput = {
    where: transactionsWhereUniqueInput
    update: XOR<transactionsUpdateWithoutUserInput, transactionsUncheckedUpdateWithoutUserInput>
    create: XOR<transactionsCreateWithoutUserInput, transactionsUncheckedCreateWithoutUserInput>
  }

  export type transactionsUpdateWithWhereUniqueWithoutUserInput = {
    where: transactionsWhereUniqueInput
    data: XOR<transactionsUpdateWithoutUserInput, transactionsUncheckedUpdateWithoutUserInput>
  }

  export type transactionsUpdateManyWithWhereWithoutUserInput = {
    where: transactionsScalarWhereInput
    data: XOR<transactionsUpdateManyMutationInput, transactionsUncheckedUpdateManyWithoutUserInput>
  }

  export type transactionsScalarWhereInput = {
    AND?: transactionsScalarWhereInput | transactionsScalarWhereInput[]
    OR?: transactionsScalarWhereInput[]
    NOT?: transactionsScalarWhereInput | transactionsScalarWhereInput[]
    id?: StringFilter<"transactions"> | string
    sourceAmount?: IntFilter<"transactions"> | number
    destinationAmount?: IntFilter<"transactions"> | number
    description?: StringFilter<"transactions"> | string
    date?: DateTimeFilter<"transactions"> | Date | string
    type?: EnumTransactionTypeFilter<"transactions"> | $Enums.TransactionType
    bankTransactionId?: StringNullableFilter<"transactions"> | string | null
    createdAt?: DateTimeFilter<"transactions"> | Date | string
    updatedAt?: DateTimeFilter<"transactions"> | Date | string
    deletedAt?: DateTimeNullableFilter<"transactions"> | Date | string | null
    sourceAccountId?: StringNullableFilter<"transactions"> | string | null
    destinationAccountId?: StringNullableFilter<"transactions"> | string | null
    categoryId?: StringNullableFilter<"transactions"> | string | null
    userId?: StringFilter<"transactions"> | string
  }

  export type categoriesUpsertWithWhereUniqueWithoutUserInput = {
    where: categoriesWhereUniqueInput
    update: XOR<categoriesUpdateWithoutUserInput, categoriesUncheckedUpdateWithoutUserInput>
    create: XOR<categoriesCreateWithoutUserInput, categoriesUncheckedCreateWithoutUserInput>
  }

  export type categoriesUpdateWithWhereUniqueWithoutUserInput = {
    where: categoriesWhereUniqueInput
    data: XOR<categoriesUpdateWithoutUserInput, categoriesUncheckedUpdateWithoutUserInput>
  }

  export type categoriesUpdateManyWithWhereWithoutUserInput = {
    where: categoriesScalarWhereInput
    data: XOR<categoriesUpdateManyMutationInput, categoriesUncheckedUpdateManyWithoutUserInput>
  }

  export type categoriesScalarWhereInput = {
    AND?: categoriesScalarWhereInput | categoriesScalarWhereInput[]
    OR?: categoriesScalarWhereInput[]
    NOT?: categoriesScalarWhereInput | categoriesScalarWhereInput[]
    id?: StringFilter<"categories"> | string
    name?: StringFilter<"categories"> | string
    type?: EnumCategoryTypeFilter<"categories"> | $Enums.CategoryType
    bgColor?: StringFilter<"categories"> | string
    fgColor?: StringFilter<"categories"> | string
    icon?: StringFilter<"categories"> | string
    createdAt?: DateTimeFilter<"categories"> | Date | string
    updatedAt?: DateTimeFilter<"categories"> | Date | string
    userId?: StringFilter<"categories"> | string
  }

  export type budgetsUpsertWithWhereUniqueWithoutUserInput = {
    where: budgetsWhereUniqueInput
    update: XOR<budgetsUpdateWithoutUserInput, budgetsUncheckedUpdateWithoutUserInput>
    create: XOR<budgetsCreateWithoutUserInput, budgetsUncheckedCreateWithoutUserInput>
  }

  export type budgetsUpdateWithWhereUniqueWithoutUserInput = {
    where: budgetsWhereUniqueInput
    data: XOR<budgetsUpdateWithoutUserInput, budgetsUncheckedUpdateWithoutUserInput>
  }

  export type budgetsUpdateManyWithWhereWithoutUserInput = {
    where: budgetsScalarWhereInput
    data: XOR<budgetsUpdateManyMutationInput, budgetsUncheckedUpdateManyWithoutUserInput>
  }

  export type budgetsScalarWhereInput = {
    AND?: budgetsScalarWhereInput | budgetsScalarWhereInput[]
    OR?: budgetsScalarWhereInput[]
    NOT?: budgetsScalarWhereInput | budgetsScalarWhereInput[]
    id?: StringFilter<"budgets"> | string
    name?: StringFilter<"budgets"> | string
    plannedAmount?: IntFilter<"budgets"> | number
    actualAmount?: IntFilter<"budgets"> | number
    period?: EnumBudgetPeriodFilter<"budgets"> | $Enums.BudgetPeriod
    startDate?: DateTimeFilter<"budgets"> | Date | string
    endDate?: DateTimeFilter<"budgets"> | Date | string
    createdAt?: DateTimeFilter<"budgets"> | Date | string
    updatedAt?: DateTimeFilter<"budgets"> | Date | string
    categoryId?: StringFilter<"budgets"> | string
    userId?: StringFilter<"budgets"> | string
  }

  export type usersCreateWithoutAccountsInput = {
    id?: string
    email: string
    password: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    monobankToken?: string | null
    transactions?: transactionsCreateNestedManyWithoutUserInput
    categories?: categoriesCreateNestedManyWithoutUserInput
    budgets?: budgetsCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutAccountsInput = {
    id?: string
    email: string
    password: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    monobankToken?: string | null
    transactions?: transactionsUncheckedCreateNestedManyWithoutUserInput
    categories?: categoriesUncheckedCreateNestedManyWithoutUserInput
    budgets?: budgetsUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutAccountsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutAccountsInput, usersUncheckedCreateWithoutAccountsInput>
  }

  export type transactionsCreateWithoutSourceAccountInput = {
    id?: string
    sourceAmount: number
    destinationAmount: number
    description: string
    date: Date | string
    type: $Enums.TransactionType
    bankTransactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    destinationAccount?: accountsCreateNestedOneWithoutDestinationTransactionsInput
    category?: categoriesCreateNestedOneWithoutTransactionsInput
    user: usersCreateNestedOneWithoutTransactionsInput
  }

  export type transactionsUncheckedCreateWithoutSourceAccountInput = {
    id?: string
    sourceAmount: number
    destinationAmount: number
    description: string
    date: Date | string
    type: $Enums.TransactionType
    bankTransactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    destinationAccountId?: string | null
    categoryId?: string | null
    userId: string
  }

  export type transactionsCreateOrConnectWithoutSourceAccountInput = {
    where: transactionsWhereUniqueInput
    create: XOR<transactionsCreateWithoutSourceAccountInput, transactionsUncheckedCreateWithoutSourceAccountInput>
  }

  export type transactionsCreateManySourceAccountInputEnvelope = {
    data: transactionsCreateManySourceAccountInput | transactionsCreateManySourceAccountInput[]
  }

  export type transactionsCreateWithoutDestinationAccountInput = {
    id?: string
    sourceAmount: number
    destinationAmount: number
    description: string
    date: Date | string
    type: $Enums.TransactionType
    bankTransactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    sourceAccount?: accountsCreateNestedOneWithoutSourceTransactionsInput
    category?: categoriesCreateNestedOneWithoutTransactionsInput
    user: usersCreateNestedOneWithoutTransactionsInput
  }

  export type transactionsUncheckedCreateWithoutDestinationAccountInput = {
    id?: string
    sourceAmount: number
    destinationAmount: number
    description: string
    date: Date | string
    type: $Enums.TransactionType
    bankTransactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    sourceAccountId?: string | null
    categoryId?: string | null
    userId: string
  }

  export type transactionsCreateOrConnectWithoutDestinationAccountInput = {
    where: transactionsWhereUniqueInput
    create: XOR<transactionsCreateWithoutDestinationAccountInput, transactionsUncheckedCreateWithoutDestinationAccountInput>
  }

  export type transactionsCreateManyDestinationAccountInputEnvelope = {
    data: transactionsCreateManyDestinationAccountInput | transactionsCreateManyDestinationAccountInput[]
  }

  export type usersUpsertWithoutAccountsInput = {
    update: XOR<usersUpdateWithoutAccountsInput, usersUncheckedUpdateWithoutAccountsInput>
    create: XOR<usersCreateWithoutAccountsInput, usersUncheckedCreateWithoutAccountsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutAccountsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutAccountsInput, usersUncheckedUpdateWithoutAccountsInput>
  }

  export type usersUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    monobankToken?: NullableStringFieldUpdateOperationsInput | string | null
    transactions?: transactionsUpdateManyWithoutUserNestedInput
    categories?: categoriesUpdateManyWithoutUserNestedInput
    budgets?: budgetsUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    monobankToken?: NullableStringFieldUpdateOperationsInput | string | null
    transactions?: transactionsUncheckedUpdateManyWithoutUserNestedInput
    categories?: categoriesUncheckedUpdateManyWithoutUserNestedInput
    budgets?: budgetsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type transactionsUpsertWithWhereUniqueWithoutSourceAccountInput = {
    where: transactionsWhereUniqueInput
    update: XOR<transactionsUpdateWithoutSourceAccountInput, transactionsUncheckedUpdateWithoutSourceAccountInput>
    create: XOR<transactionsCreateWithoutSourceAccountInput, transactionsUncheckedCreateWithoutSourceAccountInput>
  }

  export type transactionsUpdateWithWhereUniqueWithoutSourceAccountInput = {
    where: transactionsWhereUniqueInput
    data: XOR<transactionsUpdateWithoutSourceAccountInput, transactionsUncheckedUpdateWithoutSourceAccountInput>
  }

  export type transactionsUpdateManyWithWhereWithoutSourceAccountInput = {
    where: transactionsScalarWhereInput
    data: XOR<transactionsUpdateManyMutationInput, transactionsUncheckedUpdateManyWithoutSourceAccountInput>
  }

  export type transactionsUpsertWithWhereUniqueWithoutDestinationAccountInput = {
    where: transactionsWhereUniqueInput
    update: XOR<transactionsUpdateWithoutDestinationAccountInput, transactionsUncheckedUpdateWithoutDestinationAccountInput>
    create: XOR<transactionsCreateWithoutDestinationAccountInput, transactionsUncheckedCreateWithoutDestinationAccountInput>
  }

  export type transactionsUpdateWithWhereUniqueWithoutDestinationAccountInput = {
    where: transactionsWhereUniqueInput
    data: XOR<transactionsUpdateWithoutDestinationAccountInput, transactionsUncheckedUpdateWithoutDestinationAccountInput>
  }

  export type transactionsUpdateManyWithWhereWithoutDestinationAccountInput = {
    where: transactionsScalarWhereInput
    data: XOR<transactionsUpdateManyMutationInput, transactionsUncheckedUpdateManyWithoutDestinationAccountInput>
  }

  export type accountsCreateWithoutSourceTransactionsInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    balance: number
    currency: string
    bankId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: usersCreateNestedOneWithoutAccountsInput
    destinationTransactions?: transactionsCreateNestedManyWithoutDestinationAccountInput
  }

  export type accountsUncheckedCreateWithoutSourceTransactionsInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    balance: number
    currency: string
    bankId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    destinationTransactions?: transactionsUncheckedCreateNestedManyWithoutDestinationAccountInput
  }

  export type accountsCreateOrConnectWithoutSourceTransactionsInput = {
    where: accountsWhereUniqueInput
    create: XOR<accountsCreateWithoutSourceTransactionsInput, accountsUncheckedCreateWithoutSourceTransactionsInput>
  }

  export type accountsCreateWithoutDestinationTransactionsInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    balance: number
    currency: string
    bankId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: usersCreateNestedOneWithoutAccountsInput
    sourceTransactions?: transactionsCreateNestedManyWithoutSourceAccountInput
  }

  export type accountsUncheckedCreateWithoutDestinationTransactionsInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    balance: number
    currency: string
    bankId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    sourceTransactions?: transactionsUncheckedCreateNestedManyWithoutSourceAccountInput
  }

  export type accountsCreateOrConnectWithoutDestinationTransactionsInput = {
    where: accountsWhereUniqueInput
    create: XOR<accountsCreateWithoutDestinationTransactionsInput, accountsUncheckedCreateWithoutDestinationTransactionsInput>
  }

  export type categoriesCreateWithoutTransactionsInput = {
    id?: string
    name: string
    type: $Enums.CategoryType
    bgColor: string
    fgColor: string
    icon: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: usersCreateNestedOneWithoutCategoriesInput
    budgets?: budgetsCreateNestedManyWithoutCategoryInput
  }

  export type categoriesUncheckedCreateWithoutTransactionsInput = {
    id?: string
    name: string
    type: $Enums.CategoryType
    bgColor: string
    fgColor: string
    icon: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    budgets?: budgetsUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type categoriesCreateOrConnectWithoutTransactionsInput = {
    where: categoriesWhereUniqueInput
    create: XOR<categoriesCreateWithoutTransactionsInput, categoriesUncheckedCreateWithoutTransactionsInput>
  }

  export type usersCreateWithoutTransactionsInput = {
    id?: string
    email: string
    password: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    monobankToken?: string | null
    accounts?: accountsCreateNestedManyWithoutUserInput
    categories?: categoriesCreateNestedManyWithoutUserInput
    budgets?: budgetsCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutTransactionsInput = {
    id?: string
    email: string
    password: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    monobankToken?: string | null
    accounts?: accountsUncheckedCreateNestedManyWithoutUserInput
    categories?: categoriesUncheckedCreateNestedManyWithoutUserInput
    budgets?: budgetsUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutTransactionsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutTransactionsInput, usersUncheckedCreateWithoutTransactionsInput>
  }

  export type accountsUpsertWithoutSourceTransactionsInput = {
    update: XOR<accountsUpdateWithoutSourceTransactionsInput, accountsUncheckedUpdateWithoutSourceTransactionsInput>
    create: XOR<accountsCreateWithoutSourceTransactionsInput, accountsUncheckedCreateWithoutSourceTransactionsInput>
    where?: accountsWhereInput
  }

  export type accountsUpdateToOneWithWhereWithoutSourceTransactionsInput = {
    where?: accountsWhereInput
    data: XOR<accountsUpdateWithoutSourceTransactionsInput, accountsUncheckedUpdateWithoutSourceTransactionsInput>
  }

  export type accountsUpdateWithoutSourceTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    balance?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutAccountsNestedInput
    destinationTransactions?: transactionsUpdateManyWithoutDestinationAccountNestedInput
  }

  export type accountsUncheckedUpdateWithoutSourceTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    balance?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    destinationTransactions?: transactionsUncheckedUpdateManyWithoutDestinationAccountNestedInput
  }

  export type accountsUpsertWithoutDestinationTransactionsInput = {
    update: XOR<accountsUpdateWithoutDestinationTransactionsInput, accountsUncheckedUpdateWithoutDestinationTransactionsInput>
    create: XOR<accountsCreateWithoutDestinationTransactionsInput, accountsUncheckedCreateWithoutDestinationTransactionsInput>
    where?: accountsWhereInput
  }

  export type accountsUpdateToOneWithWhereWithoutDestinationTransactionsInput = {
    where?: accountsWhereInput
    data: XOR<accountsUpdateWithoutDestinationTransactionsInput, accountsUncheckedUpdateWithoutDestinationTransactionsInput>
  }

  export type accountsUpdateWithoutDestinationTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    balance?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutAccountsNestedInput
    sourceTransactions?: transactionsUpdateManyWithoutSourceAccountNestedInput
  }

  export type accountsUncheckedUpdateWithoutDestinationTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    balance?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    sourceTransactions?: transactionsUncheckedUpdateManyWithoutSourceAccountNestedInput
  }

  export type categoriesUpsertWithoutTransactionsInput = {
    update: XOR<categoriesUpdateWithoutTransactionsInput, categoriesUncheckedUpdateWithoutTransactionsInput>
    create: XOR<categoriesCreateWithoutTransactionsInput, categoriesUncheckedCreateWithoutTransactionsInput>
    where?: categoriesWhereInput
  }

  export type categoriesUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: categoriesWhereInput
    data: XOR<categoriesUpdateWithoutTransactionsInput, categoriesUncheckedUpdateWithoutTransactionsInput>
  }

  export type categoriesUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCategoryTypeFieldUpdateOperationsInput | $Enums.CategoryType
    bgColor?: StringFieldUpdateOperationsInput | string
    fgColor?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutCategoriesNestedInput
    budgets?: budgetsUpdateManyWithoutCategoryNestedInput
  }

  export type categoriesUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCategoryTypeFieldUpdateOperationsInput | $Enums.CategoryType
    bgColor?: StringFieldUpdateOperationsInput | string
    fgColor?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    budgets?: budgetsUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type usersUpsertWithoutTransactionsInput = {
    update: XOR<usersUpdateWithoutTransactionsInput, usersUncheckedUpdateWithoutTransactionsInput>
    create: XOR<usersCreateWithoutTransactionsInput, usersUncheckedCreateWithoutTransactionsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutTransactionsInput, usersUncheckedUpdateWithoutTransactionsInput>
  }

  export type usersUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    monobankToken?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: accountsUpdateManyWithoutUserNestedInput
    categories?: categoriesUpdateManyWithoutUserNestedInput
    budgets?: budgetsUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    monobankToken?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: accountsUncheckedUpdateManyWithoutUserNestedInput
    categories?: categoriesUncheckedUpdateManyWithoutUserNestedInput
    budgets?: budgetsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type usersCreateWithoutCategoriesInput = {
    id?: string
    email: string
    password: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    monobankToken?: string | null
    accounts?: accountsCreateNestedManyWithoutUserInput
    transactions?: transactionsCreateNestedManyWithoutUserInput
    budgets?: budgetsCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutCategoriesInput = {
    id?: string
    email: string
    password: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    monobankToken?: string | null
    accounts?: accountsUncheckedCreateNestedManyWithoutUserInput
    transactions?: transactionsUncheckedCreateNestedManyWithoutUserInput
    budgets?: budgetsUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutCategoriesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutCategoriesInput, usersUncheckedCreateWithoutCategoriesInput>
  }

  export type transactionsCreateWithoutCategoryInput = {
    id?: string
    sourceAmount: number
    destinationAmount: number
    description: string
    date: Date | string
    type: $Enums.TransactionType
    bankTransactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    sourceAccount?: accountsCreateNestedOneWithoutSourceTransactionsInput
    destinationAccount?: accountsCreateNestedOneWithoutDestinationTransactionsInput
    user: usersCreateNestedOneWithoutTransactionsInput
  }

  export type transactionsUncheckedCreateWithoutCategoryInput = {
    id?: string
    sourceAmount: number
    destinationAmount: number
    description: string
    date: Date | string
    type: $Enums.TransactionType
    bankTransactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    sourceAccountId?: string | null
    destinationAccountId?: string | null
    userId: string
  }

  export type transactionsCreateOrConnectWithoutCategoryInput = {
    where: transactionsWhereUniqueInput
    create: XOR<transactionsCreateWithoutCategoryInput, transactionsUncheckedCreateWithoutCategoryInput>
  }

  export type transactionsCreateManyCategoryInputEnvelope = {
    data: transactionsCreateManyCategoryInput | transactionsCreateManyCategoryInput[]
  }

  export type budgetsCreateWithoutCategoryInput = {
    id?: string
    name: string
    plannedAmount: number
    actualAmount: number
    period: $Enums.BudgetPeriod
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: usersCreateNestedOneWithoutBudgetsInput
  }

  export type budgetsUncheckedCreateWithoutCategoryInput = {
    id?: string
    name: string
    plannedAmount: number
    actualAmount: number
    period: $Enums.BudgetPeriod
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type budgetsCreateOrConnectWithoutCategoryInput = {
    where: budgetsWhereUniqueInput
    create: XOR<budgetsCreateWithoutCategoryInput, budgetsUncheckedCreateWithoutCategoryInput>
  }

  export type budgetsCreateManyCategoryInputEnvelope = {
    data: budgetsCreateManyCategoryInput | budgetsCreateManyCategoryInput[]
  }

  export type usersUpsertWithoutCategoriesInput = {
    update: XOR<usersUpdateWithoutCategoriesInput, usersUncheckedUpdateWithoutCategoriesInput>
    create: XOR<usersCreateWithoutCategoriesInput, usersUncheckedCreateWithoutCategoriesInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutCategoriesInput, usersUncheckedUpdateWithoutCategoriesInput>
  }

  export type usersUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    monobankToken?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: accountsUpdateManyWithoutUserNestedInput
    transactions?: transactionsUpdateManyWithoutUserNestedInput
    budgets?: budgetsUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    monobankToken?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: accountsUncheckedUpdateManyWithoutUserNestedInput
    transactions?: transactionsUncheckedUpdateManyWithoutUserNestedInput
    budgets?: budgetsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type transactionsUpsertWithWhereUniqueWithoutCategoryInput = {
    where: transactionsWhereUniqueInput
    update: XOR<transactionsUpdateWithoutCategoryInput, transactionsUncheckedUpdateWithoutCategoryInput>
    create: XOR<transactionsCreateWithoutCategoryInput, transactionsUncheckedCreateWithoutCategoryInput>
  }

  export type transactionsUpdateWithWhereUniqueWithoutCategoryInput = {
    where: transactionsWhereUniqueInput
    data: XOR<transactionsUpdateWithoutCategoryInput, transactionsUncheckedUpdateWithoutCategoryInput>
  }

  export type transactionsUpdateManyWithWhereWithoutCategoryInput = {
    where: transactionsScalarWhereInput
    data: XOR<transactionsUpdateManyMutationInput, transactionsUncheckedUpdateManyWithoutCategoryInput>
  }

  export type budgetsUpsertWithWhereUniqueWithoutCategoryInput = {
    where: budgetsWhereUniqueInput
    update: XOR<budgetsUpdateWithoutCategoryInput, budgetsUncheckedUpdateWithoutCategoryInput>
    create: XOR<budgetsCreateWithoutCategoryInput, budgetsUncheckedCreateWithoutCategoryInput>
  }

  export type budgetsUpdateWithWhereUniqueWithoutCategoryInput = {
    where: budgetsWhereUniqueInput
    data: XOR<budgetsUpdateWithoutCategoryInput, budgetsUncheckedUpdateWithoutCategoryInput>
  }

  export type budgetsUpdateManyWithWhereWithoutCategoryInput = {
    where: budgetsScalarWhereInput
    data: XOR<budgetsUpdateManyMutationInput, budgetsUncheckedUpdateManyWithoutCategoryInput>
  }

  export type categoriesCreateWithoutBudgetsInput = {
    id?: string
    name: string
    type: $Enums.CategoryType
    bgColor: string
    fgColor: string
    icon: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: usersCreateNestedOneWithoutCategoriesInput
    transactions?: transactionsCreateNestedManyWithoutCategoryInput
  }

  export type categoriesUncheckedCreateWithoutBudgetsInput = {
    id?: string
    name: string
    type: $Enums.CategoryType
    bgColor: string
    fgColor: string
    icon: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    transactions?: transactionsUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type categoriesCreateOrConnectWithoutBudgetsInput = {
    where: categoriesWhereUniqueInput
    create: XOR<categoriesCreateWithoutBudgetsInput, categoriesUncheckedCreateWithoutBudgetsInput>
  }

  export type usersCreateWithoutBudgetsInput = {
    id?: string
    email: string
    password: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    monobankToken?: string | null
    accounts?: accountsCreateNestedManyWithoutUserInput
    transactions?: transactionsCreateNestedManyWithoutUserInput
    categories?: categoriesCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutBudgetsInput = {
    id?: string
    email: string
    password: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    monobankToken?: string | null
    accounts?: accountsUncheckedCreateNestedManyWithoutUserInput
    transactions?: transactionsUncheckedCreateNestedManyWithoutUserInput
    categories?: categoriesUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutBudgetsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutBudgetsInput, usersUncheckedCreateWithoutBudgetsInput>
  }

  export type categoriesUpsertWithoutBudgetsInput = {
    update: XOR<categoriesUpdateWithoutBudgetsInput, categoriesUncheckedUpdateWithoutBudgetsInput>
    create: XOR<categoriesCreateWithoutBudgetsInput, categoriesUncheckedCreateWithoutBudgetsInput>
    where?: categoriesWhereInput
  }

  export type categoriesUpdateToOneWithWhereWithoutBudgetsInput = {
    where?: categoriesWhereInput
    data: XOR<categoriesUpdateWithoutBudgetsInput, categoriesUncheckedUpdateWithoutBudgetsInput>
  }

  export type categoriesUpdateWithoutBudgetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCategoryTypeFieldUpdateOperationsInput | $Enums.CategoryType
    bgColor?: StringFieldUpdateOperationsInput | string
    fgColor?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutCategoriesNestedInput
    transactions?: transactionsUpdateManyWithoutCategoryNestedInput
  }

  export type categoriesUncheckedUpdateWithoutBudgetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCategoryTypeFieldUpdateOperationsInput | $Enums.CategoryType
    bgColor?: StringFieldUpdateOperationsInput | string
    fgColor?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    transactions?: transactionsUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type usersUpsertWithoutBudgetsInput = {
    update: XOR<usersUpdateWithoutBudgetsInput, usersUncheckedUpdateWithoutBudgetsInput>
    create: XOR<usersCreateWithoutBudgetsInput, usersUncheckedCreateWithoutBudgetsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutBudgetsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutBudgetsInput, usersUncheckedUpdateWithoutBudgetsInput>
  }

  export type usersUpdateWithoutBudgetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    monobankToken?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: accountsUpdateManyWithoutUserNestedInput
    transactions?: transactionsUpdateManyWithoutUserNestedInput
    categories?: categoriesUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutBudgetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    monobankToken?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: accountsUncheckedUpdateManyWithoutUserNestedInput
    transactions?: transactionsUncheckedUpdateManyWithoutUserNestedInput
    categories?: categoriesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type accountsCreateManyUserInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    balance: number
    currency: string
    bankId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type transactionsCreateManyUserInput = {
    id?: string
    sourceAmount: number
    destinationAmount: number
    description: string
    date: Date | string
    type: $Enums.TransactionType
    bankTransactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    sourceAccountId?: string | null
    destinationAccountId?: string | null
    categoryId?: string | null
  }

  export type categoriesCreateManyUserInput = {
    id?: string
    name: string
    type: $Enums.CategoryType
    bgColor: string
    fgColor: string
    icon: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type budgetsCreateManyUserInput = {
    id?: string
    name: string
    plannedAmount: number
    actualAmount: number
    period: $Enums.BudgetPeriod
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: string
  }

  export type accountsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    balance?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceTransactions?: transactionsUpdateManyWithoutSourceAccountNestedInput
    destinationTransactions?: transactionsUpdateManyWithoutDestinationAccountNestedInput
  }

  export type accountsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    balance?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceTransactions?: transactionsUncheckedUpdateManyWithoutSourceAccountNestedInput
    destinationTransactions?: transactionsUncheckedUpdateManyWithoutDestinationAccountNestedInput
  }

  export type accountsUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    balance?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type transactionsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceAmount?: IntFieldUpdateOperationsInput | number
    destinationAmount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    bankTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sourceAccount?: accountsUpdateOneWithoutSourceTransactionsNestedInput
    destinationAccount?: accountsUpdateOneWithoutDestinationTransactionsNestedInput
    category?: categoriesUpdateOneWithoutTransactionsNestedInput
  }

  export type transactionsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceAmount?: IntFieldUpdateOperationsInput | number
    destinationAmount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    bankTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type transactionsUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceAmount?: IntFieldUpdateOperationsInput | number
    destinationAmount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    bankTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type categoriesUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCategoryTypeFieldUpdateOperationsInput | $Enums.CategoryType
    bgColor?: StringFieldUpdateOperationsInput | string
    fgColor?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: transactionsUpdateManyWithoutCategoryNestedInput
    budgets?: budgetsUpdateManyWithoutCategoryNestedInput
  }

  export type categoriesUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCategoryTypeFieldUpdateOperationsInput | $Enums.CategoryType
    bgColor?: StringFieldUpdateOperationsInput | string
    fgColor?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: transactionsUncheckedUpdateManyWithoutCategoryNestedInput
    budgets?: budgetsUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type categoriesUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCategoryTypeFieldUpdateOperationsInput | $Enums.CategoryType
    bgColor?: StringFieldUpdateOperationsInput | string
    fgColor?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type budgetsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plannedAmount?: IntFieldUpdateOperationsInput | number
    actualAmount?: IntFieldUpdateOperationsInput | number
    period?: EnumBudgetPeriodFieldUpdateOperationsInput | $Enums.BudgetPeriod
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: categoriesUpdateOneRequiredWithoutBudgetsNestedInput
  }

  export type budgetsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plannedAmount?: IntFieldUpdateOperationsInput | number
    actualAmount?: IntFieldUpdateOperationsInput | number
    period?: EnumBudgetPeriodFieldUpdateOperationsInput | $Enums.BudgetPeriod
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
  }

  export type budgetsUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plannedAmount?: IntFieldUpdateOperationsInput | number
    actualAmount?: IntFieldUpdateOperationsInput | number
    period?: EnumBudgetPeriodFieldUpdateOperationsInput | $Enums.BudgetPeriod
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
  }

  export type transactionsCreateManySourceAccountInput = {
    id?: string
    sourceAmount: number
    destinationAmount: number
    description: string
    date: Date | string
    type: $Enums.TransactionType
    bankTransactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    destinationAccountId?: string | null
    categoryId?: string | null
    userId: string
  }

  export type transactionsCreateManyDestinationAccountInput = {
    id?: string
    sourceAmount: number
    destinationAmount: number
    description: string
    date: Date | string
    type: $Enums.TransactionType
    bankTransactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    sourceAccountId?: string | null
    categoryId?: string | null
    userId: string
  }

  export type transactionsUpdateWithoutSourceAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceAmount?: IntFieldUpdateOperationsInput | number
    destinationAmount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    bankTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    destinationAccount?: accountsUpdateOneWithoutDestinationTransactionsNestedInput
    category?: categoriesUpdateOneWithoutTransactionsNestedInput
    user?: usersUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type transactionsUncheckedUpdateWithoutSourceAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceAmount?: IntFieldUpdateOperationsInput | number
    destinationAmount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    bankTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    destinationAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type transactionsUncheckedUpdateManyWithoutSourceAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceAmount?: IntFieldUpdateOperationsInput | number
    destinationAmount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    bankTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    destinationAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type transactionsUpdateWithoutDestinationAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceAmount?: IntFieldUpdateOperationsInput | number
    destinationAmount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    bankTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sourceAccount?: accountsUpdateOneWithoutSourceTransactionsNestedInput
    category?: categoriesUpdateOneWithoutTransactionsNestedInput
    user?: usersUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type transactionsUncheckedUpdateWithoutDestinationAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceAmount?: IntFieldUpdateOperationsInput | number
    destinationAmount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    bankTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type transactionsUncheckedUpdateManyWithoutDestinationAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceAmount?: IntFieldUpdateOperationsInput | number
    destinationAmount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    bankTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type transactionsCreateManyCategoryInput = {
    id?: string
    sourceAmount: number
    destinationAmount: number
    description: string
    date: Date | string
    type: $Enums.TransactionType
    bankTransactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    sourceAccountId?: string | null
    destinationAccountId?: string | null
    userId: string
  }

  export type budgetsCreateManyCategoryInput = {
    id?: string
    name: string
    plannedAmount: number
    actualAmount: number
    period: $Enums.BudgetPeriod
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type transactionsUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceAmount?: IntFieldUpdateOperationsInput | number
    destinationAmount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    bankTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sourceAccount?: accountsUpdateOneWithoutSourceTransactionsNestedInput
    destinationAccount?: accountsUpdateOneWithoutDestinationTransactionsNestedInput
    user?: usersUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type transactionsUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceAmount?: IntFieldUpdateOperationsInput | number
    destinationAmount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    bankTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type transactionsUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceAmount?: IntFieldUpdateOperationsInput | number
    destinationAmount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    bankTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type budgetsUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plannedAmount?: IntFieldUpdateOperationsInput | number
    actualAmount?: IntFieldUpdateOperationsInput | number
    period?: EnumBudgetPeriodFieldUpdateOperationsInput | $Enums.BudgetPeriod
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutBudgetsNestedInput
  }

  export type budgetsUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plannedAmount?: IntFieldUpdateOperationsInput | number
    actualAmount?: IntFieldUpdateOperationsInput | number
    period?: EnumBudgetPeriodFieldUpdateOperationsInput | $Enums.BudgetPeriod
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type budgetsUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plannedAmount?: IntFieldUpdateOperationsInput | number
    actualAmount?: IntFieldUpdateOperationsInput | number
    period?: EnumBudgetPeriodFieldUpdateOperationsInput | $Enums.BudgetPeriod
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}