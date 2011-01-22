# Requires: setting environment variable APIWEB_PORT
echo "Starting app in production on port 80 and redirecting output to /var/log/app.log"
NODE_ENV=production /usr/local/bin/node $(dirname 0)/testapp.js 80 >> /var/log/app.log 2>&1 &
echo $! > /var/run/app.pid # store the pid, because the stupid init.d script can't do it right
