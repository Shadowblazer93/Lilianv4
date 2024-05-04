const cron = require('cron');
const https = require('https');

const backendUrl = 'rnd_DCjCGVPZgWaWXgZIPB0BcU32Epko';
const job = new cron.CronJob('*/14 * * * *', function() {
    console.log('Restarting server');

    https
        .createServer(function (req,res) {
            res.write('This thing working?');
            res.end();
        }).listen((8080))

        .get(backendUrl, (res) => {
            if (res.statusCode === 200) {
                console.log('Server restarted');
            } else {
                console.error('Failed to restart, status code : ' + res.statusCode);
            }
        })
        .on('error', (err) => {
            console.log('Error during retart : ' + err.message)
        })
})
module.exports = {job:job}