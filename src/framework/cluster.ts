import cluster from 'cluster';
import { cpus } from 'os';

const totalCPUs = cpus().length;

if (cluster.isPrimary) {
  console.warn(`Number of CPUs is ${totalCPUs}`);
  console.warn(`Master ${process.pid} is running`);
  const port = +(process.env.PORT || 5000);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    process.env.PORT = `${port + i}`;
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.warn(`worker ${worker.process.pid} died`);
    console.warn("Let's fork another worker!");
    cluster.fork();
  });
} else {
  (async () => await import('../index'))();
}