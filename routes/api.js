const express = require('express');
const WebTorrent = require('webtorrent');
const router = express.Router();

router.get('/stream', function(req, res, next) {
  const {query} = req;
  const {magnet, fileSize} = query;
  const client = new WebTorrent();
  client.add(unescape(magnet), function (torrent) {
    const file = torrent.files.find(file => file.name.endsWith('.mp4'));
    const head = { 'Content-Length': fileSize, 'Content-Type': 'video/mp4', };
    res.writeHead(200, head);
    file.createReadStream(file.name).pipe(res);
  })
});

module.exports = router;
