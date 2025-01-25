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

paw() {
    pnpm add "$1" --filter "$2" --workspace
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
    // if (currentContent.includes('alias p="pnpm"')) {
    //     console.log('Aliases and functions already exist in .zshrc. Skipping...');
    //     return;
    // }

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
