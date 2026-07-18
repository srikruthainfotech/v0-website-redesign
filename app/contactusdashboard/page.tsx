"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { supabase, type ContactUs, type TalentReferral, type JobApplication, type JobOpening, type UserManagement, type Partnership } from "@/lib/supabase"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  ArrowUp,
  ArrowDown,
  Download,
  Phone,
  FileCheck,
  Plus,
  Pencil,
  UserCog,
  Hash,
  ClipboardList,
  Handshake,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import bcrypt from "bcryptjs"

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
  const [activeTab, setActiveTab] = useState<"contact" | "referrals" | "jobs" | "jobpostings" | "users" | "partners">("contact")
  const [referrals, setReferrals] = useState<TalentReferral[]>([])
  const [referralLoading, setReferralLoading] = useState(false)
  const [contactDateSort, setContactDateSort] = useState<"asc" | "desc">("desc")
  const [referralDateSort, setReferralDateSort] = useState<"asc" | "desc">("desc")
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([])
  const [jobLoading, setJobLoading] = useState(false)
  const [jobDateSort, setJobDateSort] = useState<"asc" | "desc">("desc")
  const [jobPostings, setJobPostings] = useState<JobOpening[]>([])
  const [jobPostingLoading, setJobPostingLoading] = useState(false)
  const [jobPostingDateSort, setJobPostingDateSort] = useState<"asc" | "desc">("desc")

  // User Management States
  const [users, setUsers] = useState<UserManagement[]>([])
  const [usersLoading, setUsersLoading] = useState(false)
  const [usersDateSort, setUsersDateSort] = useState<"asc" | "desc">("desc")
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false)
  const [isViewUserDialogOpen, setIsViewUserDialogOpen] = useState(false)
  const [isAddJobPostingDialogOpen, setIsAddJobPostingDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserManagement | null>(null)

  // Partner Management States
  const [partners, setPartners] = useState<Partnership[]>([])
  const [selectedPartner, setSelectedPartner] = useState<Partnership | null>(null)
  const [isViewPartnerDialogOpen, setIsViewPartnerDialogOpen] = useState(false)
  const [isEditPartnerDialogOpen, setIsEditPartnerDialogOpen] = useState(false)
  const [partnerLoading, setPartnerLoading] = useState(false)
  const [partnerDateSort, setPartnerDateSort] = useState<"asc" | "desc">("desc")
  const [partnerFormData, setPartnerFormData] = useState({
    company_name: "",
    company_email: "",
    website: "",
    phone: "",
    country: "",
    company_size: "",
    industry: "",
    address: "",
    city: "",
    first_name: "",
    last_name: "",
    designation: "",
    business_email: "",
    mobile_number: "",
    linkedin: "",
    partnership_type: "",
    services_offered: "",
    years_in_business: "",
    number_of_employees: "",
    countries_served: "",
    major_clients: "",
    certifications: "",
    partnership_reason: "",
    additional_notes: "",
    agree_terms: false,
    agree_privacy: false,
    company_profile_url: "",
    company_brochure_url: "",
  })
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
  const [loggedInUsername, setLoggedInUsername] = useState("")
  const [roles, setRoles] = useState<any[]>([])
  const [selectedRole, setSelectedRole] = useState<number | "">("")
  const [tenantId, setTenantId] = useState<string | null>(null)
  const [jobPostingFormData, setJobPostingFormData] = useState({
    post_id: "",
    posting_date: "",
    position: "",
    number_of_openings: "",
    job_type: "",
    job_description: "",
    location: "",
    job_duties: "",
    education: "",
    experience: "",
    posted_by: "",
    designation: "",
    status: "Active",
  })
  const [isJobPostingSubmitting, setIsJobPostingSubmitting] = useState(false)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    const username = localStorage.getItem("username")
    const storedTenantId = localStorage.getItem("tenantId")

    if (isLoggedIn !== "true") {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
      setLoggedInUsername(username || "Admin")
      setTenantId(storedTenantId)
    }
  }, [router])

  // Fetch contacts from Supabase
  const fetchContacts = useCallback(async () => {
    setIsLoading(true)
    try {
      const currentTenantId =
        localStorage.getItem("tenantId")

      const { data, error } = await supabase
        .from("contact_us")
        .select("*")
        .eq("tenant_id", currentTenantId)
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
    setReferralLoading(true)
    try {
      const currentTenantId =
        localStorage.getItem("tenantId")

      const { data, error } = await supabase
        .from("talent_referrals")
        .select("*")
        .eq("tenant_id", currentTenantId)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching referrals:", error)
        setMessage({ type: "error", text: "Failed to fetch referrals" })
        return
      }

      setReferrals(data || [])
    } catch (err) {
      console.error("Error:", err)
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setReferralLoading(false)
    }
  }, [activeTab])

  // Fetch job applications from Supabase
  const fetchJobApplications = useCallback(async () => {
    setJobLoading(true)
    try {
      const currentTenantId =
        localStorage.getItem("tenantId")

      const { data, error } = await supabase
        .from("job_applications")
        .select("*")
        .eq("tenant_id", currentTenantId)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching job applications:", error)
        setMessage({ type: "error", text: "Failed to fetch job applications" })
        return
      }

      setJobApplications(data || [])
    } catch (err) {
      console.error("Error:", err)
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setJobLoading(false)
    }
  }, [])

  // Fetch job postings from Supabase
  const fetchJobPostings = useCallback(async () => {
    setJobPostingLoading(true)
    try {
      const currentTenantId =
        localStorage.getItem("tenantId")

      const { data, error } = await supabase
        .from("job_openings")
        .select("*")
        .eq("tenant_id", currentTenantId)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching job postings:", error)
        setMessage({ type: "error", text: "Failed to fetch job postings" })
        return
      }

      setJobPostings(data || [])
    } catch (err) {
      console.error("Error:", err)
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setJobPostingLoading(false)
    }
  }, [])

  // Fetch roles from Supabase
  const fetchRoles = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("roles")
        .select("*")
        .order("role_id", { ascending: true })

      if (error) {
        console.error("Error fetching roles:", error)
        return
      }

      setRoles(data || [])
    } catch (err) {
      console.error("Error:", err)
    }
  }, [])

  // Fetch users from Supabase
  const fetchUsers = useCallback(async () => {
    setUsersLoading(true)
    try {
      const currentTenantId =
        localStorage.getItem("tenantId")
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
        .eq("tenant_id", currentTenantId)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching users:", error)
        setMessage({ type: "error", text: "Failed to fetch users" })
        return
      }

      const formattedUsers = (data || []).map((user: any) => ({
        ...user,
        roles:
          user.user_roles?.map(
            (item: any) => item.roles.role_name
          ) || [],
      }))

      setUsers(formattedUsers)
    } catch (err) {
      console.error("Error:", err)
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setUsersLoading(false)
    }
  }, [])

  // Fetch partners from Supabase
  const fetchPartners = useCallback(async () => {
    setPartnerLoading(true)
    try {
      const currentTenantId =
        localStorage.getItem("tenantId")

      const { data, error } = await supabase
        .from("partnership_registration")
        .select("*")
        .eq("tenant_id", currentTenantId)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching partners:", error)
        setMessage({ type: "error", text: "Failed to fetch partners" })
        return
      }

      setPartners(data || [])
    } catch (err) {
      console.error("Error:", err)
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setPartnerLoading(false)
    }
  }, [])

  // Fetch data based on active tab
  useEffect(() => {
    if (!isAuthenticated) return
    fetchRoles()
    if (activeTab === "contact") {
      fetchContacts()
    } else if (activeTab === "referrals") {
      fetchReferrals()
    } else if (activeTab === "jobs") {
      fetchJobApplications()
    } else if (activeTab === "jobpostings") {
      fetchJobPostings()
    } else if (activeTab === "users") {
      fetchUsers()
    } else if (activeTab === "partners") {
      fetchPartners()
    }
    setSelectedIds([])
  }, [activeTab, isAuthenticated, fetchContacts, fetchReferrals, fetchJobApplications, fetchJobPostings, fetchUsers, fetchPartners])

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("username")
    localStorage.removeItem("userId")
    localStorage.removeItem("userRole")
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
    const currentData = activeTab === "contact" ? contacts : activeTab === "referrals" ? referrals : activeTab === "jobs" ? jobApplications : activeTab === "jobpostings" ? jobPostings : activeTab === "users" ? users : partners
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
    const tableName = activeTab === "contact" ? "contact_us" : activeTab === "referrals" ? "talent_referrals" : activeTab === "jobs" ? "job_applications" : activeTab === "jobpostings" ? "job_openings" : activeTab === "users" ? "users" : "partnership_registration"
    const itemType = activeTab === "contact" ? "contact(s)" : activeTab === "referrals" ? "referral(s)" : activeTab === "jobs" ? "application(s)" : activeTab === "jobpostings" ? "posting(s)" : activeTab === "users" ? "user(s)" : "partner(s)"

    try {
      // ✅ DELETE FILES FROM STORAGE (FOR REFERRALS)
      if (activeTab === "referrals") {
        const filesToDelete = referrals
          .filter(r => selectedIds.includes(r.id) && r.resume_url)
          .map(r =>
            decodeURIComponent(r.resume_url!.split("/").slice(-1)[0])
          )
        if (filesToDelete.length > 0) {
          await supabase.storage
            .from("resumes")
            .remove(filesToDelete)
        }
      }
      // ✅ DELETE FILES FROM STORAGE (FOR JOB APPLICATIONS)
      if (activeTab === "jobs") {
        const filesToDelete = jobApplications
          .filter(j => selectedIds.includes(j.id) && j.resume_url)
          .map(j =>
            decodeURIComponent(j.resume_url!.split("/").slice(-1)[0])
          )

        if (filesToDelete.length > 0) {
          const { error: storageDeleteError } = await supabase.storage
            .from("resumes")
            .remove(filesToDelete)

          if (storageDeleteError) {
            console.error("Storage delete error:", storageDeleteError)
          }
        }
      }
      // ✅ DELETE FILES FROM STORAGE (FOR PARTNERS)
      if (activeTab === "partners") {
        const filesToDelete: string[] = []
        partners
          .filter(p => selectedIds.includes(p.id))
          .forEach(p => {
            if (p.company_profile_url) {
              filesToDelete.push(
                decodeURIComponent(p.company_profile_url.split("/").slice(-1)[0])
              )
            }
            if (p.company_brochure_url) {
              filesToDelete.push(
                decodeURIComponent(p.company_brochure_url.split("/").slice(-1)[0])
              )
            }
          })
        if (filesToDelete.length > 0) {
          const { error: storageDeleteError } = await supabase.storage
            .from("partnership-files")
            .remove(filesToDelete)

          if (storageDeleteError) {
            console.error("Storage delete error:", storageDeleteError)
          }
        }
      }
      let query = supabase
        .from(tableName)
        .delete()
        .in("id", selectedIds)

      if (
        activeTab === "users" ||
        activeTab === "contact" ||
        activeTab === "referrals" ||
        activeTab === "jobs" ||
        activeTab === "jobpostings" ||
        activeTab === "partners"
      ) {
        const currentTenantId =
          localStorage.getItem("tenantId")

        query = query.eq("tenant_id", currentTenantId)
      }
      const { error } = await query

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
      } else if (activeTab === "referrals") {
        fetchReferrals()
      } else if (activeTab === "jobs") {
        fetchJobApplications()
      } else if (activeTab === "jobpostings") {
        fetchJobPostings()
      } else if (activeTab === "users") {
        fetchUsers()
      } else if (activeTab === "partners") {
        fetchPartners()
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

    const tableName = activeTab === "contact" ? "contact_us" : activeTab === "referrals" ? "talent_referrals" : activeTab === "jobs" ? "job_applications" : activeTab === "jobpostings" ? "job_openings" : activeTab === "users" ? "users" : "partnership_registration"
    const itemType = activeTab === "contact" ? "contact" : activeTab === "referrals" ? "referral" : activeTab === "jobs" ? "application" : activeTab === "jobpostings" ? "posting" : activeTab === "users" ? "user" : "partner"

    try {
      // ✅ STEP 1: DELETE FILE FROM STORAGE (FOR REFERRALS)
      if (activeTab === "referrals") {
        const referral = selectedContact as unknown as TalentReferral

        if (referral.resume_url) {
          // extract file name from URL
          const filePath = decodeURIComponent(
            referral.resume_url.split("/").slice(-1)[0]
          )

          await supabase.storage
            .from("resumes")
            .remove([filePath])
        }
      }

      // ✅ STEP 1B: DELETE FILE FROM STORAGE (FOR JOB APPLICATIONS)
      if (activeTab === "jobs") {
        const application = selectedContact as unknown as JobApplication

        if (application.resume_url) {
          // extract file name from URL
          const filePath = decodeURIComponent(
            application.resume_url.split("/").slice(-1)[0]
          )

          await supabase.storage
            .from("job-applications")
            .remove([filePath])
        }
      }

      // ✅ STEP 1C: DELETE FILES FROM STORAGE (FOR PARTNERS)
      if (activeTab === "partners") {
        const partner = selectedContact as unknown as Partnership
        const filesToDelete: string[] = []

        if (partner.company_profile_url) {
          filesToDelete.push(
            decodeURIComponent(partner.company_profile_url.split("/").slice(-1)[0])
          )
        }
        if (partner.company_brochure_url) {
          filesToDelete.push(
            decodeURIComponent(partner.company_brochure_url.split("/").slice(-1)[0])
          )
        }

        if (filesToDelete.length > 0) {
          await supabase.storage
            .from("partnership-files")
            .remove(filesToDelete)
        }
      }

      // ✅ STEP 2: DELETE FROM DATABASE
      let query = supabase
        .from(tableName)
        .delete()
        .eq("id", selectedContact.id)

      if (
        activeTab === "users" ||
        activeTab === "contact" ||
        activeTab === "referrals" ||
        activeTab === "jobs" ||
        activeTab === "jobpostings" ||
        activeTab === "partners"
      ) {
        const currentTenantId =
          localStorage.getItem("tenantId")

        query = query.eq("tenant_id", currentTenantId)
      }

      const { error } = await query
      if (error) {
        setMessage({ type: "error", text: `Failed to delete ${itemType}` })
        return
      }

      setMessage({ type: "success", text: `${itemType} deleted successfully` })

      setIsDeleteDialogOpen(false)

      if (activeTab === "contact") {
        fetchContacts()
      } else if (activeTab === "referrals") {
        fetchReferrals()
      } else if (activeTab === "jobs") {
        fetchJobApplications()
      } else if (activeTab === "jobpostings") {
        fetchJobPostings()
      } else if (activeTab === "users") {
        fetchUsers()
      } else if (activeTab === "partners") {
        fetchPartners()
      }

    } catch (err) {
      setMessage({ type: "error", text: "Unexpected error occurred" })
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
  const getFileName = (url: string) => {
    try {
      const lastPart = url.split("/").pop() || ""

      // remove timestamp (before first "-")
      const cleanName = lastPart.substring(lastPart.indexOf("-") + 1)

      return decodeURIComponent(cleanName)
    } catch {
      return "Resume.pdf"
    }
  }

  const handleDownload = async (url: string) => {
    const response = await fetch(url)
    const blob = await response.blob()

    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = getFileName(url)
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
  // Clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  // Sorted contacts based on date
  const sortedContacts = [...contacts].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime()
    const dateB = new Date(b.created_at).getTime()
    return contactDateSort === "asc" ? dateA - dateB : dateB - dateA
  })

  // Sorted referrals based on date
  const sortedReferrals = [...referrals].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime()
    const dateB = new Date(b.created_at).getTime()
    return referralDateSort === "asc" ? dateA - dateB : dateB - dateA
  })

  // Sorted job applications based on date
  const sortedJobApplications = [...jobApplications].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime()
    const dateB = new Date(b.created_at).getTime()
    return jobDateSort === "asc" ? dateA - dateB : dateB - dateA
  })

  // Sorted job postings based on posting_date
  const sortedJobPostings = [...jobPostings].sort((a, b) => {
    const dateA = new Date(a.posting_date).getTime()
    const dateB = new Date(b.posting_date).getTime()
    return jobPostingDateSort === "asc" ? dateA - dateB : dateB - dateA
  })

  // Toggle sort functions
  const toggleContactDateSort = () => {
    setContactDateSort(prev => prev === "asc" ? "desc" : "asc")
  }

  const toggleReferralDateSort = () => {
    setReferralDateSort(prev => prev === "asc" ? "desc" : "asc")
  }

  const toggleJobDateSort = () => {
    setJobDateSort(prev => prev === "asc" ? "desc" : "asc")
  }

  const toggleJobPostingDateSort = () => {
    setJobPostingDateSort(prev => prev === "asc" ? "desc" : "asc")
  }

  // Sorted users based on date
  const sortedUsers = [...users].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime()
    const dateB = new Date(b.created_at).getTime()
    return usersDateSort === "asc" ? dateA - dateB : dateB - dateA
  })

  const toggleUsersDateSort = () => {
    setUsersDateSort(prev => prev === "asc" ? "desc" : "asc")
  }

  // Sorted partners based on date
  const sortedPartners = [...partners].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime()
    const dateB = new Date(b.created_at).getTime()
    return partnerDateSort === "asc" ? dateA - dateB : dateB - dateA
  })

  const togglePartnerDateSort = () => {
    setPartnerDateSort(prev => prev === "asc" ? "desc" : "asc")
  }

  // Helper function to safely render object fields
  const renderFieldValue = (value: any): string => {
    if (value === null || value === undefined) return "-"
    if (typeof value === "string") return value || "-"
    if (typeof value === "boolean") return value ? "Yes" : "No"
    if (typeof value === "object") {
      // For objects, extract keys that have truthy values
      const keys = Object.entries(value)
        .filter(([, v]) => v === true || v === 1)
        .map(([k]) => k)
      return keys.length > 0 ? keys.join(", ") : "-"
    }
    return String(value) || "-"
  }
  const generateEmployeeId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

    let result = ""

    for (let i = 0; i < 8; i++) {
      result += chars.charAt(
        Math.floor(Math.random() * chars.length)
      )
    }

    return result
  }
  const getUserStatus = (endDate: string | null) => {
    // If no end date, user is active
    if (!endDate) {
      return "Active"
    }

    const currentDate = new Date()
    const userEndDate = new Date(endDate)

    return userEndDate > currentDate ? "Active" : "Inactive"
  }

  // Handle Add User
  const handleAddUser = async () => {
    setIsUserSubmitting(true)
    try {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(userFormData.password, 10)
      const employeeId = generateEmployeeId()
      const currentTenantId =
        localStorage.getItem("tenantId")
      const {
        data: insertedUser,
        error,
      }: {
        data: UserManagement | null
        error: any
      } = await supabase
        .from("users")
        .insert([
          {
            user_id: userFormData.user_id,
            username: userFormData.username,
            first_name: userFormData.first_name,
            last_name: userFormData.last_name,
            employee_id: employeeId,
            password: hashedPassword,
            start_date: userFormData.start_date || null,
            end_date: userFormData.end_date || null,
            tenant_id: currentTenantId,
          },
        ])
        .select()
        .single()
      if (error) {
        console.error("Error adding user:", error)
        setMessage({ type: "error", text: "Failed to add user" })
        return
      }
      if (error) {
        console.error("Error adding user:", error)
        setMessage({ type: "error", text: "Failed to add user" })
        return
      }

      // INSERT USER ROLE - Only one role
      if (insertedUser && selectedRole) {
        const { error: roleError } = await supabase
          .from("user_roles")
          .insert([
            {
              user_id: insertedUser.id,
              role_id: selectedRole,
            },
          ])

        if (roleError) {
          console.error("Error inserting role:", roleError)
        }
      }

      setMessage({ type: "success", text: "User added successfully" })
      setIsAddUserDialogOpen(false)
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
      setSelectedRole("")
      fetchUsers()
    } catch (err) {
      console.error("Error:", err)
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setIsUserSubmitting(false)
    }
  }

  // Handle Edit User
  const handleEditUser = async () => {
    if (!selectedUser) return
    setIsUserSubmitting(true)
    try {
      const updateData: Record<string, string | null> = {
        user_id: userFormData.user_id,
        username: userFormData.username,
        first_name: userFormData.first_name,
        last_name: userFormData.last_name,
        employee_id: userFormData.employee_id,
        start_date: userFormData.start_date || null,
        end_date: userFormData.end_date || null,
      }

      // Only update password if a new one is provided
      if (userFormData.password) {
        const hashedPassword = await bcrypt.hash(userFormData.password, 10)
        updateData.password = hashedPassword
      }
      const currentTenantId =
        localStorage.getItem("tenantId")
      const { error } = await supabase
        .from("users")
        .update(updateData)
        .eq("id", selectedUser.id)
        .eq("tenant_id", currentTenantId)
      if (error) {
        console.error("Error updating user:", error)
        setMessage({ type: "error", text: "Failed to update user" })
        return
      }

      // Update user role if changed
      if (selectedRole) {
        // Delete old role mapping
        const { error: deleteError } = await supabase
          .from("user_roles")
          .delete()
          .eq("user_id", selectedUser.id)

        if (deleteError) {
          console.error("Error deleting old role:", deleteError)
        }

        // Insert new role mapping
        const { error: insertError } = await supabase
          .from("user_roles")
          .insert([
            {
              user_id: selectedUser.id,
              role_id: selectedRole,
            },
          ])

        if (insertError) {
          console.error("Error inserting new role:", insertError)
        }
      }

      setMessage({ type: "success", text: "User updated successfully" })
      setIsEditUserDialogOpen(false)
      setSelectedUser(null)
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
      setSelectedRole("")
      fetchUsers()
    } catch (err) {
      console.error("Error:", err)
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setIsUserSubmitting(false)
    }
  }

  // Open Edit User Dialog
  const openEditUserDialog = (user: UserManagement) => {
    setSelectedUser(user)
    setUserFormData({
      user_id: user.user_id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      employee_id: user.employee_id,
      password: "", // Don't pre-fill password
      start_date: user.start_date ? user.start_date.split("T")[0] : "",
      end_date: user.end_date ? user.end_date.split("T")[0] : "",
    })

    // Load current user's role
    const currentRole = user.user_roles?.[0]?.role_id || ""
    setSelectedRole(currentRole)

    setIsEditUserDialogOpen(true)
  }

  // Open View User Dialog
  const openViewUserDialog = (user: UserManagement) => {
    setSelectedUser(user)
    setIsViewUserDialogOpen(true)
  }

  // Handle Add Job Posting
  const handleAddJobPosting = async () => {
    setIsJobPostingSubmitting(true)
    try {
      const currentTenantId = localStorage.getItem("tenantId")

      const { error } = await supabase
        .from("job_openings")
        .insert([
          {
            tenant_id: currentTenantId,
            post_id: jobPostingFormData.post_id,
            posting_date: jobPostingFormData.posting_date,
            position: jobPostingFormData.position,
            number_of_openings: Number(jobPostingFormData.number_of_openings),
            job_type: jobPostingFormData.job_type,
            job_description: jobPostingFormData.job_description,
            location: jobPostingFormData.location,
            job_duties: jobPostingFormData.job_duties,
            education: jobPostingFormData.education,
            experience: jobPostingFormData.experience,
            posted_by: jobPostingFormData.posted_by,
            designation: jobPostingFormData.designation,
            status: jobPostingFormData.status,
          },
        ])

      if (error) {
        console.error("Error adding job posting:", error)
        setMessage({ type: "error", text: "Failed to add job posting" })
        return
      }

      setMessage({ type: "success", text: "Job posting added successfully" })
      setIsAddJobPostingDialogOpen(false)
      setJobPostingFormData({
        post_id: "",
        posting_date: "",
        position: "",
        number_of_openings: "",
        job_type: "",
        job_description: "",
        location: "",
        job_duties: "",
        education: "",
        experience: "",
        posted_by: "",
        designation: "",
        status: "Active",
      })
      fetchJobPostings()
    } catch (err) {
      console.error("Error:", err)
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setIsJobPostingSubmitting(false)
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
                  onClick={() => setActiveTab("contact")}
                  className={`w-full flex items-center gap-2.5 pl-9 pr-3 py-2 rounded-md transition-colors text-sm ${activeTab === "contact"
                    ? "bg-[#00d4ff]/10 text-[#00d4ff]"
                    : "hover:bg-white/5 text-white"
                    }`}
                >
                  <Users className="w-4 h-4" />
                  <span className="font-medium">Contact Us Info</span>
                </button>
                <button
                  onClick={() => setActiveTab("referrals")}
                  className={`w-full flex items-center gap-2.5 pl-9 pr-3 py-2 rounded-md transition-colors text-sm ${activeTab === "referrals"
                    ? "bg-[#00d4ff]/10 text-[#00d4ff]"
                    : "hover:bg-white/5 text-white"
                    }`}
                >
                  <FileCheck className="w-4 h-4" />
                  <span className="font-medium">Talent Referrals</span>
                </button>
                <button
                  onClick={() => setActiveTab("jobs")}
                  className={`w-full flex items-center gap-2.5 pl-9 pr-3 py-2 rounded-md transition-colors text-sm ${activeTab === "jobs"
                    ? "bg-[#00d4ff]/10 text-[#00d4ff]"
                    : "hover:bg-white/5 text-white"
                    }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span className="font-medium">Job Openings</span>
                </button>
                <button
                  onClick={() => setActiveTab("jobpostings")}
                  className={`w-full flex items-center gap-2.5 pl-9 pr-3 py-2 rounded-md transition-colors text-sm ${activeTab === "jobpostings"
                    ? "bg-[#00d4ff]/10 text-[#00d4ff]"
                    : "hover:bg-white/5 text-white"
                    }`}
                >
                  <ClipboardList className="w-4 h-4" />
                  <span className="font-medium">Job Postings</span>
                </button>
                <button
                  onClick={() => setActiveTab("users")}
                  className={`w-full flex items-center gap-2.5 pl-9 pr-3 py-2 rounded-md transition-colors text-sm ${activeTab === "users"
                    ? "bg-[#00d4ff]/10 text-[#00d4ff]"
                    : "hover:bg-white/5 text-white"
                    }`}
                >
                  <UserCog className="w-4 h-4" />
                  <span className="font-medium">User Management</span>
                </button>
                <button
                  onClick={() => setActiveTab("partners")}
                  className={`w-full flex items-center gap-2.5 pl-9 pr-3 py-2 rounded-md transition-colors text-sm ${activeTab === "partners"
                    ? "bg-[#00d4ff]/10 text-[#00d4ff]"
                    : "hover:bg-white/5 text-white"
                    }`}
                >
                  <Handshake className="w-4 h-4" />
                  <span className="font-medium">Partners</span>
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
                  {activeTab === "contact" ? "Contact Us Dashboard" : activeTab === "referrals" ? "Talent Referrals Dashboard" : activeTab === "jobs" ? "Job Openings Dashboard" : activeTab === "jobpostings" ? "Job Postings Dashboard" : activeTab === "users" ? "User Management Dashboard" : "Partners Dashboard"}
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
                  {activeTab === "contact" ? (
                    <Users className="w-6 h-6 text-[#00d4ff]" />
                  ) : activeTab === "referrals" ? (
                    <FileCheck className="w-6 h-6 text-[#00d4ff]" />
                  ) : activeTab === "jobs" ? (
                    <Briefcase className="w-6 h-6 text-[#00d4ff]" />
                  ) : activeTab === "users" ? (
                    <UserCog className="w-6 h-6 text-[#00d4ff]" />
                  ) : activeTab === "partners" ? (
                    <Handshake className="w-6 h-6 text-[#00d4ff]" />
                  ) : (
                    <Briefcase className="w-6 h-6 text-[#00d4ff]" />
                  )}
                </div>
                <div>
                  <p className="text-gray-500 text-sm">
                    {activeTab === "contact" ? "Total Inquiries" : activeTab === "referrals" ? "Total Referrals" : activeTab === "jobs" ? "Total Applications" : activeTab === "jobpostings" ? "Total Job Posts" : activeTab === "users" ? "Total Users" : "Total Partners"}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {activeTab === "contact" ? contacts.length : activeTab === "referrals" ? referrals.length : activeTab === "jobs" ? jobApplications.length : activeTab === "jobpostings" ? jobPostings.length : activeTab === "users" ? users.length : partners.length}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {activeTab === "users" && (
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedRole("")

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

                      setIsAddUserDialogOpen(true)
                    }}
                    className="gap-2 bg-[#0066ff] hover:bg-[#0052cc]"
                  >
                    <Plus className="w-4 h-4" />
                    Add User
                  </Button>
                )}
                {activeTab === "jobpostings" && (
                  <Button
                    size="sm"
                    onClick={() => {
                      setJobPostingFormData({
                        post_id: "",
                        posting_date: "",
                        position: "",
                        number_of_openings: "",
                        job_type: "",
                        job_description: "",
                        location: "",
                        job_duties: "",
                        education: "",
                        experience: "",
                        posted_by: "",
                        designation: "",
                        status: "Active",
                      })
                      setIsAddJobPostingDialogOpen(true)
                    }}
                    className="gap-2 bg-[#0066ff] hover:bg-[#0052cc]"
                  >
                    <Plus className="w-4 h-4" />
                    Add Job Posting
                  </Button>
                )}
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
                  onClick={activeTab === "contact" ? fetchContacts : activeTab === "referrals" ? fetchReferrals : activeTab === "jobs" ? fetchJobApplications : activeTab === "jobpostings" ? fetchJobPostings : activeTab === "users" ? fetchUsers : fetchPartners}
                  disabled={activeTab === "contact" ? isLoading : activeTab === "referrals" ? referralLoading : activeTab === "jobs" ? jobLoading : activeTab === "jobpostings" ? jobPostingLoading : activeTab === "users" ? usersLoading : partnerLoading}
                  className="gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${(activeTab === "contact" ? isLoading : activeTab === "referrals" ? referralLoading : activeTab === "jobs" ? jobLoading : activeTab === "jobpostings" ? jobPostingLoading : activeTab === "users" ? usersLoading : partnerLoading) ? "animate-spin" : ""}`} />
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
                        <TableHead
                          className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                          onClick={toggleContactDateSort}
                        >
                          <div className="flex items-center gap-1">
                            Date
                            {contactDateSort === "asc" ? (
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
                      {sortedContacts.map((contact) => (
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
                <div className="w-full overflow-x-auto scrollbar-thin">
                  <Table className="min-w-max">
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
                        <TableHead className="font-semibold text-gray-700">Resume</TableHead>
                        <TableHead
                          className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                          onClick={toggleReferralDateSort}
                        >
                          <div className="flex items-center gap-1">
                            Date
                            {referralDateSort === "asc" ? (
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
                      {sortedReferrals.map((referral) => (
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
                          <TableCell>
                            {referral.resume_url ? (
                              <div className="flex items-center gap-2">

                                <a
                                  href={referral.resume_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#0066ff] hover:underline text-sm font-medium"
                                >
                                  {getFileName(referral.resume_url)}
                                </a>

                                <Download
                                  className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                                  onClick={() => handleDownload(referral.resume_url!)}
                                />

                              </div>
                            ) : (
                              <span className="text-gray-400 text-sm">Not uploaded</span>
                            )}
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

          {/* Job Applications Table Card */}
          {activeTab === "jobs" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Job Application Submissions</h2>
                <p className="text-sm text-gray-500 mt-1">
                  View and manage all job application submissions
                </p>
              </div>

              {jobLoading ? (
                <div className="p-12 text-center">
                  <Loader2 className="w-8 h-8 text-[#00d4ff] animate-spin mx-auto" />
                  <p className="text-gray-500 mt-2">Loading applications...</p>
                </div>
              ) : jobApplications.length === 0 ? (
                <div className="p-12 text-center">
                  <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No job applications yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="w-12">
                          <Checkbox
                            checked={jobApplications.length > 0 && selectedIds.length === jobApplications.length}
                            onCheckedChange={handleSelectAll}
                            aria-label="Select all"
                            className={selectedIds.length > 0 && selectedIds.length < jobApplications.length ? "data-[state=checked]:bg-[#00d4ff]/50" : ""}
                          />
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700">Applicant Name</TableHead>
                        <TableHead className="font-semibold text-gray-700">Email</TableHead>
                        <TableHead className="font-semibold text-gray-700">Phone</TableHead>
                        <TableHead className="font-semibold text-gray-700">Post ID</TableHead>
                        <TableHead className="font-semibold text-gray-700 max-w-[200px]">Cover Letter</TableHead>
                        <TableHead className="font-semibold text-gray-700">Resume</TableHead>
                        <TableHead
                          className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                          onClick={toggleJobDateSort}
                        >
                          <div className="flex items-center gap-1">
                            Date
                            {jobDateSort === "asc" ? (
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
                      {sortedJobApplications.map((application) => (
                        <TableRow
                          key={application.id}
                          className={`hover:bg-gray-50 transition-colors ${selectedIds.includes(application.id) ? "bg-blue-50" : ""
                            }`}
                        >
                          <TableCell>
                            <Checkbox
                              checked={selectedIds.includes(application.id)}
                              onCheckedChange={() => handleSelectOne(application.id)}
                              aria-label={`Select ${application.name}`}
                            />
                          </TableCell>
                          <TableCell className="font-medium text-gray-900">{application.name}</TableCell>
                          <TableCell>
                            <a
                              href={`mailto:${application.email}`}
                              className="text-[#0066ff] hover:underline"
                            >
                              {application.email}
                            </a>
                          </TableCell>
                          <TableCell className="text-gray-700">
                            {application.phone || "-"}
                          </TableCell>
                          <TableCell className="text-gray-700">
                            {application.post_id || "-"}
                          </TableCell>
                          <TableCell
                            className="max-w-[200px] truncate text-gray-500"
                            title={application.cover_letter || ""}
                          >
                            {application.cover_letter || "-"}
                          </TableCell>
                          <TableCell>
                            {application.resume_url ? (
                              <div className="flex items-center gap-2">
                                <a
                                  href={application.resume_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#0066ff] hover:underline text-sm font-medium"
                                >
                                  {getFileName(application.resume_url)}
                                </a>
                                <Download
                                  className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                                  onClick={() => handleDownload(application.resume_url!)}
                                />
                              </div>
                            ) : (
                              <span className="text-gray-400 text-sm">Not uploaded</span>
                            )}
                          </TableCell>
                          <TableCell className="text-gray-500 text-sm whitespace-nowrap">
                            {formatDate(application.created_at)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openViewDialog(application as unknown as ContactUs)}
                                className="h-8 w-8 text-gray-500 hover:text-[#0066ff] hover:bg-blue-50"
                                title="View details"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openDeleteDialog(application as unknown as ContactUs)}
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

          {/* Job Postings Table Card */}
          {activeTab === "jobpostings" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Job Postings</h2>
                <p className="text-sm text-gray-500 mt-1">
                  View and manage all job postings
                </p>
              </div>

              {jobPostingLoading ? (
                <div className="p-12 text-center">
                  <Loader2 className="w-8 h-8 text-[#00d4ff] animate-spin mx-auto" />
                  <p className="text-gray-500 mt-2">Loading job postings...</p>
                </div>
              ) : jobPostings.length === 0 ? (
                <div className="p-12 text-center">
                  <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No job postings found</p>
                </div>
              ) : (
                <div className="w-full overflow-x-auto scrollbar-thin">
                  <Table className="w-max min-w-full">
                    <TableHeader>
                      <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="w-12">
                          <Checkbox
                            checked={jobPostings.length > 0 && selectedIds.length === jobPostings.length}
                            onCheckedChange={handleSelectAll}
                            aria-label="Select all"
                            className={selectedIds.length > 0 && selectedIds.length < jobPostings.length ? "data-[state=checked]:bg-[#00d4ff]/50" : ""}
                          />
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700">Post ID</TableHead>
                        <TableHead className="font-semibold text-gray-700">Position</TableHead>
                        <TableHead className="font-semibold text-gray-700">Job Type</TableHead>
                        <TableHead className="font-semibold text-gray-700">Location</TableHead>
                        <TableHead className="font-semibold text-gray-700">No Of Openings</TableHead>
                        <TableHead className="font-semibold text-gray-700 max-w-[220px]">
                          Job Description
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 max-w-[220px]">
                          Job Duties
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 max-w-[220px]">
                          Education
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 max-w-[220px]">
                          Experience
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700">Posted By</TableHead>
                        <TableHead className="font-semibold text-gray-700">Designation</TableHead>
                        <TableHead className="font-semibold text-gray-700">
                          Status
                        </TableHead>
                        <TableHead
                          className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                          onClick={toggleJobPostingDateSort}
                        >
                          <div className="flex items-center gap-1">
                            Posted Date
                            {jobPostingDateSort === "asc" ? (
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
                      {sortedJobPostings.map((posting) => (
                        <TableRow
                          key={posting.id}
                          className={`hover:bg-gray-50 transition-colors ${selectedIds.includes(posting.id) ? "bg-blue-50" : ""
                            }`}
                        >
                          <TableCell>
                            <Checkbox
                              checked={selectedIds.includes(posting.id)}
                              onCheckedChange={() => handleSelectOne(posting.id)}
                              aria-label={`Select ${posting.post_id}`}
                            />
                          </TableCell>
                          <TableCell className="font-medium text-gray-900">{posting.post_id}</TableCell>
                          <TableCell className="text-gray-700">{posting.position || "-"}</TableCell>
                          <TableCell className="text-gray-700">{posting.job_type || "-"}</TableCell>
                          <TableCell className="text-gray-500">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {posting.location || "-"}
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-700">{posting.number_of_openings || "-"}</TableCell>
                          <TableCell
                            className="max-w-[220px] truncate text-gray-500"
                            title={posting.job_description || ""}
                          >
                            {posting.job_description || "-"}
                          </TableCell>

                          <TableCell
                            className="max-w-[220px] truncate text-gray-500"
                            title={posting.job_duties || ""}
                          >
                            {posting.job_duties || "-"}
                          </TableCell>

                          <TableCell
                            className="max-w-[220px] truncate text-gray-500"
                            title={posting.education || ""}
                          >
                            {posting.education || "-"}
                          </TableCell>

                          <TableCell
                            className="max-w-[220px] truncate text-gray-500"
                            title={posting.experience || ""}
                          >
                            {posting.experience || "-"}
                          </TableCell>
                          <TableCell className="text-gray-700">{posting.posted_by || "-"}</TableCell>
                          <TableCell className="text-gray-700">{posting.designation || "-"}</TableCell>
                          <TableCell>
                            {posting.status ? (
                              <span
                                className={`inline-flex items-center justify-center min-w-[54px] h-6 rounded-md text-xs font-medium ${posting.status.toLowerCase() === "active"
                                  ? "bg-[#0A1628] text-white"
                                  : "bg-[#F1F5F9] text-[#334155]"
                                  }`}
                              >
                                {posting.status}
                              </span>
                            ) : (
                              "-"
                            )}
                          </TableCell>
                          <TableCell className="text-gray-500 text-sm whitespace-nowrap">
                            {posting.posting_date ? formatDate(posting.posting_date) : "-"}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openViewDialog(posting as unknown as ContactUs)}
                                className="h-8 w-8 text-gray-500 hover:text-[#0066ff] hover:bg-blue-50"
                                title="View details"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openDeleteDialog(posting as unknown as ContactUs)}
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

          {/* Users Table Card */}
          {activeTab === "users" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
                <p className="text-sm text-gray-500 mt-1">
                  View and manage all users
                </p>
              </div>

              {usersLoading ? (
                <div className="p-12 text-center">
                  <Loader2 className="w-8 h-8 text-[#00d4ff] animate-spin mx-auto" />
                  <p className="text-gray-500 mt-2">Loading users...</p>
                </div>
              ) : users.length === 0 ? (
                <div className="p-12 text-center">
                  <UserCog className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No users found</p>
                </div>
              ) : (
                <div className="w-full overflow-x-auto scrollbar-thin">
                  <Table className="min-w-max">
                    <TableHeader>
                      <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="w-12">
                          <Checkbox
                            checked={users.length > 0 && selectedIds.length === users.length}
                            onCheckedChange={handleSelectAll}
                            aria-label="Select all"
                            className={selectedIds.length > 0 && selectedIds.length < users.length ? "data-[state=checked]:bg-[#00d4ff]/50" : ""}
                          />
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700">User ID</TableHead>
                        <TableHead className="font-semibold text-gray-700">Username</TableHead>
                        <TableHead className="font-semibold text-gray-700">First Name</TableHead>
                        <TableHead className="font-semibold text-gray-700">Last Name</TableHead>
                        <TableHead className="font-semibold text-gray-700">
                          Job Role
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700">Employee ID</TableHead>
                        <TableHead className="font-semibold text-gray-700">Start Date</TableHead>
                        <TableHead className="font-semibold text-gray-700">End Date</TableHead>
                        <TableHead className="font-semibold text-gray-700">
                          Status
                        </TableHead>
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
                      {sortedUsers.map((user) => (
                        <TableRow
                          key={user.id}
                          className={`hover:bg-gray-50 transition-colors ${selectedIds.includes(user.id) ? "bg-blue-50" : ""
                            }`}
                        >
                          <TableCell>
                            <Checkbox
                              checked={selectedIds.includes(user.id)}
                              onCheckedChange={() => handleSelectOne(user.id)}
                              aria-label={`Select ${user.username}`}
                            />
                          </TableCell>
                          <TableCell className="text-gray-700">{user.user_id}</TableCell>
                          <TableCell className="font-medium text-gray-900">{user.username}</TableCell>
                          <TableCell className="text-gray-700">{user.first_name}</TableCell>
                          <TableCell className="text-gray-700">{user.last_name}</TableCell>
                          <TableCell className="text-gray-700">
                            {user.roles?.length ? user.roles[0] : "-"}
                          </TableCell>
                          <TableCell className="text-gray-700">{user.employee_id}</TableCell>
                          <TableCell className="text-gray-500 text-sm whitespace-nowrap">
                            {user.start_date ? formatDate(user.start_date) : "-"}
                          </TableCell>
                          <TableCell className="text-gray-500 text-sm whitespace-nowrap">
                            {user.end_date ? formatDate(user.end_date) : "-"}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center justify-center min-w-[54px] h-6 rounded-md text-xs font-medium ${getUserStatus(user.end_date) === "Active"
                                ? "bg-[#0A1628] text-white"
                                : "bg-[#F1F5F9] text-[#334155]"
                                }`}
                            >
                              {getUserStatus(user.end_date)}
                            </span>
                          </TableCell>
                          <TableCell className="text-gray-500 text-sm whitespace-nowrap">
                            {formatDate(user.created_at)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openViewUserDialog(user)}
                                className="h-8 w-8 text-gray-500 hover:text-[#0066ff] hover:bg-blue-50"
                                title="View details"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditUserDialog(user)}
                                className="h-8 w-8 text-gray-500 hover:text-[#0066ff] hover:bg-blue-50"
                                title="Edit user"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openDeleteDialog(user as unknown as ContactUs)}
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

          {/* Partners Table Card */}
          {activeTab === "partners" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Partner Registrations</h2>
                <p className="text-sm text-gray-500 mt-1">
                  View and manage all partner registration submissions
                </p>
              </div>

              {partnerLoading ? (
                <div className="p-12 text-center">
                  <Loader2 className="w-8 h-8 text-[#00d4ff] animate-spin mx-auto" />
                  <p className="text-gray-500 mt-2">Loading partners...</p>
                </div>
              ) : partners.length === 0 ? (
                <div className="p-12 text-center">
                  <Handshake className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No partners found</p>
                </div>
              ) : (
                <div className="w-full overflow-x-auto scrollbar-thin">
                  <Table className="min-w-max">
                    <TableHeader>
                      <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="w-12">
                          <Checkbox
                            checked={partners.length > 0 && selectedIds.length === partners.length}
                            onCheckedChange={handleSelectAll}
                            aria-label="Select all"
                            className={selectedIds.length > 0 && selectedIds.length < partners.length ? "data-[state=checked]:bg-[#00d4ff]/50" : ""}
                          />
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700">Company Name</TableHead>
                        <TableHead className="font-semibold text-gray-700">Industry</TableHead>
                        <TableHead className="font-semibold text-gray-700">Company Email</TableHead>
                        <TableHead className="font-semibold text-gray-700">Business Email</TableHead>
                        <TableHead className="font-semibold text-gray-700">Contact Person</TableHead>
                        <TableHead className="font-semibold text-gray-700">Designation</TableHead>
                        <TableHead className="font-semibold text-gray-700">Phone Number</TableHead>
                        <TableHead className="font-semibold text-gray-700">Country</TableHead>
                        <TableHead className="font-semibold text-gray-700">Partnership Type</TableHead>
                        <TableHead
                          className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                          onClick={togglePartnerDateSort}
                        >
                          <div className="flex items-center gap-1">
                            Date
                            {partnerDateSort === "asc" ? (
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
                      {sortedPartners.map((partner) => (
                        <TableRow
                          key={partner.id}
                          className={`hover:bg-gray-50 transition-colors ${selectedIds.includes(partner.id) ? "bg-blue-50" : ""
                            }`}
                        >
                          <TableCell>
                            <Checkbox
                              checked={selectedIds.includes(partner.id)}
                              onCheckedChange={() => handleSelectOne(partner.id)}
                              aria-label={`Select ${partner.company_name}`}
                            />
                          </TableCell>
                          <TableCell className="font-medium text-gray-900">{partner.company_name}</TableCell>
                          <TableCell className="text-gray-700">{partner.industry || "-"}</TableCell>
                          <TableCell>
                            <a
                              href={`mailto:${partner.company_email}`}
                              className="text-[#0066ff] hover:underline"
                            >
                              {partner.company_email}
                            </a>
                          </TableCell>
                          <TableCell>
                            <a
                              href={`mailto:${partner.business_email}`}
                              className="text-[#0066ff] hover:underline"
                            >
                              {partner.business_email || "-"}
                            </a>
                          </TableCell>
                          <TableCell className="text-gray-900">{partner.first_name && partner.last_name ? `${partner.first_name} ${partner.last_name}` : "-"}</TableCell>
                          <TableCell className="text-gray-700">{partner.designation || "-"}</TableCell>
                          <TableCell className="text-gray-700">{partner.phone || "-"}</TableCell>
                          <TableCell className="text-gray-500">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {partner.country || "-"}
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-700">{partner.partnership_type || "-"}</TableCell>
                          <TableCell className="text-gray-500 text-sm whitespace-nowrap">
                            {formatDate(partner.created_at)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedPartner(partner)
                                  setIsViewPartnerDialogOpen(true)
                                }}
                                className="h-8 w-8 text-gray-500 hover:text-[#0066ff] hover:bg-blue-50"
                                title="View details"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedPartner(partner)
                                  setPartnerFormData({
                                    company_name: partner.company_name || "",
                                    company_email: partner.company_email || "",
                                    website: partner.website || "",
                                    phone: partner.phone || "",
                                    country: partner.country || "",
                                    company_size: partner.company_size || "",
                                    industry: partner.industry || "",
                                    address: partner.address || "",
                                    city: partner.city || "",
                                    first_name: partner.first_name || "",
                                    last_name: partner.last_name || "",
                                    designation: partner.designation || "",
                                    business_email: partner.business_email || "",
                                    mobile_number: partner.mobile_number || "",
                                    linkedin: partner.linkedin || "",
                                    partnership_type: partner.partnership_type || "",
                                    services_offered: partner.services_offered || "",
                                    years_in_business: partner.years_in_business || "",
                                    number_of_employees: partner.number_of_employees || "",
                                    countries_served: partner.countries_served || "",
                                    major_clients: partner.major_clients || "",
                                    certifications: partner.certifications || "",
                                    partnership_reason: partner.partnership_reason || "",
                                    additional_notes: partner.additional_notes || "",
                                    agree_terms: partner.agree_terms || false,
                                    agree_privacy: partner.agree_privacy || false,
                                    company_profile_url: partner.company_profile_url || "",
                                    company_brochure_url: partner.company_brochure_url || "",
                                  })
                                  setIsEditPartnerDialogOpen(true)
                                }}
                                className="h-8 w-8 text-gray-500 hover:text-[#0066ff] hover:bg-blue-50"
                                title="Edit"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedPartner(partner)
                                  setIsDeleteDialogOpen(true)
                                }}
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

      {/* View Contact/Referral/Job Application Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[720px] p-0 overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center">
                {activeTab === "contact" ? (
                  <User className="w-4 h-4 text-[#00d4ff]" />
                ) : activeTab === "referrals" ? (
                  <FileCheck className="w-4 h-4 text-[#00d4ff]" />
                ) : activeTab === "jobs" ? (
                  <Briefcase className="w-4 h-4 text-[#00d4ff]" />
                ) : (
                  <Briefcase className="w-4 h-4 text-[#00d4ff]" />
                )}
              </div>
              {activeTab === "contact" ? "Contact Details" : activeTab === "referrals" ? "Referral Details" : activeTab === "jobs" ? "Application Details" : "Job Posting Details"}
            </DialogTitle>
            <DialogDescription>
              {activeTab === "contact"
                ? "Full details of the contact submission"
                : activeTab === "referrals"
                  ? "Full details of the talent referral"
                  : activeTab === "jobs"
                    ? "Full details of the job application"
                    : "Full details of the job posting"}
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

              {/* Resume */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Resume</p>
                  {(selectedContact as unknown as TalentReferral).resume_url ? (
                    <div className="flex items-center gap-2 mt-2">

                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="h-8 text-gray-500 hover:text-gray-700"
                        title="Download Resume"
                      >
                        <div className="flex items-center gap-2 mt-2">
                          <a
                            href={(selectedContact as unknown as TalentReferral).resume_url! + "?download=1"}
                            download
                            className="flex items-center gap-1 text-[#0066ff] hover:underline text-sm"
                          >
                            {getFileName((selectedContact as unknown as TalentReferral).resume_url!)}
                            <Download className="w-4 h-4" />
                          </a>
                        </div>
                      </Button>
                    </div>
                  ) : (
                    <p className="text-gray-400 mt-1">Not uploaded</p>
                  )}
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

          {selectedContact && activeTab === "jobs" && (
            <div className="space-y-4 py-4">
              {/* Applicant Name */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Applicant Name</p>
                  <p className="text-gray-900 mt-1">{(selectedContact as unknown as JobApplication).name}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Email</p>
                  <a
                    href={`mailto:${(selectedContact as unknown as JobApplication).email}`}
                    className="text-[#0066ff] hover:underline mt-1 block"
                  >
                    {(selectedContact as unknown as JobApplication).email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Phone</p>
                  <p className="text-gray-900 mt-1">{(selectedContact as unknown as JobApplication).phone || "Not provided"}</p>
                </div>
              </div>

              {/* Post ID */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Briefcase className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Post ID</p>
                  <p className="text-gray-900 mt-1">{(selectedContact as unknown as JobApplication).post_id || "Not specified"}</p>
                </div>
              </div>

              {/* Cover Letter */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <MessageSquare className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Cover Letter</p>
                  <p className="text-gray-900 mt-1 whitespace-pre-wrap break-words">
                    {(selectedContact as unknown as JobApplication).cover_letter || "Not provided"}
                  </p>
                </div>
              </div>

              {/* Resume */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Resume</p>
                  {(selectedContact as unknown as JobApplication).resume_url ? (
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="h-8 text-gray-500 hover:text-gray-700"
                        title="Download Resume"
                      >
                        <div className="flex items-center gap-2 mt-2">
                          <a
                            href={(selectedContact as unknown as JobApplication).resume_url! + "?download=1"}
                            download
                            className="flex items-center gap-1 text-[#0066ff] hover:underline text-sm"
                          >
                            {getFileName((selectedContact as unknown as JobApplication).resume_url!)}
                            <Download className="w-4 h-4" />
                          </a>
                        </div>
                      </Button>
                    </div>
                  ) : (
                    <p className="text-gray-400 mt-1">Not uploaded</p>
                  )}
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

          {selectedContact && activeTab === "jobpostings" && (
            <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
              {/* Post ID */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Post ID</p>
                  <p className="text-gray-900 mt-1">{(selectedContact as unknown as JobOpening).post_id}</p>
                </div>
              </div>



              {/* Job Role */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">POSITION</p>
                  <p className="text-gray-900 mt-1">
                    {(selectedContact as unknown as JobOpening).position || "Not specified"}
                  </p>
                </div>
              </div>

              {/* Job Type */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Briefcase className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Job Type</p>
                  <p className="text-gray-900 mt-1">{(selectedContact as unknown as JobOpening).job_type || "Not specified"}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Location</p>
                  <p className="text-gray-900 mt-1">{(selectedContact as unknown as JobOpening).location || "Not specified"}</p>
                </div>
              </div>

              {/* Number of Openings */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Users className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">No Of Openings</p>
                  <p className="text-gray-900 mt-1">{(selectedContact as unknown as JobOpening).number_of_openings || "Not specified"}</p>
                </div>
              </div>

              {/* Job Description */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <MessageSquare className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Job Description</p>
                  <p className="text-gray-900 mt-1 whitespace-pre-wrap break-words">
                    {(selectedContact as unknown as JobOpening).job_description || "Not provided"}
                  </p>
                </div>
              </div>

              {/* Job Duties */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Job Duties</p>
                  <p className="text-gray-900 mt-1 whitespace-pre-wrap break-words">
                    {(selectedContact as unknown as JobOpening).job_duties || "Not provided"}
                  </p>
                </div>
              </div>

              {/* Education */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Building2 className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Education</p>
                  <p className="text-gray-900 mt-1">{(selectedContact as unknown as JobOpening).education || "Not specified"}</p>
                </div>
              </div>

              {/* Experience */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Briefcase className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Experience</p>
                  <p className="text-gray-900 mt-1">{(selectedContact as unknown as JobOpening).experience || "Not specified"}</p>
                </div>
              </div>

              {/* Posted By */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Posted By</p>
                  <p className="text-gray-900 mt-1">{(selectedContact as unknown as JobOpening).posted_by || "Not specified"}</p>
                </div>
              </div>

              {/* Designation */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Briefcase className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Designation</p>
                  <p className="text-gray-900 mt-1">{(selectedContact as unknown as JobOpening).designation || "Not specified"}</p>
                </div>
              </div>

              {/* Posting Date */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Posting Date</p>
                  <p className="text-gray-900 mt-1">{(selectedContact as unknown as JobOpening).posting_date ? formatDate((selectedContact as unknown as JobOpening).posting_date) : "Not specified"}</p>
                </div>
              </div>

              {/* Created At */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Created At</p>
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
              {activeTab === "contact" ? "Delete Contact" : activeTab === "referrals" ? "Delete Referral" : activeTab === "jobs" ? "Delete Application" : activeTab === "jobpostings" ? "Delete Job Posting" : "Delete User"}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this {activeTab === "contact" ? "contact submission" : activeTab === "referrals" ? "referral" : activeTab === "jobs" ? "job application" : activeTab === "jobpostings" ? "job posting" : "user"} from{" "}
              <span className="font-medium text-gray-900">
                {activeTab === "contact"
                  ? selectedContact?.name
                  : activeTab === "referrals"
                    ? (selectedContact as unknown as TalentReferral)?.your_name
                    : activeTab === "jobs"
                      ? (selectedContact as unknown as JobApplication)?.name
                      : activeTab === "jobpostings"
                        ? (selectedContact as unknown as JobOpening)?.post_id
                        : (selectedContact as unknown as UserManagement)?.username}
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
              {activeTab === "contact" ? "Delete Selected Contacts" : activeTab === "referrals" ? "Delete Selected Referrals" : activeTab === "jobs" ? "Delete Selected Applications" : activeTab === "jobpostings" ? "Delete Selected Job Postings" : "Delete Selected Users"}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900">{selectedIds.length}</span>{" "}
              selected {activeTab === "contact" ? "contact" : activeTab === "referrals" ? "referral" : activeTab === "jobs" ? "application" : activeTab === "jobpostings" ? "job posting" : "user"}{selectedIds.length > 1 ? "s" : ""}?
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
                `Delete ${selectedIds.length} ${activeTab === "contact" ? "Contact" : activeTab === "referrals" ? "Referral" : activeTab === "jobs" ? "Application" : activeTab === "jobpostings" ? "Job Posting" : "User"}${selectedIds.length > 1 ? "s" : ""}`
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center">
                <Plus className="w-4 h-4 text-[#00d4ff]" />
              </div>
              Add New User
            </DialogTitle>
            <DialogDescription>
              Create a new user account. Password will be securely encrypted.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user_id">User ID</Label>
                <Input
                  id="user_id"
                  value={userFormData.user_id}
                  onChange={(e) => setUserFormData({ ...userFormData, user_id: e.target.value })}
                  placeholder="Enter user ID"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={userFormData.username}
                  onChange={(e) => setUserFormData({ ...userFormData, username: e.target.value })}
                  placeholder="Enter username"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  value={userFormData.first_name}
                  onChange={(e) => setUserFormData({ ...userFormData, first_name: e.target.value })}
                  placeholder="Enter first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  value={userFormData.last_name}
                  onChange={(e) => setUserFormData({ ...userFormData, last_name: e.target.value })}
                  placeholder="Enter last name"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="job_role">Job Role</Label>
                <Select value={String(selectedRole)} onValueChange={(value) => setSelectedRole(Number(value) || "")}>
                  <SelectTrigger id="job_role">
                    <SelectValue placeholder="Select a Job Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.role_id} value={String(role.role_id)}>
                        {role.role_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={userFormData.password}
                  onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
                  placeholder="Enter password"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={userFormData.start_date}
                  onChange={(e) => setUserFormData({ ...userFormData, start_date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={userFormData.end_date}
                  onChange={(e) => setUserFormData({ ...userFormData, end_date: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddUserDialogOpen(false)
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
                setSelectedRole("")
              }}
              disabled={isUserSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddUser}
              disabled={isUserSubmitting || !userFormData.user_id || !userFormData.username || !userFormData.password}
              className="bg-[#0066ff] hover:bg-[#0052cc]"
            >
              {isUserSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add User"
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
              Edit User
            </DialogTitle>
            <DialogDescription>
              Update user details. Leave password empty to keep the existing password.
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
                  id="edit_username"
                  value={userFormData.username}
                  onChange={(e) => setUserFormData({ ...userFormData, username: e.target.value })}
                  placeholder="Enter username"
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
                <Label htmlFor="edit_job_role">Job Role</Label>
                <Select value={String(selectedRole)} onValueChange={(value) => setSelectedRole(Number(value) || "")}>
                  <SelectTrigger id="edit_job_role">
                    <SelectValue placeholder="Select a Job Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.role_id} value={String(role.role_id)}>
                        {role.role_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
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
              <div className="space-y-2">
                <Label htmlFor="edit_start_date">Start Date</Label>
                <Input
                  id="edit_start_date"
                  type="date"
                  value={userFormData.start_date}
                  onChange={(e) => setUserFormData({ ...userFormData, start_date: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit_end_date">End Date</Label>
                <Input
                  id="edit_end_date"
                  type="date"
                  value={userFormData.end_date}
                  onChange={(e) => setUserFormData({ ...userFormData, end_date: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditUserDialogOpen(false)
                setSelectedUser(null)
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
                setSelectedRole("")
              }}
              disabled={isUserSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditUser}
              disabled={isUserSubmitting || !userFormData.user_id || !userFormData.username}
              className="bg-[#0066ff] hover:bg-[#0052cc]"
            >
              {isUserSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update User"
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
              Full details of the user
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-4 py-4">
              {/* User ID */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Hash className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">User ID</p>
                  <p className="text-gray-900 mt-1">{selectedUser.user_id}</p>
                </div>
              </div>

              {/* Username */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Username</p>
                  <p className="text-gray-900 mt-1">{selectedUser.username}</p>
                </div>
              </div>

              {/* First Name */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">First Name</p>
                  <p className="text-gray-900 mt-1">{selectedUser.first_name}</p>
                </div>
              </div>

              {/* Last Name */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Last Name</p>
                  <p className="text-gray-900 mt-1">{selectedUser.last_name}</p>
                </div>
              </div>

              {/* Employee ID */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Building2 className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Employee ID</p>
                  <p className="text-gray-900 mt-1">{selectedUser.employee_id}</p>
                </div>
              </div>

              {/* Start Date */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Start Date</p>
                  <p className="text-gray-900 mt-1">{selectedUser.start_date ? formatDate(selectedUser.start_date) : "Not specified"}</p>
                </div>
              </div>

              {/* End Date */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">End Date</p>
                  <p className="text-gray-900 mt-1">{selectedUser.end_date ? formatDate(selectedUser.end_date) : "Not specified"}</p>
                </div>
              </div>

              {/* Created At */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Created At</p>
                  <p className="text-gray-900 mt-1">{formatDate(selectedUser.created_at)}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsViewUserDialogOpen(false)
                setSelectedUser(null)
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Job Posting Dialog */}
      <Dialog open={isAddJobPostingDialogOpen} onOpenChange={setIsAddJobPostingDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center">
                <Plus className="w-4 h-4 text-[#00d4ff]" />
              </div>
              Add New Job Posting
            </DialogTitle>
            <DialogDescription>
              Create a new job posting and publish it to the Careers page.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Left Column */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jp_post_id">Post ID *</Label>
                <Input
                  id="jp_post_id"
                  value={jobPostingFormData.post_id}
                  onChange={(e) => setJobPostingFormData({ ...jobPostingFormData, post_id: e.target.value })}
                  placeholder="Enter post ID"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jp_posting_date">Posting Date *</Label>
                <Input
                  id="jp_posting_date"
                  type="date"
                  value={jobPostingFormData.posting_date}
                  onChange={(e) => setJobPostingFormData({ ...jobPostingFormData, posting_date: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jp_position">Position *</Label>
                <Input
                  id="jp_position"
                  value={jobPostingFormData.position}
                  onChange={(e) => setJobPostingFormData({ ...jobPostingFormData, position: e.target.value })}
                  placeholder="Enter position"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jp_number_of_openings">Number Of Openings *</Label>
                <Input
                  id="jp_number_of_openings"
                  type="number"
                  value={jobPostingFormData.number_of_openings}
                  onChange={(e) => setJobPostingFormData({ ...jobPostingFormData, number_of_openings: e.target.value })}
                  placeholder="Enter number of openings"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jp_location">Location *</Label>
                <Input
                  id="jp_location"
                  value={jobPostingFormData.location}
                  onChange={(e) => setJobPostingFormData({ ...jobPostingFormData, location: e.target.value })}
                  placeholder="Enter location"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jp_job_type">Job Type *</Label>
                <Select value={jobPostingFormData.job_type} onValueChange={(value) => setJobPostingFormData({ ...jobPostingFormData, job_type: value })}>
                  <SelectTrigger id="jp_job_type">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jp_education">Education</Label>
                <textarea
                  id="jp_education"
                  value={jobPostingFormData.education}
                  onChange={(e) => setJobPostingFormData({ ...jobPostingFormData, education: e.target.value })}
                  placeholder="Enter education requirements"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jp_posted_by">Posted By</Label>
                <Input
                  id="jp_posted_by"
                  value={jobPostingFormData.posted_by}
                  onChange={(e) => setJobPostingFormData({ ...jobPostingFormData, posted_by: e.target.value })}
                  placeholder="Enter who posted"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jp_designation">Designation</Label>
                <Input
                  id="jp_designation"
                  value={jobPostingFormData.designation}
                  onChange={(e) => setJobPostingFormData({ ...jobPostingFormData, designation: e.target.value })}
                  placeholder="Enter designation"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jp_status">Status *</Label>
                <Select value={jobPostingFormData.status} onValueChange={(value) => setJobPostingFormData({ ...jobPostingFormData, status: value })}>
                  <SelectTrigger id="jp_status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="jp_experience">Experience</Label>
              <textarea
                id="jp_experience"
                value={jobPostingFormData.experience}
                onChange={(e) => setJobPostingFormData({ ...jobPostingFormData, experience: e.target.value })}
                placeholder="Enter experience requirements"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jp_job_description">Job Description</Label>
              <textarea
                id="jp_job_description"
                value={jobPostingFormData.job_description}
                onChange={(e) => setJobPostingFormData({ ...jobPostingFormData, job_description: e.target.value })}
                placeholder="Enter job description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jp_job_duties">Job Duties</Label>
              <textarea
                id="jp_job_duties"
                value={jobPostingFormData.job_duties}
                onChange={(e) => setJobPostingFormData({ ...jobPostingFormData, job_duties: e.target.value })}
                placeholder="Enter job duties"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddJobPostingDialogOpen(false)
                setJobPostingFormData({
                  post_id: "",
                  posting_date: "",
                  position: "",
                  number_of_openings: "",
                  job_type: "",
                  job_description: "",
                  location: "",
                  job_duties: "",
                  education: "",
                  experience: "",
                  posted_by: "",
                  designation: "",
                  status: "Active",
                })
              }}
              disabled={isJobPostingSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddJobPosting}
              disabled={
                isJobPostingSubmitting ||
                !jobPostingFormData.post_id ||
                !jobPostingFormData.posting_date ||
                !jobPostingFormData.position ||
                !jobPostingFormData.number_of_openings ||
                !jobPostingFormData.job_type ||
                !jobPostingFormData.location ||
                !jobPostingFormData.status
              }
              className="bg-[#0066ff] hover:bg-[#0052cc]"
            >
              {isJobPostingSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Job Posting"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Partner Dialog */}
      <Dialog open={isViewPartnerDialogOpen} onOpenChange={setIsViewPartnerDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Partner Details</DialogTitle>
          </DialogHeader>
          {selectedPartner && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Company Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-500">Company Name:</span> <span className="font-medium">{selectedPartner.company_name}</span></div>
                  <div><span className="text-gray-500">Email:</span> <a href={`mailto:${selectedPartner.company_email}`} className="text-[#0066ff] hover:underline">{selectedPartner.company_email}</a></div>
                  <div><span className="text-gray-500">Website:</span> <span className="font-medium">{selectedPartner.website || "-"}</span></div>
                  <div><span className="text-gray-500">Phone:</span> <span className="font-medium">{selectedPartner.phone || "-"}</span></div>
                  <div><span className="text-gray-500">Country:</span> <span className="font-medium">{selectedPartner.country || "-"}</span></div>
                  <div><span className="text-gray-500">Company Size:</span> <span className="font-medium">{selectedPartner.company_size || "-"}</span></div>
                  <div><span className="text-gray-500">Industry:</span> <span className="font-medium">{selectedPartner.industry || "-"}</span></div>
                  <div><span className="text-gray-500">Address:</span> <span className="font-medium">{selectedPartner.address || "-"}</span></div>
                  <div><span className="text-gray-500">City:</span> <span className="font-medium">{selectedPartner.city || "-"}</span></div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Primary Contact</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-500">First Name:</span> <span className="font-medium">{selectedPartner.first_name || "-"}</span></div>
                  <div><span className="text-gray-500">Last Name:</span> <span className="font-medium">{selectedPartner.last_name || "-"}</span></div>
                  <div><span className="text-gray-500">Designation:</span> <span className="font-medium">{selectedPartner.designation || "-"}</span></div>
                  <div><span className="text-gray-500">Business Email:</span> <a href={`mailto:${selectedPartner.business_email}`} className="text-[#0066ff] hover:underline">{selectedPartner.business_email || "-"}</a></div>
                  <div><span className="text-gray-500">Mobile Number:</span> <span className="font-medium">{selectedPartner.mobile_number || "-"}</span></div>
                  <div><span className="text-gray-500">LinkedIn:</span> <a href={selectedPartner.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="text-[#0066ff] hover:underline">{selectedPartner.linkedin || "-"}</a></div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Business Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-500">Partnership Type:</span> <span className="font-medium">{renderFieldValue(selectedPartner.partnership_type)}</span></div>
                  <div><span className="text-gray-500">Services Offered:</span> <span className="font-medium">{renderFieldValue(selectedPartner.services_offered)}</span></div>
                  <div><span className="text-gray-500">Years in Business:</span> <span className="font-medium">{renderFieldValue(selectedPartner.years_in_business)}</span></div>
                  <div><span className="text-gray-500">Number of Employees:</span> <span className="font-medium">{renderFieldValue(selectedPartner.number_of_employees)}</span></div>
                  <div><span className="text-gray-500">Countries Served:</span> <span className="font-medium">{renderFieldValue(selectedPartner.countries_served)}</span></div>
                  <div><span className="text-gray-500">Major Clients:</span> <span className="font-medium">{renderFieldValue(selectedPartner.major_clients)}</span></div>
                  <div><span className="text-gray-500">Certifications:</span> <span className="font-medium">{renderFieldValue(selectedPartner.certifications)}</span></div>
                  <div><span className="text-gray-500">Partnership Reason:</span> <span className="font-medium">{renderFieldValue(selectedPartner.partnership_reason)}</span></div>
                </div>
              </div>

              {(selectedPartner.additional_notes) && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Additional Notes</h3>
                  <p className="text-sm text-gray-700">{selectedPartner.additional_notes}</p>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Agreement</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-500">Agree Terms:</span> <span className={`font-medium ${selectedPartner.agree_terms ? "text-green-600" : "text-red-600"}`}>{selectedPartner.agree_terms ? "Yes" : "No"}</span></div>
                  <div><span className="text-gray-500">Agree Privacy:</span> <span className={`font-medium ${selectedPartner.agree_privacy ? "text-green-600" : "text-red-600"}`}>{selectedPartner.agree_privacy ? "Yes" : "No"}</span></div>
                </div>
              </div>

              {(selectedPartner.company_profile_url || selectedPartner.company_brochure_url) && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Uploaded Documents</h3>
                  <div className="space-y-2">
                    {selectedPartner.company_profile_url && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700">Company Profile</span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(selectedPartner.company_profile_url!, "_blank")}
                            className="text-[#0066ff] hover:text-[#0066ff]"
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Open File
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownload(selectedPartner.company_profile_url!)}
                            className="text-[#0066ff] hover:text-[#0066ff]"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    )}
                    {selectedPartner.company_brochure_url && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700">Company Brochure</span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(selectedPartner.company_brochure_url!, "_blank")}
                            className="text-[#0066ff] hover:text-[#0066ff]"
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Open File
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownload(selectedPartner.company_brochure_url!)}
                            className="text-[#0066ff] hover:text-[#0066ff]"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Partner Dialog */}
      <Dialog open={isEditPartnerDialogOpen} onOpenChange={setIsEditPartnerDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Partner</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ep_company_name">Company Name</Label>
                <Input
                  id="ep_company_name"
                  value={partnerFormData.company_name}
                  onChange={(e) => setPartnerFormData({ ...partnerFormData, company_name: e.target.value })}
                  placeholder="Enter company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ep_company_email">Company Email</Label>
                <Input
                  id="ep_company_email"
                  type="email"
                  value={partnerFormData.company_email}
                  onChange={(e) => setPartnerFormData({ ...partnerFormData, company_email: e.target.value })}
                  placeholder="Enter company email"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ep_first_name">First Name</Label>
                <Input
                  id="ep_first_name"
                  value={partnerFormData.first_name}
                  onChange={(e) => setPartnerFormData({ ...partnerFormData, first_name: e.target.value })}
                  placeholder="Enter first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ep_last_name">Last Name</Label>
                <Input
                  id="ep_last_name"
                  value={partnerFormData.last_name}
                  onChange={(e) => setPartnerFormData({ ...partnerFormData, last_name: e.target.value })}
                  placeholder="Enter last name"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ep_designation">Designation</Label>
                <Input
                  id="ep_designation"
                  value={partnerFormData.designation}
                  onChange={(e) => setPartnerFormData({ ...partnerFormData, designation: e.target.value })}
                  placeholder="Enter designation"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ep_business_email">Business Email</Label>
                <Input
                  id="ep_business_email"
                  type="email"
                  value={partnerFormData.business_email}
                  onChange={(e) => setPartnerFormData({ ...partnerFormData, business_email: e.target.value })}
                  placeholder="Enter business email"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ep_industry">Industry</Label>
                <Input
                  id="ep_industry"
                  value={partnerFormData.industry}
                  onChange={(e) => setPartnerFormData({ ...partnerFormData, industry: e.target.value })}
                  placeholder="Enter industry"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ep_partnership_type">Partnership Type</Label>
                <Input
                  id="ep_partnership_type"
                  value={partnerFormData.partnership_type}
                  onChange={(e) => setPartnerFormData({ ...partnerFormData, partnership_type: e.target.value })}
                  placeholder="Enter partnership type"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditPartnerDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={() => {
                // TODO: Implement update logic
                setIsEditPartnerDialogOpen(false)
              }}
              className="bg-[#0066ff] hover:bg-[#0052cc]"
            >
              Update Partner
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

