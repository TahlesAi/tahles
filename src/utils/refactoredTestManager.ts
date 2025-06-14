
// מנהל בדיקות מקיף מפוצל
import { TestSessionManager } from './testManager/testSessionManager';
import { TestRunners } from './testManager/testRunners';
import { ReportGenerator } from './testManager/reportGenerator';
import { SystemTestReport } from './testManager/testTypes';

class RefactoredTestManager {
  private sessionManager = new TestSessionManager();
  private testRunners = new TestRunners(this.sessionManager);
  private reportGenerator = new ReportGenerator();

  public async runAllTests(): Promise<SystemTestReport> {
    const sessionId = this.sessionManager.startTestSession('בדיקות מערכת מקיפות');
    
    try {
      await this.testRunners.runMigrationTests();
      await this.testRunners.runUITests();
      await this.testRunners.runIntegrationTests();
      
      const session = this.sessionManager.endTestSession();
      return this.reportGenerator.generateSystemReport(session);
      
    } catch (error) {
      this.sessionManager.log('error', 'system', 'שגיאה כללית בבדיקות', error);
      const session = this.sessionManager.endTestSession();
      return this.reportGenerator.generateSystemReport(session);
    }
  }

  public exportReport(report: SystemTestReport, format: 'json' | 'html' = 'json'): void {
    this.reportGenerator.exportReport(report, format);
  }

  public getTestHistory() {
    return this.sessionManager.getTestHistory();
  }
}

export const refactoredTestManager = new RefactoredTestManager();
