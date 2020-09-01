/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
enum Level {
  LOW = 0.25,
  MEDIUM = 0.5,
  HIGH = Infinity
}

type InputLevel = "LOW" | "MEDIUM" | "HIGH";

export const Priority = function (inputLevel: InputLevel) {
  return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor): void {
    const originalFn = descriptor.value as (...args: any[]) => void;

    descriptor.value = function (...args: any[]) {
      const maxCpu = Level[inputLevel];
      const cpuUsed = Game.cpu.getUsed();
      const cpuLimit = Game.cpu.tickLimit;
      const cpuPerc = (cpuUsed / cpuLimit) * 100;
      const canRun = maxCpu > cpuPerc;
      const firstBoot = global.firstBoot;

      if (canRun || firstBoot) {
        return originalFn.apply(this, args);
      } else {
        const parent: string = (target as any)?.constructor?.name;
        console.log(`[CPU Limit::${inputLevel}] Terminated "${parent}.${propertyKey}"`);
      }
    };
  };
};
