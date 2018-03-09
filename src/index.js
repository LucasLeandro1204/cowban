import APP from 'app';
import Http from 'http';
import Config from 'config';

const PORT = Config.get('server.port');
const server = Http.createServer(APP);

server.listen(PORT, () => console.info(`Running in ${PORT}`));

export default APP;
