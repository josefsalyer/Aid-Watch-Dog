#!/bin/bash
#
# Init file for hackpov
# 
# chkconfig: - 98 02
# description: hackpov
#
# processname: hackpov
# pidfile: /var/run/hackpov.pid
# Short-Description: Hack Pov

# Source function library.
. /etc/init.d/functions

### Default variables
name="hackpov"
prog="/var/www/hackpov/run"


# Check if requirements are met
[ -x "$prog" ] || exit 1


RETVAL=0

start() {
echo $"Starting $name"
daemon $prog
RETVAL=$?
echo -n $"Started: "
echo
return $RETVAL
}

stop() {
echo -n $"Shutting down $name: "
killproc -p /var/run/$name.pid
RETVAL=$?
echo
return $RETVAL
}

restart() {
stop
start
}

reload() {
echo -n $"Reloading $prog: "
monit -c "$CONFIG" reload
RETVAL=$?
echo
return $RETVAL
}

case "$1" in
  start)
start
;;
  stop)
stop
;;
  restart)
restart
;;
  reload)
reload
;;
  condrestart)
[ -e /var/lock/subsys/$prog ] && restart
RETVAL=$?
;;
  status)
status $prog
RETVAL=$?
;;
  *)
echo $"Usage: $0 {start|stop|restart|reload|condrestart|status}"
RETVAL=1
esac

exit $RETVAL

