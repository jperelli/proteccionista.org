# proteccionista.org

# develop

    apt install vagrant
    apt install ruby-dev libffi-dev gcc zlib1g-dev lxc redir
    vagrant plugin install vagrant-lxc

    vagrant up --provider=lxc
    vagrant ssh -c "cd /app/repo/ && sudo PORT=80 ENV=development NODE_ENV="development" nodemon /app/repo/bin/www"
    
    # debug mode
    vagrant ssh -c "cd /app/repo/ && sudo PORT=80 ENV=development NODE_ENV="development" nodemon --inspect /app/repo/bin/www"
    

# license

GNU AGPL
