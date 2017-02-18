# proteccionista.org

# develop

    vagrant up --provider=lxc
    vagrant ssh -c "cd /app/repo/ && sudo PORT=80 ENV=development NODE_ENV="development" nodemon /app/repo/bin/www"
    
    # debug mode
    vagrant ssh -c "cd /app/repo/ && sudo PORT=80 ENV=development NODE_ENV="development" nodemon --inspect /app/repo/bin/www"
    

# license

GNU AGPL
