# Nx - Qwik - Builder - Wallaby

setup:
- nx
- qwik
- builder
- express build target

to repoduce:
- add builder api token to `routes/index.tsx`
- verify `npx nx run qwik:preview` or `npx nx run qwik:deploy-express` is running properly in root
- visit localhost:4173 and observe `Cannot resolve symbol s_2mDTEvIbi0s in ...`
