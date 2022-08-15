import { useUser, Auth } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { useEffect, useState } from 'react'

const LoginPage = () => {
  const { user, error } = useUser()
  const [data, setData] = useState({})

  useEffect(() => {
    console.log('User data! ', user)
    async function loadData() {
      const { data } = await supabaseClient.from('test').select('*')
      setData(data)
    }
    // Only run query once user is logged in.
    if (user) loadData()
  }, [user])

  if (user)
    return (
      <>
        <h1> Welcome</h1>
        <div style={{ "padding": "10%" }}>
          <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
          <p>User:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
          {/* <p>client-side data fetching with RLS</p> */}
          <pre>User Data: {JSON.stringify(data, null, 2)}</pre>
        </div>
      </>
    ); else {
    return (
      <>
        <h1> Supabase Login</h1>
        <div style={{ "padding": "10%" }}>
          {error && <p>{error.message}</p>}
          <Auth
            // view="update_password"
            supabaseClient={supabaseClient}
            providers={['google', 'github', 'apple']}
            socialLayout="horizontal"
            socialButtonSize="xlarge"
          />
        </div>
      </>
    )
  }
}

export default LoginPage
