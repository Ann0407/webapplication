var flickrApi = require('flickrapi');
var flickrOptions = {
  api_key: "YOUR_API_KEY_HERE"
};

var recentPhotos = [];
var photoCount = 50;
var searchTag = 'mountain';

function getRecentFlickrPhotos(callback) {
  flickrApi.tokenOnly(flickrOptions, function (err, flickr) {
    flickr.photos.search({tags: searchTag, page: 1, per_page: photoCount}, function (err, result) {
      if (err) {
        console.log(err);
        return;
      }

      var photos = result.photos.photo;

      var i = 0;

      photos.forEach(function (photo) {
        var title = photo.title;
        var link = 'https://www.flickr.com/photos/' + photo.owner + '/' + photo.id;
        var src = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server
          + '/' + photo.id + '_' + photo.secret + '.jpg';

        populateTags(flickr, photo.id, function (tags) {
          recentPhotos.push({
            title: title,
            link: link,
            src: src,
            tags: tags,
            originalIndex: i++
          });

          if (recentPhotos.length == 50) {
            callback();
          }
        });
      });
    });
  });
}

function populateTags(flickr, photoId, callback) {
  flickr.photos.getInfo({photo_id: photoId}, function (err, result) {
    var rawTags = [];
    result.photo.tags.tag.forEach(function (tag) {
      rawTags.push(tag.raw);
    });

    tags = rawTags.join();
    callback(tags);
  });
}

module.exports = {
  getRecentFlickrPhotos: getRecentFlickrPhotos,
  recentPhotos: recentPhotos
};