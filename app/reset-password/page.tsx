"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, AlertCircle, Loader2, CheckCircle } from "lucide-react"
import Link from "next/link"
import bcrypt from "bcryptjs"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [validationErrors, setValidationErrors] = useState<{
    currentPassword?: string
    newPassword?: string
    confirmPassword?: string
  }>({})

  useEffect(() => {
    // Check if pendingUserId exists in localStorage
    const pendingUserId = localStorage.getItem("pendingUserId")
    if (!pendingUserId) {
      router.push("/login")
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
    // Clear validation error for this field
    setValidationErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validateForm = (): boolean => {
    const errors: typeof validationErrors = {}
    let isValid = true

    if (!formData.currentPassword) {
      errors.currentPassword = "Current password is required"
      isValid = false
    }

    if (!formData.newPassword) {
      errors.newPassword = "New password is required"
      isValid = false
    } else if (formData.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters"
      isValid = false
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Password confirmation is required"
      isValid = false
    } else if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    setValidationErrors(errors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const pendingUserId = localStorage.getItem("pendingUserId")
      if (!pendingUserId) {
        setError("Session expired. Please login again.")
        router.push("/login")
        return
      }

      // Fetch user from database
      const { data: user, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", pendingUserId)
        .single()

      if (userError || !user) {
        setError("User not found. Please login again.")
        router.push("/login")
        return
      }

      // Validate current password
      const passwordMatch = await bcrypt.compare(
        formData.currentPassword,
        user.password
      )

      if (!passwordMatch) {
        setValidationErrors({
          currentPassword: "Current password is incorrect",
        })
        setIsLoading(false)
        return
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(formData.newPassword, 10)

      // Update user in database
      const { error: updateError } = await supabase
        .from("users")
        .update({
          password: hashedPassword,
          must_change_password: false,
        })
        .eq("id", pendingUserId)

      if (updateError) {
        setError("Failed to update password. Please try again.")
        setIsLoading(false)
        return
      }

      // Clear localStorage
      localStorage.removeItem("pendingUserId")
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("username")
      localStorage.removeItem("userId")
      localStorage.removeItem("userRole")
      localStorage.removeItem("isAdmin")

      setSuccess(true)

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err) {
      console.error("Password reset error:", err)
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
              <h1 className="text-2xl font-bold text-white">Immense Brains</h1>
            </Link>
            <p className="text-gray-400 mt-2">Reset Your Password</p>
          </div>

          {/* Reset Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#00d4ff]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-[#00d4ff]" />
              </div>
              <h2 className="text-xl font-semibold text-white">Reset Your Password</h2>
              <p className="text-gray-400 text-sm mt-1">
                For security reasons, please change your temporary password before continuing.
              </p>
            </div>

            {success ? (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                <div>
                  <p className="text-green-400 font-medium">Password updated successfully!</p>
                  <p className="text-green-400/80 text-sm mt-1">Redirecting to login...</p>
                </div>
              </div>
            ) : (
              <>
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-gray-300">
                      Current Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        required
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="Enter current password"
                        className={`pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:border-[#00d4ff] focus-visible:ring-[#00d4ff]/20 ${
                          validationErrors.currentPassword ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {validationErrors.currentPassword && (
                      <p className="text-red-400 text-sm">{validationErrors.currentPassword}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-gray-300">
                      New Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        required
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Enter new password (minimum 8 characters)"
                        className={`pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:border-[#00d4ff] focus-visible:ring-[#00d4ff]/20 ${
                          validationErrors.newPassword ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {validationErrors.newPassword && (
                      <p className="text-red-400 text-sm">{validationErrors.newPassword}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-300">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                        className={`pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:border-[#00d4ff] focus-visible:ring-[#00d4ff]/20 ${
                          validationErrors.confirmPassword ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {validationErrors.confirmPassword && (
                      <p className="text-red-400 text-sm">{validationErrors.confirmPassword}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-medium py-2.5 h-11"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Resetting password...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </form>
              </>
            )}
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
