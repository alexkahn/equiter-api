Equiter Api
============

This is the start of an experiment with Hapi.js and Redis that serves
stock symbols and provides an autocomplete scaffold with sorted sets in
redis.

## Preliminaries

Have a working installation of:
* git
* node.js (5.0.0)
* redis (3.x.x)

## Installation

Clone the repository to somewhere you like.

Initialize your settings by copying the env.sh.template file like so:

```sh
cp env.sh.template env.sh
```

Now, the magic!

When you npm install (as is tradition), equiter will sneakily run a
script after the dependencies have been installed that loads up redis
with the data needed to fulfill the API contract (as is).

If you're curious, you can check it out: it lives inside bin/load.

## Develop/ Enjoy locally

Just run ```node index.js```.

If you run node-foreman, you can just use that because there's a
Procfile!
