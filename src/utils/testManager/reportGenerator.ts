
import { SystemTestReport, TestSession, DetailedFindings, PerformanceMetrics, TestResult } from './testTypes';

export class ReportGenerator {
  public generateSystemReport(session: TestSession | null): SystemTestReport {
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
    
    const memoryUsage = (() => {
      try {
        const perf = performance as any;
        return perf.memory ? perf.memory.usedJSHeapSize / 1024 / 1024 : 0;
      } catch {
        return 0;
      }
    })();
    
    return {
      pageLoadTime: this.calculateAverageResponseTime(tests.filter(t => t.category === 'ui')),
      componentRenderTime: this.calculateAverageResponseTime(tests.filter(t => t.name.includes('רכיב'))),
      apiResponseTime: this.calculateAverageResponseTime(tests.filter(t => t.category === 'integration')),
      memoryUsage,
      errorRate: tests.length > 0 ? Math.round((failedTests / tests.length) * 100) : 0
    };
  }

  public exportReport(report: SystemTestReport, format: 'json' | 'html' = 'json'): void {
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `system-test-report-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
    }
  }
}
