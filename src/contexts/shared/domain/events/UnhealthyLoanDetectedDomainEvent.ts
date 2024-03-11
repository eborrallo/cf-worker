import { DomainEvent } from './DomainEvent'

export class UnhealthyLoanDetectedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'unhealthy.loan.detected'

  constructor(
    aggregateId: string,
    readonly collection,
    readonly tokenId,
    readonly reserveAsset,
    readonly loanId,
    readonly priceInEth,
    readonly healthFactor,
    readonly totalDebtInETH
  ) {
    super(UnhealthyLoanDetectedDomainEvent.EVENT_NAME, aggregateId)
  }
  name() {
    return UnhealthyLoanDetectedDomainEvent.EVENT_NAME
  }
  toPrimitive(): any {
    return {
      collection: this.collection,
      tokenId: this.tokenId,
      reserveAsset: this.reserveAsset,
      loanId: this.loanId,
      priceInEth: this.priceInEth,
      healthFactor: this.healthFactor,
      totalDebtInETH: this.totalDebtInETH
    }
  }
}
