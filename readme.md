# Gallery

Application to manage photos.

# Requirements

Target is to create a REST API that would allow to:

• Add photos

• Preview of a list of photos

• Create albums

• Preview of list of albums

• Adding photo to an album

As a part of this task, provide documentation that would allow to:

• lunch app

• check endpoints

# Installation

After downloading, install all dependencies.

```npm
npm install
```

Before Lunching app make sure that local MongoDB is running.

To Lunch App

```npm
node server.js
```

# Photo Endpoints

GET

```http
/photos                   # get all photos
/photos/:photo_id         # get photo details by id
/photos/link/:photo_id    # get photo's content
```

POST

```http
/photos                   # Upload photo
```

In order to post a photo a following form-data must be present in Request:

|   Key   |              Value |
| :-----: | -----------------: |
|  file   |         image_file |
| enctype | multipart/formdata |

DELETE

```http
/photos                   # Delete photo
```

# Albums Endpoints

GET

```http
/albums                   # get all albums
/albums/:album_id         # get album details by id
/photos/link/:photo_id    # get photo's content
```

POST

```http
/albums                   # Create alum
```

In order to post a photo a following Headers must be present in Request:

|     Key      |            Value |
| :----------: | ---------------: |
| Content-type | application/json |

In order to post a photo a following Body must be present in Request:

```JSON
{
    "name":"Album Name",
}
```

PUT

```http
/albums                   # Update album's name
/albums/:album_id/photo   # Add Photo to Album
```

In order to post a update a following Headers must be present in Request:

|     Key      |            Value |
| :----------: | ---------------: |
| Content-type | application/json |

In order to post a albm a following Body must be present in Request:

```JSON
{
    "name":"Album Name",
}
```

In order to add a photo to album following Headers must be present in Request:

|     Key      |            Value |
| :----------: | ---------------: |
| Content-type | application/json |

In order to post a albm a following Body must be present in Request:

```JSON
{
    "photo": "photoId"
}
```

DELETE

```http
/albums                   # Delete album
/albums/:album_id/photo   # Delete Photo from Album
```
