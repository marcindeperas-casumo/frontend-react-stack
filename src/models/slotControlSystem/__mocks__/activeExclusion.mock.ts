import type { ExclusionType } from "Models/slotControlSystem";

const now = 1576065735032;

const mock: ExclusionType = {
  id: "123-456-789",
  expiringTime: now + 1000 * 60 * 9,
  startedTime: now - 1000,
};

export default mock;
