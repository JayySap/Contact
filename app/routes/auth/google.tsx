// app/routes/auth/google.tsx
import { redirect } from '@remix-run/node'
import { ActionFunction, LoaderFunction } from 'remix'
import { authenticator } from '~/services/auth.server'


export let loader: LoaderFunction = () => redirect('/login')

export let action: ActionFunction = ({ request }) => {
  return authenticator.authenticate('google-oauth', request)
}