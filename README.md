# Nx - Qwik - Wallaby

Wallaby is unable to run properly on this repo.

setup:
- nx
- qwik
- express build target

to repoduce:
- verify `npx vitest` is running properly in root
- verify express build properly using: `npx nx run qwik:deploy-express`
- verify wallaby is not running when using automatic config from repo root
