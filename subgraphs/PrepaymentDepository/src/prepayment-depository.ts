import {
  Claimed as ClaimedEvent,
  DecreasedUserWithdrawalLimit as DecreasedUserWithdrawalLimitEvent,
  Deposited as DepositedEvent,
  IncreasedUserWithdrawalLimit as IncreasedUserWithdrawalLimitEvent,
  SetWithdrawalDestination as SetWithdrawalDestinationEvent,
  Withdrew as WithdrewEvent
} from "../generated/PrepaymentDepository/PrepaymentDepository"
import {
  Claimed,
  DecreasedUserWithdrawalLimit,
  Deposited,
  IncreasedUserWithdrawalLimit,
  SetWithdrawalDestination,
  Withdrew
} from "../generated/schema"

export function handleClaimed(event: ClaimedEvent): void {
  let entity = new Claimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.recipient = event.params.recipient
  entity.amount = event.params.amount
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDecreasedUserWithdrawalLimit(
  event: DecreasedUserWithdrawalLimitEvent
): void {
  let entity = new DecreasedUserWithdrawalLimit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount
  entity.withdrawalLimit = event.params.withdrawalLimit
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDeposited(event: DepositedEvent): void {
  let entity = new Deposited(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount
  entity.withdrawalLimit = event.params.withdrawalLimit
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleIncreasedUserWithdrawalLimit(
  event: IncreasedUserWithdrawalLimitEvent
): void {
  let entity = new IncreasedUserWithdrawalLimit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount
  entity.withdrawalLimit = event.params.withdrawalLimit
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetWithdrawalDestination(
  event: SetWithdrawalDestinationEvent
): void {
  let entity = new SetWithdrawalDestination(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.withdrawalDestination = event.params.withdrawalDestination

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrew(event: WithdrewEvent): void {
  let entity = new Withdrew(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.withdrawalHash = event.params.withdrawalHash
  entity.amount = event.params.amount
  entity.expirationTimestamp = event.params.expirationTimestamp
  entity.withdrawalSigner = event.params.withdrawalSigner
  entity.withdrawalDestination = event.params.withdrawalDestination
  entity.withdrawalLimit = event.params.withdrawalLimit

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
