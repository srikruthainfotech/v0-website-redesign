"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, User, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import bcrypt from "bcryptjs"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    tenantCode: "",
    username: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Step 1: Fetch user by username only
      const { data: tenant, error: tenantError } = await supabase
        .from("tenants")
        .select("*")
        .eq("tenant_code", formData.tenantCode)
        .single()

      if (tenantError || !tenant) {
        setError("Invalid Tenant Id")
        setIsLoading(false)
        return
      }
      const { data, error: dbError } = await supabase
        .from("users")
        .select("*")
        .eq("username", formData.username)
        .eq("tenant_id", tenant.id)
        .single()

      if (dbError || !data) {
        setError("Invalid username or password")
        setIsLoading(false)
        return
      }

      // Step 2: Compare password using bcrypt
      const passwordMatch = await bcrypt.compare(
        formData.password,
        data.password
      )

      if (!passwordMatch) {
        setError("Invalid username or password")
        setIsLoading(false)
        return
      }

      // Step 3: Fetch user roles
      const { data: rolesData, error: rolesError } = await supabase
        .from("user_roles")
        .select(`
    role_id,
    roles!inner (
      role_name
    )
  `)
        .eq("user_id", data.id)

      // Handle roles query error (but don't block login)
      if (rolesError) {
        console.error("Error fetching roles:", rolesError)
      }

      // Step 4: Get role names from rolesData
      const roleNames =
        rolesData?.map((item: any) => item.roles?.role_name)
          .filter(Boolean) ?? []

      const isSuperAdmin = roleNames.includes("Super Admin")
      const isAdmin = roleNames.includes("Admin")
      const isEmployee = roleNames.includes("Employee")

      // Determine the primary role for localStorage (Super Admin > Admin > Employee)
      let primaryRole = ""
      if (isSuperAdmin) {
        primaryRole = "Super Admin"
      } else if (isAdmin) {
        primaryRole = "Admin"
      } else if (isEmployee) {
        primaryRole = "Employee"
      } else if (roleNames.length > 0) {
        primaryRole = roleNames[0] as string
      }

      // Store login state in localStorage
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("username", data.username)
      localStorage.setItem("userId", data.id)
      localStorage.setItem("isAdmin", isAdmin ? "true" : "false")
      localStorage.setItem("userRole", primaryRole)
      localStorage.setItem("tenantId", tenant.id)

      localStorage.setItem(
        "tenantCode",
        tenant.tenant_code
      )

      localStorage.setItem(
        "companyName",
        tenant.company_name
      )

      // Redirect based on role
      if (isSuperAdmin) {
        router.push("/superadmindashboard")
      } else if (isAdmin) {
        router.push("/contactusdashboard")
      } else if (isEmployee) {
        router.push("/userdashboard")
      } else {
        router.push("/")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a1628]">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#00d4ff] rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#0066ff] rounded-full blur-[150px]" />
        </div>
      </div>

      <main className="flex-grow flex items-center justify-center px-4 relative z-10">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <h1 className="text-2xl font-bold text-white">Srikrutha Cloud</h1>
            </Link>
            <p className="text-gray-400 mt-2">Admin Dashboard Login</p>
          </div>

          {/* Login Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#00d4ff]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-[#00d4ff]" />
              </div>
              <h2 className="text-xl font-semibold text-white">Srikrutha Cloud Dashboard</h2>
              <p className="text-gray-400 text-sm mt-1">Sign in to access your dashboard</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="tenantCode" className="text-gray-300">
                  Tenant Id
                </Label>

                <Input
                  id="tenantCode"
                  name="tenantCode"
                  type="text"
                  required
                  value={formData.tenantCode}
                  onChange={handleChange}
                  placeholder="Enter your Tenant Id"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:border-[#00d4ff] focus-visible:ring-[#00d4ff]/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:border-[#00d4ff] focus-visible:ring-[#00d4ff]/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:border-[#00d4ff] focus-visible:ring-[#00d4ff]/20"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-medium py-2.5 h-11"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link href="/" className="text-gray-400 hover:text-[#00d4ff] text-sm transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
