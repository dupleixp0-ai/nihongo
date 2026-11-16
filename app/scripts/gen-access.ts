import { writeFileSync } from "node:fs";
import { render } from "./access-derive";
writeFileSync("src/data/access-ids.ts", render());
console.log("src/data/access-ids.ts écrit");
