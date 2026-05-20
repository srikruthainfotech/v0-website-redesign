"use client"

import { useState, useRef } from "react"
import { X, Briefcase, MapPin, Calendar, Printer } from "lucide-react"
import type { Job } from "@/lib/job-data"
import { JobApplicationForm } from "./job-application-form"

interface QuickApplyModalProps {
  job: Job
  isOpen: boolean
  onClose: () => void
}

export function QuickApplyModal({ job, isOpen, onClose }: QuickApplyModalProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const printRef = useRef<HTMLDivElement>(null)

  if (!isOpen) return null

  const handleCloseAttempt = () => {
    setShowConfirmDialog(true)
  }

  const handleConfirmClose = () => {
    setShowConfirmDialog(false)
    onClose()
  }

  const handleCancelClose = () => {
    setShowConfirmDialog(false)
  }

  const handlePrint = () => {
    const printContent = printRef.current
    if (!printContent) return

    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    // Parse qualifications into structured data
    const qualData: { [key: string]: string } = {}
    job.qualifications.forEach((qual) => {
      const colonIndex = qual.indexOf(':')
      if (colonIndex > -1) {
        const label = qual.substring(0, colonIndex).trim().toUpperCase()
        const value = qual.substring(colonIndex + 1).trim()
        qualData[label] = value
      }
    })

    const printHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Job Posting Notice - ${job.title}</title>
        <style>
          @page {
            size: A4;
            margin: 20mm 15mm;
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: Arial, sans-serif;
            font-size: 12pt;
            line-height: 1.4;
            color: #000;
          }
          
          .print-page {
            width: 210mm;
            min-height: 257mm;
            padding: 0;
            position: relative;
            page-break-after: always;
            display: flex;
            flex-direction: column;
          }
          
          .print-page:last-child {
            page-break-after: auto;
          }
          
          .page-header {
            text-align: center;
            font-size: 10pt;
            font-weight: bold;
            margin-bottom: 15mm;
            padding-top: 5mm;
          }
          
          .page-content {
            flex: 1;
          }
          
          .page-footer {
            display: flex;
            justify-content: space-between;
            font-size: 9pt;
            padding-top: 10mm;
            border-top: 1px solid #ccc;
            margin-top: auto;
          }
          
          .job-title {
            font-size: 11pt;
            font-weight: bold;
            margin-bottom: 8mm;
          }
          
          .job-meta {
            display: flex;
            gap: 20mm;
            font-size: 10pt;
            margin-bottom: 10mm;
            color: #333;
          }
          
          .notice-title {
            text-align: center;
            font-size: 16pt;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 10mm;
          }
          
          .notice-content {
            border: 1px solid #333;
            padding: 8mm;
          }
          
          .field-row {
            display: table;
            width: 100%;
            margin-bottom: 5mm;
          }
          
          .field-label {
            display: table-cell;
            width: 55mm;
            font-weight: bold;
            text-transform: uppercase;
            vertical-align: top;
            padding-right: 5mm;
          }
          
          .field-value {
            display: table-cell;
            vertical-align: top;
          }
          
          .section-divider {
            border-top: 1px solid #333;
            margin: 8mm 0;
          }
          
          .signature-section {
            margin-top: 8mm;
          }
          
          @media print {
            .print-page {
              width: 100%;
              min-height: auto;
              height: auto;
            }
          }
        </style>
      </head>
      <body>
        <!-- PAGE 1 -->
        <div class="print-page">
          <div class="page-header">
            Immense Brains - IT Consulting and Development Services
          </div>
          
          <div class="page-content">
            <div class="job-title">
              Post ID: ${job.postId}. ${job.title}
            </div>
            
            <div class="job-meta">
              <span>Job Type: ${job.type}</span>
              <span>Location: ${job.location}</span>
              <span>Posted: ${job.postedDate}</span>
            </div>
            
            <div class="notice-title">JOB POSTING NOTICE</div>
            
            <div class="notice-content">
              <div class="field-row">
                <div class="field-label">POSITION:</div>
                <div class="field-value">${qualData['POSITION'] || job.title}</div>
              </div>
              
              <div class="field-row">
                <div class="field-label">NUMBER OF<br>OPENINGS:</div>
                <div class="field-value">${qualData['NUMBER OF OPENINGS'] || '1'}</div>
              </div>
              
              <div class="field-row">
                <div class="field-label">LOCATION:</div>
                <div class="field-value">${qualData['LOCATION'] || job.location}</div>
              </div>
              
              <div class="field-row">
                <div class="field-label">JOB DUTIES:</div>
                <div class="field-value">${qualData['JOB DUTIES'] || job.description}</div>
              </div>
            </div>
          </div>
          
          <div class="page-footer">
            <span>Immense Brains - IT Consulting and Development Services</span>
            <span>Page 1/4</span>
          </div>
        </div>
        
        <!-- PAGE 2 -->
        <div class="print-page">
          <div class="page-header">
            Immense Brains - IT Consulting and Development Services
          </div>
          
          <div class="page-content">
            <div class="notice-content">
              <div class="field-row">
                <div class="field-label">EDUCATION:</div>
                <div class="field-value">${qualData['EDUCATION'] || 'As per job requirements'}</div>
              </div>
              
              <div class="field-row">
                <div class="field-label">EXPERIENCE:</div>
                <div class="field-value">${qualData['EXPERIENCE'] || 'As per job requirements'}</div>
              </div>
              
              <div class="section-divider"></div>
              
              <div class="signature-section">
                <div class="field-row">
                  <div class="field-label">POSTED BY:</div>
                  <div class="field-value">${qualData['POSTED BY'] || 'HR Department'}</div>
                </div>
                
                <div class="field-row">
                  <div class="field-label">DESIGNATION:</div>
                  <div class="field-value">${qualData['DESIGNATION'] || 'Human Resources'}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="page-footer">
            <span>Immense Brains - IT Consulting and Development Services</span>
            <span>Page 2/4</span>
          </div>
        </div>
        
        <!-- PAGE 3 - INTENTIONALLY EMPTY -->
        <div class="print-page">
          <div class="page-header">
            Immense Brains - IT Consulting and Development Services
          </div>
          
          <div class="page-content">
            <!-- Intentionally empty -->
          </div>
          
          <div class="page-footer">
            <span>Immense Brains - IT Consulting and Development Services</span>
            <span>Page 3/4</span>
          </div>
        </div>
        
        <!-- PAGE 4 - INTENTIONALLY EMPTY -->
        <div class="print-page">
          <div class="page-header">
            Immense Brains - IT Consulting and Development Services
          </div>
          
          <div class="page-content">
            <!-- Intentionally empty -->
          </div>
          
          <div class="page-footer">
            <span>Immense Brains - IT Consulting and Development Services</span>
            <span>Page 4/4</span>
          </div>
        </div>
      </body>
      </html>
    `

    printWindow.document.write(printHTML)
    printWindow.document.close()
    
    printWindow.onload = () => {
      printWindow.print()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/50 overflow-y-auto py-10">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={handleCloseAttempt}
      />

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20">
          <div className="fixed inset-0 bg-black/30" onClick={handleCancelClose} />
          <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-sm mx-4 z-[61]">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Confirmation</h4>
            <p className="text-sm text-red-600 mb-6">
              Are you sure you want to close? All the unsaved data will be lost.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleConfirmClose}
                className="px-6 py-2 bg-[#8B4513] hover:bg-[#6b3410] text-white text-sm font-medium rounded-full transition-colors"
              >
                OK
              </button>
              <button
                onClick={handleCancelClose}
                className="px-6 py-2 bg-[#DEB887] hover:bg-[#c9a476] text-gray-800 text-sm font-medium rounded-full transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <div className="relative bg-white w-full max-w-6xl mx-4 rounded-sm shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={handleCloseAttempt}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 z-10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="px-6 py-4" ref={printRef}>
          {/* Job Title */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-gray-900">
              Post ID: {job.postId}. {job.title}
            </h3>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-[#8B4513] hover:bg-[#6b3410] text-white text-sm font-medium rounded-full transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print Job Notice
            </button>
          </div>

          {/* Job Details Row */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Posted {job.postedDate}</span>
            </div>
          </div>

          {/* Job Posting Notice */}
          <div className="mb-6">

            <h3 className="text-2xl font-bold text-center text-black mb-8">
              JOB POSTING NOTICE
            </h3>

            <div className="border border-gray-300 p-6 text-sm text-black space-y-6">

              {job.qualifications.map((qual, index) => {

                const [label, ...valueParts] = qual.split(":")
                const value = valueParts.join(":").trim()

                const formattedLabel =
                  label === "NUMBER OF OPENINGS"
                    ? "NUMBER OF\nOPENINGS:"
                    : `${label}:`

                const isLastMainField =
                  label === "EXPERIENCE"

                const isInlineField =
                  label === "POSTED BY" || label === "DESIGNATION"

                return (
                  <div key={index}>

                    <div
                      className={
                        isInlineField
                          ? "flex items-center gap-2"
                          : "grid grid-cols-[220px_minmax(0,1fr)] items-start"
                      }
                    >

                      {/* LABEL */}
                      <div className="font-bold uppercase whitespace-pre-line leading-6">
                        {formattedLabel}
                      </div>

                      <div
                        className={
                          isInlineField
                            ? "leading-6"
                            : "leading-6 break-words"
                        }
                      >
                        {value}
                      </div>

                    </div>

                    {/* LINE AFTER EXPERIENCE */}
                    {isLastMainField && (
                      <div className="border-t border-gray-300 mt-8"></div>
                    )}

                  </div>
                )
              })}

            </div>

          </div>
          {/* Application Form */}
          <div className="border-t border-gray-200 pt-4">
            <JobApplicationForm postId={job.postId} onClose={onClose} onCloseAttempt={handleCloseAttempt} showCloseButton={true} />
          </div>
        </div>
      </div>
    </div>
  )
}
