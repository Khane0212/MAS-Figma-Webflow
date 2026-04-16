const fs = require("fs");
const path = require("path");
const dir = __dirname;
const html = fs.readFileSync(path.join(dir, "webflow-styleguide-body.html"), "utf8").trim();
const css = fs.readFileSync(path.join(dir, "webflow-styleguide-scoped.css"), "utf8");
const payload = {
  siteId: "69da69c0603d5b8c1cbd992e",
  actions: [
    {
      build_label: "style-guide-full",
      parent_element_id: {
        component: "69db254932a57eba273f5abc",
        element: "69db254932a57eba273f5ac2",
      },
      creation_position: "append",
      html,
      css,
      get_children_info: true,
      children_depth: 1,
    },
  ],
  context:
    "Inserting Style Guide WHTML on dedicated page with scoped CSS tokens utilities and basket class reference for Webflow site.",
};
const outPath = path.join(dir, "whtml-payload.json");
fs.writeFileSync(outPath, JSON.stringify(payload), "utf8");
process.stdout.write("Wrote " + outPath + "\n");
