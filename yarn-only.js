/**
 * Do NOT allow using `npm` as package manager.
 */
try {
  const packageJSON = require(process.env.INIT_CWD + "/package.json");
  const packageName = packageJSON && packageJSON.name;

  const isDevelopment = packageName === "@savchenko91/rc-route-constant";

  if (isDevelopment && process.env.npm_execpath.indexOf("yarn") === -1) {
    console.error("You must use Yarn to install dependencies:");
    console.error("  $ yarn install");
    process.exit(1);
  }
} catch {}
