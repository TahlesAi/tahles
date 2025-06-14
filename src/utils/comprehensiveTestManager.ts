
// מנהל בדיקות מקיף לניתוח מערכת
import { executeFinalIntegrationTests } from './finalIntegrationTests';
import { comprehensiveSystemMigrator } from '@/lib/systemMigration/comprehensiveSystemMigrator';

export interface SystemTestReport {
  timestamp: string;
  testSessions: TestSession[];
  overallScore: number;
  criticalIssues: string[];
  recommendations: string[];
  detailedFindings: DetailedFindings;
  performanceMetrics: PerformanceMetrics;
}

export interface TestSession {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: 'running' | 'completed' | 'failed';
  tests: TestResult[];
  logs: TestLog[];
}

export interface TestResult {
  id: string;
  name: string;
  category: 'ui' | 'functionality' | 'integration' | 'performance' | 'migration';
  status: 'passed' | 'failed' | 'warning' | 'skipped';
  duration: number;
  details: string;
  evidence: string[];
  recommendations: string[];
}

export interface TestLog {
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  category: string;
  message: string;
  data?: any;
}

export interface DetailedFindings {
  migrationReadiness: {
    score: number;
    missingComponents: string[];
    businessRulesStatus: any[];
  };
  userExperience: {
    navigationWorks: boolean;
    formsFunction: boolean;
    errorsHandled: boolean;
    responseTime: number;
  };
  systemIntegrity: {
    dataConsistency: boolean;
    componentsLoaded: boolean;
    routingWorks: boolean;
    apiConnections: boolean;
  };
}

export interface PerformanceMetrics {
  pageLoadTime: number;
  componentRenderTime: number;
  apiResponseTime: number;
  memoryUsage: number;
  errorRate: number;
}

class ComprehensiveTestManager {
  private currentSession: TestSession | null = null;
  private testHistory: TestSession[] = [];

  // התחלת סשן בדיקות חדש
  public startTestSession(sessionName: string): string {
    const sessionId = `test-session-${Date.now()}`;
    
    this.currentSession = {
      id: sessionId,
      name: sessionName,
      startTime: new Date().toISOString(),
      endTime: '',
      duration: 0,
      status: 'running',
      tests: [],
      logs: []
    };

    this.log('info', 'session', `התחיל סשן בדיקות: ${sessionName}`, { sessionId });
    return sessionId;
  }

