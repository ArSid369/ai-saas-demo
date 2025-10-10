import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$queryRaw`SELECT 1`;
  console.log('Connected to NeonDB:', result);
}

main().catch(e => {
  console.error('Connection failed:', e);
});
