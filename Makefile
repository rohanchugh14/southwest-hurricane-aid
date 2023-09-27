m ?= "Default commit message"
# get git status
status:
	git branch
	git remote -v
	git status

# download files from the Collatz code repo
pull:
	git pull
	npm i
	git status

# upload files to the Collatz code repo
push:
	git add .
	git commit -m "$(m)"
	git push
	git status



# remove node-related files from build and packages
clean:
	rm -f  build
	rm -rf node_modules
	npm cache clean --force
	npm install
