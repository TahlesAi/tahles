
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, X, Edit, Save, Tag } from 'lucide-react';
import { hebrewHierarchy } from '@/lib/hebrewHierarchyData';
import { allEnhancedServices } from '@/lib/enhancedConsolidatedData';

interface ConceptTagsManagerProps {
  onUpdateService?: (serviceId: string, conceptTags: string[]) => void;
}

const ConceptTagsManager: React.FC<ConceptTagsManagerProps> = ({ onUpdateService }) => {
  const [services, setServices] = useState(allEnhancedServices);
  const [selectedService, setSelectedService] = useState<string>('');
  const [availableConcepts] = useState(hebrewHierarchy.concepts.map(c => c.name));
  const [editingService, setEditingService] = useState<string | null>(null);
  const [tempConceptTags, setTempConceptTags] = useState<string[]>([]);
  const [newConcept, setNewConcept] = useState('');

  const currentService = services.find(s => s.id === selectedService);

  const handleStartEdit = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      setEditingService(serviceId);
      setTempConceptTags(service.conceptTags || []);
    }
  };

  const handleSaveEdit = () => {
    if (editingService) {
      setServices(prev => prev.map(service => 
        service.id === editingService 
          ? { ...service, conceptTags: [...tempConceptTags] }
          : service
      ));
      
      if (onUpdateService) {
        onUpdateService(editingService, tempConceptTags);
      }
      
      setEditingService(null);
      setTempConceptTags([]);
    }
  };

  const handleCancelEdit = () => {
    setEditingService(null);
    setTempConceptTags([]);
  };

  const toggleConceptTag = (conceptName: string) => {
    setTempConceptTags(prev => 
      prev.includes(conceptName)
        ? prev.filter(tag => tag !== conceptName)
        : [...prev, conceptName]
    );
  };

  const addNewConcept = () => {
    if (newConcept.trim() && !tempConceptTags.includes(newConcept.trim())) {
      setTempConceptTags(prev => [...prev, newConcept.trim()]);
      setNewConcept('');
    }
  };

  const removeConceptTag = (conceptName: string) => {
    setTempConceptTags(prev => prev.filter(tag => tag !== conceptName));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            ניהול תוויות קונספטים למוצרים
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="edit-service" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit-service">עריכת שירות</TabsTrigger>
              <TabsTrigger value="bulk-view">תצוגה כללית</TabsTrigger>
            </TabsList>

            <TabsContent value="edit-service" className="space-y-4">
              {/* בחירת שירות לעריכה */}
              <div className="space-y-2">
                <Label>בחר שירות לעריכה</Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger>
                    <SelectValue placeholder="בחר שירות..." />
                  </SelectTrigger>
                  <SelectContent>
                    {services.slice(0, 50).map(service => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name} - {service.providerId}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* עריכת קונספטים לשירות נבחר */}
              {currentService && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{currentService.name}</CardTitle>
                      {editingService !== currentService.id ? (
                        <Button 
                          onClick={() => handleStartEdit(currentService.id)}
                          size="sm"
                          variant="outline"
                        >
                          <Edit className="h-4 w-4 ml-1" />
                          ערוך
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button onClick={handleSaveEdit} size="sm">
                            <Save className="h-4 w-4 ml-1" />
                            שמור
                          </Button>
                          <Button onClick={handleCancelEdit} size="sm" variant="outline">
                            ביטול
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {editingService === currentService.id ? (
                      <>
                        {/* קונספטים זמינים */}
                        <div>
                          <Label className="text-sm font-medium">קונספטים זמינים:</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                            {availableConcepts.map(concept => (
                              <div key={concept} className="flex items-center space-x-2">
                                <Checkbox
                                  id={concept}
                                  checked={tempConceptTags.includes(concept)}
                                  onCheckedChange={() => toggleConceptTag(concept)}
                                />
                                <Label 
                                  htmlFor={concept}
                                  className="text-sm font-normal cursor-pointer"
                                >
                                  {concept}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* הוספת קונספט חדש */}
                        <div className="space-y-2">
                          <Label>הוסף קונספט חדש:</Label>
                          <div className="flex gap-2">
                            <Input
                              value={newConcept}
                              onChange={(e) => setNewConcept(e.target.value)}
                              placeholder="שם קונספט..."
                              onKeyPress={(e) => e.key === 'Enter' && addNewConcept()}
                            />
                            <Button onClick={addNewConcept} size="sm">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* קונספטים נבחרים */}
                        <div>
                          <Label className="text-sm font-medium">קונספטים נבחרים:</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {tempConceptTags.map(conceptTag => (
                              <Badge key={conceptTag} variant="secondary" className="flex items-center gap-1">
                                {conceptTag}
                                <X 
                                  className="h-3 w-3 cursor-pointer hover:text-red-500" 
                                  onClick={() => removeConceptTag(conceptTag)}
                                />
                              </Badge>
                            ))}
                            {tempConceptTags.length === 0 && (
                              <span className="text-gray-500 text-sm">לא נבחרו קונספטים</span>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      /* תצוגה של קונספטים קיימים */
                      <div>
                        <Label className="text-sm font-medium">קונספטים נוכחיים:</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {currentService.conceptTags && currentService.conceptTags.length > 0 ? (
                            currentService.conceptTags.map(conceptTag => (
                              <Badge key={conceptTag} variant="outline">
                                {conceptTag}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-gray-500 text-sm">לא הוגדרו קונספטים</span>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="bulk-view">
              {/* תצוגה כללית של כל השירותים וקונספטים */}
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  מציג את 20 השירותים הראשונים
                </div>
                {services.slice(0, 20).map(service => (
                  <Card key={service.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="font-medium">{service.name}</h4>
                          <p className="text-sm text-gray-600">{service.description.slice(0, 100)}...</p>
                        </div>
                        <Button 
                          onClick={() => {
                            setSelectedService(service.id);
                            handleStartEdit(service.id);
                          }}
                          size="sm"
                          variant="outline"
                        >
                          ערוך
                        </Button>
                      </div>
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-1">
                          {service.conceptTags && service.conceptTags.length > 0 ? (
                            service.conceptTags.map(conceptTag => (
                              <Badge key={conceptTag} variant="secondary" className="text-xs">
                                {conceptTag}
                              </Badge>
                            ))
                          ) : (
                            <Badge variant="outline" className="text-xs text-gray-500">
                              ללא קונספטים
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptTagsManager;
