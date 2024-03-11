import { BigNumber } from 'ethers'

export class UnlockdMath {
  public static readonly MAX_LTV = 0.75
  public static readonly MIN_LTV = 0.1

  private static DECIMALS_MASK = 0xff

  private static RESERVE_DECIMALS_START_BIT_POSITION = 48

  private static PERCENTAGE_FACTOR = BigNumber.from(10).pow(4) //percentage plus two decimals
  private static HALF_PERCENT = this.PERCENTAGE_FACTOR.div(2)

  private static WAD = BigNumber.from(10).pow(18)
  private static RAY = BigNumber.from(10).pow(27)
  private static HALF_RAY = this.RAY.div(2)

  public static ZERO = BigNumber.from(0)

  static getDecimal(data: BigNumber): BigNumber {
    return data.shr(this.RESERVE_DECIMALS_START_BIT_POSITION).and(this.DECIMALS_MASK)
  }

  static rayMul(a: BigNumber, b: BigNumber): BigNumber {
    return a.mul(b).add(this.HALF_RAY).div(this.RAY)
  }

  static rayDiv(a: BigNumber, b: BigNumber): BigNumber {
    return a.mul(this.RAY).add(b.div(2)).div(b)
  }

  static wadDiv(a: BigNumber, b: BigNumber): BigNumber {
    return a.mul(this.WAD).add(b.div(2)).div(b)
  }

  static percentMul(value: BigNumber, percentage: BigNumber): BigNumber {
    if (value === this.ZERO || percentage === this.ZERO) {
      return this.ZERO
    }
    return value.mul(percentage).add(this.HALF_PERCENT).div(this.PERCENTAGE_FACTOR)
  }

  static mean(array: number[]) {
    return array.reduce((a, b) => a + b, 0) / array.length
  }

  static std(array: number[]) {
    const media = this.mean(array)
    const n = array.length
    const std = Math.sqrt(array.map(x => Math.pow(x - media, 2)).reduce((a, b) => a + b, 0) / (n - 1))
    return std
  }

  static pdf(assetVolatility: number, marketVolatilities: number[]) {
    const media = this.mean(marketVolatilities)
    const desviacion = this.std(marketVolatilities)

    const y_out =
      (1 / (desviacion * Math.sqrt(2 * Math.PI))) *
      Math.exp(-Math.pow(assetVolatility - media, 2) / (2 * Math.pow(desviacion, 2))) *
      (this.MAX_LTV * desviacion * Math.sqrt(2 * Math.PI))
    return Number.isNaN(y_out) ? 0 : y_out
  }
}
