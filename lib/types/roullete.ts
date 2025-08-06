export enum BetType {
    STRAIGHT_UP = "STRAIGHT_UP",
    SPLIT = "SPLIT",
    STREET = "STREET",
    CORNER = "CORNER",
    LINE = "LINE",
    COLUMN = "COLUMN",
    DOZEN = "DOZEN",
    RED_BLACK = "RED_BLACK",
    ODD_EVEN = "ODD_EVEN",
    HIGH_LOW = "HIGH_LOW"
}

export interface BetOption {
    id: string;
    type: BetType;
    numbers: number[];
    label: string;
    color?: boolean;
    even?: boolean;
    high?: boolean;
}

export interface PlacedBet {
    option: BetOption;
    amount: number;
}

export interface RouletteNumber {
    number: number;
    color: 'red' | 'black' | 'green';
}

export const BET_TYPES: Record<BetType, { name: string; payout: number; description: string }> = {
    [BetType.STRAIGHT_UP]: {
        name: "Straight Up",
        payout: 35,
        description: "Bet on a single number"
    },
    [BetType.SPLIT]: {
        name: "Split Bet",
        payout: 17,
        description: "Bet on two adjacent numbers"
    },
    [BetType.STREET]: {
        name: "Street Bet",
        payout: 11,
        description: "Bet on three numbers in a row"
    },
    [BetType.CORNER]: {
        name: "Corner Bet",
        payout: 8,
        description: "Bet on four numbers that form a square"
    },
    [BetType.LINE]: {
        name: "Line Bet",
        payout: 5,
        description: "Bet on six numbers in two rows"
    },
    [BetType.COLUMN]: {
        name: "Column Bet",
        payout: 2,
        description: "Bet on 12 numbers in a column"
    },
    [BetType.DOZEN]: {
        name: "Dozen Bet",
        payout: 2,
        description: "Bet on 12 numbers (1-12, 13-24, 25-36)"
    },
    [BetType.RED_BLACK]: {
        name: "Red/Black",
        payout: 1,
        description: "Bet on all red or black numbers"
    },
    [BetType.ODD_EVEN]: {
        name: "Odd/Even",
        payout: 1,
        description: "Bet on all odd or even numbers"
    },
    [BetType.HIGH_LOW]: {
        name: "High/Low",
        payout: 1,
        description: "Bet on low (1-18) or high (19-36) numbers"
    }
};

export const ROULETTE_NUMBERS: RouletteNumber[] = [
    { number: 0, color: 'green' },
    { number: 1, color: 'red' },
    { number: 2, color: 'black' },
    { number: 3, color: 'red' },
    { number: 4, color: 'black' },
    { number: 5, color: 'red' },
    { number: 6, color: 'black' },
    { number: 7, color: 'red' },
    { number: 8, color: 'black' },
    { number: 9, color: 'red' },
    { number: 10, color: 'black' },
    { number: 11, color: 'black' },
    { number: 12, color: 'red' },
    { number: 13, color: 'black' },
    { number: 14, color: 'red' },
    { number: 15, color: 'black' },
    { number: 16, color: 'red' },
    { number: 17, color: 'black' },
    { number: 18, color: 'red' },
    { number: 19, color: 'red' },
    { number: 20, color: 'black' },
    { number: 21, color: 'red' },
    { number: 22, color: 'black' },
    { number: 23, color: 'red' },
    { number: 24, color: 'black' },
    { number: 25, color: 'red' },
    { number: 26, color: 'black' },
    { number: 27, color: 'red' },
    { number: 28, color: 'black' },
    { number: 29, color: 'black' },
    { number: 30, color: 'red' },
    { number: 31, color: 'black' },
    { number: 32, color: 'red' },
    { number: 33, color: 'black' },
    { number: 34, color: 'red' },
    { number: 35, color: 'black' },
    { number: 36, color: 'red' },
];