import c from 'chokidar';
import fs from 'node:fs';
import prisma from '@/common/utils/prisma';
import { env } from '@/common/utils/envConfig';
import { EItemTrackingStatus, sdaTypes } from '@/common/types/sdaTypes';

export function checkFTP() {
  c.watch(env.DIR_PATH, {
    persistent: true,
    ignoreInitial: true, // Ignore files already present when starting
    depth: 0, // Watch only the top-level directory
  }).on('add', (path) => {
    console.log(`File ${path} has been added`);
    fs.readFile(path, 'utf-8', async (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      const businessName = data.substring(0, 40).trim();
      const progressiveId = data.substring(521, 536).trim();

      prisma.itemTracking
        .create({
          data: {
            businessName,
            progressiveId,
            status: sdaTypes[EItemTrackingStatus.SHIPPED],
          },
        })
        .then(() => {
          console.log('Item tracking created');
        })
        .catch((e) => {
          console.error(e);
        });
    });
  });
}
