import { NodeSSH } from 'node-ssh';

interface UserOptions {
    host: string;
    username: string;
    password: string;
    path: string;
}

declare class AutoCpfileWebpackPlugin {
    options: UserOptions;
    ssh: NodeSSH;
    constructor(userOptions: UserOptions);
    apply(compiler: any): void;
    connectServer(): Promise<void>;
    uploadFiles(localPath: string, remotePath: string): Promise<void>;
}

export { AutoCpfileWebpackPlugin };
