import { NodeSSH } from "node-ssh";
import type { UserOptions } from "./types/auto-deploy";

class AutoCpfileWebpackPlugin {
  public options: UserOptions;
  public ssh: NodeSSH;
  constructor(userOptions: UserOptions) {
    this.options = userOptions;
    this.ssh = new NodeSSH();
  }

  apply(compiler: any) {
    // console.log(compiler, "哈哈哈哈哈");
    // 等到结果输出到output中之后
    compiler.hooks.afterEmit.tapAsync(
      "autoDeploy",
      async (compilation: any, callback: any) => {
        // 实现我们的需求
        // 1. 得到输出目录
        const outputOptions = compilation.outputOptions;
        const outputPath = outputOptions.path;

        // 2. 通过SSH连接服务器
        await this.connectServer();

        // 3. 删除原有文件夹中的内容
        const remotePath = this.options.path;
        try {
          this.ssh.execCommand(`rm -rf ${remotePath}/*`);
        } catch (error) {
          console.log("请检查服务器文件路径是否存在～");
        }

        // 4. 将打包后的文件上传到目标文件夹
        await this.uploadFiles(outputPath, remotePath);

        // 5. 关闭ssh
        this.ssh.dispose();

        // final. 必须调用这个，才会去执行后面的钩子
        callback();
      }
    );
  }
  async connectServer() {
    try {
      await this.ssh.connect(this.options);
      console.log("服务器连接成功~");
    } catch (error) {
      console.error(error);
    }
  }
  async uploadFiles(localPath: string, remotePath: string) {
    const status = await this.ssh.putDirectory(localPath, remotePath, {
      recursive: true,
      concurrency: 10,
    });

    if (status) {
      console.log("文件上传成功~");
    } else {
      console.log("文件上传失败，稍后再试～");
    }
  }
}

export { AutoCpfileWebpackPlugin };
