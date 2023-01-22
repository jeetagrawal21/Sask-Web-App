### SSH Key
If you do not have an ssh key setup use the following command to generate one in a terminal window:

`ssh-keygen -t ed25519 -a 100`

Then, follow the prompts taking the defaults for everything by pressing enter, but setting a password for the key if you wish to have one.

Then, follow the instructions [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) to add that key to your github account.

# GIT
## GIT Clone
Copy the ssh link from the repo and use it in the following command in a terminal window that is open to where you want the folder of the git repo to be placed.

Note: This command does create a subfolder that contains the repo so you do not need to create an additional one.

`git clone <sshURL>`

## Cheat Sheet
Go [here](https://education.github.com/git-cheat-sheet-education.pdf) for a git command cheat sheet. 


# Docker
## Docker Desktop Setup
To install Docker Desktop to your computer:
- For Windows go [here](https://docs.docker.com/desktop/install/windows-install/)
- For MacOS go [here](https://docs.docker.com/desktop/install/mac-install/)
- For Linux go [here](https://docs.docker.com/desktop/install/linux-install/)

Make sure to choose the WSL2 backend when going through the installation for Windows. 

### WSL2 Error
**Note:** After you finish installing to Windows and start the application, you may get an error message that says you need to install WSL2 manually. <br>
If this is the case, go to the link in the error message and follow the steps on the webpage starting at the step it leads you to and ending before it tells you to install a linux disto to your PC

### Permissions Error
In order to use Docker on your computer, the user you are using will have to either be an administrator, or be in a user group called "docker-users". <br>
If you get an error related to permissions the following links should have your solution:
- For Windows go [here](https://learn.microsoft.com/en-us/visualstudio/containers/troubleshooting-docker-errors?view=vs-2022#docker-users-group)

### Other Errors
If you have an issue that is not covered above you can either ping me in the discord server (Riley Chometa), or you can use one of the following resources:
- [Microsoft Learn Docker Troubleshooting Guide](https://learn.microsoft.com/en-us/visualstudio/containers/troubleshooting-docker-errors?view=vs-2022)
- [ChatGPT](chat.openai.com)
- [Google](google.ca)

## Docker Cheat Sheet
### Starting Containers
From the root directory of the project use the following command in a terminal window:

`docker compose up`

If you run into issues try forcing it to rebuild the image like this:

`docker compose up --build`

or 

`docker compose build --no-cache`

to force it to build without using any cached data.

#### No Daemon
If you wish to start the container without attaching the terminal window to the containers log output then you can to the `-d` option when using `docker compose up`.


# VSCode Extensions
## Docker (Microsoft)
The Docker extension will be used to help manage the Docker containers on your PC. It is essentially a replacement for Docker Desktop that is built into VSCode.<br>
You can find it by searching for "Docker" in the extensions tab of VSCode or by going [here](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker).

## Better Comments (Aaron Bond)
The Better Comments extention will give us more robust commenting options. You can read the extensions description on its page to see everything you can do with it. <br>
You can find it by searching for "Better Extensions" in the extensions tab of VSCode or by going [here](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker).

## ESLint (Microsoft)
The ESLint extension will allow us to check our code for possible errors by linting our code on the frontend and backend containers.<br>
You can find it by searching for "ESLint" in the extensions tab of VSCode or by going [here](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

## Dev Containers (Microsoft)
The Dev Containers extension will allow us to run Docker containers as a full featured development environment.<br>
You can find it by searching for "ESLint" in the extensions tab of VSCode or by going [here](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).


# Get Started Developing
1. Clone the repo down to where you want git to put the folder containing the project using the following command.<br>
`git clone git@github.com:UniversityOfSaskatchewanCMPT371/term-project-2023-team-2.git`<br>
**Note:** If you do not have your SSH key setup go up to the [SSH Key](###-SSH-Key) section above.
2. next, open a terminal in the root directory of the project (this can also be a terminal thats in VSCode)
3. Enter the command `docker compose up` in the terminal and watch the outputs to ensure everything starts up correctly. 
<br>**Note:** If you see any errors, take note of what they say and either message or ping me (Riley Chometa) in the Discord server to let me know. <br>
You can stop the containers by pressing `ctrl+c` in while having the terminal window selected.
4. Using the "Docker" extension, attach to the 
