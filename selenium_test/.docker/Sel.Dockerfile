FROM selenium/standalone-chrome 

USER root


# Run update and install required packages
RUN apt-get update && \
    apt-get install -y python3-pip

# Install selenium
RUN pip3 install selenium

