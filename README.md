# Notes

```bash
# Install dependencies
pnpm install
# Run development server
VITE_API_URL=http://$(ip -json addr show wlp4s0 | jq -r '.[0].addr_info[0].local'):3000 pnpm dev --host
# Build assets
VITE_API_URL=$SITE_URL pnpm build
```
