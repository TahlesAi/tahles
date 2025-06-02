
import React from "react";
import ServiceRankingCard from "./ServiceRankingCard";

interface RecommendedResultsProps {
  services: any[];
  selectedServices: any[];
  onServiceSelect: (service: any) => void;
  showRanking?: boolean;
}

const RecommendedResults: React.FC<RecommendedResultsProps> = ({
  services,
  selectedServices,
  onServiceSelect,
  showRanking = true
}) => {
  return (
    <div className="space-y-4">
      {services.map((service, index) => (
        <ServiceRankingCard
          key={service.id}
          service={service}
          rank={showRanking ? index + 1 : undefined}
          isSelected={selectedServices.some(s => s.id === service.id)}
          onSelect={() => onServiceSelect(service)}
          canSelect={selectedServices.length < 3 || selectedServices.some(s => s.id === service.id)}
        />
      ))}
    </div>
  );
};

export default RecommendedResults;
