'use client';

import { useState } from 'react';
import styles from './YatzyCalculator.module.css';

interface DiceState {
  dice: number[];
}

interface FilledBoxes {
  ones: boolean;
  twos: boolean;
  threes: boolean;
  fours: boolean;
  fives: boolean;
  sixes: boolean;
  pair: boolean;
  twoPairs: boolean;
  threeOfKind: boolean;
  fourOfKind: boolean;
  smallStraight: boolean;
  largeStraight: boolean;
  fullHouse: boolean;
  chance: boolean;
  yatzy: boolean;
}

export default function YatzyCalculator() {
  const [dice, setDice] = useState<number[]>([1, 1, 1, 1, 1]);
  const [filledBoxes, setFilledBoxes] = useState<FilledBoxes>({
    ones: false,
    twos: false,
    threes: false,
    fours: false,
    fives: false,
    sixes: false,
    pair: false,
    twoPairs: false,
    threeOfKind: false,
    fourOfKind: false,
    smallStraight: false,
    largeStraight: false,
    fullHouse: false,
    chance: false,
    yatzy: false,
  });

  const handleDiceChange = (index: number, value: string) => {
    const numValue = parseInt(value);
    if (numValue >= 1 && numValue <= 6) {
      const newDice = [...dice];
      newDice[index] = numValue;
      setDice(newDice);
    }
  };

  const handleCheckboxChange = (box: keyof FilledBoxes) => {
    setFilledBoxes(prev => ({ ...prev, [box]: !prev[box] }));
  };

  // Calculate counts of each die value
  const getCounts = (diceArray: number[]) => {
    const counts: { [key: number]: number } = {};
    diceArray.forEach(die => {
      counts[die] = (counts[die] || 0) + 1;
    });
    return counts;
  };

  // Calculate current score for different categories
  const calculateScores = () => {
    const counts = getCounts(dice);
    const sortedCounts = Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .map(([value, count]) => ({ value: parseInt(value), count }));

    const scores: { [key: string]: number } = {};

    // Upper section
    for (let i = 1; i <= 6; i++) {
      scores[`${i}s`] = (counts[i] || 0) * i;
    }

    // Pair (highest)
    const pairs = sortedCounts.filter(({ count }) => count >= 2);
    scores.pair = pairs.length > 0 ? pairs[0].value * 2 : 0;

    // Two pairs
    if (pairs.length >= 2) {
      scores.twoPairs = pairs[0].value * 2 + pairs[1].value * 2;
    } else {
      scores.twoPairs = 0;
    }

    // Three of a kind
    const threes = sortedCounts.filter(({ count }) => count >= 3);
    scores.threeOfKind = threes.length > 0 ? threes[0].value * 3 : 0;

    // Four of a kind
    const fours = sortedCounts.filter(({ count }) => count >= 4);
    scores.fourOfKind = fours.length > 0 ? fours[0].value * 4 : 0;

    // Small straight (1-2-3-4-5)
    const hasSmallStraight = [1, 2, 3, 4, 5].every(n => counts[n] >= 1);
    scores.smallStraight = hasSmallStraight ? 15 : 0;

    // Large straight (2-3-4-5-6)
    const hasLargeStraight = [2, 3, 4, 5, 6].every(n => counts[n] >= 1);
    scores.largeStraight = hasLargeStraight ? 20 : 0;

    // Full house (three of a kind + pair)
    if (threes.length > 0 && pairs.length >= 2) {
      scores.fullHouse = dice.reduce((sum, die) => sum + die, 0);
    } else {
      scores.fullHouse = 0;
    }

    // Chance
    scores.chance = dice.reduce((sum, die) => sum + die, 0);

    // Yatzy
    const hasYatzy = sortedCounts.some(({ count }) => count === 5);
    scores.yatzy = hasYatzy ? 50 : 0;

    return scores;
  };

  // Generate recommendation
  const getRecommendation = () => {
    const scores = calculateScores();
    const counts = getCounts(dice);
    const sortedCounts = Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .map(([value, count]) => ({ value: parseInt(value), count }));

    const recommendations: Array<{ action: string; reason: string; priority: number }> = [];

    // Check for Yatzy (highest priority)
    if (!filledBoxes.yatzy) {
      if (sortedCounts[0].count === 5) {
        recommendations.push({
          action: `Fyll i Yatzy!`,
          reason: `Du har fem ${sortedCounts[0].value}:or - det ger 50 poäng!`,
          priority: 100,
        });
      } else if (sortedCounts[0].count === 4) {
        recommendations.push({
          action: `Spara de fyra ${sortedCounts[0].value}:orna och kasta om den sista tärningen`,
          reason: `Du har ${(1/6 * 100).toFixed(1)}% chans att få Yatzy (50 poäng)`,
          priority: 90,
        });
      }
    }

    // Check for large straight
    if (!filledBoxes.largeStraight && scores.largeStraight === 20) {
      recommendations.push({
        action: `Fyll i Stor Stege`,
        reason: `Du har redan 2-3-4-5-6, vilket ger 20 poäng`,
        priority: 85,
      });
    }

    // Check for small straight
    if (!filledBoxes.smallStraight && scores.smallStraight === 15) {
      recommendations.push({
        action: `Fyll i Liten Stege`,
        reason: `Du har redan 1-2-3-4-5, vilket ger 15 poäng`,
        priority: 80,
      });
    }

    // Check for full house
    if (!filledBoxes.fullHouse && scores.fullHouse > 0) {
      recommendations.push({
        action: `Fyll i Kåk`,
        reason: `Du har Triss + Par, vilket ger ${scores.fullHouse} poäng`,
        priority: 75,
      });
    }

    // Check for four of a kind
    if (!filledBoxes.fourOfKind && scores.fourOfKind > 0) {
      recommendations.push({
        action: `Fyll i Fyrtal`,
        reason: `Du har fyra ${sortedCounts[0].value}:or, vilket ger ${scores.fourOfKind} poäng`,
        priority: 70,
      });
    }

    // Check for three of a kind
    if (!filledBoxes.threeOfKind && scores.threeOfKind > 0) {
      const threeValue = sortedCounts.find(({ count }) => count >= 3)?.value || 0;
      if (threeValue >= 4) {
        recommendations.push({
          action: `Fyll i Triss`,
          reason: `Du har tre ${threeValue}:or, vilket ger ${scores.threeOfKind} poäng`,
          priority: 65,
        });
      }
    }

    // Upper section strategy (for bonus)
    const upperSum = [1, 2, 3, 4, 5, 6].reduce((sum, num) => {
      const key = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'][num - 1] as keyof FilledBoxes;
      return sum + (filledBoxes[key] ? 0 : scores[`${num}s`]);
    }, 0);

    for (let num = 6; num >= 4; num--) {
      const key = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'][num - 1] as keyof FilledBoxes;
      if (!filledBoxes[key] && scores[`${num}s`] >= num * 3) {
        const names = ['Ettor', 'Tvåor', 'Treor', 'Fyror', 'Femmor', 'Sexor'];
        recommendations.push({
          action: `Fyll i ${names[num - 1]}`,
          reason: `Du har ${counts[num] || 0} st ${num}:or (${scores[`${num}s`]} poäng). Bra för bonusen!`,
          priority: 60,
        });
      }
    }

    // Two pairs
    if (!filledBoxes.twoPairs && scores.twoPairs > 0) {
      recommendations.push({
        action: `Fyll i Två Par`,
        reason: `Du har två par, vilket ger ${scores.twoPairs} poäng`,
        priority: 50,
      });
    }

    // Pair
    if (!filledBoxes.pair && scores.pair > 0) {
      const pairValue = sortedCounts.find(({ count }) => count >= 2)?.value || 0;
      if (pairValue >= 5) {
        recommendations.push({
          action: `Fyll i Par`,
          reason: `Du har ett par ${pairValue}:or, vilket ger ${scores.pair} poäng`,
          priority: 45,
        });
      }
    }

    // Chance as fallback
    if (!filledBoxes.chance && scores.chance >= 20) {
      recommendations.push({
        action: `Fyll i Chans`,
        reason: `Summan är ${scores.chance} poäng - en bra användning av Chans-rutan`,
        priority: 40,
      });
    }

    // If we have nothing good, suggest what to aim for
    if (recommendations.length === 0) {
      if (sortedCounts[0].count >= 2) {
        recommendations.push({
          action: `Spara paret ${sortedCounts[0].value}:or och kasta om resten`,
          reason: `Sikta på Triss, Fyrtal eller Kåk`,
          priority: 30,
        });
      } else {
        recommendations.push({
          action: `Kasta om alla tärningar`,
          reason: `Försök få högre värden eller en kombination`,
          priority: 20,
        });
      }
    }

    return recommendations.sort((a, b) => b.priority - a.priority)[0];
  };

  const recommendation = getRecommendation();

  return (
    <div className={styles.calculator}>
      <h2 className={styles.title}>🎲 Yatzy Strategi-kalkylator</h2>
      <p className={styles.subtitle}>
        Ange dina tärningar och se vad som är det strategiskt bästa draget!
      </p>

      {/* Dice Input */}
      <div className={styles.section}>
        <h3>Dina tärningar</h3>
        <div className={styles.diceInputs}>
          {dice.map((die, index) => (
            <input
              key={index}
              type="number"
              min="1"
              max="6"
              value={die}
              onChange={(e) => handleDiceChange(index, e.target.value)}
              className={styles.diceInput}
            />
          ))}
        </div>
      </div>

      {/* Filled Boxes */}
      <div className={styles.section}>
        <h3>Ifyllda rutor</h3>
        <div className={styles.checkboxGrid}>
          <div className={styles.checkboxGroup}>
            <h4>Övre delen</h4>
            {[
              { key: 'ones', label: 'Ettor' },
              { key: 'twos', label: 'Tvåor' },
              { key: 'threes', label: 'Treor' },
              { key: 'fours', label: 'Fyror' },
              { key: 'fives', label: 'Femmor' },
              { key: 'sixes', label: 'Sexor' },
            ].map(({ key, label }) => (
              <label key={key} className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={filledBoxes[key as keyof FilledBoxes]}
                  onChange={() => handleCheckboxChange(key as keyof FilledBoxes)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>

          <div className={styles.checkboxGroup}>
            <h4>Nedre delen</h4>
            {[
              { key: 'pair', label: 'Par' },
              { key: 'twoPairs', label: 'Två Par' },
              { key: 'threeOfKind', label: 'Triss' },
              { key: 'fourOfKind', label: 'Fyrtal' },
              { key: 'smallStraight', label: 'Liten Stege' },
              { key: 'largeStraight', label: 'Stor Stege' },
              { key: 'fullHouse', label: 'Kåk' },
              { key: 'chance', label: 'Chans' },
              { key: 'yatzy', label: 'Yatzy' },
            ].map(({ key, label }) => (
              <label key={key} className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={filledBoxes[key as keyof FilledBoxes]}
                  onChange={() => handleCheckboxChange(key as keyof FilledBoxes)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className={styles.recommendation}>
        <h3>💡 Rekommendation</h3>
        <div className={styles.recommendationBox}>
          <p className={styles.action}><strong>Bästa drag:</strong> {recommendation.action}</p>
          <p className={styles.reason}>{recommendation.reason}</p>
        </div>
      </div>
    </div>
  );
}
