import { listen } from './app';

const PORT = process.env.PORT || 3004;

listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});