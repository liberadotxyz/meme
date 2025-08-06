export interface MultiplierType {
    value: number;
    color: string;
    textColor: string;
    frequency: number;
  }
  
  export interface WheelSegment {
    id: number;
    multiplier: MultiplierType;
    rotation: number;
    segmentWidth: number;
  }
  
  export interface GameState {
    betAmount: string;
    risk: 'Low' | 'Medium' | 'High';
    segments: number;
    isSpinning: boolean;
    result: number | null;
    mode: 'Manual' | 'Auto';
  }
  