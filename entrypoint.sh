#!/bin/sh
CMD=${1:-run}
flask db upgrade
flask "${CMD}"
