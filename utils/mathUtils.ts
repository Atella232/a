import { Exercise, PyramidCell, WordProblem, NumberLinePoint, TrueFalseQuestion, MemoryCard } from '../types';

// Generate a random integer between min and max (inclusive)
export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper to format number with parens if negative
const fmt = (n: number) => n < 0 ? `(${n})` : `${n}`;

// Generate comparison exercises
export const generateComparison = (): Exercise => {
  const a = randomInt(-20, 20);
  let b = randomInt(-20, 20);
  while (a === b) b = randomInt(-20, 20);
  
  return {
    id: Math.random().toString(),
    question: `Zein da handiagoa? ${a} edo ${b}`,
    correctAnswer: Math.max(a, b),
    options: [a, b],
    type: 'compare'
  };
};

// Generate operation exercises
export const generateOperation = (type: 'add' | 'subtract' | 'multiply' | 'combined'): Exercise => {
  let question = '';
  let answer = 0;

  if (type === 'combined') {
    const subtype = randomInt(1, 3);
    const a = randomInt(-6, 6);
    const b = randomInt(-6, 6);
    const c = randomInt(-5, 5);

    if (subtype === 1) {
        // a + b * c (Priority: Mult first)
        question = `${fmt(a)} + ${fmt(b)} · ${fmt(c)}`;
        answer = a + (b * c);
    } else if (subtype === 2) {
        // (a + b) * c (Priority: Parens first)
        // Make sure a+b is small enough
        question = `(${a} + ${fmt(b)}) · ${fmt(c)}`;
        answer = (a + b) * c;
    } else {
        // a - b - c (Left to right)
        question = `${fmt(a)} - ${fmt(b)} - ${fmt(c)}`;
        answer = a - b - c;
    }

  } else {
    let a = randomInt(-10, 10);
    let b = randomInt(-10, 10);

    if (type === 'add') {
        question = `${a} + (${b})`;
        answer = a + b;
    } else if (type === 'subtract') {
        question = `${a} - (${b})`;
        answer = a - b;
    } else if (type === 'multiply') {
        question = `${a} · (${b})`;
        answer = a * b;
    }
  }

  // Generate plausible wrong options
  const options = new Set<number>([answer]);
  while (options.size < 4) {
    const offset = randomInt(-5, 5);
    if (offset !== 0) options.add(answer + offset);
    options.add(-answer); // Common mistake: wrong sign
    options.add(answer + 10); 
    options.add(answer - 10); 
  }

  return {
    id: Math.random().toString(),
    question,
    correctAnswer: answer,
    options: Array.from(options).sort(() => Math.random() - 0.5).slice(0,4),
    type
  };
};

// Generate Math Pyramid Data (Base size 3)
export const generatePyramid = (): PyramidCell[] => {
  // Base layer (Row 2, indices 0,1,2)
  const c = randomInt(-5, 5);
  const d = randomInt(-5, 5);
  const e = randomInt(-5, 5);

  // Middle layer (Row 1)
  const a = c + d;
  const b = d + e;

  // Top layer (Row 0)
  const top = a + b;

  const cells: PyramidCell[] = [
    { id: 'top', value: top, isInput: Math.random() > 0.5, row: 0, col: 0 },
    { id: 'a', value: a, isInput: Math.random() > 0.5, row: 1, col: 0 },
    { id: 'b', value: b, isInput: Math.random() > 0.5, row: 1, col: 1 },
    { id: 'c', value: c, isInput: Math.random() > 0.5, row: 2, col: 0 },
    { id: 'd', value: d, isInput: Math.random() > 0.5, row: 2, col: 1 },
    { id: 'e', value: e, isInput: Math.random() > 0.5, row: 2, col: 2 },
  ];

  let visibleCount = cells.filter(c => !c.isInput).length;
  while(visibleCount < 3) {
      const idx = randomInt(0, 5);
      if(cells[idx].isInput) {
          cells[idx].isInput = false;
          visibleCount++;
      }
  }

  return cells;
};

