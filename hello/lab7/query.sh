#!/bin/bash

HOST="localhost"

#curl -XPOST 'http://localhost:8086/query' --data-urlencode 'q=CREATE DATABASE "db"'

#curl -sl -I localhost:8086/ping

curl -XPOST 'http://localhost:8086/query' --data-urlencode 'q=CREATE DATABASE "mydb"'