import { env } from "./src/env.js";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import("next").NextConfig} */
const config = {
  images: {
    dangerouslyAllowSVG: true,
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: env.UPLOADTHING_HOST,
      },
      // TODO: remove it
      {
        protocol: 'https',
        hostname: 'f7cxh5ao0u.ufs.sh',
      }
    ],
  },
};

export default withNextIntl(config);