// Generate Word Problems (Based on PDF)
export const generateWordProblem = (): WordProblem => {
  const scenarios = [
    {
      type: 'elevator',
      gen: () => {
        const start = randomInt(0, 5);
        const move = randomInt(2, 6);
        // Elevators usually go down to basements in these problems
        const end = start - move;
        return {
          text: `Igogailua ${start}. solairuan dago. ${move} solairu jaitsi ditu. Zein solairutan dago orain?`,
          correctAnswer: end,
          unit: 'solairuan',
          hint: `${start} - ${move} = ? (Gogoratu sotoak negatiboak direla)`
        };
      }
    },
    {
      type: 'temperature',
      gen: () => {
        const start = randomInt(-5, 5);
        const change = randomInt(2, 8);
        const isDrop = Math.random() > 0.5;
        const end = isDrop ? start - change : start + change;
        return {
          text: `Tenperatura ${start}ºC-koa zen. Gero ${change}ºC ${isDrop ? 'jaitsi' : 'igo'} da. Zein da tenperatura berria?`,
          correctAnswer: end,
          unit: 'ºC',
          hint: isDrop ? `${start} - ${change}` : `${start} + ${change}`
        };
      }
    },
    {
      type: 'money',
      gen: () => {
        const balance = randomInt(10, 50);
        const debt = randomInt(15, 60);
        return {
          text: `Poltsikoan ${balance}€ dituzu, baina lagunari ${debt}€ zor dizkiozu. Zenbatekoa da zure saldo erreala?`,
          correctAnswer: balance - debt,
          unit: '€',
          hint: `${balance} - ${debt}`
        };
      }
    },
    {
      type: 'history',
      gen: () => {
        const bornYear = randomInt(10, 100); // Positive number for display
        const age = randomInt(30, 80);
        
        // Math: born is negative (-bornYear)
        const bornVal = -bornYear;
        const diedVal = bornVal + age;

        return {
          text: `Matematikari bat K.a. ${bornYear}. urtean jaio zen eta ${age} urterekin hil zen. Zein urtetan hil zen?`,
          correctAnswer: diedVal,
          unit: 'urtean',
          hint: `-${bornYear} + ${age} (K.a. negatiboa da)`
        };
      }
    },
    {
      type: 'submarine',
      gen: () => {
        const depth = randomInt(10, 50);
        const dive = randomInt(5, 20);
        return {
          text: `Urpekari bat ${depth} metroko sakoneran dago. Gero, beste ${dive} metro jaitsi da. Zein sakoneratan dago orain?`,
          correctAnswer: -(depth + dive),
          unit: 'metrora',
          hint: `-${depth} - ${dive} = ? (Beherantz negatiboa da)`
        };
      }
    },
    {
      type: 'game',
      gen: () => {
        const points = randomInt(5, 20);
        const penalty = randomInt(25, 50);
        return {
          text: `Joko batean ${points} puntu dituzu, baina tranpa egiteagatik ${penalty} puntu kendu dizkizute. Zenbat puntu dituzu orain?`,
          correctAnswer: points - penalty,
          unit: 'puntu',
          hint: `${points} - ${penalty} = ? (Kendu handiagoa da)`
        };
      }
    }
  ];

  const scenario = scenarios[randomInt(0, scenarios.length - 1)];
  return {
    id: Math.random().toString(),
    ...scenario.gen()
  };
};

// Generate Number Line Hunt Data
export const generateNumberLinePoints = (): NumberLinePoint[] => {
  const points: NumberLinePoint[] = [];
  const usedValues = new Set<number>();
  
  const letters = ['A', 'B', 'C'];
  
  letters.forEach(char => {
    let val = randomInt(-6, 6);
    while(usedValues.has(val)) {
      val = randomInt(-6, 6);
    }
    usedValues.add(val);
    points.push({ id: char, label: char, value: val });
  });
  
  return points;
};

// Generate True/False Questions
export const generateTrueFalse = (): TrueFalseQuestion => {
    const type = randomInt(1, 3);
    let statement = "";
    let isTrue = false;
    let explanation = "";

    if (type === 1) { 
        // Comparisons e.g. -5 > -2
        const a = randomInt(-10, 10);
        const b = randomInt(-10, 10);
        const symbol = Math.random() > 0.5 ? '>' : '<';
        
        if (a === b) { 
             // Retry if equal for simplicity
             return generateTrueFalse(); 
        }

        statement = `${a} ${symbol} ${b}`;
        if (symbol === '>') isTrue = a > b;
        else isTrue = a < b;
        
        explanation = `${a} ${isTrue ? (symbol === '>' ? 'handiagoa da' : 'txikiagoa da') : (symbol === '>' ? 'ez da handiagoa' : 'ez da txikiagoa')} ${b} baino.`;
    } else if (type === 2) {
        // Absolute Value e.g. |-5| = 5
        const a = randomInt(-10, 10);
        const correctAbs = Math.abs(a);
        const shownAbs = Math.random() > 0.5 ? correctAbs : -correctAbs; // |-5| = -5 (False)
        
        statement = `|${a}| = ${shownAbs}`;
        isTrue = shownAbs === correctAbs;
        explanation = `|${a}| beti da positiboa (${correctAbs}).`;
    } else {
        // Opposites e.g. Au(-3) = 3
        const a = randomInt(-10, 10);
        const correctOpp = -a;
        const shownOpp = Math.random() > 0.3 ? correctOpp : a; // Sometimes show wrong
        
        statement = `Aur(${fmt(a)}) = ${fmt(shownOpp)}`;
        isTrue = shownOpp === correctOpp;
        explanation = `${a}-ren aurkakoa ${correctOpp} da.`;
    }

    return {
        id: Math.random().toString(),
        statement,
        isTrue,
        explanation
    };
};

// Generate Memory Cards
export const generateMemoryDeck = (): MemoryCard[] => {
    const pairs = [
        { q: "-2 + 5", a: "3", val: 3 },
        { q: "Aur(-4)", a: "4", val: 4 },
        { q: "|-6|", a: "6", val: 6 },
        { q: "-3 - 2", a: "-5", val: -5 },
        { q: "-1 + 1", a: "0", val: 0 },
        { q: "2 · (-3)", a: "-6", val: -6 }
    ];

    // Pick 4 random pairs
    const selectedPairs = pairs.sort(() => Math.random() - 0.5).slice(0, 4);

    const cards: MemoryCard[] = [];
    selectedPairs.forEach(p => {
        cards.push({ id: `q-${p.val}`, content: p.q, matchId: p.val, isFlipped: false, isMatched: false, type: 'question' });
        cards.push({ id: `a-${p.val}`, content: p.a, matchId: p.val, isFlipped: false, isMatched: false, type: 'answer' });
    });

    return cards.sort(() => Math.random() - 0.5);
};