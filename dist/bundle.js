Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoCpfileWebpackPlugin = void 0;
const tslib_1 = require("tslib");
const node_ssh_1 = require("node-ssh");
class AutoCpfileWebpackPlugin {
    constructor(userOptions) {
        this.options = userOptions;
        this.ssh = new node_ssh_1.NodeSSH();
    }
    apply(compiler) {
        // console.log(compiler, "哈哈哈哈哈");
        // 等到结果输出到output中之后
        compiler.hooks.afterEmit.tapAsync("autoDeploy", (compilation, callback) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            // 实现我们的需求
            // 1. 得到输出目录
            const outputOptions = compilation.outputOptions;
            const outputPath = outputOptions.path;
            // 2. 通过SSH连接服务器
            yield this.connectServer();
            // 3. 删除原有文件夹中的内容
            const remotePath = this.options.path;
            try {
                this.ssh.execCommand(`rm -rf ${remotePath}/*`);
            }
            catch (error) {
                console.log("请检查服务器文件路径是否存在～");
            }
            // 4. 将打包后的文件上传到目标文件夹
            yield this.uploadFiles(outputPath, remotePath);
            // 5. 关闭ssh
            this.ssh.dispose();
            // final. 必须调用这个，才会去执行后面的钩子
            callback();
        }));
    }
    connectServer() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ssh.connect(this.options);
                console.log("服务器连接成功~");
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    uploadFiles(localPath, remotePath) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const status = yield this.ssh.putDirectory(localPath, remotePath, {
                recursive: true,
                concurrency: 10,
            });
            if (status) {
                console.log("文件上传成功~");
            }
            else {
                console.log("文件上传失败，稍后再试～");
            }
        });
    }
}
exports.AutoCpfileWebpackPlugin = AutoCpfileWebpackPlugin;
