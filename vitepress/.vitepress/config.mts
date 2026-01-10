import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Arch Linux For CN Users",
  description:
    "An Website That aims helping Chinese Users who confused in ArchLinux.",
  // Ignore dead links during build so we can produce a build for testing.
  // Remove or set to false once links are fixed.
  ignoreDeadLinks: true,
});
