interface Console {
  exception: (text: string, ex: Error) => void;
}

Object.assign(console, {
  exception: (text: string, ex: Error) => {
    let msg: string = text + "\n";
    if (ex?.stack) {
      msg += ex.stack + "\n";
    }
    console.error(msg);
  }
});

// These are half-baked replacements for methods that don't exist in Screeps
Object.assign(console, {
  warn: (text: string) => console.log(`<span style="color: darkorange">[warn]</span> ${text}`),
  info: (text: string) => console.log(`'<span style="color: aqua">[info]</span> ${text}`),
  error: (text: string) => console.log(`<span style="color: red">[error]</span> ${text}`)
});
