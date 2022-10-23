// app/routes/auth/google/callback.tsx
import { LoaderFunction } from 'remix'
import { authenticator } from '~/services/auth.server'

export let loader: LoaderFunction = ({ request }) => {
  return authenticator.authenticate('google-oauth', request, {
    successRedirect: '/app',
    failureRedirect: '/login',
  })
}