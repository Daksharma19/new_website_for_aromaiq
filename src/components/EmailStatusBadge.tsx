import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { isEmailConfigured } from "../lib/resend";

/**
 * EmailStatusBadge - Shows current email configuration status
 * 
 * Optional component to display in your app (e.g., footer or admin panel)
 * Helps you quickly see if emails are configured or in demo mode.
 * 
 * Usage:
 * import { EmailStatusBadge } from "./components/EmailStatusBadge";
 * <EmailStatusBadge />
 */

export function EmailStatusBadge() {
  if (isEmailConfigured) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge 
              variant="outline" 
              className="gap-1.5 cursor-help border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20"
            >
              <CheckCircle className="w-3 h-3" />
              Emails Active
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">
              ✅ EmailJS configured<br/>
              Welcome emails will be sent to waitlist users
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant="outline" 
            className="gap-1.5 cursor-help border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20"
          >
            <Info className="w-3 h-3" />
            AROMA IQ
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-sm">
            ⚙️ Emails in demo mode<br/>
            Waitlist works, but emails aren't sent yet.<br/>
            <br/>
            <strong>Enable real emails:</strong><br/>
            See /EMAIL_QUICK_START.md for 5-min setup
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/**
 * DevEmailStatus - Detailed status panel for development
 * Shows more technical details about email configuration
 * 
 * Usage in development/admin panel:
 * import { DevEmailStatus } from "./components/EmailStatusBadge";
 * <DevEmailStatus />
 */
export function DevEmailStatus() {
  return (
    <div className="p-4 rounded-lg border border-border bg-card text-card-foreground">
      <div className="flex items-center gap-2 mb-3">
        {isEmailConfigured ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : (
          <AlertCircle className="w-5 h-5 text-amber-500" />
        )}
        <h3 className="font-semibold">Email System Status</h3>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Status:</span>
          <span className={isEmailConfigured ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}>
            {isEmailConfigured ? "✅ Active" : "⚙️ Demo Mode"}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Provider:</span>
          <span>{isEmailConfigured ? "EmailJS" : "Not configured"}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Emails sent:</span>
          <span>{isEmailConfigured ? "Real emails" : "Console logs only"}</span>
        </div>
        
        {!isEmailConfigured && (
          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">
              Enable real emails in 5 minutes:
            </p>
            <code className="text-xs bg-muted px-2 py-1 rounded block">
              See /EMAIL_QUICK_START.md
            </code>
          </div>
        )}
      </div>
    </div>
  );
}
