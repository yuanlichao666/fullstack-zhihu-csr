# 自动为 zsh 配置 pnpm 别名和函数

本文档说明如何使用 Node.js 脚本自动为 zsh 配置 pnpm 的别名和函数，同时实现自动加载新配置。

## 功能说明

1. 自动向 `~/.zshrc` 文件追加以下内容：
    ```bash
    # PNPM aliases and functions
    alias p="pnpm"
    alias pr="pnpm -r exec"
    alias pf="pnpm --filter"

    pa() {
        pnpm add "$1" --filter "$2"
    }
    ```
2. 修改完 `~/.zshrc` 文件后，脚本会自动执行 `source ~/.zshrc` 以重新加载配置。
3. 如果自动加载失败，提示用户手动运行 `source ~/.zshrc`。

## 使用方法

### 前置要求
- 确保已安装 Node.js 和 pnpm。
- 使用 zsh 作为默认 shell。

### 脚本代码
以下是完整的 Node.js 脚本代码：

```javascript
const fs = require('fs');
const os = require('os');
const path = require('path');
const { exec } = require('child_process');

// Zsh 配置文件路径
const zshrcPath = path.join(os.homedir(), '.zshrc');

// 要添加的内容
const aliases = `
# PNPM aliases and functions
alias p="pnpm"
alias pr="pnpm -r exec"
alias pf="pnpm --filter"

pa() {
    pnpm add "$1" --filter "$2"
}
`;

function appendToZshrc(content) {
    // 检查 zshrc 文件是否存在
    if (!fs.existsSync(zshrcPath)) {
        console.error(`Error: ${zshrcPath} not found!`);
        return;
    }

    // 读取文件内容
    const currentContent = fs.readFileSync(zshrcPath, 'utf8');

    // 检查是否已经存在相同的别名或函数
    if (currentContent.includes('alias p="pnpm"')) {
        console.log('Aliases and functions already exist in .zshrc. Skipping...');
        return;
    }

    // 追加新内容到 zshrc
    fs.appendFileSync(zshrcPath, `\n${aliases}\n`);
    console.log('Aliases and functions added to .zshrc successfully!');

    // 自动执行 source 命令
    exec('source ~/.zshrc', (error, stdout, stderr) => {
        if (error) {
            console.error(`Failed to source ~/.zshrc: ${error.message}`);
            console.log('Please run "source ~/.zshrc" manually.');
            return;
        }
        console.log('~/.zshrc reloaded successfully!');
    });
}

// 执行脚本
appendToZshrc(aliases);
```

### 执行步骤

1. 创建一个新文件，例如 `setup-zsh-aliases.js`，并将上述代码粘贴到文件中。
2. 在终端中运行以下命令：
    ```bash
    node setup-zsh-aliases.js
    ```
3. 如果脚本提示 `~/.zshrc reloaded successfully!`，说明配置已成功加载。
4. 如果加载失败，请手动运行：
    ```bash
    source ~/.zshrc
    ```

### 脚本输出示例

#### 配置已成功加载：
```plaintext
Aliases and functions added to .zshrc successfully!
~/.zshrc reloaded successfully!
```

#### 配置已存在：
```plaintext
Aliases and functions already exist in .zshrc. Skipping...
```

#### 加载失败：
```plaintext
Aliases and functions added to .zshrc successfully!
Failed to source ~/.zshrc: [错误信息]
Please run "source ~/.zshrc" manually.
```

## 注意事项

1. 确保 `~/.zshrc` 文件存在并具有写权限。
2. 如果使用的是其他 shell（如 bash），请修改脚本中的 `~/.zshrc` 为对应的配置文件路径，例如 `~/.bashrc`。
3. 如果 `pnpm` 尚未安装，请先运行：
    ```bash
    npm install -g pnpm
    ```

## 总结
此脚本通过 Node.js 自动配置 zsh 的 pnpm 别名和函数，并尝试重新加载配置。它可以减少手动操作，提高开发效率。

