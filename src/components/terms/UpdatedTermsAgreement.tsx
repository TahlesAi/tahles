
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProviderAgreement from "./ProviderAgreement";
import CustomerAgreement from "./CustomerAgreement";
import DigitalSignatureForm from "../digital-signature/DigitalSignatureForm";

interface UpdatedTermsAgreementProps {
  type: "customer" | "provider";
  accepted: boolean;
  onChange: (accepted: boolean) => void;
  error?: string;
  requireDigitalSignature?: boolean;
  onDigitalSignatureComplete?: (signatureData: any) => void;
}

const UpdatedTermsAgreement: React.FC<UpdatedTermsAgreementProps> = ({
  type,
  accepted,
  onChange,
  error,
  requireDigitalSignature = false,
  onDigitalSignatureComplete
}) => {
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  
  const AgreementComponent = type === "customer" ? CustomerAgreement : ProviderAgreement;
  const agreementTitle = type === "customer" ? "תקנון לקוח" : "הסכם ספק";

  const handleSignatureComplete = (signatureData: any) => {
    onChange(true);
    setIsSignatureModalOpen(false);
    if (onDigitalSignatureComplete) {
      onDigitalSignatureComplete(signatureData);
    }
  };

  const handleTermsClick = () => {
    if (requireDigitalSignature) {
      setIsSignatureModalOpen(true);
    }
  };

  return (
    <div className="space-y-2 my-4">
      <div className="flex items-start gap-2">
        <Checkbox 
          id="terms-agreement" 
          checked={accepted}
          onCheckedChange={(checked) => !requireDigitalSignature && onChange(!!checked)}
          className="mt-1"
          disabled={requireDigitalSignature}
        />
        <div>
          <Label htmlFor="terms-agreement" className="text-sm">
            אני מאשר/ת שקראתי והסכמתי{" "}
            {requireDigitalSignature ? (
              <span 
                className="text-brand-600 cursor-pointer hover:underline font-medium"
                onClick={handleTermsClick}
              >
                ל{agreementTitle} - לחץ לחתימה דיגיטלית
              </span>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <span className="text-brand-600 cursor-pointer hover:underline">
                    ל{agreementTitle}
                  </span>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-right">{agreementTitle}</DialogTitle>
                  </DialogHeader>
                  <AgreementComponent />
                </DialogContent>
              </Dialog>
            )}
          </Label>
          {error && (
            <p className="text-destructive text-xs mt-1">{error}</p>
          )}
        </div>
      </div>

      {requireDigitalSignature && (
        <Dialog open={isSignatureModalOpen} onOpenChange={setIsSignatureModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-right">חתימה דיגיטלית - {agreementTitle}</DialogTitle>
            </DialogHeader>
            <DigitalSignatureForm
              agreementType={type}
              agreementContent={<AgreementComponent />}
              onSignatureComplete={handleSignatureComplete}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default UpdatedTermsAgreement;
