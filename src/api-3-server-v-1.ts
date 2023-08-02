import {
  SetDapiName as SetDapiNameEvent,
  UpdatedBeaconSetWithBeacons as UpdatedBeaconSetWithBeaconsEvent,
  UpdatedBeaconWithSignedData as UpdatedBeaconWithSignedDataEvent,
  UpdatedOevProxyBeaconSetWithSignedData as UpdatedOevProxyBeaconSetWithSignedDataEvent,
  UpdatedOevProxyBeaconWithSignedData as UpdatedOevProxyBeaconWithSignedDataEvent,
  Withdrew as WithdrewEvent
} from "../generated/Api3ServerV1/Api3ServerV1"
import {
  SetDapiName,
  UpdatedBeaconSetWithBeacons,
  UpdatedBeaconWithSignedData,
  UpdatedOevProxyBeaconSetWithSignedData,
  UpdatedOevProxyBeaconWithSignedData,
  Withdrew
} from "../generated/schema"

export function handleSetDapiName(event: SetDapiNameEvent): void {
  let entity = new SetDapiName(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.dataFeedId = event.params.dataFeedId
  entity.dapiName = event.params.dapiName
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpdatedBeaconSetWithBeacons(
  event: UpdatedBeaconSetWithBeaconsEvent
): void {
  let entity = new UpdatedBeaconSetWithBeacons(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.beaconSetId = event.params.beaconSetId
  entity.value = event.params.value
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpdatedBeaconWithSignedData(
  event: UpdatedBeaconWithSignedDataEvent
): void {
  let entity = new UpdatedBeaconWithSignedData(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.beaconId = event.params.beaconId
  entity.value = event.params.value
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpdatedOevProxyBeaconSetWithSignedData(
  event: UpdatedOevProxyBeaconSetWithSignedDataEvent
): void {
  let entity = new UpdatedOevProxyBeaconSetWithSignedData(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.beaconSetId = event.params.beaconSetId
  entity.proxy = event.params.proxy
  entity.updateId = event.params.updateId
  entity.value = event.params.value
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpdatedOevProxyBeaconWithSignedData(
  event: UpdatedOevProxyBeaconWithSignedDataEvent
): void {
  let entity = new UpdatedOevProxyBeaconWithSignedData(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.beaconId = event.params.beaconId
  entity.proxy = event.params.proxy
  entity.updateId = event.params.updateId
  entity.value = event.params.value
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrew(event: WithdrewEvent): void {
  let entity = new Withdrew(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oevProxy = event.params.oevProxy
  entity.oevBeneficiary = event.params.oevBeneficiary
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
