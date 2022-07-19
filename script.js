/*
    @param {string} str - string to be converted
 */
// 更新package.json文件的版本号
import inquirer from "inquirer";
import { exec } from "child_process";
function index() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'version',
      message: '🚀🚀 请选择更新类型',
      choices: [
        { name: '补丁(patch)', value: 'patch' },
        { name: '次要(minor)', value: 'minor' },
        { name: '主要(major)', value: 'major' },
      ],
    }
  ]).then(answers => {
    console.log(JSON.stringify(answers));
    updatePackageJson(JSON.stringify(answers.version));
  });
}

// 更新package.json文件的版本号
function updatePackageJson(version) {
  var cmd = `yarn version --${version} --no-git-tag-version`;
  exec(cmd, function (err, stdout, stderr) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(stdout);
    prePublish();
  });
}

// 将本次commit插入上一条commit消息中
function prePublish() {
    var cmd = 'git log -1 --pretty=%B';
    exec(cmd, function (err, stdout, stderr) {
        if (err) {
            console.log(err);
            return;
        }
        var msg = stdout.trim();
        var newMsg = '\n\n' + msg;
        var cmd = 'git add . && git commit --amend -m "' + newMsg + '"';
        exec(cmd, function (err, stdout, stderr) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(stdout);
        });
    });
}
index();
