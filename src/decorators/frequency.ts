/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
enum Amount {
  CONSTANTLY = 1, // Every tick
  FREQUENTLY = 60,
  REGULARLY = 900,
  PERIODICALLY = 3600,
  OCCASIONALLY = 86400,
  RARELY = 604800,
  SELDOM = 18144000,
  INTERMITTENT = Infinity, // On bootstrap TODO
  PERMANENTLY = Infinity // Once TODO
}

type InputAmount =
  | "CONSTANTLY"
  | "FREQUENTLY"
  | "REGULARLY"
  | "PERIODICALLY"
  | "OCCASIONALLY"
  | "RARELY"
  | "SELDOM"
  | "INTERMITTENT"
  | "PERMANENTLY";

export const Frequency = function (inputAmount: InputAmount) {
  return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor): void {
    const originalFn = descriptor.value as (...args: any[]) => void;

    descriptor.value = function (...args: any[]) {
      const amount = Amount[inputAmount];
      const canRun = Game.time % amount === 0;
      const firstBoot = global.firstBoot;

      if (canRun || firstBoot) {
        // const parent: string = (target as any)?.constructor?.name;
        // console.log(`[Frequency::${inputAmount}] Running "${parent}.${propertyKey}"`);
        return originalFn.apply(this, args);
      }
    };
  };
};
