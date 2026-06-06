"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { supabase, type UserManagement } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  LogOut,
  Eye,
  Trash2,
  Loader2,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  ExternalLink,
  Calendar,
  User,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  ArrowUp,
  ArrowDown,
  Pencil,
  UserCog,
  Hash,
  Building2,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import bcrypt from "bcryptjs"

export default function UserDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDashboardExpanded, setIsDashboardExpanded] = useState(true)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [loggedInUsername, setLoggedInUsername] = useState("")
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null)

  // User Data States
  const [userData, setUserData] = useState<UserManagement | null>(null)
  const [usersDateSort, setUsersDateSort] = useState<"asc" | "desc">("desc")
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false)
  const [isViewUserDialogOpen, setIsViewUserDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userFormData, setUserFormData] = useState({
    user_id: "",
    username: "",
    first_name: "",
    last_name: "",
    employee_id: "",
    password: "",
    start_date: "",
    end_date: "",
  })
  const [isUserSubmitting, setIsUserSubmitting] = useState(false)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    const username = localStorage.getItem("username")
    const userId = localStorage.getItem("userId")
    const userRole = localStorage.getItem("userRole")

    if (isLoggedIn !== "true") {
      router.push("/login")
      return
    }

    // Only Employee can access this dashboard
    if (userRole !== "Employee") {
      router.push("/contactusdashboard")
      return
    }

    setIsAuthenticated(true)
    setLoggedInUsername(username || "User")
    setLoggedInUserId(userId)
  }, [router])

  // Fetch logged-in user data from Supabase
  const fetchUserData = useCallback(async () => {
    if (!loggedInUserId) return

    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from("users")
        .select(`
          *,
          user_roles (
            role_id,
            roles (
              role_name
            )
          )
        `)
        .eq("id", loggedInUserId)
        .single()

      if (error) {
        console.error("Error fetching user data:", error)
        setMessage({ type: "error", text: "Failed to fetch user data" })
        return
      }

      const formattedUser = {
        ...data,
        roles: data.user_roles?.map((item: { role_id: number; roles: { role_name: string } | null }) => item.roles?.role_name) || [],
      }

      setUserData(formattedUser)
    } catch (err) {
      console.error("Error:", err)
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setIsLoading(false)
    }
  }, [loggedInUserId])

  // Fetch data when authenticated
  useEffect(() => {
    if (!isAuthenticated || !loggedInUserId) return
    fetchUserData()
  }, [isAuthenticated, loggedInUserId, fetchUserData])

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("username")
    localStorage.removeItem("userId")
    localStorage.removeItem("userRole")
    router.push("/login")
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const toggleUsersDateSort = () => {
    setUsersDateSort(prev => prev === "asc" ? "desc" : "asc")
  }

  const getUserStatus = (endDate: string | null) => {
    if (!endDate) {
      return "Active"
    }

    const currentDate = new Date()
    const userEndDate = new Date(endDate)

    return userEndDate > currentDate ? "Active" : "Inactive"
  }

  // Handle Edit User
  const handleEditUser = async () => {
    if (!userData) return
    setIsUserSubmitting(true)
    try {
      const updateData: Record<string, string | null> = {
        first_name: userFormData.first_name,
        last_name: userFormData.last_name,
      }

      // Only update password if a new one is provided
      if (userFormData.password) {
        const hashedPassword = await bcrypt.hash(userFormData.password, 10)
        updateData.password = hashedPassword
      }

      const { error } = await supabase
        .from("users")
        .update(updateData)
        .eq("id", userData.id)

      if (error) {
        console.error("Error updating user:", error)
        setMessage({ type: "error", text: "Failed to update profile" })
        return
      }

      setMessage({ type: "success", text: "Profile updated successfully" })
      setIsEditUserDialogOpen(false)
      setUserFormData({
        user_id: "",
        username: "",
        first_name: "",
        last_name: "",
        employee_id: "",
        password: "",
        start_date: "",
        end_date: "",
      })
      fetchUserData()
    } catch (err) {
      console.error("Error:", err)
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setIsUserSubmitting(false)
    }
  }

  // Open Edit User Dialog
  const openEditUserDialog = (user: UserManagement) => {
    setUserFormData({
      user_id: user.user_id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      employee_id: user.employee_id,
      password: "",
      start_date: user.start_date ? user.start_date.split("T")[0] : "",
      end_date: user.end_date ? user.end_date.split("T")[0] : "",
    })
    setIsEditUserDialogOpen(true)
  }

  // Open View User Dialog
  const openViewUserDialog = () => {
    setIsViewUserDialogOpen(true)
  }

  // Handle delete
  const handleDelete = async () => {
    if (!userData) return

    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from("users")
        .delete()
        .eq("id", userData.id)

      if (error) {
        setMessage({ type: "error", text: "Failed to delete user" })
        return
      }

      setMessage({ type: "success", text: "User deleted successfully" })
      setIsDeleteDialogOpen(false)

      // Logout after deleting own account
      handleLogout()
    } catch (err) {
      setMessage({ type: "error", text: "Unexpected error occurred" })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a1628]">
        <Loader2 className="w-8 h-8 text-[#00d4ff] animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-[#0a1628] text-white
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <span className="font-bold text-lg text-white">Immense Brains</span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-white/10 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 px-3 py-4">
            <div className="space-y-0.5">
              {/* Dashboard Parent Menu */}
              <button
                onClick={() => setIsDashboardExpanded(!isDashboardExpanded)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-white/5 text-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="text-sm font-medium">Dashboard</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDashboardExpanded ? "rotate-180" : ""}`} />
              </button>

              {/* Submenu with smooth animation */}
              <div
                className={`overflow-hidden transition-all duration-200 ease-in-out ${isDashboardExpanded ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <button
                  className="w-full flex items-center gap-2.5 pl-9 pr-3 py-2 rounded-md transition-colors text-sm bg-[#00d4ff]/10 text-[#00d4ff]"
                >
                  <UserCog className="w-4 h-4" />
                  <span className="font-medium">Profile</span>
                </button>
              </div>
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/10">
            <div className="text-xs text-gray-400">
              Logged in as {loggedInUsername}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-6 h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-3">
                <h2 className="text-lg lg:text-xl font-semibold text-gray-900">
                  Profile
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-4">
              <Link
                href="/"
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">View Site</span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-6 min-w-0">
          {/* Message Alert */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-700"
                }`}
            >
              {message.type === "success" ? (
                <CheckCircle className="w-5 h-5 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0" />
              )}
              <p>{message.text}</p>
            </div>
          )}

          {/* Stats Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center">
                  <UserCog className="w-6 h-6 text-[#00d4ff]" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Your Profile</p>
                  <p className="text-2xl font-bold text-gray-900">1</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchUserData}
                  disabled={isLoading}
                  className="gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          {/* Users Table Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">User Information</h2>
              <p className="text-sm text-gray-500 mt-1">
                View your profile details
              </p>
            </div>

            {isLoading ? (
              <div className="p-12 text-center">
                <Loader2 className="w-8 h-8 text-[#00d4ff] animate-spin mx-auto" />
                <p className="text-gray-500 mt-2">Loading user data...</p>
              </div>
            ) : !userData ? (
              <div className="p-12 text-center">
                <UserCog className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No user data found</p>
              </div>
            ) : (
              <div className="w-full overflow-x-auto scrollbar-thin">
                <Table className="min-w-max">
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="font-semibold text-gray-700">User ID</TableHead>
                      <TableHead className="font-semibold text-gray-700">Username</TableHead>
                      <TableHead className="font-semibold text-gray-700">First Name</TableHead>
                      <TableHead className="font-semibold text-gray-700">Last Name</TableHead>
                      <TableHead className="font-semibold text-gray-700">Job Role</TableHead>
                      <TableHead className="font-semibold text-gray-700">Employee ID</TableHead>
                      <TableHead className="font-semibold text-gray-700">Start Date</TableHead>
                      <TableHead className="font-semibold text-gray-700">End Date</TableHead>
                      <TableHead className="font-semibold text-gray-700">Status</TableHead>
                      <TableHead
                        className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                        onClick={toggleUsersDateSort}
                      >
                        <div className="flex items-center gap-1">
                          Created Date
                          {usersDateSort === "asc" ? (
                            <ArrowUp className="w-4 h-4 text-[#00d4ff]" />
                          ) : (
                            <ArrowDown className="w-4 h-4 text-[#00d4ff]" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-gray-50 transition-colors">
                      <TableCell className="text-gray-700">{userData.user_id}</TableCell>
                      <TableCell className="font-medium text-gray-900">{userData.username}</TableCell>
                      <TableCell className="text-gray-700">{userData.first_name}</TableCell>
                      <TableCell className="text-gray-700">{userData.last_name}</TableCell>
                      <TableCell className="text-gray-700">
                        {userData.roles?.length
                          ? userData.roles.join(", ")
                          : "-"}
                      </TableCell>
                      <TableCell className="text-gray-700">{userData.employee_id}</TableCell>
                      <TableCell className="text-gray-500 text-sm whitespace-nowrap">
                        {userData.start_date ? formatDate(userData.start_date) : "-"}
                      </TableCell>
                      <TableCell className="text-gray-500 text-sm whitespace-nowrap">
                        {userData.end_date ? formatDate(userData.end_date) : "-"}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center justify-center min-w-[54px] h-6 rounded-md text-xs font-medium ${getUserStatus(userData.end_date) === "Active"
                              ? "bg-[#0A1628] text-white"
                              : "bg-[#F1F5F9] text-[#334155]"
                            }`}
                        >
                          {getUserStatus(userData.end_date)}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-500 text-sm whitespace-nowrap">
                        {formatDate(userData.created_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={openViewUserDialog}
                            className="h-8 w-8 text-gray-500 hover:text-[#0066ff] hover:bg-blue-50"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditUserDialog(userData)}
                            className="h-8 w-8 text-gray-500 hover:text-[#0066ff] hover:bg-blue-50"
                            title="Edit user"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsDeleteDialogOpen(true)}
                            className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="w-5 h-5" />
              Delete User
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account{" "}
              <span className="font-medium text-gray-900">
                {userData?.username}
              </span>?
              This action cannot be undone. You will be logged out.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center">
                <Pencil className="w-4 h-4 text-[#00d4ff]" />
              </div>
              Edit Profile
            </DialogTitle>
            <DialogDescription>
              Update your profile details. Leave password empty to keep the existing password.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit_user_id">User ID</Label>
                <Input
                  value={userFormData.user_id}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit_username">Username</Label>
                <Input
                  value={userFormData.username}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit_first_name">First Name</Label>
                <Input
                  id="edit_first_name"
                  value={userFormData.first_name}
                  onChange={(e) => setUserFormData({ ...userFormData, first_name: e.target.value })}
                  placeholder="Enter first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit_last_name">Last Name</Label>
                <Input
                  id="edit_last_name"
                  value={userFormData.last_name}
                  onChange={(e) => setUserFormData({ ...userFormData, last_name: e.target.value })}
                  placeholder="Enter last name"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit_employee_id">Employee ID</Label>
                <Input
                  value={userFormData.employee_id}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit_password">New Password (optional)</Label>
                <Input
                  id="edit_password"
                  type="password"
                  value={userFormData.password}
                  onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
                  placeholder="Leave empty to keep existing"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit_start_date">Start Date</Label>
                <Input
                  type="date"
                  value={userFormData.start_date}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit_end_date">End Date</Label>
                <Input
                  type="date"
                  value={userFormData.end_date}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditUserDialogOpen(false)
                setUserFormData({
                  user_id: "",
                  username: "",
                  first_name: "",
                  last_name: "",
                  employee_id: "",
                  password: "",
                  start_date: "",
                  end_date: "",
                })
              }}
              disabled={isUserSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditUser}
              disabled={isUserSubmitting}
              className="bg-[#0066ff] hover:bg-[#0052cc]"
            >
              {isUserSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View User Dialog */}
      <Dialog open={isViewUserDialogOpen} onOpenChange={setIsViewUserDialogOpen}>
        <DialogContent className="sm:max-w-[720px] p-0 overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center">
                <UserCog className="w-4 h-4 text-[#00d4ff]" />
              </div>
              User Details
            </DialogTitle>
            <DialogDescription>
              Full details of your profile
            </DialogDescription>
          </DialogHeader>

          {userData && (
            <div className="space-y-4 py-4">
              {/* User ID */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Hash className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">User ID</p>
                  <p className="text-gray-900 mt-1">{userData.user_id}</p>
                </div>
              </div>

              {/* Username */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Username</p>
                  <p className="text-gray-900 mt-1">{userData.username}</p>
                </div>
              </div>

              {/* First Name */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">First Name</p>
                  <p className="text-gray-900 mt-1">{userData.first_name}</p>
                </div>
              </div>

              {/* Last Name */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Last Name</p>
                  <p className="text-gray-900 mt-1">{userData.last_name}</p>
                </div>
              </div>

              {/* Employee ID */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Building2 className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Employee ID</p>
                  <p className="text-gray-900 mt-1">{userData.employee_id}</p>
                </div>
              </div>

              {/* Job Role */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <UserCog className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Job Role</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {userData.roles?.length ? (
                      userData.roles.map((role: string, index: number) => {
                        const roleLower = role.toLowerCase()
                        let badgeClass = "bg-gray-100 text-gray-700"

                        if (roleLower === "admin") {
                          badgeClass = "bg-purple-100 text-purple-700"
                        } else if (roleLower === "employee") {
                          badgeClass = "bg-blue-100 text-blue-700"
                        } else if (roleLower === "hr") {
                          badgeClass = "bg-pink-100 text-pink-700"
                        } else if (roleLower === "recruiter") {
                          badgeClass = "bg-cyan-100 text-cyan-700"
                        } else if (roleLower === "manager") {
                          badgeClass = "bg-orange-100 text-orange-700"
                        }

                        return (
                          <span
                            key={index}
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badgeClass}`}
                          >
                            {role}
                          </span>
                        )
                      })
                    ) : (
                      <span className="text-gray-500">No roles assigned</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Status</p>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getUserStatus(userData.end_date) === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                      }`}
                  >
                    {getUserStatus(userData.end_date)}
                  </span>
                </div>
              </div>

              {/* Start Date */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Start Date</p>
                  <p className="text-gray-900 mt-1">{userData.start_date ? formatDate(userData.start_date) : "Not specified"}</p>
                </div>
              </div>

              {/* End Date */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">End Date</p>
                  <p className="text-gray-900 mt-1">{userData.end_date ? formatDate(userData.end_date) : "Not specified"}</p>
                </div>
              </div>

              {/* Created At */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Created At</p>
                  <p className="text-gray-900 mt-1">{formatDate(userData.created_at)}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewUserDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
