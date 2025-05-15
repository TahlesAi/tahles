
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingState = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Skeleton className="w-32 h-32 rounded-full mb-4" />
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-10 w-full mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Skeleton className="aspect-video rounded-lg mb-4" />
        <div className="flex space-x-2 mb-6">
          <Skeleton className="h-20 w-20" />
          <Skeleton className="h-20 w-20" />
          <Skeleton className="h-20 w-20" />
        </div>
        <Card>
          <CardContent>
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-24 w-full mb-4" />
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoadingState;
