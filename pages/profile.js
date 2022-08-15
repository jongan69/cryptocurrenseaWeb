// pages/profile.js
import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs'

export default function Profile({ user }) {
  return (
    <>
      <p>Hello {user.email}</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  )
}

export const getServerSideProps = withAuthRequired()
