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

        <div style={{ "padding-left": "20%", "padding-right": "20%" }}>
          <h1 style={{ "color": 'white' }}> Welcome</h1>
          <p style={{ "color": 'white' }}>User Authenticated, you may now log into the mobile app</p>
          <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
          {/* <pre style={{ "color": 'white'}}>{JSON.stringify(user, null, 2)}</pre> */}
          {/* <pre>User Data: {JSON.stringify(data, null, 2)}</pre> */}
        </div>
      </>
    ); else {
    return (
      <>

        <div style={{ "padding-left": "20%", "padding-right": "20%" }}>
          <h1 style={{ "color": 'white' }}> Supabase Login</h1>
          {error && <p>{error.message}</p>}
          <Auth
            // view="update_password"
            supabaseClient={supabaseClient}
            // providers={['google', 'github', 'apple']}
            socialLayout="horizontal"
            socialButtonSize="xlarge"
          />
        </div>
      </>
    )
  }
}

export default LoginPage
