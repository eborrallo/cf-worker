import { DomainEvent } from './DomainEvent'

export class HealthyLoanDetectedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'healthy.loan.detected'

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
    super(HealthyLoanDetectedDomainEvent.EVENT_NAME, aggregateId)
  }
  name() {
    return HealthyLoanDetectedDomainEvent.EVENT_NAME
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
