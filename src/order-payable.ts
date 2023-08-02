import {
  PaidForOrder as PaidForOrderEvent,
  Withdrew as WithdrewEvent
} from "../generated/OrderPayable/OrderPayable"
import { PaidForOrder, Withdrew } from "../generated/schema"

export function handlePaidForOrder(event: PaidForOrderEvent): void {
  let entity = new PaidForOrder(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.orderId = event.params.orderId
  entity.expirationTimestamp = event.params.expirationTimestamp
  entity.orderSigner = event.params.orderSigner
  entity.amount = event.params.amount
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrew(event: WithdrewEvent): void {
  let entity = new Withdrew(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.recipient = event.params.recipient
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
