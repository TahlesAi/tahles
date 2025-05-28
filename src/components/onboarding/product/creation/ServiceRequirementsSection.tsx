
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X, Settings } from "lucide-react";

interface ServiceRequirementsSectionProps {
  technicalRequirements: string[];
  includedServices: string[];
  onAddTechnicalRequirement: () => void;
  onUpdateTechnicalRequirement: (index: number, value: string) => void;
  onRemoveTechnicalRequirement: (index: number) => void;
  onAddIncludedService: () => void;
  onUpdateIncludedService: (index: number, value: string) => void;
  onRemoveIncludedService: (index: number) => void;
}

const ServiceRequirementsSection: React.FC<ServiceRequirementsSectionProps> = ({
  technicalRequirements,
  includedServices,
  onAddTechnicalRequirement,
  onUpdateTechnicalRequirement,
  onRemoveTechnicalRequirement,
  onAddIncludedService,
  onUpdateIncludedService,
  onRemoveIncludedService
}) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            דרישות טכניות
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {technicalRequirements.map((req, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={req}
                onChange={(e) => onUpdateTechnicalRequirement(index, e.target.value)}
                placeholder="למשל: חיבור חשמל 220V"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRemoveTechnicalRequirement(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={onAddTechnicalRequirement}
            className="w-full"
          >
            <Plus className="h-4 w-4 ml-2" />
            הוסף דרישה טכנית
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>שירותים כלולים</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {includedServices.map((service, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={service}
                onChange={(e) => onUpdateIncludedService(index, e.target.value)}
                placeholder="למשל: הגעה והתארגנות"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRemoveIncludedService(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={onAddIncludedService}
            className="w-full"
          >
            <Plus className="h-4 w-4 ml-2" />
            הוסף שירות כלול
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default ServiceRequirementsSection;
