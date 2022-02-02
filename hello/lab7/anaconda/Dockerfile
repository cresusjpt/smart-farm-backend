# Set the base image using miniconda 
FROM continuumio/anaconda3

# Set environmental variable(s)
ENV ACCEPT_INTEL_PYTHON_EULA=yes

RUN conda install jupyter -y --quiet && \
    mkdir -p /opt/notebooks

# Set working directory 
WORKDIR /opt/notebooks

EXPOSE 8888

CMD jupyter notebook --notebook-dir=/opt/notebooks --port=8888 --no-browser --ip=0.0.0.0 --allow-root