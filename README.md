# Postgres Schema Restorer

CLI Tool to simplify restoring schema into local database.

It will look for backup files in your ~/Documents and ~/Downloads directory and let you select which one to restore.

It will then drop the existing schemas and restore the backup

Stores the database credentials into a local json to simplify the use of the tool.

![./assets/demo.gif](./assets/demo.gif)

## Inspiration

Fully inspired (to not say copy/pasted) from this post by [Lukas White](https://www.sitepoint.com/author/lwhite)
and [James Hibbard](https://www.sitepoint.com/author/jhibbard): 
[Build a JavaScript Command Line Interface (CLI) with Node.js](https://www.sitepoint.com/javascript-command-line-interface-cli-node-js/)

It's a common task in my current position to have to download and restore client schema on my local postgres to debug it 
so reading their post inspired me to build this small tool. 

## How to install

`npm i -g`: this will install the `pg-schema-restorer` globally. 

Alternatively you can simply install it locally with `npm i` and run it inside the directory.

## How to use

If installed globally just run in the command prompt:

`> pg-schema-restorer`

Or else `> npm start`

## Help needed

Haven't tested it on MacOS or Windows.
