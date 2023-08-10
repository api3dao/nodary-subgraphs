import { assert, describe, test, clearStore, beforeAll, afterAll } from 'matchstick-as/assembly/index';
import { Bytes, BigInt, Address } from '@graphprotocol/graph-ts';
import { PaidForOrder } from '../generated/schema';
import { PaidForOrder as PaidForOrderEvent } from '../generated/OrderPayable/OrderPayable';
import { handlePaidForOrder } from '../src/order-payable';
import { createPaidForOrderEvent } from './order-payable-utils';

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe('Describe entity assertions', () => {
  beforeAll(() => {
    let orderId = Bytes.fromI32(1234567890);
    let expirationTimestamp = BigInt.fromI32(234);
    let orderSigner = Address.fromString('0x0000000000000000000000000000000000000001');
    let amount = BigInt.fromI32(234);
    let sender = Address.fromString('0x0000000000000000000000000000000000000001');
    let newPaidForOrderEvent = createPaidForOrderEvent(orderId, expirationTimestamp, orderSigner, amount, sender);
    handlePaidForOrder(newPaidForOrderEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test('PaidForOrder created and stored', () => {
    assert.entityCount('PaidForOrder', 1);

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals('PaidForOrder', '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1', 'orderId', '1234567890');
    assert.fieldEquals('PaidForOrder', '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1', 'expirationTimestamp', '234');
    assert.fieldEquals(
      'PaidForOrder',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
      'orderSigner',
      '0x0000000000000000000000000000000000000001'
    );
    assert.fieldEquals('PaidForOrder', '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1', 'amount', '234');
    assert.fieldEquals(
      'PaidForOrder',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
      'sender',
      '0x0000000000000000000000000000000000000001'
    );

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});
