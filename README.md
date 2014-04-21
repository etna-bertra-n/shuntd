# shuntd

New shunt daemon.

This povides an API aggregator for some popular torrent clients, on Linux, Mac OS X and Windows.

## Why?

Starting afresh because previous one is still in infancy and badly thought out.

README is still in progress but should serve as a starting point.

## Schema

#### Server

```json
{
	"identifier": "Home Transmision",
	"url": "/transmission/rpc",
	"host": "localhost",
	"port": 9091,
	"username": "shunt",
	"password": "secret",
	"type": "Transmission",
}
```

#### User

```json
{
	"username": "etna-bertra-n",
	"password": "secret",
}
```

## Design

* Using Node.js + CoffeeScript.
* User is unique and used for authentication purpose.
* Servers are a list of possible torrent client backends.
Backend is identified by the Sever type field. (ie. Transmission means we use node-transmission)
* Torrrents aren't cached by the daemon to avoid complexity. Clients should refresh their data cache themself.
* The datastore would be nedb.
* The API router could be provided by Express, restify, or Express + nedb-restify.

## Routes

### Servers

#### Server

```json
{
	"identifier": "Home Transmision",
	"url": "/transmission/rpc",
	"host": "localhost",
	"port": 9091,
	"username": "shunt",
	"password": "secret",
	"type": "Transmission",
}
```

#### ServerTypes

```json
["Transmission", "uTorrent", "rtorrent"]
```

| Endpoint | Description |
| ---- | --------------- |
| [GET /servers](#Servers) | Get server list |
| [POST /servers](#Servers) | Add server to the list |
| [GET /servers/:identifier](#Servers) | Get server object |
| [PUT /servers/:idenfitier](#Servers) | Update server object |
| [DELETE /servers/:idenfitier](#Servers) | Delete server from the list |


### Torrents

#### Torrent

```json
{
	"magnet": "",
	"url": "",
	"id": 1,
	"name": "torrentname",
	"total_size": 100,
	"dl_size": 82,
	"dl_rate": 105,
	"status": "DOWNLOAD",
	"added_date": 1398103085,
}
```

#### Action

```json
{
	"action": "start",
}
```

#### Actions

```json
["start", "startNow", "stop"]
```

| Endpoint | Description |
| ---- | --------------- |
| [GET /servers/:identifier/torrents](#Torrents) | Get torrent list from server |
| [GET /servers/:identifier/torrents/:id](#Torrents) | Get torrent object |
| [PATCH /servers/:identifier/torrents/:id](#Torrents) | Change torrent state |
| [POST /servers/:idenfitier/torrents/:id](#Torrents) | Add torrent to server's torrent list |
| [DELETE /servers/:idenfitier/torrents/:id](#Torrents) | Delete torrent from server's torrent list |

## TODO

See [TODO.org](/TODO.org).
