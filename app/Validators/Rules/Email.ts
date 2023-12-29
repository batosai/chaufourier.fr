import { rules } from '@ioc:Adonis/Core/Validator'

export function emailUniqueRules(user) {
  return [
    rules.email(),
    rules.unique(
      user
        ? {
            table: 'users',
            column: 'email',
            whereNot: {
              id: user.id,
            },
            caseInsensitive: true,
          }
        : {
            table: 'users',
            column: 'email',
            caseInsensitive: true,
          }
    ),
  ]
}

export function emailExistsRules() {
  return [
    rules.email(),
    rules.exists({
      table: 'users',
      column: 'email',
    }),
  ]
}
