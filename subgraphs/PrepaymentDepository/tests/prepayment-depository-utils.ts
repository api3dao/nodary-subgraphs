import { newMockEvent } from 'matchstick-as';
import { ethereum, Address, BigInt, Bytes } from '@graphprotocol/graph-ts';
import {
  Claimed,
  DecreasedUserWithdrawalLimit,
  Deposited,
  IncreasedUserWithdrawalLimit,
  SetWithdrawalDestination,
  Withdrew,
} from '../generated/PrepaymentDepository/PrepaymentDepository';

export function createClaimedEvent(recipient: Address, amount: BigInt, sender: Address): Claimed {
  let claimedEvent = changetype<Claimed>(newMockEvent());

  claimedEvent.parameters = new Array();

  claimedEvent.parameters.push(new ethereum.EventParam('recipient', ethereum.Value.fromAddress(recipient)));
  claimedEvent.parameters.push(new ethereum.EventParam('amount', ethereum.Value.fromUnsignedBigInt(amount)));
  claimedEvent.parameters.push(new ethereum.EventParam('sender', ethereum.Value.fromAddress(sender)));

  return claimedEvent;
}

export function createDecreasedUserWithdrawalLimitEvent(
  user: Address,
  amount: BigInt,
  withdrawalLimit: BigInt,
  sender: Address
): DecreasedUserWithdrawalLimit {
  let decreasedUserWithdrawalLimitEvent = changetype<DecreasedUserWithdrawalLimit>(newMockEvent());

  decreasedUserWithdrawalLimitEvent.parameters = new Array();

  decreasedUserWithdrawalLimitEvent.parameters.push(new ethereum.EventParam('user', ethereum.Value.fromAddress(user)));
  decreasedUserWithdrawalLimitEvent.parameters.push(
    new ethereum.EventParam('amount', ethereum.Value.fromUnsignedBigInt(amount))
  );
  decreasedUserWithdrawalLimitEvent.parameters.push(
    new ethereum.EventParam('withdrawalLimit', ethereum.Value.fromUnsignedBigInt(withdrawalLimit))
  );
  decreasedUserWithdrawalLimitEvent.parameters.push(
    new ethereum.EventParam('sender', ethereum.Value.fromAddress(sender))
  );

  return decreasedUserWithdrawalLimitEvent;
}

export function createDepositedEvent(
  user: Address,
  amount: BigInt,
  withdrawalLimit: BigInt,
  sender: Address
): Deposited {
  let depositedEvent = changetype<Deposited>(newMockEvent());

  depositedEvent.parameters = new Array();

  depositedEvent.parameters.push(new ethereum.EventParam('user', ethereum.Value.fromAddress(user)));
  depositedEvent.parameters.push(new ethereum.EventParam('amount', ethereum.Value.fromUnsignedBigInt(amount)));
  depositedEvent.parameters.push(
    new ethereum.EventParam('withdrawalLimit', ethereum.Value.fromUnsignedBigInt(withdrawalLimit))
  );
  depositedEvent.parameters.push(new ethereum.EventParam('sender', ethereum.Value.fromAddress(sender)));

  return depositedEvent;
}

export function createIncreasedUserWithdrawalLimitEvent(
  user: Address,
  amount: BigInt,
  withdrawalLimit: BigInt,
  sender: Address
): IncreasedUserWithdrawalLimit {
  let increasedUserWithdrawalLimitEvent = changetype<IncreasedUserWithdrawalLimit>(newMockEvent());

  increasedUserWithdrawalLimitEvent.parameters = new Array();

  increasedUserWithdrawalLimitEvent.parameters.push(new ethereum.EventParam('user', ethereum.Value.fromAddress(user)));
  increasedUserWithdrawalLimitEvent.parameters.push(
    new ethereum.EventParam('amount', ethereum.Value.fromUnsignedBigInt(amount))
  );
  increasedUserWithdrawalLimitEvent.parameters.push(
    new ethereum.EventParam('withdrawalLimit', ethereum.Value.fromUnsignedBigInt(withdrawalLimit))
  );
  increasedUserWithdrawalLimitEvent.parameters.push(
    new ethereum.EventParam('sender', ethereum.Value.fromAddress(sender))
  );

  return increasedUserWithdrawalLimitEvent;
}

export function createSetWithdrawalDestinationEvent(
  user: Address,
  withdrawalDestination: Address
): SetWithdrawalDestination {
  let setWithdrawalDestinationEvent = changetype<SetWithdrawalDestination>(newMockEvent());

  setWithdrawalDestinationEvent.parameters = new Array();

  setWithdrawalDestinationEvent.parameters.push(new ethereum.EventParam('user', ethereum.Value.fromAddress(user)));
  setWithdrawalDestinationEvent.parameters.push(
    new ethereum.EventParam('withdrawalDestination', ethereum.Value.fromAddress(withdrawalDestination))
  );

  return setWithdrawalDestinationEvent;
}

export function createWithdrewEvent(
  user: Address,
  withdrawalHash: Bytes,
  amount: BigInt,
  expirationTimestamp: BigInt,
  withdrawalSigner: Address,
  withdrawalDestination: Address,
  withdrawalLimit: BigInt
): Withdrew {
  let withdrewEvent = changetype<Withdrew>(newMockEvent());

  withdrewEvent.parameters = new Array();

  withdrewEvent.parameters.push(new ethereum.EventParam('user', ethereum.Value.fromAddress(user)));
  withdrewEvent.parameters.push(
    new ethereum.EventParam('withdrawalHash', ethereum.Value.fromFixedBytes(withdrawalHash))
  );
  withdrewEvent.parameters.push(new ethereum.EventParam('amount', ethereum.Value.fromUnsignedBigInt(amount)));
  withdrewEvent.parameters.push(
    new ethereum.EventParam('expirationTimestamp', ethereum.Value.fromUnsignedBigInt(expirationTimestamp))
  );
  withdrewEvent.parameters.push(
    new ethereum.EventParam('withdrawalSigner', ethereum.Value.fromAddress(withdrawalSigner))
  );
  withdrewEvent.parameters.push(
    new ethereum.EventParam('withdrawalDestination', ethereum.Value.fromAddress(withdrawalDestination))
  );
  withdrewEvent.parameters.push(
    new ethereum.EventParam('withdrawalLimit', ethereum.Value.fromUnsignedBigInt(withdrawalLimit))
  );

  return withdrewEvent;
}
