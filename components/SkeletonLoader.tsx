"use client";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";

const SkeletonTokenCard = () => {
  return (
    <Card className="bg-gradient-card border-border p-4 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-15 h-15 flex justify-center items-center relative">
            <div className="w-12 h-12 rounded-full bg-gray-700 animate-pulse"></div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-12 bg-gray-700 rounded animate-pulse"></div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-3 w-3 bg-gray-700 rounded-full animate-pulse"></div>
                ))}
              </div>
              <div className="h-3 w-24 bg-gray-700 rounded animate-pulse mt-1"></div>

              <div className="flex gap-1 mt-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 w-8 bg-gray-700 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="text-right">
            <div className="flex items-center gap-1">
              <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-1 justify-end mt-1">
              <div className="h-3 w-12 bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="h-6 w-16 bg-gray-700 rounded animate-pulse mt-2"></div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default function SkeletonLoader() {
  

  return (
      <div className="flex flex-col items-center justify-items-center gap-0">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-2 w-full max-w-4xl gap-0">
            <SkeletonTokenCard />
          </div>
        ))}
      </div>
    );
}