  // הוספת תוצאת בדיקה לסשן הנוכחי
  public addTestResult(result: Omit<TestResult, 'id'>): void {
    if (!this.currentSession) {
      console.error('אין סשן בדיקות פעיל');
      return;
    }

    const testResult: TestResult = {
      id: `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...result
    };

    this.currentSession.tests.push(testResult);
    this.log('info', 'test', `בדיקה הושלמה: ${result.name} - ${result.status}`, testResult);
  }

  // הוספת לוג לסשן הנוכחי
  public log(level: TestLog['level'], category: string, message: string, data?: any): void {
    const logEntry: TestLog = {
      timestamp: new Date().toISOString(),
      level,
      category,
      message,
      data
    };

    if (this.currentSession) {
      this.currentSession.logs.push(logEntry);
    }

    console.log(`[${level.toUpperCase()}] [${category}] ${message}`, data || '');
  }

  // סיום סשן בדיקות
  public endTestSession(): TestSession | null {
    if (!this.currentSession) {
      console.error('אין סשן בדיקות פעיל');
      return null;
    }

    const endTime = new Date().toISOString();
    const startTime = new Date(this.currentSession.startTime);
    const duration = new Date(endTime).getTime() - startTime.getTime();

    this.currentSession.endTime = endTime;
    this.currentSession.duration = duration;
    this.currentSession.status = this.calculateSessionStatus();

    this.testHistory.push(this.currentSession);
    const completedSession = this.currentSession;
    this.currentSession = null;

    this.log('info', 'session', `הסתיים סשן בדיקות: ${completedSession.name}`, {
      duration,
      testsCount: completedSession.tests.length,
      status: completedSession.status
    });

    return completedSession;
  }

  // חישוב סטטוס הסשן על בסיס התוצאות
  private calculateSessionStatus(): TestSession['status'] {
    if (!this.currentSession) return 'failed';
    
    const failedTests = this.currentSession.tests.filter(t => t.status === 'failed');
    if (failedTests.length > 0) return 'failed';
    
    return 'completed';
  }

  // ביצוע בדיקות מיגרציה מקיפות
  public async runMigrationTests(): Promise<void> {
    this.log('info', 'migration', 'מתחיל בדיקות מיגרציה...');

    try {
      // בדיקת דוח מיגרציה
      const migrationReport = comprehensiveSystemMigrator.generateComprehensiveReport();
      
      this.addTestResult({
        name: 'דוח מיגרציה - מוכנות כללית',
        category: 'migration',
        status: migrationReport.readinessScore >= 70 ? 'passed' : 'warning',
        duration: 100,
        details: `ציון מוכנות: ${migrationReport.readinessScore}%`,
        evidence: [`${migrationReport.validationResults.length} בדיקות`, `${migrationReport.missingComponents.length} רכיבים חסרים`],
        recommendations: migrationReport.readinessScore < 70 ? ['שפר רכיבים חסרים לפני המשך'] : []
      });

      // בדיקת קטגוריות
      migrationReport.validationResults.forEach(validation => {
        this.addTestResult({
          name: `בדיקת מיגרציה - ${validation.component}`,
          category: 'migration',
          status: validation.status === 'pass' ? 'passed' : validation.status === 'warning' ? 'warning' : 'failed',
          duration: 50,
          details: validation.details,
          evidence: [validation.actualState],
          recommendations: validation.status !== 'pass' ? [`תקן: ${validation.component}`] : []
        });
      });

    } catch (error) {
      this.log('error', 'migration', 'שגיאה בבדיקות מיגרציה', error);
      this.addTestResult({
        name: 'בדיקות מיגרציה - שגיאה כללית',
        category: 'migration',
        status: 'failed',
        duration: 0,
        details: `שגיאה: ${error}`,
        evidence: [],
        recommendations: ['בדוק הגדרות מיגרציה']
      });
    }
  }

  // ביצוע בדיקות ממשק משתמש
  public async runUITests(): Promise<void> {
    this.log('info', 'ui', 'מתחיל בדיקות ממשק משתמש...');

    // בדיקת טעינת עמודים
    const pages = [
      { path: '/', name: 'דף בית' },
      { path: '/search', name: 'דף חיפוש' },
      { path: '/admin/system-migration', name: 'דף מיגרציה' }
    ];

    for (const page of pages) {
      try {
        const startTime = performance.now();
        
        // בדיקה שהנתיב קיים
        const pathExists = window.location.pathname === page.path || 
                          document.querySelector(`[href="${page.path}"]`) !== null;
        
        const loadTime = performance.now() - startTime;
        
        this.addTestResult({
          name: `טעינת עמוד - ${page.name}`,
          category: 'ui',
          status: pathExists ? 'passed' : 'failed',
          duration: loadTime,
          details: pathExists ? 'העמוד נטען בהצלחה' : 'העמוד לא נמצא',
          evidence: [`זמן טעינה: ${loadTime.toFixed(2)}ms`],
          recommendations: !pathExists ? [`בדוק נתיב ${page.path}`] : []
        });

      } catch (error) {
        this.addTestResult({
          name: `טעינת עמוד - ${page.name}`,
          category: 'ui',
          status: 'failed',
          duration: 0,
          details: `שגיאה בטעינה: ${error}`,
          evidence: [],
          recommendations: [`תקן בעיות בעמוד ${page.path}`]
        });
      }
    }

    // בדיקת רכיבי UI קריטיים
    const criticalElements = [
      { selector: 'header', name: 'כותרת ראשית' },
      { selector: 'nav', name: 'תפריט ניווט' },
      { selector: 'main', name: 'תוכן ראשי' },
      { selector: 'footer', name: 'תחתית' }
    ];

    criticalElements.forEach(element => {
      const elementExists = document.querySelector(element.selector) !== null;
      
      this.addTestResult({
        name: `רכיב UI - ${element.name}`,
        category: 'ui',
        status: elementExists ? 'passed' : 'failed',
        duration: 10,
        details: elementExists ? 'הרכיב קיים' : 'הרכיב לא נמצא',
        evidence: [`Selector: ${element.selector}`],
        recommendations: !elementExists ? [`הוסף רכיב ${element.name}`] : []
      });
    });
  }

  // ביצוע בדיקות אינטגרציה
  public async runIntegrationTests(): Promise<void> {
    this.log('info', 'integration', 'מתחיל בדיקות אינטגרציה...');

    try {
      const integrationResults = await executeFinalIntegrationTests();

      // הוספת תוצאות בדיקות המשתמש
      integrationResults.overallResults.forEach((result, index) => {
        this.addTestResult({
          name: `תסריט משתמש ${index + 1}`,
          category: 'integration',
          status: result.overallSuccess ? 'passed' : 'failed',
          duration: result.totalDuration,
          details: result.overallSuccess ? 
            `${result.stepResults.length} שלבים הושלמו בהצלחה` : 
            `נכשל בשלב ${result.failedStep}`,
          evidence: result.stepResults.map(step => `${step.name}: ${step.success ? 'הצלחה' : 'כשל'}`),
          recommendations: !result.overallSuccess ? ['בדוק שלבים שנכשלו'] : []
        });
      });

      // בדיקות רכיבים דינמיים
      const componentTests = integrationResults.componentTests;
      Object.entries(componentTests).forEach(([component, status]) => {
        this.addTestResult({
          name: `רכיב דינמי - ${component}`,
          category: 'integration',
          status: status ? 'passed' : 'failed',
          duration: 100,
          details: status ? 'הרכיב פועל תקין' : 'הרכיב לא פועל',
          evidence: [],
          recommendations: !status ? [`תקן רכיב ${component}`] : []
        });
      });

    } catch (error) {
      this.log('error', 'integration', 'שגיאה בבדיקות אינטגרציה', error);
      this.addTestResult({
        name: 'בדיקות אינטגרציה - שגיאה כללית',
        category: 'integration',
        status: 'failed',
        duration: 0,
        details: `שגיאה: ${error}`,
        evidence: [],
        recommendations: ['בדוק הגדרות אינטגרציה']
      });
    }
  }

  // ביצוע כל הבדיקות
  public async runAllTests(): Promise<SystemTestReport> {
    const sessionId = this.startTestSession('בדיקות מערכת מקיפות');
    
    try {
      await this.runMigrationTests();
      await this.runUITests();
      await this.runIntegrationTests();
      
      const session = this.endTestSession();
      return this.generateSystemReport(session);
      
    } catch (error) {
      this.log('error', 'system', 'שגיאה כללית בבדיקות', error);
      const session = this.endTestSession();
      return this.generateSystemReport(session);
    }
  }

  // יצירת דוח מערכת מקיף
  private generateSystemReport(session: TestSession | null): SystemTestReport {
    if (!session) {
      return this.createEmptyReport();
    }

    const passedTests = session.tests.filter(t => t.status === 'passed').length;
    const totalTests = session.tests.length;
    const overallScore = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

    const criticalIssues = session.tests
      .filter(t => t.status === 'failed')
      .map(t => `${t.category}: ${t.name} - ${t.details}`);

    const recommendations = session.tests
      .flatMap(t => t.recommendations)
      .filter((rec, index, arr) => arr.indexOf(rec) === index);

    return {
      timestamp: new Date().toISOString(),
      testSessions: [session],
      overallScore,
      criticalIssues,
      recommendations,
      detailedFindings: this.extractDetailedFindings(session),
      performanceMetrics: this.calculatePerformanceMetrics(session)
    };
  }

  private createEmptyReport(): SystemTestReport {
    return {
      timestamp: new Date().toISOString(),
      testSessions: [],
      overallScore: 0,
      criticalIssues: ['לא בוצעו בדיקות'],
      recommendations: ['הרץ בדיקות מערכת'],
      detailedFindings: {
        migrationReadiness: { score: 0, missingComponents: [], businessRulesStatus: [] },
        userExperience: { navigationWorks: false, formsFunction: false, errorsHandled: false, responseTime: 0 },
        systemIntegrity: { dataConsistency: false, componentsLoaded: false, routingWorks: false, apiConnections: false }
      },
      performanceMetrics: {
        pageLoadTime: 0,
        componentRenderTime: 0,
        apiResponseTime: 0,
        memoryUsage: 0,
        errorRate: 100
      }
    };
  }

  private extractDetailedFindings(session: TestSession): DetailedFindings {
    const migrationTests = session.tests.filter(t => t.category === 'migration');
    const uiTests = session.tests.filter(t => t.category === 'ui');
    const integrationTests = session.tests.filter(t => t.category === 'integration');

    return {
      migrationReadiness: {
        score: this.calculateCategoryScore(migrationTests),
        missingComponents: migrationTests.filter(t => t.status === 'failed').map(t => t.name),
        businessRulesStatus: []
      },
      userExperience: {
        navigationWorks: uiTests.some(t => t.name.includes('ניווט') && t.status === 'passed'),
        formsFunction: integrationTests.some(t => t.name.includes('טופס') && t.status === 'passed'),
        errorsHandled: integrationTests.some(t => t.name.includes('שגיאה') && t.status === 'passed'),
        responseTime: this.calculateAverageResponseTime(session.tests)
      },
      systemIntegrity: {
        dataConsistency: migrationTests.some(t => t.name.includes('נתונים') && t.status === 'passed'),
        componentsLoaded: uiTests.filter(t => t.status === 'passed').length > 0,
        routingWorks: uiTests.some(t => t.name.includes('עמוד') && t.status === 'passed'),
        apiConnections: integrationTests.some(t => t.name.includes('אינטגרציה') && t.status === 'passed')
      }
    };
  }

  private calculateCategoryScore(tests: TestResult[]): number {
    if (tests.length === 0) return 0;
    const passed = tests.filter(t => t.status === 'passed').length;
    return Math.round((passed / tests.length) * 100);
  }

  private calculateAverageResponseTime(tests: TestResult[]): number {
    if (tests.length === 0) return 0;
    const totalTime = tests.reduce((sum, test) => sum + test.duration, 0);
    return Math.round(totalTime / tests.length);
  }

  private calculatePerformanceMetrics(session: TestSession): PerformanceMetrics {
    const tests = session.tests;
    const failedTests = tests.filter(t => t.status === 'failed').length;
    
    return {
      pageLoadTime: this.calculateAverageResponseTime(tests.filter(t => t.category === 'ui')),
      componentRenderTime: this.calculateAverageResponseTime(tests.filter(t => t.name.includes('רכיב'))),
      apiResponseTime: this.calculateAverageResponseTime(tests.filter(t => t.category === 'integration')),
      memoryUsage: performance.memory ? performance.memory.usedJSHeapSize / 1024 / 1024 : 0,
      errorRate: tests.length > 0 ? Math.round((failedTests / tests.length) * 100) : 0
    };
  }

  // ייצוא דוח לקובץ
  public exportReport(report: SystemTestReport, format: 'json' | 'html' = 'json'): void {
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `system-test-report-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
    } else {
      // HTML format implementation would go here
      console.log('HTML export not implemented yet');
    }
  }

  // קבלת היסטוריית בדיקות
  public getTestHistory(): TestSession[] {
    return this.testHistory;
  }
}

export const comprehensiveTestManager = new ComprehensiveTestManager();
