import { newMockEvent } from 'matchstick-as';
import { ethereum, Bytes, Address, BigInt } from '@graphprotocol/graph-ts';
import {
  SetDapiName,
  UpdatedBeaconSetWithBeacons,
  UpdatedBeaconWithSignedData,
  UpdatedOevProxyBeaconSetWithSignedData,
  UpdatedOevProxyBeaconWithSignedData,
  Withdrew,
} from '../generated/Api3ServerV1/Api3ServerV1';

export function createSetDapiNameEvent(dataFeedId: Bytes, dapiName: Bytes, sender: Address): SetDapiName {
  let setDapiNameEvent = changetype<SetDapiName>(newMockEvent());

  setDapiNameEvent.parameters = new Array();

  setDapiNameEvent.parameters.push(new ethereum.EventParam('dataFeedId', ethereum.Value.fromFixedBytes(dataFeedId)));
  setDapiNameEvent.parameters.push(new ethereum.EventParam('dapiName', ethereum.Value.fromFixedBytes(dapiName)));
  setDapiNameEvent.parameters.push(new ethereum.EventParam('sender', ethereum.Value.fromAddress(sender)));

  return setDapiNameEvent;
}

export function createUpdatedBeaconSetWithBeaconsEvent(
  beaconSetId: Bytes,
  value: BigInt,
  timestamp: BigInt
): UpdatedBeaconSetWithBeacons {
  let updatedBeaconSetWithBeaconsEvent = changetype<UpdatedBeaconSetWithBeacons>(newMockEvent());

  updatedBeaconSetWithBeaconsEvent.parameters = new Array();

  updatedBeaconSetWithBeaconsEvent.parameters.push(
    new ethereum.EventParam('beaconSetId', ethereum.Value.fromFixedBytes(beaconSetId))
  );
  updatedBeaconSetWithBeaconsEvent.parameters.push(
    new ethereum.EventParam('value', ethereum.Value.fromSignedBigInt(value))
  );
  updatedBeaconSetWithBeaconsEvent.parameters.push(
    new ethereum.EventParam('timestamp', ethereum.Value.fromUnsignedBigInt(timestamp))
  );

  return updatedBeaconSetWithBeaconsEvent;
}

export function createUpdatedBeaconWithSignedDataEvent(
  beaconId: Bytes,
  value: BigInt,
  timestamp: BigInt
): UpdatedBeaconWithSignedData {
  let updatedBeaconWithSignedDataEvent = changetype<UpdatedBeaconWithSignedData>(newMockEvent());

  updatedBeaconWithSignedDataEvent.parameters = new Array();

  updatedBeaconWithSignedDataEvent.parameters.push(
    new ethereum.EventParam('beaconId', ethereum.Value.fromFixedBytes(beaconId))
  );
  updatedBeaconWithSignedDataEvent.parameters.push(
    new ethereum.EventParam('value', ethereum.Value.fromSignedBigInt(value))
  );
  updatedBeaconWithSignedDataEvent.parameters.push(
    new ethereum.EventParam('timestamp', ethereum.Value.fromUnsignedBigInt(timestamp))
  );

  return updatedBeaconWithSignedDataEvent;
}

export function createUpdatedOevProxyBeaconSetWithSignedDataEvent(
  beaconSetId: Bytes,
  proxy: Address,
  updateId: Bytes,
  value: BigInt,
  timestamp: BigInt
): UpdatedOevProxyBeaconSetWithSignedData {
  let updatedOevProxyBeaconSetWithSignedDataEvent = changetype<UpdatedOevProxyBeaconSetWithSignedData>(newMockEvent());

  updatedOevProxyBeaconSetWithSignedDataEvent.parameters = new Array();

  updatedOevProxyBeaconSetWithSignedDataEvent.parameters.push(
    new ethereum.EventParam('beaconSetId', ethereum.Value.fromFixedBytes(beaconSetId))
  );
  updatedOevProxyBeaconSetWithSignedDataEvent.parameters.push(
    new ethereum.EventParam('proxy', ethereum.Value.fromAddress(proxy))
  );
  updatedOevProxyBeaconSetWithSignedDataEvent.parameters.push(
    new ethereum.EventParam('updateId', ethereum.Value.fromFixedBytes(updateId))
  );
  updatedOevProxyBeaconSetWithSignedDataEvent.parameters.push(
    new ethereum.EventParam('value', ethereum.Value.fromSignedBigInt(value))
  );
  updatedOevProxyBeaconSetWithSignedDataEvent.parameters.push(
    new ethereum.EventParam('timestamp', ethereum.Value.fromUnsignedBigInt(timestamp))
  );

  return updatedOevProxyBeaconSetWithSignedDataEvent;
}

export function createUpdatedOevProxyBeaconWithSignedDataEvent(
  beaconId: Bytes,
  proxy: Address,
  updateId: Bytes,
  value: BigInt,
  timestamp: BigInt
): UpdatedOevProxyBeaconWithSignedData {
  let updatedOevProxyBeaconWithSignedDataEvent = changetype<UpdatedOevProxyBeaconWithSignedData>(newMockEvent());

  updatedOevProxyBeaconWithSignedDataEvent.parameters = new Array();

  updatedOevProxyBeaconWithSignedDataEvent.parameters.push(
    new ethereum.EventParam('beaconId', ethereum.Value.fromFixedBytes(beaconId))
  );
  updatedOevProxyBeaconWithSignedDataEvent.parameters.push(
    new ethereum.EventParam('proxy', ethereum.Value.fromAddress(proxy))
  );
  updatedOevProxyBeaconWithSignedDataEvent.parameters.push(
    new ethereum.EventParam('updateId', ethereum.Value.fromFixedBytes(updateId))
  );
  updatedOevProxyBeaconWithSignedDataEvent.parameters.push(
    new ethereum.EventParam('value', ethereum.Value.fromSignedBigInt(value))
  );
  updatedOevProxyBeaconWithSignedDataEvent.parameters.push(
    new ethereum.EventParam('timestamp', ethereum.Value.fromUnsignedBigInt(timestamp))
  );

  return updatedOevProxyBeaconWithSignedDataEvent;
}

export function createWithdrewEvent(oevProxy: Address, oevBeneficiary: Address, amount: BigInt): Withdrew {
  let withdrewEvent = changetype<Withdrew>(newMockEvent());

  withdrewEvent.parameters = new Array();

  withdrewEvent.parameters.push(new ethereum.EventParam('oevProxy', ethereum.Value.fromAddress(oevProxy)));
  withdrewEvent.parameters.push(new ethereum.EventParam('oevBeneficiary', ethereum.Value.fromAddress(oevBeneficiary)));
  withdrewEvent.parameters.push(new ethereum.EventParam('amount', ethereum.Value.fromUnsignedBigInt(amount)));

  return withdrewEvent;
}
