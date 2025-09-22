#!/bin/bash

SCHEMALOAD=/home/josh/2d20-fallout-character-builder/db_schema.sql
SCRIPTDIR='/home/josh/2d20-fallout-character-builder/resources/dbloadscripts'
DB=2d20fallout
SCHEMA='new_content'
SCRIPTS=$(cat $SCRIPTDIR/loadorder)

echo "building db schema"
sudo -u postgres PGOPTIONS="--search_path=$SCHEMA" psql -d $DB -f $SCHEMALOAD
for script in $SCRIPTS
    do
        echo $script
        sudo -u postgres PGOPTIONS="--search_path=$SCHEMA" psql -d $DB -f $script
    done