import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { SetDapiName } from "../generated/schema"
import { SetDapiName as SetDapiNameEvent } from "../generated/Api3ServerV1/Api3ServerV1"
import { handleSetDapiName } from "../src/api-3-server-v-1"
import { createSetDapiNameEvent } from "./api-3-server-v-1-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let dataFeedId = Bytes.fromI32(1234567890)
    let dapiName = Bytes.fromI32(1234567890)
    let sender = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newSetDapiNameEvent = createSetDapiNameEvent(
      dataFeedId,
      dapiName,
      sender
    )
    handleSetDapiName(newSetDapiNameEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("SetDapiName created and stored", () => {
    assert.entityCount("SetDapiName", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "SetDapiName",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "dataFeedId",
      "1234567890"
    )
    assert.fieldEquals(
      "SetDapiName",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "dapiName",
      "1234567890"
    )
    assert.fieldEquals(
      "SetDapiName",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "sender",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
