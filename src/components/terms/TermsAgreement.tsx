
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CustomerAgreement from "./CustomerAgreement";
import ProviderAgreement from "./ProviderAgreement";

interface TermsAgreementProps {
  type: "customer" | "provider";
  accepted: boolean;
  onChange: (accepted: boolean) => void;
  error?: string;
}

const TermsAgreement: React.FC<TermsAgreementProps> = ({
  type,
  accepted,
  onChange,
  error,
}) => {
  const TermsComponent = type === "customer" ? CustomerAgreement : ProviderAgreement;
  const termTitle = type === "customer" ? "תקנון לקוח" : "הסכם ספק";

  return (
    <div className="space-y-2 my-4">
      <div className="flex items-start gap-2">
        <Checkbox 
          id="terms-agreement" 
          checked={accepted}
          onCheckedChange={(checked) => onChange(!!checked)}
          className="mt-1"
        />
        <div>
          <Label htmlFor="terms-agreement" className="text-sm">
            אני מאשר/ת שקראתי והסכמתי{" "}
            <Dialog>
              <DialogTrigger asChild>
                <span className="text-brand-600 cursor-pointer hover:underline">
                  ל{termTitle}
                </span>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-right">{termTitle}</DialogTitle>
                </DialogHeader>
                <TermsComponent />
              </DialogContent>
            </Dialog>
          </Label>
          {error && (
            <p className="text-destructive text-xs mt-1">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TermsAgreement;
