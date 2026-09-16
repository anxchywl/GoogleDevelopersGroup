FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY next.config.ts tsconfig.json postcss.config.mjs ./
COPY src ./src
COPY public ./public
COPY scripts/build-security.mjs scripts/build-assets.mjs ./scripts/
COPY LICENSE ./LICENSE
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM caddy:2-alpine
# the binary ships with cap_net_bind_service, which cannot be granted under cap-drop ALL and no-new-privileges
RUN apk add --no-cache libcap-utils && setcap -r /usr/bin/caddy && apk del libcap-utils
COPY --from=build /app/out /srv
COPY --from=build /app/security/headers.caddy /etc/caddy/headers.caddy
COPY docker/Caddyfile /etc/caddy/Caddyfile
ENV XDG_CONFIG_HOME=/tmp/config XDG_DATA_HOME=/tmp/data
USER 10001:10001
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s CMD wget -q -O /dev/null http://127.0.0.1:8080/ || exit 1

