
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users,
  Package,
  Settings,
  Target
} from 'lucide-react';

interface GapItem {
  category: string;
  item: string;
  currentState: string;
  requiredState: string;
  priority: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  estimatedDays: number;
}

const GapAnalysis: React.FC = () => {
  const gaps: GapItem[] = [
    {
      category: 'מבנה נתונים',
      item: 'שדות מותאמים אישית לתתי קטגוריות',
      currentState: 'לא קיים',
      requiredState: 'שדות דינמיים לפי תת-קטגוריה',
      priority: 'high',
      effort: 'high',
      impact: 'high',
      estimatedDays: 10
    },
    {
      category: 'מוצרים',
      item: 'מערכת וריאנטים מתקדמת',
      currentState: 'וריאנטים בסיסיים',
      requiredState: 'וריאנטים לפי כמות, מחיר, זמינות, צבע',
      priority: 'medium',
      effort: 'medium',
      impact: 'high',
      estimatedDays: 7
    },
    {
      category: 'עגלת קניות',
      item: 'מערכת השהיות זמניות',
      currentState: 'לא קיים',
      requiredState: '15 דק בודד, 60 דק חבילה',
      priority: 'high',
      effort: 'medium',
      impact: 'medium',
      estimatedDays: 5
    },
    {
      category: 'ספקים',
      item: 'מערכת תזכורות לתוקף מסמכים',
      currentState: 'לא קיים',
      requiredState: 'התרעה שבועיים מראש + הקפאה אוטומטית',
      priority: 'medium',
      effort: 'low',
      impact: 'medium',
      estimatedDays: 3
    },
    {
      category: 'חיפוש',
      item: 'חיפוש חכם לפי קונספטים',
      currentState: 'חיפוש בסיסי',
      requiredState: 'סוג אירוע → קונספט → תתי קונספטים',
      priority: 'high',
      effort: 'medium',
      impact: 'high',
      estimatedDays: 6
    },
    {
      category: 'תמחור',
      item: 'וולידציה נוקשה למחירים',
      currentState: 'חלקי',
      requiredState: 'כל מוצר חייב מחיר ברור - אין חריגים',
      priority: 'high',
      effort: 'low',
      impact: 'high',
      estimatedDays: 2
    },
    {
      category: 'זמינות',
      item: 'יומן משולב עם חישוב נסיעות',
      currentState: 'יומן בסיסי',
      requiredState: 'זמן שירות + הקמה + נסיעות + מרחק',
      priority: 'medium',
      effort: 'high',
      impact: 'medium',
      estimatedDays: 8
    },
    {
      category: 'רכישה',
      item: 'אימות אנטי התאמה אישית',
      currentState: 'לא קיים',
      requiredState: 'מניעת מוצרים בהתאמה אישית בלבד',
      priority: 'high',
      effort: 'low',
      impact: 'high',
      estimatedDays: 2
    },
    {
      category: 'חבילות',
      item: 'מערכת חבילות וקבוצות מוצרים',
      currentState: 'לא קיים',
      requiredState: 'חבילות עם תנאים משותפים ותלויות',
      priority: 'low',
      effort: 'high',
      impact: 'medium',
      estimatedDays: 12
    },
    {
      category: 'הצעות מחיר',
      item: 'PDF עם תוקף מוגבל + השהיית זמינות',
      currentState: 'לא קיים',
      requiredState: 'הצעות PDF + חסימת זמינות זמנית',
      priority: 'medium',
      effort: 'medium',
      impact: 'medium',
      estimatedDays: 5
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'high': return 'bg-purple-100 text-purple-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalEstimatedDays = gaps.reduce((sum, gap) => sum + gap.estimatedDays, 0);
  const highPriorityDays = gaps.filter(g => g.priority === 'high').reduce((sum, gap) => sum + gap.estimatedDays, 0);
  const completionPercentage = Math.round(((gaps.length - gaps.filter(g => g.currentState === 'לא קיים').length) / gaps.length) * 100);

  return (
    <div className="space-y-6" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{gaps.length}</div>
            <div className="text-sm text-gray-600">פערים מזוהים</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{totalEstimatedDays}</div>
            <div className="text-sm text-gray-600">ימי עבודה משוערים</div>
            <div className="text-xs text-red-600">{highPriorityDays} עדיפות גבוהה</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{completionPercentage}%</div>
            <div className="text-sm text-gray-600">הושלם</div>
            <Progress value={completionPercentage} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>סדר עדיפויות מומלץ:</strong> התחל מפערים בעדיפות גבוהה עם מאמץ נמוך לקבלת תוצאות מהירות.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        {gaps
          .sort((a, b) => {
            // מיון לפי עדיפות ואז לפי מאמץ
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            const effortOrder = { low: 3, medium: 2, high: 1 };
            
            if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
              return priorityOrder[b.priority] - priorityOrder[a.priority];
            }
            return effortOrder[b.effort] - effortOrder[a.effort];
          })
          .map((gap, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{gap.item}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{gap.category}</p>
                  </div>
                  <div className="flex gap-1">
                    <Badge className={getPriorityColor(gap.priority)}>
                      {gap.priority === 'high' ? 'דחוף' : gap.priority === 'medium' ? 'בינוני' : 'נמוך'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">מצב נוכחי</div>
                      <div className="text-sm bg-gray-50 p-2 rounded">{gap.currentState}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">מצב נדרש</div>
                      <div className="text-sm bg-blue-50 p-2 rounded">{gap.requiredState}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex gap-2">
                      <Badge className={getEffortColor(gap.effort)} variant="outline">
                        מאמץ {gap.effort === 'high' ? 'גבוה' : gap.effort === 'medium' ? 'בינוני' : 'נמוך'}
                      </Badge>
                      <Badge className={getImpactColor(gap.impact)} variant="outline">
                        השפעה {gap.impact === 'high' ? 'גבוהה' : gap.impact === 'medium' ? 'בינונית' : 'נמוכה'}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      <Clock className="h-4 w-4 inline ml-1" />
                      {gap.estimatedDays} ימי עבודה
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default GapAnalysis;
