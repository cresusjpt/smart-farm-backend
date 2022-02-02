#!/bin/bash

# host and default port
#the address where is run the nodejs app (default localhost)
HOST="localhost"
PORT=1337

function usage {
    echo "Usage: Simulator.sh [-h HOST] [-p PORT]"
    exit 1
}

# Parse arguments
# We can pass in option -h for host and -p for port while running the file
while getopts h:p: FLAG; do
  case $FLAG in
    h)
      HOST=$OPTARG
      ;;
    p)
      PORT=$OPTARG
      ;;
    \?)
      usage
      ;;
  esac
done

# Generate and send random data
#data format:
#   {
#    device_id: 345,
#    ts: "2017-03-01T23:12:52Z",
#    temp: 24,
#    soil: 25,
#    long: 46.12887,
#    lat: 46.68151
#   }

while(true); do
    # Current date
    d=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

    # Random temperature between 20 and 34°C
    temp=$(( ( RANDOM % 15 )  + 20 ))
    # Random soil temperature between 20 and 34°C
    soil=$(( (RANDOM % 15  )  +20  ))

    # Send data to API
    curl -XPOST -H "Content-Type: application/json" -d '{"device_id": 123, "type": "temp", "ts":"'$d'", "temp": '$temp', "soil": '$soil', "long": "46.12887","lat": "46.68151" }' http://$HOST:$PORT/data

    sleep 1

done