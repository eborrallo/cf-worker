function getHarvestFrequency(principal: number, poolApr: number, harvestCost: number, x: number): number {
  return principal * (1 + poolApr / x) ** x - harvestCost * ((1 - (1 + poolApr / x) ** x) / (1 - (1 + poolApr / x)))
}

export function gradientDescentOptimalHarvestFrequency(principal: number, poolApr: number, cost: number) {
  let guess = 1
  const epsilon = 0.001
  const maxIterations = 10000

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    const currentGradient =
      (getHarvestFrequency(principal, poolApr, cost, guess + epsilon) -
        getHarvestFrequency(principal, poolApr, cost, guess)) /
      epsilon
    const learningRate = 0.001
    guess = guess + learningRate * currentGradient

    if (guess <= 0) guess = 10
    if (Math.abs(currentGradient) < epsilon) return guess
  }

  throw new Error('Could not find optimal harvest frequency')
}
