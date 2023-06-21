export function calculateSavings(
  totalIncome: number,
  totalExpenses: number
): number {
  if (totalIncome <= 0 || totalExpenses < 0 || totalExpenses > totalIncome) {
    return 0
  }

  let savings = totalIncome - totalExpenses
  let savingsPercentage = (savings / totalIncome) * 100

  return Math.round((savingsPercentage + Number.EPSILON) * 100) / 100
}
