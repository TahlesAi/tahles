
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TermsAgreementProps {
  accepted: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

const TermsAgreement = ({ accepted, onChange, error }: TermsAgreementProps) => {
  return (
    <div className="flex items-start space-x-3 space-x-reverse mb-6">
      <Checkbox 
        id="terms" 
        checked={accepted}
        onCheckedChange={onChange}
      />
      <div>
        <Label htmlFor="terms" className="mr-2 font-medium">
          אני מסכים/ה לתנאי השימוש של ת'כל'ס
        </Label>
        <p className="text-sm text-gray-500 mr-2 mt-1">
          בלחיצה על כפתור "פרסום" אתם מאשרים שקראתם והסכמתם לתנאי השימוש והפרטיות של האתר
        </p>
        {error && (
          <p className="text-destructive text-sm mt-1">{error}</p>
        )}
      </div>
    </div>
  );
};

export default TermsAgreement;
