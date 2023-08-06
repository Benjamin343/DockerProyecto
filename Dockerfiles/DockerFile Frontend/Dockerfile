FROM ubuntu:18.04
#FROM debian

RUN apt-get update && apt-get install -y curl git

#Install NVM
ENV NVM_DIR /root/.nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash

# Add NVM directory to PATH
ENV NODE_VERSION 12.14.1
ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Install Node.js using NVM
RUN bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use $NODE_VERSION && nvm alias default $NODE_VERSION"

# Install necessary dependencies
RUN apt-get install -y python-minimal

RUN git clone https://github.com/NormanVC/vecired-frontend &&\
    cd vecired-frontend && npm install && npm install -g cordova && npm install -g @ionic/cli@7.1.1


WORKDIR /vecired-frontend

EXPOSE 5000
ENTRYPOINT ["ionic", "serve"]