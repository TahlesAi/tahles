
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Settings, 
  Play, 
  Download, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Users,
  Sparkles
} from "lucide-react";
import { 
  categoryTemplates, 
  generateProvidersForCategory, 
  generateServicesForProviders 
} from "@/lib/smartProviderGenerator";
import { ProviderProfile, ServiceProfile } from "@/lib/types";
import AutoStyledCard from "../provider/AutoStyledCard";

const ProviderAutoGenerator = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [providerCount, setProviderCount] = useState<number>(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProviders, setGeneratedProviders] = useState<ProviderProfile[]>([]);
  const [generatedServices, setGeneratedServices] = useState<ServiceProfile[]>([]);
  const [progress, setProgress] = useState(0);
  const [generationStatus, setGenerationStatus] = useState<'idle' | 'generating' | 'completed' | 'error'>('idle');

  const handleGenerate = async () => {
    if (!selectedCategory || providerCount < 1) return;

    setIsGenerating(true);
    setGenerationStatus('generating');
    setProgress(0);

    try {
      // סימולציה של תהליך יצירה
      const totalSteps = providerCount * 2; // ספקים + שירותים
      let currentStep = 0;

      // יצירת ספקים
      const providers: ProviderProfile[] = [];
      for (let i = 0; i < providerCount; i++) {
        await new Promise(resolve => setTimeout(resolve, 100)); // סימולציה
        const provider = generateProvidersForCategory(selectedCategory, 1)[0];
        providers.push(provider);
        currentStep++;
        setProgress((currentStep / totalSteps) * 100);
      }

      // יצירת שירותים
      const services: ServiceProfile[] = [];
      for (let i = 0; i < providers.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50)); // סימולציה
        const providerServices = generateServicesForProviders([providers[i]]);
        services.push(...providerServices);
        currentStep++;
        setProgress((currentStep / totalSteps) * 100);
      }

      setGeneratedProviders(providers);
      setGeneratedServices(services);
      setGenerationStatus('completed');
      
    } catch (error) {
      console.error('Error generating providers:', error);
      setGenerationStatus('error');
    } finally {
      setIsGenerating(false);
      setProgress(100);
    }
  };

  const handleExport = () => {
    const data = {
      providers: generatedProviders,
      services: generatedServices,
      metadata: {
        category: selectedCategory,
        generatedAt: new Date().toISOString(),
        count: generatedProviders.length
      }
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `providers-${selectedCategory}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setGeneratedProviders([]);
    setGeneratedServices([]);
    setProgress(0);
    setGenerationStatus('idle');
  };

  const selectedCategoryTemplate = categoryTemplates.find(t => t.id === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6" dir="rtl">
      {/* כותרת */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          מחולל ספקים אוטומטי
        </h1>
        <p className="text-lg text-gray-600">
          יצירה אוטומטית של ספקי שירות עם עיצוב ונתונים מותאמים לכל קטגוריה
        </p>
      </div>

      {/* פאנל שליטה */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            הגדרות יצירה
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* בחירת קטגוריה */}
            <div className="space-y-2">
              <Label htmlFor="category">קטגוריה</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="בחר קטגוריה" />
                </SelectTrigger>
                <SelectContent>
                  {categoryTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* מספר ספקים */}
            <div className="space-y-2">
              <Label htmlFor="count">מספר ספקים</Label>
              <Input
                id="count"
                type="number"
                value={providerCount}
                onChange={(e) => setProviderCount(parseInt(e.target.value) || 1)}
                min="1"
                max="50"
              />
            </div>

            {/* כפתורי פעולה */}
            <div className="space-y-2">
              <Label>פעולות</Label>
              <div className="flex gap-2">
                <Button
                  onClick={handleGenerate}
                  disabled={!selectedCategory || isGenerating}
                  className="flex items-center gap-2"
                >
                  {isGenerating ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                  {isGenerating ? 'יוצר...' : 'צור ספקים'}
                </Button>
                
                {generatedProviders.length > 0 && (
                  <>
                    <Button
                      onClick={handleExport}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      ייצא
                    </Button>
                    <Button
                      onClick={handleReset}
                      variant="ghost"
                      className="flex items-center gap-2"
                    >
                      <RefreshCw className="h-4 w-4" />
                      אפס
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* תצוגת מידע על הקטגוריה הנבחרת */}
          {selectedCategoryTemplate && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">פרטי הקטגוריה: {selectedCategoryTemplate.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">סגנון עיצוב:</span>
                  <Badge variant="outline" className="mr-2">
                    {selectedCategoryTemplate.styling.cardStyle}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">צבע ראשי:</span>
                  <div 
                    className="inline-block w-4 h-4 rounded mr-2 border"
                    style={{ backgroundColor: selectedCategoryTemplate.colors.primary }}
                  />
                  <span className="text-xs text-gray-600">
                    {selectedCategoryTemplate.colors.primary}
                  </span>
                </div>
                <div>
                  <span className="font-medium">מיקומים נפוצים:</span>
                  <span className="text-gray-600">
                    {selectedCategoryTemplate.locationPreferences.slice(0, 3).join(', ')}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* תצוגת התקדמות */}
          {isGenerating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>מתקדם ביצירה...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          {/* סטטוס */}
          {generationStatus !== 'idle' && (
            <div className="flex items-center gap-2">
              {generationStatus === 'generating' && (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
                  <span className="text-blue-600">יוצר ספקים חדשים...</span>
                </>
              )}
              {generationStatus === 'completed' && (
                <>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-green-600">
                    נוצרו בהצלחה {generatedProviders.length} ספקים ו-{generatedServices.length} שירותים!
                  </span>
                </>
              )}
              {generationStatus === 'error' && (
                <>
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-red-600">שגיאה ביצירת הספקים</span>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* תצוגת ספקים שנוצרו */}
      {generatedProviders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              ספקים שנוצרו ({generatedProviders.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedProviders.map((provider) => (
                <AutoStyledCard
                  key={provider.id}
                  provider={provider}
                  showServices={true}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* סיכום סטטיסטיקות */}
      {generatedProviders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              סיכום יצירה
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{generatedProviders.length}</div>
                <div className="text-sm text-blue-600">ספקים נוצרו</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{generatedServices.length}</div>
                <div className="text-sm text-green-600">שירותים נוצרו</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {generatedProviders.filter(p => p.verified).length}
                </div>
                <div className="text-sm text-purple-600">ספקים מאומתים</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {Math.round(generatedProviders.reduce((sum, p) => sum + (p.rating || 0), 0) / generatedProviders.length * 10) / 10}
                </div>
                <div className="text-sm text-orange-600">דירוג ממוצע</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProviderAutoGenerator;
