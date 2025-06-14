
import { TestSessionManager } from './testSessionManager';
import { comprehensiveSystemMigrator } from '@/lib/systemMigration/comprehensiveSystemMigrator';
import { executeFinalIntegrationTests } from '../finalIntegrationTests';

export class TestRunners {
  constructor(private sessionManager: TestSessionManager) {}

  public async runMigrationTests(): Promise<void> {
    this.sessionManager.log('info', 'migration', 'מתחיל בדיקות מיגרציה...');

    try {
      const migrationReport = comprehensiveSystemMigrator.generateComprehensiveReport();
      
      this.sessionManager.addTestResult({
        name: 'דוח מיגרציה - מוכנות כללית',
        category: 'migration',
        status: migrationReport.readinessScore >= 70 ? 'passed' : 'warning',
        duration: 100,
        details: `ציון מוכנות: ${migrationReport.readinessScore}%`,
        evidence: [`${migrationReport.validationResults.length} בדיקות`],
        recommendations: migrationReport.readinessScore < 70 ? ['שפר רכיבים חסרים'] : []
      });

    } catch (error) {
      this.sessionManager.log('error', 'migration', 'שגיאה בבדיקות מיגרציה', error);
    }
  }

  public async runUITests(): Promise<void> {
    this.sessionManager.log('info', 'ui', 'מתחיל בדיקות ממשק משתמש...');

    const pages = [
      { path: '/', name: 'דף בית' },
      { path: '/search', name: 'דף חיפוש' }
    ];

    for (const page of pages) {
      try {
        const startTime = performance.now();
        const pathExists = window.location.pathname === page.path;
        const loadTime = performance.now() - startTime;
        
        this.sessionManager.addTestResult({
          name: `טעינת עמוד - ${page.name}`,
          category: 'ui',
          status: pathExists ? 'passed' : 'failed',
          duration: loadTime,
          details: pathExists ? 'העמוד נטען בהצלחה' : 'העמוד לא נמצא',
          evidence: [`זמן טעינה: ${loadTime.toFixed(2)}ms`],
          recommendations: !pathExists ? [`בדוק נתיב ${page.path}`] : []
        });

      } catch (error) {
        this.sessionManager.addTestResult({
          name: `טעינת עמוד - ${page.name}`,
          category: 'ui',
          status: 'failed',
          duration: 0,
          details: `שגיאה: ${error}`,
          evidence: [],
          recommendations: [`תקן בעיות בעמוד ${page.path}`]
        });
      }
    }
  }

  public async runIntegrationTests(): Promise<void> {
    this.sessionManager.log('info', 'integration', 'מתחיל בדיקות אינטגרציה...');

    try {
      const integrationResults = await executeFinalIntegrationTests();

      integrationResults.overallResults.forEach((result, index) => {
        this.sessionManager.addTestResult({
          name: `תסריט משתמש ${index + 1}`,
          category: 'integration',
          status: result.overallSuccess ? 'passed' : 'failed',
          duration: result.totalDuration,
          details: result.overallSuccess ? 
            `${result.stepResults.length} שלבים הושלמו` : 
            `נכשל בשלב ${result.failedStep}`,
          evidence: result.stepResults.map(step => `${step.name}: ${step.success ? 'הצלחה' : 'כשל'}`),
          recommendations: !result.overallSuccess ? ['בדוק שלבים שנכשלו'] : []
        });
      });

    } catch (error) {
      this.sessionManager.log('error', 'integration', 'שגיאה בבדיקות אינטגרציה', error);
    }
  }
}
