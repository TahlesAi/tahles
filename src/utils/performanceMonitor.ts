
import React from 'react';

// מערכת ניטור ביצועים
export interface PerformanceMetric {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  metadata?: Record<string, any>;
}

export class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetric> = new Map();
  private readonly SLOW_THRESHOLD = 100; // מילישניות

  // התחלת מדידה
  start(name: string, metadata?: Record<string, any>): void {
    console.time(name);
    console.count(name);
    
    this.metrics.set(name, {
      name,
      startTime: performance.now(),
      metadata
    });
  }

  // סיום מדידה
  end(name: string): number | null {
    const metric = this.metrics.get(name);
    if (!metric) {
      console.warn(`Performance metric '${name}' was not started`);
      return null;
    }

    console.timeEnd(name);
    
    const endTime = performance.now();
    const duration = endTime - metric.startTime;
    
    metric.endTime = endTime;
    metric.duration = duration;
    
    // התראה על ביצועים איטיים
    if (duration > this.SLOW_THRESHOLD) {
      console.warn(`⚠️ Slow performance detected: ${name} took ${duration.toFixed(2)}ms`);
      this.logSlowPerformance(metric);
    }

    this.metrics.set(name, metric);
    return duration;
  }

  // רישום ביצועים איטיים
  private logSlowPerformance(metric: PerformanceMetric): void {
    const logData = {
      timestamp: new Date().toISOString(),
      metric: metric.name,
      duration: metric.duration,
      metadata: metric.metadata,
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    // שמירה ב-localStorage לניתוח מאוחר
    const existingLogs = JSON.parse(localStorage.getItem('performanceLogs') || '[]');
    existingLogs.push(logData);
    
    // שמירת מקסימום 100 לוגים
    if (existingLogs.length > 100) {
      existingLogs.splice(0, existingLogs.length - 100);
    }
    
    localStorage.setItem('performanceLogs', JSON.stringify(existingLogs));
  }

  // קבלת סטטיסטיקות
  getStats(): {
    totalMetrics: number;
    slowMetrics: number;
    averageDuration: number;
    slowestMetric?: PerformanceMetric;
  } {
    const completedMetrics = Array.from(this.metrics.values())
      .filter(m => m.duration !== undefined);
    
    const slowMetrics = completedMetrics.filter(m => m.duration! > this.SLOW_THRESHOLD);
    const slowestMetric = completedMetrics.reduce((slowest, current) => 
      (current.duration! > (slowest?.duration || 0)) ? current : slowest
    );

    const averageDuration = completedMetrics.length > 0
      ? completedMetrics.reduce((sum, m) => sum + m.duration!, 0) / completedMetrics.length
      : 0;

    return {
      totalMetrics: completedMetrics.length,
      slowMetrics: slowMetrics.length,
      averageDuration,
      slowestMetric
    };
  }

  // ניקוי מטריקות ישנות
  cleanup(): void {
    this.metrics.clear();
  }

  // דוח ביצועים
  generateReport(): string {
    const stats = this.getStats();
    const completedMetrics = Array.from(this.metrics.values())
      .filter(m => m.duration !== undefined)
      .sort((a, b) => b.duration! - a.duration!);

    let report = `📊 Performance Report\n`;
    report += `===================\n`;
    report += `Total Metrics: ${stats.totalMetrics}\n`;
    report += `Slow Metrics (>${this.SLOW_THRESHOLD}ms): ${stats.slowMetrics}\n`;
    report += `Average Duration: ${stats.averageDuration.toFixed(2)}ms\n\n`;

    if (stats.slowestMetric) {
      report += `🐌 Slowest Operation:\n`;
      report += `Name: ${stats.slowestMetric.name}\n`;
      report += `Duration: ${stats.slowestMetric.duration!.toFixed(2)}ms\n\n`;
    }

    if (completedMetrics.length > 0) {
      report += `📈 Top 5 Slowest Operations:\n`;
      completedMetrics.slice(0, 5).forEach((metric, index) => {
        report += `${index + 1}. ${metric.name}: ${metric.duration!.toFixed(2)}ms\n`;
      });
    }

    return report;
  }
}

// מופע גלובלי
export const performanceMonitor = new PerformanceMonitor();

// פונקציות עזר
export const measureAsync = async <T>(
  name: string, 
  fn: () => Promise<T>,
  metadata?: Record<string, any>
): Promise<T> => {
  performanceMonitor.start(name, metadata);
  try {
    const result = await fn();
    return result;
  } finally {
    performanceMonitor.end(name);
  }
};

export const measureSync = <T>(
  name: string, 
  fn: () => T,
  metadata?: Record<string, any>
): T => {
  performanceMonitor.start(name, metadata);
  try {
    const result = fn();
    return result;
  } finally {
    performanceMonitor.end(name);
  }
};

// הוק React לניטור ביצועים
export const usePerformanceMonitor = (componentName: string) => {
  React.useEffect(() => {
    performanceMonitor.start(`Component-${componentName}-Mount`);
    
    return () => {
      performanceMonitor.end(`Component-${componentName}-Mount`);
    };
  }, [componentName]);

  const measure = React.useCallback((name: string, fn: () => void) => {
    measureSync(`${componentName}-${name}`, fn);
  }, [componentName]);

  return { measure };
};
