
# Set hackpov.com in your hosts file, or edit with a real host
role :normal, "root@184.106.67.56"

# keeps my environement around!
set :sudo, "sudo -E"

default_run_options[:pty] = true

task :deploy, :roles => :normal do
  run "cd /var/www/hackpov && git fetch && git reset --hard origin/master"
  run "rm -f /etc/init.d/hackpov && cp /var/www/hackpov/init.d /etc/init.d/hackpov"
  run "/var/www/hackpov/update"
  run "service hackpov restart"
end
