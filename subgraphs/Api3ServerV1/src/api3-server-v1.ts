import {
  SetDapiName as SetDapiNameEvent,
  UpdatedBeaconSetWithBeacons as UpdatedBeaconSetWithBeaconsEvent,
  UpdatedBeaconWithSignedData as UpdatedBeaconWithSignedDataEvent,
  UpdatedOevProxyBeaconSetWithSignedData as UpdatedOevProxyBeaconSetWithSignedDataEvent,
  UpdatedOevProxyBeaconWithSignedData as UpdatedOevProxyBeaconWithSignedDataEvent,
  Withdrew as WithdrewEvent,
} from '../generated/Api3ServerV1/Api3ServerV1';
import {
  SetDapiName,
  Transaction,
  TransactionReceipt,
  Log,
  UpdatedBeaconSetWithBeacons,
  UpdatedBeaconWithSignedData,
  UpdatedOevProxyBeaconSetWithSignedData,
  UpdatedOevProxyBeaconWithSignedData,
  Withdrew,
} from '../generated/schema';
import { ethereum, Bytes, Wrapped, ByteArray, BigInt, crypto } from '@graphprotocol/graph-ts';

// utils

export function generateLogId(transactionHash: Bytes, logIndex: BigInt): string {
  var id = transactionHash.toHex() + Bytes.fromBigInt(logIndex).toHex();
  return crypto.keccak256(ByteArray.fromHexString(id)).toHex();
}

export function createTransactionEntity(transaction: ethereum.Transaction): Transaction {
  let entity = Transaction.load(transaction.hash);
  if (!entity) {
    entity = new Transaction(transaction.hash);
    entity.hash = transaction.hash;
    entity.index = transaction.index;
    entity.from = transaction.from;
    entity.to = transaction.to;
    entity.value = transaction.value;
    entity.gasLimit = transaction.gasLimit;
    entity.gasPrice = transaction.gasPrice;
    entity.input = transaction.input;
    entity.nonce = transaction.nonce;
    entity.save();
  }

  return entity;
}

export function createTransactionReceiptEntity(
  transactionHash: Bytes,
  receipt: ethereum.TransactionReceipt
): TransactionReceipt {
  let entity = TransactionReceipt.load(transactionHash);
  if (!entity) {
    entity = new TransactionReceipt(transactionHash);
    entity.blockHash = receipt.blockHash;
    entity.blockNumber = receipt.blockNumber;
    entity.cumulativeGasUsed = receipt.cumulativeGasUsed;
    entity.gasUsed = receipt.gasUsed;
    entity.contractAddress = receipt.contractAddress;
    entity.status = receipt.status;
    entity.root = receipt.root;
    entity.logsBloom = receipt.logsBloom;
    for (let index = 0; index < receipt.logs.length; index++) {
      createLogEntity(transactionHash, receipt.logs[index]);
    }
    entity.save();
  }

  return entity;
}

export function createLogEntity(transactionHash: Bytes, log: ethereum.Log): Log {
  const logId = transactionHash.concatI32(log.logIndex.toI32());

  let entity = Log.load(logId);
  if (!entity) {
    entity = new Log(logId);
    entity.logIndex = log.logIndex;
    entity.data = log.data;
    entity.topics = log.topics;
    const removed = log.removed != null ? (log.removed as Wrapped<bool>).inner : false;
    if (typeof removed === 'number') {
      entity.removed = (removed as number) === 1;
    }
    if (typeof removed === 'boolean') {
      entity.removed = (removed as boolean) === true;
    }
    entity.transactionReceipt = transactionHash;
    entity.save();
  }
  return entity;
}

// handlers

