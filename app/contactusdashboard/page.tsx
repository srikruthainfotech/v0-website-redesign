"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { supabase, type ContactUs, type TalentReferral } from "@/lib/supabase"
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
  Users,
  RefreshCw,
  ExternalLink,
  Mail,
  Building2,
  FileText,
  MessageSquare,
  Calendar,
  User,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  Briefcase,
  MapPin,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default function ContactUsDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [contacts, setContacts] = useState<ContactUs[]>([])
  const [selectedContact, setSelectedContact] = useState<ContactUs | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDashboardExpanded, setIsDashboardExpanded] = useState(false)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [isDeleteSelectedDialogOpen, setIsDeleteSelectedDialogOpen] = useState(false)
  const [isDeletingSelected, setIsDeletingSelected] = useState(false)
  const [activeTab, setActiveTab] = useState<"contact" | "referrals">("contact")
  const [referrals, setReferrals] = useState<TalentReferral[]>([])
  const [referralLoading, setReferralLoading] = useState(false)

  // Check authentication on mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (isLoggedIn !== "true") {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  // Fetch contacts from Supabase
  const fetchContacts = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from("contact_us")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching contacts:", error)
        setMessage({ type: "error", text: "Failed to fetch contacts" })
        return
      }

      setContacts(data || [])
    } catch (err) {
      console.error("Error:", err)
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Fetch referrals from Supabase
  const fetchReferrals = useCallback(async () => {
    console.log("[v0] ACTIVE TAB:", activeTab)
    setReferralLoading(true)
    try {
      const { data, error } = await supabase
        .from("talent_referrals")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching referrals:", error)
        setMessage({ type: "error", text: "Failed to fetch referrals" })
        return
      }

      console.log("[v0] REFERRALS:", data)
      setReferrals(data || [])
    } catch (err) {
      console.error("Error:", err)
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setReferralLoading(false)
    }
  }, [activeTab])

  // Fetch data based on active tab
  useEffect(() => {
    if (!isAuthenticated) return
    if (activeTab === "contact") {
      fetchContacts()
    } else {
      fetchReferrals()
    }
    setSelectedIds([])
  }, [activeTab, isAuthenticated, fetchContacts, fetchReferrals])

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("username")
    router.push("/login")
  }

  // Open view dialog
  const openViewDialog = (contact: ContactUs) => {
    setSelectedContact(contact)
    setIsViewDialogOpen(true)
  }

  // Open delete dialog
  const openDeleteDialog = (contact: ContactUs) => {
    setSelectedContact(contact)
    setIsDeleteDialogOpen(true)
  }

  // Handle select all toggle
  const handleSelectAll = () => {
    const currentData = activeTab === "contact" ? contacts : referrals
    if (selectedIds.length === currentData.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(currentData.map((c) => c.id))
    }
  }

  // Handle individual row selection
  const handleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    )
  }

  // Handle delete selected
  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return

    setIsDeletingSelected(true)
    const tableName = activeTab === "contact" ? "contact_us" : "talent_referrals"
    const itemType = activeTab === "contact" ? "contact(s)" : "referral(s)"
    
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .in("id", selectedIds)

      if (error) {
        console.error(`Error deleting ${itemType}:`, error)
        setMessage({ type: "error", text: `Failed to delete selected ${itemType}` })
        return
      }

      setMessage({ type: "success", text: `${selectedIds.length} ${itemType} deleted successfully` })
      setIsDeleteSelectedDialogOpen(false)
      setSelectedIds([])
      if (activeTab === "contact") {
        fetchContacts()
      } else {
        fetchReferrals()
      }
    } catch (err) {
      console.error("Error:", err)
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setIsDeletingSelected(false)
    }
  }

  // Handle delete
  const handleDelete = async () => {
    if (!selectedContact) return

    setIsSubmitting(true)
    const tableName = activeTab === "contact" ? "contact_us" : "talent_referrals"
    const itemType = activeTab === "contact" ? "contact" : "referral"
    
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq("id", selectedContact.id)

      if (error) {
        console.error(`Error deleting ${itemType}:`, error)
        setMessage({ type: "error", text: `Failed to delete ${itemType}` })
        return
      }

      setMessage({ type: "success", text: `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} deleted successfully` })
      setIsDeleteDialogOpen(false)
      if (activeTab === "contact") {
        fetchContacts()
      } else {
        fetchReferrals()
      }
    } catch (err) {
      console.error("Error:", err)
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setIsSubmitting(false)
    }
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
                className={`overflow-hidden transition-all duration-200 ease-in-out ${isDashboardExpanded ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <button
                  onClick={() => setActiveTab("contact")}
                  className={`w-full flex items-center gap-2.5 pl-9 pr-3 py-2 rounded-md transition-colors text-sm ${
                    activeTab === "contact" 
                      ? "bg-[#00d4ff]/10 text-[#00d4ff]" 
                      : "hover:bg-white/5 text-white"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span className="font-medium">Contact Us Info</span>
                </button>
                <button
                  onClick={() => setActiveTab("referrals")}
                  className={`w-full flex items-center gap-2.5 pl-9 pr-3 py-2 rounded-md transition-colors text-sm ${
                    activeTab === "referrals" 
                      ? "bg-[#00d4ff]/10 text-[#00d4ff]" 
                      : "hover:bg-white/5 text-white"
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span className="font-medium">Talent Referrals</span>
                </button>
              </div>
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/10">
            <div className="text-xs text-gray-400">
              Logged in as Admin
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
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
                  {activeTab === "contact" ? "Contact Us Dashboard" : "Talent Referrals Dashboard"}
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
        <main className="flex-1 p-4 lg:p-6">
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
                  {activeTab === "contact" ? (
                    <Users className="w-6 h-6 text-[#00d4ff]" />
                  ) : (
                    <Briefcase className="w-6 h-6 text-[#00d4ff]" />
                  )}
                </div>
                <div>
                  <p className="text-gray-500 text-sm">
                    {activeTab === "contact" ? "Total Inquiries" : "Total Referrals"}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {activeTab === "contact" ? contacts.length : referrals.length}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setIsDeleteSelectedDialogOpen(true)}
                  disabled={selectedIds.length === 0}
                  className="gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Selected
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={activeTab === "contact" ? fetchContacts : fetchReferrals}
                  disabled={activeTab === "contact" ? isLoading : referralLoading}
                  className="gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${(activeTab === "contact" ? isLoading : referralLoading) ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Table Card */}
          {activeTab === "contact" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Contact Submissions</h2>
                <p className="text-sm text-gray-500 mt-1">
                  View and manage all contact form submissions
                </p>
              </div>

              {isLoading ? (
                <div className="p-12 text-center">
                  <Loader2 className="w-8 h-8 text-[#00d4ff] animate-spin mx-auto" />
                  <p className="text-gray-500 mt-2">Loading contacts...</p>
                </div>
              ) : contacts.length === 0 ? (
                <div className="p-12 text-center">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No contact submissions yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="w-12">
                          <Checkbox
                            checked={contacts.length > 0 && selectedIds.length === contacts.length}
                            onCheckedChange={handleSelectAll}
                            aria-label="Select all"
                            className={selectedIds.length > 0 && selectedIds.length < contacts.length ? "data-[state=checked]:bg-[#00d4ff]/50" : ""}
                          />
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700">Name</TableHead>
                        <TableHead className="font-semibold text-gray-700">Email</TableHead>
                        <TableHead className="font-semibold text-gray-700">Company</TableHead>
                        <TableHead className="font-semibold text-gray-700 max-w-[180px]">Subject</TableHead>
                        <TableHead className="font-semibold text-gray-700 max-w-[200px]">Message</TableHead>
                        <TableHead className="font-semibold text-gray-700">Date</TableHead>
                        <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map((contact) => (
                        <TableRow
                          key={contact.id}
                          className={`hover:bg-gray-50 transition-colors ${selectedIds.includes(contact.id) ? "bg-blue-50" : ""
                            }`}
                        >
                          <TableCell>
                            <Checkbox
                              checked={selectedIds.includes(contact.id)}
                              onCheckedChange={() => handleSelectOne(contact.id)}
                              aria-label={`Select ${contact.name}`}
                            />
                          </TableCell>
                          <TableCell className="font-medium text-gray-900">{contact.name}</TableCell>
                          <TableCell>
                            <a
                              href={`mailto:${contact.email}`}
                              className="text-[#0066ff] hover:underline"
                            >
                              {contact.email}
                            </a>
                          </TableCell>
                          <TableCell className="text-gray-500">
                            {contact.company || "-"}
                          </TableCell>
                          <TableCell
                            className="max-w-[180px] truncate text-gray-700"
                            title={contact.subject}
                          >
                            {contact.subject}
                          </TableCell>
                          <TableCell
                            className="max-w-[200px] truncate text-gray-500"
                            title={contact.message}
                          >
                            {contact.message}
                          </TableCell>
                          <TableCell className="text-gray-500 text-sm whitespace-nowrap">
                            {formatDate(contact.created_at)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openViewDialog(contact)}
                                className="h-8 w-8 text-gray-500 hover:text-[#0066ff] hover:bg-blue-50"
                                title="View details"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openDeleteDialog(contact)}
                                className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
                                title="Delete"
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
          )}

          {/* Referrals Table Card */}
          {activeTab === "referrals" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Talent Referral Submissions</h2>
                <p className="text-sm text-gray-500 mt-1">
                  View and manage all talent referral submissions
                </p>
              </div>

              {referralLoading ? (
                <div className="p-12 text-center">
                  <Loader2 className="w-8 h-8 text-[#00d4ff] animate-spin mx-auto" />
                  <p className="text-gray-500 mt-2">Loading referrals...</p>
                </div>
              ) : referrals.length === 0 ? (
                <div className="p-12 text-center">
                  <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No referrals found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="w-12">
                          <Checkbox
                            checked={referrals.length > 0 && selectedIds.length === referrals.length}
                            onCheckedChange={handleSelectAll}
                            aria-label="Select all"
                            className={selectedIds.length > 0 && selectedIds.length < referrals.length ? "data-[state=checked]:bg-[#00d4ff]/50" : ""}
                          />
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700">Your Name</TableHead>
                        <TableHead className="font-semibold text-gray-700">Your Email</TableHead>
                        <TableHead className="font-semibold text-gray-700">Candidate Name</TableHead>
                        <TableHead className="font-semibold text-gray-700">Candidate Email</TableHead>
                        <TableHead className="font-semibold text-gray-700">Position</TableHead>
                        <TableHead className="font-semibold text-gray-700">Location</TableHead>
                        <TableHead className="font-semibold text-gray-700">Date</TableHead>
                        <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {referrals.map((referral) => (
                        <TableRow
                          key={referral.id}
                          className={`hover:bg-gray-50 transition-colors ${selectedIds.includes(referral.id) ? "bg-blue-50" : ""
                            }`}
                        >
                          <TableCell>
                            <Checkbox
                              checked={selectedIds.includes(referral.id)}
                              onCheckedChange={() => handleSelectOne(referral.id)}
                              aria-label={`Select ${referral.your_name}`}
                            />
                          </TableCell>
                          <TableCell className="font-medium text-gray-900">{referral.your_name}</TableCell>
                          <TableCell>
                            <a
                              href={`mailto:${referral.your_email}`}
                              className="text-[#0066ff] hover:underline"
                            >
                              {referral.your_email}
                            </a>
                          </TableCell>
                          <TableCell className="font-medium text-gray-900">{referral.candidate_name}</TableCell>
                          <TableCell>
                            <a
                              href={`mailto:${referral.candidate_email}`}
                              className="text-[#0066ff] hover:underline"
                            >
                              {referral.candidate_email}
                            </a>
                          </TableCell>
                          <TableCell className="text-gray-700">{referral.position}</TableCell>
                          <TableCell className="text-gray-500">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {referral.location}
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-500 text-sm whitespace-nowrap">
                            {formatDate(referral.created_at)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openViewDialog(referral as unknown as ContactUs)}
                                className="h-8 w-8 text-gray-500 hover:text-[#0066ff] hover:bg-blue-50"
                                title="View details"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openDeleteDialog(referral as unknown as ContactUs)}
                                className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
                                title="Delete"
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
          )}
        </main>
      </div>

      {/* View Contact/Referral Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center">
                {activeTab === "contact" ? (
                  <User className="w-4 h-4 text-[#00d4ff]" />
                ) : (
                  <Briefcase className="w-4 h-4 text-[#00d4ff]" />
                )}
              </div>
              {activeTab === "contact" ? "Contact Details" : "Referral Details"}
            </DialogTitle>
            <DialogDescription>
              {activeTab === "contact" 
                ? "Full details of the contact submission"
                : "Full details of the talent referral"}
            </DialogDescription>
          </DialogHeader>

          {selectedContact && activeTab === "contact" && (
            <div className="space-y-4 py-4">
              {/* Name */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Name</p>
                  <p className="text-gray-900 mt-1">{selectedContact.name}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Email</p>
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="text-[#0066ff] hover:underline mt-1 block"
                  >
                    {selectedContact.email}
                  </a>
                </div>
              </div>

              {/* Company */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Building2 className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Company</p>
                  <p className="text-gray-900 mt-1">{selectedContact.company || "Not provided"}</p>
                </div>
              </div>

              {/* Subject */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Subject</p>
                  <p className="text-gray-900 mt-1">{selectedContact.subject}</p>
                </div>
              </div>

              {/* Message */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <MessageSquare className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Message</p>
                  <p className="text-gray-900 mt-1 whitespace-pre-wrap break-words">
                    {selectedContact.message}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Submitted On</p>
                  <p className="text-gray-900 mt-1">{formatDate(selectedContact.created_at)}</p>
                </div>
              </div>
            </div>
          )}

          {selectedContact && activeTab === "referrals" && (
            <div className="space-y-4 py-4">
              {/* Referrer Name */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Your Name</p>
                  <p className="text-gray-900 mt-1">{(selectedContact as unknown as TalentReferral).your_name}</p>
                </div>
              </div>

              {/* Referrer Email */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Your Email</p>
                  <a
                    href={`mailto:${(selectedContact as unknown as TalentReferral).your_email}`}
                    className="text-[#0066ff] hover:underline mt-1 block"
                  >
                    {(selectedContact as unknown as TalentReferral).your_email}
                  </a>
                </div>
              </div>

              {/* Candidate Name */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Candidate Name</p>
                  <p className="text-gray-900 mt-1">{(selectedContact as unknown as TalentReferral).candidate_name}</p>
                </div>
              </div>

              {/* Candidate Email */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Candidate Email</p>
                  <a
                    href={`mailto:${(selectedContact as unknown as TalentReferral).candidate_email}`}
                    className="text-[#0066ff] hover:underline mt-1 block"
                  >
                    {(selectedContact as unknown as TalentReferral).candidate_email}
                  </a>
                </div>
              </div>

              {/* Position */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Briefcase className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Position</p>
                  <p className="text-gray-900 mt-1">{(selectedContact as unknown as TalentReferral).position}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Location</p>
                  <p className="text-gray-900 mt-1">{(selectedContact as unknown as TalentReferral).location}</p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Submitted On</p>
                  <p className="text-gray-900 mt-1">{formatDate(selectedContact.created_at)}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="w-5 h-5" />
              {activeTab === "contact" ? "Delete Contact" : "Delete Referral"}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this {activeTab === "contact" ? "contact submission" : "referral"} from{" "}
              <span className="font-medium text-gray-900">
                {activeTab === "contact" 
                  ? selectedContact?.name 
                  : (selectedContact as unknown as TalentReferral)?.your_name}
              </span>?
              This action cannot be undone.
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

      {/* Delete Selected Confirmation Dialog */}
      <Dialog open={isDeleteSelectedDialogOpen} onOpenChange={setIsDeleteSelectedDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="w-5 h-5" />
              {activeTab === "contact" ? "Delete Selected Contacts" : "Delete Selected Referrals"}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900">{selectedIds.length}</span>{" "}
              selected {activeTab === "contact" ? "contact" : "referral"}{selectedIds.length > 1 ? "s" : ""}?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteSelectedDialogOpen(false)}
              disabled={isDeletingSelected}
            >
              Cancel
            </Button>
            <Button
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
                `Delete ${selectedIds.length} ${activeTab === "contact" ? "Contact" : "Referral"}${selectedIds.length > 1 ? "s" : ""}`
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
