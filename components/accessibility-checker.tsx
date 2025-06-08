"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, Eye } from "lucide-react"

interface AccessibilityIssue {
  element: string
  issue: string
  severity: "error" | "warning" | "info"
  description: string
  fix: string
}

export function AccessibilityChecker() {
  const [issues, setIssues] = useState<AccessibilityIssue[]>([])
  const [isChecking, setIsChecking] = useState(false)

  const checkAccessibility = () => {
    setIsChecking(true)
    const foundIssues: AccessibilityIssue[] = []

    // Check for dialog accessibility issues
    const dialogs = document.querySelectorAll('[role="dialog"], .dialog')
    dialogs.forEach((dialog, index) => {
      const dialogContent = dialog.querySelector("[data-radix-dialog-content]")

      if (dialogContent) {
        // Check for aria-describedby
        const hasAriaDescribedBy = dialogContent.hasAttribute("aria-describedby")
        const ariaDescribedBy = dialogContent.getAttribute("aria-describedby")

        if (!hasAriaDescribedBy || !ariaDescribedBy) {
          foundIssues.push({
            element: `Dialog ${index + 1}`,
            issue: "Missing aria-describedby",
            severity: "error",
            description: "Dialog content should have aria-describedby attribute for accessibility",
            fix: "Add aria-describedby attribute pointing to a description element",
          })
        } else {
          // Check if the referenced element exists
          const descriptionElement = document.getElementById(ariaDescribedBy)
          if (!descriptionElement) {
            foundIssues.push({
              element: `Dialog ${index + 1}`,
              issue: "Invalid aria-describedby reference",
              severity: "error",
              description: `aria-describedby references "${ariaDescribedBy}" but element doesn't exist`,
              fix: "Create an element with the referenced ID or update the aria-describedby value",
            })
          }
        }

        // Check for proper heading structure
        const headings = dialogContent.querySelectorAll("h1, h2, h3, h4, h5, h6")
        if (headings.length === 0) {
          foundIssues.push({
            element: `Dialog ${index + 1}`,
            issue: "No heading in dialog",
            severity: "warning",
            description: "Dialog should have a heading for better navigation",
            fix: "Add a heading element to describe the dialog content",
          })
        }

        // Check for focus management
        const focusableElements = dialogContent.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (focusableElements.length === 0) {
          foundIssues.push({
            element: `Dialog ${index + 1}`,
            issue: "No focusable elements",
            severity: "warning",
            description: "Dialog should have at least one focusable element",
            fix: "Add focusable elements like buttons or form controls",
          })
        }
      }
    })

    // Check for missing alt text on images
    const images = document.querySelectorAll("img")
    images.forEach((img, index) => {
      const alt = img.getAttribute("alt")
      const src = img.getAttribute("src")

      if (!alt && src && !src.includes("placeholder.svg")) {
        foundIssues.push({
          element: `Image ${index + 1}`,
          issue: "Missing alt text",
          severity: "error",
          description: "Images should have descriptive alt text for screen readers",
          fix: "Add meaningful alt attribute describing the image content",
        })
      }
    })

    // Check for proper form labels
    const inputs = document.querySelectorAll("input, select, textarea")
    inputs.forEach((input, index) => {
      const id = input.getAttribute("id")
      const ariaLabel = input.getAttribute("aria-label")
      const ariaLabelledBy = input.getAttribute("aria-labelledby")

      if (id) {
        const label = document.querySelector(`label[for="${id}"]`)
        if (!label && !ariaLabel && !ariaLabelledBy) {
          foundIssues.push({
            element: `Form input ${index + 1}`,
            issue: "Missing label",
            severity: "error",
            description: "Form inputs should have associated labels",
            fix: "Add a label element with for attribute or aria-label/aria-labelledby",
          })
        }
      }
    })

    // Check for proper button text
    const buttons = document.querySelectorAll("button")
    buttons.forEach((button, index) => {
      const text = button.textContent?.trim()
      const ariaLabel = button.getAttribute("aria-label")

      if (!text && !ariaLabel) {
        foundIssues.push({
          element: `Button ${index + 1}`,
          issue: "Button without accessible text",
          severity: "error",
          description: "Buttons should have visible text or aria-label",
          fix: "Add text content or aria-label attribute",
        })
      }
    })

    // Check for proper heading hierarchy
    const allHeadings = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    let previousLevel = 0
    allHeadings.forEach((heading, index) => {
      const level = Number.parseInt(heading.tagName.charAt(1))
      if (index === 0 && level !== 1) {
        foundIssues.push({
          element: `Heading ${index + 1}`,
          issue: "Page should start with h1",
          severity: "warning",
          description: "The first heading on a page should be h1",
          fix: "Change the first heading to h1 or add an h1 before it",
        })
      } else if (level > previousLevel + 1) {
        foundIssues.push({
          element: `Heading ${index + 1}`,
          issue: "Heading level skip",
          severity: "warning",
          description: `Heading jumps from h${previousLevel} to h${level}`,
          fix: "Use sequential heading levels (h1, h2, h3, etc.)",
        })
      }
      previousLevel = level
    })

    setIssues(foundIssues)
    setIsChecking(false)
  }

  const getIssueStats = () => {
    const errors = issues.filter((issue) => issue.severity === "error").length
    const warnings = issues.filter((issue) => issue.severity === "warning").length
    const infos = issues.filter((issue) => issue.severity === "info").length
    return { errors, warnings, infos, total: issues.length }
  }

  const stats = getIssueStats()

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
            <Eye className="w-4 h-4 text-white" />
          </div>
          Accessibility Checker
        </CardTitle>
        <p className="text-stone-600">Scan the current page for accessibility issues and compliance problems.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            onClick={checkAccessibility}
            disabled={isChecking}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            {isChecking ? "Scanning..." : "Run Accessibility Check"}
          </Button>

          {issues.length > 0 && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-600 font-medium">{stats.errors} Errors</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span className="text-amber-600 font-medium">{stats.warnings} Warnings</span>
              </div>
              {stats.infos > 0 && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-600 font-medium">{stats.infos} Info</span>
                </div>
              )}
            </div>
          )}
        </div>

        {issues.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-stone-800">
              Found {issues.length} accessibility issue{issues.length !== 1 ? "s" : ""}
            </h3>

            {issues.map((issue, index) => (
              <Card
                key={index}
                className={`border-l-4 ${
                  issue.severity === "error"
                    ? "border-l-red-500 bg-red-50"
                    : issue.severity === "warning"
                      ? "border-l-amber-500 bg-amber-50"
                      : "border-l-blue-500 bg-blue-50"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {issue.severity === "error" ? (
                        <XCircle className="w-5 h-5 text-red-600" />
                      ) : issue.severity === "warning" ? (
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-stone-800">{issue.issue}</h4>
                        <Badge
                          variant={
                            issue.severity === "error"
                              ? "destructive"
                              : issue.severity === "warning"
                                ? "secondary"
                                : "default"
                          }
                        >
                          {issue.severity}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {issue.element}
                        </Badge>
                      </div>
                      <p className="text-sm text-stone-600 mb-2">{issue.description}</p>
                      <div className="bg-white p-3 rounded border">
                        <p className="text-sm font-medium text-stone-700 mb-1">How to fix:</p>
                        <p className="text-sm text-stone-600">{issue.fix}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {issues.length === 0 && !isChecking && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-green-800 mb-2">No accessibility issues found!</h3>
              <p className="text-green-700">The current page appears to meet basic accessibility standards.</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}
