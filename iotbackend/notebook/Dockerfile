# Set the base image using miniconda 
FROM continuumio/anaconda3

# Set environmental variable(s)
ENV ACCEPT_INTEL_PYTHON_EULA=yes

RUN conda install jupyter -y --quiet && \
    mkdir -p /opt/notebooks

# Set working directory 
WORKDIR /opt/notebooks
COPY conf/.jupyter /root/.jupyter
COPY jupyter_run.sh /

EXPOSE 8888

#CMD ["bash", "jupyter_run.sh"]
#CMD [ "ls", "-l" ]
CMD jupyter notebook --IPKernelApp.pylab='inline' --NotebookApp.token='' --NotebookApp.password='' --notebook-dir=/opt/notebooks --port=8888 --no-browser --ip=0.0.0.0 --allow-root
