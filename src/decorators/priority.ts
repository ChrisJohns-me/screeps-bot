/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
type PriorityLevel = "HIGH" | "MEDIUM" | "LOW";

export const Priority = (priorityLevel: PriorityLevel): any => (
  target: Record<string, unknown>,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const cpuUsed = Game.cpu.getUsed();
  const cpuLimit = Game.cpu.tickLimit;
  const cpuPerc = cpuUsed / cpuLimit;

  if ((priorityLevel === "LOW" && cpuPerc >= 0.25) || (priorityLevel === "MEDIUM" && cpuPerc >= 0.5)) {
    descriptor.value = () => undefined;
    const parent: string = target?.constructor?.name;
    console.log(`[CPU Limit] Terminated "${parent}.${propertyKey}" (${priorityLevel})`);
  }
};
