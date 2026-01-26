import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fllfgcuwjpnnrcijqzul.supabase.co'
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsbGZnY3V3anBubnJjaWpxenVsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODM3ODM0OCwiZXhwIjoyMDgzOTU0MzQ4fQ.bUaXZ0DIiLzjkE4lFn06K2DGXSn4QTmHneJfM-_pmpU'

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

const email = 'liviu.drinceanu@infinitrade-romania.ro'
const newPassword = 'XehAdmin2026!'

async function resetAdmin() {
  console.log('Checking for existing user...')

  // List users to find the admin
  const { data: users, error: listError } = await supabase.auth.admin.listUsers()

  if (listError) {
    console.error('Error listing users:', listError)
    return
  }

  const existingUser = users.users.find(u => u.email === email)

  if (existingUser) {
    console.log('Found existing user:', existingUser.id)

    // Update password
    const { data, error } = await supabase.auth.admin.updateUserById(
      existingUser.id,
      { password: newPassword }
    )

    if (error) {
      console.error('Error updating password:', error)
      return
    }

    console.log('Password updated successfully!')
    console.log('Email:', email)
    console.log('New Password:', newPassword)
  } else {
    console.log('User not found, creating new admin...')

    // Create new user
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email,
      password: newPassword,
      email_confirm: true
    })

    if (createError) {
      console.error('Error creating user:', createError)
      return
    }

    console.log('Created user:', newUser.user.id)

    // Create profile with admin role
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: newUser.user.id,
        email,
        first_name: 'Liviu',
        last_name: 'Drinceanu',
        role: 'admin'
      })

    if (profileError) {
      console.error('Error creating profile:', profileError)
      return
    }

    console.log('Admin user created successfully!')
    console.log('Email:', email)
    console.log('Password:', newPassword)
  }
}

resetAdmin()
