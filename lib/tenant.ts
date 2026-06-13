import { supabase } from "@/lib/supabase"

export async function getCurrentTenantId() {
  const hostname = window.location.hostname

  const domain =
    hostname.includes("localhost") ||
      hostname.includes("vusercontent.net")
      ? "immensebrains.com"
      : hostname.replace(/^www\./, "")

  const { data, error } = await supabase
    .from("tenants")
    .select("id")
    .eq("domain", domain)
    .single()

  if (error || !data) {
    throw new Error("Tenant not found")
  }

  return data.id
}