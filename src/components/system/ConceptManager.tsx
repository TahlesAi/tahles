
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  Tag,
  Users,
  Calendar,
  Heart,
  Building2
} from 'lucide-react';
import { ExternalConcept, SubConcept } from '@/types/newSystemTypes';

interface ConceptManagerProps {
  concepts: ExternalConcept[];
  userRole?: string;
  onUpdateConcept?: (conceptId: string, updates: Partial<ExternalConcept>) => void;
  onCreateConcept?: (concept: Omit<ExternalConcept, 'id' | 'created_at' | 'updated_at'>) => void;
  onDeleteConcept?: (conceptId: string) => void;
  onCreateSubconcept?: (conceptId: string, subconcept: Omit<SubConcept, 'id' | 'created_at' | 'updated_at'>) => void;
}

const ConceptManager: React.FC<ConceptManagerProps> = ({
  concepts,
  userRole,
  onUpdateConcept,
  onCreateConcept,
  onDeleteConcept,
  onCreateSubconcept
}) => {
  const [editingConcept, setEditingConcept] = useState<string | null>(null);
  const [newConcept, setNewConcept] = useState({
    name: '',
    description: '',
    concept_type: 'אירועי חברה' as const
  });
  const [newSubconcept, setNewSubconcept] = useState('');
  const [addingSubconceptTo, setAddingSubconceptTo] = useState<string | null>(null);

  const canEdit = userRole === 'מנהל-על' || userRole === 'מנהל';

  const getConceptIcon = (type: string) => {
    const icons = {
      'אירועי חברה': Building2,
      'אירועי משפחה': Heart,
      'אירועי חברים': Users,
      'מפגשי ילדים': Tag
    };
    return icons[type as keyof typeof icons] || Building2;
  };

  const getConceptColor = (type: string) => {
    const colors = {
      'אירועי חברה': 'bg-blue-100 text-blue-800',
      'אירועי משפחה': 'bg-pink-100 text-pink-800',
      'אירועי חברים': 'bg-green-100 text-green-800',
      'מפגשי ילדים': 'bg-yellow-100 text-yellow-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleSaveConcept = (conceptId: string, updates: any) => {
    if (onUpdateConcept) {
      onUpdateConcept(conceptId, updates);
    }
    setEditingConcept(null);
  };

  const handleCreateConcept = () => {
    if (onCreateConcept && newConcept.name.trim()) {
      onCreateConcept({
        ...newConcept,
        is_active: true
      });
      setNewConcept({ name: '', description: '', concept_type: 'אירועי חברה' });
    }
  };

  const handleCreateSubconcept = (conceptId: string) => {
    if (onCreateSubconcept && newSubconcept.trim()) {
      onCreateSubconcept(conceptId, {
        concept_id: conceptId,
        name: newSubconcept.trim(),
        is_active: true
      });
      setNewSubconcept('');
      setAddingSubconceptTo(null);
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">ניהול קונספטים</h2>
          <p className="text-gray-600">קונספטים חיצוניים לתיוג מוצרים ושירותים</p>
        </div>
        {canEdit && (
          <Button variant="outline">
            <Plus className="h-4 w-4 ml-2" />
            הוסף קונספט חדש
          </Button>
        )}
      </div>

      {/* הוספת קונספט חדש */}
      {canEdit && (
        <Card>
          <CardHeader>
            <CardTitle>יצירת קונספט חדש</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">שם הקונספט</label>
                <Input 
                  value={newConcept.name}
                  onChange={(e) => setNewConcept({...newConcept, name: e.target.value})}
                  placeholder="הכנס שם קונספט"
                />
              </div>
              <div>
                <label className="text-sm font-medium">סוג האירוע</label>
                <select 
                  className="w-full border rounded px-3 py-2"
                  value={newConcept.concept_type}
                  onChange={(e) => setNewConcept({...newConcept, concept_type: e.target.value as any})}
                >
                  <option value="אירועי חברה">אירועי חברה</option>
                  <option value="אירועי משפחה">אירועי משפחה</option>
                  <option value="אירועי חברים">אירועי חברים</option>
                  <option value="מפגשי ילדים">מפגשי ילדים</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">תיאור</label>
              <Textarea 
                value={newConcept.description}
                onChange={(e) => setNewConcept({...newConcept, description: e.target.value})}
                placeholder="תיאור הקונספט"
                rows={3}
              />
            </div>
            <Button onClick={handleCreateConcept} disabled={!newConcept.name.trim()}>
              <Save className="h-4 w-4 ml-2" />
              צור קונספט
            </Button>
          </CardContent>
        </Card>
      )}

      {/* רשימת קונספטים קיימים */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {concepts.map(concept => {
          const IconComponent = getConceptIcon(concept.concept_type);
          const isEditing = editingConcept === concept.id;

          return (
            <Card key={concept.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getConceptColor(concept.concept_type)}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      {isEditing ? (
                        <Input 
                          defaultValue={concept.name}
                          className="font-semibold"
                        />
                      ) : (
                        <CardTitle className="text-lg">{concept.name}</CardTitle>
                      )}
                      <Badge variant="secondary" size="sm">
                        {concept.concept_type}
                      </Badge>
                    </div>
                  </div>
                  {canEdit && (
                    <div className="flex gap-2">
                      {isEditing ? (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleSaveConcept(concept.id, {})}
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setEditingConcept(null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setEditingConcept(concept.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onDeleteConcept && onDeleteConcept(concept.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea 
                    defaultValue={concept.description || ''}
                    placeholder="תיאור הקונספט"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-600 mb-4">{concept.description}</p>
                )}

                {/* תת-קונספטים */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">תת-קונספטים</h4>
                    {canEdit && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setAddingSubconceptTo(
                          addingSubconceptTo === concept.id ? null : concept.id
                        )}
                      >
                        <Plus className="h-3 w-3 ml-1" />
                        הוסף
                      </Button>
                    )}
                  </div>

                  {addingSubconceptTo === concept.id && (
                    <div className="flex gap-2">
                      <Input 
                        value={newSubconcept}
                        onChange={(e) => setNewSubconcept(e.target.value)}
                        placeholder="שם תת-קונספט"
                        size="sm"
                      />
                      <Button 
                        size="sm"
                        onClick={() => handleCreateSubconcept(concept.id)}
                        disabled={!newSubconcept.trim()}
                      >
                        <Save className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setAddingSubconceptTo(null);
                          setNewSubconcept('');
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {concept.subconcepts?.map(subconcept => (
                      <Badge key={subconcept.id} variant="outline">
                        {subconcept.name}
                      </Badge>
                    )) || (
                      <p className="text-sm text-gray-500">אין תת-קונספטים</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {concepts.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <Tag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">אין קונספטים</h3>
            <p className="text-gray-500 mb-4">התחל ביצירת קונספט ראשון למערכת</p>
            {canEdit && (
              <Button>
                <Plus className="h-4 w-4 ml-2" />
                צור קונספט ראשון
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ConceptManager;