export function handleSetDapiName(event: SetDapiNameEvent): void {
  let entity = new SetDapiName(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.address = event.address;
  entity.logIndex = event.logIndex;
  entity.logType = event.logType;
  entity.dataFeedId = event.params.dataFeedId;
  entity.dapiName = event.params.dapiName;
  entity.sender = event.params.sender;
  entity.parameters = [entity.dataFeedId.toHexString(), entity.dapiName.toHexString(), entity.sender.toHexString()];

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;

  createTransactionEntity(event.transaction);
  entity.transaction = event.transaction.hash;

  if (event.receipt) {
    createTransactionReceiptEntity(event.transaction.hash, event.receipt!);
    entity.transactionReceipt = event.transaction.hash;
  }

  entity.save();
}

export function handleUpdatedBeaconSetWithBeacons(event: UpdatedBeaconSetWithBeaconsEvent): void {
  let entity = new UpdatedBeaconSetWithBeacons(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.address = event.address;
  entity.logIndex = event.logIndex;
  entity.logType = event.logType;
  entity.beaconSetId = event.params.beaconSetId;
  entity.value = event.params.value;
  entity.timestamp = event.params.timestamp;
  entity.parameters = [entity.beaconSetId.toHexString(), entity.value.toString(), entity.timestamp.toString()];

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;

  createTransactionEntity(event.transaction);
  entity.transaction = event.transaction.hash;

  if (event.receipt) {
    createTransactionReceiptEntity(event.transaction.hash, event.receipt!);
    entity.transactionReceipt = event.transaction.hash;
  }

  entity.save();
}

export function handleUpdatedBeaconWithSignedData(event: UpdatedBeaconWithSignedDataEvent): void {
  let entity = new UpdatedBeaconWithSignedData(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.address = event.address;
  entity.logIndex = event.logIndex;
  entity.logType = event.logType;
  entity.beaconId = event.params.beaconId;
  entity.value = event.params.value;
  entity.timestamp = event.params.timestamp;
  entity.parameters = [entity.beaconId.toHexString(), entity.value.toString(), entity.timestamp.toString()];

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;

  createTransactionEntity(event.transaction);
  entity.transaction = event.transaction.hash;

  if (event.receipt) {
    createTransactionReceiptEntity(event.transaction.hash, event.receipt!);
    entity.transactionReceipt = event.transaction.hash;
  }

  entity.save();
}

export function handleUpdatedOevProxyBeaconSetWithSignedData(event: UpdatedOevProxyBeaconSetWithSignedDataEvent): void {
  let entity = new UpdatedOevProxyBeaconSetWithSignedData(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.address = event.address;
  entity.logIndex = event.logIndex;
  entity.logType = event.logType;
  entity.beaconSetId = event.params.beaconSetId;
  entity.proxy = event.params.proxy;
  entity.updateId = event.params.updateId;
  entity.value = event.params.value;
  entity.timestamp = event.params.timestamp;
  entity.parameters = [
    entity.beaconSetId.toHexString(),
    event.params.proxy.toHexString(),
    entity.updateId.toHexString(),
    entity.value.toString(),
    entity.timestamp.toString(),
  ];

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;

  createTransactionEntity(event.transaction);
  entity.transaction = event.transaction.hash;

  if (event.receipt) {
    createTransactionReceiptEntity(event.transaction.hash, event.receipt!);
    entity.transactionReceipt = event.transaction.hash;
  }

  entity.save();
}

export function handleUpdatedOevProxyBeaconWithSignedData(event: UpdatedOevProxyBeaconWithSignedDataEvent): void {
  let entity = new UpdatedOevProxyBeaconWithSignedData(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.address = event.address;
  entity.logIndex = event.logIndex;
  entity.logType = event.logType;
  entity.beaconId = event.params.beaconId;
  entity.proxy = event.params.proxy;
  entity.updateId = event.params.updateId;
  entity.value = event.params.value;
  entity.timestamp = event.params.timestamp;
  entity.parameters = [
    entity.beaconId.toHexString(),
    event.params.proxy.toHexString(),
    entity.updateId.toHexString(),
    entity.value.toString(),
    entity.timestamp.toString(),
  ];

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;

  createTransactionEntity(event.transaction);
  entity.transaction = event.transaction.hash;

  if (event.receipt) {
    createTransactionReceiptEntity(event.transaction.hash, event.receipt!);
    entity.transactionReceipt = event.transaction.hash;
  }

  entity.save();
}

export function handleWithdrew(event: WithdrewEvent): void {
  let entity = new Withdrew(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.address = event.address;
  entity.logIndex = event.logIndex;
  entity.logType = event.logType;
  entity.oevProxy = event.params.oevProxy;
  entity.oevBeneficiary = event.params.oevBeneficiary;
  entity.amount = event.params.amount;
  entity.parameters = [
    entity.oevProxy.toHexString(),
    event.params.oevBeneficiary.toHexString(),
    entity.amount.toString(),
  ];

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;

  createTransactionEntity(event.transaction);
  entity.transaction = event.transaction.hash;

  if (event.receipt) {
    createTransactionReceiptEntity(event.transaction.hash, event.receipt!);
    entity.transactionReceipt = event.transaction.hash;
  }

  entity.save();
}
