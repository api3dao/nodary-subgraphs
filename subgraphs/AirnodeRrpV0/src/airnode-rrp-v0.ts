import {
  CreatedTemplate as CreatedTemplateEvent,
  FailedRequest as FailedRequestEvent,
  FulfilledRequest as FulfilledRequestEvent,
  FulfilledWithdrawal as FulfilledWithdrawalEvent,
  MadeFullRequest as MadeFullRequestEvent,
  MadeTemplateRequest as MadeTemplateRequestEvent,
  RequestedWithdrawal as RequestedWithdrawalEvent,
  SetSponsorshipStatus as SetSponsorshipStatusEvent,
} from '../generated/AirnodeRrpV0/AirnodeRrpV0';
import {
  CreatedTemplate,
  FailedRequest,
  FulfilledRequest,
  FulfilledWithdrawal,
  MadeFullRequest,
  MadeTemplateRequest,
  RequestedWithdrawal,
  SetSponsorshipStatus,
} from '../generated/schema';

export function handleCreatedTemplate(event: CreatedTemplateEvent): void {
  let entity = new CreatedTemplate(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.templateId = event.params.templateId;
  entity.airnode = event.params.airnode;
  entity.endpointId = event.params.endpointId;
  entity.parameters = event.params.parameters;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleFailedRequest(event: FailedRequestEvent): void {
  let entity = new FailedRequest(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.airnode = event.params.airnode;
  entity.requestId = event.params.requestId;
  entity.errorMessage = event.params.errorMessage;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleFulfilledRequest(event: FulfilledRequestEvent): void {
  let entity = new FulfilledRequest(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.airnode = event.params.airnode;
  entity.requestId = event.params.requestId;
  entity.data = event.params.data;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleFulfilledWithdrawal(event: FulfilledWithdrawalEvent): void {
  let entity = new FulfilledWithdrawal(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.airnode = event.params.airnode;
  entity.sponsor = event.params.sponsor;
  entity.withdrawalRequestId = event.params.withdrawalRequestId;
  entity.sponsorWallet = event.params.sponsorWallet;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleMadeFullRequest(event: MadeFullRequestEvent): void {
  let entity = new MadeFullRequest(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.airnode = event.params.airnode;
  entity.requestId = event.params.requestId;
  entity.requesterRequestCount = event.params.requesterRequestCount;
  entity.chainId = event.params.chainId;
  entity.requester = event.params.requester;
  entity.endpointId = event.params.endpointId;
  entity.sponsor = event.params.sponsor;
  entity.sponsorWallet = event.params.sponsorWallet;
  entity.fulfillAddress = event.params.fulfillAddress;
  entity.fulfillFunctionId = event.params.fulfillFunctionId;
  entity.parameters = event.params.parameters;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleMadeTemplateRequest(event: MadeTemplateRequestEvent): void {
  let entity = new MadeTemplateRequest(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.airnode = event.params.airnode;
  entity.requestId = event.params.requestId;
  entity.requesterRequestCount = event.params.requesterRequestCount;
  entity.chainId = event.params.chainId;
  entity.requester = event.params.requester;
  entity.templateId = event.params.templateId;
  entity.sponsor = event.params.sponsor;
  entity.sponsorWallet = event.params.sponsorWallet;
  entity.fulfillAddress = event.params.fulfillAddress;
  entity.fulfillFunctionId = event.params.fulfillFunctionId;
  entity.parameters = event.params.parameters;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRequestedWithdrawal(event: RequestedWithdrawalEvent): void {
  let entity = new RequestedWithdrawal(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.airnode = event.params.airnode;
  entity.sponsor = event.params.sponsor;
  entity.withdrawalRequestId = event.params.withdrawalRequestId;
  entity.sponsorWallet = event.params.sponsorWallet;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSetSponsorshipStatus(event: SetSponsorshipStatusEvent): void {
  let entity = new SetSponsorshipStatus(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.sponsor = event.params.sponsor;
  entity.requester = event.params.requester;
  entity.sponsorshipStatus = event.params.sponsorshipStatus;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
