
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search, Tag, Plus, X, Save, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExtendedServiceProfile } from '@/types/extendedSchema';

interface ConceptTagManagerProps {
  services: ExtendedServiceProfile[];
  onUpdateService: (serviceId: string, updates: Partial<ExtendedServiceProfile>) => void;
}

const availableConceptTags = [
  'יום הולדת', 'בר מצווה', 'בת מצווה', 'חתונה', 'אירועי חברה',
  'מסיבת רווקים', 'מסיבת רווקות', 'ערב גיבוש', 'מסיבת סיום',
  'יום העצמאות', 'חנוכה', 'פורים', 'ראש השנה', 'יום כיפור',
  'קבלת שבת', 'ברית מילה', 'בריתת', 'אירוע משפחתי', 'כנס עסקי',
  'השקת מוצר', 'מסיבת פרישה', 'יום עובד', 'טקס חילופי מתנות'
];

const ConceptTagManager: React.FC<ConceptTagManagerProps> = ({
  services,
  onUpdateService
}) => {
  const [selectedService, setSelectedService] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterByTag, setFilterByTag] = useState<string>('');
  const [bulkSelectedServices, setBulkSelectedServices] = useState<string[]>([]);
  const [bulkTags, setBulkTags] = useState<string[]>([]);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTagFilter = !filterByTag || 
                            service.conceptTags.includes(filterByTag);
    
    return matchesSearch && matchesTagFilter;
  });

  const selectedServiceData = services.find(s => s.id === selectedService);

  const toggleServiceTag = (serviceId: string, tag: string) => {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;

    const currentTags = service.conceptTags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];

    onUpdateService(serviceId, { conceptTags: newTags });
  };

  const handleBulkTagging = () => {
    bulkSelectedServices.forEach(serviceId => {
      const service = services.find(s => s.id === serviceId);
      if (service) {
        const currentTags = service.conceptTags || [];
        const newTags = Array.from(new Set([...currentTags, ...bulkTags]));
        onUpdateService(serviceId, { conceptTags: newTags });
      }
    });
    
    setBulkSelectedServices([]);
    setBulkTags([]);
  };

  const getTagUsageStats = () => {
    const tagCount: Record<string, number> = {};
    services.forEach(service => {
      service.conceptTags?.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });
    return tagCount;
  };

  const tagStats = getTagUsageStats();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            ניהול תיוג מוצרים
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="single" className="space-y-4">
            <TabsList>
              <TabsTrigger value="single">תיוג בודד</TabsTrigger>
              <TabsTrigger value="bulk">תיוג קבוצתי</TabsTrigger>
              <TabsTrigger value="analytics">ניתוח תגיות</TabsTrigger>
            </TabsList>

            <TabsContent value="single" className="space-y-4">
              {/* חיפוש וסינון */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>חיפוש מוצרים</Label>
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="שם מוצר או תיאור..."
                      className="pr-10"
                    />
                  </div>
                </div>
                
                <div>
                  <Label>סינון לפי תגית</Label>
                  <Select value={filterByTag} onValueChange={setFilterByTag}>
                    <SelectTrigger>
                      <SelectValue placeholder="כל התגיות" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">כל התגיות</SelectItem>
                      {availableConceptTags.map(tag => (
                        <SelectItem key={tag} value={tag}>
                          {tag} ({tagStats[tag] || 0})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>בחר מוצר</Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger>
                      <SelectValue placeholder="בחר מוצר לעריכה" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredServices.map(service => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* עריכת תגיות למוצר נבחר */}
              {selectedServiceData && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{selectedServiceData.name}</CardTitle>
                    <p className="text-sm text-gray-600">{selectedServiceData.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>תגיות נוכחיות</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedServiceData.conceptTags?.map(tag => (
                            <Badge key={tag} variant="default" className="flex items-center gap-1">
                              {tag}
                              <X 
                                className="h-3 w-3 cursor-pointer hover:text-red-200" 
                                onClick={() => toggleServiceTag(selectedServiceData.id, tag)}
                              />
                            </Badge>
                          )) || <span className="text-gray-500">אין תגיות</span>}
                        </div>
                      </div>

                      <div>
                        <Label>תגיות זמינות</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                          {availableConceptTags.map(tag => {
                            const isSelected = selectedServiceData.conceptTags?.includes(tag);
                            return (
                              <div key={tag} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`tag-${tag}`}
                                  checked={isSelected}
                                  onCheckedChange={() => toggleServiceTag(selectedServiceData.id, tag)}
                                />
                                <Label htmlFor={`tag-${tag}`} className="text-sm cursor-pointer flex-1">
                                  {tag}
                                </Label>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="bulk" className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  התיוג הקבוצתי יוסיף תגיות למוצרים הנבחרים מבלי למחוק תגיות קיימות
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <Label>בחר תגיות להוספה</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {availableConceptTags.map(tag => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox
                          id={`bulk-${tag}`}
                          checked={bulkTags.includes(tag)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setBulkTags([...bulkTags, tag]);
                            } else {
                              setBulkTags(bulkTags.filter(t => t !== tag));
                            }
                          }}
                        />
                        <Label htmlFor={`bulk-${tag}`} className="text-sm cursor-pointer flex-1">
                          {tag}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>בחר מוצרים</Label>
                  <div className="max-h-64 overflow-y-auto border rounded p-2 mt-2">
                    {filteredServices.map(service => (
                      <div key={service.id} className="flex items-center space-x-2 py-1">
                        <Checkbox
                          id={`service-${service.id}`}
                          checked={bulkSelectedServices.includes(service.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setBulkSelectedServices([...bulkSelectedServices, service.id]);
                            } else {
                              setBulkSelectedServices(bulkSelectedServices.filter(id => id !== service.id));
                            }
                          }}
                        />
                        <Label htmlFor={`service-${service.id}`} className="text-sm cursor-pointer flex-1">
                          {service.name}
                          <div className="text-xs text-gray-500">
                            תגיות נוכחיות: {service.conceptTags?.join(', ') || 'אין'}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={handleBulkTagging}
                  disabled={bulkTags.length === 0 || bulkSelectedServices.length === 0}
                  className="w-full"
                >
                  <Save className="h-4 w-4 ml-2" />
                  הוסף תגיות ל-{bulkSelectedServices.length} מוצרים
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">סטטיסטיקות תגיות</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(tagStats)
                        .sort(([,a], [,b]) => b - a)
                        .map(([tag, count]) => (
                          <div key={tag} className="flex justify-between items-center">
                            <span className="text-sm">{tag}</span>
                            <Badge variant="outline">{count}</Badge>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">סיכום מערכת</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>סה"כ מוצרים: {services.length}</div>
                      <div>מוצרים עם תגיות: {services.filter(s => s.conceptTags && s.conceptTags.length > 0).length}</div>
                      <div>מוצרים ללא תגיות: {services.filter(s => !s.conceptTags || s.conceptTags.length === 0).length}</div>
                      <div>סה"כ תגיות שונות בשימוש: {Object.keys(tagStats).length}</div>
                      <div>ממוצע תגיות למוצר: {(services.reduce((sum, s) => sum + (s.conceptTags?.length || 0), 0) / services.length).toFixed(1)}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptTagManager;
