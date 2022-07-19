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

// 获取上一次commit提交的版本号
function getLastCommitVersion() {
  var cmd = 'git log -1 --pretty=%B';
  exec(cmd, function (err, stdout, stderr) {
    if (err) {
        console.log(err);
        return;
    }
    var msg = stdout.trim();
    var version = msg.split(' ')[1];
    var tagCmd = 'git tag "' + 'v' + version + '"';
    exec(tagCmd, function (err, stdout, stderr) {
        if (err) {
            console.log(err);
            return;
        }
        if (stdout) {
            console.log('版本号已存在，不能重复提交');
            return;
        }
        console.log('版本号不存在，可以提交');
    });
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
            getLastCommitVersion();
        });
    });
}
index();
