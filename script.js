/*
    @param {string} str - string to be converted
 */
// 将本次commit插入上一条commit消息中
function prePublish() {
    var exec = require('child_process').exec;
    var cmd = 'git log -1 --pretty=%B';
    exec(cmd, function (err, stdout, stderr) {
        if (err) {
            console.log(err);
            return;
        }
        var msg = stdout.trim();
        var newMsg = '\n\n' + msg;
        var cmd = 'git commit --amend -m "' + newMsg + '"';
        exec(cmd, function (err, stdout, stderr) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(stdout);
        });
    });
}
prePublish()
