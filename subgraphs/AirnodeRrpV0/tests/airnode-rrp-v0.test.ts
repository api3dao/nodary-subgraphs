import { assert, describe, test, clearStore, beforeAll, afterAll } from 'matchstick-as/assembly/index';
import { Bytes, Address, BigInt } from '@graphprotocol/graph-ts';
import { CreatedTemplate } from '../generated/schema';
import { CreatedTemplate as CreatedTemplateEvent } from '../generated/AirnodeRrpV0/AirnodeRrpV0';
import { handleCreatedTemplate } from '../src/airnode-rrp-v0';
import { createCreatedTemplateEvent } from './airnode-rrp-v0-utils';

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe('Describe entity assertions', () => {
  beforeAll(() => {
    let templateId = Bytes.fromI32(1234567890);
    let airnode = Address.fromString('0x0000000000000000000000000000000000000001');
    let endpointId = Bytes.fromI32(1234567890);
    let parameters = Bytes.fromI32(1234567890);
    let newCreatedTemplateEvent = createCreatedTemplateEvent(templateId, airnode, endpointId, parameters);
    handleCreatedTemplate(newCreatedTemplateEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test('CreatedTemplate created and stored', () => {
    assert.entityCount('CreatedTemplate', 1);

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals('CreatedTemplate', '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1', 'templateId', '1234567890');
    assert.fieldEquals(
      'CreatedTemplate',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
      'airnode',
      '0x0000000000000000000000000000000000000001'
    );
    assert.fieldEquals('CreatedTemplate', '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1', 'endpointId', '1234567890');
    assert.fieldEquals('CreatedTemplate', '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1', 'parameters', '1234567890');

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});
