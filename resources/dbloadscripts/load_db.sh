#!/bin/bash

SCHEMALOAD=/home/josh/2d20-fallout-character-builder/db_schema.sql
SCRIPTDIR='/home/josh/2d20-fallout-character-builder/resources/dbloadscripts'
DB=2d20fallout
SCHEMA='new_content'
SCRIPTS=$(cat $SCRIPTDIR/loadorder)

sudo -u postgres PGOPTIONS="--search_path=$SCHEMA" psql $DB -f $SCHEMALOAD
for script in $SCRIPTS
    do sudo -u postgres PGOPTIONS="--search_path=$SCHEMA" psql $DB -f $script
done