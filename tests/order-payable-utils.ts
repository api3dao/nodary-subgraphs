import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, BigInt, Address } from "@graphprotocol/graph-ts"
import { PaidForOrder, Withdrew } from "../generated/OrderPayable/OrderPayable"

export function createPaidForOrderEvent(
  orderId: Bytes,
  expirationTimestamp: BigInt,
  orderSigner: Address,
  amount: BigInt,
  sender: Address
): PaidForOrder {
  let paidForOrderEvent = changetype<PaidForOrder>(newMockEvent())

  paidForOrderEvent.parameters = new Array()

  paidForOrderEvent.parameters.push(
    new ethereum.EventParam("orderId", ethereum.Value.fromFixedBytes(orderId))
  )
  paidForOrderEvent.parameters.push(
    new ethereum.EventParam(
      "expirationTimestamp",
      ethereum.Value.fromUnsignedBigInt(expirationTimestamp)
    )
  )
  paidForOrderEvent.parameters.push(
    new ethereum.EventParam(
      "orderSigner",
      ethereum.Value.fromAddress(orderSigner)
    )
  )
  paidForOrderEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  paidForOrderEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return paidForOrderEvent
}

export function createWithdrewEvent(
  recipient: Address,
  amount: BigInt
): Withdrew {
  let withdrewEvent = changetype<Withdrew>(newMockEvent())

  withdrewEvent.parameters = new Array()

  withdrewEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  withdrewEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrewEvent
}
