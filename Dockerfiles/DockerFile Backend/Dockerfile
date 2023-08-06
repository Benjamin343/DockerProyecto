FROM ubuntu:18.04

RUN apt-get update && apt-get install -y curl git

RUN curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

# Add NVM directory to PATH
ENV NVM_DIR /root/.nvm
RUN . "$NVM_DIR/nvm.sh"

# Install Node.js using NVM
ENV NODE_VERSION 16.14.2
RUN bash -c "source $NVM_DIR/nvm.sh && nvm install 16.14.2"

# Set default Node.js version
RUN bash -c "source $NVM_DIR/nvm.sh && nvm alias default 16.14.2"

# Set environment variables
ENV NODE_PATH $NVM_DIR/versions/node/v16.14.2/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v16.14.2/bin:$PATH

RUN git clone https://github.com/NormanVC/vecired &&\
    cd vecired && npm install

WORKDIR /vecired




EXPOSE 3000
ENTRYPOINT ["node","dist/"]


