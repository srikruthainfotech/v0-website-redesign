"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { supabase, type Tenant } from "@/lib/supabase"
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
  Building2,
  RefreshCw,
  ExternalLink,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  ArrowUp,
  ArrowDown,
  Plus,
  Pencil,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function SuperAdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDashboardExpanded, setIsDashboardExpanded] = useState(true)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isDeleteSelectedDialogOpen, setIsDeleteSelectedDialogOpen] = useState(false)
  const [isDeletingSelected, setIsDeletingSelected] = useState(false)
  const [activeTab, setActiveTab] = useState<"tenants">("tenants")
  const [dateSort, setDateSort] = useState<"asc" | "desc">("desc")
  const [loggedInUsername, setLoggedInUsername] = useState("")
  const [formData, setFormData] = useState({
    tenant_code: "",
    company_name: "",
    domain: "",
    start_date: "",
    end_date: "",
  })

  // Check authentication and role
  useEffect(() => {
    const userRole = localStorage.getItem("userRole")

    if (userRole !== "Super Admin") {
      router.push("/login")
      return
    }

    const isLoggedIn = localStorage.getItem("isLoggedIn")
    const username = localStorage.getItem("username")

    if (isLoggedIn !== "true") {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
      setLoggedInUsername(username || "Super Admin")
    }
  }, [router])

  // Fetch tenants from Supabase
  const fetchTenants = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from("tenants")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching tenants:", error)
        setMessage({ type: "error", text: "Failed to fetch tenants" })
        return
      }

      setTenants(data || [])
    } catch (err) {
      console.error("Error:", err)
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Fetch data on mount
  useEffect(() => {
    if (!isAuthenticated) return
    fetchTenants()
    setSelectedIds([])
  }, [isAuthenticated, fetchTenants])

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("username")
    localStorage.removeItem("userId")
    localStorage.removeItem("userRole")
    localStorage.removeItem("tenantId")
    localStorage.removeItem("tenantCode")
    localStorage.removeItem("companyName")
    router.push("/login")
  }

  // Open view dialog
  const openViewDialog = (tenant: Tenant) => {
    setSelectedTenant(tenant)
    setIsViewDialogOpen(true)
  }

  // Open delete dialog
  const openDeleteDialog = (tenant: Tenant) => {
    setSelectedTenant(tenant)
    setIsDeleteDialogOpen(true)
  }

  // Handle select all toggle
  const handleSelectAll = () => {
    if (selectedIds.length === tenants.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(tenants.map((t) => t.id))
    }
  }

  // Handle individual row selection
  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    )
  }

  // Handle delete
  const handleDelete = async () => {
    if (!selectedTenant) return

    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from("tenants")
        .delete()
        .eq("id", selectedTenant.id)

      if (error) {
        console.error("Error deleting tenant:", error)
        setMessage({ type: "error", text: "Failed to delete tenant" })
        return
      }

      setMessage({ type: "success", text: "Tenant deleted successfully" })
      setIsDeleteDialogOpen(false)
      fetchTenants()
    } catch (err) {
      console.error("Error:", err)
      setMessage({ type: "error", text: "Unexpected error occurred" })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle delete selected
  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return

    setIsDeletingSelected(true)

    try {
      const { error } = await supabase
        .from("tenants")
        .delete()
        .in("id", selectedIds)

      if (error) {
        console.error("Error deleting tenants:", error)
        setMessage({ type: "error", text: "Failed to delete selected tenants" })
        return
      }

      setMessage({ type: "success", text: `${selectedIds.length} tenant(s) deleted successfully` })
      setIsDeleteSelectedDialogOpen(false)
      setSelectedIds([])
      fetchTenants()
    } catch (err) {
      console.error("Error:", err)
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setIsDeletingSelected(false)
    }
  }

  // Handle add tenant
  const handleAddTenant = async () => {
    if (!formData.tenant_code || !formData.company_name || !formData.domain || !formData.start_date) {
      setMessage({ type: "error", text: "Please fill all required fields" })
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from("tenants")
        .insert([{
          tenant_code: formData.tenant_code,
          company_name: formData.company_name,
          domain: formData.domain,
          start_date: formData.start_date,
          end_date: formData.end_date || null,
        }])

      if (error) {
        console.error("Error adding tenant:", error)
        setMessage({ type: "error", text: "Failed to add tenant" })
        return
      }

      setMessage({ type: "success", text: "Tenant added successfully" })
      setIsAddDialogOpen(false)
      setFormData({
        tenant_code: "",
        company_name: "",
        domain: "",
        start_date: "",
        end_date: "",
      })
      fetchTenants()
    } catch (err) {
      console.error("Error:", err)
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle edit tenant
  const handleEditTenant = async () => {
    if (!selectedTenant) return

    if (!formData.tenant_code || !formData.company_name || !formData.domain || !formData.start_date) {
      setMessage({ type: "error", text: "Please fill all required fields" })
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from("tenants")
        .update({
          tenant_code: formData.tenant_code,
          company_name: formData.company_name,
          domain: formData.domain,
          start_date: formData.start_date,
          end_date: formData.end_date || null,
        })
        .eq("id", selectedTenant.id)

      if (error) {
        console.error("Error updating tenant:", error)
        setMessage({ type: "error", text: "Failed to update tenant" })
        return
      }

      setMessage({ type: "success", text: "Tenant updated successfully" })
      setIsEditDialogOpen(false)
      setFormData({
        tenant_code: "",
        company_name: "",
        domain: "",
        start_date: "",
        end_date: "",
      })
      fetchTenants()
    } catch (err) {
      console.error("Error:", err)
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Open edit dialog
  const openEditDialog = (tenant: Tenant) => {
    setSelectedTenant(tenant)
    setFormData({
      tenant_code: tenant.tenant_code,
      company_name: tenant.company_name,
      domain: tenant.domain,
      start_date: tenant.start_date ? tenant.start_date.split("T")[0] : "",
      end_date: tenant.end_date ? tenant.end_date.split("T")[0] : "",
    })
    setIsEditDialogOpen(true)
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

  // Get tenant status based on end date
  const getTenantStatus = (endDate: string | null) => {
    if (!endDate) {
      return "Active"
    }

    const currentDate = new Date()
    const tenantEndDate = new Date(endDate)

    return tenantEndDate > currentDate ? "Active" : "Inactive"
  }

  // Clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  // Sorted tenants based on date
  const sortedTenants = [...tenants].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime()
    const dateB = new Date(b.created_at).getTime()
    return dateSort === "asc" ? dateA - dateB : dateB - dateA
  })

  // Toggle sort
  const toggleDateSort = () => {
    setDateSort(prev => prev === "asc" ? "desc" : "asc")
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
            <span className="font-bold text-lg text-white">Srikrutha Cloud</span>
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
                  className={`w-full flex items-center gap-2.5 pl-9 pr-3 py-2 rounded-md transition-colors text-sm ${activeTab === "tenants"
                    ? "bg-[#00d4ff]/10 text-[#00d4ff]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  onClick={() => {
                    setActiveTab("tenants")
                    setIsSidebarOpen(false)
                  }}
                >
                  <Building2 className="w-4 h-4" />
                  <span className="font-medium">Tenants</span>
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
                  Tenants Management
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
                  <Building2 className="w-6 h-6 text-[#00d4ff]" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Tenants</p>
                  <p className="text-2xl font-bold text-gray-900">{tenants.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchTenants}
                  disabled={isLoading}
                  className="gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setFormData({
                      tenant_code: "",
                      company_name: "",
                      domain: "",
                      start_date: "",
                      end_date: "",
                    })
                    setIsAddDialogOpen(true)
                  }}
                  className="gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white"
                >
                  <Plus className="w-4 h-4" />
                  Add Tenant
                </Button>
              </div>
            </div>
          </div>

          {/* Tenants Table Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Tenants</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Manage all tenants in the system
                </p>
              </div>
              {selectedIds.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setIsDeleteSelectedDialogOpen(true)}
                  className="gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Selected ({selectedIds.length})
                </Button>
              )}
            </div>

            {isLoading ? (
              <div className="p-12 text-center">
                <Loader2 className="w-8 h-8 text-[#00d4ff] animate-spin mx-auto" />
                <p className="text-gray-500 mt-2">Loading tenants...</p>
              </div>
            ) : tenants.length === 0 ? (
              <div className="p-12 text-center">
                <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No tenants found</p>
              </div>
            ) : (
              <div className="w-full overflow-x-auto scrollbar-thin">
                <Table className="min-w-max">
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedIds.length === tenants.length && tenants.length > 0}
                          onChange={handleSelectAll}
                          className="cursor-pointer"
                        />
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">Tenant Code</TableHead>
                      <TableHead className="font-semibold text-gray-700">Company Name</TableHead>
                      <TableHead className="font-semibold text-gray-700">Domain</TableHead>
                      <TableHead className="font-semibold text-gray-700">Start Date</TableHead>
                      <TableHead className="font-semibold text-gray-700">End Date</TableHead>
                      <TableHead className="font-semibold text-gray-700">Status</TableHead>
                      <TableHead
                        className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                        onClick={toggleDateSort}
                      >
                        <div className="flex items-center gap-1">
                          Created Date
                          {dateSort === "asc" ? (
                            <ArrowUp className="w-4 h-4 text-[#00d4ff]" />
                          ) : (
                            <ArrowDown className="w-4 h-4 text-[#00d4ff]" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead
                        className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                      >
                        <div className="flex items-center gap-1">
                          Updated Date
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedTenants.map((tenant) => (
                      <TableRow key={tenant.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell>
                          <Checkbox
                            checked={selectedIds.includes(tenant.id)}
                            onChange={() => handleSelectOne(tenant.id)}
                            className="cursor-pointer"
                          />
                        </TableCell>
                        <TableCell className="font-medium text-gray-900">{tenant.tenant_code}</TableCell>
                        <TableCell className="text-gray-700">{tenant.company_name}</TableCell>
                        <TableCell className="text-gray-700">{tenant.domain}</TableCell>
                        <TableCell className="text-gray-500 text-sm whitespace-nowrap">
                          {formatDate(tenant.start_date)}
                        </TableCell>
                        <TableCell className="text-gray-500 text-sm whitespace-nowrap">
                          {tenant.end_date ? formatDate(tenant.end_date) : "-"}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center justify-center min-w-[70px] h-6 rounded-md text-xs font-medium ${getTenantStatus(tenant.end_date) === "Active"
                              ? "bg-[#0A1628] text-white"
                              : "bg-[#F1F5F9] text-[#334155]"
                              }`}
                          >
                            {getTenantStatus(tenant.end_date)}
                          </span>
                        </TableCell>
                        <TableCell className="text-gray-500 text-sm whitespace-nowrap">
                          {formatDate(tenant.created_at)}
                        </TableCell>
                        <TableCell className="text-gray-500 text-sm whitespace-nowrap">
                          {formatDate(tenant.updated_at)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openViewDialog(tenant)}
                              className="h-8 w-8 text-gray-500 hover:text-[#0066ff] hover:bg-blue-50"
                              title="View details"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(tenant)}
                              className="h-8 w-8 text-gray-500 hover:text-[#0066ff] hover:bg-blue-50"
                              title="Edit tenant"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openDeleteDialog(tenant)}
                              className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
                              title="Delete tenant"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add/Edit Tenant Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Tenant</DialogTitle>
            <DialogDescription>
              Create a new tenant in the system
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="tenant_code" className="text-sm font-medium">
                Tenant Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="tenant_code"
                type="text"
                placeholder="Enter tenant code"
                value={formData.tenant_code}
                onChange={(e) => setFormData({ ...formData, tenant_code: e.target.value })}
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company_name" className="text-sm font-medium">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="company_name"
                type="text"
                placeholder="Enter company name"
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="domain" className="text-sm font-medium">
                Domain <span className="text-red-500">*</span>
              </Label>
              <Input
                id="domain"
                type="text"
                placeholder="Enter domain"
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="start_date" className="text-sm font-medium">
                Start Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_date" className="text-sm font-medium">
                End Date
              </Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                className="border-gray-300"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAddTenant}
              disabled={isSubmitting}
              className="bg-[#0066ff] hover:bg-[#0052cc] text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Tenant"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Tenant Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Tenant</DialogTitle>
            <DialogDescription>
              Update tenant information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit_tenant_code" className="text-sm font-medium">
                Tenant Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit_tenant_code"
                type="text"
                placeholder="Enter tenant code"
                value={formData.tenant_code}
                onChange={(e) => setFormData({ ...formData, tenant_code: e.target.value })}
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit_company_name" className="text-sm font-medium">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit_company_name"
                type="text"
                placeholder="Enter company name"
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit_domain" className="text-sm font-medium">
                Domain <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit_domain"
                type="text"
                placeholder="Enter domain"
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit_start_date" className="text-sm font-medium">
                Start Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit_start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit_end_date" className="text-sm font-medium">
                End Date
              </Label>
              <Input
                id="edit_end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                className="border-gray-300"
              />
            </div>

          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleEditTenant}
              disabled={isSubmitting}
              className="bg-[#0066ff] hover:bg-[#0052cc] text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Tenant Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>View Tenant Details</DialogTitle>
            <DialogDescription>
              Tenant information
            </DialogDescription>
          </DialogHeader>
          {selectedTenant && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Tenant Code</p>
                  <p className="font-medium text-gray-900">{selectedTenant.tenant_code}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`inline-flex items-center justify-center min-w-[70px] h-6 rounded-md text-xs font-medium ${getTenantStatus(selectedTenant.end_date) === "Active"
                      ? "bg-[#0A1628] text-white"
                      : "bg-[#F1F5F9] text-[#334155]"
                      }`}
                  >
                    {getTenantStatus(selectedTenant.end_date)}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Company Name</p>
                <p className="font-medium text-gray-900">{selectedTenant.company_name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Domain</p>
                <p className="font-medium text-gray-900">{selectedTenant.domain}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium text-gray-900 text-sm">{formatDate(selectedTenant.start_date)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium text-gray-900 text-sm">{selectedTenant.end_date ? formatDate(selectedTenant.end_date) : "-"}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Created Date</p>
                  <p className="font-medium text-gray-900 text-sm">{formatDate(selectedTenant.created_at)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Updated Date</p>
                  <p className="font-medium text-gray-900 text-sm">{formatDate(selectedTenant.updated_at)}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              onClick={() => setIsViewDialogOpen(false)}
              className="bg-[#0066ff] hover:bg-[#0052cc] text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Tenant Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Tenant</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this tenant? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
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

      {/* Delete Selected Dialog */}
      <Dialog open={isDeleteSelectedDialogOpen} onOpenChange={setIsDeleteSelectedDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Selected Tenants</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedIds.length} tenant(s)? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteSelectedDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteSelected}
              disabled={isDeletingSelected}
            >
              {isDeletingSelected ? (
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
    </div>
  )
}
