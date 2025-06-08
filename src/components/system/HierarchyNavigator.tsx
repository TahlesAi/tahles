
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  ChevronDown, 
  ChevronRight, 
  Building, 
  Sparkles, 
  Gift, 
  Ticket, 
  TentTree,
  Search,
  Filter,
  MapPin,
  Users,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Division, SearchFilters } from '@/types/newSystemTypes';

interface HierarchyNavigatorProps {
  divisions: Division[];
  onServiceSelect?: (serviceId: string) => void;
  onSearch?: (filters: SearchFilters) => void;
  userRole?: string;
}

const HierarchyNavigator: React.FC<HierarchyNavigatorProps> = ({
  divisions,
  onServiceSelect,
  onSearch,
  userRole
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const [activeTab, setActiveTab] = useState('browse');

  const getIconComponent = (iconName: string) => {
    const icons = { Building, Sparkles, Gift, Ticket, TentTree };
    return icons[iconName as keyof typeof icons] || Building;
  };

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchFilters);
    }
  };

  const renderDivision = (division: Division) => {
    const IconComponent = getIconComponent(division.icon || 'Building');
    const isExpanded = expandedNodes.has(division.id);
    const hasContent = division.categories && division.categories.length > 0;

    return (
      <div key={division.id} className="border rounded-lg p-4 mb-4">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => hasContent && toggleNode(division.id)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100">
              <IconComponent className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{division.name}</h3>
              <p className="text-sm text-gray-600">{division.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {division.categories?.length || 0} קטגוריות
            </Badge>
            {hasContent && (
              isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />
            )}
          </div>
        </div>

        {isExpanded && division.categories && (
          <div className="mt-4 mr-8">
            {division.categories.map(category => renderCategory(category))}
          </div>
        )}
      </div>
    );
  };

  const renderCategory = (category: any) => {
    const isExpanded = expandedNodes.has(category.id);
    const hasContent = category.subcategories && category.subcategories.length > 0;

    return (
      <div key={category.id} className="border-r-2 border-gray-200 pr-4 mb-3">
        <div 
          className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-50 rounded"
          onClick={() => hasContent && toggleNode(category.id)}
        >
          <div>
            <h4 className="font-medium">{category.name}</h4>
            <p className="text-xs text-gray-500">{category.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" size="sm">
              {category.subcategories?.length || 0} תתי קטגוריות
            </Badge>
            {hasContent && (
              isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
            )}
          </div>
        </div>

        {isExpanded && category.subcategories && (
          <div className="mt-2 mr-4">
            {category.subcategories.map((subcategory: any) => renderSubcategory(subcategory))}
          </div>
        )}
      </div>
    );
  };

  const renderSubcategory = (subcategory: any) => {
    const isExpanded = expandedNodes.has(subcategory.id);
    const hasProviders = subcategory.providers && subcategory.providers.length > 0;

    return (
      <div key={subcategory.id} className="border rounded p-3 mb-2 bg-gray-50">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => hasProviders && toggleNode(subcategory.id)}
        >
          <div>
            <h5 className="font-medium text-sm">{subcategory.name}</h5>
            {subcategory.description && (
              <p className="text-xs text-gray-600">{subcategory.description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" size="sm">
              {subcategory.providers?.length || 0} ספקים
            </Badge>
            {hasProviders && (
              isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
            )}
          </div>
        </div>

        {isExpanded && subcategory.providers && (
          <div className="mt-3 space-y-2">
            {subcategory.providers.map((provider: any) => renderProvider(provider))}
          </div>
        )}
      </div>
    );
  };

  const renderProvider = (provider: any) => {
    const serviceCount = provider.services?.length || 0;
    
    return (
      <div key={provider.id} className="bg-white border rounded p-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h6 className="font-medium text-sm">{provider.name}</h6>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {provider.city}
              </span>
              <span>⭐ {provider.rating}</span>
              <span>({provider.review_count} ביקורות)</span>
            </div>
          </div>
          <Badge variant={provider.is_verified ? "default" : "secondary"} size="sm">
            {provider.is_verified ? "מאומת" : "לא מאומת"}
          </Badge>
        </div>

        {provider.services && provider.services.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-700">שירותים זמינים:</p>
            {provider.services.map((service: any) => renderService(service))}
          </div>
        )}
      </div>
    );
  };

  const renderService = (service: any) => {
    return (
      <div 
        key={service.id} 
        className="bg-blue-50 border border-blue-200 rounded p-2 cursor-pointer hover:bg-blue-100"
        onClick={() => onServiceSelect && onServiceSelect(service.id)}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{service.name}</p>
            <div className="flex items-center gap-3 text-xs text-gray-600">
              {service.base_price && (
                <span className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  ₪{service.base_price}
                </span>
              )}
              {service.duration_minutes && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {service.duration_minutes} דק'
                </span>
              )}
              {service.max_participants && (
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  עד {service.max_participants}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            {service.is_outdoor_event && (
              <Badge variant="outline" size="sm">אירוע חוץ</Badge>
            )}
            <Badge variant={service.is_visible ? "default" : "secondary"} size="sm">
              {service.is_visible ? "זמין" : "לא זמין"}
            </Badge>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full" dir="rtl">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">עיון בהיררכיה</TabsTrigger>
          <TabsTrigger value="search">חיפוש מתקדם</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="mt-4">
          <div className="space-y-4">
            {divisions.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-500">אין חטיבות פעילות להצגה</p>
                </CardContent>
              </Card>
            ) : (
              divisions.map(division => renderDivision(division))
            )}
          </div>
        </TabsContent>

        <TabsContent value="search" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                חיפוש מתקדם
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">מיקום</label>
                  <Input 
                    placeholder="הכנס עיר או אזור"
                    value={searchFilters.location || ''}
                    onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">מספר משתתפים</label>
                  <Input 
                    type="number"
                    placeholder="מספר משתתפים"
                    value={searchFilters.participant_count || ''}
                    onChange={(e) => setSearchFilters({...searchFilters, participant_count: parseInt(e.target.value)})}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">טווח תקציב</label>
                  <select 
                    className="w-full border rounded px-3 py-2"
                    value={searchFilters.budget_range || ''}
                    onChange={(e) => setSearchFilters({...searchFilters, budget_range: e.target.value})}
                  >
                    <option value="">כל התקציבים</option>
                    <option value="עד 1000">עד ₪1,000</option>
                    <option value="1001-3000">₪1,001-3,000</option>
                    <option value="3001-6000">₪3,001-6,000</option>
                    <option value="6001-10000">₪6,001-10,000</option>
                    <option value="10001+">₪10,001+</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox"
                    id="outdoor-event"
                    checked={searchFilters.is_outdoor_event || false}
                    onChange={(e) => setSearchFilters({...searchFilters, is_outdoor_event: e.target.checked})}
                  />
                  <label htmlFor="outdoor-event" className="text-sm">אירועי חוץ בלבד</label>
                </div>
              </div>

              <Button onClick={handleSearch} className="w-full">
                <Search className="h-4 w-4 ml-2" />
                חפש
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HierarchyNavigator;
